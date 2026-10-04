'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TestimonialItem {
  id: string;
  authorName: string;
  authorRole: string;
  athleteName?: string | null;
  quote: string;
  rating: number;
  avatarUrl?: string | null;
}

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 't1',
    authorName: 'Sunita Patel',
    authorRole: 'Parent of Vedant Patel (India Rank - 08)',
    quote:
      'GGems Squash Academy has provided exceptional coaching. Under Gyanendra Sir and Aakash Sir’s mentorship, Vedant transitioned from a regional player to achieving a Top 8 All India Men’s ranking. Their commitment to player discipline and fitness is unmatched.',
    rating: 5,
    avatarUrl: null,
  },
  {
    id: 't2',
    authorName: 'Col. Rajesh Sharma',
    authorRole: 'Parent of Under-14 Junior Athlete',
    quote:
      'The structured Player Development System at GGems gave our son clarity. The blend of 1-on-1 tactical drills, physical conditioning with Coach Ajit, and mental preparation on court made all the difference.',
    rating: 5,
    avatarUrl: null,
  },
  {
    id: 't3',
    authorName: 'Dr. Meenakshi Roy',
    authorRole: 'Sports Director, Partner School',
    quote:
      'Partnering with GGems was the finest athletic decision for our school. Their certified coaches manage the courts with immense professional standards, and our students have brought home numerous regional squash trophies.',
    rating: 5,
    avatarUrl: null,
  },
];

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive visible cards count
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCards);

  // Clamp current index when visibleCards changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // Autoplay functionality (advances every 5.5 seconds, pauses on hover)
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (deltaX > 45) {
      handleNext();
    } else if (deltaX < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div className="text-left max-w-3xl">
            <span className="text-xs font-bold text-[#48A427] tracking-widest uppercase mb-3 block font-mono">
              VERIFIED TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight font-display">
              WHAT OUR ATHLETES & PARENTS SAY
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
              Real experiences from competitive junior squash players, national medalists, and partner
              school athletic directors.
            </p>
          </div>

          {/* Slider Prev / Next Controls */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={handlePrev}
              disabled={maxIndex === 0}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-zinc-300 hover:border-[#48A427] bg-white hover:bg-[#48A427] text-zinc-800 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={maxIndex === 0}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-zinc-300 hover:border-[#48A427] bg-white hover:bg-[#48A427] text-zinc-800 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport & Sliding Track */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex -mx-3"
            animate={{
              x: `-${currentIndex * (100 / visibleCards)}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 28,
              mass: 0.8,
            }}
          >
            {items.map((t, idx) => (
              <div
                key={t.id || idx}
                style={{ width: `${100 / visibleCards}%` }}
                className="px-3 shrink-0"
              >
                <div className="h-full p-7 sm:p-8 rounded-2xl bg-white border border-zinc-200/90 flex flex-col justify-between relative group hover:border-[#48A427]/60 transition-all duration-300 shadow-md hover:shadow-xl">
                  <div>
                    {/* Top Row: Quote Icon & Rating Stars */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <Quote className="w-8 h-8 text-[#48A427]/30" />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < t.rating
                                ? 'fill-[#48A427] text-[#48A427]'
                                : 'fill-zinc-200 text-zinc-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quote Text */}
                    <p className="text-xs sm:text-sm text-zinc-700 italic leading-relaxed font-normal">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Card Bottom: Author Info */}
                  <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center gap-3.5">
                    {t.avatarUrl ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-zinc-200">
                        <Image
                          src={t.avatarUrl}
                          alt={t.authorName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#48A427]/15 text-[#48A427] font-extrabold text-sm flex items-center justify-center shrink-0 border border-[#48A427]/25 font-display">
                        {t.authorName.charAt(0)}
                      </div>
                    )}

                    <div className="overflow-hidden">
                      <h4 className="text-sm font-bold text-zinc-950 uppercase tracking-wider font-display truncate group-hover:text-[#48A427] transition-colors">
                        {t.authorName}
                      </h4>
                      <p className="text-xs text-[#48A427] font-medium mt-0.5 truncate">
                        {t.authorRole}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => {
              const isActive = currentIndex === dotIdx;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                    isActive
                      ? 'w-7 bg-[#48A427]'
                      : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
