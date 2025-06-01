// src/auth/profile.js
/**
 * Profile Module
 * @module profile
 * @description Handles user profile management, including data fetching, updates, and account deletion.
 * @version 0.3.0
 *
 * @changelog
 * - 0.3.0 (2025-01-27): Updated account deletion to use 30-day grace period system
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
import { initDeletionGuard } from "./deletion-guard.js";

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
    .select(
      "first_name, last_name, phone, updated_at, deletion_requested_at, deletion_scheduled_for"
    )
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
  const firstNameEl = document.getElementById("firstName");
  const lastNameEl = document.getElementById("lastName");
  const phoneEl = document.getElementById("phone");

  if (firstNameEl && profile.first_name) {
    firstNameEl.value = profile.first_name;
  }
  if (lastNameEl && profile.last_name) {
    lastNameEl.value = profile.last_name;
  }
  if (phoneEl && profile.phone) {
    phoneEl.value = profile.phone;
  }
}

async function updateUserProfile(userId, profileData) {
  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
  return data;
}

export async function initProfilePage() {
  // Initialize deletion guard first
  const canAccess = await initDeletionGuard(false);
  if (!canAccess) {
    return; // Access was blocked
  }

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

      // Check if account deletion is scheduled
      if (profile.deletion_scheduled_for) {
        updateDeleteAccountSection(profile);
      }
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
        const deleteStatusEl = "profileFormStatus";
        document.getElementById(deleteStatusEl).classList.add("hidden");

        showLoading("saveProfileBtn");
        try {
          const formData = new FormData(profileForm);
          const profileData = {
            first_name: formData.get("firstName") || null,
            last_name: formData.get("lastName") || null,
            phone: formData.get("phone") || null,
            updated_at: new Date().toISOString(),
          };

          await updateUserProfile(user.id, profileData);
          showProfileStatus(
            "Profil mis à jour avec succès !",
            "success",
            deleteStatusEl
          );
        } catch (error) {
          console.error("Error updating profile:", error);
          showProfileStatus(
            `Erreur lors de la mise à jour: ${error.message}`,
            "error",
            deleteStatusEl
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
            "Êtes-vous sûr de vouloir programmer la suppression de votre compte ? Votre compte sera supprimé dans 30 secondes pour le test, mais vous pourrez annuler cette action à tout moment avant la suppression définitive."
          )
        ) {
          showLoading("deleteAccountBtn");
          try {
            // Call the account management edge function to schedule deletion
            const { data: session } = await supabase.auth.getSession();
            if (!session?.session?.access_token) {
              throw new Error("No valid session");
            }

            const response = await fetch(
              `${supabase.supabaseUrl}/functions/v1/account-management`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session.session.access_token}`,
                },
                body: JSON.stringify({
                  action: "schedule",
                  reason: "User requested account deletion from profile page",
                }),
              }
            );

            const result = await response.json();

            if (!result.success) {
              throw new Error(result.error || "Failed to schedule deletion");
            }

            showProfileStatus(
              "Suppression de compte programmée pour dans 30 secondes. Vous pouvez annuler cette action à tout moment.",
              "info",
              deleteStatusEl
            );

            // Update the delete account section
            setTimeout(async () => {
              const updatedProfile = await fetchUserProfile(user.id);
              if (updatedProfile) {
                updateDeleteAccountSection(updatedProfile);
              }
            }, 1000);
          } catch (error) {
            console.error("Error scheduling account deletion:", error);
            showProfileStatus(
              `Erreur lors de la programmation de suppression: ${error.message}`,
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

/**
 * Update the delete account section based on deletion status
 */
