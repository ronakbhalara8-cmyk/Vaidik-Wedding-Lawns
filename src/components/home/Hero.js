"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import Button from "../ui/Button";
import SplitReveal from "../ui/SplitReveal";

// 1. Posters અને Videos નું સેટઅપ
const SLIDES = [
  {
    video: "/videos/DJI_20260110194459_0097_D_stabilized.mp4",
    poster: "/videos/posters/slide1.webp", // તમારા પબ્લિક ફોલ્ડરમાં પોસ્ટર રાખવા
    subtitle: "The Quintessential Luxury Lawn",
    title: "Where Royal Dreams Meet Timeless Celebrations",
    description: "Celebrate your grand union amidst lush manicured lawns, majestic mandaps, and curated hospitality crafted for royals.",
    buttonText: "Schedule Private Tour",
    buttonLink: "/book-visit",
    secondButtonText: "Explore Our Lawns",
    secondButtonLink: "/venues",
    nextPreview: "Celebrate Love"
  },
  {
    video: "/videos/DJI_20260110194732_0099_D_stabilized.mp4",
    poster: "/videos/posters/slide2.webp",
    subtitle: "Celebrate Love Under Open Skies",
    title: "Where Every Sunset Tells a Love Story",
    description: "Our scenic outdoor spaces offer the perfect backdrop for unforgettable weddings and romantic ceremonies.",
    buttonText: "Explore the Venue",
    buttonLink: "/venues",
    secondButtonText: "View Gallery",
    secondButtonLink: "/gallery",
    nextPreview: "Nature's Grandeur"
  },
  {
    video: "/videos/DJI_20260110201254_0112_D_stabilized.mp4",
    poster: "/videos/posters/slide3.webp",
    subtitle: "A Canvas of Natural Beauty",
    title: "Nature's Grandeur Meets Elegant Celebrations",
    description: "Immerse yourself in the serenity of our lush landscapes, where every corner is designed to create magical moments.",
    buttonText: "Discover More",
    buttonLink: "/packages",
    secondButtonText: "Contact Us",
    secondButtonLink: "/contact",
    nextPreview: "Unforgettable"
  },
  {
    video: "/videos/DJI_20260110213956_0015_D_stabilized.mp4",
    poster: "/videos/posters/slide4.webp",
    subtitle: "Where Every Detail Matters",
    title: "Crafting Unforgettable Experiences",
    description: "From exquisite floral arrangements to personalized decor, we transform your vision into reality with meticulous attention.",
    buttonText: "View Packages",
    buttonLink: "/packages",
    secondButtonText: "Book Now",
    secondButtonLink: "/book-visit",
    nextPreview: "Your Dream"
  },
  {
    video: "/videos/DJI_20260110213956_0016_D_stabilized.mp4",
    poster: "/videos/posters/slide5.webp",
    subtitle: "Your Dream Wedding Awaits",
    title: "A Celebration of Love, Light & Laughter",
    description: "Join us in creating the wedding of your dreams. Our dedicated team ensures every moment is picture-perfect.",
    buttonText: "Plan Your Wedding",
    buttonLink: "/services",
    secondButtonText: "Get in Touch",
    secondButtonLink: "/contact",
    nextPreview: "Timeless Elegance"
  },
  {
    video: "/videos/video_20260110_225342.mp4",
    poster: "/videos/posters/slide6.webp",
    subtitle: "Timeless Elegance, Modern Luxury",
    title: "Where Traditions Meet Contemporary Grandeur",
    description: "Experience the perfect blend of classic charm and modern amenities. Our venues are designed to host celebrations.",
    buttonText: "Explore Venues",
    buttonLink: "/venues",
    secondButtonText: "Learn More",
    secondButtonLink: "/about",
    nextPreview: "Where Royal Dreams"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState([0]); // ફક્ત ૧લો વીડિયો શરૂઆતમાં ડાઉનલોડ થશે

  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const timerRef = useRef(null);

  const currentContent = SLIDES[currentSlide];
  const nextIndex = (currentSlide + 1) % SLIDES.length;
  const nextContent = SLIDES[nextIndex];

  // સ્લાઇડ એનિમેશન
  const animateContent = useCallback(() => {
    if (!contentRef.current) return;
    const elements = contentRef.current.querySelectorAll(".slide-anim");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );
  }, []);

  // Slide આગળ વધારવા માટેનું મેથડ
  const goToSlide = useCallback(
    (index) => {
      // આગામી વીડિયોને loadedVideos લિસ્ટમાં ઉમેરો જેથી React એને render કરે
      if (!loadedVideos.includes(index)) {
        setLoadedVideos((prev) => [...prev, index]);
      }

      setCurrentSlide(index);
      setTimeout(() => animateContent(), 50);
    },
    [loadedVideos, animateContent]
  );

  // Auto Play Slider (8 Seconds)
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goToSlide(nextIndex);
    }, 8000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlide, nextIndex, goToSlide]);

  // પ્રથમ વાર ટેક્સ્ટ એનિમેશન ચલાવવું
  useEffect(() => {
    animateContent();
  }, [animateContent]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-maroon-dark text-ivory">
      {/* Background Videos List */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-black">
        {SLIDES.map((slide, index) => {
          const isCurrent = index === currentSlide;
          const isPreloaded = loadedVideos.includes(index);

          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isCurrent ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              {/* વીડિયો ડાઉનલોડ ન થયો હોય ત્યાં સુધી લાઈટવેઈટ Poster સપોર્ટ */}
              <img
                src={slide.poster}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* ફક્ત જરૂર હોય ત્યારે જ Video Element DOM માં રેન્ડર થશે */}
              {isPreloaded && (
                <video
                  ref={isCurrent ? videoRef : null}
                  src={slide.video}
                  poster={slide.poster}
                  autoPlay={isCurrent}
                  muted
                  loop
                  playsInline
                  preload={isCurrent ? "auto" : "none"}
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_80%)] pointer-events-none z-10" />

      {/* Next Slide Preview Button */}
      <div
        className="absolute bottom-6 right-6 z-30 cursor-pointer group"
        onClick={() => goToSlide(nextIndex)}
      >
        <div className="relative overflow-hidden rounded-lg border border-gold-base/20 w-32 h-20 bg-black/60 backdrop-blur-md p-2">
          <p className="text-[9px] uppercase tracking-widest text-gold-base/70">Next</p>
          <h4 className="text-xs font-serif-heading text-ivory truncate group-hover:text-gold-base transition-colors">
            {nextContent.nextPreview}
          </h4>
          <span className="text-[10px] text-gold-base/50 mt-2 block">
            {nextIndex + 1} / {SLIDES.length}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-4 text-center relative z-20 flex flex-col items-center justify-center"
      >
        <div className="slide-anim mb-3">
          <span className="font-serif-heading text-xs md:text-sm tracking-[0.3em] text-gold-base uppercase border-b border-gold-base/30 pb-1">
            {currentContent.subtitle}
          </span>
        </div>

        <SplitReveal
          type="chars"
          tag="h1"
          className="slide-anim font-serif-heading text-3xl sm:text-5xl lg:text-6xl text-ivory uppercase leading-tight mb-4 font-bold"
        >
          {currentContent.title}
        </SplitReveal>

        <p className="slide-anim font-sans text-sm md:text-base text-gold-light/80 max-w-xl mb-8 font-light">
          {currentContent.description}
        </p>

        <div className="slide-anim flex gap-4">
          <Button href={currentContent.buttonLink} variant="secondary">
            {currentContent.buttonText}
          </Button>
          <Button href={currentContent.secondButtonLink} variant="outline">
            {currentContent.secondButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
}