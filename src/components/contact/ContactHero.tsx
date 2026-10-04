'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChevronRight, ChevronsRight, ArrowRight, Phone } from 'lucide-react';

interface ContactHeroProps {
  phone?: string;
  athleteImageUrl?: string;
  courtBgUrl?: string;
}

export default function ContactHero({
  phone = '8826433044',
  athleteImageUrl = '/images/about/hero-athlete-ribbon.png',
  courtBgUrl = '/images/centers/hero-squash-court.jpg',
}: ContactHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-zinc-100 min-h-[520px] md:min-h-[580px] lg:min-h-[640px] flex items-center">
      
      {/* Background Court Scene */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Soft Squash Court Backdrop Image */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src={courtBgUrl}
            alt="Squash Court Atmosphere"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-right select-none"
          />
        </div>

        {/* Soft white gradient from left to ensure perfect typography legibility */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white via-white/95 via-42% md:via-white/85 md:via-50% to-transparent" />
        <div className="block md:hidden absolute inset-0 bg-white/90" />

        {/* Dynamic Curved GGEMS Green Speed Graphic Trail */}
        <svg
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
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1680px] mx-auto w-full px-6 sm:px-10 lg:pl-12 lg:pr-8 py-12 sm:py-16 lg:py-20">
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
              <span className="text-[#63D13F] font-bold">Contact</span>
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

              {/* GET IN / TOUCH */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-black uppercase tracking-tight leading-[0.92] text-zinc-950 font-heading select-none">
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#111111]"
                >
                  GET IN
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#63D13F]"
                >
                  TOUCH
                </motion.span>
              </h1>
            </div>

            {/* 3. Subheading: We're Here to Help */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="mt-4 pl-1 text-base sm:text-lg font-bold text-[#63D13F] tracking-tight font-heading"
            >
              We&apos;re Here to Help
            </motion.div>

            {/* 4. Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed max-w-xl mt-3 mb-8 pl-1"
            >
              Have a question about our programmes, admissions, partnerships or any other information? Our team is always ready to assist you.
            </motion.p>

            {/* 5. Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 pl-1"
            >
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#63D13F]/25 hover:shadow-lg hover:shadow-[#63D13F]/35 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-950 font-bold text-xs uppercase tracking-wider border border-zinc-200 transition-all duration-200 shadow-xs hover:shadow transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-zinc-900 stroke-[2.2]" />
                <span>Call Now</span>
              </a>
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
              <Image
                src={athleteImageUrl}
                alt="GGems Squash Player"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={95}
                className="object-contain object-center drop-shadow-md select-none"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
