"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import type { InquiryStatus, TrialBookingStatus, Json } from "@/types";

export interface CMSActionResult {
  success?: boolean;
  error?: string;
  message?: string;
}

// ----------------------------------------------------
// 1. SERVICES MANAGEMENT ACTIONS
// ----------------------------------------------------

export async function createServiceAction(data: {
  name: string;
  slug: string;
  short_description: string;
  detailed_description?: string;
  icon_name?: string;
  status?: "active" | "coming_soon";
  is_published?: boolean;
  display_order?: number;
}): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("services").insert({
      name: data.name,
      slug: data.slug,
      short_description: data.short_description,
      detailed_description: data.detailed_description || null,
      icon_name: data.icon_name || "Calculator",
      status: data.status || "active",
      is_published: data.is_published ?? true,
      display_order: data.display_order ?? 0,
    });

    if (error) {
      console.error("Create service error:", error);
      return { error: error.message.includes("unique") ? "A service with this slug already exists." : "Unable to create service." };
    }

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, message: "Service created successfully" };
  } catch (err) {
    console.error("Create service exception:", err);
    return { error: "Unable to create service. Please try again." };
  }
}

export async function updateServiceAction(
  id: string,
  data: {
    name?: string;
    slug?: string;
    short_description?: string;
    detailed_description?: string;
    icon_name?: string;
    status?: "active" | "coming_soon";
    is_published?: boolean;
    display_order?: number;
  }
): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("services").update(data).eq("id", id);

    if (error) {
      console.error("Update service error:", error);
      return { error: "Unable to update service details." };
    }

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, message: "Service saved successfully" };
  } catch (err) {
    console.error("Update service exception:", err);
    return { error: "Unable to save changes. Please try again." };
  }
}

export async function deleteServiceAction(id: string): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      console.error("Delete service error:", error);
      return { error: "Unable to delete service." };
    }

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, message: "Service deleted successfully" };
  } catch (err) {
    console.error("Delete service exception:", err);
    return { error: "Unable to delete service. Please try again." };
  }
}

// ----------------------------------------------------
// 2. SERVICE ITEMS ACTIONS
// ----------------------------------------------------

export async function createServiceItemAction(data: {
  service_id: string;
  title: string;
  description: string;
  display_order?: number;
  is_active?: boolean;
}): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("service_items").insert({
      service_id: data.service_id,
      title: data.title,
      description: data.description,
      display_order: data.display_order ?? 0,
      is_active: data.is_active ?? true,
    });

    if (error) {
      console.error("Create service item error:", error);
      return { error: "Unable to add service item." };
    }

    revalidatePath("/admin/service-items");
    revalidatePath("/services");

    return { success: true, message: "Service item added successfully" };
  } catch (err) {
    console.error("Create service item exception:", err);
    return { error: "Unable to add service item. Please try again." };
  }
}

export async function updateServiceItemAction(
  id: string,
  data: {
    title?: string;
    description?: string;
    display_order?: number;
    is_active?: boolean;
  }
): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("service_items").update(data).eq("id", id);

    if (error) {
      console.error("Update service item error:", error);
      return { error: "Unable to update service item." };
    }

    revalidatePath("/admin/service-items");
    revalidatePath("/services");

    return { success: true, message: "Service item updated successfully" };
  } catch (err) {
    console.error("Update service item exception:", err);
    return { error: "Unable to save changes. Please try again." };
  }
}

export async function deleteServiceItemAction(id: string): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("service_items").delete().eq("id", id);

    if (error) {
      console.error("Delete service item error:", error);
      return { error: "Unable to delete service item." };
    }

    revalidatePath("/admin/service-items");
    revalidatePath("/services");

    return { success: true, message: "Service item deleted successfully" };
  } catch (err) {
    console.error("Delete service item exception:", err);
    return { error: "Unable to delete item. Please try again." };
  }
}

// ----------------------------------------------------
// 3. WHY YOLFIN & COMPARISON ACTIONS
// ----------------------------------------------------

