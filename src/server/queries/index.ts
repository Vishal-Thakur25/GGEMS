import db from '@/lib/db';
import { ContentStatus } from '@prisma/client';

/**
 * Site Settings Query
 */
export async function getSiteSettings() {
  const [settings, primaryPhone, primaryEmail, primaryAddress] = await Promise.all([
    db.siteSettings.findUnique({
      where: { id: 1 },
      select: {
        siteName: true,
        siteTagline: true,
        siteDescription: true,
        phone: true,
        secondaryPhone: true,
        email: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        associationText: true,
        logoUrl: true,
        faviconUrl: true,
        instagramUrl: true,
        instagramAltUrl: true,
        youtubeUrl: true,
        facebookUrl: true,
        linkedinUrl: true,
        officeLocationDetails: true,
        copyrightText: true,
      },
    }),
    db.contactPhone
      .findFirst({
        where: { isActive: true },
        orderBy: [{ isPrimary: 'desc' }, { displayOrder: 'asc' }],
        select: { phoneNumber: true },
      })
      .catch(() => null),
    db.contactEmail
      .findFirst({
        where: { isActive: true },
        orderBy: [{ isPrimary: 'desc' }, { displayOrder: 'asc' }],
        select: { email: true },
      })
      .catch(() => null),
    db.contactAddress
      .findFirst({
        where: { isActive: true },
        orderBy: [{ isPrimary: 'desc' }, { displayOrder: 'asc' }],
        select: {
          addressLine1: true,
          addressLine2: true,
          city: true,
          state: true,
          pincode: true,
        },
      })
      .catch(() => null),
  ]);

  if (!settings) return null;

  return {
    ...settings,
    phone: primaryPhone?.phoneNumber || settings.phone,
    email: primaryEmail?.email || settings.email,
    address: primaryAddress
      ? `${primaryAddress.addressLine1}${primaryAddress.addressLine2 ? ', ' + primaryAddress.addressLine2 : ''}`
      : settings.address,
    city: primaryAddress?.city || settings.city,
    state: primaryAddress?.state || settings.state,
    pincode: primaryAddress?.pincode || settings.pincode,
  };
}

/**
 * Theme Settings Query (Controlled visual design tokens)
 */
export async function getThemeSettings() {
  return await db.themeSettings.findUnique({
    where: { id: 1 },
    select: {
      primaryColor: true,
      secondaryColor: true,
      accentColor: true,
      backgroundColor: true,
      surfaceColor: true,
      textColor: true,
      textMutedColor: true,
      borderColor: true,
      headingFont: true,
      bodyFont: true,
      borderRadius: true,
      buttonStyle: true,
      containerWidth: true,
    },
  });
}

/**
 * SEO Settings Query
 */
export async function getSeoSettings() {
  return await db.seoSettings.findUnique({
    where: { id: 1 },
    select: {
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true,
      ogImageUrl: true,
      canonicalBaseUrl: true,
      googleVerificationId: true,
    },
  });
}

/**
 * Navigation Query
 */
export async function getNavigation(name: string) {
  return await db.navigation.findUnique({
    where: { name },
    select: {
      id: true,
      name: true,
      location: true,
      items: {
        where: { isVisible: true },
        orderBy: { displayOrder: 'asc' },
        select: {
          id: true,
          label: true,
          url: true,
          isExternal: true,
          openInNewTab: true,
          isMegaMenu: true,
          displayOrder: true,
          parentId: true,
        },
      },
    },
  });
}

/**
 * Hero Section Query
 */
export async function getHeroSection() {
  return await db.heroSection.findUnique({
    where: { id: 1 },
    select: {
      badgeText: true,
      headline: true,
      subHeadline: true,
      description: true,
      primaryCtaText: true,
      primaryCtaUrl: true,
      secondaryCtaText: true,
      secondaryCtaUrl: true,
      callNowPhone: true,
      mediaType: true,
      imageUrl: true,
      videoUrl: true,
      backgroundOverlayOpacity: true,
      alignment: true,
      isActive: true,
    },
  });
}

/**
 * Homepage Sections Query
 */
export async function getHomepageSections() {
  return await db.pageSection.findMany({
    where: { pageSlug: 'home', isVisible: true },
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      sectionType: true,
      title: true,
      subtitle: true,
      content: true,
      ctaLabel: true,
      ctaUrl: true,
      secondaryCtaLabel: true,
      secondaryCtaUrl: true,
      imageUrl: true,
      videoUrl: true,
      styleConfig: true,
      displayOrder: true,
    },
  });
}

