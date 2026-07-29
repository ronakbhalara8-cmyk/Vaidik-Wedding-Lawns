"use client";

import Button from "../ui/Button";
import SplitReveal from "../ui/SplitReveal";
import FadeIn from "../ui/FadeIn";

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-18 xl:py-24">

      {/* Background */}
      <div className="absolute inset-0 bg-cream" />

      <div className="container relative z-10">

        <div
          className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] lg:rounded-[42px] border border-gold-base/20 shadow-[0_20px_60px_rgba(0,0,0,.18)]">

          {/* Gradient */}
          <div className="absolute inset-0 bg-[#813241]" />

          {/* Top Glow */}
          {/* <div
            className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gold-base/20 blur-[90px] sm:h-80 sm:w-80 lg:h-[450px] lg:w-[450px]" /> */}

          {/* Bottom Glow */}
          {/* <div
            className="absolute bottom-[-100px] left-1/2 h-52 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-[90px] sm:h-72 sm:w-[420px] lg:h-[420px] lg:w-[650px]" /> */}

          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.12),transparent_70%)]" /> */}

          {/* Inner Border */}
          <div
            className="absolute inset-2 sm:inset-3 lg:inset-4 rounded-[20px] sm:rounded-[28px] lg:rounded-[34px] border border-gold-base/15" />

          {/* Corners */}

          <div
            className="absolute left-4 top-4 h-8 w-8 border-l border-t border-gold-base/40 sm:left-6 sm:top-6 sm:h-10 sm:w-10 lg:left-8 lg:top-8 lg:h-16 lg:w-16" />

          <div
            className="absolute right-4 top-4 h-8 w-8 border-r border-t border-gold-base/40 sm:right-6 sm:top-6 sm:h-10 sm:w-10 lg:right-8 lg:top-8 lg:h-16 lg:w-16" />

          <div
            className="absolute bottom-4 left-4 h-8 w-8 border-l border-b border-gold-base/40 sm:bottom-6 sm:left-6 sm:h-10 sm:w-10 lg:bottom-8 lg:left-8 lg:h-16 lg:w-16" />

          <div
            className="absolute bottom-4 right-4 h-8 w-8 border-r border-b border-gold-base/40 sm:bottom-6 sm:right-6 sm:h-10 sm:w-10 lg:bottom-8 lg:right-8 lg:h-16 lg:w-16" />

          <div
            className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-5 py-12 text-center sm:px-8 sm:py-16 lg:px-16 lg:py-24 xl:px-24 xl:py-28">

            <FadeIn direction="down">

              <span className="mb-6 flex items-center gap-3 sm:mb-8">

                <span className="h-px w-8 bg-gold-base/40 sm:w-12 lg:w-16" />

                <span
                  className="font-serif-heading text-[10px] uppercase tracking-[0.3em] text-gold-light sm:text-xs sm:tracking-[0.45em]">

                  Reserve Your Date

                </span>

                <span className="h-px w-8 bg-gold-base/40 sm:w-12 lg:w-16" />

              </span>

            </FadeIn>

            <h2
              className="font-serif-heading text-3xl leading-tight font-semibold uppercase text-ivory sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Begin Your Forever In Royal Elegance
            </h2>

            <FadeIn direction="up" delay={0.3}>

              <p
                className="mt-6 max-w-3xl text-sm leading-7 text-gold-light/85 sm:text-base sm:leading-8 md:text-lg lg:mt-8 lg:text-xl lg:leading-9">

                Walk through our breathtaking wedding lawns, discover elegant
                event spaces, and experience the timeless charm that transforms
                every celebration into an unforgettable memory.

              </p>

            </FadeIn>

            <FadeIn direction="up" delay={0.5}>

              <div className="mt-8 w-full sm:mt-10 lg:mt-14">

                <Button href="/book-visit" variant="secondary"
                  className="w-full sm:w-auto sm:min-w-[260px] lg:min-w-[320px]">
                  Schedule Private Walkthrough
                </Button>

              </div>

            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
}
