"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Heart, Share2, Clock, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import SplitReveal from "../ui/SplitReveal";

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to our luxury newsletter.");
  };

  return (
    <footer className="bg-dark-brown text-ivory border-t border-gold-base/20 pt-20 pb-8 relative overflow-hidden">
      {/* Subtle luxury pattern background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.03)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-gold-base/15">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-24 h-24 overflow-hidden rounded-full border border-gold-base/30">
                <Image
                  src="/images/logo.png"
                  alt="Vaidik Wedding Lawns Logo"
                  fill
                  className="object-cover"
                />
              </div>
              {/* <div className="flex flex-col">
                <span className="font-serif-heading text-base tracking-[0.25em] text-gold-base">
                  VAIDIK
                </span>
                <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-light/70 uppercase">
                  Wedding Lawns
                </span>
              </div> */}
            </Link>
            <p className="text-sm text-ivory/60 leading-relaxed font-light">
              Crafting royal dreams into eternal realities. Experience the finest outdoor wedding lawn and luxury event services, tailored to perfection.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold-base/20 flex items-center justify-center hover:bg-gold-base hover:text-maroon-dark transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold-base/20 flex items-center justify-center hover:bg-gold-base hover:text-maroon-dark transition-all duration-300"
              >
                <Heart className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="font-serif-heading text-sm tracking-[0.2em] uppercase text-gold-base border-b border-gold-base/10 pb-2">
              Explore
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-ivory/70 font-light">
              <li>
                <Link href="/about" className="hover:text-gold-base transition-colors duration-300">About Our Lawns</Link>
              </li>
              <li>
                <Link href="/venues" className="hover:text-gold-base transition-colors duration-300">Wedding Venues</Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-gold-base transition-colors duration-300">Wedding Packages</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-base transition-colors duration-300">Premium Services</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-base transition-colors duration-300">Luxury Gallery</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold-base transition-colors duration-300">Frequently Asked</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-5">
            <h4 className="font-serif-heading text-sm tracking-[0.2em] uppercase text-gold-base border-b border-gold-base/10 pb-2">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-ivory/70 font-light">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-gold-base shrink-0 mt-0.5" />
                <span>Vaidik Wedding Lawns, Near Royal Circle, VIP Road, Mumbai, India</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-gold-base shrink-0" />
                <a href="tel:+919876543210" className="hover:text-gold-base transition-colors duration-300">+91 98765 43210</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-gold-base shrink-0" />
                <a href="mailto:info@vaidiklawns.com" className="hover:text-gold-base transition-colors duration-300">info@vaidiklawns.com</a>
              </li>
              <li className="flex gap-3 items-center">
                <Clock className="w-4 h-4 text-gold-base shrink-0" />
                <span>Mon - Sun: 09:00 AM - 09:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Sign up */}
          <div className="flex flex-col gap-5">
            <h4 className="font-serif-heading text-sm tracking-[0.2em] uppercase text-gold-base border-b border-gold-base/10 pb-2">
              Newsletter
            </h4>
            <p className="text-sm text-ivory/60 leading-relaxed font-light">
              Subscribe to receive updates on wedding trends, dates, and luxury catalog launches.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  required
                  className="w-full bg-maroon-dark/50 border border-gold-base/20 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-gold-base text-ivory placeholder-ivory/30 pr-12 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-grad-gold text-maroon-dark flex items-center justify-center hover:bg-gold-light transition-all duration-300"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-gold-base/20 h-64 relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.835158652396!2d72.8273641!3d19.0713783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9117621c1ff%3A0xe54d241c099be9eb!2sJuhu%20Beach!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) invert(0.9) sepia(0.5) hue-rotate(330deg)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vaidik Wedding Lawns Location Map"
          />
          {/* Transparent color overlay to make it look matching */}
          <div className="absolute inset-0 bg-maroon-dark/10 pointer-events-none mix-blend-color group-hover:bg-transparent transition-all duration-500" />
        </div>

        <div className="pt-5">
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            Vaidik Wedding Lawns
          </SplitReveal>
        </div>

        {/* Footer Bottom copyright & terms */}
        <div className="mt-12 pt-8 border-t border-gold-base/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/40 font-light">
          <p>© {new Date().getFullYear()} Vaidik Wedding Lawns. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-gold-base transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-base transition-colors duration-300">Terms of Service</Link>
          </div>
          <p className="tracking-wide">
            Designed with Elegance for a Lifetime Experience.
          </p>
        </div>
      </div>
    </footer>
  );
}
