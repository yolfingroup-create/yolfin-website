"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrialBookingFormProps {
  onSuccess?: () => void;
}

export function TrialBookingForm({ onSuccess }: TrialBookingFormProps) {
  const [selectedTax, setSelectedTax] = useState<"uae_vat" | "indian_gst">("indian_gst");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (onSuccess) {
      setTimeout(() => {
        setIsSubmitted(false);
        onSuccess();
      }, 4000);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <span className="inline-block px-3 py-1 bg-light-green text-brand-green text-[11px] font-bold rounded-full uppercase tracking-wider">
          Zero Risk Guarantee
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
          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Email Address *
              </label>
              <input
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
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 95629 75022 / +971..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Your Business Pvt Ltd"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>
          </div>

          {/* Region / Tax Selector Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Target Region / Tax Classification
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
                <span>INDIAN GST</span>
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
                <span>UAE VAT</span>
              </button>
            </div>
          </div>

          {/* Services Interested Checkboxes */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Services Interested In
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <label className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 cursor-pointer min-h-[40px]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-brand-green shrink-0"
                />
                <span className="font-semibold text-slate-800">Accounting</span>
              </label>
              <label className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 cursor-pointer min-h-[40px]">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-brand-green shrink-0"
                />
                <span className="font-semibold text-slate-800">Travel</span>
              </label>
              <label className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 cursor-pointer min-h-[40px]">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-brand-green shrink-0"
                />
                <span className="font-semibold text-slate-800">Facility</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Book My Free Month
          </Button>

          <p className="text-[11px] text-center text-slate-500 leading-normal">
            🔒 We respect your privacy. No payment details required. Cancel anytime.
          </p>
        </form>
      )}
    </div>
  );
}
