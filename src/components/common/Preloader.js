"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMountedRef = useRef(true);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    try {
      // Prevent layout shift/scroll during preloading
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          if (isMountedRef.current) {
            setIsLoaded(true);
            document.body.style.overflow = ""; // restore scrolling
          }
        },
      });

      tlRef.current = tl;

      // Staggered text animations
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, letterSpacing: "0.4em" },
        { opacity: 1, y: 0, letterSpacing: "0.3em", duration: 1.0, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.7, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .to(lineRef.current, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, "-=0.8")
        // Slide up the entire screen overlay
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          delay: 0.4,
        });
    } catch (error) {
      console.warn("Preloader initialization error:", error);
      setIsLoaded(true);
    }

    return () => {
      isMountedRef.current = false;
      try {
        if (tlRef.current && typeof tlRef.current.kill === "function") {
          tlRef.current.kill();
        }
        tlRef.current = null;
        document.body.style.overflow = "";
      } catch (error) {
        console.warn("Preloader cleanup error:", error);
        document.body.style.overflow = "";
      }
    };
  }, []);

  if (isLoaded) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-maroon-dark z-[99999] flex flex-col items-center justify-center text-center"
    >
      <div className="flex flex-col gap-6 relative px-6 z-10">
        <h1
          ref={titleRef}
          className="font-serif-heading text-4xl md:text-7xl tracking-[0.3em] text-gold-base uppercase font-bold"
        >
          VAIDIK
        </h1>
        <p
          ref={subtitleRef}
          className="font-serif-sub italic text-lg md:text-3xl text-gold-light/80 tracking-wider"
        >
          Where Royal Dreams Meet Timeless Celebrations
        </p>

        {/* Delicate gold divider */}
        <div className="w-32 h-[1px] bg-gold-base/50 mx-auto mt-4 overflow-hidden relative">
          <div
            ref={lineRef}
            className="w-full h-full bg-gold-light origin-left scale-x-0"
          />
        </div>
      </div>

      {/* Absolute luxury background highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
