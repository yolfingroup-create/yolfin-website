import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/auth";
import { getAllMediaAssets, getImagePlacements } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user, isAdmin } = await getAdminUser();

  if (!user || !isAdmin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const [assets, placementsData] = await Promise.all([
    getAllMediaAssets(),
    getImagePlacements(),
  ]);

  return NextResponse.json({
    assets,
    placementsMap: placementsData.placementsMap,
  });
}

