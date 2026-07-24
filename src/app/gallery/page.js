"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";

const galleryItems = [
  {
    image: "/images/gallery-10.jpg",
    category: "lawns",
    alt: "Lawn evening setup"
  },
  {
    image: "/images/gallery-11.jpg",
    category: "lawns",
    alt: "Lawn evening setup"
  },
  {
    image: "/images/gallery-12.jpg",
    category: "lawns",
    alt: "Lawn evening setup"
  },
  {
    image: "/images/gallery-13.jpg",
    category: "lawns",
    alt: "Lawn evening setup"
  },
  {
    image: "/images/about.png",
    category: "mandaps",
    alt: "Traditional royal mandap"
  },
  {
    image: "/images/gallery-1.png",
    category: "mandaps",
    alt: "Traditional royal mandap"
  },
  {
    image: "/images/gallery-7.jpg",
    category: "mandaps",
    alt: "Traditional royal mandap"
  },
  {
    image: "/images/gallery-8.jpg",
    category: "mandaps",
    alt: "Traditional royal mandap"
  },
  {
    image: "/images/gallery-9.jpg",
    category: "mandaps",
    alt: "Traditional royal mandap"
  },
  {
    image: "/images/reception_hall.png", // Added poster image for video
    video: "/videos/banquet-hall.mp4",
    category: "banquet",
    alt: "Elegant dining setups"
  }
];

// Video Component for Gallery
const GalleryVideo = ({ src, poster, alt }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Auto-play might be blocked by browser, but we try anyway
        console.log("Autoplay blocked:", error);
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      poster={poster || ""}
      playsInline
      muted
      loop
      autoPlay
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
      {poster && (
        <Image src={poster} alt={alt} fill className="object-cover" />
      )}
    </video>
  );
};

// Gallery Item Component
const GalleryItem = ({ item, index }) => {
  const hasVideo = item.video ? true : false;
  const hasImage = item.image ? true : false;

  // If no image and no video, show placeholder
  if (!hasImage && !hasVideo) {
    return (
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold-base/15 group shadow-lg cursor-pointer bg-maroon-dark/10 flex items-center justify-center">
        <span className="text-maroon-dark/40 text-sm">No media</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold-base/15 group shadow-lg cursor-pointer">
      {hasVideo ? (
        <GalleryVideo
          src={item.video}
          poster={item.image || ""}
          alt={item.alt}
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

    </div>
  );
};

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const gridRef = useRef(null);

  const filteredItems =
    filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter);

  useEffect(() => {
    const items = gridRef.current?.children;
    if (!items) return;

    // Trigger stagger entry on filter change
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
            <GalleryItem key={index} item={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}