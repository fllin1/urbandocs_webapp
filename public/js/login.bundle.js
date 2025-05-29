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
/* harmony export */   setCurrentUser: () => (/* binding */ setCurrentUser),
/* harmony export */   showError: () => (/* binding */ showError),
/* harmony export */   showLoading: () => (/* binding */ showLoading),
/* harmony export */   showStatus: () => (/* binding */ showStatus)
/* harmony export */ });
/* unused harmony exports validateSession, getCurrentUser, getCurrentUserSync, logout, isLoggedIn, isLoggedInSync, protectPage, initAuth, hideElement, showElement */
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

/***/ "./src/js/auth/login.js":
/*!******************************!*\
  !*** ./src/js/auth/login.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initLoginPage: () => (/* binding */ initLoginPage)
/* harmony export */ });
/* unused harmony export login */
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth/auth.js");
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../supabase-client.js */ "./src/js/supabase-client.js");
// src/js/login.js
/**
 * Login Module
 * @module login
 * @description This module handles user login functionality using Supabase Authentication.
 * @version 0.1.0
 * @author GreyPanda
 * @todo Add phone number authentication & password reset functionality.
 *
 * @changelog
 * - 0.1.0 (2025-05-15): Migrated to Supabase client-side auth
 * - 0.0.4 (2025-05-13): Ensure status message is also hidden on new submit.
 * - 0.0.3 (2025-05-08): Implemented actual login with Firebase function, added password visibility toggle.
 * - 0.0.2 (2025-05-08): Refactored to handle Supabase authentification.
 * - 0.0.1 (2025-04-27): Login functionality implemented using Firebase Authentication.
 */




let captchaLoginToken = null; // To store the captcha token for login
let turnstileLoginWidgetId = null; // To store Turnstile widget ID for login

// This function will be called by the Cloudflare Turnstile script once it's loaded
// (due to &onload=onloadTurnstileLoginCallback in the script tag in login.html)
window.onloadTurnstileLoginCallback = function () {
  console.log(
    "Turnstile Login API ready (onloadTurnstileLoginCallback executed)."
  );
  const turnstileContainer = document.getElementById(
    "turnstile-login-container"
  );

  if (turnstileContainer && window.turnstile && !turnstileLoginWidgetId) {
    console.log("Rendering Turnstile widget for login...");
    try {
      turnstileLoginWidgetId = window.turnstile.render(turnstileContainer, {
        sitekey: "0x4AAAAAABdzY3InOU2_In99",
        callback: function (token) {
          captchaLoginToken = token;
          console.log("Turnstile login token obtained:", token);
        },
        "expired-callback": () => {
          console.log(
            "Turnstile login token expired. Resetting widget. ID:",
            turnstileLoginWidgetId
          );
          if (window.turnstile && turnstileLoginWidgetId) {
            window.turnstile.reset(turnstileLoginWidgetId);
          }
          captchaLoginToken = null; // Clear the token
        },
        "error-callback": (err) => {
          captchaLoginToken = null;
          console.error("Turnstile login error callback:", err);
          (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(`Erreur CAPTCHA (login): ${err}. Veuillez réessayer.`);
        },
      });
      if (turnstileLoginWidgetId === undefined) {
        console.error(
          "Turnstile.render (login) did not return a widgetId. Sitekey or container issue?"
        );
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(
          "Erreur initialisation CAPTCHA (login, ID widget non retourné)."
        );
      } else {
        console.log(
          "Turnstile login widget rendered. ID:",
          turnstileLoginWidgetId
        );
      }
    } catch (e) {
      console.error("Error rendering Turnstile for login:", e);
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Impossible d'afficher le CAPTCHA (login).");
    }
  } else if (!turnstileContainer) {
    console.error(
      "onloadTurnstileLoginCallback: #turnstile-login-container not found."
    );
  } else if (!window.turnstile) {
    console.error(
      "onloadTurnstileLoginCallback: window.turnstile API not found."
    );
  } else if (turnstileLoginWidgetId) {
    console.log(
      "onloadTurnstileLoginCallback: Login widget already seems rendered."
    );
  }
};

/**
 * Initializes the login page
 */
function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const googleSignInBtn = document.getElementById("googleSignInBtn");

  // Set up password visibility toggle
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Toggle icon
      const iconElement = togglePasswordBtn.querySelector("i");
      if (type === "password") {
        iconElement.classList.remove("bi-eye");
        iconElement.classList.add("bi-eye-slash");
      } else {
        iconElement.classList.remove("bi-eye-slash");
        iconElement.classList.add("bi-eye");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset messages
      if (errorMessage) {
        errorMessage.classList.add("hidden");
        errorMessage.textContent = "";
      }
      // Ensure status message is also hidden on new submit
      const statusMessageElement = document.getElementById("statusMessage");
      if (statusMessageElement) {
        statusMessageElement.classList.add("hidden");
        statusMessageElement.textContent = "";
      }

      // Get form values
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Basic validation
      if (!email || !password) {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Veuillez remplir tous les champs.");
        return;
      }

      if (!captchaLoginToken) {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Veuillez compléter le CAPTCHA.");
        return;
      }

      // Show loading state
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("loginBtn", "loginSpinner");

      try {
        // Call login function
        await login(email, password);
      } catch (error) {
        console.error("Login error:", error);
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(
          error.message || "La connexion a échoué. Vérifiez vos identifiants."
        );
      } finally {
        // Reset button state
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("loginBtn", "loginSpinner");
        if (window.turnstile && turnstileLoginWidgetId) {
          window.turnstile.reset(turnstileLoginWidgetId);
          console.log("Turnstile login widget has been reset.");
        }
        captchaLoginToken = null; // Clear token after use
      }
    });
  }

  // Event listener for Google Sign-In button
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener("click", async () => {
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("googleSignInBtn", "googleSignInSpinner");
      try {
        const { error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            // Optional: redirectTo can be used to specify where users are sent after sign-in.
            // redirectTo: `${window.location.origin}/profile.html`
          },
        });
        if (error) {
          console.error("Error signing in with Google:", error);
          (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(
            error.message || "Erreur lors de la connexion avec Google."
          );
        }
        // On success, Supabase handles the redirect.
      } catch (error) {
        console.error("Exception during Google sign-in:", error);
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(
          "Une exception est survenue lors de la connexion avec Google."
        );
      } finally {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("googleSignInBtn", "googleSignInSpinner");
      }
    });
  } else {
    console.warn("Google Sign-In button (googleSignInBtn) not found.");
  }
}

