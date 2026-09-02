"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ChevronDown, ArrowUp, ShieldCheck, CreditCard } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";

function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3.5 text-xs font-bold text-white uppercase tracking-wider"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ScrollToTop() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300 border-t border-slate-800 pt-10 sm:pt-16 pb-6 sm:pb-8">
      <Container>
        {/* ============================================= */}
        {/* DESKTOP FOOTER — existing 4-column layout     */}
        {/* ============================================= */}
        <div className="hidden md:block space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {/* 1. Branding & Description */}
            <div className="space-y-4">
              <Logo variant="light" />
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We help businesses manage Accounting, Finance, Travel & Facility
                needs so you can focus on growing your dreams.
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Serving India & UAE Markets</span>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div className="space-y-3.5">
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                {SITE_CONFIG.navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-emerald-400 transition-colors py-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Services */}
            <div className="space-y-3.5">
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Our Services
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li>
                  <Link
                    href="/services?selected=accounting-finance"
                    className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1.5"
                  >
                    <span>Accounting & Finance</span>
                    <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-300 text-[10px] font-semibold rounded">
                      Active
                    </span>
                  </Link>
                </li>
                <li className="text-slate-500 py-1 flex items-center gap-1.5">
                  <span>Travel Management</span>
                  <span className="text-[10px] font-medium italic">
                    (Coming Soon)
                  </span>
                </li>
                <li className="text-slate-500 py-1 flex items-center gap-1.5">
                  <span>Facility Management</span>
                  <span className="text-[10px] font-medium italic">
                    (Coming Soon)
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. Contact Information */}
            <div className="space-y-3.5">
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Contact Us
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-start gap-2.5 hover:text-emerald-400 transition-colors py-0.5 group"
                >
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="break-all">{SITE_CONFIG.contact.email}</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.phoneIndia}`}
                  className="flex items-start gap-2.5 hover:text-emerald-400 transition-colors py-0.5"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.contact.phoneIndiaDisplay} (India)</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.phoneUAE}`}
                  className="flex items-start gap-2.5 hover:text-emerald-400 transition-colors py-0.5"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.contact.phoneUAEDisplay} (UAE)</span>
                </a>

                <div className="flex items-start gap-2.5 text-slate-400 pt-1">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {SITE_CONFIG.contact.address.formatted}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
            <p>© 2026 Yolfin Group. All Rights Reserved.</p>
            <div className="flex gap-4">
              <Link
                href="https://www.ekodrix.com/"
                className="text-sm text-slate-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded px-0.5 inline-flex items-center gap-1"
              >
                Crafted by <span className="inline-flex items-center font-semibold">Ek<Image src="/ekodrix-logo.png" alt="o" width={14} height={14} className="mx-0.5 inline-block rounded-full align-middle" />drix</span>
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="hover:text-slate-300 transition-colors py-1"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-700">•</span>
              <Link
                href="/terms-and-conditions"
                className="hover:text-slate-300 transition-colors py-1"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================= */}
        {/* MOBILE FOOTER — compact accordion layout      */}
        {/* ============================================= */}
        <div className="block md:hidden space-y-6">
          {/* Logo + Description + Market Indicator */}
          <div className="space-y-3 text-center">
            <div className="flex justify-center">
              <Logo variant="light" />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-xs mx-auto">
              Accounting, Finance, Travel & Facility support so you can focus on growth.
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Serving India & UAE</span>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="border-t border-slate-800">
            {/* Quick Links Accordion */}
            <FooterAccordion title="Quick Links">
              <ul className="space-y-2 text-xs font-medium pl-1">
                {SITE_CONFIG.navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-emerald-400 transition-colors py-0.5 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>

            {/* Our Services Accordion */}
            <FooterAccordion title="Our Services">
              <ul className="space-y-2 text-xs font-medium pl-1">
                <li>
                  <Link
                    href="/services?selected=accounting-finance"
                    className="hover:text-emerald-400 transition-colors py-0.5 flex items-center gap-1.5"
                  >
                    <span>Accounting & Finance</span>
                    <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 text-[9px] font-semibold rounded">
                      Active
                    </span>
                  </Link>
                </li>
                <li className="text-slate-500 py-0.5 flex items-center gap-1.5">
                  <span>Travel Management</span>
                  <span className="text-[9px] font-medium italic">(Coming Soon)</span>
                </li>
                <li className="text-slate-500 py-0.5 flex items-center gap-1.5">
                  <span>Facility Management</span>
                  <span className="text-[9px] font-medium italic">(Coming Soon)</span>
                </li>
              </ul>
            </FooterAccordion>

            {/* Contact Us Accordion */}
            <FooterAccordion title="Contact Us">
              <div className="space-y-2.5 text-xs pl-1">
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneIndia}`}
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{SITE_CONFIG.contact.phoneIndiaDisplay} (India)</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneUAE}`}
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{SITE_CONFIG.contact.phoneUAEDisplay} (UAE)</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="break-all">{SITE_CONFIG.contact.email}</span>
                </a>
                <div className="flex items-start gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug text-[11px]">
                    {SITE_CONFIG.contact.address.formatted}
                  </span>
                </div>
              </div>
            </FooterAccordion>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-4 text-[10px] font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Strict Data Confidentiality
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              No Payment during trial period
            </span>
          </div>

          {/* Bottom Bar */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-slate-500">
                © 2026 Yolfin Group. All Rights Reserved.
              </p>
              <ScrollToTop />
            </div>

            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500">
              <Link
                href="/privacy-policy"
                className="hover:text-slate-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-700">•</span>
              <Link
                href="/terms-and-conditions"
                className="hover:text-slate-300 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>

            <div className="flex justify-center">
              <Link
                href="https://www.ekodrix.com/"
                className="text-[10px] text-slate-500 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                Crafted by <span className="inline-flex items-center font-semibold">Ek<Image src="/ekodrix-logo.png" alt="o" width={12} height={12} className="mx-0.5 inline-block rounded-full align-middle" />drix</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