export async function createWhyYolfinItemAction(data: {
  title: string;
  description: string;
  icon_name?: string;
  display_order?: number;
  is_active?: boolean;
}): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("why_yolfin_items").insert({
      title: data.title,
      description: data.description,
      icon_name: data.icon_name || "ShieldCheck",
      display_order: data.display_order ?? 0,
      is_active: data.is_active ?? true,
    });

    if (error) return { error: "Unable to add Why Yolfin feature." };

    revalidatePath("/admin/content");
    revalidatePath("/why-us");
    revalidatePath("/");

    return { success: true, message: "Feature added successfully" };
  } catch (err) {
    console.error("Create why yolfin error:", err);
    return { error: "Unable to create feature. Please try again." };
  }
}

export async function updateWhyYolfinItemAction(
  id: string,
  data: {
    title?: string;
    description?: string;
    icon_name?: string;
    display_order?: number;
    is_active?: boolean;
  }
): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("why_yolfin_items").update(data).eq("id", id);
    if (error) return { error: "Unable to update feature." };

    revalidatePath("/admin/content");
    revalidatePath("/why-us");
    revalidatePath("/");

    return { success: true, message: "Feature updated successfully" };
  } catch (err) {
    console.error("Update why yolfin error:", err);
    return { error: "Unable to save changes. Please try again." };
  }
}

export async function deleteWhyYolfinItemAction(id: string): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("why_yolfin_items").delete().eq("id", id);
    if (error) return { error: "Unable to delete feature." };

    revalidatePath("/admin/content");
    revalidatePath("/why-us");
    revalidatePath("/");

    return { success: true, message: "Feature deleted successfully" };
  } catch (err) {
    console.error("Delete why yolfin error:", err);
    return { error: "Unable to delete feature. Please try again." };
  }
}

// ----------------------------------------------------
// 4. TESTIMONIALS ACTIONS
// ----------------------------------------------------

export async function createTestimonialAction(data: {
  client_name: string;
  company_name?: string;
  designation?: string;
  country?: string;
  quote: string;
  rating?: number;
  is_published?: boolean;
  is_featured?: boolean;
  display_order?: number;
}): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("testimonials").insert({
      client_name: data.client_name,
      company_name: data.company_name || null,
      designation: data.designation || null,
      country: data.country || null,
      quote: data.quote,
      rating: data.rating ?? 5,
      is_published: data.is_published ?? true,
      is_featured: data.is_featured ?? false,
      display_order: data.display_order ?? 0,
    });

    if (error) return { error: "Unable to create testimonial." };

    revalidatePath("/admin/testimonials");
    revalidatePath("/why-us");
    revalidatePath("/");

    return { success: true, message: "Testimonial created successfully" };
  } catch (err) {
    console.error("Create testimonial error:", err);
    return { error: "Unable to create testimonial. Please try again." };
  }
}

export async function updateTestimonialAction(
  id: string,
  data: {
    client_name?: string;
    company_name?: string;
    designation?: string;
    country?: string;
    quote?: string;
    rating?: number;
    is_published?: boolean;
    is_featured?: boolean;
    display_order?: number;
  }
): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("testimonials").update(data).eq("id", id);
    if (error) return { error: "Unable to update testimonial." };

    revalidatePath("/admin/testimonials");
    revalidatePath("/why-us");
    revalidatePath("/");

    return { success: true, message: "Testimonial updated successfully" };
  } catch (err) {
    console.error("Update testimonial error:", err);
    return { error: "Unable to save changes. Please try again." };
  }
}

export async function deleteTestimonialAction(id: string): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return { error: "Unable to delete testimonial." };

    revalidatePath("/admin/testimonials");
    revalidatePath("/why-us");
    revalidatePath("/");

    return { success: true, message: "Testimonial deleted successfully" };
  } catch (err) {
    console.error("Delete testimonial error:", err);
    return { error: "Unable to delete testimonial. Please try again." };
  }
}

