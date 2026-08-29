"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DESIGNATED_ADMIN_EMAIL } from "@/lib/supabase/auth";

export interface ActionResult {
  error?: string;
  success?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server action to authenticate the designated single admin user.
 */
export async function loginAdminAction(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email) {
    return { error: "Email address is required." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!password) {
    return { error: "Password is required." };
  }

  // Pre-verification: Only the designated admin email is authorized
  if (email.toLowerCase() !== DESIGNATED_ADMIN_EMAIL.toLowerCase()) {
    return {
      error:
        "Access denied. Unauthorized credentials.",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Admin authentication error:", error.message);
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Invalid email or password. Please check your credentials." };
    }
    return { error: error.message || "Authentication failed. Please try again." };
  }

  // Double check returned user email
  if (
    !data.user ||
    data.user.email?.toLowerCase() !== DESIGNATED_ADMIN_EMAIL.toLowerCase()
  ) {
    await supabase.auth.signOut();
    return {
      error: "Unauthorized user account.",
    };
  }

  redirect("/admin");
}

/**
 * Server action to sign out the admin user and redirect to login.
 */
export async function logoutAdminAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
