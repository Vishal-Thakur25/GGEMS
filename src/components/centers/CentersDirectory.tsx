'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CenterBadge from './CenterBadge';
import { CenterItem } from './types';

interface CentersDirectoryProps {
  initialCenters: CenterItem[];
  selectedFilter?: string;
  onFilterChange?: (city: string) => void;
}

const FILTER_OPTIONS = ['All', 'Delhi', 'Noida', 'Greater Noida', 'Vadodara'];

export default function CentersDirectory({
  initialCenters,
  selectedFilter: externalFilter,
  onFilterChange,
}: CentersDirectoryProps) {
  const [internalFilter, setInternalFilter] = useState('All');
  const currentFilter = externalFilter || internalFilter;

  React.useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setInternalFilter(customEvent.detail);
      }
    };
    window.addEventListener('ggems-center-filter', handleFilterEvent);
    return () => window.removeEventListener('ggems-center-filter', handleFilterEvent);
  }, []);

  const handleSelectFilter = (filter: string) => {
    setInternalFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  const filteredCenters = useMemo(() => {
    if (currentFilter === 'All') return initialCenters;

    return initialCenters.filter((center) => {
      const city = center.city.toLowerCase();
      const displayCity = (center.displayCity || '').toLowerCase();
      const address = (center.address || '').toLowerCase();
      const target = currentFilter.toLowerCase();

      if (target === 'delhi') {
        return (
          city.includes('delhi') ||
          displayCity.includes('delhi') ||
          address.includes('delhi')
        );
      }
      if (target === 'noida') {
        // Exclude Greater Noida when filter is Noida
        if (target === 'noida' && (city.includes('greater noida') || displayCity.includes('greater noida'))) {
          return false;
        }
        return (
          city.includes('noida') ||
          displayCity.includes('noida') ||
          address.includes('noida')
        );
      }
      if (target === 'greater noida') {
        return (
          city.includes('greater noida') ||
          displayCity.includes('greater noida') ||
          address.includes('greater noida')
        );
      }
      if (target === 'vadodara') {
        return (
          city.includes('vadodara') ||
          displayCity.includes('vadodara') ||
          address.includes('vadodara') ||
          address.includes('gujarat')
        );
      }
      return city.includes(target);
    });
  }, [initialCenters, currentFilter]);

  return (
    <section id="our-centers" className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Subtitle, Title, Description, and Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase mb-2.5 block font-heading">
              OUR CENTERS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-zinc-950 font-heading leading-tight mb-3">
              Our Network of Centers
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-normal">
              Explore our centers of excellence where we deliver structured coaching, training programmes and sports development.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = currentFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => handleSelectFilter(filter)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#63D13F] text-white shadow-sm shadow-[#63D13F]/30 scale-[1.02]'
                      : 'bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Grid: 4 columns desktop, 2 columns tablet, 1 column mobile */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredCenters.map((center, idx) => (
              <motion.div
                key={center.slug || center.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
              >
                <Link
                  href={`/centers/${center.slug}`}
                  className="group flex flex-col bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#63D13F]/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-400 hover:-translate-y-1.5 h-full relative"
                >
                  {/* Facility Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={center.image || '/images/centers/center-sirifort.jpg'}
                      alt={center.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Overlapping Emblem Badge */}
                  <div className="-mt-6 ml-4 z-10">
                    <CenterBadge slug={center.slug} name={center.name} className="w-12 h-12" />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 pt-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-zinc-950 font-heading leading-snug group-hover:text-[#45B52D] transition-colors mb-4 line-clamp-2">
                        {center.name}
                      </h3>
                    </div>

                    {/* Bottom Row: Location Badge & Arrow Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 mt-auto">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEF8EA] text-[#45B52D] text-[11px] font-bold tracking-tight">
                        {center.displayCity || center.city}
                      </span>

                      <div className="w-7 h-7 rounded-full border border-zinc-200 group-hover:border-[#63D13F] group-hover:bg-[#63D13F] flex items-center justify-center transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Decorative Dot Grid in Row 3 (Col 3 & 4) when 'All' is active, matching reference image */}
          {currentFilter === 'All' && (
            <div className="hidden lg:flex col-span-2 items-center justify-center p-8 select-none pointer-events-none">
              <div className="grid grid-cols-10 gap-4 opacity-40">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#63D13F]/60" />
                ))}
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
