'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CenterItem, CenterProgrammeItem } from '../types';
import { Activity, Users, TrendingUp, Trophy } from 'lucide-react';

interface CenterProgrammesSectionProps {
  center: CenterItem;
}

// Custom Squash Racket SVG Icon for authentic sports look matching reference
function SquashRacketIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a6 8 0 0 0-6 8c0 3 2 5.5 4.5 7.2L10 22h4l-.5-4.8C16 15.5 18 13 18 10a6 8 0 0 0-6-8z" />
      <path d="M10 5h4" />
      <path d="M9 8h6" />
      <path d="M9.5 11h5" />
      <path d="M11 14h2" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Custom Badminton Shuttlecock SVG Icon matching reference
function ShuttlecockIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="19" r="2.5" />
      <path d="M7 6l3.5 10.5" />
      <path d="M17 6l-3.5 10.5" />
      <path d="M12 4v12.5" />
      <path d="M7 6c1.5-1 3.5-1.5 5-1.5s3.5.5 5 1.5" />
      <path d="M8.5 11h7" />
    </svg>
  );
}

const DEFAULT_PROGRAMMES: CenterProgrammeItem[] = [
  {
    id: 'p-1',
    title: 'Squash Training',
    description: 'Structured coaching for all age groups.',
    icon: 'squash',
  },
  {
    id: 'p-2',
    title: 'Badminton Training',
    description: 'Skill development and match practice.',
    icon: 'badminton',
  },
  {
    id: 'p-3',
    title: 'Sports for All',
    description: 'Encouraging participation in multiple sports.',
    icon: 'users',
  },
  {
    id: 'p-4',
    title: 'Student Growth',
    description: 'Building discipline, fitness and confidence.',
    icon: 'growth',
  },
];

export default function CenterProgrammesSection({
  center,
}: CenterProgrammesSectionProps) {
  let programmes: CenterProgrammeItem[] = DEFAULT_PROGRAMMES;

  if (center.programmesData) {
    try {
      const parsed = JSON.parse(center.programmesData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        programmes = parsed;
      }
    } catch {
      // fallback
    }
  }

  const renderIcon = (iconType?: string) => {
    switch (iconType) {
      case 'squash':
        return <SquashRacketIcon className="w-6 h-6 text-[#45B52D]" />;
      case 'badminton':
        return <ShuttlecockIcon className="w-6 h-6 text-[#45B52D]" />;
      case 'users':
        return <Users className="w-6 h-6 text-[#45B52D] stroke-[1.8]" />;
      case 'growth':
      case 'chart':
        return <TrendingUp className="w-6 h-6 text-[#45B52D] stroke-[1.8]" />;
      default:
        return <Trophy className="w-6 h-6 text-[#45B52D] stroke-[1.8]" />;
    }
  };

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase mb-2.5 block font-heading">
            PROGRAMMES AT THIS CENTER
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-zinc-950 font-heading leading-tight uppercase">
            Sports Programmes for Holistic Development
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programmes.map((prog, idx) => (
            <motion.div
              key={prog.id || `${prog.title}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-zinc-200/90 hover:border-[#63D13F]/60 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex items-start gap-4"
            >
              {/* Soft Green Icon Circle */}
              <div className="w-13 h-13 rounded-2xl bg-[#EEF8EA] border border-[#63D13F]/20 flex items-center justify-center shrink-0">
                {renderIcon(prog.icon)}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base font-extrabold text-zinc-950 font-heading leading-tight mb-1.5 uppercase">
                  {prog.title}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed font-normal">
                  {prog.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
