"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, Calendar, Clock, Sparkles, Users, Phone, Mail, User, Crown, Flower2, PartyPopper, MapPin } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const venues = [
  {
    id: "royal-lawn",
    name: "The Royal Grand Lawn",
    capacity: "800 - 2,500 Guests",
    icon: Crown,
    description: "Our flagship venue with sprawling 5-acre manicured lawns"
  },
  {
    id: "mandap-lawn",
    name: "The Golden Mandap Lawn",
    capacity: "300 - 1,000 Guests",
    icon: Flower2,
    description: "Intimate setting with ornate floral mandap arrangements"
  },
  {
    id: "banquet-hall",
    name: "The Vaidik Banquet Hall",
    capacity: "200 - 800 Guests",
    icon: PartyPopper,
    description: "Elegant indoor space with crystal chandeliers"
  },
];

const timeSlots = [
  { time: "10:00 AM - 12:00 PM", icon: "🌅" },
  { time: "12:00 PM - 02:00 PM", icon: "☀️" },
  { time: "02:00 PM - 04:00 PM", icon: "🌤️" },
  { time: "04:00 PM - 06:00 PM", icon: "🌅" },
];

export default function BookVisitPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    venue: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    guests: "",
  });

  const containerRef = useRef(null);
  const stepContentRef = useRef(null);
  const progressRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ctx;

    try {
      ctx = gsap.context(() => {
        // Header animation
        const header = headerRef.current;
        if (header) {
          gsap.fromTo(header,
            {
              opacity: 0,
              y: -30,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: header,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play none none reverse",
                scrub: 1,
              },
            }
          );
        }

        // Animate step content entrance
        const stepContent = stepContentRef.current;
        if (stepContent) {
          gsap.fromTo(stepContent,
            {
              opacity: 0,
              y: 20,
              scale: 0.98,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
            }
          );
        }

        // Animate progress bar
        const progressDots = progressRef.current?.querySelectorAll('.progress-dot') || [];
        progressDots.forEach((dot, index) => {
          if (index < step) {
            gsap.to(dot, {
              scale: 1.2,
              backgroundColor: "#8B1A1A",
              borderColor: "#C9A84C",
              duration: 0.4,
              ease: "power2.out",
            });
          } else {
            gsap.to(dot, {
              scale: 1,
              backgroundColor: "transparent",
              borderColor: "rgba(139, 26, 26, 0.1)",
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });

        // Animate progress lines
        const progressLines = progressRef.current?.querySelectorAll('.progress-line') || [];
        progressLines.forEach((line, index) => {
          if (index < step - 1) {
            gsap.to(line, {
              width: "100%",
              backgroundColor: "#C9A84C",
              duration: 0.5,
              ease: "power2.out",
            });
          } else {
            gsap.to(line, {
              width: "0%",
              backgroundColor: "rgba(139, 26, 26, 0.1)",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      }, container);

    } catch (error) {
      console.warn("Animation error:", error);
    }

    return () => {
      if (ctx && typeof ctx.revert === "function") {
        ctx.revert();
      }
    };
  }, [step]);

  const selectVenue = (id) => {
    setForm({ ...form, venue: id });
    gsap.to(stepContentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => setStep(2)
    });
  };

  const nextStep = () => {
    if (step === 2 && (!form.date || !form.time)) {
      alert("Please select a date and preferred time slot.");
      return;
    }
    gsap.to(stepContentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => setStep(step + 1)
    });
  };

  const prevStep = () => {
    gsap.to(stepContentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => setStep(step - 1)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const venueName = venues.find((v) => v.id === form.venue)?.name || "our lawns";
    alert(`✨ Congratulations! Your private walkthrough of ${venueName} has been scheduled for ${form.date} during the ${form.time} slot. A manager will confirm via phone shortly. 🌟`);
    setForm({ venue: "", date: "", time: "", name: "", email: "", phone: "", guests: "" });
    setStep(1);
  };

  const selectedVenue = venues.find(v => v.id === form.venue);
  const VenueIcon = selectedVenue?.icon || MapPin;

  const getStepInfo = () => {
    switch (step) {
      case 1:
        return {
          title: "Choose Your Venue",
          subtitle: "Select the perfect setting for your royal celebration"
        };
      case 2:
        return {
          title: "Schedule Your Visit",
          subtitle: "Pick a date and time for your exclusive tour"
        };
      case 3:
        return {
          title: "Confirm Your Details",
          subtitle: "Fill in your information to complete the booking"
        };
      default:
        return {
          title: "Book a Private Walkthrough",
          subtitle: "Experience the grandeur of Vaidik Wedding Lawns in person"
        };
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-cream/95 to-gold-light/5 text-charcoal flex flex-col">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold-base/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-maroon-base/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold-base/5 rounded-full blur-2xl" />
        <div className="absolute top-40 left-20 text-6xl opacity-10" style={{ animation: 'float-slow 6s ease-in-out infinite' }}>✦</div>
        <div className="absolute bottom-40 right-20 text-8xl opacity-10" style={{ animation: 'float-slower 8s ease-in-out infinite' }}>✦</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-16 md:pt-20">
        <div className="max-w-3xl mx-auto px-6 py-4 md:py-8 w-full flex-grow flex flex-col">

          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-6 md:mb-10">
            <span className="inline-block font-serif-heading text-[10px] tracking-[0.35em] uppercase text-gold-base bg-gold-base/10 border border-gold-base/20 rounded-full px-5 py-2 mb-3">
              ✦ Schedule Your Visit ✦
            </span>
            <h1 className="font-serif-heading text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider text-maroon-dark font-bold leading-tight">
              Book a Private
              <span className="block text-gold-base mt-1">Walkthrough</span>
            </h1>
            <p className="text-sm text-charcoal/60 mt-3 max-w-md mx-auto font-light">
              Experience the grandeur of Vaidik Wedding Lawns in person. Choose your venue, pick a date, and let us host you.
            </p>
          </div>

          {/* Progress Tracker */}
          <div ref={progressRef} className="flex items-center justify-between gap-3 mb-8 max-w-md mx-auto w-full px-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`progress-dot w-9 h-9 rounded-full flex items-center justify-center font-serif-heading text-xs font-bold transition-all duration-500 border-2
                    ${step >= s
                      ? "bg-maroon-base text-gold-light border-gold-base shadow-lg shadow-gold-base/20"
                      : "bg-white/80 text-maroon-dark/40 border-maroon-base/10"
                    }`}
                >
                  {step > s ? "✓" : s}
                </div>
                {s < 3 && (
                  <div className="progress-line flex-1 h-[2px] bg-maroon-base/10 transition-all duration-500 overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${step > s ? "w-full bg-gold-base" : "w-0"}`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Main Card */}
          <div
            ref={containerRef}
            className="bg-white/90 backdrop-blur-sm border border-maroon-base/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex-1"
          >
            {/* Decorative Corner Ornaments */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold-base/20 rounded-tl-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold-base/20 rounded-tr-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold-base/20 rounded-bl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold-base/20 rounded-br-3xl pointer-events-none" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* Step Title */}
            <div className="text-center mb-6">
              <h2 className="font-serif-heading text-xl md:text-2xl uppercase tracking-wider text-maroon-dark font-bold">
                {stepInfo.title}
              </h2>
              <p className="text-sm text-charcoal/60 mt-1 font-light">
                {stepInfo.subtitle}
              </p>
              {step === 2 && selectedVenue && (
                <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 bg-gold-base/10 rounded-full border border-gold-base/20">
                  <VenueIcon className="w-3 h-3 text-gold-base" />
                  <span className="text-[10px] tracking-wider uppercase text-charcoal/70 font-medium">
                    {selectedVenue.name}
                  </span>
                </div>
              )}
            </div>

            {/* Step Content */}
            <div ref={stepContentRef} className="relative z-10">
              {/* STEP 1: SELECT VENUE */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {venues.map((venue) => {
                      const Icon = venue.icon;
                      const isSelected = form.venue === venue.id;
                      return (
                        <button
                          key={venue.id}
                          onClick={() => selectVenue(venue.id)}
                          className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-500 group relative overflow-hidden
                            ${isSelected
                              ? "bg-gradient-to-r from-maroon-base to-maroon-dark border-gold-base shadow-xl shadow-gold-base/20"
                              : "bg-cream/30 hover:bg-cream/60 border-maroon-base/10 hover:border-gold-base/40"
                            }`}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 bg-gold-base/5 animate-pulse" />
                          )}
                          <div className="flex items-center gap-4 relative z-10">
                            <div className={`p-3 rounded-xl transition-all duration-300
                              ${isSelected
                                ? "bg-gold-base/20 text-gold-light"
                                : "bg-gold-base/5 text-maroon-dark group-hover:text-gold-base"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className={`font-serif-heading text-sm md:text-base tracking-wider uppercase font-semibold
                                ${isSelected ? "text-gold-light" : "text-maroon-dark group-hover:text-maroon-base"}`}
                              >
                                {venue.name}
                              </h3>
                              <span className={`text-xs block mt-0.5 font-light
                                ${isSelected ? "text-gold-light/70" : "text-charcoal/50"}`}
                              >
                                {venue.description}
                              </span>
                              <span className={`text-[10px] block mt-1 font-light flex items-center gap-1
                                ${isSelected ? "text-gold-light/60" : "text-charcoal/40"}`}
                              >
                                <Users className="w-3 h-3" /> Capacity: {venue.capacity}
                              </span>
                            </div>
                            <ChevronRight className={`w-5 h-5 transition-all duration-300
                              ${isSelected
                                ? "text-gold-light translate-x-1"
                                : "opacity-30 group-hover:opacity-100 group-hover:translate-x-1"
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={nextStep}
                      disabled={!form.venue}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-serif-heading text-[10px] tracking-[0.2em] uppercase transition-all duration-300
                        ${form.venue
                          ? "bg-maroon-dark text-gold-light hover:bg-gold-base hover:text-maroon-dark border-2 border-gold-base/30 shadow-lg shadow-gold-base/10"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT DATE & TIME */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Appointment Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          required
                          className="w-full bg-cream/50 border-2 border-maroon-base/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-base text-charcoal text-sm transition-all duration-300"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Time Slot
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setForm({ ...form, time: slot.time })}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300
                              ${form.time === slot.time
                                ? "bg-maroon-base text-gold-light border-gold-base shadow-lg"
                                : "bg-cream/20 hover:bg-cream/40 border-maroon-base/10 hover:border-gold-base/40"
                              }`}
                          >
                            <span className="text-lg">{slot.icon}</span>
                            <span className="text-xs tracking-wider font-light">{slot.time}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-maroon-base/5 pt-5">
                    <button
                      onClick={prevStep}
                      className="flex items-center gap-1 font-serif-heading text-[10px] tracking-widest uppercase text-maroon-dark/60 hover:text-maroon-dark transition-colors duration-300"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex items-center gap-2 px-6 py-3 bg-maroon-dark text-gold-light hover:bg-gold-base hover:text-maroon-dark border-2 border-gold-base/30 rounded-full uppercase font-serif-heading text-[10px] tracking-[0.2em] transition-all duration-300 shadow-lg shadow-gold-base/10"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT INFORMATION */}
              {step === 3 && (
                <div className="space-y-5">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold flex items-center gap-2">
                          <User className="w-4 h-4" /> Full Name
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Mr. & Mrs. Sharma"
                          required
                          className="w-full bg-cream/50 border-2 border-maroon-base/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold flex items-center gap-2">
                          <Phone className="w-4 h-4" /> Phone Number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          required
                          className="w-full bg-cream/50 border-2 border-maroon-base/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email Address
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="contact@example.com"
                          required
                          className="w-full bg-cream/50 border-2 border-maroon-base/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold flex items-center gap-2">
                          <Users className="w-4 h-4" /> Expected Guests
                        </label>
                        <input
                          type="number"
                          value={form.guests}
                          onChange={(e) => setForm({ ...form, guests: e.target.value })}
                          placeholder="e.g. 500"
                          required
                          className="w-full bg-cream/50 border-2 border-maroon-base/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-cream to-gold-light/5 rounded-xl p-4 border border-gold-base/20">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-charcoal/50">Venue:</span>
                        <span className="text-maroon-dark font-semibold">{selectedVenue?.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-charcoal/50">Date & Time:</span>
                        <span className="text-maroon-dark font-semibold">{form.date} • {form.time}</span>
                      </div>
                    </div>

                    <div className="flex justify-between border-t border-maroon-base/5 pt-5">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-1 font-serif-heading text-[10px] tracking-widest uppercase text-maroon-dark/60 hover:text-maroon-dark transition-colors duration-300"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-maroon-base to-maroon-dark text-gold-light hover:from-gold-base hover:to-gold-dark hover:text-maroon-dark border-2 border-gold-base/30 rounded-full uppercase font-serif-heading text-[10px] tracking-[0.2em] transition-all duration-500 shadow-xl shadow-gold-base/20 hover:shadow-gold-base/40 transform hover:scale-105"
                      >
                        Book Visit <Sparkles className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-[10px] text-charcoal/30 font-light tracking-wider mt-4">
            ✦ A dedicated venue manager will reach out within 2 hours to confirm your booking ✦
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(30px) rotate(-10deg); }
        }
      `}</style>
    </div>
  );
}