/**
 * Logs in a user with email and password directly with Supabase
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise resolved with the user data on success
 */
async function login(email, password) {
  try {
    // Call Supabase authentication directly
    const { data, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken: captchaLoginToken }, // Pass captcha token
    });

    // Check for errors
    if (error) {
      // Handle specific error cases
      if (error.message.toLowerCase().includes("email not confirmed")) {
        throw new Error(
          "Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception."
        );
      } else if (
        error.message.toLowerCase().includes("invalid login credentials")
      ) {
        throw new Error("Email ou mot de passe incorrect.");
      } else {
        throw new Error(error.message);
      }
    }

    // No session data
    if (!data.session) {
      console.error(
        "Login error: Missing session data from Supabase response",
        data
      );
      throw new Error("Données de session manquantes après la connexion.");
    }

    // Save user data locally if needed
    if (data.user) {
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.setCurrentUser)(data.user);
      console.log("[login.js] User data saved locally");
    }

    // Show success message before redirect
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showStatus)("Connexion réussie! Redirection...", "success");

    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = "/";
    }, 500);

    return data.user;
  } catch (error) {
    // Log and re-throw the error to be handled by the caller
    console.error("Login error:", error);
    throw error;
  }
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  initLoginPage,
  login,
});


/***/ }),

/***/ "./src/js/entries/login.js":
/*!*********************************!*\
  !*** ./src/js/entries/login.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _auth_login_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/login.js */ "./src/js/auth/login.js");
// src/entries/signup.js
/**
 * Login Entry Point
 *
 * This module serves as the entry point for the login page.
 */

// Import our login module


