'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, X } from 'lucide-react';
import { CenterItem } from '../types';

interface CenterAboutSectionProps {
  center: CenterItem;
}

export default function CenterAboutSection({ center }: CenterAboutSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const label = center.aboutLabel || 'ABOUT THE SCHOOL';
  const heading = center.aboutHeading || 'Excellence in Education & Sports';

  // Format two-tone heading: split into two lines / colors if possible
  const headingWords = heading.trim().split(' ');
  let headLine1 = heading;
  let headLine2 = '';

  if (headingWords.length >= 4) {
    const half = Math.ceil(headingWords.length / 2);
    headLine1 = headingWords.slice(0, half).join(' ');
    headLine2 = headingWords.slice(half).join(' ');
  } else if (heading.toLowerCase().includes('excellence in')) {
    headLine1 = 'Excellence in';
    headLine2 = heading.replace(/excellence in/i, '').trim();
  }

  const defaultDesc = `${center.name} is a reputed institution known for its academic excellence and state-of-the-art sports facilities. The school provides a nurturing environment where students learn, grow and explore their potential in academics as well as sports.\n\nIn collaboration with GGems Sports Academy, the school offers structured sports training programmes, especially in Squash and Badminton, helping students build essential skills, discipline and a healthy lifestyle.`;

  const descriptionText = center.aboutDescription || defaultDesc;
  const paragraphs = descriptionText.split(/\n\s*\n|\n/).filter((p) => p.trim());

  const facilityImage =
    center.aboutImage || '/images/about/story-squash-court.jpg';
  const videoUrl = center.videoUrl;

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Eyebrow, Heading, Paragraphs, CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase mb-3 block font-heading">
              {label}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.12] uppercase font-heading mb-6">
              <span className="text-zinc-950 block">{headLine1}</span>
              {headLine2 && <span className="text-[#63D13F] block">{headLine2}</span>}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#666666] leading-relaxed font-normal mb-8 max-w-xl">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {center.websiteUrl && (
              <div>
                <a
                  href={center.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Visit School Website</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Right Column: Facility/Court Image with Video Play Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/90 shadow-xl bg-zinc-900 group">
              <Image
                src={facilityImage}
                alt={`${center.name} sports facility`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
              />

              {/* Translucent Play Button Overlay matching reference */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  aria-label="Play facility video tour"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-white text-white ml-1" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="flex items-center justify-between p-4 bg-zinc-950 border-b border-white/10">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {center.name} - Facility Tour
                </span>
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full bg-zinc-950">
                {videoUrl && videoUrl.includes('youtube') ? (
                  <iframe
                    src={
                      videoUrl.includes('embed')
                        ? videoUrl
                        : videoUrl.replace('watch?v=', 'embed/')
                    }
                    title="Facility Tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <Image
                      src={facilityImage}
                      alt="Facility"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
