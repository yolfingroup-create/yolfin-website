"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Calendar, Eye, Trash2, X, Building2, CheckCircle2 } from "lucide-react";
import { Toast, type ToastMessage } from "@/components/admin/toast";
import { updateBookingStatusAction, deleteBookingAction } from "@/app/admin/cms-actions";
import type { TrialBookingRow, TrialBookingStatus, TaxClassification } from "@/types";

export default function AdminTrialBookingsPage() {
  const [bookings, setBookings] = useState<TrialBookingRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [taxFilter, setTaxFilter] = useState<"all" | TaxClassification>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | TrialBookingStatus>("all");
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [selectedBooking, setSelectedBooking] = useState<TrialBookingRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/trial-bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error("Error fetching trial bookings:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/trial-bookings");
        if (res.ok && mounted) {
          const data = await res.json();
          setBookings(data.bookings || []);
        }
      } catch (err) {
        console.error("Error fetching trial bookings:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdateStatus = async (id: string, status: TrialBookingStatus) => {
    const res = await updateBookingStatusAction(id, status);
    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({ type: "success", text: res.message || "Booking status updated" });
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status });
      }
      fetchBookings();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteBookingAction(id);
    setDeletingId(null);
    if (selectedBooking?.id === id) setSelectedBooking(null);

    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({ type: "success", text: res.message || "Booking lead deleted" });
      fetchBookings();
    }
  };

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.full_name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      (b.company_name && b.company_name.toLowerCase().includes(search.toLowerCase()));

    const matchesTax = taxFilter === "all" || b.tax_classification === taxFilter;
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;

    return matchesSearch && matchesTax && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
            Lead Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            1-Month Free Trial Bookings
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            View and manage trial lead registrations submitted via the global booking modal.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, phone or company..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={taxFilter}
            onChange={(e) => setTaxFilter(e.target.value as "all" | TaxClassification)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">All Tax Classifications</option>
            <option value="indian_gst">INDIAN GST</option>
            <option value="uae_vat">UAE VAT</option>
            <option value="other">Other</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | TrialBookingStatus)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">All Statuses ({bookings.length})</option>
            <option value="pending">⏳ Pending</option>
            <option value="contacted">📞 Contacted</option>
            <option value="in_progress">🔄 In Progress</option>
            <option value="onboarded">🎯 Onboarded</option>
            <option value="declined">❌ Declined</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading trial bookings...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Trial Bookings Found</h3>
          <p className="text-xs text-slate-400">Leads generated via the 1-Month Free Trial modal will appear here.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Lead Name</th>
                  <th className="p-4">Contact Details</th>
                  <th className="p-4">Tax / Region</th>
                  <th className="p-4">Lead Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono text-slate-400">
                      {new Date(booking.submitted_at || booking.updated_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-white">{booking.full_name}</p>
                      {booking.company_name && <p className="text-[11px] text-slate-400">{booking.company_name}</p>}
                    </td>
                    <td className="p-4">
                      <p className="text-emerald-400">{booking.email}</p>
                      <p className="text-[11px] text-slate-400">{booking.phone}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 bg-slate-950 text-emerald-300 border border-slate-800 text-[10px] font-bold rounded uppercase flex items-center gap-1 w-fit">
                        <Building2 className="w-3 h-3 text-emerald-400" />
                        {booking.tax_classification ? booking.tax_classification.replace("_", " ").toUpperCase() : "GST"}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={booking.status || "pending"}
                        onChange={(e) =>
                          handleUpdateStatus(booking.id, e.target.value as TrialBookingStatus)
                        }
                        className="bg-slate-950 border border-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 text-slate-200 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="in_progress">🔄 In Progress</option>
                        <option value="onboarded">🎯 Onboarded</option>
                        <option value="declined">❌ Declined</option>
                        <option value="spam">🚫 Spam</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 inline mr-1" /> View
                      </button>
                      <button
                        onClick={() => setDeletingId(booking.id)}
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
            <h3 className="text-base font-bold text-white">Delete Trial Lead?</h3>
            <p className="text-xs text-slate-300">Are you sure? This booking lead record will be permanently deleted.</p>
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

      {/* View Lead Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div
            className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl max-w-lg w-full space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  1-Month Free Trial Lead Details
                </span>
                <h2 className="text-lg font-bold text-white">{selectedBooking.full_name}</h2>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Email</p>
                  <p className="font-bold text-emerald-400 truncate">{selectedBooking.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Phone / WhatsApp</p>
                  <p className="font-bold text-white">{selectedBooking.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Company Name</p>
                  <p className="font-semibold text-slate-200">{selectedBooking.company_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Region / Tax</p>
                  <p className="font-semibold text-emerald-400 uppercase">
                    {selectedBooking.tax_classification ? selectedBooking.tax_classification.replace("_", " ") : "GST"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1.5">Services Interested In</p>
                <div className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {selectedBooking.services_interested && selectedBooking.services_interested.length > 0 ? (
                    selectedBooking.services_interested.map((svc: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{svc}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 italic">Accounting & Finance (Default)</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 border-t border-slate-800">
                <span>Submitted: {new Date(selectedBooking.submitted_at || selectedBooking.updated_at).toLocaleString()}</span>
                <span className="uppercase font-bold text-emerald-400">Status: {selectedBooking.status}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
