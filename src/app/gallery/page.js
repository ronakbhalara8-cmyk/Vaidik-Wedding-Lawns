"use client";

import { useState, useEffect, useRef, memo, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";

const galleryItems = [
  {
    video: "/videos/046A9880.mp4",
    category: "Wedding",
    alt: "Lawn evening setup",
  },
  {
    video: "/videos/046A9892.mp4",
    category: "Reception",
    alt: "Lawn evening setup",
  },
  {
    video: "/videos/slider-2.mp4",
    category: "Haldi",
    alt: "Lawn evening setup",
  },
  {
    video: "/videos/Video_20260514_170024.mp4",
    category: "Wedding",
    alt: "Lawn evening setup",
  },
  {
    video: "/videos/banquet-hall.mp4",
    category: "Reception",
    alt: "Traditional royal mandap",
  },
  {
    video: "/videos/Video 20260106 130800.mp4",
    category: "Mehendi",
    alt: "Traditional royal mandap",
  },
  {
    video: "/videos/Wedding-View-5.mp4",
    category: "Wedding",
    alt: "Lawn evening setup",
  },
  {
    video: "/videos/DJI_20260110194732_0099_D_stabilized.mp4",
    category: "Haldi",
    alt: "Traditional royal mandap",
  },
  {
    video: "/videos/DJI_20260110201254_0112_D_stabilized.mp4",
    category: "NightView",
    alt: "Traditional royal mandap",
  },
  {
    video: "/videos/Wedding-View-4.mp4",
    category: "Wedding",
    alt: "Lawn evening setup",
  },
  {
    video: "/videos/Gallery-Video-4.mp4",
    category: "NightView",
    alt: "Traditional royal mandap",
  },
  {
    video: "/videos/drone-view.mp4",
    category: "DroneView",
    alt: "Traditional royal mandap",
  },
  {
    video: "/videos/Wedding-View-3.mp4",
    category: "Wedding",
    alt: "Lawn evening setup",
  },
  {
    video: "/videos/Gallery-Video-1.mp4",
    category: "DroneView",
    alt: "Traditional royal mandap",
  },
  {
    video: "/videos/DJI_20260110194459_0097_D_stabilized.mp4",
    category: "NightView",
    alt: "Elegant dining setups",
  },
  {
    video: "/videos/Gallery-Video-3.mp4",
    category: "NightView",
    alt: "Elegant dining setups",
  },
  {
    video: "/videos/Wedding-View-2.mp4",
    category: "Wedding",
    alt: "Lawn evening setup",
  },
  {
    video: "/videos/garden.mp4",
    category: "DroneView",
    alt: "Elegant dining setups",
  },
  {
    video: "/videos/Gallery-Video-5.mp4",
    category: "DroneView",
    alt: "Elegant dining setups",
  },
  {
    video: "/videos/Wedding-View-1.mp4",
    category: "Wedding",
    alt: "Lawn evening setup",
  },
  {
    video: "/videos/DJI_20260110213956_0015_D_stabilized.mp4",
    category: "NightView",
    alt: "Traditional royal mandap",
  },
  {
    video: "/videos/Gallery-Video-2.mp4",
    category: "NightView",
    alt: "Traditional royal mandap",
  },
  {
    video: "/videos/garden-view.mp4",
    category: "DroneView",
    alt: "Elegant dining setups",
  },
  {
    video: "/videos/Gallery-Video-6.mp4",
    category: "DroneView",
    alt: "Elegant dining setups",
  },
];

// Gallery Video Component - NO AUTOPLAY, plays on click
const GalleryVideo = memo(({ src, poster, className = "", isPlaying, onTogglePlay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return (
    <div
      className="relative w-full h-full bg-black/20 overflow-hidden cursor-pointer"
      onClick={onTogglePlay}
    >
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${className}`}
        poster={poster || ""}
        playsInline
        muted
        loop
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
          {/* <div className="w-16 h-16 rounded-full bg-gold-base/80 flex items-center justify-center"> */}
          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          {/* </div> */}
        </div>
      )}
    </div>
  );
});

GalleryVideo.displayName = "GalleryVideo";

// Slider Video - PLAYS ONLY WHEN ACTIVE
const SliderVideo = ({ src, poster, isActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isActive, src]);

  return (
    <video
      ref={videoRef}
      className="max-h-[85vh] w-auto object-contain"
      poster={poster || ""}
      playsInline
      muted
      loop
      preload="auto"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

// Full Screen Slider Component
const FullScreenSlider = ({ items, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const validItems = items.filter((item) => item.image || item.video);
  const totalItems = validItems.length;

  const goToPrevious = useCallback(() => {
    if (isTransitioning || totalItems === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 200);
  }, [isTransitioning, totalItems]);

  const goToNext = useCallback(() => {
    if (isTransitioning || totalItems === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 200);
  }, [isTransitioning, totalItems]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [goToNext, goToPrevious, onClose]);

  if (totalItems === 0) return null;

  const currentItem = validItems[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gold-base transition-colors duration-300"
        aria-label="Close slider"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={goToPrevious}
        className="absolute left-4 z-10 text-white hover:text-gold-base transition-colors duration-300 p-2"
        aria-label="Previous"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 z-10 text-white hover:text-gold-base transition-colors duration-300 p-2"
        aria-label="Next"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-serif-heading text-sm tracking-wider">
        {currentIndex + 1} / {totalItems}
      </div>

      <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          {currentItem?.video ? (
            <SliderVideo
              key={`video-${currentIndex}`}
              src={currentItem.video}
              poster={currentItem.image || ""}
              alt={currentItem.alt}
              isActive={true}
            />
          ) : currentItem?.image ? (
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

// Gallery Item
const GalleryItem = memo(({ item, index, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold-base/15 group shadow-lg cursor-pointer"
      onClick={() => onClick(index)}
    >
      {item.video ? (
        <GalleryVideo
          src={item.video}
          poster={item.image || ""}
          className="transition-transform duration-700 group-hover:scale-105"
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />
      ) : item.image ? (
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : null}

      {/* Hover overlay - only show for non-video or if video not playing */}
      {!item.video || !isPlaying ? (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center z-20">
          <span className="text-white/0 group-hover:text-white/80 text-sm tracking-wider uppercase font-serif-heading transition-all duration-300">
            {/* {item.video ? "Click to play" : "Click to view"} */}
          </span>
        </div>
      ) : null}
    </div>
  );
});

GalleryItem.displayName = "GalleryItem";

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [sliderOpen, setSliderOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const gridRef = useRef(null);

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    setSliderOpen(true);
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
      <section className="relative h-[42vh] min-h-[320px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/image-2.webp"
            alt="Background"
            fill
            priority
            className="object-cover opacity-30 brightness-[0.4]"
            sizes="100vw"
          />
        </div>
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

      <section className="container py-14 md:py-28">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {["all", "Wedding", "Reception", "Mehendi", "Haldi", "NightView", "DroneView"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-serif-heading text-[10px] tracking-[0.25em] uppercase px-6 py-3.5 rounded-full border transition-all duration-300 ${filter === cat
                ? "bg-maroon-base text-gold-light border-gold-base shadow-md"
                : "bg-white text-maroon-dark border-maroon-base/10 hover:border-gold-base/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <GalleryItem
              key={`${item.category}-${index}`}
              item={item}
              index={index}
              onClick={handleItemClick}
            />
          ))}
        </div>
      </section>

      {sliderOpen && (
        <FullScreenSlider
          items={filteredItems}
          initialIndex={selectedIndex}
          onClose={() => setSliderOpen(false)}
        />
      )}
    </div>
  );
}
