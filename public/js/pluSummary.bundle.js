/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/plu-summary.js":
/*!*******************************!*\
  !*** ./src/js/plu-summary.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supabase-client.js */ "./src/js/supabase-client.js");
// src/js/plu-summary.js
/**
 * PLU Summary
 * @module plu-summary
 * @description This module handles the PLU summary page.
 * @version 0.0.2
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.2 (2025-05-27): Rework UI.
 * - 0.0.1 (2025-05-16): Initial version with basic PLU summary page.
 */



// Global variables
let currentUser = null;
let currentDocument = null;
let currentCommentId = null;

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
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
    const { data: document, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
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

    currentDocument = document;

    // Update UI with document info
    updateDocumentInfo(document);

    // Insert HTML content
    document.getElementById("plu-content").innerHTML = document.html_content;

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
function updateDocumentInfo(document) {
  // Breadcrumb
  document.getElementById("city-name").textContent = document.zoning.city.name;
  document.getElementById("zoning-name").textContent = document.zoning.name;
  document.getElementById("zone-name").textContent = document.zone.name;

  // Title
  document.getElementById("doc-city").textContent = document.zoning.city.name;
  document.getElementById("doc-zone").textContent = document.zone.name;
  document.getElementById("doc-zoning").textContent = document.zoning.name;
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
    const { data: comments, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase
      .from("comments")
      .select(
        `
                id,
                content,
                created_at,
                updated_at,
                user_id,
                profiles:user_id(full_name, avatar_url)
            `
      )
      .eq("document_id", currentDocument.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Update comment count
    document.getElementById("comment-count").textContent = comments.length;

    // Render comments
    renderComments(comments);
  } catch (error) {
    console.error("Error loading comments:", error);
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
    // Get download URL from Supabase Storage
    const { data: urlData, error: urlError } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.storage
      .from("documents")
      .createSignedUrl(currentDocument.pdf_storage_path, 60); // 60 seconds expiry

    if (urlError) throw urlError;

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
    a.click();
  } catch (error) {
    console.error("Error downloading document:", error);
    alert("Erreur lors du téléchargement");
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


/***/ }),

/***/ "./src/js/supabase-client.js":
/*!***********************************!*\
  !*** ./src/js/supabase-client.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supabase: () => (/* binding */ supabase)
/* harmony export */ });
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ "./node_modules/@supabase/supabase-js/dist/module/index.js");
// src/js/supabase-client.js
/**
 * Supabase Client
 * @module supabase-client
 * @description This module handles the Supabase client initialization and configuration.
 * @version 0.0.2
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.2 (2025-05-27): Added environement variables error handling for missing.
 * - 0.0.1 (2025-05-09): Initial version with basic Supabase client initialization.
 */



const supabaseUrl = "https://ofeyssipibktmbfebibo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZXlzc2lwaWJrdG1iZmViaWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjUwOTQsImV4cCI6MjA1OTUwMTA5NH0.w71CAKfolktzRl-TmLVhHYaEbhCfVk4A7YraEUCglrU";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const client = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);

