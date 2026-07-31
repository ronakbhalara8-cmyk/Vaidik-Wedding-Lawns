"use client";

import React from 'react';
import Image from 'next/image';
import {
    Trees,
    ParkingCircle,
    Sparkles,
    MapPin,
    PartyPopper,
    ArrowRight,
    UsersRound
} from 'lucide-react';
import Button from '../ui/Button';

export default function WhyChooseUs() {
    const features = [
        {
            id: "01",
            icon: Trees,
            title: "Spacious Lawn",
            category: "Serene Environment",
            desc: "Expansive green lawns crafted to host grand gatherings, offering a fresh, natural, and opulent outdoor atmosphere.",
            image: "/images/image-6.webp"
        },
        {
            id: "02",
            icon: ParkingCircle,
            title: "Ample Parking",
            category: "Seamless Arrival",
            desc: "Dedicated and secure parking layout designed to accommodate large guest volumes smoothly without any hassle.",
            image: "/images/image-1.png"
        },
        {
            id: "03",
            icon: Sparkles,
            title: "Premium Decor",
            category: "Bespoke Aesthetics",
            desc: "Exquisite decoration setups and sophisticated lighting concepts that add a royal touch to every celebration.",
            image: "/images/image-4.png"
        },
        {
            id: "04",
            icon: MapPin,
            title: "Prime Location",
            category: "Convenient Access",
            desc: "Strategically situated near key city routes, ensuring effortless navigation and comfortable travel for attendees.",
            image: "",
            isStreetView: true // Flag to identify Street View item
        },
        {
            id: "05",
            icon: PartyPopper,
            title: "Events & Weddings",
            category: "Versatile Venue",
            desc: "Fully equipped to adapt seamlessly to royal weddings, receptions, grand celebrations, and corporate galas.",
            image: "/images/image-3.png"
        },
        {
            "id": "06",
            "icon": UsersRound,
            "title": "Banquets & Celebrations Hall",
            "category": "Banquet & Celebration",
            "desc": "A premium venue for weddings, receptions, celebrations, and corporate events. Equipped a dedicated planning team.",
            "image": "/images/banquet-hall.png"
        }
    ];

    return (
        <section className="bg-[#FDF2EF] w-full py-16 md:py-24">
            <div className="container">

                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8d2c3f]/10 border border-[#8d2c3f]/20 mb-4 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-[#DC873E] animate-pulse" />
                        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#8d2c3f] uppercase">
                            Unrivaled Excellence
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-heading font-bold text-[#8d2c3f] tracking-wide">
                        Why Choose Us
                    </h2>
                </div>

                {/* Simple Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            {/* Image Section - with Street View support */}
                            <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-gray-100">
                                {item.isStreetView ? (
                                    // Street View iframe for Prime Location
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!4v1743159876543!6m8!1m7!1sCAISFmNadEhETHVvS3RIYndXZ0VyVkFMdkE!2m2!1d23.0225!2d72.5712!3f60.93!4f0!5f0.7820865974627469"
                                        className="w-full h-full"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Street View of Prime Location"
                                    ></iframe>
                                ) : (
                                    // Regular image for other features
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                )}
                                {/* Id Badge Overlay */}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#8d2c3f] shadow-sm">
                                    {item.id}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5 md:p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="p-1.5 rounded-md bg-[#DC873E]/10 text-[#DC873E]">
                                        {React.createElement(item.icon, { className: "w-4 h-4" })}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-[#DC873E] font-semibold">
                                        {item.category}
                                    </span>
                                </div>

                                <h3 className="font-serif-heading text-lg md:text-xl font-semibold text-[#813241] mt-1 mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-[#2A2724]/70 text-sm leading-relaxed flex-1">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
