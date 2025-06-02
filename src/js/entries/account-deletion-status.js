/**
 * Account Deletion Status Entry Point
 * @module accountDeletionStatusEntry
 * @description Entry point for the account deletion status page
 * @version 1.0.0
 */

import { initAccountDeletionStatusPage } from "../account-deletion-status.js";

// Initialize the page when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAccountDeletionStatusPage);
} else {
  initAccountDeletionStatusPage();
}
