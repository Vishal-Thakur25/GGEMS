'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CenterItem, CenterTestimonialItem } from '../types';

interface CenterTestimonialSectionProps {
  center: CenterItem;
}

export default function CenterTestimonialSection({
  center,
}: CenterTestimonialSectionProps) {
  const defaultList: CenterTestimonialItem[] = [
    {
      quote:
        center.testimonialQuote ||
        'Our focus is on providing the best opportunities for our students in academics and sports. Our partnership with GGems Sports Academy has strengthened our sports ecosystem and inspired many young athletes to achieve their goals.',
      author: center.testimonialAuthor || 'School Representative',
      role: center.testimonialRole || `${center.name}, ${center.city}`,
      image:
        center.testimonialImage || '/images/centers/representative-avatar.jpg',
    },
  ];

  let testimonials: CenterTestimonialItem[] = defaultList;
  if (center.testimonialsData) {
    try {
      const parsed = JSON.parse(center.testimonialsData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        testimonials = parsed;
      }
    } catch {
      // fallback
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex] || testimonials[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="w-full bg-[#F7FAF5] py-16 sm:py-20 lg:py-24 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white border border-zinc-200/90 shadow-sm relative">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
            
            {/* Left: Circular Representative Portrait */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg bg-zinc-100 shrink-0">
              <Image
                src={current.image || '/images/centers/representative-avatar.jpg'}
                alt={current.author || 'School Representative'}
                fill
                sizes="(max-width: 768px) 120px, 160px"
                className="object-cover object-top"
              />
            </div>

            {/* Right: Quotation & Content */}
            <div className="flex-1 flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Large Green Quotation Mark */}
                  <div className="text-4xl sm:text-5xl font-serif text-[#63D13F] leading-none mb-2 select-none">
                    “
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm sm:text-base lg:text-lg text-zinc-800 leading-relaxed font-medium italic mb-6">
                    {current.quote}
                  </blockquote>

                  {/* Author Name & Designation */}
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-zinc-950 font-heading leading-tight uppercase tracking-tight">
                      {current.author}
                    </h4>
                    <p className="text-xs text-zinc-500 font-medium mt-1">
                      {current.role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Right Controls: Dots & Arrows */}
              <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-zinc-100">
                {/* Dots */}
                {testimonials.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to testimonial ${idx + 1}`}
                        className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                          currentIndex === idx
                            ? 'w-5 bg-[#63D13F]'
                            : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="w-9 h-9 rounded-full border border-zinc-200 hover:border-zinc-800 text-zinc-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-9 h-9 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  >
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
