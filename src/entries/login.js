// src/js/entries/signup.js
/**
 * Login Entry Point
 *
 * This module serves as the entry point for the login page.
 */

// Import our login module
import { initLoginPage } from "../auth/login.js";

// Initialize login page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize login page
  initLoginPage();

  console.log("Login page initialized");
});
