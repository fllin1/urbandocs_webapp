// src/js/plu-summary.js
/**
 * PLU Summary
 * @module plu-summary
 * @description This module handles the PLU summary page.
 * @version 0.0.1
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.1 (2025-05-16): Initial version with basic PLU summary page.
 */

import { supabase } from "./supabase-client.js";
import { showStatus, showError } from "./auth/auth.js";
import { marked } from "marked";

// Get document ID from URL
const urlParams = new URLSearchParams(window.location.search);
const documentId = urlParams.get("id");

// DOM Elements
const documentTitle = document.getElementById("documentTitle");
const pluContent = document.getElementById("pluContent");
const tocContent = document.getElementById("tocContent");
const downloadBtn = document.getElementById("downloadBtn");
const commentForm = document.getElementById("commentForm");
const commentsList = document.getElementById("commentsList");
const averageRating = document.getElementById("averageRating");
const ratingStars = document.getElementById("ratingStars");

// Initialize marked options
marked.setOptions({
  headerIds: true,
  gfm: true,
});

function formatText(text) {
  return text
    .replace(/_/g, " ") // Remplace les underscores par des espaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Load document content
async function loadDocument() {
  try {
    const { data: document, error } = await supabase
      .from("documents")
      .select(
        `
        id,
        zoning:zonings(name, city:cities(name)),
        zone:zones(name),
        html_content,
        pdf_storage_path
      `
      )
      .eq("id", documentId)
      .single();

    if (error) throw error;

    // Update title
    documentTitle.textContent = `PLU de ${formatText(
      document.zoning.city.name
    )} | ${formatText(document.zoning.name)} | ${formatText(
      document.zone.name
    )}`;

    // Render markdown content
    const htmlContent = marked(document.plu - summary_markdown_content);
    pluContent.innerHTML = htmlContent;

    // Generate table of contents
    generateTableOfContents();

    // Enable download button if PDF path exists
    if (document.pdf_storage_path) {
      downloadBtn.disabled = false;
      downloadBtn.onclick = () =>
        downloadPDF(
          document.pdf_storage_path,
          document.zoning.city.name,
          document.zoning.name,
          document.zone.name
        );
    }

    // Log view
    await logView(documentId);

    // Load ratings and comments
    await loadRatings();
    await loadComments();
  } catch (error) {
    console.error("Error loading document:", error);
    showError("Erreur lors du chargement du document");
  }
}

// Generate table of contents
function generateTableOfContents() {
  const headings = pluContent.querySelectorAll("h2, h3");
  const toc = document.createElement("ul");
  toc.className = "toc-list";

  headings.forEach((heading) => {
    const li = document.createElement("li");
    li.className = "toc-item";

    const a = document.createElement("a");
    a.href = `#${heading.id}`;
    a.className = `toc-link toc-${heading.tagName.toLowerCase()}`;
    a.textContent = heading.textContent;

    li.appendChild(a);
    toc.appendChild(li);
  });

  tocContent.appendChild(toc);
}

// Download PDF
async function downloadPDF(pdfPath, city, zoning, zone) {
  try {
    const customFilename = `MEWE_plu_${city}_${zoning}_${zone}.pdf`;
    const { data, error } = await supabase.storage
      .from("urbandocs")
      .createSignedUrl(pdfPath, 20, {
        download: customFilename,
      }); // URL valid for 20 seconds

    if (error) throw error;

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = data.signedUrl;
    link.download = customFilename; // Suggest a filename for the download

    // Append to the document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    showError("Erreur lors du téléchargement du PDF");
  }
}

// Log view
async function logView(documentId) {
  try {
    const { error } = await supabase
      .from("view_history")
      .insert([{ document_id: documentId }]);

    if (error) throw error;
  } catch (error) {
    console.error("Error logging view:", error);
  }
}

// Load ratings
async function loadRatings() {
  try {
    const { data: ratings, error } = await supabase
      .from("ratings")
      .select("rating")
      .eq("document_id", documentId);

    if (error) throw error;

    if (ratings.length > 0) {
      const average =
        ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      averageRating.textContent = `Note moyenne: ${average.toFixed(1)}/5`;
    }

    // Initialize rating stars
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.textContent = "★";
      star.onclick = () => submitRating(i);
      ratingStars.appendChild(star);
    }
  } catch (error) {
    console.error("Error loading ratings:", error);
  }
}

// Submit rating
async function submitRating(rating) {
  try {
    const { error } = await supabase
      .from("ratings")
      .upsert([{ document_id: documentId, rating }]);

    if (error) throw error;

    showStatus("Note enregistrée", "success");
    await loadRatings();
  } catch (error) {
    console.error("Error submitting rating:", error);
    showError("Erreur lors de l'enregistrement de la note");
  }
}

// Load comments
async function loadComments() {
  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .select(
        `
        content,
        created_at,
        user:users(email)
      `
      )
      .eq("document_id", documentId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    commentsList.innerHTML = comments
      .map(
        (comment) => `
      <div class="comment">
        <div class="comment-header">
          <span>${comment.user.email}</span>
          <span>${new Date(comment.created_at).toLocaleDateString()}</span>
        </div>
        <div class="comment-content">${comment.content}</div>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading comments:", error);
    showError("Erreur lors du chargement des commentaires");
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  if (!documentId) {
    showError("ID du document manquant");
    return;
  }

  loadDocument();

  // Handle comment form submission
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const content = document.getElementById("commentInput").value.trim();
    if (!content) return;

    try {
      const { error } = await supabase
        .from("comments")
        .insert([{ document_id: documentId, content }]);

      if (error) throw error;

      document.getElementById("commentInput").value = "";
      showStatus("Commentaire ajouté", "success");
      await loadComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
      showError("Erreur lors de l'ajout du commentaire");
    }
  });
});
