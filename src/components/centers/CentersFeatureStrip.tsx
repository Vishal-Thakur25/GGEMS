'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Users, TrendingUp } from 'lucide-react';

interface FeatureItem {
  number: string;
  line1: string;
  line2: string;
  description: string;
  icon: React.ElementType;
}

const features: FeatureItem[] = [
  {
    number: '01',
    line1: 'LEADING',
    line2: 'INSTITUTIONS',
    description: 'Partnered with reputed schools and sports complexes.',
    icon: Building2,
  },
  {
    number: '02',
    line1: 'MULTIPLE',
    line2: 'LOCATIONS',
    description: 'Across Delhi NCR and beyond.',
    icon: MapPin,
  },
  {
    number: '03',
    line1: 'QUALITY',
    line2: 'COACHING',
    description: 'Professional & certified coaching support.',
    icon: Users,
  },
  {
    number: '04',
    line1: 'BETTER',
    line2: 'OPPORTUNITIES',
    description: 'Structured training & competitive exposure.',
    icon: TrendingUp,
  },
];

export default function CentersFeatureStrip() {
  return (
    <section className="w-full bg-[#F7FAF5] border-b border-zinc-200/70 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
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
