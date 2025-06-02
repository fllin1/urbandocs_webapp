// src/js/plu-summary.js
/**
 * PLU Summary - Redesigned
 * @module plu-summary
 * @description This module handles the PLU summary page with new design.
 * @version 0.1.0
 * @author GreyPanda
 *
 * @changelog
 * - 0.1.0 (2025-01-29): Complete redesign with new tab structure and styling
 * - 0.0.3 (2025-01-27): Added header authentication for dynamic header updates
 * - 0.0.2 (2025-05-27): Rework UI.
 * - 0.0.1 (2025-05-16): Initial version with basic PLU summary page.
 */

import { supabase } from "./supabase-client.js";
import { initHeaderAuth } from "./auth/header-auth.js";
import { initDeletionGuard } from "./auth/deletion-guard.js";

// Global variables
let currentUser = null;
let currentDocument = null;
let currentCommentId = null;
let ratingsData = [];
let userCurrentRating = null;

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Initialize deletion guard first (blocks access if needed)
    const canAccess = await initDeletionGuard(false);
    if (!canAccess) {
      return; // Access was blocked, stop initialization
    }

    // Initialize header authentication
    initHeaderAuth();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }
    currentUser = user;

    // Get document ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const documentId = urlParams.get("id");

    if (!documentId) {
      showError("Aucun document spécifié");
      return;
    }

    // Load document
    await loadDocument(documentId);

    // Setup event listeners
    setupEventListeners();

    // Initialize back to top functionality
    initBackToTop();
  } catch (error) {
    console.error("Error initializing PLU summary page:", error);
    showError("Erreur lors de l'initialisation de la page");
  }
});

// Load document from Supabase
async function loadDocument(documentId) {
  try {
    // Fetch document with related data
    const { data: documentData, error } = await supabase
      .from("documents")
      .select(
        `
          id,
          zoning:zonings(name, city:cities(name)),
          zone:zones(name),
          html_content,
          pdf_storage_path,
          source_plu_date,
          source_plu_url
        `
      )
      .eq("id", documentId)
      .single();

    if (error) throw error;

    currentDocument = documentData;

    // Update UI with document info
    updateDocumentInfo(documentData);

    // Insert HTML content
    document.getElementById("plu-content").innerHTML =
      documentData.html_content;

    // Load ratings
    await loadRatings();

    // Load comments
    await loadComments();

    // Update source link
    if (documentData.source_plu_url) {
      document.getElementById("source-plu-link").href =
        documentData.source_plu_url;
    }

    // Hide loading, show content
    document.getElementById("loading-state").style.display = "none";
    document.getElementById("document-content").style.display = "block";
  } catch (error) {
    console.error("Error loading document:", error);
    showError("Impossible de charger le document");
  }
}

function capitalizeWords(str) {
  if (!str) return str;
  return str.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

// Update document information in UI
function updateDocumentInfo(documentData) {
  const cityName = capitalizeWords(documentData.zoning.city.name);
  const zoneName = documentData.zone.name;
  const sourcePluDate = documentData.source_plu_date
    ? new Date(documentData.source_plu_date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
      })
    : "Date inconnue";

  // Breadcrumb
  const cityBreadcrumb = document.getElementById("city-breadcrumb");
  cityBreadcrumb.textContent = cityName;
  cityBreadcrumb.href = `/city?name=${encodeURIComponent(
    documentData.zoning.city.name
  )}`;

  document.getElementById("zone-breadcrumb").textContent = `Zone ${zoneName}`;

  // Title and subtitle
  document.getElementById(
    "document-title"
  ).textContent = `Synthèse du PLU de ${cityName} pour la zone ${zoneName}`;
  document.getElementById(
    "document-subtitle"
  ).textContent = `Basé sur le PLU de ${sourcePluDate}`;
}

