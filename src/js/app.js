// public/js/app.js - Main application logic

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
  formatApiName, // Keep formatApiName accessible if needed directly here, though it's mainly used in api.js via ui.js
} from "./ui.js";

/**
 * Opens the selected document in a new tab.
 * Retrieves the document details using getSelectedDocument from api.js.
 */
function downloadDocument() {
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

  // --- FirebaseUI Configuration ---
  // Check if FirebaseUI is loaded
  if (typeof firebaseui !== "undefined" && window.firebaseAuth) {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(window.firebaseAuth);

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          console.log("Sign-in successful!", authResult);
          showStatus(`Bienvenue ${authResult.user.email}!`, "success");
          // Hide the sign-in container after success?
          // document.getElementById('firebaseui-auth-container').style.display = 'none';
          return false; // Prevent redirect
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          // document.getElementById('loader').style.display = 'none';
          console.log("FirebaseUI widget shown.");
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of redirect flow.
      signInFlow: "popup",
      // We will display Email as auth provider.
      signInOptions: [
        // Use the constant provided by the globally loaded Firebase library
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      // tosUrl: '<your-tos-url>', // Optional
      // Privacy policy url.
      // privacyPolicyUrl: '<your-privacy-policy-url>' // Optional
    };

    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  } else {
    console.error(
      "FirebaseUI or Firebase Auth not loaded. Cannot start Auth UI."
    );
    showStatus(
      "Erreur: Impossible d'initialiser le module d'authentification.",
      "danger"
    );
  }
  // --- End FirebaseUI Configuration ---
});
