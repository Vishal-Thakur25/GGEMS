import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Award, ShieldCheck } from 'lucide-react';

interface TeamMemberItem {
  id: string;
  name: string;
  slug: string;
  role: string;
  experienceYears: number;
  qualifications: string;
  shortBio: string;
  profileImage?: string | null;
  achievements?: Array<{ id: string; title: string }>;
}

interface TeamSectionProps {
  team: TeamMemberItem[];
}

export default function TeamSection({ team }: TeamSectionProps) {
  // Take top featured members for homepage
  const featuredCoaches = team.slice(0, 4);

  return (
    <section id="team" className="py-24 sm:py-32 bg-zinc-50 relative overflow-hidden border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#48A427] text-xs font-bold tracking-widest uppercase mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LEADERSHIP & MENTORSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
              OUR ELITE COACHING TEAM
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-2xl">
              The core team evolves from a strong sports background with immense national playing
              experience, international certifications, and specialized fitness training skills.
            </p>
          </div>

          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#48A427] hover:text-[#3B8A1D] uppercase tracking-wider group shrink-0"
          >
            <span>View All 13 Coaches & Specialists</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Coaches Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCoaches.map((coach) => (
            <div
              key={coach.id}
              className="rounded-2xl bg-white border border-zinc-200 overflow-hidden flex flex-col group hover:border-[#48A427]/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
            >
              {/* Profile Photo */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                <Image
                  src={
                    coach.profileImage ||
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
                  }
                  alt={coach.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 filter grayscale contrast-125 group-hover:grayscale-0"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#48A427] border border-zinc-200 uppercase tracking-widest">
                    {coach.experienceYears}+ YEARS EXPERIENCE
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-zinc-950 uppercase tracking-wide group-hover:text-[#48A427] transition-colors">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#48A427] uppercase mt-1 mb-3">
                    {coach.role}
                  </p>
                  <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed mb-4">
                    {coach.shortBio}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-700 font-medium">
                    <Award className="w-3.5 h-3.5 text-[#48A427] shrink-0" />
                    <span className="truncate">{coach.qualifications}</span>
                  </div>
                  <Link
                    href={`/team/${coach.slug}`}
                    className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-zinc-100 hover:bg-[#48A427] text-zinc-800 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <span>Full Biography</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
