// src/js/entries/about.js - About page entry point
import { initHeaderAuth } from "../auth/header-auth.js";

// Initialize header authentication when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initHeaderAuth();
  console.log("About page header authentication initialized");
});
