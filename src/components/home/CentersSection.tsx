'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone, Building, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CenterItem {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  phone: string;
  facilities: string;
  googleMapsUrl?: string | null;
}

interface CentersSectionProps {
  centers: CenterItem[];
}

export default function CentersSection({ centers }: CentersSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Mouse drag state for desktop swiping
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Calculate card width dynamically (including 24px gap)
  const getCardStep = useCallback(() => {
    if (!sliderRef.current) return 360;
    const firstChild = sliderRef.current.firstElementChild as HTMLElement | null;
    if (firstChild) {
      return firstChild.offsetWidth + 24; // width + gap-6 (24px)
    }
    return 360;
  }, []);

  // Update active slide index based on scroll position
  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft } = sliderRef.current;
    const step = getCardStep();
    const index = Math.round(scrollLeft / step);
    setCurrentIndex(Math.min(Math.max(0, index), centers.length - 1));
  }, [getCardStep, centers.length]);

  // Button navigation - Next
  const nextSlide = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const step = getCardStep();

    if (scrollLeft + clientWidth >= scrollWidth - 20) {
      // Loop back to beginning
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      sliderRef.current.scrollBy({ left: step, behavior: 'smooth' });
    }
  }, [getCardStep]);

  // Button navigation - Prev
  const prevSlide = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth } = sliderRef.current;
    const step = getCardStep();

    if (scrollLeft <= 20) {
      // Loop to end
      sliderRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
    } else {
      sliderRef.current.scrollBy({ left: -step, behavior: 'smooth' });
    }
  }, [getCardStep]);

  // Dot navigation
  const scrollToSlide = useCallback(
    (index: number) => {
      if (!sliderRef.current) return;
      const step = getCardStep();
      sliderRef.current.scrollTo({ left: index * step, behavior: 'smooth' });
      setCurrentIndex(index);
    },
    [getCardStep]
  );

  // Mouse drag handlers for desktop smooth dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // drag sensitivity multiplier
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDownRef.current = false;
    setIsPaused(false);
  };

  // Auto-play interval (pauses on hover, touch, or drag)
  useEffect(() => {
    if (isPaused || centers.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, centers.length]);

  if (!centers || centers.length === 0) {
    return null;
  }

  return (
    <section id="centers" className="py-24 sm:py-32 bg-[#FAFBF9] relative overflow-hidden border-b border-zinc-200 select-none">
      {/* Decorative Squash Court Grid & Glow */}
      <div className="absolute inset-0 court-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#48A427]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-[#48A427]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#48A427]/10 border border-[#48A427]/20 text-[#48A427] text-xs font-bold tracking-widest uppercase mb-4">
              <Building className="w-3.5 h-3.5" />
              <span>REGIONAL INFRASTRUCTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase font-display leading-[0.95]">
              CENTERS OF EXCELLENCE
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed">
              10 premier academy centers and institutional squash courts operating across Delhi NCR
              and Western India.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Carousel Arrow Controls (Click to slide) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous centers"
                className="w-11 h-11 rounded-full border border-zinc-300 bg-white hover:bg-[#48A427] hover:border-[#48A427] hover:text-white text-zinc-800 transition-all duration-300 flex items-center justify-center shadow-sm active:scale-95 group cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next centers"
                className="w-11 h-11 rounded-full border border-zinc-300 bg-white hover:bg-[#48A427] hover:border-[#48A427] hover:text-white text-zinc-800 transition-all duration-300 flex items-center justify-center shadow-sm active:scale-95 group cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <Link
              href="/centers"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-zinc-300 hover:border-zinc-400 text-xs font-bold text-zinc-900 uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow"
            >
              <span>All 10 Centers</span>
              <ArrowUpRight className="w-4 h-4 text-[#48A427]" />
            </Link>
          </div>
        </div>

        {/* Dual Mode Carousel Track: Supports both Button Slide AND Native Touch/Drag Swipe */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -my-4 px-1 -mx-1 cursor-grab active:cursor-grabbing no-scrollbar touch-pan-x"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {centers.map((center, index) => {
            const facilitiesList = center.facilities
              ? center.facilities
                  .split(',')
                  .map((f) => f.trim())
                  .filter(Boolean)
              : [];

            return (
              <div
                key={center.id}
                className="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start flex flex-col"
              >
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/90 hover:border-[#48A427]/60 flex flex-col justify-between group transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 relative">
                  {/* Top Accent Line on Hover */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-[#48A427] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />

                  <div>
                    {/* City Badge & Slide Order */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-[#48A427]/10 text-[#48A427] border border-[#48A427]/20 uppercase tracking-wider">
                        {center.city}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono font-semibold">
                        {String(index + 1).padStart(2, '0')} / {String(centers.length).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Center Name */}
                    <h3 className="text-lg sm:text-xl font-black text-zinc-950 uppercase tracking-tight group-hover:text-[#48A427] transition-colors mb-2.5 font-display line-clamp-1">
                      {center.name}
                    </h3>

                    {/* Address */}
                    <div className="flex items-start gap-2 text-xs text-zinc-600 mb-5">
                      <MapPin className="w-3.5 h-3.5 text-[#48A427] shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-relaxed">{center.address}</span>
                    </div>

                    {/* Facilities Feature Tags */}
                    <div className="pt-4 border-t border-zinc-100 mb-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 uppercase tracking-wider font-bold mb-2">
                        <Sparkles className="w-3 h-3 text-[#48A427]" />
                        <span>Key Facilities</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {facilitiesList.slice(0, 3).map((fac) => (
                          <span
                            key={fac}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200/80 text-zinc-700 font-medium line-clamp-1"
                          >
                            {fac}
                          </span>
                        ))}
                        {facilitiesList.length > 3 && (
                          <span className="text-[11px] px-2 py-1 rounded-md bg-zinc-100 text-zinc-500 font-medium">
                            +{facilitiesList.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Phone + Details Action */}
                  <div className="pt-5 mt-5 border-t border-zinc-100 flex items-center justify-between gap-3">
                    <a
                      href={`tel:${center.phone}`}
                      onClick={(e) => {
                        if (hasDraggedRef.current) e.preventDefault();
                      }}
                      className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-950 font-semibold transition-colors group/phone"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#48A427]/10 flex items-center justify-center text-[#48A427] group-hover/phone:bg-[#48A427] group-hover/phone:text-white transition-colors">
                        <Phone className="w-3 h-3" />
                      </div>
                      <span className="font-mono">{center.phone}</span>
                    </a>

                    <Link
                      href={`/centers/${center.slug}`}
                      onClick={(e) => {
                        if (hasDraggedRef.current) e.preventDefault();
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#48A427]/10 hover:bg-[#48A427] text-[#48A427] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Progress Dots (Clickable) */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {centers.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to center ${idx + 1}`}
              className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#48A427]'
                  : 'w-2 bg-zinc-300 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>

        {/* Mobile View Explore Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/centers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-zinc-300 text-xs font-bold text-zinc-900 uppercase tracking-wider shadow-sm"
          >
            <span>Explore All 10 Centers & Facilities</span>
            <ArrowUpRight className="w-4 h-4 text-[#48A427]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
