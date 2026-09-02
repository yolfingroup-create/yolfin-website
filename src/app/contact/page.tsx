import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact/contact-form";
import { getPublishedSeoMetadata } from "@/lib/supabase/queries";
import { SITE_CONFIG } from "@/lib/constants";
import type { SEOMetadataRow } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = (await getPublishedSeoMetadata("/contact")) as SEOMetadataRow | null;

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      openGraph: {
        title: seoData.og_title || seoData.title,
        description: seoData.og_description || seoData.description,
        url: `${SITE_CONFIG.url}/contact`,
      },
    };
  }

  return {
    title: "Contact Us",
    description:
      "Get in touch with Yolfin Group for accounting, finance, travel, and facility management support across India and UAE. Email: yolfingroup@gmail.com",
  };
}

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Yolfin Group",
    "url": `${SITE_CONFIG.url}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "email": SITE_CONFIG.contact.email,
      "telephone": SITE_CONFIG.contact.phoneIndia,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SITE_CONFIG.contact.address.street,
        "addressLocality": SITE_CONFIG.contact.address.city,
        "addressRegion": SITE_CONFIG.contact.address.state,
        "postalCode": SITE_CONFIG.contact.address.postalCode,
        "addressCountry": "IN",
      },
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
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-light-green/20 pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-100">
          <Container>
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GET IN TOUCH</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
                Let&apos;s Talk About Your{" "}
                <span className="text-brand-green underline decoration-emerald-400/40 decoration-wavy">
                  Business Needs
                </span>
              </h1>

              <p className="text-slate-muted text-base sm:text-lg leading-relaxed">
                Have questions about our accounting, travel, or facility management services? Contact our team in India or the UAE today.
              </p>
            </div>
          </Container>
        </section>

        {/* 2. Main Contact Form & Details Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50 border-b border-slate-100">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Direct Contact Info Cards */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-navy tracking-tight">
                    Corporate Contact Info
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Reach out directly via email, phone, or WhatsApp.
                  </p>
                </div>

                {/* Email Box */}
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="p-5 bg-white rounded-2xl border border-slate-200 flex items-start gap-4 hover:border-emerald-300 transition-colors shadow-xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-green" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold uppercase text-slate-400">Email Address</p>
                    <p className="text-sm font-bold text-navy group-hover:text-brand-green truncate transition-colors">
                      {SITE_CONFIG.contact.email}
                    </p>
                    <p className="text-[11px] text-slate-500">Fast response within 24 hours</p>
                  </div>
                </a>

                {/* WhatsApp & India Phone */}
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-white rounded-2xl border border-slate-200 flex items-start gap-4 hover:border-emerald-300 transition-colors shadow-xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">WhatsApp & India Phone</p>
                    <p className="text-sm font-bold text-navy group-hover:text-brand-green transition-colors">
                      {SITE_CONFIG.contact.phoneIndiaDisplay}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-semibold">Click to open WhatsApp chat</p>
                  </div>
                </a>

                {/* UAE Phone */}
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneUAE}`}
                  className="p-5 bg-white rounded-2xl border border-slate-200 flex items-start gap-4 hover:border-emerald-300 transition-colors shadow-xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">UAE Direct Phone</p>
                    <p className="text-sm font-bold text-navy group-hover:text-brand-green transition-colors">
                      {SITE_CONFIG.contact.phoneUAEDisplay}
                    </p>
                    <p className="text-[11px] text-slate-500">UAE Business Hours Support</p>
                  </div>
                </a>

                {/* Registered Address */}
                <div className="p-5 bg-navy text-white rounded-2xl space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                      <h3 className="text-sm font-bold">Headquarters Address</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-8">
                    {SITE_CONFIG.contact.address.formatted}
                  </p>
                  <div className="pl-8 pt-1">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.contact.address.formatted)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
                    >
                      <span>View on Google Maps</span>
                      <span>→</span>
                    </a>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 pl-8 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mon - Sat: 9:00 AM - 6:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Inquiry Form */}
              <div className="lg:col-span-7 w-full">
                <ContactForm />
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