const supabase = client;


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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_supabase_supabase-js_dist_module_index_js"], () => (__webpack_require__("./src/js/plu-summary.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRXJGQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9wbHUtc3VtbWFyeS5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3N1cGFiYXNlLWNsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9qcy9wbHUtc3VtbWFyeS5qc1xuLyoqXG4gKiBQTFUgU3VtbWFyeVxuICogQG1vZHVsZSBwbHUtc3VtbWFyeVxuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIFBMVSBzdW1tYXJ5IHBhZ2UuXG4gKiBAdmVyc2lvbiAwLjAuMlxuICogQGF1dGhvciBHcmV5UGFuZGFcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4yICgyMDI1LTA1LTI3KTogUmV3b3JrIFVJLlxuICogLSAwLjAuMSAoMjAyNS0wNS0xNik6IEluaXRpYWwgdmVyc2lvbiB3aXRoIGJhc2ljIFBMVSBzdW1tYXJ5IHBhZ2UuXG4gKi9cblxuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiLi9zdXBhYmFzZS1jbGllbnQuanNcIjtcblxuLy8gR2xvYmFsIHZhcmlhYmxlc1xubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcbmxldCBjdXJyZW50RG9jdW1lbnQgPSBudWxsO1xubGV0IGN1cnJlbnRDb21tZW50SWQgPSBudWxsO1xuXG4vLyBJbml0aWFsaXplIHBhZ2VcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGFzeW5jICgpID0+IHtcbiAgLy8gQ2hlY2sgYXV0aGVudGljYXRpb25cbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvbG9naW5cIjtcbiAgICByZXR1cm47XG4gIH1cbiAgY3VycmVudFVzZXIgPSB1c2VyO1xuXG4gIC8vIEdldCBkb2N1bWVudCBJRCBmcm9tIFVSTFxuICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICBjb25zdCBkb2N1bWVudElkID0gdXJsUGFyYW1zLmdldChcImlkXCIpO1xuXG4gIGlmICghZG9jdW1lbnRJZCkge1xuICAgIHNob3dFcnJvcihcIkF1Y3VuIGRvY3VtZW50IHNww6ljaWZpw6lcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gTG9hZCBkb2N1bWVudFxuICBhd2FpdCBsb2FkRG9jdW1lbnQoZG9jdW1lbnRJZCk7XG5cbiAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXJzXG4gIHNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn0pO1xuXG4vLyBMb2FkIGRvY3VtZW50IGZyb20gU3VwYWJhc2VcbmFzeW5jIGZ1bmN0aW9uIGxvYWREb2N1bWVudChkb2N1bWVudElkKSB7XG4gIHRyeSB7XG4gICAgLy8gRmV0Y2ggZG9jdW1lbnQgd2l0aCByZWxhdGVkIGRhdGFcbiAgICBjb25zdCB7IGRhdGE6IGRvY3VtZW50LCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwiZG9jdW1lbnRzXCIpXG4gICAgICAuc2VsZWN0KFxuICAgICAgICBgXG4gICAgICAgICAgaWQsXG4gICAgICAgICAgem9uaW5nOnpvbmluZ3MobmFtZSwgY2l0eTpjaXRpZXMobmFtZSkpLFxuICAgICAgICAgIHpvbmU6em9uZXMobmFtZSksXG4gICAgICAgICAgaHRtbF9jb250ZW50LFxuICAgICAgICAgIHBkZl9zdG9yYWdlX3BhdGgsXG4gICAgICAgICAgc291cmNlX3BsdV9kYXRlXG4gICAgICAgIGBcbiAgICAgIClcbiAgICAgIC5lcShcImlkXCIsIGRvY3VtZW50SWQpXG4gICAgICAuc2luZ2xlKCk7XG5cbiAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuXG4gICAgY3VycmVudERvY3VtZW50ID0gZG9jdW1lbnQ7XG5cbiAgICAvLyBVcGRhdGUgVUkgd2l0aCBkb2N1bWVudCBpbmZvXG4gICAgdXBkYXRlRG9jdW1lbnRJbmZvKGRvY3VtZW50KTtcblxuICAgIC8vIEluc2VydCBIVE1MIGNvbnRlbnRcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsdS1jb250ZW50XCIpLmlubmVySFRNTCA9IGRvY3VtZW50Lmh0bWxfY29udGVudDtcblxuICAgIC8vIExvYWQgcmF0aW5nc1xuICAgIGF3YWl0IGxvYWRSYXRpbmdzKCk7XG5cbiAgICAvLyBMb2FkIGNvbW1lbnRzXG4gICAgYXdhaXQgbG9hZENvbW1lbnRzKCk7XG5cbiAgICAvLyBMb2FkIGRvd25sb2FkIGNvdW50XG4gICAgYXdhaXQgbG9hZERvd25sb2FkQ291bnQoKTtcblxuICAgIC8vIEhpZGUgbG9hZGluZywgc2hvdyBjb250ZW50XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2FkaW5nLXN0YXRlXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvY3VtZW50LWNvbnRlbnRcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9hZGluZyBkb2N1bWVudDpcIiwgZXJyb3IpO1xuICAgIHNob3dFcnJvcihcIkltcG9zc2libGUgZGUgY2hhcmdlciBsZSBkb2N1bWVudFwiKTtcbiAgfVxufVxuXG4vLyBVcGRhdGUgZG9jdW1lbnQgaW5mb3JtYXRpb24gaW4gVUlcbmZ1bmN0aW9uIHVwZGF0ZURvY3VtZW50SW5mbyhkb2N1bWVudCkge1xuICAvLyBCcmVhZGNydW1iXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eS1uYW1lXCIpLnRleHRDb250ZW50ID0gZG9jdW1lbnQuem9uaW5nLmNpdHkubmFtZTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25pbmctbmFtZVwiKS50ZXh0Q29udGVudCA9IGRvY3VtZW50LnpvbmluZy5uYW1lO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmUtbmFtZVwiKS50ZXh0Q29udGVudCA9IGRvY3VtZW50LnpvbmUubmFtZTtcblxuICAvLyBUaXRsZVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvYy1jaXR5XCIpLnRleHRDb250ZW50ID0gZG9jdW1lbnQuem9uaW5nLmNpdHkubmFtZTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb2Mtem9uZVwiKS50ZXh0Q29udGVudCA9IGRvY3VtZW50LnpvbmUubmFtZTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb2Mtem9uaW5nXCIpLnRleHRDb250ZW50ID0gZG9jdW1lbnQuem9uaW5nLm5hbWU7XG59XG5cbi8vIExvYWQgYW5kIGRpc3BsYXkgcmF0aW5nc1xuYXN5bmMgZnVuY3Rpb24gbG9hZFJhdGluZ3MoKSB7XG4gIHRyeSB7XG4gICAgLy8gR2V0IGFsbCByYXRpbmdzIGZvciB0aGlzIGRvY3VtZW50XG4gICAgY29uc3QgeyBkYXRhOiByYXRpbmdzLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwicmF0aW5nc1wiKVxuICAgICAgLnNlbGVjdChcInJhdGluZywgdXNlcl9pZFwiKVxuICAgICAgLmVxKFwiZG9jdW1lbnRfaWRcIiwgY3VycmVudERvY3VtZW50LmlkKTtcblxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgICAvLyBDYWxjdWxhdGUgYXZlcmFnZVxuICAgIGlmIChyYXRpbmdzICYmIHJhdGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYXZlcmFnZSA9XG4gICAgICAgIHJhdGluZ3MucmVkdWNlKChzdW0sIHIpID0+IHN1bSArIHIucmF0aW5nLCAwKSAvIHJhdGluZ3MubGVuZ3RoO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhdmVyYWdlLXJhdGluZ1wiKS50ZXh0Q29udGVudCA9XG4gICAgICAgIGF2ZXJhZ2UudG9GaXhlZCgxKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmF0aW5nLWNvdW50XCIpLnRleHRDb250ZW50ID0gcmF0aW5ncy5sZW5ndGg7XG5cbiAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgdXNlciBoYXMgcmF0ZWRcbiAgICAgIGNvbnN0IHVzZXJSYXRpbmcgPSByYXRpbmdzLmZpbmQoKHIpID0+IHIudXNlcl9pZCA9PT0gY3VycmVudFVzZXIuaWQpO1xuICAgICAgaWYgKHVzZXJSYXRpbmcpIHtcbiAgICAgICAgaGlnaGxpZ2h0VXNlclJhdGluZyh1c2VyUmF0aW5nLnJhdGluZyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXZlcmFnZS1yYXRpbmdcIikudGV4dENvbnRlbnQgPSBcIi1cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmF0aW5nLWNvdW50XCIpLnRleHRDb250ZW50ID0gXCIwXCI7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBsb2FkaW5nIHJhdGluZ3M6XCIsIGVycm9yKTtcbiAgfVxufVxuXG4vLyBIaWdobGlnaHQgdXNlcidzIHJhdGluZ1xuZnVuY3Rpb24gaGlnaGxpZ2h0VXNlclJhdGluZyhyYXRpbmcpIHtcbiAgY29uc3Qgc3RhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3VzZXItcmF0aW5nIC5zdGFyXCIpO1xuICBzdGFycy5mb3JFYWNoKChzdGFyLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA8IHJhdGluZykge1xuICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gTG9hZCBjb21tZW50c1xuYXN5bmMgZnVuY3Rpb24gbG9hZENvbW1lbnRzKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZGF0YTogY29tbWVudHMsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJjb21tZW50c1wiKVxuICAgICAgLnNlbGVjdChcbiAgICAgICAgYFxuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgICAgICAgY3JlYXRlZF9hdCxcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0LFxuICAgICAgICAgICAgICAgIHVzZXJfaWQsXG4gICAgICAgICAgICAgICAgcHJvZmlsZXM6dXNlcl9pZChmdWxsX25hbWUsIGF2YXRhcl91cmwpXG4gICAgICAgICAgICBgXG4gICAgICApXG4gICAgICAuZXEoXCJkb2N1bWVudF9pZFwiLCBjdXJyZW50RG9jdW1lbnQuaWQpXG4gICAgICAub3JkZXIoXCJjcmVhdGVkX2F0XCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KTtcblxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgICAvLyBVcGRhdGUgY29tbWVudCBjb3VudFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbWVudC1jb3VudFwiKS50ZXh0Q29udGVudCA9IGNvbW1lbnRzLmxlbmd0aDtcblxuICAgIC8vIFJlbmRlciBjb21tZW50c1xuICAgIHJlbmRlckNvbW1lbnRzKGNvbW1lbnRzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9hZGluZyBjb21tZW50czpcIiwgZXJyb3IpO1xuICB9XG59XG5cbi8vIFJlbmRlciBjb21tZW50cyBpbiBVSVxuZnVuY3Rpb24gcmVuZGVyQ29tbWVudHMoY29tbWVudHMpIHtcbiAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tZW50cy1saXN0XCIpO1xuICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcblxuICBpZiAoY29tbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgY29tbWVudHNMaXN0LmlubmVySFRNTCA9XG4gICAgICAnPHAgY2xhc3M9XCJuby1jb21tZW50c1wiPkF1Y3VuIGNvbW1lbnRhaXJlIHBvdXIgbGUgbW9tZW50LiBTb3lleiBsZSBwcmVtaWVyIMOgIGNvbW1lbnRlciE8L3A+JztcbiAgICByZXR1cm47XG4gIH1cblxuICBjb21tZW50cy5mb3JFYWNoKChjb21tZW50KSA9PiB7XG4gICAgY29uc3QgY29tbWVudEVsID0gY3JlYXRlQ29tbWVudEVsZW1lbnQoY29tbWVudCk7XG4gICAgY29tbWVudHNMaXN0LmFwcGVuZENoaWxkKGNvbW1lbnRFbCk7XG4gIH0pO1xufVxuXG4vLyBDcmVhdGUgY29tbWVudCBlbGVtZW50XG5mdW5jdGlvbiBjcmVhdGVDb21tZW50RWxlbWVudChjb21tZW50KSB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpdi5jbGFzc05hbWUgPSBcImNvbW1lbnRcIjtcbiAgZGl2LmRhdGFzZXQuY29tbWVudElkID0gY29tbWVudC5pZDtcblxuICBjb25zdCBpc093bmVyID0gY29tbWVudC51c2VyX2lkID09PSBjdXJyZW50VXNlci5pZDtcbiAgY29uc3QgdXNlck5hbWUgPSBjb21tZW50LnByb2ZpbGVzPy5mdWxsX25hbWUgfHwgXCJVdGlsaXNhdGV1ciBhbm9ueW1lXCI7XG4gIGNvbnN0IGF2YXRhclVybCA9XG4gICAgY29tbWVudC5wcm9maWxlcz8uYXZhdGFyX3VybCB8fCBcIi9hc3NldHMvZGVmYXVsdC1hdmF0YXIucG5nXCI7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShjb21tZW50LmNyZWF0ZWRfYXQpLnRvTG9jYWxlRGF0ZVN0cmluZyhcImZyLUZSXCIsIHtcbiAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgIG1vbnRoOiBcImxvbmdcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgfSk7XG5cbiAgZGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1hdXRob3JcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7YXZhdGFyVXJsfVwiIGFsdD1cIiR7dXNlck5hbWV9XCIgY2xhc3M9XCJjb21tZW50LWF2YXRhclwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW5hbWVcIj4ke3VzZXJOYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1kYXRlXCI+JHtkYXRlfSR7XG4gICAgY29tbWVudC51cGRhdGVkX2F0ICE9PSBjb21tZW50LmNyZWF0ZWRfYXQgPyBcIiAobW9kaWZpw6kpXCIgOiBcIlwiXG4gIH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgaXNPd25lclxuICAgICAgICAgICAgICAgID8gYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbW1lbnQtYWN0aW9uIGVkaXQtY29tbWVudFwiIGRhdGEtaWQ9XCIke2NvbW1lbnQuaWR9XCI+TW9kaWZpZXI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbW1lbnQtYWN0aW9uIGRlbGV0ZS1jb21tZW50XCIgZGF0YS1pZD1cIiR7Y29tbWVudC5pZH1cIj5TdXBwcmltZXI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWNvbnRlbnRcIj4ke2VzY2FwZUh0bWwoY29tbWVudC5jb250ZW50KX08L2Rpdj5cbiAgICBgO1xuXG4gIHJldHVybiBkaXY7XG59XG5cbi8vIExvYWQgZG93bmxvYWQgY291bnRcbmFzeW5jIGZ1bmN0aW9uIGxvYWREb3dubG9hZENvdW50KCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImRvd25sb2Fkc1wiKVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuZXEoXCJkb2N1bWVudF9pZFwiLCBjdXJyZW50RG9jdW1lbnQuaWQpO1xuXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG93bmxvYWQtY291bnRcIikudGV4dENvbnRlbnQgPSBkYXRhLmxlbmd0aDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9hZGluZyBkb3dubG9hZCBjb3VudDpcIiwgZXJyb3IpO1xuICB9XG59XG5cbi8vIFNldHVwIGV2ZW50IGxpc3RlbmVyc1xuZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgLy8gVGFiIHN3aXRjaGluZ1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYi1idG5cIikuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzd2l0Y2hUYWIpO1xuICB9KTtcblxuICAvLyBSYXRpbmcgc3RhcnNcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN1c2VyLXJhdGluZyAuc3RhclwiKS5mb3JFYWNoKChzdGFyKSA9PiB7XG4gICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUmF0aW5nKTtcbiAgfSk7XG5cbiAgLy8gRG93bmxvYWQgYnV0dG9uXG4gIGRvY3VtZW50XG4gICAgLmdldEVsZW1lbnRCeUlkKFwiZG93bmxvYWQtYnRuXCIpXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVEb3dubG9hZCk7XG5cbiAgLy8gQ29tbWVudCBzdWJtaXNzaW9uXG4gIGRvY3VtZW50XG4gICAgLmdldEVsZW1lbnRCeUlkKFwic3VibWl0LWNvbW1lbnRcIilcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN1Ym1pdENvbW1lbnQpO1xuXG4gIC8vIENvbW1lbnQgYWN0aW9ucyAoZGVsZWdhdGlvbilcbiAgZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJjb21tZW50cy1saXN0XCIpXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDb21tZW50QWN0aW9uKTtcblxuICAvLyBNb2RhbCBldmVudHNcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC1jbG9zZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VNb2RhbCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FuY2VsLWVkaXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlTW9kYWwpO1xuICBkb2N1bWVudFxuICAgIC5nZXRFbGVtZW50QnlJZChcInNhdmUtZWRpdFwiKVxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2F2ZUNvbW1lbnRFZGl0KTtcblxuICAvLyBMb2dvdXRcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXQtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVMb2dvdXQpO1xufVxuXG4vLyBTd2l0Y2ggdGFic1xuZnVuY3Rpb24gc3dpdGNoVGFiKGUpIHtcbiAgY29uc3QgdGFyZ2V0VGFiID0gZS50YXJnZXQuZGF0YXNldC50YWI7XG5cbiAgLy8gVXBkYXRlIGFjdGl2ZSBzdGF0ZXNcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWItYnRuXCIpLmZvckVhY2goKGJ0bikgPT4ge1xuICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIsIGJ0bi5kYXRhc2V0LnRhYiA9PT0gdGFyZ2V0VGFiKTtcbiAgfSk7XG5cbiAgLy8gU2hvdy9oaWRlIGNvbnRlbnRcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdW1tYXJ5LXRhYlwiKS5zdHlsZS5kaXNwbGF5ID1cbiAgICB0YXJnZXRUYWIgPT09IFwic3VtbWFyeVwiID8gXCJibG9ja1wiIDogXCJub25lXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbWVudHMtdGFiXCIpLnN0eWxlLmRpc3BsYXkgPVxuICAgIHRhcmdldFRhYiA9PT0gXCJjb21tZW50c1wiID8gXCJibG9ja1wiIDogXCJub25lXCI7XG59XG5cbi8vIEhhbmRsZSByYXRpbmdcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVJhdGluZyhlKSB7XG4gIGNvbnN0IHJhdGluZyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucmF0aW5nKTtcblxuICB0cnkge1xuICAgIC8vIENoZWNrIGlmIHVzZXIgYWxyZWFkeSByYXRlZFxuICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInJhdGluZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgLmVxKFwiZG9jdW1lbnRfaWRcIiwgY3VycmVudERvY3VtZW50LmlkKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCBjdXJyZW50VXNlci5pZClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgLy8gVXBkYXRlIGV4aXN0aW5nIHJhdGluZ1xuICAgICAgYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJyYXRpbmdzXCIpXG4gICAgICAgIC51cGRhdGUoeyByYXRpbmcsIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9KVxuICAgICAgICAuZXEoXCJpZFwiLCBleGlzdGluZy5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEluc2VydCBuZXcgcmF0aW5nXG4gICAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwicmF0aW5nc1wiKS5pbnNlcnQoe1xuICAgICAgICBkb2N1bWVudF9pZDogY3VycmVudERvY3VtZW50LmlkLFxuICAgICAgICB1c2VyX2lkOiBjdXJyZW50VXNlci5pZCxcbiAgICAgICAgcmF0aW5nLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIFVJXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN1c2VyLXJhdGluZyAuc3RhclwiKS5mb3JFYWNoKChzdGFyLCBpbmRleCkgPT4ge1xuICAgICAgc3Rhci5jbGFzc0xpc3QudG9nZ2xlKFwic2VsZWN0ZWRcIiwgaW5kZXggPCByYXRpbmcpO1xuICAgIH0pO1xuXG4gICAgLy8gUmVsb2FkIHJhdGluZ3MgdG8gdXBkYXRlIGF2ZXJhZ2VcbiAgICBhd2FpdCBsb2FkUmF0aW5ncygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciByYXRpbmcgZG9jdW1lbnQ6XCIsIGVycm9yKTtcbiAgICBhbGVydChcIkVycmV1ciBsb3JzIGRlIGwnZW5yZWdpc3RyZW1lbnQgZGUgdm90cmUgbm90ZVwiKTtcbiAgfVxufVxuXG4vLyBIYW5kbGUgZG93bmxvYWRcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZURvd25sb2FkKCkge1xuICB0cnkge1xuICAgIC8vIEdldCBkb3dubG9hZCBVUkwgZnJvbSBTdXBhYmFzZSBTdG9yYWdlXG4gICAgY29uc3QgeyBkYXRhOiB1cmxEYXRhLCBlcnJvcjogdXJsRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLnN0b3JhZ2VcbiAgICAgIC5mcm9tKFwiZG9jdW1lbnRzXCIpXG4gICAgICAuY3JlYXRlU2lnbmVkVXJsKGN1cnJlbnREb2N1bWVudC5wZGZfc3RvcmFnZV9wYXRoLCA2MCk7IC8vIDYwIHNlY29uZHMgZXhwaXJ5XG5cbiAgICBpZiAodXJsRXJyb3IpIHRocm93IHVybEVycm9yO1xuXG4gICAgLy8gVHJhY2sgZG93bmxvYWRcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwiZG93bmxvYWRzXCIpLmluc2VydCh7XG4gICAgICBkb2N1bWVudF9pZDogY3VycmVudERvY3VtZW50LmlkLFxuICAgICAgdXNlcl9pZDogY3VycmVudFVzZXIuaWQsXG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgY291bnRcbiAgICBjb25zdCBjb3VudEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb3dubG9hZC1jb3VudFwiKTtcbiAgICBjb3VudEVsLnRleHRDb250ZW50ID0gcGFyc2VJbnQoY291bnRFbC50ZXh0Q29udGVudCkgKyAxO1xuXG4gICAgLy8gVHJpZ2dlciBkb3dubG9hZFxuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBhLmhyZWYgPSB1cmxEYXRhLnNpZ25lZFVybDtcbiAgICBhLmRvd25sb2FkID0gYFBMVV8ke2N1cnJlbnREb2N1bWVudC56b25pbmcuY2l0eS5uYW1lfV8ke2N1cnJlbnREb2N1bWVudC56b25lLm5hbWV9LnBkZmA7XG4gICAgYS5jbGljaygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkb3dubG9hZGluZyBkb2N1bWVudDpcIiwgZXJyb3IpO1xuICAgIGFsZXJ0KFwiRXJyZXVyIGxvcnMgZHUgdMOpbMOpY2hhcmdlbWVudFwiKTtcbiAgfVxufVxuXG4vLyBTdWJtaXQgY29tbWVudFxuYXN5bmMgZnVuY3Rpb24gc3VibWl0Q29tbWVudCgpIHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbWVudC1pbnB1dFwiKS52YWx1ZS50cmltKCk7XG5cbiAgaWYgKCFjb250ZW50KSB7XG4gICAgYWxlcnQoXCJWZXVpbGxleiBlbnRyZXIgdW4gY29tbWVudGFpcmVcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwiY29tbWVudHNcIikuaW5zZXJ0KHtcbiAgICAgIGRvY3VtZW50X2lkOiBjdXJyZW50RG9jdW1lbnQuaWQsXG4gICAgICB1c2VyX2lkOiBjdXJyZW50VXNlci5pZCxcbiAgICAgIGNvbnRlbnQsXG4gICAgfSk7XG5cbiAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuXG4gICAgLy8gQ2xlYXIgaW5wdXRcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnQtaW5wdXRcIikudmFsdWUgPSBcIlwiO1xuXG4gICAgLy8gUmVsb2FkIGNvbW1lbnRzXG4gICAgYXdhaXQgbG9hZENvbW1lbnRzKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHN1Ym1pdHRpbmcgY29tbWVudDpcIiwgZXJyb3IpO1xuICAgIGFsZXJ0KFwiRXJyZXVyIGxvcnMgZGUgbGEgcHVibGljYXRpb24gZHUgY29tbWVudGFpcmVcIik7XG4gIH1cbn1cblxuLy8gSGFuZGxlIGNvbW1lbnQgYWN0aW9uc1xuZnVuY3Rpb24gaGFuZGxlQ29tbWVudEFjdGlvbihlKSB7XG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWNvbW1lbnRcIikpIHtcbiAgICBvcGVuRWRpdE1vZGFsKGUudGFyZ2V0LmRhdGFzZXQuaWQpO1xuICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZS1jb21tZW50XCIpKSB7XG4gICAgZGVsZXRlQ29tbWVudChlLnRhcmdldC5kYXRhc2V0LmlkKTtcbiAgfVxufVxuXG4vLyBPcGVuIGVkaXQgbW9kYWxcbmFzeW5jIGZ1bmN0aW9uIG9wZW5FZGl0TW9kYWwoY29tbWVudElkKSB7XG4gIGN1cnJlbnRDb21tZW50SWQgPSBjb21tZW50SWQ7XG5cbiAgLy8gR2V0IGNvbW1lbnQgY29udGVudFxuICBjb25zdCB7IGRhdGE6IGNvbW1lbnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJjb21tZW50c1wiKVxuICAgIC5zZWxlY3QoXCJjb250ZW50XCIpXG4gICAgLmVxKFwiaWRcIiwgY29tbWVudElkKVxuICAgIC5zaW5nbGUoKTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtY29tbWVudC1pbnB1dFwiKS52YWx1ZSA9IGNvbW1lbnQuY29udGVudDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LW1vZGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn1cblxuLy8gQ2xvc2UgbW9kYWxcbmZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1tb2RhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGN1cnJlbnRDb21tZW50SWQgPSBudWxsO1xufVxuXG4vLyBTYXZlIGNvbW1lbnQgZWRpdFxuYXN5bmMgZnVuY3Rpb24gc2F2ZUNvbW1lbnRFZGl0KCkge1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LWNvbW1lbnQtaW5wdXRcIikudmFsdWUudHJpbSgpO1xuXG4gIGlmICghY29udGVudCkge1xuICAgIGFsZXJ0KFwiTGUgY29tbWVudGFpcmUgbmUgcGV1dCBwYXMgw6p0cmUgdmlkZVwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImNvbW1lbnRzXCIpXG4gICAgICAudXBkYXRlKHtcbiAgICAgICAgY29udGVudCxcbiAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfSlcbiAgICAgIC5lcShcImlkXCIsIGN1cnJlbnRDb21tZW50SWQpO1xuXG4gICAgY2xvc2VNb2RhbCgpO1xuICAgIGF3YWl0IGxvYWRDb21tZW50cygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgYWxlcnQoXCJFcnJldXIgbG9ycyBkZSBsYSBtb2RpZmljYXRpb25cIik7XG4gIH1cbn1cblxuLy8gRGVsZXRlIGNvbW1lbnRcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNvbW1lbnQoY29tbWVudElkKSB7XG4gIGlmICghY29uZmlybShcIsOKdGVzLXZvdXMgc8O7ciBkZSB2b3Vsb2lyIHN1cHByaW1lciBjZSBjb21tZW50YWlyZT9cIikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJjb21tZW50c1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGNvbW1lbnRJZCk7XG5cbiAgICBhd2FpdCBsb2FkQ29tbWVudHMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgY29tbWVudDpcIiwgZXJyb3IpO1xuICAgIGFsZXJ0KFwiRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb25cIik7XG4gIH1cbn1cblxuLy8gSGFuZGxlIGxvZ291dFxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlTG9nb3V0KCkge1xuICBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25PdXQoKTtcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9sb2dpblwiO1xufVxuXG4vLyBTaG93IGVycm9yIHN0YXRlXG5mdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZSkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmctc3RhdGVcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLW1lc3NhZ2VcIikudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLXN0YXRlXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59XG5cbi8vIFV0aWxpdHkgZnVuY3Rpb24gdG8gZXNjYXBlIEhUTUxcbmZ1bmN0aW9uIGVzY2FwZUh0bWwodGV4dCkge1xuICBjb25zdCBtYXAgPSB7XG4gICAgXCImXCI6IFwiJmFtcDtcIixcbiAgICBcIjxcIjogXCImbHQ7XCIsXG4gICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICdcIic6IFwiJnF1b3Q7XCIsXG4gICAgXCInXCI6IFwiJiMwMzk7XCIsXG4gIH07XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1smPD5cIiddL2csIChtKSA9PiBtYXBbbV0pO1xufVxuIiwiLy8gc3JjL2pzL3N1cGFiYXNlLWNsaWVudC5qc1xuLyoqXG4gKiBTdXBhYmFzZSBDbGllbnRcbiAqIEBtb2R1bGUgc3VwYWJhc2UtY2xpZW50XG4gKiBAZGVzY3JpcHRpb24gVGhpcyBtb2R1bGUgaGFuZGxlcyB0aGUgU3VwYWJhc2UgY2xpZW50IGluaXRpYWxpemF0aW9uIGFuZCBjb25maWd1cmF0aW9uLlxuICogQHZlcnNpb24gMC4wLjJcbiAqIEBhdXRob3IgR3JleVBhbmRhXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuMiAoMjAyNS0wNS0yNyk6IEFkZGVkIGVudmlyb25lbWVudCB2YXJpYWJsZXMgZXJyb3IgaGFuZGxpbmcgZm9yIG1pc3NpbmcuXG4gKiAtIDAuMC4xICgyMDI1LTA1LTA5KTogSW5pdGlhbCB2ZXJzaW9uIHdpdGggYmFzaWMgU3VwYWJhc2UgY2xpZW50IGluaXRpYWxpemF0aW9uLlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcblxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9VUkw7XG5jb25zdCBzdXBhYmFzZUFub25LZXkgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9BTk9OX0tFWTtcblxuaWYgKCFzdXBhYmFzZVVybCB8fCAhc3VwYWJhc2VBbm9uS2V5KSB7XG4gIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzXCIpO1xufVxuXG5jb25zdCBjbGllbnQgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSk7XG5cbmV4cG9ydCBjb25zdCBzdXBhYmFzZSA9IGNsaWVudDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcImpzL1wiICsgY2h1bmtJZCArIFwiLmJ1bmRsZS5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJ1cmJhbmRvY3Nfd2ViYXBwOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0NSSVBUJylcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC9eYmxvYjovLCBcIlwiKS5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmwgKyBcIi4uL1wiOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInBsdVN1bW1hcnlcIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3VyYmFuZG9jc193ZWJhcHBcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdXJiYW5kb2NzX3dlYmFwcFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfc3VwYWJhc2Vfc3VwYWJhc2UtanNfZGlzdF9tb2R1bGVfaW5kZXhfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvcGx1LXN1bW1hcnkuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==