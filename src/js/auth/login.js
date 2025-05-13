// src/js/login.js
/**
 * Firebase Login
 * @module login
 * @description This module handles user login functionality using Supabase Authentication.
 * @version 0.0.4
 * @author GreyPanda
 * @todo Add phone number authentication & password reset functionality.
 *
 * @changelog
 * - 0.0.4 (2025-05-13): Ensure status message is also hidden on new submit.
 * - 0.0.3 (2025-05-08): Implemented actual login with Firebase function, added password visibility toggle.
 * - 0.0.2 (2025-05-08): Refactored to handle Supabase authentification.
 * - 0.0.1 (2025-04-27): Login functionality implemented using Firebase Authentication.
 */

import {
  API_URLS,
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
 * Logs in a user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise resolved with the user data on success
 */
export async function login(email, password) {
  try {
    // Create request data
    const requestData = {
      email: email,
      password: password,
    };

    // Call Firebase function
    const response = await fetch(API_URLS.HANDLE_LOGIN, {
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
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      throw new Error(`Erreur serveur: ${response.status}`);
    }

    // Store user data and session tokens
    if (
      responseData.session &&
      responseData.session.access_token &&
      responseData.session.refresh_token
    ) {
      console.log(
        "[login.js] Attempting to set Supabase session with tokens:",
        responseData.session
      );
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: responseData.session.access_token,
        refresh_token: responseData.session.refresh_token,
      });
      if (sessionError) {
        console.error(
          "[login.js] Error setting Supabase session:",
          sessionError
        );
        throw new Error("La session utilisateur n'a pas pu être initialisée.");
      }
      console.log("[login.js] Supabase session set successfully.");
    } else if (responseData.user && !responseData.session) {
      console.warn(
        "Login response contained user data but no session. User will not be logged in on client-side Supabase."
      );
      setCurrentUser(responseData.user);
      throw new Error("Données de session manquantes après la connexion.");
    } else {
      console.error(
        "Login error: Missing session data from backend response",
        responseData
      );
      throw new Error("Données de session manquantes après la connexion.");
    }

    // Show success message before redirect
    showStatus("Connexion réussie! Redirection...", "success");

    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);

    return responseData.user;
  } catch (error) {
    // Log and re-throw the error to be handled by the caller
    console.error("Login error:", error);
    throw error;
  }
}
