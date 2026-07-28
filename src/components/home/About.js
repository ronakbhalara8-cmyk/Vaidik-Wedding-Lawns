"use client";

import Link from "next/link";
import Button from "../ui/Button";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";
import ParallaxImage from "../ui/ParallaxImage";

export default function About() {
  return (
    <section className="relative py-24 md:py-32 bg-cream text-charcoal overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-gold-base/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[350px] h-[350px] bg-maroon-base/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Story Copy Block */}
          <div className="flex flex-col gap-6">
            <FadeIn direction="right" duration={0.8}>
              <span className="font-serif-heading text-xs tracking-[0.3em] uppercase text-maroon-base bg-maroon-light/10 border border-maroon-base/15 rounded-full px-4 py-1.5 inline-block">
                Our Heritage & Vision
              </span>
            </FadeIn>

            <SplitReveal
              type="words"
              tag="h2"
              className="font-serif-heading text-3xl sm:text-5xl tracking-wide text-maroon-dark uppercase leading-tight font-bold"
            >
              Crafting Royal Celebrations for Generations
            </SplitReveal>

            <FadeIn direction="up" duration={1.0} delay={0.3} distance={20} className="flex flex-col gap-5 text-base text-charcoal/80 font-light leading-relaxed">
              <p>
                At <span className="font-semibold text-maroon-base">Vaidik Wedding Lawns</span>, we believe that weddings are not just events, but sacred unions that deserve a setting of unmatched grandeur. Established as Mumbai's premier open-air luxury venue, we offer a canvas where heritage meets modern sophistication.
              </p>
              <p className="font-sans text-md text-maroon-light border-l-2 border-gold-base pl-4 my-2">
                "Where lush green tapestries meet the majestic glow of starry skies, orchestrating an ambient symphony that stays etched in hearts forever."
              </p>
              <p>
                Spanning across acres of manicured lawns and featuring state-of-the-art climate-controlled changing suites, grand floral mandaps, and collaborations with Michelin-style caterers, Vaidik offers a completely tailored end-to-end royal wedding journey.
              </p>
            </FadeIn>

            <FadeIn direction="up" duration={0.8} delay={0.5} distance={20} className="mt-4">
              <Button href="/about" variant="outline" className="px-10 py-3 text-[11px] tracking-[0.25em]">
                Read Our Story
              </Button>
            </FadeIn>
          </div>

          {/* Visual Composition Block (Video + Image) */}
          <div className="relative flex items-center justify-center">
            {/* Main large video container */}
            <div className="w-[85%] aspect-[4/5] rounded-3xl overflow-hidden border border-gold-base/20 shadow-2xl relative">
              <video
                src="/videos/Video_20260514_170024.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping secondary floating image */}
            <div className="absolute bottom-[-10%] left-[-5%] w-[55%] aspect-square rounded-2xl overflow-hidden border border-gold-base/30 shadow-2xl z-20">
              <ParallaxImage
                src="/images/about.png"
                alt="Vaidik Banquet Reception Setup"
                className="w-full h-full"
                yOffset={20}
              />
            </div>

            {/* Premium Gold Frame decoration */}
            <div className="absolute top-[8%] right-[2%] w-[80%] h-[80%] border border-gold-base/30 rounded-3xl pointer-events-none -z-10 translate-x-4 -translate-y-4" />
          </div>

        </div>
      </div>
    </section>
  );
}
