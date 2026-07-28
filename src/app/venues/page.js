"use client";

import { Check, Calendar, Users, Map, Compass } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { useRef, useEffect } from "react";

const items = [
  {
    title: "The Royal Grand Lawn",
    tag: "Flagship Outdoor Space",
    capacity: "800 - 2,500 Guests",
    size: "45,000 Sq. Ft.",
    image: "",
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218070/DJI_20260110194459_0097_D_stabilized_tyeigl.mp4", // Add your video path here
    description: "Our crown jewel. A sprawling manicured green carpet illuminated by high-mast and architectural lighting arrays. Designed to frame grand receptions, starry dinners, and cinematic stages.",
    features: [
      "Accommodates massive multi-tier mandap structures",
      "4 Luxury VIP changing suites equipped with vanity vanity mirrors",
      "Complimentary dedicated valet service counter",
      "Advanced 100% DG generator power backup",
      "Rainwater rapid-drainage subterranean soil layers",
    ],
  },
  {
    title: "The Golden Mandap Lawn",
    tag: "Traditional Phera Venue",
    capacity: "300 - 1,000 Guests",
    size: "25,000 Sq. Ft.",
    image: "",
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218013/046A9880_kdiibj.mp4", // Add your video path here
    description: "Designed specifically to cultivate an intimate, spiritual energy for traditional Indian pheras. Framed by delicate floral arches, standard temple-style setup capability, and premium acoustics.",
    features: [
      "Sacred hawan fire-safe structural points",
      "2 Luxury air-conditioned suites and guest prep space",
      "Integrated audio wiring for high-quality mantra acoustics",
      "Delicate gold-mesh perimeter fencing",
    ],
  },
  {
    title: "The Vaidik Banquet Hall",
    tag: "Luxury Indoor Space",
    capacity: "200 - 800 Guests",
    size: "18,000 Sq. Ft.",
    image: "", // Add your image path here
    video: "https://res.cloudinary.com/dmk5tpght/video/upload/v1785218016/banquet-hall_fwsyw0.mp4", // Add your video path here
    description: "A state-of-the-art temperature-controlled indoor hall with soaring 22-foot double-height ceilings, majestic crystal chandeliers, and glass walls overlooking the lawns.",
    features: [
      "Centrally air-conditioned climate systems",
      "Exclusive glass visual lobby entrance",
      "4 Luxury guest suits and family lounge chambers",
      "Integrated acoustics with surround speaker systems",
      "Dedicated gourmet kitchen space for catering services",
    ],
  },
];

// Video Component with Autoplay
const VideoPlayer = ({ src, poster, title }) => {
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
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        playsInline
        muted
        loop
        autoPlay
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* No button overlay - keeping it clean */}
    </div>
  );
};

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* Header */}
      <section className="relative h-[42vh] min-h-[320px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 brightness-[0.4] pointer-events-none"
          style={{ backgroundImage: "url('/images/wedding_mandap.png')" }}
        />
        <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />

        <div className="relative z-20 text-center max-w-2xl px-6">
          <FadeIn direction="down" duration={0.6}>
            <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase mb-2 block">
              Grand Settings
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            Wedding Venues
          </SplitReveal>
        </div>
      </section>

      {/* Venues Listing */}
      <section className="container py-20 md:py-28 flex flex-col gap-24">
        {items.map((venue, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 border-b border-maroon-base/5 pb-20 last:border-0 last:pb-0
                ${isEven ? "" : "lg:flex-row-reverse"}`}
            >
              {/* Visual Panel */}
              <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:h-auto lg:self-stretch rounded-3xl overflow-hidden border border-gold-base/20 shadow-2xl relative">                {venue.video ? (
                <VideoPlayer
                  src={venue.video}
                  poster={venue.image}
                  title={venue.title}
                />
              ) : (
                <ParallaxImage
                  src={venue.image}
                  alt={venue.title}
                  className="w-full h-full"
                  yOffset={8}
                />
              )}
                <span className="absolute top-6 left-6 bg-maroon-dark/85 text-gold-base border border-gold-base/30 px-4 py-1.5 rounded-full font-serif-heading text-[9px] tracking-[0.25em] uppercase z-10">
                  {venue.tag}
                </span>
              </div>

              {/* Info Panel */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h2 className="font-serif-heading text-2xl sm:text-4xl tracking-wide uppercase text-maroon-dark font-bold">
                  {venue.title}
                </h2>

                {/* Meta details */}
                <div className="flex flex-wrap gap-4 text-xs font-serif-heading tracking-widest uppercase text-gold-dark border-y border-gold-base/15 py-3">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold-base" /> {venue.capacity}
                  </span>
                  <span className="h-4 w-[1px] bg-gold-base/20 hidden sm:block" />
                  <span className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-gold-base" /> {venue.size}
                  </span>
                </div>

                <p className="text-sm md:text-base text-charcoal/70 leading-relaxed font-light">
                  {venue.description}
                </p>

                {/* Features Checklist */}
                <ul className="flex flex-col gap-3">
                  {venue.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-3 items-start text-sm text-charcoal/80 font-light">
                      <Check className="w-4.5 h-4.5 text-gold-base shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA actions */}
                <div className="flex gap-4 mt-4">
                  <Button href="/book-visit" variant="secondary" className="px-6 py-3.5 text-[9px] tracking-[0.2em]">
                    <Calendar className="w-3.5 h-3.5 mr-1" /> Book Private Visit
                  </Button>
                  <Button href="/contact" variant="outline" className="px-6 py-3.5 text-[9px] tracking-[0.2em]">
                    Inquire Availability
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
