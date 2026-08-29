import {
  getPublishedServices,
  getWhyYolfinItems,
  getComparisonItems,
  getPublicSiteSettings,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TestDbPage() {
  // Public data queries using data access layer
  const services = await getPublishedServices();
  const whyItems = await getWhyYolfinItems();
  const comparisonItems = await getComparisonItems();
  const settings = await getPublicSiteSettings();

  // Attempting private read as anon to test RLS boundary
  const supabase = await createClient();
  const { data: privateInquiries, error: rlsError } = await supabase
    .from("contact_inquiries")
    .select("id");

  const rlsProtectionWorking =
    rlsError !== null || !privateInquiries || privateInquiries.length === 0;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 max-w-4xl mx-auto space-y-8 font-sans">
      <div className="space-y-2 border-b border-slate-800 pb-4">
        <span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-800">
          Phase 3 Verification
        </span>
        <h1 className="text-2xl font-bold text-white">
          Supabase Connection & RLS Verification
        </h1>
        <p className="text-slate-400 text-sm">
          Development-time check validating Next.js App Router connection to Supabase database.
        </p>
      </div>

      {/* Connection Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl space-y-1">
          <p className="text-xs uppercase text-slate-400 font-semibold">
            Public Database Query
          </p>
          <p className="text-lg font-bold text-emerald-400">
            {services.length > 0 ? "SUCCESS" : "EMPTY / FAILURE"}
          </p>
          <p className="text-xs text-slate-400">
            Retrieved {services.length} seeded service records from Supabase.
          </p>
        </div>

        <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl space-y-1">
          <p className="text-xs uppercase text-slate-400 font-semibold">
            RLS Boundary Enforcement
          </p>
          <p className="text-lg font-bold text-emerald-400">
            {rlsProtectionWorking ? "PROTECTED (PASS)" : "EXPOSED (FAIL)"}
          </p>
          <p className="text-xs text-slate-400">
            Public client cannot read private contact inquiries without admin session.
          </p>
        </div>
      </div>

      {/* Query Detail Inspection */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Seeded Public Data Verification
        </h2>

        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3 text-xs">
          <div>
            <span className="text-emerald-400 font-bold">Services ({services.length}):</span>{" "}
            <span className="text-slate-300">
              {services.map((s) => `${s.name} (${s.slug})`).join(", ")}
            </span>
          </div>

          <div>
            <span className="text-emerald-400 font-bold">Why Yolfin Items ({whyItems.length}):</span>{" "}
            <span className="text-slate-300">
              {whyItems.map((w) => w.title).join(", ")}
            </span>
          </div>

          <div>
            <span className="text-emerald-400 font-bold">Comparison Grid Items ({comparisonItems.length}):</span>{" "}
            <span className="text-slate-300">
              {comparisonItems.map((c) => c.feature_label).join(", ")}
            </span>
          </div>

          <div>
            <span className="text-emerald-400 font-bold">Public Settings ({settings.length}):</span>{" "}
            <span className="text-slate-300">
              {settings.map((st) => st.setting_key).join(", ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
