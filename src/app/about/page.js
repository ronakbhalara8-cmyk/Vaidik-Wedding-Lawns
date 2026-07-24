"use client";

import { Award, ShieldCheck, HeartHandshake } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";
import ParallaxImage from "@/components/ui/ParallaxImage";

const values = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Detail",
    description: "From a single rose petal alignment to multi-ton stage rigging safety, we curate every microscopic element with absolute precision.",
  },
  {
    icon: Award,
    title: "Heritage Hospitality",
    description: "Drawing inspiration from traditional Indian values, we serve your guests with warmth, grace, and regal protocol.",
  },
  {
    icon: HeartHandshake,
    title: "Eternal Partnerships",
    description: "We work as your family counselors. Helping you negotiate, plan, and execute with absolute clarity, honesty, and alignment.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* Page Header */}
      <section className="relative h-[42vh] min-h-[320px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 brightness-[0.4] pointer-events-none"
          style={{ backgroundImage: "url('/images/wedding_lawn.png')" }}
        />
        <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />

        <div className="relative z-20 text-center max-w-2xl px-6">
          <FadeIn direction="down" duration={0.6}>
            <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase mb-2 block">
              The Vaidik Legacy
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            About Our Lawns
          </SplitReveal>
        </div>
      </section>

      {/* Main Vision Story Section */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Parallax Image Grid */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold-base/20 shadow-2xl">
            <ParallaxImage
              src="/images/about-page.jpg"
              alt="Lush gardens at Vaidik Wedding Lawns"
              className="w-full h-full"
              yOffset={8}
            />
            {/* Visual Gold frame overlap */}
            <div className="absolute top-6 left-6 bottom-6 right-6 border border-gold-base/20 rounded-2xl pointer-events-none z-10" />
          </div>

          {/* Vision Details */}
          <div className="flex flex-col gap-6">
            <FadeIn direction="right" duration={0.8}>
              <span className="font-serif-heading text-xs tracking-[0.25em] text-maroon-base bg-maroon-light/10 border border-maroon-base/15 rounded-full px-4 py-1.5 inline-block">
                Our Narrative
              </span>
            </FadeIn>
            <SplitReveal type="words" tag="h2" className="font-serif-heading text-3xl sm:text-4xl text-maroon-dark uppercase leading-tight font-bold">
              Where Splendor and Romance Entwine
            </SplitReveal>
            <FadeIn direction="up" duration={1.0} delay={0.2} distance={20} className="flex flex-col gap-4 text-charcoal/80 font-light leading-relaxed">
              <p>
                Vaidik Wedding Lawns was founded with a singular, bold vision: to establish an open-air venue in Mumbai that reflects the sheer majesty of traditional Indian weddings, backed by modern five-star logistics.
              </p>
              <p>
                Over the past decade, we have hosted hundreds of high-profile weddings, sangeet sandhyas, reception banquets, and sacred ceremonies. Our manicured lawns are designed for rapid rainwater drainage, and our visual lighting rigs are engineered by professional stage designers to give photographers the perfect studio canvas.
              </p>
              <p>
                Under the counsel of our founders, we have cultivated a team of hospitality experts, decorator alliances, and logistics partners who align seamlessly to make sure your celebration flows with effortless grace.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-maroon-dark text-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <FadeIn direction="down" duration={0.8}>
              <span className="font-serif-heading text-xs tracking-[0.3em] text-gold-base uppercase mb-4 block">
                Foundations
              </span>
            </FadeIn>
            <SplitReveal type="words" tag="h2" className="font-serif-heading text-3xl md:text-4xl uppercase tracking-wide font-bold">
              Our Core Principles
            </SplitReveal>
          </div>

          <FadeIn direction="up" duration={0.1} stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-maroon-base/30 border border-gold-base/15 rounded-2xl p-8 hover:border-gold-base/40 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-base/10 flex items-center justify-center text-gold-base mb-6 border border-gold-base/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-heading text-lg tracking-wide uppercase text-gold-light mb-3">
                    {val.title}
                  </h3>
                  <p className="text-sm text-gold-light/60 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
