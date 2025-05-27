/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/api.js":
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findDocument: () => (/* binding */ findDocument),
/* harmony export */   getSelectedDocument: () => (/* binding */ getSelectedDocument),
/* harmony export */   loadCities: () => (/* binding */ loadCities),
/* harmony export */   loadZones: () => (/* binding */ loadZones),
/* harmony export */   loadZonings: () => (/* binding */ loadZonings)
/* harmony export */ });
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supabase-client.js */ "./src/js/supabase-client.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.js */ "./src/js/ui.js");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.js */ "./src/js/app.js");
// src/js/api.js
/**
 * Supabase API
 * @module api
 * @description This module handles API calls to fetch data for cities, zoning, zones, and typologies.
 * @version 0.1.0
 * @author GreyPanda
 * @todo
 *
 * @changelog
 * - 0.1.0 (2025-05-15): Migrating Supabase API calls for improved performance.
 * - 0.0.1 (2025-04-26): Separate module for API calls to improve code organization and maintainability.
 */

// Import UI functions and elements (will be defined in ui.js)





// Variable to store the fetched document details
let selectedDocument = null;

/**
 * Fetches cities from Supabase
 */
async function loadCities() {
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.toggleSpinner)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.citySpinner, true);
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Chargement des cities...", "info");
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.citySelect.disabled = true;

  try {
    const { data, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
      .from("cities")
      .select("id, name")
      .order("name");

    if (error) throw error;

    const hasData = (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.populateSelect)(
      _ui_js__WEBPACK_IMPORTED_MODULE_1__.citySelect,
      data.map((city) => ({ id: city.id, name: city.name })),
      "Sélectionnez une city",
      "Aucune ville disponible",
      "city"
    );

    if (hasData) {
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)(`Villes chargées : ${data.length}`, "info");
    } else if (_app_js__WEBPACK_IMPORTED_MODULE_2__.currentUser === null) {
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)(
        "Veuillez vous connecter pour accéder aux données.",
        "warning"
      );
    } else {
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Aucune ville n'a été trouvée.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des cities:", error);
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.citySelect, "Erreur chargement");
  } finally {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.toggleSpinner)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.citySpinner, false);
  }
}

/**
 * Fetches zonings for a city from Supabase
 */
async function loadZonings(cityId) {
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.zoningSelect, "Sélectionnez d'abord une city");
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.zoneSelect, "Sélectionnez d'abord un zoning");
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.synthesisBtn.disabled = true;
  selectedDocument = null;

  if (!cityId) {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Veuillez sélectionner une city.", "info");
    return;
  }

  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.toggleSpinner)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.zoningSpinner, true);
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Chargement des zonings...", "info");
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.zoningSelect.disabled = true;

  try {
    const { data, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
      .from("zonings")
      .select("id, name")
      .eq("city_id", cityId)
      .order("name");

    if (error) throw error;

    const hasData = (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.populateSelect)(
      _ui_js__WEBPACK_IMPORTED_MODULE_1__.zoningSelect,
      data.map((zoning) => ({ id: zoning.id, name: zoning.name })),
      "Sélectionnez un zoning",
      "Aucun zonage disponible",
      "zoning"
    );

    if (hasData) {
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)(`Zonages chargés : ${data.length}`, "info");
    } else {
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Aucun zonage trouvé pour cette city.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des zonings:", error);
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.zoningSelect, "Erreur chargement");
  } finally {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.toggleSpinner)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.zoningSpinner, false);
  }
}

/**
 * Fetches zones for a zoning from Supabase
 */
async function loadZones(zoningId) {
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.zoneSelect, "Sélectionnez d'abord un zoning");
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.synthesisBtn.disabled = true;
  selectedDocument = null;

  if (!zoningId) {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Veuillez sélectionner un zoning.", "info");
    return;
  }

  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.toggleSpinner)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.zoneSpinner, true);
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Chargement des zones...", "info");
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.zoneSelect.disabled = true;

  try {
    const { data, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
      .from("zones")
      .select("id, name")
      .eq("zoning_id", zoningId)
      .order("name");

    if (error) throw error;

    const hasData = (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.populateSelect)(
      _ui_js__WEBPACK_IMPORTED_MODULE_1__.zoneSelect,
      data.map((zone) => ({ id: zone.id, name: zone.name })),
      "Sélectionnez une zone",
      "Aucune zone disponible",
      "zone"
    );

    if (hasData) {
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)(`Zones chargées : ${data.length}`, "info");
    } else {
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Aucune zone trouvée pour ce zoning.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des zones:", error);
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.zoneSelect, "Erreur chargement");
  } finally {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.toggleSpinner)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.zoneSpinner, false);
  }
}

/**
 * Fetches document for a zone from Supabase
 */
async function findDocument(zoningId, zoneId, typologieId) {
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.synthesisBtn.disabled = true;
  selectedDocument = null;

  if (!_app_js__WEBPACK_IMPORTED_MODULE_2__.currentUser) {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)(
      "Veuillez vous connecter pour accéder aux documents.",
      "warning"
    );
    return;
  }

  if (!zoningId || !zoneId) {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Sélection incomplète pour rechercher le document.", "info");
    return;
  }

  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.toggleSpinner)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.documentSpinner, true);
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Recherche du document...", "info");

  try {
    const { data, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
      .from("documents")
      .select("id, source_plu_date")
      .eq("zoning_id", zoningId)
      .eq("zone_id", zoneId)
      .eq("typology_id", typologieId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Aucun document trouvé pour cette zone.", "warning");
        return;
      }
      throw error;
    }

    selectedDocument = data;

    if (_app_js__WEBPACK_IMPORTED_MODULE_2__.currentUser && data?.id) {
      _ui_js__WEBPACK_IMPORTED_MODULE_1__.synthesisBtn.disabled = false;
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)(
        `Document trouvé (Source: ${
          (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.formatApiName)(data.source_plu_date) || "Non spécifiée"
        }). Prêt à consulter.`,
        "success"
      );
    } else {
      selectedDocument = null;
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)("Document trouvé mais lien manquant.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors de la recherche du document:", error);
    selectedDocument = null;
  } finally {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_1__.toggleSpinner)(_ui_js__WEBPACK_IMPORTED_MODULE_1__.documentSpinner, false);
  }
}

function getSelectedDocument() {
  return selectedDocument;
}




/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentUser: () => (/* binding */ currentUser)
/* harmony export */ });
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supabase-client.js */ "./src/js/supabase-client.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./src/js/api.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui.js */ "./src/js/ui.js");
/* harmony import */ var _auth_auth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/auth.js */ "./src/js/auth/auth.js");
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


// Import API functions


// Import UI elements and functions




let currentUser = null; // Variable to hold the current user state

// --- Authentication State Management ---
function updateUIForAuthState(user) {
  currentUser = user; // Update global user state
  if (user) {
    // User is signed in
    if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.userStatus) {
      _ui_js__WEBPACK_IMPORTED_MODULE_2__.userStatus.classList.remove("hidden");
    }
    if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.loginLink) _ui_js__WEBPACK_IMPORTED_MODULE_2__.loginLink.classList.add("hidden");
    if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.signupLink) _ui_js__WEBPACK_IMPORTED_MODULE_2__.signupLink.classList.add("hidden");
    if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.logoutBtn) _ui_js__WEBPACK_IMPORTED_MODULE_2__.logoutBtn.classList.remove("hidden");

    const selectedDocument = (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getSelectedDocument)();
    if (selectedDocument && selectedDocument.id) {
      if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn) _ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn.disabled = false;
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.showStatus)(
        `Document trouvé (Source: ${
          (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.formatApiName)(selectedDocument.source_plu_date) || "Non spécifiée"
        }). Prêt à consulter.`,
        "success"
      );
    } else {
      if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn) _ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn.disabled = true;
    }
  } else {
    // User is signed out
    if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.userStatus) _ui_js__WEBPACK_IMPORTED_MODULE_2__.userStatus.classList.add("hidden");
    if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.loginLink) _ui_js__WEBPACK_IMPORTED_MODULE_2__.loginLink.classList.remove("hidden");
    if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.signupLink) _ui_js__WEBPACK_IMPORTED_MODULE_2__.signupLink.classList.remove("hidden");
    if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.logoutBtn) _ui_js__WEBPACK_IMPORTED_MODULE_2__.logoutBtn.classList.add("hidden");
    if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn) _ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn.disabled = true; // Always disable download if logged out
  }
}

_supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.onAuthStateChange((event, session) => {
  const user = session?.user || null;

  _auth_auth_js__WEBPACK_IMPORTED_MODULE_3__.setCurrentUser(user);

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
    console.log("Event INITIAL_SESSION received.");
  } else if (event === "TOKEN_REFRESHED") {
    console.log("Event TOKEN_REFRESHED received. User data:", user.email);
  }
});

// Logout functionality
_ui_js__WEBPACK_IMPORTED_MODULE_2__.logoutBtn.addEventListener("click", async () => {
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.showStatus)("Déconnexion...", "info");
  const { error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.signOut();
  if (error) {
    console.error("Error logging out with Supabase:", error.message);
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.showStatus)(`Erreur lors de la déconnexion: ${error.message}`, "danger");
  } else {
    console.log(
      "Supabase signOut successful. onAuthStateChange will handle UI and redirect."
    );
  }
});

// --- Document Download Logic ---
function downloadDocument() {
  if (!currentUser) {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.showStatus)("Authentification requise pour télécharger.", "warning");
    _ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn.disabled = true;
    return; // Exit if not authenticated
  }

  const selectedDocument = (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getSelectedDocument)(); // Get from api.js
  if (selectedDocument && selectedDocument.id) {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.showStatus)("Ouverture du document...", "info");
    window.open(`/plu-summary?id=${selectedDocument.id}`, "_blank");
    // Re-display success message after a delay
    setTimeout(() => {
      // Check if button is still enabled (i.e., document is still considered valid)
      if (!_ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn.disabled) {
        (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.showStatus)(
          `Document trouvé (Source: ${
            (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.formatApiName)(selectedDocument.source_plu_date) || "Non spécifiée"
          }). Prêt à consulter.`,
          "success"
        );
      }
    }, 1500);
  } else {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.showStatus)("Lien du document non disponible.", "warning");
    _ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn.disabled = true; // Ensure button is disabled if no URL
  }
}

// === Event listeners ===
_ui_js__WEBPACK_IMPORTED_MODULE_2__.citySelect.addEventListener("change", (event) => {
  const cityId = event.target.value;
  (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.loadZonings)(cityId); // Call API function
});

_ui_js__WEBPACK_IMPORTED_MODULE_2__.zoningSelect.addEventListener("change", (event) => {
  const zoningId = event.target.value;
  (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.loadZones)(zoningId); // Call API function
});

_ui_js__WEBPACK_IMPORTED_MODULE_2__.zoneSelect.addEventListener("change", (event) => {
  const zoneId = event.target.value;
  const zoningId = _ui_js__WEBPACK_IMPORTED_MODULE_2__.zoningSelect.value; // Get current zoning selection
  // TODO : typologieSelect logic
  if (zoneId && zoningId) {
    (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.findDocument)(zoningId, zoneId, "7c0f2830-f3fc-4c69-911c-470286f91982"); // Call API function
  } else {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.showStatus)("Veuillez d'abord sélectionner un zoning.", "warning");
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

_ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn.addEventListener("click", downloadDocument);

// === Initialisation ===
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize UI state
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_2__.citySelect, "Chargement...");
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_2__.zoningSelect, "Sélectionnez d'abord une ville");
  (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_2__.zoneSelect, "Sélectionnez d'abord un zonage");
  // resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
  if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn) _ui_js__WEBPACK_IMPORTED_MODULE_2__.synthesisBtn.disabled = true;
  // showStatus("Initialisation...", "info"); // This might be premature or overridden

  // The onAuthStateChange listener is set up above and will call updateUIForAuthState.
  // It handles INITIAL_SESSION, which should cover the user's state on page load.
  // Explicitly calling getCurrentUser and updateUIForAuthState here might be redundant
  // or could cause a flicker if onAuthStateChange hasn't fired yet with the true state.
  // However, it can be a fallback. Let's ensure it only updates if elements exist.

  const initiallyStoredUser = _auth_auth_js__WEBPACK_IMPORTED_MODULE_3__.getCurrentUser();
  updateUIForAuthState(initiallyStoredUser); // This will set the initial UI based on localStorage

  // Load initial data if on the main page
  if (_ui_js__WEBPACK_IMPORTED_MODULE_2__.citySelect && _ui_js__WEBPACK_IMPORTED_MODULE_2__.zoningSelect && _ui_js__WEBPACK_IMPORTED_MODULE_2__.zoneSelect) {
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.showStatus)("Initialisation...", "info"); // Show this only when relevant selectors are present
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_2__.citySelect, "Chargement...");
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_2__.zoningSelect, "Sélectionnez d'abord une ville");
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_2__.resetSelect)(_ui_js__WEBPACK_IMPORTED_MODULE_2__.zoneSelect, "Sélectionnez d'abord un zonage");
    // resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
    await (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.loadCities)(); // Start loading cities
  } else {
    // If not on the main page with selectors, ensure a relevant status or clear it
    // For example, on login/signup pages, statusMessage might be used for other things.
    // If statusMessage exists and isn't meant for auth state here, clear it or set appropriately.
    // This depends on whether statusMessage is a shared element or page-specific.
    // For now, we assume updateUIForAuthState handles its part of status messages related to login prompt.
  }
});

