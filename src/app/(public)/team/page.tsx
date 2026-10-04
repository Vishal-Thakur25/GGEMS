import type { Metadata } from 'next';
import { getTeamMembers, getSiteSettings } from '@/server/queries';
import TeamHero from '@/components/team/TeamHero';
import TeamFeatures from '@/components/team/TeamFeatures';
import TeamPhilosophy from '@/components/team/TeamPhilosophy';
import CoreTeamSection from '@/components/team/CoreTeamSection';
import SupportingTeamSection from '@/components/team/SupportingTeamSection';
import TeamCtaSection from '@/components/team/TeamCtaSection';
import { TeamMemberItem, SupportingMemberItem } from '@/components/team/types';

export const metadata: Metadata = {
  title: 'GGEMS Sports Academy | Our Team',
  description:
    'Meet the experienced coaches and sports professionals behind GGEMS Sports Academy.',
  openGraph: {
    title: 'GGEMS Sports Academy | Our Team',
    description:
      'Meet the experienced coaches and sports professionals behind GGEMS Sports Academy.',
    images: [
      {
        url: '/images/about/hero-athlete-ribbon.png',
        width: 1200,
        height: 630,
        alt: 'GGEMS Sports Academy Team',
      },
    ],
  },
};

// Verified Core Team Members from approved GGEMS source
const FALLBACK_CORE_MEMBERS: TeamMemberItem[] = [
  {
    id: 'core-1',
    name: 'Gyanendra Prajapati',
    slug: 'gyanendra-prajapati',
    role: 'Founder & CEO',
    badges: ['ASF Certified Coach', '20+ Years Experience'],
    shortBio:
      'With over 20 years of experience in Squash coaching and Physical & Health Education (PHE), he has developed extensive expertise in grassroots as well as competitive player development.',
    profileImage: '/images/about/founder-gyanendra.jpg',
  },
  {
    id: 'core-2',
    name: 'Aakash Sharma',
    slug: 'aakash-sharma',
    role: 'Head Squash Coach & Advisor',
    badges: ['WSF Certified Coach', 'National Bronze Medalist'],
    shortBio:
      'An accomplished Squash player and coach with extensive experience in competitive Squash and player development. He has served as an Official Squash Coach with DDA and is also associated with IIT Delhi.',
    profileImage: '/images/about/coach-aakash-sharma.jpg',
  },
  {
    id: 'core-3',
    name: 'Dushyant Singh',
    slug: 'dushyant-singh',
    role: 'Senior Coach Consultant',
    badges: ['Level-2 Squash Coach', '30+ Years Experience'],
    shortBio:
      'Highly experienced Squash professional with an outstanding playing and coaching career. He was ranked among the Top 5 Squash players in India from 1984–1986 and has produced numerous national and international-level players.',
    profileImage: '/images/about/coach-dushyant-singh.jpg',
  },
];

// Verified Supporting Team Members from approved GGEMS source
const FALLBACK_SUPPORTING_MEMBERS: SupportingMemberItem[] = [
  {
    id: 'supp-1',
    name: 'Sanjeev Kumar',
    role: 'Squash Coach',
    description:
      'Presently working at BLS World School, Greater Noida West. Playing for UP last 5 years.',
    image: '/images/about/coach-1-thumb.png',
    slug: 'sanjeev-kumar',
  },
  {
    id: 'supp-2',
    name: 'Raj Yadav',
    role: 'Squash Coach',
    description:
      'Currently serving as a Squash Coach at Jaypee Sports Complex.',
    image: '/images/about/coach-2-thumb.png',
    slug: 'raj-yadav',
  },
  {
    id: 'supp-3',
    name: 'And More',
    description:
      'Our extended coaching team continues to guide and support athletes across all our centers.',
    slug: 'contact',
  },
];

export default async function TeamPage() {
  // Fetch dynamic CMS data safely
  const [teamResult, siteSettingsResult] = await Promise.allSettled([
    getTeamMembers(true),
    getSiteSettings(),
  ]);

  const rawCoaches = teamResult.status === 'fulfilled' ? teamResult.value : [];
  const siteSettings = siteSettingsResult.status === 'fulfilled' ? siteSettingsResult.value : null;

  // Process Core Team from dynamic database/CMS data
  const coreTeam: TeamMemberItem[] =
    rawCoaches && rawCoaches.length > 0
      ? rawCoaches.map((c) => {
          let badges: string[] = [];
          if (c.qualifications) {
            badges = c.qualifications
              .split(/[|,]/)
              .map((s) => s.trim())
              .filter(Boolean)
              .slice(0, 2);
          }
          if (badges.length === 0 && c.experienceYears) {
            badges.push(`${c.experienceYears}+ Years Experience`);
          }
          return {
            id: c.id,
            name: c.name,
            slug: c.slug,
            role: c.role,
            designation: c.role,
            badges,
            shortBio: c.shortBio,
            bio: c.shortBio,
            profileImage: c.profileImage || '/images/about/founder-gyanendra.jpg',
            image: c.profileImage || '/images/about/founder-gyanendra.jpg',
            experienceYears: c.experienceYears,
            specialization: c.specialization,
            displayOrder: c.displayOrder,
          };
        })
      : [];

  // Process Supporting Team
  let supportingTeam: SupportingMemberItem[] = FALLBACK_SUPPORTING_MEMBERS;

  return (
    <div className="w-full bg-white flex flex-col">
      {/* 1. Team Hero */}
      <TeamHero />

      {/* 2. Four Feature/Strength Blocks */}
      <TeamFeatures />

      {/* 3. Dark "Our Philosophy" Section */}
      <TeamPhilosophy />

      {/* 4. Core Team Section */}
      <CoreTeamSection members={coreTeam} />

      {/* 5. Supporting Team Section */}
      <SupportingTeamSection members={supportingTeam} />

      {/* 6. Final CTA Section */}
      <TeamCtaSection phone={siteSettings?.phone || '8826433044'} />
    </div>
  );
}
