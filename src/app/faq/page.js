"use client";

import FAQ from "@/components/home/FAQ";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* Header */}
      <section className="relative h-[42vh] min-h-[320px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 brightness-[0.4] pointer-events-none"
          style={{ backgroundImage: "url('/images/reception_hall.png')" }}
        />
        <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />
        
        <div className="relative z-20 text-center max-w-2xl px-6">
          <FadeIn direction="down" duration={0.6}>
            <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase mb-2 block">
              Direct Support
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            FAQ & Guidelines
          </SplitReveal>
        </div>
      </section>

      {/* Main FAQ Component */}
      <FAQ />

      {/* Booking Guidelines and Checklist */}
      <section className="pb-24 max-w-4xl mx-auto px-6">
        <div className="bg-white border border-maroon-base/10 rounded-3xl p-8 md:p-12 shadow-xl">
          <h3 className="font-serif-heading text-xl uppercase tracking-wider text-maroon-dark mb-6 pb-2 border-b border-maroon-base/10">
            Booking & Planning Checklist
          </h3>
          <ul className="flex flex-col gap-6 text-sm text-charcoal/80 font-light leading-relaxed">
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-gold-base/10 text-gold-base flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
              <div>
                <strong className="font-serif-heading text-xs tracking-wider uppercase text-maroon-base block mb-1">Schedule a Site Tour</strong>
                Connect with our managers to book a private tour. Walk through the Grand Lawn, changing suites, and banquet hall to visualize layouts.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-gold-base/10 text-gold-base flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
              <div>
                <strong className="font-serif-heading text-xs tracking-wider uppercase text-maroon-base block mb-1">Lock the Date</strong>
                Verify date availability and place a 30% advance booking deposit. Signed contract copy guarantees price and scheduling locking.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-gold-base/10 text-gold-base flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
              <div>
                <strong className="font-serif-heading text-xs tracking-wider uppercase text-maroon-base block mb-1">Consult Decor & Food Counselors</strong>
                60 days before the wedding, finalize your theme decorations, stage size, visual floral arrays, and buffet menu counts.
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
