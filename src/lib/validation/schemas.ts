import { z } from 'zod';
import { isValidCssColor, isSafeUrl } from '../security/sanitize';

export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const contactEnquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z
    .string()
    .trim()
    .min(10, 'Please enter a valid 10-digit phone number')
    .max(15, 'Phone number is too long')
    .regex(/^[0-9+\s\-()]+$/, 'Invalid phone number format'),
  email: z.string().trim().email('Please enter a valid email address'),
  userType: z.enum(['STUDENT', 'PARENT', 'SCHOOL_REP', 'COACH', 'OTHER']),
  ageOrClass: z.string().trim().max(50).optional().or(z.literal('')),
  preferredLocation: z.string().trim().max(150).optional().or(z.literal('')),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(2000, 'Message is too long'),
});

export const themeSettingsSchema = z.object({
  primaryColor: z.string().refine(isValidCssColor, 'Invalid primary color format'),
  secondaryColor: z.string().refine(isValidCssColor, 'Invalid secondary color format'),
  accentColor: z.string().refine(isValidCssColor, 'Invalid accent color format'),
  backgroundColor: z.string().refine(isValidCssColor, 'Invalid background color format'),
  surfaceColor: z.string().refine(isValidCssColor, 'Invalid surface color format'),
  textColor: z.string().refine(isValidCssColor, 'Invalid text color format'),
  textMutedColor: z.string().refine(isValidCssColor, 'Invalid muted text color format'),
  borderColor: z.string().refine(isValidCssColor, 'Invalid border color format'),
  headingFont: z.enum(['Inter', 'Outfit', 'Plus Jakarta Sans', 'Manrope']),
  bodyFont: z.enum(['Inter', 'Outfit', 'Plus Jakarta Sans', 'Manrope']),
  borderRadius: z.enum(['rounded-none', 'rounded-md', 'rounded-xl', 'rounded-2xl', 'rounded-full']),
  buttonStyle: z.enum(['pill', 'rounded', 'sharp']),
  containerWidth: z.enum(['max-w-6xl', 'max-w-7xl', 'max-w-screen-2xl']),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().trim().min(2).max(120),
  siteTagline: z.string().trim().max(255),
  siteDescription: z.string().trim().min(10),
  phone: z.string().trim().min(10).max(40),
  secondaryPhone: z.string().trim().max(40).optional().or(z.literal('')),
  email: z.string().trim().email(),
  address: z.string().trim().min(5).max(255),
  city: z.string().trim().max(60),
  state: z.string().trim().max(60),
  pincode: z.string().trim().max(20),
  associationText: z.string().trim().max(255),
  instagramUrl: z.string().trim().refine(isSafeUrl, 'Invalid URL format'),
  instagramAltUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid URL format').optional().or(z.literal('')),
  youtubeUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid URL format').optional().or(z.literal('')),
  facebookUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid URL format').optional().or(z.literal('')),
  linkedinUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid URL format').optional().or(z.literal('')),
  officeLocationDetails: z.string().trim().max(255),
  copyrightText: z.string().trim().max(255),
});

export const seoSettingsSchema = z.object({
  metaTitle: z.string().trim().min(10).max(255),
  metaDescription: z.string().trim().min(20).max(500),
  metaKeywords: z.string().trim().max(500),
  canonicalBaseUrl: z.string().trim().refine(isSafeUrl, 'Invalid canonical URL'),
  googleVerificationId: z.string().trim().max(120).optional().or(z.literal('')),
  ogImageUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid image URL').optional().or(z.literal('')),
});

export const heroSectionSchema = z.object({
  badgeText: z.string().trim().max(120),
  headline: z.string().trim().min(2).max(255),
  subHeadline: z.string().trim().min(2).max(255),
  description: z.string().trim().min(10),
  primaryCtaText: z.string().trim().min(2).max(80),
  primaryCtaUrl: z.string().trim().refine(isSafeUrl, 'Invalid CTA URL'),
  secondaryCtaText: z.string().trim().min(2).max(80),
  secondaryCtaUrl: z.string().trim().refine(isSafeUrl, 'Invalid CTA URL'),
  callNowPhone: z.string().trim().min(10).max(40),
  mediaType: z.enum(['IMAGE', 'VIDEO']),
  imageUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid image URL').optional().or(z.literal('')),
  videoUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid video URL').optional().or(z.literal('')),
  backgroundOverlayOpacity: z.coerce.number().min(0).max(100),
  alignment: z.enum(['left', 'center']),
  isActive: z.boolean().default(true),
});

