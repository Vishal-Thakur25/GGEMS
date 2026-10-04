'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, Users, Award, TrendingUp } from 'lucide-react';
import AnimatedCounter from '@/components/animations/AnimatedCounter';

interface StatItem {
  id?: string;
  key?: string;
  label: string;
  numericValue: number;
  prefix?: string | null;
  suffix?: string | null;
  icon?: string;
}

interface AboutImpactProps {
  label?: string;
  title?: string;
  stats?: StatItem[];
  bgImageUrl?: string;
}

export default function AboutImpact({
  label = 'OUR IMPACT',
  title = 'Numbers That Define Our Journey',
  stats,
  bgImageUrl = '/images/Dynamic-Squash-Court-Action.png',
}: AboutImpactProps) {
  // Verified GGEMS statistics with icons
  const defaultStats: StatItem[] = [
    {
      key: 'EXP_YEARS',
      label: 'Years of Coaching & Sports Development',
      numericValue: 20,
      prefix: '',
      suffix: '+',
      icon: 'trophy',
    },
    {
      key: 'ACTIVE_PLAYERS',
      label: 'Active Squash Players',
      numericValue: 260,
      prefix: '',
      suffix: '+',
      icon: 'users',
    },
    {
      key: 'ADVANCED_PLAYERS',
      label: 'Advanced Players',
      numericValue: 15,
      prefix: '',
      suffix: '+',
      icon: 'medal',
    },
    {
      key: 'CHAMPIONSHIPS',
      label: 'Tournaments & Championships',
      numericValue: 25,
      prefix: '',
      suffix: '+',
      icon: 'chart',
    },
  ];

  const activeStats = stats && stats.length >= 4 ? stats.slice(0, 4) : defaultStats;

  const getIcon = (type?: string, idx?: number) => {
    switch (type) {
      case 'trophy':
        return Trophy;
      case 'users':
        return Users;
      case 'medal':
        return Award;
      case 'chart':
        return TrendingUp;
      default:
        return [Trophy, Users, Award, TrendingUp][idx ?? 0] || Trophy;
    }
  };

  return (
    <section className="relative py-24 sm:py-28 lg:py-32 bg-[#151515] text-white overflow-hidden">
      {/* Background Squash Court Action Photograph with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImageUrl}
          alt="GGems Squash Impact Background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />
        {/* Dark Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/90 to-[#151515]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-[#151515]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header: Label & Big Heading */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-bold text-[#6CD34A] tracking-[0.2em] uppercase mb-3 block font-heading"
          >
            {label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.05] font-heading"
          >
            {title}
          </motion.h2>
        </div>

        {/* 4 Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {activeStats.map((item, index) => {
            const Icon = getIcon(item.icon, index);
            return (
              <motion.div
                key={item.key || item.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className="flex flex-col items-start group"
              >
                {/* Green Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#6CD34A] mb-5 group-hover:bg-[#6CD34A]/20 transition-all duration-300">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Animated Count-up Number */}
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-heading leading-none mb-3">
                  <span className="text-[#6CD34A]">
                    <AnimatedCounter
                      value={item.numericValue}
                      prefix={item.prefix || ''}
                      suffix={item.suffix || ''}
                      duration={1600}
                    />
                  </span>
                </div>

                {/* Underline green accent line that draws */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '40px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + 0.1 * index }}
                  className="h-[2px] bg-[#6CD34A] mb-3"
                />

                {/* Label */}
                <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
