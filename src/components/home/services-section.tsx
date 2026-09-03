import { ServicesSlider } from "@/components/ui/services-slider";
import type { ServiceRow } from "@/types";

interface ServicesSectionProps {
  services: ServiceRow[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return <ServicesSlider services={services} />;
}
