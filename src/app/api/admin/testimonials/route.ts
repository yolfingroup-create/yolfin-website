import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user, isAdmin } = await getAdminUser();

  if (!user || !isAdmin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ testimonials });
}
