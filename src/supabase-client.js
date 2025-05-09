/**
 * Supabase Client
 * @module supabase-client
 * @description This module handles the Supabase client initialization and configuration.
 * @version 0.0.1
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.1 (2025-05-09): Initial version with basic Supabase client initialization.
 */

import { createClient } from "@supabase/supabase-js";

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
const supabaseUrl = "https://ofeyssipibktmbfebibo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZXlzc2lwaWJrdG1iZmViaWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjUwOTQsImV4cCI6MjA1OTUwMTA5NH0.w71CAKfolktzRl-TmLVhHYaEbhCfVk4A7YraEUCglrU";

console.log("[supabase-client.js] Initializing Supabase client...");
const client = createClient(supabaseUrl, supabaseAnonKey);
console.log("[supabase-client.js] Supabase client instance created:", client);
if (client && client.auth) {
  console.log("[supabase-client.js] client.auth object:", client.auth);
  console.log(
    "[supabase-client.js] typeof client.auth.onAuthStateChanged:",
    typeof client.auth.onAuthStateChanged
  );
} else {
  console.error(
    "[supabase-client.js] Supabase client or client.auth is not initialized correctly!"
  );
}

export const supabase = client;
