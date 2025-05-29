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
/* unused harmony exports citySelect, zoningSelect, zoneSelect, typologieSelect, synthesisBtn, statusMessage, citySpinner, zoningSpinner, zoneSpinner, typologieSpinner, documentSpinner, showStatus, toggleSpinner, resetSelect, formatApiName, populateSelect, userStatus, logoutBtn, loginLink, signupLink */
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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdWkuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM3REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQzhDOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FOztBQUVwRTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQsMERBQTBEO0FBQzFEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELEtBQUs7QUFDakUsOENBQThDO0FBQzlDLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixnRUFBZ0U7QUFDaEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxtQ0FBbUM7QUFDbkMsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpREFBaUQ7O0FBRWpEO0FBQ0Esa0RBQWtELGNBQWM7QUFDaEU7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix1REFBZ0I7QUFDL0Msb0JBQW9CLHVEQUFnQixhQUFhO0FBQ2pELE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7O0FBRXRDO0FBQ0EsR0FBRzs7QUFFSCxrQ0FBa0M7QUFDbEMsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBdUJFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9tYXBwaW5ncy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3VpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGpzL21hcHBpbmdzLmpzXG4vKipcbiAqIEZpcmViYXNlIE1hcHBpbmdzXG4gKiBAbW9kdWxlIG1hcHBpbmdzXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBtb2R1bGUgY29udGFpbnMgbWFwcGluZ3MgZm9yIHpvbmUgbmFtZXMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKiBAdmVyc2lvbiAwLjAuMVxuICogQGF1dGhvciBHcmV5UGFuZGFcbiAqIEB0b2RvIEFkZCBtb3JlIG1hcHBpbmdzIGFzIG5lZWRlZC5cbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4xICgyMDI1LTA0LTIxKTogTWFwcGluZ3MgZm9yIEdyZW5vYmxlLlxuICovXG5cbi8vIEtleXM6IG5hbWUgaW4gdGhlIGRhdGFiYXNlIChsb3dlcmNhc2UsIHVuZGVyc2NvcmUpXG4vLyBWYWx1ZXM6IGRpc3BsYXllZCBuYW1lZCBvbiB3ZWIgYXBwIChzcGVjaWZpYyBmb3JtYXQpXG5leHBvcnQgY29uc3Qgem9uZU5hbWVNYXBwaW5ncyA9IHtcbiAgem9uZV9hdTogXCJab25lIEFVXCIsXG4gIHpvbmVfYXVjMTogXCJab25lIEFVQzFcIixcbiAgem9uZV9hdWMyOiBcIlpvbmUgQVVDMlwiLFxuICB6b25lX2F1YzM6IFwiWm9uZSBBVUMzXCIsXG4gIHpvbmVfYXVjcnUxMDogXCJab25lIEFVQ1JVMTBcIixcbiAgem9uZV9hdWQxOiBcIlpvbmUgQVVEMVwiLFxuICB6b25lX2F1ZDI6IFwiWm9uZSBBVUQyXCIsXG4gIHpvbmVfYXVkMzogXCJab25lIEFVRDNcIixcbiAgem9uZV9hdWQ0OiBcIlpvbmUgQVVENFwiLFxuICB6b25lX2F1ZTE6IFwiWm9uZSBBVUUxXCIsXG4gIHpvbmVfYXVwMXI6IFwiWm9uZSBBVVAxclwiLFxuICB6b25lX2E6IFwiWm9uZSBBXCIsXG4gIHpvbmVfYWw6IFwiWm9uZSBBTFwiLFxuICB6b25lX246IFwiWm9uZSBOXCIsXG4gIHpvbmVfbmw6IFwiWm9uZSBOTFwiLFxuICB6b25lX3VlMTogXCJab25lIFVFMVwiLFxuICB6b25lX3VlMjogXCJab25lIFVFMlwiLFxuICB6b25lX3VlMzogXCJab25lIFVFM1wiLFxuICB6b25lX3VlNDogXCJab25lIFVFNFwiLFxuICB6b25lX3V2OiBcIlpvbmUgVVZcIixcbiAgem9uZV91ejE6IFwiWm9uZSBVWjFcIixcbiAgem9uZV91ejI6IFwiWm9uZSBVWjJcIixcbiAgem9uZV91ejM6IFwiWm9uZSBVWjNcIixcbiAgem9uZV91ejQ6IFwiWm9uZSBVWjRcIixcbiAgem9uZV91YTE6IFwiWm9uZSBVQTFcIixcbiAgem9uZV91YTI6IFwiWm9uZSBVQTJcIixcbiAgem9uZV91YTM6IFwiWm9uZSBVQTNcIixcbiAgem9uZV91YjogXCJab25lIFVCXCIsXG4gIHpvbmVfdWMxOiBcIlpvbmUgVUMxXCIsXG4gIHpvbmVfdWMyOiBcIlpvbmUgVUMyXCIsXG4gIHpvbmVfdWMzOiBcIlpvbmUgVUMzXCIsXG4gIHpvbmVfdWNydTE6IFwiWm9uZSBVQ1JVMVwiLFxuICB6b25lX3VjcnUyOiBcIlpvbmUgVUNSVTJcIixcbiAgem9uZV91Y3J1MzogXCJab25lIFVDUlUzXCIsXG4gIHpvbmVfdWNydTQ6IFwiWm9uZSBVQ1JVNFwiLFxuICB6b25lX3VjcnU1OiBcIlpvbmUgVUNSVTVcIixcbiAgem9uZV91Y3J1NjogXCJab25lIFVDUlU2XCIsXG4gIHpvbmVfdWNydTc6IFwiWm9uZSBVQ1JVN1wiLFxuICB6b25lX3VjcnU4OiBcIlpvbmUgVUNSVThcIixcbiAgem9uZV91Y3J1OTogXCJab25lIFVDUlU5XCIsXG4gIHpvbmVfdWNydTExOiBcIlpvbmUgVUNSVTExXCIsXG4gIHpvbmVfdWQxOiBcIlpvbmUgVUQxXCIsXG4gIHpvbmVfdWQyOiBcIlpvbmUgVUQyXCIsXG4gIHpvbmVfdWQzOiBcIlpvbmUgVUQzXCIsXG4gIHpvbmVfdWQ0OiBcIlpvbmUgVUQ0XCIsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBwdWJsaWMvanMvdWkuanNcbi8qKlxuICogRmlyZWJhc2UgVUlcbiAqIEBtb2R1bGUgdWlcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBoYW5kbGVzIHRoZSBVSSBlbGVtZW50cyBhbmQgdXRpbGl0eSBmdW5jdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICogQHRvZG8gUmV3b3JrIG9uIHRoZSBtZXNzYWdlcyB0byBcImxvZ2luIGJlZm9yZSBkb3dubG9hZGluZ1wiXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuMSAoMjAyNS0wNC0yNik6IEluaXRpYWwgdmVyc2lvbiB3aXRoIGJhc2ljIFVJIGZ1bmN0aW9ucyBhbmQgZWxlbWVudCByZWZlcmVuY2VzLlxuICovXG5cbi8vIEltcG9ydCBtYXBwaW5ncyBuZWVkZWQgZm9yIGZvcm1hdHRpbmdcbmltcG9ydCB7IHpvbmVOYW1lTWFwcGluZ3MgfSBmcm9tIFwiLi9tYXBwaW5nc1wiO1xuXG4vLyAtLS0gRE9NIEVsZW1lbnQgUmVmZXJlbmNlcyAtLS1cbmNvbnN0IGNpdHlTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHlTZWxlY3RcIik7XG5jb25zdCB6b25pbmdTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmluZ1NlbGVjdFwiKTtcbmNvbnN0IHpvbmVTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVTZWxlY3RcIik7XG5jb25zdCB0eXBvbG9naWVTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR5cG9sb2dpZVNlbGVjdFwiKTtcbmNvbnN0IHN5bnRoZXNpc0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ludGhlc2lzQnRuXCIpO1xuY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcblxuLy8gU3Bpbm5lcnMgKGVuc3VyZSB0aGVzZSBJRHMgZXhpc3QgaW4geW91ciBpbmRleC5odG1sKVxuY29uc3QgY2l0eVNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHlTcGlubmVyXCIpO1xuY29uc3Qgem9uaW5nU3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uaW5nU3Bpbm5lclwiKTtcbmNvbnN0IHpvbmVTcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lU3Bpbm5lclwiKTtcbmNvbnN0IHR5cG9sb2dpZVNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR5cG9sb2dpZVNwaW5uZXJcIik7XG5jb25zdCBkb2N1bWVudFNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvY3VtZW50U3Bpbm5lclwiKTsgLy8gRm9yIHRoZSBmaW5hbCBzZWFyY2gvZG93bmxvYWQgYnV0dG9uIGFyZWFcblxuLy8gTmV3IGVsZW1lbnRzIGZvciBBdXRoIFVJXG5jb25zdCB1c2VyU3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyU3RhdHVzXCIpO1xuY29uc3QgbG9nb3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXRCdG5cIik7XG5jb25zdCBsb2dpbkxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luTGlua1wiKTsgLy8gUmVmZXJlbmNlIHRvIHRoZSBsb2dpbiBsaW5rL2J1dHRvblxuY29uc3Qgc2lnbnVwTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbnVwTGlua1wiKTsgLy8gUmVmZXJlbmNlIHRvIHRoZSBzaWdudXAgbGluay9idXR0b25cbi8vIC0tLSBFbmQgRE9NIEVsZW1lbnQgUmVmZXJlbmNlcyAtLS1cblxuLy8gLS0tIFVJIFV0aWxpdHkgRnVuY3Rpb25zIC0tLVxuXG4vKipcbiAqIEFmZmljaGUgdW4gbWVzc2FnZSBkZSBzdGF0dXQgKGV0IHR5cGU6IGluZm8sIHN1Y2Nlc3MsIGRhbmdlciwgd2FybmluZylcbiAqL1xuZnVuY3Rpb24gc2hvd1N0YXR1cyhtZXNzYWdlLCB0eXBlID0gXCJpbmZvXCIpIHtcbiAgaWYgKHN0YXR1c01lc3NhZ2UpIHtcbiAgICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICAvLyBFbnN1cmUgb25seSBvbmUgYWxlcnQgY2xhc3MgaXMgYWN0aXZlIGF0IGEgdGltZVxuICAgIHN0YXR1c01lc3NhZ2UuY2xhc3NOYW1lID0gYHN0YXR1cy1tZXNzYWdlIGFsZXJ0IGFsZXJ0LSR7dHlwZX1gO1xuICAgIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTsgLy8gTWFrZSBzdXJlIGl0J3MgdmlzaWJsZVxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihcIlN0YXR1cyBtZXNzYWdlIGVsZW1lbnQgbm90IGZvdW5kLlwiKTtcbiAgfVxufVxuXG4vKipcbiAqIEFmZmljaGUgb3UgY2FjaGUgdW4gc3Bpbm5lciBCb290c3RyYXBcbiAqIEBwYXJhbSBzcGlubmVyRWxlbWVudCBMJ8OpbMOpbWVudCBTUEFOIGR1IHNwaW5uZXJcbiAqIEBwYXJhbSBzaG93IFRydWUgcG91ciBhZmZpY2hlciwgZmFsc2UgcG91ciBjYWNoZXJcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlU3Bpbm5lcihzcGlubmVyRWxlbWVudCwgc2hvdykge1xuICBpZiAoc3Bpbm5lckVsZW1lbnQpIHtcbiAgICBzcGlubmVyRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiZC1ub25lXCIsICFzaG93KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBjb25zb2xlLndhcm4oXCJTcGlubmVyIGVsZW1lbnQgbm90IGZvdW5kIGZvciB0b2dnbGluZy5cIik7IC8vIE9wdGlvbmFsOiBsb2cgaWYgc3Bpbm5lciBtaXNzaW5nXG4gIH1cbn1cblxuLyoqXG4gKiBSw6lpbml0aWFsaXNlIHVuIMOpbMOpbWVudCBzZWxlY3QgYXZlYyB1bmUgb3B0aW9uIHBhciBkw6lmYXV0XG4gKi9cbmZ1bmN0aW9uIHJlc2V0U2VsZWN0KHNlbGVjdEVsZW1lbnQsIGRlZmF1bHRUZXh0KSB7XG4gIGlmIChzZWxlY3RFbGVtZW50KSB7XG4gICAgc2VsZWN0RWxlbWVudC5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7XG4gICAgICBkZWZhdWx0VGV4dCB8fCBcIlPDqWxlY3Rpb25uZXogdW5lIG9wdGlvblwiXG4gICAgfTwvb3B0aW9uPmA7XG4gICAgc2VsZWN0RWxlbWVudC5kaXNhYmxlZCA9IHRydWU7IC8vIERpc2FibGUgYnkgZGVmYXVsdCBvbiByZXNldFxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihcIlNlbGVjdCBlbGVtZW50IG5vdCBmb3VuZCBmb3IgcmVzZXQuXCIpO1xuICB9XG59XG5cbi8qKlxuICogRm9ybWF0ZSB1biBuYW1lIHJlw6d1IGRlIGwnQVBJIChlbmzDqHZlIHVuZGVyc2NvcmVzLCBjYXBpdGFsaXNlKVxuICogVXRpbGlzw6kgY29tbWUgZmFsbGJhY2sgc2kgbGUgbWFwcGFnZSBzcMOpY2lmaXF1ZSBuJ2V4aXN0ZSBwYXMuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdEFwaU5hbWUobmFtZSkge1xuICBpZiAoIW5hbWUpIHJldHVybiBcIlwiO1xuICAvLyBSZXBsYWNlIHVuZGVyc2NvcmVzIHdpdGggc3BhY2VzLCB0aGVuIGNhcGl0YWxpemUgdGhlIGZpcnN0IGxldHRlciBvZiBlYWNoIHdvcmRcbiAgcmV0dXJuIG5hbWUucmVwbGFjZSgvXy9nLCBcIiBcIikucmVwbGFjZSgvXFxiXFx3L2csIChjaGFyKSA9PiBjaGFyLnRvVXBwZXJDYXNlKCkpO1xufVxuXG4vKipcbiAqIFBldXBsZSB1biBzw6lsZWN0ZXVyIGF2ZWMgZGVzIG9wdGlvbnNcbiAqIEBwYXJhbSBzZWxlY3RFbGVtZW50IEwnw6lsw6ltZW50IHNlbGVjdCDDoCByZW1wbGlyXG4gKiBAcGFyYW0gZGF0YSBUYWJsZWF1IGQnb2JqZXRzIHtpZCwgbmFtZX1cbiAqIEBwYXJhbSBkZWZhdWx0T3B0aW9uVGV4dCBUZXh0ZSBkZSBsYSBwcmVtacOocmUgb3B0aW9uIGTDqXNhY3RpdsOpZVxuICogQHBhcmFtIGVtcHR5RGF0YVRleHQgVGV4dGUgc2kgbGUgdGFibGVhdSBkYXRhIGVzdCB2aWRlXG4gKiBAcGFyYW0gZGF0YVR5cGUgJ2NpdHknLCAnem9uaW5nJywgJ3pvbmUnLCBvdSAndHlwb2xvZ3knIHBvdXIgbGUgZm9ybWF0YWdlIGNvbmRpdGlvbm5lbFxuICovXG5mdW5jdGlvbiBwb3B1bGF0ZVNlbGVjdChcbiAgc2VsZWN0RWxlbWVudCxcbiAgZGF0YSxcbiAgZGVmYXVsdE9wdGlvblRleHQsXG4gIGVtcHR5RGF0YVRleHQsXG4gIGRhdGFUeXBlIC8vIFVzZWQgZm9yIGNvbmRpdGlvbmFsIGZvcm1hdHRpbmcgKGUuZy4sIHpvbmVzKVxuKSB7XG4gIGlmICghc2VsZWN0RWxlbWVudCkge1xuICAgIGNvbnNvbGUud2FybihcIlNlbGVjdCBlbGVtZW50IG5vdCBmb3VuZCBmb3IgcG9wdWxhdGlvbi5cIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmVzZXRTZWxlY3Qoc2VsZWN0RWxlbWVudCwgZGVmYXVsdE9wdGlvblRleHQpOyAvLyBSZXNldCBmaXJzdFxuXG4gIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgIHNlbGVjdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJcIj4ke2VtcHR5RGF0YVRleHR9PC9vcHRpb24+YDtcbiAgICBzZWxlY3RFbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7IC8vIEluZGljYXRlIG5vIGRhdGEgd2FzIHBvcHVsYXRlZFxuICB9XG5cbiAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udmFsdWUgPSBpdGVtLmlkO1xuXG4gICAgLy8gLS0tIENvbmRpdGlvbmFsIEZvcm1hdHRpbmcgTG9naWMgLS0tXG4gICAgbGV0IGRpc3BsYXlUZXh0ID0gXCJcIjtcbiAgICAvLyBJZiBpdCdzIGEgJ3pvbmUnIGFuZCBhIG1hcHBpbmcgZXhpc3RzIGZvciBpdHMgJ25hbWUnXG4gICAgaWYgKGRhdGFUeXBlID09PSBcInpvbmVcIiAmJiB6b25lTmFtZU1hcHBpbmdzLmhhc093blByb3BlcnR5KGl0ZW0ubmFtZSkpIHtcbiAgICAgIGRpc3BsYXlUZXh0ID0gem9uZU5hbWVNYXBwaW5nc1tpdGVtLm5hbWVdOyAvLyBVc2UgdGhlIG1hcHBlZCBuYW1lXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE90aGVyd2lzZSwgdXNlIHRoZSBnZW5lcmFsIGZvcm1hdHRpbmcgZnVuY3Rpb25cbiAgICAgIGRpc3BsYXlUZXh0ID0gZm9ybWF0QXBpTmFtZShpdGVtLm5hbWUpO1xuICAgIH1cbiAgICBvcHRpb24udGV4dENvbnRlbnQgPSBkaXNwbGF5VGV4dDsgLy8gQXBwbHkgdGhlIGNob3NlbiB0ZXh0XG5cbiAgICBzZWxlY3RFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xuXG4gIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTsgLy8gRW5hYmxlIHRoZSBzZWxlY3QgYXMgaXQgaGFzIG9wdGlvbnNcbiAgcmV0dXJuIHRydWU7IC8vIEluZGljYXRlIGRhdGEgd2FzIHBvcHVsYXRlZFxufVxuXG4vLyAtLS0gRW5kIFVJIFV0aWxpdHkgRnVuY3Rpb25zIC0tLVxuXG4vLyAtLS0gRXhwb3J0IEVsZW1lbnRzIGFuZCBGdW5jdGlvbnMgLS0tXG5leHBvcnQge1xuICBjaXR5U2VsZWN0LFxuICB6b25pbmdTZWxlY3QsXG4gIHpvbmVTZWxlY3QsXG4gIHR5cG9sb2dpZVNlbGVjdCxcbiAgc3ludGhlc2lzQnRuLFxuICBzdGF0dXNNZXNzYWdlLFxuICBjaXR5U3Bpbm5lcixcbiAgem9uaW5nU3Bpbm5lcixcbiAgem9uZVNwaW5uZXIsXG4gIHR5cG9sb2dpZVNwaW5uZXIsXG4gIGRvY3VtZW50U3Bpbm5lcixcbiAgc2hvd1N0YXR1cyxcbiAgdG9nZ2xlU3Bpbm5lcixcbiAgcmVzZXRTZWxlY3QsXG4gIGZvcm1hdEFwaU5hbWUsXG4gIHBvcHVsYXRlU2VsZWN0LFxuICAvLyBFeHBvcnQgbmV3IGF1dGgtcmVsYXRlZCBlbGVtZW50c1xuICB1c2VyU3RhdHVzLFxuICBsb2dvdXRCdG4sXG4gIGxvZ2luTGluayxcbiAgc2lnbnVwTGluayxcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=