"use client";

import { Award, Compass, Heart, UtensilsCrossed, Sparkles, Volume2, ShieldCheck, MapPin } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

const list = [
  {
    icon: Compass,
    title: "Theme Styling & Floral Decor",
    description: "Our award-winning design architects formulate custom-tailored concepts. We manage flower walls, royal arches, mandap visual drapes, aisle carpeting, and stage frameworks.",
  },
  {
    icon: UtensilsCrossed,
    title: "Signature Culinary Feasts",
    description: "Michelin-style gourmet catering setups with multicuisine custom menus. Highlights include live visual chef counters, premium mocktail bars, traditional thalis, and custom cake visual cuts.",
  },
  {
    icon: Heart,
    title: "Air-Conditioned VIP Suites",
    description: "A sanctuary for prep. Spaciously detailed suites with high-magnification vanity lighting, plush dressing mirrors, clothing layout hangers, private washrooms, and catering snacks.",
  },
  {
    icon: Award,
    title: "Regal Welcomes & Stewards",
    description: "Trained hospitality stewards and hostesses. We manage entrance guest registrations, garland distributions, ushering, beverage servers, and VIP accommodations.",
  },
  {
    icon: Volume2,
    title: "Acoustics & Stage Lighting",
    description: "JBL-powered high-fidelity concert speakers and digital intelligent moving head lasers. We configure soft instrumentals for pheras and high-bass audio grids for sangeet dancing.",
  },
  {
    icon: ShieldCheck,
    title: "Logistics, Safety & Security",
    description: "Equipped with CCTV perimeter grids, security guards, certified fire fighting arrays, instant DG power backup generators, and medical coordination kits.",
  },
];

export default function ServicesPage() {
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
              Bespoke Care
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            Premium Services
          </SplitReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <SplitReveal type="words" tag="h2" className="font-serif-heading text-2xl sm:text-4xl text-maroon-dark uppercase leading-tight font-bold mb-4">
            Bespoke Orchestration for Flawless Events
          </SplitReveal>
          <p className="text-sm md:text-base text-charcoal/60 leading-relaxed font-light">
            We offer completely integrated event services, taking care of staging, logistics, dining, and styling so that your focus remains strictly on celebrating.
          </p>
        </div>

        <FadeIn direction="up" duration={0.1} stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border border-maroon-base/10 rounded-2xl p-8 hover:border-gold-base/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-maroon-light/5 border border-maroon-base/10 flex items-center justify-center mb-6 text-maroon-base group-hover:bg-maroon-base group-hover:text-gold-light transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif-heading text-base tracking-wide uppercase text-maroon-dark mb-3 font-semibold">
                    {service.title}
                  </h3>

                  <p className="text-sm text-charcoal/65 leading-relaxed font-light mb-6">
                    {service.description}
                  </p>
                </div>
                <div className="w-0 h-[2px] bg-gold-base group-hover:w-full transition-all duration-300 ease-out" />
              </div>
            );
          })}
        </FadeIn>
      </section>
    </div>
  );
}
