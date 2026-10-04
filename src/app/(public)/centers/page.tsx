import type { Metadata } from 'next';
import { getCenters, getCentersSections, getSiteSettings } from '@/server/queries';
import CentersHero from '@/components/centers/CentersHero';
import CentersFeatureStrip from '@/components/centers/CentersFeatureStrip';
import CentersNetworkSection from '@/components/centers/CentersNetworkSection';
import CentersDirectory from '@/components/centers/CentersDirectory';
import FeaturedCenterSection from '@/components/centers/FeaturedCenterSection';
import OurPresenceSection from '@/components/centers/OurPresenceSection';
import CentersCtaSection from '@/components/centers/CentersCtaSection';
import { CenterItem } from '@/components/centers/types';

export const metadata: Metadata = {
  title: 'GGEMS Sports Academy | Centers of Excellence',
  description:
    "Explore GGEMS Sports Academy's Centers of Excellence across Delhi NCR and other locations.",
  openGraph: {
    title: 'GGEMS Sports Academy | Centers of Excellence',
    description:
      "Explore GGEMS Sports Academy's Centers of Excellence across Delhi NCR and other locations.",
    images: [
      {
        url: '/images/centers/hero-squash-court.jpg',
        width: 1200,
        height: 630,
        alt: 'GGEMS Sports Academy Centers of Excellence',
      },
    ],
  },
};

// Verified Fallback Centers matching the GGEMS PDF & Seed Data
const FALLBACK_CENTERS: CenterItem[] = [
  {
    id: 'c1',
    name: 'Siri Fort Sports Complex',
    slug: 'siri-fort-sports-complex-delhi',
    city: 'Delhi',
    displayCity: 'Delhi',
    address: 'August Kranti Marg, Siri Fort Institutional Area, New Delhi',
    image: '/images/centers/center-sirifort.jpg',
    facilities:
      'International Standard Glass-back Courts, Air-conditioned Spectator Gallery, Pro Fitness Center, Locker Rooms, Video Analysis Booth',
    displayOrder: 1,
    isFeatured: true,
  },
  {
    id: 'c2',
    name: 'KR Manglam School GK-2',
    slug: 'kr-mangalam-school-gk-2-new-delhi',
    city: 'Delhi',
    displayCity: 'New Delhi',
    address: 'Block E, Greater Kailash II, New Delhi, Delhi 110048',
    image: '/images/centers/center-krmangalam.jpg',
    facilities:
      'Standard Wooden Floor Squash Courts, Junior Training Infrastructure, Physical Fitness Area',
    displayOrder: 2,
  },
  {
    id: 'c3',
    name: 'Shakti Sports Club',
    slug: 'shakti-sports-club-vadodara-gujarat',
    city: 'Vadodara',
    displayCity: 'Vadodara, Gujarat',
    address: 'Shakti Sports Complex, Gotri Road, Vadodara, Gujarat',
    image: '/images/centers/center-shaktisports.jpg',
    facilities:
      'Western India Regional Center, WSF Certified Coaching Staff, State Player Development Wing',
    displayOrder: 3,
  },
  {
    id: 'c4',
    name: 'Jaypee Public School & Club',
    slug: 'jaypee-public-school-club-noida',
    city: 'Noida',
    displayCity: 'Noida',
    address: 'Jaypee Greens, Sector 128, Wish Town, Noida, UP',
    image: '/images/centers/center-jaypee.jpg',
    facilities:
      'Tournament Grade Squash Courts, Conditioning Zone, Resident Coaching Staff',
    displayOrder: 4,
  },
  {
    id: 'c5',
    name: 'Gyanshree School',
    slug: 'gyanshree-school-noida-127',
    city: 'Noida',
    displayCity: 'Noida - 127',
    address: 'Sector 127, Expressway, Noida, UP 201304',
    image: '/images/centers/center-gyanshree.jpg',
    facilities:
      'Multi-court Squash Facility, Certified Coaching Team, After-School Academy',
    displayOrder: 5,
  },
  {
    id: 'c6',
    name: 'Squash & Badminton Stadium',
    slug: 'squash-badminton-stadium-new-delhi',
    city: 'Delhi',
    displayCity: 'New Delhi',
    address: 'Siri Fort Institutional Area, August Kranti Marg, New Delhi',
    image: '/images/centers/center-stadium.jpg',
    facilities:
      'Championship Glass Courts, National Event Host Facility, High-Performance Training Wing',
    displayOrder: 6,
  },
  {
    id: 'c7',
    name: 'Prometheus School',
    slug: 'prometheus-school-noida-131',
    city: 'Noida',
    displayCity: 'Noida - 131',
    address: 'Jaypee Greens Wish Town, Sector 131, Noida, UP 201304',
    image: '/images/centers/center-prometheus.jpg',
    facilities:
      'Glass Back Courts, High-performance Sports Science Support, Youth Development Program',
    displayOrder: 7,
  },
  {
    id: 'c8',
    name: 'Ahlcon International School',
    slug: 'ahlcon-international-school-mayur-vihar',
    city: 'Delhi',
    displayCity: 'Mayur Vihar, Delhi',
    address: 'Mayur Vihar Phase 1, Near Superior Court, Delhi 110091',
    image: '/images/centers/center-ahlcon.jpg',
    facilities:
      'Indoor Squash Facility, Certified Coaching Crew, School Team Development Wing',
    displayOrder: 8,
  },
  {
    id: 'c9',
    name: 'ATS Society',
    slug: 'ats-society-noida-centers',
    city: 'Noida',
    displayCity: 'Noida Sector - 150, 105 & 93',
    address: 'ATS Village & Greens, Sector 93A, 105 & 150, Noida, UP',
    image: '/images/centers/center-ats.jpg',
    facilities:
      'Resident Squash Courts, Weekend Training Batches, Private Coaching Available',
    displayOrder: 9,
  },
  {
    id: 'c10',
    name: 'Salvation Tree School',
    slug: 'salvation-tree-school-greater-noida-west',
    city: 'Greater Noida',
    displayCity: 'Greater Noida West',
    address: 'Sector 16B, Greater Noida West, Uttar Pradesh 201306',
    image: '/images/centers/center-salvationtree.jpg',
    facilities:
      'Dedicated Squash Court Facility, Physical Literacy Integration, Beginner to Intermediate Batches',
    displayOrder: 10,
  },
];

