import type { Metadata } from 'next';
import Image from 'next/image';
import { getAchievements } from '@/server/queries';
import { Trophy, Medal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Achievers & Champions Hall of Fame | GGems Squash Academy',
  description:
    'Meet the national rankers and champions of GGems Squash Academy: Vedant Patel (India Rank 8), Devshree (U-19 Rank 10), Abhiraj Singh (Boys U-19 Rank 10), Aakash Sharma.',
};

export default async function AchievementsPage() {
  const achievements = await getAchievements(true);

  return (
    <div className="pt-28 pb-24 bg-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#48A427] text-xs font-bold tracking-widest uppercase mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>HALL OF FAME</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-950 uppercase leading-none mb-6 font-display">
            GLIMPSE OF OUR CHAMPIONS
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
            Proven athletic excellence on national and international courts. Our junior and senior
            athletes consistently secure Top 10 Indian rankings and podium finishes.
          </p>
        </div>
      </section>

      {/* Achievers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="rounded-3xl bg-white border border-zinc-200 overflow-hidden flex flex-col group hover:border-[#48A427]/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900" data-cursor="view">
                <Image
                  src={
                    ach.athleteImage ||
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop'
                  }
                  alt={ach.athleteName}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 filter grayscale contrast-125 group-hover:grayscale-0"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#48A427] text-white font-black text-xs uppercase tracking-wider shadow-lg font-mono">
                    {ach.rank}
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#48A427] uppercase font-bold tracking-wider mb-2 block">
                    {ach.category}
                  </span>
                  <h3 className="text-xl font-black text-zinc-950 uppercase tracking-wide group-hover:text-[#48A427] transition-colors mb-2 font-display">
                    {ach.athleteName}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-700 font-medium mb-4">
                    {ach.title}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-600">
                  <div className="flex items-center gap-1.5">
                    <Medal className="w-4 h-4 text-[#48A427]" />
                    <span>{ach.medal || 'National Ranking'}</span>
                  </div>
                  <span className="font-mono">{ach.year || '2024'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
