// src/js/auth/forgotten-password.js
/**
 * Forgotten Password Module
 * @module forgottenPassword
 * @description Handles forgotten password functionality
 * @version 0.0.1
 *
 * @changelog
 * - 0.0.1 (2025-05-14): Creation of the forgotten password module with basic functionality.
 */

import { supabase } from "../supabase-client.js";
import { showError, showStatus, showLoading, hideLoading } from "./auth.js";

let turnstileToken = null;

// Initialize Turnstile
window.onloadTurnstileResetCallback = function () {
  turnstile.render("#turnstile-reset-container", {
    sitekey: "0x4AAAAAABdzY3InOU2_In99",
    callback: function (token) {
      turnstileToken = token;
    },
  });
};

export function initForgotPasswordPage() {
  const resetForm = document.getElementById("resetForm");
  const errorMessage = document.getElementById("errorMessage");
  const statusMessage = document.getElementById("statusMessage");

  if (resetForm) {
    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset messages
      if (errorMessage) {
        errorMessage.classList.add("hidden");
        errorMessage.textContent = "";
      }
      if (statusMessage) {
        statusMessage.classList.add("hidden");
        statusMessage.textContent = "";
      }

      const email = document.getElementById("email").value.trim();

      // Basic validation
      if (!email) {
        showError("Veuillez entrer votre adresse email.");
        return;
      }

      // Check if Turnstile token exists
      if (!turnstileToken) {
        showError("Veuillez compléter la vérification Turnstile.");
        return;
      }

      // Show loading state
      showLoading("resetBtn", "resetSpinner");

      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/update-password`,
          captchaToken: turnstileToken,
        });

        if (error) throw error;

        // Show success message
        showStatus(
          "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.",
          "success"
        );

        // Hide the form
        resetForm.classList.add("hidden");
      } catch (error) {
        console.error("Password reset error:", error);
        showError("Une erreur est survenue. Veuillez réessayer plus tard.");
        // Reset Turnstile on error
        turnstile.reset();
        turnstileToken = null;
      } finally {
        hideLoading("resetBtn", "resetSpinner");
      }
    });
  }
}

export default {
  initForgotPasswordPage,
};
