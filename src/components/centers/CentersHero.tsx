'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, ChevronsRight, ArrowRight, Play, X } from 'lucide-react';

interface CentersHeroProps {
  headline?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export default function CentersHero({
  description = 'GGems Sports Academy delivers structured coaching and sports development across leading schools, sports complexes and partner facilities.',
  imageUrl = '/images/centers/hero-squash-court.jpg',
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
}: CentersHeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className='relative w-full overflow-hidden border-b border-zinc-100'>
      <div className="max-w-[1680px] mx-auto min-h-[520px] md:min-h-[580px] lg:min-h-[640px] grid grid-cols-1 lg:grid-cols-12 items-stretch">

        {/* LEFT COLUMN: Breadcrumb, Typography, Actions */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center px-6 sm:px-10 lg:pl-12 lg:pr-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 z-10">

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
            <span className="text-[#63D13F] font-bold">Centers</span>
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

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[74px] xl:text-[80px] font-black uppercase tracking-tight leading-[0.92] text-zinc-950 font-heading">
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
                transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#111111]"
              >
                CENTERS
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#63D13F]"
              >
                OF EXCELLENCE
              </motion.span>
            </h1>
          </div>

          {/* 3. Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-xl mt-6 mb-8 pl-1"
          >
            {description}
          </motion.p>

          {/* 4. Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-wrap items-center gap-3.5 sm:gap-4 pl-1"
          >
            <Link
              href="#our-centers"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#63D13F]/25 hover:shadow-lg hover:shadow-[#63D13F]/35 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Our Centers</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-950 font-bold text-xs uppercase tracking-wider border border-zinc-200 transition-all duration-200 shadow-xs hover:shadow transform hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <div className="w-5 h-5 rounded-full bg-zinc-950 flex items-center justify-center text-white group-hover:bg-[#63D13F] transition-colors">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>Watch Video</span>
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Authentic Squash Court Image with Green Trajectory Arc */}
        <div className="lg:col-span-6 xl:col-span-6 relative min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={imageUrl}
              alt="GGems Squash Court Centers of Excellence"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={95}
              className="object-cover object-center select-none"
            />
            {/* Subtle soft white gradient bleed on left edge for desktop */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />

            {/* Curved Green Arc Overlay matching reference image */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none select-none"
              viewBox="0 0 700 600"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.55 }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                d="M 50,560 C 220,440 360,240 680,80"
                stroke="#63D13F"
                strokeWidth="4.5"
                strokeDasharray="14 7"
              />
            </svg>
          </motion.div>
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
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative aspect-video w-full">
                <iframe
                  src={`${videoUrl}?autoplay=1`}
                  title="GGems Sports Centers of Excellence Video"
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
