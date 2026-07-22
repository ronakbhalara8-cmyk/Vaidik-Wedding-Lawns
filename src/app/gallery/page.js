"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";

const galleryItems = [
  { image: "/images/wedding_lawn.png", category: "lawns", alt: "Lawn evening setup" },
  { image: "/images/wedding_mandap.png", category: "mandaps", alt: "Traditional royal mandap" },
  { image: "/images/reception_hall.png", category: "banquet", alt: "Chandeliers indoor banquet hall" },
  { image: "/images/wedding_mandap.png", category: "mandaps", alt: "Modern floral mandap layout" },
  { image: "/images/reception_hall.png", category: "banquet", alt: "Elegant dining setups" },
  { image: "/images/wedding_lawn.png", category: "lawns", alt: "Outdoor garden reception area" },
];

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
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
        {/* Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {["all", "lawns", "mandaps", "banquet"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-serif-heading text-[10px] tracking-[0.25em] uppercase px-6 py-3.5 rounded-full border transition-all duration-300
                ${
                  filter === cat
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
            <div
              key={index}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold-base/15 group shadow-lg cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-maroon-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-serif-heading text-xs tracking-[0.2em] uppercase text-gold-base block mb-2">
                    {item.category} Details
                  </span>
                  <p className="text-xs text-gold-light/85 font-light">
                    {item.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
