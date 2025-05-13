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
 * @version 0.0.2
 *
 * @changelog
 * - 0.0.1 (2025-05-03): Initial creation
 * - 0.0.2 (2025-05-08): Reorganization into separate modules
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
  window.location.href = "/index.html";
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
    errorElement.classList.remove("d-none");
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
    statusElement.classList.remove("d-none");
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
    element.classList.add("d-none");
  }
}

/**
 * Shows an element
 * @param {string} elementId - ID of the element to show
 */
function showElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove("d-none");
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
  if (spinner) spinner.classList.remove("d-none");
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
  if (spinner) spinner.classList.add("d-none");
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
          const response = await fetch("terms.html"); // Assumes terms.html is in public/ directory
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
        window.location.href = "/login.html";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLHFEQUFXOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sOENBQVE7QUFDZCxLQUFLLG9CQUFvQixvQ0FBb0M7O0FBRTdEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHFEQUFXO0FBQ2pCOztBQUVBO0FBQ0EsTUFBTSxvREFBVTtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBLDJEQUEyRCxnQkFBZ0I7QUFDM0U7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxxREFBVztBQUNmOztBQUVBO0FBQ0EsSUFBSSxvREFBVTtBQUNkLGdEQUFnRCxjQUFjO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNFQUFlO0FBQ2Y7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7OztVQ2xNRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUMrRDs7QUFFL0Q7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyRUFBb0I7O0FBRXRCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9hdXRoLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9jb25maXJtYXRpb24uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9lbnRyaWVzL2NvbmZpcm1hdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvYXV0aC9hdXRoLmpzXG4vKipcbiAqIEF1dGhlbnRpY2F0aW9uIE1vZHVsZSAtIEJhc2VcbiAqIEBtb2R1bGUgYXV0aFxuICogQGRlc2NyaXB0aW9uIEJhc2UgbW9kdWxlIGZvciBhdXRoZW50aWNhdGlvbiB3aXRoIGNvbW1vbiBmdW5jdGlvbnMgYW5kIGNvbmZpZ3VyYXRpb25cbiAqIEB2ZXJzaW9uIDAuMC4yXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuMSAoMjAyNS0wNS0wMyk6IEluaXRpYWwgY3JlYXRpb25cbiAqIC0gMC4wLjIgKDIwMjUtMDUtMDgpOiBSZW9yZ2FuaXphdGlvbiBpbnRvIHNlcGFyYXRlIG1vZHVsZXNcbiAqL1xuXG4vLyAtLS0gQVBJIFVSTCBEZWZpbml0aW9ucyAtLS1cbmV4cG9ydCBjb25zdCBJU19MT0NBTCA9XG4gIGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiO1xuXG5leHBvcnQgY29uc3QgQVBJX1VSTFMgPSB7XG4gIEhBTkRMRV9DT05GSVJNQVRJT046IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX2NvbmZpcm1hdGlvblwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLWNvbmZpcm1hdGlvbi11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxuXG4gIEhBTkRMRV9TSUdOVVA6IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX3NpZ251cFwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLXNpZ251cC11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxuXG4gIEhBTkRMRV9MT0dJTjogSVNfTE9DQUxcbiAgICA/IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAxL3VyYmFuZG9jcy91cy1jZW50cmFsMS9oYW5kbGVfbG9naW5cIlxuICAgIDogXCJodHRwczovL2hhbmRsZS1sb2dpbi11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxufTtcblxuLy8gR2xvYmFsIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG5sZXQgY3VycmVudFVzZXIgPSBudWxsO1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdXNlclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXIgLSBVc2VyIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXIpIHtcbiAgY3VycmVudFVzZXIgPSB1c2VyO1xuICAvLyBQb3NzaWJsZSBzdG9yYWdlIGluIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxuICBpZiAodXNlcikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgdXNlclxuICogQHJldHVybnMge09iamVjdHxudWxsfSBUaGUgY3VycmVudCB1c2VyIG9yIG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCkge1xuICAvLyBJZiBubyB1c2VyIGluIG1lbW9yeSwgdHJ5IHRvIHJldHJpZXZlIGl0IGZyb20gc3RvcmFnZVxuICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIExvZ3Mgb3V0IHRoZSB1c2VyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgLy8gUmVkaXJlY3QgdG8gdGhlIGhvbWUgcGFnZSBhZnRlciBsb2dvdXRcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9pbmRleC5odG1sXCI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuICByZXR1cm4gZ2V0Q3VycmVudFVzZXIoKSAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhbiBlcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIEVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIGVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZSwgZWxlbWVudElkID0gXCJlcnJvck1lc3NhZ2VcIikge1xuICBjb25zdCBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZXJyb3JFbGVtZW50KSB7XG4gICAgZXJyb3JFbGVtZW50LmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGxheXMgYSBzdGF0dXMgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBNZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gTWVzc2FnZSB0eXBlIChzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBkYW5nZXIpXG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd1N0YXR1cyhcbiAgbWVzc2FnZSxcbiAgdHlwZSA9IFwiaW5mb1wiLFxuICBlbGVtZW50SWQgPSBcInN0YXR1c01lc3NhZ2VcIlxuKSB7XG4gIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoc3RhdHVzRWxlbWVudCkge1xuICAgIHN0YXR1c0VsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCBhbGVydC0qIGNsYXNzZXNcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcImFsZXJ0LVwiKSkge1xuICAgICAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgY2xhc3MgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZVxuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmFkZChgYWxlcnQtJHt0eXBlfWApO1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU3RhdHVzIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogSGlkZXMgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIGhpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gc2hvd1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93TG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcbn1cblxuLyoqXG4gKiBIaWRlcyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUxvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xufVxuXG4vLyBFeHBvcnQgdGhlIG5lY2Vzc2FyeSBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlc1xuZXhwb3J0IGRlZmF1bHQge1xuICBBUElfVVJMUyxcbiAgSVNfTE9DQUwsXG4gIGdldEN1cnJlbnRVc2VyLFxuICBzZXRDdXJyZW50VXNlcixcbiAgbG9nb3V0LFxuICBpc0xvZ2dlZEluLFxuICBzaG93RXJyb3IsXG4gIHNob3dTdGF0dXMsXG4gIGhpZGVFbGVtZW50LFxuICBzaG93RWxlbWVudCxcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufTtcbiIsIi8vIHNyYy9hdXRoL2NvbmZpcm1hdGlvbi5qc1xuLyoqXG4gKiBDb25maXJtYXRpb24gTW9kdWxlXG4gKiBAbW9kdWxlIGNvbmZpcm1hdGlvblxuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgZW1haWwgY29uZmlybWF0aW9uIGFmdGVyIHJlZ2lzdHJhdGlvblxuICogQHZlcnNpb24gMC4wLjNcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4xICgyMDI1LTA1LTA4KTogQ3JlYXRlZCB0aGUgY29uZmlybWF0aW9uIG1vZHVsZSB3aXRoIGJhc2ljIGZ1bmN0aW9uYWxpdHkuXG4gKiAtIDAuMC4yICgyMDI1LTA1LTEwKTogQWRkZWQgdGVybXMgb2Ygc2VydmljZSBhbmQgY29uZmlybWF0aW9uIGVtYWlsLlxuICogLSAwLjAuMyAoMjAyNS0wNS0xMik6IEFkZGVkIHRlcm1zIG9mIHNlcnZpY2UgbW9kYWwgYW5kIGNvbmZpcm1hdGlvbiBlbWFpbC5cbiAqL1xuXG5pbXBvcnQge1xuICBBUElfVVJMUyxcbiAgc2hvd1N0YXR1cyxcbiAgc2hvd0Vycm9yLFxuICBzaG93TG9hZGluZyxcbiAgaGlkZUxvYWRpbmcsXG59IGZyb20gXCIuL2F1dGguanNcIjtcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgZW1haWwgY29uZmlybWF0aW9uIHBhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRDb25maXJtYXRpb25QYWdlKCkge1xuICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICBjb25zdCBjb25maXJtYXRpb25VcmwgPSB1cmxQYXJhbXMuZ2V0KFwiY29uZmlybWF0aW9uX3VybFwiKTtcblxuICBjb25zdCBjb25maXJtQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25maXJtQnV0dG9uXCIpO1xuICBjb25zdCBzdGF0dXNNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0dXNNZXNzYWdlXCIpO1xuICBjb25zdCB0b3NDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9zQ2hlY2tib3hcIik7XG4gIGNvbnN0IHRvc01vZGFsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9zTW9kYWxcIik7XG4gIGNvbnN0IHRvc01vZGFsQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9zTW9kYWxCb2R5XCIpO1xuXG4gIC8vIEV4aXQgZWFybHkgaWYgbm8gY29uZmlybWF0aW9uIFVSTCBpcyBwcmVzZW50XG4gIGlmICghY29uZmlybWF0aW9uVXJsKSB7XG4gICAgc3RhdHVzTWVzc2FnZS50ZXh0Q29udGVudCA9XG4gICAgICBcIkVycm9yOiBNaXNzaW5nIGNvbmZpcm1hdGlvbiBVUkwuIFBsZWFzZSBjaGVjayB0aGUgbGluayBpbiB5b3VyIGVtYWlsLlwiO1xuICAgIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImFsZXJ0LWRhbmdlclwiKTtcbiAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XG4gICAgY29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRvc01vZGFsRWxlbWVudCkge1xuICAgIHRvc01vZGFsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic2hvdy5icy5tb2RhbFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodG9zTW9kYWxCb2R5LmRhdGFzZXQubG9hZGVkICE9PSBcInRydWVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJ0ZXJtcy5odG1sXCIpOyAvLyBBc3N1bWVzIHRlcm1zLmh0bWwgaXMgaW4gcHVibGljLyBkaXJlY3RvcnlcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBGYWlsZWQgdG8gbG9hZCBUZXJtcyBvZiBTZXJ2aWNlOiAke3Jlc3BvbnNlLnN0YXR1c31gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0b3NIdG1sID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgIHRvc01vZGFsQm9keS5pbm5lckhUTUwgPSB0b3NIdG1sO1xuICAgICAgICAgIHRvc01vZGFsQm9keS5kYXRhc2V0LmxvYWRlZCA9IFwidHJ1ZVwiOyAvLyBNYXJrIGFzIGxvYWRlZCB0byBwcmV2ZW50IG11bHRpcGxlIGZldGNoZXNcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICB0b3NNb2RhbEJvZHkuaW5uZXJIVE1MID1cbiAgICAgICAgICAgIFwiPHAgY2xhc3M9J3RleHQtZGFuZ2VyJz5Db3VsZCBub3QgbG9hZCBUZXJtcyBvZiBTZXJ2aWNlLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLjwvcD5cIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdG9zTW9kYWxCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgLy8gQ2hlY2sgaWYgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbSAod2l0aCBhIHNtYWxsIHRvbGVyYW5jZSlcbiAgICAgIGlmIChcbiAgICAgICAgdG9zTW9kYWxCb2R5LnNjcm9sbEhlaWdodCAtIHRvc01vZGFsQm9keS5zY3JvbGxUb3AgPD1cbiAgICAgICAgdG9zTW9kYWxCb2R5LmNsaWVudEhlaWdodCArIDJcbiAgICAgICkge1xuICAgICAgICAvLyArMiBmb3IgdG9sZXJhbmNlXG4gICAgICAgIHRvc0NoZWNrYm94LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAodG9zQ2hlY2tib3gpIHtcbiAgICB0b3NDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGNvbmZpcm1CdXR0b24uZGlzYWJsZWQgPSAhdG9zQ2hlY2tib3guY2hlY2tlZDtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoIXRvc0NoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgIHNob3dFcnJvcihcbiAgICAgICAgXCJWZXVpbGxleiBhY2NlcHRlciBsZXMgQ29uZGl0aW9ucyBkJ1V0aWxpc2F0aW9uIHBvdXIgY29udGludWVyLlwiXG4gICAgICApO1xuICAgICAgLy8gRW5zdXJlIHN0YXR1c01lc3NhZ2UgaXMgdmlzaWJsZSBpZiBzaG93RXJyb3IgZG9lc24ndCBoYW5kbGUgaXQgb3IgaWYgeW91IHdhbnQgYSBzcGVjaWZpYyBzdHlsZVxuICAgICAgaWYgKHN0YXR1c01lc3NhZ2UpIHtcbiAgICAgICAgc3RhdHVzTWVzc2FnZS5pbm5lckhUTUwgPVxuICAgICAgICAgIFwiPGRpdiBjbGFzcz0nYWxlcnQgYWxlcnQtZGFuZ2VyJz5WZXVpbGxleiBhY2NlcHRlciBsZXMgQ29uZGl0aW9ucyBkJ1V0aWxpc2F0aW9uIHBvdXIgY29udGludWVyLjwvZGl2PlwiO1xuICAgICAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbmZpcm1FbWFpbChjb25maXJtYXRpb25VcmwpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb25maXJtcyB0aGUgZW1haWwgYWRkcmVzcyB3aXRoIHRoZSBjb25maXJtYXRpb24gVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uZmlybWF0aW9uVXJsIC0gQ29uZmlybWF0aW9uIFVSTCByZWNlaXZlZCBieSBlbWFpbFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29uZmlybUVtYWlsKGNvbmZpcm1hdGlvblVybCkge1xuICBjb25zdCBjb25maXJtQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25maXJtQnV0dG9uXCIpO1xuICBjb25zdCBzdGF0dXNNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0dXNNZXNzYWdlXCIpO1xuICBjb25zdCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2FkaW5nXCIpO1xuICBjb25zdCBjb25maXJtU3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZmlybVNwaW5uZXJcIik7XG4gIGNvbnN0IHRvc0NoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3NDaGVja2JveFwiKTsgLy8gR2V0IGNoZWNrYm94IGhlcmUgdG9vXG5cbiAgLy8gRW5zdXJlIFRvUyBpcyBjaGVja2VkIGJlZm9yZSBwcm9jZWVkaW5nIChkb3VibGUtY2hlY2ssIHByaW1hcnkgY2hlY2sgaXMgaW4gY2xpY2sgbGlzdGVuZXIpXG4gIGlmICghdG9zQ2hlY2tib3ggfHwgIXRvc0NoZWNrYm94LmNoZWNrZWQpIHtcbiAgICBzaG93RXJyb3IoXCJMZXMgQ29uZGl0aW9ucyBkJ1V0aWxpc2F0aW9uIGRvaXZlbnQgw6p0cmUgYWNjZXB0w6llcy5cIik7XG4gICAgLy8gT3B0aW9uYWxseSwgZW5zdXJlIHRoZSBtZXNzYWdlIGlzIGRpc3BsYXllZCBwcm9taW5lbnRseVxuICAgIGlmIChzdGF0dXNNZXNzYWdlKSB7XG4gICAgICBzdGF0dXNNZXNzYWdlLmlubmVySFRNTCA9XG4gICAgICAgIFwiPGRpdiBjbGFzcz0nYWxlcnQgYWxlcnQtZGFuZ2VyJz5MZXMgQ29uZGl0aW9ucyBkJ1V0aWxpc2F0aW9uIGRvaXZlbnQgw6p0cmUgYWNjZXB0w6llcy48L2Rpdj5cIjtcbiAgICAgIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gU2hvdyBsb2FkaW5nIGluZGljYXRvclxuICBzaG93TG9hZGluZyhcImNvbmZpcm1CdXR0b25cIiwgXCJjb25maXJtU3Bpbm5lclwiKTtcblxuICBpZiAobG9hZGluZykgbG9hZGluZy5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xuICBpZiAoc3RhdHVzTWVzc2FnZSkgc3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgdXJsID0gYCR7XG4gICAgICBBUElfVVJMUy5IQU5ETEVfQ09ORklSTUFUSU9OXG4gICAgfT9jb25maXJtYXRpb25fdXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpcm1hdGlvblVybCl9YDtcblxuICAgIGNvbnNvbGUubG9nKFwiQ29uZmlybWluZyBlbWFpbCB3aXRoIFVSTDpcIiwgdXJsKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcblxuICAgIC8vIExvZyB0aGUgZnVsbCByZXNwb25zZSBmb3IgZGVidWdnaW5nXG4gICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBzdGF0dXM6XCIsIHJlc3BvbnNlLnN0YXR1cyk7XG4gICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBoZWFkZXJzOlwiLCBbLi4ucmVzcG9uc2UuaGVhZGVycy5lbnRyaWVzKCldKTtcblxuICAgIGxldCByZXNwb25zZURhdGE7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKTtcblxuICAgIGlmIChjb250ZW50VHlwZSAmJiBjb250ZW50VHlwZS5pbmNsdWRlcyhcImFwcGxpY2F0aW9uL2pzb25cIikpIHtcbiAgICAgIHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgSlNPTjpcIiwgcmVzcG9uc2VEYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zZSB0ZXh0OlwiLCByZXNwb25zZURhdGEpO1xuICAgIH1cblxuICAgIC8vIERvbid0IHRocm93IGVycm9yIGZvciBzdWNjZXNzZnVsIHJlc3BvbnNlc1xuICAgIC8vIFNvbWUgc2VydmVycyByZXR1cm4gMjAwLCAyMDEsIDIwMiwgMjA0IGZvciBzdWNjZXNzXG4gICAgaWYgKHJlc3BvbnNlLm9rIHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0KSB7XG4gICAgICAvLyBIaWRlIGxvYWRpbmdcbiAgICAgIGhpZGVMb2FkaW5nKFwiY29uZmlybUJ1dHRvblwiLCBcImNvbmZpcm1TcGlubmVyXCIpO1xuICAgICAgaWYgKGxvYWRpbmcpIGxvYWRpbmcuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcblxuICAgICAgLy8gU2hvdyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgIHNob3dTdGF0dXMoXG4gICAgICAgIFwiWW91ciBlbWFpbCBoYXMgYmVlbiB2ZXJpZmllZCEgUmVkaXJlY3RpbmcgdG8gdGhlIGxvZ2luIHBhZ2UuLi5cIixcbiAgICAgICAgXCJzdWNjZXNzXCJcbiAgICAgICk7XG5cbiAgICAgIC8vIFJlZGlyZWN0IGFmdGVyIGEgc2hvcnQgZGVsYXlcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2xvZ2luLmh0bWxcIjtcbiAgICAgIH0sIDIwMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIYW5kbGUgbm9uLXN1Y2Nlc3NmdWwgcmVzcG9uc2VzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggc3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gSGFuZGxlIGVycm9yc1xuICAgIGNvbnNvbGUuZXJyb3IoXCJDb25maXJtYXRpb24gZXJyb3I6XCIsIGVycm9yKTtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc3RhY2s6XCIsIGVycm9yLnN0YWNrKTtcblxuICAgIC8vIEhpZGUgbG9hZGluZ1xuICAgIGhpZGVMb2FkaW5nKFwiY29uZmlybUJ1dHRvblwiLCBcImNvbmZpcm1TcGlubmVyXCIpO1xuICAgIGlmIChsb2FkaW5nKSBsb2FkaW5nLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XG5cbiAgICAvLyBTaG93IGVycm9yIG1lc3NhZ2VcbiAgICBzaG93U3RhdHVzKFxuICAgICAgYEFuIGVycm9yIG9jY3VycmVkIGR1cmluZyBjb25maXJtYXRpb246ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgXCJkYW5nZXJcIlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0Q29uZmlybWF0aW9uUGFnZSxcbiAgY29uZmlybUVtYWlsLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gc3JjL2VudHJpZXMvY29uZmlybWF0aW9uLmpzXG4vKipcbiAqIENvbmZpcm1hdGlvbiBFbnRyeSBQb2ludFxuICpcbiAqIFRoaXMgbW9kdWxlIHNlcnZlcyBhcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBlbWFpbCBjb25maXJtYXRpb24gcGFnZS5cbiAqL1xuXG4vLyBJbXBvcnQgb3VyIGNvbmZpcm1hdGlvbiBtb2R1bGVcbmltcG9ydCB7IGluaXRDb25maXJtYXRpb25QYWdlIH0gZnJvbSBcIi4uL2F1dGgvY29uZmlybWF0aW9uLmpzXCI7XG5cbi8vIEluaXRpYWxpemUgY29uZmlybWF0aW9uIHBhZ2Ugd2hlbiBET00gaXMgbG9hZGVkXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIC8vIEluaXRpYWxpemUgY29uZmlybWF0aW9uIHBhZ2VcbiAgaW5pdENvbmZpcm1hdGlvblBhZ2UoKTtcblxuICBjb25zb2xlLmxvZyhcIkNvbmZpcm1hdGlvbiBwYWdlIGluaXRpYWxpemVkXCIpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=