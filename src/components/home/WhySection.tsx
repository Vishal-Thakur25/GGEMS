'use client';

import { Users, Activity, Target, Trophy, Sparkles } from 'lucide-react';

export default function WhySection() {
  const pillars = [
    {
      icon: Users,
      title: 'Professional Coaching',
      description: 'Personalized support for student-athletes and school teams.',
    },
    {
      icon: Activity,
      title: 'Fitness & Conditioning',
      description: 'Physical preparation supporting performance and development.',
    },
    {
      icon: Target,
      title: 'Match Practice',
      description: 'Regular match exposure to build competitive confidence.',
    },
    {
      icon: Trophy,
      title: 'Tournament Exposure',
      description: 'Opportunities to experience competitive environments at higher levels.',
    },
    {
      icon: Sparkles,
      title: 'Player Development',
      description: 'A clear pathway from beginner to advanced and high performance.',
    },
  ];

  return (
    <section className="bg-[#0B0F13] py-20 sm:py-28 text-white relative overflow-hidden border-y border-white/10">
      {/* Subtle court glow */}
      <div className="absolute inset-0 court-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-[#48A427]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-8 items-start">
          {/* Left Column: Heading and Description */}
          <div className="xl:col-span-4 flex flex-col items-start pr-0 xl:pr-6">
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#48A427] uppercase mb-3 block">
              WHY GGEMS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display uppercase leading-[1.05] mb-5">
              A Structured Approach
              <br />
              to Player Development.
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              GGems Sport Academy is committed to developing well-rounded athletes through
              world-class coaching, structured programmes and a nurturing environment that inspires
              excellence on and off the court.
            </p>
          </div>

          {/* Right Column: 5 Pillars with sleek green icons */}
          <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-start p-4 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#48A427]/50 hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#48A427] mb-4">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
