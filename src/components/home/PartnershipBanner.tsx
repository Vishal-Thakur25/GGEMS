'use client';

import Link from 'next/link';
import { ArrowRight, Phone, GraduationCap, Users, School, Building2 } from 'lucide-react';

interface PartnershipBannerProps {
  phone?: string;
}

export default function PartnershipBanner({ phone = '+91 8826433044' }: PartnershipBannerProps = {}) {
  const audienceList = [
    { icon: GraduationCap, label: 'For Students' },
    { icon: Users, label: 'For Parents' },
    { icon: School, label: 'For Schools' },
    { icon: Building2, label: 'For Institutions' },
  ];

  return (
    <section className="bg-[#0B0F13] py-20 sm:py-24 text-white relative overflow-hidden border-t border-white/10">
      {/* Subtle court glow & decorative squash ball */}
      <div className="absolute inset-0 court-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-24 left-1/3 w-80 h-80 bg-[#48A427]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Squash Ball with Green Dots in center background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-black/60 border border-white/5 opacity-20 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-8">
          {/* Left Column: Heading, Subtext & Action Buttons */}
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display leading-[0.95] mb-4">
              YOUR JOURNEY
              <br />
              <span className="text-[#48A427]">STARTS HERE.</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-8">
              Train with purpose. Compete with confidence. Develop with GGems.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#48A427] hover:bg-[#3B8A1D] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#48A427]/25 hover:shadow-xl hover:shadow-[#48A427]/35"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700/80 font-bold text-xs sm:text-sm tracking-wide transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#48A427]" />
                <span>Call {phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Audience List with Green Icons */}
          <div className="flex flex-col gap-4 sm:gap-5 w-full lg:w-auto">
            {audienceList.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#48A427]/50 hover:bg-white/[0.08] transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#48A427] shrink-0">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-sm font-bold text-white tracking-wide uppercase font-display">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
