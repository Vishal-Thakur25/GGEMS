'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import {
  ContactSiteSettings,
  OfficeGalleryItem,
  DynamicContactPhone,
  DynamicContactEmail,
  DynamicContactAddress,
} from './types';

interface VisitOfficeSectionProps {
  settings?: ContactSiteSettings;
  phones?: DynamicContactPhone[];
  emails?: DynamicContactEmail[];
  addresses?: DynamicContactAddress[];
}

const DEFAULT_OFFICE_GALLERY: OfficeGalleryItem[] = [
  {
    id: 'reception',
    title: 'Office Reception',
    imageUrl: '/images/centers/featured-sirifort.jpg',
    alt: 'GGems Sports Academy Office Reception',
  },
  {
    id: 'discussion',
    title: 'Discussion Area',
    imageUrl: '/images/centers/center-prometheus.jpg',
    alt: 'GGems Sports Academy Discussion Area',
  },
  {
    id: 'training',
    title: 'Training Facility',
    imageUrl: '/images/centers/center-sirifort.jpg',
    alt: 'GGems Sports Academy Training Facility',
  },
  {
    id: 'courts',
    title: 'Squash Courts',
    imageUrl: '/images/centers/hero-squash-court.jpg',
    alt: 'GGems Squash Courts',
  },
];

export default function VisitOfficeSection({
  settings,
  phones = [],
  emails = [],
  addresses = [],
}: VisitOfficeSectionProps) {
  const [selectedImage, setSelectedImage] = useState<OfficeGalleryItem>(DEFAULT_OFFICE_GALLERY[0]);

  const fallbackPhone = settings?.phone || '+91 8826433044';
  const fallbackEmail = settings?.email || 'info@ggemssportsacademy.com';
  const fallbackAddress =
    settings?.address && settings?.city
      ? `${settings.address}, ${settings.city}, ${settings.state || 'Uttar Pradesh'}, ${settings.pincode || '201304'}`
      : 'Jaypee Wish Town, Noida-134, Kosmos -62, Uttar Pradesh, 201304';
  const workingHours = settings?.workingHours || 'Mon - Sat, 9:00 AM - 6:00 PM';

  const displayPhones: DynamicContactPhone[] =
    phones.length > 0
      ? phones
      : [
          {
            id: 'fallback-phone',
            phoneNumber: fallbackPhone,
            role: 'Admissions Desk',
            displayOrder: 1,
            isPrimary: true,
          },
        ];

  const displayEmails: DynamicContactEmail[] =
    emails.length > 0
      ? emails
      : [
          {
            id: 'fallback-email',
            email: fallbackEmail,
            role: 'General Enquiries',
            displayOrder: 1,
            isPrimary: true,
          },
        ];

  const displayAddresses: DynamicContactAddress[] =
    addresses.length > 0
      ? addresses
      : [
          {
            id: 'fallback-address',
            label: 'Head Office',
            addressLine1: settings?.address || 'Jaypee Wish Town, Kosmos-62, Sector 134',
            city: settings?.city || 'Noida',
            state: settings?.state || 'Uttar Pradesh',
            pincode: settings?.pincode || '201304',
            displayOrder: 1,
            isPrimary: true,
          },
        ];

  const primaryCity = displayAddresses[0]?.city || settings?.city || 'Noida';

  return (
    <section id="our-location" className="relative w-full bg-[#0D1110] text-white py-16 sm:py-20 lg:py-24 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Heading, Description, Dark Contact Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <span className="text-xs font-bold text-[#63D13F] tracking-[0.2em] uppercase mb-3 font-heading">
              OUR LOCATION
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08] mb-4 font-heading">
              Visit Our Office <br />
              <span className="text-white">in {primaryCity}</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-md mb-8">
              Come and meet us at our office. We would be happy to discuss your goals, answer your questions and guide you towards the right programme.
            </p>

            {/* Dark Bordered Contact Information Box */}
            <div className="w-full rounded-2xl bg-[#141A17] border border-white/10 p-5 sm:p-6 flex flex-col gap-4 text-xs sm:text-[13px]">
              
              {/* Row 1: Addresses */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#63D13F]/15 flex items-center justify-center text-[#63D13F] shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col gap-2 min-w-0">
                  {displayAddresses.map((addr) => {
                    const formatted = `${addr.addressLine1}${addr.addressLine2 ? ', ' + addr.addressLine2 : ''}, ${addr.city}, ${addr.state}${addr.pincode ? ' ' + addr.pincode : ''}`;
                    return (
                      <div key={addr.id} className="flex flex-col">
                        {displayAddresses.length > 1 && (
                          <span className="text-[10px] font-bold text-[#63D13F] uppercase tracking-wider mb-0.5">
                            {addr.label}
                          </span>
                        )}
                        <span className="text-zinc-300 leading-snug">
                          {formatted}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Phone Numbers */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#63D13F]/15 flex items-center justify-center text-[#63D13F] shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  {displayPhones.map((p) => (
                    <div key={p.id} className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[11px] text-zinc-400 font-medium">{p.role}:</span>
                      <a
                        href={`tel:${p.phoneNumber.replace(/\s+/g, '')}`}
                        className="text-zinc-200 hover:text-white transition-colors font-mono font-medium"
                      >
                        {p.phoneNumber}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3: Emails */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#63D13F]/15 flex items-center justify-center text-[#63D13F] shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  {displayEmails.map((e) => (
                    <div key={e.id} className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[11px] text-zinc-400 font-medium">{e.role}:</span>
                      <a
                        href={`mailto:${e.email}`}
                        className="text-zinc-200 hover:text-white transition-colors break-all"
                      >
                        {e.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 4: Working Hours */}
              <div className="flex items-center gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#63D13F]/15 flex items-center justify-center text-[#63D13F] shrink-0">
                  <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <span className="text-zinc-300">
                  {workingHours}
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Main Facility/Office Image + 4 Interactive Thumbnails */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-3.5"
          >
            {/* Primary Large Image */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-center"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Active Caption Badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-semibold text-white">
                    {selectedImage.title}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 4 Interactive Thumbnails Below */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
              {DEFAULT_OFFICE_GALLERY.map((thumb) => {
                const isSelected = selectedImage.id === thumb.id;
                return (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => setSelectedImage(thumb)}
                    className={`flex flex-col text-left group cursor-pointer transition-all duration-200 ${
                      isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 border transition-all duration-200 ${
                        isSelected
                          ? 'border-[#63D13F] ring-2 ring-[#63D13F]/30 scale-[1.02]'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <Image
                        src={thumb.imageUrl}
                        alt={thumb.alt}
                        fill
                        sizes="25vw"
                        className="object-cover object-center"
                      />
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-semibold tracking-tight mt-1.5 transition-colors line-clamp-1 ${
                        isSelected ? 'text-[#63D13F]' : 'text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      {thumb.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