// Load and display ratings
async function loadRatings() {
  try {
    // Get all ratings for this document
    const { data: ratings, error } = await supabase
      .from("ratings")
      .select("rating, user_id")
      .eq("document_id", currentDocument.id);

    if (error) throw error;

    ratingsData = ratings || [];

    // Calculate average and distribution
    if (ratingsData.length > 0) {
      const average =
        ratingsData.reduce((sum, r) => sum + r.rating, 0) / ratingsData.length;

      // Update average rating display
      document.getElementById("average-rating").textContent =
        average.toFixed(1);
      document.getElementById("rating-count").textContent = ratingsData.length;

      // Calculate distribution
      const distribution = calculateRatingDistribution(ratingsData);
      updateRatingBars(distribution);

      // Check if current user has rated
      const userRating = ratingsData.find((r) => r.user_id === currentUser.id);
      if (userRating) {
        userCurrentRating = userRating.rating;
      } else {
        userCurrentRating = null;
      }
    } else {
      document.getElementById("average-rating").textContent = "0";
      document.getElementById("rating-count").textContent = "0";
      updateRatingBars({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
      userCurrentRating = null;
    }

    // Update stars display
    updateStarsDisplay();
  } catch (error) {
    console.error("Error loading ratings:", error);
  }
}
// Calculate rating distribution
function calculateRatingDistribution(ratings) {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratings.forEach((r) => {
    distribution[r.rating]++;
  });
  return distribution;
}

// Update rating bars
function updateRatingBars(distribution) {
  const total = ratingsData.length || 1;

  for (let i = 1; i <= 5; i++) {
    const percentage = (distribution[i] / total) * 100;
    document.getElementById(`rating-${i}`).style.width = `${percentage}%`;
    document.getElementById(`rating-${i}-percent`).textContent = `${Math.round(
      percentage
    )}%`;
  }
}

// Load comments
async function loadComments() {
  try {
    // First, get the comments
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .select("*")
      .eq("document_id", currentDocument.id)
      .order("created_at", { ascending: false });

    if (commentsError) throw commentsError;

    if (comments.length === 0) {
      renderComments([]);
      return;
    }

    // Get unique user IDs
    const userIds = [...new Set(comments.map((c) => c.user_id))];

    // Fetch profiles for those users
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .in("id", userIds);

    if (profilesError) {
      console.warn("Could not fetch profiles:", profilesError);
      const commentsWithoutProfiles = comments.map((comment) => ({
        ...comment,
        profiles: null,
      }));
      renderComments(commentsWithoutProfiles);
      return;
    }

    // Map profiles to comments
    const profilesMap = profiles.reduce((acc, profile) => {
      acc[profile.id] = profile;
      return acc;
    }, {});

    // Attach profiles to comments
    const commentsWithProfiles = comments.map((comment) => ({
      ...comment,
      profiles: profilesMap[comment.user_id] || null,
    }));

    // Render comments
    renderComments(commentsWithProfiles);
  } catch (error) {
    console.error("Error loading comments:", error);
    renderComments([]);
  }
}

// Render comments in UI
function renderComments(comments) {
  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  if (comments.length === 0) {
    commentsList.innerHTML =
      '<p style="text-align: center; color: var(--text-gray); padding: 2rem;">Aucun commentaire pour le moment. Soyez le premier à commenter!</p>';
    return;
  }

  comments.forEach((comment) => {
    const commentEl = createCommentElement(comment);
    commentsList.appendChild(commentEl);
  });
}

// Create comment element
function createCommentElement(comment) {
  const div = document.createElement("div");
  div.className = "comment";
  div.dataset.commentId = comment.id;

  const isOwner = comment.user_id === currentUser.id;
  const userName = comment.profiles?.full_name || "Utilisateur anonyme";
  const avatarUrl =
    comment.profiles?.avatar_url || "assets/icons/default-avatar.svg";
  const date = new Date(comment.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const commentHeader = document.createElement("div");
  commentHeader.className = "comment-header";

  // Avatar and meta
  const avatarMeta = document.createElement("div");
  avatarMeta.style.display = "flex";
  avatarMeta.style.alignItems = "center";
  avatarMeta.style.gap = "1rem";
  avatarMeta.innerHTML = `
    <img src="${avatarUrl}" alt="${userName}" class="comment-avatar">
    <div class="comment-meta">
      <div class="comment-author">${userName}</div>
      <div class="comment-date">${date}${
    comment.updated_at !== comment.created_at ? " (modifié)" : ""
  }</div>
    </div>
  `;
  commentHeader.appendChild(avatarMeta);

  div.appendChild(commentHeader);

  // Comment content
  const content = document.createElement("div");
  content.className = "comment-content";
  content.textContent = comment.content;
  div.appendChild(content);

  // Actions for owner
  if (isOwner) {
    const actions = document.createElement("div");
    actions.className = "comment-actions";
    actions.innerHTML = `
      <button class="comment-action edit-comment" data-id="${comment.id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        Modifier
      </button>
      <button class="comment-action delete-comment" data-id="${comment.id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
        Supprimer
      </button>
    `;
    div.appendChild(actions);
  }

  return div;
}

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", switchTab);
  });

  // Rating stars click
  document.querySelectorAll("#user-rating .star-btn").forEach((star) => {
    star.addEventListener("click", handleRating);
  });

  // Rating stars hover
  document.querySelectorAll("#user-rating .star-btn").forEach((star, index) => {
    star.addEventListener("mouseenter", () => handleStarHover(index + 1));
  });

  // Reset stars on mouse leave
  document.getElementById("user-rating").addEventListener("mouseleave", () => {
    updateStarsDisplay();
  });

  // Download button
  document
    .getElementById("download-btn")
    .addEventListener("click", handleDownload);

  // Comment submission
  document
    .getElementById("submit-comment")
    .addEventListener("click", submitComment);

  // Comment actions (delegation)
  document
    .getElementById("comments-list")
    .addEventListener("click", handleCommentAction);

  // Modal events
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  document.getElementById("cancel-edit").addEventListener("click", closeModal);
  document
    .getElementById("save-edit")
    .addEventListener("click", saveCommentEdit);

  // Logout
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
}

