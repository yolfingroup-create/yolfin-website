"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Building2, Calculator, Plane, Building, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";
import type { MediaAssetRow } from "@/types";

interface HeroProps {
  heroImage?: MediaAssetRow | null;
  ctaLabel?: string;
}

export function Hero({ heroImage, ctaLabel = "Book 1 Month Free" }: HeroProps) {
  const hasImage = !!heroImage?.secure_url;

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-light-green/20 pt-6 pb-8 lg:pt-16 lg:pb-24 overflow-hidden border-b border-slate-100">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Desktop Integrated Background Image (hidden on mobile/tablet) */}
      {hasImage && (
        <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full z-0 select-none pointer-events-none overflow-hidden">
          <img
            src={heroImage.secure_url}
            alt={heroImage.alt_text || "Yolfin Group Corporate Hero Background"}
            className="w-full h-full object-cover object-left hero-mask-image"
          />
        </div>
      )}

      <Container className="relative z-10">
        {/* DESKTOP LAYOUT (lg and above) - Kept completely intact */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Statement & Positioning */}
          <div className="col-span-6 space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-green shrink-0" />
              <span>YOUR GROWTH. OUR RESPONSIBILITY.</span>
            </div>

            {/* Strong H1 */}
            <h1 className="text-5xl font-extrabold text-navy tracking-tight leading-[1.18]">
              Outsourced Accounting & Finance for{" "}
              <span className="text-brand-green underline decoration-emerald-400/40 decoration-wavy">
                Growing Businesses.
              </span>
            </h1>

            {/* Short Supporting Paragraph */}
            <p className="text-slate-muted text-lg leading-relaxed max-w-xl">
              Bookkeeping, GST/VAT, payroll, bank reconciliation and monthly
              reports—without the cost of hiring a full-time accountant.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex items-center gap-3 pt-1">
              <Button
                openBookingModal
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {ctaLabel}
              </Button>
              <Button
                href={SITE_CONFIG.contact.whatsappUrl}
                variant="outline"
                size="lg"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                WhatsApp Us
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" /> Strict Data Confidentiality
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" /> No Payment Required
              </span>
            </div>
          </div>

          {/* Right Column: Fallback Card when no image assigned */}
          <div className="col-span-6 w-full">
            {!hasImage && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/90 space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="px-3 py-1 bg-light-green text-brand-green text-[11px] font-bold rounded-full uppercase tracking-wider">
                      Corporate Overview
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight">
                      Integrated Business Support
                    </h2>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-brand-green" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-light-green flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-brand-green" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-navy">Accounting & Finance</h3>
                        <p className="text-[11px] text-slate-500">Bookkeeping, GST & VAT compliance</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] font-bold rounded-md uppercase">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Plane className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-700">Travel Management</h3>
                        <p className="text-[11px] text-slate-400">Corporate trips & travel planning</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded-md uppercase">
                      Soon
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Building className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-700">Facility Management</h3>
                        <p className="text-[11px] text-slate-400">Office operations & maintenance</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded-md uppercase">
                      Soon
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-navy text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Special Launch Offer
                    </p>
                    <p className="text-sm font-bold">1 Month Free Service Trial</p>
                  </div>
                  <Button
                    openBookingModal
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {ctaLabel}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE & TABLET REDESIGNED LAYOUT (lg:hidden) */}
        <div className="block lg:hidden space-y-5">
          {/* Part 1: TEXT */}
          <div className="space-y-3 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-[10px] sm:text-xs uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-brand-green shrink-0" />
              <span>YOUR GROWTH. OUR RESPONSIBILITY.</span>
            </div>

            <h1 className="text-[23px] sm:text-3xl font-extrabold text-navy tracking-tight leading-[1.2]">
              Outsourced Accounting & Finance for{" "}
              <span className="text-brand-green underline decoration-emerald-400/40 decoration-wavy">
                Growing Businesses.
              </span>
            </h1>

            <p className="text-slate-muted text-xs sm:text-sm leading-relaxed max-w-sm">
              Bookkeeping, GST/VAT, payroll, bank reconciliation and monthly
              reports—without the cost of hiring a full-time accountant.
            </p>
          </div>

          {/* Part 2: VISUAL */}
          {hasImage ? (
            <div className="w-full relative py-1 select-none pointer-events-none overflow-hidden">
              <div className="w-full h-40 sm:h-52 relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <img
                  src={heroImage.secure_url}
                  alt={heroImage.alt_text || "Yolfin Group Corporate Hero"}
                  className="w-full h-full object-cover object-center hero-mask-image"
                />
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
          <div className="flex flex-col items-center gap-2 pt-1">
            <Button
              openBookingModal
              variant="primary"
              size="lg"
              fullWidth
              className="text-sm py-3.5 shadow-sm active:scale-[0.98]"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {ctaLabel}
            </Button>
            <a
              href={SITE_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-green py-2 transition-colors active:scale-[0.97]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>
          </div>

          {/* Part 4: TAGLINE ACCENT */}
          <div className="border-l-2 border-brand-green pl-3.5 py-1 text-left max-w-sm mx-auto">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-600 leading-relaxed">
              Your Growth. Our Responsibility.
            </p>
          </div>

          {/* Part 5: COMPACT TRUST BADGES */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[10px] sm:text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-green shrink-0" /> Strict Data Confidentiality
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" /> No Payment Required
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
