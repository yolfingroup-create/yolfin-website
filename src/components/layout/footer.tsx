import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ShieldCheck, CreditCard } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";
import type { SocialMediaLinks } from "@/lib/supabase/queries";
import { FooterAccordion, ScrollToTop } from "@/components/layout/footer-interactive";
import { InstagramIcon, FacebookIcon, TwitterXIcon } from "@/components/ui/social-icons";

interface FooterProps {
  socialLinks?: SocialMediaLinks;
}

export function Footer({ socialLinks }: FooterProps) {
  const hasInstagram = Boolean(socialLinks?.instagramUrl?.trim());
  const hasFacebook = Boolean(socialLinks?.facebookUrl?.trim());
  const hasTwitter = Boolean(socialLinks?.twitterUrl?.trim());
  const hasSocialLinks = hasInstagram || hasFacebook || hasTwitter;

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

              {hasSocialLinks && (
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Follow Us
                  </span>
                  <div className="flex items-center gap-2.5">
                    {hasInstagram && (
                      <a
                        href={socialLinks!.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        title="Instagram"
                        className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 hover:border-emerald-500/40 transition-all"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    )}
                    {hasFacebook && (
                      <a
                        href={socialLinks!.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        title="Facebook"
                        className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 hover:border-emerald-500/40 transition-all"
                      >
                        <FacebookIcon className="w-4 h-4" />
                      </a>
                    )}
                    {hasTwitter && (
                      <a
                        href={socialLinks!.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter/X"
                        title="Twitter/X"
                        className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 hover:border-emerald-500/40 transition-all"
                      >
                        <TwitterXIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
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
          {/* Logo + Description + Market Indicator + Social Links */}
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

            {hasSocialLinks && (
              <div className="flex items-center justify-center gap-3 pt-1">
                {hasInstagram && (
                  <a
                    href={socialLinks!.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                    className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 hover:border-emerald-500/40 transition-all"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {hasFacebook && (
                  <a
                    href={socialLinks!.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                    className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 hover:border-emerald-500/40 transition-all"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {hasTwitter && (
                  <a
                    href={socialLinks!.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter/X"
                    title="Twitter/X"
                    className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 hover:border-emerald-500/40 transition-all"
                  >
                    <TwitterXIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
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

            
          </div>
        </div>
      </Container>
    </footer>
  );
}
