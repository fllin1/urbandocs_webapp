// src/auth/signup.js
/**
 * Signup Module
 * @module signup
 * @description Handles user registration with client-side validation
 * @version 0.0.3
 *
 * @changelog
 * - 0.0.3 (2025-05-13): Ensure status message is also hidden on new submit.
 * - 0.0.2 (2025-05-10): Added robust client-side email format and password complexity validation.
 * - 0.0.1 (2025-05-08): Created the signup module with basic functionality.
 */

import {
  API_URLS,
  showError,
  showStatus,
  showLoading,
  hideLoading,
} from "./auth.js";

/**
 * Initializes the signup page
 */
export function initSignupPage() {
  const signupForm = document.getElementById("signupForm");
  const errorMessageDiv = document.getElementById("errorMessage"); // Renamed for clarity
  const statusMessage = document.getElementById("statusMessage");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset messages
      if (errorMessageDiv) {
        errorMessageDiv.classList.add("hidden");
        errorMessageDiv.innerHTML = "";
      }
      if (statusMessage) {
        statusMessage.classList.add("hidden");
        statusMessage.textContent = "";
      }

      // Get form values
      const email = document.getElementById("email").value.trim(); // Trim whitespace from email
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      let validationErrors = []; // Array to collect all validation errors

      // --- Client-side Validation ---

      // 1. Email Format Validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email format
      if (!emailPattern.test(email)) {
        validationErrors.push("L'adresse email n'est pas valide.");
      }

      // 2. Check if passwords match
      if (password !== confirmPassword) {
        validationErrors.push("Les mots de passe ne correspondent pas.");
      }

      // 3. Password Strength Validation
      const passwordComplexityPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordComplexityPattern.test(password) || password.length < 8) {
        validationErrors.push("Le format du mot de passe est invalide.");
      }

      // --- Handle Validation Results ---

      if (validationErrors.length > 0) {
        // NOTE: The \n is not working as expected
        const errorText = validationErrors.join("<br>");
        showError(errorText);
        return; // Stop the process if validation fails
      }

      // If validation passes, proceed with the original logic

      // Show loading state
      showLoading("signupBtn", "signupSpinner");

      try {
        // Call signup function
        await signup(email, password);
      } catch (error) {
        console.error("Signup error:", error);
        // showError expects a string, extract message or provide a default
        showError(
          error.message || "Une erreur est survenue lors de l'inscription."
        );
      } finally {
        // Reset button state
        hideLoading("signupBtn", "signupSpinner");
      }
    });
  } else {
    console.error(
      "CRITICAL: Signup form with ID 'signupForm' not found. Event listener not attached."
    );
  }
}

/**
 * Registers a user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise resolved on success
 */
export async function signup(email, password) {
  try {
    // Create request data
    const requestData = {
      email: email,
      password: password,
    };

    // Call Firebase function (assuming this calls a Firebase Function or similar backend)
    const response = await fetch(API_URLS.HANDLE_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    // Parse response
    const responseData = await response.json();

    // Check for error in response
    if (!response.ok) {
      // Handle known error cases from backend
      if (responseData.error) {
        // Re-throw the specific backend error message
        throw new Error(responseData.error);
      }
      // Fallback for unexpected server errors
      throw new Error(`Erreur du serveur: ${response.status}`);
    }

    // Success case
    showStatus(
      "Identifiants valides ! Veuillez vérifier votre email pour confirmer votre inscription.",
      "success"
    );

    // Optionally hide form or redirect on success
    document.getElementById("signupForm").style.display = "none"; // Keep this if desired

    return responseData; // Return data if needed by caller
  } catch (error) {
    // Log and re-throw the error to be handled by the caller (in the submit listener)
    console.error("Signup error:", error);
    throw error; // The submit listener's catch block will handle displaying this error
  }
}

export default {
  initSignupPage,
  signup,
};
