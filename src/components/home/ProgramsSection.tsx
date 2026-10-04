'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface ProgramItem {
  id: string;
  title: string;
  slug: string;
  ageGroup?: string;
  skillLevel?: string;
  duration?: string;
  shortDescription?: string;
  featuredImage?: string | null;
}

interface ProgramsSectionProps {
  programs?: ProgramItem[];
}

export default function ProgramsSection({ programs }: ProgramsSectionProps) {
  const defaultPrograms = [
    {
      id: 'p1',
      title: 'Beginner Programme',
      slug: 'beginners-program',
      description: 'Learn the fundamentals in a fun and structured environment.',
      image:
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'p2',
      title: 'Intermediate Programme',
      slug: 'junior-advance-program',
      description: 'Develop skills, fitness and match awareness.',
      image:
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'p3',
      title: 'Competitive Programme',
      slug: 'development-program',
      description: 'Regular match practice and tournament exposure.',
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'p4',
      title: 'High Performance',
      slug: 'professional-program',
      description: 'Pathway to State, National and International levels.',
      image:
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const itemsToDisplay =
    programs && programs.length > 0
      ? programs.slice(0, 4).map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          description: p.shortDescription || 'Professional coaching programme designed for athletes.',
          image:
            p.featuredImage ||
            'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop',
        }))
      : defaultPrograms;

  return (
    <section id="programmes" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-8 items-start">
          {/* Left Column: Heading and Intro */}
          <div className="xl:col-span-4 flex flex-col items-start pr-0 xl:pr-4">
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#48A427] uppercase mb-3 block">
              OUR PROGRAMMES
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 font-display leading-[1.05] mb-5">
              From Beginner
              <br />
              to <span className="text-[#48A427]">High Performance.</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mb-8 max-w-md">
              Structured coaching programmes designed for every stage of a player&apos;s journey,
              with professional coaching, fitness, match practice and tournament exposure.
            </p>

            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#48A427] hover:bg-[#3B8A1D] text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-[#48A427]/20 hover:shadow-lg hover:shadow-[#48A427]/30"
            >
              <span>Explore All Programmes</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>

          {/* Right Column: 4 Programme Cards */}
          <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {itemsToDisplay.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-white border border-zinc-200/90 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#48A427]/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black text-zinc-950 font-display uppercase tracking-wide group-hover:text-[#48A427] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-end">
                    <Link
                      href={`/programs/${item.slug}`}
                      className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 group-hover:bg-[#48A427] group-hover:border-[#48A427] group-hover:text-white transition-all duration-200"
                      aria-label={`View ${item.title}`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
