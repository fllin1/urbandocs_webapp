// src/js/login.js
/**
 * Login Module
 * @module login
 * @description This module handles user login functionality using Supabase Authentication.
 * @version 0.1.0
 * @author GreyPanda
 * @todo Add phone number authentication & password reset functionality.
 *
 * @changelog
 * - 0.1.0 (2025-05-15): Migrated to Supabase client-side auth
 * - 0.0.4 (2025-05-13): Ensure status message is also hidden on new submit.
 * - 0.0.3 (2025-05-08): Implemented actual login with Firebase function, added password visibility toggle.
 * - 0.0.2 (2025-05-08): Refactored to handle Supabase authentification.
 * - 0.0.1 (2025-04-27): Login functionality implemented using Firebase Authentication.
 */

import {
  setCurrentUser,
  showError,
  showStatus,
  showLoading,
  hideLoading,
} from "./auth.js";
import { supabase } from "../supabase-client.js";

/**
 * Initializes the login page
 */
export function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  // Set up password visibility toggle
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Toggle icon
      const iconElement = togglePasswordBtn.querySelector("i");
      if (type === "password") {
        iconElement.classList.remove("bi-eye");
        iconElement.classList.add("bi-eye-slash");
      } else {
        iconElement.classList.remove("bi-eye-slash");
        iconElement.classList.add("bi-eye");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset messages
      if (errorMessage) {
        errorMessage.classList.add("hidden");
        errorMessage.textContent = "";
      }
      // Ensure status message is also hidden on new submit
      const statusMessageElement = document.getElementById("statusMessage");
      if (statusMessageElement) {
        statusMessageElement.classList.add("hidden");
        statusMessageElement.textContent = "";
      }

      // Get form values
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Basic validation
      if (!email || !password) {
        showError("Veuillez remplir tous les champs.");
        return;
      }

      // Show loading state
      showLoading("loginBtn", "loginSpinner");

      try {
        // Call login function
        await login(email, password);
      } catch (error) {
        console.error("Login error:", error);
        showError(
          error.message || "La connexion a échoué. Vérifiez vos identifiants."
        );
      } finally {
        // Reset button state
        hideLoading("loginBtn", "loginSpinner");
      }
    });
  }
}

/**
 * Logs in a user with email and password directly with Supabase
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise resolved with the user data on success
 */
export async function login(email, password) {
  try {
    // Call Supabase authentication directly
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Check for errors
    if (error) {
      // Handle specific error cases
      if (error.message.toLowerCase().includes("email not confirmed")) {
        throw new Error(
          "Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception."
        );
      } else if (
        error.message.toLowerCase().includes("invalid login credentials")
      ) {
        throw new Error("Email ou mot de passe incorrect.");
      } else {
        throw new Error(error.message);
      }
    }

    // No session data
    if (!data.session) {
      console.error(
        "Login error: Missing session data from Supabase response",
        data
      );
      throw new Error("Données de session manquantes après la connexion.");
    }

    // Save user data locally if needed
    if (data.user) {
      setCurrentUser(data.user);
      console.log("[login.js] User data saved locally");
    }

    // Show success message before redirect
    showStatus("Connexion réussie! Redirection...", "success");

    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);

    return data.user;
  } catch (error) {
    // Log and re-throw the error to be handled by the caller
    console.error("Login error:", error);
    throw error;
  }
}

export default {
  initLoginPage,
  login,
};