export const programSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2, 'Title must be at least 2 characters').max(150),
  slug: z.string().trim().min(2).max(150).regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  ageGroup: z.string().trim().min(2).max(100).default('All Age Groups'),
  skillLevel: z.string().trim().min(2).max(100).default('All Skill Levels'),
  duration: z.string().trim().min(2).max(100).default('Ongoing'),
  shortDescription: z.string().trim().min(5).max(1000),
  fullDescription: z.string().trim().max(10000).optional().or(z.literal('')).transform(val => val || ''),
  featuredImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid image URL').optional().or(z.literal('')),
  trainingFocus: z.string().trim().max(255).default('Holistic Athletic Training & Strategy'),
  scheduleInfo: z.string().trim().max(255).optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),

  // Extended Detail Page CMS fields
  category: z.string().trim().max(100).optional().or(z.literal('')),
  heroEyebrow: z.string().trim().max(100).optional().or(z.literal('')),
  heroTitle: z.string().trim().max(200).optional().or(z.literal('')),
  heroSubtitle: z.string().trim().max(255).optional().or(z.literal('')),
  heroDescription: z.string().trim().max(5000).optional().or(z.literal('')),
  heroImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Hero Image URL').optional().or(z.literal('')),
  heroVideo: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Hero Video URL').optional().or(z.literal('')),
  primaryCtaText: z.string().trim().max(80).optional().or(z.literal('')),
  primaryCtaLink: z.string().trim().max(255).optional().or(z.literal('')),
  secondaryCtaText: z.string().trim().max(80).optional().or(z.literal('')),
  secondaryCtaLink: z.string().trim().max(255).optional().or(z.literal('')),
  heroBadgesData: z.string().optional().or(z.literal('')),

  highlightsTitle: z.string().trim().max(150).optional().or(z.literal('')),
  highlightsData: z.string().optional().or(z.literal('')),

  overviewLabel: z.string().trim().max(100).optional().or(z.literal('')),
  overviewTitle: z.string().trim().max(255).optional().or(z.literal('')),
  overviewDescription: z.string().trim().max(5000).optional().or(z.literal('')),
  overviewSecondaryDescription: z.string().trim().max(5000).optional().or(z.literal('')),
  overviewImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Overview Image URL').optional().or(z.literal('')),
  overviewVideo: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Overview Video URL').optional().or(z.literal('')),
  overviewCtaText: z.string().trim().max(80).optional().or(z.literal('')),
  overviewCtaLink: z.string().trim().max(255).optional().or(z.literal('')),

  whoCanJoinTitle: z.string().trim().max(100).optional().or(z.literal('')),
  audienceData: z.string().optional().or(z.literal('')),

  trainingStructureEyebrow: z.string().trim().max(100).optional().or(z.literal('')),
  trainingStructureTitle: z.string().trim().max(255).optional().or(z.literal('')),
  trainingStructureDescription: z.string().trim().max(5000).optional().or(z.literal('')),
  stagesData: z.string().optional().or(z.literal('')),

  facilitiesEyebrow: z.string().trim().max(100).optional().or(z.literal('')),
  facilitiesTitle: z.string().trim().max(255).optional().or(z.literal('')),
  facilitiesDescription: z.string().trim().max(5000).optional().or(z.literal('')),
  facilitiesData: z.string().optional().or(z.literal('')),

  testimonialEyebrow: z.string().trim().max(100).optional().or(z.literal('')),
  testimonialTitle: z.string().trim().max(255).optional().or(z.literal('')),
  testimonialsData: z.string().optional().or(z.literal('')),

  faqEyebrow: z.string().trim().max(100).optional().or(z.literal('')),
  faqTitle: z.string().trim().max(255).optional().or(z.literal('')),
  faqDescription: z.string().trim().max(5000).optional().or(z.literal('')),
  faqsData: z.string().optional().or(z.literal('')),

  ctaLabel: z.string().trim().max(100).optional().or(z.literal('')),
  ctaTitle: z.string().trim().max(255).optional().or(z.literal('')),
  ctaDescription: z.string().trim().max(5000).optional().or(z.literal('')),
  ctaBackgroundImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid CTA Background Image URL').optional().or(z.literal('')),
  ctaPrimaryText: z.string().trim().max(80).optional().or(z.literal('')),
  ctaPrimaryLink: z.string().trim().max(255).optional().or(z.literal('')),
  ctaSecondaryText: z.string().trim().max(80).optional().or(z.literal('')),
  ctaSecondaryLink: z.string().trim().max(255).optional().or(z.literal('')),
  ctaAudienceLinks: z.string().optional().or(z.literal('')),

  metaTitle: z.string().trim().max(255).optional().or(z.literal('')),
  metaDescription: z.string().trim().max(5000).optional().or(z.literal('')),
  ogImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid OG Image URL').optional().or(z.literal('')),
});

