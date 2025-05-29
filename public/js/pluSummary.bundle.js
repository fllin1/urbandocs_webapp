/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/plu-summary.js":
/*!*******************************!*\
  !*** ./src/js/plu-summary.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supabase-client.js */ "./src/js/supabase-client.js");
/* harmony import */ var _auth_header_auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/header-auth.js */ "./src/js/auth/header-auth.js");
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




// Global variables
let currentUser = null;
let currentDocument = null;
let currentCommentId = null;

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize header authentication first
  (0,_auth_header_auth_js__WEBPACK_IMPORTED_MODULE_1__.initHeaderAuth)();

  // Check authentication
  const {
    data: { user },
  } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.getUser();
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
    const { data: documentData, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
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
    const { data: ratings, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
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
    const { data: comments, error: commentsError } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
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
    const { data: profiles, error: profilesError } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
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
    const { data, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
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
    const { data: existing } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
      .from("ratings")
      .select("id")
      .eq("document_id", currentDocument.id)
      .eq("user_id", currentUser.id)
      .single();

    if (existing) {
      // Update existing rating
      await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
        .from("ratings")
        .update({ rating, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
    } else {
      // Insert new rating
      await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.from("ratings").insert({
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
    const { data: urlData, error: urlError } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.storage
      .from("pdfs")
      .createSignedUrl(cleanPath, 60, {
        download: true, // This forces the download behavior
      });

    if (urlError) {
      console.error("URL Error details:", urlError);
      throw urlError;
    }

    // Track download
    await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.from("downloads").insert({
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
    const { error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.from("comments").insert({
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
  const { data: comment } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
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
    await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
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
    await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.from("comments").delete().eq("id", commentId);

    await loadComments();
  } catch (error) {
    console.error("Error deleting comment:", error);
    alert("Erreur lors de la suppression");
  }
}

// Handle logout
async function handleLogout() {
  await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.signOut();
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "js/" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "urbandocs_webapp:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"pluSummary": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkurbandocs_webapp"] = self["webpackChunkurbandocs_webapp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_supabase_supabase-js_dist_module_index_js","src_js_auth_header-auth_js"], () => (__webpack_require__("./src/js/plu-summary.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFckZBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3BsdS1zdW1tYXJ5LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2pzL3BsdS1zdW1tYXJ5LmpzXG4vKipcbiAqIFBMVSBTdW1tYXJ5XG4gKiBAbW9kdWxlIHBsdS1zdW1tYXJ5XG4gKiBAZGVzY3JpcHRpb24gVGhpcyBtb2R1bGUgaGFuZGxlcyB0aGUgUExVIHN1bW1hcnkgcGFnZS5cbiAqIEB2ZXJzaW9uIDAuMC4zXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjMgKDIwMjUtMDEtMjcpOiBBZGRlZCBoZWFkZXIgYXV0aGVudGljYXRpb24gZm9yIGR5bmFtaWMgaGVhZGVyIHVwZGF0ZXNcbiAqIC0gMC4wLjIgKDIwMjUtMDUtMjcpOiBSZXdvcmsgVUkuXG4gKiAtIDAuMC4xICgyMDI1LTA1LTE2KTogSW5pdGlhbCB2ZXJzaW9uIHdpdGggYmFzaWMgUExVIHN1bW1hcnkgcGFnZS5cbiAqL1xuXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCIuL3N1cGFiYXNlLWNsaWVudC5qc1wiO1xuaW1wb3J0IHsgaW5pdEhlYWRlckF1dGggfSBmcm9tIFwiLi9hdXRoL2hlYWRlci1hdXRoLmpzXCI7XG5cbi8vIEdsb2JhbCB2YXJpYWJsZXNcbmxldCBjdXJyZW50VXNlciA9IG51bGw7XG5sZXQgY3VycmVudERvY3VtZW50ID0gbnVsbDtcbmxldCBjdXJyZW50Q29tbWVudElkID0gbnVsbDtcblxuLy8gSW5pdGlhbGl6ZSBwYWdlXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBhc3luYyAoKSA9PiB7XG4gIC8vIEluaXRpYWxpemUgaGVhZGVyIGF1dGhlbnRpY2F0aW9uIGZpcnN0XG4gIGluaXRIZWFkZXJBdXRoKCk7XG5cbiAgLy8gQ2hlY2sgYXV0aGVudGljYXRpb25cbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvbG9naW5cIjtcbiAgICByZXR1cm47XG4gIH1cbiAgY3VycmVudFVzZXIgPSB1c2VyO1xuXG4gIC8vIEdldCBkb2N1bWVudCBJRCBmcm9tIFVSTFxuICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICBjb25zdCBkb2N1bWVudElkID0gdXJsUGFyYW1zLmdldChcImlkXCIpO1xuXG4gIGlmICghZG9jdW1lbnRJZCkge1xuICAgIHNob3dFcnJvcihcIkF1Y3VuIGRvY3VtZW50IHNww6ljaWZpw6lcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gTG9hZCBkb2N1bWVudFxuICBhd2FpdCBsb2FkRG9jdW1lbnQoZG9jdW1lbnRJZCk7XG5cbiAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXJzXG4gIHNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn0pO1xuXG4vLyBMb2FkIGRvY3VtZW50IGZyb20gU3VwYWJhc2VcbmFzeW5jIGZ1bmN0aW9uIGxvYWREb2N1bWVudChkb2N1bWVudElkKSB7XG4gIHRyeSB7XG4gICAgLy8gRmV0Y2ggZG9jdW1lbnQgd2l0aCByZWxhdGVkIGRhdGFcbiAgICBjb25zdCB7IGRhdGE6IGRvY3VtZW50RGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImRvY3VtZW50c1wiKVxuICAgICAgLnNlbGVjdChcbiAgICAgICAgYFxuICAgICAgICAgIGlkLFxuICAgICAgICAgIHpvbmluZzp6b25pbmdzKG5hbWUsIGNpdHk6Y2l0aWVzKG5hbWUpKSxcbiAgICAgICAgICB6b25lOnpvbmVzKG5hbWUpLFxuICAgICAgICAgIGh0bWxfY29udGVudCxcbiAgICAgICAgICBwZGZfc3RvcmFnZV9wYXRoLFxuICAgICAgICAgIHNvdXJjZV9wbHVfZGF0ZVxuICAgICAgICBgXG4gICAgICApXG4gICAgICAuZXEoXCJpZFwiLCBkb2N1bWVudElkKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcblxuICAgIGN1cnJlbnREb2N1bWVudCA9IGRvY3VtZW50RGF0YTtcblxuICAgIC8vIFVwZGF0ZSBVSSB3aXRoIGRvY3VtZW50IGluZm9cbiAgICB1cGRhdGVEb2N1bWVudEluZm8oZG9jdW1lbnREYXRhKTtcblxuICAgIC8vIEluc2VydCBIVE1MIGNvbnRlbnRcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsdS1jb250ZW50XCIpLmlubmVySFRNTCA9XG4gICAgICBkb2N1bWVudERhdGEuaHRtbF9jb250ZW50O1xuXG4gICAgLy8gTG9hZCByYXRpbmdzXG4gICAgYXdhaXQgbG9hZFJhdGluZ3MoKTtcblxuICAgIC8vIExvYWQgY29tbWVudHNcbiAgICBhd2FpdCBsb2FkQ29tbWVudHMoKTtcblxuICAgIC8vIExvYWQgZG93bmxvYWQgY291bnRcbiAgICBhd2FpdCBsb2FkRG93bmxvYWRDb3VudCgpO1xuXG4gICAgLy8gSGlkZSBsb2FkaW5nLCBzaG93IGNvbnRlbnRcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmctc3RhdGVcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9jdW1lbnQtY29udGVudFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBsb2FkaW5nIGRvY3VtZW50OlwiLCBlcnJvcik7XG4gICAgc2hvd0Vycm9yKFwiSW1wb3NzaWJsZSBkZSBjaGFyZ2VyIGxlIGRvY3VtZW50XCIpO1xuICB9XG59XG5cbi8vIFVwZGF0ZSBkb2N1bWVudCBpbmZvcm1hdGlvbiBpbiBVSVxuZnVuY3Rpb24gdXBkYXRlRG9jdW1lbnRJbmZvKGRvY3VtZW50RGF0YSkge1xuICAvLyBCcmVhZGNydW1iXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eS1uYW1lXCIpLnRleHRDb250ZW50ID1cbiAgICBkb2N1bWVudERhdGEuem9uaW5nLmNpdHkubmFtZTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25pbmctbmFtZVwiKS50ZXh0Q29udGVudCA9IGRvY3VtZW50RGF0YS56b25pbmcubmFtZTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lLW5hbWVcIikudGV4dENvbnRlbnQgPSBkb2N1bWVudERhdGEuem9uZS5uYW1lO1xuXG4gIC8vIFRpdGxlXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9jLWNpdHlcIikudGV4dENvbnRlbnQgPVxuICAgIGRvY3VtZW50RGF0YS56b25pbmcuY2l0eS5uYW1lO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvYy16b25lXCIpLnRleHRDb250ZW50ID0gZG9jdW1lbnREYXRhLnpvbmUubmFtZTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb2Mtem9uaW5nXCIpLnRleHRDb250ZW50ID0gZG9jdW1lbnREYXRhLnpvbmluZy5uYW1lO1xufVxuXG4vLyBMb2FkIGFuZCBkaXNwbGF5IHJhdGluZ3NcbmFzeW5jIGZ1bmN0aW9uIGxvYWRSYXRpbmdzKCkge1xuICB0cnkge1xuICAgIC8vIEdldCBhbGwgcmF0aW5ncyBmb3IgdGhpcyBkb2N1bWVudFxuICAgIGNvbnN0IHsgZGF0YTogcmF0aW5ncywgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInJhdGluZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJyYXRpbmcsIHVzZXJfaWRcIilcbiAgICAgIC5lcShcImRvY3VtZW50X2lkXCIsIGN1cnJlbnREb2N1bWVudC5pZCk7XG5cbiAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuXG4gICAgLy8gQ2FsY3VsYXRlIGF2ZXJhZ2VcbiAgICBpZiAocmF0aW5ncyAmJiByYXRpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGF2ZXJhZ2UgPVxuICAgICAgICByYXRpbmdzLnJlZHVjZSgoc3VtLCByKSA9PiBzdW0gKyByLnJhdGluZywgMCkgLyByYXRpbmdzLmxlbmd0aDtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXZlcmFnZS1yYXRpbmdcIikudGV4dENvbnRlbnQgPVxuICAgICAgICBhdmVyYWdlLnRvRml4ZWQoMSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhdGluZy1jb3VudFwiKS50ZXh0Q29udGVudCA9IHJhdGluZ3MubGVuZ3RoO1xuXG4gICAgICAvLyBDaGVjayBpZiBjdXJyZW50IHVzZXIgaGFzIHJhdGVkXG4gICAgICBjb25zdCB1c2VyUmF0aW5nID0gcmF0aW5ncy5maW5kKChyKSA9PiByLnVzZXJfaWQgPT09IGN1cnJlbnRVc2VyLmlkKTtcbiAgICAgIGlmICh1c2VyUmF0aW5nKSB7XG4gICAgICAgIGhpZ2hsaWdodFVzZXJSYXRpbmcodXNlclJhdGluZy5yYXRpbmcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF2ZXJhZ2UtcmF0aW5nXCIpLnRleHRDb250ZW50ID0gXCItXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhdGluZy1jb3VudFwiKS50ZXh0Q29udGVudCA9IFwiMFwiO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9hZGluZyByYXRpbmdzOlwiLCBlcnJvcik7XG4gIH1cbn1cblxuLy8gSGlnaGxpZ2h0IHVzZXIncyByYXRpbmdcbmZ1bmN0aW9uIGhpZ2hsaWdodFVzZXJSYXRpbmcocmF0aW5nKSB7XG4gIGNvbnN0IHN0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN1c2VyLXJhdGluZyAuc3RhclwiKTtcbiAgc3RhcnMuZm9yRWFjaCgoc3RhciwgaW5kZXgpID0+IHtcbiAgICBpZiAoaW5kZXggPCByYXRpbmcpIHtcbiAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIExvYWQgY29tbWVudHNcbmFzeW5jIGZ1bmN0aW9uIGxvYWRDb21tZW50cygpIHtcbiAgdHJ5IHtcbiAgICAvLyBGaXJzdCwgZ2V0IHRoZSBjb21tZW50c1xuICAgIGNvbnN0IHsgZGF0YTogY29tbWVudHMsIGVycm9yOiBjb21tZW50c0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJjb21tZW50c1wiKVxuICAgICAgLnNlbGVjdChcIipcIilcbiAgICAgIC5lcShcImRvY3VtZW50X2lkXCIsIGN1cnJlbnREb2N1bWVudC5pZClcbiAgICAgIC5vcmRlcihcImNyZWF0ZWRfYXRcIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pO1xuXG4gICAgaWYgKGNvbW1lbnRzRXJyb3IpIHRocm93IGNvbW1lbnRzRXJyb3I7XG5cbiAgICBpZiAoY29tbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnQtY291bnRcIikudGV4dENvbnRlbnQgPSBcIjBcIjtcbiAgICAgIHJlbmRlckNvbW1lbnRzKFtdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBHZXQgdW5pcXVlIHVzZXIgSURzXG4gICAgY29uc3QgdXNlcklkcyA9IFsuLi5uZXcgU2V0KGNvbW1lbnRzLm1hcCgoYykgPT4gYy51c2VyX2lkKSldO1xuXG4gICAgLy8gRmV0Y2ggcHJvZmlsZXMgZm9yIHRob3NlIHVzZXJzXG4gICAgLy8gVGhlIGtleSBoZXJlIGlzIHRoYXQgcHJvZmlsZXMuaWQgc2hvdWxkIG1hdGNoIGNvbW1lbnRzLnVzZXJfaWRcbiAgICBjb25zdCB7IGRhdGE6IHByb2ZpbGVzLCBlcnJvcjogcHJvZmlsZXNFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAgIC5zZWxlY3QoXCJpZCwgZnVsbF9uYW1lLCBhdmF0YXJfdXJsXCIpXG4gICAgICAuaW4oXCJpZFwiLCB1c2VySWRzKTtcblxuICAgIGlmIChwcm9maWxlc0Vycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJDb3VsZCBub3QgZmV0Y2ggcHJvZmlsZXM6XCIsIHByb2ZpbGVzRXJyb3IpO1xuICAgICAgLy8gQ29udGludWUgd2l0aG91dCBwcm9maWxlcyAtIHNob3cgY29tbWVudHMgYW55d2F5XG4gICAgICBjb25zdCBjb21tZW50c1dpdGhvdXRQcm9maWxlcyA9IGNvbW1lbnRzLm1hcCgoY29tbWVudCkgPT4gKHtcbiAgICAgICAgLi4uY29tbWVudCxcbiAgICAgICAgcHJvZmlsZXM6IG51bGwsXG4gICAgICB9KSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnQtY291bnRcIikudGV4dENvbnRlbnQgPSBjb21tZW50cy5sZW5ndGg7XG4gICAgICByZW5kZXJDb21tZW50cyhjb21tZW50c1dpdGhvdXRQcm9maWxlcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTWFwIHByb2ZpbGVzIHRvIGNvbW1lbnRzXG4gICAgY29uc3QgcHJvZmlsZXNNYXAgPSBwcm9maWxlcy5yZWR1Y2UoKGFjYywgcHJvZmlsZSkgPT4ge1xuICAgICAgYWNjW3Byb2ZpbGUuaWRdID0gcHJvZmlsZTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuXG4gICAgLy8gQXR0YWNoIHByb2ZpbGVzIHRvIGNvbW1lbnRzXG4gICAgY29uc3QgY29tbWVudHNXaXRoUHJvZmlsZXMgPSBjb21tZW50cy5tYXAoKGNvbW1lbnQpID0+ICh7XG4gICAgICAuLi5jb21tZW50LFxuICAgICAgcHJvZmlsZXM6IHByb2ZpbGVzTWFwW2NvbW1lbnQudXNlcl9pZF0gfHwgbnVsbCxcbiAgICB9KSk7XG5cbiAgICAvLyBVcGRhdGUgY29tbWVudCBjb3VudFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbWVudC1jb3VudFwiKS50ZXh0Q29udGVudCA9IGNvbW1lbnRzLmxlbmd0aDtcblxuICAgIC8vIFJlbmRlciBjb21tZW50c1xuICAgIHJlbmRlckNvbW1lbnRzKGNvbW1lbnRzV2l0aFByb2ZpbGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9hZGluZyBjb21tZW50czpcIiwgZXJyb3IpO1xuICAgIC8vIFNob3cgZW1wdHkgc3RhdGUgb24gZXJyb3JcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnQtY291bnRcIikudGV4dENvbnRlbnQgPSBcIjBcIjtcbiAgICByZW5kZXJDb21tZW50cyhbXSk7XG4gIH1cbn1cblxuLy8gUmVuZGVyIGNvbW1lbnRzIGluIFVJXG5mdW5jdGlvbiByZW5kZXJDb21tZW50cyhjb21tZW50cykge1xuICBjb25zdCBjb21tZW50c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnRzLWxpc3RcIik7XG4gIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIGlmIChjb21tZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID1cbiAgICAgICc8cCBjbGFzcz1cIm5vLWNvbW1lbnRzXCI+QXVjdW4gY29tbWVudGFpcmUgcG91ciBsZSBtb21lbnQuIFNveWV6IGxlIHByZW1pZXIgw6AgY29tbWVudGVyITwvcD4nO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbW1lbnRzLmZvckVhY2goKGNvbW1lbnQpID0+IHtcbiAgICBjb25zdCBjb21tZW50RWwgPSBjcmVhdGVDb21tZW50RWxlbWVudChjb21tZW50KTtcbiAgICBjb21tZW50c0xpc3QuYXBwZW5kQ2hpbGQoY29tbWVudEVsKTtcbiAgfSk7XG59XG5cbi8vIENyZWF0ZSBjb21tZW50IGVsZW1lbnRcbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnRFbGVtZW50KGNvbW1lbnQpIHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2LmNsYXNzTmFtZSA9IFwiY29tbWVudFwiO1xuICBkaXYuZGF0YXNldC5jb21tZW50SWQgPSBjb21tZW50LmlkO1xuXG4gIGNvbnN0IGlzT3duZXIgPSBjb21tZW50LnVzZXJfaWQgPT09IGN1cnJlbnRVc2VyLmlkO1xuICBjb25zdCB1c2VyTmFtZSA9IGNvbW1lbnQucHJvZmlsZXM/LmZ1bGxfbmFtZSB8fCBcIlV0aWxpc2F0ZXVyIGFub255bWVcIjtcbiAgY29uc3QgYXZhdGFyVXJsID1cbiAgICBjb21tZW50LnByb2ZpbGVzPy5hdmF0YXJfdXJsIHx8IFwiL2Fzc2V0cy9kZWZhdWx0LWF2YXRhci5wbmdcIjtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGNvbW1lbnQuY3JlYXRlZF9hdCkudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZnItRlJcIiwge1xuICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgbW9udGg6IFwibG9uZ1wiLFxuICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICB9KTtcblxuICBkaXYuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWF1dGhvclwiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHthdmF0YXJVcmx9XCIgYWx0PVwiJHt1c2VyTmFtZX1cIiBjbGFzcz1cImNvbW1lbnQtYXZhdGFyXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtbmFtZVwiPiR7dXNlck5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWRhdGVcIj4ke2RhdGV9JHtcbiAgICBjb21tZW50LnVwZGF0ZWRfYXQgIT09IGNvbW1lbnQuY3JlYXRlZF9hdCA/IFwiIChtb2RpZmnDqSlcIiA6IFwiXCJcbiAgfTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAke1xuICAgICAgICAgICAgICBpc093bmVyXG4gICAgICAgICAgICAgICAgPyBgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29tbWVudC1hY3Rpb24gZWRpdC1jb21tZW50XCIgZGF0YS1pZD1cIiR7Y29tbWVudC5pZH1cIj5Nb2RpZmllcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29tbWVudC1hY3Rpb24gZGVsZXRlLWNvbW1lbnRcIiBkYXRhLWlkPVwiJHtjb21tZW50LmlkfVwiPlN1cHByaW1lcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtY29udGVudFwiPiR7ZXNjYXBlSHRtbChjb21tZW50LmNvbnRlbnQpfTwvZGl2PlxuICAgIGA7XG5cbiAgcmV0dXJuIGRpdjtcbn1cblxuLy8gTG9hZCBkb3dubG9hZCBjb3VudFxuYXN5bmMgZnVuY3Rpb24gbG9hZERvd25sb2FkQ291bnQoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwiZG93bmxvYWRzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImRvY3VtZW50X2lkXCIsIGN1cnJlbnREb2N1bWVudC5pZCk7XG5cbiAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb3dubG9hZC1jb3VudFwiKS50ZXh0Q29udGVudCA9IGRhdGEubGVuZ3RoO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBsb2FkaW5nIGRvd25sb2FkIGNvdW50OlwiLCBlcnJvcik7XG4gIH1cbn1cblxuLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXJzXG5mdW5jdGlvbiBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xuICAvLyBUYWIgc3dpdGNoaW5nXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFiLWJ0blwiKS5mb3JFYWNoKChidG4pID0+IHtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN3aXRjaFRhYik7XG4gIH0pO1xuXG4gIC8vIFJhdGluZyBzdGFyc1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3VzZXItcmF0aW5nIC5zdGFyXCIpLmZvckVhY2goKHN0YXIpID0+IHtcbiAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVSYXRpbmcpO1xuICB9KTtcblxuICAvLyBEb3dubG9hZCBidXR0b25cbiAgZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJkb3dubG9hZC1idG5cIilcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZURvd25sb2FkKTtcblxuICAvLyBDb21tZW50IHN1Ym1pc3Npb25cbiAgZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXQtY29tbWVudFwiKVxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3VibWl0Q29tbWVudCk7XG5cbiAgLy8gQ29tbWVudCBhY3Rpb25zIChkZWxlZ2F0aW9uKVxuICBkb2N1bWVudFxuICAgIC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnRzLWxpc3RcIilcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNvbW1lbnRBY3Rpb24pO1xuXG4gIC8vIE1vZGFsIGV2ZW50c1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLWNsb3NlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZU1vZGFsKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWwtZWRpdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VNb2RhbCk7XG4gIGRvY3VtZW50XG4gICAgLmdldEVsZW1lbnRCeUlkKFwic2F2ZS1lZGl0XCIpXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzYXZlQ29tbWVudEVkaXQpO1xuXG4gIC8vIExvZ291dFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ291dC1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUxvZ291dCk7XG59XG5cbi8vIFN3aXRjaCB0YWJzXG5mdW5jdGlvbiBzd2l0Y2hUYWIoZSkge1xuICBjb25zdCB0YXJnZXRUYWIgPSBlLnRhcmdldC5kYXRhc2V0LnRhYjtcblxuICAvLyBVcGRhdGUgYWN0aXZlIHN0YXRlc1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYi1idG5cIikuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIiwgYnRuLmRhdGFzZXQudGFiID09PSB0YXJnZXRUYWIpO1xuICB9KTtcblxuICAvLyBTaG93L2hpZGUgY29udGVudFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1bW1hcnktdGFiXCIpLnN0eWxlLmRpc3BsYXkgPVxuICAgIHRhcmdldFRhYiA9PT0gXCJzdW1tYXJ5XCIgPyBcImJsb2NrXCIgOiBcIm5vbmVcIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tZW50cy10YWJcIikuc3R5bGUuZGlzcGxheSA9XG4gICAgdGFyZ2V0VGFiID09PSBcImNvbW1lbnRzXCIgPyBcImJsb2NrXCIgOiBcIm5vbmVcIjtcbn1cblxuLy8gSGFuZGxlIHJhdGluZ1xuYXN5bmMgZnVuY3Rpb24gaGFuZGxlUmF0aW5nKGUpIHtcbiAgY29uc3QgcmF0aW5nID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yYXRpbmcpO1xuXG4gIHRyeSB7XG4gICAgLy8gQ2hlY2sgaWYgdXNlciBhbHJlYWR5IHJhdGVkXG4gICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwicmF0aW5nc1wiKVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuZXEoXCJkb2N1bWVudF9pZFwiLCBjdXJyZW50RG9jdW1lbnQuaWQpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIGN1cnJlbnRVc2VyLmlkKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAvLyBVcGRhdGUgZXhpc3RpbmcgcmF0aW5nXG4gICAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInJhdGluZ3NcIilcbiAgICAgICAgLnVwZGF0ZSh7IHJhdGluZywgdXBkYXRlZF9hdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpIH0pXG4gICAgICAgIC5lcShcImlkXCIsIGV4aXN0aW5nLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSW5zZXJ0IG5ldyByYXRpbmdcbiAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJyYXRpbmdzXCIpLmluc2VydCh7XG4gICAgICAgIGRvY3VtZW50X2lkOiBjdXJyZW50RG9jdW1lbnQuaWQsXG4gICAgICAgIHVzZXJfaWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICByYXRpbmcsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgVUlcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3VzZXItcmF0aW5nIC5zdGFyXCIpLmZvckVhY2goKHN0YXIsIGluZGV4KSA9PiB7XG4gICAgICBzdGFyLmNsYXNzTGlzdC50b2dnbGUoXCJzZWxlY3RlZFwiLCBpbmRleCA8IHJhdGluZyk7XG4gICAgfSk7XG5cbiAgICAvLyBSZWxvYWQgcmF0aW5ncyB0byB1cGRhdGUgYXZlcmFnZVxuICAgIGF3YWl0IGxvYWRSYXRpbmdzKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJhdGluZyBkb2N1bWVudDpcIiwgZXJyb3IpO1xuICAgIGFsZXJ0KFwiRXJyZXVyIGxvcnMgZGUgbCdlbnJlZ2lzdHJlbWVudCBkZSB2b3RyZSBub3RlXCIpO1xuICB9XG59XG5cbi8vIEhhbmRsZSBkb3dubG9hZFxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlRG93bmxvYWQoKSB7XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coXCJQREYgc3RvcmFnZSBwYXRoOlwiLCBjdXJyZW50RG9jdW1lbnQucGRmX3N0b3JhZ2VfcGF0aCk7XG5cbiAgICAvLyBSZW1vdmUgYW55IGxlYWRpbmcgc2xhc2hlcyBpZiBwcmVzZW50XG4gICAgY29uc3QgY2xlYW5QYXRoID0gY3VycmVudERvY3VtZW50LnBkZl9zdG9yYWdlX3BhdGgucmVwbGFjZSgvXlxcLy8sIFwiXCIpO1xuXG4gICAgLy8gR2V0IGRvd25sb2FkIFVSTCBmcm9tIFN1cGFiYXNlIFN0b3JhZ2Ugd2l0aCBkb3dubG9hZCBwYXJhbWV0ZXJcbiAgICBjb25zdCB7IGRhdGE6IHVybERhdGEsIGVycm9yOiB1cmxFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2Uuc3RvcmFnZVxuICAgICAgLmZyb20oXCJwZGZzXCIpXG4gICAgICAuY3JlYXRlU2lnbmVkVXJsKGNsZWFuUGF0aCwgNjAsIHtcbiAgICAgICAgZG93bmxvYWQ6IHRydWUsIC8vIFRoaXMgZm9yY2VzIHRoZSBkb3dubG9hZCBiZWhhdmlvclxuICAgICAgfSk7XG5cbiAgICBpZiAodXJsRXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVUkwgRXJyb3IgZGV0YWlsczpcIiwgdXJsRXJyb3IpO1xuICAgICAgdGhyb3cgdXJsRXJyb3I7XG4gICAgfVxuXG4gICAgLy8gVHJhY2sgZG93bmxvYWRcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwiZG93bmxvYWRzXCIpLmluc2VydCh7XG4gICAgICBkb2N1bWVudF9pZDogY3VycmVudERvY3VtZW50LmlkLFxuICAgICAgdXNlcl9pZDogY3VycmVudFVzZXIuaWQsXG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgY291bnRcbiAgICBjb25zdCBjb3VudEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb3dubG9hZC1jb3VudFwiKTtcbiAgICBjb3VudEVsLnRleHRDb250ZW50ID0gcGFyc2VJbnQoY291bnRFbC50ZXh0Q29udGVudCkgKyAxO1xuXG4gICAgLy8gVHJpZ2dlciBkb3dubG9hZFxuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBhLmhyZWYgPSB1cmxEYXRhLnNpZ25lZFVybDtcbiAgICBhLmRvd25sb2FkID0gYFBMVV8ke2N1cnJlbnREb2N1bWVudC56b25pbmcuY2l0eS5uYW1lfV8ke2N1cnJlbnREb2N1bWVudC56b25lLm5hbWV9LnBkZmA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTsgLy8gQWRkIHRvIERPTVxuICAgIGEuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpOyAvLyBSZW1vdmUgZnJvbSBET01cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZG93bmxvYWRpbmcgZG9jdW1lbnQ6XCIsIGVycm9yKTtcblxuICAgIGlmIChlcnJvci5tZXNzYWdlICYmIGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJPYmplY3Qgbm90IGZvdW5kXCIpKSB7XG4gICAgICBhbGVydChcbiAgICAgICAgXCJMZSBmaWNoaWVyIFBERiBuJ2EgcGFzIMOpdMOpIHRyb3V2w6kuIFZldWlsbGV6IGNvbnRhY3RlciBsJ2FkbWluaXN0cmF0ZXVyLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcIkVycmV1ciBsb3JzIGR1IHTDqWzDqWNoYXJnZW1lbnRcIik7XG4gICAgfVxuICB9XG59XG5cbi8vIFN1Ym1pdCBjb21tZW50XG5hc3luYyBmdW5jdGlvbiBzdWJtaXRDb21tZW50KCkge1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tZW50LWlucHV0XCIpLnZhbHVlLnRyaW0oKTtcblxuICBpZiAoIWNvbnRlbnQpIHtcbiAgICBhbGVydChcIlZldWlsbGV6IGVudHJlciB1biBjb21tZW50YWlyZVwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJjb21tZW50c1wiKS5pbnNlcnQoe1xuICAgICAgZG9jdW1lbnRfaWQ6IGN1cnJlbnREb2N1bWVudC5pZCxcbiAgICAgIHVzZXJfaWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgY29udGVudCxcbiAgICB9KTtcblxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgICAvLyBDbGVhciBpbnB1dFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbWVudC1pbnB1dFwiKS52YWx1ZSA9IFwiXCI7XG5cbiAgICAvLyBSZWxvYWQgY29tbWVudHNcbiAgICBhd2FpdCBsb2FkQ29tbWVudHMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc3VibWl0dGluZyBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgYWxlcnQoXCJFcnJldXIgbG9ycyBkZSBsYSBwdWJsaWNhdGlvbiBkdSBjb21tZW50YWlyZVwiKTtcbiAgfVxufVxuXG4vLyBIYW5kbGUgY29tbWVudCBhY3Rpb25zXG5mdW5jdGlvbiBoYW5kbGVDb21tZW50QWN0aW9uKGUpIHtcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtY29tbWVudFwiKSkge1xuICAgIG9wZW5FZGl0TW9kYWwoZS50YXJnZXQuZGF0YXNldC5pZCk7XG4gIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlLWNvbW1lbnRcIikpIHtcbiAgICBkZWxldGVDb21tZW50KGUudGFyZ2V0LmRhdGFzZXQuaWQpO1xuICB9XG59XG5cbi8vIE9wZW4gZWRpdCBtb2RhbFxuYXN5bmMgZnVuY3Rpb24gb3BlbkVkaXRNb2RhbChjb21tZW50SWQpIHtcbiAgY3VycmVudENvbW1lbnRJZCA9IGNvbW1lbnRJZDtcblxuICAvLyBHZXQgY29tbWVudCBjb250ZW50XG4gIGNvbnN0IHsgZGF0YTogY29tbWVudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImNvbW1lbnRzXCIpXG4gICAgLnNlbGVjdChcImNvbnRlbnRcIilcbiAgICAuZXEoXCJpZFwiLCBjb21tZW50SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1jb21tZW50LWlucHV0XCIpLnZhbHVlID0gY29tbWVudC5jb250ZW50O1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtbW9kYWxcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xufVxuXG4vLyBDbG9zZSBtb2RhbFxuZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LW1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgY3VycmVudENvbW1lbnRJZCA9IG51bGw7XG59XG5cbi8vIFNhdmUgY29tbWVudCBlZGl0XG5hc3luYyBmdW5jdGlvbiBzYXZlQ29tbWVudEVkaXQoKSB7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtY29tbWVudC1pbnB1dFwiKS52YWx1ZS50cmltKCk7XG5cbiAgaWYgKCFjb250ZW50KSB7XG4gICAgYWxlcnQoXCJMZSBjb21tZW50YWlyZSBuZSBwZXV0IHBhcyDDqnRyZSB2aWRlXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyeSB7XG4gICAgYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwiY29tbWVudHNcIilcbiAgICAgIC51cGRhdGUoe1xuICAgICAgICBjb250ZW50LFxuICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB9KVxuICAgICAgLmVxKFwiaWRcIiwgY3VycmVudENvbW1lbnRJZCk7XG5cbiAgICBjbG9zZU1vZGFsKCk7XG4gICAgYXdhaXQgbG9hZENvbW1lbnRzKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIGNvbW1lbnQ6XCIsIGVycm9yKTtcbiAgICBhbGVydChcIkVycmV1ciBsb3JzIGRlIGxhIG1vZGlmaWNhdGlvblwiKTtcbiAgfVxufVxuXG4vLyBEZWxldGUgY29tbWVudFxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ29tbWVudChjb21tZW50SWQpIHtcbiAgaWYgKCFjb25maXJtKFwiw4p0ZXMtdm91cyBzw7tyIGRlIHZvdWxvaXIgc3VwcHJpbWVyIGNlIGNvbW1lbnRhaXJlP1wiKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyeSB7XG4gICAgYXdhaXQgc3VwYWJhc2UuZnJvbShcImNvbW1lbnRzXCIpLmRlbGV0ZSgpLmVxKFwiaWRcIiwgY29tbWVudElkKTtcblxuICAgIGF3YWl0IGxvYWRDb21tZW50cygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgYWxlcnQoXCJFcnJldXIgbG9ycyBkZSBsYSBzdXBwcmVzc2lvblwiKTtcbiAgfVxufVxuXG4vLyBIYW5kbGUgbG9nb3V0XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVMb2dvdXQoKSB7XG4gIGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbk91dCgpO1xuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2xvZ2luXCI7XG59XG5cbi8vIFNob3cgZXJyb3Igc3RhdGVcbmZ1bmN0aW9uIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGluZy1zdGF0ZVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3ItbWVzc2FnZVwiKS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3Itc3RhdGVcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn1cblxuLy8gVXRpbGl0eSBmdW5jdGlvbiB0byBlc2NhcGUgSFRNTFxuZnVuY3Rpb24gZXNjYXBlSHRtbCh0ZXh0KSB7XG4gIGNvbnN0IG1hcCA9IHtcbiAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICBcIj5cIjogXCImZ3Q7XCIsXG4gICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICBcIidcIjogXCImIzAzOTtcIixcbiAgfTtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvWyY8PlwiJ10vZywgKG0pID0+IG1hcFttXSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJqcy9cIiArIGNodW5rSWQgKyBcIi5idW5kbGUuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwidXJiYW5kb2NzX3dlYmFwcDpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvXmJsb2I6LywgXCJcIikucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsICsgXCIuLi9cIjsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJwbHVTdW1tYXJ5XCI6IDBcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uZi5qID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSA/IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA6IHVuZGVmaW5lZDtcblx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cblx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG5cdFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiAoaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF0pKTtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG5cdFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuXHRcdFx0XHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCk7XG5cdFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdFx0XHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpKSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhWzFdKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkLCBcImNodW5rLVwiICsgY2h1bmtJZCwgY2h1bmtJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG59O1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt1cmJhbmRvY3Nfd2ViYXBwXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3VyYmFuZG9jc193ZWJhcHBcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3N1cGFiYXNlX3N1cGFiYXNlLWpzX2Rpc3RfbW9kdWxlX2luZGV4X2pzXCIsXCJzcmNfanNfYXV0aF9oZWFkZXItYXV0aF9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9wbHUtc3VtbWFyeS5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9