import { supabase } from "../supabase-client.js";
import { showError, showStatus, showLoading, hideLoading } from "./auth.js";

export function initUpdatePasswordPage() {
  const updatePasswordForm = document.getElementById("updatePasswordForm");
  const errorMessage = document.getElementById("errorMessage");
  const statusMessage = document.getElementById("statusMessage");

  if (updatePasswordForm) {
    updatePasswordForm.addEventListener("submit", async (e) => {
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

      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Validation
      if (password !== confirmPassword) {
        showError("Les mots de passe ne correspondent pas.");
        return;
      }

      const passwordComplexityPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordComplexityPattern.test(password) || password.length < 8) {
        showError("Le mot de passe ne respecte pas les critères de sécurité.");
        return;
      }

      // Show loading state
      showLoading("updateBtn", "updateSpinner");

      try {
        const { error } = await supabase.auth.updateUser({
          password: password,
        });

        if (error) throw error;

        // Show success message and redirect
        showStatus("Mot de passe mis à jour avec succès!", "success");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (error) {
        console.error("Password update error:", error);
        showError(
          "Une erreur est survenue lors de la mise à jour du mot de passe."
        );
      } finally {
        hideLoading("updateBtn", "updateSpinner");
      }
    });
  }
}

export default {
  initUpdatePasswordPage,
};
