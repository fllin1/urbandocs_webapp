// src/js/plu-summary.js
/**
 * PLU Summary
 * @module plu-summary
 * @description This module handles the PLU summary page.
 * @version 0.0.3
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.3 (2025-01-27): Added header authentication for dynamic header updates
 * - 0.0.2 (2025-05-27): Rework UI.
 * - 0.0.1 (2025-05-16): Initial version with basic PLU summary page.
 */

import { supabase } from "./supabase-client.js";
import { initHeaderAuth } from "./auth/header-auth.js";

// Global variables
let currentUser = null;
let currentDocument = null;
let currentCommentId = null;

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize header authentication first
  initHeaderAuth();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = "/login";
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
          source_plu_date
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

    // Load download count
    await loadDownloadCount();

    // Hide loading, show content
    document.getElementById("loading-state").style.display = "none";
    document.getElementById("document-content").style.display = "block";
  } catch (error) {
    console.error("Error loading document:", error);
    showError("Impossible de charger le document");
  }
}

// Update document information in UI
function updateDocumentInfo(documentData) {
  // Breadcrumb
  document.getElementById("city-name").textContent =
    documentData.zoning.city.name;
  document.getElementById("zoning-name").textContent = documentData.zoning.name;
  document.getElementById("zone-name").textContent = documentData.zone.name;

  // Title
  document.getElementById("doc-city").textContent =
    documentData.zoning.city.name;
  document.getElementById("doc-zone").textContent = documentData.zone.name;
  document.getElementById("doc-zoning").textContent = documentData.zoning.name;
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

    // Calculate average
    if (ratings && ratings.length > 0) {
      const average =
        ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
      document.getElementById("average-rating").textContent =
        average.toFixed(1);
      document.getElementById("rating-count").textContent = ratings.length;

      // Check if current user has rated
      const userRating = ratings.find((r) => r.user_id === currentUser.id);
      if (userRating) {
        highlightUserRating(userRating.rating);
      }
    } else {
      document.getElementById("average-rating").textContent = "-";
      document.getElementById("rating-count").textContent = "0";
    }
  } catch (error) {
    console.error("Error loading ratings:", error);
  }
}

// Highlight user's rating
function highlightUserRating(rating) {
  const stars = document.querySelectorAll("#user-rating .star");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("selected");
    }
  });
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
      document.getElementById("comment-count").textContent = "0";
      renderComments([]);
      return;
    }

    // Get unique user IDs
    const userIds = [...new Set(comments.map((c) => c.user_id))];

    // Fetch profiles for those users
    // The key here is that profiles.id should match comments.user_id
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .in("id", userIds);

    if (profilesError) {
      console.warn("Could not fetch profiles:", profilesError);
      // Continue without profiles - show comments anyway
      const commentsWithoutProfiles = comments.map((comment) => ({
        ...comment,
        profiles: null,
      }));
      document.getElementById("comment-count").textContent = comments.length;
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

    // Update comment count
    document.getElementById("comment-count").textContent = comments.length;

    // Render comments
    renderComments(commentsWithProfiles);
  } catch (error) {
    console.error("Error loading comments:", error);
    // Show empty state on error
    document.getElementById("comment-count").textContent = "0";
    renderComments([]);
  }
}

// Render comments in UI
function renderComments(comments) {
  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  if (comments.length === 0) {
    commentsList.innerHTML =
      '<p class="no-comments">Aucun commentaire pour le moment. Soyez le premier à commenter!</p>';
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
    comment.profiles?.avatar_url || "/assets/default-avatar.png";
  const date = new Date(comment.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  div.innerHTML = `
        <div class="comment-header">
            <div class="comment-author">
                <img src="${avatarUrl}" alt="${userName}" class="comment-avatar">
                <div>
                    <div class="comment-name">${userName}</div>
                    <div class="comment-date">${date}${
    comment.updated_at !== comment.created_at ? " (modifié)" : ""
  }</div>
                </div>
            </div>
            ${
              isOwner
                ? `
                <div class="comment-actions">
                    <button class="comment-action edit-comment" data-id="${comment.id}">Modifier</button>
                    <button class="comment-action delete-comment" data-id="${comment.id}">Supprimer</button>
                </div>
            `
                : ""
            }
        </div>
        <div class="comment-content">${escapeHtml(comment.content)}</div>
    `;

  return div;
}

// Load download count
async function loadDownloadCount() {
  try {
    const { data, error } = await supabase
      .from("downloads")
      .select("id")
      .eq("document_id", currentDocument.id);

    if (error) throw error;

    document.getElementById("download-count").textContent = data.length;
  } catch (error) {
    console.error("Error loading download count:", error);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", switchTab);
  });

  // Rating stars
  document.querySelectorAll("#user-rating .star").forEach((star) => {
    star.addEventListener("click", handleRating);
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
  document.getElementById("logout-btn").addEventListener("click", handleLogout);
}

// Switch tabs
function switchTab(e) {
  const targetTab = e.target.dataset.tab;

  // Update active states
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === targetTab);
  });

  // Show/hide content
  document.getElementById("summary-tab").style.display =
    targetTab === "summary" ? "block" : "none";
  document.getElementById("comments-tab").style.display =
    targetTab === "comments" ? "block" : "none";
}

// Handle rating
async function handleRating(e) {
  const rating = parseInt(e.target.dataset.rating);

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

    // Update UI
    document.querySelectorAll("#user-rating .star").forEach((star, index) => {
      star.classList.toggle("selected", index < rating);
    });

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

    // Update count
    const countEl = document.getElementById("download-count");
    countEl.textContent = parseInt(countEl.textContent) + 1;

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
  if (e.target.classList.contains("edit-comment")) {
    openEditModal(e.target.dataset.id);
  } else if (e.target.classList.contains("delete-comment")) {
    deleteComment(e.target.dataset.id);
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
    await supabase.from("comments").delete().eq("id", commentId);

    await loadComments();
  } catch (error) {
    console.error("Error deleting comment:", error);
    alert("Erreur lors de la suppression");
  }
}

// Handle logout
async function handleLogout() {
  await supabase.auth.signOut();
  window.location.href = "/login";
}

// Show error state
function showError(message) {
  document.getElementById("loading-state").style.display = "none";
  document.getElementById("error-message").textContent = message;
  document.getElementById("error-state").style.display = "block";
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
