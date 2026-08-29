// ============================================================================
// YOLFIN GROUP CORPORATE WEBSITE - DOMAIN & DATABASE TYPESCRIPT DEFINITIONS
// Direct 1-to-1 alignment with Supabase Database Schema (supabase/schema.sql)
// ============================================================================

export * from "./database.types";

import type { Database } from "./database.types";

// Helper alias types for convenience
export type MediaAssetRow = Database["public"]["Tables"]["media_assets"]["Row"];
export type SiteSettingRow = Database["public"]["Tables"]["site_settings"]["Row"];
export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
export type ServiceItemRow = Database["public"]["Tables"]["service_items"]["Row"];
export type WhyYolfinItemRow = Database["public"]["Tables"]["why_yolfin_items"]["Row"];
export type ComparisonItemRow = Database["public"]["Tables"]["comparison_items"]["Row"];
export type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];
export type HomepageContentRow = Database["public"]["Tables"]["homepage_content"]["Row"];
export type AboutContentRow = Database["public"]["Tables"]["about_content"]["Row"];
export type ContactInquiryRow = Database["public"]["Tables"]["contact_inquiries"]["Row"];
export type TrialBookingRow = Database["public"]["Tables"]["trial_bookings"]["Row"];
export type SEOMetadataRow = Database["public"]["Tables"]["seo_metadata"]["Row"];

export interface AdminUserSession {
  id: string;
  email: "yolfingroup@gmail.com";
  lastSignInAt?: string;
}
