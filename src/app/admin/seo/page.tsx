"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, ShieldCheck, Edit, Trash2, Eye, EyeOff, X, Save, Loader2 } from "lucide-react";
import { Toast, type ToastMessage } from "@/components/admin/toast";
import { upsertSeoMetadataAction, deleteSeoMetadataAction } from "@/app/admin/cms-actions";
import type { SEOMetadataRow } from "@/types";

export default function AdminSeoPage() {
  const [seoRecords, setSeoRecords] = useState<SEOMetadataRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [pagePath, setPagePath] = useState("/");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSeoRecords = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/seo");
      if (res.ok) {
        const data = await res.json();
        setSeoRecords(data.seoRecords || []);
      }
    } catch (err) {
      console.error("Error fetching SEO records:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/seo");
        if (res.ok && mounted) {
          const data = await res.json();
          setSeoRecords(data.seoRecords || []);
        }
      } catch (err) {
        console.error("Error fetching SEO records:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const openCreateModal = () => {
    setPagePath("/");
    setTitle("");
    setDescription("");
    setOgTitle("");
    setOgDescription("");
    setIsPublished(true);
    setModalMode("create");
  };

  const openEditModal = (rec: SEOMetadataRow) => {
    setPagePath(rec.page_path);
    setTitle(rec.title);
    setDescription(rec.description);
    setOgTitle(rec.og_title || rec.title);
    setOgDescription(rec.og_description || rec.description);
    setIsPublished(rec.is_published);
    setModalMode("edit");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await upsertSeoMetadataAction({
      page_path: pagePath,
      title,
      description,
      og_title: ogTitle,
      og_description: ogDescription,
      is_published: isPublished,
    });

    setIsSubmitting(false);

    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({ type: "success", text: res.message || "SEO metadata saved successfully" });
      setModalMode(null);
      fetchSeoRecords();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteSeoMetadataAction(id);
    setDeletingId(null);

    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({ type: "success", text: res.message || "SEO record deleted" });
      fetchSeoRecords();
    }
  };

  const filtered = seoRecords.filter(
    (r) =>
      r.page_path.toLowerCase().includes(search.toLowerCase()) ||
      r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
            CMS Module
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            SEO Metadata Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Manage titles, meta descriptions, and OpenGraph tags for website paths.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer touch-target"
        >
          <Plus className="w-4 h-4" />
          <span>Add SEO Record</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by page path or meta title..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading SEO records...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No SEO Records Found</h3>
          <p className="text-xs text-slate-400">Add metadata for website routes using the button above.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-4">Page Path</th>
                  <th className="p-4">Meta Title</th>
                  <th className="p-4">Meta Description</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-emerald-400">{rec.page_path}</td>
                    <td className="p-4 font-bold text-white max-w-xs truncate">{rec.title}</td>
                    <td className="p-4 text-slate-400 max-w-sm truncate">{rec.description}</td>
                    <td className="p-4">
                      {rec.is_published ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                          <Eye className="w-3.5 h-3.5" /> Published
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-1 font-semibold">
                          <EyeOff className="w-3.5 h-3.5" /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(rec)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5 inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => setDeletingId(rec.id)}
                        className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-400 border border-red-800 rounded-lg font-bold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Prompt */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-red-800 p-6 rounded-2xl max-w-sm w-full space-y-4 text-slate-100">
            <h3 className="text-base font-bold text-white">Delete SEO Record?</h3>
            <p className="text-xs text-slate-300">Are you sure? Metadata for this path will fall back to site defaults.</p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upsert Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div
            className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl max-w-lg w-full space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {modalMode === "create" ? "Add Page SEO Metadata" : "Edit Page SEO Metadata"}
              </h2>
              <button onClick={() => setModalMode(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Page Path *
                </label>
                <select
                  value={pagePath}
                  onChange={(e) => setPagePath(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-emerald-400 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="/">/ (Homepage)</option>
                  <option value="/about">/about (About Us)</option>
                  <option value="/services">/services (Services Listing)</option>
                  <option value="/why-us">/why-us (Why Choose Yolfin)</option>
                  <option value="/contact">/contact (Contact Us)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Meta Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Yolfin Group | Accounting, Travel & Facility Support"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Meta Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Search engine summary snippet (150-160 characters)..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  OpenGraph Title (Social Share)
                </label>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="Defaults to Meta Title if left blank"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  OpenGraph Description
                </label>
                <textarea
                  rows={2}
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="Defaults to Meta Description if left blank"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-white">Publish SEO Metadata</span>
                <button
                  type="button"
                  onClick={() => setIsPublished(!isPublished)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isPublished ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {isPublished ? "Published" : "Hidden"}
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save SEO Metadata</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
