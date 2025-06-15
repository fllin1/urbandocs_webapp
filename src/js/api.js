// src/js/api.js
/**
 * Supabase API - Modernized
 * @module api
 * @description Clean, efficient API layer with enhanced error handling and state management
 * @version 1.0.0
 * @author GreyPanda
 *
 * @changelog
 * - 1.0.0 (2025-01-29): Modernized with state management and enhanced components
 * - 0.1.0 (2025-05-15): Migrating Supabase API calls for improved performance.
 * - 0.0.1 (2025-04-26): Initial version with basic API functionality.
 */

// Import enhanced modules
import { supabase } from "./supabase-client.js";
import { apiService } from "./services/api-service.js";
import { stateManager } from "./state/state-manager.js";
import {
  toggleSpinner,
  showStatus,
  populateSelect,
  resetSelect,
  domElements,
} from "./ui.js";

/**
 * Enhanced city loading with caching and state management
 */
async function loadCities() {
  const citySelect = domElements.get("citySelect");
  const citySpinner = domElements.get("citySpinner");

  if (!citySelect) return;

  toggleSpinner(citySpinner, true);
  stateManager.setLoading(true);

  try {
    const cities = await apiService.loadCities();

    const hasData = populateSelect(
      citySelect,
      cities,
      "Sélectionnez une ville",
      "Aucune ville disponible",
      "city"
    );

    if (hasData) {
      showStatus(
        `Nouvelles villes disponibles ! Retrouvez les synthèses de Lille et Bordeaux`,
        "success"
      );
      stateManager.setCities(cities);
    } else {
      const currentUser = stateManager.getState("user");
      const message =
        currentUser === null
          ? "Veuillez vous connecter pour accéder aux données."
          : "Aucune ville trouvée.";
      showStatus(message, "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des villes:", error);
    showStatus("Erreur de chargement des villes", "error");
    resetSelect(citySelect, "Erreur chargement");
  } finally {
    toggleSpinner(citySpinner, false);
    stateManager.setLoading(false);
  }
}

/**
 * Enhanced zoning loading with state management
 */
async function loadZonings(cityId) {
  const zoningSelect = domElements.get("zoningSelect");
  const zoneSelect = domElements.get("zoneSelect");
  const zoningSpinner = domElements.get("zoningSpinner");
  const synthesisBtn = domElements.get("synthesisBtn");

  // Reset dependent selects
  resetSelect(zoningSelect, "Sélectionnez d'abord une ville");
  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
  if (synthesisBtn) synthesisBtn.disabled = true;

  stateManager.clearSelectedDocument();

  if (!cityId) {
    showStatus("Veuillez sélectionner une ville.", "info");
    return;
  }

  toggleSpinner(zoningSpinner, true);
  stateManager.setLoading(true);

  try {
    const zonings = await apiService.loadZonings(cityId);

    const hasData = populateSelect(
      zoningSelect,
      zonings,
      "Sélectionnez un zonage",
      "Aucun zonage disponible",
      "zoning"
    );

    if (hasData) {
      showStatus(`${zonings.length} zonages chargés`, "success");
      stateManager.setZonings(zonings);
    } else {
      showStatus("Aucun zonage trouvé pour cette ville.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des zonages:", error);
    showStatus("Erreur de chargement des zonages", "error");
    resetSelect(zoningSelect, "Erreur chargement");
  } finally {
    toggleSpinner(zoningSpinner, false);
    stateManager.setLoading(false);
  }
}

/**
 * Enhanced zone loading with state management
 */
async function loadZones(zoningId) {
  const zoneSelect = domElements.get("zoneSelect");
  const zoneSpinner = domElements.get("zoneSpinner");
  const synthesisBtn = domElements.get("synthesisBtn");

  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
  if (synthesisBtn) synthesisBtn.disabled = true;

  stateManager.clearSelectedDocument();

  if (!zoningId) {
    showStatus("Veuillez sélectionner un zonage.", "info");
    return;
  }

  toggleSpinner(zoneSpinner, true);
  stateManager.setLoading(true);

  try {
    const zones = await apiService.loadZones(zoningId);

    const hasData = populateSelect(
      zoneSelect,
      zones,
      "Sélectionnez une zone",
      "Aucune zone disponible",
      "zone"
    );

    if (hasData) {
      showStatus(`${zones.length} zones chargées`, "success");
      stateManager.setZones(zones);
    } else {
      showStatus("Aucune zone trouvée pour ce zonage.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des zones:", error);
    showStatus("Erreur de chargement des zones", "error");
    resetSelect(zoneSelect, "Erreur chargement");
  } finally {
    toggleSpinner(zoneSpinner, false);
    stateManager.setLoading(false);
  }
}

/**
 * Enhanced document finder with state management
 */
async function findDocument(zoningId, zoneId, typologieId = null) {
  const synthesisBtn = domElements.get("synthesisBtn");
  const documentSpinner = domElements.get("documentSpinner");

  if (synthesisBtn) synthesisBtn.disabled = true;
  stateManager.clearSelectedDocument();

  const currentUser = stateManager.getState("user");
  if (!currentUser) {
    showStatus(
      "Veuillez vous connecter pour accéder aux documents.",
      "warning"
    );
    return null;
  }

  if (!zoningId || !zoneId) {
    showStatus("Sélection incomplète pour rechercher le document.", "info");
    return null;
  }

  toggleSpinner(documentSpinner, true);
  stateManager.setLoading(true);

  try {
    const document = await apiService.findDocument(
      zoningId,
      zoneId,
      typologieId
    );

    if (document) {
      stateManager.setSelectedDocument(document);
      if (synthesisBtn) synthesisBtn.disabled = false;
      showStatus("Document trouvé !", "success");
      return document;
    } else {
      showStatus("Aucun document trouvé pour cette sélection.", "warning");
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la recherche du document:", error);
    showStatus("Erreur lors de la recherche du document", "error");
    return null;
  } finally {
    toggleSpinner(documentSpinner, false);
    stateManager.setLoading(false);
  }
}

/**
 * Get selected document from state
 */
function getSelectedDocument() {
  return stateManager.getState("selectedDocument");
}

/**
 * Enhanced initialization with state management
 */
async function initializeApp() {
  stateManager.setLoading(true);

  try {
    // Load initial data
    await loadCities();

    // Set up event listeners for state changes
    stateManager.subscribe("user", (user) => {
      if (user) {
        loadCities(); // Reload cities when user logs in
      }
    });

    showStatus("Application initialisée", "success");
  } catch (error) {
    console.error("Erreur d'initialisation:", error);
    showStatus("Erreur d'initialisation de l'application", "error");
  } finally {
    stateManager.setLoading(false);
  }
}

// Export clean, focused API
export {
  loadCities,
  loadZonings,
  loadZones,
  findDocument,
  getSelectedDocument,
  initializeApp,
};
