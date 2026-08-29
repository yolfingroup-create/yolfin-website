import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300 border-t border-slate-800 pt-12 sm:pt-16 pb-8">
      <Container className="space-y-12">
        {/* Main Footer Grid: Stacks cleanly on mobile */}
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

        {/* 5. Bottom Copyright & Legal Bar */}
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
      </Container>
    </footer>
  );
}
