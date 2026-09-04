"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Mail, Phone, MapPin, Building2, MousePointerClick } from "lucide-react";
import { Toast, type ToastMessage } from "@/components/admin/toast";
import { updateSiteSettingAction } from "@/app/admin/cms-actions";

export default function AdminSettingsPage() {
  const [email, setEmail] = useState("yolfingroup@gmail.com");
  const [phoneIndia, setPhoneIndia] = useState("+91 95629 75022");
  const [phoneUAE, setPhoneUAE] = useState("+971 556646580");
  const [address, setAddress] = useState("Office No. 11/501, Areekode Road, Kondotty, Malappuram, Kerala 673638, India");
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState("Book 1 Month Free");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok && mounted) {
          const data = await res.json();
          const map = data.settingsMap || {};
          if (map.company_contact_email) setEmail(map.company_contact_email);
          if (map.company_phone_india) setPhoneIndia(map.company_phone_india);
          if (map.company_phone_uae) setPhoneUAE(map.company_phone_uae);
          if (map.company_address) setAddress(map.company_address);
          if (map.primary_cta_label) {
            const labelVal = typeof map.primary_cta_label === "string" ? map.primary_cta_label : String(map.primary_cta_label);
            setPrimaryCtaLabel(labelVal);
          }
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchSettings();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const [res1, res2, res3, res4, res5] = await Promise.all([
      updateSiteSettingAction("company_contact_email", email),
      updateSiteSettingAction("company_phone_india", phoneIndia),
      updateSiteSettingAction("company_phone_uae", phoneUAE),
      updateSiteSettingAction("company_address", address),
      updateSiteSettingAction("primary_cta_label", primaryCtaLabel),
    ]);

    setIsSubmitting(false);

    if (res1.error || res2.error || res3.error || res4.error || res5.error) {
      setToast({ type: "error", text: "Unable to save all settings. Please try again." });
    } else {
      setToast({ type: "success", text: "Site settings saved successfully" });
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header Bar */}
      <div className="border-b border-slate-800 pb-6">
        <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
          System Module
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
          Site Settings Management
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Update global CTA button text, public corporate contact info, phone numbers, email and headquarters address.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading site settings...</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
          {/* Section 1: Global CTA Settings */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <MousePointerClick className="w-4 h-4 text-emerald-400" />
              <span>Global CTA Configuration</span>
            </h2>
            
            <p className="text-xs text-slate-400">
              Configure the primary call-to-action button text displayed across the entire Yolfin website (Navbar, Hero section, Free Trial banners, and Service pages).
            </p>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" /> Primary CTA Button Wording
              </label>
              <input
                type="text"
                required
                value={primaryCtaLabel}
                onChange={(e) => setPrimaryCtaLabel(e.target.value)}
                placeholder="e.g. Book 1 Month Free, Book Free Consultation"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="mt-3 p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-400">Button Live Preview:</span>
                <button
                  type="button"
                  tabIndex={-1}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs rounded-lg shadow-md cursor-default pointer-events-none"
                >
                  {primaryCtaLabel || "Book 1 Month Free"}
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Public Contact Details */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Public Contact Details</span>
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> Contact Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> India Phone / WhatsApp
                </label>
                <input
                  type="text"
                  required
                  value={phoneIndia}
                  onChange={(e) => setPhoneIndia(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> UAE Direct Phone
                </label>
                <input
                  type="text"
                  required
                  value={phoneUAE}
                  onChange={(e) => setPhoneUAE(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Headquarters Address
              </label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Site Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
