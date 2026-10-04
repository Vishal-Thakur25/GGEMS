'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Activity,
  Trophy,
  Target,
  CircleDot,
  Dumbbell,
  Shield,
  X,
  CheckCircle2,
} from 'lucide-react';

export type SportCategory = 'All' | 'Racket Sports' | 'Field Sports' | 'Indoor Sports';

export interface SportItem {
  id: string;
  name: string;
  slug?: string;
  category: 'Racket Sports' | 'Field Sports' | 'Indoor Sports';
  description: string;
  image: string;
  iconType: string;
}

export const sportsData: SportItem[] = [
  {
    id: 'squash',
    name: 'SQUASH',
    slug: 'squash-training',
    category: 'Racket Sports',
    description:
      'Develops agility, speed, and endurance with specialized coaching in stroke play, footwork, and tactical strategies for competitive performance.',
    image: '/images/programs/sport-squash.jpg',
    iconType: 'racket',
  },
  {
    id: 'badminton',
    name: 'BADMINTON',
    slug: 'badminton-training',
    category: 'Racket Sports',
    description:
      'Structured badminton program ensures a clear developmental pathway that enhances skill, fitness, and competitiveness in players.',
    image: '/images/programs/sport-badminton.jpg',
    iconType: 'shuttlecock',
  },
  {
    id: 'table-tennis',
    name: 'TABLE TENNIS',
    slug: 'table-tennis',
    category: 'Racket Sports',
    description:
      'Skill development in techniques, footwork, and strategic play for all age groups.',
    image: '/images/programs/sport-table-tennis.jpg',
    iconType: 'pingpong',
  },
  {
    id: 'tennis',
    name: 'TENNIS',
    slug: 'tennis-training',
    category: 'Racket Sports',
    description:
      'Our tennis program is designed to improve serving, returns, court movement, and overall match strategy.',
    image: '/images/programs/sport-tennis.jpg',
    iconType: 'tennis',
  },
  {
    id: 'athletics',
    name: 'ATHLETICS',
    slug: 'athletics',
    category: 'Field Sports',
    description:
      'Training in running, jumping, and throwing events, focusing on speed, agility, and endurance.',
    image: '/images/programs/sport-athletics.jpg',
    iconType: 'athletics',
  },
  {
    id: 'basketball',
    name: 'BASKETBALL',
    slug: 'basketball',
    category: 'Indoor Sports',
    description:
      'We work on building fundamental basketball skills such as dribbling, shooting, defense, and basketball IQ.',
    image: '/images/programs/sport-basketball.jpg',
    iconType: 'basketball',
  },
  {
    id: 'gymnastics',
    name: 'GYMNASTICS',
    slug: 'gymnastics',
    category: 'Indoor Sports',
    description:
      'Focuses on balance, flexibility, and strength, training athletes in various gymnastic routines and competitions.',
    image: '/images/programs/sport-gymnastics.jpg',
    iconType: 'gymnastics',
  },
  {
    id: 'chess',
    name: 'CHESS',
    slug: 'chess',
    category: 'Indoor Sports',
    description:
      'Sharpens cognitive skills, concentration, and decision-making abilities through structured coaching and analytical gameplay.',
    image: '/images/programs/sport-chess.jpg',
    iconType: 'chess',
  },
  {
    id: 'football',
    name: 'FOOTBALL',
    slug: 'football',
    category: 'Field Sports',
    description:
      'Comprehensive football coaching enhancing tactical acumen, ball control, team coordination, and match fitness.',
    image: '/images/programs/sport-football.jpg',
    iconType: 'football',
  },
  {
    id: 'swimming',
    name: 'SWIMMING',
    slug: 'swimming',
    category: 'Indoor Sports',
    description:
      'Structured aquatic training developing stroke efficiency, cardiovascular endurance, and competitive swimming techniques.',
    image: '/images/programs/sport-swimming.jpg',
    iconType: 'swimming',
  },
  {
    id: 'cricket',
    name: 'CRICKET',
    slug: 'cricket',
    category: 'Field Sports',
    description:
      'Holistic cricket coaching focusing on batting, bowling, fielding mechanics, and mental fortitude under match pressure.',
    image: '/images/programs/sport-cricket.jpg',
    iconType: 'cricket',
  },
  {
    id: 'yoga',
    name: 'YOGA',
    slug: 'yoga',
    category: 'Indoor Sports',
    description:
      'Improves flexibility, breathing control, core stability, and mental focus to complement athletic performance.',
    image: '/images/programs/sport-yoga.jpg',
    iconType: 'yoga',
  },
  {
    id: 'self-defence',
    name: 'SELF DEFENCE',
    slug: 'self-defence',
    category: 'Indoor Sports',
    description:
      'Practical martial arts and self-defence techniques designed to build reflexes, situational awareness, and confidence.',
    image: '/images/programs/sport-self-defence.jpg',
    iconType: 'shield',
  },
  {
    id: 'skating',
    name: 'SKATING',
    slug: 'skating',
    category: 'Indoor Sports',
    description:
      'Foundational to advanced roller and inline skating coaching enhancing balance, speed, and agility.',
    image: '/images/programs/sport-skating.jpg',
    iconType: 'skating',
  },
  {
    id: 'shooting',
    name: 'SHOOTING',
    slug: 'shooting',
    category: 'Indoor Sports',
    description:
      'Precision shooting sports training cultivating extreme concentration, breath control, and steadiness under pressure.',
    image: '/images/programs/sport-shooting.jpg',
    iconType: 'target',
  },
];

