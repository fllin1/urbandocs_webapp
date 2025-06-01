/**
 * Deletion Guard Module
 * @module deletionGuard
 * @description Handles redirection logic for users with pending account deletions
 * @version 1.0.0
 */

import { supabase } from "../supabase-client.js";

let deletionCheckCache = null;
let cacheExpiry = null;
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days cache

/**
 * Check if user has pending account deletion and redirect if necessary
 * @param {boolean} allowDeletionStatusPage - Whether to allow access to deletion status page
 * @returns {Promise<boolean>} - Returns true if user can access the page, false if redirected
 */
export async function checkDeletionStatus(allowDeletionStatusPage = false) {
  try {
    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      // No user, allow access (will be handled by other auth checks)
      return true;
    }

    // Check cache first
    const now = Date.now();
    if (deletionCheckCache && cacheExpiry && now < cacheExpiry) {
      return handleDeletionRedirect(
        deletionCheckCache,
        allowDeletionStatusPage
      );
    }

    // Get session for API call
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.access_token) {
      return true; // No session, allow access
    }

    // Call the account management edge function to check status
    const response = await fetch(
      `${supabase.supabaseUrl}/functions/v1/account-management`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.session.access_token}`,
        },
        body: JSON.stringify({
          action: "status",
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      console.warn("Could not check deletion status:", result.error);
      return true; // Allow access if check fails
    }

    // Cache the result
    deletionCheckCache = result.data;
    cacheExpiry = now + CACHE_DURATION;

    return handleDeletionRedirect(result.data, allowDeletionStatusPage);
  } catch (error) {
    console.warn("Error checking deletion status:", error);
    return true; // Allow access if check fails
  }
}

/**
 * Handle redirection based on deletion status
 * @param {Object} deletionData - Deletion status data
 * @param {boolean} allowDeletionStatusPage - Whether to allow access to deletion status page
 * @returns {boolean} - Returns true if user can access the page, false if redirected
 */
function handleDeletionRedirect(deletionData, allowDeletionStatusPage) {
  if (!deletionData.deletion_scheduled) {
    return true; // No deletion scheduled, allow access
  }

  // Check if account has already expired
  if (deletionData.time_remaining_seconds <= 0) {
    // Account should be deleted, force logout
    supabase.auth.signOut();
    window.location.href = "/auth/login";
    return false;
  }

  // Account is scheduled for deletion
  const currentPath = window.location.pathname;
  const isDeletionStatusPage = currentPath.includes("account-deletion-status");
  const isLogoutAction =
    currentPath.includes("logout") || currentPath.includes("auth");

  // Allow access to deletion status page if explicitly allowed
  if (allowDeletionStatusPage && isDeletionStatusPage) {
    return true;
  }

  // Allow logout/auth pages
  if (isLogoutAction) {
    return true;
  }

  // Redirect to deletion status page for all other pages
  if (!isDeletionStatusPage) {
    window.location.href = "/user/account-deletion-status";
    return false;
  }

  return true;
}

/**
 * Clear the deletion status cache
 */
export function clearDeletionCache() {
  deletionCheckCache = null;
  cacheExpiry = null;
}

/**
 * Initialize deletion guard for a page
 * @param {boolean} allowDeletionStatusPage - Whether this page is the deletion status page
 */
export async function initDeletionGuard(allowDeletionStatusPage = false) {
  const canAccess = await checkDeletionStatus(allowDeletionStatusPage);

  if (!canAccess) {
    // Page access was blocked, stop further initialization
    return false;
  }

  // Set up periodic checks for deletion status changes
  setInterval(async () => {
    await checkDeletionStatus(allowDeletionStatusPage);
  }, 30000); // Check every 30 seconds

  return true;
}

/**
 * Check if current user has pending deletion (for UI updates)
 * @returns {Promise<Object|null>} - Deletion data or null
 */
export async function getCurrentDeletionStatus() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.access_token) return null;

    const response = await fetch(
      `${supabase.supabaseUrl}/functions/v1/account-management`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.session.access_token}`,
        },
        body: JSON.stringify({
          action: "status",
        }),
      }
    );

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.warn("Error getting deletion status:", error);
    return null;
  }
}
