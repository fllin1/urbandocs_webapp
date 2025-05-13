// src/js/api.js
/**
 * Firebase API
 * @module api
 * @description This module handles API calls to fetch data for cities, zoning, zones, and typologies.
 * @version 0.0.1
 * @author GreyPanda
 * @todo
 *
 * @changelog
 * - 0.0.1 (2025-04-26): Separate module for API calls to improve code organization and maintainability.
 */

// Initialize the Firebase app
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config.js";

// Import UI functions and elements (will be defined in ui.js)
import {
  toggleSpinner,
  showStatus,
  populateSelect,
  resetSelect,
  formatApiName, // Assuming formatApiName moves to ui.js or a utils.js
  villeSelect,
  zonageSelect,
  zoneSelect,
  typologieSelect,
  downloadBtn,
  villeSpinner,
  zonageSpinner,
  zoneSpinner,
  typologieSpinner,
  documentSpinner,
} from "./ui.js"; // Adjust path if needed

// Import the current user state from app.js
import { currentUser } from "./app.js";

// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// --- API URL Definitions ---
const IS_LOCAL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";

const GET_VILLES_URL = IS_LOCAL
  ? "http://127.0.0.1:5001/urbandocs/us-central1/get_villes"
  : "https://get-villes-up3k3hddtq-uc.a.run.app";

const GET_ZONAGES_URL = IS_LOCAL
  ? "http://127.0.0.1:5001/urbandocs/us-central1/get_zonages"
  : "https://get-zonages-up3k3hddtq-uc.a.run.app";

const GET_ZONES_URL = IS_LOCAL
  ? "http://127.0.0.1:5001/urbandocs/us-central1/get_zones"
  : "https://get-zones-up3k3hddtq-uc.a.run.app";

const GET_TYPOLOGIES_URL = IS_LOCAL
  ? "http://127.0.0.1:5001/urbandocs/us-central1/get_typologies"
  : "https://get-typologies-up3k3hddtq-uc.a.run.app";

const GET_DOCUMENT_URL = IS_LOCAL
  ? "http://127.0.0.1:5001/urbandocs/us-central1/get_document"
  : "https://get-document-up3k3hddtq-uc.a.run.app";
// --- End of API URL Definitions ---

// Variable to store the fetched document details
let selectedDocument = null;

/**
 * Appelle l'API pour récupérer les villes
 */
