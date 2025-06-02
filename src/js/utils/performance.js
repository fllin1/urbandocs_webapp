/**
 * Performance Utilities
 * @module performance
 * @description Performance optimization utilities for better user experience
 * @version 1.0.0
 * @author GreyPanda
 */

export class PerformanceUtils {
  // Lazy loading for images
  static initLazyLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            img.classList.add("fade-in");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      document.querySelectorAll("img[data-src]").forEach((img) => {
        img.src = img.dataset.src;
        img.classList.remove("lazy");
      });
    }
  }

  // Debounce function for performance
  static debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  // Throttle function for performance
  static throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Resource preloader
  static preloadResources(resources) {
    const promises = resources.map((resource) => {
      return new Promise((resolve, reject) => {
        if (resource.type === "image") {
          const img = new Image();
          img.onload = () => resolve(resource);
          img.onerror = () => reject(resource);
          img.src = resource.url;
        } else if (resource.type === "script") {
          const script = document.createElement("script");
          script.onload = () => resolve(resource);
          script.onerror = () => reject(resource);
          script.src = resource.url;
          document.head.appendChild(script);
        } else if (resource.type === "style") {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.onload = () => resolve(resource);
          link.onerror = () => reject(resource);
          link.href = resource.url;
          document.head.appendChild(link);
        }
      });
    });

    return Promise.allSettled(promises);
  }

  // Virtual scrolling for large lists
  static createVirtualList(container, items, renderItem, itemHeight = 50) {
    const containerHeight = container.clientHeight;
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const bufferCount = 5; // Extra items for smooth scrolling

    let startIndex = 0;
    let endIndex = visibleCount + bufferCount;

    const render = () => {
      container.innerHTML = "";
      const fragment = document.createDocumentFragment();

      // Create spacer for items before visible area
      if (startIndex > 0) {
        const spacerTop = document.createElement("div");
        spacerTop.style.height = `${startIndex * itemHeight}px`;
        fragment.appendChild(spacerTop);
      }

      // Render visible items
      for (let i = startIndex; i < Math.min(endIndex, items.length); i++) {
        const element = renderItem(items[i], i);
        element.style.height = `${itemHeight}px`;
        fragment.appendChild(element);
      }

      // Create spacer for items after visible area
      const remainingItems = items.length - endIndex;
      if (remainingItems > 0) {
        const spacerBottom = document.createElement("div");
        spacerBottom.style.height = `${remainingItems * itemHeight}px`;
        fragment.appendChild(spacerBottom);
      }

      container.appendChild(fragment);
    };

    const handleScroll = this.throttle(() => {
      const scrollTop = container.scrollTop;
      const newStartIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - bufferCount
      );
      const newEndIndex = Math.min(
        items.length,
        newStartIndex + visibleCount + bufferCount * 2
      );

      if (newStartIndex !== startIndex || newEndIndex !== endIndex) {
        startIndex = newStartIndex;
        endIndex = newEndIndex;
        render();
      }
    }, 16); // ~60fps

    container.addEventListener("scroll", handleScroll);
    render();

    return {
      update: (newItems) => {
        items = newItems;
        startIndex = 0;
        endIndex = visibleCount + bufferCount;
        render();
      },
      destroy: () => {
        container.removeEventListener("scroll", handleScroll);
      },
    };
  }

  // Image optimization
  static optimizeImage(file, maxWidth = 1920, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw and compress
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(resolve, "image/jpeg", quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  // Bundle splitting simulation (for critical CSS)
  static loadCriticalCSS() {
    const criticalCSS = `
      .hero-section, .site-header, .main-content { 
        /* Critical above-the-fold styles */ 
      }
    `;

    const style = document.createElement("style");
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  }

  // Memory management
  static createMemoryPool(size = 100) {
    const pool = [];
    const inUse = new Set();

    return {
      get() {
        if (pool.length > 0) {
          const item = pool.pop();
          inUse.add(item);
          return item;
        }
        const newItem = {};
        inUse.add(newItem);
        return newItem;
      },

      release(item) {
        if (inUse.has(item)) {
          inUse.delete(item);
          if (pool.length < size) {
            // Clear the object
            Object.keys(item).forEach((key) => delete item[key]);
            pool.push(item);
          }
        }
      },

      clear() {
        pool.length = 0;
        inUse.clear();
      },
    };
  }

  // Intersection Observer for animations
  static createAnimationObserver(options = {}) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observerOptions = { ...defaultOptions, ...options };

    if ("IntersectionObserver" in window) {
      return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            entry.target.classList.remove("animate-out");
          } else {
            entry.target.classList.add("animate-out");
            entry.target.classList.remove("animate-in");
          }
        });
      }, observerOptions);
    }

    return null;
  }

  // Performance monitoring
  static measurePerformance(name, fn) {
    return async (...args) => {
      const start = performance.now();
      try {
        const result = await fn(...args);
        const end = performance.now();
        console.log(`Performance: ${name} took ${end - start} milliseconds`);
        return result;
      } catch (error) {
        const end = performance.now();
        console.log(
          `Performance: ${name} failed after ${end - start} milliseconds`
        );
        throw error;
      }
    };
  }

  // Web Workers for heavy computations
  static createWorker(workerFunction) {
    const blob = new Blob([`(${workerFunction})()`], {
      type: "application/javascript",
    });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);

    return {
      postMessage: (data) => worker.postMessage(data),
      onMessage: (callback) => (worker.onmessage = callback),
      terminate: () => {
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
      },
    };
  }

  // Critical resource hints
  static addResourceHints() {
    // DNS prefetch for external domains
    const dnsPrefetch = [
      "https://ofeyssipibktmbfebibo.supabase.co",
      "https://fonts.googleapis.com",
      "https://challenges.cloudflare.com",
    ];

    dnsPrefetch.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "dns-prefetch";
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect to critical domains
    const preconnect = ["https://ofeyssipibktmbfebibo.supabase.co"];

    preconnect.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = domain;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  }

  // Progressive Web App utilities
  static registerServiceWorker(swPath = "/sw.js") {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
          const registration = await navigator.serviceWorker.register(swPath);
          console.log("SW registered: ", registration);
        } catch (error) {
          console.log("SW registration failed: ", error);
        }
      });
    }
  }
}
