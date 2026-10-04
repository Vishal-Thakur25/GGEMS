'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { resolveProgrammeIcon } from './IconResolver';

export interface TrainingStageItem {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon?: string;
  displayOrder?: number;
  published?: boolean;
}

interface ProgrammeTrainingStructureProps {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  stagesData?: string | null;
}

const defaultStages: TrainingStageItem[] = [
  {
    id: 's1',
    stepNumber: '01',
    title: 'Beginner Level',
    description: 'Learn basics, technique and game rules.',
    icon: 'Footprints',
    displayOrder: 1,
    published: true,
  },
  {
    id: 's2',
    stepNumber: '02',
    title: 'Intermediate Level',
    description: 'Skill development, match practice and strategy building.',
    icon: 'BarChart3',
    displayOrder: 2,
    published: true,
  },
  {
    id: 's3',
    stepNumber: '03',
    title: 'Advanced Level',
    description: 'High-performance training and tournament preparation.',
    icon: 'Trophy',
    displayOrder: 3,
    published: true,
  },
  {
    id: 's4',
    stepNumber: '04',
    title: 'Competitive Exposure',
    description: 'Opportunities in state, national and international tournaments.',
    icon: 'Medal',
    displayOrder: 4,
    published: true,
  },
];

export default function ProgrammeTrainingStructure({
  eyebrow = 'TRAINING STRUCTURE',
  title = 'A Step-by-Step Approach',
  description,
  stagesData,
}: ProgrammeTrainingStructureProps) {
  const shouldReduceMotion = useReducedMotion();

  let stages: TrainingStageItem[] = defaultStages;

  if (stagesData) {
    try {
      const parsed = JSON.parse(stagesData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        stages = parsed.filter((s) => s.published !== false);
      }
    } catch {
      // Keep defaults
    }
  }

  if (stages.length === 0) return null;

  // Stagger interval (180ms between steps)
  const stepStagger = 0.18;

  // Card reveal variants
  const cardVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 35,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : idx * stepStagger,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easeOut
      },
    }),
  };

  // Number circle variants: scales from 0.7 -> 1 with smooth ease-out (no bounce)
  const numberVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.7,
    },
    visible: (idx: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : idx * stepStagger,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  // Icon variants: subtle reveal opacity 0 -> 1, scale 0.8 -> 1, translateY 4px -> 0
  const iconVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.8,
      y: shouldReduceMotion ? 0 : 4,
    },
    visible: (idx: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.35,
        delay: shouldReduceMotion ? 0 : idx * stepStagger + 0.08,
        ease: 'easeOut' as const,
      },
    }),
  };

  // Title variants: subtle stagger
  const titleVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 6,
    },
    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.35,
        delay: shouldReduceMotion ? 0 : idx * stepStagger + 0.13,
        ease: 'easeOut' as const,
      },
    }),
  };

  // Description variants: subtle stagger
  const descVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 6,
    },
    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.35,
        delay: shouldReduceMotion ? 0 : idx * stepStagger + 0.17,
        ease: 'easeOut' as const,
      },
    }),
  };

  // Progressive connecting line variants (draws from left: scaleX 0 -> 1)
  const lineDrawVariants: Variants = {
    hidden: {
      scaleX: shouldReduceMotion ? 1 : 0,
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: (idx: number) => ({
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.22,
        delay: shouldReduceMotion ? 0 : idx * stepStagger + 0.1,
        ease: 'easeOut' as const,
      },
    }),
  };

  // Chevron circle badge variant between cards
  const chevronBadgeVariants: Variants = {
    hidden: {
      scale: shouldReduceMotion ? 1 : 0.6,
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: (idx: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
        delay: shouldReduceMotion ? 0 : idx * stepStagger + 0.15,
        ease: 'easeOut' as const,
      },
    }),
  };

  return (
    <section className="w-full bg-white py-20 sm:py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-left mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#63D13F] block mb-2 sm:mb-3">
            {eyebrow || 'TRAINING STRUCTURE'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-zinc-950 font-heading tracking-tight leading-tight">
            {title || 'A Step-by-Step Approach'}
          </h2>
          {description && (
            <p className="mt-3 text-zinc-600 text-sm sm:text-base max-w-2xl font-normal">
              {description}
            </p>
          )}
        </div>

        {/* 4 Cards Row: Scroll-triggered sequential reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {stages.map((stage, idx) => (
            <div key={stage.id || idx} className="relative flex items-stretch">
              <motion.div
                custom={idx}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="w-full bg-[#F7FAF5] hover:bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/90 hover:border-[#63D13F]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Step Number Badge */}
                  <motion.div
                    custom={idx}
                    variants={numberVariants}
                    className="w-7 h-7 rounded-full bg-[#63D13F] text-white font-extrabold text-xs flex items-center justify-center mb-5 shadow-xs"
                  >
                    {stage.stepNumber || `0${idx + 1}`}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    custom={idx}
                    variants={iconVariants}
                    className="w-10 h-10 rounded-xl bg-white text-[#45B52D] group-hover:scale-110 flex items-center justify-center mb-4 transition-transform shadow-2xs border border-zinc-100"
                  >
                    {resolveProgrammeIcon(stage.icon, 'w-5 h-5')}
                  </motion.div>

                  {/* Title & Description */}
                  <motion.h3
                    custom={idx}
                    variants={titleVariants}
                    className="text-base sm:text-lg font-black uppercase text-zinc-950 font-heading tracking-tight mb-2 group-hover:text-[#45B52D] transition-colors"
                  >
                    {stage.title}
                  </motion.h3>
                  <motion.p
                    custom={idx}
                    variants={descVariants}
                    className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal"
                  >
                    {stage.description}
                  </motion.p>
                </div>
              </motion.div>

              {/* Connecting Line + Chevron Between Cards on Desktop */}
              {idx < stages.length - 1 && (
                <div
                  className="hidden lg:flex items-center justify-center absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-6 h-6 pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-full flex items-center justify-center relative">
                    {/* Progressive GGEMS Green Line */}
                    <motion.div
                      custom={idx}
                      variants={lineDrawVariants}
                      style={{ transformOrigin: 'left center' }}
                      className="absolute inset-x-0 h-[2px] bg-[#63D13F] origin-left"
                    />
                    {/* Central Chevron Badge */}
                    <motion.div
                      custom={idx}
                      variants={chevronBadgeVariants}
                      className="relative z-10 w-6 h-6 rounded-full bg-white border border-[#63D13F]/50 text-[#45B52D] flex items-center justify-center shadow-xs"
                    >
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
