'use client';

import AnimatedCounter from '@/components/animations/AnimatedCounter';
import { Trophy, Users, GraduationCap, BarChart2, Target, Grid } from 'lucide-react';

interface StatisticItem {
  id?: string;
  key?: string;
  label?: string;
  numericValue?: number;
  prefix?: string | null;
  suffix?: string | null;
  description?: string | null;
}

interface ImpactSectionProps {
  statistics?: StatisticItem[];
}

export default function ImpactSection({ statistics }: ImpactSectionProps) {
  const stats = [
    {
      icon: Trophy,
      value: 20,
      suffix: '+',
      label: 'Years of Coaching & Sports Development',
    },
    {
      icon: Users,
      value: 260,
      suffix: '',
      label: 'Active Squash Players',
    },
    {
      icon: GraduationCap,
      value: 200,
      suffix: '',
      label: 'Beginners',
    },
    {
      icon: BarChart2,
      value: 45,
      suffix: '',
      label: 'Intermediate Players',
    },
    {
      icon: Target,
      value: 15,
      suffix: '',
      label: 'Advanced Players',
    },
    {
      icon: Grid,
      value: 25,
      suffix: '%',
      label: 'Squash Courts Under GGems Operations',
    },
  ];

  return (
    <section className="bg-[#0B0F13] py-10 sm:py-12 border-y border-white/10 text-white relative overflow-hidden">
      {/* Subtle court glow */}
      <div className="absolute inset-0 court-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-16 bg-[#48A427]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  idx !== 0 ? 'sm:pl-6 pt-4 sm:pt-0' : ''
                }`}
              >
                {/* Green Outline Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#48A427] mb-3">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Big Number */}
                <div className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight flex items-baseline">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Metric Label */}
                <p className="text-[12px] sm:text-[13px] text-zinc-300 font-medium leading-tight mt-1.5 max-w-[150px]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
