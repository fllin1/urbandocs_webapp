// src/js/modules/donation-system.js - Donation system module
import { loadStripe } from "@stripe/stripe-js";

// You'll need to replace this with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = "pk_test_..."; // Replace with your Stripe publishable key
let stripe;

// Initialize Stripe
export async function initStripe() {
  try {
    stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
    if (!stripe) {
      throw new Error("Stripe failed to load");
    }
    console.log("Stripe initialized successfully");
    return true;
  } catch (error) {
    console.error("Error loading Stripe:", error);
    showNotification("Erreur de chargement du système de paiement", "error");
    return false;
  }
}

// Handle donation amount selection
export function setupAmountSelection() {
  const amountBtns = document.querySelectorAll(".amount-btn");
  const customAmountInput = document.getElementById("customAmount");
  const selectedAmountSpan = document.getElementById("selectedAmount");
  const donateBtn = document.getElementById("donateBtn");

  if (
    !amountBtns.length ||
    !customAmountInput ||
    !selectedAmountSpan ||
    !donateBtn
  ) {
    console.error("Required donation form elements not found");
    return false;
  }

  let selectedAmount = 5; // Default amount

  // Handle preset amount buttons
  amountBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove selected class from all buttons
      amountBtns.forEach((b) => b.classList.remove("selected"));

      // Add selected class to clicked button
      btn.classList.add("selected");

      // Update selected amount
      selectedAmount = parseInt(btn.dataset.amount);
      selectedAmountSpan.textContent = selectedAmount;

      // Clear custom amount input
      customAmountInput.value = "";

      // Update button state
      updateDonateButton(selectedAmount);
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
      selectedAmountSpan.textContent = selectedAmount;

      // Update button state
      updateDonateButton(selectedAmount);
    } else if (!e.target.value) {
      // If custom input is empty, select default amount
      const defaultBtn = document.querySelector('.amount-btn[data-amount="5"]');
      if (defaultBtn) {
        defaultBtn.classList.add("selected");
        selectedAmount = 5;
        selectedAmountSpan.textContent = selectedAmount;
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

  console.log("Donation amount selection setup complete");
  return true;
}

// Update donate button state
function updateDonateButton(amount) {
  const donateBtn = document.getElementById("donateBtn");
  if (donateBtn && amount > 0) {
    donateBtn.disabled = false;
    donateBtn.innerHTML = `Faire un don de&nbsp;<span id="selectedAmount">${amount}</span>€`;
  } else if (donateBtn) {
    donateBtn.disabled = true;
  }
}

// Process donation with Stripe
async function processDonation(amount) {
  if (!stripe) {
    showNotification("Système de paiement non disponible", "error");
    return;
  }

  const donateBtn = document.getElementById("donateBtn");
  const originalHTML = donateBtn.innerHTML;

  // Show loading state
  donateBtn.disabled = true;
  donateBtn.innerHTML = "Préparation du paiement...";

  try {
    // Create checkout session on your backend
    const response = await fetch(
      "https://ofeyssipibktmbfebibo.supabase.co/functions/v1/create-donation-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZXlzc2lwaWJrdG1iZmViaWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjUwOTQsImV4cCI6MjA1OTUwMTA5NH0.w71CAKfolktzRl-TmLVhHYaEbhCfVk4A7YraEUCglrU`, // anon key
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency: "eur",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error processing donation:", error);
    showNotification(
      "Erreur lors du traitement du don. Veuillez réessayer.",
      "error"
    );

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
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    zIndex: "10000",
    maxWidth: "400px",
    backgroundColor:
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6",
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
export async function initDonationSystem() {
  try {
    // Initialize Stripe
    const stripeInitialized = await initStripe();
    if (!stripeInitialized) {
      throw new Error("Failed to initialize Stripe");
    }

    // Setup amount selection functionality
    const amountSelectionSetup = setupAmountSelection();
    if (!amountSelectionSetup) {
      throw new Error("Failed to setup amount selection");
    }

    console.log("Donation system initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing donation system:", error);
    showNotification("Erreur d'initialisation du système de don", "error");
    return false;
  }
}
