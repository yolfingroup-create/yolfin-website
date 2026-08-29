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
  const { data: settings, error } = await supabase
    .from("site_settings")
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const settingsMap: Record<string, unknown> = {};
  (settings || []).forEach((item) => {
    settingsMap[item.setting_key] = item.setting_value;
  });

  return NextResponse.json({ settingsMap });
}
