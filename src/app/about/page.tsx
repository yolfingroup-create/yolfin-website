/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Image from "next/image";
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
  Quote,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { getWhyYolfinItems, getPublishedSeoMetadata, getImagePlacements } from "@/lib/supabase/queries";
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
  const [whyItems, imagePlacements] = await Promise.all([
    getWhyYolfinItems(),
    getImagePlacements(),
  ]);

  const aboutHeroImage = imagePlacements.aboutHeroImage;
  const aboutJourneyImage = imagePlacements.aboutJourneyImage;

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
        {/* 1. Hero Section — with dynamic About Hero image on right */}
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-light-green/20 pt-8 pb-10 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-100">
          {/* Desktop Integrated Background Image (hidden on mobile/tablet) */}
          {aboutHeroImage && (
            <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full z-0 select-none pointer-events-none overflow-hidden">
              <img
                src={aboutHeroImage.secure_url}
                alt={aboutHeroImage.alt_text || "About Yolfin Group Background"}
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
                    <span>ABOUT YOLFIN GROUP</span>
                  </div>
                </div>

                <h1 className="text-5xl font-extrabold text-navy tracking-tight leading-tight">
                  We Simplify Business.{" "}
                  <span className="text-brand-green underline decoration-emerald-400/40 decoration-wavy">
                    You Focus on Growth.
                  </span>
                </h1>

                <p className="text-slate-muted text-lg leading-relaxed">
                  Yolfin Group is a startup company committed to providing reliable and affordable solutions in Accounting, Finance, Travel and Facility Management across India and the UAE. We combine modern technology with personal attention to help businesses work smarter and grow faster.
                </p>

                <div className="flex items-center gap-3.5 pt-2">
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

              {/* Right Column: Spacer with floating quote card on desktop */}
              <div className="relative hidden lg:block w-full min-h-[350px]">
                {/* Floating Quote Card — matches reference design */}
                <div className="absolute bottom-6 left-6 bg-navy text-white p-5 rounded-2xl shadow-xl max-w-xs border border-slate-700">
                  <Quote className="w-5 h-5 text-emerald-400 mb-2" />
                  <p className="text-xs leading-relaxed text-slate-200">
                    We don&apos;t just manage your business, we help it grow.
                  </p>
                </div>
              </div>
            </div>

            {/* MOBILE & TABLET REDESIGNED LAYOUT (lg:hidden) */}
            <div className="block lg:hidden space-y-5">
              {/* Part 1: TEXT */}
              <div className="space-y-3 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-brand-green shrink-0" />
                  <span>ABOUT YOLFIN GROUP</span>
                </div>

                <h1 className="text-[23px] sm:text-3xl font-extrabold text-navy tracking-tight leading-[1.2]">
                  We Simplify Business.{" "}
                  <span className="text-brand-green underline decoration-emerald-400/40 decoration-wavy">
                    You Focus on Growth.
                  </span>
                </h1>

                <p className="text-slate-muted text-xs sm:text-sm leading-relaxed max-w-sm">
                  Yolfin Group is a startup company committed to providing reliable and affordable solutions in Accounting, Finance, Travel and Facility Management across India and the UAE.
                </p>
              </div>

              {/* Part 2: DYNAMIC VISUAL COMPOSITION WITH FLOATING QUOTE */}
              {aboutHeroImage ? (
                <div className="w-full relative py-1 select-none mt-2 mb-6">
                  <div className="w-full h-40 sm:h-52 relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                    <img
                      src={aboutHeroImage.secure_url}
                      alt={aboutHeroImage.alt_text || "About Yolfin Group"}
                      className="w-full h-full object-cover object-center hero-mask-image"
                    />
                  </div>
                  {/* Floating Quote Card */}
                  <div className="absolute -bottom-3 left-4 right-4 bg-navy/95 backdrop-blur-md text-white p-3 rounded-xl border border-slate-700/50 shadow-md">
                    <p className="text-[10px] leading-relaxed text-slate-200 italic font-medium">
                      &quot;We don&apos;t just manage your business, we help it grow.&quot;
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-brand-green shrink-0" />
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
                  href="/contact"
                  className="text-xs font-bold text-slate-500 hover:text-brand-green py-2 transition-colors inline-block active:scale-[0.97]"
                >
                  Contact Us →
                </a>
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

            {/* Supported Corporate Pillar Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-navy text-white rounded-3xl shadow-xl">
              <div className="p-4 text-center space-y-1">
                <p className="text-base sm:text-lg font-extrabold text-emerald-400">Client-Centric</p>
                <p className="text-xs font-semibold text-slate-300">Dedicated Support</p>
              </div>
              <div className="p-4 text-center space-y-1 border-l border-slate-800">
                <p className="text-base sm:text-lg font-extrabold text-emerald-400">India & UAE</p>
                <p className="text-xs font-semibold text-slate-300">Multi-Region Reach</p>
              </div>
              <div className="p-4 text-center space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800">
                <p className="text-base sm:text-lg font-extrabold text-emerald-400">100% Safe</p>
                <p className="text-xs font-semibold text-slate-300">Data Confidentiality</p>
              </div>
              <div className="p-4 text-center space-y-1 border-t lg:border-t-0 border-l border-slate-800">
                <p className="text-base sm:text-lg font-extrabold text-emerald-400">Prompt & Reliable</p>
                <p className="text-xs font-semibold text-slate-300">Dedicated Assistance</p>
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

        {/* 4. Our Journey Section — with dynamic Journey image on right */}
        <section className="py-14 sm:py-16 md:py-20 bg-white border-b border-slate-100">
          <Container className="space-y-10">
            <SectionHeading
              eyebrow="OUR STORY"
              title="Our"
              highlightText="Journey"
              className="text-center"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-stretch items-center">
              {/* Left — Timeline */}
              <div className="space-y-8 flex flex-col justify-center">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-light-green flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy">The Beginning</h3>
                    <p className="text-xs text-slate-muted leading-relaxed mt-1">
                      Yolfin Group was founded with a simple idea — to support businesses with reliable and affordable financial and management solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-light-green flex items-center justify-center shrink-0 mt-1">
                    <TrendingUp className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy">Our Growth</h3>
                    <p className="text-xs text-slate-muted leading-relaxed mt-1">
                      With the trust of our clients, we are growing step by step, expanding our services and improving every day.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-light-green flex items-center justify-center shrink-0 mt-1">
                    <Target className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy">The Future</h3>
                    <p className="text-xs text-slate-muted leading-relaxed mt-1">
                      We aim to be a leading business support partner in India and UAE, known for trust, innovation and excellence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right — Dynamic Journey Image */}
              <div className="relative lg:h-full">
                {/* Desktop: bordered card */}
                <div className="hidden sm:block relative lg:h-full h-auto min-h-[300px] lg:min-h-0 aspect-[4/3] lg:aspect-none rounded-3xl overflow-hidden shadow-xl border border-slate-200/60">
                  {aboutJourneyImage ? (
                    <Image
                      src={aboutJourneyImage.secure_url}
                      alt={aboutJourneyImage.alt_text || "Our Journey at Yolfin Group"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-navy via-slate-800 to-navy-dark flex items-center justify-center">
                      <div className="text-center space-y-3 p-8">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto">
                          <TrendingUp className="w-8 h-8 text-emerald-400" />
                        </div>
                        <p className="text-sm font-bold text-white">Yolfin Group</p>
                        <p className="text-xs text-slate-300">Growing Together</p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Mobile: integrated image with fade */}
                {aboutJourneyImage && (
                  <div className="block sm:hidden w-full overflow-hidden select-none pointer-events-none">
                    <img
                      src={aboutJourneyImage.secure_url}
                      alt={aboutJourneyImage.alt_text || "Our Journey at Yolfin Group"}
                      className="w-full h-auto max-h-[180px] object-cover object-center hero-mask-image"
                    />
                  </div>
                )}
                {/* Floating quote overlay — matches reference design */}
                <div className="absolute bottom-4 left-4 right-4 bg-navy/90 backdrop-blur-sm text-white p-4 rounded-xl border border-slate-700/50">
                  <Quote className="w-4 h-4 text-emerald-400 mb-1.5" />
                  <p className="text-xs leading-relaxed text-slate-200 italic">
                    Built on trust. Driven by commitment. Focused on your growth.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 5. Dynamic Why Choose Yolfin Grid */}
        {whyItems.length > 0 && (
          <section className="py-14 sm:py-16 bg-slate-50 border-b border-slate-100">
            <Container className="space-y-8">
              <SectionHeading
                eyebrow="OUR ADVANTAGE"
                title="What Sets"
                highlightText="Yolfin Apart"
                subtitle="Database-backed core capabilities designed for your peace of mind."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyItems.map((item) => (
                  <div key={item.id} className="p-5 bg-white rounded-2xl border border-slate-200/70 space-y-2">
                    <h3 className="text-sm font-bold text-navy">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* 6. Final CTA */}
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
