import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

interface FinalCTAProps {
  ctaLabel?: string;
}

export function FinalCTA({ ctaLabel = "Book 1 Month Free" }: FinalCTAProps) {
  return (
    <section className="py-8 sm:py-14 md:py-20 bg-gradient-to-r from-navy via-slate-900 to-navy-dark text-white relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Get Started Risk-Free</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
          Start Your <span className="text-emerald-400">1 Month Free Trial</span> Today!
        </h2>

        <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
          No commitment, just results. Discover how Yolfin Group can streamline your business management.
        </p>

        <div className="pt-1 sm:pt-2 flex justify-center">
          <Button
            openBookingModal
            variant="primary"
            size="lg"
            className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5"
            icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          >
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
