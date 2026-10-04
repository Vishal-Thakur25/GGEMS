export interface TeamMemberItem {
  id: string;
  name: string;
  slug: string;
  role: string;
  designation?: string;
  experienceYears?: number;
  qualifications?: string;
  specialization?: string;
  expertise?: string;
  shortBio?: string;
  bio?: string;
  fullBio?: string;
  profileImage?: string | null;
  image?: string | null;
  badges?: string[];
  isFeatured?: boolean;
  displayOrder?: number;
  status?: string;
  isActive?: boolean;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
  };
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
}

export interface SupportingMemberItem {
  id: string;
  name: string;
  role?: string;
  description: string;
  image?: string | null;
  slug?: string;
}

export interface FeatureItem {
  line1: string;
  line2: string;
  description: string;
  icon: 'users' | 'trophy' | 'chart' | 'heart';
}

export interface PhilosophyItem {
  titleLine1: string;
  titleLine2: string;
  description: string;
  icon: 'target' | 'team' | 'development';
}
