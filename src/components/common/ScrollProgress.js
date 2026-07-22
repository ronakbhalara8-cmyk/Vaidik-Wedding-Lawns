"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollProgress() {
  const progressBarRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const el = progressBarRef.current;
    if (!el) return;

    try {
      const anim = gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        }
      );

      animRef.current = anim;
    } catch (error) {
      console.warn("ScrollProgress initialization error:", error);
    }

    return () => {
      try {
        const anim = animRef.current;
        if (anim) {
          if (anim.scrollTrigger) {
            anim.scrollTrigger.kill();
          }
          anim.kill();
          animRef.current = null;
        }
      } catch (error) {
        console.warn("ScrollProgress cleanup error:", error);
      }
    };
  }, []);

  return (
    <div
      ref={progressBarRef}
      className="fixed top-0 left-0 right-0 h-[4px] bg-grad-gold z-[9999] origin-left pointer-events-none"
    />
  );
}
