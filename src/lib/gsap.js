import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Set default settings
  gsap.defaults({
    ease: "power3.out",
    duration: 1.2,
    overwrite: "auto",
  });

  // Initialize GSAP context safely
  gsap.set("body", {}, 0);

  // Global Lenis cleanup
  window.cleanupLenis = () => {
    try {
      if (window.__lenis__) {
        try {
          window.__lenis__.destroy?.();
        } catch (e) {
          // Ignore
        }
        window.__lenis__ = null;
      }
    } catch (error) {
      // Ignore
    }
  };

  // Global cleanup function for page navigation
  window.cleanupGSAP = () => {
    try {
      // First cleanup Lenis
      window.cleanupLenis?.();

      // Get all active ScrollTriggers and kill them
      try {
        const triggers = ScrollTrigger.getAll();
        for (let i = triggers.length - 1; i >= 0; i--) {
          try {
            const trigger = triggers[i];
            if (trigger && typeof trigger.kill === "function") {
              trigger.kill(true);
            }
          } catch (e) {
            // Silently ignore individual trigger errors
          }
        }
      } catch (e) {
        // Ignore
      }

      // Clear all GSAP animations
      try {
        if (gsap.globalTimeline && typeof gsap.globalTimeline.clear === "function") {
          gsap.globalTimeline.clear();
        }
      } catch (e) {
        // Ignore
      }

      // Kill all tweens
      try {
        gsap.killTweensOf("*", false);
      } catch (e) {
        // Ignore
      }

      // Refresh ScrollTrigger to clear any lingering references
      try {
        ScrollTrigger.refresh();
      } catch (e) {
        // Ignore
      }
    } catch (error) {
      // Silently handle any cleanup errors
    }
  };

  // Suppress console errors during navigation
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  window._suppressAnimationErrors = true;

  console.error = function (...args) {
    if (window._suppressAnimationErrors) {
      const errorStr = String(args[0]);
      if (
        errorStr.includes("removeChild") ||
        errorStr.includes("Cannot read") ||
        errorStr.includes("is not a function") ||
        errorStr.includes("Cannot set properties") ||
        errorStr.includes("TypeError")
      ) {
        return; // Silently suppress
      }
    }
    return originalConsoleError.apply(console, args);
  };

  console.warn = function (...args) {
    if (window._suppressAnimationErrors) {
      const warnStr = String(args[0]);
      if (
        warnStr.includes("removeChild") ||
        warnStr.includes("Cannot read") ||
        warnStr.includes("is not a function")
      ) {
        return; // Silently suppress
      }
    }
    return originalConsoleWarn.apply(console, args);
  };

  // Global error handler to suppress animation/DOM cleanup errors
  const handleError = (event) => {
    const message = event.message || String(event);
    const isAnimationError =
      message.includes("removeChild") ||
      message.includes("Cannot read") ||
      message.includes("is not a function") ||
      message.includes("Cannot set properties") ||
      message.includes("_raf") ||
      message.includes("destroy");

    if (isAnimationError) {
      event.preventDefault();
      return false;
    }
  };

  window.addEventListener("error", handleError, true);

  // Handle unhandled promise rejections from animation libraries
  window.addEventListener("unhandledrejection", (event) => {
    if (
      String(event.reason).includes("removeChild") ||
      String(event.reason).includes("Cannot read") ||
      String(event.reason).includes("destroy")
    ) {
      event.preventDefault();
    }
  });
}

export { gsap, ScrollTrigger };
