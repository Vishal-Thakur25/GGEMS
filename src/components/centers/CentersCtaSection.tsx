'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, GraduationCap, Users, School, Building2, ChevronRight } from 'lucide-react';

interface CentersCtaProps {
  eyebrow?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  phone?: string;
  imageUrl?: string;
}

const audienceLinks = [
  { label: 'For Students', href: '/programs', icon: GraduationCap },
  { label: 'For Parents', href: '/contact', icon: Users },
  { label: 'For Schools', href: '/school-partnership', icon: School },
  { label: 'For Institutions', href: '/school-partnership', icon: Building2 },
];

export default function CentersCtaSection({
  eyebrow = 'Be Part of a Stronger Sporting Community',
  description = 'Join GGems Sports Academy and take the first step towards a healthier, stronger and brighter future.',
  ctaText = 'Enquire Now',
  ctaUrl = '/contact',
  phone = '8826433044',
  imageUrl = '/images/about/cta-squash-racket-ball.jpg',
}: CentersCtaProps) {
  return (
    <section className="relative w-full bg-[#0a0d10] text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-t border-zinc-800">
      {/* Background Squash Racket & Ball Action Image with Cinematic Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="GGems Squash Equipment and Training"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d10] via-[#0a0d10]/90 to-[#0a0d10]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center justify-between">
          
          {/* LEFT: Eyebrow, Giant Heading, Description, Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col items-start max-w-2xl"
          >
            {/* Green Eyebrow */}
            <span className="text-xs sm:text-sm font-semibold text-[#63D13F] tracking-wide mb-3 block font-heading">
              {eyebrow}
            </span>

            {/* Giant Stacked Heading: Train. Compete. Excel. */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-black text-white tracking-tight leading-[0.98] mb-5 font-heading">
              Train. Compete.{' '}
              <span className="text-[#63D13F] block sm:inline">Excel.</span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed max-w-lg mb-8">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                href={ctaUrl}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#63D13F]/25 hover:shadow-xl hover:shadow-[#63D13F]/35 transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#181818]/90 hover:bg-[#222222] text-white font-bold text-xs uppercase tracking-wider border border-white/15 transition-all duration-200 shadow-sm hover:border-white/30 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="w-4 h-4 text-white stroke-[2.2]" />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT: 4 Audience Category Rows */}
          <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-3.5 w-full">
            {audienceLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#63D13F]/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-[#63D13F] group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4 stroke-[2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white tracking-wide font-heading">
                        {item.label}
                      </span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#63D13F] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
