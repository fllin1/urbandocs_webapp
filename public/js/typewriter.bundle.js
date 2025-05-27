/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./src/js/typewriter.js ***!
  \******************************/
// src/js/typewriter.js
/**
 * Typewriter Effect
 * @module typewriter
 * @description This module handles the typewriter effect for the subtitle element.
 * @version 0.0.1
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.1 (2025-05-15): Initial version with basic typewriter effect.
 */

document.addEventListener("DOMContentLoaded", () => {
  const subtitleElement = document.getElementById("typewriter-subtitle");
  // Text to animate
  const textToType = "SIFT - MWPLU - 2025";
  // Typing speed in milliseconds per character
  const typingSpeed = 70;

  if (subtitleElement) {
    applyTypewriterEffect(subtitleElement, textToType, typingSpeed);
  }
});

function applyTypewriterEffect(element, text, speed) {
  let i = 0;
  element.innerHTML = ""; // Ensure the element is empty

  // Create an internal container (span) for the text and cursor
  // This prevents affecting the block properties of the parent element (p.lead)
  const textSpan = document.createElement("span");
  element.appendChild(textSpan);

  // Initial style for the cursor (a simple vertical bar)
  // var(--medium-gray) is used in .lead, so it should be available.
  textSpan.style.borderRight = "3px solid var(--medium-gray, #888)"; // Fallback gray color
  textSpan.style.paddingRight = "2px"; // Small space for the cursor
  textSpan.style.whiteSpace = "nowrap"; // Prevent line break during typing

  function type() {
    if (i < text.length) {
      textSpan.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Typing is complete, remove the cursor
      textSpan.style.borderRight = "none";
      textSpan.style.paddingRight = "0";
    }
  }

  // Start the typing animation
  type();
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdHlwZXdyaXRlci5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRSx1Q0FBdUM7QUFDdkMsd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy90eXBld3JpdGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9qcy90eXBld3JpdGVyLmpzXG4vKipcbiAqIFR5cGV3cml0ZXIgRWZmZWN0XG4gKiBAbW9kdWxlIHR5cGV3cml0ZXJcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBoYW5kbGVzIHRoZSB0eXBld3JpdGVyIGVmZmVjdCBmb3IgdGhlIHN1YnRpdGxlIGVsZW1lbnQuXG4gKiBAdmVyc2lvbiAwLjAuMVxuICogQGF1dGhvciBHcmV5UGFuZGFcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4xICgyMDI1LTA1LTE1KTogSW5pdGlhbCB2ZXJzaW9uIHdpdGggYmFzaWMgdHlwZXdyaXRlciBlZmZlY3QuXG4gKi9cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCBzdWJ0aXRsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR5cGV3cml0ZXItc3VidGl0bGVcIik7XG4gIC8vIFRleHQgdG8gYW5pbWF0ZVxuICBjb25zdCB0ZXh0VG9UeXBlID0gXCJTSUZUIC0gTVdQTFUgLSAyMDI1XCI7XG4gIC8vIFR5cGluZyBzcGVlZCBpbiBtaWxsaXNlY29uZHMgcGVyIGNoYXJhY3RlclxuICBjb25zdCB0eXBpbmdTcGVlZCA9IDcwO1xuXG4gIGlmIChzdWJ0aXRsZUVsZW1lbnQpIHtcbiAgICBhcHBseVR5cGV3cml0ZXJFZmZlY3Qoc3VidGl0bGVFbGVtZW50LCB0ZXh0VG9UeXBlLCB0eXBpbmdTcGVlZCk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBhcHBseVR5cGV3cml0ZXJFZmZlY3QoZWxlbWVudCwgdGV4dCwgc3BlZWQpIHtcbiAgbGV0IGkgPSAwO1xuICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7IC8vIEVuc3VyZSB0aGUgZWxlbWVudCBpcyBlbXB0eVxuXG4gIC8vIENyZWF0ZSBhbiBpbnRlcm5hbCBjb250YWluZXIgKHNwYW4pIGZvciB0aGUgdGV4dCBhbmQgY3Vyc29yXG4gIC8vIFRoaXMgcHJldmVudHMgYWZmZWN0aW5nIHRoZSBibG9jayBwcm9wZXJ0aWVzIG9mIHRoZSBwYXJlbnQgZWxlbWVudCAocC5sZWFkKVxuICBjb25zdCB0ZXh0U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKHRleHRTcGFuKTtcblxuICAvLyBJbml0aWFsIHN0eWxlIGZvciB0aGUgY3Vyc29yIChhIHNpbXBsZSB2ZXJ0aWNhbCBiYXIpXG4gIC8vIHZhcigtLW1lZGl1bS1ncmF5KSBpcyB1c2VkIGluIC5sZWFkLCBzbyBpdCBzaG91bGQgYmUgYXZhaWxhYmxlLlxuICB0ZXh0U3Bhbi5zdHlsZS5ib3JkZXJSaWdodCA9IFwiM3B4IHNvbGlkIHZhcigtLW1lZGl1bS1ncmF5LCAjODg4KVwiOyAvLyBGYWxsYmFjayBncmF5IGNvbG9yXG4gIHRleHRTcGFuLnN0eWxlLnBhZGRpbmdSaWdodCA9IFwiMnB4XCI7IC8vIFNtYWxsIHNwYWNlIGZvciB0aGUgY3Vyc29yXG4gIHRleHRTcGFuLnN0eWxlLndoaXRlU3BhY2UgPSBcIm5vd3JhcFwiOyAvLyBQcmV2ZW50IGxpbmUgYnJlYWsgZHVyaW5nIHR5cGluZ1xuXG4gIGZ1bmN0aW9uIHR5cGUoKSB7XG4gICAgaWYgKGkgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgdGV4dFNwYW4udGV4dENvbnRlbnQgKz0gdGV4dC5jaGFyQXQoaSk7XG4gICAgICBpKys7XG4gICAgICBzZXRUaW1lb3V0KHR5cGUsIHNwZWVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHlwaW5nIGlzIGNvbXBsZXRlLCByZW1vdmUgdGhlIGN1cnNvclxuICAgICAgdGV4dFNwYW4uc3R5bGUuYm9yZGVyUmlnaHQgPSBcIm5vbmVcIjtcbiAgICAgIHRleHRTcGFuLnN0eWxlLnBhZGRpbmdSaWdodCA9IFwiMFwiO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN0YXJ0IHRoZSB0eXBpbmcgYW5pbWF0aW9uXG4gIHR5cGUoKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==