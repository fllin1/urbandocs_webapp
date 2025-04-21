// js/app.js

import { zoneNameMappings } from "./mappings.js";

// Éléments du DOM
const villeSelect = document.getElementById("villeSelect");
const zonageSelect = document.getElementById("zonageSelect");
const zoneSelect = document.getElementById("zoneSelect");
const typologieSelect = document.getElementById("typologieSelect");
const downloadBtn = document.getElementById("downloadBtn");
const statusMessage = document.getElementById("statusMessage");

// Éléments pour les spinners (à ajouter dans le HTML)
const villeSpinner = document.getElementById("villeSpinner");
const zonageSpinner = document.getElementById("zonageSpinner");
const zoneSpinner = document.getElementById("zoneSpinner");
const typologieSpinner = document.getElementById("typologieSpinner");
const documentSpinner = document.getElementById("documentSpinner"); // Pour la recherche finale

// Variables pour stocker le document sélectionné
let selectedDocument = null;

// --- Updated URL Definitions ---
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
// --- End of Updated URL Definitions ---

/**
 * Affiche un message de statut (et type: info, success, danger)
 */
function showStatus(message, type = "info") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message alert alert-${type}`; // Utilise les classes alert Bootstrap
}

/**
 * Affiche ou cache un spinner Bootstrap
 * @param spinnerElement L'élément SPAN du spinner
 * @param show True pour afficher, false pour cacher
 */
function toggleSpinner(spinnerElement, show) {
  if (spinnerElement) {
    spinnerElement.classList.toggle("d-none", !show);
  }
}

/**
 * Réinitialise un élément select avec une option par défaut
 */
function resetSelect(selectElement, defaultText) {
  selectElement.innerHTML = `<option value="">${
    defaultText || "Sélectionnez une option"
  }</option>`;
  selectElement.disabled = true; // Désactiver par défaut lors de la réinitialisation
}

/**
 * Formate un nom reçu de l'API (enlève underscores, capitalise)
 * Utilisé comme fallback si le mappage spécifique n'existe pas.
 */
function formatApiName(name) {
  if (!name) return "";
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
  dataType
) {
  resetSelect(selectElement, defaultOptionText);

  if (!data || data.length === 0) {
    selectElement.innerHTML = `<option value="">${emptyDataText}</option>`;
    selectElement.disabled = true;
    return false;
  }

  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;

    // --- Logique de formatage conditionnel ---
    let displayText = "";
    // Si c'est une zone ET qu'elle existe dans notre mappage
    if (dataType === "zone" && zoneNameMappings.hasOwnProperty(item.nom)) {
      displayText = zoneNameMappings[item.nom]; // Utilise le nom mappé
    } else {
      // Sinon, utilise la fonction de formatage générale
      displayText = formatApiName(item.nom);
    }
    option.textContent = displayText; // Applique le texte choisi

    selectElement.appendChild(option);
  });

  selectElement.disabled = false;
  return true; // Indique qu'il y a des données
}

/**
 * Appelle l'API pour récupérer les villes
 */
async function loadVilles() {
  toggleSpinner(villeSpinner, true);
  showStatus("Chargement des villes...", "info");
  villeSelect.disabled = true; // Désactive pendant le chargement

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
      "ville"
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
    showStatus(`Erreur chargement villes: ${error.message}`, "danger");
    resetSelect(villeSelect, "Erreur chargement");
  } finally {
    toggleSpinner(villeSpinner, false);
    // villeSelect est réactivé par populateSelect s'il y a des données
  }
}

/**
 * Appelle l'API pour récupérer les zonages pour une ville
 */
async function loadZonages(villeId) {
  // Réinitialiser les sélecteurs dépendants immédiatement
  resetSelect(zonageSelect, "Sélectionnez d'abord une ville");
  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
  resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
  downloadBtn.disabled = true;
  selectedDocument = null;

  if (!villeId) {
    showStatus("Veuillez sélectionner une ville.", "info");
    return; // Ne rien faire si aucune ville n'est sélectionnée
  }

  toggleSpinner(zonageSpinner, true);
  showStatus("Chargement des zonages...", "info");
  zonageSelect.disabled = true;

  try {
    // ---- CORRECTION ICI ---- Utilisation de template literal correct
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
    showStatus(`Erreur chargement zonages: ${error.message}`, "danger");
    resetSelect(zonageSelect, "Erreur chargement");
  } finally {
    toggleSpinner(zonageSpinner, false);
    // zonageSelect sera activé par populateSelect si data existe
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
    // ---- CORRECTION ICI ----
    const url = `${GET_ZONES_URL}?zonageId=${zonageId}`;
    console.log("Fetching Zones from:", url);
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json();

    const hasData = populateSelect(
      zoneSelect,
      data,
      "Sélectionnez une zone",
      "Aucune zone disponible",
      "zone"
    );

    if (hasData) {
      showStatus(`${data.length} zones chargées pour ce zonage.`, "success");
    } else {
      showStatus("Aucune zone trouvée pour ce zonage.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des zones:", error);
    showStatus(`Erreur chargement zones: ${error.message}`, "danger");
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
    // ---- CORRECTION ICI ----
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
    showStatus(`Erreur chargement typologies: ${error.message}`, "danger");
    resetSelect(typologieSelect, "Erreur chargement");
  } finally {
    toggleSpinner(typologieSpinner, false);
  }
}

/**
 * Recherche le document correspondant aux sélections
 */
async function findDocument(zonageId, zoneId, typologieId) {
  downloadBtn.disabled = true;
  selectedDocument = null;

  if (!zonageId || !zoneId || !typologieId) {
    showStatus("Sélection incomplète pour rechercher le document.", "info");
    return;
  }

  toggleSpinner(documentSpinner, true); // Spinner près du bouton ou message
  showStatus("Recherche du document...", "info");

  try {
    const url = `${GET_DOCUMENT_URL}?zonageId=${zonageId}&zoneId=${zoneId}&typologieId=${typologieId}`;
    console.log("Fetching Document from:", url);
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        showStatus("Aucun document trouvé pour cette combinaison.", "warning");
        return; // Pas d'erreur critique, juste pas de document
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    selectedDocument = data;

    if (data && data.plu_url) {
      downloadBtn.disabled = false;
      showStatus(
        `Document trouvé (Source: ${
          formatApiName(data.source_plu_date) || "Non spécifiée"
        }). Prêt à consulter.`,
        "success"
      );
    } else {
      selectedDocument = null; // Assurer la cohérence
      showStatus("Document trouvé mais lien manquant.", "warning");
    }
  } catch (error) {
    selectedDocument = null;
    console.error("Erreur lors de la recherche du document:", error);
    showStatus(`Erreur recherche document: ${error.message}`, "danger");
  } finally {
    toggleSpinner(documentSpinner, false);
  }
}

/**
 * Ouvre le document sélectionné dans un nouvel onglet
 */
function downloadDocument() {
  if (selectedDocument && selectedDocument.plu_url) {
    showStatus("Ouverture du document...", "info");
    window.open(selectedDocument.plu_url, "_blank");
    // Réaffiche le message de succès après un court délai
    setTimeout(() => {
      if (!downloadBtn.disabled) {
        // Vérifie si le bouton est toujours actif
        showStatus(
          `Document trouvé (Source: ${
            formatApiName(selectedDocument.source_plu_date) || "Non spécifiée"
          }). Prêt à consulter.`,
          "success"
        );
      }
    }, 1500);
  } else {
    showStatus("Lien du document non disponible.", "warning");
  }
}

// === Event listeners ===
villeSelect.addEventListener("change", (event) => {
  const villeId = event.target.value;
  loadZonages(villeId);
});

zonageSelect.addEventListener("change", (event) => {
  const zonageId = event.target.value;
  // On suppose que l'id de la ville est toujours sélectionné dans villeSelect
  // Si ce n'est pas garanti, il faudrait le passer en argument ou le récupérer ici
  loadZones(zonageId);
});

zoneSelect.addEventListener("change", (event) => {
  const zoneId = event.target.value;
  const zonageId = zonageSelect.value; // Récupère la valeur actuelle du zonage
  loadTypologies(zoneId, zonageId);
});

typologieSelect.addEventListener("change", (event) => {
  const typologieId = event.target.value;
  const zoneId = zoneSelect.value;
  const zonageId = zonageSelect.value;
  findDocument(zonageId, zoneId, typologieId);
});

downloadBtn.addEventListener("click", downloadDocument);

// === Initialisation ===
document.addEventListener("DOMContentLoaded", () => {
  // Initialise les selects dans un état désactivé propre
  resetSelect(villeSelect, "Chargement...");
  resetSelect(zonageSelect, "Sélectionnez d'abord une ville");
  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
  resetSelect(typologieSelect, "Sélectionnez d'abord une zone");
  downloadBtn.disabled = true;
  showStatus("Prêt à charger les villes.", "info");

  loadVilles(); // Lance le chargement initial
});
