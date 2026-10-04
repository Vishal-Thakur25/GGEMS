'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import VideoModal from '@/components/about/VideoModal';
import { resolveProgrammeIcon } from './IconResolver';

export interface AudienceItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  displayOrder?: number;
  published?: boolean;
}

interface ProgrammeOverviewProps {
  label?: string | null;
  title?: string | null;
  description?: string | null;
  secondaryDescription?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  whoCanJoinTitle?: string | null;
  audienceData?: string | null;
}

const defaultAudience: AudienceItem[] = [
  { id: 'a1', title: 'Kids (6+ Years)', icon: 'Smile', published: true },
  { id: 'a2', title: 'School Students', icon: 'GraduationCap', published: true },
  { id: 'a3', title: 'College Students', icon: 'BookOpen', published: true },
  { id: 'a4', title: 'Working Professionals', icon: 'Briefcase', published: true },
  { id: 'a5', title: 'Competitive Players', icon: 'Trophy', published: true },
];

export default function ProgrammeOverview({
  label = 'PROGRAMME OVERVIEW',
  title = 'About Squash Training',
  description = 'Our Squash Training programme provides a structured and progressive learning environment for players of all levels. Whether you are a beginner or an advanced player, our certified coaches focus on building strong fundamentals, improving game strategy and enhancing overall fitness.',
  secondaryDescription = 'We follow a holistic development approach that combines on-court training, fitness conditioning, mental preparation and regular match practice to help players perform at their best in competitive tournaments.',
  imageUrl,
  videoUrl,
  ctaText = 'Join the Programme',
  ctaLink = '/contact',
  whoCanJoinTitle = 'WHO CAN JOIN?',
  audienceData,
}: ProgrammeOverviewProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Parse audience items
  let audienceList: AudienceItem[] = defaultAudience;
  if (audienceData) {
    try {
      const parsed = JSON.parse(audienceData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        audienceList = parsed.filter((item) => item.published !== false);
      }
    } catch {
      // Keep defaults
    }
  }

  const effectiveImage = imageUrl || '/images/about/story-squash-court.jpg';
  const effectiveVideo = videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  return (
    <section className="w-full bg-white py-20 sm:py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Column 1 (Left): Large Training Action Media */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[1/1] w-full rounded-3xl overflow-hidden shadow-xl border border-zinc-200/80 bg-zinc-950 group">
              <Image
                src={effectiveImage}
                alt={title || 'Programme Overview'}
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Floating "Watch Training Session" Action Pill (Exact Match to Reference) */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-center gap-3.5 p-2 sm:p-2.5 pr-4 sm:pr-5 rounded-2xl bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all duration-200 cursor-pointer shadow-lg group/btn text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-zinc-950 flex items-center justify-center group-hover/btn:scale-110 transition-transform shrink-0">
                  <Play className="w-4 h-4 fill-current ml-0.5 text-zinc-950" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-tight text-white leading-tight">
                    Watch Training Session
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-zinc-300 font-normal">
                    See our coaching in action
                  </p>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Column 2 (Middle): Overview Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#63D13F] block mb-2 sm:mb-3">
                {label || 'PROGRAMME OVERVIEW'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-zinc-950 font-heading tracking-tight leading-tight mb-5 sm:mb-6">
                {title || 'About Squash Training'}
              </h2>
              <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed font-normal">
                <p>{description}</p>
                {secondaryDescription && <p>{secondaryDescription}</p>}
              </div>
            </div>

            <div className="pt-8">
              <Link
                href={ctaLink || '/contact'}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl bg-[#63D13F] hover:bg-[#45B52D] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#63D13F]/25 hover:shadow-xl transition-all duration-200"
              >
                <span>{ctaText || 'Join the Programme'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </motion.div>

          {/* Column 3 (Right): "WHO CAN JOIN?" Green Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-[#EEF8EA] rounded-2xl p-6 sm:p-7 border border-[#63D13F]/30 shadow-xs">
              <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#45B52D] block mb-5">
                {whoCanJoinTitle || 'WHO CAN JOIN?'}
              </span>

              <ul className="space-y-3.5">
                {audienceList.map((item, idx) => (
                  <li
                    key={item.id || idx}
                    className="flex items-center gap-3 text-xs sm:text-sm font-bold text-zinc-900"
                  >
                    <div className="w-7 h-7 rounded-full bg-white text-[#45B52D] flex items-center justify-center shrink-0 shadow-xs">
                      {resolveProgrammeIcon(item.icon, 'w-4 h-4')}
                    </div>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal */}
      {effectiveVideo && (
        <VideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl={effectiveVideo}
          title="Training Session in Action"
        />
      )}
    </section>
  );
}
