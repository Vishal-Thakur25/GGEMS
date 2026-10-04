'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  HelpCircle,
} from 'lucide-react';

export interface ProgrammeTestimonialItem {
  id: string;
  name: string;
  designation: string;
  organization?: string;
  profileImage?: string;
  quote: string;
  rating?: number;
  displayOrder?: number;
  published?: boolean;
}

export interface ProgrammeFaqItem {
  id: string;
  question: string;
  answer: string;
  displayOrder?: number;
  published?: boolean;
}

interface ProgrammeTestimonialsAndFaqProps {
  testimonialEyebrow?: string | null;
  testimonialTitle?: string | null;
  testimonialsData?: string | null;
  faqEyebrow?: string | null;
  faqTitle?: string | null;
  faqsData?: string | null;
}

const defaultTestimonials: ProgrammeTestimonialItem[] = [
  {
    id: 't1',
    name: 'Student',
    designation: 'Squash Training Programme',
    organization: 'GGems Sports Academy',
    profileImage: '/images/centers/representative-avatar.jpg',
    quote:
      'The training at GGems has helped me improve my game, fitness and confidence. The coaches are very supportive and the environment is excellent for learning and growth.',
    rating: 5,
    published: true,
  },
  {
    id: 't2',
    name: 'Arjun Sharma',
    designation: 'Junior National Circuit Player',
    organization: 'Delhi Squash Association',
    profileImage: '/images/about/coach-1-thumb.png',
    quote:
      'The tactical coaching and tournament mentoring at GGems completely transformed my game. I jumped 15 spots on the national junior rankings within 8 months!',
    rating: 5,
    published: true,
  },
  {
    id: 't3',
    name: 'Pooja Verma',
    designation: 'Parent of Under-15 Athlete',
    organization: 'Noida Center',
    profileImage: '/images/about/coach-2-thumb.png',
    quote:
      'GGems provides an unmatched blend of discipline, fitness and sportsmanship. The personal attention each athlete receives from certified coaches is world-class.',
    rating: 5,
    published: true,
  },
];

const defaultFaqs: ProgrammeFaqItem[] = [
  {
    id: 'faq1',
    question: 'What age groups can join the Squash Training programme?',
    answer:
      'Our squash training programme welcomes athletes from age 6 onwards, ranging from young juniors starting out to competitive teens and working adults. Players are grouped into batches based on their age and skill level.',
    published: true,
  },
  {
    id: 'faq2',
    question: 'Do you provide beginner level training?',
    answer:
      'Yes, absolutely! We have dedicated beginner tracks focusing on fundamental racket grip, footwork mechanics, hand-eye coordination, and core game rules in a fun and encouraging environment.',
    published: true,
  },
  {
    id: 'faq3',
    question: 'Are there opportunities to participate in tournaments?',
    answer:
      'Yes! We conduct internal ranking leagues and prepare our athletes for district, state, national junior circuits, and international PSA satellite tournaments with on-ground coach accompaniment.',
    published: true,
  },
  {
    id: 'faq4',
    question: 'What is the duration and timing of the classes?',
    answer:
      'Standard batches are 60 to 90 minutes per session, held 3 to 5 times per week. We offer flexible morning and evening slots across weekdays and dedicated weekend intensive clinics.',
    published: true,
  },
];

export default function ProgrammeTestimonialsAndFaq({
  testimonialEyebrow = 'WHAT OUR PLAYERS SAY',
  testimonialTitle = 'Student Success Stories',
  testimonialsData,
  faqEyebrow = 'FREQUENTLY ASKED QUESTIONS',
  faqTitle = 'Quick Answers',
  faqsData,
}: ProgrammeTestimonialsAndFaqProps) {
  // Parse testimonials
  let testimonials: ProgrammeTestimonialItem[] = defaultTestimonials;
  if (testimonialsData) {
    try {
      const parsed = JSON.parse(testimonialsData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        testimonials = parsed.filter((t) => t.published !== false);
      }
    } catch {
      // Keep defaults
    }
  }

  // Parse FAQs
  let faqs: ProgrammeFaqItem[] = defaultFaqs;
  if (faqsData) {
    try {
      const parsed = JSON.parse(faqsData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        faqs = parsed.filter((f) => f.published !== false);
      }
    } catch {
      // Keep defaults
    }
  }

  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  const currentTestimonial = testimonials[activeTestimonialIdx] || testimonials[0];

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#FAFBF9] py-20 sm:py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Testimonial Success Stories */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#63D13F] block mb-2 sm:mb-3">
                {testimonialEyebrow || 'WHAT OUR PLAYERS SAY'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-zinc-950 font-heading tracking-tight leading-tight mb-8">
                {testimonialTitle || 'Student Success Stories'}
              </h2>

              {/* Testimonial Card matching reference */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Avatar */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-zinc-100 border-2 border-[#63D13F]/40 shrink-0">
                    <Image
                      src={currentTestimonial?.profileImage || '/images/centers/representative-avatar.jpg'}
                      alt={currentTestimonial?.name || 'Student'}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Quote and Author */}
                  <div className="flex-1">
                    <span className="text-4xl sm:text-5xl font-serif text-[#63D13F] leading-none block -mb-2 select-none">
                      “
                    </span>
                    <p className="text-zinc-700 italic text-sm sm:text-base leading-relaxed mb-4">
                      {currentTestimonial?.quote}
                    </p>
                    <div>
                      <p className="text-sm sm:text-base font-black text-zinc-950 uppercase font-heading tracking-tight">
                        {currentTestimonial?.name}
                      </p>
                      <p className="text-xs text-zinc-500 font-medium">
                        {currentTestimonial?.designation}
                        {currentTestimonial?.organization && ` • ${currentTestimonial.organization}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Slider Dots & Controls */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-100">
                  {/* Pagination Dots */}
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTestimonialIdx(idx)}
                        className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                          idx === activeTestimonialIdx
                            ? 'w-7 bg-[#63D13F]'
                            : 'w-2.5 bg-zinc-200 hover:bg-zinc-300'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrevTestimonial}
                      className="w-9 h-9 rounded-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-black transition-colors cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextTestimonial}
                      className="w-9 h-9 rounded-full bg-zinc-950 text-white hover:bg-[#63D13F] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#63D13F] block mb-2 sm:mb-3">
                  {faqEyebrow || 'FREQUENTLY ASKED QUESTIONS'}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-zinc-950 font-heading tracking-tight leading-tight">
                  {faqTitle || 'Quick Answers'}
                </h2>
              </div>

              <Link
                href="/contact#faq"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 hover:border-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-zinc-950 transition-colors shrink-0"
              >
                <span>View All FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqId === (faq.id || String(idx));
                return (
                  <div
                    key={faq.id || idx}
                    className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-2xs transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id || String(idx))}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5 flex-1">
                        <div className="w-6 h-6 rounded-lg bg-[#EEF8EA] text-[#45B52D] flex items-center justify-center shrink-0">
                          <HelpCircle className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#45B52D] transition-colors leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-700 group-hover:bg-[#63D13F] group-hover:text-white transition-colors">
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mobile View All FAQs Link */}
            <div className="sm:hidden pt-4">
              <Link
                href="/contact#faq"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 text-xs font-bold uppercase tracking-wider text-zinc-800 transition-colors"
              >
                <span>View All FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
