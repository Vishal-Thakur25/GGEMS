'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { resolveProgrammeIcon } from './IconResolver';

export interface ProgrammeHighlightItem {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  displayOrder?: number;
  published?: boolean;
}

interface ProgrammeHighlightsProps {
  highlightsData?: string | null;
}

const defaultHighlights: ProgrammeHighlightItem[] = [
  {
    id: 'h1',
    title: 'Technical Skills',
    description: 'Strong foundation with expert guidance.',
    icon: 'Activity',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'h2',
    title: 'Physical Fitness',
    description: 'Improve strength, speed and endurance.',
    icon: 'Dumbbell',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'h3',
    title: 'Mental Resilience',
    description: 'Build focus and competitive mindset.',
    icon: 'Brain',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'h4',
    title: 'Career Growth',
    description: 'Pathway to state, national and international level.',
    icon: 'TrendingUp',
    displayOrder: 4,
    published: true,
  },
];

export default function ProgrammeHighlights({ highlightsData }: ProgrammeHighlightsProps) {
  let highlights: ProgrammeHighlightItem[] = defaultHighlights;

  if (highlightsData) {
    try {
      const parsed = JSON.parse(highlightsData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        highlights = parsed.filter((item) => item.published !== false);
      }
    } catch {
      // Keep defaults
    }
  }

  if (highlights.length === 0) return null;

  return (
    <section className="w-full bg-[#F7FAF5] py-10 sm:py-12 border-b border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/80 hover:border-[#63D13F]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex items-start gap-4 group"
            >
              {/* Circular Icon Container */}
              <div className="w-12 h-12 rounded-full bg-[#EEF8EA] text-[#45B52D] group-hover:bg-[#63D13F] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-200">
                {resolveProgrammeIcon(item.icon, 'w-6 h-6')}
              </div>

              {/* Text Information */}
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-black uppercase text-zinc-950 font-heading tracking-tight group-hover:text-[#45B52D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
