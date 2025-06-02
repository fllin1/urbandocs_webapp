// src/js/entries/contact.js - Contact page entry point
import { initHeaderAuth } from "../auth/header-auth.js";
import { initContactForm } from "../modules/contact-form.js";

// Initialize header authentication and contact form when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize header authentication
    initHeaderAuth();

    // Initialize contact form
    const contactFormInitialized = initContactForm();

    if (contactFormInitialized) {
      console.log("Contact page initialized successfully");
    } else {
      console.warn("Contact form not found on this page");
    }
  } catch (error) {
    console.error("Error initializing contact page:", error);
  }
});
