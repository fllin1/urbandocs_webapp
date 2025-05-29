/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/auth/auth.js":
/*!*****************************!*\
  !*** ./src/js/auth/auth.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),
/* harmony export */   hideLoading: () => (/* binding */ hideLoading),
/* harmony export */   protectPage: () => (/* binding */ protectPage),
/* harmony export */   setCurrentUser: () => (/* binding */ setCurrentUser),
/* harmony export */   showLoading: () => (/* binding */ showLoading)
/* harmony export */ });
/* unused harmony exports validateSession, getCurrentUserSync, logout, isLoggedIn, isLoggedInSync, initAuth, showError, showStatus, hideElement, showElement */
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

/***/ "./src/js/auth/header-auth.js":
/*!************************************!*\
  !*** ./src/js/auth/header-auth.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initHeaderAuth: () => (/* binding */ initHeaderAuth)
/* harmony export */ });
/* unused harmony exports getCurrentUser, isAuthenticated, updateHeader */
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../supabase-client.js */ "./src/js/supabase-client.js");
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth/auth.js");
/**
 * Header Authentication Module
 * @module header-auth
 * @description Handles dynamic header updates based on authentication state across all pages
 * @version 1.0.0
 * @author GreyPanda
 *
 * @changelog
 * - 1.0.0 (2025-01-XX): Initial version - unified header auth management for all pages
 */




let currentUser = null;

/**
 * Update header UI based on authentication state
 * @param {Object|null} user - The authenticated user object or null
 */
function updateHeaderForAuthState(user) {
  currentUser = user;

  // Get header elements (they might not exist on all pages)
  const userStatus = document.getElementById("userStatus");
  const loginLink = document.getElementById("loginLink");
  const signupLink = document.getElementById("signupLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    // User is signed in - show authenticated state
    if (userStatus) {
      userStatus.classList.remove("hidden");
      userStatus.textContent = "Votre compte";
    }
    if (loginLink) loginLink.classList.add("hidden");
    if (signupLink) signupLink.classList.add("hidden");
    if (logoutBtn) logoutBtn.classList.remove("hidden");

    console.log("Header updated: User is authenticated");
  } else {
    // User is signed out - show guest state
    if (userStatus) userStatus.classList.add("hidden");
    if (loginLink) loginLink.classList.remove("hidden");
    if (signupLink) signupLink.classList.remove("hidden");
    if (logoutBtn) logoutBtn.classList.add("hidden");

    console.log("Header updated: User is not authenticated");
  }
}

/**
 * Setup logout functionality for the current page
 */
function setupLogoutHandler() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    // Remove any existing listeners to avoid duplicates
    logoutBtn.replaceWith(logoutBtn.cloneNode(true));

    // Get the new element and add event listener
    const newLogoutBtn = document.getElementById("logoutBtn");
    newLogoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      console.log("Logout initiated from header");

      try {
        const { error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.signOut();
        if (error) {
          console.error("Error logging out:", error.message);
          alert("Erreur lors de la déconnexion. Veuillez réessayer.");
        } else {
          console.log("Logout successful, redirecting to home");
          // The onAuthStateChange will handle the redirect and UI updates
        }
      } catch (error) {
        console.error("Exception during logout:", error);
        alert("Une erreur inattendue s'est produite lors de la déconnexion.");
      }
    });
  }
}

/**
 * Initialize header authentication for the current page
 * Call this function on every page that has a header
 */
function initHeaderAuth() {
  console.log("Initializing header authentication...");

  // Setup logout handler
  setupLogoutHandler();

  // Listen for auth state changes
  _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user || null;

    // Update auth module
    _auth_js__WEBPACK_IMPORTED_MODULE_1__.setCurrentUser(user);

    // Update header UI
    updateHeaderForAuthState(user);

    // Handle specific events
    if (event === "SIGNED_OUT") {
      console.log("Header auth: User signed out, redirecting to home");
      // Small delay to ensure logout completes properly
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } else if (event === "SIGNED_IN") {
      console.log("Header auth: User signed in");
    } else if (event === "INITIAL_SESSION") {
      console.log("Header auth: Initial session loaded");
    } else if (event === "TOKEN_REFRESHED") {
      console.log("Header auth: Token refreshed");
    }
  });

  // Set initial state based on stored user data
  const initialUser = _auth_js__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser();
  updateHeaderForAuthState(initialUser);

  console.log("Header authentication initialized");
}

/**
 * Get the current authenticated user
 * @returns {Object|null} Current user object or null
 */
function getCurrentUser() {
  return currentUser;
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
function isAuthenticated() {
  return currentUser !== null;
}

/**
 * Manually update header state (useful for testing or special cases)
 * @param {Object|null} user - User object or null
 */
function updateHeader(user) {
  updateHeaderForAuthState(user);
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  initHeaderAuth,
  getCurrentUser,
  isAuthenticated,
  updateHeader,
});


/***/ }),

/***/ "./src/js/auth/profile.js":
/*!********************************!*\
  !*** ./src/js/auth/profile.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initProfilePage: () => (/* binding */ initProfilePage)
/* harmony export */ });
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth/auth.js");
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../supabase-client.js */ "./src/js/supabase-client.js");
// src/auth/profile.js
/**
 * Profile Module
 * @module profile
 * @description Handles user profile management, including data fetching, updates, and account deletion.
 * @version 0.2.1
 *
 * @changelog
 * - 0.2.1 (2025-01-27): Updated to use English column names and added date_of_birth support
 * - 0.2.0 (2025-01-27): Fixed database table references and field mappings to match actual Supabase structure
 * - 0.1.0 (2025-05-16): Added profile data fetching, updating, and account deletion functionality.
 * - 0.0.2 (2025-05-15): Improved error handling and added loading states (previous versioning was future-dated)
 * - 0.0.1 (2025-05-14): Initial version with basic profile display and logout.
 */

 // Assuming auth.js exports showStatus that can take an element ID


// Helper to show status messages for profile form and delete section
function showProfileStatus(message, type, elementId) {
  const statusElement = document.getElementById(elementId);
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.className = "status-message margin-top-sm"; // Reset classes
    statusElement.classList.add(type); // 'success', 'error', 'info'
    statusElement.classList.remove("hidden");
  }
}

async function fetchUserProfile(userId) {
  const { data, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase
    .from("profiles")
    .select("first_name, last_name, phone, updated_at")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116: "row not found"
    console.error("Error fetching profile:", error);
    throw error;
  }
  return data;
}

function populateProfileForm(profile) {
  if (!profile) return;

  // Map database fields to HTML form fields (HTML still uses French field names)
  document.getElementById("nom").value = profile.last_name || "";
  document.getElementById("prenom").value = profile.first_name || "";
  document.getElementById("telephone").value = profile.phone || "";

  // Handle date of birth
  if (profile.date_of_birth) {
    document.getElementById("dateNaissance").value = profile.date_of_birth;
  }

  const memberSinceEl = document.getElementById("memberSince");
  if (memberSinceEl && profile.updated_at) {
    memberSinceEl.textContent = new Date(profile.updated_at).toLocaleDateString(
      "fr-FR"
    );
  }
}

