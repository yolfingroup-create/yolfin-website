"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Building2, Calculator, Plane, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { MediaAssetRow } from "@/types";

interface HeroProps {
  heroImage?: MediaAssetRow | null;
}

export function Hero({ heroImage }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-light-green/20 pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-slate-100">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Statement & Positioning */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-[11px] sm:text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-green shrink-0" />
              <span>YOUR GROWTH. OUR RESPONSIBILITY.</span>
            </div>

            {/* Strong H1 */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-[1.18]">
              Smart Solutions for Every{" "}
              <span className="text-brand-green underline decoration-emerald-400/40 decoration-wavy">
                Step Forward.
              </span>
            </h1>

            {/* Short Supporting Paragraph */}
            <p className="text-slate-muted text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Integrated solutions for Accounting, Finance, Travel and Facility
              Management – all under one trusted partner across India and UAE.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Button
                openBookingModal
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book 1 Month Free
              </Button>
              <Button
                href="#services"
                variant="outline"
                size="lg"
              >
                See How It Works
              </Button>
            </div>

            {/* Floating Quote Statement */}
            <div className="pt-2">
              <div className="p-4 sm:p-5 bg-navy text-white rounded-2xl shadow-lg border border-navy-light relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/10 rounded-full blur-xl" />
                <p className="text-xs sm:text-sm font-medium italic leading-relaxed text-slate-200">
                  &quot;We don&apos;t just manage your business, we help it grow.&quot;
                </p>
                <div className="mt-2 text-[11px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  — Yolfin Group Leadership Commitment
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" /> 100% Data Confidentiality
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" /> No Payment Required
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Media Image or Corporate Feature Card */}
          <div className="lg:col-span-6 w-full">
            {heroImage?.secure_url ? (
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                <img
                  src={heroImage.secure_url}
                  alt={heroImage.alt_text || "Yolfin Group Corporate Hero"}
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl sm:rounded-3xl group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-navy/90 backdrop-blur-md rounded-2xl border border-white/10 text-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      Corporate Support
                    </p>
                    <p className="text-xs sm:text-sm font-bold">Trusted Partner for India & UAE</p>
                  </div>
                  <Button openBookingModal variant="primary" size="sm">
                    Book Free Month
                  </Button>
                </div>
              </div>
            ) : (
              /* Corporate Fallback Card when no custom image assigned */
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 space-y-6 relative overflow-hidden">
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

                {/* Service Pillars Preview */}
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
                    <span className="px-2.5 py-0.5 bg-emerald-900 text-emerald-300 text-[10px] font-bold rounded-md uppercase">
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

                {/* Instant Modal Trigger Banner */}
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
                    Book Free Month
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
