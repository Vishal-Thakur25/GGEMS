import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCenterBySlug, getCenters } from '@/server/queries';
import { CenterItem } from '@/components/centers/types';
import CenterDetailHero from '@/components/centers/detail/CenterDetailHero';
import CenterQuickInfo from '@/components/centers/detail/CenterQuickInfo';
import CenterAboutSection from '@/components/centers/detail/CenterAboutSection';
import CenterGallerySection from '@/components/centers/detail/CenterGallerySection';
import CenterProgrammesSection from '@/components/centers/detail/CenterProgrammesSection';
import CenterTestimonialSection from '@/components/centers/detail/CenterTestimonialSection';
import CenterFinalCtaSection from '@/components/centers/detail/CenterFinalCtaSection';

interface CenterPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const centers = await getCenters(true);
    return centers.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: CenterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const center = await getCenterBySlug(slug);

  if (!center || center.status !== 'PUBLISHED') {
    return {
      title: 'Center Not Found | GGems Sports Academy',
      description: 'The requested sports center or school partner could not be found.',
    };
  }

  const title = `${center.name} | GGems Sports Academy Partner`;
  const description =
    center.shortDescription ||
    center.aboutDescription?.slice(0, 160) ||
    `Official training center and sports partner: ${center.name}, ${center.city}. World-class squash and athletic coaching.`;
  const ogImage =
    center.heroImage ||
    center.image ||
    '/images/centers/center-jaypee.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: `/centers/${center.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/centers/${center.slug}`,
      siteName: 'GGems Sports Academy',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: center.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SingleCenterPage({ params }: CenterPageProps) {
  const { slug } = await params;
  const rawCenter = await getCenterBySlug(slug);

  if (!rawCenter || rawCenter.status !== 'PUBLISHED') {
    notFound();
  }

  // Format data for strongly typed client components
  const center: CenterItem = {
    id: rawCenter.id,
    name: rawCenter.name,
    slug: rawCenter.slug,
    city: rawCenter.city,
    displayCity: rawCenter.city,
    state: rawCenter.state || undefined,
    address: rawCenter.address,
    phone: rawCenter.phone,
    email: rawCenter.email,
    googleMapsUrl: rawCenter.googleMapsUrl,
    facilities: rawCenter.facilities,
    image: rawCenter.image,
    isFeatured: rawCenter.isFeatured,
    displayOrder: rawCenter.displayOrder,
    status: rawCenter.status,

    // Extended Partner Page CMS fields
    category: rawCenter.category,
    location: rawCenter.location,
    shortDescription: rawCenter.shortDescription,
    heroImage: rawCenter.heroImage,
    brochureUrl: rawCenter.brochureUrl,
    websiteUrl: rawCenter.websiteUrl,
    aboutLabel: rawCenter.aboutLabel,
    aboutHeading: rawCenter.aboutHeading,
    aboutDescription: rawCenter.aboutDescription,
    aboutImage: rawCenter.aboutImage,
    videoUrl: rawCenter.videoUrl,
    partnershipType: rawCenter.partnershipType,
    sportsOffered: rawCenter.sportsOffered,
    studentEngagement: rawCenter.studentEngagement,
    programmesData: rawCenter.programmesData,
    testimonialQuote: rawCenter.testimonialQuote,
    testimonialAuthor: rawCenter.testimonialAuthor,
    testimonialRole: rawCenter.testimonialRole,
    testimonialImage: rawCenter.testimonialImage,
    testimonialsData: rawCenter.testimonialsData,
    ctaLabel: rawCenter.ctaLabel,
    ctaHeading: rawCenter.ctaHeading,
    ctaDescription: rawCenter.ctaDescription,
    ctaBackgroundImage: rawCenter.ctaBackgroundImage,

    images: rawCenter.images.map((img) => ({
      id: img.id,
      imageUrl: img.imageUrl,
      caption: img.caption,
      displayOrder: img.displayOrder,
    })),
  };

  // Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: center.name,
    description: center.shortDescription || center.aboutDescription,
    image: center.heroImage || center.image,
    address: {
      '@type': 'PostalAddress',
      streetAddress: center.address,
      addressLocality: center.city,
      addressRegion: center.state,
      addressCountry: 'IN',
    },
    telephone: center.phone,
    url: `https://ggemssports.com/centers/${center.slug}`,
  };

  return (
    <div className="w-full bg-white selection:bg-[#63D13F] selection:text-black">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 & 02. Breadcrumb + Individual Center Hero */}
      <CenterDetailHero center={center} />

      {/* 03. Quick Information Strip */}
      <CenterQuickInfo center={center} />

      {/* 04. About The School / Center */}
      <CenterAboutSection center={center} />

      {/* 05. Campus & Sports Facilities Gallery */}
      <CenterGallerySection center={center} />

      {/* 06. Programmes At This Center */}
      <CenterProgrammesSection center={center} />

      {/* 07. Partner/Testimonial Section */}
      <CenterTestimonialSection center={center} />

      {/* 08. Final Partner CTA */}
      <CenterFinalCtaSection center={center} />
    </div>
  );
}
