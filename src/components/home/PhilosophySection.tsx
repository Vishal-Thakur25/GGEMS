'use client';

import Link from 'next/link';
import { ArrowRight, Microscope, TrendingUp, Users } from 'lucide-react';

export default function PhilosophySection() {
  const pillars = [
    {
      icon: Microscope,
      title: 'Scientific Approach',
      description:
        'Our training programmes are backed by the latest sports science research to improve performance, prevent injury and accelerate recovery.',
    },
    {
      icon: TrendingUp,
      title: 'Progressive Skill Development',
      description:
        'We introduce athletes to advanced techniques and strategies, building upon the basics to push their limits.',
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description:
        'We nurture athletes beyond physical training, focusing on mindset, leadership and self-discipline.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtext & Button */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-6">
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#48A427] uppercase mb-3 block">
              OUR TRAINING PHILOSOPHY
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-950 font-display leading-[0.95] mb-5">
              DISCIPLINE.
              <br />
              CONSISTENCY.
              <br />
              <span className="text-[#48A427]">INNOVATION.</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mb-8 max-w-md">
              Our training philosophy is built around consistency, discipline develop athletes who
              are technically proficient, mentally resilient.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#48A427] hover:bg-[#3B8A1D] text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-[#48A427]/20 hover:shadow-lg hover:shadow-[#48A427]/30"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>

          {/* Right Column: 3 Structured Principles + Squash Ball graphic */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center gap-8">
            {/* 3 Principles stacked */}
            <div className="flex-1 flex flex-col gap-6">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 hover:border-[#48A427]/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#48A427] border border-zinc-200 shrink-0 shadow-sm">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wide mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Glossy Squash Ball Graphic */}
            <div className="shrink-0 hidden xl:flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-zinc-800 via-zinc-950 to-black shadow-2xl flex items-center justify-center border-4 border-zinc-900 group hover:scale-105 transition-transform duration-500">
                {/* 3D highlights */}
                <div className="absolute top-6 left-8 w-12 h-6 rounded-full bg-white/10 blur-[3px] rotate-[-30deg]" />
                <div className="absolute bottom-6 right-8 w-16 h-8 rounded-full bg-black/60 blur-[4px]" />
                
                {/* Official Double Yellow / Green Dots */}
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#48A427] shadow-[0_0_8px_#48A427]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#48A427] shadow-[0_0_8px_#48A427]" />
                </div>

                {/* Subtle GGems text on ball */}
                <div className="absolute bottom-7 text-[8px] font-mono tracking-widest text-zinc-600 uppercase">
                  GGEMS PRO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
