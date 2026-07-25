"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import Button from "../ui/Button";
import SplitReveal from "../ui/SplitReveal";

// Video files - only videos, no posters
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
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

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
  const isLoadingRef = useRef(false);
  const loadCountRef = useRef(0);
  const isFirstLoadRef = useRef(true);

  // Get current and next slide content
  const currentContent = SLIDE_CONTENT[currentSlide];
  const nextIndex = (currentSlide + 1) % SLIDE_CONTENT.length;
  const nextContent = SLIDE_CONTENT[nextIndex];

  // Optimized load video function
  const loadVideo = useCallback((videoElement, src) => {
    return new Promise((resolve) => {
      if (!videoElement) {
        resolve(false);
        return;
      }

      // If already loaded with same src and ready
      if (videoElement.src === src && videoElement.readyState >= 2) {
        resolve(true);
        return;
      }

      // Prevent multiple simultaneous loads
      if (isLoadingRef.current) {
        resolve(false);
        return;
      }

      isLoadingRef.current = true;
      setIsVideoLoading(true);

      // Reset video
      videoElement.pause();
      videoElement.currentTime = 0;
      videoElement.style.opacity = '0';

      // Only load metadata first for faster initial load
      videoElement.preload = isFirstLoadRef.current ? 'metadata' : 'auto';

      // Set source and load
      videoElement.src = src;
      videoElement.load();

      // Handle loaded data
      const handleLoadedData = () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('error', handleError);

        setIsVideoLoading(false);
        setIsVideoReady(true);
        isLoadingRef.current = false;
        videoElement.style.opacity = '1';
        isFirstLoadRef.current = false;

        resolve(true);
      };

      // Handle error
      const handleError = () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('error', handleError);

        setIsVideoLoading(false);
        setIsVideoReady(true);
        isLoadingRef.current = false;
        videoElement.style.opacity = '1';
        isFirstLoadRef.current = false;

        // Try to play even if load failed partially
        videoElement.play().catch(() => { });
        resolve(false);
      };

      // Fallback timeout - reduced to 3 seconds
      const timeoutId = setTimeout(() => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('error', handleError);

        setIsVideoLoading(false);
        setIsVideoReady(true);
        isLoadingRef.current = false;
        videoElement.style.opacity = '1';
        isFirstLoadRef.current = false;

        videoElement.play().catch(() => { });
        resolve(false);
      }, 3000);

      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);

      return () => clearTimeout(timeoutId);
    });
  }, []);

  // Initialize first video
  useEffect(() => {
    const initVideo = async () => {
      // Small delay for page load
      await new Promise(resolve => setTimeout(resolve, 300));

      if (currentVideoRef.current) {
        await loadVideo(currentVideoRef.current, VIDEOS[currentSlide]);

        if (currentVideoRef.current) {
          currentVideoRef.current.play().catch(() => { });
        }

        // Preload next video after 1.5 seconds
        setTimeout(() => {
          if (nextVideoRef.current) {
            const nextIdx = (currentSlide + 1) % VIDEOS.length;
            loadVideo(nextVideoRef.current, VIDEOS[nextIdx]);
          }
        }, 1500);
      }
    };

    initVideo();

    return () => {
      // Cleanup
      isFirstLoadRef.current = true;
    };
  }, [loadVideo, currentSlide]);

  // Auto-play timer - 8 seconds
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }

      autoPlayTimerRef.current = setTimeout(() => {
        if (!isTransitioningRef.current && isMountedRef.current && isVideoReady) {
          const nextIdx = (currentSlide + 1) % VIDEOS.length;
          animateSlideTransition(nextIdx);
        }
      }, 8000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [currentSlide, isVideoReady]);

  // Animate content
  const animateContent = useCallback(() => {
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
  }, []);

  // Animate preview
  const animatePreview = useCallback(() => {
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
  }, []);

  // Slide transition
  const animateSlideTransition = useCallback(async (nextIdx) => {
    if (isTransitioningRef.current || isLoadingRef.current) return;
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

    // Load next video
    const nextSrc = VIDEOS[nextIdx];
    await loadVideo(nextVideo, nextSrc);

    // Prepare next video
    nextVideo.style.opacity = '0';
    nextVideo.style.transform = 'scale(1.05)';

    // Load preview video
    if (previewVideo) {
      const previewNextIdx = (nextIdx + 1) % VIDEOS.length;
      loadVideo(previewVideo, VIDEOS[previewNextIdx]);
      previewVideo.style.opacity = '0';
    }

    // Start transition
    const playNextVideo = () => {
      if (nextVideo) {
        nextVideo.play().catch(() => { });
      }

      if (currentVideo) {
        gsap.to(currentVideo, {
          opacity: 0,
          scale: 1.1,
          duration: 0.25,
          ease: "power2.inOut",
          onComplete: () => {
            if (currentVideo) {
              currentVideo.pause();
              currentVideo.style.opacity = '0';
              // Cleanup old video to free memory
              if (currentVideo.src) {
                currentVideo.src = '';
              }
            }
          }
        });
      }

      if (nextVideo) {
        gsap.to(nextVideo, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            if (currentVideo && nextVideo) {
              const nextSrc = nextVideo.src;

              // Swap videos
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

              // Preload next video
              const futureIndex = (nextIdx + 1) % VIDEOS.length;
              if (nextVideo) {
                loadVideo(nextVideo, VIDEOS[futureIndex]);
                nextVideo.style.opacity = '0';
              }

              if (previewVideo) {
                const previewFuture = (futureIndex + 1) % VIDEOS.length;
                loadVideo(previewVideo, VIDEOS[previewFuture]);
                previewVideo.style.opacity = '0';
              }

              setTimeout(() => animateContent(), 50);
            }
          }
        });
      }
    };

    if (nextVideo.readyState >= 2) {
      playNextVideo();
    } else {
      nextVideo.addEventListener('loadeddata', playNextVideo, { once: true });
      setTimeout(() => {
        if (nextVideo.readyState < 2) {
          playNextVideo();
        }
      }, 500);
    }
  }, [loadVideo, animateContent]);

  // Go to slide
  const goToSlide = useCallback((index) => {
    if (index === currentSlide || isTransitioningRef.current || isLoadingRef.current) return;
    animateSlideTransition(index);
  }, [currentSlide, animateSlideTransition]);

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
  }, [animateContent]);

  useEffect(() => {
    animateContent();
  }, [currentSlide, animateContent]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-maroon-dark text-ivory"
    >
      {/* Video Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-black">
        {/* Loading Spinner */}
        {isVideoLoading && !isVideoReady && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-gold-base/30 border-t-gold-base rounded-full animate-spin" />
              <span className="text-gold-base/60 text-xs tracking-wider font-serif-heading animate-pulse">
                Loading Experience...
              </span>
            </div>
          </div>
        )}

        {/* Gradient Background while video loads */}
        <div className={`absolute inset-0 bg-gradient-to-br from-maroon-dark/90 via-maroon/80 to-black/90 transition-opacity duration-1000 ${isVideoReady ? 'opacity-0' : 'opacity-100'
          }`} />

        <video
          ref={currentVideoRef}
          muted
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover brightness-[0.45] transition-opacity duration-1000 ${isVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
          onEnded={() => {
            if (!isTransitioningRef.current && isVideoReady) {
              const nextIdx = (currentSlide + 1) % VIDEOS.length;
              animateSlideTransition(nextIdx);
            }
          }}
        />

        <video
          ref={nextVideoRef}
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_80%)] pointer-events-none z-10" />

      {/* Next Slide Preview */}
      <div
        ref={previewRef}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-30 cursor-pointer group"
        onClick={() => goToSlide(nextIndex)}
      >
        <div className="relative overflow-hidden rounded-lg shadow-2xl border border-gold-base/20 w-28 sm:w-32 md:w-36 lg:w-40 h-18 sm:h-20 md:h-22 lg:h-24">
          <div className="absolute inset-0 bg-black/80" />

          <video
            ref={previewVideoRef}
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.6] transition-all duration-500"
          />

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
          <span className="font-serif-heading text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase text-gold-base/60 animate-pulse whitespace-whitespace-nowrap">
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