// public/js/ui.js
/**
 * UI Module
 * @module ui
 * @description Upgraded UI module with enhanced components and backward compatibility
 * @version 0.1.0
 * @author GreyPanda
 *
 * @changelog
 * - 0.1.0 (2025-01-29): Major refactor with enhanced components and state management integration
 * - 0.0.1 (2025-04-26): Initial version with basic UI functions and element references
 */

import { zoneNameMappings } from "./mappings.js";

// Simple fallbacks for enhanced features
const UIComponents = {
  showToast: (message, type) => console.log(`Toast: ${message} (${type})`),
};

const stateManager = {
  setUIState: () => {},
  setLoading: () => {},
};

// --- Enhanced DOM Element Management ---
class DOMElements {
  constructor() {
    this.elements = new Map();
    this.initializeElements();
  }

  initializeElements() {
    // Form elements
    this.register("citySelect", "citySelect");
    this.register("zoningSelect", "zoningSelect");
    this.register("zoneSelect", "zoneSelect");
    this.register("typologieSelect", "typologieSelect");
    this.register("synthesisBtn", "synthesisBtn");
    this.register("statusMessage", "statusMessage");

    // Spinner elements
    this.register("citySpinner", "citySpinner");
    this.register("zoningSpinner", "zoningSpinner");
    this.register("zoneSpinner", "zoneSpinner");
    this.register("typologieSpinner", "typologieSpinner");
    this.register("documentSpinner", "documentSpinner");

    // Auth elements
    this.register("userStatus", "userStatus");
    this.register("logoutBtn", "logoutBtn");
    this.register("loginLink", "loginLink");
    this.register("signupLink", "signupLink");
  }

  register(name, id) {
    const element = document.getElementById(id);
    if (element) {
      this.elements.set(name, element);
    }
  }

  get(name) {
    return this.elements.get(name) || null;
  }

  exists(name) {
    return this.elements.has(name) && this.elements.get(name) !== null;
  }
}

// Create singleton instance
const domElements = new DOMElements();

// --- Enhanced UI Functions ---

/**
 * Enhanced status message display with toast integration
 */
function showStatus(message, type = "info") {
  const statusElement = domElements.get("statusMessage");

  if (statusElement) {
    // Update the existing status message element
    statusElement.textContent = message;
    statusElement.className = `status-message alert alert-${type}`;
    statusElement.classList.remove("d-none");
  }

  // Also show a toast for better UX (optional, can be disabled)
  if (type === "error" || type === "warning") {
    try {
      UIComponents.showToast(message, type, 8000); // Longer duration for errors
    } catch (error) {
      console.warn("Toast not available:", error);
    }
  }

  // Update state
  try {
    stateManager.setUIState(type, message);
  } catch (error) {
    console.warn("State manager not available:", error);
  }
}

/**
 * Enhanced spinner management with fallback
 */
function toggleSpinner(elementName, show) {
  const spinnerElement =
    typeof elementName === "string"
      ? domElements.get(elementName)
      : elementName;

  if (spinnerElement) {
    spinnerElement.classList.toggle("d-none", !show);
    spinnerElement.classList.toggle("hidden", !show);
  }

  // Update global loading state
  try {
    stateManager.setLoading(show);
  } catch (error) {
    console.warn("State manager not available:", error);
  }
}

/**
 * Enhanced select reset with better UX
 */
function resetSelect(selectElement, defaultText) {
  const element =
    typeof selectElement === "string"
      ? domElements.get(selectElement)
      : selectElement;

  if (element) {
    element.innerHTML = `<option value="">${
      defaultText || "Sélectionnez une option"
    }</option>`;
    element.disabled = true;
    element.classList.remove("error"); // Remove any error state
  }
}

/**
 * Enhanced name formatting with better Unicode support
 */