export const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  role: z.string().trim().min(2, 'Role / Designation is required').max(150),
  experienceYears: z.coerce.number().int().min(0).max(70).default(0),
  qualifications: z.string().trim().max(255).default('Certified Squash Professional'),
  specialization: z.string().trim().max(255).default('Coaching & Player Development'),
  shortBio: z.string().trim().min(5, 'Short bio must be at least 5 characters').max(500),
  fullBio: z.string().trim().max(5000).optional().or(z.literal('')).transform(val => val || ''),
  profileImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid image URL').optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('PUBLISHED'),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  email: z.string().trim().email().optional().or(z.literal('')),
  instagramUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid URL format').optional().or(z.literal('')),
  linkedinUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid URL format').optional().or(z.literal('')),
});

export const centerSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, 'Name is required').max(200),
  slug: z.string().trim().min(2).max(200).regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  address: z.string().trim().min(3).max(255),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().optional().or(z.literal('')),
  facilities: z.string().trim().min(2),
  image: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid image URL').optional().or(z.literal('')),
  googleMapsUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Maps URL').optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('PUBLISHED'),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),

  // Extended Partner Page CMS fields
  category: z.string().trim().max(100).default('SCHOOL PARTNER'),
  location: z.string().trim().max(255).optional().or(z.literal('')),
  shortDescription: z.string().trim().max(5000).optional().or(z.literal('')),
  heroImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Hero Image URL').optional().or(z.literal('')),
  brochureUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Brochure URL').optional().or(z.literal('')),
  websiteUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Website URL').optional().or(z.literal('')),
  aboutLabel: z.string().trim().max(100).default('ABOUT THE SCHOOL'),
  aboutHeading: z.string().trim().max(255).default('Excellence in Education & Sports'),
  aboutDescription: z.string().trim().max(10000).optional().or(z.literal('')),
  aboutImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid About Image URL').optional().or(z.literal('')),
  videoUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Video URL').optional().or(z.literal('')),
  partnershipType: z.string().trim().max(200).default('Sports Training Programme'),
  sportsOffered: z.string().trim().max(200).default('Squash, Badminton & Other Sports'),
  studentEngagement: z.string().trim().max(200).default('Regular Training & Competitions'),
  programmesData: z.string().optional().or(z.literal('')),
  testimonialQuote: z.string().trim().max(2000).optional().or(z.literal('')),
  testimonialAuthor: z.string().trim().max(150).optional().or(z.literal('')),
  testimonialRole: z.string().trim().max(200).optional().or(z.literal('')),
  testimonialImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Testimonial Image URL').optional().or(z.literal('')),
  testimonialsData: z.string().optional().or(z.literal('')),
  ctaLabel: z.string().trim().max(100).default('PARTNER WITH US'),
  ctaHeading: z.string().trim().max(255).default("Let's Build Brighter Futures"),
  ctaDescription: z.string().trim().max(2000).optional().or(z.literal('')),
  ctaBackgroundImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid CTA Background Image URL').optional().or(z.literal('')),
  galleryImages: z.array(
    z.object({
      id: z.string().optional(),
      imageUrl: z.string().trim(),
      caption: z.string().trim().optional(),
      displayOrder: z.coerce.number().int().default(0),
    })
  ).optional(),
});

export const statisticSchema = z.object({
  id: z.string().optional(),
  key: z.string().trim().min(2).max(80),
  label: z.string().trim().min(2).max(150),
  numericValue: z.coerce.number().int().min(0),
  prefix: z.string().trim().max(10).optional().or(z.literal('')),
  suffix: z.string().trim().max(20).optional().or(z.literal('')),
  description: z.string().trim().max(255).optional().or(z.literal('')),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isVisible: z.boolean().default(true),
});