// Initialize login page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize login page
  (0,_auth_login_js__WEBPACK_IMPORTED_MODULE_0__.initLoginPage)();

  console.log("Login page initialized");
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
/******/ 			"login": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_supabase_supabase-js_dist_module_index_js"], () => (__webpack_require__("./src/js/entries/login.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVyRkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9hdXRoLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9sb2dpbi5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2VudHJpZXMvbG9naW4uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9zdXBhYmFzZS1jbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvYXV0aC9hdXRoLmpzXG4vKipcbiAqIEF1dGhlbnRpY2F0aW9uIE1vZHVsZSAtIEJhc2VcbiAqIEBtb2R1bGUgYXV0aFxuICogQGRlc2NyaXB0aW9uIEJhc2UgbW9kdWxlIGZvciBhdXRoZW50aWNhdGlvbiB3aXRoIGNvbW1vbiBmdW5jdGlvbnMgYW5kIGNvbmZpZ3VyYXRpb25cbiAqIEB2ZXJzaW9uIDAuMC41XG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuNSAoMjAyNS0wNS0xNSk6IEFkZGVkIHNlc3Npb24gdmFsaWRhdGlvbiBhbmQgcHJvdGVjdGlvbiBhZ2FpbnN0IHN0YWxlIHNlc3Npb25zLlxuICogLSAwLjAuNCAoMjAyNS0wNS0xNSk6IFJlbW92YWwgb2YgRmlyZWJhc2UgQ2xvdWQgRnVuY3Rpb25zIGNvbnN0YW50cy5cbiAqIC0gMC4wLjMgKDIwMjUtMDUtMTMpOiBNb2RpZmllZCB0aGUgYXV0aGVudGljYXRpb24gc3RhdGUgbWFuYWdlbWVudCB0byB1c2UgU3VwYWJhc2UgQXV0aCBzeXN0ZW0uXG4gKiAtIDAuMC4yICgyMDI1LTA1LTEzKTogUmVvcmdhbml6YXRpb24gaW50byBzZXBhcmF0ZSBtb2R1bGVzXG4gKiAtIDAuMC4xICgyMDI1LTA1LTAzKTogSW5pdGlhbCBjcmVhdGlvblxuICovXG5cbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4uL3N1cGFiYXNlLWNsaWVudC5qc1wiO1xuXG4vLyBHbG9iYWwgYXV0aGVudGljYXRpb24gc3RhdGVcbmxldCBjdXJyZW50VXNlciA9IG51bGw7XG5sZXQgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdXNlclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXIgLSBVc2VyIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXIpIHtcbiAgY3VycmVudFVzZXIgPSB1c2VyO1xuICAvLyBQb3NzaWJsZSBzdG9yYWdlIGluIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxuICBpZiAodXNlcikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIGN1cnJlbnQgc2Vzc2lvbiBpcyBhY3RpdmUgd2l0aCBTdXBhYmFzZVxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFRydWUgaWYgc2Vzc2lvbiBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZVNlc3Npb24oKSB7XG4gIHRyeSB7XG4gICAgLy8gR2V0IGN1cnJlbnQgc2Vzc2lvbiBmcm9tIFN1cGFiYXNlXG4gICAgY29uc3Qge1xuICAgICAgZGF0YTogeyBzZXNzaW9uIH0sXG4gICAgICBlcnJvcjogc2Vzc2lvbkVycm9yLFxuICAgIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFNlc3Npb24oKTtcblxuICAgIC8vIE5vIHNlc3Npb24gb3IgZXJyb3IgcmV0cmlldmluZyBzZXNzaW9uXG4gICAgaWYgKHNlc3Npb25FcnJvciB8fCAhc2Vzc2lvbikge1xuICAgICAgY29uc29sZS5sb2coXCJObyB2YWxpZCBzZXNzaW9uIGZvdW5kXCIpO1xuICAgICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIHJlZnJlc2ggdGhlIHRva2VuIHRvIHZhbGlkYXRlIGl0IHdpdGggdGhlIHNlcnZlclxuICAgIGNvbnN0IHsgZXJyb3I6IHJlZnJlc2hFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5yZWZyZXNoU2Vzc2lvbigpO1xuXG4gICAgaWYgKHJlZnJlc2hFcnJvcikge1xuICAgICAgY29uc29sZS53YXJuKFwiU2Vzc2lvbiB2YWxpZGF0aW9uIGZhaWxlZDpcIiwgcmVmcmVzaEVycm9yKTtcbiAgICAgIC8vIEZvcmNlIGNsZWFyIHRoZSBpbnZhbGlkIHNlc3Npb25cbiAgICAgIGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbk91dCgpO1xuICAgICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gU2Vzc2lvbiBpcyB2YWxpZCwgdXBkYXRlIHRoZSBjdXJyZW50IHVzZXJcbiAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgIHNlc3Npb25WYWxpZGF0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcIlNlc3Npb24gdmFsaWRhdGlvbiBlcnJvcjpcIiwgZSk7XG4gICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY3VycmVudCB1c2VyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbGlkYXRlIC0gV2hldGhlciB0byB2YWxpZGF0ZSB0aGUgc2Vzc2lvbiB3aXRoIFN1cGFiYXNlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3R8bnVsbD59IFRoZSBjdXJyZW50IHVzZXIgb3IgbnVsbFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIodmFsaWRhdGUgPSB0cnVlKSB7XG4gIC8vIElmIHdlIG5lZWQgdG8gdmFsaWRhdGUgYW5kIGhhdmVuJ3QgZG9uZSBzbyB5ZXRcbiAgaWYgKHZhbGlkYXRlICYmICFzZXNzaW9uVmFsaWRhdGVkKSB7XG4gICAgYXdhaXQgdmFsaWRhdGVTZXNzaW9uKCk7XG4gIH1cblxuICAvLyBJZiBubyB2YWxpZGF0aW9uIG5lZWRlZCBvciBhbHJlYWR5IHZhbGlkYXRlZFxuICBpZiAoIXZhbGlkYXRlICYmICFjdXJyZW50VXNlcikge1xuICAgIC8vIFRyeSB0byByZXRyaWV2ZSBmcm9tIHN0b3JhZ2UgaWYgbm90IGluIG1lbW9yeVxuICAgIGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgIGlmIChzdG9yZWRVc2VyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjdXJyZW50VXNlciA9IEpTT04ucGFyc2Uoc3RvcmVkVXNlcik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciByZXRyaWV2aW5nIHVzZXI6XCIsIGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50VXNlcjtcbn1cblxuLyoqXG4gKiBTeW5jaHJvbm91cyB2ZXJzaW9uIG9mIGdldEN1cnJlbnRVc2VyIGZvciBub24tYXN5bmMgY29udGV4dHNcbiAqIFdBUk5JTkc6IFRoaXMgbWF5IHJldHVybiBzdGFsZSBkYXRhIGlmIHNlc3Npb24gaXMgaW52YWxpZFxuICogQHJldHVybnMge09iamVjdHxudWxsfSBUaGUgY3VycmVudCB1c2VyIG9yIG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyU3luYygpIHtcbiAgaWYgKCFjdXJyZW50VXNlcikge1xuICAgIGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgIGlmIChzdG9yZWRVc2VyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjdXJyZW50VXNlciA9IEpTT04ucGFyc2Uoc3RvcmVkVXNlcik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciByZXRyaWV2aW5nIHVzZXI6XCIsIGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50VXNlcjtcbn1cblxuLyoqXG4gKiBMb2dzIG91dCB0aGUgdXNlclxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gIHRyeSB7XG4gICAgLy8gU2lnbiBvdXQgZnJvbSBTdXBhYmFzZVxuICAgIGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbk91dCgpO1xuXG4gICAgLy8gQ2xlYXIgbG9jYWwgc3RhdGVcbiAgICBjdXJyZW50VXNlciA9IG51bGw7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG5cbiAgICAvLyBSZWRpcmVjdCB0byB0aGUgaG9tZSBwYWdlIGFmdGVyIGxvZ291dFxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGR1cmluZyBsb2dvdXQ6XCIsIGVycm9yKTtcbiAgICAvLyBTdGlsbCBjbGVhciBsb2NhbCBzdGF0ZSBldmVuIGlmIFN1cGFiYXNlIHNpZ25PdXQgZmFpbHNcbiAgICBjdXJyZW50VXNlciA9IG51bGw7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW4gd2l0aCB2YWxpZCBzZXNzaW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbGlkYXRlIC0gV2hldGhlciB0byB2YWxpZGF0ZSB3aXRoIFN1cGFiYXNlIGZpcnN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gVHJ1ZSBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW4gd2l0aCB2YWxpZCBzZXNzaW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc0xvZ2dlZEluKHZhbGlkYXRlID0gdHJ1ZSkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIodmFsaWRhdGUpO1xuICByZXR1cm4gdXNlciAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBTeW5jaHJvbm91cyB2ZXJzaW9uIG9mIGlzTG9nZ2VkSW5cbiAqIFdBUk5JTkc6IFRoaXMgbWF5IHJldHVybiBpbmNvcnJlY3QgcmVzdWx0cyBpZiBzZXNzaW9uIGlzIGludmFsaWRcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHVzZXIgYXBwZWFycyB0byBiZSBsb2dnZWQgaW4gbG9jYWxseVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dnZWRJblN5bmMoKSB7XG4gIHJldHVybiBnZXRDdXJyZW50VXNlclN5bmMoKSAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBQcm90ZWN0cyBhIHBhZ2UgdGhhdCByZXF1aXJlcyBhdXRoZW50aWNhdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IHJlZGlyZWN0VXJsIC0gVVJMIHRvIHJlZGlyZWN0IGlmIG5vdCBhdXRoZW50aWNhdGVkXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gVHJ1ZSBpZiBhdXRoZW50aWNhdGVkLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByb3RlY3RQYWdlKHJlZGlyZWN0VXJsID0gXCIvbG9naW5cIikge1xuICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgdmFsaWRhdGVTZXNzaW9uKCk7XG5cbiAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgLy8gUmVkaXJlY3QgdG8gbG9naW4gcGFnZVxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVcmw7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYXV0aCBvbiBwYWdlIGxvYWRcbiAqIENhbGwgdGhpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXIgYXBwIGluaXRpYWxpemF0aW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0QXV0aCgpIHtcbiAgLy8gVmFsaWRhdGUgc2Vzc2lvbiBvbiBwYWdlIGxvYWRcbiAgYXdhaXQgdmFsaWRhdGVTZXNzaW9uKCk7XG5cbiAgLy8gU2V0IHVwIGF1dGggc3RhdGUgY2hhbmdlIGxpc3RlbmVyXG4gIHN1cGFiYXNlLmF1dGgub25BdXRoU3RhdGVDaGFuZ2UoYXN5bmMgKGV2ZW50LCBzZXNzaW9uKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJBdXRoIHN0YXRlIGNoYW5nZWQ6XCIsIGV2ZW50KTtcblxuICAgIGlmIChldmVudCA9PT0gXCJTSUdORURfSU5cIiAmJiBzZXNzaW9uKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gXCJTSUdORURfT1VUXCIpIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKG51bGwpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IFwiVE9LRU5fUkVGUkVTSEVEXCIpIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIlVTRVJfVVBEQVRFRFwiKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhbiBlcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIEVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIGVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZSwgZWxlbWVudElkID0gXCJlcnJvck1lc3NhZ2VcIikge1xuICBjb25zdCBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZXJyb3JFbGVtZW50KSB7XG4gICAgZXJyb3JFbGVtZW50LmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGxheXMgYSBzdGF0dXMgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBNZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gTWVzc2FnZSB0eXBlIChzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBkYW5nZXIpXG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd1N0YXR1cyhcbiAgbWVzc2FnZSxcbiAgdHlwZSA9IFwiaW5mb1wiLFxuICBlbGVtZW50SWQgPSBcInN0YXR1c01lc3NhZ2VcIlxuKSB7XG4gIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoc3RhdHVzRWxlbWVudCkge1xuICAgIHN0YXR1c0VsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCBhbGVydC0qIGNsYXNzZXNcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcImFsZXJ0LVwiKSkge1xuICAgICAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgY2xhc3MgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZVxuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmFkZChgYWxlcnQtJHt0eXBlfWApO1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU3RhdHVzIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogSGlkZXMgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIGhpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gc2hvd1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93TG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn1cblxuLyoqXG4gKiBIaWRlcyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUxvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufVxuXG4vLyBFeHBvcnQgdGhlIG5lY2Vzc2FyeSBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlc1xuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRDdXJyZW50VXNlcixcbiAgZ2V0Q3VycmVudFVzZXJTeW5jLFxuICBzZXRDdXJyZW50VXNlcixcbiAgbG9nb3V0LFxuICBpc0xvZ2dlZEluLFxuICBpc0xvZ2dlZEluU3luYyxcbiAgdmFsaWRhdGVTZXNzaW9uLFxuICBwcm90ZWN0UGFnZSxcbiAgaW5pdEF1dGgsXG4gIHNob3dFcnJvcixcbiAgc2hvd1N0YXR1cyxcbiAgaGlkZUVsZW1lbnQsXG4gIHNob3dFbGVtZW50LFxuICBzaG93TG9hZGluZyxcbiAgaGlkZUxvYWRpbmcsXG59O1xuIiwiLy8gc3JjL2pzL2xvZ2luLmpzXG4vKipcbiAqIExvZ2luIE1vZHVsZVxuICogQG1vZHVsZSBsb2dpblxuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIGhhbmRsZXMgdXNlciBsb2dpbiBmdW5jdGlvbmFsaXR5IHVzaW5nIFN1cGFiYXNlIEF1dGhlbnRpY2F0aW9uLlxuICogQHZlcnNpb24gMC4xLjBcbiAqIEBhdXRob3IgR3JleVBhbmRhXG4gKiBAdG9kbyBBZGQgcGhvbmUgbnVtYmVyIGF1dGhlbnRpY2F0aW9uICYgcGFzc3dvcmQgcmVzZXQgZnVuY3Rpb25hbGl0eS5cbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMS4wICgyMDI1LTA1LTE1KTogTWlncmF0ZWQgdG8gU3VwYWJhc2UgY2xpZW50LXNpZGUgYXV0aFxuICogLSAwLjAuNCAoMjAyNS0wNS0xMyk6IEVuc3VyZSBzdGF0dXMgbWVzc2FnZSBpcyBhbHNvIGhpZGRlbiBvbiBuZXcgc3VibWl0LlxuICogLSAwLjAuMyAoMjAyNS0wNS0wOCk6IEltcGxlbWVudGVkIGFjdHVhbCBsb2dpbiB3aXRoIEZpcmViYXNlIGZ1bmN0aW9uLCBhZGRlZCBwYXNzd29yZCB2aXNpYmlsaXR5IHRvZ2dsZS5cbiAqIC0gMC4wLjIgKDIwMjUtMDUtMDgpOiBSZWZhY3RvcmVkIHRvIGhhbmRsZSBTdXBhYmFzZSBhdXRoZW50aWZpY2F0aW9uLlxuICogLSAwLjAuMSAoMjAyNS0wNC0yNyk6IExvZ2luIGZ1bmN0aW9uYWxpdHkgaW1wbGVtZW50ZWQgdXNpbmcgRmlyZWJhc2UgQXV0aGVudGljYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgc2V0Q3VycmVudFVzZXIsXG4gIHNob3dFcnJvcixcbiAgc2hvd1N0YXR1cyxcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufSBmcm9tIFwiLi9hdXRoLmpzXCI7XG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCIuLi9zdXBhYmFzZS1jbGllbnQuanNcIjtcblxubGV0IGNhcHRjaGFMb2dpblRva2VuID0gbnVsbDsgLy8gVG8gc3RvcmUgdGhlIGNhcHRjaGEgdG9rZW4gZm9yIGxvZ2luXG5sZXQgdHVybnN0aWxlTG9naW5XaWRnZXRJZCA9IG51bGw7IC8vIFRvIHN0b3JlIFR1cm5zdGlsZSB3aWRnZXQgSUQgZm9yIGxvZ2luXG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYnkgdGhlIENsb3VkZmxhcmUgVHVybnN0aWxlIHNjcmlwdCBvbmNlIGl0J3MgbG9hZGVkXG4vLyAoZHVlIHRvICZvbmxvYWQ9b25sb2FkVHVybnN0aWxlTG9naW5DYWxsYmFjayBpbiB0aGUgc2NyaXB0IHRhZyBpbiBsb2dpbi5odG1sKVxud2luZG93Lm9ubG9hZFR1cm5zdGlsZUxvZ2luQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKFxuICAgIFwiVHVybnN0aWxlIExvZ2luIEFQSSByZWFkeSAob25sb2FkVHVybnN0aWxlTG9naW5DYWxsYmFjayBleGVjdXRlZCkuXCJcbiAgKTtcbiAgY29uc3QgdHVybnN0aWxlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgXCJ0dXJuc3RpbGUtbG9naW4tY29udGFpbmVyXCJcbiAgKTtcblxuICBpZiAodHVybnN0aWxlQ29udGFpbmVyICYmIHdpbmRvdy50dXJuc3RpbGUgJiYgIXR1cm5zdGlsZUxvZ2luV2lkZ2V0SWQpIHtcbiAgICBjb25zb2xlLmxvZyhcIlJlbmRlcmluZyBUdXJuc3RpbGUgd2lkZ2V0IGZvciBsb2dpbi4uLlwiKTtcbiAgICB0cnkge1xuICAgICAgdHVybnN0aWxlTG9naW5XaWRnZXRJZCA9IHdpbmRvdy50dXJuc3RpbGUucmVuZGVyKHR1cm5zdGlsZUNvbnRhaW5lciwge1xuICAgICAgICBzaXRla2V5OiBcIjB4NEFBQUFBQUJkelkzSW5PVTJfSW45OVwiLFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgY2FwdGNoYUxvZ2luVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlR1cm5zdGlsZSBsb2dpbiB0b2tlbiBvYnRhaW5lZDpcIiwgdG9rZW4pO1xuICAgICAgICB9LFxuICAgICAgICBcImV4cGlyZWQtY2FsbGJhY2tcIjogKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgXCJUdXJuc3RpbGUgbG9naW4gdG9rZW4gZXhwaXJlZC4gUmVzZXR0aW5nIHdpZGdldC4gSUQ6XCIsXG4gICAgICAgICAgICB0dXJuc3RpbGVMb2dpbldpZGdldElkXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAod2luZG93LnR1cm5zdGlsZSAmJiB0dXJuc3RpbGVMb2dpbldpZGdldElkKSB7XG4gICAgICAgICAgICB3aW5kb3cudHVybnN0aWxlLnJlc2V0KHR1cm5zdGlsZUxvZ2luV2lkZ2V0SWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXB0Y2hhTG9naW5Ub2tlbiA9IG51bGw7IC8vIENsZWFyIHRoZSB0b2tlblxuICAgICAgICB9LFxuICAgICAgICBcImVycm9yLWNhbGxiYWNrXCI6IChlcnIpID0+IHtcbiAgICAgICAgICBjYXB0Y2hhTG9naW5Ub2tlbiA9IG51bGw7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlR1cm5zdGlsZSBsb2dpbiBlcnJvciBjYWxsYmFjazpcIiwgZXJyKTtcbiAgICAgICAgICBzaG93RXJyb3IoYEVycmV1ciBDQVBUQ0hBIChsb2dpbik6ICR7ZXJyfS4gVmV1aWxsZXogcsOpZXNzYXllci5gKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHR1cm5zdGlsZUxvZ2luV2lkZ2V0SWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiVHVybnN0aWxlLnJlbmRlciAobG9naW4pIGRpZCBub3QgcmV0dXJuIGEgd2lkZ2V0SWQuIFNpdGVrZXkgb3IgY29udGFpbmVyIGlzc3VlP1wiXG4gICAgICAgICk7XG4gICAgICAgIHNob3dFcnJvcihcbiAgICAgICAgICBcIkVycmV1ciBpbml0aWFsaXNhdGlvbiBDQVBUQ0hBIChsb2dpbiwgSUQgd2lkZ2V0IG5vbiByZXRvdXJuw6kpLlwiXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIlR1cm5zdGlsZSBsb2dpbiB3aWRnZXQgcmVuZGVyZWQuIElEOlwiLFxuICAgICAgICAgIHR1cm5zdGlsZUxvZ2luV2lkZ2V0SWRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmVuZGVyaW5nIFR1cm5zdGlsZSBmb3IgbG9naW46XCIsIGUpO1xuICAgICAgc2hvd0Vycm9yKFwiSW1wb3NzaWJsZSBkJ2FmZmljaGVyIGxlIENBUFRDSEEgKGxvZ2luKS5cIik7XG4gICAgfVxuICB9IGVsc2UgaWYgKCF0dXJuc3RpbGVDb250YWluZXIpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgXCJvbmxvYWRUdXJuc3RpbGVMb2dpbkNhbGxiYWNrOiAjdHVybnN0aWxlLWxvZ2luLWNvbnRhaW5lciBub3QgZm91bmQuXCJcbiAgICApO1xuICB9IGVsc2UgaWYgKCF3aW5kb3cudHVybnN0aWxlKSB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIFwib25sb2FkVHVybnN0aWxlTG9naW5DYWxsYmFjazogd2luZG93LnR1cm5zdGlsZSBBUEkgbm90IGZvdW5kLlwiXG4gICAgKTtcbiAgfSBlbHNlIGlmICh0dXJuc3RpbGVMb2dpbldpZGdldElkKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBcIm9ubG9hZFR1cm5zdGlsZUxvZ2luQ2FsbGJhY2s6IExvZ2luIHdpZGdldCBhbHJlYWR5IHNlZW1zIHJlbmRlcmVkLlwiXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgbG9naW4gcGFnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdExvZ2luUGFnZSgpIHtcbiAgY29uc3QgbG9naW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbkZvcm1cIik7XG4gIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3JNZXNzYWdlXCIpO1xuICBjb25zdCB0b2dnbGVQYXNzd29yZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9nZ2xlUGFzc3dvcmRcIik7XG4gIGNvbnN0IHBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpO1xuICBjb25zdCBnb29nbGVTaWduSW5CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdvb2dsZVNpZ25JbkJ0blwiKTtcblxuICAvLyBTZXQgdXAgcGFzc3dvcmQgdmlzaWJpbGl0eSB0b2dnbGVcbiAgaWYgKHRvZ2dsZVBhc3N3b3JkQnRuICYmIHBhc3N3b3JkSW5wdXQpIHtcbiAgICB0b2dnbGVQYXNzd29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9XG4gICAgICAgIHBhc3N3b3JkSW5wdXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSA9PT0gXCJwYXNzd29yZFwiID8gXCJ0ZXh0XCIgOiBcInBhc3N3b3JkXCI7XG4gICAgICBwYXNzd29yZElucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgdHlwZSk7XG5cbiAgICAgIC8vIFRvZ2dsZSBpY29uXG4gICAgICBjb25zdCBpY29uRWxlbWVudCA9IHRvZ2dsZVBhc3N3b3JkQnRuLnF1ZXJ5U2VsZWN0b3IoXCJpXCIpO1xuICAgICAgaWYgKHR5cGUgPT09IFwicGFzc3dvcmRcIikge1xuICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYmktZXllXCIpO1xuICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYmktZXllLXNsYXNoXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImJpLWV5ZS1zbGFzaFwiKTtcbiAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJpLWV5ZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmIChsb2dpbkZvcm0pIHtcbiAgICBsb2dpbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAvLyBSZXNldCBtZXNzYWdlc1xuICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIH1cbiAgICAgIC8vIEVuc3VyZSBzdGF0dXMgbWVzc2FnZSBpcyBhbHNvIGhpZGRlbiBvbiBuZXcgc3VibWl0XG4gICAgICBjb25zdCBzdGF0dXNNZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcbiAgICAgIGlmIChzdGF0dXNNZXNzYWdlRWxlbWVudCkge1xuICAgICAgICBzdGF0dXNNZXNzYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICBzdGF0dXNNZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBmb3JtIHZhbHVlc1xuICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlO1xuICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuXG4gICAgICAvLyBCYXNpYyB2YWxpZGF0aW9uXG4gICAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkge1xuICAgICAgICBzaG93RXJyb3IoXCJWZXVpbGxleiByZW1wbGlyIHRvdXMgbGVzIGNoYW1wcy5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjYXB0Y2hhTG9naW5Ub2tlbikge1xuICAgICAgICBzaG93RXJyb3IoXCJWZXVpbGxleiBjb21wbMOpdGVyIGxlIENBUFRDSEEuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgc2hvd0xvYWRpbmcoXCJsb2dpbkJ0blwiLCBcImxvZ2luU3Bpbm5lclwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ2FsbCBsb2dpbiBmdW5jdGlvblxuICAgICAgICBhd2FpdCBsb2dpbihlbWFpbCwgcGFzc3dvcmQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkxvZ2luIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIHNob3dFcnJvcihcbiAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IFwiTGEgY29ubmV4aW9uIGEgw6ljaG91w6kuIFbDqXJpZmlleiB2b3MgaWRlbnRpZmlhbnRzLlwiXG4gICAgICAgICk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICAvLyBSZXNldCBidXR0b24gc3RhdGVcbiAgICAgICAgaGlkZUxvYWRpbmcoXCJsb2dpbkJ0blwiLCBcImxvZ2luU3Bpbm5lclwiKTtcbiAgICAgICAgaWYgKHdpbmRvdy50dXJuc3RpbGUgJiYgdHVybnN0aWxlTG9naW5XaWRnZXRJZCkge1xuICAgICAgICAgIHdpbmRvdy50dXJuc3RpbGUucmVzZXQodHVybnN0aWxlTG9naW5XaWRnZXRJZCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJUdXJuc3RpbGUgbG9naW4gd2lkZ2V0IGhhcyBiZWVuIHJlc2V0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYXB0Y2hhTG9naW5Ub2tlbiA9IG51bGw7IC8vIENsZWFyIHRva2VuIGFmdGVyIHVzZVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gRXZlbnQgbGlzdGVuZXIgZm9yIEdvb2dsZSBTaWduLUluIGJ1dHRvblxuICBpZiAoZ29vZ2xlU2lnbkluQnRuKSB7XG4gICAgZ29vZ2xlU2lnbkluQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICBzaG93TG9hZGluZyhcImdvb2dsZVNpZ25JbkJ0blwiLCBcImdvb2dsZVNpZ25JblNwaW5uZXJcIik7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25JbldpdGhPQXV0aCh7XG4gICAgICAgICAgcHJvdmlkZXI6IFwiZ29vZ2xlXCIsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgLy8gT3B0aW9uYWw6IHJlZGlyZWN0VG8gY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSB3aGVyZSB1c2VycyBhcmUgc2VudCBhZnRlciBzaWduLWluLlxuICAgICAgICAgICAgLy8gcmVkaXJlY3RUbzogYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vcHJvZmlsZS5odG1sYFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2lnbmluZyBpbiB3aXRoIEdvb2dsZTpcIiwgZXJyb3IpO1xuICAgICAgICAgIHNob3dFcnJvcihcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgXCJFcnJldXIgbG9ycyBkZSBsYSBjb25uZXhpb24gYXZlYyBHb29nbGUuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIE9uIHN1Y2Nlc3MsIFN1cGFiYXNlIGhhbmRsZXMgdGhlIHJlZGlyZWN0LlxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkV4Y2VwdGlvbiBkdXJpbmcgR29vZ2xlIHNpZ24taW46XCIsIGVycm9yKTtcbiAgICAgICAgc2hvd0Vycm9yKFxuICAgICAgICAgIFwiVW5lIGV4Y2VwdGlvbiBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSBjb25uZXhpb24gYXZlYyBHb29nbGUuXCJcbiAgICAgICAgKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGhpZGVMb2FkaW5nKFwiZ29vZ2xlU2lnbkluQnRuXCIsIFwiZ29vZ2xlU2lnbkluU3Bpbm5lclwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLndhcm4oXCJHb29nbGUgU2lnbi1JbiBidXR0b24gKGdvb2dsZVNpZ25JbkJ0bikgbm90IGZvdW5kLlwiKTtcbiAgfVxufVxuXG4vKipcbiAqIExvZ3MgaW4gYSB1c2VyIHdpdGggZW1haWwgYW5kIHBhc3N3b3JkIGRpcmVjdGx5IHdpdGggU3VwYWJhc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbCAtIFVzZXIncyBlbWFpbFxuICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIC0gVXNlcidzIHBhc3N3b3JkXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBQcm9taXNlIHJlc29sdmVkIHdpdGggdGhlIHVzZXIgZGF0YSBvbiBzdWNjZXNzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgdHJ5IHtcbiAgICAvLyBDYWxsIFN1cGFiYXNlIGF1dGhlbnRpY2F0aW9uIGRpcmVjdGx5XG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduSW5XaXRoUGFzc3dvcmQoe1xuICAgICAgZW1haWwsXG4gICAgICBwYXNzd29yZCxcbiAgICAgIG9wdGlvbnM6IHsgY2FwdGNoYVRva2VuOiBjYXB0Y2hhTG9naW5Ub2tlbiB9LCAvLyBQYXNzIGNhcHRjaGEgdG9rZW5cbiAgICB9KTtcblxuICAgIC8vIENoZWNrIGZvciBlcnJvcnNcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIC8vIEhhbmRsZSBzcGVjaWZpYyBlcnJvciBjYXNlc1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImVtYWlsIG5vdCBjb25maXJtZWRcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiVm90cmUgZW1haWwgbidhIHBhcyDDqXTDqSBjb25maXJtw6kuIFZldWlsbGV6IHbDqXJpZmllciB2b3RyZSBib8OudGUgZGUgcsOpY2VwdGlvbi5cIlxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZXJyb3IubWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiaW52YWxpZCBsb2dpbiBjcmVkZW50aWFsc1wiKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVtYWlsIG91IG1vdCBkZSBwYXNzZSBpbmNvcnJlY3QuXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE5vIHNlc3Npb24gZGF0YVxuICAgIGlmICghZGF0YS5zZXNzaW9uKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBcIkxvZ2luIGVycm9yOiBNaXNzaW5nIHNlc3Npb24gZGF0YSBmcm9tIFN1cGFiYXNlIHJlc3BvbnNlXCIsXG4gICAgICAgIGRhdGFcbiAgICAgICk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEb25uw6llcyBkZSBzZXNzaW9uIG1hbnF1YW50ZXMgYXByw6hzIGxhIGNvbm5leGlvbi5cIik7XG4gICAgfVxuXG4gICAgLy8gU2F2ZSB1c2VyIGRhdGEgbG9jYWxseSBpZiBuZWVkZWRcbiAgICBpZiAoZGF0YS51c2VyKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihkYXRhLnVzZXIpO1xuICAgICAgY29uc29sZS5sb2coXCJbbG9naW4uanNdIFVzZXIgZGF0YSBzYXZlZCBsb2NhbGx5XCIpO1xuICAgIH1cblxuICAgIC8vIFNob3cgc3VjY2VzcyBtZXNzYWdlIGJlZm9yZSByZWRpcmVjdFxuICAgIHNob3dTdGF0dXMoXCJDb25uZXhpb24gcsOpdXNzaWUhIFJlZGlyZWN0aW9uLi4uXCIsIFwic3VjY2Vzc1wiKTtcblxuICAgIC8vIFJlZGlyZWN0IHRvIGhvbWUgcGFnZSBhZnRlciBhIHNob3J0IGRlbGF5XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgIH0sIDUwMCk7XG5cbiAgICByZXR1cm4gZGF0YS51c2VyO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIExvZyBhbmQgcmUtdGhyb3cgdGhlIGVycm9yIHRvIGJlIGhhbmRsZWQgYnkgdGhlIGNhbGxlclxuICAgIGNvbnNvbGUuZXJyb3IoXCJMb2dpbiBlcnJvcjpcIiwgZXJyb3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdExvZ2luUGFnZSxcbiAgbG9naW4sXG59O1xuIiwiLy8gc3JjL2VudHJpZXMvc2lnbnVwLmpzXG4vKipcbiAqIExvZ2luIEVudHJ5IFBvaW50XG4gKlxuICogVGhpcyBtb2R1bGUgc2VydmVzIGFzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIGxvZ2luIHBhZ2UuXG4gKi9cblxuLy8gSW1wb3J0IG91ciBsb2dpbiBtb2R1bGVcbmltcG9ydCB7IGluaXRMb2dpblBhZ2UgfSBmcm9tIFwiLi4vYXV0aC9sb2dpbi5qc1wiO1xuXG4vLyBJbml0aWFsaXplIGxvZ2luIHBhZ2Ugd2hlbiBET00gaXMgbG9hZGVkXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIC8vIEluaXRpYWxpemUgbG9naW4gcGFnZVxuICBpbml0TG9naW5QYWdlKCk7XG5cbiAgY29uc29sZS5sb2coXCJMb2dpbiBwYWdlIGluaXRpYWxpemVkXCIpO1xufSk7XG4iLCIvLyBzcmMvanMvc3VwYWJhc2UtY2xpZW50LmpzXG4vKipcbiAqIFN1cGFiYXNlIENsaWVudFxuICogQG1vZHVsZSBzdXBhYmFzZS1jbGllbnRcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBoYW5kbGVzIHRoZSBTdXBhYmFzZSBjbGllbnQgaW5pdGlhbGl6YXRpb24gYW5kIGNvbmZpZ3VyYXRpb24uXG4gKiBAdmVyc2lvbiAwLjAuMlxuICogQGF1dGhvciBHcmV5UGFuZGFcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4yICgyMDI1LTA1LTI3KTogQWRkZWQgZW52aXJvbmVtZW50IHZhcmlhYmxlcyBlcnJvciBoYW5kbGluZyBmb3IgbWlzc2luZy5cbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDkpOiBJbml0aWFsIHZlcnNpb24gd2l0aCBiYXNpYyBTdXBhYmFzZSBjbGllbnQgaW5pdGlhbGl6YXRpb24uXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiO1xuXG5jb25zdCBzdXBhYmFzZVVybCA9IFwiaHR0cHM6Ly9vZmV5c3NpcGlia3RtYmZlYmliby5zdXBhYmFzZS5jb1wiO1xuY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID1cbiAgXCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUp6ZFhCaFltRnpaU0lzSW5KbFppSTZJbTltWlhsemMybHdhV0pyZEcxaVptVmlhV0p2SWl3aWNtOXNaU0k2SW1GdWIyNGlMQ0pwWVhRaU9qRTNORE01TWpVd09UUXNJbVY0Y0NJNk1qQTFPVFV3TVRBNU5IMC53NzFDQUtmb2xrdHpSbC1UbUxWaEhZYUViaENmVms0QTdZcmFFVUNnbHJVXCI7XG5cbmlmICghc3VwYWJhc2VVcmwgfHwgIXN1cGFiYXNlQW5vbktleSkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIFN1cGFiYXNlIGVudmlyb25tZW50IHZhcmlhYmxlc1wiKTtcbn1cblxuY29uc3QgY2xpZW50ID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUFub25LZXkpO1xuXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjbGllbnQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJqcy9cIiArIGNodW5rSWQgKyBcIi5idW5kbGUuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwidXJiYW5kb2NzX3dlYmFwcDpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvXmJsb2I6LywgXCJcIikucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsICsgXCIuLi9cIjsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJsb2dpblwiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgPyBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gOiB1bmRlZmluZWQ7XG5cdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG5cdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gKGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdKSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YVsxXShlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCwgXCJjaHVuay1cIiArIGNodW5rSWQsIGNodW5rSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rdXJiYW5kb2NzX3dlYmFwcFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt1cmJhbmRvY3Nfd2ViYXBwXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19zdXBhYmFzZV9zdXBhYmFzZS1qc19kaXN0X21vZHVsZV9pbmRleF9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9lbnRyaWVzL2xvZ2luLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=