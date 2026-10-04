'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, GraduationCap, Activity, Users } from 'lucide-react';
import { CenterItem } from '../types';

interface CenterQuickInfoProps {
  center: CenterItem;
}

export default function CenterQuickInfo({ center }: CenterQuickInfoProps) {
  const locationVal =
    center.location || `${center.city}, ${center.state || 'Delhi NCR'} / Campus Courts`;
  const partnershipVal = center.partnershipType || 'Sports Training Programme';
  const sportsVal = center.sportsOffered || 'Squash, Badminton & Other Sports';
  const engagementVal =
    center.studentEngagement || 'Regular Training & Competitions';

  const items = [
    {
      icon: Building2,
      title: 'Location',
      value: locationVal,
    },
    {
      icon: GraduationCap,
      title: 'Partnership',
      value: partnershipVal,
    },
    {
      icon: Activity,
      title: 'Sports Offered',
      value: sportsVal,
    },
    {
      icon: Users,
      title: 'Student Engagement',
      value: engagementVal,
    },
  ];

  return (
    <section className="w-full bg-[#F7FAF5] py-8 sm:py-10 border-y border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex items-center gap-4 ${
                  idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6 lg:pl-8' : ''
                }`}
              >
                {/* Circular Soft Green Icon */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#EEF8EA] border border-[#63D13F]/30 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#45B52D] stroke-[1.8]" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h4 className="text-sm font-extrabold text-zinc-950 font-heading leading-tight mb-1 uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#666666] leading-relaxed line-clamp-2 font-normal">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
