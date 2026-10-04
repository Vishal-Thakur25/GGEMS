'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, X, Mouse } from 'lucide-react';

interface HeroProps {
  hero: {
    badgeText?: string;
    headline?: string;
    subHeadline?: string;
    description?: string;
    primaryCtaText?: string;
    primaryCtaUrl?: string;
    secondaryCtaText?: string;
    secondaryCtaUrl?: string;
    callNowPhone?: string;
    mediaType?: string;
    imageUrl?: string | null;
    videoUrl?: string | null;
    backgroundOverlayOpacity?: number;
    alignment?: string;
  };
}

export default function Hero({ hero }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const slides = [
    {
      id: 1,
      badge: 'DISCIPLINE  /  DEVELOPMENT  /  CHAMPIONSHIP',
      line1: 'TRAIN.',
      line2: 'COMPETE.',
      highlight: 'EXCEL.',
      description:
        'Professional squash coaching and athlete development for beginners, competitive players and high-performance athletes.',
      tagTitle: 'MORE THAN A SPORT',
      tagSubtitle: 'A BETTER YOU',
    },
    {
      id: 2,
      badge: 'GRASSROOTS  /  PATHWAY  /  EXCELLENCE',
      line1: 'FOCUS.',
      line2: 'ENDURE.',
      highlight: 'TRIUMPH.',
      description:
        'State-of-the-art squash court facilities and certified WSF master coaches building champions across Delhi NCR.',
      tagTitle: 'PASSION MEETS',
      tagSubtitle: 'DISCIPLINE',
    },
    {
      id: 3,
      badge: 'SPEED  /  PRECISION  /  STRATEGY',
      line1: 'POWER.',
      line2: 'AGILITY.',
      highlight: 'VICTORY.',
      description:
        'Periodized sports science, match simulations, and national circuit pathways engineered for junior and senior players.',
      tagTitle: 'ENGINEERED FOR',
      tagSubtitle: 'CHAMPIONS',
    },
  ];

  const currentSlide = slides[activeSlide];

  return (
    <section className="relative min-h-[680px] md:min-h-[720px] lg:min-h-[820px] w-full flex items-center overflow-hidden bg-white border-b border-zinc-200 pt-24 sm:pt-28 pb-16 lg:pt-32 lg:pb-20">
      {/* Hero Background Responsive Images */}
      <div className="absolute inset-0 z-0">
        {/* Desktop / Tablet Background Image */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/Dynamic-Squash-Court-Action.png"
            alt="GGems Squash Court Athlete in Action"
            fill
            priority
            sizes="100vw"
            quality={95}
            className="object-cover object-right md:object-right-bottom select-none pointer-events-none"
          />
          {/* Left side gradient to ensure typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent max-w-3xl pointer-events-none" />
        </div>

        {/* Mobile View Background Image (Vertical Action Poster) */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/images/Dynamic_Squash_Court_Action_Poster_mobile-view.png"
            alt="GGems Squash Court Athlete Mobile View"
            fill
            priority
            sizes="100vw"
            quality={95}
            className="object-cover object-bottom select-none pointer-events-none"
          />
          {/* Top-to-bottom soft white gradient to guarantee crisp readability on mobile text */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/75 via-45% to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Tagline / Eyebrow */}
            <div className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-zinc-500 uppercase mb-4 flex items-center gap-2">
              <span>{currentSlide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[82px] xl:text-[92px] font-black uppercase tracking-tight leading-[0.92] text-zinc-950 font-display select-none">
              {currentSlide.line1}
              <br />
              {currentSlide.line2}
              <br />
              <span className="text-[#48A427]">{currentSlide.highlight}</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-700 font-medium leading-relaxed max-w-lg mt-6 mb-8">
              {currentSlide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#48A427] hover:bg-[#3B8A1D] text-white font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#48A427]/25 hover:shadow-xl hover:shadow-[#48A427]/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 hover:border-zinc-400 shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Bottom Row: Social Proof + Slide Indicators */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 pt-5 border-t border-zinc-200/90 w-full max-w-lg">
              {/* Overlapping Avatars & Player count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white overflow-hidden bg-zinc-200 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                      alt="Player"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white overflow-hidden bg-zinc-200 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                      alt="Player"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white overflow-hidden bg-zinc-200 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
                      alt="Player"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white overflow-hidden bg-zinc-200 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=120&auto=format&fit=crop"
                      alt="Player"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="leading-tight">
                  <span className="font-black text-zinc-950 text-base block font-display">
                    260+
                  </span>
                  <span className="text-[11px] text-zinc-600 font-semibold tracking-wide">
                    Active Squash Players
                  </span>
                </div>
              </div>

              {/* Slide Number Indicators */}
              <div className="flex items-center gap-3 text-xs font-mono">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`transition-all duration-300 flex items-center gap-1.5 ${
                      activeSlide === idx
                        ? 'font-bold text-zinc-950 scale-105'
                        : 'text-zinc-400 hover:text-zinc-700'
                    }`}
                  >
                    <span>0{idx + 1}</span>
                    {idx < slides.length - 1 && (
                      <span className="text-zinc-300 mx-1">—</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Floating Badges (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 relative h-full lg:min-h-[560px] flex-col justify-between items-end pointer-events-none">
            {/* Top Right Floating Badge */}
            <div className="text-right pointer-events-auto mt-2">
              <div className="inline-block px-4 py-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white shadow-2xl">
                <p className="text-[11px] font-bold tracking-[0.22em] uppercase leading-tight text-zinc-200">
                  {currentSlide.tagTitle.split(' ')[0]}
                  <br />
                  {currentSlide.tagTitle.split(' ').slice(1).join(' ')}
                </p>
                <div className="w-1.5 h-1.5 rounded-full bg-[#48A427] my-1.5 ml-auto" />
                <p className="text-[11px] font-black tracking-[0.22em] uppercase leading-tight text-[#48A427]">
                  {currentSlide.tagSubtitle}
                </p>
              </div>
            </div>

            {/* Bottom Right Scroll Down Indicator */}
            <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-700 uppercase select-none pointer-events-auto mb-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-zinc-200/60 shadow-sm">
              <Mouse className="w-4 h-4 text-zinc-600 animate-bounce" />
              <span>SCROLL DOWN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="GGems Squash Academy Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
