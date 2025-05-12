// src/entries/confirmation.js
/**
 * Confirmation Entry Point
 *
 * This module serves as the entry point for the email confirmation page.
 */

// Import our confirmation module
import { initConfirmationPage } from "../auth/confirmation.js";

// Initialize confirmation page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize confirmation page
  initConfirmationPage();

  console.log("Confirmation page initialized");
});
