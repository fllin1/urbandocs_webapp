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
                <span class="contact-icon">📧</span>
                <span>contact@mwplu.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span>06 01 84 27 20</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>40 Rue Mallifaud, 38100 Grenoble</span>
              </div>
            </div>
          </div>

          <div class="footer-section">
            <h3 class="footer-title">Liens rapides</h3>
            <div class="footer-links">
              <div class="footer-links-column">
                <a href="/" class="footer-link">Accueil</a>
                <a href="/about" class="footer-link">À propos</a>
                <a href="/donation" class="footer-link">Nous soutenir</a>
              </div>
              <div class="footer-links-column">
                <a href="/documentation" class="footer-link">Documentation</a>
                <a href="/contact" class="footer-link">Contact</a>
                <a href="/profile" class="footer-link">Mon compte</a>
              </div>
            </div>
          </div>

          <div class="footer-section">
            <h3 class="footer-title">Suivez-nous</h3>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Twitter">
                <span class="social-icon">
                  <img
                    src="assets/icons/social/twitter-x.svg"
                    alt="Twitter Logo"
                  />
                </span>
              </a>
              <a href="#" class="social-link" aria-label="Facebook">
                <span class="social-icon">
                  <img
                    src="assets/icons/social/facebook.svg"
                    alt="Facebook Logo"
                  />
                </span>
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <span class="social-icon">
                  <img
                    src="assets/icons/social/linkedin.svg"
                    alt="LinkedIn Logo"
                  />
                </span>
              </a>
              <a href="#" class="social-link" aria-label="Youtube">
                <span class="social-icon">
                  <img
                    src="assets/icons/social/youtube.svg"
                    alt="Youtube Logo"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-legal">
            <a href="/mentions-legales" class="legal-link">Mentions légales</a>
            <a href="/terms" class="legal-link">CGU</a>
            <a href="/confidentialite" class="legal-link">Confidentialité</a>
            <a href="/cookies" class="legal-link">Cookies</a>
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
