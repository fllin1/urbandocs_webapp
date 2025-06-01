// src/auth/signup.js
/**
 * Signup Module
 * @module signup
 * @description Handles user registration with client-side validation, Google OAuth, and phone verification using Supabase.
 * @version 0.2.1
 *
 * @changelog
 * - 0.2.1 (2025-05-18): Added captcha with Cloudflare Turnstile.
 * - 0.2.0 (2025-05-18): Added phone number input, OTP sending and verification for email/password signup.
 * - 0.1.1 (2025-05-18): Added Google Sign-Up functionality.
 * - 0.1.0 (2025-05-15): Migrated to Supabase client-side auth (versioning adjusted)
 */

import {
  showError,
  showStatus,
  showLoading,
  hideLoading,
  hideElement,
} from "./auth.js";
import { supabase } from "../supabase-client.js";

// Store phone number temporarily between steps
let captchaToken = null; // To store the captcha token (used by both hCaptcha and Turnstile)
let turnstileWidgetId = null; // To store Turnstile widget ID

// This function will be called by the Cloudflare Turnstile script once it's loaded
// (due to &onload=onloadTurnstileCallback in the script tag in signup.html)
window.onloadTurnstileCallback = function () {
  console.log("Turnstile API ready (onloadTurnstileCallback executed).");
  const turnstileContainer = document.getElementById("turnstile-container");

  if (turnstileContainer && window.turnstile && !turnstileWidgetId) {
    console.log("Rendering Turnstile widget from onloadTurnstileCallback...");
    try {
      turnstileWidgetId = window.turnstile.render(turnstileContainer, {
        sitekey: "0x4AAAAAABdzY3InOU2_In99",
        callback: function (token) {
          captchaToken = token;
          console.log("Turnstile token obtained:", token);
        },
        "expired-callback": () => {
          console.log(
            "Turnstile token expired. Resetting widget. ID:",
            turnstileWidgetId
          );
          if (window.turnstile && turnstileWidgetId) {
            window.turnstile.reset(turnstileWidgetId);
          }
          captchaToken = null; // Clear the token
          // Widget should be ready for a new challenge after reset.
        },
        "error-callback": (err) => {
          captchaToken = null;
          console.error("Turnstile error callback:", err);
          showError(`Erreur CAPTCHA: ${err}. Veuillez réessayer.`);
        },
      });
      if (turnstileWidgetId === undefined) {
        console.error(
          "Turnstile.render did not return a widgetId. Sitekey or container issue?"
        );
        showError("Erreur initialisation CAPTCHA (ID widget non retourné).");
      } else {
        console.log("Turnstile widget rendered. ID:", turnstileWidgetId);
      }
    } catch (e) {
      console.error("Error rendering Turnstile:", e);
      showError("Impossible d'afficher le CAPTCHA.");
    }
  } else if (!turnstileContainer) {
    console.error("onloadTurnstileCallback: #turnstile-container not found.");
  } else if (!window.turnstile) {
    console.error("onloadTurnstileCallback: window.turnstile API not found.");
  } else if (turnstileWidgetId) {
    console.log("onloadTurnstileCallback: Widget already seems rendered.");
  }
};

/**
 * Show detailed signup success message
 * @param {string} email - The email address used for signup
 */
function showSignupSuccess(email) {
  const statusElement = document.getElementById("statusMessage");
  if (statusElement) {
    statusElement.innerHTML = `
      <div class="signup-success">
        <h3>Compte créé avec succès !</h3>
        <p><strong>Un email de confirmation a été envoyé à :</strong><br>
        <code>${email}</code></p>
        
        <div class="confirmation-instructions">
          <h4>📧 Prochaines étapes :</h4>
          <ol>
            <li>Vérifiez votre boîte de réception (et n'oubliez pas vos spams !)</li>
            <li>Cliquez sur le lien de confirmation dans l'email</li>
            <li>Vous pourrez ensuite vous connecter avec vos identifiants</li>
          </ol>
        </div>
        
        <div class="confirmation-note">
          <p><strong>Note :</strong> Vous devez confirmer votre email avant de pouvoir vous connecter.</p>
        </div>
      </div>
    `;
    statusElement.classList.remove("hidden");
    statusElement.classList.add("success");
  }
}

/**
 * Initializes the signup page
 */
