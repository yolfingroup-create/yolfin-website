import type { Metadata } from "next";
import {
  ArrowRight,
  ShieldCheck,
  Target,
  Eye,
  Building2,
  Users,
  Award,
  Sparkles,
  Lock,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { getWhyYolfinItems, getPublishedSeoMetadata } from "@/lib/supabase/queries";
import { SITE_CONFIG } from "@/lib/constants";
import type { SEOMetadataRow } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = (await getPublishedSeoMetadata("/about")) as SEOMetadataRow | null;

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      openGraph: {
        title: seoData.og_title || seoData.title,
        description: seoData.og_description || seoData.description,
        url: `${SITE_CONFIG.url}/about`,
      },
    };
  }

  return {
    title: "About Us | Yolfin Group",
    description:
      "Learn about Yolfin Group's mission, vision, and core values in providing integrated accounting, finance, travel, and facility management solutions across India and UAE.",
  };
}

export default async function AboutPage() {
  const whyItems = await getWhyYolfinItems();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Yolfin Group",
    "url": `${SITE_CONFIG.url}/about`,
    "description":
      "Yolfin Group is a dedicated corporate support partner offering accounting, finance, travel, and facility management across India and UAE.",
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
    },
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
                <Sparkles className="w-3.5 h-3.5" />
                <span>ABOUT YOLFIN GROUP</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
                We Simplify Business.{" "}
                <span className="text-brand-green underline decoration-emerald-400/40 decoration-wavy">
                  You Focus on Growth.
                </span>
              </h1>

              <p className="text-slate-muted text-base sm:text-lg leading-relaxed">
                Yolfin Group is a startup company committed to providing reliable and affordable solutions in Accounting, Finance, Travel and Facility Management across India and the UAE. We combine modern technology with personal attention to help businesses work smarter and grow faster.
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
                <Button href="/contact" variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. Mission, Vision & Metrics Section */}
        <section className="py-14 sm:py-16 md:py-20 bg-white border-b border-slate-100">
          <Container className="space-y-12">
            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-4 hover:border-emerald-300 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-light-green flex items-center justify-center">
                  <Target className="w-6 h-6 text-brand-green" />
                </div>
                <h2 className="text-xl font-extrabold text-navy">Our Mission</h2>
                <p className="text-slate-muted text-sm sm:text-base leading-relaxed">
                  To deliver smart, reliable, and transparent business support solutions that empower companies to streamline financial compliance and operations with zero friction.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-4 hover:border-emerald-300 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-light-green flex items-center justify-center">
                  <Eye className="w-6 h-6 text-brand-green" />
                </div>
                <h2 className="text-xl font-extrabold text-navy">Our Vision</h2>
                <p className="text-slate-muted text-sm sm:text-base leading-relaxed">
                  To be the most trusted and accessible growth support partner for small, medium, and expanding enterprises across India, UAE, and the wider region.
                </p>
              </div>
            </div>

            {/* Corporate Metrics Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-navy text-white rounded-3xl shadow-xl">
              <div className="p-4 text-center space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100+</p>
                <p className="text-xs font-semibold text-slate-300">Satisfied Clients</p>
              </div>
              <div className="p-4 text-center space-y-1 border-l border-slate-800">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">50+</p>
                <p className="text-xs font-semibold text-slate-300">Businesses Served</p>
              </div>
              <div className="p-4 text-center space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</p>
                <p className="text-xs font-semibold text-slate-300">Data Security</p>
              </div>
              <div className="p-4 text-center space-y-1 border-t lg:border-t-0 border-l border-slate-800">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">24/7</p>
                <p className="text-xs font-semibold text-slate-300">Dedicated Support</p>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. Core Values / Why We Exist */}
        <section className="py-14 sm:py-16 md:py-20 bg-slate-50 border-b border-slate-100">
          <Container className="space-y-12">
            <SectionHeading
              eyebrow="WHY WE EXIST"
              title="Built on Trust,"
              highlightText="Driven by Commitment"
              subtitle="We understand the challenges business owners face – time, compliance, accuracy and cost. That's why we built Yolfin Group."
              className="text-center"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="text-base font-bold text-navy">Trust & Transparency</h3>
                <p className="text-xs text-slate-muted leading-relaxed">
                  We believe in clear communication, honest pricing, and complete transparency in everything we do.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center">
                  <Users className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="text-base font-bold text-navy">Client First Approach</h3>
                <p className="text-xs text-slate-muted leading-relaxed">
                  Your success is our success. We listen, understand, and deliver what truly matters to your business.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="text-base font-bold text-navy">Smart & Efficient</h3>
                <p className="text-xs text-slate-muted leading-relaxed">
                  We use modern tools and technology to deliver accurate financial results quickly and efficiently.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center">
                  <Lock className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="text-base font-bold text-navy">Secure & Confidential</h3>
                <p className="text-xs text-slate-muted leading-relaxed">
                  Your financial and operational data is 100% safe with us, adhering to strict security standards and NDAs.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="text-base font-bold text-navy">Always Here for You</h3>
                <p className="text-xs text-slate-muted leading-relaxed">
                  Our dedicated support team is always ready to assist you via WhatsApp, phone, and email whenever you need us.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center">
                  <Award className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="text-base font-bold text-navy">Quality Assurance</h3>
                <p className="text-xs text-slate-muted leading-relaxed">
                  Every accounting report, tax return, and operational workflow passes rigorous internal quality review.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. Dynamic Why Choose Yolfin Grid */}
        {whyItems.length > 0 && (
          <section className="py-14 sm:py-16 bg-white border-b border-slate-100">
            <Container className="space-y-8">
              <SectionHeading
                eyebrow="OUR ADVANTAGE"
                title="What Sets"
                highlightText="Yolfin Apart"
                subtitle="Database-backed core capabilities designed for your peace of mind."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyItems.map((item) => (
                  <div key={item.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
                    <h3 className="text-sm font-bold text-navy">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* 5. Final CTA */}
        <section className="py-14 sm:py-16 md:py-20 bg-navy text-white relative overflow-hidden">
          <Container className="relative z-10 text-center space-y-5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Partner With Yolfin</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Let&apos;s Build Success <span className="text-emerald-400">Together</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Start your 1 Month Free Trial today. No commitment, zero risk, just results.
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
