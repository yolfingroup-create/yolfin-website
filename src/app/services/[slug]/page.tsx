import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  FileText,
  Calculator,
  Building2,
  Sparkles,
  Clock,
  Bell,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getPublishedServiceBySlug, getActiveServiceItems } from "@/lib/supabase/queries";
import { SITE_CONFIG } from "@/lib/constants";

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Yolfin Group",
    };
  }

  return {
    title: service.name,
    description: service.short_description,
    openGraph: {
      title: service.name,
      description: service.short_description,
      url: `${SITE_CONFIG.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceItems = await getActiveServiceItems(service.id);
  const isActive = service.status === "active";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.short_description,
    "provider": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
    },
    "areaServed": ["IN", "AE"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.name} Offerings`,
      "itemListElement": serviceItems.map((item) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item.title,
          "description": item.description,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col min-h-screen">
        {/* 1. Hero Header */}
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-light-green/20 pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden border-b border-slate-100">
          <Container className="space-y-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-green">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/services" className="hover:text-brand-green">
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-brand-green font-bold truncate">{service.name}</span>
            </nav>

            <div className="max-w-3xl space-y-4">
              {isActive ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Active Service</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Coming Soon</span>
                </div>
              )}

              <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
                {service.name}
              </h1>

              <p className="text-slate-muted text-base sm:text-lg leading-relaxed">
                {service.short_description}
              </p>

              {isActive ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Button
                    openBookingModal
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book 1 Month Free
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Inquire Now
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Button href="/contact" variant="primary" size="lg" icon={<Bell className="w-4 h-4" />}>
                    Notify Me When Available
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* 2. Main Content & Sidebar Layout */}
        <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-slate-100">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Left Column: Service Details & Offerings */}
              <div className="lg:col-span-8 space-y-10">
                {/* Detailed Description */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-extrabold text-navy tracking-tight">
                    Comprehensive {service.name} Solutions
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {service.detailed_description || service.short_description}
                  </p>
                </div>

                {/* Service Offerings Grid */}
                {serviceItems.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="text-xl font-bold text-navy">Included Service Features</h3>
                      <span className="text-xs font-bold text-brand-green bg-light-green px-3 py-1 rounded-full">
                        {serviceItems.length} Features
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {serviceItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-emerald-300 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-navy">{item.title}</h4>
                            <ChevronRight className="w-4 h-4 text-brand-green shrink-0" />
                          </div>
                          <p className="text-xs text-slate-muted leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Value Proposition Box */}
                <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-green/20 border border-emerald-500/30 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold">Strict Compliance & Confidentiality</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    We maintain strict non-disclosure agreements and adhere to Indian GST & UAE VAT regulatory standards with careful attention to accuracy.
                  </p>
                </div>
              </div>

              {/* Right Column: Checklists & Trial CTA Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                {/* What We Need From You */}
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-extrabold text-navy uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-green" />
                    <span>What We Need From You</span>
                  </h3>
                  <div className="space-y-2 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                      <span>Business Registration Proof</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                      <span>PAN / TAN / VAT / GST Certificate</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                      <span>Bank Statements & Invoices</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                      <span>Previous Financial Records</span>
                    </div>
                  </div>
                </div>

                {/* What You Get */}
                <div className="p-6 bg-emerald-950 text-emerald-100 rounded-3xl border border-emerald-800 space-y-4">
                  <h3 className="text-sm font-extrabold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    <span>What You Get</span>
                  </h3>
                  <div className="space-y-2 text-xs font-medium text-emerald-200">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Accurate Monthly Reports</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Statutory Compliance & Filings</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Dedicated Account Specialist</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>WhatsApp & Phone Support</span>
                    </div>
                  </div>
                </div>

                {/* Free Trial Modal Sidebar CTA */}
                <div className="p-6 bg-navy text-white rounded-3xl space-y-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-brand-green/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold">Try 1 Month Free!</h3>
                  <p className="text-xs text-slate-300">
                    Test our {service.name} support with zero commitment.
                  </p>
                  <Button
                    openBookingModal
                    variant="primary"
                    size="md"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book My Free Month
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

      </div>
    </>
  );
}
