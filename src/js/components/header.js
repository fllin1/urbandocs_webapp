import { isLoggedInSync, logout } from "../auth/auth.js";

export function initializeHeader(containerId) {
  const headerContainer = document.getElementById(containerId);
  if (!headerContainer) {
    console.error(`Header container with ID '${containerId}' not found.`);
    return;
  }

  const loggedIn = isLoggedInSync();

  let authLinksHtml = "";
  if (loggedIn) {
    authLinksHtml = `
            <a href="/user/profile" class="auth-btn margin-right-sm">Mon Profil</a>
            <a href="#" id="logoutLinkHeader" class="auth-btn">Déconnexion</a>
        `;
  } else {
    authLinksHtml = `
            <a href="/auth/login" class="auth-btn margin-right-sm">Se connecter</a>
            <a href="/auth/signup" class="auth-btn">Créer un compte</a>
        `;
  }

  // Note: The 'site-header', 'container', 'flex-between', 'header-logo', 'auth-btn', 'margin-right-sm'
  // classes are assumed to be defined in your main.css
  headerContainer.innerHTML = `
        <header class="site-header">
          <div class="container">
            <div class="flex-between">
              <a href="/" class="header-logo">
                <img src="https://mwplu.com/assets/icons/logo/MWPLU.svg" alt="MWPLU Logo" /> 
              </a>
              <nav class="main-nav auth-section">
                 <a href="/" class="auth-btn margin-right-sm">Accueil</a>
                 ${authLinksHtml}
              </nav>
            </div>
          </div>
        </header>
    `;

  if (loggedIn) {
    const logoutLink = document.getElementById("logoutLinkHeader");
    if (logoutLink) {
      logoutLink.addEventListener("click", async (e) => {
        e.preventDefault();
        await logout();
        // logout() handles redirection, so the page will reload with the correct header.
      });
    }
  }
}