export const achievementSchema = z.object({
  id: z.string().optional(),
  athleteName: z.string().trim().min(2).max(120),
  category: z.string().trim().min(2).max(100),
  rank: z.string().trim().min(2).max(60),
  title: z.string().trim().min(2).max(255),
  competition: z.string().trim().max(255).optional().or(z.literal('')),
  year: z.string().trim().max(20).optional().or(z.literal('')),
  athleteImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid image URL').optional().or(z.literal('')),
  medal: z.string().trim().max(60).optional().or(z.literal('')),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isFeatured: z.boolean().default(true),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

export const navigationItemSchema = z.object({
  id: z.string().optional(),
  navigationId: z.string(),
  label: z.string().trim().min(1).max(100),
  url: z.string().trim().min(1).max(255).refine(isSafeUrl, 'Invalid URL format'),
  isExternal: z.boolean().default(false),
  openInNewTab: z.boolean().default(false),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isVisible: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  id: z.string().optional(),
  authorName: z.string().trim().min(1, 'Author name is required').max(120),
  authorRole: z.string().trim().min(1, 'Author role is required').max(100),
  athleteName: z.string().trim().max(120).optional().nullable().or(z.literal('')),
  quote: z.string().trim().min(1, 'Quote is required').max(2000),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  avatarUrl: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid avatar URL').optional().nullable().or(z.literal('')),
  displayOrder: z.coerce.number().int().default(0),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
});

export const ggemsVerticalSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2, 'Title is required').max(150),
  slug: z.string().trim().min(2, 'Slug is required').max(150),
  subtitle: z.string().trim().min(2, 'Subtitle is required').max(255),
  description: z.string().trim().max(2000).optional().nullable().or(z.literal('')),
  image: z.string().trim().min(1, 'Image is required').refine((u) => !u || isSafeUrl(u), 'Invalid Image URL'),
  mobileImage: z.string().trim().refine((u) => !u || isSafeUrl(u), 'Invalid Mobile Image URL').optional().nullable().or(z.literal('')),
  icon: z.string().trim().max(100).optional().nullable().or(z.literal('')),
  accentText: z.string().trim().max(100).optional().nullable().or(z.literal('')),
  link: z.string().trim().max(255).optional().nullable().or(z.literal('')),
  ctaText: z.string().trim().max(100).optional().nullable().or(z.literal('')),
  displayOrder: z.coerce.number().int().min(0).default(0),
  published: z.boolean().default(true),
});

export const contactPhoneSchema = z.object({
  id: z.string().optional(),
  phoneNumber: z
    .string()
    .trim()
    .min(7, 'Phone number must be at least 7 characters')
    .max(40, 'Phone number cannot exceed 40 characters')
    .regex(/^[0-9+\s\-().]+$/, 'Invalid phone number format. Only numbers, +, -, (), and spaces allowed.'),
  role: z
    .string()
    .trim()
    .min(2, 'Role / Label is required (at least 2 characters)')
    .max(120, 'Role / Label cannot exceed 120 characters'),
  description: z
    .string()
    .trim()
    .max(255, 'Description cannot exceed 255 characters')
    .optional()
    .nullable()
    .or(z.literal('')),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isPrimary: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export const contactEmailSchema = z.object({
  id: z.string().optional(),
  email: z
    .string()
    .trim()
    .min(5, 'Email is required')
    .max(191, 'Email cannot exceed 191 characters')
    .email('Please enter a valid email address'),
  role: z
    .string()
    .trim()
    .min(2, 'Role / Label is required (at least 2 characters)')
    .max(120, 'Role / Label cannot exceed 120 characters'),
  description: z
    .string()
    .trim()
    .max(255, 'Description cannot exceed 255 characters')
    .optional()
    .nullable()
    .or(z.literal('')),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isPrimary: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export const contactAddressSchema = z.object({
  id: z.string().optional(),
  label: z
    .string()
    .trim()
    .min(2, 'Label is required (e.g. Head Office)')
    .max(120, 'Label cannot exceed 120 characters'),
  addressLine1: z
    .string()
    .trim()
    .min(3, 'Address Line 1 is required')
    .max(255, 'Address Line 1 cannot exceed 255 characters'),
  addressLine2: z
    .string()
    .trim()
    .max(255, 'Address Line 2 cannot exceed 255 characters')
    .optional()
    .nullable()
    .or(z.literal('')),
  city: z
    .string()
    .trim()
    .min(2, 'City is required')
    .max(100, 'City cannot exceed 100 characters'),
  state: z
    .string()
    .trim()
    .min(2, 'State is required')
    .max(100, 'State cannot exceed 100 characters'),
  pincode: z
    .string()
    .trim()
    .max(20, 'Pincode cannot exceed 20 characters')
    .optional()
    .nullable()
    .or(z.literal('')),
  country: z
    .string()
    .trim()
    .max(100)
    .default('India'),
  mapUrl: z
    .string()
    .trim()
    .refine((u) => !u || isSafeUrl(u), 'Invalid Google Maps URL')
    .optional()
    .nullable()
    .or(z.literal('')),
  directionsUrl: z
    .string()
    .trim()
    .refine((u) => !u || isSafeUrl(u), 'Invalid Directions URL')
    .optional()
    .nullable()
    .or(z.literal('')),
  isPrimary: z.boolean().default(false),
  isActive: z.boolean().default(true),
  displayOrder: z.coerce.number().int().min(0).default(0),
});

