// src/auth/confirmation.js
/**
 * Confirmation Module
 * @module confirmation
 * @description Handles email confirmation with manual confirmation button and CAPTCHA verification.
 * @version 0.3.0
 *
 * @changelog
 * - 0.3.0 (2025-01-XX): Added manual confirmation with CAPTCHA requirement.
 * - 0.2.0 (2025-05-31): Simplified page to auto-confirm and redirect. Removed ToS agreement from this page.
 * - 0.1.1 (2025-05-17): Corrected success message and redirect to login page.
 * - 0.1.0 (2025-05-15): Converted to use direct Supabase API calls instead of Firebase Cloud Functions.
 * - 0.0.3 (2025-05-12): Updated terms of service modal and confirmation email.
 * - 0.0.2 (2025-05-10): Added terms of service and confirmation email.
 * - 0.0.1 (2025-05-08): Created the confirmation module with basic functionality.
 */

import { showStatus, showError, showLoading, hideLoading } from "./auth.js";
import { supabase } from "../supabase-client.js";

// Store confirmation data and captcha token
let confirmationData = null;
let captchaToken = null;
let turnstileWidgetId = null;

// Turnstile callback function
window.onloadTurnstileCallback = function () {
  console.log("Turnstile API ready for confirmation page.");
  const turnstileContainer = document.getElementById("turnstile-container");

  if (turnstileContainer && window.turnstile && !turnstileWidgetId) {
    console.log("Rendering Turnstile widget for confirmation...");
    try {
      turnstileWidgetId = window.turnstile.render(turnstileContainer, {
        sitekey: "0x4AAAAAABdzY3InOU2_In99",
        callback: function (token) {
          captchaToken = token;
          console.log("Turnstile token obtained for confirmation:", token);

          // Enable confirm button when CAPTCHA is solved
          const confirmBtn = document.getElementById("confirmBtn");
          if (confirmBtn) {
            confirmBtn.disabled = false;
          }
        },
        "expired-callback": () => {
          console.log("Turnstile token expired on confirmation page.");
          if (window.turnstile && turnstileWidgetId) {
            window.turnstile.reset(turnstileWidgetId);
          }
          captchaToken = null;

          // Disable confirm button when CAPTCHA expires
          const confirmBtn = document.getElementById("confirmBtn");
          if (confirmBtn) {
            confirmBtn.disabled = true;
          }
        },
        "error-callback": (err) => {
          captchaToken = null;
          console.error("Turnstile error on confirmation page:", err);
          showError(`Erreur CAPTCHA: ${err}. Veuillez réessayer.`);

          // Disable confirm button on CAPTCHA error
          const confirmBtn = document.getElementById("confirmBtn");
          if (confirmBtn) {
            confirmBtn.disabled = true;
          }
        },
      });

      if (turnstileWidgetId === undefined) {
        console.error(
          "Turnstile.render did not return a widgetId for confirmation."
        );
        showError("Erreur initialisation CAPTCHA.");
      } else {
        console.log(
          "Turnstile widget rendered for confirmation. ID:",
          turnstileWidgetId
        );
      }
    } catch (e) {
      console.error("Error rendering Turnstile on confirmation page:", e);
      showError("Impossible d'afficher le CAPTCHA.");
    }
  }
};

/**
 * Initializes the email confirmation page
 */
export function initConfirmationPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlHash = window.location.hash;

  // Check for different types of confirmation data
  let confirmationToken = urlParams.get("token");
  const type = urlParams.get("type");
  let confirmationUrl = urlParams.get("confirmation_url");

  // Also check URL hash for tokens (Supabase sometimes puts tokens in hash)
  if (urlHash) {
    const hashParams = new URLSearchParams(urlHash.substring(1));
    if (!confirmationToken) {
      confirmationToken =
        hashParams.get("access_token") || hashParams.get("token");
    }
  }

  console.log("Confirmation page initialized with:", {
    confirmationToken: confirmationToken ? "present" : "missing",
    type,
    confirmationUrl: confirmationUrl ? "present" : "missing",
    urlHash: urlHash || "none",
  });

  const statusMessage = document.getElementById("statusMessage");
  const errorMessage = document.getElementById("errorMessage");
  const loading = document.getElementById("loading");
  const confirmationForm = document.getElementById("confirmationForm");
  const confirmForm = document.getElementById("confirmForm");

  if (loading) loading.classList.remove("hidden");

  // Validate that we have the necessary confirmation data
  if (confirmationUrl) {
    confirmationData = { type: "url", data: confirmationUrl };
    showConfirmationForm();
  } else if (
    confirmationToken &&
    (type === "signup" || type === "email_change")
  ) {
    confirmationData = {
      type: "token",
      data: confirmationToken,
      tokenType: type,
    };
    showConfirmationForm();
  } else {
    if (loading) loading.classList.add("hidden");
    showError("Erreur: URL ou jeton de confirmation manquant ou invalide.");
    return;
  }

  // Set up form submission handler
  if (confirmForm) {
    confirmForm.addEventListener("submit", handleConfirmation);
  }

  function showConfirmationForm() {
    if (loading) loading.classList.add("hidden");
    if (confirmationForm) confirmationForm.classList.remove("hidden");
    showStatus(
      "Lien de confirmation valide. Veuillez compléter le CAPTCHA et confirmer.",
      "info"
    );
  }
}

