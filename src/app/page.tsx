import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center px-4 py-16 text-center bg-soft-bg min-h-screen">
      <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-border-light space-y-6">
        <div className="inline-block px-3 py-1 bg-light-green text-brand-green font-medium text-xs rounded-full uppercase tracking-wider">
          Foundational Architecture Ready
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          {SITE_CONFIG.name}
        </h1>

        <p className="text-brand-green font-semibold text-lg sm:text-xl">
          "{SITE_CONFIG.tagline}"
        </p>

        <p className="text-slate-muted text-sm sm:text-base leading-relaxed">
          {SITE_CONFIG.subTagline}
        </p>

        <div className="pt-4 border-t border-border-light text-left text-xs sm:text-sm text-slate-muted space-y-2">
          <p><strong className="text-navy">Core Business:</strong> Accounting & Finance, Travel Management, Facility Management</p>
          <p><strong className="text-navy">Target Markets:</strong> India & UAE</p>
          <p><strong className="text-navy">Contact:</strong> {SITE_CONFIG.contact.email} | {SITE_CONFIG.contact.phoneIndiaDisplay} (India) | {SITE_CONFIG.contact.phoneUAEDisplay} (UAE)</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <span className="inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-brand-green text-white font-medium text-sm shadow-xs">
            Phase 1 Infrastructure Active
          </span>
        </div>
      </div>
    </main>
  );
}
