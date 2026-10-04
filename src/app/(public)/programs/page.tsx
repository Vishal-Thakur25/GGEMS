import type { Metadata } from 'next';
import { getProgramsSections, getPrograms, getSiteSettings } from '@/server/queries';
import ProgramHero from '@/components/programs/ProgramHero';
import ProgramBenefitsStrip from '@/components/programs/ProgramBenefitsStrip';
import TrainingPhilosophy from '@/components/programs/TrainingPhilosophy';
import SportsOffering from '@/components/programs/SportsOffering';
import HolisticApproach from '@/components/programs/HolisticApproach';
import ProgramLevels from '@/components/programs/ProgramLevels';
import ProgramCta from '@/components/programs/ProgramCta';

export const metadata: Metadata = {
  title: 'GGems Sports Academy | Programmes',
  description:
    'At GGems Sports Academy, we offer comprehensive sports training programmes designed for all age groups and skill levels. Our goal is to develop well-rounded athletes through expert coaching, modern facilities and a structured curriculum.',
  openGraph: {
    title: 'GGems Sports Academy | Programmes',
    description:
      'Explore world-class coaching, progressive sports training programmes, and elite facilities for beginner to professional athletes at GGems Sports Academy.',
    images: ['/images/Dynamic-Squash-Court-Action.png'],
  },
};

export const revalidate = 60; // ISR revalidation

export default async function ProgramsPage() {
  const [sections, dbPrograms, siteSettings] = await Promise.all([
    getProgramsSections().catch(() => []),
    getPrograms(true).catch(() => []),
    getSiteSettings().catch(() => null),
  ]);

  // Map sections by type for CMS flexibility
  const heroSection = sections.find((s) => s.sectionType === 'HERO');
  const benefitsSection = sections.find((s) => s.sectionType === 'BENEFITS_STRIP');
  const philosophySection = sections.find((s) => s.sectionType === 'PHILOSOPHY');
  const sportsSection = sections.find((s) => s.sectionType === 'SPORTS_OFFERING');
  const approachSection = sections.find((s) => s.sectionType === 'HOLISTIC_APPROACH');
  const levelsSection = sections.find((s) => s.sectionType === 'PROGRAMME_LEVELS');
  const ctaSection = sections.find((s) => s.sectionType === 'CTA');

  // Parse JSON styleConfigs if available
  let benefitsList;
  if (benefitsSection?.styleConfig) {
    try {
      const parsed = JSON.parse(benefitsSection.styleConfig);
      benefitsList = parsed.benefits;
    } catch {
      // Fallback
    }
  }

  let philosophyPillars;
  if (philosophySection?.styleConfig) {
    try {
      const parsed = JSON.parse(philosophySection.styleConfig);
      philosophyPillars = parsed.pillars;
    } catch {
      // Fallback
    }
  }

  let checklists;
  if (approachSection?.styleConfig) {
    try {
      const parsed = JSON.parse(approachSection.styleConfig);
      checklists = parsed.checklists;
    } catch {
      // Fallback
    }
  }

  let levelsList;
  if (levelsSection?.styleConfig) {
    try {
      const parsed = JSON.parse(levelsSection.styleConfig);
      levelsList = parsed.levels;
    } catch {
      // Fallback
    }
  }

  return (
    <main className="w-full bg-white min-h-screen">
      {/* 1. Programme Hero */}
      <ProgramHero
        headline={heroSection?.title || 'OUR PROGRAMMES'}
        subHeadline={
          heroSection?.subtitle || 'Structured Training. Stronger Athletes. Brighter Futures.'
        }
        description={
          heroSection?.content ||
          'At GGems Sports Academy, we offer comprehensive sports training programmes designed for all age groups and skill levels. Our goal is to develop well-rounded athletes through expert coaching, modern facilities and a structured curriculum.'
        }
        imageUrl={heroSection?.imageUrl || '/images/Dynamic-Squash-Court-Action.png'}
      />

      {/* 2. Feature / Benefits Strip */}
      <ProgramBenefitsStrip benefits={benefitsList} />

      {/* 3. Training Philosophy (Dark Section) */}
      <TrainingPhilosophy
        label={philosophySection?.subtitle || 'OUR TRAINING PHILOSOPHY'}
        headline={philosophySection?.title || 'Building Better Athletes Everyday'}
        description={
          philosophySection?.content ||
          'At GGems Sports, our training philosophy is built around consistency, discipline, and innovation. We aim to develop athletes who are technically proficient, physically strong, and mentally resilient.'
        }
        ctaLabel={philosophySection?.ctaLabel || 'Know Our Approach'}
        ctaUrl={philosophySection?.ctaUrl || '#our-approach'}
        pillars={philosophyPillars}
      />

      {/* 4. Sports Offering (With Category Filters) */}
      <SportsOffering
        label={sportsSection?.subtitle || 'SPORTS OFFERING'}
        headline={sportsSection?.title || 'Explore Our Sports Programmes'}
        description={
          sportsSection?.content ||
          'At GGems Sports, we are committed to offering comprehensive training programs across a variety of sports. Our mission is to help athletes hone their skills, develop a love for the game, and excel both on and off the field.'
        }
        programs={dbPrograms}
      />

      {/* 5. Holistic Sports Development / Our Approach */}
      <HolisticApproach
        label={approachSection?.subtitle || 'OUR APPROACH'}
        headline={approachSection?.title || 'Holistic Sports Development for Every Athlete'}
        description={
          approachSection?.content ||
          'We aim to develop a generation of healthier and fitter children through in-school physical education and sports programs. GGems Sports is a company founded by Gyanendra Pratap in 2018 with the aim of adding innovative value to both the sporting and corporate worlds.'
        }
        imageUrl={approachSection?.imageUrl || '/images/programs/approach-basketball.jpg'}
        checklists={checklists}
      />

      {/* 6. Programme Levels */}
      <ProgramLevels
        label={levelsSection?.subtitle || 'PROGRAMME LEVELS'}
        headline={levelsSection?.title || 'Programmes for Every Stage'}
        description={
          levelsSection?.content ||
          'From beginners to advanced athletes, our programmes are designed to help every athlete grow, learn and achieve their full potential.'
        }
        levels={levelsList}
      />

      {/* 7. Final Cinematic CTA */}
      <ProgramCta
        subtitle={ctaSection?.subtitle || 'Be Part of Our Journey'}
        headline={ctaSection?.title || 'Train. Compete. Excel.'}
        description={
          ctaSection?.content ||
          'Join GGems Sports Academy and take the first step towards a healthier, stronger and brighter future.'
        }
        ctaText={ctaSection?.ctaLabel || 'Enquire Now'}
        ctaUrl={ctaSection?.ctaUrl || '/contact'}
        callPhone={ctaSection?.secondaryCtaLabel || siteSettings?.phone || '8826433044'}
        imageUrl={ctaSection?.imageUrl || '/images/about/cta-squash-racket-ball.jpg'}
      />
    </main>
  );
}
