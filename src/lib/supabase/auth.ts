import { redirect } from "next/navigation";
import { createClient } from "./server";

export const DESIGNATED_ADMIN_EMAIL = "yolfingroup@gmail.com";

/**
 * Retrieves the authenticated user on the server and checks if they match the designated single admin.
 */
export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, isAdmin: false };
  }

  const isAdmin = user.email?.toLowerCase() === DESIGNATED_ADMIN_EMAIL.toLowerCase();

  if (!isAdmin) {
    return { user, isAdmin: false };
  }

  return { user, isAdmin: true };
}

/**
 * Enforces admin authorization on Server Components / Actions.
 * Redirects unauthenticated or non-admin users to /admin/login.
 */
export async function requireAdmin() {
  const { user, isAdmin } = await getAdminUser();

  if (!user || !isAdmin) {
    redirect("/admin/login");
  }

  return user;
}
