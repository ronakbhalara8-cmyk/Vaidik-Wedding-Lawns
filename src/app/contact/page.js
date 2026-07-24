"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Calendar, Clock, Send } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${form.name}. Our senior wedding planner has received your request and will contact you shortly.`);
    setForm({ name: "", email: "", phone: "", date: "", guests: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* Header */}
      <section className="relative h-[42vh] min-h-[320px] pt-16 flex items-center justify-center bg-maroon-dark text-ivory overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 brightness-[0.4] pointer-events-none"
          style={{ backgroundImage: "url('/images/wedding_lawn.png')" }}
        />
        <div className="absolute inset-0 bg-grad-overlay pointer-events-none z-10" />

        <div className="relative z-20 text-center max-w-2xl px-6">
          <FadeIn direction="down" duration={0.6}>
            <span className="font-serif-heading text-[10px] tracking-[0.3em] text-gold-base uppercase mb-2 block">
              Start Planning
            </span>
          </FadeIn>
          <SplitReveal
            type="chars"
            tag="h1"
            className="font-serif-heading text-3xl sm:text-5xl tracking-widest uppercase font-bold text-shadow-premium text-gold-light"
          >
            Contact Us
          </SplitReveal>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 md:py-14 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Info Details */}
          <div className="flex flex-col gap-8 justify-center">
            <div>
              <span className="font-serif-heading text-xs tracking-[0.25em] text-maroon-base bg-maroon-light/10 border border-maroon-base/15 rounded-full px-4 py-1.5 inline-block mb-4">
                Connect Directly
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-maroon-dark uppercase leading-tight font-bold mb-4">
                Let's Shape Your Union
              </h2>
              <p className="text-sm md:text-base text-charcoal/65 leading-relaxed font-light">
                Whether you wish to reserve a date, request customized catering quotes, or take a private tour of our banquet suites, our counselors are at your service.
              </p>
            </div>

            <ul className="flex flex-col gap-6 text-sm text-charcoal/80 font-light">
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-maroon-light/5 border border-maroon-base/10 flex items-center justify-center text-maroon-base shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="font-serif-heading text-xs tracking-wider uppercase text-maroon-base block mb-1">Our Location</strong>
                  Near Kanad fatak, 300 feet, Sayan Hazira Ring Road, opp. Variyav Check Post, Surat, Gujarat 394520
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-maroon-light/5 border border-maroon-base/10 flex items-center justify-center text-maroon-base shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="font-serif-heading text-xs tracking-wider uppercase text-maroon-base block mb-1">Call Booking Office</strong>
                  <a href="tel:+919913303351" className="hover:text-gold-base transition-colors duration-200">+91 99133 03351</a>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-maroon-light/5 border border-maroon-base/10 flex items-center justify-center text-maroon-base shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="font-serif-heading text-xs tracking-wider uppercase text-maroon-base block mb-1">Email Inquiries</strong>
                  <a href="mailto:vaidiklawns@gmail.com" className="hover:text-gold-base transition-colors duration-200">vaidiklawns@gmail.com</a>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-maroon-light/5 border border-maroon-base/10 flex items-center justify-center text-maroon-base shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="font-serif-heading text-xs tracking-wider uppercase text-maroon-base block mb-1">Office Hours</strong>
                  Mon - Sun: 09:00 AM - 09:00 PM
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Inquiry Form */}
          <div className="bg-white border border-maroon-base/10 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <h3 className="font-serif-heading text-lg uppercase tracking-wider text-maroon-dark mb-8 pb-3 border-b border-maroon-base/10">
              Send Event Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-sm text-charcoal/80 font-light">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold">Event Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-base text-charcoal text-xs placeholder-charcoal/30 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guests" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold">Guests Count</label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      placeholder="e.g. 500"
                      required
                      className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-serif-heading text-[10px] tracking-widest uppercase text-maroon-base font-semibold">Tell Us About Your Dream Wedding</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Detail your decor themes, seating, mocktails or package interests..."
                  required
                  className="w-full bg-cream/40 border border-maroon-base/15 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-base text-charcoal placeholder-charcoal/30 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-maroon-dark text-gold-light hover:bg-gold-base hover:text-maroon-dark border border-gold-base/30 rounded-full py-4 uppercase font-serif-heading text-xs tracking-[0.2em] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Submit Inquiry
              </button>
            </form>
          </div>
        </div>


        {/* Embedded Map Section */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-gold-base/20 h-96 relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.263742560714!2d72.7932418!3d21.2554343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04bb4c96faac1%3A0x23787582c7f01b85!2sVaidik%20Lawns!5e0!3m2!1sen!2sin!4v1690000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) invert(0.9) sepia(0.5) hue-rotate(330deg)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vaidik Wedding Lawns Location Map"
          />
          {/* Transparent color overlay to make it look matching */}
          <div className="absolute inset-0 bg-maroon-dark/10 pointer-events-none mix-blend-color group-hover:bg-transparent transition-all duration-500" />
        </div>
      </section>
    </div>
  );
}
