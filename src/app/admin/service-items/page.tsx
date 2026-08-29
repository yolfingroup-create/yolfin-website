"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Edit, Trash2, CheckCircle2, XCircle, X, Save, Loader2 } from "lucide-react";
import { Toast, type ToastMessage } from "@/components/admin/toast";
import { createServiceItemAction, updateServiceItemAction, deleteServiceItemAction } from "@/app/admin/cms-actions";
import type { ServiceItemRow, ServiceRow } from "@/types";

export default function AdminServiceItemsPage() {
  const [items, setItems] = useState<ServiceItemRow[]>([]);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("all");
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [activeItem, setActiveItem] = useState<ServiceItemRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form state
  const [serviceId, setServiceId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [resItems, resServices] = await Promise.all([
        fetch("/api/admin/service-items"),
        fetch("/api/admin/services"),
      ]);

      if (resItems.ok && resServices.ok) {
        const dataItems = await resItems.json();
        const dataServices = await resServices.json();
        setItems(dataItems.items || []);
        setServices(dataServices.services || []);
      }
    } catch (err) {
      console.error("Error fetching service items:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [resItems, resServices] = await Promise.all([
          fetch("/api/admin/service-items"),
          fetch("/api/admin/services"),
        ]);
        if (resItems.ok && resServices.ok && mounted) {
          const dataItems = await resItems.json();
          const dataServices = await resServices.json();
          setItems(dataItems.items || []);
          setServices(dataServices.services || []);
        }
      } catch (err) {
        console.error("Error fetching service items:", err);
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
    setServiceId(services[0]?.id || "");
    setTitle("");
    setDescription("");
    setDisplayOrder(items.length + 1);
    setIsActive(true);
    setModalMode("create");
  };

  const openEditModal = (item: ServiceItemRow) => {
    setActiveItem(item);
    setServiceId(item.service_id);
    setTitle(item.title);
    setDescription(item.description || "");
    setDisplayOrder(item.display_order);
    setIsActive(item.is_active);
    setModalMode("edit");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (modalMode === "create") {
      const res = await createServiceItemAction({
        service_id: serviceId,
        title,
        description,
        display_order: Number(displayOrder),
        is_active: isActive,
      });
      setIsSubmitting(false);

      if (res.error) {
        setToast({ type: "error", text: res.error });
      } else {
        setToast({ type: "success", text: res.message || "Service item created successfully" });
        setModalMode(null);
        fetchData();
      }
    } else if (modalMode === "edit" && activeItem) {
      const res = await updateServiceItemAction(activeItem.id, {
        title,
        description,
        display_order: Number(displayOrder),
        is_active: isActive,
      });
      setIsSubmitting(false);

      if (res.error) {
        setToast({ type: "error", text: res.error });
      } else {
        setToast({ type: "success", text: res.message || "Service item saved successfully" });
        setModalMode(null);
        fetchData();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteServiceItemAction(id);
    setDeletingId(null);

    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({ type: "success", text: res.message || "Service item deleted successfully" });
      fetchData();
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || (item.description || "").toLowerCase().includes(search.toLowerCase());
    const matchesService = selectedServiceId === "all" || item.service_id === selectedServiceId;
    return matchesSearch && matchesService;
  });

  const getServiceName = (sId: string) => {
    return services.find((s) => s.id === sId)?.name || "Unknown Service";
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
            Service Items Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Manage granular offerings and features belonging to parent services.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer touch-target"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service Item</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items by title or description..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-semibold shrink-0">Filter Parent:</label>
          <select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">All Services ({items.length})</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Table */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading service items...</div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <h3 className="text-base font-bold text-white">No Service Items Found</h3>
          <p className="text-xs text-slate-400">Add feature offerings for parent services using the button above.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-4">Order</th>
                  <th className="p-4">Parent Service</th>
                  <th className="p-4">Item Title</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono text-slate-500">#{item.display_order}</td>
                    <td className="p-4 font-bold text-emerald-400">{getServiceName(item.service_id)}</td>
                    <td className="p-4 font-bold text-white">{item.title}</td>
                    <td className="p-4 text-slate-400 max-w-xs truncate">{item.description || "N/A"}</td>
                    <td className="p-4">
                      {item.is_active ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-1 font-semibold">
                          <XCircle className="w-3.5 h-3.5" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5 inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => setDeletingId(item.id)}
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
            <h3 className="text-base font-bold text-white">Delete Service Item?</h3>
            <p className="text-xs text-slate-300">Are you sure? This will remove this item from the public site.</p>
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
                {modalMode === "create" ? "Add Service Item" : "Edit Service Item"}
              </h2>
              <button onClick={() => setModalMode(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Parent Service *
                </label>
                <select
                  disabled={modalMode === "edit"}
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Item Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Bookkeeping & Accounting"
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
                  placeholder="Detailed description of this offering..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
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
                  <span>{modalMode === "create" ? "Add Item" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
