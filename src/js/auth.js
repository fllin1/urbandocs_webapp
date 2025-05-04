// src/js/auth.js
/**
 * Authentication Module
 * @module auth
 * @description This module handles authentication-related functionality including email confirmation, login, and signup.
 * @version 0.0.1
 * @author YourName
 * @todo Add login and signup functionality
 *
 * @changelog
 * - 0.0.1 (2025-05-03): Initial creation with email confirmation functionality
 */

import { showStatus } from "./ui.js"; // Assuming you have this function in ui.js

// --- API URL Definitions ---
const IS_LOCAL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";

const HANDLE_CONFIRMATION_URL = IS_LOCAL
  ? "http://127.0.0.1:5001/urbandocs/us-central1/handle_confirmation"
  : "https://handle-confirmation-up3k3hddtq-uc.a.run.app";

// Authentication state (to be expanded later)
let currentUser = null;

/**
 * Initialize the email confirmation page
 */
function initConfirmationPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const confirmationUrl = urlParams.get("confirmation_url");

  const confirmButton = document.getElementById("confirmButton");
  const statusMessage = document.getElementById("statusMessage");

  // Exit early if no confirmation URL is present
  if (!confirmationUrl) {
    statusMessage.textContent =
      "Erreur : URL de confirmation manquante. Veuillez vérifier le lien dans votre email.";
    statusMessage.classList.add("alert-danger");
    statusMessage.classList.remove("d-none");
    confirmButton.disabled = true;
    return;
  }

  confirmButton.addEventListener("click", () => confirmEmail(confirmationUrl));
}

/**
 * Handle email confirmation
 * @param {string} confirmationUrl - The confirmation URL from the email
 */
async function confirmEmail(confirmationUrl) {
  const confirmButton = document.getElementById("confirmButton");
  const statusMessage = document.getElementById("statusMessage");
  const loading = document.getElementById("loading");
  const confirmSpinner = document.getElementById("confirmSpinner");

  // Show loading indicator
  loading.classList.remove("d-none");
  confirmSpinner.classList.remove("d-none");
  confirmButton.disabled = true;
  statusMessage.classList.add("d-none");

  try {
    const url = `${HANDLE_CONFIRMATION_URL}?confirmation_url=${encodeURIComponent(
      confirmationUrl
    )}`;

    console.log("Confirming email with URL:", url);

    const response = await fetch(url);

    // Log the full response for debugging
    console.log("Response status:", response.status);
    console.log("Response headers:", [...response.headers.entries()]);

    let responseData;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
      console.log("Response JSON:", responseData);
    } else {
      responseData = await response.text();
      console.log("Response text:", responseData);
    }

    // Don't throw error for successful responses
    // Some servers return 200, 201, 202, 204 for success
    if (response.ok || response.status === 204) {
      // Show success message
      loading.classList.add("d-none");
      confirmSpinner.classList.add("d-none");
      statusMessage.textContent =
        "Votre email a été vérifié ! Redirection vers la page de connexion...";
      statusMessage.className = "alert alert-success";
      statusMessage.classList.remove("d-none");

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 2000);
    } else {
      // Handle non-successful responses
      throw new Error(
        `Le serveur a répondu avec le statut : ${response.status}`
      );
    }
  } catch (error) {
    // Handle errors
    console.error("Confirmation error:", error);
    console.error("Error stack:", error.stack);

    loading.classList.add("d-none");
    confirmSpinner.classList.add("d-none");
    statusMessage.textContent = `Une erreur s'est produite lors de la confirmation : ${error.message}`;
    statusMessage.className = "alert alert-danger";
    statusMessage.classList.remove("d-none");
    confirmButton.disabled = false;
  }
}

/**
 * Initialize authentication functionality based on current page
 */
function initAuth() {
  // Check if we're on the confirmation page
  if (document.getElementById("confirmButton")) {
    initConfirmationPage();
  }

  // TODO: Add initialization for login page
  // TODO: Add initialization for signup page
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initAuth);

// Export functions and variables that might be needed by other modules
export { currentUser, confirmEmail, initAuth };
