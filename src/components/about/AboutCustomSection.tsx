'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import VideoModal from '@/components/about/VideoModal';

interface AboutCustomSectionProps {
  label?: string | null;
  title: string;
  content?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaUrl?: string | null;
}

export default function AboutCustomSection({
  label,
  title,
  content,
  imageUrl,
  videoUrl,
  ctaLabel,
  ctaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
}: AboutCustomSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const paragraphs = content ? content.split('\n\n').filter(Boolean) : [];
  const hasMedia = Boolean(imageUrl || videoUrl);

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white relative overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${hasMedia ? 'lg:grid-cols-12 gap-12 lg:gap-16 items-center' : 'max-w-3xl mx-auto text-center'}`}>
          {/* Media Column (if present) */}
          {hasMedia && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative group"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-zinc-200/80 bg-zinc-950">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-500">
                    <Play className="w-12 h-12 stroke-1" />
                  </div>
                )}

                {videoUrl && (
                  <>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <button
                      type="button"
                      onClick={() => setIsVideoOpen(true)}
                      aria-label="Play video"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#4CAF35] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 active:scale-95 z-10"
                    >
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={hasMedia ? 'lg:col-span-6 flex flex-col items-start' : 'flex flex-col items-center'}
          >
            {label && (
              <span className="text-xs sm:text-sm font-bold text-[#4CAF35] tracking-[0.2em] uppercase mb-3 block font-heading">
                {label}
              </span>
            )}

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-zinc-950 tracking-tight leading-[1.1] mb-6 font-heading">
              {title}
            </h2>

            {paragraphs.length > 0 && (
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal mb-8">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {/* CTAs */}
            {(ctaLabel || secondaryCtaLabel || (videoUrl && !imageUrl)) && (
              <div className={`flex flex-wrap items-center gap-4 ${!hasMedia ? 'justify-center' : ''}`}>
                {ctaLabel && ctaUrl && (
                  <Link
                    href={ctaUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4CAF35] hover:bg-[#3E9228] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-[#4CAF35]/25 hover:shadow-lg active:scale-[0.98] group"
                  >
                    <span>{ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                )}

                {secondaryCtaLabel && secondaryCtaUrl && (
                  <Link
                    href={secondaryCtaUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs sm:text-sm tracking-wide transition-colors"
                  >
                    <span>{secondaryCtaLabel}</span>
                  </Link>
                )}

                {videoUrl && !imageUrl && (
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-zinc-300 hover:border-zinc-400 text-zinc-800 font-bold text-xs sm:text-sm tracking-wide"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Video</span>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
        title={title}
      />
    </section>
  );
}
