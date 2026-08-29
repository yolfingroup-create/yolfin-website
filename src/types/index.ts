// ============================================================================
// YOLFIN GROUP CORPORATE WEBSITE - TYPESCRIPT DOMAIN DEFINITIONS (REVISED)
// Direct 1-to-1 alignment with revised Supabase Schema (supabase/schema.sql)
// ============================================================================

export type ServiceStatus = 'active' | 'coming_soon' | 'draft';
export type InquiryStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed' | 'spam';
export type TrialBookingStatus = 'pending' | 'contacted' | 'in_progress' | 'onboarded' | 'declined' | 'spam';
export type TaxClassification = 'uae_vat' | 'indian_gst' | 'other' | 'none';

// 1. Media Asset Reference (Cloudinary)
export interface MediaAsset {
  id: string;
  publicId: string;
  secureUrl: string;
  width?: number;
  height?: number;
  format?: string;
  altText?: string;
  folder: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// 2. Site Setting
export interface SiteSetting {
  id: string;
  settingKey: string;
  settingValue: Record<string, unknown>;
  description?: string;
  isPublic: boolean;
  updatedAt: string;
}

// 3. Service Category
export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription?: string;
  iconName?: string;
  heroImageUrl?: string;
  status: ServiceStatus;
  isFeatured: boolean;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// 4. Service Item / Sub-feature
export interface ServiceItem {
  id: string;
  serviceId: string;
  title: string;
  description?: string;
  iconName?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 5. Why Yolfin Benefit Card
export interface WhyYolfinItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  category: 'why_choose' | 'trust_point' | 'people_value';
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 6. Yolfin vs Traditional Comparison Item
export interface ComparisonItem {
  id: string;
  featureLabel: string;
  traditionalValue: string;
  yolfinValue: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 7. Testimonial
export interface Testimonial {
  id: string;
  clientName: string;
  companyName?: string;
  designation?: string;
  location?: string;
  quote: string;
  rating: number; // 1-5
  avatarUrl?: string;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 8. Homepage Section JSON Content
export interface HomepageSection {
  id: string;
  sectionKey: string;
  content: Record<string, unknown>;
  isPublished: boolean;
  updatedAt: string;
}

// 9. About Page Section JSON Content
export interface AboutSection {
  id: string;
  sectionKey: string;
  content: Record<string, unknown>;
  isPublished: boolean;
  updatedAt: string;
}

// 10. Contact Inquiry Submission
export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceCategory?: string;
  subject?: string;
  message: string;
  status: InquiryStatus;
  internalNotes?: string;
  ipAddress?: string;
  submittedAt: string;
  updatedAt: string;
}

// 11. 1-Month Free Trial Booking Submission
export interface TrialBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  companyName?: string;
  taxClassification?: TaxClassification;
  servicesInterested: string[];
  industry?: string;
  employeeCount?: string;
  briefRequirements?: string;
  preferredStartDate?: string;
  status: TrialBookingStatus;
  internalNotes?: string;
  submittedAt: string;
  updatedAt: string;
}

// 12. Dynamic SEO Metadata
export interface SEOMetadata {
  id: string;
  pagePath: string;
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string;
  noIndex: boolean;
  structuredData?: Record<string, unknown>;
  isPublished: boolean;
  updatedAt: string;
}

// 13. Single Admin Auth Identity
export interface AdminUser {
  id: string;
  email: 'yolfingroup@gmail.com';
  lastSignInAt?: string;
}
