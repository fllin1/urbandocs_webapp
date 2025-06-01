// src/js/modules/contact-form.js - Contact form module
import { supabase } from "../supabase-client.js";

// Contact form handler
export async function handleContactSubmit(event) {
  event.preventDefault();

  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = "Envoi en cours...";

  try {
    // Get form data
    const formData = new FormData(event.target);
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Validate that all fields have values
    if (
      !contactData.name ||
      !contactData.email ||
      !contactData.subject ||
      !contactData.message
    ) {
      throw new Error("Tous les champs sont requis");
    }

    // Clean and validate the data
    const cleanContactData = {
      name: String(contactData.name).trim(),
      email: String(contactData.email).trim(),
      subject: String(contactData.subject).trim(),
      message: String(contactData.message).trim(),
    };

    console.log("Submitting contact data:", cleanContactData);

    // Insert into Supabase database
    const { data, error } = await supabase
      .from("support_messages")
      .insert(cleanContactData)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);

      // Provide user-friendly error message based on error code
      if (error.code === "42501") {
        throw new Error(
          "Erreur de permission. Veuillez réessayer ou nous contacter directement."
        );
      } else if (error.code === "PGRST301") {
        throw new Error(
          "Erreur de validation des données. Vérifiez vos informations."
        );
      } else {
        throw new Error(`Erreur lors de l'enregistrement: ${error.message}`);
      }
    }

    console.log("Successfully inserted to database:", data);

    // Send Discord notification directly from client
    try {
      await sendDiscordNotification({
        ...data,
        created_at: data.created_at || new Date().toISOString(),
      });
    } catch (discordError) {
      // Don't fail the entire submission if Discord fails
      console.warn("Discord notification failed:", discordError);
    }

    // Success feedback
    showNotification(
      "Message envoyé avec succès ! Nous vous répondrons bientôt.",
      "success"
    );
    event.target.reset();
  } catch (error) {
    console.error("Error sending contact message:", error);

    // Show specific error message if available, otherwise generic message
    const errorMessage =
      error.message || "Erreur lors de l'envoi du message. Veuillez réessayer.";
    showNotification(errorMessage, "error");
  } finally {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

// Send Discord notification
async function sendDiscordNotification(contactData) {
  try {
    const response = await fetch(
      "https://ofeyssipibktmbfebibo.supabase.co/functions/v1/discord-contact-notification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZXlzc2lwaWJrdG1iZmViaWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjUwOTQsImV4cCI6MjA1OTUwMTA5NH0.w71CAKfolktzRl-TmLVhHYaEbhCfVk4A7YraEUCglrU`, // anon key
        },
        body: JSON.stringify({
          record: contactData,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Discord API error: ${response.status} - ${
          errorData.error || "Unknown error"
        }`
      );
    }

    const result = await response.json();
    console.log("Discord notification sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Failed to send Discord notification:", error);
    throw error;
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

// Initialize contact form
export function initContactForm() {
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
    console.log("Contact form initialized");
    return true;
  }
  return false;
}