// ----------------------------------------------------
// 5. INQUIRIES & TRIAL BOOKINGS ACTIONS
// ----------------------------------------------------

export async function updateInquiryStatusAction(
  id: string,
  status: InquiryStatus
): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from("contact_inquiries")
      .update({ status })
      .eq("id", id);

    if (error) return { error: "Unable to update inquiry status." };

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");

    return { success: true, message: "Inquiry status updated successfully" };
  } catch (err) {
    console.error("Update inquiry status error:", err);
    return { error: "Unable to update inquiry status. Please try again." };
  }
}

export async function deleteInquiryAction(id: string): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("contact_inquiries").delete().eq("id", id);
    if (error) return { error: "Unable to delete inquiry." };

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");

    return { success: true, message: "Inquiry deleted successfully" };
  } catch (err) {
    console.error("Delete inquiry error:", err);
    return { error: "Unable to delete inquiry. Please try again." };
  }
}

export async function updateBookingStatusAction(
  id: string,
  status: TrialBookingStatus
): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from("trial_bookings")
      .update({ status })
      .eq("id", id);

    if (error) return { error: "Unable to update booking status." };

    revalidatePath("/admin/trial-bookings");
    revalidatePath("/admin");

    return { success: true, message: "Booking status updated successfully" };
  } catch (err) {
    console.error("Update booking status error:", err);
    return { error: "Unable to update booking status. Please try again." };
  }
}

export async function deleteBookingAction(id: string): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("trial_bookings").delete().eq("id", id);
    if (error) return { error: "Unable to delete booking." };

    revalidatePath("/admin/trial-bookings");
    revalidatePath("/admin");

    return { success: true, message: "Booking lead deleted successfully" };
  } catch (err) {
    console.error("Delete booking error:", err);
    return { error: "Unable to delete booking. Please try again." };
  }
}

// ----------------------------------------------------
// 6. SEO METADATA ACTIONS
// ----------------------------------------------------

export async function upsertSeoMetadataAction(data: {
  page_path: string;
  title: string;
  description: string;
  og_title?: string;
  og_description?: string;
  is_published?: boolean;
}): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("seo_metadata").upsert(
      {
        page_path: data.page_path,
        title: data.title,
        description: data.description,
        og_title: data.og_title || data.title,
        og_description: data.og_description || data.description,
        is_published: data.is_published ?? true,
      },
      { onConflict: "page_path" }
    );

    if (error) return { error: "Unable to save SEO metadata." };

    revalidatePath("/admin/seo");
    revalidatePath(data.page_path);

    return { success: true, message: "SEO metadata saved successfully" };
  } catch (err) {
    console.error("Upsert SEO metadata error:", err);
    return { error: "Unable to save SEO metadata. Please try again." };
  }
}

export async function deleteSeoMetadataAction(id: string): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("seo_metadata").delete().eq("id", id);
    if (error) return { error: "Unable to delete SEO record." };

    revalidatePath("/admin/seo");

    return { success: true, message: "SEO metadata deleted successfully" };
  } catch (err) {
    console.error("Delete SEO metadata error:", err);
    return { error: "Unable to delete SEO metadata. Please try again." };
  }
}

// ----------------------------------------------------
// 7. SITE SETTINGS ACTIONS
// ----------------------------------------------------

export async function updateSiteSettingAction(
  settingKey: string,
  settingValue: string | Record<string, unknown>
): Promise<CMSActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from("site_settings").upsert(
      {
        setting_key: settingKey,
        setting_value: settingValue as Json,
        is_public: true,
      },
      { onConflict: "setting_key" }
    );

    if (error) return { error: "Unable to save site setting." };

    revalidatePath("/admin/settings");
    revalidatePath("/");

    return { success: true, message: "Settings saved successfully" };
  } catch (err) {
    console.error("Update site setting error:", err);
    return { error: "Unable to save settings. Please try again." };
  }
}
