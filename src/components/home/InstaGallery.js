"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Heart, Camera } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const galleryItems = [
  { image: "/images/wedding_lawn.png", alt: "Lawn Evening Lighting Setup", title: "Royal Lawn" },
  { image: "/images/wedding_mandap.png", alt: "Royal Canopy Mandap Decoration", title: "Vedic Mandap" },
  { image: "/images/reception_hall.png", alt: "Grand Chandelier Banquet Hall", title: "Grand Banquet" },
  { image: "/images/wedding_lawn.png", alt: "Outdoor Reception Lawn Area", title: "Starry Night" },
  { image: "/images/wedding_mandap.png", alt: "Fresh Floral Mandap Details", title: "Floral Canopy" },
  { image: "/images/reception_hall.png", alt: "Elegant Table Banquet Setting", title: "Luxury Dining" },
  { image: "/images/wedding_lawn.png", alt: "Lush Palm Gardens", title: "Manicured Palms" },
  { image: "/images/wedding_mandap.png", alt: "Golden Mandap Lighting", title: "Golden Mandap" },
  { image: "/images/reception_hall.png", alt: "Crystal Chandelier View", title: "Crystal Hall" },
  { image: "/images/wedding_lawn.png", alt: "Sunset Ceremony Setup", title: "Sunset Lawn" },
  { image: "/images/wedding_mandap.png", alt: "Traditional Phera Setup", title: "Sacred Pheras" },
  { image: "/images/reception_hall.png", alt: "Royal Stage Setup", title: "Royal Stage" },
];

export default function InstaGallery() {
  const sectionRef = useRef(null);
  const ringRef = useRef(null);
  const cardsRef = useRef([]);
  const centerTextRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    const section = sectionRef.current;
    const ring = ringRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const centerText = centerTextRef.current;

    if (!section || !ring || cards.length === 0) return;

    let ctx;

    try {
      ctx = gsap.context(() => {
        const total = cards.length;
        // Determine radius based on screen width
        const isMobile = window.innerWidth < 640;
        const isTablet = window.innerWidth < 1024;
        const radius = isMobile ? 180 : isTablet ? 250 : 330;

        // Step 1: Initial state - cards arranged in a horizontal row across screen
        cards.forEach((card, index) => {
          const initialX = (index - total / 2) * (isMobile ? 110 : 160);
          const initialY = isMobile ? -180 : -260;
          gsap.set(card, {
            x: initialX,
            y: initialY,
            rotation: (index - total / 2) * 5,
            scale: 0.85,
            opacity: 0.9,
          });
        });

        if (centerText) {
          gsap.set(centerText, { opacity: 0.2, scale: 0.8 });
        }

        // Create ScrollTrigger Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: "+=300%", // Smooth scroll distance for circle formation + rotation
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: Animate cards from horizontal row into a 360-degree CIRCLE
        cards.forEach((card, index) => {
          // Angle in radians around circle (starting from top)
          const angleRad = (index / total) * Math.PI * 2 - Math.PI / 2;
          const targetX = Math.cos(angleRad) * radius;
          const targetY = Math.sin(angleRad) * radius;
          const cardRotation = (angleRad * 180) / Math.PI + 90;

          tl.to(
            card,
            {
              x: targetX,
              y: targetY,
              rotation: cardRotation,
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            },
            0
          );
        });

        // Center text scale up & fade in as circle forms
        if (centerText) {
          tl.to(
            centerText,
            {
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              duration: 1.5,
            },
            0
          );
        }

        // Phase 2: Once circle is formed, rotate the entire circle ring 540 degrees (1.5 to 2 full turns)
        tl.to(ring, {
          rotation: 540,
          ease: "none",
          duration: 3,
        });

      }, section);

      // Delayed refresh to ensure accurate layout metrics
      setTimeout(() => {
        if (isMountedRef.current) {
          ScrollTrigger.refresh();
        }
      }, 200);

    } catch (error) {
      console.warn("InstaGallery circle animation error:", error);
    }

    return () => {
      isMountedRef.current = false;
      if (ctx && typeof ctx.revert === "function") {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section className="w-full relative overflow-hidden bg-maroon-dark">
      <div
        ref={sectionRef}
        className="relative w-full h-screen text-ivory flex items-center justify-center overflow-hidden select-none"
      >
        {/* Background ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.03)_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none z-0" />

        {/* Center Fixed Content inside Circle */}
        <div
          ref={centerTextRef}
          className="absolute z-20 text-center max-w-lg px-6 flex flex-col items-center pointer-events-none"
        >
          <span className="font-serif-heading text-[8px] sm:text-xs tracking-[0.35em] text-gold-base uppercase mb-3 bg-gold-base/10 border border-gold-base/20 rounded-full px-5 py-1.5 backdrop-blur-md">
            A Glimpse Into Events
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-4xl md:text-5xl tracking-wide uppercase font-extrabold text-gold-light text-shadow-premium leading-tight">
            Celebrated Moments
          </h2>
          <p className="font-sans text-sm sm:text-lg text-gold-light/75 mt-3 max-w-xs">
            Scroll to rotate through our luxury celebration showcase
          </p>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 pointer-events-auto inline-flex items-center gap-2 font-serif-heading text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gold-base hover:text-gold-light bg-maroon-dark/80 border border-gold-base/30 rounded-full px-5 py-2.5 backdrop-blur-md hover:border-gold-base transition-all duration-300 shadow-xl"
          >
            <Camera className="w-4 h-4 text-gold-base" /> Follow @VaidikLawns
          </a>
        </div>

        {/* Rotating Circle Container */}
        <div
          ref={ringRef}
          className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] flex items-center justify-center z-10"
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute w-28 h-36 sm:w-36 sm:h-48 rounded-2xl overflow-hidden border border-gold-base/30 shadow-2xl shadow-black/80 bg-maroon-dark group cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 120px, 160px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-maroon-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center">
                <div>
                  <Heart className="w-5 h-5 text-gold-base mx-auto mb-1 fill-gold-base/30" />
                  <span className="font-serif-heading text-[9px] tracking-[0.15em] uppercase text-gold-light block font-semibold">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
