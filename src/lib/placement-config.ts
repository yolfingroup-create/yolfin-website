/**
 * Centralized placement configuration for the Media Library image assignment system.
 * This is the single source of truth for all website image placement slots.
 */

export type PlacementKey =
  | "hero_image_id"
  | "why_us_image_id"
  | "about_hero_image_id"
  | "about_journey_image_id"
  | "services_hero_image_id"
  | "why_us_hero_image_id";

export interface PlacementSlot {
  key: PlacementKey;
  label: string;
  page: string;
  successMessage: string;
}

/** All website image placement slots, grouped by page for admin UI rendering. */
export const PLACEMENT_SLOTS: PlacementSlot[] = [
  {
    key: "hero_image_id",
    label: "Homepage Hero Visual",
    page: "Homepage",
    successMessage: "Homepage hero image updated successfully",
  },
  {
    key: "why_us_image_id",
    label: "Homepage Why Us Visual",
    page: "Homepage",
    successMessage: "Homepage Why Us image updated successfully",
  },
  {
    key: "about_hero_image_id",
    label: "About Us Hero Visual",
    page: "About Us",
    successMessage: "About Us hero image updated successfully",
  },
  {
    key: "about_journey_image_id",
    label: "About Us Journey Visual",
    page: "About Us",
    successMessage: "About Us journey image updated successfully",
  },
  {
    key: "services_hero_image_id",
    label: "Services Hero Visual",
    page: "Services",
    successMessage: "Services hero image updated successfully",
  },
  {
    key: "why_us_hero_image_id",
    label: "Why Us Hero Visual",
    page: "Why Us",
    successMessage: "Why Us hero image updated successfully",
  },
];

/** Get grouped placement slots by page for admin UI rendering. */
export function getPlacementsByPage(): Record<string, PlacementSlot[]> {
  const grouped: Record<string, PlacementSlot[]> = {};
  for (const slot of PLACEMENT_SLOTS) {
    if (!grouped[slot.page]) {
      grouped[slot.page] = [];
    }
    grouped[slot.page].push(slot);
  }
  return grouped;
}

/** Get a placement slot config by key. */
export function getPlacementSlot(key: PlacementKey): PlacementSlot | undefined {
  return PLACEMENT_SLOTS.find((s) => s.key === key);
}
