"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitTrialBookingAction } from "@/app/actions/trial-booking-action";

interface TrialBookingFormProps {
  onSuccess?: () => void;
}

export function TrialBookingForm({ onSuccess }: TrialBookingFormProps) {
  const [selectedTax, setSelectedTax] = useState<"uae_vat" | "indian_gst">("indian_gst");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("tax_classification", selectedTax);

    const result = await submitTrialBookingAction(formData);

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      if (onSuccess) {
        setTimeout(() => {
          setIsSubmitted(false);
          onSuccess();
        }, 4000);
      }
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <span className="inline-block px-3 py-1 bg-light-green text-brand-green text-[11px] font-bold rounded-full uppercase tracking-wider">
          No Obligation • No Payment Required
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight">
          Book Your 1 Month Free Service
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Experience our professional business support with zero upfront fees.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-brand-green mx-auto" />
          <h3 className="text-lg font-bold text-navy">Trial Request Received!</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Our team will contact you within 24 hours at your provided details.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-xs font-semibold animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Honeypot - hidden from real users */}
          <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
            <label htmlFor="website_hp">Website</label>
            <input type="text" id="website_hp" name="website_hp" autoComplete="off" tabIndex={-1} />
          </div>

          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="trial_fullName" className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                id="trial_fullName"
                name="full_name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>

            <div>
              <label htmlFor="trial_email" className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                id="trial_email"
                name="email"
                type="email"
                required
                placeholder="john@company.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>
          </div>

          {/* Phone & Company Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="trial_phone" className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                id="trial_phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>

            <div>
              <label htmlFor="trial_company" className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Company Name
              </label>
              <input
                id="trial_company"
                name="company_name"
                type="text"
                placeholder="Your Business Pvt Ltd"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>
          </div>

          {/* Region / Tax Selector Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Target Region
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedTax("indian_gst")}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all min-h-[44px] cursor-pointer ${
                  selectedTax === "indian_gst"
                    ? "bg-navy text-white border-navy shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>INDIA</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTax("uae_vat")}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all min-h-[44px] cursor-pointer ${
                  selectedTax === "uae_vat"
                    ? "bg-navy text-white border-navy shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>UAE</span>
              </button>
            </div>
          </div>

          {/* Services Interested Checkboxes */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Services Interested In
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <label className="flex items-center gap-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 cursor-pointer min-h-[40px]">
                <input
                  type="checkbox"
                  name="services_interested"
                  value="Accounting & Finance"
                  defaultChecked
                  className="w-4 h-4 accent-brand-green shrink-0"
                />
                <span className="font-semibold text-slate-800">Accounting & Finance</span>
              </label>
              <label className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 min-h-[40px] opacity-60">
                <input
                  type="checkbox"
                  name="services_interested"
                  value="Travel Management"
                  disabled
                  className="w-4 h-4 accent-brand-green shrink-0"
                />
                <span className="font-semibold text-slate-500">Travel <span className="text-[10px] text-slate-400">(Coming Soon)</span></span>
              </label>
              <label className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 min-h-[40px] opacity-60">
                <input
                  type="checkbox"
                  name="services_interested"
                  value="Facility Management"
                  disabled
                  className="w-4 h-4 accent-brand-green shrink-0"
                />
                <span className="font-semibold text-slate-500">Facility <span className="text-[10px] text-slate-400">(Coming Soon)</span></span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSubmitting}
            icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          >
            {isSubmitting ? "Submitting..." : "Book My Free Month"}
          </Button>

          <p className="text-[11px] text-center text-slate-500 leading-normal">
            By submitting this form, you agree to our{" "}
            <Link href="/privacy-policy" className="text-brand-green hover:underline font-semibold">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-and-conditions" className="text-brand-green hover:underline font-semibold">
              Terms & Conditions
            </Link>
            . No payment details required.
          </p>
        </form>
      )}
    </div>
  );
}
