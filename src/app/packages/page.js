"use client";

import { Check, Calendar, Sparkles } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import Image from "next/image";

const packages = [
  {
    name: "Silver",
    subtitle: "Intimate & Elegant Ceremonies",
    price: "Custom Quote",
    features: [
      "Lawn & Banquet access for up to 1500 - 2000 guests",
      "Traditional floral mandap setup",
      "Curated multi-course vegetarian buffet dinner",
      "1 Luxury air-conditioned dressing suite",
      "Ambient lighting & basic audio setup",
      "Dedicated event manager & coordinator",
    ],
    highlighted: false,
  },
  {
    name: "Gold",
    subtitle: "Grand & Regal Royal Celebrations",
    price: "Custom Quote",
    features: [
      "Expanded Lawn capacity for up to 1500 - 2000 guests",
      "Premium thematic floral decor & entrance canopy",
      "Gourmet multi-cuisine live buffet counters",
      "2 Luxury air-conditioned dressing suites",
      "Stage lighting & premium acoustic audio system",
      "Welcome royal ushering & hospitality team",
    ],
    highlighted: false,
  },
  {
    name: "Platinum",
    subtitle: "Opulent & Bespoke Imperial Experience",
    price: "Custom Quote",
    features: [
      "Full venue access for up to 1500 - 2000 guests",
      "Bespoke luxury theme decor & floral canopy styling",
      "Elite Michelin-inspired live culinary stations",
      "4 Luxury dressing suites & VIP lounge access",
      "Live music orchestra or premium DJ coordination",
      "Professional audio, stage lighting & projections",
    ],
    highlighted: true,
  },
  {
    name: "Royal Destination",
    subtitle: "Ultimate All-Inclusive Takeover",
    price: "Custom Quote",
    features: [
      "Multi-day full venue & resort takeover",
      "Custom themes for Sangeet, Haldi & Wedding",
      "World-class global cuisine & live stations",
      "Complete guest concierge & luxury transport",
      "Presidential suites for Bride & Groom families",
      "Celebrity artist & grand production setup",
    ],
    highlighted: false,
  },
];

