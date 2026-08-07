"use client";

import { Check, Calendar, Users, Map, Compass, Play, Globe, Building2, Film, Crown, CheckCircle2 } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const items = [
  {
    title: "The Royal Grand Lawn",
    tag: "Flagship Outdoor Space",
    capacity: "1500 - 2000 Guests",
    size: "45,000 Sq. Ft.",
    video: "/videos/DJI_20260110194459_0097_D_stabilized.mp4",
    description: "Our crown jewel. A sprawling manicured green carpet illuminated by high-mast and architectural lighting arrays. Designed to frame grand receptions, starry dinners, and cinematic stages.",
    features: [
      "Accommodates massive multi-tier mandap structures",
      "4 Luxury VIP changing suites equipped with vanity vanity mirrors",
      "Complimentary dedicated valet service counter",
      "Advanced 100% DG generator power backup",
      "Rainwater rapid-drainage subterranean soil layers",
    ],
  },
  {
    title: "The Golden Mandap Lawn",
    tag: "Traditional Phera Venue",
    capacity: "1500 - 2000 Guests",
    size: "25,000 Sq. Ft.",
    video: "/videos/046A9880.mp4",
    description: "Designed specifically to cultivate an intimate, spiritual energy for traditional Indian pheras. Framed by delicate floral arches, standard temple-style setup capability, and premium acoustics.",
    features: [
      "Sacred hawan fire-safe structural points",
      "2 Luxury air-conditioned suites and guest prep space",
      "Integrated audio wiring for high-quality mantra acoustics",
      "Delicate gold-mesh perimeter fencing",
    ],
  },
  {
    title: "The Vaidik Banquet Hall",
    tag: "Luxury Indoor Space",
    capacity: "1500 - 2000 Guests",
    size: "18,000 Sq. Ft.",
    video: "/videos/banquet-hall.mp4",
    description: "A state-of-the-art temperature-controlled indoor hall with soaring 22-foot double-height ceilings, majestic crystal chandeliers, and glass walls overlooking the lawns.",
    features: [
      "Centrally air-conditioned climate systems",
      "Exclusive glass visual lobby entrance",
      "4 Luxury guest suits and family lounge chambers",
      "Integrated acoustics with surround speaker systems",
      "Dedicated gourmet kitchen space for catering services",
    ],
  },
];

// ============================================================
// 🆕 NEW: Target Audience Data (from Image)
// ============================================================
const targetAudience = [
  {
    icon: Crown,
    title: "Premium Gujarati Families",
    desc: "Surat's elite families seeking world-class wedding experiences.",
  },
  {
    icon: Globe,
    title: "NRI & International Clients",
    desc: "Gujarati families from USA, Canada, UK, Australia & UAE.",
  },
  {
    icon: Building2,
    title: "Corporate Companies",
    desc: "Hosting galas, conferences, team-building, and brand events.",
  },
  {
    icon: Film,
    title: "Film, Fashion & Lifestyle",
    desc: "Fashion shows, film shoots, product launches & lifestyle events.",
  },
];

// ============================================================
// 🆕 NEW: Revenue Sources (from Image)
// ============================================================
const revenueSources = [
  "Wedding Bookings",
  "Receptions",
  "Engagements / Ring Ceremonies",
  "Corporate Events",
  "Sangeet & Mehendi",
  "Anniversary & Birthday Parties",
];

// ============================================================
// 🆕 NEW: Tagline from Image
// ============================================================
const brandTagline =
  "First Choice for Weddings, Corporate Events & Laxmi Celebrations";

