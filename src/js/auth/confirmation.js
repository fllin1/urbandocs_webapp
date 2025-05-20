// src/auth/confirmation.js
/**
 * Confirmation Module
 * @module confirmation
 * @description Handles email confirmation with Supabase API
 * @version 0.1.1
 *
 * @changelog
 * - 0.1.1 (2025-05-17): Corrected success message and redirect to login page.
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
    showError("Erreur: URL de confirmation manquante.");
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

  // If the confirmation is successful, show a success message and redirect to the login page
  const redirectToLogin = () => {
    // Hide loading
    hideLoading("confirmButton", "confirmSpinner");
    if (loading) loading.classList.add("d-none");

    showStatus(
      "Votre email a été vérifié! Redirection vers la page de connexion...",
      "success"
    );
    // Redirect to the login page after 2 seconds
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000); // 2 seconds delay
  };

  // Show loading indicator
  showLoading("confirmButton", "confirmSpinner");

  if (loading) loading.classList.remove("d-none");

  try {
    // Decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(confirmationUrl);

    console.log("Confirming email with URL:", decodedUrl);

    // Direct request to Supabase confirmation URL, but prevent fetch from automatically following the redirect.
    const response = await fetch(decodedUrl, { redirect: "manual" });

    // If response.type is 'opaqueredirect', it means Supabase is trying to redirect.
    // For Supabase email confirmation, a redirect implies the confirmation was successful
    // and it's trying to send the user to the redirect_to URL specified in the confirmation link.
    if (response.type === "opaqueredirect") {
      console.log(
        "Supabase confirmation successful, redirect indicated (opaqueredirect)."
      );
      redirectToLogin();
    } else if (response.ok) {
      // This case is less likely for Supabase confirmation which usually redirects,
      // but handle it if Supabase responds with 2xx without a redirect.
      console.log(
        "Supabase confirmation successful with a direct 2xx response."
      );
      redirectToLogin();
    } else {
      // If it's not an opaqueredirect and not response.ok, then it's an error from Supabase.
      console.log("Supabase confirmation failed with status:", response.status);
      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
        console.log("Error Response JSON:", responseData);
      } else {
        responseData = await response.text();
        console.log("Error Response text:", responseData);
      }

      let errorMessage = "La confirmation a échoué.";
      if (responseData && typeof responseData === "object") {
        if (responseData.error_description) {
          errorMessage = responseData.error_description;
        } else if (responseData.msg) {
          errorMessage = responseData.msg;
        } else if (responseData.error) {
          errorMessage = responseData.error;
        }
      } else if (
        responseData &&
        typeof responseData === "string" &&
        responseData.trim() !== ""
      ) {
        // If responseData is a non-empty string, use it.
        errorMessage = responseData;
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    // Handle errors from decodeURIComponent, network errors for fetch, or errors thrown above.
    console.error("Confirmation processing error:", error);
    if (error.stack) {
      console.error("Error stack:", error.stack);
    }

    // Hide loading
    hideLoading("confirmButton", "confirmSpinner");
    if (loading) loading.classList.add("d-none");

    // Show error message
    // The error.message here will be from new Error(errorMessage) or other JS errors.
    showStatus(
      `Une erreur est survenue durant la confirmation: ${error.message}`, // Standardized error prefix
      "danger"
    );
  }
}

export default {
  initConfirmationPage,
  confirmEmail,
};
