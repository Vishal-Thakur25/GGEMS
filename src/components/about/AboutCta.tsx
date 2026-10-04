'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Users, School, Building2, Star, Trophy, Target } from 'lucide-react';

export interface AudienceItem {
  icon?: string;
  label: string;
}

interface AboutCtaProps {
  subtitle?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  callPhone?: string;
  imageUrl?: string;
  audiences?: AudienceItem[];
}

export default function AboutCta({
  subtitle = 'Be Part of Our Journey',
  title = "Let's Build a Stronger Sports Community",
  description = 'Join GGems Sports Academy and take the first step toward a healthier, stronger and brighter future.',
  ctaText = 'Enquire Now',
  ctaUrl = '/contact',
  callPhone = '8826433044',
  imageUrl = '/images/about/cta-squash-racket-ball.jpg',
  audiences,
}: AboutCtaProps) {
  const defaultAudiences: AudienceItem[] = [
    { icon: 'graduation', label: 'For Students' },
    { icon: 'users', label: 'For Parents' },
    { icon: 'school', label: 'For Schools' },
    { icon: 'building', label: 'For Institutions' },
  ];

  const activeAudiences = audiences && audiences.length > 0 ? audiences : defaultAudiences;

  const getAudienceIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'graduation':
        return GraduationCap;
      case 'school':
        return School;
      case 'building':
        return Building2;
      case 'star':
        return Star;
      case 'trophy':
        return Trophy;
      case 'target':
        return Target;
      case 'users':
      default:
        return Users;
    }
  };

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-[#0D1115] text-white overflow-hidden border-t border-white/10">
      {/* Cinematic Squash Racket & Ball Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="GGems Squash Court Atmosphere"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 select-none pointer-events-none"
        />
        {/* Dark Vignette & Gradient Overlays */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0D1115] via-[#0D1115]/85 to-[#0D1115]/75" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1115] via-transparent to-[#0D1115]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center justify-between">
          {/* Left Column: Eyebrow, Giant Headline, Paragraph, Enquire Now Button */}
          <div className="lg:col-span-8 flex flex-col items-start max-w-2xl">
            {/* Green Sub-label */}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-semibold text-[#6CD34A] tracking-wider uppercase mb-3 block font-heading"
            >
              {subtitle}
            </motion.span>

            {/* Giant Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.05] mb-5 font-heading"
            >
              {title}
            </motion.h2>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-normal max-w-xl mb-8"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href={ctaUrl}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#6CD34A] hover:bg-[#4CAF35] text-white font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-xl shadow-[#6CD34A]/25 hover:shadow-2xl hover:shadow-[#6CD34A]/35 group"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {callPhone && (
                <a
                  href={`tel:${callPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors border border-white/10"
                >
                  <span>Call {callPhone}</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Column: Audience Category Badges */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 sm:gap-4 w-full">
            {activeAudiences.map((item, idx) => {
              const Icon = getAudienceIcon(item.icon);
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#6CD34A]/50 hover:bg-white/[0.08] transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#6CD34A] shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-sm font-bold text-white tracking-wide font-heading">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
