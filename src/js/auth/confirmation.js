// src/auth/confirmation.js
/**
 * Confirmation Module
 * @module confirmation
 * @description Handles email confirmation with Supabase API
 * @version 0.1.0
 *
 * @changelog
 * - 0.1.0 (2025-05-15): Converted to use direct Supabase API calls instead of Firebase Cloud Functions.
 * - 0.0.3 (2025-05-12): Updated terms of service modal and confirmation email.
 * - 0.0.2 (2025-05-10): Added terms of service and confirmation email.
 * - 0.0.1 (2025-05-08): Created the confirmation module with basic functionality.
 */

import { showStatus, showError, showLoading, hideLoading } from "./auth.js";

/**
 * Initializes the email confirmation page
 */
export function initConfirmationPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const confirmationUrl = urlParams.get("confirmation_url");

  const confirmButton = document.getElementById("confirmButton");
  const statusMessage = document.getElementById("statusMessage");
  const tosCheckbox = document.getElementById("tosCheckbox");
  const tosModalElement = document.getElementById("tosModal");
  const tosModalBody = document.getElementById("tosModalBody");

  // Exit early if no confirmation URL is present
  if (!confirmationUrl) {
    statusMessage.textContent =
      "Error: Missing confirmation URL. Please check the link in your email.";
    statusMessage.classList.add("alert-danger");
    statusMessage.classList.remove("d-none");
    confirmButton.disabled = true;
    return;
  }

  if (tosModalElement) {
    tosModalElement.addEventListener("show.bs.modal", async () => {
      if (tosModalBody.dataset.loaded !== "true") {
        try {
          const response = await fetch("/terms"); // Use clean URL
          if (!response.ok) {
            throw new Error(
              `Failed to load Terms of Service: ${response.status}`
            );
          }
          const tosHtml = await response.text();
          tosModalBody.innerHTML = tosHtml;
          tosModalBody.dataset.loaded = "true"; // Mark as loaded to prevent multiple fetches
        } catch (error) {
          console.error(error);
          tosModalBody.innerHTML =
            "<p class='text-danger'>Could not load Terms of Service. Please try again later.</p>";
        }
      }
    });

    tosModalBody.addEventListener("scroll", () => {
      // Check if scrolled to the bottom (with a small tolerance)
      if (
        tosModalBody.scrollHeight - tosModalBody.scrollTop <=
        tosModalBody.clientHeight + 2
      ) {
        // +2 for tolerance
        tosCheckbox.disabled = false;
      }
    });
  }

  if (tosCheckbox) {
    tosCheckbox.addEventListener("change", () => {
      confirmButton.disabled = !tosCheckbox.checked;
    });
  }

  confirmButton.addEventListener("click", () => {
    if (!tosCheckbox.checked) {
      showError(
        "Veuillez accepter les Conditions d'Utilisation pour continuer."
      );
      // Ensure statusMessage is visible if showError doesn't handle it or if you want a specific style
      if (statusMessage) {
        statusMessage.innerHTML =
          "<div class='alert alert-danger'>Veuillez accepter les Conditions d'Utilisation pour continuer.</div>";
        statusMessage.classList.remove("d-none");
      }
      return;
    }
    confirmEmail(confirmationUrl);
  });
}

/**
 * Confirms the email address directly with Supabase using the confirmation URL
 * @param {string} confirmationUrl - Confirmation URL received by email
 */
export async function confirmEmail(confirmationUrl) {
  const confirmButton = document.getElementById("confirmButton");
  const statusMessage = document.getElementById("statusMessage");
  const loading = document.getElementById("loading");
  const confirmSpinner = document.getElementById("confirmSpinner");
  const tosCheckbox = document.getElementById("tosCheckbox");

  // Ensure ToS is checked before proceeding
  if (!tosCheckbox || !tosCheckbox.checked) {
    showError("Les Conditions d'Utilisation doivent être acceptées.");
    if (statusMessage) {
      statusMessage.innerHTML =
        "<div class='alert alert-danger'>Les Conditions d'Utilisation doivent être acceptées.</div>";
      statusMessage.classList.remove("d-none");
    }
    return;
  }

  // Show loading indicator
  showLoading("confirmButton", "confirmSpinner");

  if (loading) loading.classList.remove("d-none");
  if (statusMessage) statusMessage.classList.add("d-none");

  try {
    // Decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(confirmationUrl);

    console.log("Confirming email with URL:", decodedUrl);

    // Direct request to Supabase confirmation URL
    const response = await fetch(decodedUrl);

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

    // Parse the response from Supabase
    if (response.ok) {
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
        window.location.href = "/login";
      }, 2000);
    } else {
      // Handle specific Supabase error messages
      let errorMessage = "La confirmation a échoué.";

      if (responseData && typeof responseData === "object") {
        // Try to extract error message from Supabase response format
        if (responseData.error_description) {
          errorMessage = responseData.error_description;
        } else if (responseData.msg) {
          errorMessage = responseData.msg;
        } else if (responseData.error) {
          errorMessage = responseData.error;
        }
      }

      throw new Error(errorMessage);
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
