'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Trophy, ArrowRight } from 'lucide-react';

interface CentersNetworkSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
}

const statsData = [
  {
    value: '10',
    line1: 'Centers of',
    line2: 'Excellence',
    icon: TrendingUp,
  },
  {
    value: '260+',
    line1: 'Active',
    line2: 'Squash Players',
    icon: Users,
  },
  {
    value: '20+',
    line1: 'Years of Coaching',
    line2: '& Sports Development',
    icon: Award,
  },
  {
    value: 'Multiple',
    line1: 'Competitive',
    line2: 'Opportunities',
    icon: Trophy,
  },
];

export default function CentersNetworkSection({
  subtitle = 'GGEMS NETWORK',
  description = 'GGems Sports Academy works across schools, sports complexes and partner facilities to create structured opportunities for athlete development and promote a healthy sporting culture.',
  ctaText = 'Our Approach',
  ctaUrl = '/about',
}: CentersNetworkSectionProps) {
  return (
    <section className="relative w-full bg-[#111111] text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-y border-zinc-800/80">
      {/* Subtle sports court mesh pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#63D13F_1px,transparent_1px)] [background-size:24px_24px]" />

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
              Building a Stronger <span className="text-[#63D13F]">Sports Network</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-md mb-8">
              {description}
            </p>

            <Link
              href={ctaUrl}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#63D13F]/20 hover:shadow-lg hover:shadow-[#63D13F]/30 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </motion.div>

          {/* RIGHT: 4 Statistic Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            {statsData.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#181818] border border-white/[0.08] hover:border-[#63D13F]/40 rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Green Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-[#63D13F] mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Large Green Number */}
                  <div className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#63D13F] tracking-tight font-heading leading-none mb-3">
                    {stat.value}
                  </div>

                  {/* Small White Label */}
                  <div className="text-[11px] sm:text-xs text-white/90 font-medium leading-tight">
                    <span className="block">{stat.line1}</span>
                    <span className="block">{stat.line2}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
