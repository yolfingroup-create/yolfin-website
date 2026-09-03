"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Layers, Edit, Trash2, Eye, EyeOff, X, Save, Loader2 } from "lucide-react";
import { Toast, type ToastMessage } from "@/components/admin/toast";
import { createServiceAction, updateServiceAction, deleteServiceAction } from "@/app/admin/cms-actions";
import type { ServiceRow } from "@/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "coming_soon" | "unpublished">("all");
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [activeService, setActiveService] = useState<ServiceRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [detailedDesc, setDetailedDesc] = useState("");
  const [status, setStatus] = useState<"active" | "coming_soon">("active");
  const [isPublished, setIsPublished] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/services");
        if (res.ok && mounted) {
          const data = await res.json();
          setServices(data.services || []);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
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
    setActiveService(null);
    setName("");
    setSlug("");
    setShortDesc("");
    setDetailedDesc("");
    setStatus("active");
    setIsPublished(true);
    setDisplayOrder(services.length + 1);
    setModalMode("create");
  };

  const openEditModal = (service: ServiceRow) => {
    setActiveService(service);
    setName(service.name);
    setSlug(service.slug);
    setShortDesc(service.short_description || "");
    setDetailedDesc(service.detailed_description || "");
    setStatus(service.status as "active" | "coming_soon");
    setIsPublished(service.is_published);
    setDisplayOrder(service.display_order);
    setModalMode("edit");
  };

  const handleSlugHelper = (val: string) => {
    setName(val);
    if (modalMode === "create") {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (modalMode === "create") {
      const res = await createServiceAction({
        name,
        slug,
        short_description: shortDesc,
        detailed_description: detailedDesc,
        status,
        is_published: isPublished,
        display_order: Number(displayOrder),
      });
      setIsSubmitting(false);

      if (res.error) {
        setToast({ type: "error", text: res.error });
      } else {
        setToast({ type: "success", text: res.message || "Service created successfully" });
        setModalMode(null);
        fetchServices();
      }
    } else if (modalMode === "edit" && activeService) {
      const res = await updateServiceAction(activeService.id, {
        name,
        slug,
        short_description: shortDesc,
        detailed_description: detailedDesc,
        status,
        is_published: isPublished,
        display_order: Number(displayOrder),
      });
      setIsSubmitting(false);

      if (res.error) {
        setToast({ type: "error", text: res.error });
      } else {
        setToast({ type: "success", text: res.message || "Service saved successfully" });
        setModalMode(null);
        fetchServices();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteServiceAction(id);
    setDeletingId(null);

    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({ type: "success", text: res.message || "Service deleted successfully" });
      fetchServices();
    }
  };

  const handleToggleStatus = async (service: ServiceRow) => {
    const newStatus = service.status === "active" ? "coming_soon" : "active";
    const res = await updateServiceAction(service.id, { status: newStatus });
    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({
        type: "success",
        text: `Status updated to ${newStatus === "active" ? "Active" : "Coming Soon"}`,
      });
      fetchServices();
    }
  };

  const handleToggleVisibility = async (service: ServiceRow) => {
    const newPublished = !service.is_published;
    const res = await updateServiceAction(service.id, { is_published: newPublished });
    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({
        type: "success",
        text: `Visibility updated to ${newPublished ? "Published" : "Unpublished"}`,
      });
      fetchServices();
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.slug.includes(search.toLowerCase());
    if (filter === "active") return matchesSearch && s.status === "active" && s.is_published;
    if (filter === "coming_soon") return matchesSearch && s.status === "coming_soon";
    if (filter === "unpublished") return matchesSearch && !s.is_published;
    return matchesSearch;
  });

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
            Services Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Create, edit, publish and reorder primary services displayed on the public website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer touch-target"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services by name or slug..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              filter === "all" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            All ({services.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              filter === "active" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("coming_soon")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              filter === "coming_soon" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Coming Soon
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

      {/* Services Table / Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading services database...</div>
      ) : filteredServices.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Services Found</h3>
          <p className="text-xs text-slate-400">Add your first corporate service using the button above.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-4">Order</th>
                  <th className="p-4">Service Name</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono text-slate-500">#{service.display_order}</td>
                    <td className="p-4 font-bold text-white">{service.name}</td>
                    <td className="p-4 font-mono text-emerald-400">/services/{service.slug}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(service)}
                        title="Click to toggle status (Active / Coming Soon)"
                        className="cursor-pointer transition-transform active:scale-95"
                      >
                        {service.status === "active" ? (
                          <span className="px-2.5 py-0.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-[10px] font-bold rounded uppercase inline-block">
                            Active
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 text-[10px] font-semibold rounded uppercase inline-block">
                            Coming Soon
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleVisibility(service)}
                        title="Click to toggle visibility (Published / Unpublished)"
                        className="cursor-pointer transition-transform active:scale-95"
                      >
                        {service.is_published ? (
                          <span className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold">
                            <Eye className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="text-slate-500 hover:text-slate-400 flex items-center gap-1 font-semibold">
                            <EyeOff className="w-3.5 h-3.5" /> Unpublished
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5 inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => setDeletingId(service.id)}
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
            <h3 className="text-base font-bold text-white">Delete Service?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete this service? This action cannot be undone.
            </p>
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

      {/* Create / Edit Dialog Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div
            className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl max-w-lg w-full space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {modalMode === "create" ? "Add New Service" : "Edit Service Details"}
              </h2>
              <button
                onClick={() => setModalMode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleSlugHelper(e.target.value)}
                  placeholder="e.g. Accounting & Finance"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. accounting-finance"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-emerald-400 font-mono focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Brief summary for service cards..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  value={detailedDesc}
                  onChange={(e) => setDetailedDesc(e.target.value)}
                  placeholder="Full description for service detail page..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Operational Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "active" | "coming_soon")}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="active">Active Service</option>
                    <option value="coming_soon">Coming Soon</option>
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
                  <span>{modalMode === "create" ? "Create Service" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