function updateDeleteAccountSection(profile) {
  const deleteSection = document.getElementById("deleteAccountSection");
  const deleteBtn = document.getElementById("deleteAccountBtn");

  if (!deleteSection || !deleteBtn) return;

  if (profile.deletion_scheduled_for) {
    const deletionDate = new Date(profile.deletion_scheduled_for);
    const now = new Date();
    const secondsRemaining = Math.ceil(
      (deletionDate.getTime() - now.getTime()) / 1000
    );

    // Update section content
    deleteSection.innerHTML = `
      <h3 class="margin-bottom-sm">Suppression de compte programmée</h3>
      <div class="deletion-warning">
        <p class="margin-bottom-sm">
          ⚠️ Votre compte sera supprimé dans <strong>${secondsRemaining} seconde(s)</strong> 
          (le ${deletionDate.toLocaleDateString(
            "fr-FR"
          )} à ${deletionDate.toLocaleTimeString("fr-FR")}).
        </p>
        <p class="margin-bottom-sm">
          Vous pouvez annuler cette suppression à tout moment avant la date prévue.
        </p>
      </div>
      <div class="deletion-actions">
        <button id="cancelDeletionBtn" class="btn btn-primary">
          Annuler la suppression
        </button>
        <button id="viewDeletionStatusBtn" class="btn btn-secondary">
          Voir le statut détaillé
        </button>
      </div>
      <div id="deleteStatusMessage" class="status-message hidden margin-top-sm"></div>
    `;

    // Add event listeners for new buttons
    const cancelBtn = document.getElementById("cancelDeletionBtn");
    const viewStatusBtn = document.getElementById("viewDeletionStatusBtn");

    if (cancelBtn) {
      cancelBtn.addEventListener("click", handleCancelDeletion);
    }

    if (viewStatusBtn) {
      viewStatusBtn.addEventListener("click", () => {
        window.location.href = "/user/account-deletion-status";
      });
    }
  }
}

/**
 * Handle canceling account deletion
 */
async function handleCancelDeletion() {
  if (
    !confirm(
      "Êtes-vous sûr de vouloir annuler la suppression de votre compte ?"
    )
  ) {
    return;
  }

  try {
    const cancelBtn = document.getElementById("cancelDeletionBtn");
    const originalText = cancelBtn.textContent;
    cancelBtn.textContent = "Annulation...";
    cancelBtn.disabled = true;

    // Call the account management edge function to cancel deletion
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.access_token) {
      throw new Error("No valid session");
    }

    const response = await fetch(
      `${supabase.supabaseUrl}/functions/v1/account-management`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.session.access_token}`,
        },
        body: JSON.stringify({
          action: "cancel",
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to cancel deletion");
    }

    showProfileStatus(
      "Suppression de compte annulée avec succès !",
      "success",
      "deleteStatusMessage"
    );

    // Restore original delete account section
    setTimeout(() => {
      const deleteSection = document.getElementById("deleteAccountSection");
      if (deleteSection) {
        deleteSection.innerHTML = `
          <h3 class="margin-bottom-sm">Supprimer le compte</h3>
          <p class="margin-bottom-sm">
            Attention : Cette action programmera la suppression de votre compte dans 30 secondes pour le test. 
            Vous pourrez annuler cette action à tout moment avant la suppression définitive.
          </p>
          <button id="deleteAccountBtn" class="btn btn-danger">
            Programmer la suppression de mon compte
          </button>
          <div id="deleteStatusMessage" class="status-message hidden margin-top-sm"></div>
        `;

        // Re-add event listener
        const newDeleteBtn = document.getElementById("deleteAccountBtn");
        if (newDeleteBtn) {
          newDeleteBtn.addEventListener("click", async () => {
            // Re-run the delete account logic
            location.reload(); // Simple solution: reload the page
          });
        }
      }
    }, 2000);
  } catch (error) {
    console.error("Error canceling deletion:", error);
    showProfileStatus(
      "Erreur lors de l'annulation de la suppression",
      "error",
      "deleteStatusMessage"
    );

    // Re-enable button
    const cancelBtn = document.getElementById("cancelDeletionBtn");
    if (cancelBtn) {
      cancelBtn.textContent = "Annuler la suppression";
      cancelBtn.disabled = false;
    }
  }
}

// Initialize the page when DOM is ready
document.addEventListener("DOMContentLoaded", initProfilePage);
