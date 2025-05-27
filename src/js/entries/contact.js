// src/js/entries/contact.js - Contact page entry point
import { initHeaderAuth } from "../auth/header-auth.js";

// Initialize header authentication when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initHeaderAuth();
  console.log("Contact page header authentication initialized");
});
