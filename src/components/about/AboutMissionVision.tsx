'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AboutMissionVisionProps {
  missionLabel?: string;
  missionTitle?: string;
  missionText?: string;
  visionLabel?: string;
  visionTitle?: string;
  visionText?: string;
}

export default function AboutMissionVision({
  missionLabel = 'OUR MISSION',
  missionTitle = 'Empowering Young Athletes',
  missionText = 'To provide world-class coaching, modern infrastructure and a supportive environment that helps athletes develop their skills, confidence and character.',
  visionLabel = 'OUR VISION',
  visionTitle = 'A Healthier, Stronger Tomorrow',
  visionText = 'To be a leading sports academy that nurtures talent, promotes a healthy lifestyle and produces champions at national and international levels.',
}: AboutMissionVisionProps) {
  return (
    <section className="py-20 sm:py-24 bg-[#F7F9F6] border-y border-zinc-200/60 relative overflow-hidden">
      {/* Subtle background ambient circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#EAF6E5]/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: OUR MISSION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-start lg:text-left"
          >
            <span className="text-xs font-bold text-[#4CAF35] tracking-[0.2em] uppercase mb-3 block font-heading">
              {missionLabel}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight leading-tight mb-4 font-heading">
              {missionTitle}
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              {missionText}
            </p>
          </motion.div>

          {/* Center Column: Circular Green Visual Element with Athlete Silhouette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex items-center justify-center my-6 lg:my-0"
          >
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Outer Rotating Track / Dashed Accent Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#6CD34A]/50 pointer-events-none"
              />

              {/* Middle Concentric Gradient Ring */}
              <div className="absolute inset-2 rounded-full border-[10px] border-[#EAF6E5] flex items-center justify-center">
                {/* Dynamic Green Arc on top */}
                <svg className="absolute inset-0 w-full h-full -rotate-45" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#6CD34A"
                    strokeWidth="3.5"
                    strokeDasharray="60 220"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Inner White Core with subtle shadow */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white shadow-xl flex items-center justify-center border border-zinc-100">
                {/* Dynamic Athlete Runner / Squash Player Silhouette */}
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 sm:w-20 sm:h-20 text-zinc-950"
                >
                  {/* Head */}
                  <circle cx="28" cy="10" r="3.5" fill="currentColor" />
                  {/* Torso & Lunging Arms */}
                  <path
                    d="M26 15L21 24L29 26L36 21"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Back Leg in full sprint */}
                  <path
                    d="M21 24L13 32L8 31"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Front Planted Leg */}
                  <path
                    d="M25 24L31 33L38 34"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Kinetic motion lines */}
                  <path
                    d="M6 24L11 20M4 29L13 25"
                    stroke="#6CD34A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right Column: OUR VISION */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-start lg:text-left"
          >
            <span className="text-xs font-bold text-[#4CAF35] tracking-[0.2em] uppercase mb-3 block font-heading">
              {visionLabel}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight leading-tight mb-4 font-heading">
              {visionTitle}
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              {visionText}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
