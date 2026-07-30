"use client";

import {
  Award,
  ShieldCheck,
  HeartHandshake,
  MapPin,
  Users,
  Calendar,
  Sparkles,
  Car,
  Trees,
  CheckCircle2,
  Globe,         // NEW: NRI / International
  Building2,     // NEW: Corporate
  Film,          // NEW: Film & Fashion
  Crown,         // NEW: Premium Branding
} from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";
import ParallaxImage from "@/components/ui/ParallaxImage";

// Key Stats Data
const stats = [
  {
    icon: Calendar,
    value: "2021",
    label: "Established",
    subtext: "Crafting Timeless Memories",
  },
  {
    icon: Users,
    value: "2000+",
    label: "Guest Capacity",
    subtext: "Grand Celebrations",
  },
  {
    icon: Trees,
    value: "Expansive",
    label: "Lush Green Lawn",
    subtext: "Open-Air Luxury",
  },
];

// Core Features
const features = [
  {
    icon: Trees,
    title: "Expansive Lawn",
    desc: "Spacious, meticulously manicured green lawn designed to comfortably host grand weddings and lavish gatherings.",
  },
  {
    icon: Car,
    title: "Ample Parking Space",
    desc: "Hassle-free, dedicated parking facility capable of accommodating large fleets of vehicles for your guests.",
  },
  {
    icon: Sparkles,
    title: "Premium Bespoke Decor",
    desc: "Customizable stage setups, royal lighting rigs, and floral architecture tailored to match your dream vision.",
  },
  {
    icon: MapPin,
    title: "Easy & Prime Access",
    desc: "Conveniently located right on Sayan Hazira Ring Road, Surat, ensuring seamless connectivity for everyone.",
  },
];

// Brand Core Values
const values = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Excellence",
    description:
      "From minute stage details to grand entrance decor and safety protocols, every aspect is curated with regal perfection.",
  },
  {
    icon: Award,
    title: "Heritage Hospitality",
    description:
      "Grounded in traditional Gujarati & Indian culture, we welcome your guests with unmatched warmth, grace, and dignity.",
  },
  {
    icon: HeartHandshake,
    title: "Seamless Management",
    description:
      "We act as your extended family—coordinating logistics, decor, and timelines so you can enjoy your special day stress-free.",
  },
];

