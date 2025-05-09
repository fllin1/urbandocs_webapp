# Firebase Authentication Implementation Prompt

## Task Description
Implement Firebase authentication controls for a website that currently has two pages:
1. A main page where users can select a city, zonage, and zone to download related documents
2. A login page that redirects to the main page after successful authentication

## Current Issue
Currently, unauthenticated users can download documents from the main page without restrictions.

## Requirements
1. Restrict document downloads to authenticated users only
2. Allow unauthenticated users to browse documents using selectors but not download them
3. Display appropriate login prompts for unauthenticated users
4. After login, display user's email on the main page
5. Replace login prompt with a success message after authentication
6. Replace login button with logout button after authentication
7. Enable document download functionality only for authenticated users
8. Ensure download links are not retrieved from Supabase unless the user is authenticated

## Implementation Plan
1. **Inspect Key Files:**
   - `src/index.html`: Identify relevant UI elements (download button, login button, message areas)
   - `src/js/app.js`: Core logic for the main page
   - `src/js/login.js`: Login handling functionality
   - `src/js/api.js`: Download link retrieval from Supabase

2. **Implement Authentication State Listener:**
   - Use `firebase.auth().onAuthStateChanged()` to monitor user authentication state

3. **Update UI Based on Authentication State:**
   - For unauthenticated users:
     - Disable download button
     - Display "Please log in to download" message
     - Hide any logged-in UI elements
     - Keep login button visible
     - Prevent API calls to fetch download links
   - For authenticated users:
     - Enable download button
     - Hide login prompt message
     - Display "Logged in as: [user.email]"
     - Hide login button and show logout button
     - Add logout functionality
     - Allow API calls to fetch download links

4. **Modify HTML Structure:**
   - Add elements with unique IDs for:
     - Login prompt message
     - Authenticated user status display
     - Logout button (initially hidden)

5. **Refactor API Calls:**
   - Ensure download URL fetching only occurs after authentication verification

6. **Build Project:**
   - Rebuild using appropriate bundling tools to update the public directory