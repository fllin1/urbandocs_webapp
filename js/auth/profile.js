import { supabase } from "../supabase-client.js";
import { showError, showStatus } from "./auth.js";

export async function initProfilePage() {
  const userEmail = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtnProfile");

  // Get current session
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error("Error getting session:", error);
    window.location.href = "/login";
    return;
  }

  if (!session) {
    window.location.href = "/login";
    return;
  }

  // Display user email
  if (userEmail) {
    userEmail.textContent = session.user.email;
  }

  // Handle logout
  if (logoutBtn) {
    logoutBtn.classList.remove("hidden");
    logoutBtn.addEventListener("click", async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        window.location.href = "/";
      } catch (error) {
        console.error("Error signing out:", error);
        showError("Une erreur est survenue lors de la déconnexion.");
      }
    });
  }
}

export default {
  initProfilePage,
};