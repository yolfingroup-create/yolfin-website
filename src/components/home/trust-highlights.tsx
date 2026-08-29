import { ShieldCheck, MessageSquareCheck, Award, Headset } from "lucide-react";
import { Container } from "@/components/ui/container";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Secure & Confidential",
    description: "100% data security under strict NDAs.",
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
    <section className="py-10 sm:py-12 bg-white border-b border-slate-100">
      <Container>
        {/* Clean 2-column grid on mobile (320px - 768px), 4-column on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start text-left gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100/90 hover:border-emerald-200 transition-colors h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-green" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-navy leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-muted leading-relaxed">
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
