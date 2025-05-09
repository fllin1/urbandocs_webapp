// src/js/confirmation.js
/**
 * Confirmation Module
 * @module confirmation
 * @description Handles email confirmation after registration
 * @version 0.0.1
 *
 * @changelog
 * - 0.0.1 (2025-05-08): Created the confirmation module with basic functionality.
 */

import {
  API_URLS,
  showStatus,
  showError,
  showLoading,
  hideLoading,
} from "./auth.js";

/**
 * Initializes the email confirmation page
 */
export function initConfirmationPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const confirmationUrl = urlParams.get("confirmation_url");

  const confirmButton = document.getElementById("confirmButton");
  const statusMessage = document.getElementById("statusMessage");

  // Exit early if no confirmation URL is present
  if (!confirmationUrl) {
    statusMessage.textContent =
      "Error: Missing confirmation URL. Please check the link in your email.";
    statusMessage.classList.add("alert-danger");
    statusMessage.classList.remove("d-none");
    confirmButton.disabled = true;
    return;
  }

  confirmButton.addEventListener("click", () => confirmEmail(confirmationUrl));
}

/**
 * Confirms the email address with the confirmation URL
 * @param {string} confirmationUrl - Confirmation URL received by email
 */
export async function confirmEmail(confirmationUrl) {
  const confirmButton = document.getElementById("confirmButton");
  const statusMessage = document.getElementById("statusMessage");
  const loading = document.getElementById("loading");
  const confirmSpinner = document.getElementById("confirmSpinner");

  // Show loading indicator
  showLoading("confirmButton", "confirmSpinner");

  if (loading) loading.classList.remove("d-none");
  if (statusMessage) statusMessage.classList.add("d-none");

  try {
    const url = `${
      API_URLS.HANDLE_CONFIRMATION
    }?confirmation_url=${encodeURIComponent(confirmationUrl)}`;

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
      // Hide loading
      hideLoading("confirmButton", "confirmSpinner");
      if (loading) loading.classList.add("d-none");

      // Show success message
      showStatus(
        "Your email has been verified! Redirecting to the login page...",
        "success"
      );

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 2000);
    } else {
      // Handle non-successful responses
      throw new Error(`The server responded with status: ${response.status}`);
    }
  } catch (error) {
    // Handle errors
    console.error("Confirmation error:", error);
    console.error("Error stack:", error.stack);

    // Hide loading
    hideLoading("confirmButton", "confirmSpinner");
    if (loading) loading.classList.add("d-none");

    // Show error message
    showStatus(
      `An error occurred during confirmation: ${error.message}`,
      "danger"
    );
  }
}

export default {
  initConfirmationPage,
  confirmEmail,
};
