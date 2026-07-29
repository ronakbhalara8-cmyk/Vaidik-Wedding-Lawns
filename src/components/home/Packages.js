"use client";

import { Check, ArrowRight } from "lucide-react";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";
import Button from "../ui/Button";

const packages = [
  {
    name: "Silver",
    subtitle: "Intimate & Elegant Ceremonies",
    price: "Custom Quote",
    features: [
      "Lawn & Banquet access for up to 2000+ guests",
      "Traditional floral mandap setup",
      "Curated multi-course vegetarian buffet dinner",
      "1 Luxury air-conditioned dressing suite",
      "Ambient lighting & basic audio setup",
      "Dedicated event manager & coordinator",
    ],
    highlighted: false,
  },
  {
    name: "Gold",
    subtitle: "Grand & Regal Royal Celebrations",
    price: "Custom Quote",
    features: [
      "Expanded Lawn capacity for up to 2000+ guests",
      "Premium thematic floral decor & entrance canopy",
      "Gourmet multi-cuisine live buffet counters",
      "2 Luxury air-conditioned dressing suites",
      "Stage lighting & premium acoustic audio system",
      "Welcome royal ushering & hospitality team",
    ],
    highlighted: true, // Most popular card - Highlighted with Gold Border & Glass Glow
  },
  {
    name: "Platinum",
    subtitle: "Opulent & Bespoke Imperial Experience",
    price: "Custom Quote",
    features: [
      "Full venue access for up to 2000+ guests",
      "Bespoke luxury theme decor & floral canopy styling",
      "Elite Michelin-inspired live culinary stations",
      "4 Luxury dressing suites & VIP lounge access",
      "Live music orchestra or premium DJ coordination",
      "Professional audio, stage lighting & visual projections",
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

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 flex flex-col items-center">
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

        {/* 3 Packages Comparison Grid */}
        <FadeIn
          direction="up"
          duration={0.2}
          distance={45}
          stagger={0.2}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-all duration-500 border relative group
                ${pkg.highlighted
                  ? "bg-maroon-base/60 backdrop-blur-md border-gold-base shadow-2xl lg:scale-105 z-10 hover:shadow-gold-base/20"
                  : "bg-maroon-dark/40 border-gold-base/15 hover:border-gold-base/40 shadow-xl hover:bg-maroon-dark/60"
                }`}
            >
              {/* Highlight ribbon banner for most preferred option */}
              {pkg.highlighted && (
                <span className="absolute top-0 right-10 -translate-y-1/2 bg-grad-gold text-maroon-dark px-4 py-1 rounded-full font-serif-heading text-[9px] font-bold tracking-[0.25em] uppercase shadow-md">
                  Most Preferred
                </span>
              )}

              <div>
                <span className="font-sans text-sm text-gold-base/80 mb-1 block font-medium">
                  {pkg.subtitle}
                </span>
                <h3 className="font-serif-heading text-2xl md:text-3xl tracking-wide uppercase text-ivory mb-1 font-semibold">
                  {pkg.name}
                </h3>

                {/* Price Display */}
                <div className="border-b border-gold-base/15 pb-6 mb-8">
                  <span className="font-serif-heading text-2xl text-gold-light font-medium block">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-gold-light/50 font-light block mt-1">
                    Tax inclusive, customized based on guest count & menu
                  </span>
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-4 mb-10">
                  {pkg.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex gap-3 items-start text-sm text-gold-light/80 font-light leading-relaxed">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.highlighted ? "text-gold-base" : "text-gold-base/65"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Button
                  href="/contact"
                  variant={pkg.highlighted ? "secondary" : "outline"}
                  className="w-full text-center"
                >
                  Inquire Package
                </Button>
              </div>
            </div>
          ))}
        </FadeIn>

        {/* Bottom Center "More Packages" Redirect Button */}
        <FadeIn direction="up" duration={0.8} delay={0.4} className="mt-16 text-center flex justify-center">
          <Button
            href="/packages"
            variant="outline"
            className="group flex items-center gap-3 px-8 py-4 border-gold-base/30 text-gold-light hover:text-maroon-dark hover:bg-gold-base transition-all duration-300 rounded-full font-serif-heading text-xs tracking-[0.25em] uppercase font-bold"
          >
            <span>Explore More Packages</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </FadeIn>

      </div>
    </section>
  );
}