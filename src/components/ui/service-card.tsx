import React from "react";
import Link from "next/link";
import { Calculator, Plane, Building, ArrowRight, Clock } from "lucide-react";
import type { ServiceRow } from "@/types";

interface ServiceCardProps {
  service: ServiceRow;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const isActive = service.status === "active";

  const getIcon = (name: string | null) => {
    switch (name) {
      case "Calculator":
        return <Calculator className="w-6 h-6 text-brand-green" />;
      case "Plane":
        return <Plane className="w-6 h-6 text-slate-400" />;
      case "Building":
        return <Building className="w-6 h-6 text-slate-400" />;
      default:
        return <Calculator className="w-6 h-6 text-brand-green" />;
    }
  };

  return (
    <div
      className={`relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 border transition-all duration-300 flex flex-col justify-between h-full ${
        isActive
          ? "border-emerald-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-green ring-1 ring-emerald-500/10"
          : "border-slate-200 opacity-85 hover:opacity-100 shadow-xs"
      }`}
    >
      <div className="space-y-4">
        {/* Header Icon + Status Badge */}
        <div className="flex items-center justify-between gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isActive ? "bg-light-green" : "bg-slate-100"
            }`}
          >
            {getIcon(service.icon_name)}
          </div>

          {isActive ? (
            <span className="px-3 py-1 bg-emerald-900 text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Active Service
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-500 border border-slate-200 text-xs font-semibold rounded-full uppercase tracking-wider">
              <Clock className="w-3 h-3" /> Coming Soon
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5 sm:space-y-2">
          <h3 className="text-base sm:text-xl font-extrabold text-navy tracking-tight">
            {service.name}
          </h3>
          <p className="text-slate-muted text-sm leading-relaxed">
            {service.short_description}
          </p>
        </div>
      </div>

      {/* Footer Action Button / Badge */}
      <div className="pt-4 mt-4 sm:pt-6 sm:mt-6 border-t border-slate-100 flex items-center justify-between">
        {isActive ? (
          <Link
            href={`/services?selected=${service.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:text-brand-green-hover transition-colors group"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <span className="text-xs font-medium text-slate-400 italic">
            Expanding Soon to UAE & India
          </span>
        )}
      </div>
    </div>
  );
}
