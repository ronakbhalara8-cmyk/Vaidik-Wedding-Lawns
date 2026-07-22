"use client";

import { Check, Info, Calendar } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

const compareFeatures = [
  { feature: "Exclusivity Limit", classic: "12 Hours", maharaja: "24 Hours (Full Day)", pheras: "12 Hours" },
  { feature: "Accommodates", classic: "500 Guests", maharaja: "1,500 Guests", pheras: "800 Guests" },
  { feature: "Luxury Suites", classic: "2 Suites", maharaja: "4 Suites + VIP Lounge", pheras: "2 Suites" },
  { feature: "Mandap Decoration", classic: "Standard Floral", maharaja: "Bespoke Theme Custom", pheras: "Sacred Vedic Canopy" },
  { feature: "Dining Options", classic: "Premium Buffet", maharaja: "Michelin Gourmet Live", pheras: "Traditional Veg Feast" },
  { feature: "Staff Stewards", classic: "15 Stewards", maharaja: "50 + VIP Hosts", pheras: "25 Stewards" },
  { feature: "Valet Service", classic: "Valet Parking", maharaja: "VIP Dedicated Valet", pheras: "Valet Parking" },
];

export default function PackagesPage() {
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
              Luxury Options
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            Wedding Packages
          </SplitReveal>
        </div>
      </section>

      {/* Main Info */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <SplitReveal type="words" tag="h2" className="font-serif-heading text-2xl sm:text-4xl text-maroon-dark uppercase leading-tight font-bold mb-4">
            Curated Services Crafted For Grand Unions
          </SplitReveal>
          <p className="text-sm md:text-base text-charcoal/60 leading-relaxed font-light">
            We provide three distinct levels of wedding packages, each tailored to elevate your union with luxury aesthetics and seamless hospitality.
          </p>
        </div>

        {/* Detailed Comparison Table */}
        <FadeIn direction="up" duration={1.0} distance={30} className="overflow-x-auto rounded-3xl border border-maroon-base/10 shadow-xl bg-white p-6 md:p-8">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-maroon-base/10">
                <th className="py-4 font-serif-heading text-xs tracking-wider uppercase text-maroon-dark pb-6">Core Service</th>
                <th className="py-4 font-serif-heading text-xs tracking-wider uppercase text-maroon-dark pb-6">Classic Elegance</th>
                <th className="py-4 font-serif-heading text-xs tracking-wider uppercase text-maroon-base pb-6 font-bold">Maharaja Imperial</th>
                <th className="py-4 font-serif-heading text-xs tracking-wider uppercase text-maroon-dark pb-6">Royal Pheras</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-maroon-base/5 text-sm text-charcoal/80">
              {compareFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-cream/30 transition-colors duration-200">
                  <td className="py-4 font-serif-heading text-xs tracking-widest uppercase text-gold-dark font-medium">{row.feature}</td>
                  <td className="py-4 font-light">{row.classic}</td>
                  <td className="py-4 text-maroon-base font-medium">{row.maharaja}</td>
                  <td className="py-4 font-light">{row.pheras}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>

        {/* Dynamic Booking CTA Banner */}
        <div className="mt-20 bg-maroon-dark text-ivory rounded-3xl p-8 md:p-12 border border-gold-base/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(212,175,55,0.04)_0%,transparent_60%)] pointer-events-none" />
          <div className="max-w-xl relative z-10">
            <h3 className="font-serif-heading text-xl md:text-2xl uppercase tracking-wider text-gold-base mb-3 font-semibold">
              Want a Tailored Customized Event?
            </h3>
            <p className="text-sm text-gold-light/75 leading-relaxed font-light">
              Connect directly with our in-house luxury decorators and food counselors. We will construct a bespoke layout matching your guest count and design parameters perfectly.
            </p>
          </div>
          <div className="shrink-0 relative z-10">
            <Button href="/book-visit" variant="secondary">
              <Calendar className="w-4 h-4 mr-2" /> Inquire Custom Package
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
