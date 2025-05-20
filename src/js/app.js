// public/js/app.js - Main application logic
/**
 * Firebase App
 * @module app
 * @description This module handles the main application logic.
 * @version 0.0.5
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.5 (2025-05-13): Adding account button to the profile page, correcting the login prompt.
 * - 0.0.4 (2025-05-09): Modified the authentication state management to use Supabase Auth system.
 * - 0.0.3 (2025-05-08): Moved Firebase configuration into a separate file.
 * - 0.0.2 (2025-04-27): Added authentication state management and document download functionality with Firebase Auth.
 * - 0.0.1 (2025-04-21): Initial version with basic document download functionality.
 */

// Import Supabase Client
import { supabase } from "./supabase-client.js";

// Import API functions
import {
  loadVilles,
  loadZonages,
  loadZones,
  findDocument,
  getSelectedDocument, // Function to get the document details from api.js
} from "./api.js";

// Import UI elements and functions
import {
  villeSelect,
  zonageSelect,
  zoneSelect,
  synthesisBtn,
  showStatus,
  resetSelect,
  formatApiName,
  // References to UI elements from ui.js
  userStatus,
  logoutBtn,
  loginLink,
  signupLink,
} from "./ui.js";

import * as authModule from "./auth/auth.js";

let currentUser = null; // Variable to hold the current user state

// --- Authentication State Management ---
function updateUIForAuthState(user) {
  currentUser = user; // Update global user state
  if (user) {
    // User is signed in
    if (userStatus) {
      userStatus.classList.remove("hidden");
    }
    if (loginLink) loginLink.classList.add("hidden");
    if (signupLink) signupLink.classList.add("hidden");
    if (logoutBtn) logoutBtn.classList.remove("hidden");

    const selectedDocument = getSelectedDocument();
    if (selectedDocument && selectedDocument.id) {
      if (synthesisBtn) synthesisBtn.disabled = false;
      showStatus(
        `Document trouvé (Source: ${
          formatApiName(selectedDocument.source_plu_date) || "Non spécifiée"
        }). Prêt à consulter.`,
        "success"
      );
    } else {
      if (synthesisBtn) synthesisBtn.disabled = true;
    }
  } else {
    // User is signed out
    if (userStatus) userStatus.classList.add("hidden");
    if (loginLink) loginLink.classList.remove("hidden");
    if (signupLink) signupLink.classList.remove("hidden");
    if (logoutBtn) logoutBtn.classList.add("hidden");
    if (synthesisBtn) synthesisBtn.disabled = true; // Always disable download if logged out
  }
}

supabase.auth.onAuthStateChange((event, session) => {
  const user = session?.user || null;

  authModule.setCurrentUser(user);

  updateUIForAuthState(user);

  if (event === "SIGNED_OUT") {
    console.log("Event SIGNED_OUT received. Redirecting.");
    // localStorage.removeItem("currentUser"); // This is handled by authModule.setCurrentUser(null)
    window.location.href = "/";
  } else if (event === "SIGNED_IN") {
    console.log("Event SIGNED_IN received. User data:", user.email);
    // User is signed in. session.user has details.
    // Login.js handles redirect after login, so no specific action here unless needed.
  } else if (event === "INITIAL_SESSION") {
    console.log("Event INITIAL_SESSION received. User data:", user.email);
  } else if (event === "TOKEN_REFRESHED") {
    console.log("Event TOKEN_REFRESHED received. User data:", user.email);
  }
});

// Logout functionality
logoutBtn.addEventListener("click", async () => {
  showStatus("Déconnexion...", "info");
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out with Supabase:", error.message);
    showStatus(`Erreur lors de la déconnexion: ${error.message}`, "danger");
  } else {
    console.log(
      "Supabase signOut successful. onAuthStateChange will handle UI and redirect."
    );
  }
});

