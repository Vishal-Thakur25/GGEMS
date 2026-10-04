'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, TrendingUp, Heart } from 'lucide-react';

interface FeatureItem {
  line1: string;
  line2: string;
  description: string;
  icon: React.ElementType;
}

const features: FeatureItem[] = [
  {
    line1: 'Experienced',
    line2: 'Professionals',
    description: 'Coaches with national and international exposure.',
    icon: Users,
  },
  {
    line1: 'Certified',
    line2: 'Coaches',
    description: 'WSF / ASF certified coaching experts.',
    icon: Trophy,
  },
  {
    line1: 'Player',
    line2: 'Development',
    description: 'Focus on skill, fitness and mindset.',
    icon: TrendingUp,
  },
  {
    line1: 'Mentorship',
    line2: '& Guidance',
    description: 'Building confident and disciplined athletes.',
    icon: Heart,
  },
];

export default function TeamFeatures() {
  return (
    <section className="w-full bg-[#F7FAF5] border-b border-zinc-200/70 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.line1}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="flex items-start gap-3.5 sm:gap-4 group"
              >
                {/* Circular soft green icon badge */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#EEF8EA] border border-[#63D13F]/20 flex items-center justify-center text-[#45B52D] shrink-0 group-hover:scale-105 group-hover:bg-[#63D13F] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="text-xs sm:text-sm font-black tracking-tight text-zinc-950 font-heading leading-tight uppercase">
                    <span className="block">{item.line1}</span>
                    <span className="block">{item.line2}</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed mt-1.5 font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
