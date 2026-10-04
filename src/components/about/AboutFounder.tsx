'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AboutFounderProps {
  label?: string;
  title?: string;
  description?: string;
  founderName?: string;
  founderRole?: string;
  quote?: string;
  imageUrl?: string;
}

export default function AboutFounder({
  label = 'MEET OUR FOUNDER',
  title = 'A Visionary Leader in Sports Development',
  description = `Our founder's vision has been the driving force behind GGems Sports Academy, creating a platform for young athletes to grow, compete and achieve excellence.\n\nWith over 20 years of experience in squash coaching and Physical & Health Education (PHE), Gyanendra Prajapati has developed an extensive footprint across Delhi NCR, shaping players from their very first swing to international podiums.`,
  founderName = 'Gyanendra Prajapati',
  founderRole = 'Founder & CEO',
  quote = 'Our goal is to create not just better players, but stronger, more confident individuals who can excel in every aspect of life.',
  imageUrl = '/images/about/founder-gyanendra.jpg',
}: AboutFounderProps) {
  const paragraphs = description.split('\n\n').filter(Boolean);

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Information & Signature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Green Eyebrow */}
            <span className="text-xs sm:text-sm font-bold text-[#4CAF35] tracking-[0.2em] uppercase mb-3 block font-heading">
              {label}
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-zinc-950 tracking-tight leading-[1.08] mb-6 font-heading">
              {title}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal mb-8">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Founder Signature Area */}
            <div className="pt-4 flex flex-col items-start">
              {/* Signature Graphic Line in Brand Green */}
              <div className="h-10 w-44 relative mb-2">
                <svg
                  viewBox="0 0 180 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-[#6CD34A]"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    d="M 10 32 C 30 10, 45 40, 60 18 C 75 -2, 85 45, 105 24 C 120 8, 140 38, 170 20"
                    stroke="#4CAF35"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Name & Role */}
              <h3 className="text-base sm:text-lg font-bold text-zinc-950 font-heading">
                {founderName}
              </h3>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">
                {founderRole} • GGems Sports Academy
              </p>
            </div>
          </motion.div>

          {/* Right Column: Founder Portrait with Green Frame & Overlaid Quote Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Soft Green Backdrop Decorative Shape */}
            <div className="absolute top-2 -right-2 sm:-right-4 w-[92%] h-[95%] rounded-3xl bg-[#EAF6E5] border border-[#6CD34A]/20 pointer-events-none -z-0" />

            {/* Main Portrait Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-zinc-100 z-10 border border-zinc-200"
            >
              <Image
                src={imageUrl}
                alt={founderName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 sm:-bottom-8 right-2 sm:-right-6 max-w-[270px] sm:max-w-[310px] bg-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-zinc-100 z-20"
            >
              {/* Green Quote Mark */}
              <span className="text-4xl sm:text-5xl font-serif text-[#6CD34A] leading-none block -mb-2">
                “
              </span>

              {/* Quote Body */}
              <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed italic mb-4">
                {quote}
              </p>

              {/* Attribution */}
              <div className="pt-3 border-t border-zinc-100 flex flex-col">
                <span className="text-xs font-bold text-zinc-950 font-heading">
                  {founderName}
                </span>
                <span className="text-[11px] text-zinc-500 font-medium">
                  {founderRole}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
