// src/js/typewriter.js
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
