/**
 * Account Deletion Status Module
 * @module accountDeletionStatus
 * @description Handles the account deletion status page functionality
 * @version 1.0.0
 */

import { supabase } from "./supabase-client.js";
import { protectPage, getCurrentUser } from "./auth/auth.js";
import { initDeletionGuard } from "./auth/deletion-guard.js";

let currentUser = null;
let deletionStatus = null;
let countdownInterval = null;

/**
 * Initialize the account deletion status page
 */
export async function initAccountDeletionStatusPage() {
  try {
    // Initialize deletion guard (allow access to this page)
    const canAccess = await initDeletionGuard(true);
    if (!canAccess) {
      return; // Access was blocked
    }

    // Protect the page and get current user
    if (!(await protectPage())) return;

    currentUser = await getCurrentUser();
    if (!currentUser) {
      window.location.href = "/auth/login";
      return;
    }

    // Load deletion status
    await loadDeletionStatus();

    // Setup event listeners
    setupEventListeners();

    // Load footer
    await loadFooter();
  } catch (error) {
    console.error("Error initializing account deletion status page:", error);
    showError("Erreur lors du chargement de la page");
  }
}

/**
 * Load the account deletion status
 */
async function loadDeletionStatus() {
  try {
    showLoading();

    // Call the account management edge function to get status
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
          action: "status",
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to get deletion status");
    }

    deletionStatus = result.data;

    // Check if account is actually scheduled for deletion
    if (!deletionStatus.deletion_scheduled) {
      // Redirect to profile if no deletion is scheduled
      window.location.href = "/user/profile";
      return;
    }

    // Check if account has already expired
    if (deletionStatus.time_remaining_seconds <= 0) {
      // Account should be deleted, show expired message and logout
      showAccountExpired();
      return;
    }

    // Display the deletion status
    displayDeletionStatus();

    // Start countdown
    startCountdown();

    hideLoading();
  } catch (error) {
    console.error("Error loading deletion status:", error);
    showError("Erreur lors du chargement du statut de suppression");
  }
}

/**
 * Show account expired message
 */
