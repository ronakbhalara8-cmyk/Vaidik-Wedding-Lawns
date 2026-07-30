"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import LazyVideo from "../ui/LazyVideo";

const venues = [
  {
    title: "The Strategist Hall",
    subtitle: "Corporate & Elite Gatherings",
    capacity: "Up to 2000 guests",
    bestFor: "Board meetings, strategy sessions",
    features: "Interactive displays, soundproofing, ambient lighting",
    style: "Sleek, corporate-focused, minimalist",
    video: "/videos/banquet-hall.mp4",
    image: "/images/about.webp",
    pillBg: "from-[#8d2c3f] to-[#813241]",
  },
  {
    title: "The Garden Courtyard",
    subtitle: "Open-Air Floral Elegance",
    capacity: "Up to 2000+ guests",
    bestFor: "Weddings, parties, and brunch events",
    features: "Manicured lawns, floral archways, lush greenery",
    style: "Romantic, nature-inspired",
    video: "/videos/slider-2.mp4",
    image: "",
    pillBg: "from-[#2A2724] to-[#813241]",
  },
  {
    title: "The Forever Pavilion",
    subtitle: "Grand Wedding Destination",
    capacity: "Up to 2000+ guests",
    bestFor: "Private weddings, grand functions",
    features: "Garden view, cozy layout, custom floral setups",
    style: "Intimate, nature-tucked, royal vibes",
    video: "/videos/slider-3.mp4",
    image: "",
    pillBg: "from-[#813241] to-[#2A2724]",
  },
];

export default function VenuesHorizontal() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const totalSlides = venues.length;

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${totalSlides * 100}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.8,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * totalSlides),
            totalSlides - 1
          );
          setActiveIndex(index);
        },
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-[#FDF2EF] text-[#2A2724] flex flex-col justify-between items-center py-4 sm:py-8 overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <div className="w-full container flex flex-col h-full justify-between z-10">
        {/* Header Section */}
        <div className="mb-6 sm:mb-12 text-center shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-[#8d2c3f]/10 border border-[#8d2c3f]/20 mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#DC873E] animate-pulse" />
            <span className="text-[9px] sm:text-xs font-semibold tracking-[0.2em] text-[#8d2c3f] uppercase">
              Exclusive Venues
            </span>
          </div>
          <h2 className="text-xl sm:text-4xl md:text-5xl font-serif-heading font-bold text-[#8d2c3f] tracking-wide">
            Our Venue Collections
          </h2>
        </div>

        {/* Dynamic Responsive Accordion Container */}
        <div className="relative w-full flex-1 flex flex-col md:flex-row gap-2 sm:gap-4 md:gap-5 overflow-hidden my-auto h-[calc(100vh-140px)] md:h-auto max-h-[85vh] md:max-h-[700px]">
          {venues.map((venue, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                className={`relative rounded-xl sm:rounded-2xl md:rounded-[32px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 select-none ${isActive
                  ? "flex-1 shadow-[0_15px_30px_rgba(141,44,63,0.2)] border border-[#DC873E]/40 min-h-0"
                  : "h-11 sm:h-14 md:h-full md:w-20 lg:w-24 opacity-90 hover:opacity-100 border border-[#8d2c3f]/20"
                  }`}
              >
                {/* 1. EXPANDED ACTIVE CARD */}
                {isActive ? (
                  <div className="relative w-full h-full bg-[#2A2724] flex flex-col justify-between p-3.5 sm:p-6 md:p-10 text-[#FDF2EF]">
                    {/* Video Layer */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                      <LazyVideo
                        src={venue.video}
                        poster={venue.image}
                        shouldLoad={isActive}
                        autoPlay
                        loop
                        muted
                        playsInline
                        rootMargin="900px"
                        className="w-full h-full object-cover opacity-35 scale-105"
                      />
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-[#2A2724] via-[#2A2724]/75 to-[#8d2c3f]/40" /> */}
                    </div>

                    {/* Top Badge */}
                    <div className="relative z-10 flex items-center justify-between gap-2 shrink-0">
                      <span className="px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[9px] sm:text-xs font-bold tracking-widest uppercase bg-[#2A2724]/80 backdrop-blur-md rounded-full border border-[#DC873E]/40 text-[#DC873E]">
                        {venue.subtitle}
                      </span>
                      <span className="font-mono text-[10px] sm:text-sm font-semibold tracking-widest text-[#DC873E]">
                        0{idx + 1} / 0{venues.length}
                      </span>
                    </div>

                    {/* Venue Information Container */}
                    <div className="relative z-10 space-y-2 sm:space-y-4 mt-auto pt-2 max-h-full">
                      <h3 className="font-serif-heading text-lg sm:text-3xl lg:text-5xl font-bold text-[#FDF2EF] tracking-wide leading-tight drop-shadow-md">
                        {venue.title}
                      </h3>

                      {/* Info Box */}
                      <div className="bg-[#2A2724]/85 backdrop-blur-xl p-3 sm:p-5 rounded-lg sm:rounded-2xl border border-[#DC873E]/30 shadow-2xl max-w-2xl">
                        <div className="grid grid-cols-2 gap-2 sm:gap-4 text-[11px] sm:text-sm text-[#FDF2EF]">
                          <div className="flex flex-col">
                            <span className="text-[9px] sm:text-xs text-[#DC873E] font-bold uppercase tracking-wider">
                              Capacity
                            </span>
                            <span className="text-[#FDF2EF] font-medium mt-0.5 truncate">
                              {venue.capacity}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] sm:text-xs text-[#DC873E] font-bold uppercase tracking-wider">
                              Style
                            </span>
                            <span className="text-[#FDF2EF] font-medium mt-0.5 truncate">
                              {venue.style}
                            </span>
                          </div>
                          <div className="flex flex-col col-span-2 border-t border-white/10 pt-1.5 sm:pt-2">
                            <span className="text-[9px] sm:text-xs text-[#DC873E] font-bold uppercase tracking-wider">
                              Best For
                            </span>
                            <span className="text-[#FDF2EF] font-medium mt-0.5 line-clamp-1 sm:line-clamp-none">
                              {venue.bestFor}
                            </span>
                          </div>
                          <div className="flex flex-col col-span-2 border-t border-white/10 pt-1.5 sm:pt-2">
                            <span className="text-[9px] sm:text-xs text-[#DC873E] font-bold uppercase tracking-wider">
                              Key Features
                            </span>
                            <span className="text-[#FDF2EF] font-medium mt-0.5 line-clamp-2 sm:line-clamp-none">
                              {venue.features}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 2. COLLAPSED PILL TAB (Mobile optimized) */
                  <div
                    className={`relative w-full h-full bg-gradient-to-b ${venue.pillBg} flex items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl md:rounded-[32px] cursor-pointer`}
                  >
                    {/* Desktop View */}
                    <div className="hidden md:flex flex-col items-center justify-between h-full py-6">
                      <span className="font-mono text-xs font-bold text-[#DC873E]">
                        0{idx + 1}
                      </span>
                      <div className="rotate-[-90deg] whitespace-nowrap text-[#FDF2EF] font-serif-heading font-semibold tracking-widest text-xs lg:text-sm uppercase drop-shadow-md">
                        {venue.title}
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DC873E]" />
                    </div>

                    {/* Mobile View Strip */}
                    <div className="md:hidden flex items-center justify-between w-full px-3 text-[#FDF2EF] font-serif-heading text-[11px] sm:text-xs uppercase tracking-wider font-semibold">
                      <span className="truncate pr-2">{venue.title}</span>
                      <span className="text-[10px] sm:text-xs text-[#DC873E] font-mono font-bold">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
