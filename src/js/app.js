// public/js/app.js - Main application logic
/**
 * Firebase App
 * @module app
 * @description This module handles the main application logic.
 * @version 0.0.4
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.4 (2025-05-09): Modified the authentication state management to use Supabase Auth system.
 * - 0.0.3 (2025-05-08): Moved Firebase configuration into a separate file.
 * - 0.0.2 (2025-04-27): Added authentication state management and document download functionality with Firebase Auth.
 * - 0.0.1 (2025-04-21): Initial version with basic document download functionality.
 */

// Import Firebase Auth functions
import { initializeApp } from "firebase/app";
import { supabase } from "./supabase-client.js";

// Import API functions
import {
  loadVilles,
  loadZonages,
  loadZones,
  loadTypologies,
  findDocument,
  getSelectedDocument, // Function to get the document details from api.js
} from "./api.js";

// Import UI elements and functions
import {
  villeSelect,
  zonageSelect,
  zoneSelect,
  // TODO : Uncomment when typologieSelect is available
  // typologieSelect,
  downloadBtn,
  showStatus,
  resetSelect,
  formatApiName,
  // Get references to UI elements from ui.js
  userStatus,
  loginPrompt,
  logoutBtn,
  loginLink,
  signupLink,
} from "./ui.js";

import * as authModule from "./auth/auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
let currentUser = null; // Variable to hold the current user state

console.log("[app.js] Top of app.js. Imported supabase object:", supabase);
if (supabase && supabase.auth) {
  console.log("[app.js] supabase.auth object available:", supabase.auth);
  console.log(
    "[app.js] typeof supabase.auth.onAuthStateChanged before use:",
    typeof supabase.auth.onAuthStateChanged
  );
} else {
  console.error(
    "[app.js] supabase or supabase.auth is not available or incorrect at the point of use!"
  );
}

// --- Authentication State Management ---
function updateUIForAuthState(user) {
  console.log("[app.js] updateUIForAuthState called with user:", user);
  currentUser = user; // Update global user state
  if (user) {
    console.log("[app.js] User is signed in. Updating UI for logged-in state.");
    // User is signed in
    userStatus.textContent = `Connecté: ${user.email}`;
    userStatus.style.display = "block";
    loginPrompt.style.display = "none";
    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    logoutBtn.style.display = "inline-block"; // Show logout button

    const selectedDocument = getSelectedDocument();
    if (selectedDocument && selectedDocument.plu_url) {
      downloadBtn.disabled = false;
      showStatus(
        `Document trouvé (Source: ${
          formatApiName(selectedDocument.source_plu_date) || "Non spécifiée"
        }). Prêt à consulter.`,
        "success"
      );
    } else {
      downloadBtn.disabled = true;
    }
  } else {
    console.log(
      "[app.js] User is signed out. Updating UI for logged-out state."
    );
    // User is signed out
    userStatus.style.display = "none";
    loginPrompt.style.display = "block"; // Show login prompt
    if (loginLink) loginLink.style.display = "inline-block";
    if (signupLink) signupLink.style.display = "inline-block";
    logoutBtn.style.display = "none";
    downloadBtn.disabled = true; // Always disable download if logged out
    showStatus(
      "Veuillez vous connecter pour télécharger les documents.",
      "warning"
    );
  }
}

supabase.auth.onAuthStateChange((event, session) => {
  console.log("[app.js] Supabase auth event:", event, "Session:", session);
  const user = session?.user || null;
  console.log("[app.js] User extracted from session:", user);

  authModule.setCurrentUser(user);
  console.log(
    "[app.js] Called authModule.setCurrentUser. Current localStorage 'currentUser':",
    localStorage.getItem("currentUser")
  );

  updateUIForAuthState(user);

  if (event === "SIGNED_OUT") {
    console.log("[app.js] Event SIGNED_OUT received. Redirecting.");
    // localStorage.removeItem("currentUser"); // This is handled by authModule.setCurrentUser(null)
    window.location.href = "/index.html";
  } else if (event === "SIGNED_IN") {
    console.log("[app.js] Event SIGNED_IN received. User data:", user);
    // User is signed in. session.user has details.
    // Login.js handles redirect after login, so no specific action here unless needed.
  } else if (event === "INITIAL_SESSION") {
    console.log("[app.js] Event INITIAL_SESSION received. User data:", user);
  } else if (event === "TOKEN_REFRESHED") {
    console.log("[app.js] Event TOKEN_REFRESHED received. User data:", user);
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
    downloadBtn.disabled = true;
    return; // Exit if not authenticated
  }

  const selectedDocument = getSelectedDocument(); // Get from api.js
  if (selectedDocument && selectedDocument.plu_url) {
    showStatus("Ouverture du document...", "info");
    window.open(selectedDocument.plu_url, "_blank");
    // Re-display success message after a delay
    setTimeout(() => {
      // Check if button is still enabled (i.e., document is still considered valid)
      if (!downloadBtn.disabled) {
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
    downloadBtn.disabled = true; // Ensure button is disabled if no URL
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
  // TODO : Remove the if/else right bellow when typologieSelect is available
  if (zoneId && zonageId) {
    findDocument(zonageId, zoneId, "d6cd2337-5803-4802-a208-1cfa4eeba905"); // Call API function
  } else {
    showStatus("Veuillez d'abord sélectionner un zonage.", "warning");
  }
  // TODO : Uncomment when typologieSelect is available
  // if (zonageId) {
  //   loadTypologies(zoneId, zonageId); // Call API function
  // } else {
  //   showStatus("Veuillez d'abord sélectionner un zonage.", "warning");
  // }
});

// TODO : Uncomment when typologieSelect is available
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

downloadBtn.addEventListener("click", downloadDocument);

// === Initialisation ===
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize UI state
  resetSelect(villeSelect, "Chargement...");
  resetSelect(zonageSelect, "Sélectionnez d'abord une ville");
  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
  // resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
  downloadBtn.disabled = true;
  showStatus("Initialisation...", "info");

  // Load initial data
  await loadVilles(); // Start loading cities
});

// Export currentUser for use in api.js
export { currentUser };
