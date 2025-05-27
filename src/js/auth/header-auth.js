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

import { supabase } from "../supabase-client.js";
import * as authModule from "./auth.js";

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
        const { error } = await supabase.auth.signOut();
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
export function initHeaderAuth() {
  console.log("Initializing header authentication...");

  // Setup logout handler
  setupLogoutHandler();

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user || null;

    // Update auth module
    authModule.setCurrentUser(user);

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
  const initialUser = authModule.getCurrentUser();
  updateHeaderForAuthState(initialUser);

  console.log("Header authentication initialized");
}

/**
 * Get the current authenticated user
 * @returns {Object|null} Current user object or null
 */
export function getCurrentUser() {
  return currentUser;
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export function isAuthenticated() {
  return currentUser !== null;
}

/**
 * Manually update header state (useful for testing or special cases)
 * @param {Object|null} user - User object or null
 */
export function updateHeader(user) {
  updateHeaderForAuthState(user);
}

export default {
  initHeaderAuth,
  getCurrentUser,
  isAuthenticated,
  updateHeader,
};
