"use client";

import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";

const reviews = [
  {
    quote:
      "Our wedding at this venue was beyond perfect. The team handled every detail with care, leaving me with a sense of genuine professionalism.",
    author: "David Leesen",
    role: "MANAGER",
    rating: 5,
  },
  {
    quote:
      "This venue has become our go-to for client meetings and team off-sites. The atmosphere is professional and welcoming.",
    author: "David Thompson",
    role: "CEO, GREENTREE CONSULTING",
    rating: 5,
  },
  {
    quote:
      "An exceptional venue that exceeded all our expectations. The staff was incredibly professional and attentive.",
    author: "Sarah Johnson",
    role: "EVENT COORDINATOR",
    rating: 5,
  },
  {
    quote:
      "The perfect venue for our corporate retreat. Beautiful spaces and outstanding service throughout.",
    author: "Michael Chen",
    role: "DIRECTOR OF OPERATIONS",
    rating: 5,
  },
  {
    quote:
      "Our wedding at this venue was beyond perfect. The team handled every detail with care, leaving me with a sense of genuine professionalism.",
    author: "David Leesen",
    role: "MANAGER",
    rating: 5,
  },
  {
    quote:
      "This venue has become our go-to for client meetings and team off-sites. The atmosphere is professional and welcoming.",
    author: "David Thompson",
    role: "CEO, GREENTREE CONSULTING",
    rating: 5,
  },
  {
    quote:
      "An exceptional venue that exceeded all our expectations. The staff was incredibly professional and attentive.",
    author: "Sarah Johnson",
    role: "EVENT COORDINATOR",
    rating: 5,
  },
  {
    quote:
      "The perfect venue for our corporate retreat. Beautiful spaces and outstanding service throughout.",
    author: "Michael Chen",
    role: "DIRECTOR OF OPERATIONS",
    rating: 5,
  },
];

export default function ReviewSection() {
  const [visibleCount, setVisibleCount] = useState(3);
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const lastTimeRef = useRef(0);

  // Handle responsive card count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous marquee animation using requestAnimationFrame
  useEffect(() => {
    const totalItems = reviews.length;

    const animate = (timestamp) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused) {
        const speed = 0.12;
        const newPosition = position + delta * speed;

        const firstChild = sliderRef.current?.children[0];
        if (firstChild) {
          const cardWidth = firstChild.offsetWidth || 0;
          const gap = 24;
          const totalWidth = cardWidth + gap;

          const cardsPassed = newPosition / totalWidth;

          if (cardsPassed >= totalItems) {
            setPosition(newPosition - (totalItems * totalWidth));
          } else {
            setPosition(newPosition);
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, position]);

  // Apply transform to slider
  useEffect(() => {
    if (sliderRef.current) {
      const firstChild = sliderRef.current.children[0];
      if (firstChild) {
        const cardWidth = firstChild.offsetWidth || 0;
        const gap = 24;
        const totalWidth = cardWidth + gap;
        sliderRef.current.style.transform = `translateX(-${position}px)`;
      }
    }
  }, [position]);

  // Get card width based on visible count
  const getCardWidth = () => {
    if (visibleCount === 1) return '100%';
    if (visibleCount === 2) return 'calc(50% - 12px)';
    return 'calc(33.333% - 16px)';
  };

  // Handle hover pause
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    lastTimeRef.current = 0;
  };

  // Create enough duplicates for seamless scrolling
  const extendedTestimonials = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-cream border-t border-pink-light/30 overflow-hidden">
      <div className="container text-center relative z-10">

        {/* Section Title - Sticky Header with brand styling */}
        <div className="sticky top-0 z-20 bg-cream/95 backdrop-blur-sm border-b border-pink-light/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="container">
            <FadeIn direction="down" duration={0.8}>
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-maroon-base bg-pink-light/20 border border-gold-light/30 rounded-full px-4 py-1.5 inline-block mb-4 font-medium">
                Client Review
              </span>
            </FadeIn>
            <SplitReveal
              type="words"
              tag="h2"
              className="font-serif-heading text-3xl sm:text-4xl md:text-5xl tracking-wide text-maroon-dark uppercase leading-tight font-bold"
            >
              Trusted by Many
            </SplitReveal>
            <div className="w-12 h-0.5 bg-gold-base mt-4 mx-auto"></div>
          </div>
        </div>

        {/* Reviews Slider - Smooth Continuous Marquee */}
        <div
          className="relative mt-8 md:mt-12 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradient overlays with brand colors */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>

          <div
            ref={sliderRef}
            className="flex gap-6 md:gap-8 will-change-transform"
            style={{
              transition: 'none',
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{
                  width: getCardWidth()
                }}
              >
                <div className="bg-white border border-pink-light/30 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gold-base/50 flex flex-col items-start text-left h-full min-h-[280px] md:min-h-[300px] group">
                  {/* Rating Stars with brand colors */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-gold-base text-gold-base"
                      />
                    ))}
                  </div>

                  {/* Quote with brand styling */}
                  <div className="flex-1">
                    <p className="font-sans text-sm sm:text-base text-charcoal leading-relaxed font-light">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Author with brand colors */}
                  <div className="mt-6 pt-6 border-t border-pink-light/30 w-full">
                    <div className="flex flex-col">
                      <span className="font-serif-heading text-base font-semibold text-maroon-dark">
                        {testimonial.author}
                      </span>
                      <span className="text-[10px] text-maroon-light font-medium uppercase tracking-widest mt-0.5">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
