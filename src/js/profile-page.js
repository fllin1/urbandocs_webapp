// src/js/profile-page.js - Profile page functionality
import { initProfilePage } from "./auth/profile.js";
import { initHeaderAuth } from "./auth/header-auth.js";

// Initialize both profile functionality and header authentication
document.addEventListener("DOMContentLoaded", () => {
  initHeaderAuth();
  initProfilePage();
  console.log("Profile page and header authentication initialized");
});
