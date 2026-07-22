"use client";

import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* Header */}
      <section className="relative h-[38vh] min-h-[280px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 brightness-[0.4] pointer-events-none"
          style={{ backgroundImage: "url('/images/wedding_lawn.png')" }}
        />
        <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />
        
        <div className="relative z-20 text-center max-w-2xl px-6">
          <FadeIn direction="down" duration={0.6}>
            <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase mb-2 block">
              Client Agreement
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            Terms of Service
          </SplitReveal>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-6">

        <FadeIn direction="up" duration={1.0} distance={20} className="flex flex-col gap-6 text-sm text-charcoal/70 leading-relaxed font-light">
          <p>
            By booking Vaidik Wedding Lawns or scheduling tours through this site, you agree to comply with our general event terms and venue policies.
          </p>
          <h2 className="font-serif-heading text-sm tracking-wider uppercase text-maroon-base font-semibold mt-4">
            1. Booking & Rescheduling Policies
          </h2>
          <p>
            All calendar date locks are secured only after a contract signature and payment of a 30% booking deposit. Deposits are non-refundable. Dates can be rescheduled up to 120 days before the wedding, subject to availability.
          </p>
          <h2 className="font-serif-heading text-sm tracking-wider uppercase text-maroon-base font-semibold mt-4">
            2. Sound, Audio & Fire Safety
          </h2>
          <p>
            Event operations must adhere strictly to local city noise ordinance levels (loud music permitted outdoors up to 10:00 PM). Pyrotechnics, fire hazards, and grand crackers must comply with fire station safety codes on our open lawns.
          </p>
          <h2 className="font-serif-heading text-sm tracking-wider uppercase text-maroon-base font-semibold mt-4">
            3. Damages & Liability
          </h2>
          <p>
            Clients are held liable for any major damages caused to venue buildings, dressing suites, palm garden fixtures, or lighting structures by their guests or third-party workers.
          </p>
          <p className="text-xs text-charcoal/45 mt-10">
            Last Updated: July 2026. Vaidik Wedding Lawns Booking Administration.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
