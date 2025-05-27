// public/js/app.js - Main application logic
/**
 * Firebase App
 * @module app
 * @description This module handles the main application logic.
 * @version 0.0.6
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.6 (2025-01-XX): Refactored to use shared header authentication module
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
  loadCities,
  loadZonings,
  loadZones,
  findDocument,
  getSelectedDocument, // Function to get the document details from api.js
} from "./api.js";

// Import UI elements and functions
import {
  citySelect,
  zoningSelect,
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
import {
  initHeaderAuth,
  getCurrentUser as getHeaderCurrentUser,
} from "./auth/header-auth.js";

let currentUser = null; // Variable to hold the current user state

// --- Authentication State Management ---
function updateUIForAuthState(user) {
  currentUser = user; // Update global user state
  if (user) {
    // User is signed in - update synthesis button state
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
    // User is signed out - disable synthesis button
    if (synthesisBtn) synthesisBtn.disabled = true; // Always disable download if logged out
  }
}

// Custom auth state change listener for app-specific functionality
supabase.auth.onAuthStateChange((event, session) => {
  const user = session?.user || null;

  // Update app-specific UI state (synthesis button, etc.)
  updateUIForAuthState(user);

  if (event === "SIGNED_OUT") {
    console.log("App: User signed out");
  } else if (event === "SIGNED_IN") {
    console.log("App: User signed in");
  } else if (event === "INITIAL_SESSION") {
    console.log("App: Initial session loaded");
  } else if (event === "TOKEN_REFRESHED") {
    console.log("App: Token refreshed");
  }
});

// --- Document Download Logic ---
function downloadDocument() {
  const user = getHeaderCurrentUser(); // Get user from header auth module
  if (!user) {
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
citySelect.addEventListener("change", (event) => {
  const cityId = event.target.value;
  loadZonings(cityId); // Call API function
});

zoningSelect.addEventListener("change", (event) => {
  const zoningId = event.target.value;
  loadZones(zoningId); // Call API function
});

zoneSelect.addEventListener("change", (event) => {
  const zoneId = event.target.value;
  const zoningId = zoningSelect.value; // Get current zoning selection
  // TODO : typologieSelect logic
  if (zoneId && zoningId) {
    findDocument(zoningId, zoneId, "7c0f2830-f3fc-4c69-911c-470286f91982"); // Call API function
  } else {
    showStatus("Veuillez d'abord sélectionner un zoning.", "warning");
  }
  // if (zoningId) {
  //   loadTypologies(zoneId, zoningId); // Call API function
  // } else {
  //   showStatus("Veuillez d'abord sélectionner un zoning.", "warning");
  // }
});

// typologieSelect.addEventListener("change", (event) => {
//   const typologieId = event.target.value;
//   const zoneId = zoneSelect.value;
//   const zoningId = zoningSelect.value;
//   if (zoneId && zoningId) {
//     findDocument(zoningId, zoneId, typologieId); // Call API function
//   } else {
//     showStatus(
//       "Veuillez d'abord sélectionner un zoning et une zone.",
//       "warning"
//     );
//   }
// });

synthesisBtn.addEventListener("click", downloadDocument);

// === Initialisation ===
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize header authentication first
  initHeaderAuth();

  // Initialize UI state
  resetSelect(citySelect, "Chargement...");
  resetSelect(zoningSelect, "Sélectionnez d'abord une ville");
  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
  // resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
  if (synthesisBtn) synthesisBtn.disabled = true;

  // Load initial data if on the main page
  if (citySelect && zoningSelect && zoneSelect) {
    showStatus("Initialisation...", "info"); // Show this only when relevant selectors are present
    await loadCities(); // Start loading cities
  }
});

// Export currentUser for use in api.js
export { currentUser };
