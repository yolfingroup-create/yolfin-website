"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Filter, Image as ImageIcon, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Toast, type ToastMessage } from "@/components/admin/toast";
import { UploadModal } from "@/components/admin/upload-modal";
import { EditMediaModal } from "@/components/admin/edit-media-modal";
import { ImagePickerModal } from "@/components/admin/image-picker-modal";
import { assignPlacementImageAction } from "./actions";
import { PLACEMENT_SLOTS, getPlacementsByPage } from "@/lib/placement-config";
import type { PlacementKey } from "@/lib/placement-config";
import type { MediaAssetRow } from "@/types";

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAssetRow[]>([]);
  const [placementsMap, setPlacementsMap] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "unpublished">("all");

  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<MediaAssetRow | null>(null);

  const [pickerConfig, setPickerConfig] = useState<{
    isOpen: boolean;
    title: string;
    key: PlacementKey;
  }>({
    isOpen: false,
    title: "",
    key: "hero_image_id",
  });

  const loadMediaData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setAssets(data.assets || []);
        setPlacementsMap(data.placementsMap || {});
      }
    } catch (err) {
      console.error("Error loading media assets:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const executeFetch = async () => {
      try {
        const res = await fetch("/api/admin/media");
        if (res.ok && isMounted) {
          const data = await res.json();
          setAssets(data.assets || []);
          setPlacementsMap(data.placementsMap || {});
        }
      } catch (err) {
        console.error("Error loading media assets:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    executeFetch();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToast = (t: ToastMessage) => {
    setToast(t);
    loadMediaData();
  };

  const handleSelectPlacementImage = async (
    key: PlacementKey,
    assetId: string | null
  ) => {
    const result = await assignPlacementImageAction(key, assetId);
    if (result.error) {
      setToast({ type: "error", text: result.error });
    } else {
      setToast({ type: "success", text: result.message || "Image placement updated successfully" });
      loadMediaData();
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      (asset.alt_text || asset.public_id).toLowerCase().includes(search.toLowerCase());

    if (filter === "published") return matchesSearch && asset.is_published;
    if (filter === "unpublished") return matchesSearch && !asset.is_published;
    return matchesSearch;
  });

  const getPlacementBadge = (assetId: string) => {
    const usages: string[] = [];
    for (const slot of PLACEMENT_SLOTS) {
      if (placementsMap[slot.key] === assetId) {
        usages.push(slot.label);
      }
    }
    return usages;
  };

  const pageGroups = getPlacementsByPage();

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
            Media Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Media Library
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Manage image assets and assign images to public website placement slots.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer touch-target"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Website Image Placements Section — grouped by page */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8">
        <div>
          <h2 className="text-lg font-bold text-white">Website Image Assignments</h2>
          <p className="text-xs text-slate-400">
            Select uploaded published images for key visual placements across all public website pages.
          </p>
        </div>

        {Object.entries(pageGroups).map(([pageName, slots]) => (
          <div key={pageName} className="space-y-4">
            {/* Page Group Header */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg uppercase tracking-wider border border-slate-700">
                {pageName}
              </span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slots.map((slot) => {
                const assignedAsset = assets.find((a) => a.id === placementsMap[slot.key]);
                const globalSlotIndex = PLACEMENT_SLOTS.findIndex((s) => s.key === slot.key) + 1;

                return (
                  <div
                    key={slot.key}
                    className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                          Placement Slot #{globalSlotIndex}
                        </span>
                        <h3 className="text-sm font-bold text-white">{slot.label}</h3>
                      </div>
                      <button
                        onClick={() =>
                          setPickerConfig({
                            isOpen: true,
                            title: slot.label,
                            key: slot.key,
                          })
                        }
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold rounded-lg border border-slate-700 transition-colors cursor-pointer"
                      >
                        {assignedAsset ? "Change Image" : "Select Image"}
                      </button>
                    </div>

                    {assignedAsset ? (
                      <div className="flex items-center gap-3 p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <img
                          src={assignedAsset.secure_url}
                          alt={assignedAsset.alt_text || slot.label}
                          className="w-16 h-12 object-cover rounded-md"
                        />
                        <div className="overflow-hidden text-xs">
                          <p className="font-bold text-white truncate">{assignedAsset.alt_text || assignedAsset.public_id}</p>
                          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Active on {slot.label}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic p-3 bg-slate-900/50 rounded-lg">
                        No custom image assigned. Using corporate fallback visual.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images by name or description..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                filter === "all" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              All ({assets.length})
            </button>
            <button
              onClick={() => setFilter("published")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                filter === "published" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setFilter("unpublished")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                filter === "unpublished" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Unpublished
            </button>
          </div>
        </div>
      </div>

      {/* Media Asset Cards Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs">
          Loading media library assets...
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Image Assets Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Upload your first corporate image asset using the button above.
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5 cursor-pointer mt-2"
          >
            <Plus className="w-4 h-4" /> Upload Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => {
            const placements = getPlacementBadge(asset.id);
            return (
              <div
                key={asset.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-sm group"
              >
                <div className="space-y-3">
                  {/* Image Thumbnail */}
                  <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800/80 flex items-center justify-center">
                    <img
                      src={asset.secure_url}
                      alt={asset.alt_text || "Media thumbnail"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      {asset.is_published ? (
                        <span className="px-2 py-0.5 bg-emerald-950/90 text-emerald-400 border border-emerald-800 text-[10px] font-bold rounded-md flex items-center gap-1">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-950/90 text-slate-400 border border-slate-800 text-[10px] font-bold rounded-md flex items-center gap-1">
                          <EyeOff className="w-3 h-3" /> Unpublished
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white truncate">
                      {asset.alt_text || asset.public_id}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {asset.format ? asset.format.toUpperCase() : "IMAGE"}{" "}
                      {asset.width && asset.height ? `• ${asset.width}×${asset.height}px` : ""}
                    </p>
                  </div>

                  {/* Usage Placement Badges */}
                  {placements.length > 0 ? (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {placements.map((p) => (
                        <span
                          key={p}
                          className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold rounded"
                        >
                          Used in: {p}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-500 italic">Not assigned to any placement</p>
                  )}
                </div>

                {/* Edit Button */}
                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setEditingAsset(asset)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Edit Image Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Dialog Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onToast={handleToast}
      />

      {/* Edit Details Dialog Modal */}
      <EditMediaModal
        asset={editingAsset}
        isOpen={!!editingAsset}
        onClose={() => setEditingAsset(null)}
        onToast={handleToast}
      />

      {/* Placement Picker Modal */}
      <ImagePickerModal
        isOpen={pickerConfig.isOpen}
        placementTitle={pickerConfig.title}
        placementKey={pickerConfig.key}
        assets={assets}
        currentAssetId={placementsMap[pickerConfig.key] || null}
        onClose={() => setPickerConfig((prev) => ({ ...prev, isOpen: false }))}
        onSelect={handleSelectPlacementImage}
      />
    </div>
  );
}
