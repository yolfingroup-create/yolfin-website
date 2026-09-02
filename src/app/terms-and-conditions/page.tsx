import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ChevronRight, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions governing the use of Yolfin Group website, business inquiry channels, and 1-Month Free Trial services.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms-and-conditions`,
  },
  openGraph: {
    title: "Terms & Conditions | Yolfin Group",
    description:
      "Terms and Conditions governing the use of Yolfin Group website, business inquiry channels, and 1-Month Free Trial services.",
    url: `${SITE_CONFIG.url}/terms-and-conditions`,
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-light-green/20 pt-8 pb-10 sm:pt-14 sm:pb-16 border-b border-slate-100">
        <Container className="max-w-4xl space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-green flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-brand-green font-bold">Terms & Conditions</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-xs uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Service & Usage Terms</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
            Terms & Conditions
          </h1>

          <p className="text-slate-muted text-sm sm:text-base leading-relaxed">
            Last updated: September 2026. These terms govern your use of the Yolfin Group website, inquiry channels, and initial service engagements.
          </p>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-14">
        <Container className="max-w-4xl">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/90 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">

            {/* Advisory Notice */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-1">
              <p className="font-bold uppercase tracking-wider text-[11px] text-amber-800">
                Notice & Terms Framework
              </p>
              <p className="text-amber-800/90 leading-relaxed">
                This document outlines the standard operational terms for website interactions and service trial requests. Specific commercial service agreements will be formalized independently upon service engagement.
              </p>
            </div>

            {/* Section 1: Services Overview */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                1. Scope of Services
              </h2>
              <p>
                Yolfin Group provides professional business support solutions across India and the UAE. Currently:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Accounting & Finance:</strong> Active service covering bookkeeping, GST/VAT compliance support, payroll, bank reconciliation, and periodic financial statements.</li>
                <li><strong>Travel Management & Facility Management:</strong> Services in active preparation (Coming Soon). Inquiries submitted for these categories are recorded for future notification and consultation.</li>
              </ul>
            </div>

            {/* Section 2: 1-Month Free Trial Terms */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                2. 1-Month Free Trial Offer
              </h2>
              <p>
                Yolfin Group offers a 1-Month Free Trial for eligible business clients to evaluate our Accounting & Finance support capabilities.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>The free trial is provided without upfront payment or credit card requirement.</li>
                <li>There is no automatic subscription or mandatory lock-in period at the conclusion of the trial.</li>
                <li>Continuing services after the trial period requires mutual written agreement on scope and commercial terms.</li>
                <li>Eligibility for the free trial is reviewed by Yolfin Group based on operational capacity and submitted business criteria.</li>
              </ul>
            </div>

            {/* Section 3: Client Responsibilities */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                3. Information Accuracy & Client Responsibilities
              </h2>
              <p>
                When submitting inquiry forms, requesting trials, or engaging in services, clients agree to provide accurate, complete, and up-to-date business records and contact information. Timely provision of required invoices, bank statements, and tax identification details is necessary for accurate bookkeeping and compliance assistance.
              </p>
            </div>

            {/* Section 4: Confidentiality */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                4. Confidentiality Commitment
              </h2>
              <p>
                Both parties agree that financial documents, tax records, and operational information shared during inquiries or service delivery shall be treated with strict professional confidentiality and used solely for the agreed service scope.
              </p>
            </div>

            {/* Section 5: Contact & Inquiries */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                5. Contact Information
              </h2>
              <p>
                For questions regarding these terms, please contact our team:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="font-bold text-navy flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Email Inquiries</span>
                  </p>
                  <p className="text-slate-600 pl-6">{SITE_CONFIG.contact.email}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="font-bold text-navy flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Telephone & WhatsApp</span>
                  </p>
                  <p className="text-slate-600 pl-6">{SITE_CONFIG.contact.phoneIndiaDisplay} (India)</p>
                  <p className="text-slate-600 pl-6">{SITE_CONFIG.contact.phoneUAEDisplay} (UAE)</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 sm:col-span-2">
                  <p className="font-bold text-navy flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Headquarters</span>
                  </p>
                  <p className="text-slate-600 pl-6">{SITE_CONFIG.contact.address.formatted}</p>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
