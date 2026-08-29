"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Mail, Eye, Trash2, X, Clock } from "lucide-react";
import { Toast, type ToastMessage } from "@/components/admin/toast";
import { updateInquiryStatusAction, deleteInquiryAction } from "@/app/admin/cms-actions";
import type { ContactInquiryRow, InquiryStatus } from "@/types";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiryRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | InquiryStatus>("all");
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiryRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/inquiries");
        if (res.ok && mounted) {
          const data = await res.json();
          setInquiries(data.inquiries || []);
        }
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdateStatus = async (id: string, status: InquiryStatus) => {
    const res = await updateInquiryStatusAction(id, status);
    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({ type: "success", text: res.message || "Status updated" });
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
      fetchInquiries();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteInquiryAction(id);
    setDeletingId(null);
    if (selectedInquiry?.id === id) setSelectedInquiry(null);

    if (res.error) {
      setToast({ type: "error", text: res.error });
    } else {
      setToast({ type: "success", text: res.message || "Inquiry deleted" });
      fetchInquiries();
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.full_name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.includes(search) ||
      (inq.message && inq.message.toLowerCase().includes(search.toLowerCase()));

    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && inq.status === statusFilter;
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
            Contact Inquiries Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            View, filter, and manage messages submitted via the website contact form.
          </p>
        </div>
      </div>

      {/* Search & Status Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries by name, email or message..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              statusFilter === "all" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            All ({inquiries.length})
          </button>
          <button
            onClick={() => setStatusFilter("new")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              statusFilter === "new" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            New
          </button>
          <button
            onClick={() => setStatusFilter("contacted")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              statusFilter === "contacted" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Contacted
          </button>
          <button
            onClick={() => setStatusFilter("closed")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              statusFilter === "closed" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Closed
          </button>
        </div>
      </div>

      {/* Inquiries Table */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading contact inquiries...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Mail className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Contact Inquiries Found</h3>
          <p className="text-xs text-slate-400">Inquiries submitted via the public contact form will appear here.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-4">Submitted Date</th>
                  <th className="p-4">Sender Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono text-slate-400">
                      {new Date(inq.submitted_at || inq.updated_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-white">{inq.full_name}</p>
                      {inq.company_name && <p className="text-[11px] text-slate-400">{inq.company_name}</p>}
                    </td>
                    <td className="p-4">
                      <p className="text-emerald-400">{inq.email}</p>
                      <p className="text-[11px] text-slate-400">{inq.phone}</p>
                    </td>
                    <td className="p-4 max-w-xs truncate text-slate-200">{inq.subject || "General Inquiry"}</td>
                    <td className="p-4">
                      <select
                        value={inq.status || "new"}
                        onChange={(e) =>
                          handleUpdateStatus(inq.id, e.target.value as InquiryStatus)
                        }
                        className="bg-slate-950 border border-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 text-slate-200 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="new">🆕 New</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="in_progress">⏳ In Progress</option>
                        <option value="closed">✅ Closed</option>
                        <option value="spam">🚫 Spam</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 inline mr-1" /> View
                      </button>
                      <button
                        onClick={() => setDeletingId(inq.id)}
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
            <h3 className="text-base font-bold text-white">Delete Inquiry Record?</h3>
            <p className="text-xs text-slate-300">Are you sure? This message will be permanently removed.</p>
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

      {/* View Message Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div
            className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl max-w-lg w-full space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Inquiry Message Details
                </span>
                <h2 className="text-lg font-bold text-white">{selectedInquiry.full_name}</h2>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Email</p>
                  <p className="font-bold text-emerald-400 truncate">{selectedInquiry.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Phone / WhatsApp</p>
                  <p className="font-bold text-white">{selectedInquiry.phone}</p>
                </div>
              </div>

              {selectedInquiry.company_name && (
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Company Name</p>
                  <p className="text-sm font-semibold text-slate-200">{selectedInquiry.company_name}</p>
                </div>
              )}

              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Subject</p>
                <p className="text-sm font-bold text-white">{selectedInquiry.subject || "General Inquiry"}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Message</p>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Received: {new Date(selectedInquiry.submitted_at || selectedInquiry.updated_at).toLocaleString()}
                </span>
                <span className="uppercase font-bold text-emerald-400">Status: {selectedInquiry.status}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
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
