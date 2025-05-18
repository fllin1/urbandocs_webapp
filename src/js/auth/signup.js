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

import { showError, showStatus, showLoading, hideLoading } from "./auth.js";
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
        // theme: 'light', // Optional: 'light', 'dark', or 'auto'
        // language: 'fr', // Optional: specify language
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
 * Initializes the signup page
 */
export function initSignupPage() {
  console.log("initSignupPage called");
  const signupForm = document.getElementById("signupForm");
  // const otpForm = document.getElementById("otpForm"); // OTP Form - Removed
  const errorMessageDiv = document.getElementById("errorMessage");
  const statusMessage = document.getElementById("statusMessage");
  const googleSignUpBtn = document.getElementById("googleSignUpBtn");
  const turnstileContainer = document.getElementById("turnstile-container"); // Updated selector

  if (!turnstileContainer) {
    // Updated check
    console.error(
      "#turnstile-container not found in the DOM. CAPTCHA cannot be rendered."
    );
  }

  // The onloadTurnstileCallback is the primary way the widget should be rendered.
  // The redundant block previously here has been removed.
  // If window.turnstile is already available and the callback hasn't fired yet (e.g. script loaded from cache before DOM ready for container),
  // the `onloadTurnstileCallback` will still execute once the script fully processes its `onload` parameter.

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (errorMessageDiv) errorMessageDiv.classList.add("hidden");
      if (statusMessage) statusMessage.classList.add("hidden");

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

      if (validationErrors.length > 0) {
        showError(validationErrors.join("<br>"));
        return;
      }

      showLoading("signupBtn", "signupSpinner");
      try {
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

        // User created. Now update their profile with the phone number if provided.
        let successMessage =
          "Compte créé ! Un email de confirmation a été envoyé.";
        showStatus(successMessage, "success");

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
          options: { redirectTo: `${window.location.origin}/profile.html` },
        });
        if (error) {
          console.error("Error signing up with Google:", error);
          showError(
            error.message || "Erreur lors de l'inscription avec Google."
          );
        }
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
