// src/entries/auth.js
/**
 * Authentication Entry Point
 *
 * This module serves as the main entry point for authentication-related functionality.
 * It initializes Firebase and exports common authentication functions.
 */

// Import base authentication module
import * as authModule from "../auth/auth.js";

// Initialize authentication when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Authentication module initialized");
});

// Export auth-related functions and objects
export const currentUser = authModule.getCurrentUser;
export const setCurrentUser = authModule.setCurrentUser;
export const logout = authModule.logout;
export const isLoggedIn = authModule.isLoggedIn;
