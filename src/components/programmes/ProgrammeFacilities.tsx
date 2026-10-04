'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface FacilityItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  displayOrder?: number;
  published?: boolean;
}

interface ProgrammeFacilitiesProps {
  eyebrow?: string | null;
  title?: string | null;
  facilitiesData?: string | null;
}

const defaultFacilities: FacilityItem[] = [
  {
    id: 'f1',
    title: 'Squash Courts',
    description: 'WSF certified glass-back championship courts with precision maple wood spring-flooring.',
    image: '/images/centers/gallery-squash.jpg',
    published: true,
  },
  {
    id: 'f2',
    title: 'Fitness Training',
    description: 'High performance functional gym, agility hurdles, core stability rigs and cardio endurance zones.',
    image: '/images/centers/gallery-fitness.jpg',
    published: true,
  },
  {
    id: 'f3',
    title: 'Training Sessions',
    description: 'Dedicated 1-on-1 coach sessions, technical video playback analysis and rapid feeding routines.',
    image: '/images/centers/hero-squash-court.jpg',
    published: true,
  },
  {
    id: 'f4',
    title: 'Group Classes',
    description: 'Competitive peer squads, matchplay leagues, group fitness circuits, and team camaraderie.',
    image: '/images/centers/gallery-club.jpg',
    published: true,
  },
];

export default function ProgrammeFacilities({
  eyebrow = 'OUR FACILITIES',
  title = 'World-Class Training Environment',
  facilitiesData,
}: ProgrammeFacilitiesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  let facilities: FacilityItem[] = defaultFacilities;
  if (facilitiesData) {
    try {
      const parsed = JSON.parse(facilitiesData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        facilities = parsed.filter((f) => f.published !== false);
      }
    } catch {
      // Keep defaults
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Format title: e.g. "World-Class Training Environment" -> "World-Class" in white, "Training Environment" in green
  const displayTitle = (title || 'World-Class Training Environment').trim();
  const words = displayTitle.split(/\s+/);
  let whitePart = 'World-Class';
  let greenPart = 'Training Environment';
  if (words.length > 1) {
    whitePart = words[0];
    greenPart = words.slice(1).join(' ');
  }

  return (
    <section className="w-full bg-[#111111] text-white py-20 sm:py-24 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-14">
          <div>
            <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#63D13F] block mb-2 sm:mb-3">
              {eyebrow || 'OUR FACILITIES'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading leading-tight">
              <span className="text-white">{whitePart} </span>
              <span className="text-[#63D13F]">{greenPart}</span>
            </h2>
          </div>

          {/* Slider Circular Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/40 flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
              aria-label="Previous facilities"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-zinc-950 hover:bg-[#63D13F] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
              aria-label="Next facilities"
            >
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Facilities Horizontal Cards Gallery */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {facilities.map((fac, idx) => (
            <motion.div
              key={fac.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[calc(25%-18px)] rounded-2xl overflow-hidden bg-[#181818] border border-white/10 group cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={fac.image || '/images/centers/gallery-squash.jpg'}
                  alt={fac.title}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
              </div>

              {/* Title Below Image */}
              <div className="p-5">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-heading group-hover:text-[#63D13F] transition-colors">
                  {fac.title}
                </h3>
                {fac.description && (
                  <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed font-normal line-clamp-2">
                    {fac.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
