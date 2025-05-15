/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/js/ui.js ***!
  \**********************/
/* unused harmony exports villeSelect, zonageSelect, zoneSelect, typologieSelect, downloadBtn, statusMessage, villeSpinner, zonageSpinner, zoneSpinner, typologieSpinner, documentSpinner, showStatus, toggleSpinner, resetSelect, formatApiName, populateSelect, userStatus, logoutBtn, loginLink, signupLink */
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
const villeSelect = document.getElementById("villeSelect");
const zonageSelect = document.getElementById("zonageSelect");
const zoneSelect = document.getElementById("zoneSelect");
const typologieSelect = document.getElementById("typologieSelect");
const downloadBtn = document.getElementById("downloadBtn");
const statusMessage = document.getElementById("statusMessage");

// Spinners (ensure these IDs exist in your index.html)
const villeSpinner = document.getElementById("villeSpinner");
const zonageSpinner = document.getElementById("zonageSpinner");
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
 * Formate un nom reçu de l'API (enlève underscores, capitalise)
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
 * @param data Tableau d'objets {id, nom}
 * @param defaultOptionText Texte de la première option désactivée
 * @param emptyDataText Texte si le tableau data est vide
 * @param dataType 'ville', 'zonage', 'zone', ou 'typologie' pour le formatage conditionnel
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
    // If it's a 'zone' and a mapping exists for its 'nom'
    if (dataType === "zone" && _mappings__WEBPACK_IMPORTED_MODULE_0__.zoneNameMappings.hasOwnProperty(item.nom)) {
      displayText = _mappings__WEBPACK_IMPORTED_MODULE_0__.zoneNameMappings[item.nom]; // Use the mapped name
    } else {
      // Otherwise, use the general formatting function
      displayText = formatApiName(item.nom);
    }
    option.textContent = displayText; // Apply the chosen text

    selectElement.appendChild(option);
  });

  selectElement.disabled = false; // Enable the select as it has options
  return true; // Indicate data was populated
}

// --- End UI Utility Functions ---

