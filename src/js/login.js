// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyAWl41Uers8kYoid2EGLGG9T5ZlQJ28oG0",
  authDomain: "automatic-plu.firebaseapp.com",
  projectId: "automatic-plu",
  storageBucket: "automatic-plu.firebasestorage.app",
  messagingSenderId: "393407128570",
  appId: "1:393407128570:web:2b2d606f4315d9d349fa43",
});
const auth = getAuth(app);

// Gestion du formulaire de connexion
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginBtn = document.getElementById("loginBtn");
  const loginSpinner = document.getElementById("loginSpinner");
  const errorMessage = document.getElementById("errorMessage");

  // Afficher le spinner et désactiver le bouton
  loginBtn.disabled = true;
  loginSpinner.classList.remove("d-none");
  errorMessage.classList.add("d-none");

  try {
    // Tentative de connexion avec Firebase
    await signInWithEmailAndPassword(auth, email, password);
    // Redirection vers la page principale après connexion réussie
    window.location.href = "index.html";
  } catch (error) {
    // Gestion des erreurs
    loginSpinner.classList.add("d-none");
    loginBtn.disabled = false;
    errorMessage.classList.remove("d-none");

    // Affichage du message d'erreur approprié
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage.textContent = "Adresse email invalide.";
        break;
      case "auth/user-disabled":
        errorMessage.textContent = "Ce compte a été désactivé.";
        break;
      case "auth/user-not-found":
        errorMessage.textContent = "Aucun compte ne correspond à cet email.";
        break;
      case "auth/wrong-password":
        errorMessage.textContent = "Mot de passe incorrect.";
        break;
      default:
        errorMessage.textContent = "Erreur de connexion: " + error.message;
    }
  }
});
