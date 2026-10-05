'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, ChevronsRight, ArrowRight, Play, X } from 'lucide-react';

interface TeamHeroProps {
  headline?: string;
  subheadlineLines?: string[];
  description?: string;
  athleteImageUrl?: string;
  courtBgUrl?: string;
  videoUrl?: string;
}

export default function TeamHero({
  subheadlineLines = ['Passionate Coaches.', 'Stronger Athletes.', 'Brighter Futures.'],
  description = 'Our team brings together experienced coaches, former athletes and certified professionals dedicated to developing the next generation of champions.',
  athleteImageUrl = '/images/about/hero-athlete-ribbon.png',
  courtBgUrl = '/images/centers/hero-squash-court.jpg',
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
}: TeamHeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-zinc-100 min-h-[540px] md:min-h-[600px] lg:min-h-[660px] flex items-center">

      {/* Background Court Scene */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Soft Squash Court Backdrop Image */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src={courtBgUrl}
            alt="Squash Court Environment"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-right select-none"
          />
        </div>

        {/* Soft white gradient from left to ensure perfect typography legibility */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white via-white/95 via-42% md:via-white/85 md:via-50% to-transparent" />
        {/* <div className="block md:hidden absolute inset-0 bg-white/90" /> */}

        {/* Dynamic Curved GGEMS Green Speed Graphic Trail */}
        {/* <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.65 }}
            transition={{ duration: 1.3, delay: 0.35, ease: 'easeOut' }}
            d="M 380,540 C 600,430 820,230 1160,80"
            stroke="#63D13F"
            strokeWidth="5"
            strokeDasharray="16 8"
          />
        </svg> */}
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1680px] mx-auto w-full px-6 sm:px-10 lg:pl-12 lg:pr-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">

          {/* LEFT COLUMN: Breadcrumb, Typography, Actions */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">

            {/* 1. Breadcrumb */}
            <motion.nav
              aria-label="Breadcrumb"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6 select-none"
            >
              <Home className="w-3.5 h-3.5 text-zinc-400 stroke-[2.2]" />
              <Link href="/" className="hover:text-zinc-900 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-zinc-400 stroke-[2.2]" />
              <span className="text-[#63D13F] font-bold">Team</span>
            </motion.nav>

            {/* 2. Main Heading with Left Speed Line Indicator */}
            <div className="relative pl-6 sm:pl-7">
              {/* Speed motif: Thin line + >> + Thin line */}
              <div className="absolute left-0 top-1 bottom-3 flex flex-col items-center select-none pointer-events-none">
                <div className="w-[2px] flex-1 bg-[#63D13F]/30" />
                <div className="my-1.5 text-[#63D13F]">
                  <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3.5]" />
                </div>
                <div className="w-[2px] flex-1 bg-[#63D13F]/30" />
              </div>

              {/* OUR / TEAM */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-black uppercase tracking-tight leading-[0.92] text-zinc-950 font-heading select-none">
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#111111]"
                >
                  OUR
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#63D13F]"
                >
                  TEAM
                </motion.span>
              </h1>
            </div>

            {/* 3. Supporting Heading: 3 lines */}
            <div className="mt-5 pl-1">
              {subheadlineLines.map((line, idx) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                  className="text-base sm:text-lg font-black text-zinc-900 tracking-tight font-heading leading-tight"
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* 4. Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed max-w-xl mt-4 mb-8 pl-1"
            >
              {description}
            </motion.p>

            {/* 5. Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 pl-1"
            >
              <Link
                href="#core-team"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#63D13F]/25 hover:shadow-lg hover:shadow-[#63D13F]/35 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Meet Our Team</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-950 font-bold text-xs uppercase tracking-wider border border-zinc-200 transition-all duration-200 shadow-xs hover:shadow transform hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-zinc-950 flex items-center justify-center text-white group-hover:bg-[#63D13F] transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Our Coaching Culture</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Authentic Squash Athlete Image with Ribbon */}
          <div className="lg:col-span-5 xl:col-span-6 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] flex items-center justify-center select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-[620px] aspect-[4/3] flex items-center justify-center"
            >
              {/* <Image
                src={athleteImageUrl}
                alt="GGems Squash Athlete in Action"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={95}
                className="object-contain object-center drop-shadow-md select-none"
              /> */}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative aspect-video w-full">
                <iframe
                  src={`${videoUrl}?autoplay=1`}
                  title="GGems Coaching Culture"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
