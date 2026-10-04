'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  Building,
  Users2,
  GraduationCap,
  Landmark,
} from 'lucide-react';
import { CenterItem } from '../types';

interface CenterFinalCtaSectionProps {
  center: CenterItem;
}

export default function CenterFinalCtaSection({
  center,
}: CenterFinalCtaSectionProps) {
  const label = center.ctaLabel || 'PARTNER WITH US';
  const heading = center.ctaHeading || "Let's Build Brighter Futures";
  const desc =
    center.ctaDescription ||
    'Collaborate with GGems Sports Academy to bring world-class sports training to your institution.';
  const bgImage =
    center.ctaBackgroundImage || '/images/about/cta-squash-racket-ball.jpg';
  const phone = center.phone || '8826433044';

  const headingWords = heading.trim().split(' ');
  let line1 = heading;
  let line2 = '';
  if (headingWords.length >= 3) {
    line1 = headingWords.slice(0, 2).join(' ');
    line2 = headingWords.slice(2).join(' ');
  } else if (heading.toLowerCase().includes('brighter futures')) {
    line1 = "Let's Build";
    line2 = 'Brighter Futures';
  }

  const audienceLinks = [
    {
      title: 'For Schools',
      href: '/school-partnership',
      icon: Building,
    },
    {
      title: 'For Parents',
      href: '/contact?type=PARENT',
      icon: Users2,
    },
    {
      title: 'For Students',
      href: '/programs',
      icon: GraduationCap,
    },
    {
      title: 'For Institutions',
      href: '/contact?type=INSTITUTION',
      icon: Landmark,
    },
  ];

  return (
    <section
      id="partner-cta"
      className="w-full relative bg-zinc-950 py-20 sm:py-24 lg:py-28 overflow-hidden text-white"
    >
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Squash racket and ball"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/75" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Description, Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col"
          >
            <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase mb-3 block font-heading">
              {label}
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.08] uppercase font-heading mb-5">
              <span>{line1} </span>
              {line2 && <span className="text-[#63D13F]">{line2}</span>}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl font-normal mb-8">
              {desc}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/contact?partner=${center.slug}`}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-xl shadow-[#63D13F]/20 hover:-translate-y-0.5"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </Link>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#151515] hover:bg-[#202020] text-white border border-white/15 font-bold text-xs sm:text-sm tracking-wide transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-[#63D13F]" />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Audience Navigation Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl divide-y divide-white/10">
              {audienceLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group transition-colors hover:text-[#63D13F]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#63D13F] group-hover:bg-[#63D13F] group-hover:text-black transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#63D13F] transition-colors">
                        {link.title}
                      </span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#63D13F] group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
