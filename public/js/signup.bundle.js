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
 * @version 0.0.3
 *
 * @changelog
 * - 0.0.3 (2025-05-13): Ensure status message is also hidden on new submit.
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
      if (errorMessageDiv) {
        errorMessageDiv.classList.add("hidden");
        errorMessageDiv.innerHTML = "";
      }
      if (statusMessage) {
        statusMessage.classList.add("hidden");
        statusMessage.textContent = "";
      }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsOENBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsZ0JBQWdCO0FBQzVEOztBQUVBO0FBQ0EsSUFBSSxvREFBVTtBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtFQUFrRTs7QUFFbEUseUJBQXlCO0FBQ3pCLElBQUk7QUFDSjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUEsc0VBQWU7QUFDZjtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7O1VDaktGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ21EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQSxFQUFFLCtEQUFjOztBQUVoQjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2F1dGgvYXV0aC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2F1dGgvc2lnbnVwLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvZW50cmllcy9zaWdudXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2F1dGgvYXV0aC5qc1xuLyoqXG4gKiBBdXRoZW50aWNhdGlvbiBNb2R1bGUgLSBCYXNlXG4gKiBAbW9kdWxlIGF1dGhcbiAqIEBkZXNjcmlwdGlvbiBCYXNlIG1vZHVsZSBmb3IgYXV0aGVudGljYXRpb24gd2l0aCBjb21tb24gZnVuY3Rpb25zIGFuZCBjb25maWd1cmF0aW9uXG4gKiBAdmVyc2lvbiAwLjAuM1xuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjMgKDIwMjUtMDUtMTMpOiBNb2RpZmllZCB0aGUgYXV0aGVudGljYXRpb24gc3RhdGUgbWFuYWdlbWVudCB0byB1c2UgU3VwYWJhc2UgQXV0aCBzeXN0ZW0uXG4gKiAtIDAuMC4yICgyMDI1LTA1LTEzKTogUmVvcmdhbml6YXRpb24gaW50byBzZXBhcmF0ZSBtb2R1bGVzXG4gKiAtIDAuMC4xICgyMDI1LTA1LTAzKTogSW5pdGlhbCBjcmVhdGlvblxuICovXG5cbi8vIC0tLSBBUEkgVVJMIERlZmluaXRpb25zIC0tLVxuZXhwb3J0IGNvbnN0IElTX0xPQ0FMID1cbiAgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCI7XG5cbmV4cG9ydCBjb25zdCBBUElfVVJMUyA9IHtcbiAgSEFORExFX0NPTkZJUk1BVElPTjogSVNfTE9DQUxcbiAgICA/IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAxL3VyYmFuZG9jcy91cy1jZW50cmFsMS9oYW5kbGVfY29uZmlybWF0aW9uXCJcbiAgICA6IFwiaHR0cHM6Ly9oYW5kbGUtY29uZmlybWF0aW9uLXVwM2szaGRkdHEtdWMuYS5ydW4uYXBwXCIsXG5cbiAgSEFORExFX1NJR05VUDogSVNfTE9DQUxcbiAgICA/IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAxL3VyYmFuZG9jcy91cy1jZW50cmFsMS9oYW5kbGVfc2lnbnVwXCJcbiAgICA6IFwiaHR0cHM6Ly9oYW5kbGUtc2lnbnVwLXVwM2szaGRkdHEtdWMuYS5ydW4uYXBwXCIsXG5cbiAgSEFORExFX0xPR0lOOiBJU19MT0NBTFxuICAgID8gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDEvdXJiYW5kb2NzL3VzLWNlbnRyYWwxL2hhbmRsZV9sb2dpblwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLWxvZ2luLXVwM2szaGRkdHEtdWMuYS5ydW4uYXBwXCIsXG59O1xuXG4vLyBHbG9iYWwgYXV0aGVudGljYXRpb24gc3RhdGVcbmxldCBjdXJyZW50VXNlciA9IG51bGw7XG5cbi8qKlxuICogU2V0cyB0aGUgY3VycmVudCB1c2VyXG4gKiBAcGFyYW0ge09iamVjdH0gdXNlciAtIFVzZXIgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFVzZXIodXNlcikge1xuICBjdXJyZW50VXNlciA9IHVzZXI7XG4gIC8vIFBvc3NpYmxlIHN0b3JhZ2UgaW4gbG9jYWxTdG9yYWdlL3Nlc3Npb25TdG9yYWdlXG4gIGlmICh1c2VyKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY3VycmVudCB1c2VyXG4gKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9IFRoZSBjdXJyZW50IHVzZXIgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKSB7XG4gIC8vIElmIG5vIHVzZXIgaW4gbWVtb3J5LCB0cnkgdG8gcmV0cmlldmUgaXQgZnJvbSBzdG9yYWdlXG4gIGlmICghY3VycmVudFVzZXIpIHtcbiAgICBjb25zdCBzdG9yZWRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICBpZiAoc3RvcmVkVXNlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHN0b3JlZFVzZXIpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmV0cmlldmluZyB1c2VyOlwiLCBlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY3VycmVudFVzZXI7XG59XG5cbi8qKlxuICogTG9ncyBvdXQgdGhlIHVzZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgY3VycmVudFVzZXIgPSBudWxsO1xuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAvLyBSZWRpcmVjdCB0byB0aGUgaG9tZSBwYWdlIGFmdGVyIGxvZ291dFxuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dnZWRJbigpIHtcbiAgcmV0dXJuIGdldEN1cnJlbnRVc2VyKCkgIT09IG51bGw7XG59XG5cbi8qKlxuICogRGlzcGxheXMgYW4gZXJyb3IgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBFcnJvciBtZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB3aGVyZSB0byBkaXNwbGF5IHRoZSBlcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1lc3NhZ2UsIGVsZW1lbnRJZCA9IFwiZXJyb3JNZXNzYWdlXCIpIHtcbiAgY29uc3QgZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVycm9yRWxlbWVudCkge1xuICAgIGVycm9yRWxlbWVudC5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBlbGVtZW50IG5vdCBmb3VuZDpcIiwgZWxlbWVudElkKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BsYXlzIGEgc3RhdHVzIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gTWVzc2FnZSB0byBkaXNwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIE1lc3NhZ2UgdHlwZSAoc3VjY2VzcywgaW5mbywgd2FybmluZywgZGFuZ2VyKVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dTdGF0dXMoXG4gIG1lc3NhZ2UsXG4gIHR5cGUgPSBcImluZm9cIixcbiAgZWxlbWVudElkID0gXCJzdGF0dXNNZXNzYWdlXCJcbikge1xuICBjb25zdCBzdGF0dXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKHN0YXR1c0VsZW1lbnQpIHtcbiAgICBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcblxuICAgIC8vIFJlbW92ZSBhbGwgYWxlcnQtKiBjbGFzc2VzXG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB7XG4gICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJhbGVydC1cIikpIHtcbiAgICAgICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgdGhlIGNsYXNzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGVcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGFsZXJ0LSR7dHlwZX1gKTtcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIlN0YXR1cyBlbGVtZW50IG5vdCBmb3VuZDpcIiwgZWxlbWVudElkKTtcbiAgfVxufVxuXG4vKipcbiAqIEhpZGVzIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB0byBoaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50SWQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbi8qKlxuICogU2hvd3MgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIHNob3dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0xvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIGlmIChzcGlubmVyKSBzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG59XG5cbi8qKlxuICogSGlkZXMgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWQgLSBJRCBvZiB0aGUgYnV0dG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3Bpbm5lcklkIC0gSUQgb2YgdGhlIHNwaW5uZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVMb2FkaW5nKGJ1dHRvbklkLCBzcGlubmVySWQpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3Bpbm5lcklkKTtcblxuICBpZiAoYnV0dG9uKSBidXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn1cblxuLy8gRXhwb3J0IHRoZSBuZWNlc3NhcnkgZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXNcbmV4cG9ydCBkZWZhdWx0IHtcbiAgQVBJX1VSTFMsXG4gIElTX0xPQ0FMLFxuICBnZXRDdXJyZW50VXNlcixcbiAgc2V0Q3VycmVudFVzZXIsXG4gIGxvZ291dCxcbiAgaXNMb2dnZWRJbixcbiAgc2hvd0Vycm9yLFxuICBzaG93U3RhdHVzLFxuICBoaWRlRWxlbWVudCxcbiAgc2hvd0VsZW1lbnQsXG4gIHNob3dMb2FkaW5nLFxuICBoaWRlTG9hZGluZyxcbn07XG4iLCIvLyBzcmMvYXV0aC9zaWdudXAuanNcbi8qKlxuICogU2lnbnVwIE1vZHVsZVxuICogQG1vZHVsZSBzaWdudXBcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHVzZXIgcmVnaXN0cmF0aW9uIHdpdGggY2xpZW50LXNpZGUgdmFsaWRhdGlvblxuICogQHZlcnNpb24gMC4wLjNcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4zICgyMDI1LTA1LTEzKTogRW5zdXJlIHN0YXR1cyBtZXNzYWdlIGlzIGFsc28gaGlkZGVuIG9uIG5ldyBzdWJtaXQuXG4gKiAtIDAuMC4yICgyMDI1LTA1LTEwKTogQWRkZWQgcm9idXN0IGNsaWVudC1zaWRlIGVtYWlsIGZvcm1hdCBhbmQgcGFzc3dvcmQgY29tcGxleGl0eSB2YWxpZGF0aW9uLlxuICogLSAwLjAuMSAoMjAyNS0wNS0wOCk6IENyZWF0ZWQgdGhlIHNpZ251cCBtb2R1bGUgd2l0aCBiYXNpYyBmdW5jdGlvbmFsaXR5LlxuICovXG5cbmltcG9ydCB7XG4gIEFQSV9VUkxTLFxuICBzaG93RXJyb3IsXG4gIHNob3dTdGF0dXMsXG4gIHNob3dMb2FkaW5nLFxuICBoaWRlTG9hZGluZyxcbn0gZnJvbSBcIi4vYXV0aC5qc1wiO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBzaWdudXAgcGFnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNpZ251cFBhZ2UoKSB7XG4gIGNvbnN0IHNpZ251cEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ251cEZvcm1cIik7XG4gIGNvbnN0IGVycm9yTWVzc2FnZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3JNZXNzYWdlXCIpOyAvLyBSZW5hbWVkIGZvciBjbGFyaXR5XG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c01lc3NhZ2VcIik7XG5cbiAgaWYgKHNpZ251cEZvcm0pIHtcbiAgICBzaWdudXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gUmVzZXQgbWVzc2FnZXNcbiAgICAgIGlmIChlcnJvck1lc3NhZ2VEaXYpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlRGl2LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIGVycm9yTWVzc2FnZURpdi5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXR1c01lc3NhZ2UpIHtcbiAgICAgICAgc3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IGZvcm0gdmFsdWVzXG4gICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWUudHJpbSgpOyAvLyBUcmltIHdoaXRlc3BhY2UgZnJvbSBlbWFpbFxuICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuICAgICAgY29uc3QgY29uZmlybVBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25maXJtUGFzc3dvcmRcIikudmFsdWU7XG5cbiAgICAgIGxldCB2YWxpZGF0aW9uRXJyb3JzID0gW107IC8vIEFycmF5IHRvIGNvbGxlY3QgYWxsIHZhbGlkYXRpb24gZXJyb3JzXG5cbiAgICAgIC8vIC0tLSBDbGllbnQtc2lkZSBWYWxpZGF0aW9uIC0tLVxuXG4gICAgICAvLyAxLiBFbWFpbCBGb3JtYXQgVmFsaWRhdGlvblxuICAgICAgY29uc3QgZW1haWxQYXR0ZXJuID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87IC8vIFNpbXBsZSByZWdleCBmb3IgZW1haWwgZm9ybWF0XG4gICAgICBpZiAoIWVtYWlsUGF0dGVybi50ZXN0KGVtYWlsKSkge1xuICAgICAgICB2YWxpZGF0aW9uRXJyb3JzLnB1c2goXCJMJ2FkcmVzc2UgZW1haWwgbidlc3QgcGFzIHZhbGlkZS5cIik7XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIENoZWNrIGlmIHBhc3N3b3JkcyBtYXRjaFxuICAgICAgaWYgKHBhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpIHtcbiAgICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKFwiTGVzIG1vdHMgZGUgcGFzc2UgbmUgY29ycmVzcG9uZGVudCBwYXMuXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyAzLiBQYXNzd29yZCBTdHJlbmd0aCBWYWxpZGF0aW9uXG4gICAgICBjb25zdCBwYXNzd29yZENvbXBsZXhpdHlQYXR0ZXJuID0gL14oPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipcXGQpLiskLztcbiAgICAgIGlmICghcGFzc3dvcmRDb21wbGV4aXR5UGF0dGVybi50ZXN0KHBhc3N3b3JkKSB8fCBwYXNzd29yZC5sZW5ndGggPCA4KSB7XG4gICAgICAgIHZhbGlkYXRpb25FcnJvcnMucHVzaChcIkxlIGZvcm1hdCBkdSBtb3QgZGUgcGFzc2UgZXN0IGludmFsaWRlLlwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gLS0tIEhhbmRsZSBWYWxpZGF0aW9uIFJlc3VsdHMgLS0tXG5cbiAgICAgIGlmICh2YWxpZGF0aW9uRXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gTk9URTogVGhlIFxcbiBpcyBub3Qgd29ya2luZyBhcyBleHBlY3RlZFxuICAgICAgICBjb25zdCBlcnJvclRleHQgPSB2YWxpZGF0aW9uRXJyb3JzLmpvaW4oXCI8YnI+XCIpO1xuICAgICAgICBzaG93RXJyb3IoZXJyb3JUZXh0KTtcbiAgICAgICAgcmV0dXJuOyAvLyBTdG9wIHRoZSBwcm9jZXNzIGlmIHZhbGlkYXRpb24gZmFpbHNcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdmFsaWRhdGlvbiBwYXNzZXMsIHByb2NlZWQgd2l0aCB0aGUgb3JpZ2luYWwgbG9naWNcblxuICAgICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgICBzaG93TG9hZGluZyhcInNpZ251cEJ0blwiLCBcInNpZ251cFNwaW5uZXJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIENhbGwgc2lnbnVwIGZ1bmN0aW9uXG4gICAgICAgIGF3YWl0IHNpZ251cChlbWFpbCwgcGFzc3dvcmQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNpZ251cCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICAvLyBzaG93RXJyb3IgZXhwZWN0cyBhIHN0cmluZywgZXh0cmFjdCBtZXNzYWdlIG9yIHByb3ZpZGUgYSBkZWZhdWx0XG4gICAgICAgIHNob3dFcnJvcihcbiAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IFwiVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsJ2luc2NyaXB0aW9uLlwiXG4gICAgICAgICk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICAvLyBSZXNldCBidXR0b24gc3RhdGVcbiAgICAgICAgaGlkZUxvYWRpbmcoXCJzaWdudXBCdG5cIiwgXCJzaWdudXBTcGlubmVyXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBcIkNSSVRJQ0FMOiBTaWdudXAgZm9ybSB3aXRoIElEICdzaWdudXBGb3JtJyBub3QgZm91bmQuIEV2ZW50IGxpc3RlbmVyIG5vdCBhdHRhY2hlZC5cIlxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZWdpc3RlcnMgYSB1c2VyIHdpdGggZW1haWwgYW5kIHBhc3N3b3JkXG4gKiBAcGFyYW0ge3N0cmluZ30gZW1haWwgLSBVc2VyJ3MgZW1haWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCAtIFVzZXIncyBwYXNzd29yZFxuICogQHJldHVybnMge1Byb21pc2V9IC0gUHJvbWlzZSByZXNvbHZlZCBvbiBzdWNjZXNzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaWdudXAoZW1haWwsIHBhc3N3b3JkKSB7XG4gIHRyeSB7XG4gICAgLy8gQ3JlYXRlIHJlcXVlc3QgZGF0YVxuICAgIGNvbnN0IHJlcXVlc3REYXRhID0ge1xuICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgIH07XG5cbiAgICAvLyBDYWxsIEZpcmViYXNlIGZ1bmN0aW9uIChhc3N1bWluZyB0aGlzIGNhbGxzIGEgRmlyZWJhc2UgRnVuY3Rpb24gb3Igc2ltaWxhciBiYWNrZW5kKVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goQVBJX1VSTFMuSEFORExFX1NJR05VUCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdERhdGEpLFxuICAgIH0pO1xuXG4gICAgLy8gUGFyc2UgcmVzcG9uc2VcbiAgICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAvLyBDaGVjayBmb3IgZXJyb3IgaW4gcmVzcG9uc2VcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAvLyBIYW5kbGUga25vd24gZXJyb3IgY2FzZXMgZnJvbSBiYWNrZW5kXG4gICAgICBpZiAocmVzcG9uc2VEYXRhLmVycm9yKSB7XG4gICAgICAgIC8vIFJlLXRocm93IHRoZSBzcGVjaWZpYyBiYWNrZW5kIGVycm9yIG1lc3NhZ2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlRGF0YS5lcnJvcik7XG4gICAgICB9XG4gICAgICAvLyBGYWxsYmFjayBmb3IgdW5leHBlY3RlZCBzZXJ2ZXIgZXJyb3JzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycmV1ciBkdSBzZXJ2ZXVyOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICAvLyBTdWNjZXNzIGNhc2VcbiAgICBzaG93U3RhdHVzKFxuICAgICAgXCJJZGVudGlmaWFudHMgdmFsaWRlcyAhIFZldWlsbGV6IHbDqXJpZmllciB2b3RyZSBlbWFpbCBwb3VyIGNvbmZpcm1lciB2b3RyZSBpbnNjcmlwdGlvbi5cIixcbiAgICAgIFwic3VjY2Vzc1wiXG4gICAgKTtcblxuICAgIC8vIE9wdGlvbmFsbHkgaGlkZSBmb3JtIG9yIHJlZGlyZWN0IG9uIHN1Y2Nlc3NcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ251cEZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyAvLyBLZWVwIHRoaXMgaWYgZGVzaXJlZFxuXG4gICAgcmV0dXJuIHJlc3BvbnNlRGF0YTsgLy8gUmV0dXJuIGRhdGEgaWYgbmVlZGVkIGJ5IGNhbGxlclxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIExvZyBhbmQgcmUtdGhyb3cgdGhlIGVycm9yIHRvIGJlIGhhbmRsZWQgYnkgdGhlIGNhbGxlciAoaW4gdGhlIHN1Ym1pdCBsaXN0ZW5lcilcbiAgICBjb25zb2xlLmVycm9yKFwiU2lnbnVwIGVycm9yOlwiLCBlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7IC8vIFRoZSBzdWJtaXQgbGlzdGVuZXIncyBjYXRjaCBibG9jayB3aWxsIGhhbmRsZSBkaXNwbGF5aW5nIHRoaXMgZXJyb3JcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRTaWdudXBQYWdlLFxuICBzaWdudXAsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBzcmMvZW50cmllcy9zaWdudXAuanNcbi8qKlxuICogU2lnbnVwIEVudHJ5IFBvaW50XG4gKlxuICogVGhpcyBtb2R1bGUgc2VydmVzIGFzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIHNpZ251cCBwYWdlLlxuICovXG5cbi8vIEltcG9ydCBvdXIgc2lnbnVwIG1vZHVsZVxuaW1wb3J0IHsgaW5pdFNpZ251cFBhZ2UgfSBmcm9tIFwiLi4vYXV0aC9zaWdudXAuanNcIjtcblxuLy8gSW5pdGlhbGl6ZSBzaWdudXAgcGFnZSB3aGVuIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgLy8gSW5pdGlhbGl6ZSBzaWdudXAgcGFnZVxuICBpbml0U2lnbnVwUGFnZSgpO1xuXG4gIGNvbnNvbGUubG9nKFwiU2lnbnVwIHBhZ2UgaW5pdGlhbGl6ZWRcIik7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==