interface SportsOfferingProps {
  label?: string;
  headline?: string;
  description?: string;
  programs?: any[];
}

export default function SportsOffering({
  label = 'SPORTS OFFERING',
  headline = 'Explore Our Sports Programmes',
  description = 'At GGems Sports, we are committed to offering comprehensive training programs across a variety of sports. Our mission is to help athletes hone their skills, develop a love for the game, and excel both on and off the field.',
  programs,
}: SportsOfferingProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSport, setSelectedSport] = useState<SportItem | null>(null);

  // Use dynamic programs from database when provided
  const activeSports: SportItem[] =
    programs && programs.length > 0
      ? programs.map((p) => ({
          id: p.id,
          name: p.title,
          slug: p.slug,
          category: (p.category || 'Racket Sports') as any,
          description: p.shortDescription || p.heroDescription || p.trainingFocus || '',
          image: p.heroImage || p.featuredImage || '/images/Dynamic-Squash-Court-Action.png',
          iconType: (p.category || '').toLowerCase().includes('field')
            ? 'athletics'
            : (p.category || '').toLowerCase().includes('indoor')
            ? 'gymnastics'
            : 'racket',
        }))
      : sportsData;

  const categories = [
    'All',
    ...Array.from(new Set(activeSports.map((s) => s.category || 'Racket Sports'))),
  ];

  const filteredSports =
    activeCategory === 'All'
      ? activeSports
      : activeSports.filter((sport) => sport.category === activeCategory);

  const getSportBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case 'racket':
      case 'tennis':
      case 'shuttlecock':
      case 'pingpong':
        return <Activity className="w-4 h-4 text-white" />;
      case 'athletics':
        return <Trophy className="w-4 h-4 text-white" />;
      case 'basketball':
      case 'football':
      case 'cricket':
        return <CircleDot className="w-4 h-4 text-white" />;
      case 'target':
        return <Target className="w-4 h-4 text-white" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-white" />;
      case 'yoga':
      case 'gymnastics':
      case 'swimming':
      case 'chess':
      default:
        return <Sparkles className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section className="w-full bg-white py-20 sm:py-24 lg:py-28 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Row with Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-14 border-b border-zinc-100">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#63D13F] mb-3 block font-mono">
              {label}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 uppercase tracking-tight leading-[1.08] mb-4 font-heading">
              {headline}
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal">
              {description}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 shrink-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#63D13F] text-white shadow-md shadow-[#63D13F]/25 font-extrabold'
                      : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200/80 hover:border-zinc-300'
                  }`}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sports Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 pt-12"
        >
          <AnimatePresence>
            {filteredSports.map((sport) => {
              const detailHref = `/programmes/${sport.slug || sport.id + '-training'}`;
              return (
                <Link
                  key={sport.id}
                  href={detailHref}
                  className="block h-full"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl border border-zinc-200/90 hover:border-[#63D13F]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer h-full"
                  >
                    {/* Card Media Header */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-100">
                      <Image
                        src={sport.image}
                        alt={sport.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                      {/* Sport Badge Icon (Lower Left of Image) */}
                      <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[#63D13F] flex items-center justify-center shadow-md">
                        {getSportBadgeIcon(sport.iconType)}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-black uppercase text-zinc-950 tracking-tight mb-2.5 font-heading group-hover:text-[#63D13F] transition-colors">
                          {sport.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal line-clamp-3">
                          {sport.description}
                        </p>
                      </div>

                      {/* Circular Arrow Button (Bottom Right) */}
                      <div className="flex items-center justify-between pt-5 border-t border-zinc-100 mt-4">
                        <span className="text-xs font-bold text-[#63D13F] group-hover:text-[#45B52D] uppercase tracking-wider">
                          View Programme
                        </span>
                        <div className="w-8 h-8 rounded-full border border-zinc-300 group-hover:border-[#63D13F] group-hover:bg-[#63D13F] flex items-center justify-center text-zinc-600 group-hover:text-white transition-all duration-200">
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Sport Detail / Enquiry Modal */}
      <AnimatePresence>
        {selectedSport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSport(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-200"
            >
              <div className="relative aspect-video w-full bg-zinc-900">
                <Image
                  src={selectedSport.image}
                  alt={selectedSport.name}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedSport(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#63D13F] text-white text-xs font-bold uppercase tracking-wider">
                  {selectedSport.category}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-black uppercase text-zinc-950 tracking-tight mb-3 font-heading">
                  {selectedSport.name} PROGRAMME
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-normal">
                  {selectedSport.description}
                </p>

                <div className="space-y-2.5 mb-7">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-[#63D13F] shrink-0" />
                    <span>Certified professional coaches & structured developmental pathway</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-[#63D13F] shrink-0" />
                    <span>State-of-the-art courts & facilities across Delhi NCR</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-[#63D13F] shrink-0" />
                    <span>Regular matches, internal tournaments, and ranking exposure</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href={`/programmes/${selectedSport.slug || selectedSport.id + '-training'}`}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#63D13F]/25"
                  >
                    <span>View Full Programme</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-zinc-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Enquire</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedSport(null)}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
