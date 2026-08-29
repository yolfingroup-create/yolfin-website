"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { uploadToCloudinaryServer } from "@/lib/cloudinary/client";

export interface MediaActionResult {
  success?: boolean;
  error?: string;
  message?: string;
}

/**
 * Server Action to upload a new media asset file.
 */
export async function uploadMediaAssetAction(
  prevState: MediaActionResult | null,
  formData: FormData
): Promise<MediaActionResult> {
  try {
    await requireAdmin();

    const file = formData.get("file") as File | null;
    const altText = formData.get("altText")?.toString().trim() || "";

    if (!file || file.size === 0) {
      return { error: "Please select an image file to upload." };
    }

    if (!file.type.startsWith("image/")) {
      return { error: "Invalid file format. Please select an image file (PNG, JPG, WEBP, SVG)." };
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return { error: "File size exceeds limit (10MB maximum). Please select a smaller image." };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary / storage backend
    const uploadResult = await uploadToCloudinaryServer(buffer, file.type, "yolfin");

    const supabase = await createClient();

    const { error: dbError } = await supabase
      .from("media_assets")
      .insert({
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        alt_text: altText || file.name,
        folder: "yolfin",
        is_published: true,
      });

    if (dbError) {
      console.error("Database insert error for media asset:", dbError);
      return { error: "Unable to save image metadata. Please try again." };
    }

    revalidatePath("/admin/media");
    revalidatePath("/");

    return {
      success: true,
      message: "Image uploaded successfully",
    };
  } catch (err) {
    console.error("Upload media asset error:", err);
    return { error: "Unable to upload image. Please try again." };
  }
}

/**
 * Server Action to update metadata or publication state of an image asset.
 */
export async function updateMediaAssetAction(
  id: string,
  data: { alt_text?: string; is_published?: boolean }
): Promise<MediaActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from("media_assets")
      .update(data)
      .eq("id", id);

    if (error) {
      console.error("Error updating media asset:", error);
      return { error: "Unable to save changes. Please try again." };
    }

    revalidatePath("/admin/media");
    revalidatePath("/");

    return {
      success: true,
      message: data.is_published !== undefined ? "Image visibility updated" : "Image details saved successfully",
    };
  } catch (err) {
    console.error("Update media asset error:", err);
    return { error: "Unable to save changes. Please try again." };
  }
}

/**
 * Server Action to delete a media asset.
 */
export async function deleteMediaAssetAction(id: string): Promise<MediaActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from("media_assets")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting media asset:", error);
      return { error: "Unable to delete image. Please try again." };
    }

    revalidatePath("/admin/media");
    revalidatePath("/");

    return {
      success: true,
      message: "Image deleted successfully",
    };
  } catch (err) {
    console.error("Delete media asset error:", err);
    return { error: "Unable to delete image. Please try again." };
  }
}

/**
 * Server Action to assign an image asset to a specific homepage placement slot.
 */
export async function assignHomepageImageAction(
  placementKey: "hero_image_id" | "why_us_image_id",
  mediaAssetId: string | null
): Promise<MediaActionResult> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    // Fetch existing placements setting
    const { data: existing } = await supabase
      .from("site_settings")
      .select("setting_value")
      .eq("setting_key", "homepage_image_placements")
      .maybeSingle();

    const currentMap = (existing?.setting_value as Record<string, string | null>) || {};
    const updatedMap = {
      ...currentMap,
      [placementKey]: mediaAssetId,
    };

    const { error } = await supabase
      .from("site_settings")
      .upsert({
        setting_key: "homepage_image_placements",
        setting_value: updatedMap,
        description: "Homepage image placement assignments mapping",
        is_public: true,
      }, { onConflict: "setting_key" });

    if (error) {
      console.error("Error assigning homepage image placement:", error);
      return { error: "Unable to update homepage image placement. Please try again." };
    }

    revalidatePath("/admin/media");
    revalidatePath("/");

    return {
      success: true,
      message: "Homepage image updated successfully",
    };
  } catch (err) {
    console.error("Assign homepage image error:", err);
    return { error: "Unable to assign image. Please try again." };
  }
}
