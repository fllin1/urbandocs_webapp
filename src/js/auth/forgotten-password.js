import { supabase } from "../supabase-client.js";
import { showError, showStatus, showLoading, hideLoading } from "./auth.js";

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

      // Show loading state
      showLoading("resetBtn", "resetSpinner");

      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/update-password`,
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
      } finally {
        hideLoading("resetBtn", "resetSpinner");
      }
    });
  }
}

export default {
  initForgotPasswordPage,
};
