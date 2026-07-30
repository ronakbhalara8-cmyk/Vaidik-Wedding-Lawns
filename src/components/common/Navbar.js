"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Calendar } from "lucide-react";
import { gsap } from "@/lib/gsap";
import Button from "../ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Venues", href: "/venues" },
  { label: "Packages", href: "/packages" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const mobileMenuRef = useRef(null);
  const backdropRef = useRef(null);
  const linkRefs = useRef([]);


  // Mobile links are outside the viewport while the drawer is closed, so
  // Next.js cannot automatically prefetch them. Warm each primary route once
  // the navbar has hydrated to make the first tap responsive as well.
  useEffect(() => {
    [...navLinks.map(({ href }) => href), "/contact"].forEach((href) => {
      if (href !== pathname) router.prefetch(href);
    });
  }, [pathname, router]);

  // Scroll effect - always scrolled true on book-visit page
  useEffect(() => {
    const handleScroll = () => {

      // For other pages, check scroll position
      setIsScrolled(window.scrollY > 40);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenuForNavigation = () => {
    setIsOpen(false);
  };

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // Mobile menu animation
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const backdrop = backdropRef.current;
    const links = linkRefs.current;

    if (!menu || !backdrop) return;

    let tl = gsap.timeline();

    if (isOpen) {
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

  // Function to handle Home click with page refresh
  // const handleHomeClick = (e) => {
  //   if (pathname === "/") {
  //     // If already on home page, just refresh
  //     window.location.reload();
  //   } else {
  //     // Navigate to home with full page refresh
  //     window.location.href = "/";
  //   }
  // };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-maroon-dark/95 backdrop-blur-md border-b border-gold-base/20 shadow-xl py-3"
          : "bg-transparent py-4"
          }`}
      >
        <div className="container flex items-center justify-between">
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

              // For Home link, use regular anchor tag for full page refresh
              // if (link.href === "/") {
              //   return (
              //     <a
              //       key={link.label}
              //       href="/"
              //       // onClick={handleHomeClick}
              //       className={`relative tracking-[0.2em] text-sm  ${active
              //         ? "text-gold-base"
              //         : "text-white  hover:text-gold-light"
              //         }`}
              //     >
              //       {link.label}

              //       <span
              //         className={`absolute left-0 bottom-[-6px] h-[1px] bg-gold-base transition-all duration-300 ${active ? "w-full" : "w-0 hover:w-full"
              //           }`}
              //       />
              //     </a>
              //   );
              // }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  prefetch
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
              href="/contact"
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
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-screen w-full max-w-[360px] sm:max-w-[400px] bg-maroon-dark border-l border-gold-base/20 z-40 px-8 py-9 flex flex-col shadow-2xl ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Navigation - takes available space and scrolls if needed */}
        <div className="flex flex-col justify-between gap-6 mt-16">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link, index) => {
              const active = pathname === link.href;

              // For Home link in mobile menu
              // if (link.href === "/") {
              //   return (
              //     <div
              //       key={link.label}
              //       ref={(el) => (linkRefs.current[index] = el)}
              //     >
              //       <a
              //         href="/"
              //         // onClick={handleHomeClick}
              //         className={`block text-lg uppercase tracking-[0.15em] font-serif-heading ${active
              //           ? "text-gold-base"
              //           : "text-ivory/75 hover:text-gold-light"
              //           }`}
              //       >
              //         {link.label}
              //       </a>
              //     </div>
              //   );
              // }

              return (
                <div
                  key={link.label}
                  ref={(el) => (linkRefs.current[index] = el)}
                >
                  <Link
                    href={link.href}
                    prefetch
                    onNavigate={closeMenuForNavigation}
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

          <div className="flex-shrink-0 space-y-4 pt-4 border-t border-gold-base/10">
            <Button
              href="/contact"
              onNavigate={closeMenuForNavigation}
              variant="secondary"
              className="w-full justify-center"
            >
              <Calendar className="w-4 h-4" />
              Book Venue Request
            </Button>

            <p className="text-center text-[10px] text-gold-light/40 tracking-wider">
              Vaidik Wedding Lawns © 2026
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
