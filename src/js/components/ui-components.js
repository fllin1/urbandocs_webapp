/**
 * Enhanced UI Components
 * @module ui-components
 * @description Reusable UI components with accessibility and better UX
 * @version 1.0.0
 * @author GreyPanda
 */

import { stateManager } from "../state/state-manager.js";

export class UIComponents {
  // Enhanced Select Component with better UX
  static createEnhancedSelect(options = {}) {
    const {
      id,
      label,
      placeholder = "Sélectionnez une option",
      emptyMessage = "Aucune option disponible",
      searchable = false,
      required = false,
    } = options;

    const wrapper = document.createElement("div");
    wrapper.className = "enhanced-select-wrapper";

    const labelEl = document.createElement("label");
    labelEl.className = "form-label";
    labelEl.textContent = label;
    labelEl.setAttribute("for", id);

    const selectWrapper = document.createElement("div");
    selectWrapper.className = "select-wrapper";

    const select = document.createElement("select");
    select.id = id;
    select.className = "form-select enhanced-select";
    select.required = required;
    select.setAttribute("aria-label", label);

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = placeholder;
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    // Loading state
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton skeleton-select hidden";

    // Error state
    const errorMessage = document.createElement("div");
    errorMessage.className = "field-error hidden";
    errorMessage.setAttribute("role", "alert");

    selectWrapper.appendChild(select);
    selectWrapper.appendChild(skeleton);

    wrapper.appendChild(labelEl);
    wrapper.appendChild(selectWrapper);
    wrapper.appendChild(errorMessage);

    return {
      wrapper,
      select,
      skeleton,
      errorMessage,
      setLoading: (loading) => {
        skeleton.classList.toggle("hidden", !loading);
        select.classList.toggle("hidden", loading);
      },
      setError: (error) => {
        if (error) {
          errorMessage.textContent = error;
          errorMessage.classList.remove("hidden");
          select.classList.add("error");
        } else {
          errorMessage.classList.add("hidden");
          select.classList.remove("error");
        }
      },
      populateOptions: (data) => {
        // Clear existing options except default
        while (select.children.length > 1) {
          select.removeChild(select.lastChild);
        }

        if (!data || data.length === 0) {
          const emptyOption = document.createElement("option");
          emptyOption.value = "";
          emptyOption.textContent = emptyMessage;
          emptyOption.disabled = true;
          select.appendChild(emptyOption);
          select.disabled = true;
          return;
        }

        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.id;
          option.textContent = item.name;
          select.appendChild(option);
        });

        select.disabled = false;
      },
    };
  }

  // Toast Notification System
  static showToast(message, type = "info", duration = 5000) {
    const toastContainer = this.getOrCreateToastContainer();

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "polite");

    const icon = this.getToastIcon(type);
    const messageEl = document.createElement("span");
    messageEl.textContent = message;

    const closeBtn = document.createElement("button");
    closeBtn.className = "toast__close";
    closeBtn.innerHTML = "×";
    closeBtn.setAttribute("aria-label", "Fermer la notification");

    toast.appendChild(icon);
    toast.appendChild(messageEl);
    toast.appendChild(closeBtn);

    // Add to container with animation
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add("toast--show"), 10);

    // Auto remove
    const removeToast = () => {
      toast.classList.remove("toast--show");
      setTimeout(() => {
        if (toast.parentNode) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    };

    closeBtn.addEventListener("click", removeToast);

    if (duration > 0) {
      setTimeout(removeToast, duration);
    }

    return { remove: removeToast };
  }

  // Progress Bar Component
  static createProgressBar(options = {}) {
    const {
      label = "Progression",
      showPercentage = true,
      animated = true,
    } = options;

    const wrapper = document.createElement("div");
    wrapper.className = "progress-wrapper";

    const labelEl = document.createElement("div");
    labelEl.className = "progress-label";
    labelEl.textContent = label;

    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-container";

    const progressBar = document.createElement("div");
    progressBar.className = `progress-bar ${
      animated ? "progress-bar--animated" : ""
    }`;
    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute("aria-valuemax", "100");
    progressBar.setAttribute("aria-valuenow", "0");

    const progressFill = document.createElement("div");
    progressFill.className = "progress-fill";

    const percentageEl = document.createElement("span");
    percentageEl.className = "progress-percentage";
    percentageEl.textContent = "0%";

    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressBar);

    wrapper.appendChild(labelEl);
    wrapper.appendChild(progressContainer);

    if (showPercentage) {
      wrapper.appendChild(percentageEl);
    }

    return {
      wrapper,
      setProgress: (percentage) => {
        const value = Math.max(0, Math.min(100, percentage));
        progressFill.style.width = `${value}%`;
        progressBar.setAttribute("aria-valuenow", value);
        if (showPercentage) {
          percentageEl.textContent = `${Math.round(value)}%`;
        }
      },
    };
  }

  // Modal Component
  static createModal(options = {}) {
    const {
      title = "",
      size = "medium",
      closable = true,
      backdrop = true,
    } = options;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "modal-title");

    const modal = document.createElement("div");
    modal.className = `modal modal--${size}`;

    const header = document.createElement("div");
    header.className = "modal-header";

    const titleEl = document.createElement("h2");
    titleEl.id = "modal-title";
    titleEl.className = "modal-title";
    titleEl.textContent = title;

    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close";
    closeBtn.innerHTML = "×";
    closeBtn.setAttribute("aria-label", "Fermer");

    const body = document.createElement("div");
    body.className = "modal-body";

    const footer = document.createElement("div");
    footer.className = "modal-footer";

    header.appendChild(titleEl);
    if (closable) {
      header.appendChild(closeBtn);
    }

    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(footer);
    overlay.appendChild(modal);

    const show = () => {
      document.body.appendChild(overlay);
      document.body.classList.add("modal-open");
      setTimeout(() => overlay.classList.add("modal-overlay--show"), 10);

      // Focus management
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    };

    const hide = () => {
      overlay.classList.remove("modal-overlay--show");
      setTimeout(() => {
        if (overlay.parentNode) {
          document.body.removeChild(overlay);
          document.body.classList.remove("modal-open");
        }
      }, 300);
    };

    if (closable) {
      closeBtn.addEventListener("click", hide);
    }

    if (backdrop) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          hide();
        }
      });
    }

    // Escape key handling
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && closable && overlay.parentNode) {
        hide();
      }
    });

    return {
      overlay,
      body,
      footer,
      show,
      hide,
      setTitle: (newTitle) => {
        titleEl.textContent = newTitle;
      },
    };
  }

  // Helper methods
  static getOrCreateToastContainer() {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      container.setAttribute("aria-atomic", "false");
      document.body.appendChild(container);
    }
    return container;
  }

  static getToastIcon(type) {
    const icon = document.createElement("span");
    icon.className = "toast__icon";

    const iconMap = {
      success: "✓",
      error: "✗",
      warning: "⚠",
      info: "ℹ",
    };

    icon.textContent = iconMap[type] || iconMap.info;
    return icon;
  }

  // Form validation helper
  static validateField(field, rules) {
    const errors = [];
    const value = field.value.trim();

    if (rules.required && !value) {
      errors.push("Ce champ est requis");
    }

    if (rules.email && value && !this.isValidEmail(value)) {
      errors.push("Format d'email invalide");
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Minimum ${rules.minLength} caractères requis`);
    }

    if (rules.pattern && value && !rules.pattern.test(value)) {
      errors.push(rules.patternMessage || "Format invalide");
    }

    return errors;
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
