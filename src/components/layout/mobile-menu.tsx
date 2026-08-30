
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowRight, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Close mobile drawer when the route actually changes
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll and handle Escape key while menu is open
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="mobile-navigation"
      className="fixed inset-0 z-50 lg:hidden flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Drawer */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full flex flex-col justify-between p-6 shadow-2xl z-10 overflow-y-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <Logo variant="compact" />

          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green touch-target"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="py-6 space-y-2 flex-1">
          {SITE_CONFIG.navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-base transition-colors touch-target ${
                  isActive
                    ? "bg-light-green text-brand-green"
                    : "text-navy hover:bg-slate-50 hover:text-brand-green"
                }`}
              >
                <span>{link.name}</span>

                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            );
          })}
        </div>

        {/* Mobile Contact & CTA */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          {/* Contact Information */}
          <div className="space-y-2 text-xs font-medium text-slate-600">
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="flex items-center gap-2 hover:text-brand-green py-1"
            >
              <Mail className="w-4 h-4 text-brand-green shrink-0" />

              <span className="break-all">
                {SITE_CONFIG.contact.email}
              </span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.contact.phoneIndia}`}
              className="flex items-center gap-2 hover:text-brand-green py-1"
            >
              <Phone className="w-4 h-4 text-brand-green shrink-0" />

              <span>
                {SITE_CONFIG.contact.phoneIndiaDisplay} (India)
              </span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.contact.phoneUAE}`}
              className="flex items-center gap-2 hover:text-brand-green py-1"
            >
              <Phone className="w-4 h-4 text-brand-green shrink-0" />

              <span>
                {SITE_CONFIG.contact.phoneUAEDisplay} (UAE)
              </span>
            </a>
          </div>

          {/* Booking CTA */}
          <Button
            openBookingModal
            onClick={onClose}
            variant="primary"
            size="lg"
            fullWidth
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Book 1 Month Free
          </Button>
        </div>
      </div>
    </div>
  );
}