export default async function CentersPage() {
  // Fetch CMS sections and Centers in parallel with safe error handling
  const [dbCentersResult, sectionsResult, siteSettingsResult] = await Promise.allSettled([
    getCenters(true),
    getCentersSections(),
    getSiteSettings(),
  ]);

  const rawDbCenters = dbCentersResult.status === 'fulfilled' ? dbCentersResult.value : [];
  const cmsSections = sectionsResult.status === 'fulfilled' ? sectionsResult.value : [];
  const siteSettings = siteSettingsResult.status === 'fulfilled' ? siteSettingsResult.value : null;

  // Process Dynamic Centers or fallback
  let centers: CenterItem[] = [];

  if (rawDbCenters && rawDbCenters.length > 0) {
    centers = rawDbCenters.map((c) => {
      // Find matching fallback to preserve displayCity if needed
      const match = FALLBACK_CENTERS.find((f) => f.slug === c.slug);
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        city: c.city,
        displayCity: match?.displayCity || c.city,
        state: c.state,
        address: c.address,
        phone: c.phone,
        email: c.email,
        googleMapsUrl: c.googleMapsUrl,
        facilities: c.facilities,
        image: c.image || match?.image || '/images/centers/center-sirifort.jpg',
        isFeatured: c.isFeatured,
        displayOrder: c.displayOrder,
      };
    });
  } else {
    centers = FALLBACK_CENTERS;
  }

  // Parse CMS Section data if present
  const heroSection = cmsSections.find((s) => s.sectionType === 'HERO');
  const networkSection = cmsSections.find((s) => s.sectionType === 'NETWORK');
  const featuredSection = cmsSections.find((s) => s.sectionType === 'FEATURED_CENTER');
  const ctaSection = cmsSections.find((s) => s.sectionType === 'CTA');

  // Featured Center selection: first featured center or Siri Fort
  const featuredCenter =
    centers.find((c) => c.isFeatured || c.slug.includes('siri-fort')) || centers[0];

  return (
    <div className="w-full bg-white flex flex-col">
      {/* 1. Hero Section */}
      <CentersHero
        description={
          heroSection?.content ||
          'GGems Sports Academy delivers structured coaching and sports development across leading schools, sports complexes and partner facilities.'
        }
        imageUrl={heroSection?.imageUrl || '/images/centers/hero-squash-court.jpg'}
        videoUrl={heroSection?.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
      />

      {/* 2. Four Feature Blocks */}
      <CentersFeatureStrip />

      {/* 3. Dark GGEMS Network Section */}
      <CentersNetworkSection
        subtitle={networkSection?.subtitle || 'GGEMS NETWORK'}
        description={
          networkSection?.content ||
          'GGems Sports Academy works across schools, sports complexes and partner facilities to create structured opportunities for athlete development and promote a healthy sporting culture.'
        }
        ctaText={networkSection?.ctaLabel || 'Our Approach'}
        ctaUrl={networkSection?.ctaUrl || '/about'}
      />

      {/* 4. Centers Directory */}
      <CentersDirectory initialCenters={centers} />

      {/* 5. Featured Center */}
      <FeaturedCenterSection
        subtitle={featuredSection?.subtitle || 'FEATURED CENTER'}
        name={featuredSection?.title || featuredCenter.name}
        city={featuredCenter.displayCity || featuredCenter.city}
        description={
          featuredSection?.content ||
          'A premier sporting destination and one of the key centers where GGems Sports Academy conducts structured squash training programmes.'
        }
        imageUrl={
          featuredSection?.imageUrl ||
          '/images/centers/featured-sirifort.jpg'
        }
        slug={featuredCenter.slug}
      />

      {/* 6. Our Presence Section */}
      <OurPresenceSection centers={centers} />

      {/* 7. Final CTA Section */}
      <CentersCtaSection
        eyebrow={ctaSection?.subtitle || 'Be Part of a Stronger Sporting Community'}
        description={
          ctaSection?.content ||
          'Join GGems Sports Academy and take the first step towards a healthier, stronger and brighter future.'
        }
        ctaText={ctaSection?.ctaLabel || 'Enquire Now'}
        ctaUrl={ctaSection?.ctaUrl || '/contact'}
        phone={siteSettings?.phone || '8826433044'}
        imageUrl={ctaSection?.imageUrl || '/images/about/cta-squash-racket-ball.jpg'}
      />
    </div>
  );
}
