// src/js/modules/donation-system.js - Simplified donation system using Stripe payment links

// Stripe payment links for different donation amounts
const DONATION_LINKS = {
  5: "https://buy.stripe.com/fZu6oJ2R9fAp6GN0ms9Zm07",
  10: "https://buy.stripe.com/4gM28t4Zhcod5CJ2uA9Zm06",
  15: "https://buy.stripe.com/8x2fZj0J14VLe9fc5a9Zm03",
  20: "https://buy.stripe.com/bJe9AV77pcod6GN3yE9Zm05",
  30: "https://buy.stripe.com/7sY9AV9fx9c10ip1qw9Zm02",
  50: "https://buy.stripe.com/6oU7sN0J1fAp7KR0ms9Zm04",
  100: "https://buy.stripe.com/aFa7sN77p0Fv7KR2uA9Zm01",
};

// Custom amount payment link (pay-what-you-want)
const CUSTOM_AMOUNT_LINK = "https://buy.stripe.com/6oUfZj77pgEtfdjb169Zm00";

// Handle donation amount selection and redirect to Stripe
export function setupDonationSystem() {
  const amountBtns = document.querySelectorAll(".amount-btn");
  const customAmountInput = document.getElementById("customAmount");
  const donateBtn = document.getElementById("donateBtn");

  if (!amountBtns.length || !customAmountInput || !donateBtn) {
    console.error("Required donation form elements not found");
    return false;
  }

  let selectedAmount = 5; // Default amount

  // Initialize the button with default amount
  updateDonateButton(selectedAmount);

  // Handle preset amount buttons
  amountBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove selected class from all buttons
      amountBtns.forEach((b) => b.classList.remove("selected"));

      // Add selected class to clicked button
      btn.classList.add("selected");

      // Update selected amount
      selectedAmount = parseInt(btn.dataset.amount);
      updateDonateButton(selectedAmount);

      // Clear custom amount input
      customAmountInput.value = "";
    });
  });

  // Handle custom amount input
  customAmountInput.addEventListener("input", (e) => {
    const customAmount = parseInt(e.target.value);

    if (customAmount && customAmount > 0) {
      // Remove selected class from all preset buttons
      amountBtns.forEach((btn) => btn.classList.remove("selected"));

      // Update selected amount
      selectedAmount = customAmount;
      updateDonateButton(selectedAmount);
    } else if (!e.target.value) {
      // If custom input is empty, select default amount
      const defaultBtn = document.querySelector('.amount-btn[data-amount="5"]');
      if (defaultBtn) {
        defaultBtn.classList.add("selected");
        selectedAmount = 5;
        updateDonateButton(selectedAmount);
      }
    }
  });

  // Handle donate button click
  donateBtn.addEventListener("click", () => {
    if (selectedAmount > 0) {
      processDonation(selectedAmount);
    }
  });

  console.log("Donation system setup complete");
  return true;
}

// Update donate button state and text
function updateDonateButton(amount) {
  const donateBtn = document.getElementById("donateBtn");

  if (donateBtn && amount > 0) {
    donateBtn.disabled = false;
    donateBtn.innerHTML = `Faire un don de&nbsp;<span id="selectedAmount">${amount}</span>€`;
  } else if (donateBtn) {
    donateBtn.disabled = true;
    donateBtn.innerHTML = `Faire un don de&nbsp;<span id="selectedAmount">0</span>€`;
  }
}

// Process donation by opening Stripe checkout in new window
function processDonation(amount) {
  const donateBtn = document.getElementById("donateBtn");
  const originalHTML = donateBtn.innerHTML;

  // Show loading state
  donateBtn.disabled = true;
  donateBtn.innerHTML = "Ouverture du paiement...";

  try {
    // Use pre-built payment link for standard amounts
    if (DONATION_LINKS[amount]) {
      // Open Stripe checkout in new window/tab
      const stripeWindow = window.open(
        DONATION_LINKS[amount],
        "stripe-checkout",
        "width=600,height=600,scrollbars=yes,resizable=yes"
      );

      // Restore button state after opening
      setTimeout(() => {
        donateBtn.disabled = false;
        donateBtn.innerHTML = originalHTML;
      }, 1000);

      // Optional: Focus the new window
      if (stripeWindow) {
        stripeWindow.focus();
      }

      return;
    }

    // For custom amounts, use the pay-what-you-want payment link
    // The user will be able to adjust the amount on the Stripe page
    const stripeWindow = window.open(
      CUSTOM_AMOUNT_LINK,
      "stripe-checkout",
      "width=600,height=600,scrollbars=yes,resizable=yes"
    );

    // Restore button state after opening
    setTimeout(() => {
      donateBtn.disabled = false;
      donateBtn.innerHTML = originalHTML;
    }, 1000);

    // Optional: Focus the new window
    if (stripeWindow) {
      stripeWindow.focus();
    }

    // Show helpful message for custom amounts
    showNotification(
      `Vous pourrez ajuster le montant (${amount}€) sur la page de paiement Stripe.`,
      "info"
    );
  } catch (error) {
    console.error("Error processing donation:", error);
    showNotification("Erreur lors du traitement du don.", "error");

    // Restore button state
    donateBtn.disabled = false;
    donateBtn.innerHTML = originalHTML;
  }
}

// Simple notification system
export function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notif) => notif.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500",
    zIndex: "10000",
    maxWidth: "400px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    backgroundColor:
      type === "success"
        ? "#10b981"
        : type === "error"
        ? "#ef4444"
        : type === "warning"
        ? "#f59e0b"
        : "#3b82f6",
  });

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);

  return notification;
}

// Initialize donation system
export function initDonationSystem() {
  try {
    const systemSetup = setupDonationSystem();
    if (!systemSetup) {
      throw new Error("Failed to setup donation system");
    }

    console.log("Donation system initialized successfully");
    showNotification("Stripe initialisé", "success");
    return true;
  } catch (error) {
    console.error("Error initializing donation system:", error);
    showNotification("Erreur d'initialisation du système de paiement", "error");
    return false;
  }
}
