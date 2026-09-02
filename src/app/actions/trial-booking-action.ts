"use server";

import { createClient } from "@/lib/supabase/server";
import { sendEmailViaBrevo } from "@/lib/brevo/client";

export interface TrialBookingResult {
  success?: boolean;
  error?: string;
}

/**
 * Server action to submit a trial booking request.
 * Validates inputs, checks honeypot, inserts into Supabase, and sends notification email.
 */
export async function submitTrialBookingAction(
  formData: FormData
): Promise<TrialBookingResult> {
  try {
    // Honeypot spam check
    const honeypot = formData.get("website_hp")?.toString().trim();
    if (honeypot) {
      // Silently reject bot submissions
      return { success: true };
    }

    const fullName = formData.get("full_name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const companyName = formData.get("company_name")?.toString().trim() || null;
    const taxClassification = formData.get("tax_classification")?.toString().trim() || "indian_gst";
    const servicesInterested = formData.getAll("services_interested").map((s) => s.toString());

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

    const supabase = await createClient();

    const { error: dbError } = await supabase.from("trial_bookings").insert({
      full_name: fullName,
      email: email,
      phone: phone,
      company_name: companyName,
      country: taxClassification === "uae_vat" ? "UAE" : "India",
      tax_classification: taxClassification,
      services_interested: servicesInterested,
      status: "new",
    });

    if (dbError) {
      console.error("Database error inserting trial booking:", dbError);
      return { error: "Unable to submit your request right now. Please try again." };
    }

    // Send notification email (non-blocking — failure here should not block user)
    try {
      await sendEmailViaBrevo({
        to: [{ email: "yolfingroup@gmail.com", name: "Yolfin Group" }],
        subject: `New Trial Booking: ${fullName}`,
        htmlContent: `
          <h2>New Trial Booking Request</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${companyName || "Not provided"}</p>
          <p><strong>Tax Classification:</strong> ${taxClassification}</p>
          <p><strong>Services:</strong> ${servicesInterested.join(", ") || "Accounting & Finance"}</p>
        `,
        replyTo: { email: email, name: fullName },
      });
    } catch (emailErr) {
      console.error("Brevo notification failed (non-blocking):", emailErr);
    }

    return { success: true };
  } catch (err) {
    console.error("Trial booking submission error:", err);
    return { error: "Unable to submit your request right now. Please try again." };
  }
}
