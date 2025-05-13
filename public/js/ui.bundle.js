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

// Clés: noms de l'API (minuscules, underscore)
// Valeurs: noms à afficher (format spécifié)
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
/* unused harmony exports villeSelect, zonageSelect, zoneSelect, typologieSelect, downloadBtn, statusMessage, villeSpinner, zonageSpinner, zoneSpinner, typologieSpinner, documentSpinner, showStatus, toggleSpinner, resetSelect, formatApiName, populateSelect, userStatus, loginPrompt, logoutBtn, loginLink, signupLink */
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
const loginPrompt = document.getElementById("loginPrompt");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdWkuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM3REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQzhDOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FOztBQUVwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RCwwREFBMEQ7QUFDMUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsS0FBSztBQUNqRSw4Q0FBOEM7QUFDOUMsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGdFQUFnRTtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLG1DQUFtQztBQUNuQyxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlEQUFpRDs7QUFFakQ7QUFDQSxrREFBa0QsY0FBYztBQUNoRTtBQUNBLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHVEQUFnQjtBQUMvQyxvQkFBb0IsdURBQWdCLFlBQVk7QUFDaEQsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQSxHQUFHOztBQUVILGtDQUFrQztBQUNsQyxlQUFlO0FBQ2Y7O0FBRUE7O0FBRUE7QUF3QkUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL21hcHBpbmdzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvdWkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8ganMvbWFwcGluZ3MuanNcbi8qKlxuICogRmlyZWJhc2UgTWFwcGluZ3NcbiAqIEBtb2R1bGUgbWFwcGluZ3NcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBjb250YWlucyBtYXBwaW5ncyBmb3Igem9uZSBuYW1lcyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICogQHRvZG8gQWRkIG1vcmUgbWFwcGluZ3MgYXMgbmVlZGVkLlxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjEgKDIwMjUtMDQtMjEpOiBNYXBwaW5ncyBmb3IgR3Jlbm9ibGUuXG4gKi9cblxuLy8gQ2zDqXM6IG5vbXMgZGUgbCdBUEkgKG1pbnVzY3VsZXMsIHVuZGVyc2NvcmUpXG4vLyBWYWxldXJzOiBub21zIMOgIGFmZmljaGVyIChmb3JtYXQgc3DDqWNpZmnDqSlcbmV4cG9ydCBjb25zdCB6b25lTmFtZU1hcHBpbmdzID0ge1xuICB6b25lX2F1OiBcIlpvbmUgQVVcIixcbiAgem9uZV9hdWMxOiBcIlpvbmUgQVVDMVwiLFxuICB6b25lX2F1YzI6IFwiWm9uZSBBVUMyXCIsXG4gIHpvbmVfYXVjMzogXCJab25lIEFVQzNcIixcbiAgem9uZV9hdWNydTEwOiBcIlpvbmUgQVVDUlUxMFwiLFxuICB6b25lX2F1ZDE6IFwiWm9uZSBBVUQxXCIsXG4gIHpvbmVfYXVkMjogXCJab25lIEFVRDJcIixcbiAgem9uZV9hdWQzOiBcIlpvbmUgQVVEM1wiLFxuICB6b25lX2F1ZDQ6IFwiWm9uZSBBVUQ0XCIsXG4gIHpvbmVfYXVlMTogXCJab25lIEFVRTFcIixcbiAgem9uZV9hdXAxcjogXCJab25lIEFVUDFyXCIsXG4gIHpvbmVfYTogXCJab25lIEFcIixcbiAgem9uZV9hbDogXCJab25lIEFMXCIsXG4gIHpvbmVfbjogXCJab25lIE5cIixcbiAgem9uZV9ubDogXCJab25lIE5MXCIsXG4gIHpvbmVfdWUxOiBcIlpvbmUgVUUxXCIsXG4gIHpvbmVfdWUyOiBcIlpvbmUgVUUyXCIsXG4gIHpvbmVfdWUzOiBcIlpvbmUgVUUzXCIsXG4gIHpvbmVfdWU0OiBcIlpvbmUgVUU0XCIsXG4gIHpvbmVfdXY6IFwiWm9uZSBVVlwiLFxuICB6b25lX3V6MTogXCJab25lIFVaMVwiLFxuICB6b25lX3V6MjogXCJab25lIFVaMlwiLFxuICB6b25lX3V6MzogXCJab25lIFVaM1wiLFxuICB6b25lX3V6NDogXCJab25lIFVaNFwiLFxuICB6b25lX3VhMTogXCJab25lIFVBMVwiLFxuICB6b25lX3VhMjogXCJab25lIFVBMlwiLFxuICB6b25lX3VhMzogXCJab25lIFVBM1wiLFxuICB6b25lX3ViOiBcIlpvbmUgVUJcIixcbiAgem9uZV91YzE6IFwiWm9uZSBVQzFcIixcbiAgem9uZV91YzI6IFwiWm9uZSBVQzJcIixcbiAgem9uZV91YzM6IFwiWm9uZSBVQzNcIixcbiAgem9uZV91Y3J1MTogXCJab25lIFVDUlUxXCIsXG4gIHpvbmVfdWNydTI6IFwiWm9uZSBVQ1JVMlwiLFxuICB6b25lX3VjcnUzOiBcIlpvbmUgVUNSVTNcIixcbiAgem9uZV91Y3J1NDogXCJab25lIFVDUlU0XCIsXG4gIHpvbmVfdWNydTU6IFwiWm9uZSBVQ1JVNVwiLFxuICB6b25lX3VjcnU2OiBcIlpvbmUgVUNSVTZcIixcbiAgem9uZV91Y3J1NzogXCJab25lIFVDUlU3XCIsXG4gIHpvbmVfdWNydTg6IFwiWm9uZSBVQ1JVOFwiLFxuICB6b25lX3VjcnU5OiBcIlpvbmUgVUNSVTlcIixcbiAgem9uZV91Y3J1MTE6IFwiWm9uZSBVQ1JVMTFcIixcbiAgem9uZV91ZDE6IFwiWm9uZSBVRDFcIixcbiAgem9uZV91ZDI6IFwiWm9uZSBVRDJcIixcbiAgem9uZV91ZDM6IFwiWm9uZSBVRDNcIixcbiAgem9uZV91ZDQ6IFwiWm9uZSBVRDRcIixcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIHB1YmxpYy9qcy91aS5qc1xuLyoqXG4gKiBGaXJlYmFzZSBVSVxuICogQG1vZHVsZSB1aVxuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIFVJIGVsZW1lbnRzIGFuZCB1dGlsaXR5IGZ1bmN0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICogQHZlcnNpb24gMC4wLjFcbiAqIEBhdXRob3IgR3JleVBhbmRhXG4gKiBAdG9kbyBSZXdvcmsgb24gdGhlIG1lc3NhZ2VzIHRvIFwibG9naW4gYmVmb3JlIGRvd25sb2FkaW5nXCJcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4xICgyMDI1LTA0LTI2KTogSW5pdGlhbCB2ZXJzaW9uIHdpdGggYmFzaWMgVUkgZnVuY3Rpb25zIGFuZCBlbGVtZW50IHJlZmVyZW5jZXMuXG4gKi9cblxuLy8gSW1wb3J0IG1hcHBpbmdzIG5lZWRlZCBmb3IgZm9ybWF0dGluZ1xuaW1wb3J0IHsgem9uZU5hbWVNYXBwaW5ncyB9IGZyb20gXCIuL21hcHBpbmdzXCI7XG5cbi8vIC0tLSBET00gRWxlbWVudCBSZWZlcmVuY2VzIC0tLVxuY29uc3QgdmlsbGVTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpbGxlU2VsZWN0XCIpO1xuY29uc3Qgem9uYWdlU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25hZ2VTZWxlY3RcIik7XG5jb25zdCB6b25lU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lU2VsZWN0XCIpO1xuY29uc3QgdHlwb2xvZ2llU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBvbG9naWVTZWxlY3RcIik7XG5jb25zdCBkb3dubG9hZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG93bmxvYWRCdG5cIik7XG5jb25zdCBzdGF0dXNNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0dXNNZXNzYWdlXCIpO1xuXG4vLyBTcGlubmVycyAoZW5zdXJlIHRoZXNlIElEcyBleGlzdCBpbiB5b3VyIGluZGV4Lmh0bWwpXG5jb25zdCB2aWxsZVNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpbGxlU3Bpbm5lclwiKTtcbmNvbnN0IHpvbmFnZVNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmFnZVNwaW5uZXJcIik7XG5jb25zdCB6b25lU3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZVNwaW5uZXJcIik7XG5jb25zdCB0eXBvbG9naWVTcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBvbG9naWVTcGlubmVyXCIpO1xuY29uc3QgZG9jdW1lbnRTcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb2N1bWVudFNwaW5uZXJcIik7IC8vIEZvciB0aGUgZmluYWwgc2VhcmNoL2Rvd25sb2FkIGJ1dHRvbiBhcmVhXG5cbi8vIE5ldyBlbGVtZW50cyBmb3IgQXV0aCBVSVxuY29uc3QgdXNlclN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlclN0YXR1c1wiKTtcbmNvbnN0IGxvZ2luUHJvbXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpblByb21wdFwiKTtcbmNvbnN0IGxvZ291dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb3V0QnRuXCIpO1xuY29uc3QgbG9naW5MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbkxpbmtcIik7IC8vIFJlZmVyZW5jZSB0byB0aGUgbG9naW4gbGluay9idXR0b25cbmNvbnN0IHNpZ251cExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ251cExpbmtcIik7IC8vIFJlZmVyZW5jZSB0byB0aGUgc2lnbnVwIGxpbmsvYnV0dG9uXG4vLyAtLS0gRW5kIERPTSBFbGVtZW50IFJlZmVyZW5jZXMgLS0tXG5cbi8vIC0tLSBVSSBVdGlsaXR5IEZ1bmN0aW9ucyAtLS1cblxuLyoqXG4gKiBBZmZpY2hlIHVuIG1lc3NhZ2UgZGUgc3RhdHV0IChldCB0eXBlOiBpbmZvLCBzdWNjZXNzLCBkYW5nZXIsIHdhcm5pbmcpXG4gKi9cbmZ1bmN0aW9uIHNob3dTdGF0dXMobWVzc2FnZSwgdHlwZSA9IFwiaW5mb1wiKSB7XG4gIGlmIChzdGF0dXNNZXNzYWdlKSB7XG4gICAgc3RhdHVzTWVzc2FnZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgLy8gRW5zdXJlIG9ubHkgb25lIGFsZXJ0IGNsYXNzIGlzIGFjdGl2ZSBhdCBhIHRpbWVcbiAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTmFtZSA9IGBzdGF0dXMtbWVzc2FnZSBhbGVydCBhbGVydC0ke3R5cGV9YDtcbiAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7IC8vIE1ha2Ugc3VyZSBpdCdzIHZpc2libGVcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLndhcm4oXCJTdGF0dXMgbWVzc2FnZSBlbGVtZW50IG5vdCBmb3VuZC5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBBZmZpY2hlIG91IGNhY2hlIHVuIHNwaW5uZXIgQm9vdHN0cmFwXG4gKiBAcGFyYW0gc3Bpbm5lckVsZW1lbnQgTCfDqWzDqW1lbnQgU1BBTiBkdSBzcGlubmVyXG4gKiBAcGFyYW0gc2hvdyBUcnVlIHBvdXIgYWZmaWNoZXIsIGZhbHNlIHBvdXIgY2FjaGVyXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZVNwaW5uZXIoc3Bpbm5lckVsZW1lbnQsIHNob3cpIHtcbiAgaWYgKHNwaW5uZXJFbGVtZW50KSB7XG4gICAgc3Bpbm5lckVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImQtbm9uZVwiLCAhc2hvdyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gY29uc29sZS53YXJuKFwiU3Bpbm5lciBlbGVtZW50IG5vdCBmb3VuZCBmb3IgdG9nZ2xpbmcuXCIpOyAvLyBPcHRpb25hbDogbG9nIGlmIHNwaW5uZXIgbWlzc2luZ1xuICB9XG59XG5cbi8qKlxuICogUsOpaW5pdGlhbGlzZSB1biDDqWzDqW1lbnQgc2VsZWN0IGF2ZWMgdW5lIG9wdGlvbiBwYXIgZMOpZmF1dFxuICovXG5mdW5jdGlvbiByZXNldFNlbGVjdChzZWxlY3RFbGVtZW50LCBkZWZhdWx0VGV4dCkge1xuICBpZiAoc2VsZWN0RWxlbWVudCkge1xuICAgIHNlbGVjdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJcIj4ke1xuICAgICAgZGVmYXVsdFRleHQgfHwgXCJTw6lsZWN0aW9ubmV6IHVuZSBvcHRpb25cIlxuICAgIH08L29wdGlvbj5gO1xuICAgIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlOyAvLyBEaXNhYmxlIGJ5IGRlZmF1bHQgb24gcmVzZXRcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLndhcm4oXCJTZWxlY3QgZWxlbWVudCBub3QgZm91bmQgZm9yIHJlc2V0LlwiKTtcbiAgfVxufVxuXG4vKipcbiAqIEZvcm1hdGUgdW4gbm9tIHJlw6d1IGRlIGwnQVBJIChlbmzDqHZlIHVuZGVyc2NvcmVzLCBjYXBpdGFsaXNlKVxuICogVXRpbGlzw6kgY29tbWUgZmFsbGJhY2sgc2kgbGUgbWFwcGFnZSBzcMOpY2lmaXF1ZSBuJ2V4aXN0ZSBwYXMuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdEFwaU5hbWUobmFtZSkge1xuICBpZiAoIW5hbWUpIHJldHVybiBcIlwiO1xuICAvLyBSZXBsYWNlIHVuZGVyc2NvcmVzIHdpdGggc3BhY2VzLCB0aGVuIGNhcGl0YWxpemUgdGhlIGZpcnN0IGxldHRlciBvZiBlYWNoIHdvcmRcbiAgcmV0dXJuIG5hbWUucmVwbGFjZSgvXy9nLCBcIiBcIikucmVwbGFjZSgvXFxiXFx3L2csIChjaGFyKSA9PiBjaGFyLnRvVXBwZXJDYXNlKCkpO1xufVxuXG4vKipcbiAqIFBldXBsZSB1biBzw6lsZWN0ZXVyIGF2ZWMgZGVzIG9wdGlvbnNcbiAqIEBwYXJhbSBzZWxlY3RFbGVtZW50IEwnw6lsw6ltZW50IHNlbGVjdCDDoCByZW1wbGlyXG4gKiBAcGFyYW0gZGF0YSBUYWJsZWF1IGQnb2JqZXRzIHtpZCwgbm9tfVxuICogQHBhcmFtIGRlZmF1bHRPcHRpb25UZXh0IFRleHRlIGRlIGxhIHByZW1pw6hyZSBvcHRpb24gZMOpc2FjdGl2w6llXG4gKiBAcGFyYW0gZW1wdHlEYXRhVGV4dCBUZXh0ZSBzaSBsZSB0YWJsZWF1IGRhdGEgZXN0IHZpZGVcbiAqIEBwYXJhbSBkYXRhVHlwZSAndmlsbGUnLCAnem9uYWdlJywgJ3pvbmUnLCBvdSAndHlwb2xvZ2llJyBwb3VyIGxlIGZvcm1hdGFnZSBjb25kaXRpb25uZWxcbiAqL1xuZnVuY3Rpb24gcG9wdWxhdGVTZWxlY3QoXG4gIHNlbGVjdEVsZW1lbnQsXG4gIGRhdGEsXG4gIGRlZmF1bHRPcHRpb25UZXh0LFxuICBlbXB0eURhdGFUZXh0LFxuICBkYXRhVHlwZSAvLyBVc2VkIGZvciBjb25kaXRpb25hbCBmb3JtYXR0aW5nIChlLmcuLCB6b25lcylcbikge1xuICBpZiAoIXNlbGVjdEVsZW1lbnQpIHtcbiAgICBjb25zb2xlLndhcm4oXCJTZWxlY3QgZWxlbWVudCBub3QgZm91bmQgZm9yIHBvcHVsYXRpb24uXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJlc2V0U2VsZWN0KHNlbGVjdEVsZW1lbnQsIGRlZmF1bHRPcHRpb25UZXh0KTsgLy8gUmVzZXQgZmlyc3RcblxuICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICBzZWxlY3RFbGVtZW50LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtlbXB0eURhdGFUZXh0fTwvb3B0aW9uPmA7XG4gICAgc2VsZWN0RWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBJbmRpY2F0ZSBubyBkYXRhIHdhcyBwb3B1bGF0ZWRcbiAgfVxuXG4gIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gaXRlbS5pZDtcblxuICAgIC8vIC0tLSBDb25kaXRpb25hbCBGb3JtYXR0aW5nIExvZ2ljIC0tLVxuICAgIGxldCBkaXNwbGF5VGV4dCA9IFwiXCI7XG4gICAgLy8gSWYgaXQncyBhICd6b25lJyBhbmQgYSBtYXBwaW5nIGV4aXN0cyBmb3IgaXRzICdub20nXG4gICAgaWYgKGRhdGFUeXBlID09PSBcInpvbmVcIiAmJiB6b25lTmFtZU1hcHBpbmdzLmhhc093blByb3BlcnR5KGl0ZW0ubm9tKSkge1xuICAgICAgZGlzcGxheVRleHQgPSB6b25lTmFtZU1hcHBpbmdzW2l0ZW0ubm9tXTsgLy8gVXNlIHRoZSBtYXBwZWQgbmFtZVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPdGhlcndpc2UsIHVzZSB0aGUgZ2VuZXJhbCBmb3JtYXR0aW5nIGZ1bmN0aW9uXG4gICAgICBkaXNwbGF5VGV4dCA9IGZvcm1hdEFwaU5hbWUoaXRlbS5ub20pO1xuICAgIH1cbiAgICBvcHRpb24udGV4dENvbnRlbnQgPSBkaXNwbGF5VGV4dDsgLy8gQXBwbHkgdGhlIGNob3NlbiB0ZXh0XG5cbiAgICBzZWxlY3RFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xuXG4gIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTsgLy8gRW5hYmxlIHRoZSBzZWxlY3QgYXMgaXQgaGFzIG9wdGlvbnNcbiAgcmV0dXJuIHRydWU7IC8vIEluZGljYXRlIGRhdGEgd2FzIHBvcHVsYXRlZFxufVxuXG4vLyAtLS0gRW5kIFVJIFV0aWxpdHkgRnVuY3Rpb25zIC0tLVxuXG4vLyAtLS0gRXhwb3J0IEVsZW1lbnRzIGFuZCBGdW5jdGlvbnMgLS0tXG5leHBvcnQge1xuICB2aWxsZVNlbGVjdCxcbiAgem9uYWdlU2VsZWN0LFxuICB6b25lU2VsZWN0LFxuICB0eXBvbG9naWVTZWxlY3QsXG4gIGRvd25sb2FkQnRuLFxuICBzdGF0dXNNZXNzYWdlLFxuICB2aWxsZVNwaW5uZXIsXG4gIHpvbmFnZVNwaW5uZXIsXG4gIHpvbmVTcGlubmVyLFxuICB0eXBvbG9naWVTcGlubmVyLFxuICBkb2N1bWVudFNwaW5uZXIsXG4gIHNob3dTdGF0dXMsXG4gIHRvZ2dsZVNwaW5uZXIsXG4gIHJlc2V0U2VsZWN0LFxuICBmb3JtYXRBcGlOYW1lLFxuICBwb3B1bGF0ZVNlbGVjdCxcbiAgLy8gRXhwb3J0IG5ldyBhdXRoLXJlbGF0ZWQgZWxlbWVudHNcbiAgdXNlclN0YXR1cyxcbiAgbG9naW5Qcm9tcHQsXG4gIGxvZ291dEJ0bixcbiAgbG9naW5MaW5rLFxuICBzaWdudXBMaW5rLFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==