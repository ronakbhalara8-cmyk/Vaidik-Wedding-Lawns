"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import Button from "../ui/Button";

const VIDEOS = [
  "/videos/DJI_20260110213956_0015_D_stabilized.mp4",
  "/videos/DJI_20260110213956_0016_D_stabilized.mp4",
  "/videos/video_20260110_225342.mp4",
  "/videos/DJI_20260110194459_0097_D_stabilized.mp4",
  "/videos/DJI_20260110194732_0099_D_stabilized.mp4",
  "/videos/DJI_20260110201254_0112_D_stabilized.mp4",
];

const SLIDE_CONTENT = [
  {
    subtitle: "The Quintessential Luxury Lawn",
    title: "Where Royal Dreams Meet Timeless Celebrations",
    description: "Celebrate your grand union amidst lush manicured lawns, majestic mandaps, and curated hospitality crafted for royals.",
    buttonText: "Schedule Private Tour",
    buttonLink: "/book-visit",
    secondButtonText: "Explore Our Lawns",
    secondButtonLink: "/venues",
    nextPreview: "Celebrate Love"
  },
  {
    subtitle: "Celebrate Love Under Open Skies",
    title: "Where Every Sunset Tells a Love Story",
    description: "Our scenic outdoor spaces offer the perfect backdrop for unforgettable weddings and romantic ceremonies.",
    buttonText: "Explore the Venue",
    buttonLink: "/venues",
    secondButtonText: "View Gallery",
    secondButtonLink: "/gallery",
    nextPreview: "Nature's Grandeur"
  },
  {
    subtitle: "A Canvas of Natural Beauty",
    title: "Nature's Grandeur Meets Elegant Celebrations",
    description: "Immerse yourself in the serenity of our lush landscapes, where every corner is designed to create magical moments.",
    buttonText: "Discover More",
    buttonLink: "/packages",
    secondButtonText: "Contact Us",
    secondButtonLink: "/contact",
    nextPreview: "Unforgettable"
  },
  {
    subtitle: "Where Every Detail Matters",
    title: "Crafting Unforgettable Experiences",
    description: "From exquisite floral arrangements to personalized decor, we transform your vision into reality with meticulous attention.",
    buttonText: "View Packages",
    buttonLink: "/packages",
    secondButtonText: "Book Now",
    secondButtonLink: "/book-visit",
    nextPreview: "Your Dream"
  },
  {
    subtitle: "Your Dream Wedding Awaits",
    title: "A Celebration of Love, Light & Laughter",
    description: "Join us in creating the wedding of your dreams. Our dedicated team ensures every moment is picture-perfect.",
    buttonText: "Plan Your Wedding",
    buttonLink: "/services",
    secondButtonText: "Get in Touch",
    secondButtonLink: "/contact",
    nextPreview: "Timeless Elegance"
  },
  {
    subtitle: "Timeless Elegance, Modern Luxury",
    title: "Where Traditions Meet Contemporary Grandeur",
    description: "Experience the perfect blend of classic charm and modern amenities. Our venues are designed to host celebrations.",
    buttonText: "Explore Venues",
    buttonLink: "/venues",
    secondButtonText: "Learn More",
    secondButtonLink: "/about",
    nextPreview: "Where Royal Dreams"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const videoRefs = useRef([]);
  const contentRef = useRef(null);
  const timerRef = useRef(null);

  const currentContent = SLIDE_CONTENT[currentSlide];
  const nextIndex = (currentSlide + 1) % SLIDE_CONTENT.length;
  const nextContent = SLIDE_CONTENT[nextIndex];

  // GSAP Text Animation
  const animateContent = useCallback(() => {
    if (!contentRef.current) return;
    const elements = contentRef.current.querySelectorAll(".slide-anim-item");

    gsap.killTweensOf(elements);
    gsap.fromTo(
      elements,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }
    );
  }, []);

  // Play video seamlessly
  const playVideoAtIndex = useCallback((index) => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;

      if (i === index) {
        // Reset and play active video from 0s instantly
        vid.currentTime = 0;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play policy safety catch
          });
        }
      } else {
        // Pause inactive videos to save CPU & Network bandwidth
        vid.pause();
      }
    });
  }, []);

  // Slide navigation
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    playVideoAtIndex(index);
  }, [playVideoAtIndex]);

  // Initial load
  useEffect(() => {
    playVideoAtIndex(0);
  }, [playVideoAtIndex]);

  // Auto-play timer
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      goToSlide(nextIndex);
    }, 8000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlide, nextIndex, goToSlide]);

  // Trigger GSAP on slide change
  useEffect(() => {
    animateContent();
  }, [currentSlide, animateContent]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-maroon-dark text-ivory">

      {/* Background Videos (Always pre-mounted for instant playback) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-black">
        {VIDEOS.map((src, index) => {
          const isCurrent = index === currentSlide;

          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isCurrent ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={src}
                muted
                loop
                playsInline
                preload={index === 0 || index === 1 ? "auto" : "metadata"}
                onLoadedMetadata={(e) => {
                  if (index === 0) {
                    e.currentTarget.currentTime = 0;
                  }
                }}
                className="w-full h-full object-cover brightness-[0.45] will-change-transform"
              />
            </div>
          );
        })}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_80%)] pointer-events-none z-10" />

      {/* Next Slide Preview Button */}
      <div
        className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-30 cursor-pointer group"
        onClick={() => goToSlide(nextIndex)}
      >
        <div className="relative overflow-hidden rounded-lg border border-gold-base/20 w-32 sm:w-36 h-18 sm:h-20 bg-black/70 backdrop-blur-md p-2.5 shadow-2xl transition-all duration-300 group-hover:border-gold-base/50">
          <p className="text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-gold-base/70 font-serif-heading">
            Next
          </p>
          <h4 className="text-[10px] sm:text-[11px] font-serif-heading text-ivory leading-tight mt-0.5 truncate group-hover:text-gold-base transition-colors">
            {nextContent.nextPreview}
          </h4>
          <span className="text-[8px] text-gold-base/40 font-sans mt-2 block">
            {nextIndex + 1} of {VIDEOS.length}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-20 flex flex-col items-center justify-center w-full"
      >
        {/* Subtitle */}
        <div className="slide-anim-item opacity-0 mb-2 sm:mb-3">
          <span className="font-serif-heading text-[10px] sm:text-xs md:text-sm tracking-[0.3em] text-gold-base uppercase inline-block border-b border-gold-base/30 pb-1">
            {currentContent.subtitle}
          </span>
        </div>

        {/* Title */}
        <h1 className="slide-anim-item opacity-0 font-serif-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory uppercase leading-[1.15] mb-3 sm:mb-4 font-bold tracking-wide">
          {currentContent.title}
        </h1>

        {/* Description */}
        <div className="slide-anim-item opacity-0 max-w-xl lg:max-w-2xl mb-6 sm:mb-8">
          <p className="font-sans text-xs sm:text-sm md:text-base text-gold-light/80 leading-relaxed font-light">
            {currentContent.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="slide-anim-item opacity-0 flex flex-col sm:flex-row gap-3 items-center justify-center w-full sm:w-auto">
          <Button
            href={currentContent.buttonLink}
            variant="secondary"
            className="px-6 py-3 text-[10px] sm:text-[11px] tracking-[0.2em] w-full sm:w-auto text-center"
          >
            {currentContent.buttonText}
          </Button>
          <Button
            href={currentContent.secondButtonLink}
            variant="outline"
            className="px-6 py-3 text-[10px] sm:text-[11px] tracking-[0.2em] w-full sm:w-auto text-center"
          >
            {currentContent.secondButtonText}
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="font-serif-heading text-[8px] tracking-[0.25em] uppercase text-gold-base/60 animate-pulse">
            Scroll To Experience
          </span>
          <div className="w-[1px] h-6 bg-gold-base/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gold-base animate-scroll-indicator" />
          </div>
        </div>
      </div>
    </section>
  );
}