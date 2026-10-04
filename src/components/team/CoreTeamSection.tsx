'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, RefreshCw, AlertCircle, Users } from 'lucide-react';
import { TeamMemberItem } from './types';

interface CoreTeamSectionProps {
  members?: TeamMemberItem[];
}

const DEFAULT_FALLBACK_IMAGE = '/images/about/founder-gyanendra.jpg';
const AUTOPLAY_INTERVAL_MS = 3800; // Auto-scroll every 3.8 seconds

function TeamMemberCard({ coach }: { coach: TeamMemberItem }) {
  const [imgSrc, setImgSrc] = useState<string>(
    coach.profileImage || coach.image || DEFAULT_FALLBACK_IMAGE
  );

  // Derive badges dynamically from qualifications or experience
  const badges: string[] = React.useMemo(() => {
    if (coach.badges && coach.badges.length > 0) {
      return coach.badges;
    }
    const derived: string[] = [];
    if (coach.qualifications) {
      const parts = coach.qualifications
        .split(/[|,]/)
        .map((p) => p.trim())
        .filter(Boolean);
      derived.push(...parts.slice(0, 2));
    }
    if (derived.length === 0 && coach.experienceYears) {
      derived.push(`${coach.experienceYears}+ Years Experience`);
    }
    return derived.slice(0, 2);
  }, [coach.badges, coach.qualifications, coach.experienceYears]);

  const designation = coach.role || coach.designation || 'Squash Coach';
  const bio = coach.shortBio || coach.bio || '';

  return (
    <Link
      href={`/team/${coach.slug}`}
      draggable={false}
      className="group flex flex-col bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#63D13F]/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 h-full select-none"
    >
      {/* Image Container with Soft Green Backdrop Accent */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-[#63D13F]/20 via-[#EEF8EA] to-white flex items-end justify-center pt-4">
        <div className="relative w-full h-full">
          <Image
            src={imgSrc}
            alt={coach.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-bottom transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
            onError={() => setImgSrc(DEFAULT_FALLBACK_IMAGE)}
            priority={false}
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Name & Role */}
          <h3 className="text-lg sm:text-xl font-black text-zinc-950 font-heading leading-tight group-hover:text-[#45B52D] transition-colors mb-1 truncate">
            {coach.name}
          </h3>
          <p className="text-xs font-semibold text-zinc-500 mb-4 line-clamp-1">
            {designation}
          </p>

          {/* Badges / Certifications */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {badges.map((badge, idx) => (
                <span
                  key={`${badge}-${idx}`}
                  className="inline-block px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-[11px] font-semibold text-zinc-700 tracking-tight"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Short Bio */}
          {bio && (
            <p className="text-xs text-[#666666] leading-relaxed line-clamp-3 font-normal">
              {bio}
            </p>
          )}
        </div>

        {/* Bottom Row: Circular Arrow Button */}
        <div className="flex justify-end pt-5 mt-auto border-t border-zinc-100">
          <div className="w-7 h-7 rounded-full border border-zinc-200 group-hover:border-[#63D13F] group-hover:bg-[#63D13F] flex items-center justify-center transition-all duration-300">
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CoreTeamSection({ members: initialMembers }: CoreTeamSectionProps) {
  const [teamList, setTeamList] = useState<TeamMemberItem[]>(initialMembers || []);
  const [loading, setLoading] = useState<boolean>(!initialMembers || initialMembers.length === 0);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Swipe / Drag State (Touch & Mouse)
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive itemsPerPage calculation
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Fetch dynamic team members from API on client mount (or refresh)
  const fetchTeamMembers = useCallback(async () => {
    try {
      if (!initialMembers || initialMembers.length === 0) {
        setLoading(true);
      }
      setError(null);

      const res = await fetch('/api/team', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Failed to fetch team members (HTTP ${res.status})`);
      }

      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setTeamList(json.data);
      } else {
        throw new Error(json.error || 'Failed to parse team data');
      }
    } catch (err: any) {
      console.error('Error fetching team from API:', err);
      if (!teamList || teamList.length === 0) {
        setError(err.message || 'Unable to load team members');
      }
    } finally {
      setLoading(false);
    }
  }, [initialMembers, teamList]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const totalMembers = teamList.length;
  const maxIndex = Math.max(0, totalMembers - itemsPerPage);

  // Keep currentIndex clamped within maxIndex
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Reset pause with delay after manual interaction
  const resumeAfterInteraction = useCallback(() => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2500);
  }, []);

  const handlePrev = useCallback(() => {
    if (totalMembers <= itemsPerPage) return;
    setIsPaused(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    resumeAfterInteraction();
  }, [totalMembers, itemsPerPage, maxIndex, resumeAfterInteraction]);

  const handleNext = useCallback(() => {
    if (totalMembers <= itemsPerPage) return;
    setIsPaused(true);
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    resumeAfterInteraction();
  }, [totalMembers, itemsPerPage, maxIndex, resumeAfterInteraction]);

  const handleDotClick = (idx: number) => {
    setIsPaused(true);
    setCurrentIndex(idx);
    resumeAfterInteraction();
  };

  // Autoplay / Automatic Scroll Loop
  useEffect(() => {
    if (isPaused || totalMembers <= itemsPerPage || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPaused, totalMembers, itemsPerPage, maxIndex, isDragging]);

  // Touch Swipe Handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.targetTouches[0].clientX);
    setDragDeltaX(0);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    setDragDeltaX(e.targetTouches[0].clientX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (dragStartX === null) return;
    if (dragDeltaX < -40) {
      handleNext();
    } else if (dragDeltaX > 40) {
      handlePrev();
    }
    setDragStartX(null);
    setDragDeltaX(0);
    resumeAfterInteraction();
  };

  // Mouse Drag Handlers (Desktop / Laptop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setDragDeltaX(0);
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null) return;
    setDragDeltaX(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging || dragStartX === null) return;
    if (dragDeltaX < -50) {
      handleNext();
    } else if (dragDeltaX > 50) {
      handlePrev();
    }
    setIsDragging(false);
    setDragStartX(null);
    setDragDeltaX(0);
    resumeAfterInteraction();
  };

  const handleMouseLeaveContainer = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setIsPaused(false);
  };

  return (
    <section id="core-team" className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Eyebrow, Heading, and Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase mb-2.5 block font-heading">
              OUR CORE TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-zinc-950 font-heading leading-tight">
              Meet the People Behind GGems
            </h2>
          </div>

          {/* Navigation Controls on Top Right */}
          {totalMembers > 0 && (
            <div className="flex items-center gap-3 self-start sm:self-auto">
              {/* Slide Counter Badge */}
              <span className="text-xs font-mono font-bold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200/80">
                {String(currentIndex + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={totalMembers <= itemsPerPage}
                  aria-label="Previous core team members"
                  className="w-10 h-10 rounded-full border border-zinc-300 hover:border-zinc-900 flex items-center justify-center text-zinc-700 hover:text-black transition-colors cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={totalMembers <= itemsPerPage}
                  aria-label="Next core team members"
                  className="w-10 h-10 rounded-full bg-zinc-950 hover:bg-zinc-800 flex items-center justify-center text-white transition-colors cursor-pointer shadow-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-zinc-100 rounded-2xl border border-zinc-200 overflow-hidden h-[440px] flex flex-col"
              >
                <div className="aspect-[4/3] bg-zinc-200 w-full" />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-5 bg-zinc-300 rounded w-2/3" />
                    <div className="h-3 bg-zinc-200 rounded w-1/3" />
                    <div className="h-14 bg-zinc-200 rounded w-full mt-4" />
                  </div>
                  <div className="h-7 bg-zinc-200 rounded-full w-7 self-end" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-8 rounded-2xl border border-red-200 bg-red-50/50 flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
            <h3 className="text-base font-bold text-zinc-900 mb-1">Failed to load core team</h3>
            <p className="text-xs text-zinc-600 mb-4">{error}</p>
            <button
              type="button"
              onClick={fetchTeamMembers}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && totalMembers === 0 && (
          <div className="p-12 rounded-2xl border border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center text-center">
            <Users className="w-12 h-12 text-zinc-400 mb-3" />
            <h3 className="text-lg font-bold text-zinc-900 mb-1">No Team Members Available</h3>
            <p className="text-xs text-zinc-500 max-w-sm mb-4">
              Our core coaching roster is currently being updated. Please check back shortly.
            </p>
            <button
              type="button"
              onClick={fetchTeamMembers}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        )}

        {/* Responsive Slider Track (Auto-scrolling, Touch-friendly & Mouse Dragging) */}
        {!loading && !error && totalMembers > 0 && (
          <div
            className={`overflow-hidden w-full relative touch-pan-y ${
              isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={handleMouseLeaveContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -mx-3 sm:-mx-3.5 lg:-mx-4"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {teamList.map((coach) => (
                <div
                  key={coach.id || coach.slug}
                  className="shrink-0 px-3 sm:px-3.5 lg:px-4 py-1"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <TeamMemberCard coach={coach} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination Dots at Bottom */}
        {!loading && !error && totalMembers > itemsPerPage && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 bg-[#63D13F]'
                    : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
