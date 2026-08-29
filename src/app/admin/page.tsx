import Link from "next/link";
import {
  Layers,
  CheckCircle2,
  Mail,
  Calendar,
  MessageSquareQuote,
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { getAdminUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const { user } = await getAdminUser();
  const supabase = await createClient();

  // Fetch live metrics from database
  const [
    { count: totalServices },
    { count: activeServices },
    { count: totalInquiries },
    { count: totalBookings },
    { count: publishedTestimonials },
    { count: publishedMedia },
    { data: recentInquiries },
    { data: recentBookings },
  ] = await Promise.all([
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }).eq("is_published", true).eq("status", "active"),
    supabase.from("contact_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("trial_bookings").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("media_assets").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false }).limit(4),
    supabase.from("trial_bookings").select("*").order("created_at", { ascending: false }).limit(4),
  ]);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner & System Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CMS Admin Operational</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Yolfin Group CMS Dashboard
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Welcome back, <span className="text-emerald-400 font-mono font-medium">{user?.email}</span>. Manage website content, services, inquiries, and media.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors inline-flex items-center gap-1.5"
            >
              <span>View Public Website</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Services</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{totalServices || 0}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Active Services</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">{activeServices || 0}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Inquiries</span>
            <Mail className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{totalInquiries || 0}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Trial Bookings</span>
            <Calendar className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">{totalBookings || 0}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Testimonials</span>
            <MessageSquareQuote className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{publishedTestimonials || 0}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Published Media</span>
            <ImageIcon className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">{publishedMedia || 0}</p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">Quick CMS Management Shortcuts</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <Link
            href="/admin/services"
            className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-center space-y-1 transition-colors group"
          >
            <Layers className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 mx-auto transition-colors" />
            <p className="text-xs font-bold text-slate-200 truncate">Services</p>
          </Link>

          <Link
            href="/admin/content"
            className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-center space-y-1 transition-colors group"
          >
            <CheckCircle2 className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 mx-auto transition-colors" />
            <p className="text-xs font-bold text-slate-200 truncate">Content</p>
          </Link>

          <Link
            href="/admin/inquiries"
            className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-center space-y-1 transition-colors group"
          >
            <Mail className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 mx-auto transition-colors" />
            <p className="text-xs font-bold text-slate-200 truncate">Inquiries</p>
          </Link>

          <Link
            href="/admin/trial-bookings"
            className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-center space-y-1 transition-colors group"
          >
            <Calendar className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 mx-auto transition-colors" />
            <p className="text-xs font-bold text-slate-200 truncate">Bookings</p>
          </Link>

          <Link
            href="/admin/media"
            className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-center space-y-1 transition-colors group"
          >
            <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 mx-auto transition-colors" />
            <p className="text-xs font-bold text-slate-200 truncate">Media</p>
          </Link>

          <Link
            href="/admin/seo"
            className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-center space-y-1 transition-colors group"
          >
            <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 mx-auto transition-colors" />
            <p className="text-xs font-bold text-slate-200 truncate">SEO</p>
          </Link>

          <Link
            href="/admin/settings"
            className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-center space-y-1 transition-colors group"
          >
            <Zap className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 mx-auto transition-colors" />
            <p className="text-xs font-bold text-slate-200 truncate">Settings</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest Contact Inquiries */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Recent Contact Inquiries</span>
            </h2>
            <Link href="/admin/inquiries" className="text-xs font-bold text-emerald-400 hover:underline">
              View All
            </Link>
          </div>

          {!recentInquiries || recentInquiries.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4">No contact inquiries received yet.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div className="space-y-0.5 overflow-hidden">
                    <p className="font-bold text-white truncate">{inquiry.full_name}</p>
                    <p className="text-slate-400 text-[11px] truncate">{inquiry.subject || inquiry.email}</p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded uppercase shrink-0">
                    {inquiry.status || "new"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Latest Trial Bookings */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Recent Trial Bookings</span>
            </h2>
            <Link href="/admin/trial-bookings" className="text-xs font-bold text-emerald-400 hover:underline">
              View All
            </Link>
          </div>

          {!recentBookings || recentBookings.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4">No trial bookings received yet.</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div className="space-y-0.5 overflow-hidden">
                    <p className="font-bold text-white truncate">{booking.full_name}</p>
                    <p className="text-slate-400 text-[11px] truncate">{booking.company_name || booking.email}</p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold rounded uppercase shrink-0">
                    {booking.tax_classification ? booking.tax_classification.replace("_", " ").toUpperCase() : "GST"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
