export interface ContactSiteSettings {
  phone: string;
  secondaryPhone?: string | null;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  workingHours?: string;
  instagramUrl?: string | null;
  instagramHandle?: string;
  googleMapsUrl?: string | null;
}

export interface DynamicContactPhone {
  id: string;
  phoneNumber: string;
  role: string;
  description?: string | null;
  displayOrder: number;
  isPrimary: boolean;
}

export interface DynamicContactEmail {
  id: string;
  email: string;
  role: string;
  description?: string | null;
  displayOrder: number;
  isPrimary: boolean;
}

export interface DynamicContactAddress {
  id: string;
  label: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  pincode?: string | null;
  country?: string;
  mapUrl?: string | null;
  directionsUrl?: string | null;
  isPrimary: boolean;
  displayOrder: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  displayOrder?: number;
}

export interface OfficeGalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  alt: string;
}
