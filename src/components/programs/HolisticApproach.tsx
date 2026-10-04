'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ChecklistItem {
  title: string;
  description: string;
}

interface HolisticApproachProps {
  label?: string;
  headline?: string;
  description?: string;
  imageUrl?: string;
  checklists?: ChecklistItem[];
}

const defaultChecklists: ChecklistItem[] = [
  {
    title: 'Infrastructure Development',
    description:
      'We help schools develop, upgrade, and optimize sports facilities to enhance student engagement and performance.',
  },
  {
    title: 'Professional Coaching',
    description:
      'Personalized support for student-athletes and school teams to enhance performance at every level.',
  },
  {
    title: 'Comprehensive Training Programs',
    description:
      'Structured sports and PE programs in schools imparting fundamental skills.',
  },
  {
    title: 'Competitive Opportunities',
    description:
      'We organize tournaments and matches to help students gain valuable experience and elevate their performance.',
  },
  {
    title: 'In-School & After-School Programs',
    description:
      'We collaborate with schools to run sports programs during school hours and after school.',
  },
  {
    title: 'Customized Sports Curriculum',
    description:
      'We design structured sports programs tailored to the school’s needs.',
  },
];

export default function HolisticApproach({
  label = 'OUR APPROACH',
  headline = 'Holistic Sports Development for Every Athlete',
  description = 'We aim to develop a generation of healthier and fitter children through in-school physical education and sports programs. GGems Sports is a company founded by Gyanendra Pratap in 2018 with the aim of adding innovative value to both the sporting and corporate worlds.',
  imageUrl = '/images/programs/approach-basketball.jpg',
  checklists = defaultChecklists,
}: HolisticApproachProps) {
  return (
    <section id="our-approach" className="w-full bg-white py-20 sm:py-24 lg:py-28 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Large Action Sports Photography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-200/80">
              <Image
                src={imageUrl}
                alt="Holistic Sports Development - Basketball Action"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle decorative bottom-left green accent element */}
            <div className="absolute -bottom-3 -left-3 w-24 h-24 rounded-2xl bg-[#63D13F]/15 -z-10 blur-xl pointer-events-none" />
          </motion.div>

          {/* Right Column: Content and Checklist Items */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#63D13F] mb-3 block font-mono">
              {label}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-zinc-950 uppercase tracking-tight leading-[1.1] mb-5 font-heading">
              Holistic Sports Development <br className="hidden sm:inline" />
              for <span className="text-[#63D13F]">Every Athlete</span>
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-8 font-normal">
              {description}
            </p>

            {/* 6 Checklist Items */}
            <div className="space-y-4 sm:space-y-5">
              {checklists.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-[#63D13F] fill-[#63D13F]/15 stroke-[2.5]" />
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                    <span className="font-extrabold text-zinc-950 mr-1.5 font-heading">
                      {item.title} –
                    </span>
                    <span className="text-zinc-600 font-normal">{item.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
