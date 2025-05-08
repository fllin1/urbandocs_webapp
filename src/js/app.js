// public/js/app.js - Main application logic
/**
 * Firebase App
 * @module app
 * @description This module handles the main application logic.
 * @version 0.0.3
 * @author GreyPanda
 * @todo Secure the document links, removing them as secure links.
 *
 * @changelog
 * - 0.0.3 (2025-05-08): Moved Firebase configuration into a separate file.
 * - 0.0.2 (2025-04-27): Added authentication state management and document download functionality.
 * - 0.0.1 (2025-04-21): Initial version with basic document download functionality.
 */

// Import Firebase Auth functions
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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
  // Get references to new UI elements from ui.js
  userStatus,
  loginPrompt,
  logoutBtn,
  loginLink,
} from "./ui.js";

// Import Firebase configuration
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let currentUser = null; // Variable to hold the current user state

// --- Authentication State Management ---
function updateUIForAuthState(user) {
  currentUser = user; // Update global user state
  if (user) {
    // User is signed in
    // Use the correctly imported variable names
    userStatus.textContent = `Connecté: ${user.email}`;
    userStatus.style.display = "block";
    loginPrompt.style.display = "none";
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block"; // Show logout button

    // Enable download button ONLY if a document is already selected and valid
    // The findDocument function will handle enabling/disabling based on auth AND selection
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
      // Keep disabled if no document selected yet, or re-selected after login
      downloadBtn.disabled = true;
      // Optionally reset status message or show a generic logged-in message
      // showStatus("Connecté. Sélectionnez les options pour trouver un document.", "info");
    }
  } else {
    // User is signed out
    // Use the correctly imported variable names
    userStatus.style.display = "none";
    loginPrompt.style.display = "block"; // Show login prompt
    loginLink.style.display = "inline-block"; // Show login link
    logoutBtn.style.display = "none";
    downloadBtn.disabled = true; // Always disable download if logged out
    showStatus(
      "Veuillez vous connecter pour télécharger les documents.",
      "warning"
    );
  }
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  updateUIForAuthState(user);
});

// Logout functionality
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful. UI updated by onAuthStateChanged
      console.log("User signed out successfully.");
      showStatus("Vous avez été déconnecté.", "info");
      // Reset selections? Optional.
      resetSelect(villeSelect, "Sélectionnez une ville");
      resetSelect(zonageSelect, "Sélectionnez d'abord une ville");
      resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
      downloadBtn.disabled = true;
    })
    .catch((error) => {
      console.error("Sign out error:", error);
      showStatus(`Erreur lors de la déconnexion: ${error.message}`, "danger");
    });
});

// --- Document Download Logic ---
// Modified to check currentUser state as an extra precaution
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

  // --- Initialisation on DOMContentLoaded ---
  // The onAuthStateChanged listener handles the initial auth check
});

// Export currentUser for use in api.js
export { currentUser };
