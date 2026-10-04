'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

interface FeaturedCenterProps {
  subtitle?: string;
  name?: string;
  city?: string;
  description?: string;
  imageUrl?: string;
  slug?: string;
}

export default function FeaturedCenterSection({
  subtitle = 'FEATURED CENTER',
  name = 'Siri Fort Sports Complex',
  city = 'Delhi',
  description = 'A premier sporting destination and one of the key centers where GGems Sports Academy conducts structured squash training programmes.',
  imageUrl = '/images/centers/featured-sirifort.jpg',
  slug = 'siri-fort-sports-complex-delhi',
}: FeaturedCenterProps) {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-zinc-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Large Entrance / Facility Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative aspect-[16/11] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-zinc-200/80 bg-zinc-100"
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-103"
            />
          </motion.div>

          {/* RIGHT: Typography, Location, Details, CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start relative"
          >
            {/* Green Eyebrow Label */}
            <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase mb-3 block font-heading">
              {subtitle}
            </span>

            {/* Giant Stacked Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 font-heading leading-tight tracking-tight mb-4">
              <span className="block">Siri Fort</span>
              <span className="block">Sports Complex</span>
            </h2>

            {/* Location Line */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 rounded-full bg-[#EEF8EA] flex items-center justify-center text-[#45B52D]">
                <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-zinc-800 tracking-tight">
                {city}
              </span>
            </div>

            {/* Supporting Description */}
            <p className="text-xs sm:text-sm text-[#666666] font-normal leading-relaxed max-w-xl mb-8">
              {description}
            </p>

            {/* Action Button */}
            <Link
              href={`/centers/${slug}`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#63D13F]/25 hover:shadow-lg hover:shadow-[#63D13F]/35 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View Center Details</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            {/* Decorative Dot Matrix on bottom right matching reference */}
            <div className="absolute -bottom-10 right-0 hidden sm:grid grid-cols-8 gap-3 opacity-25 pointer-events-none select-none">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#63D13F]" />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
