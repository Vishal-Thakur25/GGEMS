'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Download, ChevronRight } from 'lucide-react';
import { CenterItem } from '../types';

interface CenterDetailHeroProps {
  center: CenterItem;
}

export default function CenterDetailHero({ center }: CenterDetailHeroProps) {
  // Format two-tone title: split into two parts so first part is black, second is GGems green (#63D13F)
  const nameParts = center.name.trim().split(' ');
  let line1 = center.name;
  let line2 = '';

  if (nameParts.length >= 3) {
    // If e.g. "Jaypee Public School & Club" -> "JAYPEE PUBLIC" & "SCHOOL & CLUB"
    const splitIndex = Math.ceil(nameParts.length / 2);
    line1 = nameParts.slice(0, splitIndex).join(' ');
    line2 = nameParts.slice(splitIndex).join(' ');
  } else if (nameParts.length === 2) {
    line1 = nameParts[0];
    line2 = nameParts[1];
  }

  const category = center.category || 'SCHOOL PARTNER';
  const locationText =
    center.location || `${center.city}${center.state ? `, ${center.state}` : ''}`;
  const shortDesc =
    center.shortDescription ||
    'A leading educational institution committed to holistic development, with excellent sports facilities and a strong focus on student growth.';
  const heroImg =
    center.heroImage || center.image || '/images/centers/center-jaypee.jpg';

  return (
    <section className="w-full bg-white pt-6 pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 01. Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-zinc-500 font-medium mb-8 sm:mb-10 flex-wrap"
        >
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 stroke-[2]" />
          <Link href="/school-partnership" className="hover:text-black transition-colors">
            School Partnership
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 stroke-[2]" />
          <span className="text-[#63D13F] font-semibold">{center.name}</span>
        </motion.nav>

        {/* 02. Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow, Title, Location, Description, CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <span className="text-xs sm:text-sm font-bold text-[#63D13F] tracking-widest uppercase mb-3 block font-heading">
              {category}
            </span>

            {/* Main Heading (Editorial Two-Tone) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.08] uppercase font-heading mb-4">
              <span className="text-zinc-950 block">{line1}</span>
              {line2 && <span className="text-[#63D13F] block">{line2}</span>}
            </h1>

            {/* Location Row */}
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 mb-5">
              <div className="w-5 h-5 rounded-full bg-[#63D13F]/15 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#45B52D]" />
              </div>
              <span>{locationText}</span>
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed mb-8 max-w-xl font-normal">
              {shortDesc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#partner-cta"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Enquire About Partnership</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </Link>

              {center.brochureUrl ? (
                <a
                  href={center.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:border-zinc-400"
                >
                  <Download className="w-4 h-4 text-zinc-700" />
                  <span>Download Brochure</span>
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:border-zinc-400"
                >
                  <Download className="w-4 h-4 text-zinc-700" />
                  <span>Download Brochure</span>
                </Link>
              )}
            </div>
          </motion.div>

          {/* Right Column: Hero Image with Diagonal Green Accent Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Dynamic Green Diagonal Accent Ribbon matching reference */}
            <div
              className="absolute -top-12 -right-8 w-44 sm:w-64 h-64 sm:h-80 bg-gradient-to-br from-[#63D13F] to-[#45B52D] opacity-90 -skew-x-12 rounded-3xl -z-10 blur-[1px] transform rotate-12 pointer-events-none"
              aria-hidden="true"
            />

            {/* Image Container with Soft Shadow and Rounded Corners */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/90 shadow-2xl bg-zinc-100">
              <Image
                src={heroImg}
                alt={center.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center transition-transform duration-700 hover:scale-103"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
