import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const adminUser = await requireAdmin();
  const supabase = await createClient();

  // Test authenticated RLS database access for Admin
  const [
    { count: servicesCount, error: servicesErr },
    { count: inquiriesCount, error: inquiriesErr },
    { count: bookingsCount, error: bookingsErr },
  ] = await Promise.all([
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("contact_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("trial_bookings").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Session Verified & RLS Protection Active
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Welcome to Yolfin Group Admin Control Center
        </h1>
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
          Authenticated identity:{" "}
          <code className="text-emerald-300 font-mono font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            {adminUser.email}
          </code>
          . Database queries are executing using standard authenticated Supabase RLS session.
        </p>
      </div>

      {/* RLS Query Verification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
          <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
            Total Services
          </p>
          <p className="text-3xl font-bold text-white">
            {servicesErr ? "Error" : (servicesCount ?? 0)}
          </p>
          <p className="text-xs text-slate-500">
            RLS Select Policy: Admin full access
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
          <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
            Contact Inquiries
          </p>
          <p className="text-3xl font-bold text-white">
            {inquiriesErr ? "Error" : (inquiriesCount ?? 0)}
          </p>
          <p className="text-xs text-slate-500">
            RLS Select Policy: Single-Admin Protected
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
          <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
            Trial Bookings
          </p>
          <p className="text-3xl font-bold text-white">
            {bookingsErr ? "Error" : (bookingsCount ?? 0)}
          </p>
          <p className="text-xs text-slate-500">
            RLS Select Policy: Single-Admin Protected
          </p>
        </div>
      </div>

      {/* Placeholder CMS Modules Roadmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">
          CMS Module Foundations (Phase 3 Complete)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs text-slate-400 font-medium">
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
            /admin/services
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
            /admin/service-items
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
            /admin/testimonials
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
            /admin/inquiries
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
            /admin/trial-bookings
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
            /admin/content
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
            /admin/seo
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
            /admin/settings
          </div>
        </div>
      </div>
    </div>
  );
}
