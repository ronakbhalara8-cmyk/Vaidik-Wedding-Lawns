"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Trees,
    ParkingCircle,
    Sparkles,
    MapPin,
    PartyPopper,
    ArrowUpRight,
    ArrowRight
} from 'lucide-react';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
    const [activeIndex, setActiveIndex] = useState(0);
    const contentRef = useRef(null);
    const cardRef = useRef(null);

    const features = [
        {
            id: "01",
            icon: Trees,
            title: "Spacious Lawn",
            category: "Serene Environment",
            desc: "Expansive green lawns crafted to host grand gatherings, offering a fresh, natural, and opulent outdoor atmosphere."
        },
        {
            id: "02",
            icon: ParkingCircle,
            title: "Ample Parking Space",
            category: "Seamless Arrival",
            desc: "Dedicated and secure parking layout designed to accommodate large guest volumes smoothly without any hassle."
        },
        {
            id: "03",
            icon: Sparkles,
            title: "Premium Decor & Lighting",
            category: "Bespoke Aesthetics",
            desc: "Exquisite decoration setups and sophisticated lighting concepts that add a royal touch to every celebration."
        },
        {
            id: "04",
            icon: MapPin,
            title: "Prime & Accessible Location",
            category: "Convenient Access",
            desc: "Strategically situated near key city routes, ensuring effortless navigation and comfortable travel for attendees."
        },
        {
            id: "05",
            icon: PartyPopper,
            title: "Weddings & Corporate Events",
            category: "Versatile Venue",
            desc: "Fully equipped to adapt seamlessly to royal weddings, receptions, grand celebrations, and corporate galas."
        }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const totalSteps = features.length;

            const trigger = ScrollTrigger.create({
                trigger: contentRef.current,
                start: "top 120px",
                end: () => `+=${window.innerHeight * 5}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                onUpdate: (self) => {
                    const step = Math.min(
                        Math.floor(self.progress * totalSteps),
                        totalSteps - 1
                    );
                    setActiveIndex((prev) => {
                        if (prev !== step) {
                            gsap.fromTo(
                                cardRef.current,
                                { opacity: 0.5, y: 10 },
                                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                            );
                        }
                        return step;
                    });
                }
            });

            return () => trigger.kill();
        }, contentRef);

        return () => ctx.revert();
    }, [features.length]);

    return (
        <section className="bg-[var(--color-ivory,#FDF2EF)] w-full py-12 md:py-16 lg:py-20 overflow-hidden">
            {/* Main Container - NO padding on large screens */}
            <div className="w-full container">
                {/* Header Section with padding */}
                <div className="px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12 lg:mb-16 text-center shrink-0">
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-[#8d2c3f]/10 border border-[#8d2c3f]/20 mb-5 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#DC873E] animate-pulse" />
                        <span className="text-[9px] sm:text-xs font-semibold tracking-[0.2em] text-[#8d2c3f] uppercase">
                            Unrivaled Excellence
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-4xl md:text-5xl font-serif-heading font-bold text-[#8d2c3f] tracking-wide">
                        Why Choose Us
                    </h2>
                </div>

                {/* Content Section - Full width with minimal padding for text readability */}
                <div
                    ref={contentRef}
                    className="w-full px-4 sm:px-6 lg:px-8"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center w-full max-w-[1320px] mx-auto">
                        {/* Left Column: Spotlight Card */}
                        <div className="lg:col-span-5 w-full">
                            <div
                                ref={cardRef}
                                className="w-full h-[380px] lg:h-[420px] xl:h-[460px] flex flex-col justify-between p-6 lg:p-8 xl:p-9 bg-[var(--color-maroon-base,#813241)] text-white rounded-2xl relative overflow-hidden shadow-2xl"
                            >
                                {/* Decorative Accent */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-orange-warm,#DC873E)]/10 rounded-full blur-3xl pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4 lg:mb-5 xl:mb-6">
                                        <span className="text-3xl lg:text-4xl xl:text-5xl font-serif-heading font-light text-[var(--color-pink-light,#F0D0CA)]/30">
                                            {features[activeIndex].id}
                                        </span>

                                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--color-orange-warm,#DC873E)]/20 flex items-center justify-center text-[var(--color-orange-warm,#DC873E)] border border-[var(--color-orange-warm,#DC873E)]/30">
                                            {React.createElement(features[activeIndex].icon, { className: "w-5 h-5 lg:w-6 lg:h-6" })}
                                        </div>
                                    </div>

                                    <span className="text-[10px] lg:text-xs uppercase tracking-widest text-[var(--color-orange-warm,#DC873E)] font-semibold block mb-2">
                                        {features[activeIndex].category}
                                    </span>

                                    <h3 className="font-serif-heading text-xl lg:text-2xl xl:text-3xl font-medium text-[var(--color-ivory,#FDF2EF)] mb-2 lg:mb-3 xl:mb-4">
                                        {features[activeIndex].title}
                                    </h3>

                                    <p className="text-sm text-[var(--color-pink-light,#F0D0CA)]/90 font-normal leading-relaxed line-clamp-4">
                                        {features[activeIndex].desc}
                                    </p>
                                </div>

                                <div className="relative z-10 pt-4 lg:pt-5 border-t border-white/10 flex items-center justify-between">
                                    <Button
                                        href="/contact"
                                        variant="secondary"
                                        className="px-5 py-2.5 lg:px-6 lg:py-3 text-[10px] sm:text-[11px] tracking-[0.2em] w-full sm:w-auto text-center"
                                    >
                                        Plan Your Wedding
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Scroll List */}
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            {features.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = activeIndex === index;

                                return (
                                    <div
                                        key={item.id}
                                        className={`group relative py-3 lg:py-3.5 xl:py-4 border-b border-[var(--color-pink-light,#F0D0CA)]/60 transition-all duration-300 flex items-center justify-between ${isActive ? 'pl-3' : 'pl-0 hover:pl-2'
                                            }`}
                                    >
                                        <div
                                            className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--color-maroon-base,#813241)] transition-all duration-300 ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                                                }`}
                                        />

                                        <div className="flex items-center gap-3 lg:gap-4 xl:gap-5 flex-1 min-w-0">
                                            <span className={`font-serif-heading text-sm lg:text-base transition-colors duration-300 ${isActive ? 'text-[var(--color-orange-warm,#DC873E)] font-semibold' : 'text-[var(--color-pink-light,#a37362)] font-medium'
                                                }`}>
                                                {item.id}
                                            </span>

                                            <div className={`p-2 lg:p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center shrink-0 ${isActive
                                                ? 'bg-[var(--color-maroon-base,#813241)] text-white'
                                                : 'text-[var(--color-maroon-base,#813241)] bg-[var(--color-pink-light,#F0D0CA)]/20'
                                                }`}>
                                                <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <span className="text-[8px] lg:text-[9px] xl:text-[10px] uppercase tracking-widest text-[var(--color-orange-warm,#DC873E)] font-bold block mb-0.5">
                                                    {item.category}
                                                </span>
                                                <h3 className={`font-sans text-sm lg:text-base xl:text-lg transition-colors duration-300 truncate ${isActive
                                                    ? 'text-[var(--color-maroon-base,#813241)] font-semibold'
                                                    : 'text-[var(--color-charcoal,#2A2724)]/70 font-medium'
                                                    }`}>
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full hidden sm:flex items-center justify-center shrink-0 ml-2 transition-all duration-300 ${isActive
                                            ? 'bg-[var(--color-maroon-base,#813241)] text-white rotate-0'
                                            : 'text-[var(--color-charcoal,#2A2724)]/30 -rotate-45'
                                            }`}>
                                            {isActive ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-4 h-4" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}