/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/auth/auth.js":
/*!*****************************!*\
  !*** ./src/js/auth/auth.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_URLS: () => (/* binding */ API_URLS),
/* harmony export */   hideLoading: () => (/* binding */ hideLoading),
/* harmony export */   showError: () => (/* binding */ showError),
/* harmony export */   showLoading: () => (/* binding */ showLoading),
/* harmony export */   showStatus: () => (/* binding */ showStatus)
/* harmony export */ });
/* unused harmony exports IS_LOCAL, setCurrentUser, getCurrentUser, logout, isLoggedIn, hideElement, showElement */
// src/auth/auth.js
/**
 * Authentication Module - Base
 * @module auth
 * @description Base module for authentication with common functions and configuration
 * @version 0.0.3
 *
 * @changelog
 * - 0.0.3 (2025-05-13): Modified the authentication state management to use Supabase Auth system.
 * - 0.0.2 (2025-05-13): Reorganization into separate modules
 * - 0.0.1 (2025-05-03): Initial creation
 */

// --- API URL Definitions ---
const IS_LOCAL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";

const API_URLS = {
  HANDLE_CONFIRMATION: IS_LOCAL
    ? "http://127.0.0.1:5001/urbandocs/us-central1/handle_confirmation"
    : "https://handle-confirmation-up3k3hddtq-uc.a.run.app",

  HANDLE_SIGNUP: IS_LOCAL
    ? "http://127.0.0.1:5001/urbandocs/us-central1/handle_signup"
    : "https://handle-signup-up3k3hddtq-uc.a.run.app",

  HANDLE_LOGIN: IS_LOCAL
    ? "http://127.0.0.1:5001/urbandocs/us-central1/handle_login"
    : "https://handle-login-up3k3hddtq-uc.a.run.app",
};

// Global authentication state
let currentUser = null;

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
 * Retrieves the current user
 * @returns {Object|null} The current user or null
 */
function getCurrentUser() {
  // If no user in memory, try to retrieve it from storage
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
 */
function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  // Redirect to the home page after logout
  window.location.href = "/index";
}

/**
 * Checks if the user is logged in
 * @returns {boolean} True if the user is logged in
 */
function isLoggedIn() {
  return getCurrentUser() !== null;
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
  API_URLS,
  IS_LOCAL,
  getCurrentUser,
  setCurrentUser,
  logout,
  isLoggedIn,
  showError,
  showStatus,
  hideElement,
  showElement,
  showLoading,
  hideLoading,
});


/***/ }),

/***/ "./src/js/auth/confirmation.js":
/*!*************************************!*\
  !*** ./src/js/auth/confirmation.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initConfirmationPage: () => (/* binding */ initConfirmationPage)
/* harmony export */ });
/* unused harmony export confirmEmail */
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth/auth.js");
// src/auth/confirmation.js
/**
 * Confirmation Module
 * @module confirmation
 * @description Handles email confirmation after registration
 * @version 0.0.3
 *
 * @changelog
 * - 0.0.1 (2025-05-08): Created the confirmation module with basic functionality.
 * - 0.0.2 (2025-05-10): Added terms of service and confirmation email.
 * - 0.0.3 (2025-05-12): Added terms of service modal and confirmation email.
 */



/**
 * Initializes the email confirmation page
 */
function initConfirmationPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const confirmationUrl = urlParams.get("confirmation_url");

  const confirmButton = document.getElementById("confirmButton");
  const statusMessage = document.getElementById("statusMessage");
  const tosCheckbox = document.getElementById("tosCheckbox");
  const tosModalElement = document.getElementById("tosModal");
  const tosModalBody = document.getElementById("tosModalBody");

  // Exit early if no confirmation URL is present
  if (!confirmationUrl) {
    statusMessage.textContent =
      "Error: Missing confirmation URL. Please check the link in your email.";
    statusMessage.classList.add("alert-danger");
    statusMessage.classList.remove("d-none");
    confirmButton.disabled = true;
    return;
  }

  if (tosModalElement) {
    tosModalElement.addEventListener("show.bs.modal", async () => {
      if (tosModalBody.dataset.loaded !== "true") {
        try {
          const response = await fetch("/terms"); // Use clean URL
          if (!response.ok) {
            throw new Error(
              `Failed to load Terms of Service: ${response.status}`
            );
          }
          const tosHtml = await response.text();
          tosModalBody.innerHTML = tosHtml;
          tosModalBody.dataset.loaded = "true"; // Mark as loaded to prevent multiple fetches
        } catch (error) {
          console.error(error);
          tosModalBody.innerHTML =
            "<p class='text-danger'>Could not load Terms of Service. Please try again later.</p>";
        }
      }
    });

    tosModalBody.addEventListener("scroll", () => {
      // Check if scrolled to the bottom (with a small tolerance)
      if (
        tosModalBody.scrollHeight - tosModalBody.scrollTop <=
        tosModalBody.clientHeight + 2
      ) {
        // +2 for tolerance
        tosCheckbox.disabled = false;
      }
    });
  }

  if (tosCheckbox) {
    tosCheckbox.addEventListener("change", () => {
      confirmButton.disabled = !tosCheckbox.checked;
    });
  }

  confirmButton.addEventListener("click", () => {
    if (!tosCheckbox.checked) {
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(
        "Veuillez accepter les Conditions d'Utilisation pour continuer."
      );
      // Ensure statusMessage is visible if showError doesn't handle it or if you want a specific style
      if (statusMessage) {
        statusMessage.innerHTML =
          "<div class='alert alert-danger'>Veuillez accepter les Conditions d'Utilisation pour continuer.</div>";
        statusMessage.classList.remove("d-none");
      }
      return;
    }
    confirmEmail(confirmationUrl);
  });
}

/**
 * Confirms the email address with the confirmation URL
 * @param {string} confirmationUrl - Confirmation URL received by email
 */
async function confirmEmail(confirmationUrl) {
  const confirmButton = document.getElementById("confirmButton");
  const statusMessage = document.getElementById("statusMessage");
  const loading = document.getElementById("loading");
  const confirmSpinner = document.getElementById("confirmSpinner");
  const tosCheckbox = document.getElementById("tosCheckbox"); // Get checkbox here too

  // Ensure ToS is checked before proceeding (double-check, primary check is in click listener)
  if (!tosCheckbox || !tosCheckbox.checked) {
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Les Conditions d'Utilisation doivent être acceptées.");
    // Optionally, ensure the message is displayed prominently
    if (statusMessage) {
      statusMessage.innerHTML =
        "<div class='alert alert-danger'>Les Conditions d'Utilisation doivent être acceptées.</div>";
      statusMessage.classList.remove("d-none");
    }
    return;
  }

  // Show loading indicator
  (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("confirmButton", "confirmSpinner");

  if (loading) loading.classList.remove("d-none");
  if (statusMessage) statusMessage.classList.add("d-none");

  try {
    const url = `${
      _auth_js__WEBPACK_IMPORTED_MODULE_0__.API_URLS.HANDLE_CONFIRMATION
    }?confirmation_url=${encodeURIComponent(confirmationUrl)}`;

    console.log("Confirming email with URL:", url);

    const response = await fetch(url);

    // Log the full response for debugging
    console.log("Response status:", response.status);
    console.log("Response headers:", [...response.headers.entries()]);

    let responseData;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
      console.log("Response JSON:", responseData);
    } else {
      responseData = await response.text();
      console.log("Response text:", responseData);
    }

    // Don't throw error for successful responses
    // Some servers return 200, 201, 202, 204 for success
    if (response.ok || response.status === 204) {
      // Hide loading
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("confirmButton", "confirmSpinner");
      if (loading) loading.classList.add("d-none");

      // Show success message
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showStatus)(
        "Your email has been verified! Redirecting to the login page...",
        "success"
      );

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      // Handle non-successful responses
      throw new Error(`The server responded with status: ${response.status}`);
    }
  } catch (error) {
    // Handle errors
    console.error("Confirmation error:", error);
    console.error("Error stack:", error.stack);

    // Hide loading
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("confirmButton", "confirmSpinner");
    if (loading) loading.classList.add("d-none");

    // Show error message
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showStatus)(
      `An error occurred during confirmation: ${error.message}`,
      "danger"
    );
  }
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  initConfirmationPage,
  confirmEmail,
});


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
/*!****************************************!*\
  !*** ./src/js/entries/confirmation.js ***!
  \****************************************/
/* harmony import */ var _auth_confirmation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/confirmation.js */ "./src/js/auth/confirmation.js");
// src/entries/confirmation.js
/**
 * Confirmation Entry Point
 *
 * This module serves as the entry point for the email confirmation page.
 */

// Import our confirmation module


