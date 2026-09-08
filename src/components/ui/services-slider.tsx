import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import type { ServiceRow } from "@/types";

interface ServicesSliderProps {
  services: ServiceRow[];
  eyebrow?: string;
  title?: string;
  highlightText?: string;
  subtitle?: string;
}

export function ServicesSlider({
  services,
  eyebrow = "OUR SERVICES",
  title = "Solutions That",
  highlightText = "Drive Your Business",
  subtitle = "Practical, reliable and affordable solutions to manage your business financials and operations across India and UAE.",
}: ServicesSliderProps) {
  if (!services || services.length === 0) return null;

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-soft-bg border-b border-slate-100" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-12">
        {/* Centered Heading */}
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            align="center"
            eyebrow={eyebrow}
            title={title}
            highlightText={highlightText}
            subtitle={subtitle}
          />
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const ServicesGrid = ServicesSlider;
