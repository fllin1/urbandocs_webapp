/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./src/js/components/footer.js ***!
  \*************************************/
/* unused harmony exports createFooter, loadFooter */
// Footer Component
function createFooter() {
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
function loadFooter() {
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvZm9vdGVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7Ozs7O0FDQUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9jb21wb25lbnRzL2Zvb3Rlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIEZvb3RlciBDb21wb25lbnRcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb290ZXIoKSB7XG4gIHJldHVybiBgXG4gICAgPGZvb3RlciBjbGFzcz1cInNpdGUtZm9vdGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItY29udGVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItc2VjdGlvblwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiZm9vdGVyLXRpdGxlXCI+Q29udGFjdDwvaDM+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFjdC1pbmZvXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbnRhY3QtaWNvblwiPvCfk6c8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+Y29udGFjdEBtd3BsdS5jb208L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFjdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb250YWN0LWljb25cIj7wn5OePC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjA2IDAxIDg0IDI3IDIwPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhY3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29udGFjdC1pY29uXCI+8J+TjTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj40MCBSdWUgTWFsbGlmYXVkLCAzODEwMCBHcmVub2JsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItc2VjdGlvblwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiZm9vdGVyLXRpdGxlXCI+TGllbnMgcmFwaWRlczwvaDM+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWxpbmtzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItbGlua3MtY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9cIiBjbGFzcz1cImZvb3Rlci1saW5rXCI+QWNjdWVpbDwvYT5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2Fib3V0XCIgY2xhc3M9XCJmb290ZXItbGlua1wiPsOAIHByb3BvczwvYT5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2RvbmF0aW9uXCIgY2xhc3M9XCJmb290ZXItbGlua1wiPk5vdXMgc291dGVuaXI8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWxpbmtzLWNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvZG9jdW1lbnRhdGlvblwiIGNsYXNzPVwiZm9vdGVyLWxpbmtcIj5Eb2N1bWVudGF0aW9uPC9hPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvY29udGFjdFwiIGNsYXNzPVwiZm9vdGVyLWxpbmtcIj5Db250YWN0PC9hPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvcHJvZmlsZVwiIGNsYXNzPVwiZm9vdGVyLWxpbmtcIj5Nb24gY29tcHRlPC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvb3Rlci1zZWN0aW9uXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJmb290ZXItdGl0bGVcIj5TdWl2ZXotbm91czwvaDM+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLWxpbmtzXCI+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJzb2NpYWwtbGlua1wiIGFyaWEtbGFiZWw9XCJUd2l0dGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzb2NpYWwtaWNvblwiPlxuICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICBzcmM9XCJhc3NldHMvaWNvbnMvc29jaWFsL3R3aXR0ZXIteC5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJUd2l0dGVyIExvZ29cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNvY2lhbC1saW5rXCIgYXJpYS1sYWJlbD1cIkZhY2Vib29rXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzb2NpYWwtaWNvblwiPlxuICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICBzcmM9XCJhc3NldHMvaWNvbnMvc29jaWFsL2ZhY2Vib29rLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkZhY2Vib29rIExvZ29cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNvY2lhbC1saW5rXCIgYXJpYS1sYWJlbD1cIkxpbmtlZEluXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzb2NpYWwtaWNvblwiPlxuICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICBzcmM9XCJhc3NldHMvaWNvbnMvc29jaWFsL2xpbmtlZGluLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkxpbmtlZEluIExvZ29cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNvY2lhbC1saW5rXCIgYXJpYS1sYWJlbD1cIllvdXR1YmVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNvY2lhbC1pY29uXCI+XG4gICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cImFzc2V0cy9pY29ucy9zb2NpYWwveW91dHViZS5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJZb3V0dWJlIExvZ29cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWJvdHRvbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItbGVnYWxcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvbWVudGlvbnMtbGVnYWxlc1wiIGNsYXNzPVwibGVnYWwtbGlua1wiPk1lbnRpb25zIGzDqWdhbGVzPC9hPlxuICAgICAgICAgICAgPGEgaHJlZj1cIi90ZXJtc1wiIGNsYXNzPVwibGVnYWwtbGlua1wiPkNHVTwvYT5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvY29uZmlkZW50aWFsaXRlXCIgY2xhc3M9XCJsZWdhbC1saW5rXCI+Q29uZmlkZW50aWFsaXTDqTwvYT5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvY29va2llc1wiIGNsYXNzPVwibGVnYWwtbGlua1wiPkNvb2tpZXM8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvb3Rlci1jb3B5cmlnaHRcIj5cbiAgICAgICAgICAgIDxwPiZjb3B5OyAyMDI1IE1XUExVLiBUb3VzIGRyb2l0cyByw6lzZXJ2w6lzLjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvb3Rlcj5cbiAgYDtcbn1cblxuLy8gRnVuY3Rpb24gdG8gbG9hZCBmb290ZXIgaW50byBhIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRm9vdGVyKCkge1xuICBjb25zdCBmb290ZXJQbGFjZWhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9vdGVyLXBsYWNlaG9sZGVyXCIpO1xuICBpZiAoZm9vdGVyUGxhY2Vob2xkZXIpIHtcbiAgICBmb290ZXJQbGFjZWhvbGRlci5pbm5lckhUTUwgPSBjcmVhdGVGb290ZXIoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBJZiBubyBwbGFjZWhvbGRlciBleGlzdHMsIGFwcGVuZCB0byBib2R5XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgY3JlYXRlRm9vdGVyKCkpO1xuICB9XG59XG5cbi8vIEF1dG8tbG9hZCBmb290ZXIgd2hlbiBET00gaXMgcmVhZHlcbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIikge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBsb2FkRm9vdGVyKTtcbn0gZWxzZSB7XG4gIGxvYWRGb290ZXIoKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==