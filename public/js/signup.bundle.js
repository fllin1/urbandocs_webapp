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
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZXlzc2lwaWJrdG1iZmViaWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjUwOTQsImV4cCI6MjA1OTUwMTA5NH0.w71CAKfolktzRl-TmLVhHYaEbhCfVk4A7YraEUCglrU";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVyRkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9hdXRoLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9zaWdudXAuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9lbnRyaWVzL3NpZ251cC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3N1cGFiYXNlLWNsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9hdXRoL2F1dGguanNcbi8qKlxuICogQXV0aGVudGljYXRpb24gTW9kdWxlIC0gQmFzZVxuICogQG1vZHVsZSBhdXRoXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBtb2R1bGUgZm9yIGF1dGhlbnRpY2F0aW9uIHdpdGggY29tbW9uIGZ1bmN0aW9ucyBhbmQgY29uZmlndXJhdGlvblxuICogQHZlcnNpb24gMC4wLjVcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC41ICgyMDI1LTA1LTE1KTogQWRkZWQgc2Vzc2lvbiB2YWxpZGF0aW9uIGFuZCBwcm90ZWN0aW9uIGFnYWluc3Qgc3RhbGUgc2Vzc2lvbnMuXG4gKiAtIDAuMC40ICgyMDI1LTA1LTE1KTogUmVtb3ZhbCBvZiBGaXJlYmFzZSBDbG91ZCBGdW5jdGlvbnMgY29uc3RhbnRzLlxuICogLSAwLjAuMyAoMjAyNS0wNS0xMyk6IE1vZGlmaWVkIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0ZSBtYW5hZ2VtZW50IHRvIHVzZSBTdXBhYmFzZSBBdXRoIHN5c3RlbS5cbiAqIC0gMC4wLjIgKDIwMjUtMDUtMTMpOiBSZW9yZ2FuaXphdGlvbiBpbnRvIHNlcGFyYXRlIG1vZHVsZXNcbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDMpOiBJbml0aWFsIGNyZWF0aW9uXG4gKi9cblxuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiLi4vc3VwYWJhc2UtY2xpZW50LmpzXCI7XG5cbi8vIEdsb2JhbCBhdXRoZW50aWNhdGlvbiBzdGF0ZVxubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcbmxldCBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG5cbi8qKlxuICogU2V0cyB0aGUgY3VycmVudCB1c2VyXG4gKiBAcGFyYW0ge09iamVjdH0gdXNlciAtIFVzZXIgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFVzZXIodXNlcikge1xuICBjdXJyZW50VXNlciA9IHVzZXI7XG4gIC8vIFBvc3NpYmxlIHN0b3JhZ2UgaW4gbG9jYWxTdG9yYWdlL3Nlc3Npb25TdG9yYWdlXG4gIGlmICh1c2VyKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyBpZiB0aGUgY3VycmVudCBzZXNzaW9uIGlzIGFjdGl2ZSB3aXRoIFN1cGFiYXNlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gVHJ1ZSBpZiBzZXNzaW9uIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2Vzc2lvbigpIHtcbiAgdHJ5IHtcbiAgICAvLyBHZXQgY3VycmVudCBzZXNzaW9uIGZyb20gU3VwYWJhc2VcbiAgICBjb25zdCB7XG4gICAgICBkYXRhOiB7IHNlc3Npb24gfSxcbiAgICAgIGVycm9yOiBzZXNzaW9uRXJyb3IsXG4gICAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0U2Vzc2lvbigpO1xuXG4gICAgLy8gTm8gc2Vzc2lvbiBvciBlcnJvciByZXRyaWV2aW5nIHNlc3Npb25cbiAgICBpZiAoc2Vzc2lvbkVycm9yIHx8ICFzZXNzaW9uKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHZhbGlkIHNlc3Npb24gZm91bmRcIik7XG4gICAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBUcnkgdG8gcmVmcmVzaCB0aGUgdG9rZW4gdG8gdmFsaWRhdGUgaXQgd2l0aCB0aGUgc2VydmVyXG4gICAgY29uc3QgeyBlcnJvcjogcmVmcmVzaEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnJlZnJlc2hTZXNzaW9uKCk7XG5cbiAgICBpZiAocmVmcmVzaEVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJTZXNzaW9uIHZhbGlkYXRpb24gZmFpbGVkOlwiLCByZWZyZXNoRXJyb3IpO1xuICAgICAgLy8gRm9yY2UgY2xlYXIgdGhlIGludmFsaWQgc2Vzc2lvblxuICAgICAgYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduT3V0KCk7XG4gICAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBTZXNzaW9uIGlzIHZhbGlkLCB1cGRhdGUgdGhlIGN1cnJlbnQgdXNlclxuICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU2Vzc2lvbiB2YWxpZGF0aW9uIGVycm9yOlwiLCBlKTtcbiAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHVzZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsaWRhdGUgLSBXaGV0aGVyIHRvIHZhbGlkYXRlIHRoZSBzZXNzaW9uIHdpdGggU3VwYWJhc2VcbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdHxudWxsPn0gVGhlIGN1cnJlbnQgdXNlciBvciBudWxsXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcih2YWxpZGF0ZSA9IHRydWUpIHtcbiAgLy8gSWYgd2UgbmVlZCB0byB2YWxpZGF0ZSBhbmQgaGF2ZW4ndCBkb25lIHNvIHlldFxuICBpZiAodmFsaWRhdGUgJiYgIXNlc3Npb25WYWxpZGF0ZWQpIHtcbiAgICBhd2FpdCB2YWxpZGF0ZVNlc3Npb24oKTtcbiAgfVxuXG4gIC8vIElmIG5vIHZhbGlkYXRpb24gbmVlZGVkIG9yIGFscmVhZHkgdmFsaWRhdGVkXG4gIGlmICghdmFsaWRhdGUgJiYgIWN1cnJlbnRVc2VyKSB7XG4gICAgLy8gVHJ5IHRvIHJldHJpZXZlIGZyb20gc3RvcmFnZSBpZiBub3QgaW4gbWVtb3J5XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzIHZlcnNpb24gb2YgZ2V0Q3VycmVudFVzZXIgZm9yIG5vbi1hc3luYyBjb250ZXh0c1xuICogV0FSTklORzogVGhpcyBtYXkgcmV0dXJuIHN0YWxlIGRhdGEgaWYgc2Vzc2lvbiBpcyBpbnZhbGlkXG4gKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9IFRoZSBjdXJyZW50IHVzZXIgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXJTeW5jKCkge1xuICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIExvZ3Mgb3V0IHRoZSB1c2VyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgdHJ5IHtcbiAgICAvLyBTaWduIG91dCBmcm9tIFN1cGFiYXNlXG4gICAgYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduT3V0KCk7XG5cbiAgICAvLyBDbGVhciBsb2NhbCBzdGF0ZVxuICAgIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcblxuICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBob21lIHBhZ2UgYWZ0ZXIgbG9nb3V0XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZHVyaW5nIGxvZ291dDpcIiwgZXJyb3IpO1xuICAgIC8vIFN0aWxsIGNsZWFyIGxvY2FsIHN0YXRlIGV2ZW4gaWYgU3VwYWJhc2Ugc2lnbk91dCBmYWlsc1xuICAgIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpbiB3aXRoIHZhbGlkIHNlc3Npb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsaWRhdGUgLSBXaGV0aGVyIHRvIHZhbGlkYXRlIHdpdGggU3VwYWJhc2UgZmlyc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBUcnVlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpbiB3aXRoIHZhbGlkIHNlc3Npb25cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzTG9nZ2VkSW4odmFsaWRhdGUgPSB0cnVlKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcih2YWxpZGF0ZSk7XG4gIHJldHVybiB1c2VyICE9PSBudWxsO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzIHZlcnNpb24gb2YgaXNMb2dnZWRJblxuICogV0FSTklORzogVGhpcyBtYXkgcmV0dXJuIGluY29ycmVjdCByZXN1bHRzIGlmIHNlc3Npb24gaXMgaW52YWxpZFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdXNlciBhcHBlYXJzIHRvIGJlIGxvZ2dlZCBpbiBsb2NhbGx5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xvZ2dlZEluU3luYygpIHtcbiAgcmV0dXJuIGdldEN1cnJlbnRVc2VyU3luYygpICE9PSBudWxsO1xufVxuXG4vKipcbiAqIFByb3RlY3RzIGEgcGFnZSB0aGF0IHJlcXVpcmVzIGF1dGhlbnRpY2F0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVkaXJlY3RVcmwgLSBVUkwgdG8gcmVkaXJlY3QgaWYgbm90IGF1dGhlbnRpY2F0ZWRcbiAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBUcnVlIGlmIGF1dGhlbnRpY2F0ZWQsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJvdGVjdFBhZ2UocmVkaXJlY3RVcmwgPSBcIi9sb2dpblwiKSB7XG4gIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCB2YWxpZGF0ZVNlc3Npb24oKTtcblxuICBpZiAoIWlzVmFsaWQpIHtcbiAgICAvLyBSZWRpcmVjdCB0byBsb2dpbiBwYWdlXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVybDtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhdXRoIG9uIHBhZ2UgbG9hZFxuICogQ2FsbCB0aGlzIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91ciBhcHAgaW5pdGlhbGl6YXRpb25cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRBdXRoKCkge1xuICAvLyBWYWxpZGF0ZSBzZXNzaW9uIG9uIHBhZ2UgbG9hZFxuICBhd2FpdCB2YWxpZGF0ZVNlc3Npb24oKTtcblxuICAvLyBTZXQgdXAgYXV0aCBzdGF0ZSBjaGFuZ2UgbGlzdGVuZXJcbiAgc3VwYWJhc2UuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZShhc3luYyAoZXZlbnQsIHNlc3Npb24pID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkF1dGggc3RhdGUgY2hhbmdlZDpcIiwgZXZlbnQpO1xuXG4gICAgaWYgKGV2ZW50ID09PSBcIlNJR05FRF9JTlwiICYmIHNlc3Npb24pIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIlNJR05FRF9PVVRcIikge1xuICAgICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gXCJUT0tFTl9SRUZSRVNIRURcIikge1xuICAgICAgc2V0Q3VycmVudFVzZXIoc2Vzc2lvbi51c2VyKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IFwiVVNFUl9VUERBVEVEXCIpIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIERpc3BsYXlzIGFuIGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gRXJyb3IgbWVzc2FnZSB0byBkaXNwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtZXNzYWdlLCBlbGVtZW50SWQgPSBcImVycm9yTWVzc2FnZVwiKSB7XG4gIGNvbnN0IGVycm9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlcnJvckVsZW1lbnQpIHtcbiAgICBlcnJvckVsZW1lbnQuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZWxlbWVudCBub3QgZm91bmQ6XCIsIGVsZW1lbnRJZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhIHN0YXR1cyBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIE1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBNZXNzYWdlIHR5cGUgKHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGRhbmdlcilcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB3aGVyZSB0byBkaXNwbGF5IHRoZSBtZXNzYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93U3RhdHVzKFxuICBtZXNzYWdlLFxuICB0eXBlID0gXCJpbmZvXCIsXG4gIGVsZW1lbnRJZCA9IFwic3RhdHVzTWVzc2FnZVwiXG4pIHtcbiAgY29uc3Qgc3RhdHVzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChzdGF0dXNFbGVtZW50KSB7XG4gICAgc3RhdHVzRWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cbiAgICAvLyBSZW1vdmUgYWxsIGFsZXJ0LSogY2xhc3Nlc1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwiYWxlcnQtXCIpKSB7XG4gICAgICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWRkIHRoZSBjbGFzcyBjb3JyZXNwb25kaW5nIHRvIHRoZSB0eXBlXG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBhbGVydC0ke3R5cGV9YCk7XG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJTdGF0dXMgZWxlbWVudCBub3QgZm91bmQ6XCIsIGVsZW1lbnRJZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBIaWRlcyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gaGlkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUVsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB0byBzaG93XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50SWQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbi8qKlxuICogU2hvd3MgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWQgLSBJRCBvZiB0aGUgYnV0dG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3Bpbm5lcklkIC0gSUQgb2YgdGhlIHNwaW5uZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dMb2FkaW5nKGJ1dHRvbklkLCBzcGlubmVySWQpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3Bpbm5lcklkKTtcblxuICBpZiAoYnV0dG9uKSBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufVxuXG4vKipcbiAqIEhpZGVzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlTG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gIGlmIChzcGlubmVyKSBzcGlubmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59XG5cbi8vIEV4cG9ydCB0aGUgbmVjZXNzYXJ5IGZ1bmN0aW9ucyBhbmQgdmFyaWFibGVzXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldEN1cnJlbnRVc2VyLFxuICBnZXRDdXJyZW50VXNlclN5bmMsXG4gIHNldEN1cnJlbnRVc2VyLFxuICBsb2dvdXQsXG4gIGlzTG9nZ2VkSW4sXG4gIGlzTG9nZ2VkSW5TeW5jLFxuICB2YWxpZGF0ZVNlc3Npb24sXG4gIHByb3RlY3RQYWdlLFxuICBpbml0QXV0aCxcbiAgc2hvd0Vycm9yLFxuICBzaG93U3RhdHVzLFxuICBoaWRlRWxlbWVudCxcbiAgc2hvd0VsZW1lbnQsXG4gIHNob3dMb2FkaW5nLFxuICBoaWRlTG9hZGluZyxcbn07XG4iLCIvLyBzcmMvYXV0aC9zaWdudXAuanNcbi8qKlxuICogU2lnbnVwIE1vZHVsZVxuICogQG1vZHVsZSBzaWdudXBcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHVzZXIgcmVnaXN0cmF0aW9uIHdpdGggY2xpZW50LXNpZGUgdmFsaWRhdGlvbiwgR29vZ2xlIE9BdXRoLCBhbmQgcGhvbmUgdmVyaWZpY2F0aW9uIHVzaW5nIFN1cGFiYXNlLlxuICogQHZlcnNpb24gMC4yLjFcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMi4xICgyMDI1LTA1LTE4KTogQWRkZWQgY2FwdGNoYSB3aXRoIENsb3VkZmxhcmUgVHVybnN0aWxlLlxuICogLSAwLjIuMCAoMjAyNS0wNS0xOCk6IEFkZGVkIHBob25lIG51bWJlciBpbnB1dCwgT1RQIHNlbmRpbmcgYW5kIHZlcmlmaWNhdGlvbiBmb3IgZW1haWwvcGFzc3dvcmQgc2lnbnVwLlxuICogLSAwLjEuMSAoMjAyNS0wNS0xOCk6IEFkZGVkIEdvb2dsZSBTaWduLVVwIGZ1bmN0aW9uYWxpdHkuXG4gKiAtIDAuMS4wICgyMDI1LTA1LTE1KTogTWlncmF0ZWQgdG8gU3VwYWJhc2UgY2xpZW50LXNpZGUgYXV0aCAodmVyc2lvbmluZyBhZGp1c3RlZClcbiAqL1xuXG5pbXBvcnQgeyBzaG93RXJyb3IsIHNob3dTdGF0dXMsIHNob3dMb2FkaW5nLCBoaWRlTG9hZGluZyB9IGZyb20gXCIuL2F1dGguanNcIjtcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4uL3N1cGFiYXNlLWNsaWVudC5qc1wiO1xuXG4vLyBTdG9yZSBwaG9uZSBudW1iZXIgdGVtcG9yYXJpbHkgYmV0d2VlbiBzdGVwc1xubGV0IGNhcHRjaGFUb2tlbiA9IG51bGw7IC8vIFRvIHN0b3JlIHRoZSBjYXB0Y2hhIHRva2VuICh1c2VkIGJ5IGJvdGggaENhcHRjaGEgYW5kIFR1cm5zdGlsZSlcbmxldCB0dXJuc3RpbGVXaWRnZXRJZCA9IG51bGw7IC8vIFRvIHN0b3JlIFR1cm5zdGlsZSB3aWRnZXQgSURcblxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBieSB0aGUgQ2xvdWRmbGFyZSBUdXJuc3RpbGUgc2NyaXB0IG9uY2UgaXQncyBsb2FkZWRcbi8vIChkdWUgdG8gJm9ubG9hZD1vbmxvYWRUdXJuc3RpbGVDYWxsYmFjayBpbiB0aGUgc2NyaXB0IHRhZyBpbiBzaWdudXAuaHRtbClcbndpbmRvdy5vbmxvYWRUdXJuc3RpbGVDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc29sZS5sb2coXCJUdXJuc3RpbGUgQVBJIHJlYWR5IChvbmxvYWRUdXJuc3RpbGVDYWxsYmFjayBleGVjdXRlZCkuXCIpO1xuICBjb25zdCB0dXJuc3RpbGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1cm5zdGlsZS1jb250YWluZXJcIik7XG5cbiAgaWYgKHR1cm5zdGlsZUNvbnRhaW5lciAmJiB3aW5kb3cudHVybnN0aWxlICYmICF0dXJuc3RpbGVXaWRnZXRJZCkge1xuICAgIGNvbnNvbGUubG9nKFwiUmVuZGVyaW5nIFR1cm5zdGlsZSB3aWRnZXQgZnJvbSBvbmxvYWRUdXJuc3RpbGVDYWxsYmFjay4uLlwiKTtcbiAgICB0cnkge1xuICAgICAgdHVybnN0aWxlV2lkZ2V0SWQgPSB3aW5kb3cudHVybnN0aWxlLnJlbmRlcih0dXJuc3RpbGVDb250YWluZXIsIHtcbiAgICAgICAgc2l0ZWtleTogXCIweDRBQUFBQUFCZHpZM0luT1UyX0luOTlcIixcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgIGNhcHRjaGFUb2tlbiA9IHRva2VuO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHVybnN0aWxlIHRva2VuIG9idGFpbmVkOlwiLCB0b2tlbik7XG4gICAgICAgIH0sXG4gICAgICAgIFwiZXhwaXJlZC1jYWxsYmFja1wiOiAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBcIlR1cm5zdGlsZSB0b2tlbiBleHBpcmVkLiBSZXNldHRpbmcgd2lkZ2V0LiBJRDpcIixcbiAgICAgICAgICAgIHR1cm5zdGlsZVdpZGdldElkXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAod2luZG93LnR1cm5zdGlsZSAmJiB0dXJuc3RpbGVXaWRnZXRJZCkge1xuICAgICAgICAgICAgd2luZG93LnR1cm5zdGlsZS5yZXNldCh0dXJuc3RpbGVXaWRnZXRJZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhcHRjaGFUb2tlbiA9IG51bGw7IC8vIENsZWFyIHRoZSB0b2tlblxuICAgICAgICAgIC8vIFdpZGdldCBzaG91bGQgYmUgcmVhZHkgZm9yIGEgbmV3IGNoYWxsZW5nZSBhZnRlciByZXNldC5cbiAgICAgICAgfSxcbiAgICAgICAgXCJlcnJvci1jYWxsYmFja1wiOiAoZXJyKSA9PiB7XG4gICAgICAgICAgY2FwdGNoYVRva2VuID0gbnVsbDtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVHVybnN0aWxlIGVycm9yIGNhbGxiYWNrOlwiLCBlcnIpO1xuICAgICAgICAgIHNob3dFcnJvcihgRXJyZXVyIENBUFRDSEE6ICR7ZXJyfS4gVmV1aWxsZXogcsOpZXNzYXllci5gKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gdGhlbWU6ICdsaWdodCcsIC8vIE9wdGlvbmFsOiAnbGlnaHQnLCAnZGFyaycsIG9yICdhdXRvJ1xuICAgICAgICAvLyBsYW5ndWFnZTogJ2ZyJywgLy8gT3B0aW9uYWw6IHNwZWNpZnkgbGFuZ3VhZ2VcbiAgICAgIH0pO1xuICAgICAgaWYgKHR1cm5zdGlsZVdpZGdldElkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIlR1cm5zdGlsZS5yZW5kZXIgZGlkIG5vdCByZXR1cm4gYSB3aWRnZXRJZC4gU2l0ZWtleSBvciBjb250YWluZXIgaXNzdWU/XCJcbiAgICAgICAgKTtcbiAgICAgICAgc2hvd0Vycm9yKFwiRXJyZXVyIGluaXRpYWxpc2F0aW9uIENBUFRDSEEgKElEIHdpZGdldCBub24gcmV0b3VybsOpKS5cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlR1cm5zdGlsZSB3aWRnZXQgcmVuZGVyZWQuIElEOlwiLCB0dXJuc3RpbGVXaWRnZXRJZCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJlbmRlcmluZyBUdXJuc3RpbGU6XCIsIGUpO1xuICAgICAgc2hvd0Vycm9yKFwiSW1wb3NzaWJsZSBkJ2FmZmljaGVyIGxlIENBUFRDSEEuXCIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghdHVybnN0aWxlQ29udGFpbmVyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIm9ubG9hZFR1cm5zdGlsZUNhbGxiYWNrOiAjdHVybnN0aWxlLWNvbnRhaW5lciBub3QgZm91bmQuXCIpO1xuICB9IGVsc2UgaWYgKCF3aW5kb3cudHVybnN0aWxlKSB7XG4gICAgY29uc29sZS5lcnJvcihcIm9ubG9hZFR1cm5zdGlsZUNhbGxiYWNrOiB3aW5kb3cudHVybnN0aWxlIEFQSSBub3QgZm91bmQuXCIpO1xuICB9IGVsc2UgaWYgKHR1cm5zdGlsZVdpZGdldElkKSB7XG4gICAgY29uc29sZS5sb2coXCJvbmxvYWRUdXJuc3RpbGVDYWxsYmFjazogV2lkZ2V0IGFscmVhZHkgc2VlbXMgcmVuZGVyZWQuXCIpO1xuICB9XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBzaWdudXAgcGFnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNpZ251cFBhZ2UoKSB7XG4gIGNvbnNvbGUubG9nKFwiaW5pdFNpZ251cFBhZ2UgY2FsbGVkXCIpO1xuICBjb25zdCBzaWdudXBGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWdudXBGb3JtXCIpO1xuICAvLyBjb25zdCBvdHBGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdHBGb3JtXCIpOyAvLyBPVFAgRm9ybSAtIFJlbW92ZWRcbiAgY29uc3QgZXJyb3JNZXNzYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvck1lc3NhZ2VcIik7XG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c01lc3NhZ2VcIik7XG4gIGNvbnN0IGdvb2dsZVNpZ25VcEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ29vZ2xlU2lnblVwQnRuXCIpO1xuICBjb25zdCB0dXJuc3RpbGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1cm5zdGlsZS1jb250YWluZXJcIik7IC8vIFVwZGF0ZWQgc2VsZWN0b3JcblxuICBpZiAoIXR1cm5zdGlsZUNvbnRhaW5lcikge1xuICAgIC8vIFVwZGF0ZWQgY2hlY2tcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgXCIjdHVybnN0aWxlLWNvbnRhaW5lciBub3QgZm91bmQgaW4gdGhlIERPTS4gQ0FQVENIQSBjYW5ub3QgYmUgcmVuZGVyZWQuXCJcbiAgICApO1xuICB9XG5cbiAgLy8gVGhlIG9ubG9hZFR1cm5zdGlsZUNhbGxiYWNrIGlzIHRoZSBwcmltYXJ5IHdheSB0aGUgd2lkZ2V0IHNob3VsZCBiZSByZW5kZXJlZC5cbiAgLy8gVGhlIHJlZHVuZGFudCBibG9jayBwcmV2aW91c2x5IGhlcmUgaGFzIGJlZW4gcmVtb3ZlZC5cbiAgLy8gSWYgd2luZG93LnR1cm5zdGlsZSBpcyBhbHJlYWR5IGF2YWlsYWJsZSBhbmQgdGhlIGNhbGxiYWNrIGhhc24ndCBmaXJlZCB5ZXQgKGUuZy4gc2NyaXB0IGxvYWRlZCBmcm9tIGNhY2hlIGJlZm9yZSBET00gcmVhZHkgZm9yIGNvbnRhaW5lciksXG4gIC8vIHRoZSBgb25sb2FkVHVybnN0aWxlQ2FsbGJhY2tgIHdpbGwgc3RpbGwgZXhlY3V0ZSBvbmNlIHRoZSBzY3JpcHQgZnVsbHkgcHJvY2Vzc2VzIGl0cyBgb25sb2FkYCBwYXJhbWV0ZXIuXG5cbiAgaWYgKHNpZ251cEZvcm0pIHtcbiAgICBzaWdudXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlLnRyaW0oKTtcbiAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcbiAgICAgIGNvbnN0IGNvbmZpcm1QYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZmlybVBhc3N3b3JkXCIpLnZhbHVlO1xuICAgICAgbGV0IHBob25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwaG9uZVwiKS52YWx1ZS50cmltKCk7IC8vIEdldCBwaG9uZSBudW1iZXJcblxuICAgICAgbGV0IHZhbGlkYXRpb25FcnJvcnMgPSBbXTtcbiAgICAgIGNvbnN0IGVtYWlsUGF0dGVybiA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvO1xuICAgICAgaWYgKCFlbWFpbFBhdHRlcm4udGVzdChlbWFpbCkpXG4gICAgICAgIHZhbGlkYXRpb25FcnJvcnMucHVzaChcIkwnYWRyZXNzZSBlbWFpbCBuJ2VzdCBwYXMgdmFsaWRlLlwiKTtcbiAgICAgIGlmIChwYXNzd29yZCAhPT0gY29uZmlybVBhc3N3b3JkKVxuICAgICAgICB2YWxpZGF0aW9uRXJyb3JzLnB1c2goXCJMZXMgbW90cyBkZSBwYXNzZSBuZSBjb3JyZXNwb25kZW50IHBhcy5cIik7XG4gICAgICBjb25zdCBwYXNzd29yZENvbXBsZXhpdHlQYXR0ZXJuID0gL14oPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipcXGQpLiskLztcbiAgICAgIGlmICghcGFzc3dvcmRDb21wbGV4aXR5UGF0dGVybi50ZXN0KHBhc3N3b3JkKSB8fCBwYXNzd29yZC5sZW5ndGggPCA4KVxuICAgICAgICB2YWxpZGF0aW9uRXJyb3JzLnB1c2goXCJMZSBmb3JtYXQgZHUgbW90IGRlIHBhc3NlIGVzdCBpbnZhbGlkZS5cIik7XG4gICAgICBpZiAoIXBob25lKSB2YWxpZGF0aW9uRXJyb3JzLnB1c2goXCJMZSBudW3DqXJvIGRlIHTDqWzDqXBob25lIGVzdCByZXF1aXMuXCIpO1xuICAgICAgLy8gQmFzaWMgcGhvbmUgdmFsaWRhdGlvbiAoeW91IG1pZ2h0IHdhbnQgYSBtb3JlIHJvYnVzdCBvbmUpXG4gICAgICBjb25zdCBwaG9uZVBhdHRlcm4gPSAvXigwfFxcKzMzKVsxLTldXFxkezh9JC87IC8vIEV4YW1wbGU6IDA2MTIzNDU2Nzggb3IgKzMzNjEyMzQ1Njc4XG4gICAgICBpZiAocGhvbmUgJiYgIXBob25lUGF0dGVybi50ZXN0KHBob25lKSlcbiAgICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKFxuICAgICAgICAgIFwiTGUgZm9ybWF0IGR1IG51bcOpcm8gZGUgdMOpbMOpcGhvbmUgZXN0IGludmFsaWRlIChleDogMDYxMjM0NTY3OCBvdSArMzM2MTIzNDU2NzgpLlwiXG4gICAgICAgICk7XG5cbiAgICAgIGlmICghY2FwdGNoYVRva2VuKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGNhcHRjaGEgaXMgc29sdmVkXG4gICAgICAgIHZhbGlkYXRpb25FcnJvcnMucHVzaChcIlZldWlsbGV6IGNvbXBsw6l0ZXIgbGUgQ0FQVENIQS5cIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWxpZGF0aW9uRXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2hvd0Vycm9yKHZhbGlkYXRpb25FcnJvcnMuam9pbihcIjxicj5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNob3dMb2FkaW5nKFwic2lnbnVwQnRuXCIsIFwic2lnbnVwU3Bpbm5lclwiKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxldCBlMTY0UGhvbmUgPSBwaG9uZTtcbiAgICAgICAgaWYgKHBob25lLnN0YXJ0c1dpdGgoXCIwXCIpKSB7XG4gICAgICAgICAgZTE2NFBob25lID0gYCszMyR7cGhvbmUuc3Vic3RyaW5nKDEpfWA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGVwIDE6IFNpZ24gdXAgd2l0aCBlbWFpbCBhbmQgcGFzc3dvcmRcbiAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvcjogc2lnblVwRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnblVwKHtcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICBvcHRpb25zOiB7IGNhcHRjaGFUb2tlbiB9LCAvLyBQYXNzIGNhcHRjaGEgdG9rZW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNpZ25VcEVycm9yKSB0aHJvdyBzaWduVXBFcnJvcjtcbiAgICAgICAgaWYgKCFkYXRhLnVzZXIpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgY3LDqWF0aW9uIGRlIGwndXRpbGlzYXRldXIuXCIpO1xuXG4gICAgICAgIGlmIChlMTY0UGhvbmUgJiYgZGF0YS51c2VyLmlkKSB7XG4gICAgICAgICAgYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAgICAgICAgIC51cGRhdGUoeyBwaG9uZTogZTE2NFBob25lIH0pXG4gICAgICAgICAgICAuZXEoXCJpZFwiLCBkYXRhLnVzZXIuaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXNlciBjcmVhdGVkLiBOb3cgdXBkYXRlIHRoZWlyIHByb2ZpbGUgd2l0aCB0aGUgcGhvbmUgbnVtYmVyIGlmIHByb3ZpZGVkLlxuICAgICAgICBsZXQgc3VjY2Vzc01lc3NhZ2UgPVxuICAgICAgICAgIFwiQ29tcHRlIGNyw6nDqSAhIFVuIGVtYWlsIGRlIGNvbmZpcm1hdGlvbiBhIMOpdMOpIGVudm95w6kuXCI7XG4gICAgICAgIHNob3dTdGF0dXMoc3VjY2Vzc01lc3NhZ2UsIFwic3VjY2Vzc1wiKTtcblxuICAgICAgICAvLyBIaWRlIHRoZSBmb3JtIGFuZCByZXNldCBpdFxuICAgICAgICBpZiAoc2lnbnVwRm9ybSkge1xuICAgICAgICAgIHNpZ251cEZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTsgLy8gSGlkZSB0aGUgZm9ybVxuICAgICAgICAgIHNpZ251cEZvcm0ucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVtYWlsL1Bhc3N3b3JkIFNpZ251cCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICBsZXQgZGlzcGxheUVycm9yID0gZXJyb3IubWVzc2FnZSB8fCBcIlVuZSBlcnJldXIgZXN0IHN1cnZlbnVlLlwiO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZXJyb3IubWVzc2FnZSAmJlxuICAgICAgICAgIGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJVc2VyIGFscmVhZHkgcmVnaXN0ZXJlZFwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBkaXNwbGF5RXJyb3IgPVxuICAgICAgICAgICAgXCJDZXR0ZSBhZHJlc3NlIGVtYWlsIGVzdCBkw6lqw6AgdXRpbGlzw6llLiBWZXVpbGxleiB2b3VzIGNvbm5lY3RlciBvdSB1dGlsaXNlciB1bmUgYXV0cmUgYWRyZXNzZS5cIjtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBlcnJvci5tZXNzYWdlICYmXG4gICAgICAgICAgZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIlVuYWJsZSB0byB2YWxpZGF0ZSBwaG9uZSBudW1iZXJcIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGlzcGxheUVycm9yID0gXCJMZSBudW3DqXJvIGRlIHTDqWzDqXBob25lIGZvdXJuaSBuJ2VzdCBwYXMgdmFsaWRlLlwiO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgJiZcbiAgICAgICAgICBlcnJvci5tZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJjYXB0Y2hhIHByb3RlY3Rpb25cIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGlzcGxheUVycm9yID1cbiAgICAgICAgICAgIFwiRXJyZXVyIENBUFRDSEEgZHUgc2VydmV1ci4gVmV1aWxsZXogcsOpZXNzYXllci4gKFwiICtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgK1xuICAgICAgICAgICAgXCIpXCI7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd0Vycm9yKGRpc3BsYXlFcnJvcik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBoaWRlTG9hZGluZyhcInNpZ251cEJ0blwiLCBcInNpZ251cFNwaW5uZXJcIik7XG4gICAgICAgIGlmICh3aW5kb3cudHVybnN0aWxlICYmIHR1cm5zdGlsZVdpZGdldElkKSB7XG4gICAgICAgICAgd2luZG93LnR1cm5zdGlsZS5yZXNldCh0dXJuc3RpbGVXaWRnZXRJZCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJUdXJuc3RpbGUgd2lkZ2V0IGhhcyBiZWVuIHJlc2V0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYXB0Y2hhVG9rZW4gPSBudWxsOyAvLyBDbGVhciB0b2tlbiBhZnRlciB1c2VcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU2lnbnVwIGZvcm0gKHNpZ251cEZvcm0pIG5vdCBmb3VuZC5cIik7XG4gIH1cblxuICBpZiAoZ29vZ2xlU2lnblVwQnRuKSB7XG4gICAgZ29vZ2xlU2lnblVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICBzaG93TG9hZGluZyhcImdvb2dsZVNpZ25VcEJ0blwiLCBcImdvb2dsZVNpZ25VcFNwaW5uZXJcIik7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25JbldpdGhPQXV0aCh7XG4gICAgICAgICAgcHJvdmlkZXI6IFwiZ29vZ2xlXCIsXG4gICAgICAgICAgb3B0aW9uczogeyByZWRpcmVjdFRvOiBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9wcm9maWxlLmh0bWxgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2lnbmluZyB1cCB3aXRoIEdvb2dsZTpcIiwgZXJyb3IpO1xuICAgICAgICAgIHNob3dFcnJvcihcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgXCJFcnJldXIgbG9ycyBkZSBsJ2luc2NyaXB0aW9uIGF2ZWMgR29vZ2xlLlwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkV4Y2VwdGlvbiBkdXJpbmcgR29vZ2xlIHNpZ24tdXA6XCIsIGVycm9yKTtcbiAgICAgICAgc2hvd0Vycm9yKFxuICAgICAgICAgIFwiVW5lIGV4Y2VwdGlvbiBlc3Qgc3VydmVudWUgbG9ycyBkZSBsJ2luc2NyaXB0aW9uIGF2ZWMgR29vZ2xlLlwiXG4gICAgICAgICk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBoaWRlTG9hZGluZyhcImdvb2dsZVNpZ25VcEJ0blwiLCBcImdvb2dsZVNpZ25VcFNwaW5uZXJcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKFwiR29vZ2xlIFNpZ24tVXAgYnV0dG9uIChnb29nbGVTaWduVXBCdG4pIG5vdCBmb3VuZC5cIik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0U2lnbnVwUGFnZSxcbn07XG4iLCIvLyBzcmMvZW50cmllcy9zaWdudXAuanNcbi8qKlxuICogU2lnbnVwIEVudHJ5IFBvaW50XG4gKlxuICogVGhpcyBtb2R1bGUgc2VydmVzIGFzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIHNpZ251cCBwYWdlLlxuICovXG5cbi8vIEltcG9ydCBvdXIgc2lnbnVwIG1vZHVsZVxuaW1wb3J0IHsgaW5pdFNpZ251cFBhZ2UgfSBmcm9tIFwiLi4vYXV0aC9zaWdudXAuanNcIjtcblxuLy8gSW5pdGlhbGl6ZSBzaWdudXAgcGFnZSB3aGVuIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgLy8gSW5pdGlhbGl6ZSBzaWdudXAgcGFnZVxuICBpbml0U2lnbnVwUGFnZSgpO1xuXG4gIGNvbnNvbGUubG9nKFwiU2lnbnVwIHBhZ2UgaW5pdGlhbGl6ZWRcIik7XG59KTtcbiIsIi8vIHNyYy9qcy9zdXBhYmFzZS1jbGllbnQuanNcbi8qKlxuICogU3VwYWJhc2UgQ2xpZW50XG4gKiBAbW9kdWxlIHN1cGFiYXNlLWNsaWVudFxuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIFN1cGFiYXNlIGNsaWVudCBpbml0aWFsaXphdGlvbiBhbmQgY29uZmlndXJhdGlvbi5cbiAqIEB2ZXJzaW9uIDAuMC4yXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjIgKDIwMjUtMDUtMjcpOiBBZGRlZCBlbnZpcm9uZW1lbnQgdmFyaWFibGVzIGVycm9yIGhhbmRsaW5nIGZvciBtaXNzaW5nLlxuICogLSAwLjAuMSAoMjAyNS0wNS0wOSk6IEluaXRpYWwgdmVyc2lvbiB3aXRoIGJhc2ljIFN1cGFiYXNlIGNsaWVudCBpbml0aWFsaXphdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XG5cbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuU1VQQUJBU0VfVVJMO1xuY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID0gcHJvY2Vzcy5lbnYuU1VQQUJBU0VfQU5PTl9LRVk7XG5cbmlmICghc3VwYWJhc2VVcmwgfHwgIXN1cGFiYXNlQW5vbktleSkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIFN1cGFiYXNlIGVudmlyb25tZW50IHZhcmlhYmxlc1wiKTtcbn1cblxuY29uc3QgY2xpZW50ID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUFub25LZXkpO1xuXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjbGllbnQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJqcy9cIiArIGNodW5rSWQgKyBcIi5idW5kbGUuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwidXJiYW5kb2NzX3dlYmFwcDpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvXmJsb2I6LywgXCJcIikucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsICsgXCIuLi9cIjsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJzaWdudXBcIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3VyYmFuZG9jc193ZWJhcHBcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdXJiYW5kb2NzX3dlYmFwcFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfc3VwYWJhc2Vfc3VwYWJhc2UtanNfZGlzdF9tb2R1bGVfaW5kZXhfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvZW50cmllcy9zaWdudXAuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==