const compareFeatures = [
  { feature: "Exclusivity Limit", silver: "12 Hours", gold: "12 Hours", platinum: "24 Hours (Full Day)", destination: "Multi-Day Takeover" },
  { feature: "Guest Capacity", silver: "Up to 300", gold: "Up to 800", platinum: "Up to 1,200", destination: "1,500+ Unlimited" },
  { feature: "Dressing Suites", silver: "1 Suite", gold: "2 Suites", platinum: "4 Suites + VIP Lounge", destination: "Presidential Suites + Villas" },
  { feature: "Decor & Styling", silver: "Traditional Floral", gold: "Premium Theme Floral", platinum: "Bespoke Custom Canopy", destination: "Multi-Event Designer Decor" },
  { feature: "Dining Experience", silver: "Standard Veg Buffet", gold: "Multi-Cuisine Live Counters", platinum: "Gourmet Live Stations", destination: "Global Luxury Cuisines" },
  { feature: "Hospitality Team", silver: "10 Stewards", gold: "25 Stewards + Ushers", platinum: "50+ VIP Stewards", destination: "Dedicated 24/7 Concierge" },
  { feature: "Valet & Logistics", silver: "Standard Valet", gold: "Dedicated Valet", platinum: "VIP Priority Valet", destination: "End-to-End VIP Fleet" },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* Header Banner */}
      <section className="relative h-[40vh] min-h-[320px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory">
        <Image
          src="/images/image-2.webp"
          alt="Background"
          fill
          priority
          className="object-cover opacity-30 brightness-[0.4]"
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,INSERT_BLUR_DATA"
        />
        <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />

        <div className="relative z-20 text-center max-w-2xl px-4 sm:px-6">
          <FadeIn direction="down" duration={0.6}>
            <span className="font-serif-heading text-[10px] sm:text-xs tracking-[0.3em] text-gold-base uppercase mb-3 block">
              Curated Luxury Offerings
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

      {/* Main Packages Grid Section */}
      <section className="container py-12 sm:py-16 md:py-24 px-4 sm:px-6 mx-auto max-w-[1440px]">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 flex flex-col items-center">
          <FadeIn direction="down" duration={0.8}>
            <span className="font-serif-heading text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold-dark bg-gold-base/10 border border-gold-base/30 rounded-full px-3.5 py-1.5 inline-block mb-3">
              Select Your Plan
            </span>
          </FadeIn>
          <SplitReveal type="words" tag="h2" className="font-serif-heading text-2xl sm:text-4xl text-maroon-dark uppercase leading-tight font-bold mb-3">
            Services Crafted For Grand Unions
          </SplitReveal>
          <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
            Explore our curated package offerings tailored to deliver flawless luxury, exquisite dining, and unforgettable experiences.
          </p>
        </div>

        {/* 4 Packages Responsive Grid */}
        <FadeIn
          direction="up"
          duration={0.8}
          distance={40}
          className="mb-16 sm:mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-6 items-stretch">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-5 sm:p-6 xl:p-5 xl:py-6 flex flex-col justify-between transition-all duration-300 border relative group mt-4 lg:mt-0
                  ${pkg.highlighted
                    ? "bg-maroon-dark text-ivory border-gold-base shadow-2xl z-10 hover:shadow-gold-base/20"
                    : "bg-white text-charcoal border-maroon-base/15 hover:border-gold-base/40 shadow-md hover:shadow-lg"
                  }`}
              >
                {/* Highlight badge */}
                {pkg.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-grad-gold text-maroon-dark px-3.5 py-1 rounded-full font-serif-heading text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap shadow-md flex items-center gap-1 z-20">
                    <Sparkles className="w-3 h-3" /> Most Preferred
                  </span>
                )}

                <div>
                  <span className={`font-sans text-[11px] mb-1 block min-h-[28px] font-medium leading-tight ${pkg.highlighted ? "text-gold-base" : "text-gold-dark"}`}>
                    {pkg.subtitle}
                  </span>
                  <h3 className={`font-serif-heading text-lg xl:text-xl tracking-wide uppercase mb-3 font-semibold ${pkg.highlighted ? "text-ivory" : "text-maroon-dark"}`}>
                    {pkg.name}
                  </h3>

                  {/* Price Display */}
                  <div className={`border-b pb-4 mb-5 ${pkg.highlighted ? "border-gold-base/20" : "border-maroon-base/10"}`}>
                    <span className={`font-serif-heading text-xl xl:text-2xl font-medium block ${pkg.highlighted ? "text-gold-light" : "text-maroon-dark"}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-[10px] xl:text-[11px] font-light block mt-1 leading-tight ${pkg.highlighted ? "text-gold-light/60" : "text-charcoal/50"}`}>
                      Tax inclusive, tailored to guest count & menu
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="flex flex-col gap-2.5 mb-6">
                    {pkg.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className={`flex gap-2 items-start text-xs font-light leading-snug ${pkg.highlighted ? "text-gold-light/90" : "text-charcoal/80"}`}>
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pkg.highlighted ? "text-gold-base" : "text-gold-dark"}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-2">
                  <Button
                    href="/contact"
                    variant={pkg.highlighted ? "secondary" : "outline"}
                    className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold"
                  >
                    Inquire Package
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Detailed Comparison Table Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h3 className="font-serif-heading text-xl sm:text-3xl text-maroon-dark uppercase font-bold mb-2">
            Detailed Package Comparison
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/60 font-light">
            Compare core features across all packages to find your ideal match.
          </p>
        </div>

        {/* Comparison Table Container with Touch Scroll */}
        <FadeIn direction="up" duration={0.8} distance={30} className="rounded-3xl border border-maroon-base/10 shadow-xl bg-white p-4 sm:p-6 md:p-8 mb-16 sm:mb-20">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gold-base/20">
            <table className="w-full text-left border-collapse min-w-[650px] md:min-w-[750px]">
              <thead>
                <tr className="border-b border-maroon-base/15">
                  <th className="py-3.5 font-serif-heading text-xs tracking-wider uppercase text-maroon-dark pb-5">Core Service</th>
                  <th className="py-3.5 font-serif-heading text-xs tracking-wider uppercase text-maroon-dark pb-5">Silver</th>
                  <th className="py-3.5 font-serif-heading text-xs tracking-wider uppercase text-maroon-dark pb-5">Gold</th>
                  <th className="py-3.5 font-serif-heading text-xs tracking-wider uppercase text-gold-dark pb-5 font-bold bg-gold-base/5 px-3 rounded-t-lg">Platinum</th>
                  <th className="py-3.5 font-serif-heading text-xs tracking-wider uppercase text-maroon-dark pb-5">Royal Destination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-maroon-base/5 text-xs sm:text-sm text-charcoal/80">
                {compareFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-cream/40 transition-colors duration-200">
                    <td className="py-3.5 font-serif-heading text-xs tracking-widest uppercase text-gold-dark font-medium">{row.feature}</td>
                    <td className="py-3.5 font-light">{row.silver}</td>
                    <td className="py-3.5 font-light">{row.gold}</td>
                    <td className="py-3.5 text-maroon-dark font-medium bg-gold-base/5 px-3">{row.platinum}</td>
                    <td className="py-3.5 font-light">{row.destination}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* Dynamic Booking CTA Banner */}
        <div className="bg-maroon-dark text-ivory rounded-3xl p-6 sm:p-8 md:p-10 border border-gold-base/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />
          <div className="max-w-xl relative z-10 text-center md:text-left">
            <h3 className="font-serif-heading text-lg sm:text-xl md:text-2xl uppercase tracking-wider text-gold-base mb-2 font-semibold">
              Need A Custom Package Designed?
            </h3>
            <p className="text-xs md:text-sm text-gold-light/75 leading-relaxed font-light">
              Connect directly with our luxury event architects and culinary team. We will design a bespoke package perfectly tailored to your guest list and theme.
            </p>
          </div>
          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <Button href="/contact" variant="secondary" className="flex items-center justify-center w-full md:w-auto text-xs py-3 px-6">
              <Calendar className="w-4 h-4 mr-2" /> Inquire Custom Package
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}