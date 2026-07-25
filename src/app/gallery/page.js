"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";

const galleryItems = [
  {
    video: "/videos/DJI_20260110201254_0112_D_stabilized.mp4",
    category: "lawns",
    alt: "Lawn evening setup"
  },
  {
    video: "/videos/DJI_20260110194459_0097_D_stabilized.mp4",
    category: "lawns",
    alt: "Lawn evening setup"
  },
  {
    video: "/videos/DJI_20260110194732_0099_D_stabilized.mp4",
    category: "lawns",
    alt: "Lawn evening setup"
  },
  {
    video: "/videos/DJI_20260110201254_0112_D_stabilized.mp4",
    category: "lawns",
    alt: "Lawn evening setup"
  },
  {
    video: "/videos/Dji_0767.mp4",
    category: "mandaps",
    alt: "Traditional royal mandap"
  },
  {
    video: "/videos/DJI_20260110194459_0097_D_stabilized.mp4",
    category: "mandaps",
    alt: "Traditional royal mandap"
  },
  {
    video: "/videos/DJI_20260110194732_0099_D_stabilized.mp4",
    category: "mandaps",
    alt: "Traditional royal mandap"
  },
  {
    video: "/videos/slider-1.mp4",
    category: "mandaps",
    alt: "Traditional royal mandap"
  },
  {
    video: "/videos/slider-2.mp4",
    category: "mandaps",
    alt: "Traditional royal mandap"
  },
  {
    video: "/videos/banquet-hall.mp4",
    category: "banquet",
    alt: "Elegant dining setups"
  }
];

// Video Component for Gallery
const GalleryVideo = ({ src, poster, alt, className = "" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log("Autoplay blocked:", error);
      });
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

// Full Screen Slider Video Component - Fixed version
const SliderVideo = ({ src, poster, alt, isActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      // When slide is active, play the video
      video.currentTime = 0;
      video.play().catch(error => {
        console.log("Autoplay blocked:", error);
      });
    } else {
      // When slide is not active, pause and reset
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [isActive, src]);

  return (
    <video
      ref={videoRef}
      className="max-h-[85vh] w-auto object-contain"
      poster={poster || ""}
      playsInline
      muted
      loop
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

// Full Screen Slider Component - Fixed
const FullScreenSlider = ({ items, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filter out items without image or video
  const validItems = items.filter(item => item.image || item.video);
  const totalItems = validItems.length;

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

  if (totalItems === 0) return null;

  const currentItem = validItems[currentIndex];
  const hasVideo = currentItem?.video ? true : false;
  const hasImage = currentItem?.image ? true : false;

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
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 z-10 text-white hover:text-gold-base transition-colors duration-300 p-2"
        aria-label="Previous"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 z-10 text-white hover:text-gold-base transition-colors duration-300 p-2"
        aria-label="Next"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-serif-heading text-sm tracking-wider">
        {currentIndex + 1} / {totalItems}
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          {hasVideo ? (
            <SliderVideo
              key={`video-${currentIndex}`} // Key changes when index changes
              src={currentItem.video}
              poster={currentItem.image || ""}
              alt={currentItem.alt}
              isActive={true}
            />
          ) : hasImage ? (
            <Image
              key={`image-${currentIndex}`} // Key changes when index changes
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

// Gallery Item Component
const GalleryItem = ({ item, index, onClick }) => {
  const hasVideo = item.video ? true : false;
  const hasImage = item.image ? true : false;

  if (!hasImage && !hasVideo) {
    return (
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold-base/15 group shadow-lg cursor-pointer bg-maroon-dark/10 flex items-center justify-center">
        <span className="text-maroon-dark/40 text-sm">No media</span>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold-base/15 group shadow-lg cursor-pointer"
      onClick={() => onClick(index)}
    >
      {hasVideo ? (
        <GalleryVideo
          src={item.video}
          poster={item.image || ""}
          alt={item.alt}
          className="transition-transform duration-700 group-hover:scale-105"
        />
      ) : hasImage ? (
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : null}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
        <span className="text-white/0 group-hover:text-white/80 text-sm tracking-wider uppercase font-serif-heading transition-all duration-300">
          Click to view
        </span>
      </div>
    </div>
  );
};

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [sliderOpen, setSliderOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const gridRef = useRef(null);

  const filteredItems =
    filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    setSliderOpen(true);
  };

  const handleSliderClose = () => {
    setSliderOpen(false);
  };

  useEffect(() => {
    const items = gridRef.current?.children;
    if (!items) return;

    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" }
    );
  }, [filter]);

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* Header */}
      <section className="relative h-[42vh] min-h-[320px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 brightness-[0.4] pointer-events-none"
          style={{ backgroundImage: "url('/images/wedding_lawn.png')" }}
        />
        <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />

        <div className="relative z-20 text-center max-w-2xl px-6">
          <FadeIn direction="down" duration={0.6}>
            <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase mb-2 block">
              Visual Journey
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            Luxury Gallery
          </SplitReveal>
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="py-14 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
        {/* Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {["all", "lawns", "mandaps", "banquet"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-serif-heading text-[10px] tracking-[0.25em] uppercase px-6 py-3.5 rounded-full border transition-all duration-300
                ${filter === cat
                  ? "bg-maroon-base text-gold-light border-gold-base shadow-md"
                  : "bg-white text-maroon-dark border-maroon-base/10 hover:border-gold-base/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <GalleryItem
              key={index}
              item={item}
              index={index}
              onClick={handleItemClick}
            />
          ))}
        </div>
      </section>

      {/* Full Screen Slider */}
      {sliderOpen && (
        <FullScreenSlider
          items={filteredItems}
          initialIndex={selectedIndex}
          onClose={handleSliderClose}
        />
      )}
    </div>
  );
}