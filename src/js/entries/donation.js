// src/js/entries/donation.js - Donation page entry point
import { initHeaderAuth } from "../auth/header-auth.js";
import { initDonationSystem } from "../modules/donation-system.js";

// Initialize header authentication and donation system when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize header authentication
    initHeaderAuth();

    // Initialize donation system (no longer async)
    const donationSystemInitialized = initDonationSystem();

    if (donationSystemInitialized) {
      console.log("Donation page initialized successfully");
    } else {
      console.error("Failed to initialize donation system");
    }
  } catch (error) {
    console.error("Error initializing donation page:", error);
  }
});
