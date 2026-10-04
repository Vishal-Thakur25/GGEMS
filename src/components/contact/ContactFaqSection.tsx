'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight, MessageSquare } from 'lucide-react';
import { FaqItem } from './types';

interface ContactFaqSectionProps {
  faqs?: FaqItem[];
  phone?: string;
}

export default function ContactFaqSection({
  faqs,
  phone = '+91 8826433044',
}: ContactFaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const formattedPhone = phone.startsWith('+') ? phone : `+91 ${phone}`;

  const defaultFaqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'What age groups do you offer training for?',
      answer:
        'We offer structured programmes for junior beginners (ages 5–10), youth development (ages 11–18), advanced competitive squads, and adult master batches tailored to every skill level.',
    },
    {
      id: 'faq-2',
      question: 'How can I enrol my child in a programme?',
      answer:
        `You can enrol by filling out our enquiry form above, calling our admissions desk at ${formattedPhone}, or booking an evaluation assessment session at your nearest GGems center.`,
    },
    {
      id: 'faq-3',
      question: 'Do you offer trial classes?',
      answer:
        'Yes, we provide an initial skills assessment and trial class where our head coaches evaluate hand-eye coordination, movement, and place the student in the right training batch.',
    },
    {
      id: 'faq-4',
      question: 'Do you have multiple training centers?',
      answer:
        'Yes, GGems operates across 10 centers of excellence in Delhi, Noida, Greater Noida, and Vadodara, equipped with international-standard courts and certified coaches.',
    },
  ];

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#F7FAF5] py-16 sm:py-20 lg:py-24 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase mb-2.5 block font-heading">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-zinc-950 font-heading leading-tight mb-3">
              Quick Answers
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
              Find answers to common questions about our programmes, admissions and facilities.
            </p>
          </div>

          <Link
            href="/about"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-50 border border-zinc-200 text-xs font-bold text-zinc-900 tracking-wide transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 2-Column FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {displayFaqs.slice(0, 4).map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                layout
                className={`rounded-2xl bg-white border transition-all duration-200 shadow-2xs ${
                  isOpen ? 'border-[#63D13F]/60 ring-2 ring-[#63D13F]/15' : 'border-[#E6EAE4] hover:border-[#63D13F]/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF8EA] flex items-center justify-center text-[#45B52D] shrink-0">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-zinc-900 font-heading leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-600 shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-[#666666] leading-relaxed border-t border-zinc-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