/**
 * About Page Sections Query (Dynamic CMS content)
 */
export async function getAboutSections(includeHidden = false) {
  return await db.pageSection.findMany({
    where: {
      pageSlug: 'about',
      ...(includeHidden ? {} : { isVisible: true }),
    },
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      sectionType: true,
      title: true,
      subtitle: true,
      content: true,
      ctaLabel: true,
      ctaUrl: true,
      secondaryCtaLabel: true,
      secondaryCtaUrl: true,
      imageUrl: true,
      videoUrl: true,
      styleConfig: true,
      displayOrder: true,
      isVisible: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

/**
 * Programs Page Sections Query (Dynamic CMS content)
 */
export async function getProgramsSections() {
  return await db.pageSection.findMany({
    where: { pageSlug: 'programs', isVisible: true },
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      sectionType: true,
      title: true,
      subtitle: true,
      content: true,
      ctaLabel: true,
      ctaUrl: true,
      secondaryCtaLabel: true,
      secondaryCtaUrl: true,
      imageUrl: true,
      videoUrl: true,
      styleConfig: true,
      displayOrder: true,
    },
  });
}

/**
 * Centers Page Sections Query (Dynamic CMS content)
 */
export async function getCentersSections() {
  return await db.pageSection.findMany({
    where: { pageSlug: 'centers', isVisible: true },
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      sectionType: true,
      title: true,
      subtitle: true,
      content: true,
      ctaLabel: true,
      ctaUrl: true,
      secondaryCtaLabel: true,
      secondaryCtaUrl: true,
      imageUrl: true,
      videoUrl: true,
      styleConfig: true,
      displayOrder: true,
    },
  });
}

/**
 * Statistics Query
 */
export async function getStatistics() {
  return await db.statistic.findMany({
    where: { isVisible: true },
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      key: true,
      label: true,
      numericValue: true,
      prefix: true,
      suffix: true,
      description: true,
    },
  });
}

/**
 * Programs Query
 */
export async function getPrograms(publishedOnly = true) {
  return await db.program.findMany({
    where: publishedOnly ? { status: ContentStatus.PUBLISHED } : undefined,
    orderBy: { displayOrder: 'asc' },
    include: {
      features: {
        orderBy: { displayOrder: 'asc' },
      },
    },
  });
}

export async function getProgramBySlug(slug: string) {
  return await db.program.findUnique({
    where: { slug },
    include: {
      features: {
        orderBy: { displayOrder: 'asc' },
      },
    },
  });
}

/**
 * Team Members Query
 */
export async function getTeamMembers(publishedOnly = true) {
  return await db.teamMember.findMany({
    where: publishedOnly ? { status: ContentStatus.PUBLISHED } : undefined,
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      role: true,
      experienceYears: true,
      qualifications: true,
      specialization: true,
      shortBio: true,
      fullBio: true,
      profileImage: true,
      isFeatured: true,
      status: true,
      displayOrder: true,
      email: true,
      instagramUrl: true,
      linkedinUrl: true,
      createdAt: true,
      updatedAt: true,
      achievements: {
        orderBy: { displayOrder: 'asc' },
        select: { id: true, title: true, year: true },
      },
    },
  });
}

export async function getTeamMemberBySlug(slug: string) {
  return await db.teamMember.findUnique({
    where: { slug },
    include: {
      achievements: {
        orderBy: { displayOrder: 'asc' },
      },
    },
  });
}

/**
 * Centers Query
 */
export async function getCenters(publishedOnly = true) {
  return await db.center.findMany({
    where: publishedOnly ? { status: ContentStatus.PUBLISHED } : undefined,
    orderBy: { displayOrder: 'asc' },
    include: {
      images: {
        orderBy: { displayOrder: 'asc' },
      },
    },
  });
}

export async function getCenterBySlug(slug: string) {
  return await db.center.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { displayOrder: 'asc' },
      },
    },
  });
}

/**
 * Achievements Query
 */
export async function getAchievements(publishedOnly = true) {
  return await db.achievement.findMany({
    where: publishedOnly ? { status: ContentStatus.PUBLISHED } : undefined,
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      athleteName: true,
      category: true,
      rank: true,
      title: true,
      competition: true,
      year: true,
      athleteImage: true,
      medal: true,
      isFeatured: true,
    },
  });
}

/**
 * School Partnership Query
 */
