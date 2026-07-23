"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressBarRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    // Function to calculate scroll progress
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Calculate progress percentage (0 to 1)
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // Direct DOM manipulation for smooth updates
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
        progressBarRef.current.style.transformOrigin = 'left center';
      }
    };

    // Use requestAnimationFrame for smooth 60fps updates
    const handleScroll = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(updateScrollProgress);
    };

    // Initial update
    updateScrollProgress();

    // Add scroll listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #d4af37, #f5d77b, #d4af37)',
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
          willChange: 'transform',
        }}
      />
    </>
  );
}