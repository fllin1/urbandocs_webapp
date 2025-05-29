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

/***/ "./src/js/auth/forgotten-password.js":
/*!*******************************************!*\
  !*** ./src/js/auth/forgotten-password.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initForgotPasswordPage: () => (/* binding */ initForgotPasswordPage)
/* harmony export */ });
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../supabase-client.js */ "./src/js/supabase-client.js");
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth/auth.js");
// src/js/auth/forgotten-password.js
/**
 * Forgotten Password Module
 * @module forgottenPassword
 * @description Handles forgotten password functionality
 * @version 0.0.1
 *
 * @changelog
 * - 0.0.1 (2025-05-14): Creation of the forgotten password module with basic functionality.
 */




let turnstileToken = null;

// Initialize Turnstile
window.onloadTurnstileResetCallback = function () {
  turnstile.render("#turnstile-reset-container", {
    sitekey: "0x4AAAAAABdzY3InOU2_In99",
    callback: function (token) {
      turnstileToken = token;
    },
  });
};

function initForgotPasswordPage() {
  const resetForm = document.getElementById("resetForm");
  const errorMessage = document.getElementById("errorMessage");
  const statusMessage = document.getElementById("statusMessage");

  if (resetForm) {
    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset messages
      if (errorMessage) {
        errorMessage.classList.add("hidden");
        errorMessage.textContent = "";
      }
      if (statusMessage) {
        statusMessage.classList.add("hidden");
        statusMessage.textContent = "";
      }

      const email = document.getElementById("email").value.trim();

      // Basic validation
      if (!email) {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.showError)("Veuillez entrer votre adresse email.");
        return;
      }

      // Check if Turnstile token exists
      if (!turnstileToken) {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.showError)("Veuillez compléter la vérification Turnstile.");
        return;
      }

      // Show loading state
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.showLoading)("resetBtn", "resetSpinner");

      try {
        const { error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/update-password`,
          captchaToken: turnstileToken,
        });

        if (error) throw error;

        // Show success message
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)(
          "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.",
          "success"
        );

        // Hide the form
        resetForm.classList.add("hidden");
      } catch (error) {
        console.error("Password reset error:", error);
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.showError)("Une erreur est survenue. Veuillez réessayer plus tard.");
        // Reset Turnstile on error
        turnstile.reset();
        turnstileToken = null;
      } finally {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.hideLoading)("resetBtn", "resetSpinner");
      }
    });
  }
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  initForgotPasswordPage,
});


/***/ }),

/***/ "./src/js/entries/forgotten-password.js":
/*!**********************************************!*\
  !*** ./src/js/entries/forgotten-password.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _auth_forgotten_password_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/forgotten-password.js */ "./src/js/auth/forgotten-password.js");


document.addEventListener("DOMContentLoaded", () => {
  (0,_auth_forgotten_password_js__WEBPACK_IMPORTED_MODULE_0__.initForgotPasswordPage)();
  console.log("Forgot password page initialized");
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
/******/ 			"forgottenPassword": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_supabase_supabase-js_dist_module_index_js"], () => (__webpack_require__("./src/js/entries/forgotten-password.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxtRUFBbUUsaUNBQWlDO1dBQ3BHO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ3pDQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUM7O1dBRWpDO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTCxlQUFlO1dBQ2Y7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVyRkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9hdXRoLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9mb3Jnb3R0ZW4tcGFzc3dvcmQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9lbnRyaWVzL2ZvcmdvdHRlbi1wYXNzd29yZC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3N1cGFiYXNlLWNsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9hdXRoL2F1dGguanNcbi8qKlxuICogQXV0aGVudGljYXRpb24gTW9kdWxlIC0gQmFzZVxuICogQG1vZHVsZSBhdXRoXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBtb2R1bGUgZm9yIGF1dGhlbnRpY2F0aW9uIHdpdGggY29tbW9uIGZ1bmN0aW9ucyBhbmQgY29uZmlndXJhdGlvblxuICogQHZlcnNpb24gMC4wLjVcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC41ICgyMDI1LTA1LTE1KTogQWRkZWQgc2Vzc2lvbiB2YWxpZGF0aW9uIGFuZCBwcm90ZWN0aW9uIGFnYWluc3Qgc3RhbGUgc2Vzc2lvbnMuXG4gKiAtIDAuMC40ICgyMDI1LTA1LTE1KTogUmVtb3ZhbCBvZiBGaXJlYmFzZSBDbG91ZCBGdW5jdGlvbnMgY29uc3RhbnRzLlxuICogLSAwLjAuMyAoMjAyNS0wNS0xMyk6IE1vZGlmaWVkIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0ZSBtYW5hZ2VtZW50IHRvIHVzZSBTdXBhYmFzZSBBdXRoIHN5c3RlbS5cbiAqIC0gMC4wLjIgKDIwMjUtMDUtMTMpOiBSZW9yZ2FuaXphdGlvbiBpbnRvIHNlcGFyYXRlIG1vZHVsZXNcbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDMpOiBJbml0aWFsIGNyZWF0aW9uXG4gKi9cblxuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiLi4vc3VwYWJhc2UtY2xpZW50LmpzXCI7XG5cbi8vIEdsb2JhbCBhdXRoZW50aWNhdGlvbiBzdGF0ZVxubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcbmxldCBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG5cbi8qKlxuICogU2V0cyB0aGUgY3VycmVudCB1c2VyXG4gKiBAcGFyYW0ge09iamVjdH0gdXNlciAtIFVzZXIgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFVzZXIodXNlcikge1xuICBjdXJyZW50VXNlciA9IHVzZXI7XG4gIC8vIFBvc3NpYmxlIHN0b3JhZ2UgaW4gbG9jYWxTdG9yYWdlL3Nlc3Npb25TdG9yYWdlXG4gIGlmICh1c2VyKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyBpZiB0aGUgY3VycmVudCBzZXNzaW9uIGlzIGFjdGl2ZSB3aXRoIFN1cGFiYXNlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gVHJ1ZSBpZiBzZXNzaW9uIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2Vzc2lvbigpIHtcbiAgdHJ5IHtcbiAgICAvLyBHZXQgY3VycmVudCBzZXNzaW9uIGZyb20gU3VwYWJhc2VcbiAgICBjb25zdCB7XG4gICAgICBkYXRhOiB7IHNlc3Npb24gfSxcbiAgICAgIGVycm9yOiBzZXNzaW9uRXJyb3IsXG4gICAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0U2Vzc2lvbigpO1xuXG4gICAgLy8gTm8gc2Vzc2lvbiBvciBlcnJvciByZXRyaWV2aW5nIHNlc3Npb25cbiAgICBpZiAoc2Vzc2lvbkVycm9yIHx8ICFzZXNzaW9uKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHZhbGlkIHNlc3Npb24gZm91bmRcIik7XG4gICAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBUcnkgdG8gcmVmcmVzaCB0aGUgdG9rZW4gdG8gdmFsaWRhdGUgaXQgd2l0aCB0aGUgc2VydmVyXG4gICAgY29uc3QgeyBlcnJvcjogcmVmcmVzaEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnJlZnJlc2hTZXNzaW9uKCk7XG5cbiAgICBpZiAocmVmcmVzaEVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJTZXNzaW9uIHZhbGlkYXRpb24gZmFpbGVkOlwiLCByZWZyZXNoRXJyb3IpO1xuICAgICAgLy8gRm9yY2UgY2xlYXIgdGhlIGludmFsaWQgc2Vzc2lvblxuICAgICAgYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduT3V0KCk7XG4gICAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBTZXNzaW9uIGlzIHZhbGlkLCB1cGRhdGUgdGhlIGN1cnJlbnQgdXNlclxuICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU2Vzc2lvbiB2YWxpZGF0aW9uIGVycm9yOlwiLCBlKTtcbiAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHVzZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsaWRhdGUgLSBXaGV0aGVyIHRvIHZhbGlkYXRlIHRoZSBzZXNzaW9uIHdpdGggU3VwYWJhc2VcbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdHxudWxsPn0gVGhlIGN1cnJlbnQgdXNlciBvciBudWxsXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcih2YWxpZGF0ZSA9IHRydWUpIHtcbiAgLy8gSWYgd2UgbmVlZCB0byB2YWxpZGF0ZSBhbmQgaGF2ZW4ndCBkb25lIHNvIHlldFxuICBpZiAodmFsaWRhdGUgJiYgIXNlc3Npb25WYWxpZGF0ZWQpIHtcbiAgICBhd2FpdCB2YWxpZGF0ZVNlc3Npb24oKTtcbiAgfVxuXG4gIC8vIElmIG5vIHZhbGlkYXRpb24gbmVlZGVkIG9yIGFscmVhZHkgdmFsaWRhdGVkXG4gIGlmICghdmFsaWRhdGUgJiYgIWN1cnJlbnRVc2VyKSB7XG4gICAgLy8gVHJ5IHRvIHJldHJpZXZlIGZyb20gc3RvcmFnZSBpZiBub3QgaW4gbWVtb3J5XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzIHZlcnNpb24gb2YgZ2V0Q3VycmVudFVzZXIgZm9yIG5vbi1hc3luYyBjb250ZXh0c1xuICogV0FSTklORzogVGhpcyBtYXkgcmV0dXJuIHN0YWxlIGRhdGEgaWYgc2Vzc2lvbiBpcyBpbnZhbGlkXG4gKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9IFRoZSBjdXJyZW50IHVzZXIgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXJTeW5jKCkge1xuICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIExvZ3Mgb3V0IHRoZSB1c2VyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgdHJ5IHtcbiAgICAvLyBTaWduIG91dCBmcm9tIFN1cGFiYXNlXG4gICAgYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduT3V0KCk7XG5cbiAgICAvLyBDbGVhciBsb2NhbCBzdGF0ZVxuICAgIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcblxuICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBob21lIHBhZ2UgYWZ0ZXIgbG9nb3V0XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZHVyaW5nIGxvZ291dDpcIiwgZXJyb3IpO1xuICAgIC8vIFN0aWxsIGNsZWFyIGxvY2FsIHN0YXRlIGV2ZW4gaWYgU3VwYWJhc2Ugc2lnbk91dCBmYWlsc1xuICAgIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpbiB3aXRoIHZhbGlkIHNlc3Npb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsaWRhdGUgLSBXaGV0aGVyIHRvIHZhbGlkYXRlIHdpdGggU3VwYWJhc2UgZmlyc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBUcnVlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpbiB3aXRoIHZhbGlkIHNlc3Npb25cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzTG9nZ2VkSW4odmFsaWRhdGUgPSB0cnVlKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcih2YWxpZGF0ZSk7XG4gIHJldHVybiB1c2VyICE9PSBudWxsO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzIHZlcnNpb24gb2YgaXNMb2dnZWRJblxuICogV0FSTklORzogVGhpcyBtYXkgcmV0dXJuIGluY29ycmVjdCByZXN1bHRzIGlmIHNlc3Npb24gaXMgaW52YWxpZFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdXNlciBhcHBlYXJzIHRvIGJlIGxvZ2dlZCBpbiBsb2NhbGx5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xvZ2dlZEluU3luYygpIHtcbiAgcmV0dXJuIGdldEN1cnJlbnRVc2VyU3luYygpICE9PSBudWxsO1xufVxuXG4vKipcbiAqIFByb3RlY3RzIGEgcGFnZSB0aGF0IHJlcXVpcmVzIGF1dGhlbnRpY2F0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVkaXJlY3RVcmwgLSBVUkwgdG8gcmVkaXJlY3QgaWYgbm90IGF1dGhlbnRpY2F0ZWRcbiAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBUcnVlIGlmIGF1dGhlbnRpY2F0ZWQsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJvdGVjdFBhZ2UocmVkaXJlY3RVcmwgPSBcIi9sb2dpblwiKSB7XG4gIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCB2YWxpZGF0ZVNlc3Npb24oKTtcblxuICBpZiAoIWlzVmFsaWQpIHtcbiAgICAvLyBSZWRpcmVjdCB0byBsb2dpbiBwYWdlXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVybDtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhdXRoIG9uIHBhZ2UgbG9hZFxuICogQ2FsbCB0aGlzIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91ciBhcHAgaW5pdGlhbGl6YXRpb25cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRBdXRoKCkge1xuICAvLyBWYWxpZGF0ZSBzZXNzaW9uIG9uIHBhZ2UgbG9hZFxuICBhd2FpdCB2YWxpZGF0ZVNlc3Npb24oKTtcblxuICAvLyBTZXQgdXAgYXV0aCBzdGF0ZSBjaGFuZ2UgbGlzdGVuZXJcbiAgc3VwYWJhc2UuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZShhc3luYyAoZXZlbnQsIHNlc3Npb24pID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkF1dGggc3RhdGUgY2hhbmdlZDpcIiwgZXZlbnQpO1xuXG4gICAgaWYgKGV2ZW50ID09PSBcIlNJR05FRF9JTlwiICYmIHNlc3Npb24pIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIlNJR05FRF9PVVRcIikge1xuICAgICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gXCJUT0tFTl9SRUZSRVNIRURcIikge1xuICAgICAgc2V0Q3VycmVudFVzZXIoc2Vzc2lvbi51c2VyKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IFwiVVNFUl9VUERBVEVEXCIpIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIERpc3BsYXlzIGFuIGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gRXJyb3IgbWVzc2FnZSB0byBkaXNwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtZXNzYWdlLCBlbGVtZW50SWQgPSBcImVycm9yTWVzc2FnZVwiKSB7XG4gIGNvbnN0IGVycm9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlcnJvckVsZW1lbnQpIHtcbiAgICBlcnJvckVsZW1lbnQuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZWxlbWVudCBub3QgZm91bmQ6XCIsIGVsZW1lbnRJZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhIHN0YXR1cyBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIE1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBNZXNzYWdlIHR5cGUgKHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGRhbmdlcilcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB3aGVyZSB0byBkaXNwbGF5IHRoZSBtZXNzYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93U3RhdHVzKFxuICBtZXNzYWdlLFxuICB0eXBlID0gXCJpbmZvXCIsXG4gIGVsZW1lbnRJZCA9IFwic3RhdHVzTWVzc2FnZVwiXG4pIHtcbiAgY29uc3Qgc3RhdHVzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChzdGF0dXNFbGVtZW50KSB7XG4gICAgc3RhdHVzRWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cbiAgICAvLyBSZW1vdmUgYWxsIGFsZXJ0LSogY2xhc3Nlc1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwiYWxlcnQtXCIpKSB7XG4gICAgICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWRkIHRoZSBjbGFzcyBjb3JyZXNwb25kaW5nIHRvIHRoZSB0eXBlXG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBhbGVydC0ke3R5cGV9YCk7XG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJTdGF0dXMgZWxlbWVudCBub3QgZm91bmQ6XCIsIGVsZW1lbnRJZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBIaWRlcyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gaGlkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUVsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB0byBzaG93XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50SWQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbi8qKlxuICogU2hvd3MgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWQgLSBJRCBvZiB0aGUgYnV0dG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3Bpbm5lcklkIC0gSUQgb2YgdGhlIHNwaW5uZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dMb2FkaW5nKGJ1dHRvbklkLCBzcGlubmVySWQpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3Bpbm5lcklkKTtcblxuICBpZiAoYnV0dG9uKSBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufVxuXG4vKipcbiAqIEhpZGVzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlTG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gIGlmIChzcGlubmVyKSBzcGlubmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59XG5cbi8vIEV4cG9ydCB0aGUgbmVjZXNzYXJ5IGZ1bmN0aW9ucyBhbmQgdmFyaWFibGVzXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldEN1cnJlbnRVc2VyLFxuICBnZXRDdXJyZW50VXNlclN5bmMsXG4gIHNldEN1cnJlbnRVc2VyLFxuICBsb2dvdXQsXG4gIGlzTG9nZ2VkSW4sXG4gIGlzTG9nZ2VkSW5TeW5jLFxuICB2YWxpZGF0ZVNlc3Npb24sXG4gIHByb3RlY3RQYWdlLFxuICBpbml0QXV0aCxcbiAgc2hvd0Vycm9yLFxuICBzaG93U3RhdHVzLFxuICBoaWRlRWxlbWVudCxcbiAgc2hvd0VsZW1lbnQsXG4gIHNob3dMb2FkaW5nLFxuICBoaWRlTG9hZGluZyxcbn07XG4iLCIvLyBzcmMvanMvYXV0aC9mb3Jnb3R0ZW4tcGFzc3dvcmQuanNcbi8qKlxuICogRm9yZ290dGVuIFBhc3N3b3JkIE1vZHVsZVxuICogQG1vZHVsZSBmb3Jnb3R0ZW5QYXNzd29yZFxuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgZm9yZ290dGVuIHBhc3N3b3JkIGZ1bmN0aW9uYWxpdHlcbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuMSAoMjAyNS0wNS0xNCk6IENyZWF0aW9uIG9mIHRoZSBmb3Jnb3R0ZW4gcGFzc3dvcmQgbW9kdWxlIHdpdGggYmFzaWMgZnVuY3Rpb25hbGl0eS5cbiAqL1xuXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCIuLi9zdXBhYmFzZS1jbGllbnQuanNcIjtcbmltcG9ydCB7IHNob3dFcnJvciwgc2hvd1N0YXR1cywgc2hvd0xvYWRpbmcsIGhpZGVMb2FkaW5nIH0gZnJvbSBcIi4vYXV0aC5qc1wiO1xuXG5sZXQgdHVybnN0aWxlVG9rZW4gPSBudWxsO1xuXG4vLyBJbml0aWFsaXplIFR1cm5zdGlsZVxud2luZG93Lm9ubG9hZFR1cm5zdGlsZVJlc2V0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gIHR1cm5zdGlsZS5yZW5kZXIoXCIjdHVybnN0aWxlLXJlc2V0LWNvbnRhaW5lclwiLCB7XG4gICAgc2l0ZWtleTogXCIweDRBQUFBQUFCZHpZM0luT1UyX0luOTlcIixcbiAgICBjYWxsYmFjazogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICB0dXJuc3RpbGVUb2tlbiA9IHRva2VuO1xuICAgIH0sXG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRGb3Jnb3RQYXNzd29yZFBhZ2UoKSB7XG4gIGNvbnN0IHJlc2V0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXRGb3JtXCIpO1xuICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yTWVzc2FnZVwiKTtcbiAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcblxuICBpZiAocmVzZXRGb3JtKSB7XG4gICAgcmVzZXRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gUmVzZXQgbWVzc2FnZXNcbiAgICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdHVzTWVzc2FnZSkge1xuICAgICAgICBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIHN0YXR1c01lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWUudHJpbSgpO1xuXG4gICAgICAvLyBCYXNpYyB2YWxpZGF0aW9uXG4gICAgICBpZiAoIWVtYWlsKSB7XG4gICAgICAgIHNob3dFcnJvcihcIlZldWlsbGV6IGVudHJlciB2b3RyZSBhZHJlc3NlIGVtYWlsLlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBpZiBUdXJuc3RpbGUgdG9rZW4gZXhpc3RzXG4gICAgICBpZiAoIXR1cm5zdGlsZVRva2VuKSB7XG4gICAgICAgIHNob3dFcnJvcihcIlZldWlsbGV6IGNvbXBsw6l0ZXIgbGEgdsOpcmlmaWNhdGlvbiBUdXJuc3RpbGUuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgc2hvd0xvYWRpbmcoXCJyZXNldEJ0blwiLCBcInJlc2V0U3Bpbm5lclwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5yZXNldFBhc3N3b3JkRm9yRW1haWwoZW1haWwsIHtcbiAgICAgICAgICByZWRpcmVjdFRvOiBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS91cGRhdGUtcGFzc3dvcmRgLFxuICAgICAgICAgIGNhcHRjaGFUb2tlbjogdHVybnN0aWxlVG9rZW4sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgICAgICAgLy8gU2hvdyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgc2hvd1N0YXR1cyhcbiAgICAgICAgICBcIlNpIHVuIGNvbXB0ZSBleGlzdGUgYXZlYyBjZXQgZW1haWwsIHZvdXMgcmVjZXZyZXogdW4gbGllbiBkZSByw6lpbml0aWFsaXNhdGlvbi5cIixcbiAgICAgICAgICBcInN1Y2Nlc3NcIlxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEhpZGUgdGhlIGZvcm1cbiAgICAgICAgcmVzZXRGb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiUGFzc3dvcmQgcmVzZXQgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgc2hvd0Vycm9yKFwiVW5lIGVycmV1ciBlc3Qgc3VydmVudWUuIFZldWlsbGV6IHLDqWVzc2F5ZXIgcGx1cyB0YXJkLlwiKTtcbiAgICAgICAgLy8gUmVzZXQgVHVybnN0aWxlIG9uIGVycm9yXG4gICAgICAgIHR1cm5zdGlsZS5yZXNldCgpO1xuICAgICAgICB0dXJuc3RpbGVUb2tlbiA9IG51bGw7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBoaWRlTG9hZGluZyhcInJlc2V0QnRuXCIsIFwicmVzZXRTcGlubmVyXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdEZvcmdvdFBhc3N3b3JkUGFnZSxcbn07XG4iLCJpbXBvcnQgeyBpbml0Rm9yZ290UGFzc3dvcmRQYWdlIH0gZnJvbSBcIi4uL2F1dGgvZm9yZ290dGVuLXBhc3N3b3JkLmpzXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgaW5pdEZvcmdvdFBhc3N3b3JkUGFnZSgpO1xuICBjb25zb2xlLmxvZyhcIkZvcmdvdCBwYXNzd29yZCBwYWdlIGluaXRpYWxpemVkXCIpO1xufSk7XG4iLCIvLyBzcmMvanMvc3VwYWJhc2UtY2xpZW50LmpzXG4vKipcbiAqIFN1cGFiYXNlIENsaWVudFxuICogQG1vZHVsZSBzdXBhYmFzZS1jbGllbnRcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBoYW5kbGVzIHRoZSBTdXBhYmFzZSBjbGllbnQgaW5pdGlhbGl6YXRpb24gYW5kIGNvbmZpZ3VyYXRpb24uXG4gKiBAdmVyc2lvbiAwLjAuMlxuICogQGF1dGhvciBHcmV5UGFuZGFcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4yICgyMDI1LTA1LTI3KTogQWRkZWQgZW52aXJvbmVtZW50IHZhcmlhYmxlcyBlcnJvciBoYW5kbGluZyBmb3IgbWlzc2luZy5cbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDkpOiBJbml0aWFsIHZlcnNpb24gd2l0aCBiYXNpYyBTdXBhYmFzZSBjbGllbnQgaW5pdGlhbGl6YXRpb24uXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiO1xuXG5jb25zdCBzdXBhYmFzZVVybCA9IFwiaHR0cHM6Ly9vZmV5c3NpcGlia3RtYmZlYmliby5zdXBhYmFzZS5jb1wiO1xuY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID1cbiAgXCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUp6ZFhCaFltRnpaU0lzSW5KbFppSTZJbTltWlhsemMybHdhV0pyZEcxaVptVmlhV0p2SWl3aWNtOXNaU0k2SW1GdWIyNGlMQ0pwWVhRaU9qRTNORE01TWpVd09UUXNJbVY0Y0NJNk1qQTFPVFV3TVRBNU5IMC53NzFDQUtmb2xrdHpSbC1UbUxWaEhZYUViaENmVms0QTdZcmFFVUNnbHJVXCI7XG5cbmlmICghc3VwYWJhc2VVcmwgfHwgIXN1cGFiYXNlQW5vbktleSkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIFN1cGFiYXNlIGVudmlyb25tZW50IHZhcmlhYmxlc1wiKTtcbn1cblxuY29uc3QgY2xpZW50ID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUFub25LZXkpO1xuXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjbGllbnQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJqcy9cIiArIGNodW5rSWQgKyBcIi5idW5kbGUuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwidXJiYW5kb2NzX3dlYmFwcDpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvXmJsb2I6LywgXCJcIikucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsICsgXCIuLi9cIjsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJmb3Jnb3R0ZW5QYXNzd29yZFwiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgPyBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gOiB1bmRlZmluZWQ7XG5cdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG5cdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gKGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdKSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YVsxXShlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCwgXCJjaHVuay1cIiArIGNodW5rSWQsIGNodW5rSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rdXJiYW5kb2NzX3dlYmFwcFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt1cmJhbmRvY3Nfd2ViYXBwXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19zdXBhYmFzZV9zdXBhYmFzZS1qc19kaXN0X21vZHVsZV9pbmRleF9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9lbnRyaWVzL2ZvcmdvdHRlbi1wYXNzd29yZC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9