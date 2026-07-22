"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Button from "../ui/Button";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";

export default function Hero() {
  const bgRef = useRef(null);
  const heroRef = useRef(null);
  const isMountedRef = useRef(true);
  const animRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    // Parallax zoom effect on hero background
    const bg = bgRef.current;
    const hero = heroRef.current;
    if (!bg || !hero) return;

    try {
      const animation = gsap.fromTo(
        bg,
        { scale: 1.15, yPercent: -5 },
        {
          scale: 1.0,
          yPercent: 5,
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      animRef.current = animation;
    } catch (error) {
      console.warn("Hero animation error:", error);
    }

    return () => {
      isMountedRef.current = false;
      try {
        const animation = animRef.current;
        if (animation && typeof animation.kill === "function") {
          if (animation.scrollTrigger && typeof animation.scrollTrigger.kill === "function") {
            animation.scrollTrigger.kill();
          }
          animation.kill();
        }
        animRef.current = null;
      } catch (error) {
        // Silently ignore cleanup errors
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-maroon-dark text-ivory py-32"
    >
      {/* Background Image Layer with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[110%] bg-cover bg-center pointer-events-none brightness-[0.4]"
        style={{ backgroundImage: `url('/images/wedding_lawn.png')` }}
      />

      {/* Premium Luxury Overlay Grid */}
      <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_80%)] pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-20 flex flex-col items-center">
        {/* Sub-label reveal */}
        <FadeIn direction="down" duration={0.8} delay={0.2} className="mb-4">
          <span className="font-serif-heading text-xs md:text-sm tracking-[0.4em] text-gold-base uppercase inline-block border-b border-gold-base/30 pb-2">
            The Quintessential Luxury Lawn
          </span>
        </FadeIn>

        {/* Majestic Title Reveal */}
        <SplitReveal
          type="chars"
          stagger={0.02}
          duration={1.2}
          tag="h1"
          className="font-serif-heading text-4xl sm:text-6xl md:text-8xl tracking-[0.1em] text-ivory uppercase leading-[1.1] mb-6 max-w-5xl text-shadow-premium font-bold"
        >
          Where Royal Dreams Meet Timeless Celebrations
        </SplitReveal>

        {/* Subtitle Description */}
        <FadeIn direction="up" duration={1.0} delay={0.8} distance={20} className="mb-10 max-w-2xl">
          <p className="font-sans text-lg md:text-2xl text-gold-light/80 leading-relaxed font-light">
            Celebrate your grand union amidst lush manicured lawns, majestic mandaps, and curated hospitality crafted for royals.
          </p>
        </FadeIn>

        {/* Staggered Action CTAs */}
        <FadeIn direction="up" duration={1.0} delay={1.1} distance={30} stagger={0.2} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button href="/book-visit" variant="secondary" className="px-10 py-5 text-[11px] tracking-[0.25em]">
            Schedule Private Tour
          </Button>
          <Button href="/venues" variant="outline" className="px-10 py-5 text-[11px] tracking-[0.25em]">
            Explore Our Lawns
          </Button>
        </FadeIn>

        {/* Scroll down indicator micro-animation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
          <span className="font-serif-heading text-[9px] tracking-[0.3em] uppercase text-gold-base/60 animate-pulse">
            Scroll To Experience
          </span>
          <div className="w-[1px] h-10 bg-gold-base/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gold-base animate-scroll-indicator" />
          </div>
        </div>
      </div>
    </section>
  );
}
