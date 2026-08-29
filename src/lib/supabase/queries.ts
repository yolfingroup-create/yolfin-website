import { createClient } from "./server";
import type {
  ServiceRow,
  ServiceItemRow,
  WhyYolfinItemRow,
  ComparisonItemRow,
  TestimonialRow,
  HomepageContentRow,
  AboutContentRow,
  SiteSettingRow,
  SEOMetadataRow,
} from "@/types";

/**
 * Fetches all published services (excluding draft status) ordered by display_order.
 */
export async function getPublishedServices(): Promise<ServiceRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_published", true)
    .neq("status", "draft")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching published services:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Fetches a single published service by its unique slug.
 */
export async function getPublishedServiceBySlug(
  slug: string
): Promise<ServiceRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .neq("status", "draft")
    .maybeSingle();

  if (error) {
    console.error(`Error fetching service by slug "${slug}":`, error);
    return null;
  }

  return data;
}

/**
 * Fetches active service items, optionally filtered by a specific parent service ID.
 */
export async function getActiveServiceItems(
  serviceId?: string
): Promise<ServiceItemRow[]> {
  const supabase = await createClient();
  let query = supabase
    .from("service_items")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (serviceId) {
    query = query.eq("service_id", serviceId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching active service items:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Fetches active Why Yolfin benefit/differentiator items.
 */
export async function getWhyYolfinItems(): Promise<WhyYolfinItemRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("why_yolfin_items")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching Why Yolfin items:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Fetches active comparison grid items (Yolfin vs Traditional).
 */
export async function getComparisonItems(): Promise<ComparisonItemRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comparison_items")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching comparison items:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Fetches published client testimonials.
 */
export async function getPublishedTestimonials(): Promise<TestimonialRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching published testimonials:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Fetches published homepage section content blocks.
 */
export async function getHomepageContent(): Promise<HomepageContentRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("homepage_content")
    .select("*")
    .eq("is_published", true);

  if (error) {
    console.error("Error fetching homepage content:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Fetches published about page section content blocks.
 */
export async function getAboutContent(): Promise<AboutContentRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("about_content")
    .select("*")
    .eq("is_published", true);

  if (error) {
    console.error("Error fetching about content:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Fetches public site settings (key-value configurations).
 */
export async function getPublicSiteSettings(): Promise<SiteSettingRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("is_public", true);

  if (error) {
    console.error("Error fetching public site settings:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Fetches published SEO metadata, optionally for a specific page path.
 */
export async function getPublishedSeoMetadata(
  pagePath?: string
): Promise<SEOMetadataRow | SEOMetadataRow[] | null> {
  const supabase = await createClient();

  if (pagePath) {
    const { data, error } = await supabase
      .from("seo_metadata")
      .select("*")
      .eq("page_path", pagePath)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching SEO metadata for path "${pagePath}":`, error);
      return null;
    }

    return data;
  }

  const { data, error } = await supabase
    .from("seo_metadata")
    .select("*")
    .eq("is_published", true);

  if (error) {
    console.error("Error fetching published SEO metadata:", error);
    return [];
  }

  return data ?? [];
}
