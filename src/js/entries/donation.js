// src/js/entries/donation.js - Donation page entry point
import { initHeaderAuth } from "../auth/header-auth.js";

// Initialize header authentication when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initHeaderAuth();
  console.log("Donation page header authentication initialized");
});
