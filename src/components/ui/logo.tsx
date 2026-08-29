import Link from "next/link";

interface LogoProps {
  variant?: "default" | "light" | "compact";
  className?: string;
}

export function Logo({ variant = "default", className = "" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none ${className}`}
      aria-label="Yolfin Group Home"
    >
      {/* Brand Sprout Y Icon */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Plant Sprout / Growth Y Icon */}
          <path d="M12 22V12" />
          <path d="M12 12C12 7.5 7.5 4 4 4C4 8.5 7.5 12 12 12Z" />
          <path d="M12 12C12 7.5 16.5 4 20 4C20 8.5 16.5 12 12 12Z" />
        </svg>
      </div>

      {/* Typography */}
      {variant !== "compact" && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1">
            <span
              className={`font-black text-lg sm:text-xl tracking-tight ${
                isLight ? "text-white" : "text-navy"
              }`}
            >
              YOLFIN
            </span>
            <span
              className={`font-semibold text-xs sm:text-sm tracking-wider uppercase ${
                isLight ? "text-emerald-400" : "text-brand-green"
              }`}
            >
              GROUP
            </span>
          </div>
          <span
            className={`text-[9px] sm:text-[10px] font-medium tracking-tight uppercase ${
              isLight ? "text-slate-400" : "text-slate-muted"
            }`}
          >
            ACCOUNTING • FINANCE • TRAVEL • FACILITY
          </span>
        </div>
      )}
    </Link>
  );
}