function showAccountExpired() {
  hideLoading();

  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="container">
        <div class="deletion-status-card">
          <div class="deletion-header">
            <div class="deletion-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h1>Compte supprimé</h1>
          </div>
          
          <div class="deletion-details">
            <p class="deletion-message">
              Votre compte a été définitivement supprimé.
            </p>
            <p class="deletion-warning">
              Toutes vos données ont été effacées de nos serveurs.
            </p>
          </div>
          
          <div class="deletion-actions">
            <button id="logout-btn" class="btn btn-primary">
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    `;

    // Add logout event listener
    document
      .getElementById("logout-btn")
      .addEventListener("click", async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
      });

    mainContent.style.display = "block";
  }

  // Auto logout after 5 seconds
  setTimeout(async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  }, 5000);
}

/**
 * Display the deletion status information
 */
function displayDeletionStatus() {
  const deletionDate = new Date(deletionStatus.deletion_scheduled_for);
  const formattedDate = deletionDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit", // Add seconds for testing
  });

  // Update deletion date
  document.getElementById("deletion-date").textContent = formattedDate;

  // Show deletion reason if available
  if (
    deletionStatus.deletion_reason &&
    deletionStatus.deletion_reason !== "User requested account deletion"
  ) {
    const reasonContainer = document.getElementById(
      "deletion-reason-container"
    );
    const reasonElement = document.getElementById("deletion-reason");
    reasonElement.textContent = deletionStatus.deletion_reason;
    reasonContainer.style.display = "block";
  }

  // Update countdown
  updateCountdown();
}

/**
 * Start the countdown timer
 */
function startCountdown() {
  // Update immediately
  updateCountdown();

  // Update every second for testing (was every minute)
  countdownInterval = setInterval(updateCountdown, 1000);
}

/**
 * Update the countdown display
 */
function updateCountdown() {
  const now = new Date();
  const deletionDate = new Date(deletionStatus.deletion_scheduled_for);
  const timeDiff = deletionDate.getTime() - now.getTime();

  if (timeDiff <= 0) {
    // Account should be deleted
    document.getElementById("days-remaining").textContent = "0";
    document.getElementById("hours-remaining").textContent = "0";

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    showStatusMessage("Votre compte a été supprimé.", "error");

    // Disable cancel button
    const cancelBtn = document.getElementById("cancel-deletion-btn");
    if (cancelBtn) {
      cancelBtn.disabled = true;
      cancelBtn.textContent = "Compte supprimé";
    }

    // Auto logout after 3 seconds
    setTimeout(async () => {
      await supabase.auth.signOut();
      window.location.href = "/";
    }, 3000);

    return;
  }

  // For testing with seconds, show seconds instead of days/hours
  const totalSeconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Update display to show minutes and seconds for testing
  document.getElementById("days-remaining").textContent = minutes.toString();
  document.getElementById("hours-remaining").textContent = seconds.toString();

  // Update labels for testing
  const daysLabel = document.querySelector(
    ".countdown-item:first-child .countdown-label"
  );
  const hoursLabel = document.querySelector(
    ".countdown-item:last-child .countdown-label"
  );
  if (daysLabel) daysLabel.textContent = "minutes";
  if (hoursLabel) hoursLabel.textContent = "secondes";
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Cancel deletion button
  const cancelBtn = document.getElementById("cancel-deletion-btn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", handleCancelDeletion);
  }

  // Logout button
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
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
    const cancelBtn = document.getElementById("cancel-deletion-btn");
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

    showStatusMessage("Suppression de compte annulée avec succès !", "success");

    // Redirect to profile after a short delay
    setTimeout(() => {
      window.location.href = "/user/profile";
    }, 2000);
  } catch (error) {
    console.error("Error canceling deletion:", error);
    showStatusMessage("Erreur lors de l'annulation de la suppression", "error");

    // Re-enable button
    const cancelBtn = document.getElementById("cancel-deletion-btn");
    cancelBtn.textContent = "Annuler la suppression";
    cancelBtn.disabled = false;
  }
}

/**
 * Handle logout
 */
async function handleLogout() {
  try {
    await supabase.auth.signOut();
    window.location.href = "/";
  } catch (error) {
    console.error("Error during logout:", error);
    // Force redirect even if logout fails
    window.location.href = "/";
  }
}

/**
 * Load footer component
 */
async function loadFooter() {
  try {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder && window.loadFooter) {
      await window.loadFooter();
    }
  } catch (error) {
    console.warn("Could not load footer:", error);
  }
}

/**
 * Show loading state
 */
function showLoading() {
  document.getElementById("loading-state").style.display = "flex";
  document.getElementById("main-content").style.display = "none";
  document.getElementById("error-state").style.display = "none";
}

/**
 * Hide loading state
 */
function hideLoading() {
  document.getElementById("loading-state").style.display = "none";
  document.getElementById("main-content").style.display = "block";
  document.getElementById("error-state").style.display = "none";
}

/**
 * Show error state
 */
function showError(message) {
  document.getElementById("loading-state").style.display = "none";
  document.getElementById("main-content").style.display = "none";
  document.getElementById("error-state").style.display = "flex";
  document.getElementById("error-message").textContent = message;
}

/**
 * Show status message
 */
function showStatusMessage(message, type = "info") {
  const statusElement = document.getElementById("status-message");
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.className = `status-message ${type}`;
    statusElement.classList.remove("hidden");

    // Auto-hide after 5 seconds for success messages
    if (type === "success") {
      setTimeout(() => {
        statusElement.classList.add("hidden");
      }, 5000);
    }
  }
}

/**
 * Cleanup function
 */
function cleanup() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

// Cleanup on page unload
window.addEventListener("beforeunload", cleanup);

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAccountDeletionStatusPage);
} else {
  initAccountDeletionStatusPage();
}
