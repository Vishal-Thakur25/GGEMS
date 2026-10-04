import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMemberBySlug, getTeamMembers } from '@/server/queries';
import { ArrowLeft, ArrowUpRight, Award, ShieldCheck, CheckCircle2, Trophy } from 'lucide-react';

interface CoachPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CoachPageProps): Promise<Metadata> {
  const { slug } = await params;
  const coach = await getTeamMemberBySlug(slug);

  if (!coach) {
    return { title: 'Coach Not Found' };
  }

  return {
    title: `${coach.name} | GGems Squash Academy Coach`,
    description: coach.shortBio,
    openGraph: {
      title: `${coach.name} | GGems Squash Academy`,
      description: coach.shortBio,
      images: coach.profileImage ? [{ url: coach.profileImage }] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const coaches = await getTeamMembers(true);
    return coaches.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export default async function CoachDetailPage({ params }: CoachPageProps) {
  const { slug } = await params;
  const coach = await getTeamMemberBySlug(slug);

  if (!coach || coach.status !== 'PUBLISHED') {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-[#48A427] uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Coaching Panel</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12">
          {/* Photo Column */}
          <div className="md:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl bg-zinc-900">
            <Image
              src={
                coach.profileImage ||
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
              }
              alt={coach.name}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#48A427] text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                {coach.role}
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 uppercase tracking-tight mb-2 font-display">
                {coach.name}
              </h1>

              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 mb-6">
                <Award className="w-4 h-4 text-[#48A427]" />
                <span>{coach.qualifications}</span>
                <span className="text-zinc-400">•</span>
                <span className="text-[#48A427] font-bold">{coach.experienceYears}+ Years Coaching</span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 mb-6 text-xs text-zinc-700">
                <strong className="text-zinc-950 block uppercase mb-1">Area of Specialization:</strong>
                <span>{coach.specialization}</span>
              </div>

              <div className="prose max-w-none text-xs sm:text-sm text-zinc-700 leading-relaxed mb-6">
                <p>{coach.fullBio}</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#48A427] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#3B8A1D] transition-colors self-start shadow-md shadow-[#48A427]/25"
            >
              <span>Train Under Coach {coach.name.split(' ')[0]}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Coach Achievements & Career Highlights */}
        {coach.achievements && coach.achievements.length > 0 && (
          <div className="p-8 rounded-3xl bg-[#0B0F13] border border-white/10 mb-12 text-white shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#48A427] uppercase mb-6 font-display tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>Career Milestones & Accolades</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coach.achievements.map((ach) => (
                <div key={ach.id} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#48A427] shrink-0 mt-0.5" />
                  <span>{ach.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
