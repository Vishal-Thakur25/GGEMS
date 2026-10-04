'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, MapPin, ArrowRight, CheckCircle2, AlertCircle, Loader2, Maximize2 } from 'lucide-react';
import { submitContactEnquiryAction } from '@/server/actions/public';
import { DynamicContactAddress } from './types';

interface FormInputs {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactFormMapSectionProps {
  primaryAddress?: DynamicContactAddress | null;
}

const SUBJECT_OPTIONS = [
  { value: 'Programme Admissions', label: 'Programme Admissions' },
  { value: 'Trial Assessment Session', label: 'Trial Assessment Session' },
  { value: 'School Partnership', label: 'School Partnership' },
  { value: 'Coaching & Training', label: 'Coaching & Training' },
  { value: 'Facility & Court Booking', label: 'Facility & Court Booking' },
  { value: 'General Enquiry', label: 'General Enquiry' },
];

export default function ContactFormMapSection({ primaryAddress }: ContactFormMapSectionProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      // Map form data to existing contactEnquirySchema
      let userType: 'STUDENT' | 'PARENT' | 'SCHOOL_REP' | 'COACH' | 'OTHER' = 'STUDENT';
      if (data.subject === 'School Partnership') {
        userType = 'SCHOOL_REP';
      } else if (data.subject === 'Trial Assessment Session') {
        userType = 'PARENT';
      } else if (data.subject === 'Coaching & Training') {
        userType = 'COACH';
      } else if (data.subject === 'General Enquiry') {
        userType = 'OTHER';
      }

      const res = await submitContactEnquiryAction({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        userType,
        preferredLocation: 'Jaypee Wish Town, Sector 134, Noida',
        message: data.subject
          ? `[Subject: ${data.subject}]\n\n${data.message.trim()}`
          : data.message.trim(),
      });

      if (res.success) {
        setServerSuccess(
          'Thank you! Your message has been sent successfully. Our team will get back to you shortly.'
        );
        reset();
      } else {
        setServerError(res.error?.message || 'Failed to submit enquiry. Please check your information or call us.');
      }
    } catch {
      setServerError('An unexpected error occurred. Please call +91 8826433044 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleMapsUrl =
    primaryAddress?.directionsUrl ||
    primaryAddress?.mapUrl ||
    'https://www.google.com/maps/search/?api=1&query=Jaypee+Wish+Town+Kosmos+62+Sector+134+Noida+201304';

  const addressDisplay = primaryAddress
    ? `${primaryAddress.addressLine1}${primaryAddress.addressLine2 ? ', ' + primaryAddress.addressLine2 : ''}, ${primaryAddress.city}, ${primaryAddress.state} ${primaryAddress.pincode || ''}`
    : 'Jaypee Wish Town, Noida-134, Kosmos -62, Uttar Pradesh, 201304';

  const locationTitle = primaryAddress?.label || 'GGEMS Sports Academy';

  return (
    <section id="contact-form" className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Contact Form */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase mb-2.5 block font-heading">
              SEND US A MESSAGE
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-zinc-950 font-heading leading-tight mb-3">
              Contact Us
            </h2>

            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed max-w-xl mb-8">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>

            {/* Server Success Alert */}
            {serverSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#63D13F] shrink-0 mt-0.5" />
                <span>{serverSuccess}</span>
              </motion.div>
            )}

            {/* Server Error Alert */}
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-5" noValidate>
              
              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-zinc-900">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register('name', {
                      required: 'Full name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border text-xs sm:text-sm bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#63D13F] focus:ring-2 focus:ring-[#63D13F]/20 transition-all ${
                      errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E6EAE4]'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-500">{errors.name.message}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-zinc-900">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address format',
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border text-xs sm:text-sm bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#63D13F] focus:ring-2 focus:ring-[#63D13F]/20 transition-all ${
                      errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E6EAE4]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-500">{errors.email.message}</span>
                  )}
                </div>
              </div>

              {/* Row 2: Phone Number & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-zinc-900">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    {...register('phone', {
                      required: 'Phone number is required',
                      minLength: { value: 10, message: 'Please enter a valid phone number' },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border text-xs sm:text-sm bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#63D13F] focus:ring-2 focus:ring-[#63D13F]/20 transition-all ${
                      errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#E6EAE4]'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-red-500">{errors.phone.message}</span>
                  )}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-zinc-900">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    {...register('subject', { required: 'Please select a subject' })}
                    className={`w-full px-4 py-3 rounded-lg border text-xs sm:text-sm bg-white text-zinc-900 focus:outline-none focus:border-[#63D13F] focus:ring-2 focus:ring-[#63D13F]/20 transition-all cursor-pointer ${
                      errors.subject ? 'border-red-400 bg-red-50/20' : 'border-[#E6EAE4]'
                    }`}
                  >
                    <option value="">Select a subject</option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <span className="text-[11px] text-red-500">{errors.subject.message}</span>
                  )}
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-zinc-900">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message here..."
                  {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 5, message: 'Message must be at least 5 characters' },
                  })}
                  className={`w-full px-4 py-3 rounded-lg border text-xs sm:text-sm bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#63D13F] focus:ring-2 focus:ring-[#63D13F]/20 transition-all resize-y ${
                    errors.message ? 'border-red-400 bg-red-50/20' : 'border-[#E6EAE4]'
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] text-red-500">{errors.message.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#63D13F] hover:bg-[#45B52D] disabled:opacity-70 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#63D13F]/25 hover:shadow-lg hover:shadow-[#63D13F]/35 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* RIGHT: Stylized Map Graphic with Overlaid Card */}
          <div className="lg:col-span-5 relative w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden border border-[#E6EAE4] bg-[#E9EFE9] flex items-center justify-center shadow-xs">
            
            {/* Vector Map Background representation matching reference */}
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Landmass and blocks */}
              <rect width="500" height="500" fill="#E8EFE8" />
              
              {/* River / canal path on bottom */}
              <path d="M 0 460 C 150 440 280 470 500 440 L 500 500 L 0 500 Z" fill="#C5DCE8" />
              
              {/* Roads / Expressways */}
              <path d="M 0 120 L 500 240" stroke="#FFFFFF" strokeWidth="16" />
              <path d="M 120 0 L 260 500" stroke="#FFFFFF" strokeWidth="18" />
              <path d="M 400 0 L 480 500" stroke="#FFFFFF" strokeWidth="20" />
              <path d="M 0 350 L 500 350" stroke="#FFFFFF" strokeWidth="14" />
              <path d="M 240 200 L 420 300" stroke="#FFFFFF" strokeWidth="12" />

              {/* Express highway accents */}
              <path d="M 400 0 L 480 500" stroke="#DDE5DC" strokeWidth="4" strokeDasharray="6 4" />
              <path d="M 120 0 L 260 500" stroke="#DDE5DC" strokeWidth="4" strokeDasharray="6 4" />

              {/* Sector zones */}
              <text x="70" y="60" fill="#889888" fontSize="11" fontWeight="bold">Jaypee Wish Town</text>
              <text x="350" y="270" fill="#889888" fontSize="10">Sector 134</text>
              <text x="310" y="380" fill="#889888" fontSize="10">Sector 134</text>
              <text x="380" y="420" fill="#889888" fontSize="10">Sector 128 / 130</text>
              <text x="20" y="140" fill="#889888" fontSize="10">Sector 129</text>
              <text x="300" y="40" fill="#889888" fontSize="10">Sector 128</text>

              {/* Landmark: Jaypee Hospital with red pin */}
              <circle cx="280" cy="330" r="5" fill="#EF4444" />
              <text x="290" y="334" fill="#EF4444" fontSize="9" fontWeight="bold">Jaypee Hospital</text>
            </svg>

            {/* Pulsing Pin at GGEMS Location */}
            <div className="absolute top-[52%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-10 select-none">
              <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-[#63D13F] opacity-40 -translate-x-1/4 -translate-y-1/4" />
              <div className="w-10 h-10 rounded-full bg-[#63D13F] border-2 border-white shadow-lg flex items-center justify-center text-white">
                <MapPin className="w-5 h-5 fill-current" />
              </div>
            </div>

            {/* Floating Information Card matching reference */}
            <div className="absolute top-16 left-6 right-6 sm:left-8 sm:right-auto sm:max-w-xs z-20 p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-[#E6EAE4]">
              <h3 className="text-sm font-black text-zinc-950 font-heading mb-1.5">
                {locationTitle}
              </h3>
              <p className="text-[11px] text-[#666666] leading-relaxed mb-3">
                {addressDisplay}
              </p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#45B52D] hover:text-[#63D13F] transition-colors group"
              >
                <span>Get Directions</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Expand / View Full Map button */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on Google Maps"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl bg-white/90 hover:bg-white shadow-sm border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-black transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
