import { Lock, CheckCircle, Clock, Headphones } from "lucide-react";
import { Container } from "@/components/ui/container";

const trustPoints = [
  {
    icon: Lock,
    title: "Data Security",
    description: "Protected with advanced confidentiality.",
  },
  {
    icon: CheckCircle,
    title: "Reliable & Accurate",
    description: "Results you can depend on.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "On-time service, every time.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Prompt assistance when you need us.",
  },
];

export function TrustBar() {
  return (
    <section className="hidden md:block py-10 sm:py-12 bg-white border-b border-slate-100">
      <Container>
        {/* Clean 2-column grid on mobile (320px - 1024px), 4-column on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {trustPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-green" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-navy leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-muted leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
