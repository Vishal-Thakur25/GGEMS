'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export interface GgemsVerticalItem {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description?: string | null;
  image: string;
  mobileImage?: string | null;
  icon?: string | null;
  accentText?: string | null;
  link?: string | null;
  ctaText?: string | null;
  displayOrder?: number;
  published?: boolean;
}

interface EcosystemSectionProps {
  verticals?: GgemsVerticalItem[];
}

const defaultVerticals: GgemsVerticalItem[] = [
  {
    id: 'v1',
    title: 'GGems Sports',
    slug: 'ggems-sports',
    subtitle: 'Sports Development & Management',
    description:
      'Pioneering structured athlete development pathways, grassroot youth training, institutional partnerships, and competitive tournament management.',
    image: '/images/programs/sport-athletics.jpg',
    accentText: 'DEVELOPMENT & MANAGEMENT',
    link: '/programs',
    ctaText: 'Explore Sports',
    displayOrder: 1,
  },
  {
    id: 'v2',
    title: 'GGems Sports Infrastructure',
    slug: 'ggems-sports-infrastructure',
    subtitle: 'Sports Infrastructure & Facility Development',
    description:
      'Designing and executing international-standard sports courts, glass-back squash arenas, high-performance wooden flooring, and elite training facilities.',
    image: '/images/about/story-squash-court.jpg',
    accentText: 'FACILITY DEVELOPMENT',
    link: '/centers',
    ctaText: 'Discover Facilities',
    displayOrder: 2,
  },
  {
    id: 'v3',
    title: 'GGems Squash Centre of Excellence',
    slug: 'ggems-squash-centre-of-excellence',
    subtitle: 'High Performance | Player Development | Coaching | Competition',
    description:
      'The premier squash coaching hub in Delhi NCR. Home to national top-rankers, certified international coaches, and structured high-performance clinics.',
    image: '/images/Dynamic-Squash-Court-Action.png',
    accentText: 'CENTRE OF EXCELLENCE',
    link: '/programmes/squash-training',
    ctaText: 'Join the Academy',
    displayOrder: 3,
  },
];

export default function EcosystemSection({ verticals }: EcosystemSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const items = verticals && verticals.length > 0 ? verticals : defaultVerticals;

  const stepStagger = 0.18;

  // Header animation variants
  const headerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  // Card animation variants
  const cardVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 40,
    },
    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        delay: shouldReduceMotion ? 0 : idx * stepStagger,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  // Image clip-path reveal variants
  const imageRevealVariants: Variants = {
    hidden: {
      clipPath: shouldReduceMotion ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
    },
    visible: (idx: number) => ({
      clipPath: 'inset(0% 0 0 0)',
      transition: {
        duration: shouldReduceMotion ? 0 : 0.85,
        delay: shouldReduceMotion ? 0 : idx * stepStagger + 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  // Number badge variants
  const numberVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.8,
    },
    visible: (idx: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : idx * stepStagger + 0.15,
        ease: 'easeOut' as const,
      },
    }),
  };


  return (
    <section
      id="ecosystem"
      className="w-full bg-[#F7FAF5] py-24 sm:py-32 border-b border-zinc-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={headerVariants}
          className="max-w-3xl mb-14 sm:mb-18 text-left"
        >
          {/* Eyebrow */}
          <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#63D13F] block mb-3">
            THE GGEMS ECOSYSTEM
          </span>

          {/* Large Editorial Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.04] font-display mb-5">
            <span className="text-zinc-950">MORE THAN </span>
            <span className="text-[#63D13F]">JUST SPORTS.</span>
          </h2>

          {/* Description */}
          <p className="text-zinc-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-2xl">
            From sports development to world-class infrastructure and high-performance athlete
            development, GGEMS brings the complete sports ecosystem together.
          </p>
        </motion.div>

        {/* 3 Large Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {items.map((item, idx) => {
            const stepNumber = `0${idx + 1}`;
            const targetHref = item.link || `/programs`;

            return (
              <motion.div
                key={item.id || idx}
                custom={idx}
                variants={cardVariants}
                className="group relative h-[480px] sm:h-[540px] lg:h-[620px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-7 sm:p-9 border border-zinc-200/90 hover:border-[#63D13F]/60 cursor-pointer"
              >
                {/* Full-bleed Background Image with Reveal Animation */}
                <motion.div
                  custom={idx}
                  variants={imageRevealVariants}
                  className="absolute inset-0 w-full h-full overflow-hidden bg-zinc-950"
                >
                  {/* Responsive Image (Desktop / Mobile) */}
                  <picture className="w-full h-full">
                    {item.mobileImage && (
                      <source media="(max-width: 640px)" srcSet={item.mobileImage} />
                    )}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority={idx === 0}
                    />
                  </picture>

                  {/* Dark Vignette and Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25 group-hover:from-black group-hover:via-black/65 transition-colors duration-500" />
                </motion.div>

                {/* Top Row: Step Number & Accent Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <motion.div
                    custom={idx}
                    variants={numberVariants}
                    className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#63D13F]/40 shadow-md text-xs font-mono font-black text-[#63D13F] tracking-wider"
                  >
                    <span>{stepNumber}</span>
                  </motion.div>

                  {item.accentText && (
                    <span className="hidden sm:inline-block text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-zinc-300 border border-white/10">
                      {item.accentText}
                    </span>
                  )}
                </div>

                {/* Bottom Row: Typography, Subtitle & Action Link */}
                <div className="relative z-10 flex flex-col justify-end pt-12">
                  {/* Subtitle / Category */}
                  <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider text-[#63D13F] mb-2 block">
                    {item.subtitle}
                  </span>

                  {/* Large Editorial Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-3xl font-black uppercase text-white font-display tracking-tight leading-[1.08] mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.description && (
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-5 line-clamp-3">
                      {item.description}
                    </p>
                  )}

                  {/* Animated Green Accent Line */}
                  <div className="h-[2.5px] bg-[#63D13F] rounded-full w-10 group-hover:w-20 transition-all duration-300 mb-5" />

                  {/* Link Button */}
                  <Link
                    href={targetHref}
                    className="inline-flex items-center justify-between w-full pt-3 border-t border-white/15 group-hover:border-[#63D13F]/40 transition-colors"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#63D13F] transition-colors">
                      {item.ctaText || 'Explore Vertical'}
                    </span>

                    <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#63D13F] text-white group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-md">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
