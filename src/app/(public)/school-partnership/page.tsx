import type { Metadata } from 'next';
import { getSchoolPartnership, getSiteSettings } from '@/server/queries';
import ContactSection from '@/components/home/ContactSection';
import { GraduationCap, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'School Squash Partnerships | Turnkey Academy Program | GGems',
  description:
    'Turnkey squash academy programs for schools across Delhi NCR. Certified WSF coaches, court operations, tournament exposure, and PE integration.',
};

export default async function SchoolPartnershipPage() {
  const [{ proposal, partners }, siteSettings] = await Promise.all([
    getSchoolPartnership(),
    getSiteSettings(),
  ]);

  const benefits: string[] = proposal?.benefitsList
    ? JSON.parse(proposal.benefitsList)
    : [
        'Certified World Squash Federation (WSF) & ASF coaches stationed at your campus',
        'Complete structured curriculum from grassroots beginner to national ranking',
        'Physical education integration with strength, agility and flexibility training',
        'Zero administrative headache: equipment, stringing, match management handled by GGems',
        'Elevated school prestige through national tournament medals and sports scholarships',
        'Direct pathway for students to earn national sports quotas and university credentials',
      ];

  return (
    <div className="pt-28 pb-24 bg-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#48A427] text-xs font-bold tracking-widest uppercase mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>INSTITUTIONAL PARTNERSHIP PROPOSAL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-950 uppercase leading-none mb-6 font-display">
            BUILD A SQUASH PROGRAM AT YOUR SCHOOL.
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
            Elevate your institution’s sports legacy. GGems provides turnkey squash academy
            integration, from World Squash Federation (WSF) certified coaching personnel to competitive
            national tournament representation.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-50 border border-zinc-200 shadow-xl">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-[#48A427] uppercase tracking-wider block mb-2 font-mono">
              WHY SCHOOLS CHOOSE GGEMS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 uppercase tracking-tight font-display">
              Turnkey Sports Academy Integration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-[#48A427] text-white font-black text-xs flex items-center justify-center shrink-0 font-display">
                  0{i + 1}
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <Phone className="w-4 h-4 text-[#48A427]" />
              <span>Direct Partnership Line:</span>
              <a
                href={`tel:${(siteSettings?.phone || '8826433044').replace(/\s+/g, '')}`}
                className="font-bold text-zinc-950 hover:text-[#48A427]"
              >
                {siteSettings?.phone
                  ? siteSettings.phone.startsWith('+')
                    ? siteSettings.phone
                    : `+91 ${siteSettings.phone}`
                  : '+91 8826433044'}
              </a>
            </div>
            <a
              href={`mailto:${siteSettings?.email || 'partnerships@ggemssquash.com'}`}
              className="text-xs text-[#48A427] hover:underline font-bold uppercase tracking-wider"
            >
              {siteSettings?.email || 'partnerships@ggemssquash.com'}
            </a>
          </div>
        </div>
      </section>

      {/* Current Partner Institutions from PDF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#48A427] uppercase tracking-wider block mb-2 font-mono">
            PROVEN TRACK RECORD
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 uppercase tracking-tight font-display">
            Partner Schools & Complexes
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="p-5 rounded-2xl bg-white border border-zinc-200 flex flex-col justify-between hover:border-[#48A427]/40 transition-colors shadow-sm"
            >
              <div>
                <span className="w-2 h-2 rounded-full bg-[#48A427] block mb-3" />
                <h4 className="text-xs sm:text-sm font-bold text-zinc-950 uppercase font-display">
                  {partner.schoolName}
                </h4>
                <p className="text-[11px] text-zinc-600 mt-1">{partner.location}</p>
              </div>
              <span className="text-[10px] font-mono text-[#48A427] font-bold mt-4 pt-3 border-t border-zinc-200 uppercase">
                {partner.partnershipType}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated School Partnership Inquiry Form */}
      <ContactSection
        phone={siteSettings?.phone}
        email={siteSettings?.email}
        address={siteSettings?.address}
        city={siteSettings?.city}
        pincode={siteSettings?.pincode}
      />
    </div>
  );
}
