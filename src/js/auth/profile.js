// src/auth/profile.js
/**
 * Profile Module
 * @module profile
 * @description Handles user profile management, including data fetching, updates, and account deletion.
 * @version 0.1.0
 *
 * @changelog
 * - 0.1.0 (2024-05-16): Added profile data fetching, updating, and account deletion functionality.
 * - 0.0.2 (2025-05-15): Improved error handling and added loading states (previous versioning was future-dated)
 * - 0.0.1 (2025-05-14): Initial version with basic profile display and logout.
 */

import {
  protectPage,
  showStatus, // Assuming this can target specific elements
  // showError, // We can use showStatus with type 'error'
  showLoading,
  hideLoading,
} from "./auth.js"; // Assuming auth.js exports showStatus that can take an element ID
import { supabase } from "../supabase-client.js";

// Helper to show status messages for profile form and delete section
function showProfileStatus(message, type, elementId) {
  const statusElement = document.getElementById(elementId);
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.className = "status-message margin-top-sm"; // Reset classes
    statusElement.classList.add(type); // 'success', 'error', 'info'
    statusElement.classList.remove("hidden");
  }
}

async function fetchUserProfile(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("name, prename, adresse, city, code_postal, occupation, updated_at")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116: " वैद्युत row not found" (row not found)
    console.error("Error fetching profile:", error);
    throw error;
  }
  return data;
}

function populateProfileForm(profile) {
  if (!profile) return;
  document.getElementById("name").value = profile.name || "";
  document.getElementById("prename").value = profile.prename || "";
  document.getElementById("adresse").value = profile.adresse || "";
  document.getElementById("city").value = profile.city || "";
  document.getElementById("codePostal").value = profile.code_postal || "";
  document.getElementById("occupation").value = profile.occupation || "";

  const memberSinceEl = document.getElementById("memberSince");
  if (memberSinceEl && profile.updated_at) {
    // Using updated_at as a proxy if created_at isn't directly on profiles
    memberSinceEl.textContent = new Date(
      profile.updated_at
    ).toLocaleDateString();
  }
}

export async function initProfilePage() {
  if (!(await protectPage())) return;

  const userEmailEl = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileForm = document.getElementById("profileForm");
  const deleteAccountBtn = document.getElementById("deleteAccountBtn");
  const memberSinceEl = document.getElementById("memberSince");

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session || !session.user) {
      console.log("No active session or user. Redirecting to login.");
      window.location.href = "/login.html"; // Or your designated login page
      return;
    }
    const user = session.user;

    if (userEmailEl) {
      userEmailEl.textContent = user.email;
    }
    if (memberSinceEl && user.created_at) {
      memberSinceEl.textContent = new Date(
        user.created_at
      ).toLocaleDateString();
    }

    // Fetch and populate profile
    showLoading("saveProfileBtn"); // Show loading on form initially
    const profile = await fetchUserProfile(user.id);
    if (profile) {
      populateProfileForm(profile);
    } else {
      // If no profile, it might be created by the trigger, or we can pre-fill some things
      // For now, form will be empty, user can fill and save to create/update.
      console.log("No profile data found for user, form will be empty.");
    }
    hideLoading("saveProfileBtn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        showLoading("logoutBtn");
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          showProfileStatus(
            "Déconnexion réussie. Redirection...",
            "success",
            "profileFormStatus"
          ); // Or a global status
          setTimeout(() => {
            window.location.href = "/";
          }, 200);
        } catch (error) {
          console.error("Error signing out:", error);
          showProfileStatus(
            `Erreur de déconnexion: ${error.message}`,
            "error",
            "profileFormStatus"
          );
        } finally {
          hideLoading("logoutBtn");
        }
      });
    }

    if (profileForm) {
      profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading("saveProfileBtn");
        const profileStatusEl = "profileFormStatus";
        document.getElementById(profileStatusEl).classList.add("hidden");

        const updates = {
          id: user.id, // Required for RLS and identifying the row
          name: document.getElementById("name").value,
          prename: document.getElementById("prename").value,
          adresse: document.getElementById("adresse").value,
          city: document.getElementById("city").value,
          code_postal: document.getElementById("codePostal").value,
          occupation: document.getElementById("occupation").value,
          updated_at: new Date(), // Supabase best practice
        };

        try {
          const { error } = await supabase.from("profiles").upsert(updates);
          if (error) throw error;
          showProfileStatus(
            "Profil mis à jour avec succès !",
            "success",
            profileStatusEl
          );
        } catch (error) {
          console.error("Error updating profile:", error);
          showProfileStatus(
            `Erreur lors de la mise à jour: ${error.message}`,
            "error",
            profileStatusEl
          );
        } finally {
          hideLoading("saveProfileBtn");
        }
      });
    }

    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener("click", async () => {
        const deleteStatusEl = "deleteStatusMessage";
        document.getElementById(deleteStatusEl).classList.add("hidden");

        if (
          confirm(
            "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et toutes vos données seront perdues."
          )
        ) {
          showLoading("deleteAccountBtn");
          try {
            const { error } = await supabase.rpc("delete_user_account");
            if (error) throw error;

            showProfileStatus(
              "Compte supprimé avec succès. Vous allez être déconnecté et redirigé.",
              "success",
              deleteStatusEl
            );
            // Attempt to sign out, then redirect.
            await supabase.auth.signOut();
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          } catch (error) {
            console.error("Error deleting account:", error);
            showProfileStatus(
              `Erreur lors de la suppression du compte: ${error.message}`,
              "error",
              deleteStatusEl
            );
          } finally {
            hideLoading("deleteAccountBtn");
          }
        } else {
          console.log("User cancelled account deletion.");
        }
      });
    }
  } catch (error) {
    console.error("Profile page initialization error:", error);
    // Show a general error on the page if critical elements are missing or main try fails
    const mainErrorContainer = document.getElementById("profileDetails"); // Or another suitable container
    if (mainErrorContainer) {
      mainErrorContainer.innerHTML =
        '<p class="error-message">Impossible de charger les informations du profil. Veuillez réessayer plus tard.</p>';
    }
  }
}

// Initialize the page when DOM is ready
document.addEventListener("DOMContentLoaded", initProfilePage);