async function initProfilePage() {
  if (!(await (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.protectPage)())) return;

  const userEmailEl = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileForm = document.getElementById("profileForm");
  const deleteAccountBtn = document.getElementById("deleteAccountBtn");
  const memberSinceEl = document.getElementById("memberSince");

  try {
    const {
      data: { session },
    } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.auth.getSession();
    if (!session || !session.user) {
      console.log("No active session or user. Redirecting to login.");
      window.location.href = "/";
      return;
    }
    const user = session.user;

    if (userEmailEl) {
      userEmailEl.textContent = user.email;
    }
    if (memberSinceEl && user.created_at) {
      memberSinceEl.textContent = new Date(user.created_at).toLocaleDateString(
        "fr-FR"
      );
    }

    // Fetch and populate profile
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("saveProfileBtn");
    const profile = await fetchUserProfile(user.id);
    if (profile) {
      populateProfileForm(profile);
    } else {
      console.log("No profile data found for user, form will be empty.");
    }
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("saveProfileBtn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("logoutBtn");
        try {
          const { error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.auth.signOut();
          if (error) throw error;
          showProfileStatus(
            "Déconnexion réussie. Redirection...",
            "success",
            "profileFormStatus"
          );
          setTimeout(() => {
            window.location.href = "/";
          }, 200);
        } catch (error) {
          console.error("Error signing out:", error);
          showProfileStatus(
            `Erreur de déconnexion: ${error.message}`,
            "error",
            "profileFormStatus"
          );
        } finally {
          (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("logoutBtn");
        }
      });
    }

    if (profileForm) {
      profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("saveProfileBtn");
        const profileStatusEl = "profileFormStatus";
        document.getElementById(profileStatusEl).classList.add("hidden");

        // Get form values and map to database fields (using English column names)
        const updates = {
          id: user.id,
          last_name: document.getElementById("nom").value.trim(),
          first_name: document.getElementById("prenom").value.trim(),
          phone: document.getElementById("telephone").value.trim(),
          updated_at: new Date().toISOString(),
        };

        // Remove empty fields to avoid constraint violations
        Object.keys(updates).forEach((key) => {
          if (updates[key] === "" && key !== "id" && key !== "updated_at") {
            updates[key] = null;
          }
        });

        try {
          const { error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.from("profiles").upsert(updates);
          if (error) throw error;
          showProfileStatus(
            "Profil mis à jour avec succès !",
            "success",
            profileStatusEl
          );
        } catch (error) {
          console.error("Error updating profile:", error);
          showProfileStatus(
            `Erreur lors de la mise à jour: ${error.message}`,
            "error",
            profileStatusEl
          );
        } finally {
          (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("saveProfileBtn");
        }
      });
    }

    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener("click", async () => {
        const deleteStatusEl = "deleteStatusMessage";
        document.getElementById(deleteStatusEl).classList.add("hidden");

        if (
          confirm(
            "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et toutes vos données seront perdues."
          )
        ) {
          (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("deleteAccountBtn");
          try {
            // First delete the profile
            const { error: profileError } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase
              .from("profiles")
              .delete()
              .eq("id", user.id);

            if (profileError) {
              console.error("Error deleting profile:", profileError);
            }

            // Then try to delete the user account (this might require admin privileges)
            const { error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.rpc("delete_user_account");
            if (error) {
              // If RPC doesn't exist, just sign out the user
              console.warn("delete_user_account RPC not available:", error);
              await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.auth.signOut();
              showProfileStatus(
                "Profil supprimé. Veuillez contacter l'administrateur pour supprimer complètement votre compte.",
                "info",
                deleteStatusEl
              );
            } else {
              showProfileStatus(
                "Compte supprimé avec succès. Vous allez être déconnecté et redirigé.",
                "success",
                deleteStatusEl
              );
              await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.auth.signOut();
            }

            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          } catch (error) {
            console.error("Error deleting account:", error);
            showProfileStatus(
              `Erreur lors de la suppression du compte: ${error.message}`,
              "error",
              deleteStatusEl
            );
          } finally {
            (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("deleteAccountBtn");
          }
        } else {
          console.log("User cancelled account deletion.");
        }
      });
    }
  } catch (error) {
    console.error("Profile page initialization error:", error);
    const mainErrorContainer = document.getElementById("profileDetails");
    if (mainErrorContainer) {
      mainErrorContainer.innerHTML =
        '<p class="error-message">Impossible de charger les informations du profil. Veuillez réessayer plus tard.</p>';
    }
  }
}

// Initialize the page when DOM is ready
document.addEventListener("DOMContentLoaded", initProfilePage);


/***/ }),

/***/ "./src/js/entries/profile.js":
/*!***********************************!*\
  !*** ./src/js/entries/profile.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _profile_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../profile-page.js */ "./src/js/profile-page.js");
// src/js/entries/profile.js - Profile page entry point



/***/ }),

/***/ "./src/js/profile-page.js":
/*!********************************!*\
  !*** ./src/js/profile-page.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _auth_profile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth/profile.js */ "./src/js/auth/profile.js");
/* harmony import */ var _auth_header_auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/header-auth.js */ "./src/js/auth/header-auth.js");
// src/js/profile-page.js - Profile page functionality