async function loadVilles() {
  toggleSpinner(villeSpinner, true);
  showStatus("Chargement des villes...", "info");
  villeSelect.disabled = true;

  try {
    const url = GET_VILLES_URL;
    console.log("Fetching Villes from:", url);
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json();

    const hasData = populateSelect(
      villeSelect,
      data,
      "Sélectionnez une ville",
      "Aucune ville disponible",
      "ville" // Pass dataType for formatting logic in populateSelect
    );

    if (hasData) {
      showStatus(
        `${data.length} villes chargées. Veuillez en sélectionner une.`,
        "success"
      );
    } else {
      showStatus("Aucune ville n'a été trouvée.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des villes:", error);
    // showStatus(`Erreur chargement villes: ${error.message}`, "danger");
    resetSelect(villeSelect, "Erreur chargement");
  } finally {
    toggleSpinner(villeSpinner, false);
  }
}

/**
 * Appelle l'API pour récupérer les zonages pour une ville
 */
async function loadZonages(villeId) {
  resetSelect(zonageSelect, "Sélectionnez d'abord une ville");
  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
  resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
  downloadBtn.disabled = true;
  selectedDocument = null;

  if (!villeId) {
    showStatus("Veuillez sélectionner une ville.", "info");
    return;
  }

  toggleSpinner(zonageSpinner, true);
  showStatus("Chargement des zonages...", "info");
  zonageSelect.disabled = true;

  try {
    const url = `${GET_ZONAGES_URL}?villeId=${villeId}`;
    console.log("Fetching Zonages from:", url);
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json();

    const hasData = populateSelect(
      zonageSelect,
      data,
      "Sélectionnez un zonage",
      "Aucun zonage disponible",
      "zonage"
    );

    if (hasData) {
      showStatus(`${data.length} zonages chargés pour cette ville.`, "success");
    } else {
      showStatus("Aucun zonage trouvé pour cette ville.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des zonages:", error);
    // showStatus(`Erreur chargement zonages: ${error.message}`, "danger");
    resetSelect(zonageSelect, "Erreur chargement");
  } finally {
    toggleSpinner(zonageSpinner, false);
  }
}

/**
 * Appelle l'API pour récupérer les zones pour un zonage
 */
async function loadZones(zonageId) {
  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
  resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
  downloadBtn.disabled = true;
  selectedDocument = null;

  if (!zonageId) {
    showStatus("Veuillez sélectionner un zonage.", "info");
    return;
  }

  toggleSpinner(zoneSpinner, true);
  showStatus("Chargement des zones...", "info");
  zoneSelect.disabled = true;

  try {
    const url = `${GET_ZONES_URL}?zonageId=${zonageId}`;
    console.log("Fetching Zones from:", url);
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json();

    // Pass zoneNameMappings to populateSelect or handle mapping inside populateSelect
    const hasData = populateSelect(
      zoneSelect,
      data,
      "Sélectionnez une zone",
      "Aucune zone disponible",
      "zone" // Pass dataType for formatting logic
    );

    if (hasData) {
      showStatus(`${data.length} zones chargées pour ce zonage.`, "success");
    } else {
      showStatus("Aucune zone trouvée pour ce zonage.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des zones:", error);
    // showStatus(`Erreur chargement zones: ${error.message}`, "danger");
    resetSelect(zoneSelect, "Erreur chargement");
  } finally {
    toggleSpinner(zoneSpinner, false);
  }
}

/**
 * Appelle l'API pour récupérer les typologies pour une zone/zonage
 */
async function loadTypologies(zoneId, zonageId) {
  resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
  downloadBtn.disabled = true;
  selectedDocument = null;

  if (!zoneId || !zonageId) {
    showStatus("Veuillez sélectionner un zonage et une zone.", "info");
    return;
  }

  toggleSpinner(typologieSpinner, true);
  showStatus("Chargement des typologies...", "info");
  typologieSelect.disabled = true;

  try {
    const url = `${GET_TYPOLOGIES_URL}?zonageId=${zonageId}&zoneId=${zoneId}`;
    console.log("Fetching Typologies from:", url);
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json();

    const hasData = populateSelect(
      typologieSelect,
      data,
      "Sélectionnez une typologie",
      "Aucune typologie disponible",
      "typologie"
    );

    if (hasData) {
      showStatus(`${data.length} typologies chargées.`, "success");
    } else {
      showStatus("Aucune typologie trouvée pour cette sélection.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des typologies:", error);
    // showStatus(`Erreur chargement typologies: ${error.message}`, "danger");
    resetSelect(typologieSelect, "Erreur chargement");
  } finally {
    toggleSpinner(typologieSpinner, false);
  }
}

/**
 * Recherche le document correspondant aux sélections, only if authenticated
 */
async function findDocument(zonageId, zoneId, typologieId) {
  downloadBtn.disabled = true;
  selectedDocument = null; // Reset before search

  // Check authentication status FIRST
  if (!currentUser) {
    showStatus(
      "Veuillez vous connecter pour rechercher et voir les documents.",
      "warning"
    );
    // Keep button disabled, no need to toggle spinner as we are not fetching
    return;
  }

  // Proceed only if authenticated
  if (!zonageId || !zoneId || !typologieId) {
    showStatus("Sélection incomplète pour rechercher le document.", "info");
    return; // Exit if selection is incomplete
  }

  toggleSpinner(documentSpinner, true);
  showStatus("Recherche du document...", "info");

  try {
    const url = `${GET_DOCUMENT_URL}?zonageId=${zonageId}&zoneId=${zoneId}&typologieId=${typologieId}`;
    console.log("Fetching Document from:", url);
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        showStatus("Aucun document trouvé pour cette combinaison.", "warning");
        return;
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    selectedDocument = data; // Store the found document details

    // Enable download button only if authenticated AND document URL exists
    if (currentUser && data && data.plu_url) {
      downloadBtn.disabled = false;
      showStatus(
        `Document trouvé (Source: ${
          formatApiName(data.source_plu_date) || "Non spécifiée"
        }). Prêt à consulter.`,
        "success"
      );
    } else {
      selectedDocument = null; // Ensure consistency if URL is missing
      showStatus("Document trouvé mais lien manquant.", "warning");
    }
  } catch (error) {
    selectedDocument = null;
    console.error("Erreur lors de la recherche du document:", error);
    // showStatus(`Erreur recherche document: ${error.message}`, "danger");
  } finally {
    toggleSpinner(documentSpinner, false);
  }
}

// Function to get the currently selected document (needed by app.js/main.js)
function getSelectedDocument() {
  return selectedDocument;
}

export {
  loadVilles,
  loadZonages,
  loadZones,
  loadTypologies,
  findDocument,
  getSelectedDocument,
};
