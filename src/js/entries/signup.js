// src/entries/signup.js
/**
 * Signup Entry Point
 *
 * This module serves as the entry point for the signup page.
 */

// Import our signup module
import { initSignupPage } from "../auth/signup.js";

// Initialize signup page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize signup page
  initSignupPage();

  console.log("Signup page initialized");
});
