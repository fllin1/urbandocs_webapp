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

/***/ "./src/js/auth/signup.js":
/*!*******************************!*\
  !*** ./src/js/auth/signup.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initSignupPage: () => (/* binding */ initSignupPage)
/* harmony export */ });
/* unused harmony export signup */
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth/auth.js");
// src/auth/signup.js
/**
 * Signup Module
 * @module signup
 * @description Handles user registration with client-side validation
 * @version 0.0.2
 *
 * @changelog
 * - 0.0.2 (2025-05-10): Added robust client-side email format and password complexity validation.
 * - 0.0.1 (2025-05-08): Created the signup module with basic functionality.
 */



/**
 * Initializes the signup page
 */
function initSignupPage() {
  const signupForm = document.getElementById("signupForm");
  const errorMessageDiv = document.getElementById("errorMessage"); // Renamed for clarity
  const statusMessage = document.getElementById("statusMessage");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset messages
      errorMessageDiv.classList.add("d-none"); // Use the renamed variable
      errorMessageDiv.innerHTML = ""; // Clear previous messages
      statusMessage.classList.add("d-none");

      // Get form values
      const email = document.getElementById("email").value.trim(); // Trim whitespace from email
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      let validationErrors = []; // Array to collect all validation errors

      // --- Client-side Validation ---

      // 1. Email Format Validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email format
      if (!emailPattern.test(email)) {
        validationErrors.push("L'adresse email n'est pas valide.");
      }

      // 2. Check if passwords match
      if (password !== confirmPassword) {
        validationErrors.push("Les mots de passe ne correspondent pas.");
      }

      // 3. Password Strength Validation
      const passwordComplexityPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordComplexityPattern.test(password) || password.length < 8) {
        validationErrors.push("Le format du mot de passe est invalide.");
      }

      // --- Handle Validation Results ---

      if (validationErrors.length > 0) {
        // NOTE: The \n is not working as expected
        const errorText = validationErrors.join("<br>");
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(errorText);
        return; // Stop the process if validation fails
      }

      // If validation passes, proceed with the original logic

      // Show loading state
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("signupBtn", "signupSpinner");

      try {
        // Call signup function
        await signup(email, password);
      } catch (error) {
        console.error("Signup error:", error);
        // showError expects a string, extract message or provide a default
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(
          error.message || "Une erreur est survenue lors de l'inscription."
        );
      } finally {
        // Reset button state
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("signupBtn", "signupSpinner");
      }
    });
  } else {
    console.error(
      "CRITICAL: Signup form with ID 'signupForm' not found. Event listener not attached."
    );
  }
}

/**
 * Registers a user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise resolved on success
 */
async function signup(email, password) {
  try {
    // Create request data
    const requestData = {
      email: email,
      password: password,
    };

    // Call Firebase function (assuming this calls a Firebase Function or similar backend)
    const response = await fetch(_auth_js__WEBPACK_IMPORTED_MODULE_0__.API_URLS.HANDLE_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    // Parse response
    const responseData = await response.json();

    // Check for error in response
    if (!response.ok) {
      // Handle known error cases from backend
      if (responseData.error) {
        // Re-throw the specific backend error message
        throw new Error(responseData.error);
      }
      // Fallback for unexpected server errors
      throw new Error(`Erreur du serveur: ${response.status}`);
    }

    // Success case
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showStatus)(
      "Identifiants valides ! Veuillez vérifier votre email pour confirmer votre inscription.",
      "success"
    );

    // Optionally hide form or redirect on success
    document.getElementById("signupForm").style.display = "none"; // Keep this if desired

    return responseData; // Return data if needed by caller
  } catch (error) {
    // Log and re-throw the error to be handled by the caller (in the submit listener)
    console.error("Signup error:", error);
    throw error; // The submit listener's catch block will handle displaying this error
  }
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  initSignupPage,
  signup,
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
/*!**********************************!*\
  !*** ./src/js/entries/signup.js ***!
  \**********************************/
/* harmony import */ var _auth_signup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/signup.js */ "./src/js/auth/signup.js");
// src/entries/signup.js
/**
 * Signup Entry Point
 *
 * This module serves as the entry point for the signup page.
 */

// Import our signup module


