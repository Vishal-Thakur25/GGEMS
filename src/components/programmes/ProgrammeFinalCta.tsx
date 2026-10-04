'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, ChevronRight } from 'lucide-react';
import { resolveProgrammeIcon } from './IconResolver';

export interface CtaAudienceLink {
  label: string;
  link: string;
  icon?: string;
}

interface ProgrammeFinalCtaProps {
  label?: string | null;
  title?: string | null;
  description?: string | null;
  backgroundImage?: string | null;
  primaryText?: string | null;
  primaryLink?: string | null;
  secondaryText?: string | null;
  secondaryLink?: string | null;
  audienceLinksData?: string | null;
}

const defaultAudienceLinks: CtaAudienceLink[] = [
  { label: 'For Students', link: '/contact?type=student', icon: 'GraduationCap' },
  { label: 'For Parents', link: '/contact?type=parent', icon: 'Users' },
  { label: 'For Schools', link: '/school-partnership', icon: 'Building' },
  { label: 'For Institutions', link: '/contact?type=institution', icon: 'Landmark' },
];

export default function ProgrammeFinalCta({
  label = 'READY TO START?',
  title = 'Take Your Game to the Next Level',
  description = 'Join our Squash Training programme and be part of a professional and supportive sporting community.',
  backgroundImage,
  primaryText = 'Enquire Now',
  primaryLink = '/contact',
  secondaryText = 'Call Now',
  secondaryLink = 'tel:8826433044',
  audienceLinksData,
}: ProgrammeFinalCtaProps) {
  let audienceLinks: CtaAudienceLink[] = defaultAudienceLinks;
  if (audienceLinksData) {
    try {
      const parsed = JSON.parse(audienceLinksData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        audienceLinks = parsed;
      }
    } catch {
      // Keep defaults
    }
  }

  // Format title: "Take Your Game to the Next Level" -> "Take Your Game to the " in white, "Next Level" in green
  const displayTitle = (title || 'Take Your Game to the Next Level').trim();
  let whiteHeading = displayTitle;
  let greenHeading = '';

  const lower = displayTitle.toLowerCase();
  if (lower.includes('next level')) {
    const splitIndex = lower.indexOf('next level');
    whiteHeading = displayTitle.substring(0, splitIndex);
    greenHeading = displayTitle.substring(splitIndex);
  } else {
    const parts = displayTitle.split(/\s+/);
    if (parts.length > 2) {
      whiteHeading = parts.slice(0, -2).join(' ') + ' ';
      greenHeading = parts.slice(-2).join(' ');
    }
  }

  const effectiveBg = backgroundImage || '/images/about/cta-squash-racket-ball.jpg';

  return (
    <section className="relative w-full bg-[#0A0D10] text-white py-20 sm:py-28 overflow-hidden">
      {/* Background Photography with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={effectiveBg}
          alt="CTA background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, description, and buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#63D13F] block mb-3 sm:mb-4">
              {label || 'READY TO START?'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight font-heading leading-[1.05] mb-5">
              <span>{whiteHeading}</span>
              {greenHeading && <span className="text-[#63D13F]">{greenHeading}</span>}
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal mb-8 sm:mb-10">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                href={primaryLink || '/contact'}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#63D13F] hover:bg-[#45B52D] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#63D13F]/30 hover:shadow-xl transition-all duration-200"
              >
                <span>{primaryText || 'Enquire Now'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <a
                href={secondaryLink || 'tel:8826433044'}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/30 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 backdrop-blur-sm"
              >
                <Phone className="w-4 h-4 text-[#63D13F]" />
                <span>{secondaryText || 'Call Now'}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Audience Links Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl divide-y divide-white/10">
              {audienceLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className={`flex items-center justify-between group transition-colors duration-200 ${
                    idx === 0 ? 'pb-4 sm:pb-5' : idx === audienceLinks.length - 1 ? 'pt-4 sm:pt-5' : 'py-4 sm:py-5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-[#63D13F] flex items-center justify-center group-hover:bg-[#63D13F] group-hover:text-white transition-colors duration-200">
                      {resolveProgrammeIcon(item.icon, 'w-5 h-5')}
                    </div>
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#63D13F] transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
