'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, BookOpen, Users, TrendingUp, Award, CheckCircle2 } from 'lucide-react';
import VideoModal from '@/components/about/VideoModal';

export interface StoryFeature {
  title: string;
  icon?: string;
}

interface AboutStoryProps {
  label?: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string | null;
  features?: StoryFeature[];
}

export default function AboutStory({
  label = 'OUR STORY',
  title = 'Passion for Sports. Commitment to Excellence.',
  content = `GGems Sports Academy was founded with a simple vision — to create a platform where young athletes can discover their potential, develop their skills and compete at higher levels.\n\nWith a strong focus on discipline, fitness and mental strength, we provide professional coaching and world-class facilities to help players excel in squash and beyond.`,
  imageUrl = '/images/about/story-squash-court.jpg',
  videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  features,
}: AboutStoryProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(Boolean);

  const defaultFeatures: StoryFeature[] = [
    {
      icon: 'book',
      title: 'Structured Programmes',
    },
    {
      icon: 'users',
      title: 'Experienced Coaches',
    },
    {
      icon: 'chart',
      title: 'Focus on Overall Development',
    },
  ];

  const activeFeatures = features && features.length > 0 ? features : defaultFeatures;

  const getFeatureIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'book':
        return BookOpen;
      case 'users':
        return Users;
      case 'chart':
      case 'trending':
        return TrendingUp;
      case 'award':
      case 'medal':
        return Award;
      default:
        return CheckCircle2;
    }
  };

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Documentary Image with Centered Play Button & "Watch Our Story" Pill */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative group"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-zinc-200/80 bg-zinc-950">
              {/* Main Image with Zoom on Hover */}
              <Image
                src={imageUrl}
                alt="Inside GGems Squash Academy Courts"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle Darkening Overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />

              {/* Centered Circular White Play Button with Green Icon */}
              <button
                onClick={() => setIsVideoOpen(true)}
                aria-label="Play GGems Academy Story Video"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#6CD34A] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 active:scale-95 z-10"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
              </button>

              {/* Bottom Floating Badge: "Watch Our Story" */}
              <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-white/10 text-white shadow-xl pointer-events-none">
                <div className="w-7 h-7 rounded-full bg-[#6CD34A] flex items-center justify-center text-black">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Watch</span>
                  <span className="text-xs font-bold text-white uppercase font-heading">Our Story</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text & Feature Points */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Green Eyebrow Label */}
            <span className="text-xs sm:text-sm font-bold text-[#6CD34A] tracking-[0.2em] uppercase mb-3 block font-heading">
              {label}
            </span>

            {/* Editorial Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-zinc-950 tracking-tight leading-[1.1] mb-6 font-heading">
              {title}
            </h2>

            {/* Body Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal mb-8">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Supporting Feature Badges with Green Line Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-zinc-100 w-full">
              {activeFeatures.map((feat, idx) => {
                const Icon = getFeatureIcon(feat.icon);
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                    className="flex flex-col items-start gap-2.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#EAF6E5] flex items-center justify-center text-[#6CD34A] group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug font-heading">
                      {feat.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal Component */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
        title="GGems Sports Academy Story"
      />
    </section>
  );
}
