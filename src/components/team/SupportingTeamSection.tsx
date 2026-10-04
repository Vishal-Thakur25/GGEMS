'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';
import { SupportingMemberItem } from './types';

interface SupportingTeamSectionProps {
  members?: SupportingMemberItem[];
}

const DEFAULT_SUPPORTING: SupportingMemberItem[] = [
  {
    id: 'supp-1',
    name: 'Sanjeev Kumar',
    role: 'Squash Coach',
    description: 'Presently working at BLS World School, Greater Noida West. Playing for UP last 5 years.',
    image: '/images/about/coach-1-thumb.png',
    slug: 'sanjeev-kumar',
  },
  {
    id: 'supp-2',
    name: 'Raj Yadav',
    role: 'Squash Coach',
    description: 'Currently serving as a Squash Coach at Jaypee Sports Complex.',
    image: '/images/about/coach-2-thumb.png',
    slug: 'raj-yadav',
  },
  {
    id: 'supp-3',
    name: 'And More',
    description: 'Our extended coaching team continues to guide and support athletes across all our centers.',
    slug: 'contact',
  },
];

export default function SupportingTeamSection({ members = DEFAULT_SUPPORTING }: SupportingTeamSectionProps) {
  const displayList = members.length > 0 ? members : DEFAULT_SUPPORTING;

  return (
    <section className="w-full bg-[#F7FAF5] py-16 sm:py-20 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Label */}
        <div className="mb-8">
          <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase block font-heading">
            SUPPORTING TEAM
          </span>
        </div>

        {/* 3 Horizontal Cards in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayList.map((member, idx) => {
            const isAndMore = member.name === 'And More';
            const linkHref = isAndMore ? '/contact' : `/team/${member.slug || ''}`;

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={linkHref}
                  className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#63D13F]/60 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  {/* Left Avatar Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-100 shrink-0 relative flex items-center justify-center border border-zinc-100">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="80px"
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-200/80 flex items-center justify-center text-zinc-400 group-hover:text-[#63D13F] transition-colors">
                        <User className="w-8 h-8 stroke-[1.8]" />
                      </div>
                    )}
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 flex flex-col justify-center min-w-0 pr-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-zinc-950 font-heading leading-tight group-hover:text-[#45B52D] transition-colors">
                          {member.name}
                        </h4>
                        {member.role && (
                          <span className="text-[11px] font-semibold text-[#666666] block mt-0.5">
                            {member.role}
                          </span>
                        )}
                      </div>

                      {/* Small circular arrow button */}
                      <div className="w-6 h-6 rounded-full border border-zinc-200 group-hover:border-[#63D13F] group-hover:bg-[#63D13F] flex items-center justify-center shrink-0 transition-colors">
                        <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed mt-2 line-clamp-2">
                      {member.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
