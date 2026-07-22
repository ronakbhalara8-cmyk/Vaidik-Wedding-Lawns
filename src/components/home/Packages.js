"use client";

import { Check } from "lucide-react";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";
import Button from "../ui/Button";

const packages = [
  {
    name: "Classic Elegance",
    subtitle: "Sophisticated open-air celebrations",
    price: "Custom Quote",
    features: [
      "Exclusive 12-hour lawn hire",
      "Standard premium seating layout for up to 500 guests",
      "Traditional floral mandap design",
      "Curated multi-cuisine buffet dinner",
      "2 Luxury air-conditioned dressing suites",
      "Basic audio system and ambient light setup",
    ],
    highlighted: false,
  },
  {
    name: "Maharaja Imperial",
    subtitle: "The ultimate grand royal wedding experience",
    price: "Custom Quote",
    features: [
      "Full lawn & banquet hall booking for up to 1,500 guests",
      "Bespoke premium theme decor & floral canopy styling",
      "Welcome royal entrance hosts and VIP hospitality stewards",
      "Elite Michelin-inspired buffet with live stations",
      "Live music orchestra or premium wedding DJ coordination",
      "4 Luxury dressing suites & VIP lounge access",
      "Professional audio, stage lighting, and visual projections",
    ],
    highlighted: true, // Flags for dark-maroon glass container
  },
  {
    name: "Royal Pheras",
    subtitle: "Intimate and detailed traditional ceremonies",
    price: "Custom Quote",
    features: [
      "Golden Mandap lawn booking for up to 800 guests",
      "Authentic Vedic temple-style mandap setting",
      "Curated traditional vegetarian feast menu",
      "2 Luxury dressing suites",
      "Soft acoustic traditional instrumentals",
      "Standard coordination & registration services",
    ],
    highlighted: false,
  },
];

export default function Packages() {
  return (
    <section className="relative py-24 md:py-32 bg-maroon-dark text-ivory overflow-hidden">
      {/* Background visual layers */}
      <div className="absolute right-0 top-1/3 w-[600px] h-[600px] bg-maroon-light/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-[400px] h-[400px] bg-gold-base/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.02)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <FadeIn direction="down" duration={0.8}>
            <span className="font-serif-heading text-xs tracking-[0.3em] uppercase text-gold-base bg-gold-base/10 border border-gold-base/20 rounded-full px-4 py-1.5 inline-block mb-4">
              Curated Pricing
            </span>
          </FadeIn>
          <SplitReveal
            type="words"
            tag="h2"
            className="font-serif-heading text-3xl sm:text-5xl tracking-wide uppercase leading-tight font-bold mb-4"
          >
            Wedding Packages
          </SplitReveal>
          <FadeIn direction="up" duration={1.0} delay={0.2} distance={15}>
            <p className="text-sm md:text-base text-gold-light/60 leading-relaxed font-light">
              Select one of our meticulously detailed signature packages, or connect with our event planners to design a fully custom celebration.
            </p>
          </FadeIn>
        </div>

        {/* Packages Comparison Grid */}
        <FadeIn direction="up" duration={0.2} distance={45} stagger={0.2} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-all duration-500 border relative group
                ${pkg.highlighted
                  ? "bg-maroon-base/60 backdrop-blur-md border-gold-base shadow-2xl scale-105 z-10 hover:shadow-gold-base/15"
                  : "bg-maroon-dark/40 border-gold-base/15 hover:border-gold-base/40 shadow-xl"
                }`}
            >
              {/* Highlight ribbon banner for premium option */}
              {pkg.highlighted && (
                <span className="absolute top-0 right-10 -translate-y-1/2 bg-grad-gold text-maroon-dark px-4 py-1 rounded-full font-serif-heading text-[8px] font-bold tracking-[0.25em] uppercase">
                  Most Preferred
                </span>
              )}

              <div>
                <span className="font-serif-sub italic text-sm text-gold-base/80 mb-1 block">
                  {pkg.subtitle}
                </span>
                <h3 className="font-serif-heading text-2xl tracking-wide uppercase text-ivory mb-4 font-semibold">
                  {pkg.name}
                </h3>

                {/* Price Display */}
                <div className="border-b border-gold-base/15 pb-6 mb-8">
                  <span className="font-serif-heading text-3xl text-gold-light font-medium">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-gold-light/50 font-light block mt-1">
                    Tax inclusive, customized based on guest count & menu
                  </span>
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-4 mb-10">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-gold-light/80 font-light leading-relaxed">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.highlighted ? "text-gold-base" : "text-gold-base/65"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Button
                  href="/book-visit"
                  variant={pkg.highlighted ? "secondary" : "outline"}
                  className="w-full text-center"
                >
                  Inquire Package
                </Button>
              </div>
            </div>
          ))}
        </FadeIn>

      </div>
    </section>
  );
}
