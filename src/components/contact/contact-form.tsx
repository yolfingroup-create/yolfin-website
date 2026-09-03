"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContactInquiryAction, type ContactActionResult } from "@/app/contact/actions";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ContactActionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitContactInquiryAction(null, formData);

    setIsSubmitting(false);
    setResult(res);

    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 space-y-6">
      <div className="space-y-1 border-b border-slate-100 pb-4">
        <span className="px-3 py-1 bg-light-green text-brand-green text-[11px] font-bold rounded-full uppercase tracking-wider">
          Direct Inquiry
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight">
          Send Us a Message
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Fill out the form below and our dedicated team will respond within 24 hours.
        </p>
      </div>

      {result?.success ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto" />
          <h3 className="text-lg font-extrabold text-navy">Message Sent Successfully!</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {result.message}
          </p>
          <button
            onClick={() => setResult(null)}
            className="mt-2 px-4 py-2 bg-brand-green text-white text-xs font-bold rounded-xl hover:bg-brand-green-hover transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {result?.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-xs font-semibold animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{result.error}</span>
            </div>
          )}

          {/* Honeypot - hidden from real users */}
          <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
            <label htmlFor="contact_website_hp">Website</label>
            <input type="text" id="contact_website_hp" name="website_hp" autoComplete="off" tabIndex={-1} />
          </div>

          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@company.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>
          </div>

          {/* Phone & Company Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Phone / WhatsApp *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Your Business Pvt Ltd"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px]"
              />
            </div>
          </div>

          {/* Subject / Inquiry Type */}
          <div>
            <label htmlFor="subject" className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Inquiry Type / Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green min-h-[44px] cursor-pointer"
            >
              <option value="Accounting & Finance Inquiry">Accounting & Finance Support</option>
              <option value="GST & VAT Compliance">GST (India) / VAT (UAE) Compliance</option>
              <option value="Travel Management Inquiry">Travel Management Inquiry</option>
              <option value="Facility Management Inquiry">Facility Management Inquiry</option>
              <option value="General Business Inquiry">General Business Inquiry</option>
            </select>
          </div>

          {/* Message Area */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell us about your business needs or ask a question..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-y"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSubmitting}
            icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          >
            {isSubmitting ? "Sending Message..." : "Send Message →"}
          </Button>

          <p className="text-[11px] text-center text-slate-500">
            By submitting this form, you agree to our{" "}
            <Link href="/privacy-policy" className="text-brand-green hover:underline font-semibold">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-and-conditions" className="text-brand-green hover:underline font-semibold">
              Terms & Conditions
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}
