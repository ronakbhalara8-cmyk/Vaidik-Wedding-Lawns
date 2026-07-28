"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Heart, Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const galleryItems = [
  {
    image: null,
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218039/slider-1_bpuqx2.mp4",
    alt: "Lawn Evening Lighting Setup",
    title: "Royal Lawn"
  },
  {
    image: null,
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218012/046A9853_a2sm4q.mp4",
    alt: "Royal Canopy Mandap Decoration",
    title: "Vedic Mandap"
  },
  {
    image: null,
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218008/046A9856_ynzogd.mp4",
    alt: "Grand Chandelier Banquet Hall",
    title: "Grand Banquet"
  },
  {
    image: null,
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218013/046A9880_kdiibj.mp4",
    alt: "Outdoor Reception Lawn Area",
    title: "Starry Night"
  },
  {
    image: null,
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218006/046A9887_jlx390.mp4",
    alt: "Fresh Floral Mandap Details",
    title: "Floral Canopy"
  },
  {
    image: null,
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218012/046A9892_svithw.mp4",
    alt: "Elegant Table Banquet Setting",
    title: "Luxury Dining"
  },
  {
    image: null,
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218032/slider-2_nspfct.mp4",
    alt: "Lush Palm Gardens",
    title: "Manicured Palms"
  },
  {
    image: null,
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218037/slider-3_sybagb.mp4",
    alt: "Golden Mandap Lighting",
    title: "Golden Mandap"
  },
  {
    image: null,
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218098/Video_20260514_170024_ocferh.mp4",
    alt: "Crystal Chandelier View",
    title: "Crystal Hall"
  },
  {
    image: null,
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218046/Video_20260106_130800_jopmls.mp4",
    alt: "Sunset Ceremony Setup",
    title: "Sunset Lawn"
  },
];

// Video Card Component for Circle - No play button
const VideoCard = ({ src, poster, alt, className = "" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => { });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover ${className}`}
      poster={poster || ""}
      playsInline
      muted
      loop
      autoPlay
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

// Full Screen Slider Component
const FullScreenSlider = ({ items, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);

  const totalItems = items.length;

  const goToPrevious = () => {
    if (isTransitioning || totalItems === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = () => {
    if (isTransitioning || totalItems === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  // Handle video playback when slide changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => { });
    }
  }, [currentIndex]);

  const currentItem = items[currentIndex];
  const hasVideo = currentItem?.video ? true : false;
  const hasImage = currentItem?.image ? true : false;

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
          {hasVideo ? (
            <video
              ref={videoRef}
              key={`video-${currentIndex}`}
              className="max-h-[85vh] w-auto object-contain rounded-lg"
              poster={currentItem.image || ""}
              playsInline
              muted
              loop
              controls
              preload="metadata"
            >
              <source src={currentItem.video} type="video/mp4" />
            </video>
          ) : hasImage ? (
            <Image
              key={`image-${currentIndex}`}
              src={currentItem.image}
              alt={currentItem.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          ) : null}
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
                  // Video Card - No play button
                  <VideoCard
                    src={item.video}
                    poster={item.image || ""}
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

                {/* Hover overlay - Same for both images and videos */}
                <div className="absolute inset-0 bg-maroon-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center">
                  <div>
                    <Heart className="w-5 h-5 text-gold-base mx-auto mb-1 fill-gold-base/30" />
                    <span className="font-serif-heading text-[9px] tracking-[0.15em] uppercase text-gold-light block font-semibold">
                      {item.title}
                    </span>
                  </div>
                </div>
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
