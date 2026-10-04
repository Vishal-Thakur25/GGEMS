'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, ChevronsRight, ArrowRight, Play, X } from 'lucide-react';

interface ProgramHeroProps {
  headline?: string;
  subHeadline?: string;
  description?: string;
  imageUrl?: string;
}

export default function ProgramHero({
  headline = 'OUR PROGRAMMES',
  subHeadline = 'Structured Training. Stronger Athletes. Brighter Futures.',
  description = 'At GGems Sports Academy, we offer comprehensive sports training programmes designed for all age groups and skill levels. Our goal is to develop well-rounded athletes through expert coaching, modern facilities and a structured curriculum.',
  imageUrl = '/images/Dynamic-Squash-Court-Action.png',
}: ProgramHeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Split headline into "OUR" and "PROGRAMMES"
  const parts = headline.split(' ');
  const firstWord = parts[0] || 'OUR';
  const restWords = parts.slice(1).join(' ') || 'PROGRAMMES';

  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-zinc-200 pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 lg:pb-20 min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-center">
      {/* Background Court Action Image */}
      <div className="absolute inset-0 z-0">
        {/* Desktop / Tablet Background Image */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={imageUrl}
            alt="GGems Squash Court Athlete in Action"
            fill
            priority
            sizes="100vw"
            quality={95}
            className="object-cover object-right select-none pointer-events-none"
          />
          {/* Left subtle soft white gradient to ensure maximum text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-42% to-transparent max-w-4xl pointer-events-none" />
        </div>

        {/* Mobile View Background Image */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/images/Dynamic_Squash_Court_Action_Poster_mobile-view.png"
            alt="GGems Squash Athlete Mobile View"
            fill
            priority
            sizes="100vw"
            quality={95}
            className="object-cover object-bottom select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 via-48% to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Breadcrumb, Speed line with chevrons, Headlines, Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
            {/* Breadcrumb: Home Icon + Home > Programmes in Brand Green */}
            <motion.nav
              aria-label="Breadcrumb"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-600 mb-5 sm:mb-6 select-none"
            >
              <Home className="w-3.5 h-3.5 text-zinc-500 stroke-[2.2]" />
              <Link href="/" className="hover:text-zinc-950 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-zinc-400 stroke-[2]" />
              <span className="text-[#63D13F] font-bold">Programmes</span>
            </motion.nav>

            {/* Headline Container with Left Vertical Green Speed Line and Double Chevrons » */}
            <div className="relative pl-6 sm:pl-7">
              {/* Left Speed Line Motif: Thin Line + » + Thin Line */}
              <div className="absolute left-0 top-1 bottom-2 flex flex-col items-center select-none pointer-events-none">
                <div className="w-[2px] flex-1 bg-[#63D13F]/35" />
                <div className="my-1.5 text-[#63D13F]">
                  <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3.5]" />
                </div>
                <div className="w-[2px] flex-1 bg-[#63D13F]/35" />
              </div>

              {/* Big Stacked Headline: OUR (black) / PROGRAMMES (green) */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] font-black uppercase tracking-tight leading-[0.92] text-zinc-950 font-heading select-none">
                <motion.span
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#111111]"
                >
                  {firstWord}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#63D13F]"
                >
                  {restWords}
                </motion.span>
              </h1>
            </div>

            {/* Sub-headline directly underneath */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-950 tracking-tight leading-snug mt-5 mb-3 font-heading"
            >
              {subHeadline}
            </motion.h2>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="text-sm sm:text-base text-zinc-700 font-normal leading-relaxed max-w-xl mb-7"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#63D13F]/25 hover:shadow-lg hover:shadow-[#63D13F]/35 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-zinc-50 text-zinc-950 font-bold text-xs uppercase tracking-wider border border-zinc-300 transition-all duration-200 shadow-sm hover:shadow transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <div className="w-5 h-5 rounded-full bg-zinc-950 flex items-center justify-center text-white group-hover:bg-[#63D13F] transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column Spacer for Desktop to let athlete shine */}
          <div className="hidden lg:block lg:col-span-5 h-[400px] pointer-events-none select-none" />
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
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
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="GGems Sports Academy Programmes Video"
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