// Export currentUser for use in api.js



/***/ }),

/***/ "./src/js/auth/auth.js":
/*!*****************************!*\
  !*** ./src/js/auth/auth.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),
/* harmony export */   setCurrentUser: () => (/* binding */ setCurrentUser)
/* harmony export */ });
/* unused harmony exports validateSession, getCurrentUserSync, logout, isLoggedIn, isLoggedInSync, protectPage, initAuth, showError, showStatus, hideElement, showElement, showLoading, hideLoading */
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../supabase-client.js */ "./src/js/supabase-client.js");
// src/auth/auth.js
/**
 * Authentication Module - Base
 * @module auth
 * @description Base module for authentication with common functions and configuration
 * @version 0.0.5
 *
 * @changelog
 * - 0.0.5 (2025-05-15): Added session validation and protection against stale sessions.
 * - 0.0.4 (2025-05-15): Removal of Firebase Cloud Functions constants.
 * - 0.0.3 (2025-05-13): Modified the authentication state management to use Supabase Auth system.
 * - 0.0.2 (2025-05-13): Reorganization into separate modules
 * - 0.0.1 (2025-05-03): Initial creation
 */



// Global authentication state
let currentUser = null;
let sessionValidated = false;

/**
 * Sets the current user
 * @param {Object} user - User data
 */
function setCurrentUser(user) {
  currentUser = user;
  // Possible storage in localStorage/sessionStorage
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}

/**
 * Validates if the current session is active with Supabase
 * @returns {Promise<boolean>} True if session is valid, false otherwise
 */
async function validateSession() {
  try {
    // Get current session from Supabase
    const {
      data: { session },
      error: sessionError,
    } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.getSession();

    // No session or error retrieving session
    if (sessionError || !session) {
      console.log("No valid session found");
      setCurrentUser(null);
      sessionValidated = false;
      return false;
    }

    // Try to refresh the token to validate it with the server
    const { error: refreshError } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.refreshSession();

    if (refreshError) {
      console.warn("Session validation failed:", refreshError);
      // Force clear the invalid session
      await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.signOut();
      setCurrentUser(null);
      sessionValidated = false;
      return false;
    }

    // Session is valid, update the current user
    setCurrentUser(session.user);
    sessionValidated = true;
    return true;
  } catch (e) {
    console.error("Session validation error:", e);
    setCurrentUser(null);
    sessionValidated = false;
    return false;
  }
}

/**
 * Retrieves the current user
 * @param {boolean} validate - Whether to validate the session with Supabase
 * @returns {Promise<Object|null>} The current user or null
 */
async function getCurrentUser(validate = true) {
  // If we need to validate and haven't done so yet
  if (validate && !sessionValidated) {
    await validateSession();
  }

  // If no validation needed or already validated
  if (!validate && !currentUser) {
    // Try to retrieve from storage if not in memory
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser);
      } catch (e) {
        console.error("Error retrieving user:", e);
        localStorage.removeItem("currentUser");
      }
    }
  }

  return currentUser;
}

/**
 * Synchronous version of getCurrentUser for non-async contexts
 * WARNING: This may return stale data if session is invalid
 * @returns {Object|null} The current user or null
 */
function getCurrentUserSync() {
  if (!currentUser) {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser);
      } catch (e) {
        console.error("Error retrieving user:", e);
        localStorage.removeItem("currentUser");
      }
    }
  }

  return currentUser;
}

/**
 * Logs out the user
 * @returns {Promise<void>}
 */
async function logout() {
  try {
    // Sign out from Supabase
    await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.signOut();

    // Clear local state
    currentUser = null;
    sessionValidated = false;
    localStorage.removeItem("currentUser");

    // Redirect to the home page after logout
    window.location.href = "/";
  } catch (error) {
    console.error("Error during logout:", error);
    // Still clear local state even if Supabase signOut fails
    currentUser = null;
    sessionValidated = false;
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }
}

/**
 * Checks if the user is logged in with valid session
 * @param {boolean} validate - Whether to validate with Supabase first
 * @returns {Promise<boolean>} True if the user is logged in with valid session
 */
async function isLoggedIn(validate = true) {
  const user = await getCurrentUser(validate);
  return user !== null;
}

/**
 * Synchronous version of isLoggedIn
 * WARNING: This may return incorrect results if session is invalid
 * @returns {boolean} True if user appears to be logged in locally
 */
function isLoggedInSync() {
  return getCurrentUserSync() !== null;
}

/**
 * Protects a page that requires authentication
 * @param {string} redirectUrl - URL to redirect if not authenticated
 * @returns {Promise<boolean>} True if authenticated, false otherwise
 */
async function protectPage(redirectUrl = "/login") {
  const isValid = await validateSession();

  if (!isValid) {
    // Redirect to login page
    window.location.href = redirectUrl;
    return false;
  }

  return true;
}

/**
 * Initializes auth on page load
 * Call this at the beginning of your app initialization
 */
async function initAuth() {
  // Validate session on page load
  await validateSession();

  // Set up auth state change listener
  _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("Auth state changed:", event);

    if (event === "SIGNED_IN" && session) {
      setCurrentUser(session.user);
      sessionValidated = true;
    } else if (event === "SIGNED_OUT") {
      setCurrentUser(null);
      sessionValidated = false;
    } else if (event === "TOKEN_REFRESHED") {
      setCurrentUser(session.user);
      sessionValidated = true;
    } else if (event === "USER_UPDATED") {
      setCurrentUser(session.user);
      sessionValidated = true;
    }
  });
}

/**
 * Displays an error message
 * @param {string} message - Error message to display
 * @param {string} elementId - ID of the element where to display the error
 */
function showError(message, elementId = "errorMessage") {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.innerHTML = message;
    errorElement.classList.remove("hidden");
  } else {
    console.error("Error element not found:", elementId);
  }
}

/**
 * Displays a status message
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, info, warning, danger)
 * @param {string} elementId - ID of the element where to display the message
 */
function showStatus(
  message,
  type = "info",
  elementId = "statusMessage"
) {
  const statusElement = document.getElementById(elementId);
  if (statusElement) {
    statusElement.textContent = message;

    // Remove all alert-* classes
    statusElement.classList.forEach((className) => {
      if (className.startsWith("alert-")) {
        statusElement.classList.remove(className);
      }
    });

    // Add the class corresponding to the type
    statusElement.classList.add(`alert-${type}`);
    statusElement.classList.remove("hidden");
  } else {
    console.error("Status element not found:", elementId);
  }
}

/**
 * Hides an element
 * @param {string} elementId - ID of the element to hide
 */
function hideElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add("hidden");
  }
}

/**
 * Shows an element
 * @param {string} elementId - ID of the element to show
 */
function showElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove("hidden");
  }
}

/**
 * Shows the loading indicator
 * @param {string} buttonId - ID of the button
 * @param {string} spinnerId - ID of the spinner
 */
function showLoading(buttonId, spinnerId) {
  const button = document.getElementById(buttonId);
  const spinner = document.getElementById(spinnerId);

  if (button) button.disabled = true;
  if (spinner) spinner.classList.remove("hidden");
}

/**
 * Hides the loading indicator
 * @param {string} buttonId - ID of the button
 * @param {string} spinnerId - ID of the spinner
 */
function hideLoading(buttonId, spinnerId) {
  const button = document.getElementById(buttonId);
  const spinner = document.getElementById(spinnerId);

  if (button) button.disabled = false;
  if (spinner) spinner.classList.add("hidden");
}

// Export the necessary functions and variables
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  getCurrentUser,
  getCurrentUserSync,
  setCurrentUser,
  logout,
  isLoggedIn,
  isLoggedInSync,
  validateSession,
  protectPage,
  initAuth,
  showError,
  showStatus,
  hideElement,
  showElement,
  showLoading,
  hideLoading,
});


/***/ }),

/***/ "./src/js/mappings.js":
/*!****************************!*\
  !*** ./src/js/mappings.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   zoneNameMappings: () => (/* binding */ zoneNameMappings)
/* harmony export */ });
// js/mappings.js
/**
 * Firebase Mappings
 * @module mappings
 * @description This module contains mappings for zone names used in the application.
 * @version 0.0.1
 * @author GreyPanda
 * @todo Add more mappings as needed.
 *
 * @changelog
 * - 0.0.1 (2025-04-21): Mappings for Grenoble.
 */

// Keys: name in the database (lowercase, underscore)
// Values: displayed named on web app (specific format)
const zoneNameMappings = {
  zone_au: "Zone AU",
  zone_auc1: "Zone AUC1",
  zone_auc2: "Zone AUC2",
  zone_auc3: "Zone AUC3",
  zone_aucru10: "Zone AUCRU10",
  zone_aud1: "Zone AUD1",
  zone_aud2: "Zone AUD2",
  zone_aud3: "Zone AUD3",
  zone_aud4: "Zone AUD4",
  zone_aue1: "Zone AUE1",
  zone_aup1r: "Zone AUP1r",
  zone_a: "Zone A",
  zone_al: "Zone AL",
  zone_n: "Zone N",
  zone_nl: "Zone NL",
  zone_ue1: "Zone UE1",
  zone_ue2: "Zone UE2",
  zone_ue3: "Zone UE3",
  zone_ue4: "Zone UE4",
  zone_uv: "Zone UV",
  zone_uz1: "Zone UZ1",
  zone_uz2: "Zone UZ2",
  zone_uz3: "Zone UZ3",
  zone_uz4: "Zone UZ4",
  zone_ua1: "Zone UA1",
  zone_ua2: "Zone UA2",
  zone_ua3: "Zone UA3",
  zone_ub: "Zone UB",
  zone_uc1: "Zone UC1",
  zone_uc2: "Zone UC2",
  zone_uc3: "Zone UC3",
  zone_ucru1: "Zone UCRU1",
  zone_ucru2: "Zone UCRU2",
  zone_ucru3: "Zone UCRU3",
  zone_ucru4: "Zone UCRU4",
  zone_ucru5: "Zone UCRU5",
  zone_ucru6: "Zone UCRU6",
  zone_ucru7: "Zone UCRU7",
  zone_ucru8: "Zone UCRU8",
  zone_ucru9: "Zone UCRU9",
  zone_ucru11: "Zone UCRU11",
  zone_ud1: "Zone UD1",
  zone_ud2: "Zone UD2",
  zone_ud3: "Zone UD3",
  zone_ud4: "Zone UD4",
};


/***/ }),

/***/ "./src/js/supabase-client.js":
/*!***********************************!*\
  !*** ./src/js/supabase-client.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supabase: () => (/* binding */ supabase)
/* harmony export */ });
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ "./node_modules/@supabase/supabase-js/dist/module/index.js");
// src/js/supabase-client.js
/**
 * Supabase Client
 * @module supabase-client
 * @description This module handles the Supabase client initialization and configuration.
 * @version 0.0.2
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.2 (2025-05-27): Added environement variables error handling for missing.
 * - 0.0.1 (2025-05-09): Initial version with basic Supabase client initialization.
 */



const supabaseUrl = "https://ofeyssipibktmbfebibo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZXlzc2lwaWJrdG1iZmViaWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjUwOTQsImV4cCI6MjA1OTUwMTA5NH0.w71CAKfolktzRl-TmLVhHYaEbhCfVk4A7YraEUCglrU";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const client = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);

const supabase = client;


/***/ }),

/***/ "./src/js/ui.js":
/*!**********************!*\
  !*** ./src/js/ui.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   citySelect: () => (/* binding */ citySelect),
/* harmony export */   citySpinner: () => (/* binding */ citySpinner),
/* harmony export */   documentSpinner: () => (/* binding */ documentSpinner),
/* harmony export */   formatApiName: () => (/* binding */ formatApiName),
/* harmony export */   loginLink: () => (/* binding */ loginLink),
/* harmony export */   logoutBtn: () => (/* binding */ logoutBtn),
/* harmony export */   populateSelect: () => (/* binding */ populateSelect),
/* harmony export */   resetSelect: () => (/* binding */ resetSelect),
/* harmony export */   showStatus: () => (/* binding */ showStatus),
/* harmony export */   signupLink: () => (/* binding */ signupLink),
/* harmony export */   synthesisBtn: () => (/* binding */ synthesisBtn),
/* harmony export */   toggleSpinner: () => (/* binding */ toggleSpinner),
/* harmony export */   userStatus: () => (/* binding */ userStatus),
/* harmony export */   zoneSelect: () => (/* binding */ zoneSelect),
/* harmony export */   zoneSpinner: () => (/* binding */ zoneSpinner),
/* harmony export */   zoningSelect: () => (/* binding */ zoningSelect),
/* harmony export */   zoningSpinner: () => (/* binding */ zoningSpinner)
/* harmony export */ });
/* unused harmony exports typologieSelect, statusMessage, typologieSpinner */
/* harmony import */ var _mappings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mappings */ "./src/js/mappings.js");
// public/js/ui.js
/**
 * Firebase UI
 * @module ui
 * @description This module handles the UI elements and utility functions for the application.
 * @version 0.0.1
 * @author GreyPanda
 * @todo Rework on the messages to "login before downloading"
 *
 * @changelog
 * - 0.0.1 (2025-04-26): Initial version with basic UI functions and element references.
 */

