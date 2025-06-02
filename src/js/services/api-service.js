/**
 * Enhanced API Service
 * @module api-service
 * @description Improved API service with caching, retry logic, and better error handling
 * @version 1.0.0
 * @author GreyPanda
 */

import { supabase } from "../supabase-client.js";
import { stateManager } from "../state/state-manager.js";

class ApiService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 2 * 60 * 1000; // 2 minutes
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
  }

  // Generic retry wrapper
  async withRetry(operation, attempts = this.retryAttempts) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === attempts - 1) throw error;
        await new Promise((resolve) =>
          setTimeout(resolve, this.retryDelay * (i + 1))
        );
      }
    }
  }

  // Cache wrapper
  async withCache(key, operation, ttl = this.cacheTimeout) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }

    const data = await operation();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  // Enhanced error handling
  handleError(error, context) {
    console.error(`API Error in ${context}:`, error);

    let userMessage = "Une erreur inattendue s'est produite";

    if (error.code === "PGRST116") {
      userMessage = "Aucune donnée trouvée";
    } else if (error.code === "42P01") {
      userMessage = "Service temporairement indisponible";
    } else if (error.message?.includes("network")) {
      userMessage = "Problème de connexion réseau";
    }

    stateManager.setError({ message: userMessage, code: error.code });
    throw new Error(userMessage);
  }

  // Optimized city loading with caching
  async loadCities() {
    try {
      return await this.withCache("cities", async () => {
        return await this.withRetry(async () => {
          const { data, error } = await supabase
            .from("cities")
            .select("id, name")
            .order("name");

          if (error) throw error;
          return data;
        });
      });
    } catch (error) {
      this.handleError(error, "loadCities");
    }
  }

  // Optimized zoning loading
  async loadZonings(cityId) {
    if (!cityId) {
      throw new Error("City ID is required");
    }

    try {
      return await this.withCache(`zonings-${cityId}`, async () => {
        return await this.withRetry(async () => {
          const { data, error } = await supabase
            .from("zonings")
            .select("id, name")
            .eq("city_id", cityId)
            .order("name");

          if (error) throw error;
          return data;
        });
      });
    } catch (error) {
      this.handleError(error, "loadZonings");
    }
  }

  // Optimized zone loading
  async loadZones(zoningId) {
    if (!zoningId) {
      throw new Error("Zoning ID is required");
    }

    try {
      return await this.withCache(`zones-${zoningId}`, async () => {
        return await this.withRetry(async () => {
          const { data, error } = await supabase
            .from("zones")
            .select("id, name")
            .eq("zoning_id", zoningId)
            .order("name");

          if (error) throw error;
          return data;
        });
      });
    } catch (error) {
      this.handleError(error, "loadZones");
    }
  }

  // Enhanced document search
  async findDocument(zoningId, zoneId, typologieId) {
    if (!zoningId || !zoneId) {
      throw new Error("Zoning ID and Zone ID are required");
    }

    try {
      return await this.withRetry(async () => {
        const { data, error } = await supabase
          .from("documents")
          .select(
            `
            id,
            html_content,
            pdf_storage_path,
            source_plu_date,
            source_plu_url,
            zoning:zonings(name, city:cities(name)),
            zone:zones(name)
          `
          )
          .eq("zoning_id", zoningId)
          .eq("zone_id", zoneId)
          .eq("typology_id", typologieId)
          .single();

        if (error) throw error;
        return data;
      });
    } catch (error) {
      this.handleError(error, "findDocument");
    }
  }

  // Batch loading for better performance
  async loadCitiesWithZonings() {
    try {
      return await this.withCache("cities-with-zonings", async () => {
        return await this.withRetry(async () => {
          const { data, error } = await supabase
            .from("cities")
            .select(
              `
              id,
              name,
              zonings(id, name)
            `
            )
            .order("name");

          if (error) throw error;
          return data;
        });
      });
    } catch (error) {
      this.handleError(error, "loadCitiesWithZonings");
    }
  }

  // Clear cache
  clearCache(pattern) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  // Get cache stats
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const apiService = new ApiService();
