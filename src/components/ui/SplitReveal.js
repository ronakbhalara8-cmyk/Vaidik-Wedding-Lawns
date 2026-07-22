"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "@/lib/gsap";

export default function SplitReveal({
  children,
  type = "chars", // chars, words, lines
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  triggerHook = "top 90%",
  className = "",
  tag: Tag = "h2",
}) {
  const textRef = useRef(null);
  const isMountedRef = useRef(true);
  const splitRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    const el = textRef.current;
    if (!el) return;

    try {
      // Apply split-type library
      const split = new SplitType(el, { types: type });
      splitRef.current = split;

      const targets =
        type === "chars"
          ? split.chars
          : type === "words"
            ? split.words
            : split.lines;

      if (!targets || targets.length === 0) return;

      // Setup initial state: push slightly down and fade out
      gsap.set(targets, { opacity: 0, y: "40%" });

      const anim = gsap.to(targets, {
        opacity: 1,
        y: "0%",
        stagger: stagger,
        duration: duration,
        delay: delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: triggerHook,
          toggleActions: "play none none none",
        },
      });

      animRef.current = anim;
    } catch (error) {
      console.warn("SplitReveal animation error:", error);
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
        splitRef.current = null;
      } catch (error) {
        // Silently ignore cleanup errors
      }
    };
  }, [type, delay, duration, stagger, triggerHook]);

  return (
    <Tag ref={textRef} className={`${className} select-text`}>
      {children}
    </Tag>
  );
}