// Initialize signup page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize signup page
  (0,_auth_signup_js__WEBPACK_IMPORTED_MODULE_0__.initSignupPage)();

  console.log("Signup page initialized");
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBLGlDQUFpQyw4Q0FBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxnQkFBZ0I7QUFDNUQ7O0FBRUE7QUFDQSxJQUFJLG9EQUFVO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0VBQWtFOztBQUVsRSx5QkFBeUI7QUFDekIsSUFBSTtBQUNKO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQSxzRUFBZTtBQUNmO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7VUMzSkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBLEVBQUUsK0RBQWM7O0FBRWhCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9hdXRoLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9zaWdudXAuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9lbnRyaWVzL3NpZ251cC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvYXV0aC9hdXRoLmpzXG4vKipcbiAqIEF1dGhlbnRpY2F0aW9uIE1vZHVsZSAtIEJhc2VcbiAqIEBtb2R1bGUgYXV0aFxuICogQGRlc2NyaXB0aW9uIEJhc2UgbW9kdWxlIGZvciBhdXRoZW50aWNhdGlvbiB3aXRoIGNvbW1vbiBmdW5jdGlvbnMgYW5kIGNvbmZpZ3VyYXRpb25cbiAqIEB2ZXJzaW9uIDAuMC4yXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuMSAoMjAyNS0wNS0wMyk6IEluaXRpYWwgY3JlYXRpb25cbiAqIC0gMC4wLjIgKDIwMjUtMDUtMDgpOiBSZW9yZ2FuaXphdGlvbiBpbnRvIHNlcGFyYXRlIG1vZHVsZXNcbiAqL1xuXG4vLyAtLS0gQVBJIFVSTCBEZWZpbml0aW9ucyAtLS1cbmV4cG9ydCBjb25zdCBJU19MT0NBTCA9XG4gIGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiO1xuXG5leHBvcnQgY29uc3QgQVBJX1VSTFMgPSB7XG4gIEhBTkRMRV9DT05GSVJNQVRJT046IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX2NvbmZpcm1hdGlvblwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLWNvbmZpcm1hdGlvbi11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxuXG4gIEhBTkRMRV9TSUdOVVA6IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX3NpZ251cFwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLXNpZ251cC11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxuXG4gIEhBTkRMRV9MT0dJTjogSVNfTE9DQUxcbiAgICA/IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAxL3VyYmFuZG9jcy91cy1jZW50cmFsMS9oYW5kbGVfbG9naW5cIlxuICAgIDogXCJodHRwczovL2hhbmRsZS1sb2dpbi11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxufTtcblxuLy8gR2xvYmFsIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG5sZXQgY3VycmVudFVzZXIgPSBudWxsO1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdXNlclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXIgLSBVc2VyIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXIpIHtcbiAgY3VycmVudFVzZXIgPSB1c2VyO1xuICAvLyBQb3NzaWJsZSBzdG9yYWdlIGluIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxuICBpZiAodXNlcikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgdXNlclxuICogQHJldHVybnMge09iamVjdHxudWxsfSBUaGUgY3VycmVudCB1c2VyIG9yIG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCkge1xuICAvLyBJZiBubyB1c2VyIGluIG1lbW9yeSwgdHJ5IHRvIHJldHJpZXZlIGl0IGZyb20gc3RvcmFnZVxuICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIExvZ3Mgb3V0IHRoZSB1c2VyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgLy8gUmVkaXJlY3QgdG8gdGhlIGhvbWUgcGFnZSBhZnRlciBsb2dvdXRcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9pbmRleC5odG1sXCI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuICByZXR1cm4gZ2V0Q3VycmVudFVzZXIoKSAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhbiBlcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIEVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIGVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZSwgZWxlbWVudElkID0gXCJlcnJvck1lc3NhZ2VcIikge1xuICBjb25zdCBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZXJyb3JFbGVtZW50KSB7XG4gICAgZXJyb3JFbGVtZW50LmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGxheXMgYSBzdGF0dXMgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBNZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gTWVzc2FnZSB0eXBlIChzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBkYW5nZXIpXG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd1N0YXR1cyhcbiAgbWVzc2FnZSxcbiAgdHlwZSA9IFwiaW5mb1wiLFxuICBlbGVtZW50SWQgPSBcInN0YXR1c01lc3NhZ2VcIlxuKSB7XG4gIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoc3RhdHVzRWxlbWVudCkge1xuICAgIHN0YXR1c0VsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCBhbGVydC0qIGNsYXNzZXNcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcImFsZXJ0LVwiKSkge1xuICAgICAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgY2xhc3MgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZVxuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmFkZChgYWxlcnQtJHt0eXBlfWApO1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU3RhdHVzIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogSGlkZXMgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIGhpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gc2hvd1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93TG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcbn1cblxuLyoqXG4gKiBIaWRlcyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUxvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xufVxuXG4vLyBFeHBvcnQgdGhlIG5lY2Vzc2FyeSBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlc1xuZXhwb3J0IGRlZmF1bHQge1xuICBBUElfVVJMUyxcbiAgSVNfTE9DQUwsXG4gIGdldEN1cnJlbnRVc2VyLFxuICBzZXRDdXJyZW50VXNlcixcbiAgbG9nb3V0LFxuICBpc0xvZ2dlZEluLFxuICBzaG93RXJyb3IsXG4gIHNob3dTdGF0dXMsXG4gIGhpZGVFbGVtZW50LFxuICBzaG93RWxlbWVudCxcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufTtcbiIsIi8vIHNyYy9hdXRoL3NpZ251cC5qc1xuLyoqXG4gKiBTaWdudXAgTW9kdWxlXG4gKiBAbW9kdWxlIHNpZ251cFxuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdXNlciByZWdpc3RyYXRpb24gd2l0aCBjbGllbnQtc2lkZSB2YWxpZGF0aW9uXG4gKiBAdmVyc2lvbiAwLjAuMlxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjIgKDIwMjUtMDUtMTApOiBBZGRlZCByb2J1c3QgY2xpZW50LXNpZGUgZW1haWwgZm9ybWF0IGFuZCBwYXNzd29yZCBjb21wbGV4aXR5IHZhbGlkYXRpb24uXG4gKiAtIDAuMC4xICgyMDI1LTA1LTA4KTogQ3JlYXRlZCB0aGUgc2lnbnVwIG1vZHVsZSB3aXRoIGJhc2ljIGZ1bmN0aW9uYWxpdHkuXG4gKi9cblxuaW1wb3J0IHtcbiAgQVBJX1VSTFMsXG4gIHNob3dFcnJvcixcbiAgc2hvd1N0YXR1cyxcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufSBmcm9tIFwiLi9hdXRoLmpzXCI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIHNpZ251cCBwYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0U2lnbnVwUGFnZSgpIHtcbiAgY29uc3Qgc2lnbnVwRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbnVwRm9ybVwiKTtcbiAgY29uc3QgZXJyb3JNZXNzYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvck1lc3NhZ2VcIik7IC8vIFJlbmFtZWQgZm9yIGNsYXJpdHlcbiAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcblxuICBpZiAoc2lnbnVwRm9ybSkge1xuICAgIHNpZ251cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAvLyBSZXNldCBtZXNzYWdlc1xuICAgICAgZXJyb3JNZXNzYWdlRGl2LmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7IC8vIFVzZSB0aGUgcmVuYW1lZCB2YXJpYWJsZVxuICAgICAgZXJyb3JNZXNzYWdlRGl2LmlubmVySFRNTCA9IFwiXCI7IC8vIENsZWFyIHByZXZpb3VzIG1lc3NhZ2VzXG4gICAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XG5cbiAgICAgIC8vIEdldCBmb3JtIHZhbHVlc1xuICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlLnRyaW0oKTsgLy8gVHJpbSB3aGl0ZXNwYWNlIGZyb20gZW1haWxcbiAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcbiAgICAgIGNvbnN0IGNvbmZpcm1QYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZmlybVBhc3N3b3JkXCIpLnZhbHVlO1xuXG4gICAgICBsZXQgdmFsaWRhdGlvbkVycm9ycyA9IFtdOyAvLyBBcnJheSB0byBjb2xsZWN0IGFsbCB2YWxpZGF0aW9uIGVycm9yc1xuXG4gICAgICAvLyAtLS0gQ2xpZW50LXNpZGUgVmFsaWRhdGlvbiAtLS1cblxuICAgICAgLy8gMS4gRW1haWwgRm9ybWF0IFZhbGlkYXRpb25cbiAgICAgIGNvbnN0IGVtYWlsUGF0dGVybiA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvOyAvLyBTaW1wbGUgcmVnZXggZm9yIGVtYWlsIGZvcm1hdFxuICAgICAgaWYgKCFlbWFpbFBhdHRlcm4udGVzdChlbWFpbCkpIHtcbiAgICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKFwiTCdhZHJlc3NlIGVtYWlsIG4nZXN0IHBhcyB2YWxpZGUuXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyAyLiBDaGVjayBpZiBwYXNzd29yZHMgbWF0Y2hcbiAgICAgIGlmIChwYXNzd29yZCAhPT0gY29uZmlybVBhc3N3b3JkKSB7XG4gICAgICAgIHZhbGlkYXRpb25FcnJvcnMucHVzaChcIkxlcyBtb3RzIGRlIHBhc3NlIG5lIGNvcnJlc3BvbmRlbnQgcGFzLlwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gMy4gUGFzc3dvcmQgU3RyZW5ndGggVmFsaWRhdGlvblxuICAgICAgY29uc3QgcGFzc3dvcmRDb21wbGV4aXR5UGF0dGVybiA9IC9eKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qXFxkKS4rJC87XG4gICAgICBpZiAoIXBhc3N3b3JkQ29tcGxleGl0eVBhdHRlcm4udGVzdChwYXNzd29yZCkgfHwgcGFzc3dvcmQubGVuZ3RoIDwgOCkge1xuICAgICAgICB2YWxpZGF0aW9uRXJyb3JzLnB1c2goXCJMZSBmb3JtYXQgZHUgbW90IGRlIHBhc3NlIGVzdCBpbnZhbGlkZS5cIik7XG4gICAgICB9XG5cbiAgICAgIC8vIC0tLSBIYW5kbGUgVmFsaWRhdGlvbiBSZXN1bHRzIC0tLVxuXG4gICAgICBpZiAodmFsaWRhdGlvbkVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIE5PVEU6IFRoZSBcXG4gaXMgbm90IHdvcmtpbmcgYXMgZXhwZWN0ZWRcbiAgICAgICAgY29uc3QgZXJyb3JUZXh0ID0gdmFsaWRhdGlvbkVycm9ycy5qb2luKFwiPGJyPlwiKTtcbiAgICAgICAgc2hvd0Vycm9yKGVycm9yVGV4dCk7XG4gICAgICAgIHJldHVybjsgLy8gU3RvcCB0aGUgcHJvY2VzcyBpZiB2YWxpZGF0aW9uIGZhaWxzXG4gICAgICB9XG5cbiAgICAgIC8vIElmIHZhbGlkYXRpb24gcGFzc2VzLCBwcm9jZWVkIHdpdGggdGhlIG9yaWdpbmFsIGxvZ2ljXG5cbiAgICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgc2hvd0xvYWRpbmcoXCJzaWdudXBCdG5cIiwgXCJzaWdudXBTcGlubmVyXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBDYWxsIHNpZ251cCBmdW5jdGlvblxuICAgICAgICBhd2FpdCBzaWdudXAoZW1haWwsIHBhc3N3b3JkKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTaWdudXAgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgLy8gc2hvd0Vycm9yIGV4cGVjdHMgYSBzdHJpbmcsIGV4dHJhY3QgbWVzc2FnZSBvciBwcm92aWRlIGEgZGVmYXVsdFxuICAgICAgICBzaG93RXJyb3IoXG4gICAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBcIlVuZSBlcnJldXIgZXN0IHN1cnZlbnVlIGxvcnMgZGUgbCdpbnNjcmlwdGlvbi5cIlxuICAgICAgICApO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgLy8gUmVzZXQgYnV0dG9uIHN0YXRlXG4gICAgICAgIGhpZGVMb2FkaW5nKFwic2lnbnVwQnRuXCIsIFwic2lnbnVwU3Bpbm5lclwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgXCJDUklUSUNBTDogU2lnbnVwIGZvcm0gd2l0aCBJRCAnc2lnbnVwRm9ybScgbm90IGZvdW5kLiBFdmVudCBsaXN0ZW5lciBub3QgYXR0YWNoZWQuXCJcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogUmVnaXN0ZXJzIGEgdXNlciB3aXRoIGVtYWlsIGFuZCBwYXNzd29yZFxuICogQHBhcmFtIHtzdHJpbmd9IGVtYWlsIC0gVXNlcidzIGVtYWlsXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgLSBVc2VyJ3MgcGFzc3dvcmRcbiAqIEByZXR1cm5zIHtQcm9taXNlfSAtIFByb21pc2UgcmVzb2x2ZWQgb24gc3VjY2Vzc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2lnbnVwKGVtYWlsLCBwYXNzd29yZCkge1xuICB0cnkge1xuICAgIC8vIENyZWF0ZSByZXF1ZXN0IGRhdGFcbiAgICBjb25zdCByZXF1ZXN0RGF0YSA9IHtcbiAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICB9O1xuXG4gICAgLy8gQ2FsbCBGaXJlYmFzZSBmdW5jdGlvbiAoYXNzdW1pbmcgdGhpcyBjYWxscyBhIEZpcmViYXNlIEZ1bmN0aW9uIG9yIHNpbWlsYXIgYmFja2VuZClcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKEFQSV9VUkxTLkhBTkRMRV9TSUdOVVAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3REYXRhKSxcbiAgICB9KTtcblxuICAgIC8vIFBhcnNlIHJlc3BvbnNlXG4gICAgY29uc3QgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgLy8gQ2hlY2sgZm9yIGVycm9yIGluIHJlc3BvbnNlXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgLy8gSGFuZGxlIGtub3duIGVycm9yIGNhc2VzIGZyb20gYmFja2VuZFxuICAgICAgaWYgKHJlc3BvbnNlRGF0YS5lcnJvcikge1xuICAgICAgICAvLyBSZS10aHJvdyB0aGUgc3BlY2lmaWMgYmFja2VuZCBlcnJvciBtZXNzYWdlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZURhdGEuZXJyb3IpO1xuICAgICAgfVxuICAgICAgLy8gRmFsbGJhY2sgZm9yIHVuZXhwZWN0ZWQgc2VydmVyIGVycm9yc1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJldXIgZHUgc2VydmV1cjogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgLy8gU3VjY2VzcyBjYXNlXG4gICAgc2hvd1N0YXR1cyhcbiAgICAgIFwiSWRlbnRpZmlhbnRzIHZhbGlkZXMgISBWZXVpbGxleiB2w6lyaWZpZXIgdm90cmUgZW1haWwgcG91ciBjb25maXJtZXIgdm90cmUgaW5zY3JpcHRpb24uXCIsXG4gICAgICBcInN1Y2Nlc3NcIlxuICAgICk7XG5cbiAgICAvLyBPcHRpb25hbGx5IGhpZGUgZm9ybSBvciByZWRpcmVjdCBvbiBzdWNjZXNzXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWdudXBGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjsgLy8gS2VlcCB0aGlzIGlmIGRlc2lyZWRcblxuICAgIHJldHVybiByZXNwb25zZURhdGE7IC8vIFJldHVybiBkYXRhIGlmIG5lZWRlZCBieSBjYWxsZXJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBMb2cgYW5kIHJlLXRocm93IHRoZSBlcnJvciB0byBiZSBoYW5kbGVkIGJ5IHRoZSBjYWxsZXIgKGluIHRoZSBzdWJtaXQgbGlzdGVuZXIpXG4gICAgY29uc29sZS5lcnJvcihcIlNpZ251cCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgIHRocm93IGVycm9yOyAvLyBUaGUgc3VibWl0IGxpc3RlbmVyJ3MgY2F0Y2ggYmxvY2sgd2lsbCBoYW5kbGUgZGlzcGxheWluZyB0aGlzIGVycm9yXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0U2lnbnVwUGFnZSxcbiAgc2lnbnVwLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gc3JjL2VudHJpZXMvc2lnbnVwLmpzXG4vKipcbiAqIFNpZ251cCBFbnRyeSBQb2ludFxuICpcbiAqIFRoaXMgbW9kdWxlIHNlcnZlcyBhcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBzaWdudXAgcGFnZS5cbiAqL1xuXG4vLyBJbXBvcnQgb3VyIHNpZ251cCBtb2R1bGVcbmltcG9ydCB7IGluaXRTaWdudXBQYWdlIH0gZnJvbSBcIi4uL2F1dGgvc2lnbnVwLmpzXCI7XG5cbi8vIEluaXRpYWxpemUgc2lnbnVwIHBhZ2Ugd2hlbiBET00gaXMgbG9hZGVkXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIC8vIEluaXRpYWxpemUgc2lnbnVwIHBhZ2VcbiAgaW5pdFNpZ251cFBhZ2UoKTtcblxuICBjb25zb2xlLmxvZyhcIlNpZ251cCBwYWdlIGluaXRpYWxpemVkXCIpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=