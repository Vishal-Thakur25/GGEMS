import {
  getHeroSection,
  getHomepageSections,
  getStatistics,
  getPrograms,
  getTeamMembers,
  getCenters,
  getTestimonials,
  getEcosystemVerticals,
  getSiteSettings,
} from '@/server/queries';
import Hero from '@/components/home/Hero';
import ImpactSection from '@/components/home/ImpactSection';
import EcosystemSection from '@/components/home/EcosystemSection';
import ProgramsSection from '@/components/home/ProgramsSection';
import WhySection from '@/components/home/WhySection';
import PhilosophySection from '@/components/home/PhilosophySection';
import PartnershipBanner from '@/components/home/PartnershipBanner';
import TeamSection from '@/components/home/TeamSection';
import CentersSection from '@/components/home/CentersSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';

export const revalidate = 60; // SSR with selective cache revalidation

export default async function HomePage() {
  const [hero, statistics, verticals, programs, team, centers, testimonials, siteSettings] =
    await Promise.all([
      getHeroSection(),
      getStatistics(),
      getEcosystemVerticals(true),
      getPrograms(true),
      getTeamMembers(true),
      getCenters(true),
      getTestimonials(),
      getSiteSettings(),
    ]);

  const safeHero = {
    badgeText: hero?.badgeText || 'DISCIPLINE / DEVELOPMENT / CHAMPIONSHIP',
    headline: hero?.headline || 'GGEMS SQUASH ACADEMY',
    subHeadline: hero?.subHeadline || 'TRAIN. COMPETE. EXCEL.',
    description:
      hero?.description ||
      'Professional squash coaching and athlete development for beginners, competitive players and high-performance athletes across premier centers in Delhi NCR.',
    primaryCtaText: hero?.primaryCtaText || 'START YOUR JOURNEY',
    primaryCtaUrl: hero?.primaryCtaUrl || '/contact',
    secondaryCtaText: hero?.secondaryCtaText || 'PARTNER WITH US',
    secondaryCtaUrl: hero?.secondaryCtaUrl || '/school-partnership',
    callNowPhone: hero?.callNowPhone || siteSettings?.phone || '8826433044',
    mediaType: hero?.mediaType || 'IMAGE',
    imageUrl:
      hero?.imageUrl ||
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2000&auto=format&fit=crop',
    backgroundOverlayOpacity: hero?.backgroundOverlayOpacity ?? 75,
    alignment: hero?.alignment || 'left',
    isActive: hero?.isActive ?? true,
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (TRAIN. COMPETE. EXCEL.) */}
      <Hero hero={safeHero} />

      {/* 2. Sleek Dark Stats Bar (20+, 260, 200, 45, 15, 25%) */}
      <ImpactSection statistics={statistics} />

      {/* 3. The GGEMS Ecosystem (MORE THAN JUST SPORTS.) */}
      <EcosystemSection verticals={verticals} />

      {/* 4. Programmes Section (From Beginner to High Performance) */}
      <ProgramsSection programs={programs} />

      {/* 4. Why GGems (A Structured Approach to Player Development) */}
      <WhySection />

      {/* 5. Philosophy (DISCIPLINE. CONSISTENCY. INNOVATION.) */}
      <PhilosophySection />

      {/* 6. CTA Banner (YOUR JOURNEY STARTS HERE.) */}
      <PartnershipBanner phone={siteSettings?.phone} />

      {/* 7. Centers of Excellence */}
      <CentersSection centers={centers} />

      {/* 8. Elite Coaching Team */}
      <TeamSection team={team} />

      {/* 9. Athlete Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 10. Contact / Evaluation Form */}
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