// Video Component with Lazy Loading
const VideoPlayer = ({ src, title }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Generate thumbnail without loading full video
  useEffect(() => {
    // Use a video element only for thumbnail generation
    const tempVideo = document.createElement('video');
    tempVideo.src = src;
    tempVideo.preload = 'metadata';
    tempVideo.muted = true;
    tempVideo.crossOrigin = 'anonymous';

    const handleLoadedMetadata = () => {
      // Seek to 1 second for thumbnail
      tempVideo.currentTime = Math.min(1, tempVideo.duration * 0.1);
    };

    const handleSeeked = () => {
      // Create canvas and capture frame
      const canvas = document.createElement('canvas');
      canvas.width = tempVideo.videoWidth || 640;
      canvas.height = tempVideo.videoHeight || 360;
      const context = canvas.getContext('2d');
      context.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);

      const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      setThumbnail(thumbnailDataUrl);
      setIsLoading(false);

      // Clean up temp video
      tempVideo.src = '';
      tempVideo.load();
    };

    tempVideo.addEventListener('loadedmetadata', handleLoadedMetadata);
    tempVideo.addEventListener('seeked', handleSeeked);

    // If video already loaded enough
    if (tempVideo.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      tempVideo.removeEventListener('loadedmetadata', handleLoadedMetadata);
      tempVideo.removeEventListener('seeked', handleSeeked);
      tempVideo.src = '';
      tempVideo.load();
    };
  }, [src]);

  const handleVideoClick = () => {
    if (!isVideoLoaded) {
      // Load video only when clicked
      setIsVideoLoaded(true);
      // Small delay to ensure video element is ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(error => console.log('Play error:', error));
        }
      }, 100);
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.log('Play error:', error));
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative w-full h-full cursor-pointer group"
      onClick={handleVideoClick}
    >
      {/* Thumbnail Image */}
      {!isPlaying && thumbnail && (
        <div className="absolute inset-0 z-10">
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:bg-black/40">
            <div className=" flex items-center justify-center transform transition-transform group-hover:scale-110">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* Loading state for thumbnail */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-maroon-dark/20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gold-base/30 border-t-gold-base rounded-full animate-spin"></div>
        </div>
      )}

      {/* Video Element - Only rendered when clicked */}
      {isVideoLoaded && (
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          playsInline
          muted
          preload="none"
          onEnded={handleVideoEnd}
          onPause={() => {
            if (videoRef.current && videoRef.current.currentTime > 0) {
              setIsPlaying(false);
            }
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Pause indicator when video is playing */}
      {isPlaying && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 rounded-full p-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <div className="w-1.5 h-8 bg-maroon-dark rounded-sm mr-1.5"></div>
              <div className="w-1.5 h-8 bg-maroon-dark rounded-sm"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* Header */}
      <section className="relative h-[42vh] min-h-[320px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/image-2.webp"
            alt="Background"
            fill
            priority
            className="object-cover opacity-30 brightness-[0.4]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />

        <div className="relative z-20 text-center max-w-2xl px-6">
          <FadeIn direction="down" duration={0.6}>
            <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase mb-2 block">
              Grand Settings
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            Wedding Venues
          </SplitReveal>
        </div>
      </section>

      {/* Venues Listing */}
      <section className="container py-20 md:py-28 flex flex-col sm:gap-24 gap-10">
        {items.map((venue, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 border-b border-maroon-base/5 sm:pb-20 pb-10 last:border-0 last:pb-0
                ${isEven ? "" : "lg:flex-row-reverse"}`}
            >
              {/* Visual Panel */}
              <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:h-auto lg:self-stretch rounded-3xl overflow-hidden border border-gold-base/20 shadow-2xl relative">
                <VideoPlayer
                  src={venue.video}
                  title={venue.title}
                />
                <span className="absolute top-6 left-6 bg-maroon-dark/85 text-gold-base border border-gold-base/30 px-4 py-1.5 rounded-full font-serif-heading text-[9px] tracking-[0.25em] uppercase z-10">
                  {venue.tag}
                </span>
              </div>

              {/* Info Panel */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h2 className="font-serif-heading text-2xl sm:text-4xl tracking-wide uppercase text-maroon-dark font-bold">
                  {venue.title}
                </h2>

                {/* Meta details */}
                <div className="flex flex-wrap gap-4 text-xs font-serif-heading tracking-widest uppercase text-gold-dark border-y border-gold-base/15 py-3">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold-base" /> {venue.capacity}
                  </span>
                  <span className="h-4 w-[1px] bg-gold-base/20 hidden sm:block" />
                  <span className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-gold-base" /> {venue.size}
                  </span>
                </div>

                <p className="text-sm md:text-base text-charcoal/70 leading-relaxed font-light">
                  {venue.description}
                </p>

                {/* Features Checklist */}
                <ul className="flex flex-col gap-3">
                  {venue.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-3 items-start text-sm text-charcoal/80 font-light">
                      <Check className="w-4.5 h-4.5 text-gold-base shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full">
                  <Button
                    href="/contact"
                    variant="secondary"
                    className="flex-1 w-full px-4 sm:px-6 py-3 sm:py-3.5 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] whitespace-nowrap"
                  >
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-1" />
                    Book Private Visit
                  </Button>
                  <Button
                    href="/contact"
                    variant="outline"
                    className="flex-1 px-4 w-full sm:px-6 py-3 sm:py-3.5 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] whitespace-nowrap"
                  >
                    Inquire Availability
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ============================================================
          🆕 NEW SECTION: TARGET AUDIENCE (from Image)
          ============================================================ */}

      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
          <FadeIn direction="down" duration={0.4}>
            <span className="font-serif-heading text-xs tracking-[0.3em] text-gold-base uppercase mb-2 block font-semibold">
              Who We Serve
            </span>
          </FadeIn>
          <SplitReveal
            type="words"
            tag="h2"
            className="font-serif-heading text-3xl md:text-4xl uppercase tracking-wide font-bold text-maroon-dark"
          >
            Our Valued Clientele
          </SplitReveal>
          <p className="text-sm text-charcoal/70 mt-2 font-light max-w-md">
            From local royalty to global celebrations — we welcome everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetAudience.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn
                key={idx}
                direction="up"
                duration={0.2}
                delay={idx * 0.1}
              >
                <div className="bg-white border border-gold-base/20 rounded-2xl p-6 text-center hover:border-gold-base/60 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-full bg-maroon-dark/5 text-maroon-dark group-hover:bg-maroon-dark group-hover:text-gold-light flex items-center justify-center transition-colors duration-300 mx-auto mb-4 border border-maroon-dark/10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-heading text-base font-bold text-maroon-dark mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* NRI Highlight Badge */}
        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 bg-maroon-dark/5 border border-gold-base/20 rounded-full px-6 py-2 text-xs text-maroon-dark font-medium">
            <Globe className="w-4 h-4 text-gold-base" />
            Welcoming NRI families from USA, Canada, UK, Australia & UAE
          </span>
        </div>
      </div>

      {/* ============================================================
          🆕 NEW SECTION: REVENUE SOURCES (from Image)
          ============================================================ */}
      <section className="sm:py-24 py-16 bg-cream">
        <div className="container max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center">
            <FadeIn direction="down" duration={0.4}>
              <span className="font-serif-heading text-xs tracking-[0.3em] text-gold-base uppercase mb-2 block font-semibold">
                Our Services
              </span>
            </FadeIn>
            <SplitReveal
              type="words"
              tag="h2"
              className="font-serif-heading text-3xl md:text-4xl uppercase tracking-wide font-bold text-maroon-dark"
            >
              Event Solutions
            </SplitReveal>
            <p className="text-sm text-charcoal/70 mt-2 font-light">
              Comprehensive event solutions under one roof.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {revenueSources.map((item, idx) => (
              <FadeIn
                key={idx}
                direction="up"
                duration={0.2}
                delay={idx * 0.08}
              >
                <div className="bg-white border border-gold-base/20 rounded-xl p-4 text-center hover:border-gold-base/50 hover:shadow-md transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-gold-base mx-auto mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-maroon-dark">
                    {item}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div >
  );
}
