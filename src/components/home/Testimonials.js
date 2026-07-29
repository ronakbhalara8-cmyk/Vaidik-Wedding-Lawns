"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Quote, Award, Calendar, Sparkles, ThumbsUp } from "lucide-react";

const testimonials = [
    {
        id: 1,
        quote: "Our wedding at this venue was beyond perfect. The team handled every detail with care, leaving me with a sense of genuine professionalism.",
        author: "David Leesen",
        role: "MANAGER",
        rating: 5,
        avatar: "DL",
        date: "March 2021",
        category: "Wedding",
        verified: true,
    },
    {
        id: 2,
        quote: "This venue has become our go-to for client meetings and team off-sites. The atmosphere is professional and welcoming.",
        author: "David Thompson",
        role: "CEO, GREENTREE CONSULTING",
        rating: 5,
        avatar: "DT",
        date: "February 2022",
        category: "Corporate",
        verified: true,
    },
    {
        id: 3,
        quote: "An exceptional venue that exceeded all our expectations. The staff was incredibly professional and attentive.",
        author: "Sarah Johnson",
        role: "EVENT COORDINATOR",
        rating: 5,
        avatar: "SJ",
        date: "January 2023",
        category: "Event",
        verified: false,
    },
    {
        id: 4,
        quote: "The perfect venue for our Wedding retreat. Beautiful spaces and outstanding service throughout.",
        author: "Michael Chen",
        role: "DIRECTOR OF OPERATIONS",
        rating: 5,
        avatar: "MC",
        date: "December 2024",
        category: "Wedding",
        verified: true,
    },
    {
        id: 5,
        quote: "Absolutely stunning venue! The attention to detail and customer service was second to none.",
        author: "Emma Williams",
        role: "EVENT PLANNER",
        rating: 5,
        avatar: "EW",
        date: "November 2025",
        category: "Event",
        verified: true,
    },
    {
        id: 6,
        quote: "We've hosted multiple events here and every time the experience gets better. Highly recommended!",
        author: "James Anderson",
        role: "CEO, ANDERSON GROUP",
        rating: 5,
        avatar: "JA",
        date: "March 2026",
        category: "Corporate",
        verified: false,
    }
];

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [position, setPosition] = useState(0);
    const sliderRef = useRef(null);
    const animationRef = useRef(null);
    const lastTimeRef = useRef(0);
    const autoPlayRef = useRef(null);

    // Set mounted state
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Continuous marquee animation using requestAnimationFrame
    useEffect(() => {
        if (!isMounted) return;

        const totalItems = testimonials.length;

        const animate = (timestamp) => {
            if (!lastTimeRef.current) {
                lastTimeRef.current = timestamp;
            }

            const delta = timestamp - lastTimeRef.current;
            lastTimeRef.current = timestamp;

            if (!isHovered) {
                const speed = 0.08;
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
    }, [isHovered, position, isMounted]);

    // Apply transform to slider
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${position}px)`;
        }
    }, [position]);

    // Auto-play functionality for navigation dots
    useEffect(() => {
        if (isAutoPlay && !isHovered && isMounted) {
            autoPlayRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
            }, 5000);
        }
        return () => clearInterval(autoPlayRef.current);
    }, [isAutoPlay, isHovered, isMounted]);

    const handleDotClick = (index) => {
        setActiveIndex(index);
        // Reset position to show the selected testimonial
        setPosition(index * (sliderRef.current?.children[0]?.offsetWidth || 0 + 24));
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(true), 5000);
    };

    // Render stars
    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? "fill-gold-base text-gold-base" : "text-gray-300"
                    }`}
            />
        ));
    };

    // Get visible testimonials for grid/list view
    const getVisibleTestimonials = () => {
        const items = [];
        for (let i = 0; i < 4; i++) {
            const index = (activeIndex + i) % testimonials.length;
            items.push({ ...testimonials[index], displayIndex: i });
        }
        return items;
    };

    const visibleTestimonials = getVisibleTestimonials();

    // Don't render anything until mounted on client
    if (!isMounted) {
        return null;
    }

    return (
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-18 bg-cream border-t border-pink-light/30 overflow-hidden">
            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 bg-pink-light/20 border border-gold-light/30 rounded-full px-4 py-1.5 sm:px-6 sm:py-2 mb-4 sm:mb-6">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-base" />
                        <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.3em] uppercase text-maroon-base font-medium">
                            Client Testimonials
                        </span>
                    </div>

                    <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-maroon-dark uppercase leading-tight font-bold">
                        Real Stories from Real People
                    </h2>

                    {/* <div className="w-12 h-0.5 bg-gold-base mt-4 mx-auto"></div> */}

                    <p className="font-sans text-sm sm:text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto font-light">
                        Discover why thousands of clients trust us with their special moments
                    </p>
                </div>

                {/* Marquee Slider */}
                <div
                    className="relative mt-8 md:mt-12 overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Gradient overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>

                    <div
                        ref={sliderRef}
                        className="flex gap-6 will-change-transform"
                        style={{
                            transition: 'none',
                            width: 'fit-content'
                        }}
                    >
                        {/* Duplicate testimonials 3 times for seamless scrolling */}
                        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px]"
                            >
                                <div className="group relative bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gold-light/20 hover:border-gold-base/50 flex flex-col items-start text-left h-full min-h-[300px] sm:min-h-[320px]">
                                    {/* Verified Badge */}
                                    {testimonial.verified && (
                                        <div className="absolute top-3 right-3">
                                            <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                                                <Award className="w-3 h-3 text-green-600" />
                                                <span className="text-[8px] font-medium text-green-600">Verified</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="mb-3">
                                        <span className="inline-block text-[8px] sm:text-[10px] font-medium uppercase tracking-wider text-white bg-gradient-to-r from-maroon-base to-maroon-light px-2.5 py-1 rounded-full">
                                            {testimonial.category}
                                        </span>
                                    </div>

                                    {/* Quote Icon */}
                                    <div className="mb-3 text-gold-base/20 group-hover:text-gold-base/40 transition-all duration-300">
                                        <Quote className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex gap-0.5 sm:gap-1 mb-3">
                                        {renderStars(testimonial.rating)}
                                    </div>

                                    {/* Quote */}
                                    <p className="font-sans text-sm sm:text-base text-charcoal leading-relaxed font-light italic line-clamp-4 flex-1">
                                        "{testimonial.quote}"
                                    </p>

                                    {/* Author Info */}
                                    <div className="mt-4 pt-4 border-t border-gold-light/20 w-full">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="relative">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gold-base to-maroon-base flex items-center justify-center text-white font-serif-heading font-bold text-xs sm:text-sm shadow-lg">
                                                    {testimonial.avatar}
                                                </div>
                                                {testimonial.verified && (
                                                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                                                        <Award className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-serif-heading text-sm sm:text-base font-semibold text-maroon-dark truncate group-hover:text-gold-base transition-colors duration-300">
                                                    {testimonial.author}
                                                </p>
                                                <p className="text-[8px] sm:text-[10px] text-maroon-light font-medium uppercase tracking-widest truncate">
                                                    {testimonial.role}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <Calendar className="w-3 h-3 text-maroon-light/60" />
                                                    <p className="text-[8px] sm:text-[10px] text-maroon-dark">
                                                        {testimonial.date}
                                                    </p>
                                                </div>
                                            </div>
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