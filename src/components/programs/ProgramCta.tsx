'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall, GraduationCap, Users, School, Building2, ChevronRight } from 'lucide-react';

interface ProgramCtaProps {
  subtitle?: string;
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  callPhone?: string;
  imageUrl?: string;
}

export default function ProgramCta({
  subtitle = 'Be Part of Our Journey',
  headline = 'Train. Compete. Excel.',
  description = 'Join GGems Sports Academy and take the first step towards a healthier, stronger and brighter future.',
  ctaText = 'Enquire Now',
  ctaUrl = '/contact',
  callPhone = '8826433044',
  imageUrl = '/images/about/cta-squash-racket-ball.jpg',
}: ProgramCtaProps) {
  const audienceList = [
    { icon: GraduationCap, label: 'For Students', url: '/contact?type=student' },
    { icon: Users, label: 'For Parents', url: '/contact?type=parent' },
    { icon: School, label: 'For Schools', url: '/school-partnership' },
    { icon: Building2, label: 'For Institutions', url: '/contact?type=institution' },
  ];

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-[#0D1115] text-white overflow-hidden border-t border-zinc-800">
      {/* Cinematic Squash Racket & Ball Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="GGems Sports Atmosphere"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1115] via-transparent to-[#0D1115]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center justify-between">
          {/* Left Column: Eyebrow, Stacked Headline, Paragraph, Enquire & Call Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-xl">
            {/* Green Sub-label */}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs sm:text-sm font-extrabold text-[#63D13F] tracking-widest uppercase mb-3 block font-mono"
            >
              {subtitle}
            </motion.span>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight leading-[1.04] mb-5 font-heading"
            >
              Train. Compete.{' '}
              <span className="text-[#63D13F]">Excel.</span>
            </motion.h2>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal max-w-lg mb-8"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              <Link
                href={ctaUrl}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#63D13F]/25 hover:shadow-2xl hover:shadow-[#63D13F]/35 transform hover:-translate-y-0.5"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              {callPhone && (
                <a
                  href={`tel:${callPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-white/15 backdrop-blur-xs transform hover:-translate-y-0.5"
                >
                  <PhoneCall className="w-4 h-4 text-[#63D13F]" />
                  <span>Call Now</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Column: 4 Audience Category Link Badges */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 w-full">
            {audienceList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.08 * idx }}
                >
                  <Link
                    href={item.url}
                    className="flex items-center justify-between px-6 py-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#63D13F]/60 hover:bg-white/[0.08] transition-all duration-200 group shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#63D13F]/15 border border-[#63D13F]/30 flex items-center justify-center text-[#63D13F] shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-white tracking-wide font-heading">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#63D13F] group-hover:translate-x-1 transition-all" />
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