// Initialize both profile functionality and header authentication
document.addEventListener("DOMContentLoaded", () => {
  (0,_auth_header_auth_js__WEBPACK_IMPORTED_MODULE_1__.initHeaderAuth)();
  (0,_auth_profile_js__WEBPACK_IMPORTED_MODULE_0__.initProfilePage)();
  console.log("Profile page and header authentication initialized");
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
/******/ 			"profile": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_supabase_supabase-js_dist_module_index_js"], () => (__webpack_require__("./src/js/entries/profile.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9hdXRoLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvYXV0aC9oZWFkZXItYXV0aC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2F1dGgvcHJvZmlsZS5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2VudHJpZXMvcHJvZmlsZS5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3Byb2ZpbGUtcGFnZS5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3N1cGFiYXNlLWNsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9hdXRoL2F1dGguanNcbi8qKlxuICogQXV0aGVudGljYXRpb24gTW9kdWxlIC0gQmFzZVxuICogQG1vZHVsZSBhdXRoXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBtb2R1bGUgZm9yIGF1dGhlbnRpY2F0aW9uIHdpdGggY29tbW9uIGZ1bmN0aW9ucyBhbmQgY29uZmlndXJhdGlvblxuICogQHZlcnNpb24gMC4wLjVcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC41ICgyMDI1LTA1LTE1KTogQWRkZWQgc2Vzc2lvbiB2YWxpZGF0aW9uIGFuZCBwcm90ZWN0aW9uIGFnYWluc3Qgc3RhbGUgc2Vzc2lvbnMuXG4gKiAtIDAuMC40ICgyMDI1LTA1LTE1KTogUmVtb3ZhbCBvZiBGaXJlYmFzZSBDbG91ZCBGdW5jdGlvbnMgY29uc3RhbnRzLlxuICogLSAwLjAuMyAoMjAyNS0wNS0xMyk6IE1vZGlmaWVkIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0ZSBtYW5hZ2VtZW50IHRvIHVzZSBTdXBhYmFzZSBBdXRoIHN5c3RlbS5cbiAqIC0gMC4wLjIgKDIwMjUtMDUtMTMpOiBSZW9yZ2FuaXphdGlvbiBpbnRvIHNlcGFyYXRlIG1vZHVsZXNcbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDMpOiBJbml0aWFsIGNyZWF0aW9uXG4gKi9cblxuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiLi4vc3VwYWJhc2UtY2xpZW50LmpzXCI7XG5cbi8vIEdsb2JhbCBhdXRoZW50aWNhdGlvbiBzdGF0ZVxubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcbmxldCBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG5cbi8qKlxuICogU2V0cyB0aGUgY3VycmVudCB1c2VyXG4gKiBAcGFyYW0ge09iamVjdH0gdXNlciAtIFVzZXIgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFVzZXIodXNlcikge1xuICBjdXJyZW50VXNlciA9IHVzZXI7XG4gIC8vIFBvc3NpYmxlIHN0b3JhZ2UgaW4gbG9jYWxTdG9yYWdlL3Nlc3Npb25TdG9yYWdlXG4gIGlmICh1c2VyKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyBpZiB0aGUgY3VycmVudCBzZXNzaW9uIGlzIGFjdGl2ZSB3aXRoIFN1cGFiYXNlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gVHJ1ZSBpZiBzZXNzaW9uIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2Vzc2lvbigpIHtcbiAgdHJ5IHtcbiAgICAvLyBHZXQgY3VycmVudCBzZXNzaW9uIGZyb20gU3VwYWJhc2VcbiAgICBjb25zdCB7XG4gICAgICBkYXRhOiB7IHNlc3Npb24gfSxcbiAgICAgIGVycm9yOiBzZXNzaW9uRXJyb3IsXG4gICAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0U2Vzc2lvbigpO1xuXG4gICAgLy8gTm8gc2Vzc2lvbiBvciBlcnJvciByZXRyaWV2aW5nIHNlc3Npb25cbiAgICBpZiAoc2Vzc2lvbkVycm9yIHx8ICFzZXNzaW9uKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHZhbGlkIHNlc3Npb24gZm91bmRcIik7XG4gICAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBUcnkgdG8gcmVmcmVzaCB0aGUgdG9rZW4gdG8gdmFsaWRhdGUgaXQgd2l0aCB0aGUgc2VydmVyXG4gICAgY29uc3QgeyBlcnJvcjogcmVmcmVzaEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnJlZnJlc2hTZXNzaW9uKCk7XG5cbiAgICBpZiAocmVmcmVzaEVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJTZXNzaW9uIHZhbGlkYXRpb24gZmFpbGVkOlwiLCByZWZyZXNoRXJyb3IpO1xuICAgICAgLy8gRm9yY2UgY2xlYXIgdGhlIGludmFsaWQgc2Vzc2lvblxuICAgICAgYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduT3V0KCk7XG4gICAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBTZXNzaW9uIGlzIHZhbGlkLCB1cGRhdGUgdGhlIGN1cnJlbnQgdXNlclxuICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU2Vzc2lvbiB2YWxpZGF0aW9uIGVycm9yOlwiLCBlKTtcbiAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHVzZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsaWRhdGUgLSBXaGV0aGVyIHRvIHZhbGlkYXRlIHRoZSBzZXNzaW9uIHdpdGggU3VwYWJhc2VcbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdHxudWxsPn0gVGhlIGN1cnJlbnQgdXNlciBvciBudWxsXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcih2YWxpZGF0ZSA9IHRydWUpIHtcbiAgLy8gSWYgd2UgbmVlZCB0byB2YWxpZGF0ZSBhbmQgaGF2ZW4ndCBkb25lIHNvIHlldFxuICBpZiAodmFsaWRhdGUgJiYgIXNlc3Npb25WYWxpZGF0ZWQpIHtcbiAgICBhd2FpdCB2YWxpZGF0ZVNlc3Npb24oKTtcbiAgfVxuXG4gIC8vIElmIG5vIHZhbGlkYXRpb24gbmVlZGVkIG9yIGFscmVhZHkgdmFsaWRhdGVkXG4gIGlmICghdmFsaWRhdGUgJiYgIWN1cnJlbnRVc2VyKSB7XG4gICAgLy8gVHJ5IHRvIHJldHJpZXZlIGZyb20gc3RvcmFnZSBpZiBub3QgaW4gbWVtb3J5XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzIHZlcnNpb24gb2YgZ2V0Q3VycmVudFVzZXIgZm9yIG5vbi1hc3luYyBjb250ZXh0c1xuICogV0FSTklORzogVGhpcyBtYXkgcmV0dXJuIHN0YWxlIGRhdGEgaWYgc2Vzc2lvbiBpcyBpbnZhbGlkXG4gKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9IFRoZSBjdXJyZW50IHVzZXIgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXJTeW5jKCkge1xuICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIExvZ3Mgb3V0IHRoZSB1c2VyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgdHJ5IHtcbiAgICAvLyBTaWduIG91dCBmcm9tIFN1cGFiYXNlXG4gICAgYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduT3V0KCk7XG5cbiAgICAvLyBDbGVhciBsb2NhbCBzdGF0ZVxuICAgIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcblxuICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBob21lIHBhZ2UgYWZ0ZXIgbG9nb3V0XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZHVyaW5nIGxvZ291dDpcIiwgZXJyb3IpO1xuICAgIC8vIFN0aWxsIGNsZWFyIGxvY2FsIHN0YXRlIGV2ZW4gaWYgU3VwYWJhc2Ugc2lnbk91dCBmYWlsc1xuICAgIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpbiB3aXRoIHZhbGlkIHNlc3Npb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsaWRhdGUgLSBXaGV0aGVyIHRvIHZhbGlkYXRlIHdpdGggU3VwYWJhc2UgZmlyc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBUcnVlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpbiB3aXRoIHZhbGlkIHNlc3Npb25cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzTG9nZ2VkSW4odmFsaWRhdGUgPSB0cnVlKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcih2YWxpZGF0ZSk7XG4gIHJldHVybiB1c2VyICE9PSBudWxsO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzIHZlcnNpb24gb2YgaXNMb2dnZWRJblxuICogV0FSTklORzogVGhpcyBtYXkgcmV0dXJuIGluY29ycmVjdCByZXN1bHRzIGlmIHNlc3Npb24gaXMgaW52YWxpZFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdXNlciBhcHBlYXJzIHRvIGJlIGxvZ2dlZCBpbiBsb2NhbGx5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xvZ2dlZEluU3luYygpIHtcbiAgcmV0dXJuIGdldEN1cnJlbnRVc2VyU3luYygpICE9PSBudWxsO1xufVxuXG4vKipcbiAqIFByb3RlY3RzIGEgcGFnZSB0aGF0IHJlcXVpcmVzIGF1dGhlbnRpY2F0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVkaXJlY3RVcmwgLSBVUkwgdG8gcmVkaXJlY3QgaWYgbm90IGF1dGhlbnRpY2F0ZWRcbiAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBUcnVlIGlmIGF1dGhlbnRpY2F0ZWQsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJvdGVjdFBhZ2UocmVkaXJlY3RVcmwgPSBcIi9sb2dpblwiKSB7XG4gIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCB2YWxpZGF0ZVNlc3Npb24oKTtcblxuICBpZiAoIWlzVmFsaWQpIHtcbiAgICAvLyBSZWRpcmVjdCB0byBsb2dpbiBwYWdlXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVybDtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhdXRoIG9uIHBhZ2UgbG9hZFxuICogQ2FsbCB0aGlzIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91ciBhcHAgaW5pdGlhbGl6YXRpb25cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRBdXRoKCkge1xuICAvLyBWYWxpZGF0ZSBzZXNzaW9uIG9uIHBhZ2UgbG9hZFxuICBhd2FpdCB2YWxpZGF0ZVNlc3Npb24oKTtcblxuICAvLyBTZXQgdXAgYXV0aCBzdGF0ZSBjaGFuZ2UgbGlzdGVuZXJcbiAgc3VwYWJhc2UuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZShhc3luYyAoZXZlbnQsIHNlc3Npb24pID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkF1dGggc3RhdGUgY2hhbmdlZDpcIiwgZXZlbnQpO1xuXG4gICAgaWYgKGV2ZW50ID09PSBcIlNJR05FRF9JTlwiICYmIHNlc3Npb24pIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIlNJR05FRF9PVVRcIikge1xuICAgICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gXCJUT0tFTl9SRUZSRVNIRURcIikge1xuICAgICAgc2V0Q3VycmVudFVzZXIoc2Vzc2lvbi51c2VyKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IFwiVVNFUl9VUERBVEVEXCIpIHtcbiAgICAgIHNldEN1cnJlbnRVc2VyKHNlc3Npb24udXNlcik7XG4gICAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIERpc3BsYXlzIGFuIGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gRXJyb3IgbWVzc2FnZSB0byBkaXNwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtZXNzYWdlLCBlbGVtZW50SWQgPSBcImVycm9yTWVzc2FnZVwiKSB7XG4gIGNvbnN0IGVycm9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlcnJvckVsZW1lbnQpIHtcbiAgICBlcnJvckVsZW1lbnQuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZWxlbWVudCBub3QgZm91bmQ6XCIsIGVsZW1lbnRJZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhIHN0YXR1cyBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIE1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBNZXNzYWdlIHR5cGUgKHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGRhbmdlcilcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB3aGVyZSB0byBkaXNwbGF5IHRoZSBtZXNzYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93U3RhdHVzKFxuICBtZXNzYWdlLFxuICB0eXBlID0gXCJpbmZvXCIsXG4gIGVsZW1lbnRJZCA9IFwic3RhdHVzTWVzc2FnZVwiXG4pIHtcbiAgY29uc3Qgc3RhdHVzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChzdGF0dXNFbGVtZW50KSB7XG4gICAgc3RhdHVzRWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cbiAgICAvLyBSZW1vdmUgYWxsIGFsZXJ0LSogY2xhc3Nlc1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKFwiYWxlcnQtXCIpKSB7XG4gICAgICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWRkIHRoZSBjbGFzcyBjb3JyZXNwb25kaW5nIHRvIHRoZSB0eXBlXG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBhbGVydC0ke3R5cGV9YCk7XG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJTdGF0dXMgZWxlbWVudCBub3QgZm91bmQ6XCIsIGVsZW1lbnRJZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBIaWRlcyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gaGlkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUVsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB0byBzaG93XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50SWQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbi8qKlxuICogU2hvd3MgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWQgLSBJRCBvZiB0aGUgYnV0dG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3Bpbm5lcklkIC0gSUQgb2YgdGhlIHNwaW5uZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dMb2FkaW5nKGJ1dHRvbklkLCBzcGlubmVySWQpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3Bpbm5lcklkKTtcblxuICBpZiAoYnV0dG9uKSBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufVxuXG4vKipcbiAqIEhpZGVzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlTG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gIGlmIChzcGlubmVyKSBzcGlubmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59XG5cbi8vIEV4cG9ydCB0aGUgbmVjZXNzYXJ5IGZ1bmN0aW9ucyBhbmQgdmFyaWFibGVzXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldEN1cnJlbnRVc2VyLFxuICBnZXRDdXJyZW50VXNlclN5bmMsXG4gIHNldEN1cnJlbnRVc2VyLFxuICBsb2dvdXQsXG4gIGlzTG9nZ2VkSW4sXG4gIGlzTG9nZ2VkSW5TeW5jLFxuICB2YWxpZGF0ZVNlc3Npb24sXG4gIHByb3RlY3RQYWdlLFxuICBpbml0QXV0aCxcbiAgc2hvd0Vycm9yLFxuICBzaG93U3RhdHVzLFxuICBoaWRlRWxlbWVudCxcbiAgc2hvd0VsZW1lbnQsXG4gIHNob3dMb2FkaW5nLFxuICBoaWRlTG9hZGluZyxcbn07XG4iLCIvKipcbiAqIEhlYWRlciBBdXRoZW50aWNhdGlvbiBNb2R1bGVcbiAqIEBtb2R1bGUgaGVhZGVyLWF1dGhcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIGR5bmFtaWMgaGVhZGVyIHVwZGF0ZXMgYmFzZWQgb24gYXV0aGVudGljYXRpb24gc3RhdGUgYWNyb3NzIGFsbCBwYWdlc1xuICogQHZlcnNpb24gMS4wLjBcbiAqIEBhdXRob3IgR3JleVBhbmRhXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAxLjAuMCAoMjAyNS0wMS1YWCk6IEluaXRpYWwgdmVyc2lvbiAtIHVuaWZpZWQgaGVhZGVyIGF1dGggbWFuYWdlbWVudCBmb3IgYWxsIHBhZ2VzXG4gKi9cblxuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiLi4vc3VwYWJhc2UtY2xpZW50LmpzXCI7XG5pbXBvcnQgKiBhcyBhdXRoTW9kdWxlIGZyb20gXCIuL2F1dGguanNcIjtcblxubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcblxuLyoqXG4gKiBVcGRhdGUgaGVhZGVyIFVJIGJhc2VkIG9uIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdHxudWxsfSB1c2VyIC0gVGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBvYmplY3Qgb3IgbnVsbFxuICovXG5mdW5jdGlvbiB1cGRhdGVIZWFkZXJGb3JBdXRoU3RhdGUodXNlcikge1xuICBjdXJyZW50VXNlciA9IHVzZXI7XG5cbiAgLy8gR2V0IGhlYWRlciBlbGVtZW50cyAodGhleSBtaWdodCBub3QgZXhpc3Qgb24gYWxsIHBhZ2VzKVxuICBjb25zdCB1c2VyU3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyU3RhdHVzXCIpO1xuICBjb25zdCBsb2dpbkxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luTGlua1wiKTtcbiAgY29uc3Qgc2lnbnVwTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbnVwTGlua1wiKTtcbiAgY29uc3QgbG9nb3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXRCdG5cIik7XG5cbiAgaWYgKHVzZXIpIHtcbiAgICAvLyBVc2VyIGlzIHNpZ25lZCBpbiAtIHNob3cgYXV0aGVudGljYXRlZCBzdGF0ZVxuICAgIGlmICh1c2VyU3RhdHVzKSB7XG4gICAgICB1c2VyU3RhdHVzLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICB1c2VyU3RhdHVzLnRleHRDb250ZW50ID0gXCJWb3RyZSBjb21wdGVcIjtcbiAgICB9XG4gICAgaWYgKGxvZ2luTGluaykgbG9naW5MaW5rLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgaWYgKHNpZ251cExpbmspIHNpZ251cExpbmsuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBpZiAobG9nb3V0QnRuKSBsb2dvdXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcblxuICAgIGNvbnNvbGUubG9nKFwiSGVhZGVyIHVwZGF0ZWQ6IFVzZXIgaXMgYXV0aGVudGljYXRlZFwiKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBVc2VyIGlzIHNpZ25lZCBvdXQgLSBzaG93IGd1ZXN0IHN0YXRlXG4gICAgaWYgKHVzZXJTdGF0dXMpIHVzZXJTdGF0dXMuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBpZiAobG9naW5MaW5rKSBsb2dpbkxpbmsuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBpZiAoc2lnbnVwTGluaykgc2lnbnVwTGluay5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGlmIChsb2dvdXRCdG4pIGxvZ291dEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuXG4gICAgY29uc29sZS5sb2coXCJIZWFkZXIgdXBkYXRlZDogVXNlciBpcyBub3QgYXV0aGVudGljYXRlZFwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNldHVwIGxvZ291dCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgY3VycmVudCBwYWdlXG4gKi9cbmZ1bmN0aW9uIHNldHVwTG9nb3V0SGFuZGxlcigpIHtcbiAgY29uc3QgbG9nb3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXRCdG5cIik7XG4gIGlmIChsb2dvdXRCdG4pIHtcbiAgICAvLyBSZW1vdmUgYW55IGV4aXN0aW5nIGxpc3RlbmVycyB0byBhdm9pZCBkdXBsaWNhdGVzXG4gICAgbG9nb3V0QnRuLnJlcGxhY2VXaXRoKGxvZ291dEJ0bi5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgLy8gR2V0IHRoZSBuZXcgZWxlbWVudCBhbmQgYWRkIGV2ZW50IGxpc3RlbmVyXG4gICAgY29uc3QgbmV3TG9nb3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXRCdG5cIik7XG4gICAgbmV3TG9nb3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIkxvZ291dCBpbml0aWF0ZWQgZnJvbSBoZWFkZXJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbk91dCgpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9nZ2luZyBvdXQ6XCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIGFsZXJ0KFwiRXJyZXVyIGxvcnMgZGUgbGEgZMOpY29ubmV4aW9uLiBWZXVpbGxleiByw6llc3NheWVyLlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ291dCBzdWNjZXNzZnVsLCByZWRpcmVjdGluZyB0byBob21lXCIpO1xuICAgICAgICAgIC8vIFRoZSBvbkF1dGhTdGF0ZUNoYW5nZSB3aWxsIGhhbmRsZSB0aGUgcmVkaXJlY3QgYW5kIFVJIHVwZGF0ZXNcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkV4Y2VwdGlvbiBkdXJpbmcgbG9nb3V0OlwiLCBlcnJvcik7XG4gICAgICAgIGFsZXJ0KFwiVW5lIGVycmV1ciBpbmF0dGVuZHVlIHMnZXN0IHByb2R1aXRlIGxvcnMgZGUgbGEgZMOpY29ubmV4aW9uLlwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEluaXRpYWxpemUgaGVhZGVyIGF1dGhlbnRpY2F0aW9uIGZvciB0aGUgY3VycmVudCBwYWdlXG4gKiBDYWxsIHRoaXMgZnVuY3Rpb24gb24gZXZlcnkgcGFnZSB0aGF0IGhhcyBhIGhlYWRlclxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdEhlYWRlckF1dGgoKSB7XG4gIGNvbnNvbGUubG9nKFwiSW5pdGlhbGl6aW5nIGhlYWRlciBhdXRoZW50aWNhdGlvbi4uLlwiKTtcblxuICAvLyBTZXR1cCBsb2dvdXQgaGFuZGxlclxuICBzZXR1cExvZ291dEhhbmRsZXIoKTtcblxuICAvLyBMaXN0ZW4gZm9yIGF1dGggc3RhdGUgY2hhbmdlc1xuICBzdXBhYmFzZS5hdXRoLm9uQXV0aFN0YXRlQ2hhbmdlKChldmVudCwgc2Vzc2lvbikgPT4ge1xuICAgIGNvbnN0IHVzZXIgPSBzZXNzaW9uPy51c2VyIHx8IG51bGw7XG5cbiAgICAvLyBVcGRhdGUgYXV0aCBtb2R1bGVcbiAgICBhdXRoTW9kdWxlLnNldEN1cnJlbnRVc2VyKHVzZXIpO1xuXG4gICAgLy8gVXBkYXRlIGhlYWRlciBVSVxuICAgIHVwZGF0ZUhlYWRlckZvckF1dGhTdGF0ZSh1c2VyKTtcblxuICAgIC8vIEhhbmRsZSBzcGVjaWZpYyBldmVudHNcbiAgICBpZiAoZXZlbnQgPT09IFwiU0lHTkVEX09VVFwiKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkhlYWRlciBhdXRoOiBVc2VyIHNpZ25lZCBvdXQsIHJlZGlyZWN0aW5nIHRvIGhvbWVcIik7XG4gICAgICAvLyBTbWFsbCBkZWxheSB0byBlbnN1cmUgbG9nb3V0IGNvbXBsZXRlcyBwcm9wZXJseVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gICAgICB9LCAxMDApO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IFwiU0lHTkVEX0lOXCIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSGVhZGVyIGF1dGg6IFVzZXIgc2lnbmVkIGluXCIpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IFwiSU5JVElBTF9TRVNTSU9OXCIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSGVhZGVyIGF1dGg6IEluaXRpYWwgc2Vzc2lvbiBsb2FkZWRcIik7XG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gXCJUT0tFTl9SRUZSRVNIRURcIikge1xuICAgICAgY29uc29sZS5sb2coXCJIZWFkZXIgYXV0aDogVG9rZW4gcmVmcmVzaGVkXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gU2V0IGluaXRpYWwgc3RhdGUgYmFzZWQgb24gc3RvcmVkIHVzZXIgZGF0YVxuICBjb25zdCBpbml0aWFsVXNlciA9IGF1dGhNb2R1bGUuZ2V0Q3VycmVudFVzZXIoKTtcbiAgdXBkYXRlSGVhZGVyRm9yQXV0aFN0YXRlKGluaXRpYWxVc2VyKTtcblxuICBjb25zb2xlLmxvZyhcIkhlYWRlciBhdXRoZW50aWNhdGlvbiBpbml0aWFsaXplZFwiKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGN1cnJlbnQgYXV0aGVudGljYXRlZCB1c2VyXG4gKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9IEN1cnJlbnQgdXNlciBvYmplY3Qgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKSB7XG4gIHJldHVybiBjdXJyZW50VXNlcjtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHVzZXIgaXMgYXV0aGVudGljYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoZW50aWNhdGVkKCkge1xuICByZXR1cm4gY3VycmVudFVzZXIgIT09IG51bGw7XG59XG5cbi8qKlxuICogTWFudWFsbHkgdXBkYXRlIGhlYWRlciBzdGF0ZSAodXNlZnVsIGZvciB0ZXN0aW5nIG9yIHNwZWNpYWwgY2FzZXMpXG4gKiBAcGFyYW0ge09iamVjdHxudWxsfSB1c2VyIC0gVXNlciBvYmplY3Qgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSGVhZGVyKHVzZXIpIHtcbiAgdXBkYXRlSGVhZGVyRm9yQXV0aFN0YXRlKHVzZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRIZWFkZXJBdXRoLFxuICBnZXRDdXJyZW50VXNlcixcbiAgaXNBdXRoZW50aWNhdGVkLFxuICB1cGRhdGVIZWFkZXIsXG59O1xuIiwiLy8gc3JjL2F1dGgvcHJvZmlsZS5qc1xuLyoqXG4gKiBQcm9maWxlIE1vZHVsZVxuICogQG1vZHVsZSBwcm9maWxlXG4gKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB1c2VyIHByb2ZpbGUgbWFuYWdlbWVudCwgaW5jbHVkaW5nIGRhdGEgZmV0Y2hpbmcsIHVwZGF0ZXMsIGFuZCBhY2NvdW50IGRlbGV0aW9uLlxuICogQHZlcnNpb24gMC4yLjFcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMi4xICgyMDI1LTAxLTI3KTogVXBkYXRlZCB0byB1c2UgRW5nbGlzaCBjb2x1bW4gbmFtZXMgYW5kIGFkZGVkIGRhdGVfb2ZfYmlydGggc3VwcG9ydFxuICogLSAwLjIuMCAoMjAyNS0wMS0yNyk6IEZpeGVkIGRhdGFiYXNlIHRhYmxlIHJlZmVyZW5jZXMgYW5kIGZpZWxkIG1hcHBpbmdzIHRvIG1hdGNoIGFjdHVhbCBTdXBhYmFzZSBzdHJ1Y3R1cmVcbiAqIC0gMC4xLjAgKDIwMjUtMDUtMTYpOiBBZGRlZCBwcm9maWxlIGRhdGEgZmV0Y2hpbmcsIHVwZGF0aW5nLCBhbmQgYWNjb3VudCBkZWxldGlvbiBmdW5jdGlvbmFsaXR5LlxuICogLSAwLjAuMiAoMjAyNS0wNS0xNSk6IEltcHJvdmVkIGVycm9yIGhhbmRsaW5nIGFuZCBhZGRlZCBsb2FkaW5nIHN0YXRlcyAocHJldmlvdXMgdmVyc2lvbmluZyB3YXMgZnV0dXJlLWRhdGVkKVxuICogLSAwLjAuMSAoMjAyNS0wNS0xNCk6IEluaXRpYWwgdmVyc2lvbiB3aXRoIGJhc2ljIHByb2ZpbGUgZGlzcGxheSBhbmQgbG9nb3V0LlxuICovXG5cbmltcG9ydCB7XG4gIHByb3RlY3RQYWdlLFxuICBzaG93U3RhdHVzLCAvLyBBc3N1bWluZyB0aGlzIGNhbiB0YXJnZXQgc3BlY2lmaWMgZWxlbWVudHNcbiAgLy8gc2hvd0Vycm9yLCAvLyBXZSBjYW4gdXNlIHNob3dTdGF0dXMgd2l0aCB0eXBlICdlcnJvcidcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufSBmcm9tIFwiLi9hdXRoLmpzXCI7IC8vIEFzc3VtaW5nIGF1dGguanMgZXhwb3J0cyBzaG93U3RhdHVzIHRoYXQgY2FuIHRha2UgYW4gZWxlbWVudCBJRFxuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiLi4vc3VwYWJhc2UtY2xpZW50LmpzXCI7XG5cbi8vIEhlbHBlciB0byBzaG93IHN0YXR1cyBtZXNzYWdlcyBmb3IgcHJvZmlsZSBmb3JtIGFuZCBkZWxldGUgc2VjdGlvblxuZnVuY3Rpb24gc2hvd1Byb2ZpbGVTdGF0dXMobWVzc2FnZSwgdHlwZSwgZWxlbWVudElkKSB7XG4gIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoc3RhdHVzRWxlbWVudCkge1xuICAgIHN0YXR1c0VsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NOYW1lID0gXCJzdGF0dXMtbWVzc2FnZSBtYXJnaW4tdG9wLXNtXCI7IC8vIFJlc2V0IGNsYXNzZXNcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5hZGQodHlwZSk7IC8vICdzdWNjZXNzJywgJ2Vycm9yJywgJ2luZm8nXG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoVXNlclByb2ZpbGUodXNlcklkKSB7XG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJwcm9maWxlc1wiKVxuICAgIC5zZWxlY3QoXCJmaXJzdF9uYW1lLCBsYXN0X25hbWUsIHBob25lLCB1cGRhdGVkX2F0XCIpXG4gICAgLmVxKFwiaWRcIiwgdXNlcklkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXJyb3IgJiYgZXJyb3IuY29kZSAhPT0gXCJQR1JTVDExNlwiKSB7XG4gICAgLy8gUEdSU1QxMTY6IFwicm93IG5vdCBmb3VuZFwiXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHByb2ZpbGU6XCIsIGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVQcm9maWxlRm9ybShwcm9maWxlKSB7XG4gIGlmICghcHJvZmlsZSkgcmV0dXJuO1xuXG4gIC8vIE1hcCBkYXRhYmFzZSBmaWVsZHMgdG8gSFRNTCBmb3JtIGZpZWxkcyAoSFRNTCBzdGlsbCB1c2VzIEZyZW5jaCBmaWVsZCBuYW1lcylcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub21cIikudmFsdWUgPSBwcm9maWxlLmxhc3RfbmFtZSB8fCBcIlwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZW5vbVwiKS52YWx1ZSA9IHByb2ZpbGUuZmlyc3RfbmFtZSB8fCBcIlwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlbGVwaG9uZVwiKS52YWx1ZSA9IHByb2ZpbGUucGhvbmUgfHwgXCJcIjtcblxuICAvLyBIYW5kbGUgZGF0ZSBvZiBiaXJ0aFxuICBpZiAocHJvZmlsZS5kYXRlX29mX2JpcnRoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlTmFpc3NhbmNlXCIpLnZhbHVlID0gcHJvZmlsZS5kYXRlX29mX2JpcnRoO1xuICB9XG5cbiAgY29uc3QgbWVtYmVyU2luY2VFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVtYmVyU2luY2VcIik7XG4gIGlmIChtZW1iZXJTaW5jZUVsICYmIHByb2ZpbGUudXBkYXRlZF9hdCkge1xuICAgIG1lbWJlclNpbmNlRWwudGV4dENvbnRlbnQgPSBuZXcgRGF0ZShwcm9maWxlLnVwZGF0ZWRfYXQpLnRvTG9jYWxlRGF0ZVN0cmluZyhcbiAgICAgIFwiZnItRlJcIlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRQcm9maWxlUGFnZSgpIHtcbiAgaWYgKCEoYXdhaXQgcHJvdGVjdFBhZ2UoKSkpIHJldHVybjtcblxuICBjb25zdCB1c2VyRW1haWxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckVtYWlsXCIpO1xuICBjb25zdCBsb2dvdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ291dEJ0blwiKTtcbiAgY29uc3QgcHJvZmlsZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2ZpbGVGb3JtXCIpO1xuICBjb25zdCBkZWxldGVBY2NvdW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWxldGVBY2NvdW50QnRuXCIpO1xuICBjb25zdCBtZW1iZXJTaW5jZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW1iZXJTaW5jZVwiKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGE6IHsgc2Vzc2lvbiB9LFxuICAgIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFNlc3Npb24oKTtcbiAgICBpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24udXNlcikge1xuICAgICAgY29uc29sZS5sb2coXCJObyBhY3RpdmUgc2Vzc2lvbiBvciB1c2VyLiBSZWRpcmVjdGluZyB0byBsb2dpbi5cIik7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB1c2VyID0gc2Vzc2lvbi51c2VyO1xuXG4gICAgaWYgKHVzZXJFbWFpbEVsKSB7XG4gICAgICB1c2VyRW1haWxFbC50ZXh0Q29udGVudCA9IHVzZXIuZW1haWw7XG4gICAgfVxuICAgIGlmIChtZW1iZXJTaW5jZUVsICYmIHVzZXIuY3JlYXRlZF9hdCkge1xuICAgICAgbWVtYmVyU2luY2VFbC50ZXh0Q29udGVudCA9IG5ldyBEYXRlKHVzZXIuY3JlYXRlZF9hdCkudG9Mb2NhbGVEYXRlU3RyaW5nKFxuICAgICAgICBcImZyLUZSXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gRmV0Y2ggYW5kIHBvcHVsYXRlIHByb2ZpbGVcbiAgICBzaG93TG9hZGluZyhcInNhdmVQcm9maWxlQnRuXCIpO1xuICAgIGNvbnN0IHByb2ZpbGUgPSBhd2FpdCBmZXRjaFVzZXJQcm9maWxlKHVzZXIuaWQpO1xuICAgIGlmIChwcm9maWxlKSB7XG4gICAgICBwb3B1bGF0ZVByb2ZpbGVGb3JtKHByb2ZpbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHByb2ZpbGUgZGF0YSBmb3VuZCBmb3IgdXNlciwgZm9ybSB3aWxsIGJlIGVtcHR5LlwiKTtcbiAgICB9XG4gICAgaGlkZUxvYWRpbmcoXCJzYXZlUHJvZmlsZUJ0blwiKTtcblxuICAgIGlmIChsb2dvdXRCdG4pIHtcbiAgICAgIGxvZ291dEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBzaG93TG9hZGluZyhcImxvZ291dEJ0blwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25PdXQoKTtcbiAgICAgICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgICAgIHNob3dQcm9maWxlU3RhdHVzKFxuICAgICAgICAgICAgXCJEw6ljb25uZXhpb24gcsOpdXNzaWUuIFJlZGlyZWN0aW9uLi4uXCIsXG4gICAgICAgICAgICBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIFwicHJvZmlsZUZvcm1TdGF0dXNcIlxuICAgICAgICAgICk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNpZ25pbmcgb3V0OlwiLCBlcnJvcik7XG4gICAgICAgICAgc2hvd1Byb2ZpbGVTdGF0dXMoXG4gICAgICAgICAgICBgRXJyZXVyIGRlIGTDqWNvbm5leGlvbjogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICAgICAgICBcImVycm9yXCIsXG4gICAgICAgICAgICBcInByb2ZpbGVGb3JtU3RhdHVzXCJcbiAgICAgICAgICApO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGhpZGVMb2FkaW5nKFwibG9nb3V0QnRuXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJvZmlsZUZvcm0pIHtcbiAgICAgIHByb2ZpbGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzaG93TG9hZGluZyhcInNhdmVQcm9maWxlQnRuXCIpO1xuICAgICAgICBjb25zdCBwcm9maWxlU3RhdHVzRWwgPSBcInByb2ZpbGVGb3JtU3RhdHVzXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByb2ZpbGVTdGF0dXNFbCkuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcblxuICAgICAgICAvLyBHZXQgZm9ybSB2YWx1ZXMgYW5kIG1hcCB0byBkYXRhYmFzZSBmaWVsZHMgKHVzaW5nIEVuZ2xpc2ggY29sdW1uIG5hbWVzKVxuICAgICAgICBjb25zdCB1cGRhdGVzID0ge1xuICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgIGxhc3RfbmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub21cIikudmFsdWUudHJpbSgpLFxuICAgICAgICAgIGZpcnN0X25hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlbm9tXCIpLnZhbHVlLnRyaW0oKSxcbiAgICAgICAgICBwaG9uZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZWxlcGhvbmVcIikudmFsdWUudHJpbSgpLFxuICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZW1vdmUgZW1wdHkgZmllbGRzIHRvIGF2b2lkIGNvbnN0cmFpbnQgdmlvbGF0aW9uc1xuICAgICAgICBPYmplY3Qua2V5cyh1cGRhdGVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBpZiAodXBkYXRlc1trZXldID09PSBcIlwiICYmIGtleSAhPT0gXCJpZFwiICYmIGtleSAhPT0gXCJ1cGRhdGVkX2F0XCIpIHtcbiAgICAgICAgICAgIHVwZGF0ZXNba2V5XSA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJwcm9maWxlc1wiKS51cHNlcnQodXBkYXRlcyk7XG4gICAgICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgICAgICBzaG93UHJvZmlsZVN0YXR1cyhcbiAgICAgICAgICAgIFwiUHJvZmlsIG1pcyDDoCBqb3VyIGF2ZWMgc3VjY8OocyAhXCIsXG4gICAgICAgICAgICBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIHByb2ZpbGVTdGF0dXNFbFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIHByb2ZpbGU6XCIsIGVycm9yKTtcbiAgICAgICAgICBzaG93UHJvZmlsZVN0YXR1cyhcbiAgICAgICAgICAgIGBFcnJldXIgbG9ycyBkZSBsYSBtaXNlIMOgIGpvdXI6ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICAgICAgcHJvZmlsZVN0YXR1c0VsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBoaWRlTG9hZGluZyhcInNhdmVQcm9maWxlQnRuXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZGVsZXRlQWNjb3VudEJ0bikge1xuICAgICAgZGVsZXRlQWNjb3VudEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWxldGVTdGF0dXNFbCA9IFwiZGVsZXRlU3RhdHVzTWVzc2FnZVwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZWxldGVTdGF0dXNFbCkuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgY29uZmlybShcbiAgICAgICAgICAgIFwiw4p0ZXMtdm91cyBzw7tyIGRlIHZvdWxvaXIgc3VwcHJpbWVyIHZvdHJlIGNvbXB0ZSA/IENldHRlIGFjdGlvbiBlc3QgaXJyw6l2ZXJzaWJsZSBldCB0b3V0ZXMgdm9zIGRvbm7DqWVzIHNlcm9udCBwZXJkdWVzLlwiXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBzaG93TG9hZGluZyhcImRlbGV0ZUFjY291bnRCdG5cIik7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZpcnN0IGRlbGV0ZSB0aGUgcHJvZmlsZVxuICAgICAgICAgICAgY29uc3QgeyBlcnJvcjogcHJvZmlsZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXG4gICAgICAgICAgICAgIC5kZWxldGUoKVxuICAgICAgICAgICAgICAuZXEoXCJpZFwiLCB1c2VyLmlkKTtcblxuICAgICAgICAgICAgaWYgKHByb2ZpbGVFcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgcHJvZmlsZTpcIiwgcHJvZmlsZUVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVGhlbiB0cnkgdG8gZGVsZXRlIHRoZSB1c2VyIGFjY291bnQgKHRoaXMgbWlnaHQgcmVxdWlyZSBhZG1pbiBwcml2aWxlZ2VzKVxuICAgICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UucnBjKFwiZGVsZXRlX3VzZXJfYWNjb3VudFwiKTtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAvLyBJZiBSUEMgZG9lc24ndCBleGlzdCwganVzdCBzaWduIG91dCB0aGUgdXNlclxuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJkZWxldGVfdXNlcl9hY2NvdW50IFJQQyBub3QgYXZhaWxhYmxlOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbk91dCgpO1xuICAgICAgICAgICAgICBzaG93UHJvZmlsZVN0YXR1cyhcbiAgICAgICAgICAgICAgICBcIlByb2ZpbCBzdXBwcmltw6kuIFZldWlsbGV6IGNvbnRhY3RlciBsJ2FkbWluaXN0cmF0ZXVyIHBvdXIgc3VwcHJpbWVyIGNvbXBsw6h0ZW1lbnQgdm90cmUgY29tcHRlLlwiLFxuICAgICAgICAgICAgICAgIFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgIGRlbGV0ZVN0YXR1c0VsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzaG93UHJvZmlsZVN0YXR1cyhcbiAgICAgICAgICAgICAgICBcIkNvbXB0ZSBzdXBwcmltw6kgYXZlYyBzdWNjw6hzLiBWb3VzIGFsbGV6IMOqdHJlIGTDqWNvbm5lY3TDqSBldCByZWRpcmlnw6kuXCIsXG4gICAgICAgICAgICAgICAgXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgZGVsZXRlU3RhdHVzRWxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduT3V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBhY2NvdW50OlwiLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93UHJvZmlsZVN0YXR1cyhcbiAgICAgICAgICAgICAgYEVycmV1ciBsb3JzIGRlIGxhIHN1cHByZXNzaW9uIGR1IGNvbXB0ZTogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICAgICAgICAgIFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgZGVsZXRlU3RhdHVzRWxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGhpZGVMb2FkaW5nKFwiZGVsZXRlQWNjb3VudEJ0blwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIGNhbmNlbGxlZCBhY2NvdW50IGRlbGV0aW9uLlwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9maWxlIHBhZ2UgaW5pdGlhbGl6YXRpb24gZXJyb3I6XCIsIGVycm9yKTtcbiAgICBjb25zdCBtYWluRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2ZpbGVEZXRhaWxzXCIpO1xuICAgIGlmIChtYWluRXJyb3JDb250YWluZXIpIHtcbiAgICAgIG1haW5FcnJvckNvbnRhaW5lci5pbm5lckhUTUwgPVxuICAgICAgICAnPHAgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+SW1wb3NzaWJsZSBkZSBjaGFyZ2VyIGxlcyBpbmZvcm1hdGlvbnMgZHUgcHJvZmlsLiBWZXVpbGxleiByw6llc3NheWVyIHBsdXMgdGFyZC48L3A+JztcbiAgICB9XG4gIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSB0aGUgcGFnZSB3aGVuIERPTSBpcyByZWFkeVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdFByb2ZpbGVQYWdlKTtcbiIsIi8vIHNyYy9qcy9lbnRyaWVzL3Byb2ZpbGUuanMgLSBQcm9maWxlIHBhZ2UgZW50cnkgcG9pbnRcbmltcG9ydCBcIi4uL3Byb2ZpbGUtcGFnZS5qc1wiO1xuIiwiLy8gc3JjL2pzL3Byb2ZpbGUtcGFnZS5qcyAtIFByb2ZpbGUgcGFnZSBmdW5jdGlvbmFsaXR5XG5pbXBvcnQgeyBpbml0UHJvZmlsZVBhZ2UgfSBmcm9tIFwiLi9hdXRoL3Byb2ZpbGUuanNcIjtcbmltcG9ydCB7IGluaXRIZWFkZXJBdXRoIH0gZnJvbSBcIi4vYXV0aC9oZWFkZXItYXV0aC5qc1wiO1xuXG4vLyBJbml0aWFsaXplIGJvdGggcHJvZmlsZSBmdW5jdGlvbmFsaXR5IGFuZCBoZWFkZXIgYXV0aGVudGljYXRpb25cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgaW5pdEhlYWRlckF1dGgoKTtcbiAgaW5pdFByb2ZpbGVQYWdlKCk7XG4gIGNvbnNvbGUubG9nKFwiUHJvZmlsZSBwYWdlIGFuZCBoZWFkZXIgYXV0aGVudGljYXRpb24gaW5pdGlhbGl6ZWRcIik7XG59KTtcbiIsIi8vIHNyYy9qcy9zdXBhYmFzZS1jbGllbnQuanNcbi8qKlxuICogU3VwYWJhc2UgQ2xpZW50XG4gKiBAbW9kdWxlIHN1cGFiYXNlLWNsaWVudFxuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIFN1cGFiYXNlIGNsaWVudCBpbml0aWFsaXphdGlvbiBhbmQgY29uZmlndXJhdGlvbi5cbiAqIEB2ZXJzaW9uIDAuMC4yXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjIgKDIwMjUtMDUtMjcpOiBBZGRlZCBlbnZpcm9uZW1lbnQgdmFyaWFibGVzIGVycm9yIGhhbmRsaW5nIGZvciBtaXNzaW5nLlxuICogLSAwLjAuMSAoMjAyNS0wNS0wOSk6IEluaXRpYWwgdmVyc2lvbiB3aXRoIGJhc2ljIFN1cGFiYXNlIGNsaWVudCBpbml0aWFsaXphdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XG5cbmNvbnN0IHN1cGFiYXNlVXJsID0gXCJodHRwczovL29mZXlzc2lwaWJrdG1iZmViaWJvLnN1cGFiYXNlLmNvXCI7XG5jb25zdCBzdXBhYmFzZUFub25LZXkgPVxuICBcImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSnpkWEJoWW1GelpTSXNJbkpsWmlJNkltOW1aWGx6YzJsd2FXSnJkRzFpWm1WaWFXSnZJaXdpY205c1pTSTZJbUZ1YjI0aUxDSnBZWFFpT2pFM05ETTVNalV3T1RRc0ltVjRjQ0k2TWpBMU9UVXdNVEE1TkgwLnc3MUNBS2ZvbGt0elJsLVRtTFZoSFlhRWJoQ2ZWazRBN1lyYUVVQ2dsclVcIjtcblxuaWYgKCFzdXBhYmFzZVVybCB8fCAhc3VwYWJhc2VBbm9uS2V5KSB7XG4gIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzXCIpO1xufVxuXG5jb25zdCBjbGllbnQgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSk7XG5cbmV4cG9ydCBjb25zdCBzdXBhYmFzZSA9IGNsaWVudDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcImpzL1wiICsgY2h1bmtJZCArIFwiLmJ1bmRsZS5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJ1cmJhbmRvY3Nfd2ViYXBwOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0NSSVBUJylcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC9eYmxvYjovLCBcIlwiKS5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmwgKyBcIi4uL1wiOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInByb2ZpbGVcIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3VyYmFuZG9jc193ZWJhcHBcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdXJiYW5kb2NzX3dlYmFwcFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfc3VwYWJhc2Vfc3VwYWJhc2UtanNfZGlzdF9tb2R1bGVfaW5kZXhfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvZW50cmllcy9wcm9maWxlLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=