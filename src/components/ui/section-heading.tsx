import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  isLight?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  highlightText,
  subtitle,
  align = "center",
  className = "",
  isLight = false,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`space-y-3 ${
        isCentered ? "text-center max-w-3xl mx-auto" : "max-w-2xl"
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
            isLight
              ? "bg-emerald-950/90 text-emerald-400 border border-emerald-800"
              : "bg-light-green text-brand-green border border-emerald-200/80"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.2] ${
          isLight ? "text-white" : "text-navy"
        }`}
      >
        {title}{" "}
        {highlightText && (
          <span className="text-brand-green font-extrabold">
            {highlightText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            isLight ? "text-slate-300" : "text-slate-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
