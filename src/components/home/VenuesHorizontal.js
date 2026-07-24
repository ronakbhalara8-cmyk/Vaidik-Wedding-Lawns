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
    video: "/videos/slider-1.mp4",
    image: "/images/about.png",
    tag: "Outdoor Splendor",
  },
  {
    title: "The Golden Mandap Lawn",
    capacity: "300 - 1,000 Guests",
    description:
      "An intimate yet grand space designed specifically for traditional Vedic pheras. Features customizable layout capabilities and floral design backdrops.",
    video: "/videos/slider-2.mp4",
    image: "/images/venue-2.jpg",
    tag: "Sacred Ceremonies",
  },
  {
    title: "The Vaidik Banquet Hall",
    capacity: "200 - 800 Guests",
    description:
      "A luxury temperature-controlled indoor hall detailed with grand crystal chandeliers, velvet seating, and glass panels overlooking our landscaped gardens.",
    video: "/videos/slider-3.mp4",
    image: "/images/venue-3.jpg",
    tag: "Indoor Elegance",
  },
];

export default function VenuesHorizontal() {
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const isMountedRef = useRef(true);
  const videoRefs = useRef([]);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const container = containerRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!container || !scrollSection) return;

    // Handle video end event - restart video
    const handleVideoEnd = (e) => {
      const video = e.target;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => { });
      }
    };

    // Initialize all videos
    const initVideos = () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          video.muted = true;
          video.playsInline = true;
          video.loop = false;

          // Remove existing listeners to avoid duplicates
          video.removeEventListener('ended', handleVideoEnd);
          video.addEventListener('ended', handleVideoEnd);

          // Start all videos playing from beginning
          video.currentTime = 0;
          video.play().catch(() => { });
        }
      });
      isPlayingRef.current = true;
    };

    try {
      const ctx = gsap.context(() => {
        const getScrollAmount = () =>
          scrollSection.scrollWidth - window.innerWidth;

        gsap.to(scrollSection, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            invalidateOnRefresh: true,
            // Don't pause videos on scroll update
          },
        });
      }, container);

      // Initialize videos after a small delay
      const initTimer = setTimeout(initVideos, 200);

      // Handle resize
      const handleResize = () => {
        try {
          if (isMountedRef.current) {
            ScrollTrigger.refresh();
          }
        } catch (error) {
          // Silent fail
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        isMountedRef.current = false;
        clearTimeout(initTimer);
        try {
          window.removeEventListener("resize", handleResize);
          if (ctx && typeof ctx.revert === "function") {
            ctx.revert();
          }

          // Cleanup videos
          videoRefs.current.forEach((video) => {
            if (video) {
              video.removeEventListener('ended', handleVideoEnd);
              video.pause();
              video.currentTime = 0;
            }
          });
        } catch (error) {
          // Silent fail
        }
      };
    } catch (error) {
      return () => { };
    }
  }, []);

  // Video ref handler
  const handleVideoRef = (index) => (el) => {
    if (el) {
      videoRefs.current[index] = el;
    }
  };

  return (
    <section className="w-full relative overflow-hidden min-h-screen">
      <div
        ref={containerRef}
        className="relative bg-maroon-dark text-ivory lg:overflow-hidden"
      >
        {/* Horizontal scrolling wrapper */}
        <div
          ref={scrollSectionRef}
          className="flex flex-row h-screen w-max select-none"
        >
          {/* Intro Slide */}
          <div
            className="
              w-screen h-screen shrink-0 flex flex-col justify-center
              px-5 sm:px-8 md:px-12 lg:px-20 relative
              border-r border-gold-base/10
              bg-[radial-gradient(circle_at_left,rgba(74,18,26,0.5)_0%,transparent_60%)]
            "
          >
            <div className="max-w-xl">
              <span className="font-serif-heading text-xs tracking-[0.3em] text-gold-base uppercase inline-block border-b border-gold-base/20 pb-2 mb-6">
                Our Curated Venues
              </span>
              <h2 className="font-serif-heading text-4xl sm:text-6xl tracking-wide uppercase leading-tight mb-6 font-bold">
                Majestic Spaces Custom-Designed for Royalty
              </h2>
              <p className="text-sm md:text-base text-gold-light/70 leading-relaxed font-light mb-8">
                Every corner of Vaidik is crafted to evoke wonder. From majestic
                lawns kissed by soft evening breezes to architectural indoor
                halls with soaring ceilings, discover the perfect stage for your
                wedding.
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
              className="
                w-screen h-screen shrink-0 flex flex-col lg:flex-row
                items-center justify-between border-r border-gold-base/10
                bg-maroon-dark overflow-hidden
              "
            >
              {/* Visual Panel - Video */}
              <div
                className="
                  w-full lg:w-1/2 h-[45vh] lg:h-full relative overflow-hidden group
                "
              >
                <video
                  ref={handleVideoRef(idx)}
                  src={venue.video}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                  poster={venue.image}
                  loop={false}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-grad-overlay pointer-events-none" />

                {/* Badge */}
                <span className="absolute top-8 left-8 bg-maroon-dark/80 backdrop-blur-sm text-gold-base border border-gold-base/30 px-5 py-2 font-serif-heading text-[10px] tracking-[0.25em] uppercase rounded-full">
                  {venue.tag}
                </span>
              </div>

              {/* Info Panel */}
              <div
                className="
                  w-full lg:w-1/2 h-[55vh] lg:h-full flex flex-col justify-center
                  px-5 sm:px-8 md:px-12 lg:px-16 py-8 lg:pt-0 relative
                "
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.02)_0%,transparent_60%)] pointer-events-none" />
                <div className="max-w-md relative z-10">
                  <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase block">
                    VENUE CAPACITY: {venue.capacity}
                  </span>
                  <h3 className="font-serif-heading text-xl sm:text-2xl md:text-3xl pt-5 lg:text-4xl tracking-wide uppercase text-ivory mb-2 font-semibold">
                    {venue.title}
                  </h3>
                  <p className="text-sm md:text-base text-gold-light/60 leading-relaxed font-light mb-3">
                    {venue.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mb-14 sm:gap-4">
                    <Button
                      href="/book-visit"
                      variant="secondary"
                      className="w-full sm:w-auto px-6 py-3.5 text-[10px] tracking-[0.2em]"
                    >
                      Request Details
                    </Button>
                    <Button
                      href="/venues"
                      variant="outline"
                      className="w-full sm:w-auto px-6 py-3.5 text-[10px] tracking-[0.2em]"
                    >
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