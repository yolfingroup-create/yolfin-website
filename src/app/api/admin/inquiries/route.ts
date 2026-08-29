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
  const { data: inquiries, error } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inquiries });
}
