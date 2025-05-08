// src/js/entries/confirmation.js
/**
 * Confirmation Entry Point
 *
 * This module serves as the entry point for the email confirmation page.
 */

// Import Firebase initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Import our confirmation module
import { initConfirmationPage } from "../auth/confirmation.js";

// Import Firebase configuration
import { firebaseConfig } from "../firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize confirmation page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize confirmation page
  initConfirmationPage();

  console.log("Confirmation page initialized");
});
