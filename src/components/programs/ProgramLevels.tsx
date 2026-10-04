'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserCheck, Activity, BarChart2, Award, ArrowRight } from 'lucide-react';

interface LevelItem {
  title: string;
  description: string;
  icon: 'user-check' | 'activity' | 'bar-chart-2' | 'award' | string;
  slug: string;
}

interface ProgramLevelsProps {
  label?: string;
  headline?: string;
  description?: string;
  levels?: LevelItem[];
}

const defaultLevels: LevelItem[] = [
  {
    title: 'Beginner',
    description: 'Learn the basics with expert guidance.',
    icon: 'user-check',
    slug: 'beginners-program',
  },
  {
    title: 'Intermediate',
    description: 'Build skills and confidence with structured training.',
    icon: 'activity',
    slug: 'junior-advance-program',
  },
  {
    title: 'Competitive',
    description: 'Advanced coaching for tournament exposure.',
    icon: 'bar-chart-2',
    slug: 'professional-program',
  },
  {
    title: 'High Performance',
    description: 'Elite training for professional development.',
    icon: 'award',
    slug: 'development-program',
  },
];

export default function ProgramLevels({
  label = 'PROGRAMME LEVELS',
  headline = 'Programmes for Every Stage',
  description = 'From beginners to advanced athletes, our programmes are designed to help every athlete grow, learn and achieve their full potential.',
  levels = defaultLevels,
}: ProgramLevelsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user-check':
        return <UserCheck className="w-9 h-9 text-[#63D13F] stroke-[2.2]" />;
      case 'activity':
        return <Activity className="w-9 h-9 text-[#63D13F] stroke-[2.2]" />;
      case 'bar-chart-2':
        return <BarChart2 className="w-9 h-9 text-[#63D13F] stroke-[2.2]" />;
      case 'award':
      default:
        return <Award className="w-9 h-9 text-[#63D13F] stroke-[2.2]" />;
    }
  };

  return (
    <section className="w-full bg-[#F7FAF5] py-20 sm:py-24 lg:py-28 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#63D13F] mb-3 block font-mono">
            {label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 uppercase tracking-tight leading-[1.08] mb-4 font-heading">
            {headline}
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {levels.map((lvl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.09 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-zinc-200/90 hover:border-[#63D13F]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EEF8EA] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200 border border-[#63D13F]/20">
                  {getIcon(lvl.icon)}
                </div>

                <h3 className="text-lg sm:text-xl font-black uppercase text-zinc-950 tracking-tight mb-2.5 font-heading group-hover:text-[#63D13F] transition-colors">
                  {lvl.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                  {lvl.description}
                </p>
              </div>

              {/* Circular Arrow Button Bottom Right */}
              <div className="flex items-center justify-end pt-6 mt-4 border-t border-zinc-100">
                <Link
                  href={`/programs/${lvl.slug}`}
                  className="w-8 h-8 rounded-full border border-zinc-300 group-hover:border-[#63D13F] group-hover:bg-[#63D13F] flex items-center justify-center text-zinc-600 group-hover:text-white transition-all duration-200 shadow-xs"
                  aria-label={`View ${lvl.title} Program`}
                >
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
