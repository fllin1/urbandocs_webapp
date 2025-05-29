/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/auth/auth.js":
/*!*****************************!*\
  !*** ./src/js/auth/auth.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideLoading: () => (/* binding */ hideLoading),
/* harmony export */   showError: () => (/* binding */ showError),
/* harmony export */   showLoading: () => (/* binding */ showLoading),
/* harmony export */   showStatus: () => (/* binding */ showStatus)
/* harmony export */ });
/* unused harmony exports setCurrentUser, validateSession, getCurrentUser, getCurrentUserSync, logout, isLoggedIn, isLoggedInSync, protectPage, initAuth, hideElement, showElement */
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
 * @description Handles email confirmation with Supabase API
 * @version 0.1.1
 *
 * @changelog
 * - 0.1.1 (2025-05-17): Corrected success message and redirect to login page.
 * - 0.1.0 (2025-05-15): Converted to use direct Supabase API calls instead of Firebase Cloud Functions.
 * - 0.0.3 (2025-05-12): Updated terms of service modal and confirmation email.
 * - 0.0.2 (2025-05-10): Added terms of service and confirmation email.
 * - 0.0.1 (2025-05-08): Created the confirmation module with basic functionality.
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
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Erreur: URL de confirmation manquante.");
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
    confirmEmail(confirmationUrl);
  });
}

/**
 * Confirms the email address directly with Supabase using the confirmation URL
 * @param {string} confirmationUrl - Confirmation URL received by email
 */
async function confirmEmail(confirmationUrl) {
  const confirmButton = document.getElementById("confirmButton");
  const statusMessage = document.getElementById("statusMessage");
  const loading = document.getElementById("loading");
  const confirmSpinner = document.getElementById("confirmSpinner");
  const tosCheckbox = document.getElementById("tosCheckbox");

  // If the confirmation is successful, show a success message and redirect to the login page
  const redirectToLogin = () => {
    // Hide loading
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("confirmButton", "confirmSpinner");
    if (loading) loading.classList.add("d-none");

    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showStatus)(
      "Votre email a été vérifié! Redirection vers la page de connexion...",
      "success"
    );
    // Redirect to the login page after 2 seconds
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000); // 2 seconds delay
  };

  // Show loading indicator
  (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("confirmButton", "confirmSpinner");

  if (loading) loading.classList.remove("d-none");

  try {
    // Decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(confirmationUrl);

    console.log("Confirming email with URL:", decodedUrl);

    // Direct request to Supabase confirmation URL, but prevent fetch from automatically following the redirect.
    const response = await fetch(decodedUrl, { redirect: "manual" });

    // If response.type is 'opaqueredirect', it means Supabase is trying to redirect.
    // For Supabase email confirmation, a redirect implies the confirmation was successful
    // and it's trying to send the user to the redirect_to URL specified in the confirmation link.
    if (response.type === "opaqueredirect") {
      console.log(
        "Supabase confirmation successful, redirect indicated (opaqueredirect)."
      );
      redirectToLogin();
    } else if (response.ok) {
      // This case is less likely for Supabase confirmation which usually redirects,
      // but handle it if Supabase responds with 2xx without a redirect.
      console.log(
        "Supabase confirmation successful with a direct 2xx response."
      );
      redirectToLogin();
    } else {
      // If it's not an opaqueredirect and not response.ok, then it's an error from Supabase.
      console.log("Supabase confirmation failed with status:", response.status);
      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
        console.log("Error Response JSON:", responseData);
      } else {
        responseData = await response.text();
        console.log("Error Response text:", responseData);
      }

      let errorMessage = "La confirmation a échoué.";
      if (responseData && typeof responseData === "object") {
        if (responseData.error_description) {
          errorMessage = responseData.error_description;
        } else if (responseData.msg) {
          errorMessage = responseData.msg;
        } else if (responseData.error) {
          errorMessage = responseData.error;
        }
      } else if (
        responseData &&
        typeof responseData === "string" &&
        responseData.trim() !== ""
      ) {
        // If responseData is a non-empty string, use it.
        errorMessage = responseData;
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    // Handle errors from decodeURIComponent, network errors for fetch, or errors thrown above.
    console.error("Confirmation processing error:", error);
    if (error.stack) {
      console.error("Error stack:", error.stack);
    }

    // Hide loading
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("confirmButton", "confirmSpinner");
    if (loading) loading.classList.add("d-none");

    // Show error message
    // The error.message here will be from new Error(errorMessage) or other JS errors.
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showStatus)(
      `Une erreur est survenue durant la confirmation: ${error.message}`, // Standardized error prefix
      "danger"
    );
  }
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  initConfirmationPage,
  confirmEmail,
});


/***/ }),

