import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Plane,
  Building,
  CheckCircle2,
  Sparkles,
  FileCheck,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { getPublishedServices, getActiveServiceItems, getPublishedSeoMetadata } from "@/lib/supabase/queries";
import { SITE_CONFIG } from "@/lib/constants";
import type { SEOMetadataRow } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = (await getPublishedSeoMetadata("/services")) as SEOMetadataRow | null;

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      openGraph: {
        title: seoData.og_title || seoData.title,
        description: seoData.og_description || seoData.description,
        url: `${SITE_CONFIG.url}/services`,
      },
    };
  }

  return {
    title: "Services | Yolfin Group",
    description:
      "Explore Yolfin Group's integrated corporate support services including Accounting, Bookkeeping, GST & VAT compliance, Travel Management, and Facility Management across India and UAE.",
  };
}

export default async function ServicesPage() {
  const [services, serviceItems] = await Promise.all([
    getPublishedServices(),
    getActiveServiceItems(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Yolfin Group Business Services",
    "url": `${SITE_CONFIG.url}/services`,
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": service.name,
      "description": service.short_description,
      "url": `${SITE_CONFIG.url}/services/${service.slug}`,
    })),
  };

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case "accounting-finance":
        return <Calculator className="w-6 h-6 text-brand-green" />;
      case "travel-management":
        return <Plane className="w-6 h-6 text-slate-400" />;
      case "facility-management":
        return <Building className="w-6 h-6 text-slate-400" />;
      default:
        return <Calculator className="w-6 h-6 text-brand-green" />;
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col min-h-screen">
        {/* 1. Hero Section */}
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-light-green/20 pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-100">
          <Container>
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-green" />
                <span>OUR SERVICES</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
                Solutions That{" "}
                <span className="text-brand-green underline decoration-emerald-400/40 decoration-wavy">
                  Drive Your Business
                </span>
              </h1>

              <p className="text-slate-muted text-base sm:text-lg leading-relaxed">
                Practical, reliable and affordable solutions to manage your business financials, compliance, travel, and operations across India and the UAE.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  openBookingModal
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book 1 Month Free
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. Service Category Tabs Bar */}
        <section className="bg-white py-6 border-b border-slate-100">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-navy text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-xs font-bold">Accounting & Finance</p>
                    <p className="text-[10px] text-emerald-400 uppercase font-semibold">Active Service</p>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plane className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs font-bold text-slate-700">Travel Management</p>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Coming Soon</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs font-bold text-slate-700">Facility Management</p>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. Primary Services Listing */}
        <section className="py-14 sm:py-16 md:py-20 bg-slate-50 border-b border-slate-100">
          <Container className="space-y-10">
            <SectionHeading
              eyebrow="SERVICE PORTFOLIO"
              title="Integrated Business Support"
              subtitle="Select an active service to explore detailed features, compliance coverage, and deliverables."
            />

            {/* Dynamic Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => {
                const isActive = service.is_published && service.status !== "draft";
                return (
                  <div
                    key={service.id}
                    className={`bg-white rounded-3xl p-6 sm:p-8 border flex flex-col justify-between space-y-6 shadow-md transition-all ${
                      isActive
                        ? "border-slate-200 hover:border-emerald-300 hover:shadow-xl"
                        : "border-slate-200/60 opacity-80"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-light-green flex items-center justify-center">
                          {getServiceIcon(service.slug)}
                        </div>
                        {isActive ? (
                          <span className="px-3 py-1 bg-emerald-900 text-emerald-300 text-[10px] font-bold rounded-full uppercase">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded-full uppercase">
                            Coming Soon
                          </span>
                        )}
                      </div>

                      <div>
                        <h2 className="text-xl font-extrabold text-navy">{service.name}</h2>
                        <p className="text-xs text-slate-muted leading-relaxed mt-2">
                          {service.short_description}
                        </p>
                      </div>

                      {/* Related Service Items List */}
                      {serviceItems.length > 0 && service.slug === "accounting-finance" && (
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                            Key Service Offerings
                          </p>
                          <div className="space-y-1.5 text-xs text-slate-700">
                            {serviceItems.slice(0, 4).map((item) => (
                              <div key={item.id} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
                                <span>{item.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-slate-100">
                      {isActive ? (
                        <Link
                          href={`/services/${service.slug}`}
                          className="w-full py-3 bg-navy hover:bg-navy-dark text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 group"
                        >
                          <span>Explore {service.name}</span>
                          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="w-full py-3 bg-slate-100 text-slate-400 font-semibold text-xs rounded-xl cursor-not-allowed text-center"
                        >
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* 4. Simple 5-Step Process Timeline */}
        <section className="py-14 sm:py-16 md:py-20 bg-white border-b border-slate-100">
          <Container className="space-y-12">
            <SectionHeading
              eyebrow="HOW IT WORKS"
              title="Our Simple 5-Step Process"
              subtitle="From onboarding to continuous monthly reporting, working with Yolfin is straightforward and stress-free."
              className="text-center"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center mx-auto">
                  1
                </div>
                <h3 className="text-xs font-bold text-navy">Share Your Details</h3>
                <p className="text-[11px] text-slate-500">Fill the free trial form and tell us about your business.</p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center mx-auto">
                  2
                </div>
                <h3 className="text-xs font-bold text-navy">Share Documents</h3>
                <p className="text-[11px] text-slate-500">Upload required financial files securely.</p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center mx-auto">
                  3
                </div>
                <h3 className="text-xs font-bold text-navy">We Process</h3>
                <p className="text-[11px] text-slate-500">Our experts reconcile data and ensure compliance.</p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center mx-auto">
                  4
                </div>
                <h3 className="text-xs font-bold text-navy">You Get Reports</h3>
                <p className="text-[11px] text-slate-500">Receive accurate financial statements & tax filings.</p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center mx-auto">
                  5
                </div>
                <h3 className="text-xs font-bold text-navy">We Support You</h3>
                <p className="text-[11px] text-slate-500">Continuous advice and WhatsApp/phone assistance.</p>
              </div>
            </div>
          </Container>
        </section>

        {/* 5. Benefits Checklist Bar */}
        <section className="py-12 bg-slate-900 text-white">
          <Container className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold">100% Tax & Legal Compliance</p>
                <p className="text-[11px] text-slate-400">Indian GST & UAE VAT regulatory standards</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold">Encrypted & Confidential</p>
                <p className="text-[11px] text-slate-400">Strict non-disclosure data protection</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold">On-Time Monthly Reports</p>
                <p className="text-[11px] text-slate-400">Prompt financial delivery every month</p>
              </div>
            </div>
          </Container>
        </section>

        {/* 6. Final Conversion CTA */}
        <section className="py-14 sm:py-16 md:py-20 bg-gradient-to-r from-navy via-slate-900 to-navy-dark text-white relative overflow-hidden">
          <Container className="relative z-10 text-center space-y-5 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Start Your <span className="text-emerald-400">1 Month Free Trial</span> Today!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Experience the Yolfin difference. Zero upfront cost, cancel anytime.
            </p>
            <div className="pt-2 flex justify-center">
              <Button
                openBookingModal
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Book 1 Month Free
              </Button>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
