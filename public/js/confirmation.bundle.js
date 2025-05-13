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
  window.location.href = "/";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUscURBQVc7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSw4Q0FBUTtBQUNkLEtBQUssb0JBQW9CLG9DQUFvQzs7QUFFN0Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0scURBQVc7QUFDakI7O0FBRUE7QUFDQSxNQUFNLG9EQUFVO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0EsMkRBQTJELGdCQUFnQjtBQUMzRTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHFEQUFXO0FBQ2Y7O0FBRUE7QUFDQSxJQUFJLG9EQUFVO0FBQ2QsZ0RBQWdELGNBQWM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0VBQWU7QUFDZjtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7O1VDbE1GO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQytEOztBQUUvRDtBQUNBO0FBQ0E7QUFDQSxFQUFFLDJFQUFvQjs7QUFFdEI7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL2F1dGguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL2NvbmZpcm1hdGlvbi5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2VudHJpZXMvY29uZmlybWF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9hdXRoL2F1dGguanNcbi8qKlxuICogQXV0aGVudGljYXRpb24gTW9kdWxlIC0gQmFzZVxuICogQG1vZHVsZSBhdXRoXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBtb2R1bGUgZm9yIGF1dGhlbnRpY2F0aW9uIHdpdGggY29tbW9uIGZ1bmN0aW9ucyBhbmQgY29uZmlndXJhdGlvblxuICogQHZlcnNpb24gMC4wLjNcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4zICgyMDI1LTA1LTEzKTogTW9kaWZpZWQgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlIG1hbmFnZW1lbnQgdG8gdXNlIFN1cGFiYXNlIEF1dGggc3lzdGVtLlxuICogLSAwLjAuMiAoMjAyNS0wNS0xMyk6IFJlb3JnYW5pemF0aW9uIGludG8gc2VwYXJhdGUgbW9kdWxlc1xuICogLSAwLjAuMSAoMjAyNS0wNS0wMyk6IEluaXRpYWwgY3JlYXRpb25cbiAqL1xuXG4vLyAtLS0gQVBJIFVSTCBEZWZpbml0aW9ucyAtLS1cbmV4cG9ydCBjb25zdCBJU19MT0NBTCA9XG4gIGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiO1xuXG5leHBvcnQgY29uc3QgQVBJX1VSTFMgPSB7XG4gIEhBTkRMRV9DT05GSVJNQVRJT046IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX2NvbmZpcm1hdGlvblwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLWNvbmZpcm1hdGlvbi11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxuXG4gIEhBTkRMRV9TSUdOVVA6IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX3NpZ251cFwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLXNpZ251cC11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxuXG4gIEhBTkRMRV9MT0dJTjogSVNfTE9DQUxcbiAgICA/IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAxL3VyYmFuZG9jcy91cy1jZW50cmFsMS9oYW5kbGVfbG9naW5cIlxuICAgIDogXCJodHRwczovL2hhbmRsZS1sb2dpbi11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxufTtcblxuLy8gR2xvYmFsIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG5sZXQgY3VycmVudFVzZXIgPSBudWxsO1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdXNlclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXIgLSBVc2VyIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXIpIHtcbiAgY3VycmVudFVzZXIgPSB1c2VyO1xuICAvLyBQb3NzaWJsZSBzdG9yYWdlIGluIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxuICBpZiAodXNlcikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgdXNlclxuICogQHJldHVybnMge09iamVjdHxudWxsfSBUaGUgY3VycmVudCB1c2VyIG9yIG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCkge1xuICAvLyBJZiBubyB1c2VyIGluIG1lbW9yeSwgdHJ5IHRvIHJldHJpZXZlIGl0IGZyb20gc3RvcmFnZVxuICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIExvZ3Mgb3V0IHRoZSB1c2VyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgLy8gUmVkaXJlY3QgdG8gdGhlIGhvbWUgcGFnZSBhZnRlciBsb2dvdXRcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTG9nZ2VkSW4oKSB7XG4gIHJldHVybiBnZXRDdXJyZW50VXNlcigpICE9PSBudWxsO1xufVxuXG4vKipcbiAqIERpc3BsYXlzIGFuIGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gRXJyb3IgbWVzc2FnZSB0byBkaXNwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtZXNzYWdlLCBlbGVtZW50SWQgPSBcImVycm9yTWVzc2FnZVwiKSB7XG4gIGNvbnN0IGVycm9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlcnJvckVsZW1lbnQpIHtcbiAgICBlcnJvckVsZW1lbnQuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZWxlbWVudCBub3QgZm91bmQ6XCIsIGVsZW1lbnRJZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhIHN0YXR1cyBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIE1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBNZXNzYWdlIHR5cGUgKHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGRhbmdlcilcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB3aGVyZSB0byBkaXNwbGF5IHRoZSBtZXNzYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93U3RhdHVzKFxuICBtZXNzYWdlLFxuICB0eXBlID0gXCJpbmZvXCIsXG4gIGVsZW1lbnRJZCA9IFwic3RhdHVzTWVzc2FnZVwiXG4pIHtcbiAgY29uc3Qgc3RhdHVzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChzdGF0dXNFbGVtZW50KSB7XG4gICAgc3RhdHVzRWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cbiAgICAvLyBSZW1vdmUgYWxsIGFsZXJ0LSogY2xhc3Nlc1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwiYWxlcnQtXCIpKSB7XG4gICAgICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWRkIHRoZSBjbGFzcyBjb3JyZXNwb25kaW5nIHRvIHRoZSB0eXBlXG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBhbGVydC0ke3R5cGV9YCk7XG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJTdGF0dXMgZWxlbWVudCBub3QgZm91bmQ6XCIsIGVsZW1lbnRJZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBIaWRlcyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gaGlkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUVsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB0byBzaG93XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50SWQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbi8qKlxuICogU2hvd3MgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWQgLSBJRCBvZiB0aGUgYnV0dG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3Bpbm5lcklkIC0gSUQgb2YgdGhlIHNwaW5uZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dMb2FkaW5nKGJ1dHRvbklkLCBzcGlubmVySWQpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3Bpbm5lcklkKTtcblxuICBpZiAoYnV0dG9uKSBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufVxuXG4vKipcbiAqIEhpZGVzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlTG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gIGlmIChzcGlubmVyKSBzcGlubmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59XG5cbi8vIEV4cG9ydCB0aGUgbmVjZXNzYXJ5IGZ1bmN0aW9ucyBhbmQgdmFyaWFibGVzXG5leHBvcnQgZGVmYXVsdCB7XG4gIEFQSV9VUkxTLFxuICBJU19MT0NBTCxcbiAgZ2V0Q3VycmVudFVzZXIsXG4gIHNldEN1cnJlbnRVc2VyLFxuICBsb2dvdXQsXG4gIGlzTG9nZ2VkSW4sXG4gIHNob3dFcnJvcixcbiAgc2hvd1N0YXR1cyxcbiAgaGlkZUVsZW1lbnQsXG4gIHNob3dFbGVtZW50LFxuICBzaG93TG9hZGluZyxcbiAgaGlkZUxvYWRpbmcsXG59O1xuIiwiLy8gc3JjL2F1dGgvY29uZmlybWF0aW9uLmpzXG4vKipcbiAqIENvbmZpcm1hdGlvbiBNb2R1bGVcbiAqIEBtb2R1bGUgY29uZmlybWF0aW9uXG4gKiBAZGVzY3JpcHRpb24gSGFuZGxlcyBlbWFpbCBjb25maXJtYXRpb24gYWZ0ZXIgcmVnaXN0cmF0aW9uXG4gKiBAdmVyc2lvbiAwLjAuM1xuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDgpOiBDcmVhdGVkIHRoZSBjb25maXJtYXRpb24gbW9kdWxlIHdpdGggYmFzaWMgZnVuY3Rpb25hbGl0eS5cbiAqIC0gMC4wLjIgKDIwMjUtMDUtMTApOiBBZGRlZCB0ZXJtcyBvZiBzZXJ2aWNlIGFuZCBjb25maXJtYXRpb24gZW1haWwuXG4gKiAtIDAuMC4zICgyMDI1LTA1LTEyKTogQWRkZWQgdGVybXMgb2Ygc2VydmljZSBtb2RhbCBhbmQgY29uZmlybWF0aW9uIGVtYWlsLlxuICovXG5cbmltcG9ydCB7XG4gIEFQSV9VUkxTLFxuICBzaG93U3RhdHVzLFxuICBzaG93RXJyb3IsXG4gIHNob3dMb2FkaW5nLFxuICBoaWRlTG9hZGluZyxcbn0gZnJvbSBcIi4vYXV0aC5qc1wiO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBlbWFpbCBjb25maXJtYXRpb24gcGFnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdENvbmZpcm1hdGlvblBhZ2UoKSB7XG4gIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gIGNvbnN0IGNvbmZpcm1hdGlvblVybCA9IHVybFBhcmFtcy5nZXQoXCJjb25maXJtYXRpb25fdXJsXCIpO1xuXG4gIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpcm1CdXR0b25cIik7XG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c01lc3NhZ2VcIik7XG4gIGNvbnN0IHRvc0NoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3NDaGVja2JveFwiKTtcbiAgY29uc3QgdG9zTW9kYWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3NNb2RhbFwiKTtcbiAgY29uc3QgdG9zTW9kYWxCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3NNb2RhbEJvZHlcIik7XG5cbiAgLy8gRXhpdCBlYXJseSBpZiBubyBjb25maXJtYXRpb24gVVJMIGlzIHByZXNlbnRcbiAgaWYgKCFjb25maXJtYXRpb25VcmwpIHtcbiAgICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID1cbiAgICAgIFwiRXJyb3I6IE1pc3NpbmcgY29uZmlybWF0aW9uIFVSTC4gUGxlYXNlIGNoZWNrIHRoZSBsaW5rIGluIHlvdXIgZW1haWwuXCI7XG4gICAgc3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiYWxlcnQtZGFuZ2VyXCIpO1xuICAgIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcbiAgICBjb25maXJtQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodG9zTW9kYWxFbGVtZW50KSB7XG4gICAgdG9zTW9kYWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzaG93LmJzLm1vZGFsXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICh0b3NNb2RhbEJvZHkuZGF0YXNldC5sb2FkZWQgIT09IFwidHJ1ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi90ZXJtc1wiKTsgLy8gVXNlIGNsZWFuIFVSTFxuICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYEZhaWxlZCB0byBsb2FkIFRlcm1zIG9mIFNlcnZpY2U6ICR7cmVzcG9uc2Uuc3RhdHVzfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHRvc0h0bWwgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgdG9zTW9kYWxCb2R5LmlubmVySFRNTCA9IHRvc0h0bWw7XG4gICAgICAgICAgdG9zTW9kYWxCb2R5LmRhdGFzZXQubG9hZGVkID0gXCJ0cnVlXCI7IC8vIE1hcmsgYXMgbG9hZGVkIHRvIHByZXZlbnQgbXVsdGlwbGUgZmV0Y2hlc1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgIHRvc01vZGFsQm9keS5pbm5lckhUTUwgPVxuICAgICAgICAgICAgXCI8cCBjbGFzcz0ndGV4dC1kYW5nZXInPkNvdWxkIG5vdCBsb2FkIFRlcm1zIG9mIFNlcnZpY2UuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuPC9wPlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0b3NNb2RhbEJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICAvLyBDaGVjayBpZiBzY3JvbGxlZCB0byB0aGUgYm90dG9tICh3aXRoIGEgc21hbGwgdG9sZXJhbmNlKVxuICAgICAgaWYgKFxuICAgICAgICB0b3NNb2RhbEJvZHkuc2Nyb2xsSGVpZ2h0IC0gdG9zTW9kYWxCb2R5LnNjcm9sbFRvcCA8PVxuICAgICAgICB0b3NNb2RhbEJvZHkuY2xpZW50SGVpZ2h0ICsgMlxuICAgICAgKSB7XG4gICAgICAgIC8vICsyIGZvciB0b2xlcmFuY2VcbiAgICAgICAgdG9zQ2hlY2tib3guZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmICh0b3NDaGVja2JveCkge1xuICAgIHRvc0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgY29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9ICF0b3NDaGVja2JveC5jaGVja2VkO1xuICAgIH0pO1xuICB9XG5cbiAgY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmICghdG9zQ2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgc2hvd0Vycm9yKFxuICAgICAgICBcIlZldWlsbGV6IGFjY2VwdGVyIGxlcyBDb25kaXRpb25zIGQnVXRpbGlzYXRpb24gcG91ciBjb250aW51ZXIuXCJcbiAgICAgICk7XG4gICAgICAvLyBFbnN1cmUgc3RhdHVzTWVzc2FnZSBpcyB2aXNpYmxlIGlmIHNob3dFcnJvciBkb2Vzbid0IGhhbmRsZSBpdCBvciBpZiB5b3Ugd2FudCBhIHNwZWNpZmljIHN0eWxlXG4gICAgICBpZiAoc3RhdHVzTWVzc2FnZSkge1xuICAgICAgICBzdGF0dXNNZXNzYWdlLmlubmVySFRNTCA9XG4gICAgICAgICAgXCI8ZGl2IGNsYXNzPSdhbGVydCBhbGVydC1kYW5nZXInPlZldWlsbGV6IGFjY2VwdGVyIGxlcyBDb25kaXRpb25zIGQnVXRpbGlzYXRpb24gcG91ciBjb250aW51ZXIuPC9kaXY+XCI7XG4gICAgICAgIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uZmlybUVtYWlsKGNvbmZpcm1hdGlvblVybCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbmZpcm1zIHRoZSBlbWFpbCBhZGRyZXNzIHdpdGggdGhlIGNvbmZpcm1hdGlvbiBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb25maXJtYXRpb25VcmwgLSBDb25maXJtYXRpb24gVVJMIHJlY2VpdmVkIGJ5IGVtYWlsXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25maXJtRW1haWwoY29uZmlybWF0aW9uVXJsKSB7XG4gIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpcm1CdXR0b25cIik7XG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c01lc3NhZ2VcIik7XG4gIGNvbnN0IGxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmdcIik7XG4gIGNvbnN0IGNvbmZpcm1TcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25maXJtU3Bpbm5lclwiKTtcbiAgY29uc3QgdG9zQ2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvc0NoZWNrYm94XCIpOyAvLyBHZXQgY2hlY2tib3ggaGVyZSB0b29cblxuICAvLyBFbnN1cmUgVG9TIGlzIGNoZWNrZWQgYmVmb3JlIHByb2NlZWRpbmcgKGRvdWJsZS1jaGVjaywgcHJpbWFyeSBjaGVjayBpcyBpbiBjbGljayBsaXN0ZW5lcilcbiAgaWYgKCF0b3NDaGVja2JveCB8fCAhdG9zQ2hlY2tib3guY2hlY2tlZCkge1xuICAgIHNob3dFcnJvcihcIkxlcyBDb25kaXRpb25zIGQnVXRpbGlzYXRpb24gZG9pdmVudCDDqnRyZSBhY2NlcHTDqWVzLlwiKTtcbiAgICAvLyBPcHRpb25hbGx5LCBlbnN1cmUgdGhlIG1lc3NhZ2UgaXMgZGlzcGxheWVkIHByb21pbmVudGx5XG4gICAgaWYgKHN0YXR1c01lc3NhZ2UpIHtcbiAgICAgIHN0YXR1c01lc3NhZ2UuaW5uZXJIVE1MID1cbiAgICAgICAgXCI8ZGl2IGNsYXNzPSdhbGVydCBhbGVydC1kYW5nZXInPkxlcyBDb25kaXRpb25zIGQnVXRpbGlzYXRpb24gZG9pdmVudCDDqnRyZSBhY2NlcHTDqWVzLjwvZGl2PlwiO1xuICAgICAgc3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBTaG93IGxvYWRpbmcgaW5kaWNhdG9yXG4gIHNob3dMb2FkaW5nKFwiY29uZmlybUJ1dHRvblwiLCBcImNvbmZpcm1TcGlubmVyXCIpO1xuXG4gIGlmIChsb2FkaW5nKSBsb2FkaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XG4gIGlmIChzdGF0dXNNZXNzYWdlKSBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB1cmwgPSBgJHtcbiAgICAgIEFQSV9VUkxTLkhBTkRMRV9DT05GSVJNQVRJT05cbiAgICB9P2NvbmZpcm1hdGlvbl91cmw9JHtlbmNvZGVVUklDb21wb25lbnQoY29uZmlybWF0aW9uVXJsKX1gO1xuXG4gICAgY29uc29sZS5sb2coXCJDb25maXJtaW5nIGVtYWlsIHdpdGggVVJMOlwiLCB1cmwpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuXG4gICAgLy8gTG9nIHRoZSBmdWxsIHJlc3BvbnNlIGZvciBkZWJ1Z2dpbmdcbiAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIHN0YXR1czpcIiwgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIGhlYWRlcnM6XCIsIFsuLi5yZXNwb25zZS5oZWFkZXJzLmVudHJpZXMoKV0pO1xuXG4gICAgbGV0IHJlc3BvbnNlRGF0YTtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpO1xuXG4gICAgaWYgKGNvbnRlbnRUeXBlICYmIGNvbnRlbnRUeXBlLmluY2x1ZGVzKFwiYXBwbGljYXRpb24vanNvblwiKSkge1xuICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBKU09OOlwiLCByZXNwb25zZURhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIHRleHQ6XCIsIHJlc3BvbnNlRGF0YSk7XG4gICAgfVxuXG4gICAgLy8gRG9uJ3QgdGhyb3cgZXJyb3IgZm9yIHN1Y2Nlc3NmdWwgcmVzcG9uc2VzXG4gICAgLy8gU29tZSBzZXJ2ZXJzIHJldHVybiAyMDAsIDIwMSwgMjAyLCAyMDQgZm9yIHN1Y2Nlc3NcbiAgICBpZiAocmVzcG9uc2Uub2sgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDQpIHtcbiAgICAgIC8vIEhpZGUgbG9hZGluZ1xuICAgICAgaGlkZUxvYWRpbmcoXCJjb25maXJtQnV0dG9uXCIsIFwiY29uZmlybVNwaW5uZXJcIik7XG4gICAgICBpZiAobG9hZGluZykgbG9hZGluZy5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xuXG4gICAgICAvLyBTaG93IHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgc2hvd1N0YXR1cyhcbiAgICAgICAgXCJZb3VyIGVtYWlsIGhhcyBiZWVuIHZlcmlmaWVkISBSZWRpcmVjdGluZyB0byB0aGUgbG9naW4gcGFnZS4uLlwiLFxuICAgICAgICBcInN1Y2Nlc3NcIlxuICAgICAgKTtcblxuICAgICAgLy8gUmVkaXJlY3QgYWZ0ZXIgYSBzaG9ydCBkZWxheVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvbG9naW5cIjtcbiAgICAgIH0sIDIwMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIYW5kbGUgbm9uLXN1Y2Nlc3NmdWwgcmVzcG9uc2VzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggc3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gSGFuZGxlIGVycm9yc1xuICAgIGNvbnNvbGUuZXJyb3IoXCJDb25maXJtYXRpb24gZXJyb3I6XCIsIGVycm9yKTtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc3RhY2s6XCIsIGVycm9yLnN0YWNrKTtcblxuICAgIC8vIEhpZGUgbG9hZGluZ1xuICAgIGhpZGVMb2FkaW5nKFwiY29uZmlybUJ1dHRvblwiLCBcImNvbmZpcm1TcGlubmVyXCIpO1xuICAgIGlmIChsb2FkaW5nKSBsb2FkaW5nLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XG5cbiAgICAvLyBTaG93IGVycm9yIG1lc3NhZ2VcbiAgICBzaG93U3RhdHVzKFxuICAgICAgYEFuIGVycm9yIG9jY3VycmVkIGR1cmluZyBjb25maXJtYXRpb246ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgXCJkYW5nZXJcIlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0Q29uZmlybWF0aW9uUGFnZSxcbiAgY29uZmlybUVtYWlsLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gc3JjL2VudHJpZXMvY29uZmlybWF0aW9uLmpzXG4vKipcbiAqIENvbmZpcm1hdGlvbiBFbnRyeSBQb2ludFxuICpcbiAqIFRoaXMgbW9kdWxlIHNlcnZlcyBhcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBlbWFpbCBjb25maXJtYXRpb24gcGFnZS5cbiAqL1xuXG4vLyBJbXBvcnQgb3VyIGNvbmZpcm1hdGlvbiBtb2R1bGVcbmltcG9ydCB7IGluaXRDb25maXJtYXRpb25QYWdlIH0gZnJvbSBcIi4uL2F1dGgvY29uZmlybWF0aW9uLmpzXCI7XG5cbi8vIEluaXRpYWxpemUgY29uZmlybWF0aW9uIHBhZ2Ugd2hlbiBET00gaXMgbG9hZGVkXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIC8vIEluaXRpYWxpemUgY29uZmlybWF0aW9uIHBhZ2VcbiAgaW5pdENvbmZpcm1hdGlvblBhZ2UoKTtcblxuICBjb25zb2xlLmxvZyhcIkNvbmZpcm1hdGlvbiBwYWdlIGluaXRpYWxpemVkXCIpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=