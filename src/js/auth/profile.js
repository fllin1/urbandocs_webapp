// src/auth/profile.js
/**
 * Profile Module
 * @module profile
 * @description Handles user profile management
 * @version 0.0.2
 *
 * @changelog
 * - 0.0.2 (2025-05-15): Improved error handling and added loading states
 * - 0.0.1 (2025-05-14): Initial version with basic profile functionality
 */

import {
  protectPage,
  showStatus,
  showError,
  showLoading,
  hideLoading,
} from "./auth.js";
import { supabase } from "../supabase-client.js";

export async function initProfilePage() {
  // Protect the page to ensure the user is authenticated
  if (!(await protectPage())) return;

  const userEmail = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtnProfile");
  const profileContainer = document.getElementById("profileContainer");
  const profileLoading = document.getElementById("profileLoading");

  // Afficher l'état de chargement
  if (profileLoading) profileLoading.classList.remove("d-none");
  if (profileContainer) profileContainer.classList.add("d-none");

  try {
    // Obtain the current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Afficher l'email de l'utilisateur
    if (userEmail && session) {
      userEmail.textContent = session.user.email;
    }

    // Handle logout button
    if (logoutBtn) {
      logoutBtn.classList.remove("hidden");
      logoutBtn.addEventListener("click", async () => {
        try {
          showLoading("logoutBtnProfile", "logoutSpinner");

          const { error } = await supabase.auth.signOut();

          if (error) throw error;

          showStatus("Déconnexion réussie. Redirection...", "success");

          // Redirect after a short delay
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } catch (error) {
          console.error("Error signing out:", error);
          showError("Une erreur est survenue lors de la déconnexion.");
          hideLoading("logoutBtnProfile", "logoutSpinner");
        }
      });
    }

    // Display the profile container and hide the loading state
    if (profileContainer) profileContainer.classList.remove("d-none");
    if (profileLoading) profileLoading.classList.add("d-none");
  } catch (error) {
    console.error("Profile initialization error:", error);
    showError("Une erreur est survenue lors du chargement du profil.");

    // Maske the loading state
    if (profileLoading) profileLoading.classList.add("d-none");
  }
}

export default {
  initProfilePage,
};
