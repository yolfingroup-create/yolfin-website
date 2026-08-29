"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useBookingModal } from "@/context/booking-modal-context";
import { TrialBookingForm } from "./trial-booking-form";

export function TrialBookingModal() {
  const { isOpen, closeModal } = useBookingModal();

  // Handle ESC key press and body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity duration-200"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal Surface Container */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 z-10 max-h-[90vh] overflow-y-auto my-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (X) Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green touch-target cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Form Component */}
        <TrialBookingForm onSuccess={closeModal} />
      </div>
    </div>
  );
}
