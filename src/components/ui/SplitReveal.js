"use client";

import { useEffect, useRef } from "react";
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
  const animRef = useRef(null);

  const text = typeof children === "string" || typeof children === "number" ? String(children) : "";
  const parts = type === "chars" ? Array.from(text) : text.trim().split(/\s+/);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-split-reveal-part]");
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: "40%" });

    const anim = gsap.to(targets, {
      opacity: 1,
      y: "0%",
      stagger,
      duration,
      delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: triggerHook,
        toggleActions: "play none none none",
      },
    });

    animRef.current = anim;

    return () => {
      if (animRef.current?.scrollTrigger) {
        animRef.current.scrollTrigger.kill();
      }
      animRef.current?.kill();
      animRef.current = null;
    };
  }, [type, delay, duration, stagger, triggerHook, text]);

  return (
    <Tag ref={textRef} className={`${className} select-text`}>
      {parts.map((part, index) => (
        <span
          key={`${part}-${index}`}
          data-split-reveal-part
          className="inline-block"
        >
          {type === "chars" ? (part === " " ? "\u00A0" : part) : `${part}\u00A0`}
        </span>
      ))}
    </Tag>
  );
}
