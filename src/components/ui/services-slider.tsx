"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Calculator, Plane, Building, ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);

  // Activate sliding/looping ONLY if there are more than 3 items
  const isSliderActive = services && services.length > 3;

  // Duplicate list 3 times ONLY if slider mode is active
  const items = isSliderActive
    ? [...services, ...services, ...services]
    : (services || []);

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

  // Smooth continuous requestAnimationFrame loop (60fps)
  useEffect(() => {
    if (!isSliderActive || !scrollRef.current || items.length === 0) return;
    let animId: number;

    const step = () => {
      if (!isPausedRef.current && scrollRef.current) {
        const el = scrollRef.current;
        const singleSetWidth = el.scrollWidth / 3;

        if (singleSetWidth > 0) {
          if (el.scrollLeft >= singleSetWidth * 2) {
            el.scrollLeft -= singleSetWidth;
          } else {
            el.scrollLeft += 0.75; // smooth drift speed
          }
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isSliderActive, items.length]);

  const pauseAndResume = useCallback(() => {
    if (!isSliderActive) return;
    isPausedRef.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 3000);
  }, [isSliderActive]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -380 : 380;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    pauseAndResume();
  };

  if (!services || services.length === 0) return null;

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-soft-bg border-b border-slate-100 overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

        {/* Container */}
        <div className="relative group">
          {/* Scrollable / Centered Cards Track */}
          <div
            ref={scrollRef}
            onMouseEnter={() => { if (isSliderActive) isPausedRef.current = true; }}
            onMouseLeave={() => {
              if (!isSliderActive) return;
              if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
              pauseTimeoutRef.current = setTimeout(() => {
                isPausedRef.current = false;
              }, 1200);
            }}
            onTouchStart={() => { if (isSliderActive) isPausedRef.current = true; }}
            onTouchEnd={pauseAndResume}
            className={`flex gap-6 pb-4 pt-1 px-1 ${
              isSliderActive
                ? "overflow-x-auto scrollbar-none select-none"
                : "flex-wrap justify-center items-stretch"
            }`}
            style={isSliderActive ? { scrollbarWidth: "none", msOverflowStyle: "none" } : undefined}
          >
            {items.map((service, idx) => {
              const isActive = service.status === "active" && service.is_published;

              return (
                <div
                  key={`${service.id}-${idx}`}
                  className={`w-[300px] sm:w-[360px] md:w-[380px] shrink-0 p-6 bg-white rounded-3xl border shadow-xs flex flex-col justify-between h-[280px] transition-all ${
                    isActive
                      ? "border-slate-200 hover:border-emerald-300 hover:shadow-md"
                      : "border-slate-200/70 opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header Icon + Status Badge */}
                    <div className="flex items-center justify-between gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isActive ? "bg-light-green" : "bg-slate-100"
                        }`}
                      >
                        {getIcon(service.icon_name)}
                      </div>

                      {isActive ? (
                        <span className="px-2.5 py-1 bg-emerald-900 text-emerald-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          Active Service
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-semibold rounded-full uppercase tracking-wider">
                          <Clock className="w-3 h-3" /> Coming Soon
                        </span>
                      )}
                    </div>

                    {/* Title & Scrollable Short Description */}
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-navy tracking-tight">
                        {service.name}
                      </h3>
                      <div className="max-h-[90px] overflow-y-auto pr-1.5 text-xs text-slate-muted leading-relaxed mt-1.5 quote-scroll select-text">
                        {service.short_description}
                      </div>
                    </div>
                  </div>

                  {/* Anchored Footer Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    {isActive ? (
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green-hover transition-colors group"
                      >
                        <span>Explore {service.name}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400 italic">
                        Expanding Soon to UAE & India
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sliding Control Arrows — Only displayed when items overflow (> 3) */}
          {isSliderActive && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous Services"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-navy hover:text-white border border-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next Services"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-navy hover:text-white border border-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
