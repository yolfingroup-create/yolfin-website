"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { X, Search, CheckCircle2, Image as ImageIcon } from "lucide-react";
import type { MediaAssetRow } from "@/types";
import type { PlacementKey } from "@/lib/placement-config";

interface ImagePickerModalProps {
  isOpen: boolean;
  placementTitle: string;
  placementKey: PlacementKey;
  assets: MediaAssetRow[];
  currentAssetId: string | null;
  onClose: () => void;
  onSelect: (placementKey: PlacementKey, assetId: string | null) => void;
}

export function ImagePickerModal({
  isOpen,
  placementTitle,
  placementKey,
  assets,
  currentAssetId,
  onClose,
  onSelect,
}: ImagePickerModalProps) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const publishedAssets = assets.filter((a) => a.is_published);
  const filteredAssets = publishedAssets.filter((a) =>
    (a.alt_text || a.public_id).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="picker-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 text-slate-100 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Select Image
            </span>
            <h2 id="picker-modal-title" className="text-lg font-bold text-white">
              Assign to {placementTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Filter */}
        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search published images by name or alt text..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Unassign Button Option */}
        <div className="shrink-0 flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">
            Current status: {currentAssetId ? "Custom image assigned" : "Using corporate fallback"}
          </span>
          {currentAssetId && (
            <button
              onClick={() => {
                onSelect(placementKey, null);
                onClose();
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Remove Custom Image (Use Fallback)
            </button>
          )}
        </div>

        {/* Grid of Published Images */}
        <div className="flex-1 overflow-y-auto pr-1">
          {filteredAssets.length === 0 ? (
            <div className="p-8 text-center bg-slate-950/50 rounded-xl border border-slate-800 space-y-2">
              <ImageIcon className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">No published images match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredAssets.map((asset) => {
                const isSelected = asset.id === currentAssetId;
                return (
                  <div
                    key={asset.id}
                    onClick={() => {
                      onSelect(placementKey, asset.id);
                      onClose();
                    }}
                    className={`relative group bg-slate-950 rounded-xl border p-2.5 cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-950/30"
                        : "border-slate-800 hover:border-slate-600"
                    }`}
                  >
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
                      <img
                        src={asset.secure_url}
                        alt={asset.alt_text || "Asset"}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-emerald-950/60 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-[11px] font-bold text-slate-200 truncate">
                      {asset.alt_text || asset.public_id}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
