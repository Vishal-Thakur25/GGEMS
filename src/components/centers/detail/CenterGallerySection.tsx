'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Maximize2 } from 'lucide-react';
import { CenterItem, CenterImageItem } from '../types';

interface CenterGallerySectionProps {
  center: CenterItem;
}

const DEFAULT_GALLERY_ITEMS: CenterImageItem[] = [
  {
    imageUrl: '/images/centers/gallery-campus.jpg',
    caption: 'School Campus',
    displayOrder: 1,
  },
  {
    imageUrl: '/images/centers/gallery-squash.jpg',
    caption: 'Squash Facility',
    displayOrder: 2,
  },
  {
    imageUrl: '/images/centers/gallery-badminton.jpg',
    caption: 'Badminton Facility',
    displayOrder: 3,
  },
  {
    imageUrl: '/images/centers/gallery-fitness.jpg',
    caption: 'Fitness Area',
    displayOrder: 4,
  },
  {
    imageUrl: '/images/centers/gallery-club.jpg',
    caption: 'School Club',
    displayOrder: 5,
  },
];

export default function CenterGallerySection({ center }: CenterGallerySectionProps) {
  const galleryItems =
    center.images && center.images.length > 0
      ? center.images
      : DEFAULT_GALLERY_ITEMS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Responsive items to show: 5 on large desktop, 3 on tablet, 1 on mobile
  const itemsPerPage = 5;
  const maxIndex = Math.max(0, galleryItems.length - 1);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section className="w-full bg-[#111111] py-16 sm:py-20 lg:py-24 text-white overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Header: Eyebrow, Heading, Carousel Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase mb-2.5 block font-heading">
              GALLERY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-white font-heading leading-tight uppercase">
              Campus & <span className="text-[#63D13F]">Sports Facilities</span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous gallery image"
              className="w-10 h-10 rounded-full border border-zinc-700 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next gallery image"
              className="w-10 h-10 rounded-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center transition-colors cursor-pointer shadow-md"
            >
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Gallery Track / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id || `${item.caption}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container with subtle rounded corners */}
              <div className="relative aspect-[4/3] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 mb-3 shadow-md">
                <Image
                  src={item.imageUrl}
                  alt={item.caption || 'Facility'}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p className="text-xs sm:text-[13px] font-semibold text-zinc-300 group-hover:text-white transition-colors truncate">
                {item.caption || 'Facility'}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between p-4 bg-zinc-900 border-b border-white/10">
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  {galleryItems[lightboxIndex]?.caption || 'Campus Facility'}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lightbox Main Image */}
              <div className="relative aspect-[16/10] w-full bg-black flex items-center justify-center">
                <Image
                  src={galleryItems[lightboxIndex]?.imageUrl || ''}
                  alt={galleryItems[lightboxIndex]?.caption || ''}
                  fill
                  className="object-contain"
                />

                {/* Left/Right overlay arrows */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1
                    );
                  }}
                  className="absolute left-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0
                    );
                  }}
                  className="absolute right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Footer */}
              <div className="p-3 bg-zinc-900/80 text-center text-xs text-zinc-400 font-mono">
                {lightboxIndex + 1} / {galleryItems.length} -{' '}
                {galleryItems[lightboxIndex]?.caption}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
