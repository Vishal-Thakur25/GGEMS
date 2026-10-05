import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProgramBySlug, getPrograms, getSiteSettings } from '@/server/queries';
import ProgrammeBreadcrumb from '@/components/programmes/ProgrammeBreadcrumb';
import ProgrammeHero from '@/components/programmes/ProgrammeHero';
import ProgrammeHighlights from '@/components/programmes/ProgrammeHighlights';
import ProgrammeOverview from '@/components/programmes/ProgrammeOverview';
import ProgrammeTrainingStructure from '@/components/programmes/ProgrammeTrainingStructure';
import ProgrammeFacilities from '@/components/programmes/ProgrammeFacilities';
import ProgrammeTestimonialsAndFaq from '@/components/programmes/ProgrammeTestimonialsAndFaq';
import ProgrammeFinalCta from '@/components/programmes/ProgrammeFinalCta';

interface ProgrammePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Incremental Static Regeneration

export async function generateStaticParams() {
  try {
    const programs = await getPrograms(true);
    return programs.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProgrammePageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    return {
      title: 'Programme Not Found | GGEMS Sports Academy',
    };
  }

  const metaTitle =
    program.metaTitle || `${program.title} | GGEMS Sports Academy`;
  const metaDescription =
    program.metaDescription ||
    program.heroDescription ||
    program.shortDescription ||
    `Experience world-class ${program.title} coaching at GGEMS Sports Academy. Modern training facilities, certified coaches, and structured competitive development.`;
  const ogImage =
    program.ogImage ||
    program.heroImage ||
    program.featuredImage ||
    '/images/Dynamic-Squash-Court-Action.png';

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${program.title} - GGEMS Sports Academy`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export default async function IndividualProgrammePage({
  params,
}: ProgrammePageProps) {
  const { slug } = await params;
  const [program, siteSettings] = await Promise.all([
    getProgramBySlug(slug),
    getSiteSettings(),
  ]);

  if (!program || program.status !== 'PUBLISHED') {
    notFound();
  }

  return (
    <div className="relative bg-white text-zinc-950 font-sans selection:bg-[#63D13F] selection:text-white">
      {/* 1. Breadcrumb Section */}
      <ProgrammeBreadcrumb title={program.title} />

      {/* 2. Hero Section */}
      <ProgrammeHero
        eyebrow={program.heroEyebrow}
        title={program.title}
        heroTitle={program.heroTitle}
        subtitle={program.heroSubtitle}
        description={program.heroDescription || program.shortDescription}
        primaryCtaText={program.primaryCtaText}
        primaryCtaLink={program.primaryCtaLink}
        secondaryCtaText={program.secondaryCtaText}
        secondaryCtaLink={program.secondaryCtaLink}
        imageUrl={program.heroImage || program.featuredImage}
        videoUrl={program.heroVideo}
        badgesData={program.heroBadgesData}
      />

      {/* 3. Programme Highlights (4 Cards) */}
      <ProgrammeHighlights highlightsData={program.highlightsData} />

      {/* 4. Programme Overview & Who Can Join */}
      <ProgrammeOverview
        label={program.overviewLabel}
        title={program.overviewTitle || `About ${program.title}`}
        description={program.overviewDescription || program.fullDescription}
        secondaryDescription={program.overviewSecondaryDescription}
        imageUrl={program.overviewImage || program.featuredImage}
        videoUrl={program.overviewVideo || program.heroVideo}
        ctaText={program.overviewCtaText}
        ctaLink={program.overviewCtaLink}
        whoCanJoinTitle={program.whoCanJoinTitle}
        audienceData={program.audienceData}
      />

      {/* 5. Training Structure (A Step-by-Step Approach) */}
      <ProgrammeTrainingStructure
        eyebrow={program.trainingStructureEyebrow}
        title={program.trainingStructureTitle}
        description={program.trainingStructureDescription}
        stagesData={program.stagesData}
      />

      {/* 6. Facilities (World-Class Training Environment) */}
      <ProgrammeFacilities
        eyebrow={program.facilitiesEyebrow}
        title={program.facilitiesTitle}
        facilitiesData={program.facilitiesData}
      />

      {/* 7 & 8. What Our Players Say & Frequently Asked Questions (Side-by-side on desktop) */}
      <ProgrammeTestimonialsAndFaq
        testimonialEyebrow={program.testimonialEyebrow}
        testimonialTitle={program.testimonialTitle}
        testimonialsData={program.testimonialsData}
        faqEyebrow={program.faqEyebrow}
        faqTitle={program.faqTitle}
        faqsData={program.faqsData}
      />

      {/* 9. Final Cinematic CTA */}
      <ProgrammeFinalCta
        label={program.ctaLabel}
        title={program.ctaTitle}
        description={
          program.ctaDescription ||
          `Join our ${program.title} programme and be part of a professional and supportive sporting community.`
        }
        backgroundImage={program.ctaBackgroundImage}
        primaryText={program.ctaPrimaryText}
        primaryLink={program.ctaPrimaryLink}
        secondaryText={program.ctaSecondaryText}
        secondaryLink={
          program.secondaryCtaLink ||
          (siteSettings?.phone ? `tel:${siteSettings.phone.replace(/\s+/g, '')}` : 'tel:8826433044')
        }
        audienceLinksData={program.ctaAudienceLinks}
      />
    </div>
  );
}
