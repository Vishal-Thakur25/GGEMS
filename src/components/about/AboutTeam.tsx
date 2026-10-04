'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface TeamMemberItem {
  id?: string;
  name: string;
  slug: string;
  role: string;
  shortBio?: string;
  profileImage?: string | null;
}

interface AboutTeamProps {
  label?: string;
  title?: string;
  description?: string;
  members?: TeamMemberItem[];
}

export default function AboutTeam({
  label = 'OUR TEAM',
  title = 'Meet the People Behind GGems',
  description = 'Our team of certified coaches and sports professionals work tirelessly to provide the best training, guidance and support to every player.',
  members,
}: AboutTeamProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const defaultMembers: TeamMemberItem[] = [
    {
      name: 'Gyanendra Prajapati',
      slug: 'gyanendra-prajapati',
      role: 'Founder & CEO',
      shortBio: '20+ years of experience in squash coaching and sports development.',
      profileImage: '/images/about/founder-gyanendra.jpg',
    },
    {
      name: 'Aakash Sharma',
      slug: 'aakash-sharma',
      role: 'Head Squash Coach & Advisor',
      shortBio: 'National Bronze Medalist (2024) and WSF certified coach.',
      profileImage: '/images/about/coach-aakash-sharma.jpg',
    },
    {
      name: 'Dushyant Singh',
      slug: 'dushyant-singh',
      role: 'Senior Coach Consultant',
      shortBio: '30+ years of coaching experience with outstanding playing career.',
      profileImage: '/images/about/coach-dushyant-singh.jpg',
    },
    {
      name: 'Rahul Verma',
      slug: 'rahul-verma',
      role: 'Fitness & Conditioning Coach',
      shortBio: 'Specialist in athlete fitness and injury prevention.',
      profileImage: '/images/about/coach-rahul-verma.jpg',
    },
  ];

  // Merge database team members with default display list
  const activeMembers = members && members.length > 0 ? members : defaultMembers;

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white relative overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-bold text-[#4CAF35] tracking-[0.2em] uppercase mb-3 block font-heading"
            >
              {label}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[42px] font-black text-zinc-950 tracking-tight leading-[1.1] font-heading"
            >
              {title}
            </motion.h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8">
            <p className="text-xs sm:text-sm text-zinc-600 max-w-sm leading-relaxed font-normal">
              {description}
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/team"
                className="text-xs font-bold text-[#4CAF35] hover:text-[#3B8A1D] flex items-center gap-1.5 transition-colors uppercase tracking-wider font-heading"
              >
                <span>View All Team Members</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleScroll('left')}
                  aria-label="Scroll Team Left"
                  className="w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center hover:bg-[#6CD34A] hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScroll('right')}
                  aria-label="Scroll Team Right"
                  className="w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center hover:bg-[#6CD34A] hover:text-black transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid / Mobile Horizontal Scroll */}
        <div
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none snap-x"
        >
          {activeMembers.map((member, idx) => {
            const fallbackImage =
              idx === 0
                ? '/images/about/founder-gyanendra.jpg'
                : idx === 1
                ? '/images/about/coach-aakash-sharma.jpg'
                : idx === 2
                ? '/images/about/coach-dushyant-singh.jpg'
                : '/images/about/coach-rahul-verma.jpg';

            return (
              <motion.div
                key={member.slug || member.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                whileHover={{ y: -6 }}
                className="min-w-[270px] sm:min-w-[290px] lg:min-w-0 bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between snap-start"
              >
                <div>
                  {/* Portrait Container with Top-Right Green Diagonal Arrow */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={member.profileImage || fallbackImage}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top Right Circular Green Arrow Badge */}
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#6CD34A] text-black flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-zinc-950 font-heading leading-tight group-hover:text-[#4CAF35] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium mt-1">
                      {member.role}
                    </p>
                    <p className="text-xs text-zinc-600 mt-2.5 line-clamp-2 leading-relaxed font-normal">
                      {member.shortBio || 'Certified coach with extensive player development credentials.'}
                    </p>
                  </div>
                </div>

                {/* Bottom Toggle / Expand Arrow */}
                <div className="px-5 pb-5 pt-0 flex justify-end">
                  <Link
                    href={`/team/${member.slug}`}
                    className="w-6 h-6 rounded-full bg-zinc-100 group-hover:bg-[#EAF6E5] text-zinc-600 group-hover:text-[#4CAF35] flex items-center justify-center transition-colors"
                    aria-label={`View ${member.name} profile`}
                  >
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
