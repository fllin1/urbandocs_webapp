// src/js/api.js
/**
 * Supabase API
 * @module api
 * @description This module handles API calls to fetch data for cities, zoning, zones, and typologies.
 * @version 0.1.0
 * @author GreyPanda
 * @todo
 *
 * @changelog
 * - 0.1.0 (2025-05-15): Migrating Supabase API calls for improved performance.
 * - 0.0.1 (2025-04-26): Separate module for API calls to improve code organization and maintainability.
 */

// Import UI functions and elements (will be defined in ui.js)
import { supabase } from "./supabase-client.js";
import {
  toggleSpinner,
  showStatus,
  populateSelect,
  resetSelect,
  formatApiName,
  citySelect,
  zoningSelect,
  zoneSelect,
  synthesisBtn,
  citySpinner,
  zoningSpinner,
  zoneSpinner,
  documentSpinner,
} from "./ui.js";

import { currentUser } from "./app.js";

// Variable to store the fetched document details
let selectedDocument = null;

/**
 * Fetches cities from Supabase
 */
async function loadCities() {
  toggleSpinner(citySpinner, true);
  showStatus("Chargement des cities...", "info");
  citySelect.disabled = true;

  try {
    const { data, error } = await supabase
      .from("cities")
      .select("id, name")
      .order("name");

    if (error) throw error;

    const hasData = populateSelect(
      citySelect,
      data.map((city) => ({ id: city.id, name: city.name })),
      "Sélectionnez une city",
      "Aucune ville disponible",
      "city"
    );

    if (hasData) {
      showStatus(`Villes chargées : ${data.length}`, "info");
    } else if (currentUser === null) {
      showStatus(
        "Veuillez vous connecter pour accéder aux données.",
        "warning"
      );
    } else {
      showStatus("Aucune ville n'a été trouvée.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des cities:", error);
    resetSelect(citySelect, "Erreur chargement");
  } finally {
    toggleSpinner(citySpinner, false);
  }
}

/**
 * Fetches zonings for a city from Supabase
 */
async function loadZonings(cityId) {
  resetSelect(zoningSelect, "Sélectionnez d'abord une city");
  resetSelect(zoneSelect, "Sélectionnez d'abord un zoning");
  synthesisBtn.disabled = true;
  selectedDocument = null;

  if (!cityId) {
    showStatus("Veuillez sélectionner une city.", "info");
    return;
  }

  toggleSpinner(zoningSpinner, true);
  showStatus("Chargement des zonings...", "info");
  zoningSelect.disabled = true;

  try {
    const { data, error } = await supabase
      .from("zonings")
      .select("id, name")
      .eq("city_id", cityId)
      .order("name");

    if (error) throw error;

    const hasData = populateSelect(
      zoningSelect,
      data.map((zoning) => ({ id: zoning.id, name: zoning.name })),
      "Sélectionnez un zoning",
      "Aucun zonage disponible",
      "zoning"
    );

    if (hasData) {
      showStatus(`Zonages chargés : ${data.length}`, "info");
    } else {
      showStatus("Aucun zonage trouvé pour cette city.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des zonings:", error);
    resetSelect(zoningSelect, "Erreur chargement");
  } finally {
    toggleSpinner(zoningSpinner, false);
  }
}

/**
 * Fetches zones for a zoning from Supabase
 */
async function loadZones(zoningId) {
  resetSelect(zoneSelect, "Sélectionnez d'abord un zoning");
  synthesisBtn.disabled = true;
  selectedDocument = null;

  if (!zoningId) {
    showStatus("Veuillez sélectionner un zoning.", "info");
    return;
  }

  toggleSpinner(zoneSpinner, true);
  showStatus("Chargement des zones...", "info");
  zoneSelect.disabled = true;

  try {
    const { data, error } = await supabase
      .from("zones")
      .select("id, name")
      .eq("zoning_id", zoningId)
      .order("name");

    if (error) throw error;

    const hasData = populateSelect(
      zoneSelect,
      data.map((zone) => ({ id: zone.id, name: zone.name })),
      "Sélectionnez une zone",
      "Aucune zone disponible",
      "zone"
    );

    if (hasData) {
      showStatus(`Zones chargées : ${data.length}`, "info");
    } else {
      showStatus("Aucune zone trouvée pour ce zoning.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des zones:", error);
    resetSelect(zoneSelect, "Erreur chargement");
  } finally {
    toggleSpinner(zoneSpinner, false);
  }
}

/**
 * Fetches document for a zone from Supabase
 */
async function findDocument(zoningId, zoneId, typologieId) {
  synthesisBtn.disabled = true;
  selectedDocument = null;

  if (!currentUser) {
    showStatus(
      "Veuillez vous connecter pour accéder aux documents.",
      "warning"
    );
    return;
  }

  if (!zoningId || !zoneId) {
    showStatus("Sélection incomplète pour rechercher le document.", "info");
    return;
  }

  toggleSpinner(documentSpinner, true);
  showStatus("Recherche du document...", "info");

  try {
    const { data, error } = await supabase
      .from("documents")
      .select("id, source_plu_date")
      .eq("zoning_id", zoningId)
      .eq("zone_id", zoneId)
      .eq("typology_id", typologieId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        showStatus("Aucun document trouvé pour cette zone.", "warning");
        return;
      }
      throw error;
    }

    selectedDocument = data;

    if (currentUser && data?.id) {
      synthesisBtn.disabled = false;
      showStatus(
        `Document trouvé (Source: ${
          formatApiName(data.source_plu_date) || "Non spécifiée"
        }). Prêt à consulter.`,
        "success"
      );
    } else {
      selectedDocument = null;
      showStatus("Document trouvé mais lien manquant.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors de la recherche du document:", error);
    selectedDocument = null;
  } finally {
    toggleSpinner(documentSpinner, false);
  }
}

function getSelectedDocument() {
  return selectedDocument;
}

export {
  loadCities,
  loadZonings,
  loadZones,
  findDocument,
  getSelectedDocument,
};