// ============================================================
// 🆕 NEW: Tagline from Image
// ============================================================
const brandTagline =
  "First Choice for Weddings, Corporate Events & Laxmi Celebrations";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* ---------------- 1. PAGE HERO HEADER ---------------- */}
      <section className="relative h-[42vh] min-h-[320px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 brightness-[0.35] scale-105 transition-transform duration-1000 pointer-events-none"
          style={{ backgroundImage: "url('/images/image-2.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/90 via-maroon-dark/40 to-maroon-dark pointer-events-none z-10" />

        <div className="relative z-20 text-center max-w-2xl px-6">
          <FadeIn direction="down" duration={0.6}>
            <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase mb-2 block">
              Surat&apos;s Premier Luxury Venue
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            About Vaidik Lawns
          </SplitReveal>
        </div>
      </section>

      {/* ---------------- 2. STATS BANNER ---------------- */}
      <section className="relative z-30 pt-20 container px-4 sm:px-6 max-w-5xl">
        <div className="bg-maroon-base/95 backdrop-blur-md border border-gold-base/30 rounded-2xl shadow-2xl p-5 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:divide-x divide-gold-base/20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-4 pt-4 md:pt-0 first:pt-0 md:first:pl-0 md:pl-6"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold-base/10 border border-gold-base/30 flex items-center justify-center text-gold-base shrink-0">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-gold-light">
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-ivory/90 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-gold-light/90 font-light">{stat.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- 3. MAIN STORY & ABOUT SECTION ---------------- */}
      <section className="container py-16 sm:pt-24 sm:pb-18 pb-9">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Parallax Image Grid */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold-base/20 shadow-2xl">
            <ParallaxImage
              src="/images/about-page.jpg"
              alt="Lush gardens at Vaidik Wedding Lawns Surat"
              className="w-full h-full object-cover"
              yOffset={8}
            />
            {/* Elegant Decorative Frame */}
            <div className="absolute top-4 left-4 bottom-4 right-4 border border-gold-base/30 rounded-2xl pointer-events-none z-10" />
            <div className="absolute bottom-6 right-6 bg-maroon-dark/90 backdrop-blur-sm border border-gold-base/40 text-gold-light px-5 py-3 rounded-xl shadow-lg z-20 hidden sm:block">
              <p className="font-serif-heading text-xs tracking-widest uppercase font-bold">
                Established 2021
              </p>
              <p className="text-[10px] text-ivory/70">Surat, Gujarat</p>
            </div>
          </div>

          {/* Vision Details */}
          <div className="flex flex-col gap-6">
            <div>
              <FadeIn direction="right" duration={0.8}>
                <span className="font-serif-heading text-xs tracking-[0.25em] text-maroon-base bg-maroon-light/10 border border-maroon-base/15 rounded-full px-4 py-1.5 inline-block uppercase font-medium mb-3">
                  The Vaidik Story
                </span>
              </FadeIn>
              <SplitReveal
                type="words"
                tag="h2"
                className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl text-maroon-dark uppercase leading-tight font-bold"
              >
                Where Luxury Meets the Open Sky
              </SplitReveal>
            </div>

            <FadeIn
              direction="up"
              duration={1.0}
              delay={0.2}
              distance={20}
              className="flex flex-col gap-4 text-charcoal/80 font-light leading-relaxed text-sm sm:text-base"
            >
              <p>
                Established in <strong className="font-semibold text-maroon-dark">2021</strong>,{" "}
                <span className="text-maroon-dark font-semibold">
                  Vaidik Wedding Lawns
                </span>{" "}
                was created with a vision to redefine luxury celebrations in Surat. We offer an enchanting open-air setting crafted to make grand weddings, corporate galas, and intimate ceremonies look and feel extraordinary.
              </p>
              <p>
                Spanning over vast manicured greens, our venue comfortably accommodates{" "}
                <strong className="font-semibold text-maroon-dark">2000+ guests</strong>. Designed with high-capacity rainwater drainage systems, state-of-the-art stage lighting setups, and dedicated vendor zones, we ensure your event runs smoothly regardless of scale.
              </p>
              <p>
                Whether it is a royal Wedding, Sangeet Sandhya, Ring Ceremony, or Corporate Celebration—our venue blends traditional hospitality with modern amenities to give your guests an unforgettable experience.
              </p>

              {/* 🆕 NEW: Brand Tagline from Image */}
              <p className="text-maroon-dark font-medium text-sm sm:text-base border-l-4 border-gold-base pl-4 italic">
                &ldquo;{brandTagline}&rdquo;
              </p>
            </FadeIn>

            {/* Event Highlights List */}
            <div className="pt-2 grid grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-maroon-dark">
              {[
                "Weddings & Receptions",
                "Sangeet & Mehendi",
                "Engagements & Rings",
                "Corporate Events",
                "Anniversaries & Galas",
                "All Special Celebrations",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-base shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4. KEY AMENITIES / WHY CHOOSE US ---------------- */}
      <section className="py-16 sm:pb-24 sm:pt-18 pb-9 bg-cream-dark/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
            <FadeIn direction="down" duration={0.8}>
              <span className="font-serif-heading text-xs tracking-[0.3em] text-maroon-base uppercase mb-2 block font-semibold">
                World-Class Facilities
              </span>
            </FadeIn>
            <SplitReveal
              type="words"
              tag="h2"
              className="font-serif-heading text-3xl md:text-4xl uppercase tracking-wide font-bold text-maroon-dark"
            >
              Designed For Grandeur
            </SplitReveal>
            <p className="text-sm text-charcoal/70 mt-2 font-light">
              Everything you need to host a flawless, stress-free occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gold-base/20 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-gold-base/50 transition-all duration-300 flex flex-col items-start group"
                >
                  <div className="w-12 h-12 rounded-xl bg-maroon-dark/5 text-maroon-dark group-hover:bg-maroon-dark group-hover:text-gold-light flex items-center justify-center transition-colors duration-300 mb-5 border border-maroon-dark/10 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-heading text-base sm:text-lg font-bold text-maroon-dark mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- 5. CORE VALUES SECTION ---------------- */}
      <section className="py-20 bg-maroon-dark text-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
            <FadeIn direction="down" duration={0.8}>
              <span className="font-serif-heading text-xs tracking-[0.3em] text-gold-base uppercase mb-3 block font-semibold">
                Our Commitment
              </span>
            </FadeIn>
            <SplitReveal
              type="words"
              tag="h2"
              className="font-serif-heading text-3xl md:text-4xl uppercase tracking-wide font-bold"
            >
              Our Core Principles
            </SplitReveal>
          </div>

          <FadeIn
            direction="up"
            duration={0.1}
            stagger={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-maroon-base/30 border border-gold-base/15 rounded-2xl p-8 hover:border-gold-base/40 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-base/10 flex items-center justify-center text-gold-base mb-6 border border-gold-base/20 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-heading text-lg tracking-wide uppercase text-gold-light mb-3 font-semibold">
                    {val.title}
                  </h3>
                  <p className="text-sm text-gold-light/70 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </FadeIn>
        </div>
      </section>

      {/* ---------------- 6. LOCATION / ADDRESS BANNER ---------------- */}
      <section className="py-16 bg-gold-light/10 border-t border-gold-base/20">
        <div className="container max-w-4xl text-center px-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-maroon-dark text-gold-base mb-4 shadow-md">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-serif-heading text-2xl uppercase font-bold text-maroon-dark mb-2">
            Visit Our Venue
          </h3>
          <p className="text-sm sm:text-base text-charcoal/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Near Kanad fatak, 300 feet, Sayan Hazira Ring Road, opp. Variyav Check Post, Surat
          </p>
          <div className="mt-6">
            <a
              href="https://www.google.com/maps/place/Vaidik+Lawns/@21.2554393,72.7932418,17z/data=!3m1!4b1!4m6!5m3!1s0x3be04bb4c96faac1:0x23787582c7f01b85!8m2!3d21.2554343!4d72.7958167!16s%2Fg%2F11xcf2p1k3?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-maroon-dark hover:bg-maroon-base text-gold-light text-xs sm:text-sm tracking-widest uppercase font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg"
            >
              <span>Get Directions</span>
              <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
