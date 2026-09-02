import { ShieldCheck, MessageSquareCheck, Award, Headset } from "lucide-react";
import { Container } from "@/components/ui/container";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Secure & Confidential",
    description: "Strict confidentiality procedures and NDAs.",
  },
  {
    icon: MessageSquareCheck,
    title: "Transparent Processes",
    description: "Clear communication at every step.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Accurate & on-time service delivery.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description: "Expert team ready when you need us.",
  },
];

export function TrustHighlights() {
  return (
    <section className="py-6 sm:py-10 md:py-12 bg-white border-b border-slate-100">
      <Container>
        {/* Compact 2×2 on mobile, 4-column on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start text-left gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100/90 hover:border-emerald-200 transition-colors h-full"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-light-green flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-green" />
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <h3 className="text-[11px] sm:text-sm font-bold text-navy leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-muted leading-relaxed">
                    {item.description}
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