function handleStarHover(rating) {
  const stars = document.querySelectorAll("#user-rating .star-btn");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("hovered");
    } else {
      star.classList.remove("hovered");
    }
  });
}
// Initialize back to top functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // Smooth scroll to top
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Switch tabs
function switchTab(e) {
  const targetTab = e.target.dataset.tab;

  // Update active states
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === targetTab);
  });

  // Show/hide content
  document.getElementById("synthese-tab").style.display =
    targetTab === "synthese" ? "block" : "none";
  document.getElementById("commentaires-tab").style.display =
    targetTab === "commentaires" ? "block" : "none";
  document.getElementById("sources-tab").style.display =
    targetTab === "sources" ? "block" : "none";
}

function updateStarsDisplay() {
  const stars = document.querySelectorAll("#user-rating .star-btn");

  // If user has a rating, show it
  if (userCurrentRating) {
    stars.forEach((star, index) => {
      star.classList.toggle("selected", index < userCurrentRating);
      star.classList.remove("hovered");
      star.setAttribute("data-star-type", "full");
    });
  } else {
    // Show average rating with half stars
    const avgRating = parseFloat(
      document.getElementById("average-rating").textContent
    );
    if (!isNaN(avgRating) && avgRating > 0) {
      displayAverageRating(avgRating);
    } else {
      // No ratings at all, show empty stars
      stars.forEach((star) => {
        star.classList.remove("selected", "hovered");
        star.setAttribute("data-star-type", "empty");
      });
    }
  }
}

