"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function FadeIn({
  children,
  direction = "up", // up, down, left, right, none
  delay = 0,
  duration = 1.0,
  distance = 40,
  triggerHook = "top 90%",
  className = "",
  stagger = 0.15,
  trigger = null, // Custom trigger element selector or ref
}) {
  const containerRef = useRef(null);
  const isMountedRef = useRef(true);
  const animRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    const el = containerRef.current;
    if (!el) return;

    try {
      let x = 0;
      let y = 0;
      if (direction === "up") y = distance;
      if (direction === "down") y = -distance;
      if (direction === "left") x = distance;
      if (direction === "right") x = -distance;

      const targets = el.children;
      if (targets.length === 0) return;

      // Set initial hidden state
      gsap.set(targets, {
        opacity: 0,
        x: x,
        y: y,
      });

      const anim = gsap.to(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        stagger: stagger,
        duration: duration,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trigger || el,
          start: triggerHook,
          toggleActions: "play none none none",
        },
      });

      animRef.current = anim;
    } catch (error) {
      console.warn("FadeIn animation error:", error);
    }

    return () => {
      isMountedRef.current = false;
      try {
        const anim = animRef.current;
        if (anim && typeof anim.kill === "function") {
          if (anim.scrollTrigger && typeof anim.scrollTrigger.kill === "function") {
            anim.scrollTrigger.kill();
          }
          anim.kill();
        }
        animRef.current = null;
      } catch (error) {
        // Silently ignore cleanup errors
      }
    };
  }, [direction, delay, duration, distance, triggerHook, stagger, trigger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
