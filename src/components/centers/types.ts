export interface CenterImageItem {
  id?: string;
  imageUrl: string;
  caption?: string | null;
  displayOrder?: number;
}

export interface CenterProgrammeItem {
  id?: string;
  title: string;
  description: string;
  icon?: string;
}

export interface CenterTestimonialItem {
  id?: string;
  quote: string;
  author: string;
  role: string;
  image?: string | null;
}

export interface CenterItem {
  id: string;
  name: string;
  slug: string;
  city: string;
  displayCity?: string;
  state?: string;
  address?: string;
  phone?: string;
  email?: string | null;
  googleMapsUrl?: string | null;
  facilities?: string;
  image?: string | null;
  isFeatured?: boolean;
  displayOrder?: number;
  status?: string;
  badgeType?: string;

  // Extended Partner Page CMS fields
  category?: string | null;
  location?: string | null;
  shortDescription?: string | null;
  heroImage?: string | null;
  brochureUrl?: string | null;
  websiteUrl?: string | null;
  aboutLabel?: string | null;
  aboutHeading?: string | null;
  aboutDescription?: string | null;
  aboutImage?: string | null;
  videoUrl?: string | null;
  partnershipType?: string | null;
  sportsOffered?: string | null;
  studentEngagement?: string | null;
  programmesData?: string | null;
  testimonialQuote?: string | null;
  testimonialAuthor?: string | null;
  testimonialRole?: string | null;
  testimonialImage?: string | null;
  testimonialsData?: string | null;
  ctaLabel?: string | null;
  ctaHeading?: string | null;
  ctaDescription?: string | null;
  ctaBackgroundImage?: string | null;

  images?: CenterImageItem[];
}

export interface FeatureBlock {
  number: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  icon: 'institution' | 'location' | 'coaching' | 'opportunity';
}

export interface NetworkStat {
  value: string;
  labelLine1: string;
  labelLine2: string;
  icon: 'chart' | 'users' | 'medal' | 'trophy';
}

export interface LocationPresence {
  city: string;
  countText: string;
  countNumber: number;
}
