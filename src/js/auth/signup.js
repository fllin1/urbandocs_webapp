// src/auth/signup.js
/**
 * Signup Module
 * @module signup
 * @description Handles user registration with client-side validation using Supabase
 * @version 0.1.0
 *
 * @changelog
 * - 0.1.0 (2025-05-15): Migrated to Supabase client-side auth
 * - 0.0.3 (2025-05-13): Ensure status message is also hidden on new submit.
 * - 0.0.2 (2025-05-10): Added robust client-side email format and password complexity validation.
 * - 0.0.1 (2025-05-08): Created the signup module with basic functionality.
 */

import { showError, showStatus, showLoading, hideLoading } from "./auth.js";
import { supabase } from "../supabase-client.js";

/**
 * Initializes the signup page
 */
export function initSignupPage() {
  const signupForm = document.getElementById("signupForm");
  const errorMessageDiv = document.getElementById("errorMessage");
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
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      let validationErrors = [];

      // --- Client-side Validation ---
      // 1. Email Format Validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
        const errorText = validationErrors.join("<br>");
        showError(errorText);
        return;
      }

      // Show loading state
      showLoading("signupBtn", "signupSpinner");

      try {
        // Call signup function
        await signup(email, password);
      } catch (error) {
        console.error("Signup error:", error);
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
 * Registers a user with email and password using Supabase
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise resolved on success
 */
export async function signup(email, password) {
  try {
    // Call Supabase signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    // Check for errors
    if (error) throw new Error(error.message);

    // Check if user was created (similar to checking identities length in Python code)
    if (!data.user || data.user.identities?.length === 0) {
      throw new Error(
        "Cette adresse mail a déjà été utilisée. Veuillez utiliser une autre adresse mail."
      );
    }

    // Success case
    showStatus(
      "Identifiants valides ! Veuillez vérifier votre email pour confirmer votre inscription.",
      "success"
    );

    // Optionally hide form or redirect on success
    document.getElementById("signupForm").style.display = "none";

    return data;
  } catch (error) {
    // Handle rate limiting similar to the Python code
    if (error.message.includes("only request this after")) {
      const waitTimeMatch = error.message.match(
        /only request this after (\d+) seconds/
      );
      if (waitTimeMatch) {
        const waitTime = waitTimeMatch[1];
        throw new Error(`Veuillez réessayer dans ${waitTime} secondes.`);
      }
    }

    console.error("Signup error:", error);
    throw error;
  }
}

export default {
  initSignupPage,
  signup,
};
