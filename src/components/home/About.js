"use client";

import Link from "next/link";
import Button from "../ui/Button";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";
import ParallaxImage from "../ui/ParallaxImage";
import LazyVideo from "../ui/LazyVideo";

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
                About Us
              </span>
            </FadeIn>

            <SplitReveal
              type="words"
              tag="h2"
              className="font-serif-heading text-3xl sm:text-5xl tracking-wide text-maroon-dark uppercase leading-tight font-bold"
            >
              Where Elegance Meets the Open Sky
            </SplitReveal>

            <FadeIn direction="up" duration={1.0} delay={0.3} distance={20} className="flex flex-col gap-4 text-base text-charcoal/80 font-light leading-relaxed">
              <p>
                Established in <span className="font-semibold text-maroon-base">2021</span>, <span className="font-semibold text-maroon-base">Vaidik Wedding Lawns</span> is Surat's finest open-air luxury venue, offering the perfect setting for weddings, engagements, corporate events, and special celebrations.
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 my-2">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gold-base/20 shadow-sm text-center">
                  <span className="block font-serif-heading text-2xl text-maroon-base font-bold">2021</span>
                  <span className="text-xs text-charcoal/70 uppercase tracking-wider">Established</span>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gold-base/20 shadow-sm text-center">
                  <span className="block font-serif-heading text-2xl text-maroon-base font-bold">1500 - 2000</span>
                  <span className="text-xs text-charcoal/70 uppercase tracking-wider">Guest Capacity</span>
                </div>
              </div>

              <p className="text-sm">
                <span className="font-semibold text-maroon-base">📍</span> Near Kanad fatak, 300 feet, Sayan Hazira Ring Road, opp. Variyav Check Post, Surat
              </p>

              <div className="flex flex-wrap gap-2 mt-1">
                <span className="bg-maroon-light/10 text-maroon-base px-3 py-1 rounded-full text-[10px] tracking-wider border border-maroon-base/10">🌿 Expansive Lawn</span>
                <span className="bg-maroon-light/10 text-maroon-base px-3 py-1 rounded-full text-[10px] tracking-wider border border-maroon-base/10">🚗 Ample Parking</span>
                <span className="bg-maroon-light/10 text-maroon-base px-3 py-1 rounded-full text-[10px] tracking-wider border border-maroon-base/10">✨ Premium Decor</span>
                <span className="bg-maroon-light/10 text-maroon-base px-3 py-1 rounded-full text-[10px] tracking-wider border border-maroon-base/10">📍 Easy Access</span>
                <span className="bg-maroon-light/10 text-maroon-base px-3 py-1 rounded-full text-[10px] tracking-wider border border-maroon-base/10">🎉 All Events</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" duration={0.8} delay={0.5} distance={20} className="mt-2">
              <Button href="/about" variant="outline" className="px-10 py-3 text-[11px] tracking-[0.25em]">
                Explore More
              </Button>
            </FadeIn>
          </div>

          {/* Visual Composition Block (Video + Image) */}
          <div className="relative flex items-center justify-center">
            {/* Main large video container */}
            <div className="w-[85%] aspect-[4/5] rounded-3xl overflow-hidden border border-gold-base/20 shadow-2xl relative">
              <LazyVideo
                src="/videos/Video_20260514_170024.mp4"
                autoPlay
                loop
                muted
                playsInline
                rootMargin="900px"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping secondary floating image */}
            <div className="absolute bottom-[-10%] left-[-5%] w-[55%] aspect-square rounded-2xl overflow-hidden border border-gold-base/30 shadow-2xl z-20">
              <ParallaxImage
                src="/images/about.webp"
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
