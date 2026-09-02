import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ChevronRight, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Yolfin Group. Understand how we collect, handle, and safeguard customer contact and business inquiry information.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | Yolfin Group",
    description:
      "Privacy Policy for Yolfin Group. Understand how we collect, handle, and safeguard customer contact and business inquiry information.",
    url: `${SITE_CONFIG.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
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
            <span className="text-brand-green font-bold">Privacy Policy</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Information & Data Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
            Privacy Policy
          </h1>

          <p className="text-slate-muted text-sm sm:text-base leading-relaxed">
            Last updated: September 2026. This policy describes how Yolfin Group manages information submitted through our website and business inquiry channels.
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
                Notice & Operational Framework
              </p>
              <p className="text-amber-800/90 leading-relaxed">
                This document sets out the operational data handling framework for Yolfin Group based on current website functions. It is maintained for client transparency and is subject to periodic review by business management.
              </p>
            </div>

            {/* Section 1: Information We Collect */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                1. Information We Collect
              </h2>
              <p>
                When you visit our website, submit a general inquiry, or register for our 1-Month Free Trial, we may collect personal and business information that you voluntarily provide to us. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Contact details:</strong> Full name, telephone number, WhatsApp number, and email address.</li>
                <li><strong>Business information:</strong> Company or trade name, industry, and country of operation (India or UAE).</li>
                <li><strong>Service preferences:</strong> Selected services of interest (e.g., Accounting & Finance) and tax classification (such as Indian GST or UAE VAT).</li>
                <li><strong>Inquiry messages:</strong> Any specific requirements or questions submitted in form messages.</li>
              </ul>
            </div>

            {/* Section 2: How We Use Your Information */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                2. How We Use Your Information
              </h2>
              <p>
                The information collected is used solely for legitimate business purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Responding directly to inquiries and answering questions regarding our services.</li>
                <li>Onboarding eligible businesses into our 1-Month Free Trial program.</li>
                <li>Communicating via phone, WhatsApp, or email regarding accounting, compliance, and support workflows.</li>
                <li>Internal record keeping and client service administration.</li>
              </ul>
            </div>

            {/* Section 3: Confidentiality & Protection */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                3. Confidentiality & Data Protection
              </h2>
              <p>
                We treat all client records and financial inquiries with strict confidentiality. We implement appropriate organizational and technical measures designed to protect information from unauthorized access, loss, or misuse.
              </p>
              <p>
                We do not sell, rent, or trade your personal or business contact information to third-party marketing companies.
              </p>
            </div>

            {/* Section 4: External Links & Communications */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                4. Third-Party Services & Communications
              </h2>
              <p>
                If you choose to contact us via third-party communication channels such as WhatsApp, your use of those platforms is governed by their respective privacy terms. We recommend reviewing their privacy policies when utilizing external messaging applications.
              </p>
            </div>

            {/* Section 5: Contact & Inquiries */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-navy">
                5. Contacting Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or wish to review, update, or remove the contact details you provided to us, please reach out to our team:
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
                    <span>Office Address</span>
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
