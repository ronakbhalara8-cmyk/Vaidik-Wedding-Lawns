"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Heart, Camera, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import LazyVideo from "../ui/LazyVideo";

const galleryItems = [
  {
    video: "/videos/slider-1.mp4",
    alt: "Lawn Evening Lighting Setup",
    title: "Royal Lawn"
  },
  {
    video: "/videos/046A9853.mp4",
    alt: "Royal Canopy Mandap Decoration",
    title: "Vedic Mandap"
  },
  {
    video: "/videos/046A9856.mp4",
    alt: "Grand Chandelier Banquet Hall",
    title: "Grand Banquet"
  },
  {
    video: "/videos/046A9880.mp4",
    alt: "Outdoor Reception Lawn Area",
    title: "Starry Night"
  },
  {
    video: "/videos/046A9887.mp4",
    alt: "Fresh Floral Mandap Details",
    title: "Floral Canopy"
  },
  {
    video: "/videos/046A9892.mp4",
    alt: "Elegant Table Banquet Setting",
    title: "Luxury Dining"
  },
  {
    video: "/videos/slider-2.mp4",
    alt: "Lush Palm Gardens",
    title: "Manicured Palms"
  },
  {
    video: "/videos/slider-3.mp4",
    alt: "Golden Mandap Lighting",
    title: "Golden Mandap"
  },
  {
    video: "/videos/Video_20260514_170024.mp4",
    alt: "Crystal Chandelier View",
    title: "Crystal Hall"
  },
  {
    video: "/videos/Video 20260106 130800.mp4",
    alt: "Sunset Ceremony Setup",
    title: "Sunset Lawn"
  },
];

// Video Card Component for Circle - Shows video thumbnail with play button (no autoplay)
const VideoCard = ({ src, alt, className = "" }) => {
  return (
    <div className="relative w-full h-full bg-maroon-dark">
      <LazyVideo
        src={src}
        className={`w-full h-full object-cover ${className}`}
        playsInline
        muted
        preload="metadata"
      />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-base/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play className="w-5 h-5 sm:w-6 sm:h-6 text-maroon-dark ml-0.5" />
        </div>
      </div>
    </div>
  );
};

// Full Screen Slider Component - Video plays when clicked
const FullScreenSlider = ({ items, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const totalItems = items.length;

  const goToPrevious = useCallback(() => {
    if (isTransitioning || totalItems === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
    setIsVideoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, totalItems]);

  const goToNext = useCallback(() => {
    if (isTransitioning || totalItems === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
    setIsVideoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, totalItems]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  }, [goToNext, goToPrevious, onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  // Handle video when slide changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.pause();
      setIsVideoPlaying(false);
    }
  }, [currentIndex]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
        setIsVideoPlaying(false);
      } else {
        video.play().catch(() => { });
        setIsVideoPlaying(true);
      }
    }
  };

  const currentItem = items[currentIndex];
  const hasVideo = currentItem?.video ? true : false;

  if (!currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gold-base transition-colors duration-300"
        aria-label="Close slider"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 z-10 text-white hover:text-gold-base transition-colors duration-300 p-2"
        aria-label="Previous"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 z-10 text-white hover:text-gold-base transition-colors duration-300 p-2"
        aria-label="Next"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-serif-heading text-sm tracking-wider">
        {currentIndex + 1} / {totalItems}
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          {hasVideo && (
            <div
              className="relative max-h-[85vh] w-auto rounded-lg overflow-hidden cursor-pointer group"
              onClick={handleVideoClick}
            >
              <video
                ref={videoRef}
                key={`video-${currentIndex}`}
                className="max-h-[85vh] w-auto object-contain"
                playsInline
                muted={false}
                preload="metadata"
                controls={isVideoPlaying}
              >
                <source src={currentItem.video} type="video/mp4" />
              </video>

              {/* Play/Pause overlay button */}
              {!isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors">
                  <div className="w-20 h-20 rounded-full bg-gold-base/90 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-maroon-dark ml-1" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function InstaGallery() {
  const sectionRef = useRef(null);
  const ringRef = useRef(null);
  const cardsRef = useRef([]);
  const centerTextRef = useRef(null);
  const isMountedRef = useRef(true);

  // Slider state
  const [sliderOpen, setSliderOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleCardClick = (index) => {
    setSelectedIndex(index);
    setSliderOpen(true);
  };

  const handleSliderClose = () => {
    setSliderOpen(false);
  };

  useLayoutEffect(() => {
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
          {galleryItems.map((item, index) => {
            const hasVideo = item?.video ? true : false;

            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => handleCardClick(index)}
                className="absolute w-28 h-36 sm:w-36 sm:h-48 rounded-2xl overflow-hidden border border-gold-base/30 shadow-2xl shadow-black/80 bg-maroon-dark group cursor-pointer"
              >
                {hasVideo ? (
                  // Video Card - Shows video thumbnail with play button
                  <VideoCard
                    src={item.video}
                    alt={item.alt}
                  />
                ) : (
                  // Image Card
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 120px, 160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Screen Slider */}
      {sliderOpen && (
        <FullScreenSlider
          items={galleryItems}
          initialIndex={selectedIndex}
          onClose={handleSliderClose}
        />
      )}
    </section>
  );
}
