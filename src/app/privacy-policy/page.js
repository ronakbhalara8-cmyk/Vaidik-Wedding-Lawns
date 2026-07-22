"use client";

import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* Header */}
      <section className="relative h-[38vh] min-h-[280px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 brightness-[0.4] pointer-events-none"
          style={{ backgroundImage: "url('/images/reception_hall.png')" }}
        />
        <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />
        
        <div className="relative z-20 text-center max-w-2xl px-6">
          <FadeIn direction="down" duration={0.6}>
            <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase mb-2 block">
              Legal Statement
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            Privacy Policy
          </SplitReveal>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-6">

        <FadeIn direction="up" duration={1.0} distance={20} className="flex flex-col gap-6 text-sm text-charcoal/70 leading-relaxed font-light">
          <p>
            Welcome to Vaidik Wedding Lawns. We respect your privacy and are committed to protecting any personally identifiable information you may provide through our booking systems and contact forms.
          </p>
          <h2 className="font-serif-heading text-sm tracking-wider uppercase text-maroon-base font-semibold mt-4">
            1. Information We Collect
          </h2>
          <p>
            When you inquire about our lawns, book a visit, or request catering catalog pricing, we collect basic details such as your Name, Phone number, Email address, expected guest counts, and estimated wedding dates.
          </p>
          <h2 className="font-serif-heading text-sm tracking-wider uppercase text-maroon-base font-semibold mt-4">
            2. How We Use Your Information
          </h2>
          <p>
            This data is used strictly to coordinate appointments, send custom-tailored package quotes, check calendar dates, and verify booking status with you. We do not sell, rent, or lease our list to external agencies.
          </p>
          <h2 className="font-serif-heading text-sm tracking-wider uppercase text-maroon-base font-semibold mt-4">
            3. Security Protocols
          </h2>
          <p>
            Vaidik implements robust digital storage security to shield your information. Data transmissions on our site use secure SSL encryption protocols.
          </p>
          <p className="text-xs text-charcoal/45 mt-10">
            Last Updated: July 2026. Vaidik Wedding Lawns Booking Administration.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
