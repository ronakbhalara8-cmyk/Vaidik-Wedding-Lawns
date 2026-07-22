"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }) {
  const isMountedRef = useRef(true);
  const rafIdRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    // Small delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      if (!isMountedRef.current) return;

      try {
        // Initialize Lenis
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.5,
          infinite: false,
        });

        // Store globally for cleanup during navigation
        if (typeof window !== "undefined") {
          window.__lenis__ = lenis;
        }

        // Update ScrollTrigger on scroll
        lenis.on("scroll", () => {
          try {
            ScrollTrigger.update();
          } catch (error) {
            // Silent
          }
        });

        // Run custom requestAnimationFrame loop for Lenis
        function raf(time) {
          if (isMountedRef.current && lenis) {
            try {
              lenis.raf(time);
              rafIdRef.current = requestAnimationFrame(raf);
            } catch (error) {
              // Silent
            }
          }
        }
        rafIdRef.current = requestAnimationFrame(raf);
      } catch (error) {
        console.warn("SmoothScroll initialization error:", error);
      }
    }, 50);

    // Clean up
    return () => {
      isMountedRef.current = false;
      clearTimeout(initTimer);
      try {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        // Don't destroy Lenis here - let RouteChangeHandler handle it
        // This prevents errors during navigation
      } catch (error) {
        // Silent
      }
    };
  }, []);

  return <>{children}</>;
}
