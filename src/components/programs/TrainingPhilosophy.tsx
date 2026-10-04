'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FlaskConical, TrendingUp, Users, ArrowRight } from 'lucide-react';

interface PhilosophyCard {
  title: string;
  description: string;
  icon: 'flask' | 'trending-up' | 'users' | string;
}

interface TrainingPhilosophyProps {
  label?: string;
  headline?: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  pillars?: PhilosophyCard[];
}

const defaultPillars: PhilosophyCard[] = [
  {
    title: 'Scientific\nApproach',
    description:
      'Our training programs are backed by the latest sports science research to improve performance, prevent injury, and accelerate recovery.',
    icon: 'flask',
  },
  {
    title: 'Progressive\nSkill Development',
    description:
      'We introduce athletes to advanced techniques and strategies, building upon the basics to push their limits.',
    icon: 'trending-up',
  },
  {
    title: 'Collaborative\nLearning',
    description:
      'We nurture athletes beyond physical training, focusing on mindset, leadership, and self-discipline.',
    icon: 'users',
  },
];

export default function TrainingPhilosophy({
  label = 'OUR TRAINING PHILOSOPHY',
  headline = 'Building Better Athletes Everyday',
  description = 'At GGems Sports, our training philosophy is built around consistency, discipline, and innovation. We aim to develop athletes who are technically proficient, physically strong, and mentally resilient.',
  ctaLabel = 'Know Our Approach',
  ctaUrl = '#our-approach',
  pillars = defaultPillars,
}: TrainingPhilosophyProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'flask':
        return <FlaskConical className="w-8 h-8 text-[#63D13F] stroke-[2]" />;
      case 'trending-up':
        return <TrendingUp className="w-8 h-8 text-[#63D13F] stroke-[2]" />;
      case 'users':
      default:
        return <Users className="w-8 h-8 text-[#63D13F] stroke-[2]" />;
    }
  };

  return (
    <section className="relative w-full bg-[#111111] text-white py-20 sm:py-24 lg:py-28 overflow-hidden border-b border-zinc-800">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#63D13F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading and intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#63D13F] mb-3 font-mono">
              {label}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.08] mb-6 font-heading">
              Building <br className="hidden sm:inline" />
              Better Athletes <br className="hidden sm:inline" />
              <span className="text-[#63D13F]">Everyday</span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 font-normal max-w-md">
              {description}
            </p>

            <Link
              href={ctaUrl}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#63D13F]/25 hover:shadow-xl hover:shadow-[#63D13F]/35 transform hover:-translate-y-0.5"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </motion.div>

          {/* Right Column: Three dark charcoal cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {pillars.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#181B18]/90 rounded-2xl p-6 sm:p-7 border border-zinc-800/80 hover:border-[#63D13F]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#1F241F] flex items-center justify-center mb-6 group-hover:bg-[#63D13F]/15 transition-colors border border-zinc-800 group-hover:border-[#63D13F]/30">
                    {getIcon(card.icon)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight leading-snug mb-3.5 font-heading whitespace-pre-line">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
