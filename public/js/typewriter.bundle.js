/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./src/js/typewriter.js ***!
  \******************************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdHlwZXdyaXRlci5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRSx1Q0FBdUM7QUFDdkMsd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy90eXBld3JpdGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9qcy90eXBld3JpdGVyLmpzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IHN1YnRpdGxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHlwZXdyaXRlci1zdWJ0aXRsZVwiKTtcbiAgLy8gVGV4dCB0byBhbmltYXRlXG4gIGNvbnN0IHRleHRUb1R5cGUgPSBcIlNJRlQgLSBNV1BMVSAtIDIwMjVcIjtcbiAgLy8gVHlwaW5nIHNwZWVkIGluIG1pbGxpc2Vjb25kcyBwZXIgY2hhcmFjdGVyXG4gIGNvbnN0IHR5cGluZ1NwZWVkID0gNzA7XG5cbiAgaWYgKHN1YnRpdGxlRWxlbWVudCkge1xuICAgIGFwcGx5VHlwZXdyaXRlckVmZmVjdChzdWJ0aXRsZUVsZW1lbnQsIHRleHRUb1R5cGUsIHR5cGluZ1NwZWVkKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGFwcGx5VHlwZXdyaXRlckVmZmVjdChlbGVtZW50LCB0ZXh0LCBzcGVlZCkge1xuICBsZXQgaSA9IDA7XG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjsgLy8gRW5zdXJlIHRoZSBlbGVtZW50IGlzIGVtcHR5XG5cbiAgLy8gQ3JlYXRlIGFuIGludGVybmFsIGNvbnRhaW5lciAoc3BhbikgZm9yIHRoZSB0ZXh0IGFuZCBjdXJzb3JcbiAgLy8gVGhpcyBwcmV2ZW50cyBhZmZlY3RpbmcgdGhlIGJsb2NrIHByb3BlcnRpZXMgb2YgdGhlIHBhcmVudCBlbGVtZW50IChwLmxlYWQpXG4gIGNvbnN0IHRleHRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dFNwYW4pO1xuXG4gIC8vIEluaXRpYWwgc3R5bGUgZm9yIHRoZSBjdXJzb3IgKGEgc2ltcGxlIHZlcnRpY2FsIGJhcilcbiAgLy8gdmFyKC0tbWVkaXVtLWdyYXkpIGlzIHVzZWQgaW4gLmxlYWQsIHNvIGl0IHNob3VsZCBiZSBhdmFpbGFibGUuXG4gIHRleHRTcGFuLnN0eWxlLmJvcmRlclJpZ2h0ID0gXCIzcHggc29saWQgdmFyKC0tbWVkaXVtLWdyYXksICM4ODgpXCI7IC8vIEZhbGxiYWNrIGdyYXkgY29sb3JcbiAgdGV4dFNwYW4uc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCIycHhcIjsgLy8gU21hbGwgc3BhY2UgZm9yIHRoZSBjdXJzb3JcbiAgdGV4dFNwYW4uc3R5bGUud2hpdGVTcGFjZSA9IFwibm93cmFwXCI7IC8vIFByZXZlbnQgbGluZSBicmVhayBkdXJpbmcgdHlwaW5nXG5cbiAgZnVuY3Rpb24gdHlwZSgpIHtcbiAgICBpZiAoaSA8IHRleHQubGVuZ3RoKSB7XG4gICAgICB0ZXh0U3Bhbi50ZXh0Q29udGVudCArPSB0ZXh0LmNoYXJBdChpKTtcbiAgICAgIGkrKztcbiAgICAgIHNldFRpbWVvdXQodHlwZSwgc3BlZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUeXBpbmcgaXMgY29tcGxldGUsIHJlbW92ZSB0aGUgY3Vyc29yXG4gICAgICB0ZXh0U3Bhbi5zdHlsZS5ib3JkZXJSaWdodCA9IFwibm9uZVwiO1xuICAgICAgdGV4dFNwYW4uc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCIwXCI7XG4gICAgfVxuICB9XG5cbiAgLy8gU3RhcnQgdGhlIHR5cGluZyBhbmltYXRpb25cbiAgdHlwZSgpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9