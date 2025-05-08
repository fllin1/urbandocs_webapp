// src/js/entries/signup.js
/**
 * Login Entry Point
 *
 * This module serves as the entry point for the login page.
 */

// Import Firebase initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Import our login module
import { initLoginPage } from "../auth/login.js";

// Import Firebase configuration
import { firebaseConfig } from "../firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize login page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize login page
  initLoginPage();

  console.log("Login page initialized");
});
