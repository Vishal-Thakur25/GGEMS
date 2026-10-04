'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BarChart3, Users, Trophy } from 'lucide-react';

interface BenefitItem {
  title: string;
  description: string;
  icon: 'graduation-cap' | 'bar-chart' | 'users' | 'trophy' | string;
}

interface ProgramBenefitsStripProps {
  benefits?: BenefitItem[];
}

const defaultBenefits: BenefitItem[] = [
  {
    title: 'World-Class Coaching',
    description: 'Learn from certified and experienced coaches.',
    icon: 'graduation-cap',
  },
  {
    title: 'Structured Curriculum',
    description: 'Age-appropriate training programmes.',
    icon: 'bar-chart',
  },
  {
    title: 'All Age Groups',
    description: 'From beginners to advanced athletes.',
    icon: 'users',
  },
  {
    title: 'Competitive Exposure',
    description: 'Tournaments and match opportunities.',
    icon: 'trophy',
  },
];

export default function ProgramBenefitsStrip({
  benefits = defaultBenefits,
}: ProgramBenefitsStripProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'graduation-cap':
        return <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#63D13F] stroke-[2.2]" />;
      case 'bar-chart':
        return <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-[#63D13F] stroke-[2.2]" />;
      case 'users':
        return <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#63D13F] stroke-[2.2]" />;
      case 'trophy':
      default:
        return <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-[#63D13F] stroke-[2.2]" />;
    }
  };

  return (
    <section className="w-full bg-white border-b border-zinc-100 py-8 sm:py-10 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-zinc-100">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={`flex items-center gap-4 ${
                index > 0 ? 'pt-5 sm:pt-0 lg:pl-6' : ''
              }`}
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#EEF8EA] flex items-center justify-center shrink-0 border border-[#63D13F]/20 shadow-xs">
                {getIcon(item.icon)}
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-zinc-900 font-heading leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed mt-1">
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
