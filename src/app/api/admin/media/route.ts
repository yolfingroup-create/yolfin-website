import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/auth";
import { getAllMediaAssets, getHomepageImagePlacements } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user, isAdmin } = await getAdminUser();

  if (!user || !isAdmin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const [assets, placementsData] = await Promise.all([
    getAllMediaAssets(),
    getHomepageImagePlacements(),
  ]);

  return NextResponse.json({
    assets,
    placementsMap: placementsData.placementsMap,
  });
}
