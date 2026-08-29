import { ArrowRight, Gift, CreditCard, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function TrialBanner() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-navy text-white relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading & Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5" />
                <span>Zero Risk Guarantee</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Try Our Service{" "}
                <span className="text-emerald-400">1 Month Free!</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Experience the quality of our business support, accounting, and operational assistance with complete peace of mind. Continue only if you are satisfied.
              </p>

              {/* 3 Feature Pills: Stack cleanly on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl">
                  <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200">
                    1 Month Free Service
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl">
                  <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200">
                    No Payment Required
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl">
                  <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200">
                    Cancel Anytime
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Prominent CTA (Opens Modal) */}
            <div className="lg:col-span-5 flex flex-col items-stretch sm:items-center lg:items-end justify-center text-center lg:text-right space-y-3 pt-2 lg:pt-0">
              <Button
                openBookingModal
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-3.5"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Book 1 Month Free
              </Button>
              <p className="text-xs text-slate-400">
                Quick 1-minute registration • No obligation
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