export function initSignupPage() {
  console.log("initSignupPage called");
  const signupForm = document.getElementById("signupForm");
  const errorMessageDiv = document.getElementById("errorMessage");
  const statusMessage = document.getElementById("statusMessage");
  const googleSignUpBtn = document.getElementById("googleSignUpBtn");
  const turnstileContainer = document.getElementById("turnstile-container");

  // --- Terms of Service Logic for Signup ---
  const tosCheckbox = document.getElementById("tosCheckbox");
  const tosModalElement = document.getElementById("tosModal");
  const tosModalBody = document.getElementById("tosModalBody");
  const signupBtn = document.getElementById("signupBtn");
  const tosStatusMessage = document.getElementById("tosStatusMessage");
  const tosLink = document.getElementById("tosLink");
  const tosModalClose = document.getElementById("tosModalClose");

  // Initially disable signup button, Google button, and checkbox
  if (signupBtn) {
    signupBtn.disabled = true;
  }
  if (googleSignUpBtn) {
    googleSignUpBtn.disabled = true;
  }
  if (tosCheckbox) {
    tosCheckbox.disabled = true;
  }

  // Custom modal handling
  if (tosLink && tosModalElement) {
    tosLink.addEventListener("click", (e) => {
      e.preventDefault();
      showModal();
    });
  }

  if (tosModalClose) {
    tosModalClose.addEventListener("click", () => {
      hideModal();
    });
  }

  // Close modal when clicking outside
  if (tosModalElement) {
    tosModalElement.addEventListener("click", (e) => {
      if (e.target === tosModalElement) {
        hideModal();
      }
    });
  }

  function showModal() {
    if (tosModalElement) {
      tosModalElement.classList.add("show");
      tosModalElement.style.display = "block";
      document.body.style.overflow = "hidden";

      // Load ToS content if not already loaded
      if (tosModalBody && tosModalBody.dataset.loaded !== "true") {
        loadToSContent();
      }

      // Enable checkbox immediately when modal opens
      if (tosCheckbox) {
        tosCheckbox.disabled = false;
      }
    }
  }

  function hideModal() {
    if (tosModalElement) {
      tosModalElement.classList.remove("show");
      tosModalElement.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  async function loadToSContent() {
    try {
      tosModalBody.innerHTML =
        "<p>Chargement des conditions d'utilisation...</p>";

      const response = await fetch("/policies/terms");
      if (!response.ok) {
        throw new Error(`Failed to load Terms of Service: ${response.status}`);
      }

      const tosHtml = await response.text();

      // Extract just the content from the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(tosHtml, "text/html");
      const mainContent =
        doc.querySelector("main") ||
        doc.querySelector(".policy-container") ||
        doc.body;

      if (mainContent) {
        tosModalBody.innerHTML = mainContent.innerHTML;
      } else {
        tosModalBody.innerHTML = tosHtml;
      }

      tosModalBody.dataset.loaded = "true";
      tosModalBody.scrollTop = 0;

      // Enable checkbox after content is loaded
      if (tosCheckbox) {
        tosCheckbox.disabled = false;
      }
    } catch (error) {
      console.error("Error loading ToS:", error);
      tosModalBody.innerHTML = `
        <div style="color: #dc3545; padding: 1rem; border: 1px solid #dc3545; border-radius: 4px; background-color: #f8d7da;">
          <p><strong>Erreur lors du chargement des conditions d'utilisation.</strong></p>
          <p>Veuillez réessayer ou consulter les conditions directement sur <a href="/policies/terms" target="_blank">cette page</a>.</p>
        </div>
      `;

      // Enable checkbox even if there's an error loading content
      if (tosCheckbox) {
        tosCheckbox.disabled = false;
      }
    }
  }

  // Handle checkbox change
  if (tosCheckbox) {
    tosCheckbox.addEventListener("change", () => {
      const isChecked = tosCheckbox.checked;

      // Enable/disable both buttons based on ToS acceptance
      if (signupBtn) {
        signupBtn.disabled = !isChecked;
      }
      if (googleSignUpBtn) {
        googleSignUpBtn.disabled = !isChecked;
      }

      // Hide/show ToS status message
      if (tosStatusMessage) {
        if (isChecked) {
          tosStatusMessage.classList.add("hidden");
        } else {
          tosStatusMessage.classList.remove("hidden");
        }
      }

      if (!isChecked) {
        showError(
          "Veuillez accepter les Conditions Générales d'Utilisation.",
          "errorMessage"
        );
      } else {
        // Clear ToS-related error messages
        const errorElement = document.getElementById("errorMessage");
        if (
          errorElement &&
          errorElement.innerHTML.includes("Conditions Générales d'Utilisation")
        ) {
          hideElement("errorMessage");
        }
      }
    });
  }
  // --- End Terms of Service Logic for Signup ---

  if (!turnstileContainer) {
    console.error(
      "#turnstile-container not found in the DOM. CAPTCHA cannot be rendered."
    );
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      let phone = document.getElementById("phone").value.trim(); // Get phone number

      let validationErrors = [];
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email))
        validationErrors.push("L'adresse email n'est pas valide.");
      if (password !== confirmPassword)
        validationErrors.push("Les mots de passe ne correspondent pas.");
      const passwordComplexityPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordComplexityPattern.test(password) || password.length < 8)
        validationErrors.push("Le format du mot de passe est invalide.");
      if (!phone) validationErrors.push("Le numéro de téléphone est requis.");
      // Basic phone validation (you might want a more robust one)
      const phonePattern = /^(0|\+33)[1-9]\d{8}$/; // Example: 0612345678 or +33612345678
      if (phone && !phonePattern.test(phone))
        validationErrors.push(
          "Le format du numéro de téléphone est invalide (ex: 0612345678 ou +33612345678)."
        );

      if (!captchaToken) {
        // Check if captcha is solved
        validationErrors.push("Veuillez compléter le CAPTCHA.");
      }

      if (!tosCheckbox || !tosCheckbox.checked) {
        validationErrors.push(
          "Veuillez lire et accepter les Conditions Générales d'Utilisation."
        );
      }

      if (validationErrors.length > 0) {
        showError(validationErrors.join("<br>"));
        return;
      }

      showLoading("signupBtn", "signupSpinner");
      try {
        let e164Phone = phone;
        if (phone.startsWith("0")) {
          e164Phone = `+33${phone.substring(1)}`;
        }

        // Step 1: Sign up with email and password
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { captchaToken }, // Pass captcha token
        });

        if (signUpError) throw signUpError;
        if (!data.user)
          throw new Error("Erreur lors de la création de l'utilisateur.");

        // Step 2: Update profile with phone number if provided
        // Note: The profile should be automatically created by the database trigger
        if (e164Phone && data.user.id) {
          try {
            // Wait a moment for the trigger to create the profile
            await new Promise((resolve) => setTimeout(resolve, 100));

            const { error: profileError } = await supabase
              .from("profiles")
              .update({ phone: e164Phone })
              .eq("id", data.user.id);

            if (profileError) {
              console.warn(
                "Could not update profile with phone number:",
                profileError
              );
              // Don't throw error here as the main signup was successful
            }
          } catch (profileUpdateError) {
            console.warn("Profile update failed:", profileUpdateError);
            // Don't throw error here as the main signup was successful
          }
        }

        // Show success message with detailed instructions
        showSignupSuccess(email);

        // Hide the form and reset it
        if (signupForm) {
          signupForm.classList.add("hidden"); // Hide the form
          signupForm.reset();
        }
      } catch (error) {
        console.error("Email/Password Signup error:", error);
        let displayError = error.message || "Une erreur est survenue.";
        if (
          error.message &&
          error.message.includes("User already registered")
        ) {
          displayError =
            "Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse.";
        } else if (
          error.message &&
          error.message.includes("Unable to validate phone number")
        ) {
          displayError = "Le numéro de téléphone fourni n'est pas valide.";
        } else if (
          error.message &&
          error.message.toLowerCase().includes("captcha protection")
        ) {
          displayError =
            "Erreur CAPTCHA du serveur. Veuillez réessayer. (" +
            error.message +
            ")";
        }
        showError(displayError);
      } finally {
        hideLoading("signupBtn", "signupSpinner");
        if (window.turnstile && turnstileWidgetId) {
          window.turnstile.reset(turnstileWidgetId);
          console.log("Turnstile widget has been reset.");
        }
        captchaToken = null; // Clear token after use
      }
    });
  } else {
    console.error("Signup form (signupForm) not found.");
  }

  if (googleSignUpBtn) {
    googleSignUpBtn.addEventListener("click", async () => {
      showLoading("googleSignUpBtn", "googleSignUpSpinner");
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            // Google OAut h will handle the redirect after successful authentication
            // No custom redirectTo needed - let Supabase handle the default flow
          },
        });
        if (error) {
          console.error("Error signing up with Google:", error);
          showError(
            error.message || "Erreur lors de l'inscription avec Google."
          );
        }
        // On success, Supabase handles the redirect automatically
      } catch (error) {
        console.error("Exception during Google sign-up:", error);
        showError(
          "Une exception est survenue lors de l'inscription avec Google."
        );
      } finally {
        hideLoading("googleSignUpBtn", "googleSignUpSpinner");
      }
    });
  } else {
    console.warn("Google Sign-Up button (googleSignUpBtn) not found.");
  }
}

export default {
  initSignupPage,
};
