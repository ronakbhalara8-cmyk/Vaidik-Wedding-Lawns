"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function ParallaxImage({
  src,
  alt,
  width,
  height,
  className = "",
  imageClassName = "",
  yOffset = 15, // Percent offset for animation
  priority = false,
  preload = false,
  ...props
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isMountedRef = useRef(true);
  const animRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img) return;

    try {
      // Create the parallax scrolling trigger
      const anim = gsap.fromTo(
        img,
        { yPercent: -yOffset },
        {
          yPercent: yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      animRef.current = anim;
    } catch (error) {
      console.warn("ParallaxImage animation error:", error);
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
  }, [yOffset]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Inner container scales slightly larger to cover container bounds during vertical shifts */}
      <div
        ref={imageRef}
        className="w-full h-[130%] absolute -top-[15%] left-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          preload={preload || priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          className={`object-cover transition-transform duration-700 hover:scale-105 ${imageClassName}`}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iOCIsIGhlaWdodD0iNSIsIGZpbGw9IiMyRDBCMEYiIC8+Cjwvc3ZnPg=="
        />
      </div>
    </div>
  );
}
