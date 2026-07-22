"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar } from "lucide-react";
import { gsap } from "@/lib/gsap";
import Button from "../ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Venues", href: "/venues" },
  { label: "Packages", href: "/packages" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileBgRef = useRef(null);
  const linkRefs = useRef([]);

  // Handle scroll trigger for styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu slide animation with GSAP
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const bg = mobileBgRef.current;
    const links = linkRefs.current;

    if (isOpen) {
      document.body.style.overflow = "hidden"; // disable scroll

      // Setup initial positions
      gsap.set(bg, { opacity: 0 });
      gsap.set(menu, { xPercent: 100 });
      gsap.set(links, { opacity: 0, y: 30 });

      // Animate opening
      const tl = gsap.timeline();
      tl.to(bg, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .to(menu, { xPercent: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .to(links, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" }, "-=0.2");
    } else {
      document.body.style.overflow = ""; // restore scroll

      // Animate closing
      if (menu && bg) {
        const tl = gsap.timeline();
        tl.to(links, { opacity: 0, y: -20, stagger: 0.05, duration: 0.3, ease: "power2.in" })
          .to(menu, { xPercent: 100, duration: 0.5, ease: "power3.in" }, "-=0.15")
          .to(bg, { opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.3");
      }
    }
  }, [isOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 ${isScrolled
          ? "bg-maroon-dark/90 backdrop-blur-md border-b border-gold-base/20 shadow-lg py-3"
          : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-3 group">
            <div className="relative w-14 h-14 overflow-hidden rounded-full border border-gold-base/30 group-hover:border-gold-base transition-colors duration-500">
              <Image
                src="/images/logo.png"
                alt="Vaidik Wedding Lawns Logo"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative font-serif-heading text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 py-2 group ${isActive ? "text-gold-base" : "text-ivory/80 hover:text-gold-light"
                    }`}
                >
                  <span>{link.label}</span>
                  {/* Underline hover effect */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-gold-base transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Booking CTA Button (Desktop) */}
          <div className="hidden lg:block">
            <Button href="/book-visit" variant="secondary" className="px-6 py-2.5 text-[10px] tracking-[0.15em]">
              <Calendar className="w-3.5 h-3.5" /> Book Visit
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gold-base hover:text-gold-light transition-colors duration-300 relative z-50 p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        ref={mobileBgRef}
        className="fixed inset-0 bg-maroon-dark/60 backdrop-blur-sm z-40 pointer-events-none opacity-0"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        onClick={() => setIsOpen(false)}
      />

      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 bottom-0 w-full sm:w-[380px] bg-maroon-dark border-l border-gold-base/20 z-45 p-8 pt-28 flex flex-col justify-between shadow-2xl translate-x-full"
      >
        <div className="flex flex-col gap-6">
          <span className="font-serif-heading text-[10px] tracking-[0.3em] uppercase text-gold-base/50 mb-4 border-b border-gold-base/10 pb-2">
            Navigation Menu
          </span>
          <nav className="flex flex-col gap-5">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.label}
                  ref={(el) => (linkRefs.current[idx] = el)}
                >
                  <Link
                    href={link.href}
                    className={`font-serif-heading text-lg tracking-[0.2em] uppercase transition-colors duration-300 block ${isActive ? "text-gold-base" : "text-ivory/70 hover:text-gold-light"
                      }`}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Mobile menu CTA */}
        <div className="flex flex-col gap-4">
          <Button href="/book-visit" variant="secondary" className="w-full text-center">
            <Calendar className="w-4 h-4 mr-2" /> Book Venue Visit
          </Button>
          <p className="text-[10px] text-gold-light/40 text-center tracking-wider font-light">
            Vaidik Wedding Lawns © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