// Initialize confirmation page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize confirmation page
  (0,_auth_confirmation_js__WEBPACK_IMPORTED_MODULE_0__.initConfirmationPage)();

  console.log("Confirmation page initialized");
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUscURBQVc7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSw4Q0FBUTtBQUNkLEtBQUssb0JBQW9CLG9DQUFvQzs7QUFFN0Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0scURBQVc7QUFDakI7O0FBRUE7QUFDQSxNQUFNLG9EQUFVO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0EsMkRBQTJELGdCQUFnQjtBQUMzRTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHFEQUFXO0FBQ2Y7O0FBRUE7QUFDQSxJQUFJLG9EQUFVO0FBQ2QsZ0RBQWdELGNBQWM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0VBQWU7QUFDZjtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7O1VDbE1GO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQytEOztBQUUvRDtBQUNBO0FBQ0E7QUFDQSxFQUFFLDJFQUFvQjs7QUFFdEI7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL2F1dGguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL2NvbmZpcm1hdGlvbi5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2VudHJpZXMvY29uZmlybWF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9hdXRoL2F1dGguanNcbi8qKlxuICogQXV0aGVudGljYXRpb24gTW9kdWxlIC0gQmFzZVxuICogQG1vZHVsZSBhdXRoXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBtb2R1bGUgZm9yIGF1dGhlbnRpY2F0aW9uIHdpdGggY29tbW9uIGZ1bmN0aW9ucyBhbmQgY29uZmlndXJhdGlvblxuICogQHZlcnNpb24gMC4wLjNcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4zICgyMDI1LTA1LTEzKTogTW9kaWZpZWQgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlIG1hbmFnZW1lbnQgdG8gdXNlIFN1cGFiYXNlIEF1dGggc3lzdGVtLlxuICogLSAwLjAuMiAoMjAyNS0wNS0xMyk6IFJlb3JnYW5pemF0aW9uIGludG8gc2VwYXJhdGUgbW9kdWxlc1xuICogLSAwLjAuMSAoMjAyNS0wNS0wMyk6IEluaXRpYWwgY3JlYXRpb25cbiAqL1xuXG4vLyAtLS0gQVBJIFVSTCBEZWZpbml0aW9ucyAtLS1cbmV4cG9ydCBjb25zdCBJU19MT0NBTCA9XG4gIGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiO1xuXG5leHBvcnQgY29uc3QgQVBJX1VSTFMgPSB7XG4gIEhBTkRMRV9DT05GSVJNQVRJT046IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX2NvbmZpcm1hdGlvblwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLWNvbmZpcm1hdGlvbi11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxuXG4gIEhBTkRMRV9TSUdOVVA6IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX3NpZ251cFwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLXNpZ251cC11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxuXG4gIEhBTkRMRV9MT0dJTjogSVNfTE9DQUxcbiAgICA/IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAxL3VyYmFuZG9jcy91cy1jZW50cmFsMS9oYW5kbGVfbG9naW5cIlxuICAgIDogXCJodHRwczovL2hhbmRsZS1sb2dpbi11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxufTtcblxuLy8gR2xvYmFsIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG5sZXQgY3VycmVudFVzZXIgPSBudWxsO1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdXNlclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXIgLSBVc2VyIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXIpIHtcbiAgY3VycmVudFVzZXIgPSB1c2VyO1xuICAvLyBQb3NzaWJsZSBzdG9yYWdlIGluIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxuICBpZiAodXNlcikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgdXNlclxuICogQHJldHVybnMge09iamVjdHxudWxsfSBUaGUgY3VycmVudCB1c2VyIG9yIG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCkge1xuICAvLyBJZiBubyB1c2VyIGluIG1lbW9yeSwgdHJ5IHRvIHJldHJpZXZlIGl0IGZyb20gc3RvcmFnZVxuICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIExvZ3Mgb3V0IHRoZSB1c2VyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgLy8gUmVkaXJlY3QgdG8gdGhlIGhvbWUgcGFnZSBhZnRlciBsb2dvdXRcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9pbmRleFwiO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dnZWRJbigpIHtcbiAgcmV0dXJuIGdldEN1cnJlbnRVc2VyKCkgIT09IG51bGw7XG59XG5cbi8qKlxuICogRGlzcGxheXMgYW4gZXJyb3IgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBFcnJvciBtZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB3aGVyZSB0byBkaXNwbGF5IHRoZSBlcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1lc3NhZ2UsIGVsZW1lbnRJZCA9IFwiZXJyb3JNZXNzYWdlXCIpIHtcbiAgY29uc3QgZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVycm9yRWxlbWVudCkge1xuICAgIGVycm9yRWxlbWVudC5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBlbGVtZW50IG5vdCBmb3VuZDpcIiwgZWxlbWVudElkKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BsYXlzIGEgc3RhdHVzIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gTWVzc2FnZSB0byBkaXNwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIE1lc3NhZ2UgdHlwZSAoc3VjY2VzcywgaW5mbywgd2FybmluZywgZGFuZ2VyKVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dTdGF0dXMoXG4gIG1lc3NhZ2UsXG4gIHR5cGUgPSBcImluZm9cIixcbiAgZWxlbWVudElkID0gXCJzdGF0dXNNZXNzYWdlXCJcbikge1xuICBjb25zdCBzdGF0dXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKHN0YXR1c0VsZW1lbnQpIHtcbiAgICBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcblxuICAgIC8vIFJlbW92ZSBhbGwgYWxlcnQtKiBjbGFzc2VzXG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB7XG4gICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJhbGVydC1cIikpIHtcbiAgICAgICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgdGhlIGNsYXNzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGVcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGFsZXJ0LSR7dHlwZX1gKTtcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIlN0YXR1cyBlbGVtZW50IG5vdCBmb3VuZDpcIiwgZWxlbWVudElkKTtcbiAgfVxufVxuXG4vKipcbiAqIEhpZGVzIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB0byBoaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50SWQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbi8qKlxuICogU2hvd3MgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIHNob3dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0xvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIGlmIChzcGlubmVyKSBzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG59XG5cbi8qKlxuICogSGlkZXMgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWQgLSBJRCBvZiB0aGUgYnV0dG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3Bpbm5lcklkIC0gSUQgb2YgdGhlIHNwaW5uZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVMb2FkaW5nKGJ1dHRvbklkLCBzcGlubmVySWQpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3Bpbm5lcklkKTtcblxuICBpZiAoYnV0dG9uKSBidXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn1cblxuLy8gRXhwb3J0IHRoZSBuZWNlc3NhcnkgZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXNcbmV4cG9ydCBkZWZhdWx0IHtcbiAgQVBJX1VSTFMsXG4gIElTX0xPQ0FMLFxuICBnZXRDdXJyZW50VXNlcixcbiAgc2V0Q3VycmVudFVzZXIsXG4gIGxvZ291dCxcbiAgaXNMb2dnZWRJbixcbiAgc2hvd0Vycm9yLFxuICBzaG93U3RhdHVzLFxuICBoaWRlRWxlbWVudCxcbiAgc2hvd0VsZW1lbnQsXG4gIHNob3dMb2FkaW5nLFxuICBoaWRlTG9hZGluZyxcbn07XG4iLCIvLyBzcmMvYXV0aC9jb25maXJtYXRpb24uanNcbi8qKlxuICogQ29uZmlybWF0aW9uIE1vZHVsZVxuICogQG1vZHVsZSBjb25maXJtYXRpb25cbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIGVtYWlsIGNvbmZpcm1hdGlvbiBhZnRlciByZWdpc3RyYXRpb25cbiAqIEB2ZXJzaW9uIDAuMC4zXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuMSAoMjAyNS0wNS0wOCk6IENyZWF0ZWQgdGhlIGNvbmZpcm1hdGlvbiBtb2R1bGUgd2l0aCBiYXNpYyBmdW5jdGlvbmFsaXR5LlxuICogLSAwLjAuMiAoMjAyNS0wNS0xMCk6IEFkZGVkIHRlcm1zIG9mIHNlcnZpY2UgYW5kIGNvbmZpcm1hdGlvbiBlbWFpbC5cbiAqIC0gMC4wLjMgKDIwMjUtMDUtMTIpOiBBZGRlZCB0ZXJtcyBvZiBzZXJ2aWNlIG1vZGFsIGFuZCBjb25maXJtYXRpb24gZW1haWwuXG4gKi9cblxuaW1wb3J0IHtcbiAgQVBJX1VSTFMsXG4gIHNob3dTdGF0dXMsXG4gIHNob3dFcnJvcixcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufSBmcm9tIFwiLi9hdXRoLmpzXCI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIGVtYWlsIGNvbmZpcm1hdGlvbiBwYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0Q29uZmlybWF0aW9uUGFnZSgpIHtcbiAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgY29uc3QgY29uZmlybWF0aW9uVXJsID0gdXJsUGFyYW1zLmdldChcImNvbmZpcm1hdGlvbl91cmxcIik7XG5cbiAgY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZmlybUJ1dHRvblwiKTtcbiAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcbiAgY29uc3QgdG9zQ2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvc0NoZWNrYm94XCIpO1xuICBjb25zdCB0b3NNb2RhbEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvc01vZGFsXCIpO1xuICBjb25zdCB0b3NNb2RhbEJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvc01vZGFsQm9keVwiKTtcblxuICAvLyBFeGl0IGVhcmx5IGlmIG5vIGNvbmZpcm1hdGlvbiBVUkwgaXMgcHJlc2VudFxuICBpZiAoIWNvbmZpcm1hdGlvblVybCkge1xuICAgIHN0YXR1c01lc3NhZ2UudGV4dENvbnRlbnQgPVxuICAgICAgXCJFcnJvcjogTWlzc2luZyBjb25maXJtYXRpb24gVVJMLiBQbGVhc2UgY2hlY2sgdGhlIGxpbmsgaW4geW91ciBlbWFpbC5cIjtcbiAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJhbGVydC1kYW5nZXJcIik7XG4gICAgc3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xuICAgIGNvbmZpcm1CdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0b3NNb2RhbEVsZW1lbnQpIHtcbiAgICB0b3NNb2RhbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNob3cuYnMubW9kYWxcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRvc01vZGFsQm9keS5kYXRhc2V0LmxvYWRlZCAhPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL3Rlcm1zXCIpOyAvLyBVc2UgY2xlYW4gVVJMXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgRmFpbGVkIHRvIGxvYWQgVGVybXMgb2YgU2VydmljZTogJHtyZXNwb25zZS5zdGF0dXN9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdG9zSHRtbCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICB0b3NNb2RhbEJvZHkuaW5uZXJIVE1MID0gdG9zSHRtbDtcbiAgICAgICAgICB0b3NNb2RhbEJvZHkuZGF0YXNldC5sb2FkZWQgPSBcInRydWVcIjsgLy8gTWFyayBhcyBsb2FkZWQgdG8gcHJldmVudCBtdWx0aXBsZSBmZXRjaGVzXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgdG9zTW9kYWxCb2R5LmlubmVySFRNTCA9XG4gICAgICAgICAgICBcIjxwIGNsYXNzPSd0ZXh0LWRhbmdlcic+Q291bGQgbm90IGxvYWQgVGVybXMgb2YgU2VydmljZS4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci48L3A+XCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRvc01vZGFsQm9keS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgIC8vIENoZWNrIGlmIHNjcm9sbGVkIHRvIHRoZSBib3R0b20gKHdpdGggYSBzbWFsbCB0b2xlcmFuY2UpXG4gICAgICBpZiAoXG4gICAgICAgIHRvc01vZGFsQm9keS5zY3JvbGxIZWlnaHQgLSB0b3NNb2RhbEJvZHkuc2Nyb2xsVG9wIDw9XG4gICAgICAgIHRvc01vZGFsQm9keS5jbGllbnRIZWlnaHQgKyAyXG4gICAgICApIHtcbiAgICAgICAgLy8gKzIgZm9yIHRvbGVyYW5jZVxuICAgICAgICB0b3NDaGVja2JveC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKHRvc0NoZWNrYm94KSB7XG4gICAgdG9zQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBjb25maXJtQnV0dG9uLmRpc2FibGVkID0gIXRvc0NoZWNrYm94LmNoZWNrZWQ7XG4gICAgfSk7XG4gIH1cblxuICBjb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKCF0b3NDaGVja2JveC5jaGVja2VkKSB7XG4gICAgICBzaG93RXJyb3IoXG4gICAgICAgIFwiVmV1aWxsZXogYWNjZXB0ZXIgbGVzIENvbmRpdGlvbnMgZCdVdGlsaXNhdGlvbiBwb3VyIGNvbnRpbnVlci5cIlxuICAgICAgKTtcbiAgICAgIC8vIEVuc3VyZSBzdGF0dXNNZXNzYWdlIGlzIHZpc2libGUgaWYgc2hvd0Vycm9yIGRvZXNuJ3QgaGFuZGxlIGl0IG9yIGlmIHlvdSB3YW50IGEgc3BlY2lmaWMgc3R5bGVcbiAgICAgIGlmIChzdGF0dXNNZXNzYWdlKSB7XG4gICAgICAgIHN0YXR1c01lc3NhZ2UuaW5uZXJIVE1MID1cbiAgICAgICAgICBcIjxkaXYgY2xhc3M9J2FsZXJ0IGFsZXJ0LWRhbmdlcic+VmV1aWxsZXogYWNjZXB0ZXIgbGVzIENvbmRpdGlvbnMgZCdVdGlsaXNhdGlvbiBwb3VyIGNvbnRpbnVlci48L2Rpdj5cIjtcbiAgICAgICAgc3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25maXJtRW1haWwoY29uZmlybWF0aW9uVXJsKTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29uZmlybXMgdGhlIGVtYWlsIGFkZHJlc3Mgd2l0aCB0aGUgY29uZmlybWF0aW9uIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpcm1hdGlvblVybCAtIENvbmZpcm1hdGlvbiBVUkwgcmVjZWl2ZWQgYnkgZW1haWxcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbmZpcm1FbWFpbChjb25maXJtYXRpb25VcmwpIHtcbiAgY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZmlybUJ1dHRvblwiKTtcbiAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcbiAgY29uc3QgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGluZ1wiKTtcbiAgY29uc3QgY29uZmlybVNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpcm1TcGlubmVyXCIpO1xuICBjb25zdCB0b3NDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9zQ2hlY2tib3hcIik7IC8vIEdldCBjaGVja2JveCBoZXJlIHRvb1xuXG4gIC8vIEVuc3VyZSBUb1MgaXMgY2hlY2tlZCBiZWZvcmUgcHJvY2VlZGluZyAoZG91YmxlLWNoZWNrLCBwcmltYXJ5IGNoZWNrIGlzIGluIGNsaWNrIGxpc3RlbmVyKVxuICBpZiAoIXRvc0NoZWNrYm94IHx8ICF0b3NDaGVja2JveC5jaGVja2VkKSB7XG4gICAgc2hvd0Vycm9yKFwiTGVzIENvbmRpdGlvbnMgZCdVdGlsaXNhdGlvbiBkb2l2ZW50IMOqdHJlIGFjY2VwdMOpZXMuXCIpO1xuICAgIC8vIE9wdGlvbmFsbHksIGVuc3VyZSB0aGUgbWVzc2FnZSBpcyBkaXNwbGF5ZWQgcHJvbWluZW50bHlcbiAgICBpZiAoc3RhdHVzTWVzc2FnZSkge1xuICAgICAgc3RhdHVzTWVzc2FnZS5pbm5lckhUTUwgPVxuICAgICAgICBcIjxkaXYgY2xhc3M9J2FsZXJ0IGFsZXJ0LWRhbmdlcic+TGVzIENvbmRpdGlvbnMgZCdVdGlsaXNhdGlvbiBkb2l2ZW50IMOqdHJlIGFjY2VwdMOpZXMuPC9kaXY+XCI7XG4gICAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFNob3cgbG9hZGluZyBpbmRpY2F0b3JcbiAgc2hvd0xvYWRpbmcoXCJjb25maXJtQnV0dG9uXCIsIFwiY29uZmlybVNwaW5uZXJcIik7XG5cbiAgaWYgKGxvYWRpbmcpIGxvYWRpbmcuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcbiAgaWYgKHN0YXR1c01lc3NhZ2UpIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGAke1xuICAgICAgQVBJX1VSTFMuSEFORExFX0NPTkZJUk1BVElPTlxuICAgIH0/Y29uZmlybWF0aW9uX3VybD0ke2VuY29kZVVSSUNvbXBvbmVudChjb25maXJtYXRpb25VcmwpfWA7XG5cbiAgICBjb25zb2xlLmxvZyhcIkNvbmZpcm1pbmcgZW1haWwgd2l0aCBVUkw6XCIsIHVybCk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG5cbiAgICAvLyBMb2cgdGhlIGZ1bGwgcmVzcG9uc2UgZm9yIGRlYnVnZ2luZ1xuICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2Ugc3RhdHVzOlwiLCByZXNwb25zZS5zdGF0dXMpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgaGVhZGVyczpcIiwgWy4uLnJlc3BvbnNlLmhlYWRlcnMuZW50cmllcygpXSk7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhO1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIik7XG5cbiAgICBpZiAoY29udGVudFR5cGUgJiYgY29udGVudFR5cGUuaW5jbHVkZXMoXCJhcHBsaWNhdGlvbi9qc29uXCIpKSB7XG4gICAgICByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIEpTT046XCIsIHJlc3BvbnNlRGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgdGV4dDpcIiwgcmVzcG9uc2VEYXRhKTtcbiAgICB9XG5cbiAgICAvLyBEb24ndCB0aHJvdyBlcnJvciBmb3Igc3VjY2Vzc2Z1bCByZXNwb25zZXNcbiAgICAvLyBTb21lIHNlcnZlcnMgcmV0dXJuIDIwMCwgMjAxLCAyMDIsIDIwNCBmb3Igc3VjY2Vzc1xuICAgIGlmIChyZXNwb25zZS5vayB8fCByZXNwb25zZS5zdGF0dXMgPT09IDIwNCkge1xuICAgICAgLy8gSGlkZSBsb2FkaW5nXG4gICAgICBoaWRlTG9hZGluZyhcImNvbmZpcm1CdXR0b25cIiwgXCJjb25maXJtU3Bpbm5lclwiKTtcbiAgICAgIGlmIChsb2FkaW5nKSBsb2FkaW5nLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XG5cbiAgICAgIC8vIFNob3cgc3VjY2VzcyBtZXNzYWdlXG4gICAgICBzaG93U3RhdHVzKFxuICAgICAgICBcIllvdXIgZW1haWwgaGFzIGJlZW4gdmVyaWZpZWQhIFJlZGlyZWN0aW5nIHRvIHRoZSBsb2dpbiBwYWdlLi4uXCIsXG4gICAgICAgIFwic3VjY2Vzc1wiXG4gICAgICApO1xuXG4gICAgICAvLyBSZWRpcmVjdCBhZnRlciBhIHNob3J0IGRlbGF5XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9sb2dpblwiO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEhhbmRsZSBub24tc3VjY2Vzc2Z1bCByZXNwb25zZXNcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNlcnZlciByZXNwb25kZWQgd2l0aCBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBIYW5kbGUgZXJyb3JzXG4gICAgY29uc29sZS5lcnJvcihcIkNvbmZpcm1hdGlvbiBlcnJvcjpcIiwgZXJyb3IpO1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzdGFjazpcIiwgZXJyb3Iuc3RhY2spO1xuXG4gICAgLy8gSGlkZSBsb2FkaW5nXG4gICAgaGlkZUxvYWRpbmcoXCJjb25maXJtQnV0dG9uXCIsIFwiY29uZmlybVNwaW5uZXJcIik7XG4gICAgaWYgKGxvYWRpbmcpIGxvYWRpbmcuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcblxuICAgIC8vIFNob3cgZXJyb3IgbWVzc2FnZVxuICAgIHNob3dTdGF0dXMoXG4gICAgICBgQW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIGNvbmZpcm1hdGlvbjogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICBcImRhbmdlclwiXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRDb25maXJtYXRpb25QYWdlLFxuICBjb25maXJtRW1haWwsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBzcmMvZW50cmllcy9jb25maXJtYXRpb24uanNcbi8qKlxuICogQ29uZmlybWF0aW9uIEVudHJ5IFBvaW50XG4gKlxuICogVGhpcyBtb2R1bGUgc2VydmVzIGFzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIGVtYWlsIGNvbmZpcm1hdGlvbiBwYWdlLlxuICovXG5cbi8vIEltcG9ydCBvdXIgY29uZmlybWF0aW9uIG1vZHVsZVxuaW1wb3J0IHsgaW5pdENvbmZpcm1hdGlvblBhZ2UgfSBmcm9tIFwiLi4vYXV0aC9jb25maXJtYXRpb24uanNcIjtcblxuLy8gSW5pdGlhbGl6ZSBjb25maXJtYXRpb24gcGFnZSB3aGVuIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgLy8gSW5pdGlhbGl6ZSBjb25maXJtYXRpb24gcGFnZVxuICBpbml0Q29uZmlybWF0aW9uUGFnZSgpO1xuXG4gIGNvbnNvbGUubG9nKFwiQ29uZmlybWF0aW9uIHBhZ2UgaW5pdGlhbGl6ZWRcIik7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==