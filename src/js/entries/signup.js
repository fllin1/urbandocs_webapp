// src/js/entries/signup.js
/**
 * Signup Entry Point
 *
 * This module serves as the entry point for the signup page.
 */

// Import Firebase initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Import our signup module
import { initSignupPage } from "../auth/signup.js";

// Import Firebase configuration
import { firebaseConfig } from "../firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize signup page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize signup page
  initSignupPage();

  console.log("Signup page initialized");
});
