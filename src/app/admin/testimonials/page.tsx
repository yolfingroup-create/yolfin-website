"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, MessageSquareQuote, Edit, Trash2, Eye, EyeOff, Star, X, Save, Loader2 } from "lucide-react";
import { Toast, type ToastMessage } from "@/components/admin/toast";
import { createTestimonialAction, updateTestimonialAction, deleteTestimonialAction } from "@/app/admin/cms-actions";
import type { TestimonialRow } from "@/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<TestimonialRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form state
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [isPublished, setIsPublished] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/testimonials");
        if (res.ok && mounted) {
          const data = await res.json();
          setTestimonials(data.testimonials || []);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
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
    setActiveTestimonial(null);
    setClientName("");
    setCompanyName("");
    setDesignation("Business Owner");
    setQuote("");
    setRating(5);
    setIsPublished(true);
    setDisplayOrder(testimonials.length + 1);
    setModalMode("create");
  };

  const openEditModal = (t: TestimonialRow) => {
    setActiveTestimonial(t);
    setClientName(t.client_name);
    setCompanyName(t.company_name || "");
    setDesignation(t.designation || "");
    setQuote(t.quote);
    setRating(t.rating || 5);
    setIsPublished(t.is_published);
    setDisplayOrder(t.display_order);
    setModalMode("edit");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (modalMode === "create") {
      const res = await createTestimonialAction({
        client_name: clientName,
        company_name: companyName,
        designation: designation,
        quote,
        rating: Number(rating),
        is_published: isPublished,
        display_order: Number(displayOrder),
      });
      setIsSubmitting(false);

      if (res.error) {
        setToast({ type: "error", text: res.error });
      } else {
        setToast({ type: "success", text: res.message || "Testimonial created successfully" });
        setModalMode(null);
        fetchTestimonials();
      }
    } else if (modalMode === "edit" && activeTestimonial) {
      const res = await updateTestimonialAction(activeTestimonial.id, {
        client_name: clientName,
        company_name: companyName,
        designation: designation,
        quote,
        rating: Number(rating),
        is_published: isPublished,
        display_order: Number(displayOrder),
      });
      setIsSubmitting(false);

      if (res.error) {
        setToast({ type: "error", text: res.error });
      } else {
        setToast({ type: "success", text: res.message || "Testimonial saved successfully" });
        setModalMode(null);
        fetchTestimonials();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteTestimonialAction(id);
    setDeletingId(null);

    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({ type: "success", text: res.message || "Testimonial deleted successfully" });
      fetchTestimonials();
    }
  };

  const filtered = testimonials.filter(
    (t) =>
      t.client_name.toLowerCase().includes(search.toLowerCase()) ||
      t.quote.toLowerCase().includes(search.toLowerCase())
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
            Testimonials Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Manage client testimonials displayed on the Why Choose Yolfin page and homepage.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer touch-target"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search testimonials by client name or quote..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Testimonials Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading testimonials...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <MessageSquareQuote className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Testimonials Found</h3>
          <p className="text-xs text-slate-400">Add client testimonials to showcase trust on the website.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  {t.is_published ? (
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold rounded flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Published
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-bold rounded flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Unpublished
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-200 italic leading-relaxed">&quot;{t.quote}&quot;</p>

                <div>
                  <h4 className="text-sm font-bold text-white">{t.client_name}</h4>
                  <p className="text-[11px] text-slate-400">{t.designation || "Client"} {t.company_name ? `• ${t.company_name}` : ""}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">Order #{t.display_order}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(t)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5 inline" /> Edit
                  </button>
                  <button
                    onClick={() => setDeletingId(t.id)}
                    className="px-2.5 py-1 bg-red-950/60 hover:bg-red-900/80 text-red-400 border border-red-800 text-xs font-bold rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 inline" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Prompt */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-red-800 p-6 rounded-2xl max-w-sm w-full space-y-4 text-slate-100">
            <h3 className="text-base font-bold text-white">Delete Testimonial?</h3>
            <p className="text-xs text-slate-300">Are you sure? This action cannot be undone.</p>
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

      {/* Create / Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div
            className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl max-w-lg w-full space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {modalMode === "create" ? "Add Testimonial" : "Edit Testimonial"}
              </h2>
              <button onClick={() => setModalMode(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Tech Kerala"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Managing Director"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Quote / Testimonial Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Client recommendation text..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Star Rating (1-5)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                    <option value={3}>3 Stars ⭐⭐⭐</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-white">Publish on Website</span>
                <button
                  type="button"
                  onClick={() => setIsPublished(!isPublished)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isPublished ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {isPublished ? "Published" : "Unpublished"}
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
                  <span>{modalMode === "create" ? "Add Testimonial" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
