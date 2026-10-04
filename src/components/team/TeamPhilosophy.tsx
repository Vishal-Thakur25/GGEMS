'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, ArrowRight } from 'lucide-react';

interface TeamPhilosophyProps {
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  bgImageUrl?: string;
}

const philosophyCards = [
  {
    icon: Target,
    title1: 'Focus on',
    title2: 'Excellence',
    description: 'We help athletes unlock their potential through structured training and continuous improvement.',
  },
  {
    icon: Users,
    title1: 'Team',
    title2: 'Collaboration',
    description: 'A supportive and motivating environment that encourages teamwork and growth.',
  },
  {
    icon: TrendingUp,
    title1: 'Long-Term',
    title2: 'Development',
    description: 'Nurturing athletes for state, national and international level competitions.',
  },
];

export default function TeamPhilosophy({
  subtitle = 'OUR PHILOSOPHY',
  description = 'Our team believes in holistic athlete development — combining technical excellence, physical fitness, mental resilience and strong values on and off the court.',
  ctaText = 'Our Approach',
  ctaUrl = '/about',
  bgImageUrl = '/images/about/cta-squash-racket-ball.jpg',
}: TeamPhilosophyProps) {
  return (
    <section className="relative w-full bg-[#111111] text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-y border-zinc-800/80">
      
      {/* Background Racket Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none select-none">
        <Image
          src={bgImageUrl}
          alt="Squash Philosophy Atmosphere"
          fill
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT: Heading, Description, CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <span className="text-xs font-bold text-[#63D13F] tracking-[0.2em] uppercase mb-3 font-heading">
              {subtitle}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.06] mb-5 font-heading">
              More Than <span className="text-[#63D13F]">Just Coaching</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-md mb-8">
              {description}
            </p>

            <Link
              href={ctaUrl}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#63D13F]/20 hover:shadow-lg hover:shadow-[#63D13F]/30 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </motion.div>

          {/* RIGHT: 3 Dark Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {philosophyCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title1 + card.title2}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#181818] border border-white/[0.08] hover:border-[#63D13F]/40 rounded-2xl p-6 flex flex-col items-start text-left transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Green Icon inside square */}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-[#63D13F] mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight font-heading leading-tight mb-2.5">
                    <span className="block">{card.title1}</span>
                    <span className="block">{card.title2}</span>
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 font-normal leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
