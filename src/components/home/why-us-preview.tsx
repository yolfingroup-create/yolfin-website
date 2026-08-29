import { ArrowRight, Gift, ShieldCheck, Users, FileBarChart, MessageSquare, Handshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import type { WhyYolfinItemRow } from "@/types";

interface WhyUsPreviewProps {
  items: WhyYolfinItemRow[];
}

export function WhyUsPreview({ items }: WhyUsPreviewProps) {
  const getIcon = (name: string | null) => {
    switch (name) {
      case "Gift":
        return <Gift className="w-5 h-5 text-brand-green" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-brand-green" />;
      case "Users":
        return <Users className="w-5 h-5 text-brand-green" />;
      case "FileBarChart":
        return <FileBarChart className="w-5 h-5 text-brand-green" />;
      case "MessageSquare":
        return <MessageSquare className="w-5 h-5 text-brand-green" />;
      case "Handshake":
        return <Handshake className="w-5 h-5 text-brand-green" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-brand-green" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white border-b border-slate-100">
      <Container className="space-y-10 sm:space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading & Key Points Grid */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <SectionHeading
              eyebrow="WHY CHOOSE YOLFIN GROUP?"
              title="Your Success is"
              highlightText="Our Priority"
              subtitle="We bring fresh ideas, modern technology and a strong commitment to help your business grow with confidence."
            />

            {/* Why Yolfin Benefit Grid (2-column on mobile for clean breathing room) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {items.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 hover:border-emerald-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-light-green flex items-center justify-center">
                    {getIcon(item.icon_name)}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <Button
                href="/about"
                variant="navy"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Know More About Us
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Trust Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl bg-gradient-to-br from-navy via-slate-900 to-navy-dark p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-slate-800 space-y-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-green/20 border border-emerald-500/30 flex items-center justify-center">
                <Handshake className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
              </div>

              <div className="space-y-3">
                <span className="inline-block px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-bold rounded-full uppercase tracking-wider">
                  Trusted Business Partner
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
                  Long-Term Partnership Built on Transparency
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We handle your financial compliance, travel operations, and facility management so your team can focus 100% on growth.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-medium">
                <span>📍 Malappuram, Kerala, India</span>
                <span>📍 UAE Services</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