/**
 * Handles the manual confirmation process
 */
async function handleConfirmation(e) {
  e.preventDefault();

  if (!captchaToken) {
    showError("Veuillez compléter le CAPTCHA avant de confirmer.");
    return;
  }

  if (!confirmationData) {
    showError("Données de confirmation manquantes.");
    return;
  }

  const confirmBtn = document.getElementById("confirmBtn");
  const confirmSpinner = document.getElementById("confirmSpinner");

  // Show loading state
  if (confirmBtn) confirmBtn.disabled = true;
  if (confirmSpinner) confirmSpinner.classList.remove("hidden");

  try {
    if (confirmationData.type === "url") {
      await confirmEmailWithUrl(confirmationData.data);
    } else if (confirmationData.type === "token") {
      await confirmEmailWithToken(
        confirmationData.data,
        confirmationData.tokenType
      );
    }
  } catch (error) {
    console.error("Confirmation error:", error);
    showError(`Erreur lors de la confirmation: ${error.message}`);
  } finally {
    // Reset loading state
    if (confirmBtn) confirmBtn.disabled = false;
    if (confirmSpinner) confirmSpinner.classList.add("hidden");

    // Reset CAPTCHA
    if (window.turnstile && turnstileWidgetId) {
      window.turnstile.reset(turnstileWidgetId);
    }
    captchaToken = null;
    if (confirmBtn) confirmBtn.disabled = true;
  }
}

/**
 * Confirms the email address with token-based confirmation
 */
async function confirmEmailWithToken(token, tokenType = "signup") {
  try {
    console.log("Attempting token confirmation with type:", tokenType);

    // For signup confirmations, use verifyOtp with the token_hash
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: "email", // Use 'email' type for email confirmations
    });

    if (error) {
      console.error("Error during verifyOtp:", error);
      throw new Error(
        "Erreur lors de la vérification du token: " + error.message
      );
    }

    if (data.user && data.session) {
      console.log("Email confirmed successfully:", data.user.email);
      showSuccessAndRedirect(
        "Email vérifié avec succès ! Redirection vers la connexion..."
      );
    } else {
      throw new Error(
        "Impossible de confirmer l'email. Le token est peut-être invalide ou a expiré."
      );
    }
  } catch (error) {
    console.error("Error during token-based confirmation:", error);
    throw error;
  }
}

/**
 * Confirms the email address directly with Supabase using the confirmation URL
 */
async function confirmEmailWithUrl(confirmationUrlParam) {
  try {
    const decodedUrl = decodeURIComponent(confirmationUrlParam);
    console.log("Attempting email confirmation with URL:", decodedUrl);

    // Extract token from the confirmation URL
    const url = new URL(decodedUrl);
    const token = url.searchParams.get("token");
    const type = url.searchParams.get("type");

    if (!token) {
      throw new Error("Token manquant dans l'URL de confirmation.");
    }

    console.log(
      "Extracted from URL - token:",
      token.substring(0, 20) + "...",
      "type:",
      type
    );

    // Use verifyOtp with token_hash for email confirmations
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: "email", // Use 'email' type for email confirmations regardless of URL type
    });

    if (error) {
      console.error("Error during URL-based confirmation:", error);
      throw new Error("Erreur lors de la confirmation: " + error.message);
    }

    if (data.user && data.session) {
      console.log("Email confirmed successfully via URL:", data.user.email);
      showSuccessAndRedirect(
        "Email vérifié avec succès ! Vous allez être redirigé vers la page de connexion."
      );
    } else {
      throw new Error(
        "Impossible de confirmer l'email. Le lien est peut-être expiré ou déjà utilisé."
      );
    }
  } catch (error) {
    console.error("Confirmation processing error:", error);
    throw error;
  }
}

/**
 * Shows success message and redirects to login
 */
function showSuccessAndRedirect(message) {
  const confirmationForm = document.getElementById("confirmationForm");
  const successMessage = document.getElementById("successMessage");

  if (confirmationForm) confirmationForm.classList.add("hidden");

  if (successMessage) {
    successMessage.innerHTML = `
      <div class="confirmation-success">
        <span class="success-icon">✅</span>
        <h3>Confirmation réussie !</h3>
        <p>Votre compte a été confirmé avec succès.</p>
        <p>Vous allez être redirigé vers la page de connexion dans quelques secondes...</p>
      </div>
    `;
    successMessage.classList.remove("hidden");
  }

  setTimeout(() => {
    window.location.href = "/auth/login";
  }, 3000);
}

export default {
  initConfirmationPage,
};
