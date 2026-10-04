'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import {
  ContactSiteSettings,
  DynamicContactPhone,
  DynamicContactEmail,
  DynamicContactAddress,
} from './types';

interface ContactInfoCardsProps {
  settings?: ContactSiteSettings;
  phones?: DynamicContactPhone[];
  emails?: DynamicContactEmail[];
  addresses?: DynamicContactAddress[];
}

export default function ContactInfoCards({
  settings,
  phones = [],
  emails = [],
  addresses = [],
}: ContactInfoCardsProps) {
  const fallbackPhone = settings?.phone || '+91 8826433044';
  const fallbackEmail = settings?.email || 'info@ggemssportsacademy.com';
  const fallbackAddress =
    settings?.address && settings?.city
      ? `${settings.address}, ${settings.city}, ${settings.state || 'Uttar Pradesh'}, ${settings.pincode || '201304'}`
      : 'Jaypee Wish Town, Noida-134, Kosmos -62, Uttar Pradesh, 201304';
  const instagramHandle = settings?.instagramHandle || '@ggemssquash';
  const instagramUrl = settings?.instagramUrl || 'https://instagram.com/ggemssquash';

  const displayPhones: DynamicContactPhone[] =
    phones.length > 0
      ? phones
      : [
          {
            id: 'fallback-phone',
            phoneNumber: fallbackPhone,
            role: 'Admissions & Enquiries',
            description: settings?.workingHours || 'Mon - Sat, 9:00 AM - 6:00 PM',
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
            description: 'We reply within 24 hours',
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
            directionsUrl: '#our-location',
            displayOrder: 1,
            isPrimary: true,
          },
        ];

  return (
    <section className="w-full bg-[#F7FAF5] py-8 sm:py-10 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-start">
          
          {/* Card 1: CALL US (Supports Multiple Phone Numbers & Roles) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0 }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E6EAE4] hover:border-[#63D13F]/50 shadow-2xs hover:shadow-sm transition-all duration-300 hover:-translate-y-1 group h-full"
          >
            <div className="w-12 h-12 rounded-full bg-[#EEF8EA] border border-[#63D13F]/20 flex items-center justify-center text-[#45B52D] shrink-0 group-hover:scale-105 group-hover:bg-[#63D13F] group-hover:text-white transition-all duration-300">
              <Phone className="w-5 h-5 stroke-[2]" />
            </div>

            <div className="flex flex-col min-w-0 pr-1 w-full">
              <span className="text-xs font-bold text-zinc-950 uppercase tracking-tight font-heading mb-2">
                Call Us
              </span>
              <div className="flex flex-col gap-3">
                {displayPhones.map((p) => (
                  <div key={p.id} className="flex flex-col">
                    <span className="text-[10.5px] font-bold text-zinc-500 uppercase tracking-wider">
                      {p.role}
                    </span>
                    <a
                      href={`tel:${p.phoneNumber.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-[13px] font-bold text-zinc-900 leading-snug hover:text-[#45B52D] transition-colors break-words font-mono"
                    >
                      {p.phoneNumber}
                    </a>
                    {p.description && (
                      <span className="text-[10.5px] text-[#666666] leading-tight mt-0.5 font-normal">
                        {p.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: EMAIL US (Supports Multiple Email Addresses & Roles) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E6EAE4] hover:border-[#63D13F]/50 shadow-2xs hover:shadow-sm transition-all duration-300 hover:-translate-y-1 group h-full"
          >
            <div className="w-12 h-12 rounded-full bg-[#EEF8EA] border border-[#63D13F]/20 flex items-center justify-center text-[#45B52D] shrink-0 group-hover:scale-105 group-hover:bg-[#63D13F] group-hover:text-white transition-all duration-300">
              <Mail className="w-5 h-5 stroke-[2]" />
            </div>

            <div className="flex flex-col min-w-0 pr-1 w-full">
              <span className="text-xs font-bold text-zinc-950 uppercase tracking-tight font-heading mb-2">
                Email Us
              </span>
              <div className="flex flex-col gap-3">
                {displayEmails.map((e) => (
                  <div key={e.id} className="flex flex-col">
                    <span className="text-[10.5px] font-bold text-zinc-500 uppercase tracking-wider">
                      {e.role}
                    </span>
                    <a
                      href={`mailto:${e.email}`}
                      className="text-xs sm:text-[13px] font-bold text-zinc-900 leading-snug hover:text-[#45B52D] transition-colors break-all"
                    >
                      {e.email}
                    </a>
                    {e.description && (
                      <span className="text-[10.5px] text-[#666666] leading-tight mt-0.5 font-normal">
                        {e.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: VISIT OUR OFFICE (Supports Dynamic Location) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E6EAE4] hover:border-[#63D13F]/50 shadow-2xs hover:shadow-sm transition-all duration-300 hover:-translate-y-1 group h-full"
          >
            <div className="w-12 h-12 rounded-full bg-[#EEF8EA] border border-[#63D13F]/20 flex items-center justify-center text-[#45B52D] shrink-0 group-hover:scale-105 group-hover:bg-[#63D13F] group-hover:text-white transition-all duration-300">
              <MapPin className="w-5 h-5 stroke-[2]" />
            </div>

            <div className="flex flex-col min-w-0 pr-1 w-full">
              <span className="text-xs font-bold text-zinc-950 uppercase tracking-tight font-heading mb-2">
                Visit Our Office
              </span>
              <div className="flex flex-col gap-3">
                {displayAddresses.map((addr) => {
                  const formatted = `${addr.addressLine1}${addr.addressLine2 ? ', ' + addr.addressLine2 : ''}, ${addr.city}, ${addr.state}${addr.pincode ? ' ' + addr.pincode : ''}`;
                  return (
                    <div key={addr.id} className="flex flex-col">
                      <span className="text-[10.5px] font-bold text-zinc-500 uppercase tracking-wider">
                        {addr.label}
                      </span>
                      <span className="text-xs sm:text-[12.5px] font-bold text-zinc-900 leading-snug break-words">
                        {formatted}
                      </span>
                      {(addr.directionsUrl || addr.mapUrl) && (
                        <a
                          href={addr.directionsUrl || addr.mapUrl || '#our-location'}
                          target={addr.mapUrl?.startsWith('http') ? '_blank' : undefined}
                          rel={addr.mapUrl?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-[11px] font-bold text-[#45B52D] hover:underline mt-1 inline-flex items-center gap-1"
                        >
                          <span>Get Directions</span>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Card 4: FOLLOW US */}
          <motion.a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E6EAE4] hover:border-[#63D13F]/50 shadow-2xs hover:shadow-sm transition-all duration-300 hover:-translate-y-1 group h-full"
          >
            <div className="w-12 h-12 rounded-full bg-[#EEF8EA] border border-[#63D13F]/20 flex items-center justify-center text-[#45B52D] shrink-0 group-hover:scale-105 group-hover:bg-[#63D13F] group-hover:text-white transition-all duration-300">
              <Instagram className="w-5 h-5 stroke-[2]" />
            </div>

            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-xs font-bold text-zinc-950 uppercase tracking-tight font-heading mb-0.5">
                Follow Us
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-zinc-900 leading-snug group-hover:text-[#45B52D] transition-colors break-words">
                {instagramHandle}
              </span>
              <span className="text-[11px] text-[#666666] leading-tight mt-1 font-normal">
                Stay updated with our activities
              </span>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}
