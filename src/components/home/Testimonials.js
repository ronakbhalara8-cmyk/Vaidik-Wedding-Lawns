"use client";

import { useState, useEffect, useRef } from "react";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";

const testimonials = [
  {
    quote:
      "Hosting our wedding at Vaidik Wedding Lawns was the best decision we made. The Grand Lawn looked absolutely magical under the night lighting. The decorations were stellar and guest coordination was completely seamless. It was truly a royal experience!",
    author: "Aditi & Rahul",
    role: "Bride & Groom",
    event: "Maharaja Imperial Wedding (Nov 2025)",
  },
  {
    quote:
      "Vaidik's catering team wowed every single guest. From local Maharashtrian delicacies to exquisite international live counters, the food was spectacular. The private bridal suite was so spacious and comfortable for all my heavy vanity prep.",
    author: "Sneha & Karan",
    role: "Bride & Groom",
    event: "Signature Lawn Wedding (Dec 2025)",
  },
  {
    quote:
      "Excellent management, beautiful venue layout, and wonderful cooperation from the staff. They managed a guest crowd of 2,000+ effortlessly. The mandap setup was so grand it looked right out of a film set.",
    author: "Vikram Mehta",
    role: "Father of the Bride",
    event: "Royal Grand Reception (Jan 2026)",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textRef = useRef(null);
  const authorRef = useRef(null);

  const slideLeft = () => {
    // GSAP fade out
    gsap.to([textRef.current, authorRef.current], {
      opacity: 0,
      y: -10,
      duration: 0.3,
      onComplete: () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        // GSAP fade in
        gsap.fromTo(
          [textRef.current, authorRef.current],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 }
        );
      },
    });
  };

  const slideRight = () => {
    gsap.to([textRef.current, authorRef.current], {
      opacity: 0,
      y: 10,
      duration: 0.3,
      onComplete: () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        gsap.fromTo(
          [textRef.current, authorRef.current],
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4 }
        );
      },
    });
  };

  return (
    <section className="relative py-24 md:py-32 bg-cream text-charcoal overflow-hidden border-t border-maroon-base/5">
      {/* Background visual touches */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-gold-base/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-maroon-base/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center">
          <FadeIn direction="down" duration={0.8}>
            <span className="font-serif-heading text-xs tracking-[0.3em] uppercase text-maroon-base bg-maroon-light/10 border border-maroon-base/15 rounded-full px-4 py-1.5 inline-block mb-4">
              Eternal Stories
            </span>
          </FadeIn>
          <SplitReveal
            type="words"
            tag="h2"
            className="font-serif-heading text-3xl sm:text-4xl tracking-wide text-maroon-dark uppercase leading-tight font-bold"
          >
            Love Letters & Praise
          </SplitReveal>
        </div>

        {/* Testimonial slider card */}
        <div className="relative bg-white border border-maroon-base/10 rounded-3xl p-8 md:p-16 shadow-xl shadow-maroon-base/5">
          {/* Quote Icon Ornament */}
          <div className="w-16 h-16 rounded-full bg-maroon-light/5 border border-maroon-base/10 flex items-center justify-center mx-auto mb-8 text-maroon-base">
            <Quote className="w-6 h-6 fill-maroon-base/10 text-maroon-base" />
          </div>

          <p
            ref={textRef}
            className="font-sans text-xl md:text-xl text-charcoal/90 leading-relaxed font-light mb-8 max-w-2xl mx-auto"
          >
            "{testimonials[activeIndex].quote}"
          </p>

          <div ref={authorRef} className="flex flex-col gap-1 items-center">
            <span className="font-serif-heading text-base tracking-[0.1em] text-maroon-base uppercase font-semibold">
              {testimonials[activeIndex].author}
            </span>
            <span className="text-xs text-charcoal/50 font-light uppercase tracking-widest">
              {testimonials[activeIndex].role} • {testimonials[activeIndex].event}
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4 items-center justify-center mt-12">
            <button
              onClick={slideLeft}
              className="w-12 h-12 rounded-full border border-maroon-base/10 flex items-center justify-center text-maroon-base hover:bg-maroon-base hover:text-gold-light hover:border-gold-base transition-all duration-300"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    gsap.to([textRef.current, authorRef.current], {
                      opacity: 0,
                      duration: 0.2,
                      onComplete: () => {
                        setActiveIndex(idx);
                        gsap.fromTo([textRef.current, authorRef.current], { opacity: 0 }, { opacity: 1, duration: 0.3 });
                      }
                    });
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-gold-base w-6" : "bg-maroon-base/10"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={slideRight}
              className="w-12 h-12 rounded-full border border-maroon-base/10 flex items-center justify-center text-maroon-base hover:bg-maroon-base hover:text-gold-light hover:border-gold-base transition-all duration-300"
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
