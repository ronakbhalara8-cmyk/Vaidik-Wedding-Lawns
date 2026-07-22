"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, MapPin, Calendar, Clock, Sparkles } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

const venues = [
  { id: "royal-lawn", name: "The Royal Grand Lawn", capacity: "800 - 2,500 Guests" },
  { id: "mandap-lawn", name: "The Golden Mandap Lawn", capacity: "300 - 1,000 Guests" },
  { id: "banquet-hall", name: "The Vaidik Banquet Hall", capacity: "200 - 800 Guests" },
];

const timeSlots = ["10:00 AM - 12:00 PM", "12:00 PM - 02:00 PM", "02:00 PM - 04:00 PM", "04:00 PM - 06:00 PM"];

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

  const selectVenue = (id) => {
    setForm({ ...form, venue: id });
    setStep(2);
  };

  const nextStep = () => {
    if (step === 2 && (!form.date || !form.time)) {
      alert("Please select a date and preferred time slot.");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Congratulations! Your private walkthrough of ${venues.find((v) => v.id === form.venue)?.name || "our lawns"} has been scheduled for ${form.date} during the ${form.time} slot. A manager will confirm via phone shortly.`);
    setForm({ venue: "", date: "", time: "", name: "", email: "", phone: "", guests: "" });
    setStep(1);
  };

  return (
    <div className="pt-24 min-h-screen bg-cream text-charcoal flex flex-col justify-between">
      <div className="max-w-3xl mx-auto px-6 py-16 w-full flex-grow flex flex-col justify-center">
        
        {/* Progress Tracker bar */}
        <div className="flex items-center justify-between gap-4 mb-12 max-w-md mx-auto w-full">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-serif-heading text-xs transition-all duration-300
                  ${
                    step >= s
                      ? "bg-maroon-base text-gold-light border-gold-base font-semibold"
                      : "bg-white text-maroon-dark/40 border border-maroon-base/10"
                  }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-[1px] flex-grow transition-all duration-500
                    ${step > s ? "bg-gold-base" : "bg-maroon-base/10"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Dynamic Wizard Steps */}
        <div className="bg-white border border-maroon-base/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative Corner Ornaments */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.02)_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

          {/* STEP 1: SELECT VENUE */}
          {step === 1 && (
            <FadeIn direction="none" duration={0.4}>
              <h2 className="font-serif-heading text-xl md:text-2xl uppercase tracking-wider text-maroon-dark mb-3 text-center font-bold">
                Select Venue Lawn
              </h2>
              <p className="text-sm text-charcoal/60 text-center mb-8 font-light">
                Which beautiful physical space would you like to inspect during your tour?
              </p>
              
              <div className="flex flex-col gap-4">
                {venues.map((venue) => (
                  <button
                    key={venue.id}
                    onClick={() => selectVenue(venue.id)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group
                      ${
                        form.venue === venue.id
                          ? "bg-maroon-base text-gold-light border-gold-base shadow-lg"
                          : "bg-cream/20 hover:bg-cream/40 border-maroon-base/10 hover:border-gold-base/50"
                      }`}
                  >
                    <div>
                      <h3 className={`font-serif-heading text-sm md:text-base tracking-wider uppercase font-semibold
                        ${form.venue === venue.id ? "text-gold-light" : "text-maroon-dark group-hover:text-maroon-base"}`}>
                        {venue.name}
                      </h3>
                      <span className={`text-xs block mt-1 font-light
                        ${form.venue === venue.id ? "text-gold-light/60" : "text-charcoal/50"}`}>
                        Capacity Range: {venue.capacity}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </FadeIn>
          )}

          {/* STEP 2: SELECT DATE & TIME */}
          {step === 2 && (
            <FadeIn direction="none" duration={0.4}>
              <h2 className="font-serif-heading text-xl md:text-2xl uppercase tracking-wider text-maroon-dark mb-3 text-center font-bold">
                Choose Date & Time Slot
              </h2>
              <p className="text-sm text-charcoal/60 text-center mb-8 font-light">
                Reserve an appointment window for your private tour.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Date Picker */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="date" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Appointment Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-base text-charcoal text-sm placeholder-charcoal/30 transition-all"
                  />
                </div>

                {/* Time Slots */}
                <div className="flex flex-col gap-2">
                  <label className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5" /> Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setForm({ ...form, time: slot })}
                        className={`text-left px-4 py-3 rounded-xl border text-xs tracking-wider font-light transition-all duration-200
                          ${
                            form.time === slot
                              ? "bg-maroon-base text-gold-light border-gold-base font-medium"
                              : "bg-cream/20 hover:bg-cream/40 border-maroon-base/10 hover:border-gold-base/40"
                          }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between border-t border-maroon-base/5 pt-8 mt-8">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1 font-serif-heading text-[10px] tracking-widest uppercase text-maroon-dark/60 hover:text-maroon-dark transition-colors duration-200"
                >
                  <ChevronLeft className="w-4 h-4" /> Change Venue
                </button>
                <button
                  onClick={nextStep}
                  className="bg-maroon-dark text-gold-light hover:bg-gold-base hover:text-maroon-dark border border-gold-base/30 rounded-full px-6 py-3 uppercase font-serif-heading text-[10px] tracking-[0.2em] transition-all duration-300 shadow-md flex items-center gap-1 cursor-pointer"
                >
                  Enter Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </FadeIn>
          )}

          {/* STEP 3: CONTACT INFORMATION */}
          {step === 3 && (
            <FadeIn direction="none" duration={0.4}>
              <h2 className="font-serif-heading text-xl md:text-2xl uppercase tracking-wider text-maroon-dark mb-3 text-center font-bold">
                Confirm Inquirer Details
              </h2>
              <p className="text-sm text-charcoal/60 text-center mb-8 font-light">
                Complete your scheduling details to verify your booking slot.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-sm text-charcoal/80 font-light">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                      className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guests" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold">Expected Guest Count</label>
                    <input
                      type="number"
                      id="guests"
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      placeholder="e.g. 500"
                      required
                      className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all"
                    />
                  </div>
                </div>

                {/* Navigation actions */}
                <div className="flex justify-between border-t border-maroon-base/5 pt-8 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-1 font-serif-heading text-[10px] tracking-widest uppercase text-maroon-dark/60 hover:text-maroon-dark transition-colors duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" /> Change Time
                  </button>
                  <button
                    type="submit"
                    className="bg-maroon-dark text-gold-light hover:bg-gold-base hover:text-maroon-dark border border-gold-base/30 rounded-full px-8 py-3.5 uppercase font-serif-heading text-[10px] tracking-[0.2em] transition-all duration-300 shadow-lg flex items-center gap-1 cursor-pointer"
                  >
                    Confirm Appointment <Sparkles className="w-3.5 h-3.5 text-gold-base" />
                  </button>
                </div>
              </form>
            </FadeIn>
          )}

        </div>
      </div>
    </div>
  );
}
