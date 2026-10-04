'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChevronRight, ChevronsRight, ArrowRight, Play } from 'lucide-react';
import VideoModal from '@/components/about/VideoModal';

interface AboutHeroProps {
  headline?: string;
  subHeadline?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
}

export default function AboutHero({
  headline = 'ABOUT GGEMS',
  subHeadline = 'Building Stronger Athletes for a Brighter Tomorrow',
  description = 'At GGems Sports Academy, we are committed to developing well-rounded athletes through world-class coaching, structured programmes and a nurturing environment.',
  imageUrl = '/images/Dynamic-Squash-Court-Action.png',
  videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  ctaLabel = 'Enquire Now',
  ctaUrl = '/contact',
}: AboutHeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Split headline into "ABOUT" and "GGEMS"
  const parts = headline.split(' ');
  const firstWord = parts[0] || 'ABOUT';
  const restWords = parts.slice(1).join(' ') || 'GGEMS';

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
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 via-40% to-transparent max-w-3xl pointer-events-none" />
        </div>

        {/* Mobile View Background Image */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/images/Dynamic_Squash_Court_Action_Poster_mobile-view.png"
            alt="GGems Squash Court Athlete Mobile View"
            fill
            priority
            sizes="100vw"
            quality={95}
            className="object-cover object-bottom select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 via-45% to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Breadcrumb, Speed line with chevrons, Headlines, Buttons, Dot Matrix */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-xl">
            {/* Breadcrumb: Home Icon + Home > About Us in Brand Green */}
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
              <span className="text-[#4CAF35] font-bold">About Us</span>
            </motion.nav>

            {/* Headline Container with Left Vertical Green Speed Line and Double Chevrons » */}
            <div className="relative pl-6 sm:pl-7">
              {/* Left Speed Line Motif: Thin Line + » + Thin Line */}
              <div className="absolute left-0 top-1 bottom-2 flex flex-col items-center select-none pointer-events-none">
                <div className="w-[2px] flex-1 bg-[#4CAF35]/35" />
                <div className="my-1.5 text-[#4CAF35]">
                  <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3.5]" />
                </div>
                <div className="w-[2px] flex-1 bg-[#4CAF35]/35" />
              </div>

              {/* Big Stacked Headline: ABOUT (black) / GGEMS (green) */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[84px] font-black uppercase tracking-tight leading-[0.92] text-zinc-950 font-heading select-none">
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
                  className="block text-[#4CAF35]"
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
              className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-950 tracking-tight leading-tight mt-4 mb-2.5 font-heading"
            >
              {subHeadline}
            </motion.h2>

            {/* Description Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal max-w-md mb-7"
            >
              {description}
            </motion.p>

            {/* Two Side-by-Side Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-wrap items-center gap-3.5 mb-6"
            >
              {/* Button 1: Enquire Now → (Vibrant Green rounded-lg) */}
              <Link
                href={ctaUrl || '/contact'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4CAF35] hover:bg-[#3E9228] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md shadow-[#4CAF35]/25 hover:shadow-lg active:scale-[0.98] group"
              >
                <span>{ctaLabel || 'Enquire Now'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* Button 2: Watch Our Story (White rounded-lg with black circle play icon) */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-sm hover:border-zinc-300 active:scale-[0.98] group"
              >
                <div className="w-5 h-5 rounded-full bg-zinc-950 text-white flex items-center justify-center group-hover:bg-[#4CAF35] transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </motion.div>

            {/* Left Decorative Green Dot Matrix (6 cols x 4 rows) */}
            <div className="grid grid-cols-6 gap-2.5 select-none pointer-events-none pt-1">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#4CAF35]/35"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Component */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
        title="GGems Sports Academy Story"
      />
    </section>
  );
}
