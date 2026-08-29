"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { X, Save, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { updateMediaAssetAction, deleteMediaAssetAction } from "@/app/admin/media/actions";
import type { MediaAssetRow } from "@/types";
import type { ToastMessage } from "./toast";

interface EditMediaModalProps {
  asset: MediaAssetRow | null;
  isOpen: boolean;
  onClose: () => void;
  onToast: (toast: ToastMessage) => void;
}

function EditMediaModalForm({
  asset,
  onClose,
  onToast,
}: {
  asset: MediaAssetRow;
  onClose: () => void;
  onToast: (toast: ToastMessage) => void;
}) {
  const [altText, setAltText] = useState(asset.alt_text || "");
  const [isPublished, setIsPublished] = useState(asset.is_published);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const result = await updateMediaAssetAction(asset.id, {
      alt_text: altText,
      is_published: isPublished,
    });

    setIsSaving(false);

    if (result.error) {
      onToast({ type: "error", text: result.error });
    } else {
      onToast({ type: "success", text: result.message || "Image details saved successfully" });
      onClose();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    const result = await deleteMediaAssetAction(asset.id);
    setIsDeleting(false);

    if (result.error) {
      onToast({ type: "error", text: result.error });
    } else {
      onToast({ type: "success", text: result.message || "Image deleted successfully" });
      onClose();
    }
  };

  return (
    <div
      className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h2 id="edit-modal-title" className="text-lg font-bold text-white">
          Image Details & Settings
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Large Image Preview */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
        <img
          src={asset.secure_url}
          alt={asset.alt_text || "Media preview"}
          className="max-h-64 mx-auto rounded-lg object-contain shadow-md"
        />
        <div className="mt-3 flex items-center justify-center gap-3 text-xs text-slate-400 font-mono">
          <span>
            {asset.width && asset.height ? `${asset.width}×${asset.height}px` : "Image Asset"}
          </span>
          <span>•</span>
          <span className="uppercase">{asset.format || "PNG/JPG"}</span>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSave} className="space-y-4">
        {/* Alt Text Input */}
        <div>
          <label
            htmlFor="editAltText"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
          >
            Alt Text / Description
          </label>
          <input
            id="editAltText"
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Published Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            {isPublished ? (
              <Eye className="w-4 h-4 text-emerald-400" />
            ) : (
              <EyeOff className="w-4 h-4 text-slate-500" />
            )}
            <div>
              <p className="text-xs font-bold text-white">Visibility Status</p>
              <p className="text-[11px] text-slate-400">
                {isPublished ? "Visible & Available for Frontend" : "Hidden / Unpublished"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPublished(!isPublished)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              isPublished
                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                : "bg-slate-800 text-slate-400 border border-slate-700"
            }`}
          >
            {isPublished ? "Published" : "Unpublished"}
          </button>
        </div>

        {/* Delete Confirmation Prompt */}
        {showConfirmDelete ? (
          <div className="p-4 bg-red-950/90 border border-red-800 rounded-xl space-y-3">
            <p className="text-xs font-bold text-red-200">
              Are you sure you want to delete this image?
            </p>
            <p className="text-[11px] text-red-300">
              This action cannot be undone. Any section using this image will revert to fallback.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Confirm Delete"}
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="px-3.5 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        {/* Actions Bar */}
        <div className="pt-2 flex items-center justify-between gap-3">
          {!showConfirmDelete && (
            <button
              type="button"
              onClick={() => setShowConfirmDelete(true)}
              className="px-3.5 py-2.5 bg-red-950/60 hover:bg-red-900/80 text-red-400 border border-red-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          )}

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition-colors shadow-md disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export function EditMediaModal({ asset, isOpen, onClose, onToast }: EditMediaModalProps) {
  if (!isOpen || !asset) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <EditMediaModalForm key={asset.id} asset={asset} onClose={onClose} onToast={onToast} />
    </div>
  );
}
