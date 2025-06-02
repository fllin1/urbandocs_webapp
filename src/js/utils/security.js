/**
 * Security Utilities
 * @module security
 * @description Security utilities for XSS protection, input sanitization, and validation
 * @version 1.0.0
 * @author GreyPanda
 */

export class SecurityUtils {
  // XSS Protection
  static sanitizeHTML(input) {
    if (typeof input !== "string") return "";

    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

  // Safe HTML insertion for trusted content
  static safeSetHTML(element, html) {
    // Create a temporary container
    const temp = document.createElement("div");
    temp.innerHTML = html;

    // Remove potentially dangerous elements and attributes
    this.removeDangerousElements(temp);
    this.removeDangerousAttributes(temp);

    // Set the cleaned content
    element.innerHTML = temp.innerHTML;
  }

  static removeDangerousElements(container) {
    const dangerousTags = [
      "script",
      "iframe",
      "object",
      "embed",
      "link",
      "style",
      "meta",
    ];

    dangerousTags.forEach((tag) => {
      const elements = container.querySelectorAll(tag);
      elements.forEach((el) => el.remove());
    });
  }

  static removeDangerousAttributes(container) {
    const dangerousAttrs = [
      "onclick",
      "onload",
      "onerror",
      "onmouseover",
      "onfocus",
      "onblur",
    ];

    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_ELEMENT,
      null,
      false
    );

    const elements = [];
    let node;
    while ((node = walker.nextNode())) {
      elements.push(node);
    }

    elements.forEach((element) => {
      // Remove event handlers
      dangerousAttrs.forEach((attr) => {
        if (element.hasAttribute(attr)) {
          element.removeAttribute(attr);
        }
      });

      // Check for javascript: urls
      ["href", "src", "action"].forEach((attr) => {
        const value = element.getAttribute(attr);
        if (value && value.toLowerCase().includes("javascript:")) {
          element.removeAttribute(attr);
        }
      });
    });
  }

  // Input validation
  static validateInput(input, type) {
    switch (type) {
      case "email":
        return this.isValidEmail(input);
      case "uuid":
        return this.isValidUUID(input);
      case "alphanumeric":
        return /^[a-zA-Z0-9\s-_]+$/.test(input);
      case "numeric":
        return /^\d+$/.test(input);
      case "text":
        return this.isValidText(input);
      default:
        return false;
    }
  }

  static isValidEmail(email) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  static isValidUUID(uuid) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  static isValidText(text) {
    // Allow letters, numbers, basic punctuation, and common accented characters
    const textRegex =
      /^[a-zA-Z0-9\s.,!?;:()\-_'""«»àáâãäåæçèéêëìíîïñòóôõöøùúûüýÿ]+$/;
    return textRegex.test(text) && text.length <= 1000;
  }

  // Rate limiting for client-side requests
  static createRateLimiter(maxRequests = 10, windowMs = 60000) {
    const requests = new Map();

    return (key) => {
      const now = Date.now();
      const windowStart = now - windowMs;

      // Clean old requests
      if (requests.has(key)) {
        const userRequests = requests
          .get(key)
          .filter((time) => time > windowStart);
        requests.set(key, userRequests);
      } else {
        requests.set(key, []);
      }

      const userRequests = requests.get(key);

      if (userRequests.length >= maxRequests) {
        return false; // Rate limit exceeded
      }

      userRequests.push(now);
      return true; // Request allowed
    };
  }

  // Content Security Policy helper
  static generateCSPNonce() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  }

  // Secure session storage
  static secureStorage = {
    setItem(key, value, encrypt = false) {
      try {
        const data = encrypt
          ? this.simpleEncrypt(JSON.stringify(value))
          : JSON.stringify(value);
        sessionStorage.setItem(key, data);
      } catch (error) {
        console.warn("Failed to store data securely:", error);
      }
    },

    getItem(key, decrypt = false) {
      try {
        const data = sessionStorage.getItem(key);
        if (!data) return null;

        const parsed = decrypt ? this.simpleDecrypt(data) : data;
        return JSON.parse(parsed);
      } catch (error) {
        console.warn("Failed to retrieve data securely:", error);
        return null;
      }
    },

    removeItem(key) {
      sessionStorage.removeItem(key);
    },

    // Simple encryption (for non-sensitive data only)
    simpleEncrypt(text) {
      return btoa(encodeURIComponent(text));
    },

    simpleDecrypt(encrypted) {
      return decodeURIComponent(atob(encrypted));
    },
  };

  // Form security
  static validateForm(form, rules) {
    const errors = {};
    const formData = new FormData(form);

    for (const [fieldName, fieldRules] of Object.entries(rules)) {
      const value = formData.get(fieldName);
      const fieldErrors = [];

      if (fieldRules.required && (!value || value.trim() === "")) {
        fieldErrors.push("Ce champ est requis");
      }

      if (
        value &&
        fieldRules.type &&
        !this.validateInput(value, fieldRules.type)
      ) {
        fieldErrors.push(`Format ${fieldRules.type} invalide`);
      }

      if (
        value &&
        fieldRules.minLength &&
        value.length < fieldRules.minLength
      ) {
        fieldErrors.push(`Minimum ${fieldRules.minLength} caractères`);
      }

      if (
        value &&
        fieldRules.maxLength &&
        value.length > fieldRules.maxLength
      ) {
        fieldErrors.push(`Maximum ${fieldRules.maxLength} caractères`);
      }

      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  // CSRF protection helper
  static generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  }

  // URL validation
  static isValidURL(string) {
    try {
      const url = new URL(string);
      return ["http:", "https:"].includes(url.protocol);
    } catch {
      return false;
    }
  }

  // File upload security
  static validateFileUpload(file, options = {}) {
    const {
      allowedTypes = ["image/jpeg", "image/png", "application/pdf"],
      maxSize = 5 * 1024 * 1024, // 5MB
      allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf"],
    } = options;

    const errors = [];

    if (!allowedTypes.includes(file.type)) {
      errors.push("Type de fichier non autorisé");
    }

    if (file.size > maxSize) {
      errors.push(`Fichier trop volumineux (max: ${maxSize / 1024 / 1024}MB)`);
    }

    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));
    if (!allowedExtensions.includes(fileExtension)) {
      errors.push("Extension de fichier non autorisée");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
