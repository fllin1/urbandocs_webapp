// src/js/entries/auth.js
/**
 * Authentication Entry Point
 *
 * This module serves as the main entry point for authentication-related functionality.
 * It initializes Firebase and exports common authentication functions.
 */

// Import Firebase initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Import base authentication module
import * as authModule from "../auth/auth.js";

// Import Firebase configuration
import { firebaseConfig } from "../firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize authentication when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Authentication module initialized");
});

// Export auth-related functions and objects
export const currentUser = authModule.getCurrentUser;
export const setCurrentUser = authModule.setCurrentUser;
export const logout = authModule.logout;
export const isLoggedIn = authModule.isLoggedIn;

// Export Firebase auth instance
export { auth };
