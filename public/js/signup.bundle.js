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

/***/ "./src/js/auth/signup.js":
/*!*******************************!*\
  !*** ./src/js/auth/signup.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initSignupPage: () => (/* binding */ initSignupPage)
/* harmony export */ });
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth/auth.js");
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../supabase-client.js */ "./src/js/supabase-client.js");
// src/auth/signup.js
/**
 * Signup Module
 * @module signup
 * @description Handles user registration with client-side validation, Google OAuth, and phone verification using Supabase.
 * @version 0.2.1
 *
 * @changelog
 * - 0.2.1 (2025-05-18): Added captcha with Cloudflare Turnstile.
 * - 0.2.0 (2025-05-18): Added phone number input, OTP sending and verification for email/password signup.
 * - 0.1.1 (2025-05-18): Added Google Sign-Up functionality.
 * - 0.1.0 (2025-05-15): Migrated to Supabase client-side auth (versioning adjusted)
 */




// Store phone number temporarily between steps
let captchaToken = null; // To store the captcha token (used by both hCaptcha and Turnstile)
let turnstileWidgetId = null; // To store Turnstile widget ID

// This function will be called by the Cloudflare Turnstile script once it's loaded
// (due to &onload=onloadTurnstileCallback in the script tag in signup.html)
window.onloadTurnstileCallback = function () {
  console.log("Turnstile API ready (onloadTurnstileCallback executed).");
  const turnstileContainer = document.getElementById("turnstile-container");

  if (turnstileContainer && window.turnstile && !turnstileWidgetId) {
    console.log("Rendering Turnstile widget from onloadTurnstileCallback...");
    try {
      turnstileWidgetId = window.turnstile.render(turnstileContainer, {
        sitekey: "0x4AAAAAABdzY3InOU2_In99",
        callback: function (token) {
          captchaToken = token;
          console.log("Turnstile token obtained:", token);
        },
        "expired-callback": () => {
          console.log(
            "Turnstile token expired. Resetting widget. ID:",
            turnstileWidgetId
          );
          if (window.turnstile && turnstileWidgetId) {
            window.turnstile.reset(turnstileWidgetId);
          }
          captchaToken = null; // Clear the token
          // Widget should be ready for a new challenge after reset.
        },
        "error-callback": (err) => {
          captchaToken = null;
          console.error("Turnstile error callback:", err);
          (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(`Erreur CAPTCHA: ${err}. Veuillez réessayer.`);
        },
        // theme: 'light', // Optional: 'light', 'dark', or 'auto'
        // language: 'fr', // Optional: specify language
      });
      if (turnstileWidgetId === undefined) {
        console.error(
          "Turnstile.render did not return a widgetId. Sitekey or container issue?"
        );
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Erreur initialisation CAPTCHA (ID widget non retourné).");
      } else {
        console.log("Turnstile widget rendered. ID:", turnstileWidgetId);
      }
    } catch (e) {
      console.error("Error rendering Turnstile:", e);
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Impossible d'afficher le CAPTCHA.");
    }
  } else if (!turnstileContainer) {
    console.error("onloadTurnstileCallback: #turnstile-container not found.");
  } else if (!window.turnstile) {
    console.error("onloadTurnstileCallback: window.turnstile API not found.");
  } else if (turnstileWidgetId) {
    console.log("onloadTurnstileCallback: Widget already seems rendered.");
  }
};

/**
 * Initializes the signup page
 */
function initSignupPage() {
  console.log("initSignupPage called");
  const signupForm = document.getElementById("signupForm");
  // const otpForm = document.getElementById("otpForm"); // OTP Form - Removed
  const errorMessageDiv = document.getElementById("errorMessage");
  const statusMessage = document.getElementById("statusMessage");
  const googleSignUpBtn = document.getElementById("googleSignUpBtn");
  const turnstileContainer = document.getElementById("turnstile-container"); // Updated selector

  if (!turnstileContainer) {
    // Updated check
    console.error(
      "#turnstile-container not found in the DOM. CAPTCHA cannot be rendered."
    );
  }

  // The onloadTurnstileCallback is the primary way the widget should be rendered.
  // The redundant block previously here has been removed.
  // If window.turnstile is already available and the callback hasn't fired yet (e.g. script loaded from cache before DOM ready for container),
  // the `onloadTurnstileCallback` will still execute once the script fully processes its `onload` parameter.

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      let phone = document.getElementById("phone").value.trim(); // Get phone number

      let validationErrors = [];
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email))
        validationErrors.push("L'adresse email n'est pas valide.");
      if (password !== confirmPassword)
        validationErrors.push("Les mots de passe ne correspondent pas.");
      const passwordComplexityPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordComplexityPattern.test(password) || password.length < 8)
        validationErrors.push("Le format du mot de passe est invalide.");
      if (!phone) validationErrors.push("Le numéro de téléphone est requis.");
      // Basic phone validation (you might want a more robust one)
      const phonePattern = /^(0|\+33)[1-9]\d{8}$/; // Example: 0612345678 or +33612345678
      if (phone && !phonePattern.test(phone))
        validationErrors.push(
          "Le format du numéro de téléphone est invalide (ex: 0612345678 ou +33612345678)."
        );

      if (!captchaToken) {
        // Check if captcha is solved
        validationErrors.push("Veuillez compléter le CAPTCHA.");
      }

      if (validationErrors.length > 0) {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(validationErrors.join("<br>"));
        return;
      }

      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("signupBtn", "signupSpinner");
      try {
        let e164Phone = phone;
        if (phone.startsWith("0")) {
          e164Phone = `+33${phone.substring(1)}`;
        }

        // Step 1: Sign up with email and password
        const { data, error: signUpError } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.auth.signUp({
          email,
          password,
          options: { captchaToken }, // Pass captcha token
        });

        if (signUpError) throw signUpError;
        if (!data.user)
          throw new Error("Erreur lors de la création de l'utilisateur.");

        if (e164Phone && data.user.id) {
          await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase
            .from("profiles")
            .update({ phone: e164Phone })
            .eq("id", data.user.id);
        }

        // User created. Now update their profile with the phone number if provided.
        let successMessage =
          "Compte créé ! Un email de confirmation a été envoyé.";
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showStatus)(successMessage, "success");

        // Hide the form and reset it
        if (signupForm) {
          signupForm.classList.add("hidden"); // Hide the form
          signupForm.reset();
        }
      } catch (error) {
        console.error("Email/Password Signup error:", error);
        let displayError = error.message || "Une erreur est survenue.";
        if (
          error.message &&
          error.message.includes("User already registered")
        ) {
          displayError =
            "Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse.";
        } else if (
          error.message &&
          error.message.includes("Unable to validate phone number")
        ) {
          displayError = "Le numéro de téléphone fourni n'est pas valide.";
        } else if (
          error.message &&
          error.message.toLowerCase().includes("captcha protection")
        ) {
          displayError =
            "Erreur CAPTCHA du serveur. Veuillez réessayer. (" +
            error.message +
            ")";
        }
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(displayError);
      } finally {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("signupBtn", "signupSpinner");
        if (window.turnstile && turnstileWidgetId) {
          window.turnstile.reset(turnstileWidgetId);
          console.log("Turnstile widget has been reset.");
        }
        captchaToken = null; // Clear token after use
      }
    });
  } else {
    console.error("Signup form (signupForm) not found.");
  }

  if (googleSignUpBtn) {
    googleSignUpBtn.addEventListener("click", async () => {
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("googleSignUpBtn", "googleSignUpSpinner");
      try {
        const { error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/profile.html` },
        });
        if (error) {
          console.error("Error signing up with Google:", error);
          (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(
            error.message || "Erreur lors de l'inscription avec Google."
          );
        }
      } catch (error) {
        console.error("Exception during Google sign-up:", error);
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(
          "Une exception est survenue lors de l'inscription avec Google."
        );
      } finally {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("googleSignUpBtn", "googleSignUpSpinner");
      }
    });
  } else {
    console.warn("Google Sign-Up button (googleSignUpBtn) not found.");
  }
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  initSignupPage,
});


/***/ }),

/***/ "./src/js/entries/signup.js":
/*!**********************************!*\
  !*** ./src/js/entries/signup.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

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
/******/ 			"signup": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_supabase_supabase-js_dist_module_index_js"], () => (__webpack_require__("./src/js/entries/signup.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2lnbnVwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVpRDs7QUFFakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxrQkFBa0I7QUFDL0I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBLE1BQU0sUUFBUSx5REFBUTs7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLHNCQUFzQixRQUFRLHlEQUFROztBQUVsRDtBQUNBO0FBQ0E7QUFDQSxZQUFZLHlEQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWEsc0JBQXNCO0FBQ25DO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ087QUFDUDtBQUNBO0FBQ0EsVUFBVSx5REFBUTs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYSxrQkFBa0I7QUFDL0I7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLGtCQUFrQjtBQUMvQjtBQUNPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0EsRUFBRSx5REFBUTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLHlDQUF5QyxLQUFLO0FBQzlDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDeFVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU0RTtBQUMzQjs7QUFFakQ7QUFDQSx5QkFBeUI7QUFDekIsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFVLG1EQUFTLG9CQUFvQixJQUFJO0FBQzNDLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBUztBQUNqQixRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU0sbURBQVM7QUFDZjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RTs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7O0FBRWpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsRUFBRSxJQUFJO0FBQ25EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxtREFBUztBQUNqQjtBQUNBOztBQUVBLE1BQU0scURBQVc7QUFDakI7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1CQUFtQjtBQUMvQzs7QUFFQTtBQUNBLGdCQUFnQiwyQkFBMkIsUUFBUSx5REFBUTtBQUMzRDtBQUNBO0FBQ0EscUJBQXFCLGNBQWM7QUFDbkMsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IseURBQVE7QUFDeEI7QUFDQSxzQkFBc0Isa0JBQWtCO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvREFBVTs7QUFFbEI7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQVM7QUFDakIsUUFBUTtBQUNSLFFBQVEscURBQVc7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0scURBQVc7QUFDakI7QUFDQSxnQkFBZ0IsUUFBUSxRQUFRLHlEQUFRO0FBQ3hDO0FBQ0EscUJBQXFCLGVBQWUsdUJBQXVCLGdCQUFnQjtBQUMzRSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVUsbURBQVM7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUSxtREFBUztBQUNqQjtBQUNBO0FBQ0EsUUFBUTtBQUNSLFFBQVEscURBQVc7QUFDbkI7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxzRUFBZTtBQUNmO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7QUM5T0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ21EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQSxFQUFFLCtEQUFjOztBQUVoQjtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2hCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXFEOztBQUVyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGVBQWUsbUVBQVk7O0FBRXBCOzs7Ozs7O1VDekJQO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esc0RBQXNEO1dBQ3RELHNDQUFzQyxpRUFBaUU7V0FDdkc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGOzs7OztXQ1JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx1QkFBdUIsNEJBQTRCO1dBQ25EO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixvQkFBb0I7V0FDckM7V0FDQSxtR0FBbUcsWUFBWTtXQUMvRztXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLG1FQUFtRSxpQ0FBaUM7V0FDcEc7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDekNBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQzs7V0FFakM7V0FDQTtXQUNBO1dBQ0EsS0FBSztXQUNMLGVBQWU7V0FDZjtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRXJGQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL2F1dGguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL3NpZ251cC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2VudHJpZXMvc2lnbnVwLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvc3VwYWJhc2UtY2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2F1dGgvYXV0aC5qc1xuLyoqXG4gKiBBdXRoZW50aWNhdGlvbiBNb2R1bGUgLSBCYXNlXG4gKiBAbW9kdWxlIGF1dGhcbiAqIEBkZXNjcmlwdGlvbiBCYXNlIG1vZHVsZSBmb3IgYXV0aGVudGljYXRpb24gd2l0aCBjb21tb24gZnVuY3Rpb25zIGFuZCBjb25maWd1cmF0aW9uXG4gKiBAdmVyc2lvbiAwLjAuNVxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjUgKDIwMjUtMDUtMTUpOiBBZGRlZCBzZXNzaW9uIHZhbGlkYXRpb24gYW5kIHByb3RlY3Rpb24gYWdhaW5zdCBzdGFsZSBzZXNzaW9ucy5cbiAqIC0gMC4wLjQgKDIwMjUtMDUtMTUpOiBSZW1vdmFsIG9mIEZpcmViYXNlIENsb3VkIEZ1bmN0aW9ucyBjb25zdGFudHMuXG4gKiAtIDAuMC4zICgyMDI1LTA1LTEzKTogTW9kaWZpZWQgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlIG1hbmFnZW1lbnQgdG8gdXNlIFN1cGFiYXNlIEF1dGggc3lzdGVtLlxuICogLSAwLjAuMiAoMjAyNS0wNS0xMyk6IFJlb3JnYW5pemF0aW9uIGludG8gc2VwYXJhdGUgbW9kdWxlc1xuICogLSAwLjAuMSAoMjAyNS0wNS0wMyk6IEluaXRpYWwgY3JlYXRpb25cbiAqL1xuXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCIuLi9zdXBhYmFzZS1jbGllbnQuanNcIjtcblxuLy8gR2xvYmFsIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG5sZXQgY3VycmVudFVzZXIgPSBudWxsO1xubGV0IHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHVzZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyIC0gVXNlciBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50VXNlcih1c2VyKSB7XG4gIGN1cnJlbnRVc2VyID0gdXNlcjtcbiAgLy8gUG9zc2libGUgc3RvcmFnZSBpbiBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2VcbiAgaWYgKHVzZXIpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICB9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIGlmIHRoZSBjdXJyZW50IHNlc3Npb24gaXMgYWN0aXZlIHdpdGggU3VwYWJhc2VcbiAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBUcnVlIGlmIHNlc3Npb24gaXMgdmFsaWQsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVTZXNzaW9uKCkge1xuICB0cnkge1xuICAgIC8vIEdldCBjdXJyZW50IHNlc3Npb24gZnJvbSBTdXBhYmFzZVxuICAgIGNvbnN0IHtcbiAgICAgIGRhdGE6IHsgc2Vzc2lvbiB9LFxuICAgICAgZXJyb3I6IHNlc3Npb25FcnJvcixcbiAgICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRTZXNzaW9uKCk7XG5cbiAgICAvLyBObyBzZXNzaW9uIG9yIGVycm9yIHJldHJpZXZpbmcgc2Vzc2lvblxuICAgIGlmIChzZXNzaW9uRXJyb3IgfHwgIXNlc3Npb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm8gdmFsaWQgc2Vzc2lvbiBmb3VuZFwiKTtcbiAgICAgIHNldEN1cnJlbnRVc2VyKG51bGwpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRyeSB0byByZWZyZXNoIHRoZSB0b2tlbiB0byB2YWxpZGF0ZSBpdCB3aXRoIHRoZSBzZXJ2ZXJcbiAgICBjb25zdCB7IGVycm9yOiByZWZyZXNoRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGgucmVmcmVzaFNlc3Npb24oKTtcblxuICAgIGlmIChyZWZyZXNoRXJyb3IpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlNlc3Npb24gdmFsaWRhdGlvbiBmYWlsZWQ6XCIsIHJlZnJlc2hFcnJvcik7XG4gICAgICAvLyBGb3JjZSBjbGVhciB0aGUgaW52YWxpZCBzZXNzaW9uXG4gICAgICBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25PdXQoKTtcbiAgICAgIHNldEN1cnJlbnRVc2VyKG51bGwpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFNlc3Npb24gaXMgdmFsaWQsIHVwZGF0ZSB0aGUgY3VycmVudCB1c2VyXG4gICAgc2V0Q3VycmVudFVzZXIoc2Vzc2lvbi51c2VyKTtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJTZXNzaW9uIHZhbGlkYXRpb24gZXJyb3I6XCIsIGUpO1xuICAgIHNldEN1cnJlbnRVc2VyKG51bGwpO1xuICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgdXNlclxuICogQHBhcmFtIHtib29sZWFufSB2YWxpZGF0ZSAtIFdoZXRoZXIgdG8gdmFsaWRhdGUgdGhlIHNlc3Npb24gd2l0aCBTdXBhYmFzZVxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0fG51bGw+fSBUaGUgY3VycmVudCB1c2VyIG9yIG51bGxcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKHZhbGlkYXRlID0gdHJ1ZSkge1xuICAvLyBJZiB3ZSBuZWVkIHRvIHZhbGlkYXRlIGFuZCBoYXZlbid0IGRvbmUgc28geWV0XG4gIGlmICh2YWxpZGF0ZSAmJiAhc2Vzc2lvblZhbGlkYXRlZCkge1xuICAgIGF3YWl0IHZhbGlkYXRlU2Vzc2lvbigpO1xuICB9XG5cbiAgLy8gSWYgbm8gdmFsaWRhdGlvbiBuZWVkZWQgb3IgYWxyZWFkeSB2YWxpZGF0ZWRcbiAgaWYgKCF2YWxpZGF0ZSAmJiAhY3VycmVudFVzZXIpIHtcbiAgICAvLyBUcnkgdG8gcmV0cmlldmUgZnJvbSBzdG9yYWdlIGlmIG5vdCBpbiBtZW1vcnlcbiAgICBjb25zdCBzdG9yZWRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICBpZiAoc3RvcmVkVXNlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHN0b3JlZFVzZXIpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmV0cmlldmluZyB1c2VyOlwiLCBlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY3VycmVudFVzZXI7XG59XG5cbi8qKlxuICogU3luY2hyb25vdXMgdmVyc2lvbiBvZiBnZXRDdXJyZW50VXNlciBmb3Igbm9uLWFzeW5jIGNvbnRleHRzXG4gKiBXQVJOSU5HOiBUaGlzIG1heSByZXR1cm4gc3RhbGUgZGF0YSBpZiBzZXNzaW9uIGlzIGludmFsaWRcbiAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH0gVGhlIGN1cnJlbnQgdXNlciBvciBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50VXNlclN5bmMoKSB7XG4gIGlmICghY3VycmVudFVzZXIpIHtcbiAgICBjb25zdCBzdG9yZWRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICBpZiAoc3RvcmVkVXNlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHN0b3JlZFVzZXIpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmV0cmlldmluZyB1c2VyOlwiLCBlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY3VycmVudFVzZXI7XG59XG5cbi8qKlxuICogTG9ncyBvdXQgdGhlIHVzZXJcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nb3V0KCkge1xuICB0cnkge1xuICAgIC8vIFNpZ24gb3V0IGZyb20gU3VwYWJhc2VcbiAgICBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25PdXQoKTtcblxuICAgIC8vIENsZWFyIGxvY2FsIHN0YXRlXG4gICAgY3VycmVudFVzZXIgPSBudWxsO1xuICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuXG4gICAgLy8gUmVkaXJlY3QgdG8gdGhlIGhvbWUgcGFnZSBhZnRlciBsb2dvdXRcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkdXJpbmcgbG9nb3V0OlwiLCBlcnJvcik7XG4gICAgLy8gU3RpbGwgY2xlYXIgbG9jYWwgc3RhdGUgZXZlbiBpZiBTdXBhYmFzZSBzaWduT3V0IGZhaWxzXG4gICAgY3VycmVudFVzZXIgPSBudWxsO1xuICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluIHdpdGggdmFsaWQgc2Vzc2lvblxuICogQHBhcmFtIHtib29sZWFufSB2YWxpZGF0ZSAtIFdoZXRoZXIgdG8gdmFsaWRhdGUgd2l0aCBTdXBhYmFzZSBmaXJzdFxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFRydWUgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluIHdpdGggdmFsaWQgc2Vzc2lvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaXNMb2dnZWRJbih2YWxpZGF0ZSA9IHRydWUpIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKHZhbGlkYXRlKTtcbiAgcmV0dXJuIHVzZXIgIT09IG51bGw7XG59XG5cbi8qKlxuICogU3luY2hyb25vdXMgdmVyc2lvbiBvZiBpc0xvZ2dlZEluXG4gKiBXQVJOSU5HOiBUaGlzIG1heSByZXR1cm4gaW5jb3JyZWN0IHJlc3VsdHMgaWYgc2Vzc2lvbiBpcyBpbnZhbGlkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB1c2VyIGFwcGVhcnMgdG8gYmUgbG9nZ2VkIGluIGxvY2FsbHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTG9nZ2VkSW5TeW5jKCkge1xuICByZXR1cm4gZ2V0Q3VycmVudFVzZXJTeW5jKCkgIT09IG51bGw7XG59XG5cbi8qKlxuICogUHJvdGVjdHMgYSBwYWdlIHRoYXQgcmVxdWlyZXMgYXV0aGVudGljYXRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSByZWRpcmVjdFVybCAtIFVSTCB0byByZWRpcmVjdCBpZiBub3QgYXV0aGVudGljYXRlZFxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFRydWUgaWYgYXV0aGVudGljYXRlZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm90ZWN0UGFnZShyZWRpcmVjdFVybCA9IFwiL2xvZ2luXCIpIHtcbiAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IHZhbGlkYXRlU2Vzc2lvbigpO1xuXG4gIGlmICghaXNWYWxpZCkge1xuICAgIC8vIFJlZGlyZWN0IHRvIGxvZ2luIHBhZ2VcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VXJsO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGF1dGggb24gcGFnZSBsb2FkXG4gKiBDYWxsIHRoaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyIGFwcCBpbml0aWFsaXphdGlvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdEF1dGgoKSB7XG4gIC8vIFZhbGlkYXRlIHNlc3Npb24gb24gcGFnZSBsb2FkXG4gIGF3YWl0IHZhbGlkYXRlU2Vzc2lvbigpO1xuXG4gIC8vIFNldCB1cCBhdXRoIHN0YXRlIGNoYW5nZSBsaXN0ZW5lclxuICBzdXBhYmFzZS5hdXRoLm9uQXV0aFN0YXRlQ2hhbmdlKGFzeW5jIChldmVudCwgc2Vzc2lvbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiQXV0aCBzdGF0ZSBjaGFuZ2VkOlwiLCBldmVudCk7XG5cbiAgICBpZiAoZXZlbnQgPT09IFwiU0lHTkVEX0lOXCIgJiYgc2Vzc2lvbikge1xuICAgICAgc2V0Q3VycmVudFVzZXIoc2Vzc2lvbi51c2VyKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IFwiU0lHTkVEX09VVFwiKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIlRPS0VOX1JFRlJFU0hFRFwiKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gXCJVU0VSX1VQREFURURcIikge1xuICAgICAgc2V0Q3VycmVudFVzZXIoc2Vzc2lvbi51c2VyKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogRGlzcGxheXMgYW4gZXJyb3IgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBFcnJvciBtZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB3aGVyZSB0byBkaXNwbGF5IHRoZSBlcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1lc3NhZ2UsIGVsZW1lbnRJZCA9IFwiZXJyb3JNZXNzYWdlXCIpIHtcbiAgY29uc3QgZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVycm9yRWxlbWVudCkge1xuICAgIGVycm9yRWxlbWVudC5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBlbGVtZW50IG5vdCBmb3VuZDpcIiwgZWxlbWVudElkKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BsYXlzIGEgc3RhdHVzIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gTWVzc2FnZSB0byBkaXNwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIE1lc3NhZ2UgdHlwZSAoc3VjY2VzcywgaW5mbywgd2FybmluZywgZGFuZ2VyKVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dTdGF0dXMoXG4gIG1lc3NhZ2UsXG4gIHR5cGUgPSBcImluZm9cIixcbiAgZWxlbWVudElkID0gXCJzdGF0dXNNZXNzYWdlXCJcbikge1xuICBjb25zdCBzdGF0dXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKHN0YXR1c0VsZW1lbnQpIHtcbiAgICBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcblxuICAgIC8vIFJlbW92ZSBhbGwgYWxlcnQtKiBjbGFzc2VzXG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB7XG4gICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJhbGVydC1cIikpIHtcbiAgICAgICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgdGhlIGNsYXNzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGVcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGFsZXJ0LSR7dHlwZX1gKTtcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIlN0YXR1cyBlbGVtZW50IG5vdCBmb3VuZDpcIiwgZWxlbWVudElkKTtcbiAgfVxufVxuXG4vKipcbiAqIEhpZGVzIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB0byBoaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50SWQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbi8qKlxuICogU2hvd3MgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIHNob3dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0xvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIGlmIChzcGlubmVyKSBzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG59XG5cbi8qKlxuICogSGlkZXMgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWQgLSBJRCBvZiB0aGUgYnV0dG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3Bpbm5lcklkIC0gSUQgb2YgdGhlIHNwaW5uZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVMb2FkaW5nKGJ1dHRvbklkLCBzcGlubmVySWQpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3Bpbm5lcklkKTtcblxuICBpZiAoYnV0dG9uKSBidXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn1cblxuLy8gRXhwb3J0IHRoZSBuZWNlc3NhcnkgZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXNcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q3VycmVudFVzZXIsXG4gIGdldEN1cnJlbnRVc2VyU3luYyxcbiAgc2V0Q3VycmVudFVzZXIsXG4gIGxvZ291dCxcbiAgaXNMb2dnZWRJbixcbiAgaXNMb2dnZWRJblN5bmMsXG4gIHZhbGlkYXRlU2Vzc2lvbixcbiAgcHJvdGVjdFBhZ2UsXG4gIGluaXRBdXRoLFxuICBzaG93RXJyb3IsXG4gIHNob3dTdGF0dXMsXG4gIGhpZGVFbGVtZW50LFxuICBzaG93RWxlbWVudCxcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufTtcbiIsIi8vIHNyYy9hdXRoL3NpZ251cC5qc1xuLyoqXG4gKiBTaWdudXAgTW9kdWxlXG4gKiBAbW9kdWxlIHNpZ251cFxuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdXNlciByZWdpc3RyYXRpb24gd2l0aCBjbGllbnQtc2lkZSB2YWxpZGF0aW9uLCBHb29nbGUgT0F1dGgsIGFuZCBwaG9uZSB2ZXJpZmljYXRpb24gdXNpbmcgU3VwYWJhc2UuXG4gKiBAdmVyc2lvbiAwLjIuMVxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4yLjEgKDIwMjUtMDUtMTgpOiBBZGRlZCBjYXB0Y2hhIHdpdGggQ2xvdWRmbGFyZSBUdXJuc3RpbGUuXG4gKiAtIDAuMi4wICgyMDI1LTA1LTE4KTogQWRkZWQgcGhvbmUgbnVtYmVyIGlucHV0LCBPVFAgc2VuZGluZyBhbmQgdmVyaWZpY2F0aW9uIGZvciBlbWFpbC9wYXNzd29yZCBzaWdudXAuXG4gKiAtIDAuMS4xICgyMDI1LTA1LTE4KTogQWRkZWQgR29vZ2xlIFNpZ24tVXAgZnVuY3Rpb25hbGl0eS5cbiAqIC0gMC4xLjAgKDIwMjUtMDUtMTUpOiBNaWdyYXRlZCB0byBTdXBhYmFzZSBjbGllbnQtc2lkZSBhdXRoICh2ZXJzaW9uaW5nIGFkanVzdGVkKVxuICovXG5cbmltcG9ydCB7IHNob3dFcnJvciwgc2hvd1N0YXR1cywgc2hvd0xvYWRpbmcsIGhpZGVMb2FkaW5nIH0gZnJvbSBcIi4vYXV0aC5qc1wiO1xuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiLi4vc3VwYWJhc2UtY2xpZW50LmpzXCI7XG5cbi8vIFN0b3JlIHBob25lIG51bWJlciB0ZW1wb3JhcmlseSBiZXR3ZWVuIHN0ZXBzXG5sZXQgY2FwdGNoYVRva2VuID0gbnVsbDsgLy8gVG8gc3RvcmUgdGhlIGNhcHRjaGEgdG9rZW4gKHVzZWQgYnkgYm90aCBoQ2FwdGNoYSBhbmQgVHVybnN0aWxlKVxubGV0IHR1cm5zdGlsZVdpZGdldElkID0gbnVsbDsgLy8gVG8gc3RvcmUgVHVybnN0aWxlIHdpZGdldCBJRFxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBDbG91ZGZsYXJlIFR1cm5zdGlsZSBzY3JpcHQgb25jZSBpdCdzIGxvYWRlZFxuLy8gKGR1ZSB0byAmb25sb2FkPW9ubG9hZFR1cm5zdGlsZUNhbGxiYWNrIGluIHRoZSBzY3JpcHQgdGFnIGluIHNpZ251cC5odG1sKVxud2luZG93Lm9ubG9hZFR1cm5zdGlsZUNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmxvZyhcIlR1cm5zdGlsZSBBUEkgcmVhZHkgKG9ubG9hZFR1cm5zdGlsZUNhbGxiYWNrIGV4ZWN1dGVkKS5cIik7XG4gIGNvbnN0IHR1cm5zdGlsZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybnN0aWxlLWNvbnRhaW5lclwiKTtcblxuICBpZiAodHVybnN0aWxlQ29udGFpbmVyICYmIHdpbmRvdy50dXJuc3RpbGUgJiYgIXR1cm5zdGlsZVdpZGdldElkKSB7XG4gICAgY29uc29sZS5sb2coXCJSZW5kZXJpbmcgVHVybnN0aWxlIHdpZGdldCBmcm9tIG9ubG9hZFR1cm5zdGlsZUNhbGxiYWNrLi4uXCIpO1xuICAgIHRyeSB7XG4gICAgICB0dXJuc3RpbGVXaWRnZXRJZCA9IHdpbmRvdy50dXJuc3RpbGUucmVuZGVyKHR1cm5zdGlsZUNvbnRhaW5lciwge1xuICAgICAgICBzaXRla2V5OiBcIjB4NEFBQUFBQUJkelkzSW5PVTJfSW45OVwiLFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgY2FwdGNoYVRva2VuID0gdG9rZW47XG4gICAgICAgICAgY29uc29sZS5sb2coXCJUdXJuc3RpbGUgdG9rZW4gb2J0YWluZWQ6XCIsIHRva2VuKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJleHBpcmVkLWNhbGxiYWNrXCI6ICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIFwiVHVybnN0aWxlIHRva2VuIGV4cGlyZWQuIFJlc2V0dGluZyB3aWRnZXQuIElEOlwiLFxuICAgICAgICAgICAgdHVybnN0aWxlV2lkZ2V0SWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICh3aW5kb3cudHVybnN0aWxlICYmIHR1cm5zdGlsZVdpZGdldElkKSB7XG4gICAgICAgICAgICB3aW5kb3cudHVybnN0aWxlLnJlc2V0KHR1cm5zdGlsZVdpZGdldElkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FwdGNoYVRva2VuID0gbnVsbDsgLy8gQ2xlYXIgdGhlIHRva2VuXG4gICAgICAgICAgLy8gV2lkZ2V0IHNob3VsZCBiZSByZWFkeSBmb3IgYSBuZXcgY2hhbGxlbmdlIGFmdGVyIHJlc2V0LlxuICAgICAgICB9LFxuICAgICAgICBcImVycm9yLWNhbGxiYWNrXCI6IChlcnIpID0+IHtcbiAgICAgICAgICBjYXB0Y2hhVG9rZW4gPSBudWxsO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUdXJuc3RpbGUgZXJyb3IgY2FsbGJhY2s6XCIsIGVycik7XG4gICAgICAgICAgc2hvd0Vycm9yKGBFcnJldXIgQ0FQVENIQTogJHtlcnJ9LiBWZXVpbGxleiByw6llc3NheWVyLmApO1xuICAgICAgICB9LFxuICAgICAgICAvLyB0aGVtZTogJ2xpZ2h0JywgLy8gT3B0aW9uYWw6ICdsaWdodCcsICdkYXJrJywgb3IgJ2F1dG8nXG4gICAgICAgIC8vIGxhbmd1YWdlOiAnZnInLCAvLyBPcHRpb25hbDogc3BlY2lmeSBsYW5ndWFnZVxuICAgICAgfSk7XG4gICAgICBpZiAodHVybnN0aWxlV2lkZ2V0SWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiVHVybnN0aWxlLnJlbmRlciBkaWQgbm90IHJldHVybiBhIHdpZGdldElkLiBTaXRla2V5IG9yIGNvbnRhaW5lciBpc3N1ZT9cIlxuICAgICAgICApO1xuICAgICAgICBzaG93RXJyb3IoXCJFcnJldXIgaW5pdGlhbGlzYXRpb24gQ0FQVENIQSAoSUQgd2lkZ2V0IG5vbiByZXRvdXJuw6kpLlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVHVybnN0aWxlIHdpZGdldCByZW5kZXJlZC4gSUQ6XCIsIHR1cm5zdGlsZVdpZGdldElkKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmVuZGVyaW5nIFR1cm5zdGlsZTpcIiwgZSk7XG4gICAgICBzaG93RXJyb3IoXCJJbXBvc3NpYmxlIGQnYWZmaWNoZXIgbGUgQ0FQVENIQS5cIik7XG4gICAgfVxuICB9IGVsc2UgaWYgKCF0dXJuc3RpbGVDb250YWluZXIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwib25sb2FkVHVybnN0aWxlQ2FsbGJhY2s6ICN0dXJuc3RpbGUtY29udGFpbmVyIG5vdCBmb3VuZC5cIik7XG4gIH0gZWxzZSBpZiAoIXdpbmRvdy50dXJuc3RpbGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwib25sb2FkVHVybnN0aWxlQ2FsbGJhY2s6IHdpbmRvdy50dXJuc3RpbGUgQVBJIG5vdCBmb3VuZC5cIik7XG4gIH0gZWxzZSBpZiAodHVybnN0aWxlV2lkZ2V0SWQpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9ubG9hZFR1cm5zdGlsZUNhbGxiYWNrOiBXaWRnZXQgYWxyZWFkeSBzZWVtcyByZW5kZXJlZC5cIik7XG4gIH1cbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIHNpZ251cCBwYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0U2lnbnVwUGFnZSgpIHtcbiAgY29uc29sZS5sb2coXCJpbml0U2lnbnVwUGFnZSBjYWxsZWRcIik7XG4gIGNvbnN0IHNpZ251cEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ251cEZvcm1cIik7XG4gIC8vIGNvbnN0IG90cEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm90cEZvcm1cIik7IC8vIE9UUCBGb3JtIC0gUmVtb3ZlZFxuICBjb25zdCBlcnJvck1lc3NhZ2VEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yTWVzc2FnZVwiKTtcbiAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcbiAgY29uc3QgZ29vZ2xlU2lnblVwQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnb29nbGVTaWduVXBCdG5cIik7XG4gIGNvbnN0IHR1cm5zdGlsZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybnN0aWxlLWNvbnRhaW5lclwiKTsgLy8gVXBkYXRlZCBzZWxlY3RvclxuXG4gIGlmICghdHVybnN0aWxlQ29udGFpbmVyKSB7XG4gICAgLy8gVXBkYXRlZCBjaGVja1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBcIiN0dXJuc3RpbGUtY29udGFpbmVyIG5vdCBmb3VuZCBpbiB0aGUgRE9NLiBDQVBUQ0hBIGNhbm5vdCBiZSByZW5kZXJlZC5cIlxuICAgICk7XG4gIH1cblxuICAvLyBUaGUgb25sb2FkVHVybnN0aWxlQ2FsbGJhY2sgaXMgdGhlIHByaW1hcnkgd2F5IHRoZSB3aWRnZXQgc2hvdWxkIGJlIHJlbmRlcmVkLlxuICAvLyBUaGUgcmVkdW5kYW50IGJsb2NrIHByZXZpb3VzbHkgaGVyZSBoYXMgYmVlbiByZW1vdmVkLlxuICAvLyBJZiB3aW5kb3cudHVybnN0aWxlIGlzIGFscmVhZHkgYXZhaWxhYmxlIGFuZCB0aGUgY2FsbGJhY2sgaGFzbid0IGZpcmVkIHlldCAoZS5nLiBzY3JpcHQgbG9hZGVkIGZyb20gY2FjaGUgYmVmb3JlIERPTSByZWFkeSBmb3IgY29udGFpbmVyKSxcbiAgLy8gdGhlIGBvbmxvYWRUdXJuc3RpbGVDYWxsYmFja2Agd2lsbCBzdGlsbCBleGVjdXRlIG9uY2UgdGhlIHNjcmlwdCBmdWxseSBwcm9jZXNzZXMgaXRzIGBvbmxvYWRgIHBhcmFtZXRlci5cblxuICBpZiAoc2lnbnVwRm9ybSkge1xuICAgIHNpZ251cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWUudHJpbSgpO1xuICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuICAgICAgY29uc3QgY29uZmlybVBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25maXJtUGFzc3dvcmRcIikudmFsdWU7XG4gICAgICBsZXQgcGhvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBob25lXCIpLnZhbHVlLnRyaW0oKTsgLy8gR2V0IHBob25lIG51bWJlclxuXG4gICAgICBsZXQgdmFsaWRhdGlvbkVycm9ycyA9IFtdO1xuICAgICAgY29uc3QgZW1haWxQYXR0ZXJuID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XG4gICAgICBpZiAoIWVtYWlsUGF0dGVybi50ZXN0KGVtYWlsKSlcbiAgICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKFwiTCdhZHJlc3NlIGVtYWlsIG4nZXN0IHBhcyB2YWxpZGUuXCIpO1xuICAgICAgaWYgKHBhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpXG4gICAgICAgIHZhbGlkYXRpb25FcnJvcnMucHVzaChcIkxlcyBtb3RzIGRlIHBhc3NlIG5lIGNvcnJlc3BvbmRlbnQgcGFzLlwiKTtcbiAgICAgIGNvbnN0IHBhc3N3b3JkQ29tcGxleGl0eVBhdHRlcm4gPSAvXig/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKlxcZCkuKyQvO1xuICAgICAgaWYgKCFwYXNzd29yZENvbXBsZXhpdHlQYXR0ZXJuLnRlc3QocGFzc3dvcmQpIHx8IHBhc3N3b3JkLmxlbmd0aCA8IDgpXG4gICAgICAgIHZhbGlkYXRpb25FcnJvcnMucHVzaChcIkxlIGZvcm1hdCBkdSBtb3QgZGUgcGFzc2UgZXN0IGludmFsaWRlLlwiKTtcbiAgICAgIGlmICghcGhvbmUpIHZhbGlkYXRpb25FcnJvcnMucHVzaChcIkxlIG51bcOpcm8gZGUgdMOpbMOpcGhvbmUgZXN0IHJlcXVpcy5cIik7XG4gICAgICAvLyBCYXNpYyBwaG9uZSB2YWxpZGF0aW9uICh5b3UgbWlnaHQgd2FudCBhIG1vcmUgcm9idXN0IG9uZSlcbiAgICAgIGNvbnN0IHBob25lUGF0dGVybiA9IC9eKDB8XFwrMzMpWzEtOV1cXGR7OH0kLzsgLy8gRXhhbXBsZTogMDYxMjM0NTY3OCBvciArMzM2MTIzNDU2NzhcbiAgICAgIGlmIChwaG9uZSAmJiAhcGhvbmVQYXR0ZXJuLnRlc3QocGhvbmUpKVxuICAgICAgICB2YWxpZGF0aW9uRXJyb3JzLnB1c2goXG4gICAgICAgICAgXCJMZSBmb3JtYXQgZHUgbnVtw6lybyBkZSB0w6lsw6lwaG9uZSBlc3QgaW52YWxpZGUgKGV4OiAwNjEyMzQ1Njc4IG91ICszMzYxMjM0NTY3OCkuXCJcbiAgICAgICAgKTtcblxuICAgICAgaWYgKCFjYXB0Y2hhVG9rZW4pIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgY2FwdGNoYSBpcyBzb2x2ZWRcbiAgICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKFwiVmV1aWxsZXogY29tcGzDqXRlciBsZSBDQVBUQ0hBLlwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbGlkYXRpb25FcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBzaG93RXJyb3IodmFsaWRhdGlvbkVycm9ycy5qb2luKFwiPGJyPlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2hvd0xvYWRpbmcoXCJzaWdudXBCdG5cIiwgXCJzaWdudXBTcGlubmVyXCIpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IGUxNjRQaG9uZSA9IHBob25lO1xuICAgICAgICBpZiAocGhvbmUuc3RhcnRzV2l0aChcIjBcIikpIHtcbiAgICAgICAgICBlMTY0UGhvbmUgPSBgKzMzJHtwaG9uZS5zdWJzdHJpbmcoMSl9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0ZXAgMTogU2lnbiB1cCB3aXRoIGVtYWlsIGFuZCBwYXNzd29yZFxuICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yOiBzaWduVXBFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduVXAoe1xuICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgIG9wdGlvbnM6IHsgY2FwdGNoYVRva2VuIH0sIC8vIFBhc3MgY2FwdGNoYSB0b2tlblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2lnblVwRXJyb3IpIHRocm93IHNpZ25VcEVycm9yO1xuICAgICAgICBpZiAoIWRhdGEudXNlcilcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSBjcsOpYXRpb24gZGUgbCd1dGlsaXNhdGV1ci5cIik7XG5cbiAgICAgICAgaWYgKGUxNjRQaG9uZSAmJiBkYXRhLnVzZXIuaWQpIHtcbiAgICAgICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgICAgLmZyb20oXCJwcm9maWxlc1wiKVxuICAgICAgICAgICAgLnVwZGF0ZSh7IHBob25lOiBlMTY0UGhvbmUgfSlcbiAgICAgICAgICAgIC5lcShcImlkXCIsIGRhdGEudXNlci5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVc2VyIGNyZWF0ZWQuIE5vdyB1cGRhdGUgdGhlaXIgcHJvZmlsZSB3aXRoIHRoZSBwaG9uZSBudW1iZXIgaWYgcHJvdmlkZWQuXG4gICAgICAgIGxldCBzdWNjZXNzTWVzc2FnZSA9XG4gICAgICAgICAgXCJDb21wdGUgY3LDqcOpICEgVW4gZW1haWwgZGUgY29uZmlybWF0aW9uIGEgw6l0w6kgZW52b3nDqS5cIjtcbiAgICAgICAgc2hvd1N0YXR1cyhzdWNjZXNzTWVzc2FnZSwgXCJzdWNjZXNzXCIpO1xuXG4gICAgICAgIC8vIEhpZGUgdGhlIGZvcm0gYW5kIHJlc2V0IGl0XG4gICAgICAgIGlmIChzaWdudXBGb3JtKSB7XG4gICAgICAgICAgc2lnbnVwRm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpOyAvLyBIaWRlIHRoZSBmb3JtXG4gICAgICAgICAgc2lnbnVwRm9ybS5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRW1haWwvUGFzc3dvcmQgU2lnbnVwIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIGxldCBkaXNwbGF5RXJyb3IgPSBlcnJvci5tZXNzYWdlIHx8IFwiVW5lIGVycmV1ciBlc3Qgc3VydmVudWUuXCI7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBlcnJvci5tZXNzYWdlICYmXG4gICAgICAgICAgZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIlVzZXIgYWxyZWFkeSByZWdpc3RlcmVkXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGRpc3BsYXlFcnJvciA9XG4gICAgICAgICAgICBcIkNldHRlIGFkcmVzc2UgZW1haWwgZXN0IGTDqWrDoCB1dGlsaXPDqWUuIFZldWlsbGV6IHZvdXMgY29ubmVjdGVyIG91IHV0aWxpc2VyIHVuZSBhdXRyZSBhZHJlc3NlLlwiO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgJiZcbiAgICAgICAgICBlcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiVW5hYmxlIHRvIHZhbGlkYXRlIHBob25lIG51bWJlclwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBkaXNwbGF5RXJyb3IgPSBcIkxlIG51bcOpcm8gZGUgdMOpbMOpcGhvbmUgZm91cm5pIG4nZXN0IHBhcyB2YWxpZGUuXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgZXJyb3IubWVzc2FnZSAmJlxuICAgICAgICAgIGVycm9yLm1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImNhcHRjaGEgcHJvdGVjdGlvblwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBkaXNwbGF5RXJyb3IgPVxuICAgICAgICAgICAgXCJFcnJldXIgQ0FQVENIQSBkdSBzZXJ2ZXVyLiBWZXVpbGxleiByw6llc3NheWVyLiAoXCIgK1xuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSArXG4gICAgICAgICAgICBcIilcIjtcbiAgICAgICAgfVxuICAgICAgICBzaG93RXJyb3IoZGlzcGxheUVycm9yKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGhpZGVMb2FkaW5nKFwic2lnbnVwQnRuXCIsIFwic2lnbnVwU3Bpbm5lclwiKTtcbiAgICAgICAgaWYgKHdpbmRvdy50dXJuc3RpbGUgJiYgdHVybnN0aWxlV2lkZ2V0SWQpIHtcbiAgICAgICAgICB3aW5kb3cudHVybnN0aWxlLnJlc2V0KHR1cm5zdGlsZVdpZGdldElkKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlR1cm5zdGlsZSB3aWRnZXQgaGFzIGJlZW4gcmVzZXQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhcHRjaGFUb2tlbiA9IG51bGw7IC8vIENsZWFyIHRva2VuIGFmdGVyIHVzZVxuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJTaWdudXAgZm9ybSAoc2lnbnVwRm9ybSkgbm90IGZvdW5kLlwiKTtcbiAgfVxuXG4gIGlmIChnb29nbGVTaWduVXBCdG4pIHtcbiAgICBnb29nbGVTaWduVXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIHNob3dMb2FkaW5nKFwiZ29vZ2xlU2lnblVwQnRuXCIsIFwiZ29vZ2xlU2lnblVwU3Bpbm5lclwiKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbkluV2l0aE9BdXRoKHtcbiAgICAgICAgICBwcm92aWRlcjogXCJnb29nbGVcIixcbiAgICAgICAgICBvcHRpb25zOiB7IHJlZGlyZWN0VG86IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L3Byb2ZpbGUuaHRtbGAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzaWduaW5nIHVwIHdpdGggR29vZ2xlOlwiLCBlcnJvcik7XG4gICAgICAgICAgc2hvd0Vycm9yKFxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBcIkVycmV1ciBsb3JzIGRlIGwnaW5zY3JpcHRpb24gYXZlYyBHb29nbGUuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXhjZXB0aW9uIGR1cmluZyBHb29nbGUgc2lnbi11cDpcIiwgZXJyb3IpO1xuICAgICAgICBzaG93RXJyb3IoXG4gICAgICAgICAgXCJVbmUgZXhjZXB0aW9uIGVzdCBzdXJ2ZW51ZSBsb3JzIGRlIGwnaW5zY3JpcHRpb24gYXZlYyBHb29nbGUuXCJcbiAgICAgICAgKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGhpZGVMb2FkaW5nKFwiZ29vZ2xlU2lnblVwQnRuXCIsIFwiZ29vZ2xlU2lnblVwU3Bpbm5lclwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLndhcm4oXCJHb29nbGUgU2lnbi1VcCBidXR0b24gKGdvb2dsZVNpZ25VcEJ0bikgbm90IGZvdW5kLlwiKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRTaWdudXBQYWdlLFxufTtcbiIsIi8vIHNyYy9lbnRyaWVzL3NpZ251cC5qc1xuLyoqXG4gKiBTaWdudXAgRW50cnkgUG9pbnRcbiAqXG4gKiBUaGlzIG1vZHVsZSBzZXJ2ZXMgYXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgc2lnbnVwIHBhZ2UuXG4gKi9cblxuLy8gSW1wb3J0IG91ciBzaWdudXAgbW9kdWxlXG5pbXBvcnQgeyBpbml0U2lnbnVwUGFnZSB9IGZyb20gXCIuLi9hdXRoL3NpZ251cC5qc1wiO1xuXG4vLyBJbml0aWFsaXplIHNpZ251cCBwYWdlIHdoZW4gRE9NIGlzIGxvYWRlZFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAvLyBJbml0aWFsaXplIHNpZ251cCBwYWdlXG4gIGluaXRTaWdudXBQYWdlKCk7XG5cbiAgY29uc29sZS5sb2coXCJTaWdudXAgcGFnZSBpbml0aWFsaXplZFwiKTtcbn0pO1xuIiwiLy8gc3JjL2pzL3N1cGFiYXNlLWNsaWVudC5qc1xuLyoqXG4gKiBTdXBhYmFzZSBDbGllbnRcbiAqIEBtb2R1bGUgc3VwYWJhc2UtY2xpZW50XG4gKiBAZGVzY3JpcHRpb24gVGhpcyBtb2R1bGUgaGFuZGxlcyB0aGUgU3VwYWJhc2UgY2xpZW50IGluaXRpYWxpemF0aW9uIGFuZCBjb25maWd1cmF0aW9uLlxuICogQHZlcnNpb24gMC4wLjJcbiAqIEBhdXRob3IgR3JleVBhbmRhXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuMiAoMjAyNS0wNS0yNyk6IEFkZGVkIGVudmlyb25lbWVudCB2YXJpYWJsZXMgZXJyb3IgaGFuZGxpbmcgZm9yIG1pc3NpbmcuXG4gKiAtIDAuMC4xICgyMDI1LTA1LTA5KTogSW5pdGlhbCB2ZXJzaW9uIHdpdGggYmFzaWMgU3VwYWJhc2UgY2xpZW50IGluaXRpYWxpemF0aW9uLlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcblxuY29uc3Qgc3VwYWJhc2VVcmwgPSBcImh0dHBzOi8vb2ZleXNzaXBpYmt0bWJmZWJpYm8uc3VwYWJhc2UuY29cIjtcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9XG4gIFwiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW05bVpYbHpjMmx3YVdKcmRHMWlabVZpYVdKdklpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzTkRNNU1qVXdPVFFzSW1WNGNDSTZNakExT1RVd01UQTVOSDAudzcxQ0FLZm9sa3R6UmwtVG1MVmhIWWFFYmhDZlZrNEE3WXJhRVVDZ2xyVVwiO1xuXG5pZiAoIXN1cGFiYXNlVXJsIHx8ICFzdXBhYmFzZUFub25LZXkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBTdXBhYmFzZSBlbnZpcm9ubWVudCB2YXJpYWJsZXNcIik7XG59XG5cbmNvbnN0IGNsaWVudCA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VBbm9uS2V5KTtcblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY2xpZW50O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwianMvXCIgKyBjaHVua0lkICsgXCIuYnVuZGxlLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcInVyYmFuZG9jc193ZWJhcHA6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoL15ibG9iOi8sIFwiXCIpLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybCArIFwiLi4vXCI7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwic2lnbnVwXCI6IDBcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uZi5qID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSA/IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA6IHVuZGVmaW5lZDtcblx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cblx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG5cdFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiAoaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF0pKTtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG5cdFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuXHRcdFx0XHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCk7XG5cdFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdFx0XHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpKSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhWzFdKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkLCBcImNodW5rLVwiICsgY2h1bmtJZCwgY2h1bmtJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG59O1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt1cmJhbmRvY3Nfd2ViYXBwXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3VyYmFuZG9jc193ZWJhcHBcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3N1cGFiYXNlX3N1cGFiYXNlLWpzX2Rpc3RfbW9kdWxlX2luZGV4X2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL2VudHJpZXMvc2lnbnVwLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=