export async function getSchoolPartnership() {
  const proposal = await db.schoolPartnership.findUnique({
    where: { id: 1 },
  });
  const partners = await db.schoolPartner.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
  return { proposal, partners };
}

/**
 * Testimonials Query
 */
export async function getTestimonials(publishedOnly = true) {
  return await db.testimonial.findMany({
    where: publishedOnly ? { status: ContentStatus.PUBLISHED } : undefined,
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      authorName: true,
      authorRole: true,
      athleteName: true,
      quote: true,
      rating: true,
      avatarUrl: true,
      displayOrder: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

/**
 * News Articles Query
 */
export async function getNewsArticles(limit = 10, page = 1) {
  const skip = (page - 1) * limit;
  const [articles, total] = await Promise.all([
    db.newsArticle.findMany({
      where: { status: ContentStatus.PUBLISHED },
      orderBy: { publishedAt: 'desc' },
      take: limit,
      skip,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        authorName: true,
        publishedAt: true,
        category: {
          select: { name: true, slug: true },
        },
      },
    }),
    db.newsArticle.count({
      where: { status: ContentStatus.PUBLISHED },
    }),
  ]);

  return { articles, total, page, totalPages: Math.ceil(total / limit) };
}

export async function getNewsArticleBySlug(slug: string) {
  return await db.newsArticle.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });
}

/**
 * Gallery Images Query
 */
export async function getGalleryImages(category?: string) {
  return await db.galleryImage.findMany({
    where: category ? { category } : undefined,
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      category: true,
      altText: true,
      isFeatured: true,
    },
  });
}

/**
 * FAQs Query
 */
export async function getFaqs() {
  return await db.faq.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      question: true,
      answer: true,
      category: true,
    },
  });
}

/**
 * Admin Dashboard Stats Query
 */
export async function getAdminDashboardStats() {
  const [
    programsCount,
    teamCount,
    centersCount,
    enquiriesCount,
    newEnquiriesCount,
    achievementsCount,
    recentEnquiries,
    recentAuditLogs,
  ] = await Promise.all([
    db.program.count(),
    db.teamMember.count(),
    db.center.count(),
    db.contactEnquiry.count(),
    db.contactEnquiry.count({ where: { status: 'NEW' } }),
    db.achievement.count(),
    db.contactEnquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        userType: true,
        status: true,
        createdAt: true,
      },
    }),
    db.auditLog.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userEmail: true,
        action: true,
        entity: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    programsCount,
    teamCount,
    centersCount,
    enquiriesCount,
    newEnquiriesCount,
    achievementsCount,
    recentEnquiries,
    recentAuditLogs,
  };
}

/**
 * GGEMS Ecosystem Verticals Query
 */
export async function getEcosystemVerticals(publishedOnly = true) {
  return await db.ggemsVertical.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { displayOrder: 'asc' },
    select: {
      id: true,
      title: true,
      slug: true,
      subtitle: true,
      description: true,
      image: true,
      mobileImage: true,
      icon: true,
      accentText: true,
      link: true,
      ctaText: true,
      displayOrder: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

/**
 * Public Contact Page Query (Optimized SSR single-trip query)
 * Fetches active phones, emails, and addresses sorted by displayOrder ASC
 */
export async function getContactPageData() {
  const [phones, emails, addresses, siteSettings] = await Promise.all([
    db.contactPhone.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        phoneNumber: true,
        role: true,
        description: true,
        displayOrder: true,
        isPrimary: true,
      },
    }),
    db.contactEmail.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        email: true,
        role: true,
        description: true,
        displayOrder: true,
        isPrimary: true,
      },
    }),
    db.contactAddress.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        label: true,
        addressLine1: true,
        addressLine2: true,
        city: true,
        state: true,
        pincode: true,
        country: true,
        mapUrl: true,
        directionsUrl: true,
        isPrimary: true,
        displayOrder: true,
      },
    }),
    db.siteSettings.findUnique({
      where: { id: 1 },
      select: {
        siteName: true,
        phone: true,
        secondaryPhone: true,
        email: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        instagramUrl: true,
      },
    }),
  ]);

  return {
    phones,
    emails,
    addresses,
    siteSettings,
  };
}

/**
 * Admin Contact Queries (Fetch all records including inactive)
 */
export async function getAllContactPhones() {
  return await db.contactPhone.findMany({
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
  });
}

export async function getAllContactEmails() {
  return await db.contactEmail.findMany({
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
  });
}

export async function getAllContactAddresses() {
  return await db.contactAddress.findMany({
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
  });
}

