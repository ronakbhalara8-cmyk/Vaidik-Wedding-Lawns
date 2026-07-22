"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Magnetic({ children, speed = 0.3, range = 35 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      
      // Calculate cursor distance from the center of the button
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Check if mouse is within range
      const distance = Math.sqrt(x * x + y * y);
      if (distance < range) {
        gsap.to(el, {
          x: x * speed,
          y: y * speed,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Reset if out of range but cursor hasn't triggered mouseleave
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [speed, range]);

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}
