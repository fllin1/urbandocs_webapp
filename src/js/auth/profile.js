// src/auth/profile.js
/**
 * Profile Module
 * @module profile
 * @description Handles user profile management, including data fetching, updates, and account deletion.
 * @version 0.2.1
 *
 * @changelog
 * - 0.2.1 (2025-01-27): Updated to use English column names and added date_of_birth support
 * - 0.2.0 (2025-01-27): Fixed database table references and field mappings to match actual Supabase structure
 * - 0.1.0 (2025-05-16): Added profile data fetching, updating, and account deletion functionality.
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
    .from("profiles")
    .select("first_name, last_name, phone, updated_at")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116: "row not found"
    console.error("Error fetching profile:", error);
    throw error;
  }
  return data;
}

function populateProfileForm(profile) {
  if (!profile) return;

  // Map database fields to HTML form fields (HTML still uses French field names)
  document.getElementById("nom").value = profile.last_name || "";
  document.getElementById("prenom").value = profile.first_name || "";
  document.getElementById("telephone").value = profile.phone || "";

  // Handle date of birth
  if (profile.date_of_birth) {
    document.getElementById("dateNaissance").value = profile.date_of_birth;
  }

  const memberSinceEl = document.getElementById("memberSince");
  if (memberSinceEl && profile.updated_at) {
    memberSinceEl.textContent = new Date(profile.updated_at).toLocaleDateString(
      "fr-FR"
    );
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
      window.location.href = "/";
      return;
    }
    const user = session.user;

    if (userEmailEl) {
      userEmailEl.textContent = user.email;
    }
    if (memberSinceEl && user.created_at) {
      memberSinceEl.textContent = new Date(user.created_at).toLocaleDateString(
        "fr-FR"
      );
    }

    // Fetch and populate profile
    showLoading("saveProfileBtn");
    const profile = await fetchUserProfile(user.id);
    if (profile) {
      populateProfileForm(profile);
    } else {
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
          );
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

        // Get form values and map to database fields (using English column names)
        const updates = {
          id: user.id,
          last_name: document.getElementById("nom").value.trim(),
          first_name: document.getElementById("prenom").value.trim(),
          phone: document.getElementById("telephone").value.trim(),
          updated_at: new Date().toISOString(),
        };

        // Remove empty fields to avoid constraint violations
        Object.keys(updates).forEach((key) => {
          if (updates[key] === "" && key !== "id" && key !== "updated_at") {
            updates[key] = null;
          }
        });

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
            // First delete the profile
            const { error: profileError } = await supabase
              .from("profiles")
              .delete()
              .eq("id", user.id);

            if (profileError) {
              console.error("Error deleting profile:", profileError);
            }

            // Then try to delete the user account (this might require admin privileges)
            const { error } = await supabase.rpc("delete_user_account");
            if (error) {
              // If RPC doesn't exist, just sign out the user
              console.warn("delete_user_account RPC not available:", error);
              await supabase.auth.signOut();
              showProfileStatus(
                "Profil supprimé. Veuillez contacter l'administrateur pour supprimer complètement votre compte.",
                "info",
                deleteStatusEl
              );
            } else {
              showProfileStatus(
                "Compte supprimé avec succès. Vous allez être déconnecté et redirigé.",
                "success",
                deleteStatusEl
              );
              await supabase.auth.signOut();
            }

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
    const mainErrorContainer = document.getElementById("profileDetails");
    if (mainErrorContainer) {
      mainErrorContainer.innerHTML =
        '<p class="error-message">Impossible de charger les informations du profil. Veuillez réessayer plus tard.</p>';
    }
  }
}

// Initialize the page when DOM is ready
document.addEventListener("DOMContentLoaded", initProfilePage);
