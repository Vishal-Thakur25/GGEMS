'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Star, Shield, Users, ArrowUpRight, Heart, Trophy, Award, Zap, Target } from 'lucide-react';

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface AboutValuesProps {
  label?: string;
  title?: string;
  subtitle?: string;
  values?: ValueItem[];
}

export default function AboutValues({
  label = 'OUR VALUES',
  title = 'The Principles We Stand For',
  subtitle = 'At GGems, our values shape everything we do — from coaching on the court to building character off the court.',
  values,
}: AboutValuesProps) {
  const defaultValues: ValueItem[] = [
    {
      icon: 'dumbbell',
      title: 'Discipline',
      description: 'Building strong habits for long-term success.',
    },
    {
      icon: 'star',
      title: 'Excellence',
      description: 'Striving for continuous improvement.',
    },
    {
      icon: 'shield',
      title: 'Integrity',
      description: 'Promoting fair play and respect.',
    },
    {
      icon: 'users',
      title: 'Community & Support',
      description: 'Nurturing environment for every athlete.',
    },
  ];

  const activeValues = values && values.length > 0 ? values : defaultValues;

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'dumbbell':
        return Dumbbell;
      case 'star':
        return Star;
      case 'shield':
        return Shield;
      case 'heart':
        return Heart;
      case 'trophy':
        return Trophy;
      case 'award':
        return Award;
      case 'zap':
        return Zap;
      case 'target':
        return Target;
      case 'users':
      default:
        return Users;
    }
  };

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Left title, Right description */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 mb-14 sm:mb-16">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-bold text-[#4CAF35] tracking-[0.2em] uppercase mb-3 block font-heading"
            >
              {label}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[42px] font-black text-zinc-950 tracking-tight leading-[1.1] font-heading"
            >
              {title}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-600 max-w-md leading-relaxed font-normal"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* 4 Value Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {activeValues.map((val, idx) => {
            const Icon = getIcon(val.icon);
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                whileHover={{ y: -6 }}
                className="relative bg-white rounded-2xl p-7 border border-zinc-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                {/* Subtle Green Top Accent Bar on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#6CD34A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Green Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#EAF6E5] flex items-center justify-center text-[#4CAF35] mb-6 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-zinc-950 mb-2 font-heading">
                    {val.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>

                {/* Subtle Arrow Indicator */}
                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-[#4CAF35] transition-colors">
                  <span className="uppercase tracking-wider text-[11px]">Core Value</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