// Import mappings needed for formatting


// --- DOM Element References ---
const citySelect = document.getElementById("citySelect");
const zoningSelect = document.getElementById("zoningSelect");
const zoneSelect = document.getElementById("zoneSelect");
const typologieSelect = document.getElementById("typologieSelect");
const synthesisBtn = document.getElementById("synthesisBtn");
const statusMessage = document.getElementById("statusMessage");

// Spinners (ensure these IDs exist in your index.html)
const citySpinner = document.getElementById("citySpinner");
const zoningSpinner = document.getElementById("zoningSpinner");
const zoneSpinner = document.getElementById("zoneSpinner");
const typologieSpinner = document.getElementById("typologieSpinner");
const documentSpinner = document.getElementById("documentSpinner"); // For the final search/download button area

// New elements for Auth UI
const userStatus = document.getElementById("userStatus");
const logoutBtn = document.getElementById("logoutBtn");
const loginLink = document.getElementById("loginLink"); // Reference to the login link/button
const signupLink = document.getElementById("signupLink"); // Reference to the signup link/button
// --- End DOM Element References ---

// --- UI Utility Functions ---

/**
 * Affiche un message de statut (et type: info, success, danger, warning)
 */
function showStatus(message, type = "info") {
  if (statusMessage) {
    statusMessage.textContent = message;
    // Ensure only one alert class is active at a time
    statusMessage.className = `status-message alert alert-${type}`;
    statusMessage.classList.remove("d-none"); // Make sure it's visible
  } else {
    console.warn("Status message element not found.");
  }
}

/**
 * Affiche ou cache un spinner Bootstrap
 * @param spinnerElement L'élément SPAN du spinner
 * @param show True pour afficher, false pour cacher
 */
function toggleSpinner(spinnerElement, show) {
  if (spinnerElement) {
    spinnerElement.classList.toggle("d-none", !show);
  } else {
    // console.warn("Spinner element not found for toggling."); // Optional: log if spinner missing
  }
}

/**
 * Réinitialise un élément select avec une option par défaut
 */
function resetSelect(selectElement, defaultText) {
  if (selectElement) {
    selectElement.innerHTML = `<option value="">${
      defaultText || "Sélectionnez une option"
    }</option>`;
    selectElement.disabled = true; // Disable by default on reset
  } else {
    console.warn("Select element not found for reset.");
  }
}

/**
 * Formate un name reçu de l'API (enlève underscores, capitalise)
 * Utilisé comme fallback si le mappage spécifique n'existe pas.
 */
function formatApiName(name) {
  if (!name) return "";
  // Replace underscores with spaces, then capitalize the first letter of each word
  return name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Peuple un sélecteur avec des options
 * @param selectElement L'élément select à remplir
 * @param data Tableau d'objets {id, name}
 * @param defaultOptionText Texte de la première option désactivée
 * @param emptyDataText Texte si le tableau data est vide
 * @param dataType 'city', 'zoning', 'zone', ou 'typology' pour le formatage conditionnel
 */
function populateSelect(
  selectElement,
  data,
  defaultOptionText,
  emptyDataText,
  dataType // Used for conditional formatting (e.g., zones)
) {
  if (!selectElement) {
    console.warn("Select element not found for population.");
    return false;
  }

  resetSelect(selectElement, defaultOptionText); // Reset first

  if (!data || data.length === 0) {
    selectElement.innerHTML = `<option value="">${emptyDataText}</option>`;
    selectElement.disabled = true;
    return false; // Indicate no data was populated
  }

  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;

    // --- Conditional Formatting Logic ---
    let displayText = "";
    // If it's a 'zone' and a mapping exists for its 'name'
    if (dataType === "zone" && _mappings__WEBPACK_IMPORTED_MODULE_0__.zoneNameMappings.hasOwnProperty(item.name)) {
      displayText = _mappings__WEBPACK_IMPORTED_MODULE_0__.zoneNameMappings[item.name]; // Use the mapped name
    } else {
      // Otherwise, use the general formatting function
      displayText = formatApiName(item.name);
    }
    option.textContent = displayText; // Apply the chosen text

    selectElement.appendChild(option);
  });

  selectElement.disabled = false; // Enable the select as it has options
  return true; // Indicate data was populated
}

// --- End UI Utility Functions ---

