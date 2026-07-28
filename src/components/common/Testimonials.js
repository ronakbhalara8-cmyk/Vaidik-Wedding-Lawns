"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Calendar, Award, Sparkles, ThumbsUp } from "lucide-react";

const testimonials = [
    {
        id: 1,
        quote: "Our wedding at this venue was beyond perfect. The team handled every detail with care, leaving me with a sense of genuine professionalism.",
        author: "David Leesen",
        role: "MANAGER",
        rating: 5,
        avatar: "DL",
        date: "March 2026",
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
        date: "February 2026",
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
        date: "January 2026",
        category: "Event",
        verified: false,
    },
    {
        id: 4,
        quote: "The perfect venue for our corporate retreat. Beautiful spaces and outstanding service throughout.",
        author: "Michael Chen",
        role: "DIRECTOR OF OPERATIONS",
        rating: 5,
        avatar: "MC",
        date: "December 2025",
        category: "Corporate",
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
        date: "October 2025",
        category: "Corporate",
        verified: false,
    }
];

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [viewMode, setViewMode] = useState("grid");
    const [isMounted, setIsMounted] = useState(false);
    const autoPlayRef = useRef(null);

    // Set mounted state
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (isAutoPlay && !isHovered && isMounted) {
            autoPlayRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
            }, 4000);
        }
        return () => clearInterval(autoPlayRef.current);
    }, [isAutoPlay, isHovered, isMounted]);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(true), 3000);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(true), 3000);
    };

    const getVisibleTestimonials = () => {
        const items = [];
        for (let i = 0; i < 4; i++) {
            const index = (activeIndex + i) % testimonials.length;
            items.push({ ...testimonials[index], displayIndex: i });
        }
        return items;
    };

    const visibleTestimonials = getVisibleTestimonials();

    // Render stars
    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-gold-base text-gold-base" : "text-gray-300"
                    }`}
            />
        ));
    };

    // Don't render anything until mounted on client
    if (!isMounted) {
        return null;
    }

    return (
        <section className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-cream via-white to-cream overflow-hidden">
            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-base/10 to-maroon-base/10 border border-gold-light/30 rounded-full px-4 py-1.5 sm:px-6 sm:py-2 mb-4 sm:mb-6">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-base" />
                        <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.3em] uppercase text-maroon-base font-medium">
                            Client Testimonials
                        </span>
                    </div>

                    <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-maroon-dark font-bold leading-tight">
                        Real Stories from
                        <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-gold-base to-maroon-base bg-clip-text text-transparent">
                            Real People
                        </span>
                    </h2>

                    <p className="font-sans text-sm sm:text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto mt-4 sm:mt-6 font-light">
                        Discover why thousands of clients trust us with their special moments
                    </p>
                </div>

                {/* View Mode Toggle */}
                <div className="flex justify-end mb-6 sm:mb-8">
                    <div className="inline-flex rounded-full border border-gold-light/30 bg-white/50 backdrop-blur-sm p-1">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${viewMode === "grid"
                                ? "bg-gradient-to-r from-gold-base to-maroon-base text-white shadow-lg"
                                : "text-maroon-light hover:text-maroon-base"
                                }`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${viewMode === "list"
                                ? "bg-gradient-to-r from-gold-base to-maroon-base text-white shadow-lg"
                                : "text-maroon-light hover:text-maroon-base"
                                }`}
                        >
                            List
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {viewMode === "grid" ? (
                        // Grid View
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {visibleTestimonials.map((testimonial, idx) => (
                                <div
                                    key={`${testimonial.id}-${activeIndex}`}
                                    className={`group relative bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gold-light/20 hover:border-gold-base/50 ${idx === 0 ? "lg:scale-105" : ""
                                        }`}
                                >
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
                                    <div className="mb-3 sm:mb-4">
                                        <span className="inline-block text-[8px] sm:text-[10px] font-medium uppercase tracking-wider text-white bg-gradient-to-r from-maroon-base to-maroon-light px-2.5 py-1 rounded-full">
                                            {testimonial.category}
                                        </span>
                                    </div>

                                    {/* Quote Icon */}
                                    <div className="mb-3 text-gold-base/20 group-hover:text-gold-base/40 transition-all duration-300 group-hover:scale-110">
                                        <Quote className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                                        {renderStars(testimonial.rating)}
                                    </div>

                                    {/* Quote */}
                                    <p className="font-sans text-sm sm:text-base text-charcoal leading-relaxed font-light italic line-clamp-4">
                                        "{testimonial.quote}"
                                    </p>

                                    {/* Author Info */}
                                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gold-light/20">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="relative">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gold-base to-maroon-base flex items-center justify-center text-white font-serif-heading font-bold text-xs sm:text-sm shadow-lg group-hover:shadow-xl transition-all duration-300">
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
                                                    <p className="text-[8px] sm:text-[10px] text-maroon-light/60">
                                                        {testimonial.date}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // List View
                        <div className="space-y-4 sm:space-y-6">
                            {visibleTestimonials.map((testimonial, idx) => (
                                <div
                                    key={`${testimonial.id}-${activeIndex}`}
                                    className="group relative bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4 border-gold-base hover:border-maroon-base"
                                >
                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                                        {/* Left Side - Avatar & Info */}
                                        <div className="sm:w-48 lg:w-64 flex-shrink-0">
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className="relative">
                                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gold-base to-maroon-base flex items-center justify-center text-white font-serif-heading font-bold text-sm sm:text-base shadow-lg">
                                                        {testimonial.avatar}
                                                    </div>
                                                    {testimonial.verified && (
                                                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                                                            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-serif-heading text-base sm:text-lg font-semibold text-maroon-dark">
                                                        {testimonial.author}
                                                    </p>
                                                    <p className="text-[10px] sm:text-xs text-maroon-light font-medium uppercase tracking-widest">
                                                        {testimonial.role}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Calendar className="w-3 h-3 text-maroon-light/60" />
                                                        <p className="text-[10px] sm:text-xs text-maroon-light/60">
                                                            {testimonial.date}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Content */}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="inline-block text-[8px] sm:text-[10px] font-medium uppercase tracking-wider text-white bg-gradient-to-r from-maroon-base to-maroon-light px-2.5 py-1 rounded-full">
                                                    {testimonial.category}
                                                </span>
                                                <div className="flex gap-0.5">
                                                    {renderStars(testimonial.rating)}
                                                </div>
                                                {testimonial.verified && (
                                                    <span className="text-[10px] font-medium text-green-600 flex items-center gap-1">
                                                        <Award className="w-3 h-3" /> Verified
                                                    </span>
                                                )}
                                            </div>
                                            <p className="font-sans text-sm sm:text-base text-charcoal leading-relaxed font-light italic">
                                                "{testimonial.quote}"
                                            </p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <ThumbsUp className="w-4 h-4 text-gold-base" />
                                                <span className="text-xs text-maroon-light/60">Found this helpful</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Navigation Controls */}
                    <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center gap-4 sm:gap-6">
                        {/* Progress Dots */}
                        <div className="flex gap-1.5 sm:gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setIsAutoPlay(false);
                                        setTimeout(() => setIsAutoPlay(true), 3000);
                                    }}
                                    className={`transition-all duration-500 rounded-full ${index === activeIndex
                                        ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-gradient-to-r from-gold-base to-maroon-base"
                                        : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-light/50 hover:bg-pink-light"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <button
                                onClick={handlePrev}
                                className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl border border-gold-light/30 text-maroon-base hover:bg-gradient-to-r hover:from-gold-base hover:to-maroon-base hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-xs sm:text-sm font-medium text-maroon-light">
                                    {activeIndex + 1} / {testimonials.length}
                                </span>
                                <button
                                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                                    className="text-[10px] sm:text-xs font-medium text-maroon-light hover:text-maroon-base transition-colors duration-300 uppercase tracking-wider flex items-center gap-1.5"
                                >
                                    <Sparkles className={`w-3 h-3 sm:w-4 sm:h-4 ${isAutoPlay ? "text-gold-base" : "text-maroon-light"}`} />
                                    {isAutoPlay ? "Auto" : "Manual"}
                                </button>
                            </div>

                            <button
                                onClick={handleNext}
                                className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl border border-gold-light/30 text-maroon-base hover:bg-gradient-to-r hover:from-gold-base hover:to-maroon-base hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-12 border-t border-gold-light/20">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-gold-base">500+</div>
                            <p className="text-xs sm:text-sm text-maroon-light font-medium mt-1">Happy Clients</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-gold-base text-gold-base" />
                                ))}
                            </div>
                            <p className="text-xs sm:text-sm text-maroon-light font-medium mt-1">5.0 Average Rating</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-serif-heading font-bold text-gold-base">98%</div>
                            <p className="text-xs sm:text-sm text-maroon-light font-medium mt-1">Would Recommend</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}