/***/ "./src/js/entries/confirmation.js":
/*!****************************************!*\
  !*** ./src/js/entries/confirmation.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

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
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZXlzc2lwaWJrdG1iZmViaWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjUwOTQsImV4cCI6MjA1OTUwMTA5NH0.w71CAKfolktzRl-TmLVhHYaEbhCfVk4A7YraEUCglrU";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const client = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);

const supabase = client;


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
/******/ 			"confirmation": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_supabase_supabase-js_dist_module_index_js"], () => (__webpack_require__("./src/js/entries/confirmation.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDOztXQUVqQztXQUNBO1dBQ0E7V0FDQSxLQUFLO1dBQ0wsZUFBZTtXQUNmO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFckZBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2F1dGgvYXV0aC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2F1dGgvY29uZmlybWF0aW9uLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvZW50cmllcy9jb25maXJtYXRpb24uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9zdXBhYmFzZS1jbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvYXV0aC9hdXRoLmpzXG4vKipcbiAqIEF1dGhlbnRpY2F0aW9uIE1vZHVsZSAtIEJhc2VcbiAqIEBtb2R1bGUgYXV0aFxuICogQGRlc2NyaXB0aW9uIEJhc2UgbW9kdWxlIGZvciBhdXRoZW50aWNhdGlvbiB3aXRoIGNvbW1vbiBmdW5jdGlvbnMgYW5kIGNvbmZpZ3VyYXRpb25cbiAqIEB2ZXJzaW9uIDAuMC41XG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuNSAoMjAyNS0wNS0xNSk6IEFkZGVkIHNlc3Npb24gdmFsaWRhdGlvbiBhbmQgcHJvdGVjdGlvbiBhZ2FpbnN0IHN0YWxlIHNlc3Npb25zLlxuICogLSAwLjAuNCAoMjAyNS0wNS0xNSk6IFJlbW92YWwgb2YgRmlyZWJhc2UgQ2xvdWQgRnVuY3Rpb25zIGNvbnN0YW50cy5cbiAqIC0gMC4wLjMgKDIwMjUtMDUtMTMpOiBNb2RpZmllZCB0aGUgYXV0aGVudGljYXRpb24gc3RhdGUgbWFuYWdlbWVudCB0byB1c2UgU3VwYWJhc2UgQXV0aCBzeXN0ZW0uXG4gKiAtIDAuMC4yICgyMDI1LTA1LTEzKTogUmVvcmdhbml6YXRpb24gaW50byBzZXBhcmF0ZSBtb2R1bGVzXG4gKiAtIDAuMC4xICgyMDI1LTA1LTAzKTogSW5pdGlhbCBjcmVhdGlvblxuICovXG5cbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4uL3N1cGFiYXNlLWNsaWVudC5qc1wiO1xuXG4vLyBHbG9iYWwgYXV0aGVudGljYXRpb24gc3RhdGVcbmxldCBjdXJyZW50VXNlciA9IG51bGw7XG5sZXQgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdXNlclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXIgLSBVc2VyIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXIpIHtcbiAgY3VycmVudFVzZXIgPSB1c2VyO1xuICAvLyBQb3NzaWJsZSBzdG9yYWdlIGluIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxuICBpZiAodXNlcikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIGN1cnJlbnQgc2Vzc2lvbiBpcyBhY3RpdmUgd2l0aCBTdXBhYmFzZVxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFRydWUgaWYgc2Vzc2lvbiBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZVNlc3Npb24oKSB7XG4gIHRyeSB7XG4gICAgLy8gR2V0IGN1cnJlbnQgc2Vzc2lvbiBmcm9tIFN1cGFiYXNlXG4gICAgY29uc3Qge1xuICAgICAgZGF0YTogeyBzZXNzaW9uIH0sXG4gICAgICBlcnJvcjogc2Vzc2lvbkVycm9yLFxuICAgIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFNlc3Npb24oKTtcblxuICAgIC8vIE5vIHNlc3Npb24gb3IgZXJyb3IgcmV0cmlldmluZyBzZXNzaW9uXG4gICAgaWYgKHNlc3Npb25FcnJvciB8fCAhc2Vzc2lvbikge1xuICAgICAgY29uc29sZS5sb2coXCJObyB2YWxpZCBzZXNzaW9uIGZvdW5kXCIpO1xuICAgICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIHJlZnJlc2ggdGhlIHRva2VuIHRvIHZhbGlkYXRlIGl0IHdpdGggdGhlIHNlcnZlclxuICAgIGNvbnN0IHsgZXJyb3I6IHJlZnJlc2hFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5yZWZyZXNoU2Vzc2lvbigpO1xuXG4gICAgaWYgKHJlZnJlc2hFcnJvcikge1xuICAgICAgY29uc29sZS53YXJuKFwiU2Vzc2lvbiB2YWxpZGF0aW9uIGZhaWxlZDpcIiwgcmVmcmVzaEVycm9yKTtcbiAgICAgIC8vIEZvcmNlIGNsZWFyIHRoZSBpbnZhbGlkIHNlc3Npb25cbiAgICAgIGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbk91dCgpO1xuICAgICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gU2Vzc2lvbiBpcyB2YWxpZCwgdXBkYXRlIHRoZSBjdXJyZW50IHVzZXJcbiAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgIHNlc3Npb25WYWxpZGF0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcIlNlc3Npb24gdmFsaWRhdGlvbiBlcnJvcjpcIiwgZSk7XG4gICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY3VycmVudCB1c2VyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbGlkYXRlIC0gV2hldGhlciB0byB2YWxpZGF0ZSB0aGUgc2Vzc2lvbiB3aXRoIFN1cGFiYXNlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3R8bnVsbD59IFRoZSBjdXJyZW50IHVzZXIgb3IgbnVsbFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIodmFsaWRhdGUgPSB0cnVlKSB7XG4gIC8vIElmIHdlIG5lZWQgdG8gdmFsaWRhdGUgYW5kIGhhdmVuJ3QgZG9uZSBzbyB5ZXRcbiAgaWYgKHZhbGlkYXRlICYmICFzZXNzaW9uVmFsaWRhdGVkKSB7XG4gICAgYXdhaXQgdmFsaWRhdGVTZXNzaW9uKCk7XG4gIH1cblxuICAvLyBJZiBubyB2YWxpZGF0aW9uIG5lZWRlZCBvciBhbHJlYWR5IHZhbGlkYXRlZFxuICBpZiAoIXZhbGlkYXRlICYmICFjdXJyZW50VXNlcikge1xuICAgIC8vIFRyeSB0byByZXRyaWV2ZSBmcm9tIHN0b3JhZ2UgaWYgbm90IGluIG1lbW9yeVxuICAgIGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgIGlmIChzdG9yZWRVc2VyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjdXJyZW50VXNlciA9IEpTT04ucGFyc2Uoc3RvcmVkVXNlcik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciByZXRyaWV2aW5nIHVzZXI6XCIsIGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50VXNlcjtcbn1cblxuLyoqXG4gKiBTeW5jaHJvbm91cyB2ZXJzaW9uIG9mIGdldEN1cnJlbnRVc2VyIGZvciBub24tYXN5bmMgY29udGV4dHNcbiAqIFdBUk5JTkc6IFRoaXMgbWF5IHJldHVybiBzdGFsZSBkYXRhIGlmIHNlc3Npb24gaXMgaW52YWxpZFxuICogQHJldHVybnMge09iamVjdHxudWxsfSBUaGUgY3VycmVudCB1c2VyIG9yIG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyU3luYygpIHtcbiAgaWYgKCFjdXJyZW50VXNlcikge1xuICAgIGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgIGlmIChzdG9yZWRVc2VyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjdXJyZW50VXNlciA9IEpTT04ucGFyc2Uoc3RvcmVkVXNlcik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciByZXRyaWV2aW5nIHVzZXI6XCIsIGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50VXNlcjtcbn1cblxuLyoqXG4gKiBMb2dzIG91dCB0aGUgdXNlclxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gIHRyeSB7XG4gICAgLy8gU2lnbiBvdXQgZnJvbSBTdXBhYmFzZVxuICAgIGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbk91dCgpO1xuXG4gICAgLy8gQ2xlYXIgbG9jYWwgc3RhdGVcbiAgICBjdXJyZW50VXNlciA9IG51bGw7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG5cbiAgICAvLyBSZWRpcmVjdCB0byB0aGUgaG9tZSBwYWdlIGFmdGVyIGxvZ291dFxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGR1cmluZyBsb2dvdXQ6XCIsIGVycm9yKTtcbiAgICAvLyBTdGlsbCBjbGVhciBsb2NhbCBzdGF0ZSBldmVuIGlmIFN1cGFiYXNlIHNpZ25PdXQgZmFpbHNcbiAgICBjdXJyZW50VXNlciA9IG51bGw7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW4gd2l0aCB2YWxpZCBzZXNzaW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbGlkYXRlIC0gV2hldGhlciB0byB2YWxpZGF0ZSB3aXRoIFN1cGFiYXNlIGZpcnN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gVHJ1ZSBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW4gd2l0aCB2YWxpZCBzZXNzaW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc0xvZ2dlZEluKHZhbGlkYXRlID0gdHJ1ZSkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIodmFsaWRhdGUpO1xuICByZXR1cm4gdXNlciAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBTeW5jaHJvbm91cyB2ZXJzaW9uIG9mIGlzTG9nZ2VkSW5cbiAqIFdBUk5JTkc6IFRoaXMgbWF5IHJldHVybiBpbmNvcnJlY3QgcmVzdWx0cyBpZiBzZXNzaW9uIGlzIGludmFsaWRcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHVzZXIgYXBwZWFycyB0byBiZSBsb2dnZWQgaW4gbG9jYWxseVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dnZWRJblN5bmMoKSB7XG4gIHJldHVybiBnZXRDdXJyZW50VXNlclN5bmMoKSAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBQcm90ZWN0cyBhIHBhZ2UgdGhhdCByZXF1aXJlcyBhdXRoZW50aWNhdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IHJlZGlyZWN0VXJsIC0gVVJMIHRvIHJlZGlyZWN0IGlmIG5vdCBhdXRoZW50aWNhdGVkXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gVHJ1ZSBpZiBhdXRoZW50aWNhdGVkLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByb3RlY3RQYWdlKHJlZGlyZWN0VXJsID0gXCIvbG9naW5cIikge1xuICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgdmFsaWRhdGVTZXNzaW9uKCk7XG5cbiAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgLy8gUmVkaXJlY3QgdG8gbG9naW4gcGFnZVxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVcmw7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYXV0aCBvbiBwYWdlIGxvYWRcbiAqIENhbGwgdGhpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXIgYXBwIGluaXRpYWxpemF0aW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0QXV0aCgpIHtcbiAgLy8gVmFsaWRhdGUgc2Vzc2lvbiBvbiBwYWdlIGxvYWRcbiAgYXdhaXQgdmFsaWRhdGVTZXNzaW9uKCk7XG5cbiAgLy8gU2V0IHVwIGF1dGggc3RhdGUgY2hhbmdlIGxpc3RlbmVyXG4gIHN1cGFiYXNlLmF1dGgub25BdXRoU3RhdGVDaGFuZ2UoYXN5bmMgKGV2ZW50LCBzZXNzaW9uKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJBdXRoIHN0YXRlIGNoYW5nZWQ6XCIsIGV2ZW50KTtcblxuICAgIGlmIChldmVudCA9PT0gXCJTSUdORURfSU5cIiAmJiBzZXNzaW9uKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gXCJTSUdORURfT1VUXCIpIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKG51bGwpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IFwiVE9LRU5fUkVGUkVTSEVEXCIpIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIlVTRVJfVVBEQVRFRFwiKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhbiBlcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIEVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIGVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZSwgZWxlbWVudElkID0gXCJlcnJvck1lc3NhZ2VcIikge1xuICBjb25zdCBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZXJyb3JFbGVtZW50KSB7XG4gICAgZXJyb3JFbGVtZW50LmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGxheXMgYSBzdGF0dXMgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBNZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gTWVzc2FnZSB0eXBlIChzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBkYW5nZXIpXG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd1N0YXR1cyhcbiAgbWVzc2FnZSxcbiAgdHlwZSA9IFwiaW5mb1wiLFxuICBlbGVtZW50SWQgPSBcInN0YXR1c01lc3NhZ2VcIlxuKSB7XG4gIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoc3RhdHVzRWxlbWVudCkge1xuICAgIHN0YXR1c0VsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCBhbGVydC0qIGNsYXNzZXNcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcImFsZXJ0LVwiKSkge1xuICAgICAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgY2xhc3MgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZVxuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmFkZChgYWxlcnQtJHt0eXBlfWApO1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU3RhdHVzIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogSGlkZXMgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIGhpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gc2hvd1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93TG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn1cblxuLyoqXG4gKiBIaWRlcyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUxvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufVxuXG4vLyBFeHBvcnQgdGhlIG5lY2Vzc2FyeSBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlc1xuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRDdXJyZW50VXNlcixcbiAgZ2V0Q3VycmVudFVzZXJTeW5jLFxuICBzZXRDdXJyZW50VXNlcixcbiAgbG9nb3V0LFxuICBpc0xvZ2dlZEluLFxuICBpc0xvZ2dlZEluU3luYyxcbiAgdmFsaWRhdGVTZXNzaW9uLFxuICBwcm90ZWN0UGFnZSxcbiAgaW5pdEF1dGgsXG4gIHNob3dFcnJvcixcbiAgc2hvd1N0YXR1cyxcbiAgaGlkZUVsZW1lbnQsXG4gIHNob3dFbGVtZW50LFxuICBzaG93TG9hZGluZyxcbiAgaGlkZUxvYWRpbmcsXG59O1xuIiwiLy8gc3JjL2F1dGgvY29uZmlybWF0aW9uLmpzXG4vKipcbiAqIENvbmZpcm1hdGlvbiBNb2R1bGVcbiAqIEBtb2R1bGUgY29uZmlybWF0aW9uXG4gKiBAZGVzY3JpcHRpb24gSGFuZGxlcyBlbWFpbCBjb25maXJtYXRpb24gd2l0aCBTdXBhYmFzZSBBUElcbiAqIEB2ZXJzaW9uIDAuMS4xXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjEuMSAoMjAyNS0wNS0xNyk6IENvcnJlY3RlZCBzdWNjZXNzIG1lc3NhZ2UgYW5kIHJlZGlyZWN0IHRvIGxvZ2luIHBhZ2UuXG4gKiAtIDAuMS4wICgyMDI1LTA1LTE1KTogQ29udmVydGVkIHRvIHVzZSBkaXJlY3QgU3VwYWJhc2UgQVBJIGNhbGxzIGluc3RlYWQgb2YgRmlyZWJhc2UgQ2xvdWQgRnVuY3Rpb25zLlxuICogLSAwLjAuMyAoMjAyNS0wNS0xMik6IFVwZGF0ZWQgdGVybXMgb2Ygc2VydmljZSBtb2RhbCBhbmQgY29uZmlybWF0aW9uIGVtYWlsLlxuICogLSAwLjAuMiAoMjAyNS0wNS0xMCk6IEFkZGVkIHRlcm1zIG9mIHNlcnZpY2UgYW5kIGNvbmZpcm1hdGlvbiBlbWFpbC5cbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDgpOiBDcmVhdGVkIHRoZSBjb25maXJtYXRpb24gbW9kdWxlIHdpdGggYmFzaWMgZnVuY3Rpb25hbGl0eS5cbiAqL1xuXG5pbXBvcnQgeyBzaG93U3RhdHVzLCBzaG93RXJyb3IsIHNob3dMb2FkaW5nLCBoaWRlTG9hZGluZyB9IGZyb20gXCIuL2F1dGguanNcIjtcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgZW1haWwgY29uZmlybWF0aW9uIHBhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRDb25maXJtYXRpb25QYWdlKCkge1xuICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICBjb25zdCBjb25maXJtYXRpb25VcmwgPSB1cmxQYXJhbXMuZ2V0KFwiY29uZmlybWF0aW9uX3VybFwiKTtcblxuICBjb25zdCBjb25maXJtQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25maXJtQnV0dG9uXCIpO1xuICBjb25zdCBzdGF0dXNNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0dXNNZXNzYWdlXCIpO1xuICBjb25zdCB0b3NDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9zQ2hlY2tib3hcIik7XG4gIGNvbnN0IHRvc01vZGFsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9zTW9kYWxcIik7XG4gIGNvbnN0IHRvc01vZGFsQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9zTW9kYWxCb2R5XCIpO1xuXG4gIC8vIEV4aXQgZWFybHkgaWYgbm8gY29uZmlybWF0aW9uIFVSTCBpcyBwcmVzZW50XG4gIGlmICghY29uZmlybWF0aW9uVXJsKSB7XG4gICAgc2hvd0Vycm9yKFwiRXJyZXVyOiBVUkwgZGUgY29uZmlybWF0aW9uIG1hbnF1YW50ZS5cIik7XG4gICAgY29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRvc01vZGFsRWxlbWVudCkge1xuICAgIHRvc01vZGFsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic2hvdy5icy5tb2RhbFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodG9zTW9kYWxCb2R5LmRhdGFzZXQubG9hZGVkICE9PSBcInRydWVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvdGVybXNcIik7IC8vIFVzZSBjbGVhbiBVUkxcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBGYWlsZWQgdG8gbG9hZCBUZXJtcyBvZiBTZXJ2aWNlOiAke3Jlc3BvbnNlLnN0YXR1c31gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0b3NIdG1sID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgIHRvc01vZGFsQm9keS5pbm5lckhUTUwgPSB0b3NIdG1sO1xuICAgICAgICAgIHRvc01vZGFsQm9keS5kYXRhc2V0LmxvYWRlZCA9IFwidHJ1ZVwiOyAvLyBNYXJrIGFzIGxvYWRlZCB0byBwcmV2ZW50IG11bHRpcGxlIGZldGNoZXNcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdG9zTW9kYWxCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgLy8gQ2hlY2sgaWYgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbSAod2l0aCBhIHNtYWxsIHRvbGVyYW5jZSlcbiAgICAgIGlmIChcbiAgICAgICAgdG9zTW9kYWxCb2R5LnNjcm9sbEhlaWdodCAtIHRvc01vZGFsQm9keS5zY3JvbGxUb3AgPD1cbiAgICAgICAgdG9zTW9kYWxCb2R5LmNsaWVudEhlaWdodCArIDJcbiAgICAgICkge1xuICAgICAgICAvLyArMiBmb3IgdG9sZXJhbmNlXG4gICAgICAgIHRvc0NoZWNrYm94LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAodG9zQ2hlY2tib3gpIHtcbiAgICB0b3NDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGNvbmZpcm1CdXR0b24uZGlzYWJsZWQgPSAhdG9zQ2hlY2tib3guY2hlY2tlZDtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25maXJtRW1haWwoY29uZmlybWF0aW9uVXJsKTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29uZmlybXMgdGhlIGVtYWlsIGFkZHJlc3MgZGlyZWN0bHkgd2l0aCBTdXBhYmFzZSB1c2luZyB0aGUgY29uZmlybWF0aW9uIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpcm1hdGlvblVybCAtIENvbmZpcm1hdGlvbiBVUkwgcmVjZWl2ZWQgYnkgZW1haWxcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbmZpcm1FbWFpbChjb25maXJtYXRpb25VcmwpIHtcbiAgY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZmlybUJ1dHRvblwiKTtcbiAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcbiAgY29uc3QgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGluZ1wiKTtcbiAgY29uc3QgY29uZmlybVNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpcm1TcGlubmVyXCIpO1xuICBjb25zdCB0b3NDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9zQ2hlY2tib3hcIik7XG5cbiAgLy8gSWYgdGhlIGNvbmZpcm1hdGlvbiBpcyBzdWNjZXNzZnVsLCBzaG93IGEgc3VjY2VzcyBtZXNzYWdlIGFuZCByZWRpcmVjdCB0byB0aGUgbG9naW4gcGFnZVxuICBjb25zdCByZWRpcmVjdFRvTG9naW4gPSAoKSA9PiB7XG4gICAgLy8gSGlkZSBsb2FkaW5nXG4gICAgaGlkZUxvYWRpbmcoXCJjb25maXJtQnV0dG9uXCIsIFwiY29uZmlybVNwaW5uZXJcIik7XG4gICAgaWYgKGxvYWRpbmcpIGxvYWRpbmcuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcblxuICAgIHNob3dTdGF0dXMoXG4gICAgICBcIlZvdHJlIGVtYWlsIGEgw6l0w6kgdsOpcmlmacOpISBSZWRpcmVjdGlvbiB2ZXJzIGxhIHBhZ2UgZGUgY29ubmV4aW9uLi4uXCIsXG4gICAgICBcInN1Y2Nlc3NcIlxuICAgICk7XG4gICAgLy8gUmVkaXJlY3QgdG8gdGhlIGxvZ2luIHBhZ2UgYWZ0ZXIgMiBzZWNvbmRzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2xvZ2luXCI7XG4gICAgfSwgMjAwMCk7IC8vIDIgc2Vjb25kcyBkZWxheVxuICB9O1xuXG4gIC8vIFNob3cgbG9hZGluZyBpbmRpY2F0b3JcbiAgc2hvd0xvYWRpbmcoXCJjb25maXJtQnV0dG9uXCIsIFwiY29uZmlybVNwaW5uZXJcIik7XG5cbiAgaWYgKGxvYWRpbmcpIGxvYWRpbmcuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcblxuICB0cnkge1xuICAgIC8vIERlY29kZSB0aGUgVVJMIGlmIGl0J3MgZW5jb2RlZFxuICAgIGNvbnN0IGRlY29kZWRVcmwgPSBkZWNvZGVVUklDb21wb25lbnQoY29uZmlybWF0aW9uVXJsKTtcblxuICAgIGNvbnNvbGUubG9nKFwiQ29uZmlybWluZyBlbWFpbCB3aXRoIFVSTDpcIiwgZGVjb2RlZFVybCk7XG5cbiAgICAvLyBEaXJlY3QgcmVxdWVzdCB0byBTdXBhYmFzZSBjb25maXJtYXRpb24gVVJMLCBidXQgcHJldmVudCBmZXRjaCBmcm9tIGF1dG9tYXRpY2FsbHkgZm9sbG93aW5nIHRoZSByZWRpcmVjdC5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGRlY29kZWRVcmwsIHsgcmVkaXJlY3Q6IFwibWFudWFsXCIgfSk7XG5cbiAgICAvLyBJZiByZXNwb25zZS50eXBlIGlzICdvcGFxdWVyZWRpcmVjdCcsIGl0IG1lYW5zIFN1cGFiYXNlIGlzIHRyeWluZyB0byByZWRpcmVjdC5cbiAgICAvLyBGb3IgU3VwYWJhc2UgZW1haWwgY29uZmlybWF0aW9uLCBhIHJlZGlyZWN0IGltcGxpZXMgdGhlIGNvbmZpcm1hdGlvbiB3YXMgc3VjY2Vzc2Z1bFxuICAgIC8vIGFuZCBpdCdzIHRyeWluZyB0byBzZW5kIHRoZSB1c2VyIHRvIHRoZSByZWRpcmVjdF90byBVUkwgc3BlY2lmaWVkIGluIHRoZSBjb25maXJtYXRpb24gbGluay5cbiAgICBpZiAocmVzcG9uc2UudHlwZSA9PT0gXCJvcGFxdWVyZWRpcmVjdFwiKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJTdXBhYmFzZSBjb25maXJtYXRpb24gc3VjY2Vzc2Z1bCwgcmVkaXJlY3QgaW5kaWNhdGVkIChvcGFxdWVyZWRpcmVjdCkuXCJcbiAgICAgICk7XG4gICAgICByZWRpcmVjdFRvTG9naW4oKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAvLyBUaGlzIGNhc2UgaXMgbGVzcyBsaWtlbHkgZm9yIFN1cGFiYXNlIGNvbmZpcm1hdGlvbiB3aGljaCB1c3VhbGx5IHJlZGlyZWN0cyxcbiAgICAgIC8vIGJ1dCBoYW5kbGUgaXQgaWYgU3VwYWJhc2UgcmVzcG9uZHMgd2l0aCAyeHggd2l0aG91dCBhIHJlZGlyZWN0LlxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIFwiU3VwYWJhc2UgY29uZmlybWF0aW9uIHN1Y2Nlc3NmdWwgd2l0aCBhIGRpcmVjdCAyeHggcmVzcG9uc2UuXCJcbiAgICAgICk7XG4gICAgICByZWRpcmVjdFRvTG9naW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgaXQncyBub3QgYW4gb3BhcXVlcmVkaXJlY3QgYW5kIG5vdCByZXNwb25zZS5vaywgdGhlbiBpdCdzIGFuIGVycm9yIGZyb20gU3VwYWJhc2UuXG4gICAgICBjb25zb2xlLmxvZyhcIlN1cGFiYXNlIGNvbmZpcm1hdGlvbiBmYWlsZWQgd2l0aCBzdGF0dXM6XCIsIHJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICBsZXQgcmVzcG9uc2VEYXRhO1xuICAgICAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKTtcbiAgICAgIGlmIChjb250ZW50VHlwZSAmJiBjb250ZW50VHlwZS5pbmNsdWRlcyhcImFwcGxpY2F0aW9uL2pzb25cIikpIHtcbiAgICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIFJlc3BvbnNlIEpTT046XCIsIHJlc3BvbnNlRGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgUmVzcG9uc2UgdGV4dDpcIiwgcmVzcG9uc2VEYXRhKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IFwiTGEgY29uZmlybWF0aW9uIGEgw6ljaG91w6kuXCI7XG4gICAgICBpZiAocmVzcG9uc2VEYXRhICYmIHR5cGVvZiByZXNwb25zZURhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlRGF0YS5lcnJvcl9kZXNjcmlwdGlvbikge1xuICAgICAgICAgIGVycm9yTWVzc2FnZSA9IHJlc3BvbnNlRGF0YS5lcnJvcl9kZXNjcmlwdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZURhdGEubXNnKSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gcmVzcG9uc2VEYXRhLm1zZztcbiAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZURhdGEuZXJyb3IpIHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSByZXNwb25zZURhdGEuZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHJlc3BvbnNlRGF0YSAmJlxuICAgICAgICB0eXBlb2YgcmVzcG9uc2VEYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgIHJlc3BvbnNlRGF0YS50cmltKCkgIT09IFwiXCJcbiAgICAgICkge1xuICAgICAgICAvLyBJZiByZXNwb25zZURhdGEgaXMgYSBub24tZW1wdHkgc3RyaW5nLCB1c2UgaXQuXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IHJlc3BvbnNlRGF0YTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBIYW5kbGUgZXJyb3JzIGZyb20gZGVjb2RlVVJJQ29tcG9uZW50LCBuZXR3b3JrIGVycm9ycyBmb3IgZmV0Y2gsIG9yIGVycm9ycyB0aHJvd24gYWJvdmUuXG4gICAgY29uc29sZS5lcnJvcihcIkNvbmZpcm1hdGlvbiBwcm9jZXNzaW5nIGVycm9yOlwiLCBlcnJvcik7XG4gICAgaWYgKGVycm9yLnN0YWNrKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc3RhY2s6XCIsIGVycm9yLnN0YWNrKTtcbiAgICB9XG5cbiAgICAvLyBIaWRlIGxvYWRpbmdcbiAgICBoaWRlTG9hZGluZyhcImNvbmZpcm1CdXR0b25cIiwgXCJjb25maXJtU3Bpbm5lclwiKTtcbiAgICBpZiAobG9hZGluZykgbG9hZGluZy5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xuXG4gICAgLy8gU2hvdyBlcnJvciBtZXNzYWdlXG4gICAgLy8gVGhlIGVycm9yLm1lc3NhZ2UgaGVyZSB3aWxsIGJlIGZyb20gbmV3IEVycm9yKGVycm9yTWVzc2FnZSkgb3Igb3RoZXIgSlMgZXJyb3JzLlxuICAgIHNob3dTdGF0dXMoXG4gICAgICBgVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgZHVyYW50IGxhIGNvbmZpcm1hdGlvbjogJHtlcnJvci5tZXNzYWdlfWAsIC8vIFN0YW5kYXJkaXplZCBlcnJvciBwcmVmaXhcbiAgICAgIFwiZGFuZ2VyXCJcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdENvbmZpcm1hdGlvblBhZ2UsXG4gIGNvbmZpcm1FbWFpbCxcbn07XG4iLCIvLyBzcmMvZW50cmllcy9jb25maXJtYXRpb24uanNcbi8qKlxuICogQ29uZmlybWF0aW9uIEVudHJ5IFBvaW50XG4gKlxuICogVGhpcyBtb2R1bGUgc2VydmVzIGFzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIGVtYWlsIGNvbmZpcm1hdGlvbiBwYWdlLlxuICovXG5cbi8vIEltcG9ydCBvdXIgY29uZmlybWF0aW9uIG1vZHVsZVxuaW1wb3J0IHsgaW5pdENvbmZpcm1hdGlvblBhZ2UgfSBmcm9tIFwiLi4vYXV0aC9jb25maXJtYXRpb24uanNcIjtcblxuLy8gSW5pdGlhbGl6ZSBjb25maXJtYXRpb24gcGFnZSB3aGVuIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgLy8gSW5pdGlhbGl6ZSBjb25maXJtYXRpb24gcGFnZVxuICBpbml0Q29uZmlybWF0aW9uUGFnZSgpO1xuXG4gIGNvbnNvbGUubG9nKFwiQ29uZmlybWF0aW9uIHBhZ2UgaW5pdGlhbGl6ZWRcIik7XG59KTtcbiIsIi8vIHNyYy9qcy9zdXBhYmFzZS1jbGllbnQuanNcbi8qKlxuICogU3VwYWJhc2UgQ2xpZW50XG4gKiBAbW9kdWxlIHN1cGFiYXNlLWNsaWVudFxuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIFN1cGFiYXNlIGNsaWVudCBpbml0aWFsaXphdGlvbiBhbmQgY29uZmlndXJhdGlvbi5cbiAqIEB2ZXJzaW9uIDAuMC4yXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjIgKDIwMjUtMDUtMjcpOiBBZGRlZCBlbnZpcm9uZW1lbnQgdmFyaWFibGVzIGVycm9yIGhhbmRsaW5nIGZvciBtaXNzaW5nLlxuICogLSAwLjAuMSAoMjAyNS0wNS0wOSk6IEluaXRpYWwgdmVyc2lvbiB3aXRoIGJhc2ljIFN1cGFiYXNlIGNsaWVudCBpbml0aWFsaXphdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XG5cbmNvbnN0IHN1cGFiYXNlVXJsID0gXCJodHRwczovL29mZXlzc2lwaWJrdG1iZmViaWJvLnN1cGFiYXNlLmNvXCI7XG5jb25zdCBzdXBhYmFzZUFub25LZXkgPVxuICBcImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSnpkWEJoWW1GelpTSXNJbkpsWmlJNkltOW1aWGx6YzJsd2FXSnJkRzFpWm1WaWFXSnZJaXdpY205c1pTSTZJbUZ1YjI0aUxDSnBZWFFpT2pFM05ETTVNalV3T1RRc0ltVjRjQ0k2TWpBMU9UVXdNVEE1TkgwLnc3MUNBS2ZvbGt0elJsLVRtTFZoSFlhRWJoQ2ZWazRBN1lyYUVVQ2dsclVcIjtcblxuaWYgKCFzdXBhYmFzZVVybCB8fCAhc3VwYWJhc2VBbm9uS2V5KSB7XG4gIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzXCIpO1xufVxuXG5jb25zdCBjbGllbnQgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSk7XG5cbmV4cG9ydCBjb25zdCBzdXBhYmFzZSA9IGNsaWVudDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcImpzL1wiICsgY2h1bmtJZCArIFwiLmJ1bmRsZS5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJ1cmJhbmRvY3Nfd2ViYXBwOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0NSSVBUJylcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC9eYmxvYjovLCBcIlwiKS5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmwgKyBcIi4uL1wiOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbmZpcm1hdGlvblwiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgPyBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gOiB1bmRlZmluZWQ7XG5cdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG5cdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gKGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdKSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YVsxXShlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCwgXCJjaHVuay1cIiArIGNodW5rSWQsIGNodW5rSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rdXJiYW5kb2NzX3dlYmFwcFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt1cmJhbmRvY3Nfd2ViYXBwXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19zdXBhYmFzZV9zdXBhYmFzZS1qc19kaXN0X21vZHVsZV9pbmRleF9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9lbnRyaWVzL2NvbmZpcm1hdGlvbi5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9