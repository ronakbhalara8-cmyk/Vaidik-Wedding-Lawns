"use client";

import { Award, Compass, Heart, UtensilsCrossed } from "lucide-react";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";

const services = [
  {
    icon: Compass,
    title: "Bespoke Decor & Design",
    description:
      "From majestic traditional flowered mandap setups to high-modern crystal-lit reception halls, our in-house decorators translate your themes into physical luxury.",
  },
  {
    icon: UtensilsCrossed,
    title: "Royal Gourmet Catering",
    description:
      "Indulge guests in a custom-tailored dining experience. Featuring live gourmet counters, traditional Indian feasts, and international multi-cuisine spreads.",
  },
  {
    icon: Heart,
    title: "Bridal Suite Chambers",
    description:
      "Soothing, air-conditioned private sanctuaries equipped with luxury mirrors, vanity lighting, and lounge seating for preparation and pre-wedding photo shoots.",
  },
  {
    icon: Award,
    title: "Signature Hospitality",
    description:
      "A dedicated, professional service squad of hostesses and stewards to handle guest welcomes, seating, logistics, and VIP coordination flawlessly.",
  },
];

export default function Services() {
  return (
    <section className="relative py-24 md:py-32 bg-cream text-charcoal overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-base/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="container relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <FadeIn direction="down" duration={0.8}>
            <span className="font-serif-heading text-xs tracking-[0.3em] uppercase text-maroon-base bg-maroon-light/10 border border-maroon-base/15 rounded-full px-4 py-1.5 inline-block mb-4">
              Curated Experiences
            </span>
          </FadeIn>
          <SplitReveal
            type="words"
            tag="h2"
            className="font-serif-heading text-3xl sm:text-5xl tracking-wide text-maroon-dark uppercase leading-tight font-bold mb-4"
          >
            Premium Wedding Services
          </SplitReveal>
          <FadeIn direction="up" duration={1.0} delay={0.2} distance={15}>
            <p className="text-sm md:text-base text-charcoal/60 leading-relaxed font-light">
              We handle every detail with refined craftsmanship, giving you the luxury of living and cherishing every single second of your wedding day.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <FadeIn direction="up" duration={0.2} distance={30} stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border border-maroon-base/10 rounded-2xl p-8 hover:border-gold-base/50 transition-all duration-500 hover:shadow-xl hover:shadow-maroon-base/5 flex flex-col justify-between"
              >
                {/* Floating visual hover highlight */}
                <div className="absolute inset-0 bg-grad-champagne opacity-0 group-hover:opacity-[0.04] rounded-2xl transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Icon wrap */}
                  <div className="w-14 h-14 rounded-2xl bg-maroon-light/5 border border-maroon-base/10 flex items-center justify-center mb-8 text-maroon-base group-hover:bg-maroon-base group-hover:text-gold-light group-hover:border-gold-base transition-all duration-500">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif-heading text-lg tracking-wide uppercase text-maroon-dark group-hover:text-maroon-base transition-colors duration-300 mb-4 font-semibold">
                    {service.title}
                  </h3>

                  <p className="text-sm text-charcoal/65 leading-relaxed font-light mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Micro underline border hover animation */}
                <div className="w-0 h-[2px] bg-gold-base group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            );
          })}
        </FadeIn>

      </div>
    </section>
  );
}
