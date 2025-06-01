// Footer Component
export function createFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">Contact</h3>
            <div class="contact-info">
              <div class="contact-item">
                <a href="mailto:contact@mwplu.com">contact@mwplu.com</a>
              </div>
              <div class="contact-item">
                <a href="tel:+33601842720">06 01 84 27 20</a>
              </div>
              <div class="contact-item">
                <a href="https://maps.google.com?q=40+Rue+Mallifaud,+38100+Grenoble" target="_blank">40 Rue Mallifaud, 38100 Grenoble</a>
              </div>
            </div>
          </div>

          <div class="footer-section">
            <h3 class="footer-title">Liens rapides</h3>
            <div class="footer-links">
              <div class="footer-links-column">
                <a href="/" class="footer-link">Accueil</a>
                <a href="/info/about" class="footer-link">À propos</a>
                <a href="/info/donation" class="footer-link">Nous soutenir</a>
              </div>
              <div class="footer-links-column">
                <a href="/docs/documentation" class="footer-link">Documentation</a>
                <a href="/info/contact" class="footer-link">Contact</a>
                <a href="/user/profile" class="footer-link">Mon compte</a>
              </div>
            </div>
          </div>

          <div class="footer-section">
            <h3 class="footer-title">Suivez-nous</h3>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Twitter">
                <span class="social-icon">
                  <img
                    src="https://mwplu.com/assets/icons/social/twitter-x.svg"
                    alt="Twitter Logo"
                  />
                </span>
              </a>
              <a href="#" class="social-link" aria-label="Facebook">
                <span class="social-icon">
                  <img
                    src="https://mwplu.com/assets/icons/social/facebook.svg"
                    alt="Facebook Logo"
                  />
                </span>
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <span class="social-icon">
                  <img
                    src="https://mwplu.com/assets/icons/social/linkedin.svg"
                    alt="LinkedIn Logo"
                  />
                </span>
              </a>
              <a href="#" class="social-link" aria-label="Youtube">
                <span class="social-icon">
                  <img
                    src="https://mwplu.com/assets/icons/social/youtube.svg"
                    alt="Youtube Logo"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-legal">
            <a href="/policies/legal-notice" class="legal-link">Mentions légales</a>
            <a href="/policies/terms" class="legal-link">CGU</a>
            <a href="/policies/privacy" class="legal-link">Confidentialité</a>
            <a href="/policies/cookies" class="legal-link">Cookies</a>
          </div>
          <div class="footer-copyright">
            <p>&copy; 2025 MWPLU. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Function to load footer into a page
export function loadFooter() {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = createFooter();
  } else {
    // If no placeholder exists, append to body
    document.body.insertAdjacentHTML("beforeend", createFooter());
  }
}

// Auto-load footer when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadFooter);
} else {
  loadFooter();
}