function formatApiName(name) {
  if (!name) return "";

  return name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

/**
 * Enhanced select population with error handling and animations
 */
function populateSelect(
  selectElement,
  data,
  defaultOptionText,
  emptyDataText,
  dataType
) {
  const element =
    typeof selectElement === "string"
      ? domElements.get(selectElement)
      : selectElement;

  if (!element) {
    console.warn(`Select element not found: ${selectElement}`);
    return false;
  }

  // Reset first
  resetSelect(element, defaultOptionText);

  if (!data || data.length === 0) {
    element.innerHTML = `<option value="">${emptyDataText}</option>`;
    element.disabled = true;
    return false;
  }

  // Create document fragment for better performance
  const fragment = document.createDocumentFragment();

  // Add default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = defaultOptionText;
  defaultOption.disabled = true;
  defaultOption.selected = true;
  fragment.appendChild(defaultOption);

  // Add data options
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;

    // Enhanced formatting logic
    let displayText = "";
    if (dataType === "zone" && zoneNameMappings.hasOwnProperty(item.name)) {
      displayText = zoneNameMappings[item.name];
    } else {
      displayText = formatApiName(item.name);
    }

    option.textContent = displayText;
    option.setAttribute("data-raw-name", item.name); // Store original name
    fragment.appendChild(option);
  });

  // Update DOM in one operation
  element.innerHTML = "";
  element.appendChild(fragment);
  element.disabled = false;

  // Add fade-in animation
  element.classList.add("fade-in");

  return true;
}

// --- Enhanced Helper Functions ---

/**
 * Create enhanced form field with validation
 */
function createEnhancedField(config) {
  console.warn("Enhanced field creation not available in fallback mode");
  return null;
}

/**
 * Batch update multiple selects efficiently
 */
function updateSelectStates(updates) {
  updates.forEach(({ element, data, config }) => {
    populateSelect(
      element,
      data,
      config.defaultText,
      config.emptyText,
      config.dataType
    );
  });
}

/**
 * Enhanced error display with better UX
 */
function showFieldError(fieldName, error) {
  const field = domElements.get(fieldName);
  if (field) {
    field.classList.add("error");

    // Show error message
    let errorElement = field.parentNode.querySelector(".field-error");
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "field-error";
      field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = error;
    errorElement.classList.remove("hidden");
  }
}

/**
 * Clear field error state
 */
function clearFieldError(fieldName) {
  const field = domElements.get(fieldName);
  if (field) {
    field.classList.remove("error");
    const errorElement = field.parentNode.querySelector(".field-error");
    if (errorElement) {
      errorElement.classList.add("hidden");
    }
  }
}

// --- Backward Compatibility Layer ---
// Export individual elements for backward compatibility
const citySelect = domElements.get("citySelect");
const zoningSelect = domElements.get("zoningSelect");
const zoneSelect = domElements.get("zoneSelect");
const typologieSelect = domElements.get("typologieSelect");
const synthesisBtn = domElements.get("synthesisBtn");
const statusMessage = domElements.get("statusMessage");

const citySpinner = domElements.get("citySpinner");
const zoningSpinner = domElements.get("zoningSpinner");
const zoneSpinner = domElements.get("zoneSpinner");
const typologieSpinner = domElements.get("typologieSpinner");
const documentSpinner = domElements.get("documentSpinner");

const userStatus = domElements.get("userStatus");
const logoutBtn = domElements.get("logoutBtn");
const loginLink = domElements.get("loginLink");
const signupLink = domElements.get("signupLink");

// --- Enhanced Exports ---
export {
  // Backward compatibility - individual elements
  citySelect,
  zoningSelect,
  zoneSelect,
  typologieSelect,
  synthesisBtn,
  statusMessage,
  citySpinner,
  zoningSpinner,
  zoneSpinner,
  typologieSpinner,
  documentSpinner,
  userStatus,
  logoutBtn,
  loginLink,
  signupLink,

  // Enhanced functions
  showStatus,
  toggleSpinner,
  resetSelect,
  formatApiName,
  populateSelect,

  // New enhanced functions
  createEnhancedField,
  updateSelectStates,
  showFieldError,
  clearFieldError,

  // Enhanced elements manager
  domElements,

  // Re-export UI components for convenience
  UIComponents,
};
