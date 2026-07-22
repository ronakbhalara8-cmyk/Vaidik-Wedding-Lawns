"use client";

import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import SplitReveal from "@/components/ui/SplitReveal";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-maroon-dark text-ivory flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute top-10 left-10 bottom-10 right-10 border border-gold-base/10 rounded-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-6">
        <FadeIn direction="down" duration={0.8} distance={30}>
          <span className="font-serif-heading text-[11px] tracking-[0.4em] text-gold-base uppercase inline-block border-b border-gold-base/30 pb-2">
            Error 404
          </span>
        </FadeIn>

        <SplitReveal
          type="words"
          tag="h1"
          className="font-serif-heading text-4xl sm:text-5xl tracking-wide text-gold-light uppercase leading-tight font-bold"
        >
          The Sacred Stage Could Not Be Found
        </SplitReveal>

        <FadeIn direction="up" duration={1.0} delay={0.4} distance={20}>
          <p className="font-sans text-lg md:text-xl text-gold-light/60 leading-relaxed font-light mb-8">
            The path you followed has wandered away from the wedding celebration. Let us guide you back to the main ceremony.
          </p>
        </FadeIn>

        <FadeIn direction="up" duration={0.8} delay={0.6} distance={20}>
          <Button href="/" variant="secondary">
            Return to Ceremony
          </Button>
        </FadeIn>
      </div>
    </div>
  );
}
