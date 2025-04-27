// public/js/ui.js
/**
 * Firebase UI
 * @module ui
 * @description This module handles the UI elements and utility functions for the application.
 * @version 0.0.1
 * @author GreyPanda
 * @todo Rework on the messages to "login before downloading"
 *
 * @changelog
 * - 0.0.1 (2025-04-26): Initial version with basic UI functions and element references.
 */

// Import mappings needed for formatting
import { zoneNameMappings } from "./mappings";

// --- DOM Element References ---
const villeSelect = document.getElementById("villeSelect");
const zonageSelect = document.getElementById("zonageSelect");
const zoneSelect = document.getElementById("zoneSelect");
const typologieSelect = document.getElementById("typologieSelect");
const downloadBtn = document.getElementById("downloadBtn");
const statusMessage = document.getElementById("statusMessage");

// Spinners (ensure these IDs exist in your index.html)
const villeSpinner = document.getElementById("villeSpinner");
const zonageSpinner = document.getElementById("zonageSpinner");
const zoneSpinner = document.getElementById("zoneSpinner");
const typologieSpinner = document.getElementById("typologieSpinner");
const documentSpinner = document.getElementById("documentSpinner"); // For the final search/download button area

// New elements for Auth UI
const userStatus = document.getElementById("userStatus");
const loginPrompt = document.getElementById("loginPrompt");
const logoutBtn = document.getElementById("logoutBtn");
const loginLink = document.getElementById("loginLink"); // Reference to the login link/button
// --- End DOM Element References ---

// --- UI Utility Functions ---

/**
 * Affiche un message de statut (et type: info, success, danger, warning)
 */
function showStatus(message, type = "info") {
  if (statusMessage) {
    statusMessage.textContent = message;
    // Ensure only one alert class is active at a time
    statusMessage.className = `status-message alert alert-${type}`;
    statusMessage.classList.remove("d-none"); // Make sure it's visible
  } else {
    console.warn("Status message element not found.");
  }
}

/**
 * Affiche ou cache un spinner Bootstrap
 * @param spinnerElement L'élément SPAN du spinner
 * @param show True pour afficher, false pour cacher
 */
function toggleSpinner(spinnerElement, show) {
  if (spinnerElement) {
    spinnerElement.classList.toggle("d-none", !show);
  } else {
    // console.warn("Spinner element not found for toggling."); // Optional: log if spinner missing
  }
}

/**
 * Réinitialise un élément select avec une option par défaut
 */
function resetSelect(selectElement, defaultText) {
  if (selectElement) {
    selectElement.innerHTML = `<option value="">${
      defaultText || "Sélectionnez une option"
    }</option>`;
    selectElement.disabled = true; // Disable by default on reset
  } else {
    console.warn("Select element not found for reset.");
  }
}

/**
 * Formate un nom reçu de l'API (enlève underscores, capitalise)
 * Utilisé comme fallback si le mappage spécifique n'existe pas.
 */
function formatApiName(name) {
  if (!name) return "";
  // Replace underscores with spaces, then capitalize the first letter of each word
  return name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Peuple un sélecteur avec des options
 * @param selectElement L'élément select à remplir
 * @param data Tableau d'objets {id, nom}
 * @param defaultOptionText Texte de la première option désactivée
 * @param emptyDataText Texte si le tableau data est vide
 * @param dataType 'ville', 'zonage', 'zone', ou 'typologie' pour le formatage conditionnel
 */
function populateSelect(
  selectElement,
  data,
  defaultOptionText,
  emptyDataText,
  dataType // Used for conditional formatting (e.g., zones)
) {
  if (!selectElement) {
    console.warn("Select element not found for population.");
    return false;
  }

  resetSelect(selectElement, defaultOptionText); // Reset first

  if (!data || data.length === 0) {
    selectElement.innerHTML = `<option value="">${emptyDataText}</option>`;
    selectElement.disabled = true;
    return false; // Indicate no data was populated
  }

  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;

    // --- Conditional Formatting Logic ---
    let displayText = "";
    // If it's a 'zone' and a mapping exists for its 'nom'
    if (dataType === "zone" && zoneNameMappings.hasOwnProperty(item.nom)) {
      displayText = zoneNameMappings[item.nom]; // Use the mapped name
    } else {
      // Otherwise, use the general formatting function
      displayText = formatApiName(item.nom);
    }
    option.textContent = displayText; // Apply the chosen text

    selectElement.appendChild(option);
  });

  selectElement.disabled = false; // Enable the select as it has options
  return true; // Indicate data was populated
}

// --- End UI Utility Functions ---

// --- Export Elements and Functions ---
export {
  villeSelect,
  zonageSelect,
  zoneSelect,
  typologieSelect,
  downloadBtn,
  statusMessage,
  villeSpinner,
  zonageSpinner,
  zoneSpinner,
  typologieSpinner,
  documentSpinner,
  showStatus,
  toggleSpinner,
  resetSelect,
  formatApiName,
  populateSelect,
  // Export new auth-related elements
  userStatus,
  loginPrompt,
  logoutBtn,
  loginLink,
};
