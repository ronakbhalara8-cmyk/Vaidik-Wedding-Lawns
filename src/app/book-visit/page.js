"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  Sparkles,
  Users,
  Phone,
  Mail,
  User,
  Crown,
  Flower2,
  PartyPopper,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { gsap } from "@/lib/gsap";

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
  }
];

const timeSlots = [
  { time: "10:00 AM - 12:00 PM", icon: "🌅", period: "Morning" },
  { time: "12:00 PM - 02:00 PM", icon: "☀️", period: "Afternoon" },
  { time: "02:00 PM - 04:00 PM", icon: "🌤️", period: "Late Afternoon" },
  { time: "04:00 PM - 06:00 PM", icon: "🌆", period: "Evening" }
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
    guests: ""
  });

  const containerRef = useRef(null);
  const stepContentRef = useRef(null);
  const headerRef = useRef(null);

  // GSAP Step Transition Animation
  useEffect(() => {
    if (!stepContentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepContentRef.current,
        { opacity: 0, y: 15, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" }
      );
    }, stepContentRef);

    return () => ctx.revert();
  }, [step]);

  const handleVenueSelect = (id) => {
    setForm((prev) => ({ ...prev, venue: id }));
  };

  const nextStep = () => {
    if (step === 1 && !form.venue) return;
    if (step === 2 && (!form.date || !form.time)) {
      alert("કૃપા કરીને તારીખ અને સમયનો સ્લોટ પસંદ કરો.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const venueName = venues.find((v) => v.id === form.venue)?.name || "The Venue";
    alert(
      `✨ Congratulations! Your private walkthrough of ${venueName} has been scheduled for ${form.date} during the ${form.time} slot.`
    );
    setForm({ venue: "", date: "", time: "", name: "", email: "", phone: "", guests: "" });
    setStep(1);
  };

  const selectedVenue = venues.find((v) => v.id === form.venue);
  const VenueIcon = selectedVenue?.icon || MapPin;

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#2C221E] flex flex-col justify-between relative overflow-hidden font-sans select-none pt-28 md:pt-36 pb-12">

      {/* Royal Background Lighting Accent */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-[#D4AF37]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-[#6B1D2F]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">

        {/* Header Section */}
        <header ref={headerRef} className="text-center mb-6 md:mb-10 w-full">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#8C233A] bg-[#6B1D2F]/10 border border-[#6B1D2F]/20 font-bold rounded-full px-4 py-1.5 mb-3 shadow-xs">
            ✦ Private Walkthrough ✦
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-[#6B1D2F] font-extrabold leading-tight">
            Book A Private{" "}
            <span className="bg-gradient-to-r from-[#B37B2C] via-[#D4AF37] to-[#AA771C] bg-clip-text text-transparent block sm:inline">
              Walkthrough
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5C4D46] mt-2 sm:mt-3 max-w-lg mx-auto leading-relaxed font-normal">
            Select your preferred venue, choose an ideal slot, and allow our team to curate a personalized tour for you.
          </p>
        </header>

        {/* Multi-Step Indicator Bar */}
        <div className="w-full max-w-md mx-auto mb-8 px-4">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3].map((s, idx) => (
              <div key={s} className="flex items-center relative z-10">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 border-2 ${step >= s
                    ? "bg-[#6B1D2F] text-[#F3E5AB] border-[#D4AF37] shadow-lg shadow-[#6B1D2F]/20 scale-105"
                    : "bg-white/90 text-stone-400 border-stone-200"
                    }`}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" /> : s}
                </div>
                {idx < 2 && (
                  <div className="w-16 sm:w-28 h-[2px] bg-stone-200 absolute left-full top-1/2 -translate-y-1/2 -z-10 mx-1">
                    <div
                      className="h-full bg-gradient-to-r from-[#6B1D2F] to-[#D4AF37] transition-all duration-500"
                      style={{ width: step > s ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[11px] sm:text-xs text-[#5C4D46] font-semibold mt-2.5 px-1">
            <span>Venue</span>
            <span>Date & Time</span>
            <span>Details</span>
          </div>
        </div>

        {/* Main Content Card */}
        <div
          ref={containerRef}
          className="w-full bg-white/95 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl shadow-[#6B1D2F]/5 relative overflow-hidden"
        >
          {/* Card Top Gold Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#6B1D2F] via-[#D4AF37] to-[#6B1D2F]" />

          {/* Active Step Content */}
          <div ref={stepContentRef}>

            {/* STEP 1: VENUE SELECTION */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center mb-4">
                  <h2 className="font-serif text-lg sm:text-xl text-[#6B1D2F] font-bold uppercase tracking-wider">
                    Select Venue
                  </h2>
                  <p className="text-xs text-[#7A6860]">Choose the ideal backdrop for your event</p>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {venues.map((v) => {
                    const Icon = v.icon;
                    const isSelected = form.venue === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => handleVenueSelect(v.id)}
                        className={`cursor-pointer p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 flex items-start gap-4 ${isSelected
                          ? "bg-[#6B1D2F] text-white border-[#D4AF37] shadow-xl shadow-[#6B1D2F]/20"
                          : "bg-[#FAF7F2] hover:bg-white border-stone-200 hover:border-[#D4AF37]/60 text-stone-800"
                          }`}
                      >
                        <div
                          className={`p-3 rounded-lg ${isSelected ? "bg-[#D4AF37]/20 text-[#F3E5AB]" : "bg-[#6B1D2F]/10 text-[#6B1D2F]"
                            }`}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3
                              className={`font-serif font-bold text-sm sm:text-base truncate uppercase tracking-wide ${isSelected ? "text-[#F3E5AB]" : "text-[#6B1D2F]"
                                }`}
                            >
                              {v.name}
                            </h3>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                          </div>
                          <p
                            className={`text-xs mt-1 leading-normal line-clamp-2 ${isSelected ? "text-stone-200" : "text-[#66554E]"
                              }`}
                          >
                            {v.description}
                          </p>
                          <div
                            className={`mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium ${isSelected ? "text-[#D4AF37]" : "text-stone-500"
                              }`}
                          >
                            <Users className="w-3.5 h-3.5" />
                            <span>{v.capacity}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    onClick={nextStep}
                    disabled={!form.venue}
                    className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-serif text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 ${form.venue
                      ? "bg-gradient-to-r from-[#8C233A] to-[#6B1D2F] text-[#F3E5AB] hover:from-[#6B1D2F] hover:to-[#521322] border border-[#D4AF37]/40 shadow-md cursor-pointer"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed"
                      }`}
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME SELECTOR */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-2">
                  <h2 className="font-serif text-lg sm:text-xl text-[#6B1D2F] font-bold uppercase tracking-wider">
                    Select Date & Time Slot
                  </h2>
                  {selectedVenue && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#6B1D2F] bg-[#6B1D2F]/10 px-3 py-1 rounded-full mt-2 border border-[#6B1D2F]/20 font-semibold">
                      <VenueIcon className="w-3.5 h-3.5" />
                      {selectedVenue.name}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Date Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6B1D2F] flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#B37B2C]" /> Choose Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-stone-800 text-sm font-medium transition-all"
                    />
                  </div>

                  {/* Time Slot Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6B1D2F] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#B37B2C]" /> Preferred Time
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = form.time === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setForm({ ...form, time: slot.time })}
                            className={`flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all text-left ${isSelected
                              ? "bg-[#6B1D2F] text-white border-[#D4AF37] shadow-md"
                              : "bg-[#FAF7F2] hover:bg-stone-100 border-stone-200 text-stone-700"
                              }`}
                          >
                            <span className="text-xs font-medium flex items-center gap-2">
                              <span>{slot.icon}</span> {slot.time}
                            </span>
                            <span className={`text-[10px] ${isSelected ? "text-[#F3E5AB]" : "text-stone-400"}`}>
                              {slot.period}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-stone-200/80 pt-5">
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-1 text-xs uppercase tracking-wider text-stone-500 hover:text-[#6B1D2F] font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-8 py-3.5 bg-[#6B1D2F] text-[#F3E5AB] hover:bg-[#521322] rounded-full font-serif text-xs uppercase tracking-widest font-bold flex items-center gap-2 border border-[#D4AF37]/40 shadow-md transition-all"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT FORM */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center mb-2">
                  <h2 className="font-serif text-lg sm:text-xl text-[#6B1D2F] font-bold uppercase tracking-wider">
                    Personal Details
                  </h2>
                  <p className="text-xs text-[#7A6860]">Provide details so our manager can reach out</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#B37B2C]" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#B37B2C]" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99133 03351"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#B37B2C]" /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#B37B2C]" /> Expected Guests
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 500"
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Summary Card */}
                <div className="bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-xl p-3.5 text-xs text-[#6B1D2F] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Selected Venue:</span>
                    <span className="font-bold">{selectedVenue?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Scheduled Date & Time:</span>
                    <span className="font-bold">
                      {form.date} • {form.time}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between border-t border-stone-200/80 pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-1 text-xs uppercase tracking-wider text-stone-500 hover:text-[#6B1D2F] font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#AA771C] to-[#8C6212] text-white hover:from-[#B37B2C] hover:to-[#6B1D2F] rounded-full font-serif text-xs uppercase tracking-widest font-bold flex items-center gap-2 shadow-lg transition-all transform hover:scale-[1.02]"
                  >
                    Confirm Booking <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-[#7A6860] tracking-wider mt-6 font-medium">
          ✦ Our representative will contact you within 2 hours to confirm details ✦
        </p>
      </div>
    </main>
  );
}