// --- Export Elements and Functions ---



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "js/" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "urbandocs_webapp:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkurbandocs_webapp"] = self["webpackChunkurbandocs_webapp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_supabase_supabase-js_dist_module_index_js"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Oi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL2F1dGguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9tYXBwaW5ncy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3N1cGFiYXNlLWNsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3VpLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2pzL2FwaS5qc1xuLyoqXG4gKiBTdXBhYmFzZSBBUElcbiAqIEBtb2R1bGUgYXBpXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBtb2R1bGUgaGFuZGxlcyBBUEkgY2FsbHMgdG8gZmV0Y2ggZGF0YSBmb3IgY2l0aWVzLCB6b25pbmcsIHpvbmVzLCBhbmQgdHlwb2xvZ2llcy5cbiAqIEB2ZXJzaW9uIDAuMS4wXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICogQHRvZG9cbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMS4wICgyMDI1LTA1LTE1KTogTWlncmF0aW5nIFN1cGFiYXNlIEFQSSBjYWxscyBmb3IgaW1wcm92ZWQgcGVyZm9ybWFuY2UuXG4gKiAtIDAuMC4xICgyMDI1LTA0LTI2KTogU2VwYXJhdGUgbW9kdWxlIGZvciBBUEkgY2FsbHMgdG8gaW1wcm92ZSBjb2RlIG9yZ2FuaXphdGlvbiBhbmQgbWFpbnRhaW5hYmlsaXR5LlxuICovXG5cbi8vIEltcG9ydCBVSSBmdW5jdGlvbnMgYW5kIGVsZW1lbnRzICh3aWxsIGJlIGRlZmluZWQgaW4gdWkuanMpXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCIuL3N1cGFiYXNlLWNsaWVudC5qc1wiO1xuaW1wb3J0IHtcbiAgdG9nZ2xlU3Bpbm5lcixcbiAgc2hvd1N0YXR1cyxcbiAgcG9wdWxhdGVTZWxlY3QsXG4gIHJlc2V0U2VsZWN0LFxuICBmb3JtYXRBcGlOYW1lLFxuICBjaXR5U2VsZWN0LFxuICB6b25pbmdTZWxlY3QsXG4gIHpvbmVTZWxlY3QsXG4gIHN5bnRoZXNpc0J0bixcbiAgY2l0eVNwaW5uZXIsXG4gIHpvbmluZ1NwaW5uZXIsXG4gIHpvbmVTcGlubmVyLFxuICBkb2N1bWVudFNwaW5uZXIsXG59IGZyb20gXCIuL3VpLmpzXCI7XG5cbmltcG9ydCB7IGN1cnJlbnRVc2VyIH0gZnJvbSBcIi4vYXBwLmpzXCI7XG5cbi8vIFZhcmlhYmxlIHRvIHN0b3JlIHRoZSBmZXRjaGVkIGRvY3VtZW50IGRldGFpbHNcbmxldCBzZWxlY3RlZERvY3VtZW50ID0gbnVsbDtcblxuLyoqXG4gKiBGZXRjaGVzIGNpdGllcyBmcm9tIFN1cGFiYXNlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGxvYWRDaXRpZXMoKSB7XG4gIHRvZ2dsZVNwaW5uZXIoY2l0eVNwaW5uZXIsIHRydWUpO1xuICBzaG93U3RhdHVzKFwiQ2hhcmdlbWVudCBkZXMgY2l0aWVzLi4uXCIsIFwiaW5mb1wiKTtcbiAgY2l0eVNlbGVjdC5kaXNhYmxlZCA9IHRydWU7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJjaXRpZXNcIilcbiAgICAgIC5zZWxlY3QoXCJpZCwgbmFtZVwiKVxuICAgICAgLm9yZGVyKFwibmFtZVwiKTtcblxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgICBjb25zdCBoYXNEYXRhID0gcG9wdWxhdGVTZWxlY3QoXG4gICAgICBjaXR5U2VsZWN0LFxuICAgICAgZGF0YS5tYXAoKGNpdHkpID0+ICh7IGlkOiBjaXR5LmlkLCBuYW1lOiBjaXR5Lm5hbWUgfSkpLFxuICAgICAgXCJTw6lsZWN0aW9ubmV6IHVuZSBjaXR5XCIsXG4gICAgICBcIkF1Y3VuZSB2aWxsZSBkaXNwb25pYmxlXCIsXG4gICAgICBcImNpdHlcIlxuICAgICk7XG5cbiAgICBpZiAoaGFzRGF0YSkge1xuICAgICAgc2hvd1N0YXR1cyhgVmlsbGVzIGNoYXJnw6llcyA6ICR7ZGF0YS5sZW5ndGh9YCwgXCJpbmZvXCIpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFVzZXIgPT09IG51bGwpIHtcbiAgICAgIHNob3dTdGF0dXMoXG4gICAgICAgIFwiVmV1aWxsZXogdm91cyBjb25uZWN0ZXIgcG91ciBhY2PDqWRlciBhdXggZG9ubsOpZXMuXCIsXG4gICAgICAgIFwid2FybmluZ1wiXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG93U3RhdHVzKFwiQXVjdW5lIHZpbGxlIG4nYSDDqXTDqSB0cm91dsOpZS5cIiwgXCJ3YXJuaW5nXCIpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZHUgY2hhcmdlbWVudCBkZXMgY2l0aWVzOlwiLCBlcnJvcik7XG4gICAgcmVzZXRTZWxlY3QoY2l0eVNlbGVjdCwgXCJFcnJldXIgY2hhcmdlbWVudFwiKTtcbiAgfSBmaW5hbGx5IHtcbiAgICB0b2dnbGVTcGlubmVyKGNpdHlTcGlubmVyLCBmYWxzZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBGZXRjaGVzIHpvbmluZ3MgZm9yIGEgY2l0eSBmcm9tIFN1cGFiYXNlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGxvYWRab25pbmdzKGNpdHlJZCkge1xuICByZXNldFNlbGVjdCh6b25pbmdTZWxlY3QsIFwiU8OpbGVjdGlvbm5leiBkJ2Fib3JkIHVuZSBjaXR5XCIpO1xuICByZXNldFNlbGVjdCh6b25lU2VsZWN0LCBcIlPDqWxlY3Rpb25uZXogZCdhYm9yZCB1biB6b25pbmdcIik7XG4gIHN5bnRoZXNpc0J0bi5kaXNhYmxlZCA9IHRydWU7XG4gIHNlbGVjdGVkRG9jdW1lbnQgPSBudWxsO1xuXG4gIGlmICghY2l0eUlkKSB7XG4gICAgc2hvd1N0YXR1cyhcIlZldWlsbGV6IHPDqWxlY3Rpb25uZXIgdW5lIGNpdHkuXCIsIFwiaW5mb1wiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0b2dnbGVTcGlubmVyKHpvbmluZ1NwaW5uZXIsIHRydWUpO1xuICBzaG93U3RhdHVzKFwiQ2hhcmdlbWVudCBkZXMgem9uaW5ncy4uLlwiLCBcImluZm9cIik7XG4gIHpvbmluZ1NlbGVjdC5kaXNhYmxlZCA9IHRydWU7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ6b25pbmdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIG5hbWVcIilcbiAgICAgIC5lcShcImNpdHlfaWRcIiwgY2l0eUlkKVxuICAgICAgLm9yZGVyKFwibmFtZVwiKTtcblxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgICBjb25zdCBoYXNEYXRhID0gcG9wdWxhdGVTZWxlY3QoXG4gICAgICB6b25pbmdTZWxlY3QsXG4gICAgICBkYXRhLm1hcCgoem9uaW5nKSA9PiAoeyBpZDogem9uaW5nLmlkLCBuYW1lOiB6b25pbmcubmFtZSB9KSksXG4gICAgICBcIlPDqWxlY3Rpb25uZXogdW4gem9uaW5nXCIsXG4gICAgICBcIkF1Y3VuIHpvbmFnZSBkaXNwb25pYmxlXCIsXG4gICAgICBcInpvbmluZ1wiXG4gICAgKTtcblxuICAgIGlmIChoYXNEYXRhKSB7XG4gICAgICBzaG93U3RhdHVzKGBab25hZ2VzIGNoYXJnw6lzIDogJHtkYXRhLmxlbmd0aH1gLCBcImluZm9cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dTdGF0dXMoXCJBdWN1biB6b25hZ2UgdHJvdXbDqSBwb3VyIGNldHRlIGNpdHkuXCIsIFwid2FybmluZ1wiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZGVzIHpvbmluZ3M6XCIsIGVycm9yKTtcbiAgICByZXNldFNlbGVjdCh6b25pbmdTZWxlY3QsIFwiRXJyZXVyIGNoYXJnZW1lbnRcIik7XG4gIH0gZmluYWxseSB7XG4gICAgdG9nZ2xlU3Bpbm5lcih6b25pbmdTcGlubmVyLCBmYWxzZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBGZXRjaGVzIHpvbmVzIGZvciBhIHpvbmluZyBmcm9tIFN1cGFiYXNlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGxvYWRab25lcyh6b25pbmdJZCkge1xuICByZXNldFNlbGVjdCh6b25lU2VsZWN0LCBcIlPDqWxlY3Rpb25uZXogZCdhYm9yZCB1biB6b25pbmdcIik7XG4gIHN5bnRoZXNpc0J0bi5kaXNhYmxlZCA9IHRydWU7XG4gIHNlbGVjdGVkRG9jdW1lbnQgPSBudWxsO1xuXG4gIGlmICghem9uaW5nSWQpIHtcbiAgICBzaG93U3RhdHVzKFwiVmV1aWxsZXogc8OpbGVjdGlvbm5lciB1biB6b25pbmcuXCIsIFwiaW5mb1wiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0b2dnbGVTcGlubmVyKHpvbmVTcGlubmVyLCB0cnVlKTtcbiAgc2hvd1N0YXR1cyhcIkNoYXJnZW1lbnQgZGVzIHpvbmVzLi4uXCIsIFwiaW5mb1wiKTtcbiAgem9uZVNlbGVjdC5kaXNhYmxlZCA9IHRydWU7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ6b25lc1wiKVxuICAgICAgLnNlbGVjdChcImlkLCBuYW1lXCIpXG4gICAgICAuZXEoXCJ6b25pbmdfaWRcIiwgem9uaW5nSWQpXG4gICAgICAub3JkZXIoXCJuYW1lXCIpO1xuXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcblxuICAgIGNvbnN0IGhhc0RhdGEgPSBwb3B1bGF0ZVNlbGVjdChcbiAgICAgIHpvbmVTZWxlY3QsXG4gICAgICBkYXRhLm1hcCgoem9uZSkgPT4gKHsgaWQ6IHpvbmUuaWQsIG5hbWU6IHpvbmUubmFtZSB9KSksXG4gICAgICBcIlPDqWxlY3Rpb25uZXogdW5lIHpvbmVcIixcbiAgICAgIFwiQXVjdW5lIHpvbmUgZGlzcG9uaWJsZVwiLFxuICAgICAgXCJ6b25lXCJcbiAgICApO1xuXG4gICAgaWYgKGhhc0RhdGEpIHtcbiAgICAgIHNob3dTdGF0dXMoYFpvbmVzIGNoYXJnw6llcyA6ICR7ZGF0YS5sZW5ndGh9YCwgXCJpbmZvXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG93U3RhdHVzKFwiQXVjdW5lIHpvbmUgdHJvdXbDqWUgcG91ciBjZSB6b25pbmcuXCIsIFwid2FybmluZ1wiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZGVzIHpvbmVzOlwiLCBlcnJvcik7XG4gICAgcmVzZXRTZWxlY3Qoem9uZVNlbGVjdCwgXCJFcnJldXIgY2hhcmdlbWVudFwiKTtcbiAgfSBmaW5hbGx5IHtcbiAgICB0b2dnbGVTcGlubmVyKHpvbmVTcGlubmVyLCBmYWxzZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBGZXRjaGVzIGRvY3VtZW50IGZvciBhIHpvbmUgZnJvbSBTdXBhYmFzZVxuICovXG5hc3luYyBmdW5jdGlvbiBmaW5kRG9jdW1lbnQoem9uaW5nSWQsIHpvbmVJZCwgdHlwb2xvZ2llSWQpIHtcbiAgc3ludGhlc2lzQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgc2VsZWN0ZWREb2N1bWVudCA9IG51bGw7XG5cbiAgaWYgKCFjdXJyZW50VXNlcikge1xuICAgIHNob3dTdGF0dXMoXG4gICAgICBcIlZldWlsbGV6IHZvdXMgY29ubmVjdGVyIHBvdXIgYWNjw6lkZXIgYXV4IGRvY3VtZW50cy5cIixcbiAgICAgIFwid2FybmluZ1wiXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXpvbmluZ0lkIHx8ICF6b25lSWQpIHtcbiAgICBzaG93U3RhdHVzKFwiU8OpbGVjdGlvbiBpbmNvbXBsw6h0ZSBwb3VyIHJlY2hlcmNoZXIgbGUgZG9jdW1lbnQuXCIsIFwiaW5mb1wiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0b2dnbGVTcGlubmVyKGRvY3VtZW50U3Bpbm5lciwgdHJ1ZSk7XG4gIHNob3dTdGF0dXMoXCJSZWNoZXJjaGUgZHUgZG9jdW1lbnQuLi5cIiwgXCJpbmZvXCIpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwiZG9jdW1lbnRzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIHNvdXJjZV9wbHVfZGF0ZVwiKVxuICAgICAgLmVxKFwiem9uaW5nX2lkXCIsIHpvbmluZ0lkKVxuICAgICAgLmVxKFwiem9uZV9pZFwiLCB6b25lSWQpXG4gICAgICAuZXEoXCJ0eXBvbG9neV9pZFwiLCB0eXBvbG9naWVJZClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLmNvZGUgPT09IFwiUEdSU1QxMTZcIikge1xuICAgICAgICBzaG93U3RhdHVzKFwiQXVjdW4gZG9jdW1lbnQgdHJvdXbDqSBwb3VyIGNldHRlIHpvbmUuXCIsIFwid2FybmluZ1wiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWREb2N1bWVudCA9IGRhdGE7XG5cbiAgICBpZiAoY3VycmVudFVzZXIgJiYgZGF0YT8uaWQpIHtcbiAgICAgIHN5bnRoZXNpc0J0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgc2hvd1N0YXR1cyhcbiAgICAgICAgYERvY3VtZW50IHRyb3V2w6kgKFNvdXJjZTogJHtcbiAgICAgICAgICBmb3JtYXRBcGlOYW1lKGRhdGEuc291cmNlX3BsdV9kYXRlKSB8fCBcIk5vbiBzcMOpY2lmacOpZVwiXG4gICAgICAgIH0pLiBQcsOqdCDDoCBjb25zdWx0ZXIuYCxcbiAgICAgICAgXCJzdWNjZXNzXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdGVkRG9jdW1lbnQgPSBudWxsO1xuICAgICAgc2hvd1N0YXR1cyhcIkRvY3VtZW50IHRyb3V2w6kgbWFpcyBsaWVuIG1hbnF1YW50LlwiLCBcIndhcm5pbmdcIik7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSByZWNoZXJjaGUgZHUgZG9jdW1lbnQ6XCIsIGVycm9yKTtcbiAgICBzZWxlY3RlZERvY3VtZW50ID0gbnVsbDtcbiAgfSBmaW5hbGx5IHtcbiAgICB0b2dnbGVTcGlubmVyKGRvY3VtZW50U3Bpbm5lciwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGVkRG9jdW1lbnQoKSB7XG4gIHJldHVybiBzZWxlY3RlZERvY3VtZW50O1xufVxuXG5leHBvcnQge1xuICBsb2FkQ2l0aWVzLFxuICBsb2FkWm9uaW5ncyxcbiAgbG9hZFpvbmVzLFxuICBmaW5kRG9jdW1lbnQsXG4gIGdldFNlbGVjdGVkRG9jdW1lbnQsXG59O1xuIiwiLy8gcHVibGljL2pzL2FwcC5qcyAtIE1haW4gYXBwbGljYXRpb24gbG9naWNcbi8qKlxuICogRmlyZWJhc2UgQXBwXG4gKiBAbW9kdWxlIGFwcFxuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIG1haW4gYXBwbGljYXRpb24gbG9naWMuXG4gKiBAdmVyc2lvbiAwLjAuNVxuICogQGF1dGhvciBHcmV5UGFuZGFcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC41ICgyMDI1LTA1LTEzKTogQWRkaW5nIGFjY291bnQgYnV0dG9uIHRvIHRoZSBwcm9maWxlIHBhZ2UsIGNvcnJlY3RpbmcgdGhlIGxvZ2luIHByb21wdC5cbiAqIC0gMC4wLjQgKDIwMjUtMDUtMDkpOiBNb2RpZmllZCB0aGUgYXV0aGVudGljYXRpb24gc3RhdGUgbWFuYWdlbWVudCB0byB1c2UgU3VwYWJhc2UgQXV0aCBzeXN0ZW0uXG4gKiAtIDAuMC4zICgyMDI1LTA1LTA4KTogTW92ZWQgRmlyZWJhc2UgY29uZmlndXJhdGlvbiBpbnRvIGEgc2VwYXJhdGUgZmlsZS5cbiAqIC0gMC4wLjIgKDIwMjUtMDQtMjcpOiBBZGRlZCBhdXRoZW50aWNhdGlvbiBzdGF0ZSBtYW5hZ2VtZW50IGFuZCBkb2N1bWVudCBkb3dubG9hZCBmdW5jdGlvbmFsaXR5IHdpdGggRmlyZWJhc2UgQXV0aC5cbiAqIC0gMC4wLjEgKDIwMjUtMDQtMjEpOiBJbml0aWFsIHZlcnNpb24gd2l0aCBiYXNpYyBkb2N1bWVudCBkb3dubG9hZCBmdW5jdGlvbmFsaXR5LlxuICovXG5cbi8vIEltcG9ydCBTdXBhYmFzZSBDbGllbnRcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4vc3VwYWJhc2UtY2xpZW50LmpzXCI7XG5cbi8vIEltcG9ydCBBUEkgZnVuY3Rpb25zXG5pbXBvcnQge1xuICBsb2FkQ2l0aWVzLFxuICBsb2FkWm9uaW5ncyxcbiAgbG9hZFpvbmVzLFxuICBmaW5kRG9jdW1lbnQsXG4gIGdldFNlbGVjdGVkRG9jdW1lbnQsIC8vIEZ1bmN0aW9uIHRvIGdldCB0aGUgZG9jdW1lbnQgZGV0YWlscyBmcm9tIGFwaS5qc1xufSBmcm9tIFwiLi9hcGkuanNcIjtcblxuLy8gSW1wb3J0IFVJIGVsZW1lbnRzIGFuZCBmdW5jdGlvbnNcbmltcG9ydCB7XG4gIGNpdHlTZWxlY3QsXG4gIHpvbmluZ1NlbGVjdCxcbiAgem9uZVNlbGVjdCxcbiAgc3ludGhlc2lzQnRuLFxuICBzaG93U3RhdHVzLFxuICByZXNldFNlbGVjdCxcbiAgZm9ybWF0QXBpTmFtZSxcbiAgLy8gUmVmZXJlbmNlcyB0byBVSSBlbGVtZW50cyBmcm9tIHVpLmpzXG4gIHVzZXJTdGF0dXMsXG4gIGxvZ291dEJ0bixcbiAgbG9naW5MaW5rLFxuICBzaWdudXBMaW5rLFxufSBmcm9tIFwiLi91aS5qc1wiO1xuXG5pbXBvcnQgKiBhcyBhdXRoTW9kdWxlIGZyb20gXCIuL2F1dGgvYXV0aC5qc1wiO1xuXG5sZXQgY3VycmVudFVzZXIgPSBudWxsOyAvLyBWYXJpYWJsZSB0byBob2xkIHRoZSBjdXJyZW50IHVzZXIgc3RhdGVcblxuLy8gLS0tIEF1dGhlbnRpY2F0aW9uIFN0YXRlIE1hbmFnZW1lbnQgLS0tXG5mdW5jdGlvbiB1cGRhdGVVSUZvckF1dGhTdGF0ZSh1c2VyKSB7XG4gIGN1cnJlbnRVc2VyID0gdXNlcjsgLy8gVXBkYXRlIGdsb2JhbCB1c2VyIHN0YXRlXG4gIGlmICh1c2VyKSB7XG4gICAgLy8gVXNlciBpcyBzaWduZWQgaW5cbiAgICBpZiAodXNlclN0YXR1cykge1xuICAgICAgdXNlclN0YXR1cy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgICBpZiAobG9naW5MaW5rKSBsb2dpbkxpbmsuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBpZiAoc2lnbnVwTGluaykgc2lnbnVwTGluay5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGlmIChsb2dvdXRCdG4pIGxvZ291dEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWREb2N1bWVudCA9IGdldFNlbGVjdGVkRG9jdW1lbnQoKTtcbiAgICBpZiAoc2VsZWN0ZWREb2N1bWVudCAmJiBzZWxlY3RlZERvY3VtZW50LmlkKSB7XG4gICAgICBpZiAoc3ludGhlc2lzQnRuKSBzeW50aGVzaXNCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIHNob3dTdGF0dXMoXG4gICAgICAgIGBEb2N1bWVudCB0cm91dsOpIChTb3VyY2U6ICR7XG4gICAgICAgICAgZm9ybWF0QXBpTmFtZShzZWxlY3RlZERvY3VtZW50LnNvdXJjZV9wbHVfZGF0ZSkgfHwgXCJOb24gc3DDqWNpZmnDqWVcIlxuICAgICAgICB9KS4gUHLDqnQgw6AgY29uc3VsdGVyLmAsXG4gICAgICAgIFwic3VjY2Vzc1wiXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3ludGhlc2lzQnRuKSBzeW50aGVzaXNCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBVc2VyIGlzIHNpZ25lZCBvdXRcbiAgICBpZiAodXNlclN0YXR1cykgdXNlclN0YXR1cy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGlmIChsb2dpbkxpbmspIGxvZ2luTGluay5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGlmIChzaWdudXBMaW5rKSBzaWdudXBMaW5rLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgaWYgKGxvZ291dEJ0bikgbG9nb3V0QnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgaWYgKHN5bnRoZXNpc0J0bikgc3ludGhlc2lzQnRuLmRpc2FibGVkID0gdHJ1ZTsgLy8gQWx3YXlzIGRpc2FibGUgZG93bmxvYWQgaWYgbG9nZ2VkIG91dFxuICB9XG59XG5cbnN1cGFiYXNlLmF1dGgub25BdXRoU3RhdGVDaGFuZ2UoKGV2ZW50LCBzZXNzaW9uKSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBzZXNzaW9uPy51c2VyIHx8IG51bGw7XG5cbiAgYXV0aE1vZHVsZS5zZXRDdXJyZW50VXNlcih1c2VyKTtcblxuICB1cGRhdGVVSUZvckF1dGhTdGF0ZSh1c2VyKTtcblxuICBpZiAoZXZlbnQgPT09IFwiU0lHTkVEX09VVFwiKSB7XG4gICAgY29uc29sZS5sb2coXCJFdmVudCBTSUdORURfT1VUIHJlY2VpdmVkLiBSZWRpcmVjdGluZy5cIik7XG4gICAgLy8gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTsgLy8gVGhpcyBpcyBoYW5kbGVkIGJ5IGF1dGhNb2R1bGUuc2V0Q3VycmVudFVzZXIobnVsbClcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIlNJR05FRF9JTlwiKSB7XG4gICAgY29uc29sZS5sb2coXCJFdmVudCBTSUdORURfSU4gcmVjZWl2ZWQuIFVzZXIgZGF0YTpcIiwgdXNlci5lbWFpbCk7XG4gICAgLy8gVXNlciBpcyBzaWduZWQgaW4uIHNlc3Npb24udXNlciBoYXMgZGV0YWlscy5cbiAgICAvLyBMb2dpbi5qcyBoYW5kbGVzIHJlZGlyZWN0IGFmdGVyIGxvZ2luLCBzbyBubyBzcGVjaWZpYyBhY3Rpb24gaGVyZSB1bmxlc3MgbmVlZGVkLlxuICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIklOSVRJQUxfU0VTU0lPTlwiKSB7XG4gICAgY29uc29sZS5sb2coXCJFdmVudCBJTklUSUFMX1NFU1NJT04gcmVjZWl2ZWQuXCIpO1xuICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIlRPS0VOX1JFRlJFU0hFRFwiKSB7XG4gICAgY29uc29sZS5sb2coXCJFdmVudCBUT0tFTl9SRUZSRVNIRUQgcmVjZWl2ZWQuIFVzZXIgZGF0YTpcIiwgdXNlci5lbWFpbCk7XG4gIH1cbn0pO1xuXG4vLyBMb2dvdXQgZnVuY3Rpb25hbGl0eVxubG9nb3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gIHNob3dTdGF0dXMoXCJEw6ljb25uZXhpb24uLi5cIiwgXCJpbmZvXCIpO1xuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25PdXQoKTtcbiAgaWYgKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGxvZ2dpbmcgb3V0IHdpdGggU3VwYWJhc2U6XCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dTdGF0dXMoYEVycmV1ciBsb3JzIGRlIGxhIGTDqWNvbm5leGlvbjogJHtlcnJvci5tZXNzYWdlfWAsIFwiZGFuZ2VyXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJTdXBhYmFzZSBzaWduT3V0IHN1Y2Nlc3NmdWwuIG9uQXV0aFN0YXRlQ2hhbmdlIHdpbGwgaGFuZGxlIFVJIGFuZCByZWRpcmVjdC5cIlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyAtLS0gRG9jdW1lbnQgRG93bmxvYWQgTG9naWMgLS0tXG5mdW5jdGlvbiBkb3dubG9hZERvY3VtZW50KCkge1xuICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgc2hvd1N0YXR1cyhcIkF1dGhlbnRpZmljYXRpb24gcmVxdWlzZSBwb3VyIHTDqWzDqWNoYXJnZXIuXCIsIFwid2FybmluZ1wiKTtcbiAgICBzeW50aGVzaXNCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybjsgLy8gRXhpdCBpZiBub3QgYXV0aGVudGljYXRlZFxuICB9XG5cbiAgY29uc3Qgc2VsZWN0ZWREb2N1bWVudCA9IGdldFNlbGVjdGVkRG9jdW1lbnQoKTsgLy8gR2V0IGZyb20gYXBpLmpzXG4gIGlmIChzZWxlY3RlZERvY3VtZW50ICYmIHNlbGVjdGVkRG9jdW1lbnQuaWQpIHtcbiAgICBzaG93U3RhdHVzKFwiT3V2ZXJ0dXJlIGR1IGRvY3VtZW50Li4uXCIsIFwiaW5mb1wiKTtcbiAgICB3aW5kb3cub3BlbihgL3BsdS1zdW1tYXJ5P2lkPSR7c2VsZWN0ZWREb2N1bWVudC5pZH1gLCBcIl9ibGFua1wiKTtcbiAgICAvLyBSZS1kaXNwbGF5IHN1Y2Nlc3MgbWVzc2FnZSBhZnRlciBhIGRlbGF5XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBDaGVjayBpZiBidXR0b24gaXMgc3RpbGwgZW5hYmxlZCAoaS5lLiwgZG9jdW1lbnQgaXMgc3RpbGwgY29uc2lkZXJlZCB2YWxpZClcbiAgICAgIGlmICghc3ludGhlc2lzQnRuLmRpc2FibGVkKSB7XG4gICAgICAgIHNob3dTdGF0dXMoXG4gICAgICAgICAgYERvY3VtZW50IHRyb3V2w6kgKFNvdXJjZTogJHtcbiAgICAgICAgICAgIGZvcm1hdEFwaU5hbWUoc2VsZWN0ZWREb2N1bWVudC5zb3VyY2VfcGx1X2RhdGUpIHx8IFwiTm9uIHNww6ljaWZpw6llXCJcbiAgICAgICAgICB9KS4gUHLDqnQgw6AgY29uc3VsdGVyLmAsXG4gICAgICAgICAgXCJzdWNjZXNzXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCAxNTAwKTtcbiAgfSBlbHNlIHtcbiAgICBzaG93U3RhdHVzKFwiTGllbiBkdSBkb2N1bWVudCBub24gZGlzcG9uaWJsZS5cIiwgXCJ3YXJuaW5nXCIpO1xuICAgIHN5bnRoZXNpc0J0bi5kaXNhYmxlZCA9IHRydWU7IC8vIEVuc3VyZSBidXR0b24gaXMgZGlzYWJsZWQgaWYgbm8gVVJMXG4gIH1cbn1cblxuLy8gPT09IEV2ZW50IGxpc3RlbmVycyA9PT1cbmNpdHlTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcbiAgY29uc3QgY2l0eUlkID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICBsb2FkWm9uaW5ncyhjaXR5SWQpOyAvLyBDYWxsIEFQSSBmdW5jdGlvblxufSk7XG5cbnpvbmluZ1NlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICBjb25zdCB6b25pbmdJZCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgbG9hZFpvbmVzKHpvbmluZ0lkKTsgLy8gQ2FsbCBBUEkgZnVuY3Rpb25cbn0pO1xuXG56b25lU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHpvbmVJZCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgY29uc3Qgem9uaW5nSWQgPSB6b25pbmdTZWxlY3QudmFsdWU7IC8vIEdldCBjdXJyZW50IHpvbmluZyBzZWxlY3Rpb25cbiAgLy8gVE9ETyA6IHR5cG9sb2dpZVNlbGVjdCBsb2dpY1xuICBpZiAoem9uZUlkICYmIHpvbmluZ0lkKSB7XG4gICAgZmluZERvY3VtZW50KHpvbmluZ0lkLCB6b25lSWQsIFwiN2MwZjI4MzAtZjNmYy00YzY5LTkxMWMtNDcwMjg2ZjkxOTgyXCIpOyAvLyBDYWxsIEFQSSBmdW5jdGlvblxuICB9IGVsc2Uge1xuICAgIHNob3dTdGF0dXMoXCJWZXVpbGxleiBkJ2Fib3JkIHPDqWxlY3Rpb25uZXIgdW4gem9uaW5nLlwiLCBcIndhcm5pbmdcIik7XG4gIH1cbiAgLy8gaWYgKHpvbmluZ0lkKSB7XG4gIC8vICAgbG9hZFR5cG9sb2dpZXMoem9uZUlkLCB6b25pbmdJZCk7IC8vIENhbGwgQVBJIGZ1bmN0aW9uXG4gIC8vIH0gZWxzZSB7XG4gIC8vICAgc2hvd1N0YXR1cyhcIlZldWlsbGV6IGQnYWJvcmQgc8OpbGVjdGlvbm5lciB1biB6b25pbmcuXCIsIFwid2FybmluZ1wiKTtcbiAgLy8gfVxufSk7XG5cbi8vIHR5cG9sb2dpZVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuLy8gICBjb25zdCB0eXBvbG9naWVJZCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbi8vICAgY29uc3Qgem9uZUlkID0gem9uZVNlbGVjdC52YWx1ZTtcbi8vICAgY29uc3Qgem9uaW5nSWQgPSB6b25pbmdTZWxlY3QudmFsdWU7XG4vLyAgIGlmICh6b25lSWQgJiYgem9uaW5nSWQpIHtcbi8vICAgICBmaW5kRG9jdW1lbnQoem9uaW5nSWQsIHpvbmVJZCwgdHlwb2xvZ2llSWQpOyAvLyBDYWxsIEFQSSBmdW5jdGlvblxuLy8gICB9IGVsc2Uge1xuLy8gICAgIHNob3dTdGF0dXMoXG4vLyAgICAgICBcIlZldWlsbGV6IGQnYWJvcmQgc8OpbGVjdGlvbm5lciB1biB6b25pbmcgZXQgdW5lIHpvbmUuXCIsXG4vLyAgICAgICBcIndhcm5pbmdcIlxuLy8gICAgICk7XG4vLyAgIH1cbi8vIH0pO1xuXG5zeW50aGVzaXNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRvd25sb2FkRG9jdW1lbnQpO1xuXG4vLyA9PT0gSW5pdGlhbGlzYXRpb24gPT09XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBhc3luYyAoKSA9PiB7XG4gIC8vIEluaXRpYWxpemUgVUkgc3RhdGVcbiAgcmVzZXRTZWxlY3QoY2l0eVNlbGVjdCwgXCJDaGFyZ2VtZW50Li4uXCIpO1xuICByZXNldFNlbGVjdCh6b25pbmdTZWxlY3QsIFwiU8OpbGVjdGlvbm5leiBkJ2Fib3JkIHVuZSB2aWxsZVwiKTtcbiAgcmVzZXRTZWxlY3Qoem9uZVNlbGVjdCwgXCJTw6lsZWN0aW9ubmV6IGQnYWJvcmQgdW4gem9uYWdlXCIpO1xuICAvLyByZXNldFNlbGVjdCh0eXBvbG9naWVTZWxlY3QsIFwiU8OpbGVjdGlvbm5leiBkJ2Fib3JkIHVuZSB6b25lXCIpO1xuICBpZiAoc3ludGhlc2lzQnRuKSBzeW50aGVzaXNCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAvLyBzaG93U3RhdHVzKFwiSW5pdGlhbGlzYXRpb24uLi5cIiwgXCJpbmZvXCIpOyAvLyBUaGlzIG1pZ2h0IGJlIHByZW1hdHVyZSBvciBvdmVycmlkZGVuXG5cbiAgLy8gVGhlIG9uQXV0aFN0YXRlQ2hhbmdlIGxpc3RlbmVyIGlzIHNldCB1cCBhYm92ZSBhbmQgd2lsbCBjYWxsIHVwZGF0ZVVJRm9yQXV0aFN0YXRlLlxuICAvLyBJdCBoYW5kbGVzIElOSVRJQUxfU0VTU0lPTiwgd2hpY2ggc2hvdWxkIGNvdmVyIHRoZSB1c2VyJ3Mgc3RhdGUgb24gcGFnZSBsb2FkLlxuICAvLyBFeHBsaWNpdGx5IGNhbGxpbmcgZ2V0Q3VycmVudFVzZXIgYW5kIHVwZGF0ZVVJRm9yQXV0aFN0YXRlIGhlcmUgbWlnaHQgYmUgcmVkdW5kYW50XG4gIC8vIG9yIGNvdWxkIGNhdXNlIGEgZmxpY2tlciBpZiBvbkF1dGhTdGF0ZUNoYW5nZSBoYXNuJ3QgZmlyZWQgeWV0IHdpdGggdGhlIHRydWUgc3RhdGUuXG4gIC8vIEhvd2V2ZXIsIGl0IGNhbiBiZSBhIGZhbGxiYWNrLiBMZXQncyBlbnN1cmUgaXQgb25seSB1cGRhdGVzIGlmIGVsZW1lbnRzIGV4aXN0LlxuXG4gIGNvbnN0IGluaXRpYWxseVN0b3JlZFVzZXIgPSBhdXRoTW9kdWxlLmdldEN1cnJlbnRVc2VyKCk7XG4gIHVwZGF0ZVVJRm9yQXV0aFN0YXRlKGluaXRpYWxseVN0b3JlZFVzZXIpOyAvLyBUaGlzIHdpbGwgc2V0IHRoZSBpbml0aWFsIFVJIGJhc2VkIG9uIGxvY2FsU3RvcmFnZVxuXG4gIC8vIExvYWQgaW5pdGlhbCBkYXRhIGlmIG9uIHRoZSBtYWluIHBhZ2VcbiAgaWYgKGNpdHlTZWxlY3QgJiYgem9uaW5nU2VsZWN0ICYmIHpvbmVTZWxlY3QpIHtcbiAgICBzaG93U3RhdHVzKFwiSW5pdGlhbGlzYXRpb24uLi5cIiwgXCJpbmZvXCIpOyAvLyBTaG93IHRoaXMgb25seSB3aGVuIHJlbGV2YW50IHNlbGVjdG9ycyBhcmUgcHJlc2VudFxuICAgIHJlc2V0U2VsZWN0KGNpdHlTZWxlY3QsIFwiQ2hhcmdlbWVudC4uLlwiKTtcbiAgICByZXNldFNlbGVjdCh6b25pbmdTZWxlY3QsIFwiU8OpbGVjdGlvbm5leiBkJ2Fib3JkIHVuZSB2aWxsZVwiKTtcbiAgICByZXNldFNlbGVjdCh6b25lU2VsZWN0LCBcIlPDqWxlY3Rpb25uZXogZCdhYm9yZCB1biB6b25hZ2VcIik7XG4gICAgLy8gcmVzZXRTZWxlY3QodHlwb2xvZ2llU2VsZWN0LCBcIlPDqWxlY3Rpb25uZXogZCdhYm9yZCB1bmUgem9uZVwiKTtcbiAgICBhd2FpdCBsb2FkQ2l0aWVzKCk7IC8vIFN0YXJ0IGxvYWRpbmcgY2l0aWVzXG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgbm90IG9uIHRoZSBtYWluIHBhZ2Ugd2l0aCBzZWxlY3RvcnMsIGVuc3VyZSBhIHJlbGV2YW50IHN0YXR1cyBvciBjbGVhciBpdFxuICAgIC8vIEZvciBleGFtcGxlLCBvbiBsb2dpbi9zaWdudXAgcGFnZXMsIHN0YXR1c01lc3NhZ2UgbWlnaHQgYmUgdXNlZCBmb3Igb3RoZXIgdGhpbmdzLlxuICAgIC8vIElmIHN0YXR1c01lc3NhZ2UgZXhpc3RzIGFuZCBpc24ndCBtZWFudCBmb3IgYXV0aCBzdGF0ZSBoZXJlLCBjbGVhciBpdCBvciBzZXQgYXBwcm9wcmlhdGVseS5cbiAgICAvLyBUaGlzIGRlcGVuZHMgb24gd2hldGhlciBzdGF0dXNNZXNzYWdlIGlzIGEgc2hhcmVkIGVsZW1lbnQgb3IgcGFnZS1zcGVjaWZpYy5cbiAgICAvLyBGb3Igbm93LCB3ZSBhc3N1bWUgdXBkYXRlVUlGb3JBdXRoU3RhdGUgaGFuZGxlcyBpdHMgcGFydCBvZiBzdGF0dXMgbWVzc2FnZXMgcmVsYXRlZCB0byBsb2dpbiBwcm9tcHQuXG4gIH1cbn0pO1xuXG4vLyBFeHBvcnQgY3VycmVudFVzZXIgZm9yIHVzZSBpbiBhcGkuanNcbmV4cG9ydCB7IGN1cnJlbnRVc2VyIH07XG4iLCIvLyBzcmMvYXV0aC9hdXRoLmpzXG4vKipcbiAqIEF1dGhlbnRpY2F0aW9uIE1vZHVsZSAtIEJhc2VcbiAqIEBtb2R1bGUgYXV0aFxuICogQGRlc2NyaXB0aW9uIEJhc2UgbW9kdWxlIGZvciBhdXRoZW50aWNhdGlvbiB3aXRoIGNvbW1vbiBmdW5jdGlvbnMgYW5kIGNvbmZpZ3VyYXRpb25cbiAqIEB2ZXJzaW9uIDAuMC41XG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuNSAoMjAyNS0wNS0xNSk6IEFkZGVkIHNlc3Npb24gdmFsaWRhdGlvbiBhbmQgcHJvdGVjdGlvbiBhZ2FpbnN0IHN0YWxlIHNlc3Npb25zLlxuICogLSAwLjAuNCAoMjAyNS0wNS0xNSk6IFJlbW92YWwgb2YgRmlyZWJhc2UgQ2xvdWQgRnVuY3Rpb25zIGNvbnN0YW50cy5cbiAqIC0gMC4wLjMgKDIwMjUtMDUtMTMpOiBNb2RpZmllZCB0aGUgYXV0aGVudGljYXRpb24gc3RhdGUgbWFuYWdlbWVudCB0byB1c2UgU3VwYWJhc2UgQXV0aCBzeXN0ZW0uXG4gKiAtIDAuMC4yICgyMDI1LTA1LTEzKTogUmVvcmdhbml6YXRpb24gaW50byBzZXBhcmF0ZSBtb2R1bGVzXG4gKiAtIDAuMC4xICgyMDI1LTA1LTAzKTogSW5pdGlhbCBjcmVhdGlvblxuICovXG5cbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4uL3N1cGFiYXNlLWNsaWVudC5qc1wiO1xuXG4vLyBHbG9iYWwgYXV0aGVudGljYXRpb24gc3RhdGVcbmxldCBjdXJyZW50VXNlciA9IG51bGw7XG5sZXQgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdXNlclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXIgLSBVc2VyIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXIpIHtcbiAgY3VycmVudFVzZXIgPSB1c2VyO1xuICAvLyBQb3NzaWJsZSBzdG9yYWdlIGluIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxuICBpZiAodXNlcikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIGN1cnJlbnQgc2Vzc2lvbiBpcyBhY3RpdmUgd2l0aCBTdXBhYmFzZVxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFRydWUgaWYgc2Vzc2lvbiBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZVNlc3Npb24oKSB7XG4gIHRyeSB7XG4gICAgLy8gR2V0IGN1cnJlbnQgc2Vzc2lvbiBmcm9tIFN1cGFiYXNlXG4gICAgY29uc3Qge1xuICAgICAgZGF0YTogeyBzZXNzaW9uIH0sXG4gICAgICBlcnJvcjogc2Vzc2lvbkVycm9yLFxuICAgIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFNlc3Npb24oKTtcblxuICAgIC8vIE5vIHNlc3Npb24gb3IgZXJyb3IgcmV0cmlldmluZyBzZXNzaW9uXG4gICAgaWYgKHNlc3Npb25FcnJvciB8fCAhc2Vzc2lvbikge1xuICAgICAgY29uc29sZS5sb2coXCJObyB2YWxpZCBzZXNzaW9uIGZvdW5kXCIpO1xuICAgICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIHJlZnJlc2ggdGhlIHRva2VuIHRvIHZhbGlkYXRlIGl0IHdpdGggdGhlIHNlcnZlclxuICAgIGNvbnN0IHsgZXJyb3I6IHJlZnJlc2hFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5yZWZyZXNoU2Vzc2lvbigpO1xuXG4gICAgaWYgKHJlZnJlc2hFcnJvcikge1xuICAgICAgY29uc29sZS53YXJuKFwiU2Vzc2lvbiB2YWxpZGF0aW9uIGZhaWxlZDpcIiwgcmVmcmVzaEVycm9yKTtcbiAgICAgIC8vIEZvcmNlIGNsZWFyIHRoZSBpbnZhbGlkIHNlc3Npb25cbiAgICAgIGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbk91dCgpO1xuICAgICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gU2Vzc2lvbiBpcyB2YWxpZCwgdXBkYXRlIHRoZSBjdXJyZW50IHVzZXJcbiAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgIHNlc3Npb25WYWxpZGF0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcIlNlc3Npb24gdmFsaWRhdGlvbiBlcnJvcjpcIiwgZSk7XG4gICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY3VycmVudCB1c2VyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbGlkYXRlIC0gV2hldGhlciB0byB2YWxpZGF0ZSB0aGUgc2Vzc2lvbiB3aXRoIFN1cGFiYXNlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3R8bnVsbD59IFRoZSBjdXJyZW50IHVzZXIgb3IgbnVsbFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIodmFsaWRhdGUgPSB0cnVlKSB7XG4gIC8vIElmIHdlIG5lZWQgdG8gdmFsaWRhdGUgYW5kIGhhdmVuJ3QgZG9uZSBzbyB5ZXRcbiAgaWYgKHZhbGlkYXRlICYmICFzZXNzaW9uVmFsaWRhdGVkKSB7XG4gICAgYXdhaXQgdmFsaWRhdGVTZXNzaW9uKCk7XG4gIH1cblxuICAvLyBJZiBubyB2YWxpZGF0aW9uIG5lZWRlZCBvciBhbHJlYWR5IHZhbGlkYXRlZFxuICBpZiAoIXZhbGlkYXRlICYmICFjdXJyZW50VXNlcikge1xuICAgIC8vIFRyeSB0byByZXRyaWV2ZSBmcm9tIHN0b3JhZ2UgaWYgbm90IGluIG1lbW9yeVxuICAgIGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgIGlmIChzdG9yZWRVc2VyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjdXJyZW50VXNlciA9IEpTT04ucGFyc2Uoc3RvcmVkVXNlcik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciByZXRyaWV2aW5nIHVzZXI6XCIsIGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50VXNlcjtcbn1cblxuLyoqXG4gKiBTeW5jaHJvbm91cyB2ZXJzaW9uIG9mIGdldEN1cnJlbnRVc2VyIGZvciBub24tYXN5bmMgY29udGV4dHNcbiAqIFdBUk5JTkc6IFRoaXMgbWF5IHJldHVybiBzdGFsZSBkYXRhIGlmIHNlc3Npb24gaXMgaW52YWxpZFxuICogQHJldHVybnMge09iamVjdHxudWxsfSBUaGUgY3VycmVudCB1c2VyIG9yIG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyU3luYygpIHtcbiAgaWYgKCFjdXJyZW50VXNlcikge1xuICAgIGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgIGlmIChzdG9yZWRVc2VyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjdXJyZW50VXNlciA9IEpTT04ucGFyc2Uoc3RvcmVkVXNlcik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciByZXRyaWV2aW5nIHVzZXI6XCIsIGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50VXNlcjtcbn1cblxuLyoqXG4gKiBMb2dzIG91dCB0aGUgdXNlclxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gIHRyeSB7XG4gICAgLy8gU2lnbiBvdXQgZnJvbSBTdXBhYmFzZVxuICAgIGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbk91dCgpO1xuXG4gICAgLy8gQ2xlYXIgbG9jYWwgc3RhdGVcbiAgICBjdXJyZW50VXNlciA9IG51bGw7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG5cbiAgICAvLyBSZWRpcmVjdCB0byB0aGUgaG9tZSBwYWdlIGFmdGVyIGxvZ291dFxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGR1cmluZyBsb2dvdXQ6XCIsIGVycm9yKTtcbiAgICAvLyBTdGlsbCBjbGVhciBsb2NhbCBzdGF0ZSBldmVuIGlmIFN1cGFiYXNlIHNpZ25PdXQgZmFpbHNcbiAgICBjdXJyZW50VXNlciA9IG51bGw7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW4gd2l0aCB2YWxpZCBzZXNzaW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbGlkYXRlIC0gV2hldGhlciB0byB2YWxpZGF0ZSB3aXRoIFN1cGFiYXNlIGZpcnN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gVHJ1ZSBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW4gd2l0aCB2YWxpZCBzZXNzaW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc0xvZ2dlZEluKHZhbGlkYXRlID0gdHJ1ZSkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIodmFsaWRhdGUpO1xuICByZXR1cm4gdXNlciAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBTeW5jaHJvbm91cyB2ZXJzaW9uIG9mIGlzTG9nZ2VkSW5cbiAqIFdBUk5JTkc6IFRoaXMgbWF5IHJldHVybiBpbmNvcnJlY3QgcmVzdWx0cyBpZiBzZXNzaW9uIGlzIGludmFsaWRcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHVzZXIgYXBwZWFycyB0byBiZSBsb2dnZWQgaW4gbG9jYWxseVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dnZWRJblN5bmMoKSB7XG4gIHJldHVybiBnZXRDdXJyZW50VXNlclN5bmMoKSAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBQcm90ZWN0cyBhIHBhZ2UgdGhhdCByZXF1aXJlcyBhdXRoZW50aWNhdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IHJlZGlyZWN0VXJsIC0gVVJMIHRvIHJlZGlyZWN0IGlmIG5vdCBhdXRoZW50aWNhdGVkXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gVHJ1ZSBpZiBhdXRoZW50aWNhdGVkLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByb3RlY3RQYWdlKHJlZGlyZWN0VXJsID0gXCIvbG9naW5cIikge1xuICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgdmFsaWRhdGVTZXNzaW9uKCk7XG5cbiAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgLy8gUmVkaXJlY3QgdG8gbG9naW4gcGFnZVxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVcmw7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYXV0aCBvbiBwYWdlIGxvYWRcbiAqIENhbGwgdGhpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXIgYXBwIGluaXRpYWxpemF0aW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0QXV0aCgpIHtcbiAgLy8gVmFsaWRhdGUgc2Vzc2lvbiBvbiBwYWdlIGxvYWRcbiAgYXdhaXQgdmFsaWRhdGVTZXNzaW9uKCk7XG5cbiAgLy8gU2V0IHVwIGF1dGggc3RhdGUgY2hhbmdlIGxpc3RlbmVyXG4gIHN1cGFiYXNlLmF1dGgub25BdXRoU3RhdGVDaGFuZ2UoYXN5bmMgKGV2ZW50LCBzZXNzaW9uKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJBdXRoIHN0YXRlIGNoYW5nZWQ6XCIsIGV2ZW50KTtcblxuICAgIGlmIChldmVudCA9PT0gXCJTSUdORURfSU5cIiAmJiBzZXNzaW9uKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gXCJTSUdORURfT1VUXCIpIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKG51bGwpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IFwiVE9LRU5fUkVGUkVTSEVEXCIpIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIlVTRVJfVVBEQVRFRFwiKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhbiBlcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIEVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIGVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZSwgZWxlbWVudElkID0gXCJlcnJvck1lc3NhZ2VcIikge1xuICBjb25zdCBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZXJyb3JFbGVtZW50KSB7XG4gICAgZXJyb3JFbGVtZW50LmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGxheXMgYSBzdGF0dXMgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBNZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gTWVzc2FnZSB0eXBlIChzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBkYW5nZXIpXG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd1N0YXR1cyhcbiAgbWVzc2FnZSxcbiAgdHlwZSA9IFwiaW5mb1wiLFxuICBlbGVtZW50SWQgPSBcInN0YXR1c01lc3NhZ2VcIlxuKSB7XG4gIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoc3RhdHVzRWxlbWVudCkge1xuICAgIHN0YXR1c0VsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCBhbGVydC0qIGNsYXNzZXNcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcImFsZXJ0LVwiKSkge1xuICAgICAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgY2xhc3MgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZVxuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmFkZChgYWxlcnQtJHt0eXBlfWApO1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU3RhdHVzIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogSGlkZXMgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIGhpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gc2hvd1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93TG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn1cblxuLyoqXG4gKiBIaWRlcyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUxvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufVxuXG4vLyBFeHBvcnQgdGhlIG5lY2Vzc2FyeSBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlc1xuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRDdXJyZW50VXNlcixcbiAgZ2V0Q3VycmVudFVzZXJTeW5jLFxuICBzZXRDdXJyZW50VXNlcixcbiAgbG9nb3V0LFxuICBpc0xvZ2dlZEluLFxuICBpc0xvZ2dlZEluU3luYyxcbiAgdmFsaWRhdGVTZXNzaW9uLFxuICBwcm90ZWN0UGFnZSxcbiAgaW5pdEF1dGgsXG4gIHNob3dFcnJvcixcbiAgc2hvd1N0YXR1cyxcbiAgaGlkZUVsZW1lbnQsXG4gIHNob3dFbGVtZW50LFxuICBzaG93TG9hZGluZyxcbiAgaGlkZUxvYWRpbmcsXG59O1xuIiwiLy8ganMvbWFwcGluZ3MuanNcbi8qKlxuICogRmlyZWJhc2UgTWFwcGluZ3NcbiAqIEBtb2R1bGUgbWFwcGluZ3NcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBjb250YWlucyBtYXBwaW5ncyBmb3Igem9uZSBuYW1lcyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICogQHRvZG8gQWRkIG1vcmUgbWFwcGluZ3MgYXMgbmVlZGVkLlxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjEgKDIwMjUtMDQtMjEpOiBNYXBwaW5ncyBmb3IgR3Jlbm9ibGUuXG4gKi9cblxuLy8gS2V5czogbmFtZSBpbiB0aGUgZGF0YWJhc2UgKGxvd2VyY2FzZSwgdW5kZXJzY29yZSlcbi8vIFZhbHVlczogZGlzcGxheWVkIG5hbWVkIG9uIHdlYiBhcHAgKHNwZWNpZmljIGZvcm1hdClcbmV4cG9ydCBjb25zdCB6b25lTmFtZU1hcHBpbmdzID0ge1xuICB6b25lX2F1OiBcIlpvbmUgQVVcIixcbiAgem9uZV9hdWMxOiBcIlpvbmUgQVVDMVwiLFxuICB6b25lX2F1YzI6IFwiWm9uZSBBVUMyXCIsXG4gIHpvbmVfYXVjMzogXCJab25lIEFVQzNcIixcbiAgem9uZV9hdWNydTEwOiBcIlpvbmUgQVVDUlUxMFwiLFxuICB6b25lX2F1ZDE6IFwiWm9uZSBBVUQxXCIsXG4gIHpvbmVfYXVkMjogXCJab25lIEFVRDJcIixcbiAgem9uZV9hdWQzOiBcIlpvbmUgQVVEM1wiLFxuICB6b25lX2F1ZDQ6IFwiWm9uZSBBVUQ0XCIsXG4gIHpvbmVfYXVlMTogXCJab25lIEFVRTFcIixcbiAgem9uZV9hdXAxcjogXCJab25lIEFVUDFyXCIsXG4gIHpvbmVfYTogXCJab25lIEFcIixcbiAgem9uZV9hbDogXCJab25lIEFMXCIsXG4gIHpvbmVfbjogXCJab25lIE5cIixcbiAgem9uZV9ubDogXCJab25lIE5MXCIsXG4gIHpvbmVfdWUxOiBcIlpvbmUgVUUxXCIsXG4gIHpvbmVfdWUyOiBcIlpvbmUgVUUyXCIsXG4gIHpvbmVfdWUzOiBcIlpvbmUgVUUzXCIsXG4gIHpvbmVfdWU0OiBcIlpvbmUgVUU0XCIsXG4gIHpvbmVfdXY6IFwiWm9uZSBVVlwiLFxuICB6b25lX3V6MTogXCJab25lIFVaMVwiLFxuICB6b25lX3V6MjogXCJab25lIFVaMlwiLFxuICB6b25lX3V6MzogXCJab25lIFVaM1wiLFxuICB6b25lX3V6NDogXCJab25lIFVaNFwiLFxuICB6b25lX3VhMTogXCJab25lIFVBMVwiLFxuICB6b25lX3VhMjogXCJab25lIFVBMlwiLFxuICB6b25lX3VhMzogXCJab25lIFVBM1wiLFxuICB6b25lX3ViOiBcIlpvbmUgVUJcIixcbiAgem9uZV91YzE6IFwiWm9uZSBVQzFcIixcbiAgem9uZV91YzI6IFwiWm9uZSBVQzJcIixcbiAgem9uZV91YzM6IFwiWm9uZSBVQzNcIixcbiAgem9uZV91Y3J1MTogXCJab25lIFVDUlUxXCIsXG4gIHpvbmVfdWNydTI6IFwiWm9uZSBVQ1JVMlwiLFxuICB6b25lX3VjcnUzOiBcIlpvbmUgVUNSVTNcIixcbiAgem9uZV91Y3J1NDogXCJab25lIFVDUlU0XCIsXG4gIHpvbmVfdWNydTU6IFwiWm9uZSBVQ1JVNVwiLFxuICB6b25lX3VjcnU2OiBcIlpvbmUgVUNSVTZcIixcbiAgem9uZV91Y3J1NzogXCJab25lIFVDUlU3XCIsXG4gIHpvbmVfdWNydTg6IFwiWm9uZSBVQ1JVOFwiLFxuICB6b25lX3VjcnU5OiBcIlpvbmUgVUNSVTlcIixcbiAgem9uZV91Y3J1MTE6IFwiWm9uZSBVQ1JVMTFcIixcbiAgem9uZV91ZDE6IFwiWm9uZSBVRDFcIixcbiAgem9uZV91ZDI6IFwiWm9uZSBVRDJcIixcbiAgem9uZV91ZDM6IFwiWm9uZSBVRDNcIixcbiAgem9uZV91ZDQ6IFwiWm9uZSBVRDRcIixcbn07XG4iLCIvLyBzcmMvanMvc3VwYWJhc2UtY2xpZW50LmpzXG4vKipcbiAqIFN1cGFiYXNlIENsaWVudFxuICogQG1vZHVsZSBzdXBhYmFzZS1jbGllbnRcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBoYW5kbGVzIHRoZSBTdXBhYmFzZSBjbGllbnQgaW5pdGlhbGl6YXRpb24gYW5kIGNvbmZpZ3VyYXRpb24uXG4gKiBAdmVyc2lvbiAwLjAuMlxuICogQGF1dGhvciBHcmV5UGFuZGFcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4yICgyMDI1LTA1LTI3KTogQWRkZWQgZW52aXJvbmVtZW50IHZhcmlhYmxlcyBlcnJvciBoYW5kbGluZyBmb3IgbWlzc2luZy5cbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDkpOiBJbml0aWFsIHZlcnNpb24gd2l0aCBiYXNpYyBTdXBhYmFzZSBjbGllbnQgaW5pdGlhbGl6YXRpb24uXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiO1xuXG5jb25zdCBzdXBhYmFzZVVybCA9IHByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTDtcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52LlNVUEFCQVNFX0FOT05fS0VZO1xuXG5pZiAoIXN1cGFiYXNlVXJsIHx8ICFzdXBhYmFzZUFub25LZXkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBTdXBhYmFzZSBlbnZpcm9ubWVudCB2YXJpYWJsZXNcIik7XG59XG5cbmNvbnN0IGNsaWVudCA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VBbm9uS2V5KTtcblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY2xpZW50O1xuIiwiLy8gcHVibGljL2pzL3VpLmpzXG4vKipcbiAqIEZpcmViYXNlIFVJXG4gKiBAbW9kdWxlIHVpXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBtb2R1bGUgaGFuZGxlcyB0aGUgVUkgZWxlbWVudHMgYW5kIHV0aWxpdHkgZnVuY3Rpb25zIGZvciB0aGUgYXBwbGljYXRpb24uXG4gKiBAdmVyc2lvbiAwLjAuMVxuICogQGF1dGhvciBHcmV5UGFuZGFcbiAqIEB0b2RvIFJld29yayBvbiB0aGUgbWVzc2FnZXMgdG8gXCJsb2dpbiBiZWZvcmUgZG93bmxvYWRpbmdcIlxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjEgKDIwMjUtMDQtMjYpOiBJbml0aWFsIHZlcnNpb24gd2l0aCBiYXNpYyBVSSBmdW5jdGlvbnMgYW5kIGVsZW1lbnQgcmVmZXJlbmNlcy5cbiAqL1xuXG4vLyBJbXBvcnQgbWFwcGluZ3MgbmVlZGVkIGZvciBmb3JtYXR0aW5nXG5pbXBvcnQgeyB6b25lTmFtZU1hcHBpbmdzIH0gZnJvbSBcIi4vbWFwcGluZ3NcIjtcblxuLy8gLS0tIERPTSBFbGVtZW50IFJlZmVyZW5jZXMgLS0tXG5jb25zdCBjaXR5U2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5U2VsZWN0XCIpO1xuY29uc3Qgem9uaW5nU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25pbmdTZWxlY3RcIik7XG5jb25zdCB6b25lU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lU2VsZWN0XCIpO1xuY29uc3QgdHlwb2xvZ2llU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBvbG9naWVTZWxlY3RcIik7XG5jb25zdCBzeW50aGVzaXNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN5bnRoZXNpc0J0blwiKTtcbmNvbnN0IHN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c01lc3NhZ2VcIik7XG5cbi8vIFNwaW5uZXJzIChlbnN1cmUgdGhlc2UgSURzIGV4aXN0IGluIHlvdXIgaW5kZXguaHRtbClcbmNvbnN0IGNpdHlTcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5U3Bpbm5lclwiKTtcbmNvbnN0IHpvbmluZ1NwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmluZ1NwaW5uZXJcIik7XG5jb25zdCB6b25lU3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZVNwaW5uZXJcIik7XG5jb25zdCB0eXBvbG9naWVTcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBvbG9naWVTcGlubmVyXCIpO1xuY29uc3QgZG9jdW1lbnRTcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb2N1bWVudFNwaW5uZXJcIik7IC8vIEZvciB0aGUgZmluYWwgc2VhcmNoL2Rvd25sb2FkIGJ1dHRvbiBhcmVhXG5cbi8vIE5ldyBlbGVtZW50cyBmb3IgQXV0aCBVSVxuY29uc3QgdXNlclN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlclN0YXR1c1wiKTtcbmNvbnN0IGxvZ291dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb3V0QnRuXCIpO1xuY29uc3QgbG9naW5MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbkxpbmtcIik7IC8vIFJlZmVyZW5jZSB0byB0aGUgbG9naW4gbGluay9idXR0b25cbmNvbnN0IHNpZ251cExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ251cExpbmtcIik7IC8vIFJlZmVyZW5jZSB0byB0aGUgc2lnbnVwIGxpbmsvYnV0dG9uXG4vLyAtLS0gRW5kIERPTSBFbGVtZW50IFJlZmVyZW5jZXMgLS0tXG5cbi8vIC0tLSBVSSBVdGlsaXR5IEZ1bmN0aW9ucyAtLS1cblxuLyoqXG4gKiBBZmZpY2hlIHVuIG1lc3NhZ2UgZGUgc3RhdHV0IChldCB0eXBlOiBpbmZvLCBzdWNjZXNzLCBkYW5nZXIsIHdhcm5pbmcpXG4gKi9cbmZ1bmN0aW9uIHNob3dTdGF0dXMobWVzc2FnZSwgdHlwZSA9IFwiaW5mb1wiKSB7XG4gIGlmIChzdGF0dXNNZXNzYWdlKSB7XG4gICAgc3RhdHVzTWVzc2FnZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgLy8gRW5zdXJlIG9ubHkgb25lIGFsZXJ0IGNsYXNzIGlzIGFjdGl2ZSBhdCBhIHRpbWVcbiAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTmFtZSA9IGBzdGF0dXMtbWVzc2FnZSBhbGVydCBhbGVydC0ke3R5cGV9YDtcbiAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7IC8vIE1ha2Ugc3VyZSBpdCdzIHZpc2libGVcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLndhcm4oXCJTdGF0dXMgbWVzc2FnZSBlbGVtZW50IG5vdCBmb3VuZC5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBBZmZpY2hlIG91IGNhY2hlIHVuIHNwaW5uZXIgQm9vdHN0cmFwXG4gKiBAcGFyYW0gc3Bpbm5lckVsZW1lbnQgTCfDqWzDqW1lbnQgU1BBTiBkdSBzcGlubmVyXG4gKiBAcGFyYW0gc2hvdyBUcnVlIHBvdXIgYWZmaWNoZXIsIGZhbHNlIHBvdXIgY2FjaGVyXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZVNwaW5uZXIoc3Bpbm5lckVsZW1lbnQsIHNob3cpIHtcbiAgaWYgKHNwaW5uZXJFbGVtZW50KSB7XG4gICAgc3Bpbm5lckVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImQtbm9uZVwiLCAhc2hvdyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gY29uc29sZS53YXJuKFwiU3Bpbm5lciBlbGVtZW50IG5vdCBmb3VuZCBmb3IgdG9nZ2xpbmcuXCIpOyAvLyBPcHRpb25hbDogbG9nIGlmIHNwaW5uZXIgbWlzc2luZ1xuICB9XG59XG5cbi8qKlxuICogUsOpaW5pdGlhbGlzZSB1biDDqWzDqW1lbnQgc2VsZWN0IGF2ZWMgdW5lIG9wdGlvbiBwYXIgZMOpZmF1dFxuICovXG5mdW5jdGlvbiByZXNldFNlbGVjdChzZWxlY3RFbGVtZW50LCBkZWZhdWx0VGV4dCkge1xuICBpZiAoc2VsZWN0RWxlbWVudCkge1xuICAgIHNlbGVjdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJcIj4ke1xuICAgICAgZGVmYXVsdFRleHQgfHwgXCJTw6lsZWN0aW9ubmV6IHVuZSBvcHRpb25cIlxuICAgIH08L29wdGlvbj5gO1xuICAgIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlOyAvLyBEaXNhYmxlIGJ5IGRlZmF1bHQgb24gcmVzZXRcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLndhcm4oXCJTZWxlY3QgZWxlbWVudCBub3QgZm91bmQgZm9yIHJlc2V0LlwiKTtcbiAgfVxufVxuXG4vKipcbiAqIEZvcm1hdGUgdW4gbmFtZSByZcOndSBkZSBsJ0FQSSAoZW5sw6h2ZSB1bmRlcnNjb3JlcywgY2FwaXRhbGlzZSlcbiAqIFV0aWxpc8OpIGNvbW1lIGZhbGxiYWNrIHNpIGxlIG1hcHBhZ2Ugc3DDqWNpZmlxdWUgbidleGlzdGUgcGFzLlxuICovXG5mdW5jdGlvbiBmb3JtYXRBcGlOYW1lKG5hbWUpIHtcbiAgaWYgKCFuYW1lKSByZXR1cm4gXCJcIjtcbiAgLy8gUmVwbGFjZSB1bmRlcnNjb3JlcyB3aXRoIHNwYWNlcywgdGhlbiBjYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgZWFjaCB3b3JkXG4gIHJldHVybiBuYW1lLnJlcGxhY2UoL18vZywgXCIgXCIpLnJlcGxhY2UoL1xcYlxcdy9nLCAoY2hhcikgPT4gY2hhci50b1VwcGVyQ2FzZSgpKTtcbn1cblxuLyoqXG4gKiBQZXVwbGUgdW4gc8OpbGVjdGV1ciBhdmVjIGRlcyBvcHRpb25zXG4gKiBAcGFyYW0gc2VsZWN0RWxlbWVudCBMJ8OpbMOpbWVudCBzZWxlY3Qgw6AgcmVtcGxpclxuICogQHBhcmFtIGRhdGEgVGFibGVhdSBkJ29iamV0cyB7aWQsIG5hbWV9XG4gKiBAcGFyYW0gZGVmYXVsdE9wdGlvblRleHQgVGV4dGUgZGUgbGEgcHJlbWnDqHJlIG9wdGlvbiBkw6lzYWN0aXbDqWVcbiAqIEBwYXJhbSBlbXB0eURhdGFUZXh0IFRleHRlIHNpIGxlIHRhYmxlYXUgZGF0YSBlc3QgdmlkZVxuICogQHBhcmFtIGRhdGFUeXBlICdjaXR5JywgJ3pvbmluZycsICd6b25lJywgb3UgJ3R5cG9sb2d5JyBwb3VyIGxlIGZvcm1hdGFnZSBjb25kaXRpb25uZWxcbiAqL1xuZnVuY3Rpb24gcG9wdWxhdGVTZWxlY3QoXG4gIHNlbGVjdEVsZW1lbnQsXG4gIGRhdGEsXG4gIGRlZmF1bHRPcHRpb25UZXh0LFxuICBlbXB0eURhdGFUZXh0LFxuICBkYXRhVHlwZSAvLyBVc2VkIGZvciBjb25kaXRpb25hbCBmb3JtYXR0aW5nIChlLmcuLCB6b25lcylcbikge1xuICBpZiAoIXNlbGVjdEVsZW1lbnQpIHtcbiAgICBjb25zb2xlLndhcm4oXCJTZWxlY3QgZWxlbWVudCBub3QgZm91bmQgZm9yIHBvcHVsYXRpb24uXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJlc2V0U2VsZWN0KHNlbGVjdEVsZW1lbnQsIGRlZmF1bHRPcHRpb25UZXh0KTsgLy8gUmVzZXQgZmlyc3RcblxuICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICBzZWxlY3RFbGVtZW50LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtlbXB0eURhdGFUZXh0fTwvb3B0aW9uPmA7XG4gICAgc2VsZWN0RWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBJbmRpY2F0ZSBubyBkYXRhIHdhcyBwb3B1bGF0ZWRcbiAgfVxuXG4gIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gaXRlbS5pZDtcblxuICAgIC8vIC0tLSBDb25kaXRpb25hbCBGb3JtYXR0aW5nIExvZ2ljIC0tLVxuICAgIGxldCBkaXNwbGF5VGV4dCA9IFwiXCI7XG4gICAgLy8gSWYgaXQncyBhICd6b25lJyBhbmQgYSBtYXBwaW5nIGV4aXN0cyBmb3IgaXRzICduYW1lJ1xuICAgIGlmIChkYXRhVHlwZSA9PT0gXCJ6b25lXCIgJiYgem9uZU5hbWVNYXBwaW5ncy5oYXNPd25Qcm9wZXJ0eShpdGVtLm5hbWUpKSB7XG4gICAgICBkaXNwbGF5VGV4dCA9IHpvbmVOYW1lTWFwcGluZ3NbaXRlbS5uYW1lXTsgLy8gVXNlIHRoZSBtYXBwZWQgbmFtZVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPdGhlcndpc2UsIHVzZSB0aGUgZ2VuZXJhbCBmb3JtYXR0aW5nIGZ1bmN0aW9uXG4gICAgICBkaXNwbGF5VGV4dCA9IGZvcm1hdEFwaU5hbWUoaXRlbS5uYW1lKTtcbiAgICB9XG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gZGlzcGxheVRleHQ7IC8vIEFwcGx5IHRoZSBjaG9zZW4gdGV4dFxuXG4gICAgc2VsZWN0RWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9KTtcblxuICBzZWxlY3RFbGVtZW50LmRpc2FibGVkID0gZmFsc2U7IC8vIEVuYWJsZSB0aGUgc2VsZWN0IGFzIGl0IGhhcyBvcHRpb25zXG4gIHJldHVybiB0cnVlOyAvLyBJbmRpY2F0ZSBkYXRhIHdhcyBwb3B1bGF0ZWRcbn1cblxuLy8gLS0tIEVuZCBVSSBVdGlsaXR5IEZ1bmN0aW9ucyAtLS1cblxuLy8gLS0tIEV4cG9ydCBFbGVtZW50cyBhbmQgRnVuY3Rpb25zIC0tLVxuZXhwb3J0IHtcbiAgY2l0eVNlbGVjdCxcbiAgem9uaW5nU2VsZWN0LFxuICB6b25lU2VsZWN0LFxuICB0eXBvbG9naWVTZWxlY3QsXG4gIHN5bnRoZXNpc0J0bixcbiAgc3RhdHVzTWVzc2FnZSxcbiAgY2l0eVNwaW5uZXIsXG4gIHpvbmluZ1NwaW5uZXIsXG4gIHpvbmVTcGlubmVyLFxuICB0eXBvbG9naWVTcGlubmVyLFxuICBkb2N1bWVudFNwaW5uZXIsXG4gIHNob3dTdGF0dXMsXG4gIHRvZ2dsZVNwaW5uZXIsXG4gIHJlc2V0U2VsZWN0LFxuICBmb3JtYXRBcGlOYW1lLFxuICBwb3B1bGF0ZVNlbGVjdCxcbiAgLy8gRXhwb3J0IG5ldyBhdXRoLXJlbGF0ZWQgZWxlbWVudHNcbiAgdXNlclN0YXR1cyxcbiAgbG9nb3V0QnRuLFxuICBsb2dpbkxpbmssXG4gIHNpZ251cExpbmssXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwianMvXCIgKyBjaHVua0lkICsgXCIuYnVuZGxlLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcInVyYmFuZG9jc193ZWJhcHA6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoL15ibG9iOi8sIFwiXCIpLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybCArIFwiLi4vXCI7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYXBwXCI6IDBcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uZi5qID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSA/IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA6IHVuZGVmaW5lZDtcblx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cblx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG5cdFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiAoaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF0pKTtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG5cdFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuXHRcdFx0XHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCk7XG5cdFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdFx0XHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpKSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhWzFdKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkLCBcImNodW5rLVwiICsgY2h1bmtJZCwgY2h1bmtJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG59O1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt1cmJhbmRvY3Nfd2ViYXBwXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3VyYmFuZG9jc193ZWJhcHBcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3N1cGFiYXNlX3N1cGFiYXNlLWpzX2Rpc3RfbW9kdWxlX2luZGV4X2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL2FwcC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9