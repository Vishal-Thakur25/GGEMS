'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import VideoModal from '@/components/about/VideoModal';
import { resolveProgrammeIcon } from './IconResolver';

export interface HeroBadgeItem {
  icon: string;
  title: string;
  subtitle: string;
}

interface ProgrammeHeroProps {
  eyebrow?: string | null;
  title: string;
  heroTitle?: string | null;
  subtitle?: string | null;
  description?: string | null;
  primaryCtaText?: string | null;
  primaryCtaLink?: string | null;
  secondaryCtaText?: string | null;
  secondaryCtaLink?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  badgesData?: string | null;
}

const defaultBadges: HeroBadgeItem[] = [
  { icon: 'Users', title: 'For All Age Groups', subtitle: 'Beginner to Advanced' },
  { icon: 'Award', title: 'Professional Coaching', subtitle: 'Certified Coaches' },
  { icon: 'Layers', title: 'Individual & Group Training', subtitle: 'Flexible Batches' },
  { icon: 'Trophy', title: 'Tournament Exposure', subtitle: 'State, National & International' },
];

export default function ProgrammeHero({
  eyebrow = 'OUR PROGRAMME',
  title,
  heroTitle,
  subtitle = 'Build Skills. Develop Discipline. Compete with Confidence.',
  description = 'Our Squash Training programme is designed for all age groups, focusing on technical skills, physical fitness, mental resilience and match practice to help players reach their full potential.',
  primaryCtaText = 'Enquire Now',
  primaryCtaLink = '/contact',
  secondaryCtaText = 'Watch Video',
  secondaryCtaLink,
  imageUrl,
  videoUrl,
  badgesData,
}: ProgrammeHeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Parse hero badges
  let badges: HeroBadgeItem[] = defaultBadges;
  if (badgesData) {
    try {
      const parsed = JSON.parse(badgesData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        badges = parsed;
      }
    } catch {
      // Keep default
    }
  }

  // Format title into 2 lines with green accent and chevron >>
  const displayTitle = (heroTitle || title || 'Squash Training').trim();
  const words = displayTitle.split(/\s+/);
  const firstWord = words[0] || 'SQUASH';
  const remainingWords = words.slice(1).join(' ') || 'TRAINING';

  const effectiveVideo = videoUrl || (secondaryCtaLink?.includes('http') ? secondaryCtaLink : null);
  const effectiveImage = imageUrl || '/images/Dynamic-Squash-Court-Action.png';

  return (
    <section className="relative w-full bg-white overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text and Actions */}
          <div className="lg:col-span-6 z-10">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#63D13F] block mb-3 sm:mb-4"
            >
              {eyebrow || 'OUR PROGRAMME'}
            </motion.span>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="mb-4 sm:mb-6"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-zinc-950 font-heading tracking-tight leading-[1.02]">
                <span className="block text-zinc-950">{firstWord}</span>
                <span className="text-[#63D13F] inline-flex items-center gap-2 sm:gap-3">
                  <span className="text-[#63D13F] tracking-tighter font-black select-none opacity-90">&gt;&gt;</span>
                  <span>{remainingWords}</span>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
                className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 tracking-tight leading-snug mb-3 sm:mb-4"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28, ease: 'easeOut' }}
                className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal mb-8 sm:mb-10"
              >
                {description}
              </motion.p>
            )}

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <Link
                href={primaryCtaLink || '/contact'}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl bg-[#63D13F] hover:bg-[#45B52D] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#63D13F]/25 hover:shadow-xl hover:shadow-[#63D13F]/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{primaryCtaText || 'Enquire Now'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              {effectiveVideo ? (
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 hover:border-zinc-300 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>{secondaryCtaText || 'Watch Video'}</span>
                </button>
              ) : secondaryCtaLink ? (
                <Link
                  href={secondaryCtaLink}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 hover:border-zinc-300 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>{secondaryCtaText || 'Watch Video'}</span>
                </Link>
              ) : null}
            </motion.div>
          </div>

          {/* Right Column: Hero Cutout & Overlaid Badges Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            
            {/* Green Graphic Angular Accent (Geometric polygon behind athlete from reference) */}
            <div
              className="absolute -top-10 right-0 sm:right-6 w-72 sm:w-96 lg:w-[480px] h-72 sm:h-96 lg:h-[480px] bg-gradient-to-br from-[#63D13F]/20 via-[#63D13F]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
              aria-hidden="true"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-12 w-64 h-64 bg-[#63D13F]/15 rotate-45 rounded-3xl blur-2xl pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Athlete Action Media Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-[500px] lg:max-w-none aspect-[4/3] sm:aspect-[16/11] lg:aspect-[1.15/1] rounded-3xl overflow-hidden bg-gradient-to-tr from-zinc-100 via-zinc-50 to-white shadow-xl border border-zinc-100"
            >
              <Image
                src={effectiveImage}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40 pointer-events-none" />

              {/* Overlaid Floating Badges Card (Exactly as in Reference) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 w-[220px] sm:w-[250px] bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/60 divide-y divide-zinc-100"
              >
                {badges.slice(0, 4).map((badge, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 ${idx === 0 ? 'pb-2.5 sm:pb-3' : idx === badges.length - 1 ? 'pt-2.5 sm:pt-3' : 'py-2.5 sm:py-3'}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#EEF8EA] text-[#45B52D] flex items-center justify-center shrink-0">
                      {resolveProgrammeIcon(badge.icon, 'w-4 h-4')}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-[13px] font-bold text-zinc-950 truncate leading-tight">
                        {badge.title}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-zinc-500 font-normal truncate mt-0.5">
                        {badge.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Video Modal if applicable */}
      {effectiveVideo && (
        <VideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl={effectiveVideo}
          title={`${title} - Video Tour`}
        />
      )}
    </section>
  );
}
