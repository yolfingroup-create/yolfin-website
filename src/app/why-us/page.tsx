/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Gift,
  Users,
  FileBarChart,
  MessageSquare,
  Handshake,
  CheckCircle2,
  XCircle,
  Star,
  Globe,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import {
  getWhyYolfinItems,
  getComparisonItems,
  getPublishedTestimonials,
  getPublishedSeoMetadata,
  getImagePlacements,
} from "@/lib/supabase/queries";
import { SITE_CONFIG } from "@/lib/constants";
import type { SEOMetadataRow } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = (await getPublishedSeoMetadata("/why-us")) as SEOMetadataRow | null;

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      openGraph: {
        title: seoData.og_title || seoData.title,
        description: seoData.og_description || seoData.description,
        url: `${SITE_CONFIG.url}/why-us`,
      },
    };
  }

  return {
    title: "Why Choose Us",
    description:
      "Discover why companies choose Yolfin Group for accounting, finance, travel, and facility management across India and UAE. Built on trust, accuracy, and dedicated support.",
  };
}

export default async function WhyUsPage() {
  const [whyItems, comparisonItems, testimonials, imagePlacements] = await Promise.all([
    getWhyYolfinItems(),
    getComparisonItems(),
    getPublishedTestimonials(),
    getImagePlacements(),
  ]);

  const whyUsHeroImage = imagePlacements.whyUsHeroImage;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Why Choose Yolfin Group",
    "url": `${SITE_CONFIG.url}/why-us`,
    "description": "Six strong reasons why businesses choose and trust Yolfin Group.",
  };

  const getIcon = (iconName: string | null) => {
    switch (iconName) {
      case "Gift":
        return <Gift className="w-6 h-6 text-brand-green" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-brand-green" />;
      case "Users":
        return <Users className="w-6 h-6 text-brand-green" />;
      case "FileBarChart":
        return <FileBarChart className="w-6 h-6 text-brand-green" />;
      case "MessageSquare":
        return <MessageSquare className="w-6 h-6 text-brand-green" />;
      case "Handshake":
        return <Handshake className="w-6 h-6 text-brand-green" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-brand-green" />;
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col min-h-screen">
        {/* 1. Hero Section — with dynamic Why Us Hero image on right */}
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-light-green/20 pt-8 pb-10 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-100">
          {/* Desktop Integrated Background Image (hidden on mobile/tablet) */}
          {whyUsHeroImage && (
            <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full z-0 select-none pointer-events-none overflow-hidden">
              <img
                src={whyUsHeroImage.secure_url}
                alt={whyUsHeroImage.alt_text || "Why Us Yolfin Group Background"}
                className="w-full h-full object-cover object-left hero-mask-image"
              />
            </div>
          )}

          <Container className="relative z-10">
            {/* DESKTOP LAYOUT (lg and above) */}
            <div className="hidden lg:grid grid-cols-2 gap-14 lg:items-stretch items-center">
              {/* Left — Text Content */}
              <div className="space-y-6 flex flex-col justify-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>WHY CHOOSE YOLFIN GROUP</span>
                  </div>
                </div>

                <h1 className="text-5xl font-extrabold text-navy tracking-tight leading-tight">
                  Your Success Is{" "}
                  <span className="text-brand-green underline decoration-emerald-400/40 decoration-wavy">
                    Our Priority
                  </span>
                </h1>

                <p className="text-slate-muted text-lg leading-relaxed">
                  We don&apos;t just handle your numbers; we take care of your business growth with trust, accuracy, and dedicated responsibility across India and the UAE.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Button
                    openBookingModal
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book 1 Month Free
                  </Button>
                  <Button href="/services" variant="outline" size="lg">
                    Explore Services
                  </Button>
                </div>
              </div>

              {/* Right Column: Empty spacer on desktop to show background image */}
              <div className="hidden lg:block w-full min-h-[350px]" aria-hidden="true" />
            </div>

            {/* MOBILE & TABLET REDESIGNED LAYOUT (lg:hidden) */}
            <div className="block lg:hidden space-y-5">
              {/* Part 1: TEXT */}
              <div className="space-y-3 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-brand-green shrink-0" />
                  <span>WHY CHOOSE YOLFIN GROUP</span>
                </div>

                <h1 className="text-[23px] sm:text-3xl font-extrabold text-navy tracking-tight leading-[1.2]">
                  Your Success Is{" "}
                  <span className="text-brand-green underline decoration-emerald-400/40 decoration-wavy">
                    Our Priority
                  </span>
                </h1>

                <p className="text-slate-muted text-xs sm:text-sm leading-relaxed max-w-sm">
                  We don&apos;t just handle your numbers; we take care of your business growth with trust, accuracy, and dedicated responsibility across India and the UAE.
                </p>
              </div>

              {/* Part 2: VISUAL */}
              {whyUsHeroImage ? (
                <div className="w-full relative py-1 select-none mt-1">
                  <div className="w-full h-40 sm:h-52 relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                    <img
                      src={whyUsHeroImage.secure_url}
                      alt={whyUsHeroImage.alt_text || "Why Choose Yolfin Group"}
                      className="w-full h-full object-cover object-center hero-mask-image"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Handshake className="w-8 h-8 text-brand-green shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-navy">Yolfin Group Business Support</p>
                    <p className="text-[10px] text-slate-500">Accounting, Travel & Facility Services</p>
                  </div>
                </div>
              )}

              {/* Part 3: CTA BUTTONS WITH CLEAR HIERARCHY */}
              <div className="flex flex-col items-center gap-2 pt-2">
                <Button
                  openBookingModal
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="text-sm py-3.5 shadow-sm active:scale-[0.98]"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book 1 Month Free
                </Button>
                <a
                  href="/services"
                  className="text-xs font-bold text-slate-500 hover:text-brand-green py-2 transition-colors inline-block active:scale-[0.97]"
                >
                  Explore Services →
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. Full Database Benefit Grid */}
        <section className="py-14 sm:py-16 md:py-20 bg-white border-b border-slate-100">
          <Container className="space-y-12">
            <SectionHeading
              eyebrow="STRONG REASONS"
              title="Six Strong Reasons Why"
              highlightText="Businesses Choose Us"
              subtitle="Everything we do is designed to give you clarity, compliance, and complete peace of mind."
              className="text-center"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {whyItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-emerald-300 transition-colors shadow-xs"
                >
                  <div className="w-12 h-12 rounded-2xl bg-light-green flex items-center justify-center">
                    {getIcon(item.icon_name)}
                  </div>
                  <h3 className="text-lg font-extrabold text-navy">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 3. Yolfin vs Traditional Comparison Table */}
        {comparisonItems.length > 0 && (
          <section className="py-14 sm:py-16 md:py-20 bg-slate-50 border-b border-slate-100">
            <Container className="space-y-10 max-w-4xl mx-auto">
              <SectionHeading
                eyebrow="COMPARISON"
                title="Yolfin vs Traditional"
                highlightText="Approach"
                subtitle="Smarter, simpler, and stress-free financial management."
                className="text-center"
              />

              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  {/* Traditional Way */}
                  <div className="p-6 sm:p-8 bg-slate-50/50 space-y-4">
                    <div className="text-center pb-3 border-b border-slate-200">
                      <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full uppercase">
                        Traditional Way
                      </span>
                    </div>
                    <div className="space-y-3">
                      {comparisonItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 text-xs text-slate-600">
                          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{item.traditional_value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* With Yolfin Group */}
                  <div className="p-6 sm:p-8 bg-emerald-950/5 space-y-4">
                    <div className="text-center pb-3 border-b border-emerald-200">
                      <span className="px-3 py-1 bg-navy text-white text-xs font-bold rounded-full uppercase">
                        With Yolfin Group
                      </span>
                    </div>
                    <div className="space-y-3">
                      {comparisonItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 text-xs font-semibold text-navy">
                          <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                          <span>{item.yolfin_value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* 4. Client Testimonials */}
        {testimonials.length > 0 && (
          <section className="py-14 sm:py-16 md:py-20 bg-white border-b border-slate-100">
            <Container className="space-y-10">
              <SectionHeading
                eyebrow="CLIENT TESTIMONIALS"
                title="What Our"
                highlightText="Clients Say"
                subtitle="Real feedback from business owners who rely on Yolfin Group."
                className="text-center"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                      &quot;{t.quote}&quot;
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-xs">
                      <p className="font-bold text-navy">{t.client_name}</p>
                      <p className="text-slate-500">{t.designation || "Business Owner"} • {t.company_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* 5. Regional Presence */}
        <section className="py-12 bg-slate-900 text-white">
          <Container className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-bold">Serving India & UAE Markets</h3>
                <p className="text-xs text-slate-300">
                  Headquartered in Malappuram, Kerala, India with active support for UAE corporate requirements.
                </p>
              </div>
            </div>

            <Button href="/contact" variant="primary" size="md">
              Contact Regional Office
            </Button>
          </Container>
        </section>

        {/* 6. Final Conversion CTA */}
        <section className="py-14 sm:py-16 md:py-20 bg-navy text-white text-center">
          <Container className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Experience the <span className="text-emerald-400">Yolfin Difference</span> Today!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Start your 1 Month Free Trial and see how simple business management can be.
            </p>
            <div className="pt-2 flex justify-center">
              <Button openBookingModal variant="primary" size="lg">
                Book 1 Month Free
              </Button>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
