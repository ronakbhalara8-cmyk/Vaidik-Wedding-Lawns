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
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const backdropRef = useRef(null);
  const linkRefs = useRef([]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Mobile menu animation
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const backdrop = backdropRef.current;
    const links = linkRefs.current;

    if (!menu || !backdrop) return;

    let tl = gsap.timeline();

    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.set(menu, { x: "100%" });
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(links, { opacity: 0, x: 40 });

      tl.to(backdrop, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          menu,
          {
            x: "0%",
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .to(
          links,
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.25"
        );
    } else {
      document.body.style.overflow = "";

      tl.to(links, {
        opacity: 0,
        x: 20,
        stagger: 0.05,
        duration: 0.2,
      })
        .to(
          menu,
          {
            x: "100%",
            duration: 0.45,
            ease: "power3.in",
          },
          "-=0.1"
        )
        .to(
          backdrop,
          {
            opacity: 0,
            duration: 0.25,
          },
          "-=0.2"
        );
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-maroon-dark/95 backdrop-blur-md border-b border-gold-base/20 shadow-xl py-3"
          : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="relative z-[60] flex items-center gap-3"
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-gold-base/30">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative tracking-[0.2em] text-sm  ${active
                    ? "text-gold-base"
                    : "text-white  hover:text-gold-light"
                    }`}
                >
                  {link.label}

                  <span
                    className={`absolute left-0 bottom-[-6px] h-[1px] bg-gold-base transition-all duration-300 ${active ? "w-full" : "w-0 hover:w-full"
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP BUTTON */}
          <div className="hidden lg:block">
            <Button
              href="/book-visit"
              variant="secondary"
              className="px-6 py-2.5"
            >
              <Calendar className="w-4 h-4" />
              Book Visit
            </Button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden relative z-[60] text-gold-base"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </header>

      {/* BACKDROP */}
      <div
        ref={backdropRef}
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-25 ${isOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      />

      {/* MOBILE DRAWER */}
      <aside
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-screen w-full max-w-[360px] sm:max-w-[400px] bg-maroon-dark border-l border-gold-base/20 z-30 px-8 pt-9 pb-8 flex flex-col justify-between shadow-2xl"
      >
        <div className="mt-8">
          {/* <p className=" text-[10px] text-center mb-8 w-full uppercase tracking-[0.3em] text-gold-base/50">
            Navigation
          </p> */}

          <nav className="flex flex-col gap-5">
            {navLinks.map((link, index) => {
              const active = pathname === link.href;

              return (
                <div
                  key={link.label}
                  ref={(el) => (linkRefs.current[index] = el)}
                >
                  <Link
                    href={link.href}
                    className={`block text-lg uppercase tracking-[0.15em] font-serif-heading ${active
                      ? "text-gold-base"
                      : "text-ivory/75 hover:text-gold-light"
                      }`}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4">
          <Button
            href="/book-visit"
            variant="secondary"
            className="w-full justify-center"
          >
            <Calendar className="w-4 h-4" />
            Book Venue Visit
          </Button>

          <p className="text-center text-[10px] text-gold-light/40 tracking-wider">
            Vaidik Wedding Lawns © 2026
          </p>
        </div>
      </aside>
    </>
  );
}