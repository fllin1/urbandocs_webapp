// src/js/sign.js
/**
 * Sign Module
 * @module sign
 * @description This module handles user sign-in and -up functionalities using Supabase Authentication.
 * @version 0.1.0
 * @author GreyPanda
 * @todo Add phone number authentication & password reset functionality.
 *
 * @changelog
 * - 0.1.0 (2025-05-15): Combining login and signup functionalities into a single module.
 */

import { supabase } from "../supabase-client.js";
import { showError, showStatus, showLoading, hideLoading } from "./auth.js";

export function initAuthPage() {
  // Sélectionner les éléments
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Gestion des onglets
  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
  });

  signupTab.addEventListener("click", () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
  });

  // Initialiser les formulaires
  initLoginForm();
  initSignupForm();
}