// Handle rating
async function handleRating(e) {
  const rating = parseInt(e.target.dataset.rating);

  // If clicking on the same rating, remove it
  if (userCurrentRating === rating) {
    try {
      // Delete the rating
      const { error } = await supabase
        .from("ratings")
        .delete()
        .eq("document_id", currentDocument.id)
        .eq("user_id", currentUser.id);

      if (error) throw error;

      userCurrentRating = null;

      // Reload ratings to update average
      await loadRatings();
    } catch (error) {
      console.error("Error removing rating:", error);
      alert("Erreur lors de la suppression de votre note");
    }
    return;
  }

  // Otherwise, set/update the rating
  try {
    // Check if user already rated
    const { data: existing } = await supabase
      .from("ratings")
      .select("id")
      .eq("document_id", currentDocument.id)
      .eq("user_id", currentUser.id)
      .single();

    if (existing) {
      // Update existing rating
      await supabase
        .from("ratings")
        .update({ rating, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
    } else {
      // Insert new rating
      await supabase.from("ratings").insert({
        document_id: currentDocument.id,
        user_id: currentUser.id,
        rating,
      });
    }

    userCurrentRating = rating;

    // Reload ratings to update average
    await loadRatings();
  } catch (error) {
    console.error("Error rating document:", error);
    alert("Erreur lors de l'enregistrement de votre note");
  }
}

// Handle download
async function handleDownload() {
  try {
    console.log("PDF storage path:", currentDocument.pdf_storage_path);

    // Remove any leading slashes if present
    const cleanPath = currentDocument.pdf_storage_path.replace(/^\//, "");

    // Get download URL from Supabase Storage with download parameter
    const { data: urlData, error: urlError } = await supabase.storage
      .from("pdfs")
      .createSignedUrl(cleanPath, 60, {
        download: true, // This forces the download behavior
      });

    if (urlError) {
      console.error("URL Error details:", urlError);
      throw urlError;
    }

    // Track download
    await supabase.from("downloads").insert({
      document_id: currentDocument.id,
      user_id: currentUser.id,
    });

    // Trigger download
    const a = document.createElement("a");
    a.href = urlData.signedUrl;
    a.download = `PLU_${currentDocument.zoning.city.name}_${currentDocument.zone.name}.pdf`;
    document.body.appendChild(a); // Add to DOM
    a.click();
    document.body.removeChild(a); // Remove from DOM
  } catch (error) {
    console.error("Error downloading document:", error);

    if (error.message && error.message.includes("Object not found")) {
      alert(
        "Le fichier PDF n'a pas été trouvé. Veuillez contacter l'administrateur."
      );
    } else {
      alert("Erreur lors du téléchargement");
    }
  }
}

// Submit comment
async function submitComment() {
  const content = document.getElementById("comment-input").value.trim();

  if (!content) {
    alert("Veuillez entrer un commentaire");
    return;
  }

  try {
    const { error } = await supabase.from("comments").insert({
      document_id: currentDocument.id,
      user_id: currentUser.id,
      content,
    });

    if (error) throw error;

    // Clear input
    document.getElementById("comment-input").value = "";

    // Reload comments
    await loadComments();
  } catch (error) {
    console.error("Error submitting comment:", error);
    alert("Erreur lors de la publication du commentaire");
  }
}

// Handle comment actions
function handleCommentAction(e) {
  const editBtn = e.target.closest(".edit-comment");
  const deleteBtn = e.target.closest(".delete-comment");

  if (editBtn) {
    openEditModal(editBtn.dataset.id);
  } else if (deleteBtn) {
    deleteComment(deleteBtn.dataset.id);
  }
}

// Open edit modal
async function openEditModal(commentId) {
  currentCommentId = commentId;

  // Get comment content
  const { data: comment } = await supabase
    .from("comments")
    .select("content")
    .eq("id", commentId)
    .single();

  document.getElementById("edit-comment-input").value = comment.content;
  document.getElementById("edit-modal").style.display = "flex";
}

// Close modal
function closeModal() {
  document.getElementById("edit-modal").style.display = "none";
  currentCommentId = null;
}

// Save comment edit
async function saveCommentEdit() {
  const content = document.getElementById("edit-comment-input").value.trim();

  if (!content) {
    alert("Le commentaire ne peut pas être vide");
    return;
  }

  try {
    await supabase
      .from("comments")
      .update({
        content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", currentCommentId);

    closeModal();
    await loadComments();
  } catch (error) {
    console.error("Error updating comment:", error);
    alert("Erreur lors de la modification");
  }
}

// Delete comment
async function deleteComment(commentId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce commentaire?")) {
    return;
  }

  try {
    // Use the soft delete function instead of direct deletion
    const { data, error } = await supabase.rpc("soft_delete_comment", {
      comment_id: commentId,
      user_id: currentUser.id,
    });

    if (error) {
      throw error;
    }

    // Show success message with information about recovery period
    alert(
      "Commentaire supprimé. Il sera définitivement supprimé dans 30 jours. Contactez le support si vous souhaitez le récupérer."
    );

    await loadComments();
  } catch (error) {
    console.error("Error deleting comment:", error);
    alert("Erreur lors de la suppression");
  }
}

// Handle logout
async function handleLogout() {
  await supabase.auth.signOut();
  window.location.href = "/auth/login";
}

// Show error state
function showError(message) {
  document.getElementById("loading-state").style.display = "none";
  document.getElementById("error-message").textContent = message;
  document.getElementById("error-state").style.display = "flex";
}

// Utility function to escape HTML
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