// --- Document Download Logic ---
function downloadDocument() {
  if (!currentUser) {
    showStatus("Authentification requise pour télécharger.", "warning");
    synthesisBtn.disabled = true;
    return; // Exit if not authenticated
  }

  const selectedDocument = getSelectedDocument(); // Get from api.js
  if (selectedDocument && selectedDocument.id) {
    showStatus("Ouverture du document...", "info");
    window.open(`/plu-summary?id=${selectedDocument.id}`, "_blank");
    // Re-display success message after a delay
    setTimeout(() => {
      // Check if button is still enabled (i.e., document is still considered valid)
      if (!synthesisBtn.disabled) {
        showStatus(
          `Document trouvé (Source: ${
            formatApiName(selectedDocument.source_plu_date) || "Non spécifiée"
          }). Prêt à consulter.`,
          "success"
        );
      }
    }, 1500);
  } else {
    showStatus("Lien du document non disponible.", "warning");
    synthesisBtn.disabled = true; // Ensure button is disabled if no URL
  }
}

// === Event listeners ===
villeSelect.addEventListener("change", (event) => {
  const villeId = event.target.value;
  loadZonages(villeId); // Call API function
});

zonageSelect.addEventListener("change", (event) => {
  const zonageId = event.target.value;
  loadZones(zonageId); // Call API function
});

zoneSelect.addEventListener("change", (event) => {
  const zoneId = event.target.value;
  const zonageId = zonageSelect.value; // Get current zonage selection
  // TODO : typologieSelect logic
  if (zoneId && zonageId) {
    findDocument(zonageId, zoneId, "d6cd2337-5803-4802-a208-1cfa4eeba905"); // Call API function
  } else {
    showStatus("Veuillez d'abord sélectionner un zonage.", "warning");
  }
  // if (zonageId) {
  //   loadTypologies(zoneId, zonageId); // Call API function
  // } else {
  //   showStatus("Veuillez d'abord sélectionner un zonage.", "warning");
  // }
});

// typologieSelect.addEventListener("change", (event) => {
//   const typologieId = event.target.value;
//   const zoneId = zoneSelect.value;
//   const zonageId = zonageSelect.value;
//   if (zoneId && zonageId) {
//     findDocument(zonageId, zoneId, typologieId); // Call API function
//   } else {
//     showStatus(
//       "Veuillez d'abord sélectionner un zonage et une zone.",
//       "warning"
//     );
//   }
// });

synthesisBtn.addEventListener("click", downloadDocument);

// === Initialisation ===
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize UI state
  resetSelect(villeSelect, "Chargement...");
  resetSelect(zonageSelect, "Sélectionnez d'abord une ville");
  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
  // resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
  if (synthesisBtn) synthesisBtn.disabled = true;
  // showStatus("Initialisation...", "info"); // This might be premature or overridden

  // The onAuthStateChange listener is set up above and will call updateUIForAuthState.
  // It handles INITIAL_SESSION, which should cover the user's state on page load.
  // Explicitly calling getCurrentUser and updateUIForAuthState here might be redundant
  // or could cause a flicker if onAuthStateChange hasn't fired yet with the true state.
  // However, it can be a fallback. Let's ensure it only updates if elements exist.

  const initiallyStoredUser = authModule.getCurrentUser();
  updateUIForAuthState(initiallyStoredUser); // This will set the initial UI based on localStorage

  // Load initial data if on the main page
  if (villeSelect && zonageSelect && zoneSelect) {
    showStatus("Initialisation...", "info"); // Show this only when relevant selectors are present
    resetSelect(villeSelect, "Chargement...");
    resetSelect(zonageSelect, "Sélectionnez d'abord une ville");
    resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
    // resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
    await loadVilles(); // Start loading cities
  } else {
    // If not on the main page with selectors, ensure a relevant status or clear it
    // For example, on login/signup pages, statusMessage might be used for other things.
    // If statusMessage exists and isn't meant for auth state here, clear it or set appropriately.
    // This depends on whether statusMessage is a shared element or page-specific.
    // For now, we assume updateUIForAuthState handles its part of status messages related to login prompt.
  }
});

// Export currentUser for use in api.js
export { currentUser };