// --- Export Elements and Functions ---


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdWkuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM3REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQzhDOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FOztBQUVwRTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQsMERBQTBEO0FBQzFEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELEtBQUs7QUFDakUsOENBQThDO0FBQzlDLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixnRUFBZ0U7QUFDaEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxtQ0FBbUM7QUFDbkMsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpREFBaUQ7O0FBRWpEO0FBQ0Esa0RBQWtELGNBQWM7QUFDaEU7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix1REFBZ0I7QUFDL0Msb0JBQW9CLHVEQUFnQixZQUFZO0FBQ2hELE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7O0FBRXRDO0FBQ0EsR0FBRzs7QUFFSCxrQ0FBa0M7QUFDbEMsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBdUJFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9tYXBwaW5ncy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3VpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGpzL21hcHBpbmdzLmpzXG4vKipcbiAqIEZpcmViYXNlIE1hcHBpbmdzXG4gKiBAbW9kdWxlIG1hcHBpbmdzXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBtb2R1bGUgY29udGFpbnMgbWFwcGluZ3MgZm9yIHpvbmUgbmFtZXMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKiBAdmVyc2lvbiAwLjAuMVxuICogQGF1dGhvciBHcmV5UGFuZGFcbiAqIEB0b2RvIEFkZCBtb3JlIG1hcHBpbmdzIGFzIG5lZWRlZC5cbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4xICgyMDI1LTA0LTIxKTogTWFwcGluZ3MgZm9yIEdyZW5vYmxlLlxuICovXG5cbi8vIEtleXM6IG5hbWUgaW4gdGhlIGRhdGFiYXNlIChsb3dlcmNhc2UsIHVuZGVyc2NvcmUpXG4vLyBWYWx1ZXM6IGRpc3BsYXllZCBuYW1lZCBvbiB3ZWIgYXBwIChzcGVjaWZpYyBmb3JtYXQpXG5leHBvcnQgY29uc3Qgem9uZU5hbWVNYXBwaW5ncyA9IHtcbiAgem9uZV9hdTogXCJab25lIEFVXCIsXG4gIHpvbmVfYXVjMTogXCJab25lIEFVQzFcIixcbiAgem9uZV9hdWMyOiBcIlpvbmUgQVVDMlwiLFxuICB6b25lX2F1YzM6IFwiWm9uZSBBVUMzXCIsXG4gIHpvbmVfYXVjcnUxMDogXCJab25lIEFVQ1JVMTBcIixcbiAgem9uZV9hdWQxOiBcIlpvbmUgQVVEMVwiLFxuICB6b25lX2F1ZDI6IFwiWm9uZSBBVUQyXCIsXG4gIHpvbmVfYXVkMzogXCJab25lIEFVRDNcIixcbiAgem9uZV9hdWQ0OiBcIlpvbmUgQVVENFwiLFxuICB6b25lX2F1ZTE6IFwiWm9uZSBBVUUxXCIsXG4gIHpvbmVfYXVwMXI6IFwiWm9uZSBBVVAxclwiLFxuICB6b25lX2E6IFwiWm9uZSBBXCIsXG4gIHpvbmVfYWw6IFwiWm9uZSBBTFwiLFxuICB6b25lX246IFwiWm9uZSBOXCIsXG4gIHpvbmVfbmw6IFwiWm9uZSBOTFwiLFxuICB6b25lX3VlMTogXCJab25lIFVFMVwiLFxuICB6b25lX3VlMjogXCJab25lIFVFMlwiLFxuICB6b25lX3VlMzogXCJab25lIFVFM1wiLFxuICB6b25lX3VlNDogXCJab25lIFVFNFwiLFxuICB6b25lX3V2OiBcIlpvbmUgVVZcIixcbiAgem9uZV91ejE6IFwiWm9uZSBVWjFcIixcbiAgem9uZV91ejI6IFwiWm9uZSBVWjJcIixcbiAgem9uZV91ejM6IFwiWm9uZSBVWjNcIixcbiAgem9uZV91ejQ6IFwiWm9uZSBVWjRcIixcbiAgem9uZV91YTE6IFwiWm9uZSBVQTFcIixcbiAgem9uZV91YTI6IFwiWm9uZSBVQTJcIixcbiAgem9uZV91YTM6IFwiWm9uZSBVQTNcIixcbiAgem9uZV91YjogXCJab25lIFVCXCIsXG4gIHpvbmVfdWMxOiBcIlpvbmUgVUMxXCIsXG4gIHpvbmVfdWMyOiBcIlpvbmUgVUMyXCIsXG4gIHpvbmVfdWMzOiBcIlpvbmUgVUMzXCIsXG4gIHpvbmVfdWNydTE6IFwiWm9uZSBVQ1JVMVwiLFxuICB6b25lX3VjcnUyOiBcIlpvbmUgVUNSVTJcIixcbiAgem9uZV91Y3J1MzogXCJab25lIFVDUlUzXCIsXG4gIHpvbmVfdWNydTQ6IFwiWm9uZSBVQ1JVNFwiLFxuICB6b25lX3VjcnU1OiBcIlpvbmUgVUNSVTVcIixcbiAgem9uZV91Y3J1NjogXCJab25lIFVDUlU2XCIsXG4gIHpvbmVfdWNydTc6IFwiWm9uZSBVQ1JVN1wiLFxuICB6b25lX3VjcnU4OiBcIlpvbmUgVUNSVThcIixcbiAgem9uZV91Y3J1OTogXCJab25lIFVDUlU5XCIsXG4gIHpvbmVfdWNydTExOiBcIlpvbmUgVUNSVTExXCIsXG4gIHpvbmVfdWQxOiBcIlpvbmUgVUQxXCIsXG4gIHpvbmVfdWQyOiBcIlpvbmUgVUQyXCIsXG4gIHpvbmVfdWQzOiBcIlpvbmUgVUQzXCIsXG4gIHpvbmVfdWQ0OiBcIlpvbmUgVUQ0XCIsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBwdWJsaWMvanMvdWkuanNcbi8qKlxuICogRmlyZWJhc2UgVUlcbiAqIEBtb2R1bGUgdWlcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBoYW5kbGVzIHRoZSBVSSBlbGVtZW50cyBhbmQgdXRpbGl0eSBmdW5jdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICogQHRvZG8gUmV3b3JrIG9uIHRoZSBtZXNzYWdlcyB0byBcImxvZ2luIGJlZm9yZSBkb3dubG9hZGluZ1wiXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuMSAoMjAyNS0wNC0yNik6IEluaXRpYWwgdmVyc2lvbiB3aXRoIGJhc2ljIFVJIGZ1bmN0aW9ucyBhbmQgZWxlbWVudCByZWZlcmVuY2VzLlxuICovXG5cbi8vIEltcG9ydCBtYXBwaW5ncyBuZWVkZWQgZm9yIGZvcm1hdHRpbmdcbmltcG9ydCB7IHpvbmVOYW1lTWFwcGluZ3MgfSBmcm9tIFwiLi9tYXBwaW5nc1wiO1xuXG4vLyAtLS0gRE9NIEVsZW1lbnQgUmVmZXJlbmNlcyAtLS1cbmNvbnN0IHZpbGxlU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWxsZVNlbGVjdFwiKTtcbmNvbnN0IHpvbmFnZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uYWdlU2VsZWN0XCIpO1xuY29uc3Qgem9uZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZVNlbGVjdFwiKTtcbmNvbnN0IHR5cG9sb2dpZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHlwb2xvZ2llU2VsZWN0XCIpO1xuY29uc3QgZG93bmxvYWRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvd25sb2FkQnRuXCIpO1xuY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcblxuLy8gU3Bpbm5lcnMgKGVuc3VyZSB0aGVzZSBJRHMgZXhpc3QgaW4geW91ciBpbmRleC5odG1sKVxuY29uc3QgdmlsbGVTcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWxsZVNwaW5uZXJcIik7XG5jb25zdCB6b25hZ2VTcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25hZ2VTcGlubmVyXCIpO1xuY29uc3Qgem9uZVNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVTcGlubmVyXCIpO1xuY29uc3QgdHlwb2xvZ2llU3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHlwb2xvZ2llU3Bpbm5lclwiKTtcbmNvbnN0IGRvY3VtZW50U3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9jdW1lbnRTcGlubmVyXCIpOyAvLyBGb3IgdGhlIGZpbmFsIHNlYXJjaC9kb3dubG9hZCBidXR0b24gYXJlYVxuXG4vLyBOZXcgZWxlbWVudHMgZm9yIEF1dGggVUlcbmNvbnN0IHVzZXJTdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJTdGF0dXNcIik7XG5jb25zdCBsb2dvdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ291dEJ0blwiKTtcbmNvbnN0IGxvZ2luTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5MaW5rXCIpOyAvLyBSZWZlcmVuY2UgdG8gdGhlIGxvZ2luIGxpbmsvYnV0dG9uXG5jb25zdCBzaWdudXBMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWdudXBMaW5rXCIpOyAvLyBSZWZlcmVuY2UgdG8gdGhlIHNpZ251cCBsaW5rL2J1dHRvblxuLy8gLS0tIEVuZCBET00gRWxlbWVudCBSZWZlcmVuY2VzIC0tLVxuXG4vLyAtLS0gVUkgVXRpbGl0eSBGdW5jdGlvbnMgLS0tXG5cbi8qKlxuICogQWZmaWNoZSB1biBtZXNzYWdlIGRlIHN0YXR1dCAoZXQgdHlwZTogaW5mbywgc3VjY2VzcywgZGFuZ2VyLCB3YXJuaW5nKVxuICovXG5mdW5jdGlvbiBzaG93U3RhdHVzKG1lc3NhZ2UsIHR5cGUgPSBcImluZm9cIikge1xuICBpZiAoc3RhdHVzTWVzc2FnZSkge1xuICAgIHN0YXR1c01lc3NhZ2UudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIC8vIEVuc3VyZSBvbmx5IG9uZSBhbGVydCBjbGFzcyBpcyBhY3RpdmUgYXQgYSB0aW1lXG4gICAgc3RhdHVzTWVzc2FnZS5jbGFzc05hbWUgPSBgc3RhdHVzLW1lc3NhZ2UgYWxlcnQgYWxlcnQtJHt0eXBlfWA7XG4gICAgc3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpOyAvLyBNYWtlIHN1cmUgaXQncyB2aXNpYmxlXG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKFwiU3RhdHVzIG1lc3NhZ2UgZWxlbWVudCBub3QgZm91bmQuXCIpO1xuICB9XG59XG5cbi8qKlxuICogQWZmaWNoZSBvdSBjYWNoZSB1biBzcGlubmVyIEJvb3RzdHJhcFxuICogQHBhcmFtIHNwaW5uZXJFbGVtZW50IEwnw6lsw6ltZW50IFNQQU4gZHUgc3Bpbm5lclxuICogQHBhcmFtIHNob3cgVHJ1ZSBwb3VyIGFmZmljaGVyLCBmYWxzZSBwb3VyIGNhY2hlclxuICovXG5mdW5jdGlvbiB0b2dnbGVTcGlubmVyKHNwaW5uZXJFbGVtZW50LCBzaG93KSB7XG4gIGlmIChzcGlubmVyRWxlbWVudCkge1xuICAgIHNwaW5uZXJFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJkLW5vbmVcIiwgIXNob3cpO1xuICB9IGVsc2Uge1xuICAgIC8vIGNvbnNvbGUud2FybihcIlNwaW5uZXIgZWxlbWVudCBub3QgZm91bmQgZm9yIHRvZ2dsaW5nLlwiKTsgLy8gT3B0aW9uYWw6IGxvZyBpZiBzcGlubmVyIG1pc3NpbmdcbiAgfVxufVxuXG4vKipcbiAqIFLDqWluaXRpYWxpc2UgdW4gw6lsw6ltZW50IHNlbGVjdCBhdmVjIHVuZSBvcHRpb24gcGFyIGTDqWZhdXRcbiAqL1xuZnVuY3Rpb24gcmVzZXRTZWxlY3Qoc2VsZWN0RWxlbWVudCwgZGVmYXVsdFRleHQpIHtcbiAgaWYgKHNlbGVjdEVsZW1lbnQpIHtcbiAgICBzZWxlY3RFbGVtZW50LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtcbiAgICAgIGRlZmF1bHRUZXh0IHx8IFwiU8OpbGVjdGlvbm5leiB1bmUgb3B0aW9uXCJcbiAgICB9PC9vcHRpb24+YDtcbiAgICBzZWxlY3RFbGVtZW50LmRpc2FibGVkID0gdHJ1ZTsgLy8gRGlzYWJsZSBieSBkZWZhdWx0IG9uIHJlc2V0XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKFwiU2VsZWN0IGVsZW1lbnQgbm90IGZvdW5kIGZvciByZXNldC5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBGb3JtYXRlIHVuIG5vbSByZcOndSBkZSBsJ0FQSSAoZW5sw6h2ZSB1bmRlcnNjb3JlcywgY2FwaXRhbGlzZSlcbiAqIFV0aWxpc8OpIGNvbW1lIGZhbGxiYWNrIHNpIGxlIG1hcHBhZ2Ugc3DDqWNpZmlxdWUgbidleGlzdGUgcGFzLlxuICovXG5mdW5jdGlvbiBmb3JtYXRBcGlOYW1lKG5hbWUpIHtcbiAgaWYgKCFuYW1lKSByZXR1cm4gXCJcIjtcbiAgLy8gUmVwbGFjZSB1bmRlcnNjb3JlcyB3aXRoIHNwYWNlcywgdGhlbiBjYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgZWFjaCB3b3JkXG4gIHJldHVybiBuYW1lLnJlcGxhY2UoL18vZywgXCIgXCIpLnJlcGxhY2UoL1xcYlxcdy9nLCAoY2hhcikgPT4gY2hhci50b1VwcGVyQ2FzZSgpKTtcbn1cblxuLyoqXG4gKiBQZXVwbGUgdW4gc8OpbGVjdGV1ciBhdmVjIGRlcyBvcHRpb25zXG4gKiBAcGFyYW0gc2VsZWN0RWxlbWVudCBMJ8OpbMOpbWVudCBzZWxlY3Qgw6AgcmVtcGxpclxuICogQHBhcmFtIGRhdGEgVGFibGVhdSBkJ29iamV0cyB7aWQsIG5vbX1cbiAqIEBwYXJhbSBkZWZhdWx0T3B0aW9uVGV4dCBUZXh0ZSBkZSBsYSBwcmVtacOocmUgb3B0aW9uIGTDqXNhY3RpdsOpZVxuICogQHBhcmFtIGVtcHR5RGF0YVRleHQgVGV4dGUgc2kgbGUgdGFibGVhdSBkYXRhIGVzdCB2aWRlXG4gKiBAcGFyYW0gZGF0YVR5cGUgJ3ZpbGxlJywgJ3pvbmFnZScsICd6b25lJywgb3UgJ3R5cG9sb2dpZScgcG91ciBsZSBmb3JtYXRhZ2UgY29uZGl0aW9ubmVsXG4gKi9cbmZ1bmN0aW9uIHBvcHVsYXRlU2VsZWN0KFxuICBzZWxlY3RFbGVtZW50LFxuICBkYXRhLFxuICBkZWZhdWx0T3B0aW9uVGV4dCxcbiAgZW1wdHlEYXRhVGV4dCxcbiAgZGF0YVR5cGUgLy8gVXNlZCBmb3IgY29uZGl0aW9uYWwgZm9ybWF0dGluZyAoZS5nLiwgem9uZXMpXG4pIHtcbiAgaWYgKCFzZWxlY3RFbGVtZW50KSB7XG4gICAgY29uc29sZS53YXJuKFwiU2VsZWN0IGVsZW1lbnQgbm90IGZvdW5kIGZvciBwb3B1bGF0aW9uLlwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXNldFNlbGVjdChzZWxlY3RFbGVtZW50LCBkZWZhdWx0T3B0aW9uVGV4dCk7IC8vIFJlc2V0IGZpcnN0XG5cbiAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgc2VsZWN0RWxlbWVudC5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7ZW1wdHlEYXRhVGV4dH08L29wdGlvbj5gO1xuICAgIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybiBmYWxzZTsgLy8gSW5kaWNhdGUgbm8gZGF0YSB3YXMgcG9wdWxhdGVkXG4gIH1cblxuICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdGlvbi52YWx1ZSA9IGl0ZW0uaWQ7XG5cbiAgICAvLyAtLS0gQ29uZGl0aW9uYWwgRm9ybWF0dGluZyBMb2dpYyAtLS1cbiAgICBsZXQgZGlzcGxheVRleHQgPSBcIlwiO1xuICAgIC8vIElmIGl0J3MgYSAnem9uZScgYW5kIGEgbWFwcGluZyBleGlzdHMgZm9yIGl0cyAnbm9tJ1xuICAgIGlmIChkYXRhVHlwZSA9PT0gXCJ6b25lXCIgJiYgem9uZU5hbWVNYXBwaW5ncy5oYXNPd25Qcm9wZXJ0eShpdGVtLm5vbSkpIHtcbiAgICAgIGRpc3BsYXlUZXh0ID0gem9uZU5hbWVNYXBwaW5nc1tpdGVtLm5vbV07IC8vIFVzZSB0aGUgbWFwcGVkIG5hbWVcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT3RoZXJ3aXNlLCB1c2UgdGhlIGdlbmVyYWwgZm9ybWF0dGluZyBmdW5jdGlvblxuICAgICAgZGlzcGxheVRleHQgPSBmb3JtYXRBcGlOYW1lKGl0ZW0ubm9tKTtcbiAgICB9XG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gZGlzcGxheVRleHQ7IC8vIEFwcGx5IHRoZSBjaG9zZW4gdGV4dFxuXG4gICAgc2VsZWN0RWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9KTtcblxuICBzZWxlY3RFbGVtZW50LmRpc2FibGVkID0gZmFsc2U7IC8vIEVuYWJsZSB0aGUgc2VsZWN0IGFzIGl0IGhhcyBvcHRpb25zXG4gIHJldHVybiB0cnVlOyAvLyBJbmRpY2F0ZSBkYXRhIHdhcyBwb3B1bGF0ZWRcbn1cblxuLy8gLS0tIEVuZCBVSSBVdGlsaXR5IEZ1bmN0aW9ucyAtLS1cblxuLy8gLS0tIEV4cG9ydCBFbGVtZW50cyBhbmQgRnVuY3Rpb25zIC0tLVxuZXhwb3J0IHtcbiAgdmlsbGVTZWxlY3QsXG4gIHpvbmFnZVNlbGVjdCxcbiAgem9uZVNlbGVjdCxcbiAgdHlwb2xvZ2llU2VsZWN0LFxuICBkb3dubG9hZEJ0bixcbiAgc3RhdHVzTWVzc2FnZSxcbiAgdmlsbGVTcGlubmVyLFxuICB6b25hZ2VTcGlubmVyLFxuICB6b25lU3Bpbm5lcixcbiAgdHlwb2xvZ2llU3Bpbm5lcixcbiAgZG9jdW1lbnRTcGlubmVyLFxuICBzaG93U3RhdHVzLFxuICB0b2dnbGVTcGlubmVyLFxuICByZXNldFNlbGVjdCxcbiAgZm9ybWF0QXBpTmFtZSxcbiAgcG9wdWxhdGVTZWxlY3QsXG4gIC8vIEV4cG9ydCBuZXcgYXV0aC1yZWxhdGVkIGVsZW1lbnRzXG4gIHVzZXJTdGF0dXMsXG4gIGxvZ291dEJ0bixcbiAgbG9naW5MaW5rLFxuICBzaWdudXBMaW5rLFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==