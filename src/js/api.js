// src/js/api.js
/**
 * Firebase API
 * @module api
 * @description This module handles API calls to fetch data for villes, zoning, zones, and typologies.
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
  villeSelect,
  zonageSelect,
  zoneSelect,
  downloadBtn,
  villeSpinner,
  zonageSpinner,
  zoneSpinner,
  documentSpinner,
} from "./ui.js";

import { currentUser } from "./app.js";

// Variable to store the fetched document details
let selectedDocument = null;

/**
 * Fetches villes from Supabase
 */
async function loadVilles() {
  toggleSpinner(villeSpinner, true);
  showStatus("Chargement des villes...", "info");
  villeSelect.disabled = true;

  try {
    const { data, error } = await supabase
      .from("villes")
      .select("id, nom")
      .order("nom");

    if (error) throw error;

    const hasData = populateSelect(
      villeSelect,
      data.map((city) => ({ id: city.id, nom: city.nom })),
      "Sélectionnez une ville",
      "Aucune ville disponible",
      "ville"
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
    console.error("Erreur lors du chargement des villes:", error);
    resetSelect(villeSelect, "Erreur chargement");
  } finally {
    toggleSpinner(villeSpinner, false);
  }
}

/**
 * Fetches zonages for a city from Supabase
 */
async function loadZonages(villeId) {
  resetSelect(zonageSelect, "Sélectionnez d'abord une ville");
  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
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
    const { data, error } = await supabase
      .from("zonages")
      .select("id, nom")
      .eq("ville_id", villeId)
      .order("nom");

    if (error) throw error;

    const hasData = populateSelect(
      zonageSelect,
      data.map((zoning) => ({ id: zoning.id, nom: zoning.nom })),
      "Sélectionnez un zonage",
      "Aucun zonage disponible",
      "zonage"
    );

    if (hasData) {
      showStatus(`Zonages chargés : ${data.length}`, "info");
    } else {
      showStatus("Aucun zonage trouvé pour cette ville.", "warning");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des zonages:", error);
    resetSelect(zonageSelect, "Erreur chargement");
  } finally {
    toggleSpinner(zonageSpinner, false);
  }
}

/**
 * Fetches zones for a zoning from Supabase
 */
async function loadZones(zonageId) {
  resetSelect(zoneSelect, "Sélectionnez d'abord un zonage");
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
    const { data, error } = await supabase
      .from("zones")
      .select("id, nom")
      .eq("zonage_id", zonageId)
      .order("nom");

    if (error) throw error;

    const hasData = populateSelect(
      zoneSelect,
      data.map((zone) => ({ id: zone.id, nom: zone.nom })),
      "Sélectionnez une zone",
      "Aucune zone disponible",
      "zone"
    );

    if (hasData) {
      showStatus(`Zones chargées : ${data.length}`, "info");
    } else {
      showStatus("Aucune zone trouvée pour ce zonage.", "warning");
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
async function findDocument(zonageId, zoneId, typologieId) {
  downloadBtn.disabled = true;
  selectedDocument = null;

  if (!currentUser) {
    showStatus(
      "Veuillez vous connecter pour accéder aux documents.",
      "warning"
    );
    return;
  }

  if (!zonageId || !zoneId) {
    showStatus("Sélection incomplète pour rechercher le document.", "info");
    return;
  }

  toggleSpinner(documentSpinner, true);
  showStatus("Recherche du document...", "info");

  try {
    const { data, error } = await supabase
      .from("documents")
      .select("id, plu_url, source_plu_date")
      .eq("zonage_id", zonageId)
      .eq("zone_id", zoneId)
      .eq("typologie_id", typologieId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        showStatus("Aucun document trouvé pour cette zone.", "warning");
        return;
      }
      throw error;
    }

    selectedDocument = data;

    if (currentUser && data?.plu_url) {
      downloadBtn.disabled = false;
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
  loadVilles,
  loadZonages,
  loadZones,
  findDocument,
  getSelectedDocument,
};
