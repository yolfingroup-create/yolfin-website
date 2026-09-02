"use server";

import { createClient } from "@/lib/supabase/server";

export interface ContactActionResult {
  success?: boolean;
  error?: string;
  message?: string;
}

/**
 * Server action to submit a public contact inquiry.
 */
export async function submitContactInquiryAction(
  prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  try {
    // Honeypot spam check
    const honeypot = formData.get("website_hp")?.toString().trim();
    if (honeypot) {
      // Silently reject bot submissions
      return { success: true, message: "Thank you for your inquiry." };
    }

    const fullName = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const companyName = formData.get("companyName")?.toString().trim() || null;
    const subject = formData.get("subject")?.toString().trim() || "General Business Inquiry";
    const message = formData.get("message")?.toString().trim();

    // Validation
    if (!fullName || fullName.length < 2) {
      return { error: "Please provide your full name." };
    }

    if (!email || !email.includes("@")) {
      return { error: "Please enter a valid email address." };
    }

    if (!phone || phone.length < 5) {
      return { error: "Please enter a valid phone number." };
    }

    if (!message || message.length < 5) {
      return { error: "Please type your message before submitting." };
    }

    const supabase = await createClient();

    const { error: dbError } = await supabase.from("contact_inquiries").insert({
      full_name: fullName,
      email: email,
      phone: phone,
      company_name: companyName,
      subject: subject,
      message: message,
      status: "new",
    });

    if (dbError) {
      console.error("Database error inserting contact inquiry:", dbError);
      return { error: "Unable to send your message right now. Please try again." };
    }

    return {
      success: true,
      message: "Thank you for contacting Yolfin Group. Our team will get back to you shortly.",
    };
  } catch (err) {
    console.error("Contact form submission error:", err);
    return { error: "Unable to send your message right now. Please try again." };
  }
}
