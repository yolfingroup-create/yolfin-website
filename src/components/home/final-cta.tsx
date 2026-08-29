import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-gradient-to-r from-navy via-slate-900 to-navy-dark text-white relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center space-y-5 sm:space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get Started Risk-Free</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
          Start Your <span className="text-emerald-400">1 Month Free Trial</span> Today!
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          No commitment, just results. Discover how Yolfin Group can streamline your business management.
        </p>

        <div className="pt-2 flex justify-center">
          <Button
            openBookingModal
            variant="primary"
            size="lg"
            className="w-full sm:w-auto text-base px-8 py-3.5"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Book Your Free Month
          </Button>
        </div>
      </Container>
    </section>
  );
}
