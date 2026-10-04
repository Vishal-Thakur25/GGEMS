import type { Metadata } from 'next';
import { getContactPageData, getFaqs } from '@/server/queries';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfoCards from '@/components/contact/ContactInfoCards';
import VisitOfficeSection from '@/components/contact/VisitOfficeSection';
import ContactFormMapSection from '@/components/contact/ContactFormMapSection';
import ContactFaqSection from '@/components/contact/ContactFaqSection';
import ContactCtaSection from '@/components/contact/ContactCtaSection';
import {
  ContactSiteSettings,
  FaqItem,
  DynamicContactPhone,
  DynamicContactEmail,
  DynamicContactAddress,
} from '@/components/contact/types';

export const metadata: Metadata = {
  title: 'Contact GGEMS Sports Academy',
  description:
    'Get in touch with GGEMS Sports Academy for programme enquiries, coaching information, school partnerships and sports training opportunities.',
  openGraph: {
    title: 'Contact GGEMS Sports Academy',
    description:
      'Get in touch with GGEMS Sports Academy for programme enquiries, coaching information, school partnerships and sports training opportunities.',
    images: [
      {
        url: '/images/about/hero-athlete-ribbon.png',
        width: 1200,
        height: 630,
        alt: 'Contact GGEMS Sports Academy',
      },
    ],
  },
};

// Verified Fallback FAQs matching reference mockup and official GGEMS info
const FALLBACK_FAQS: FaqItem[] = [
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
      'You can enrol by filling out our enquiry form, calling our admissions desk at +91 8826433044, or booking an evaluation assessment session at your nearest GGems center.',
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

export default async function ContactPage() {
  // Fetch CMS dynamic contact data and FAQs in parallel via optimized server-side query
  const [contactDataResult, faqsResult] = await Promise.allSettled([
    getContactPageData(),
    getFaqs(),
  ]);

  const rawContactData = contactDataResult.status === 'fulfilled' ? contactDataResult.value : null;
  const rawFaqs = faqsResult.status === 'fulfilled' ? faqsResult.value : [];

  const rawSettings = rawContactData?.siteSettings;
  const phones: DynamicContactPhone[] = rawContactData?.phones || [];
  const emails: DynamicContactEmail[] = rawContactData?.emails || [];
  const addresses: DynamicContactAddress[] = rawContactData?.addresses || [];

  // Determine primary contact methods
  const primaryPhoneObj = phones.find((p) => p.isPrimary) || phones[0];
  const primaryPhone = primaryPhoneObj?.phoneNumber || rawSettings?.phone || '+91 8826433044';

  const primaryEmailObj = emails.find((e) => e.isPrimary) || emails[0];
  const primaryEmail = primaryEmailObj?.email || rawSettings?.email || 'info@ggemssportsacademy.com';

  const primaryAddressObj = addresses.find((a) => a.isPrimary) || addresses[0] || null;

  const settings: ContactSiteSettings = {
    phone: primaryPhone,
    secondaryPhone: phones.length > 1 ? phones[1].phoneNumber : rawSettings?.secondaryPhone || null,
    email: primaryEmail,
    address: primaryAddressObj?.addressLine1 || rawSettings?.address || 'Jaypee Wish Town, Kosmos-62, Sector 134',
    city: primaryAddressObj?.city || rawSettings?.city || 'Noida',
    state: primaryAddressObj?.state || rawSettings?.state || 'Uttar Pradesh',
    pincode: primaryAddressObj?.pincode || rawSettings?.pincode || '201304',
    workingHours: primaryPhoneObj?.description || 'Mon - Sat, 9:00 AM - 6:00 PM',
    instagramUrl: rawSettings?.instagramUrl || 'https://instagram.com/ggemssquash',
    instagramHandle: '@ggemssquash',
    googleMapsUrl:
      primaryAddressObj?.directionsUrl ||
      primaryAddressObj?.mapUrl ||
      'https://www.google.com/maps/search/?api=1&query=Jaypee+Wish+Town+Kosmos+62+Sector+134+Noida+201304',
  };

  const faqs: FaqItem[] =
    rawFaqs && rawFaqs.length > 0
      ? rawFaqs.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
          category: f.category,
        }))
      : FALLBACK_FAQS;

  return (
    <div className="w-full bg-white flex flex-col">
      {/* 01. Contact Hero */}
      <ContactHero phone={primaryPhone} />

      {/* 02. Contact Information Cards */}
      <ContactInfoCards
        settings={settings}
        phones={phones}
        emails={emails}
        addresses={addresses}
      />

      {/* 03. Visit Our Office / Location Section */}
      <VisitOfficeSection
        settings={settings}
        phones={phones}
        emails={emails}
        addresses={addresses}
      />

      {/* 04. Contact Form + Map Section */}
      <ContactFormMapSection primaryAddress={primaryAddressObj} />

      {/* 05. FAQ Section */}
      <ContactFaqSection faqs={faqs} phone={primaryPhone} />

      {/* 06. Final Sports Community CTA */}
      <ContactCtaSection phone={primaryPhone} />
    </div>
  );
}
