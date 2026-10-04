'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactEnquirySchema } from '@/lib/validation/schemas';
import { submitContactEnquiryAction } from '@/server/actions/public';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';

type ContactFormData = z.infer<typeof contactEnquirySchema>;

interface ContactSectionProps {
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  pincode?: string;
}

export default function ContactSection({
  phone = '+91 8826433044',
  email = 'contact@ggemssquash.com',
  address = 'Jaypee Wish Town, Kosmos-62, Sector 134',
  city = 'Noida',
  pincode = '201304',
}: ContactSectionProps = {}) {
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: {
      userType: 'STUDENT',
      name: '',
      phone: '',
      email: '',
      ageOrClass: '',
      preferredLocation: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const res = await submitContactEnquiryAction(data);
      if (res.success) {
        setServerSuccess(
          res.data?.message || 'Thank you! Your enquiry has been received. Our coach will contact you within 24 hours.'
        );
        reset();
      } else {
        setServerError(res.error?.message || 'Failed to submit enquiry. Please call us directly.');
      }
    } catch {
      setServerError(`An unexpected error occurred. Please call ${phone} directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Academy Narrative & Direct Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#48A427] text-xs font-bold tracking-widest uppercase mb-4">
                <span>GET IN TOUCH</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight mb-4 font-display">
                YOU’VE COME SO FAR. DON’T QUIT NOW.
              </h2>

              <p className="text-sm sm:text-base text-[#48A427] font-semibold italic mb-6">
                &ldquo;Unleash your Inner Champion at Squash Academy&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-8">
                Whether you’re introducing your child to squash, looking to break into national rankings,
                or exploring a school squash facility partnership, our coaching leadership is ready to
                guide you.
              </p>

              <div className="flex flex-col gap-4 text-xs text-zinc-700">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <MapPin className="w-4 h-4 text-[#48A427] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-950 block uppercase">Headquarters Office:</span>
                    <span>{address}{city ? `, ${city}` : ''}{pincode ? ` - ${pincode}` : ''}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <Phone className="w-4 h-4 text-[#48A427] shrink-0" />
                  <div>
                    <span className="font-bold text-zinc-950 block uppercase">Direct Phone:</span>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#48A427] font-semibold">
                      {phone.startsWith('+') ? phone : `+91 ${phone}`}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <Mail className="w-4 h-4 text-[#48A427] shrink-0" />
                  <div>
                    <span className="font-bold text-zinc-950 block uppercase">Email:</span>
                    <a href={`mailto:${email}`} className="hover:text-[#48A427]">
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-200 mt-8 text-xs text-zinc-500">
              In Association with Dhairya Bharat Foundation, India • Operating 25% of Squash Courts in Delhi NCR
            </div>
          </div>

          {/* Right Column: Multi-layer Validated Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200 shadow-2xl relative">
              <h3 className="text-xl font-bold text-zinc-950 uppercase tracking-wider mb-2">
                Book An Evaluation Session / Inquiry
              </h3>
              <p className="text-xs text-zinc-600 mb-6">
                Fill in the details below. Our coaching directors will assess player age and skill level.
              </p>

              {serverSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{serverSuccess}</span>
                </div>
              )}

              {serverError && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* User Type Selector */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                    I am a:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { value: 'STUDENT', label: 'Athlete / Player' },
                      { value: 'PARENT', label: 'Parent' },
                      { value: 'SCHOOL_REP', label: 'School / Institution' },
                      { value: 'COACH', label: 'Coach / Other' },
                    ].map((t) => (
                      <label
                        key={t.value}
                        className="cursor-pointer text-center text-xs p-2 rounded-lg bg-zinc-50 border border-zinc-200 hover:border-[#48A427] has-[:checked]:bg-[#48A427] has-[:checked]:text-white has-[:checked]:font-bold transition-colors"
                      >
                        <input
                          type="radio"
                          value={t.value}
                          {...register('userType')}
                          className="sr-only"
                        />
                        <span>{t.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      {...register('name')}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-50 border text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-[#48A427] focus:bg-white transition-colors ${
                        errors.name ? 'border-red-500' : 'border-zinc-200'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9810012345"
                      {...register('phone')}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-50 border text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-[#48A427] focus:bg-white transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-zinc-200'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[11px] text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Email & Age/Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      {...register('email')}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-50 border text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-[#48A427] focus:bg-white transition-colors ${
                        errors.email ? 'border-red-500' : 'border-zinc-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Age or School Class
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Age 12 / Class 7"
                      {...register('ageOrClass')}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-[#48A427] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Preferred Location */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Preferred Center of Excellence
                  </label>
                  <select
                    {...register('preferredLocation')}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:outline-none focus:border-[#48A427] focus:bg-white transition-colors"
                  >
                    <option value="">Select a Center...</option>
                    <option value="Siri Fort Sports Complex, Delhi">Siri Fort Sports Complex, Delhi</option>
                    <option value="Gyanshree School Noida-127">Gyanshree School Noida-127</option>
                    <option value="Squash & Badminton Stadium, New Delhi">Squash & Badminton Stadium, New Delhi</option>
                    <option value="Prometheus School Noida-131">Prometheus School Noida-131</option>
                    <option value="Ahlcon International School, Mayur Vihar">Ahlcon International School, Mayur Vihar</option>
                    <option value="ATS Society Noida (Sector 150/105/93)">ATS Society Noida (Sector 150/105/93)</option>
                    <option value="Salvation Tree School, Greater Noida West">Salvation Tree School, Greater Noida West</option>
                    <option value="KR Manglam School GK-2, New Delhi">KR Manglam School GK-2, New Delhi</option>
                    <option value="Jaypee Public School & Club Noida">Jaypee Public School & Club Noida</option>
                    <option value="Shakti Sports Club, Vadodara Gujarat">Shakti Sports Club, Vadodara Gujarat</option>
                    <option value="New School Partnership Consultation">New School Partnership Consultation</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Your Message / Goals *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your squash experience, playing goals, or partnership requirements..."
                    {...register('message')}
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-50 border text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-[#48A427] focus:bg-white transition-colors ${
                      errors.message ? 'border-red-500' : 'border-zinc-200'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-500">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-[#48A427] hover:bg-[#3B8A1D] text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#48A427]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Evaluation Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
