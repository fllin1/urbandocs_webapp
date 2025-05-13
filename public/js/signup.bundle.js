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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsOENBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsZ0JBQWdCO0FBQzVEOztBQUVBO0FBQ0EsSUFBSSxvREFBVTtBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtFQUFrRTs7QUFFbEUseUJBQXlCO0FBQ3pCLElBQUk7QUFDSjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUEsc0VBQWU7QUFDZjtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7O1VDaktGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ21EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQSxFQUFFLCtEQUFjOztBQUVoQjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2F1dGgvYXV0aC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2F1dGgvc2lnbnVwLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvZW50cmllcy9zaWdudXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2F1dGgvYXV0aC5qc1xuLyoqXG4gKiBBdXRoZW50aWNhdGlvbiBNb2R1bGUgLSBCYXNlXG4gKiBAbW9kdWxlIGF1dGhcbiAqIEBkZXNjcmlwdGlvbiBCYXNlIG1vZHVsZSBmb3IgYXV0aGVudGljYXRpb24gd2l0aCBjb21tb24gZnVuY3Rpb25zIGFuZCBjb25maWd1cmF0aW9uXG4gKiBAdmVyc2lvbiAwLjAuM1xuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjMgKDIwMjUtMDUtMTMpOiBNb2RpZmllZCB0aGUgYXV0aGVudGljYXRpb24gc3RhdGUgbWFuYWdlbWVudCB0byB1c2UgU3VwYWJhc2UgQXV0aCBzeXN0ZW0uXG4gKiAtIDAuMC4yICgyMDI1LTA1LTEzKTogUmVvcmdhbml6YXRpb24gaW50byBzZXBhcmF0ZSBtb2R1bGVzXG4gKiAtIDAuMC4xICgyMDI1LTA1LTAzKTogSW5pdGlhbCBjcmVhdGlvblxuICovXG5cbi8vIC0tLSBBUEkgVVJMIERlZmluaXRpb25zIC0tLVxuZXhwb3J0IGNvbnN0IElTX0xPQ0FMID1cbiAgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09IFwiMTI3LjAuMC4xXCI7XG5cbmV4cG9ydCBjb25zdCBBUElfVVJMUyA9IHtcbiAgSEFORExFX0NPTkZJUk1BVElPTjogSVNfTE9DQUxcbiAgICA/IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAxL3VyYmFuZG9jcy91cy1jZW50cmFsMS9oYW5kbGVfY29uZmlybWF0aW9uXCJcbiAgICA6IFwiaHR0cHM6Ly9oYW5kbGUtY29uZmlybWF0aW9uLXVwM2szaGRkdHEtdWMuYS5ydW4uYXBwXCIsXG5cbiAgSEFORExFX1NJR05VUDogSVNfTE9DQUxcbiAgICA/IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAxL3VyYmFuZG9jcy91cy1jZW50cmFsMS9oYW5kbGVfc2lnbnVwXCJcbiAgICA6IFwiaHR0cHM6Ly9oYW5kbGUtc2lnbnVwLXVwM2szaGRkdHEtdWMuYS5ydW4uYXBwXCIsXG5cbiAgSEFORExFX0xPR0lOOiBJU19MT0NBTFxuICAgID8gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDEvdXJiYW5kb2NzL3VzLWNlbnRyYWwxL2hhbmRsZV9sb2dpblwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLWxvZ2luLXVwM2szaGRkdHEtdWMuYS5ydW4uYXBwXCIsXG59O1xuXG4vLyBHbG9iYWwgYXV0aGVudGljYXRpb24gc3RhdGVcbmxldCBjdXJyZW50VXNlciA9IG51bGw7XG5cbi8qKlxuICogU2V0cyB0aGUgY3VycmVudCB1c2VyXG4gKiBAcGFyYW0ge09iamVjdH0gdXNlciAtIFVzZXIgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFVzZXIodXNlcikge1xuICBjdXJyZW50VXNlciA9IHVzZXI7XG4gIC8vIFBvc3NpYmxlIHN0b3JhZ2UgaW4gbG9jYWxTdG9yYWdlL3Nlc3Npb25TdG9yYWdlXG4gIGlmICh1c2VyKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY3VycmVudCB1c2VyXG4gKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9IFRoZSBjdXJyZW50IHVzZXIgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKSB7XG4gIC8vIElmIG5vIHVzZXIgaW4gbWVtb3J5LCB0cnkgdG8gcmV0cmlldmUgaXQgZnJvbSBzdG9yYWdlXG4gIGlmICghY3VycmVudFVzZXIpIHtcbiAgICBjb25zdCBzdG9yZWRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICBpZiAoc3RvcmVkVXNlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHN0b3JlZFVzZXIpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmV0cmlldmluZyB1c2VyOlwiLCBlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY3VycmVudFVzZXI7XG59XG5cbi8qKlxuICogTG9ncyBvdXQgdGhlIHVzZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgY3VycmVudFVzZXIgPSBudWxsO1xuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAvLyBSZWRpcmVjdCB0byB0aGUgaG9tZSBwYWdlIGFmdGVyIGxvZ291dFxuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2luZGV4XCI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuICByZXR1cm4gZ2V0Q3VycmVudFVzZXIoKSAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhbiBlcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIEVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIGVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZSwgZWxlbWVudElkID0gXCJlcnJvck1lc3NhZ2VcIikge1xuICBjb25zdCBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZXJyb3JFbGVtZW50KSB7XG4gICAgZXJyb3JFbGVtZW50LmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGxheXMgYSBzdGF0dXMgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBNZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gTWVzc2FnZSB0eXBlIChzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBkYW5nZXIpXG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd1N0YXR1cyhcbiAgbWVzc2FnZSxcbiAgdHlwZSA9IFwiaW5mb1wiLFxuICBlbGVtZW50SWQgPSBcInN0YXR1c01lc3NhZ2VcIlxuKSB7XG4gIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoc3RhdHVzRWxlbWVudCkge1xuICAgIHN0YXR1c0VsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCBhbGVydC0qIGNsYXNzZXNcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcImFsZXJ0LVwiKSkge1xuICAgICAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgY2xhc3MgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZVxuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmFkZChgYWxlcnQtJHt0eXBlfWApO1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU3RhdHVzIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogSGlkZXMgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIGhpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gc2hvd1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93TG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn1cblxuLyoqXG4gKiBIaWRlcyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUxvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufVxuXG4vLyBFeHBvcnQgdGhlIG5lY2Vzc2FyeSBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlc1xuZXhwb3J0IGRlZmF1bHQge1xuICBBUElfVVJMUyxcbiAgSVNfTE9DQUwsXG4gIGdldEN1cnJlbnRVc2VyLFxuICBzZXRDdXJyZW50VXNlcixcbiAgbG9nb3V0LFxuICBpc0xvZ2dlZEluLFxuICBzaG93RXJyb3IsXG4gIHNob3dTdGF0dXMsXG4gIGhpZGVFbGVtZW50LFxuICBzaG93RWxlbWVudCxcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufTtcbiIsIi8vIHNyYy9hdXRoL3NpZ251cC5qc1xuLyoqXG4gKiBTaWdudXAgTW9kdWxlXG4gKiBAbW9kdWxlIHNpZ251cFxuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdXNlciByZWdpc3RyYXRpb24gd2l0aCBjbGllbnQtc2lkZSB2YWxpZGF0aW9uXG4gKiBAdmVyc2lvbiAwLjAuM1xuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjMgKDIwMjUtMDUtMTMpOiBFbnN1cmUgc3RhdHVzIG1lc3NhZ2UgaXMgYWxzbyBoaWRkZW4gb24gbmV3IHN1Ym1pdC5cbiAqIC0gMC4wLjIgKDIwMjUtMDUtMTApOiBBZGRlZCByb2J1c3QgY2xpZW50LXNpZGUgZW1haWwgZm9ybWF0IGFuZCBwYXNzd29yZCBjb21wbGV4aXR5IHZhbGlkYXRpb24uXG4gKiAtIDAuMC4xICgyMDI1LTA1LTA4KTogQ3JlYXRlZCB0aGUgc2lnbnVwIG1vZHVsZSB3aXRoIGJhc2ljIGZ1bmN0aW9uYWxpdHkuXG4gKi9cblxuaW1wb3J0IHtcbiAgQVBJX1VSTFMsXG4gIHNob3dFcnJvcixcbiAgc2hvd1N0YXR1cyxcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufSBmcm9tIFwiLi9hdXRoLmpzXCI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIHNpZ251cCBwYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0U2lnbnVwUGFnZSgpIHtcbiAgY29uc3Qgc2lnbnVwRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbnVwRm9ybVwiKTtcbiAgY29uc3QgZXJyb3JNZXNzYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvck1lc3NhZ2VcIik7IC8vIFJlbmFtZWQgZm9yIGNsYXJpdHlcbiAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcblxuICBpZiAoc2lnbnVwRm9ybSkge1xuICAgIHNpZ251cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAvLyBSZXNldCBtZXNzYWdlc1xuICAgICAgaWYgKGVycm9yTWVzc2FnZURpdikge1xuICAgICAgICBlcnJvck1lc3NhZ2VEaXYuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlRGl2LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdHVzTWVzc2FnZSkge1xuICAgICAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIHN0YXR1c01lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgZm9ybSB2YWx1ZXNcbiAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKS52YWx1ZS50cmltKCk7IC8vIFRyaW0gd2hpdGVzcGFjZSBmcm9tIGVtYWlsXG4gICAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIikudmFsdWU7XG4gICAgICBjb25zdCBjb25maXJtUGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpcm1QYXNzd29yZFwiKS52YWx1ZTtcblxuICAgICAgbGV0IHZhbGlkYXRpb25FcnJvcnMgPSBbXTsgLy8gQXJyYXkgdG8gY29sbGVjdCBhbGwgdmFsaWRhdGlvbiBlcnJvcnNcblxuICAgICAgLy8gLS0tIENsaWVudC1zaWRlIFZhbGlkYXRpb24gLS0tXG5cbiAgICAgIC8vIDEuIEVtYWlsIEZvcm1hdCBWYWxpZGF0aW9uXG4gICAgICBjb25zdCBlbWFpbFBhdHRlcm4gPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLzsgLy8gU2ltcGxlIHJlZ2V4IGZvciBlbWFpbCBmb3JtYXRcbiAgICAgIGlmICghZW1haWxQYXR0ZXJuLnRlc3QoZW1haWwpKSB7XG4gICAgICAgIHZhbGlkYXRpb25FcnJvcnMucHVzaChcIkwnYWRyZXNzZSBlbWFpbCBuJ2VzdCBwYXMgdmFsaWRlLlwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gMi4gQ2hlY2sgaWYgcGFzc3dvcmRzIG1hdGNoXG4gICAgICBpZiAocGFzc3dvcmQgIT09IGNvbmZpcm1QYXNzd29yZCkge1xuICAgICAgICB2YWxpZGF0aW9uRXJyb3JzLnB1c2goXCJMZXMgbW90cyBkZSBwYXNzZSBuZSBjb3JyZXNwb25kZW50IHBhcy5cIik7XG4gICAgICB9XG5cbiAgICAgIC8vIDMuIFBhc3N3b3JkIFN0cmVuZ3RoIFZhbGlkYXRpb25cbiAgICAgIGNvbnN0IHBhc3N3b3JkQ29tcGxleGl0eVBhdHRlcm4gPSAvXig/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKlxcZCkuKyQvO1xuICAgICAgaWYgKCFwYXNzd29yZENvbXBsZXhpdHlQYXR0ZXJuLnRlc3QocGFzc3dvcmQpIHx8IHBhc3N3b3JkLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKFwiTGUgZm9ybWF0IGR1IG1vdCBkZSBwYXNzZSBlc3QgaW52YWxpZGUuXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyAtLS0gSGFuZGxlIFZhbGlkYXRpb24gUmVzdWx0cyAtLS1cblxuICAgICAgaWYgKHZhbGlkYXRpb25FcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBOT1RFOiBUaGUgXFxuIGlzIG5vdCB3b3JraW5nIGFzIGV4cGVjdGVkXG4gICAgICAgIGNvbnN0IGVycm9yVGV4dCA9IHZhbGlkYXRpb25FcnJvcnMuam9pbihcIjxicj5cIik7XG4gICAgICAgIHNob3dFcnJvcihlcnJvclRleHQpO1xuICAgICAgICByZXR1cm47IC8vIFN0b3AgdGhlIHByb2Nlc3MgaWYgdmFsaWRhdGlvbiBmYWlsc1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB2YWxpZGF0aW9uIHBhc3NlcywgcHJvY2VlZCB3aXRoIHRoZSBvcmlnaW5hbCBsb2dpY1xuXG4gICAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgIHNob3dMb2FkaW5nKFwic2lnbnVwQnRuXCIsIFwic2lnbnVwU3Bpbm5lclwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ2FsbCBzaWdudXAgZnVuY3Rpb25cbiAgICAgICAgYXdhaXQgc2lnbnVwKGVtYWlsLCBwYXNzd29yZCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU2lnbnVwIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIC8vIHNob3dFcnJvciBleHBlY3RzIGEgc3RyaW5nLCBleHRyYWN0IG1lc3NhZ2Ugb3IgcHJvdmlkZSBhIGRlZmF1bHRcbiAgICAgICAgc2hvd0Vycm9yKFxuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgXCJVbmUgZXJyZXVyIGVzdCBzdXJ2ZW51ZSBsb3JzIGRlIGwnaW5zY3JpcHRpb24uXCJcbiAgICAgICAgKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIC8vIFJlc2V0IGJ1dHRvbiBzdGF0ZVxuICAgICAgICBoaWRlTG9hZGluZyhcInNpZ251cEJ0blwiLCBcInNpZ251cFNwaW5uZXJcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIFwiQ1JJVElDQUw6IFNpZ251cCBmb3JtIHdpdGggSUQgJ3NpZ251cEZvcm0nIG5vdCBmb3VuZC4gRXZlbnQgbGlzdGVuZXIgbm90IGF0dGFjaGVkLlwiXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlZ2lzdGVycyBhIHVzZXIgd2l0aCBlbWFpbCBhbmQgcGFzc3dvcmRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbCAtIFVzZXIncyBlbWFpbFxuICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIC0gVXNlcidzIHBhc3N3b3JkXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBQcm9taXNlIHJlc29sdmVkIG9uIHN1Y2Nlc3NcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNpZ251cChlbWFpbCwgcGFzc3dvcmQpIHtcbiAgdHJ5IHtcbiAgICAvLyBDcmVhdGUgcmVxdWVzdCBkYXRhXG4gICAgY29uc3QgcmVxdWVzdERhdGEgPSB7XG4gICAgICBlbWFpbDogZW1haWwsXG4gICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgfTtcblxuICAgIC8vIENhbGwgRmlyZWJhc2UgZnVuY3Rpb24gKGFzc3VtaW5nIHRoaXMgY2FsbHMgYSBGaXJlYmFzZSBGdW5jdGlvbiBvciBzaW1pbGFyIGJhY2tlbmQpXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChBUElfVVJMUy5IQU5ETEVfU0lHTlVQLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0RGF0YSksXG4gICAgfSk7XG5cbiAgICAvLyBQYXJzZSByZXNwb25zZVxuICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIC8vIENoZWNrIGZvciBlcnJvciBpbiByZXNwb25zZVxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIC8vIEhhbmRsZSBrbm93biBlcnJvciBjYXNlcyBmcm9tIGJhY2tlbmRcbiAgICAgIGlmIChyZXNwb25zZURhdGEuZXJyb3IpIHtcbiAgICAgICAgLy8gUmUtdGhyb3cgdGhlIHNwZWNpZmljIGJhY2tlbmQgZXJyb3IgbWVzc2FnZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2VEYXRhLmVycm9yKTtcbiAgICAgIH1cbiAgICAgIC8vIEZhbGxiYWNrIGZvciB1bmV4cGVjdGVkIHNlcnZlciBlcnJvcnNcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyZXVyIGR1IHNlcnZldXI6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIC8vIFN1Y2Nlc3MgY2FzZVxuICAgIHNob3dTdGF0dXMoXG4gICAgICBcIklkZW50aWZpYW50cyB2YWxpZGVzICEgVmV1aWxsZXogdsOpcmlmaWVyIHZvdHJlIGVtYWlsIHBvdXIgY29uZmlybWVyIHZvdHJlIGluc2NyaXB0aW9uLlwiLFxuICAgICAgXCJzdWNjZXNzXCJcbiAgICApO1xuXG4gICAgLy8gT3B0aW9uYWxseSBoaWRlIGZvcm0gb3IgcmVkaXJlY3Qgb24gc3VjY2Vzc1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbnVwRm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7IC8vIEtlZXAgdGhpcyBpZiBkZXNpcmVkXG5cbiAgICByZXR1cm4gcmVzcG9uc2VEYXRhOyAvLyBSZXR1cm4gZGF0YSBpZiBuZWVkZWQgYnkgY2FsbGVyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gTG9nIGFuZCByZS10aHJvdyB0aGUgZXJyb3IgdG8gYmUgaGFuZGxlZCBieSB0aGUgY2FsbGVyIChpbiB0aGUgc3VibWl0IGxpc3RlbmVyKVxuICAgIGNvbnNvbGUuZXJyb3IoXCJTaWdudXAgZXJyb3I6XCIsIGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjsgLy8gVGhlIHN1Ym1pdCBsaXN0ZW5lcidzIGNhdGNoIGJsb2NrIHdpbGwgaGFuZGxlIGRpc3BsYXlpbmcgdGhpcyBlcnJvclxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdFNpZ251cFBhZ2UsXG4gIHNpZ251cCxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIHNyYy9lbnRyaWVzL3NpZ251cC5qc1xuLyoqXG4gKiBTaWdudXAgRW50cnkgUG9pbnRcbiAqXG4gKiBUaGlzIG1vZHVsZSBzZXJ2ZXMgYXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgc2lnbnVwIHBhZ2UuXG4gKi9cblxuLy8gSW1wb3J0IG91ciBzaWdudXAgbW9kdWxlXG5pbXBvcnQgeyBpbml0U2lnbnVwUGFnZSB9IGZyb20gXCIuLi9hdXRoL3NpZ251cC5qc1wiO1xuXG4vLyBJbml0aWFsaXplIHNpZ251cCBwYWdlIHdoZW4gRE9NIGlzIGxvYWRlZFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAvLyBJbml0aWFsaXplIHNpZ251cCBwYWdlXG4gIGluaXRTaWdudXBQYWdlKCk7XG5cbiAgY29uc29sZS5sb2coXCJTaWdudXAgcGFnZSBpbml0aWFsaXplZFwiKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9