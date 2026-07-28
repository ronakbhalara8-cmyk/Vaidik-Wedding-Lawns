"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Button from "../ui/Button";

const venues = [
  {
    title: "The Strategist Hall",
    capacity: "Up to 90 guests",
    bestFor: "Board meetings, strategy sessions, corporate",
    features: "Interactive displays, soundproofing music",
    style: "Sleek, corporate-focused, minimalist",
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218039/slider-1_bpuqx2.mp4",
    image: "/images/about.png",
  },
  {
    title: "The Garden Courtyard",
    capacity: "Up to 200 guests",
    bestFor: "Weddings, parties, and brunch parties",
    features: "Manicured lawns, floral archways, lush greenery",
    style: "Romantic, nature-inspired",
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218032/slider-2_nspfct.mp4",
    image: "/images/venue-2.jpg",
  },
  {
    title: "The Forever Pavilion",
    capacity: "Up to 800 guests",
    bestFor: "Private weddings, pre-wedding functions",
    features: "Garden view, cozy layout, custom floral, parties",
    style: "Intimate, nature-tucked, boho vibes",
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218037/slider-3_sybagb.mp4",
    image: "/images/venue-3.jpg",
  },
];

export default function VenuesHorizontal() {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const slides = slidesRef.current.filter(Boolean);
      const totalSlides = slides.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalSlides * 100}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      slides.forEach((slide, i) => {
        if (!slide || i === 0) return;

        const prevSlide = slides[i - 1];
        if (!prevSlide) return;

        const prevMedia = prevSlide.querySelector(".slide-media");
        const prevCard = prevSlide.querySelector(".info-card");

        const currentMedia = slide.querySelector(".slide-media");
        const currentCard = slide.querySelector(".info-card");

        // Set initial state for incoming current slide
        gsap.set(currentMedia, { filter: "blur(0px)", opacity: 1, scale: 1 });

        tl.to(
          prevMedia,
          {
            filter: "blur(12px)",
            scale: 0.9,
            opacity: 0.4,
            duration: 1,
            ease: "power1.inOut",
          },
          `slide-${i}`
        )
          .to(
            prevCard,
            {
              opacity: 0,
              y: -20,
              duration: 0.5,
            },
            `slide-${i}`
          )
          .fromTo(
            slide,
            { xPercent: 100 },
            { xPercent: 0, duration: 1, ease: "power1.inOut" },
            `slide-${i}`
          )
          .fromTo(
            currentCard,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
            },
            "-=0.3"
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen h-[100dvh] bg-[var(--color-maroon-dark)] overflow-hidden relative flex items-center justify-center"
    >
      <div className="relative w-full h-full p-3 sm:p-6 md:p-14 pt-20 sm:pt-24 md:pt-28 flex items-center justify-center">
        {/* Outer Section Frame */}
        <div className="relative w-full h-full max-w-7xl rounded-2xl md:rounded-3xl shadow-2xl border border-[var(--color-gold-base)]/20 bg-black overflow-hidden">
          {venues.map((venue, idx) => (
            <div
              key={idx}
              ref={(el) => {
                slidesRef.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full flex items-end justify-end"
              style={{ zIndex: idx + 1 }}
            >
              {/* Video Background - Removed static blur-md and opacity-60 so incoming videos are crisp */}
              <div className="slide-media absolute inset-0 w-full h-full transition-all duration-300">
                <video
                  src={venue.video}
                  poster={venue.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Soft Gradient Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /> */}
              </div>

              {/* White Overlay Content Card */}
              <div
                className={`info-card relative z-10 m-3 sm:m-6 md:m-8 w-full max-w-xs sm:max-w-md lg:max-w-lg bg-white/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-7 text-[var(--color-dark-brown)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[var(--color-gold-light)]/60 transform transition-all ${idx === 0
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                  }`}
              >
                {/* Accent Tag */}
                <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 mb-2 sm:mb-3 text-[10px] sm:text-xs font-bold tracking-widest text-[var(--color-maroon-dark)] uppercase bg-[var(--color-ivory)] rounded-full border border-[var(--color-gold-light)]">
                  Exclusive Venue
                </span>

                {/* Title */}
                <div className="border-b border-[var(--color-gold-base)]/30 pb-2 sm:pb-3 mb-3 sm:mb-4">
                  <h3 className="font-serif-heading text-lg sm:text-2xl lg:text-3xl font-bold tracking-wide text-[var(--color-maroon-dark)] leading-snug">
                    {venue.title}
                  </h3>
                </div>

                {/* Venue Details */}
                <div className="space-y-2 text-xs sm:text-sm text-[var(--color-charcoal)] font-sans">
                  <div className="flex items-start justify-start gap-2 sm:gap-2.5">
                    <span className="font-bold text-[var(--color-maroon-base)] min-w-[65px] sm:min-w-[75px] shrink-0">
                      Capacity:
                    </span>
                    <span className="font-medium text-slate-700">
                      {venue.capacity}
                    </span>
                  </div>

                  <div className="flex items-start justify-start gap-2 sm:gap-2.5">
                    <span className="font-bold text-[var(--color-maroon-base)] min-w-[65px] sm:min-w-[75px] shrink-0">
                      Best for:
                    </span>
                    <span className="font-medium text-slate-700">
                      {venue.bestFor}
                    </span>
                  </div>

                  <div className="flex items-start justify-start gap-2 sm:gap-2.5">
                    <span className="font-bold text-[var(--color-maroon-base)] min-w-[65px] sm:min-w-[75px] shrink-0">
                      Features:
                    </span>
                    <span className="font-medium text-slate-700">
                      {venue.features}
                    </span>
                  </div>

                  <div className="flex items-start justify-start gap-2 sm:gap-2.5">
                    <span className="font-bold text-[var(--color-maroon-base)] min-w-[65px] sm:min-w-[75px] shrink-0">
                      Style:
                    </span>
                    <span className="font-medium text-slate-700">
                      {venue.style}
                    </span>
                  </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="w-full h-1 bg-gradient-to-r from-[var(--color-maroon-dark)] via-[var(--color-orange-warm)] to-[var(--color-gold-light)] rounded-full mt-4 sm:mt-5 opacity-80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
