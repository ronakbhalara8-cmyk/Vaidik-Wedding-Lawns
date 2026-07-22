"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";

const faqs = [
  {
    question: "What is the maximum guest capacity of Vaidik Wedding Lawns?",
    answer:
      "Our largest space, The Royal Grand Lawn, can comfortably host between 800 to 2,500 guests. For indoor celebrations, the Vaidik Banquet Hall can accommodate 200 to 800 guests. Smaller lawns are available for intimate pre-wedding functions.",
  },
  {
    question: "Do you allow outside catering and decorators?",
    answer:
      "Yes! While we offer signature premium in-house catering (multi-cuisine) and bespoke luxury decor packages, we also permit certified external caterers and decor teams to ensure your day fits your custom dream.",
  },
  {
    question: "What amenities are included in the venue booking price?",
    answer:
      "Every booking includes exclusive access to your chosen lawn or hall, 2-4 luxury air-conditioned changing suites, basic staging, power backup (generators), ambient lighting, dedicated cleaning staff, and complimentary valet parking.",
  },
  {
    question: "What is the cancellation and rescheduling policy?",
    answer:
      "To secure your date, we require a 30% advance booking deposit. reschedulings are accommodated up to 120 days prior to the wedding date, subject to date availability. The booking deposit is non-refundable.",
  },
  {
    question: "Do you have overnight stay accommodations for guests?",
    answer:
      "We provide luxury VIP changing suites on-site. For overnight guest accommodation, we have tie-ups with premium 5-star partner hotels located within a 5-minute drive from the venue, offering exclusive discount rates for Vaidik clients.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-24 md:py-32 bg-cream text-charcoal overflow-hidden border-t border-maroon-base/5">
      {/* Background soft lighting shapes */}
      <div className="absolute left-0 top-1/4 w-[300px] h-[300px] bg-maroon-base/3 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-[300px] h-[300px] bg-gold-base/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <FadeIn direction="down" duration={0.8}>
            <span className="font-serif-heading text-xs tracking-[0.3em] uppercase text-maroon-base bg-maroon-light/10 border border-maroon-base/15 rounded-full px-4 py-1.5 inline-block mb-4">
              Answers & Guidance
            </span>
          </FadeIn>
          <SplitReveal
            type="words"
            tag="h2"
            className="font-serif-heading text-3xl sm:text-4xl tracking-wide text-maroon-dark uppercase leading-tight font-bold"
          >
            Frequently Asked Questions
          </SplitReveal>
        </div>

        {/* Accordion List */}
        <FadeIn direction="up" duration={0.2} distance={30} stagger={0.1} className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-maroon-base/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-md shadow-maroon-base/2"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 font-serif-heading text-sm md:text-base text-maroon-dark font-medium tracking-wide hover:text-maroon-base transition-colors duration-300"
                >
                  <span>{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-maroon-light/5 border border-maroon-base/10 flex items-center justify-center shrink-0 text-maroon-base group-hover:bg-maroon-base transition-all duration-300">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer block with max-height transition */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden`}
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-6 text-sm text-charcoal/70 leading-relaxed font-light border-t border-maroon-base/5 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </FadeIn>

      </div>
    </section>
  );
}
