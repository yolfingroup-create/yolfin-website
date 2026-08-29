"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit, Trash2, ShieldCheck, CheckCircle2, XCircle, X, Save, Loader2 } from "lucide-react";
import { Toast, type ToastMessage } from "@/components/admin/toast";
import {
  createWhyYolfinItemAction,
  updateWhyYolfinItemAction,
  deleteWhyYolfinItemAction,
} from "@/app/admin/cms-actions";
import type { WhyYolfinItemRow } from "@/types";

export default function AdminContentPage() {
  const [whyItems, setWhyItems] = useState<WhyYolfinItemRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [activeItem, setActiveItem] = useState<WhyYolfinItemRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("ShieldCheck");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchWhyItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const data = await res.json();
        setWhyItems(data.whyItems || []);
      }
    } catch (err) {
      console.error("Error loading content items:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/content");
        if (res.ok && mounted) {
          const data = await res.json();
          setWhyItems(data.whyItems || []);
        }
      } catch (err) {
        console.error("Error loading content items:", err);
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
    setActiveItem(null);
    setTitle("");
    setDescription("");
    setIconName("ShieldCheck");
    setDisplayOrder(whyItems.length + 1);
    setIsActive(true);
    setModalMode("create");
  };

  const openEditModal = (item: WhyYolfinItemRow) => {
    setActiveItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setIconName(item.icon_name || "ShieldCheck");
    setDisplayOrder(item.display_order);
    setIsActive(item.is_active);
    setModalMode("edit");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (modalMode === "create") {
      const res = await createWhyYolfinItemAction({
        title,
        description,
        icon_name: iconName,
        display_order: Number(displayOrder),
        is_active: isActive,
      });
      setIsSubmitting(false);

      if (res.error) {
        setToast({ type: "error", text: res.error });
      } else {
        setToast({ type: "success", text: res.message || "Feature added successfully" });
        setModalMode(null);
        fetchWhyItems();
      }
    } else if (modalMode === "edit" && activeItem) {
      const res = await updateWhyYolfinItemAction(activeItem.id, {
        title,
        description,
        icon_name: iconName,
        display_order: Number(displayOrder),
        is_active: isActive,
      });
      setIsSubmitting(false);

      if (res.error) {
        setToast({ type: "error", text: res.error });
      } else {
        setToast({ type: "success", text: res.message || "Feature updated successfully" });
        setModalMode(null);
        fetchWhyItems();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteWhyYolfinItemAction(id);
    setDeletingId(null);

    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({ type: "success", text: res.message || "Feature deleted" });
      fetchWhyItems();
    }
  };

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
            Why Yolfin Content Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Manage key value proposition items and differentiator cards shown on `/why-us` and `/about`.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer touch-target"
        >
          <Plus className="w-4 h-4" />
          <span>Add Feature Item</span>
        </button>
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading Why Yolfin features...</div>
      ) : whyItems.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Feature Items Found</h3>
          <p className="text-xs text-slate-400">Add core benefit items using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">Order #{item.display_order}</span>
                  {item.is_active ? (
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-bold rounded flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Inactive
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5 inline mr-1" /> Edit
                </button>
                <button
                  onClick={() => setDeletingId(item.id)}
                  className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-400 border border-red-800 text-xs font-bold rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 inline" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Prompt */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-red-800 p-6 rounded-2xl max-w-sm w-full space-y-4 text-slate-100">
            <h3 className="text-base font-bold text-white">Delete Feature Item?</h3>
            <p className="text-xs text-slate-300">Are you sure? This item will be removed from Why Choose Yolfin grid.</p>
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
                {modalMode === "create" ? "Add Why Yolfin Feature" : "Edit Feature Item"}
              </h2>
              <button onClick={() => setModalMode(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Feature Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 1 Month Free Trial"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Feature explanation text..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Icon Identifier
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Gift">Gift Icon 🎁</option>
                    <option value="ShieldCheck">Shield Check 🛡️</option>
                    <option value="Users">Users Icon 👥</option>
                    <option value="FileBarChart">Bar Chart 📊</option>
                    <option value="MessageSquare">Message 💬</option>
                    <option value="Handshake">Handshake 🤝</option>
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
                <span className="text-xs font-bold text-white">Active Status</span>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isActive ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {isActive ? "Active" : "Inactive"}
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
                  <span>{modalMode === "create" ? "Add Feature" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
