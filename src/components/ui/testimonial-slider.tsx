"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import type { TestimonialRow } from "@/types";

interface TestimonialSliderProps {
  testimonials: TestimonialRow[];
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -380 : 380;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Centered Heading */}
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            align="center"
            eyebrow="CLIENT TESTIMONIALS"
            title="What Our"
            highlightText="Clients Say"
            subtitle="Real feedback from business owners who rely on Yolfin Group."
          />
        </div>

        {/* Slider Container with Navigation Controls */}
        <div className="relative group">
          {/* Scrollable Cards Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t) => {
              const metaParts = [
                t.designation || "Business Owner",
                t.company_name,
                t.country,
              ].filter(Boolean);

              return (
                <div
                  key={t.id}
                  className="w-[300px] sm:w-[360px] md:w-[380px] shrink-0 snap-align-start p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between h-[280px] hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    {/* Fixed Height Quote Container with Internal Scroll */}
                    <div className="max-h-[120px] overflow-y-auto pr-1.5 text-xs sm:text-sm text-slate-700 italic leading-relaxed font-normal quote-scroll">
                      &quot;{t.quote}&quot;
                    </div>
                  </div>

                  {/* Anchored Client Meta Info */}
                  <div className="pt-3 border-t border-slate-200 text-xs">
                    <p className="font-bold text-navy">{t.client_name}</p>
                    {metaParts.length > 0 && (
                      <p className="text-slate-500 text-[11px] font-medium leading-tight mt-0.5">
                        {metaParts.join(" • ")}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sliding Control Arrows */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous Testimonials"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-navy hover:text-white border border-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next Testimonials"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-navy hover:text-white border border-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
