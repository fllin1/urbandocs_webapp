// src/js/entries/documentation.js - Documentation page entry point
import { initHeaderAuth } from "../auth/header-auth.js";

// Initialize header authentication when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initHeaderAuth();
  console.log("Documentation page header authentication initialized");
});
