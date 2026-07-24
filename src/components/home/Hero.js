"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Button from "../ui/Button";
import SplitReveal from "../ui/SplitReveal";

// Video files
const VIDEOS = [
  "/videos/DJI_20260110194459_0097_D_stabilized.mp4",
  "/videos/DJI_20260110194732_0099_D_stabilized.mp4",
  "/videos/DJI_20260110201254_0112_D_stabilized.mp4",
  "/videos/DJI_20260110213956_0015_D_stabilized.mp4",
  "/videos/DJI_20260110213956_0016_D_stabilized.mp4",
  "/videos/video_20260110_225342.mp4",
];

// Unique content for each slide
const SLIDE_CONTENT = [
  {
    subtitle: "The Quintessential Luxury Lawn",
    title: "Where Royal Dreams Meet Timeless Celebrations",
    description: "Celebrate your grand union amidst lush manicured lawns, majestic mandaps, and curated hospitality crafted for royals.",
    buttonText: "Schedule Private Tour",
    buttonLink: "/book-visit",
    secondButtonText: "Explore Our Lawns",
    secondButtonLink: "/venues",
    tag: "Royal",
    nextPreview: "Celebrate Love"
  },
  {
    subtitle: "Celebrate Love Under Open Skies",
    title: "Where Every Sunset Tells a Love Story",
    description: "Our scenic outdoor spaces offer the perfect backdrop for unforgettable weddings and romantic ceremonies.",
    buttonText: "Explore the Venue",
    buttonLink: "/venues",
    secondButtonText: "View Gallery",
    secondButtonLink: "/gallery",
    tag: "Romantic",
    nextPreview: "Nature's Grandeur"
  },
  {
    subtitle: "A Canvas of Natural Beauty",
    title: "Nature's Grandeur Meets Elegant Celebrations",
    description: "Immerse yourself in the serenity of our lush landscapes, where every corner is designed to create magical moments.",
    buttonText: "Discover More",
    buttonLink: "/packages",
    secondButtonText: "Contact Us",
    secondButtonLink: "/contact",
    tag: "Serene",
    nextPreview: "Unforgettable"
  },
  {
    subtitle: "Where Every Detail Matters",
    title: "Crafting Unforgettable Experiences",
    description: "From exquisite floral arrangements to personalized decor, we transform your vision into reality with meticulous attention.",
    buttonText: "View Packages",
    buttonLink: "/packages",
    secondButtonText: "Book Now",
    secondButtonLink: "/book-visit",
    tag: "Luxury",
    nextPreview: "Your Dream"
  },
  {
    subtitle: "Your Dream Wedding Awaits",
    title: "A Celebration of Love, Light & Laughter",
    description: "Join us in creating the wedding of your dreams. Our dedicated team ensures every moment is picture-perfect.",
    buttonText: "Plan Your Wedding",
    buttonLink: "/services",
    secondButtonText: "Get in Touch",
    secondButtonLink: "/contact",
    tag: "Dream",
    nextPreview: "Timeless Elegance"
  },
  {
    subtitle: "Timeless Elegance, Modern Luxury",
    title: "Where Traditions Meet Contemporary Grandeur",
    description: "Experience the perfect blend of classic charm and modern amenities. Our venues are designed to host celebrations.",
    buttonText: "Explore Venues",
    buttonLink: "/venues",
    secondButtonText: "Learn More",
    secondButtonLink: "/about",
    tag: "Elegant",
    nextPreview: "Where Royal Dreams"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const previewVideoRef = useRef(null);
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const previewRef = useRef(null);
  const animRef = useRef(null);
  const isMountedRef = useRef(true);
  const isTransitioningRef = useRef(false);
  const autoPlayTimerRef = useRef(null);

  // Get current and next slide content
  const currentContent = SLIDE_CONTENT[currentSlide];
  const nextIndex = (currentSlide + 1) % SLIDE_CONTENT.length;
  const nextContent = SLIDE_CONTENT[nextIndex];

  // Preload all videos on mount
  useEffect(() => {
    if (currentVideoRef.current) {
      currentVideoRef.current.play().catch(() => { });
    }

    const nextIdx = (currentSlide + 1) % VIDEOS.length;
    if (nextVideoRef.current) {
      nextVideoRef.current.src = VIDEOS[nextIdx];
      nextVideoRef.current.load();
    }

    if (previewVideoRef.current) {
      previewVideoRef.current.src = VIDEOS[nextIdx];
      previewVideoRef.current.load();
    }

    VIDEOS.forEach((src) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.src = src;
      video.load();
    });
  }, []);

  // Auto-play timer
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }

      autoPlayTimerRef.current = setTimeout(() => {
        if (!isTransitioningRef.current && isMountedRef.current) {
          const nextIdx = (currentSlide + 1) % VIDEOS.length;
          animateSlideTransition(nextIdx);
        }
      }, 6000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [currentSlide]);

  // Animate content on slide change
  const animateContent = () => {
    const content = contentRef.current;
    if (!content) return;

    const subtitle = content.querySelector('.slide-subtitle');
    const title = content.querySelector('.slide-title');
    const description = content.querySelector('.slide-description');
    const buttons = content.querySelector('.slide-buttons');
    const tag = content.querySelector('.slide-tag');

    gsap.killTweensOf([subtitle, title, description, buttons, tag]);

    const tl = gsap.timeline();

    if (tag) {
      tl.fromTo(tag,
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }

    if (subtitle) {
      tl.fromTo(subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
    }

    if (title) {
      const titleChars = title.querySelectorAll('.char');
      if (titleChars.length > 0) {
        tl.fromTo(titleChars,
          { opacity: 0, y: 50, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: "power3.out"
          },
          "-=0.3"
        );
      } else {
        tl.fromTo(title,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
      }
    }

    if (description) {
      tl.fromTo(description,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
    }

    if (buttons) {
      const buttonElements = buttons.querySelectorAll('.btn-animated');
      tl.fromTo(buttonElements,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(1.2)"
        },
        "-=0.1"
      );
    }

    animatePreview();
  };

  // Animate next slide preview
  const animatePreview = () => {
    const preview = previewRef.current;
    if (!preview) return;

    const previewTitle = preview.querySelector('.preview-title');
    const previewNumber = preview.querySelector('.preview-number');
    const previewBar = preview.querySelector('.preview-bar');

    gsap.killTweensOf([previewTitle, previewNumber, previewBar]);

    const tl = gsap.timeline();

    tl.fromTo(preview,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    )
      .fromTo(previewTitle,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(previewNumber,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" },
        "-=0.1"
      )
      .fromTo(previewBar,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
  };

  // Slide transition with video swap
  const animateSlideTransition = (nextIdx) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);

    const currentVideo = currentVideoRef.current;
    const nextVideo = nextVideoRef.current;
    const previewVideo = previewVideoRef.current;

    if (!currentVideo || !nextVideo) {
      isTransitioningRef.current = false;
      setIsTransitioning(false);
      return;
    }

    nextVideo.src = VIDEOS[nextIdx];
    nextVideo.currentTime = 0;
    nextVideo.load();
    nextVideo.style.opacity = '0';
    nextVideo.style.transform = 'scale(1.05)';

    if (previewVideo) {
      const previewNextIdx = (nextIdx + 1) % VIDEOS.length;
      previewVideo.src = VIDEOS[previewNextIdx];
      previewVideo.load();
    }

    const playNextVideo = () => {
      nextVideo.play().catch(() => { });

      gsap.to(currentVideo, {
        opacity: 0,
        scale: 1.1,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => {
          currentVideo.pause();
          currentVideo.style.opacity = '0';
        }
      });

      gsap.to(nextVideo, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          const currentSrc = currentVideo.src;
          const nextSrc = nextVideo.src;

          currentVideo.src = nextSrc;
          currentVideo.load();
          currentVideo.style.opacity = '1';
          currentVideo.style.transform = 'scale(1)';
          currentVideo.play().catch(() => { });

          nextVideo.style.opacity = '0';
          nextVideo.style.transform = 'scale(1.05)';

          setCurrentSlide(nextIdx);
          isTransitioningRef.current = false;
          setIsTransitioning(false);

          const futureIndex = (nextIdx + 1) % VIDEOS.length;
          nextVideo.src = VIDEOS[futureIndex];
          nextVideo.load();
          nextVideo.style.opacity = '0';

          if (previewVideo) {
            const previewFuture = (futureIndex + 1) % VIDEOS.length;
            previewVideo.src = VIDEOS[previewFuture];
            previewVideo.load();
          }

          setTimeout(() => animateContent(), 50);
        }
      });
    };

    if (nextVideo.readyState >= 2) {
      playNextVideo();
    } else {
      nextVideo.addEventListener('loadeddata', playNextVideo, { once: true });
      setTimeout(() => {
        if (nextVideo.readyState < 2) {
          playNextVideo();
        }
      }, 300);
    }
  };

  // Go to specific slide
  const goToSlide = (index) => {
    if (index === currentSlide || isTransitioningRef.current) return;
    animateSlideTransition(index);
  };

  // Background parallax
  useEffect(() => {
    isMountedRef.current = true;

    const bg = bgRef.current;
    const hero = heroRef.current;
    if (bg && hero) {
      try {
        const animation = gsap.fromTo(
          bg,
          { scale: 1.15, yPercent: -5 },
          {
            scale: 1.0,
            yPercent: 5,
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        animRef.current = animation;
      } catch (error) {
        console.warn("Hero animation error:", error);
      }
    }

    setTimeout(() => animateContent(), 100);

    return () => {
      isMountedRef.current = false;
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
      try {
        const animation = animRef.current;
        if (animation && typeof animation.kill === "function") {
          if (animation.scrollTrigger && typeof animation.scrollTrigger.kill === "function") {
            animation.scrollTrigger.kill();
          }
          animation.kill();
        }
        animRef.current = null;
      } catch (error) { }
    };
  }, []);

  useEffect(() => {
    animateContent();
  }, [currentSlide]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-maroon-dark text-ivory"
    >
      {/* Video Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          ref={currentVideoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
          onEnded={() => {
            if (!isTransitioningRef.current) {
              const nextIdx = (currentSlide + 1) % VIDEOS.length;
              animateSlideTransition(nextIdx);
            }
          }}
        >
          <source src={VIDEOS[currentSlide]} type="video/mp4" />
        </video>

        <video
          ref={nextVideoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_80%)] pointer-events-none z-10" />

      {/* Next Slide Preview - Visible on all screen sizes */}
      <div
        ref={previewRef}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-30 cursor-pointer group"
        onClick={() => goToSlide(nextIndex)}
      >
        <div className="relative overflow-hidden rounded-lg shadow-2xl border border-gold-base/20 w-28 sm:w-32 md:w-36 lg:w-40 h-18 sm:h-20 md:h-22 lg:h-24">
          <video
            ref={previewVideoRef}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.6] transition-all duration-500"
          >
            <source src={VIDEOS[(currentSlide + 1) % VIDEOS.length]} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 md:p-2.5">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-[5px] sm:text-[6px] md:text-[7px] tracking-[0.2em] uppercase text-gold-base/60 font-serif-heading">
                  Next
                </p>
                <h4 className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-serif-heading text-ivory leading-tight mt-0.5 group-hover:text-gold-base transition-colors duration-300 truncate">
                  {nextContent.nextPreview}
                </h4>
                <span className="text-[4px] sm:text-[5px] md:text-[6px] text-gold-base/40 font-sans">
                  {nextIndex + 1} of {VIDEOS.length}
                </span>
              </div>
              <div className="preview-number flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-gold-base/20 border border-gold-base/30 text-[6px] sm:text-[7px] md:text-[8px] font-serif-heading text-gold-base flex-shrink-0 ml-1">
                {nextIndex + 1}
              </div>
            </div>
            <div className="preview-bar mt-0.5 sm:mt-1 h-[1px] bg-gold-base/30 overflow-hidden">
              <div className="h-full w-1/2 bg-gold-base/50 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-20 flex flex-col items-center justify-center w-full"
      >
        {/* Tag / Subtitle */}
        <div className="slide-tag mb-1.5 sm:mb-2 md:mb-3">
          <span className="font-serif-heading text-[8px] sm:text-[10px] md:text-xs tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] text-gold-base uppercase inline-block border-b border-gold-base/30 pb-1 sm:pb-1.5 md:pb-2">
            {currentContent.subtitle}
          </span>
        </div>

        {/* Title */}
        <SplitReveal
          type="chars"
          stagger={0.02}
          duration={1.2}
          tag="h1"
          className="slide-title font-serif-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[0.02em] sm:tracking-[0.03em] md:tracking-[0.05em] text-ivory uppercase leading-[1.1] mb-2 sm:mb-3 md:mb-4 max-w-3xl lg:max-w-4xl text-shadow-premium font-bold"
        >
          {currentContent.title}
        </SplitReveal>

        {/* Description */}
        <div className="slide-description mb-4 sm:mb-6 md:mb-8 max-w-xl lg:max-w-2xl px-2 sm:px-0">
          <p className="font-sans text-xs sm:text-sm md:text-base lg:text-lg text-gold-light/80 leading-relaxed font-light">
            {currentContent.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="slide-buttons flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center w-full sm:w-auto">
          <Button
            href={currentContent.buttonLink}
            variant="secondary"
            className="btn-animated px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] w-full sm:w-auto text-center"
          >
            {currentContent.buttonText}
          </Button>
          <Button
            href={currentContent.secondButtonLink}
            variant="outline"
            className="btn-animated px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] w-full sm:w-auto text-center"
          >
            {currentContent.secondButtonText}
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2 pointer-events-none z-20">
          <span className="font-serif-heading text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase text-gold-base/60 animate-pulse whitespace-nowrap">
            Scroll To Experience
          </span>
          <div className="w-[1px] h-5 sm:h-6 md:h-8 bg-gold-base/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gold-base animate-scroll-indicator" />
          </div>
        </div>
      </div>
    </section>
  );
}