/**
 * Centralized State Manager
 * @module state-manager
 * @description Centralized state management for the application
 * @version 1.0.0
 * @author GreyPanda
 */

class StateManager {
  constructor() {
    this.state = {
      user: null,
      selectedDocument: null,
      cities: [],
      zonings: [],
      zones: [],
      selections: {
        city: null,
        zoning: null,
        zone: null,
      },
      ui: {
        loading: false,
        error: null,
        status: null,
      },
    };
    this.listeners = new Map();
  }

  // Subscribe to state changes
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(key);
      if (callbacks) {
        callbacks.delete(callback);
      }
    };
  }

  // Update state and notify listeners
  setState(key, value) {
    const oldValue = this.getState(key);
    this.setNestedValue(this.state, key, value);

    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach((callback) => {
        callback(value, oldValue);
      });
    }
  }

  // Get state value
  getState(key) {
    if (!key) return this.state;
    return this.getNestedValue(this.state, key);
  }

  // Helper to set nested values (e.g., 'user.profile.name')
  setNestedValue(obj, path, value) {
    if (!path || typeof path !== "string") {
      console.warn("Invalid path provided to setNestedValue:", path);
      return;
    }

    const keys = path.split(".");
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
  }

  // Helper to get nested values with better error handling
  getNestedValue(obj, path) {
    if (!path || typeof path !== "string") {
      console.warn("Invalid path provided to getNestedValue:", path);
      return null;
    }

    try {
      return path.split(".").reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
      }, obj);
    } catch (error) {
      console.warn("Error accessing nested value:", error);
      return null;
    }
  }

  // Set user state
  setUser(user) {
    this.setState("user", user);
  }

  // Set cities
  setCities(cities) {
    this.setState("cities", cities);
  }

  // Set zonings
  setZonings(zonings) {
    this.setState("zonings", zonings);
  }

  // Set zones
  setZones(zones) {
    this.setState("zones", zones);
  }

  // Set selected document
  setSelectedDocument(document) {
    this.setState("selectedDocument", document);
  }

  // Clear selected document
  clearSelectedDocument() {
    this.setState("selectedDocument", null);
  }

  // Reset all selections
  resetSelections() {
    this.setState("selections", {
      city: null,
      zoning: null,
      zone: null,
    });
    this.setState("selectedDocument", null);
  }

  // Update UI state
  setUIState(type, message) {
    this.setState("ui.status", { type, message });
  }

  // Set loading state
  setLoading(isLoading) {
    this.setState("ui.loading", isLoading);
  }

  // Set error state
  setError(error) {
    this.setState("ui.error", error);
  }
}

// Export singleton instance
export const stateManager = new StateManager();
