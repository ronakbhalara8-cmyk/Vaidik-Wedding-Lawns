"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Button from "../ui/Button";

const venues = [
  {
    title: "The Royal Grand Lawn",
    capacity: "800 - 2,500 Guests",
    description:
      "An expansive, pristine green lawn framed by majestic palms and soft ambient lighting. Perfectly suited for grand, starry-sky receptions and massive celebrations.",
    image: "/images/wedding_lawn.png",
    tag: "Outdoor Splendor",
  },
  {
    title: "The Golden Mandap Lawn",
    capacity: "300 - 1,000 Guests",
    description:
      "An intimate yet grand space designed specifically for traditional Vedic pheras. Features customizable layout capabilities and floral design backdrops.",
    image: "/images/wedding_mandap.png",
    tag: "Sacred Ceremonies",
  },
  {
    title: "The Vaidik Banquet Hall",
    capacity: "200 - 800 Guests",
    description:
      "A luxury temperature-controlled indoor hall detailed with grand crystal chandeliers, velvet seating, and glass panels overlooking our landscaped gardens.",
    image: "/images/reception_hall.png",
    tag: "Indoor Elegance",
  },
];

export default function VenuesHorizontal() {
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const isMountedRef = useRef(true);
  const ctxRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    const container = containerRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!container || !scrollSection) return;

    try {
      // Check if on desktop screen size before enabling horizontal scroll pin
      const mediaQuery = window.matchMedia("(min-width: 1024px)");

      const initScroll = () => {
        if (!isMountedRef.current) return;

        try {
          const ctx = gsap.context(() => {
            gsap.to(scrollSection, {
              x: () => -(scrollSection.scrollWidth - window.innerWidth),
              ease: "none",
              scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 0.8,
                start: "top top",
                end: () => `+=${scrollSection.scrollWidth - window.innerWidth}`,
                invalidateOnRefresh: true,
              },
            });
          }, container);

          ctxRef.current = ctx;

          // Delayed refresh after render to guarantee exact scrollWidth
          setTimeout(() => {
            if (isMountedRef.current) {
              ScrollTrigger.refresh();
            }
          }, 200);
        } catch (error) {
          console.warn("VenuesHorizontal scroll animation error:", error);
        }
      };

      if (mediaQuery.matches) {
        initScroll();
      }

      // Refresh scrolltrigger on resize
      const handleResize = () => {
        try {
          if (isMountedRef.current) {
            ScrollTrigger.refresh();
          }
        } catch (error) {
          console.warn("ScrollTrigger refresh error:", error);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        isMountedRef.current = false;
        try {
          window.removeEventListener("resize", handleResize);
          if (ctxRef.current && typeof ctxRef.current.revert === "function") {
            ctxRef.current.revert();
          }
          ctxRef.current = null;
        } catch (error) {
          console.warn("VenuesHorizontal cleanup error:", error);
        }
      };
    } catch (error) {
      console.warn("VenuesHorizontal initialization error:", error);
      return () => { };
    }
  }, []);

  return (
    <section className="w-full relative overflow-hidden">
      <div
        ref={containerRef}
        className="relative bg-maroon-dark text-ivory lg:overflow-hidden"
      >
        {/* Horizontal scrolling wrapper */}
        <div
          ref={scrollSectionRef}
          className="flex flex-col lg:flex-row lg:h-screen lg:w-[320vw] xl:w-[280vw] select-none"
        >
          {/* Intro Slide */}
          <div className="w-full lg:w-[80vw] h-screen shrink-0 flex flex-col justify-center px-6 md:px-20 relative border-r border-gold-base/10 bg-[radial-gradient(circle_at_left,rgba(74,18,26,0.5)_0%,transparent_60%)]">
            <div className="max-w-xl">
              <span className="font-serif-heading text-xs tracking-[0.3em] text-gold-base uppercase inline-block border-b border-gold-base/20 pb-2 mb-6">
                Our Curated Venues
              </span>
              <h2 className="font-serif-heading text-4xl sm:text-6xl tracking-wide uppercase leading-tight mb-6 font-bold">
                Majestic Spaces Custom-Designed for Royalty
              </h2>
              <p className="text-sm md:text-base text-gold-light/70 leading-relaxed font-light mb-8">
                Every corner of Vaidik is crafted to evoke wonder. From majestic lawns kissed by soft evening breezes to architectural indoor halls with soaring ceilings, discover the perfect stage for your wedding.
              </p>
              <div className="hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gold-base/30 flex items-center justify-center animate-bounce">
                    <span className="text-gold-base text-xs">→</span>
                  </div>
                  <span className="font-serif-heading text-[10px] tracking-[0.2em] uppercase text-gold-base/70">
                    Scroll down to navigate spaces
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Venue Slides */}
          {venues.map((venue, idx) => (
            <div
              key={idx}
              className="w-full lg:w-[80vw] h-screen shrink-0 flex flex-col lg:flex-row items-center justify-between border-r border-gold-base/10 bg-maroon-dark overflow-hidden"
            >
              {/* Visual Panel */}
              <div className="w-full lg:w-[45vw] h-1/2 lg:h-full relative overflow-hidden group">
                <Image
                  src={venue.image}
                  alt={venue.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-grad-overlay pointer-events-none" />
                {/* Badge */}
                <span className="absolute top-8 left-8 bg-maroon-dark/80 backdrop-blur-sm text-gold-base border border-gold-base/30 px-5 py-2 font-serif-heading text-[10px] tracking-[0.25em] uppercase rounded-full">
                  {venue.tag}
                </span>
              </div>

              {/* Info Panel */}
              <div className="w-full lg:w-[35vw] h-1/2 lg:h-full flex flex-col justify-center px-6 md:px-16 py-12 lg:py-0 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.02)_0%,transparent_60%)] pointer-events-none" />
                <div className="max-w-md relative z-10">
                  <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase block mb-3">
                    VENUE CAPACITY: {venue.capacity}
                  </span>
                  <h3 className="font-serif-heading text-3xl md:text-4xl tracking-wide uppercase text-ivory mb-6 font-semibold">
                    {venue.title}
                  </h3>
                  <p className="text-sm md:text-base text-gold-light/60 leading-relaxed font-light mb-8">
                    {venue.description}
                  </p>
                  <div className="flex gap-4">
                    <Button href="/book-visit" variant="secondary" className="px-6 py-3.5 text-[9px] tracking-[0.2em]">
                      Request Details
                    </Button>
                    <Button href="/venues" variant="outline" className="px-6 py-3.5 text-[9px] tracking-[0.2em]">
                      View Gallery
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
