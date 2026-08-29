import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import type { ServiceRow } from "@/types";

interface ServicesSectionProps {
  services: ServiceRow[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-soft-bg border-b border-slate-100" id="services">
      <Container className="space-y-10 sm:space-y-12">
        <SectionHeading
          eyebrow="OUR SERVICES"
          title="Solutions That"
          highlightText="Drive Your Business"
          subtitle="Practical, reliable and affordable solutions to manage your business financials and operations across India and UAE."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
