"use client";

import Button from "../ui/Button";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";

export default function BookingCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-cream text-charcoal overflow-hidden border-t border-maroon-base/5">
      {/* Background soft glow effects */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-gold-base/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[500px] h-[500px] bg-maroon-base/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-grad-royal rounded-3xl p-8 md:p-20 text-center relative overflow-hidden border border-gold-base/20 shadow-2xl">
          {/* Decorative luxury vector lines */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.03)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Subtle gold frames in corners */}
          <div className="absolute top-6 left-6 bottom-6 right-6 border border-gold-base/10 rounded-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <FadeIn direction="down" duration={0.8}>
              <span className="font-serif-heading text-[10px] md:text-xs tracking-[0.4em] text-gold-base uppercase inline-block border-b border-gold-base/30 pb-2 mb-6">
                Reserve Your Date
              </span>
            </FadeIn>

            <SplitReveal
              type="words"
              tag="h2"
              className="font-serif-heading text-3xl sm:text-5xl tracking-wide text-gold-light uppercase leading-tight font-bold mb-6"
            >
              Orchestrate Your Royal Union
            </SplitReveal>

            <FadeIn direction="up" duration={1.0} delay={0.3} distance={20}>
              <p className="font-serif-sub italic text-lg md:text-2xl text-gold-light/60 leading-relaxed font-light mb-10">
                Let us shape your timeless love story into an unforgettable grand experience. Schedule a private guided tour of our majestic lawns today.
              </p>
            </FadeIn>

            <FadeIn direction="up" duration={0.8} delay={0.5} distance={20}>
              <Button href="/book-visit" variant="secondary" className="px-10 py-5 text-[11px] tracking-[0.25em]">
                Schedule Private Walkthrough
              </Button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
