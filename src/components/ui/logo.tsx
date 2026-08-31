import Link from "next/link";
import Image from "next/image";

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
      {/* Brand Logo Icon: Circle Logo PNG */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
        <Image
          src={isLight ? "/yolfin circle logo footer.png" : "/yolfin circle logo.png"}
          alt="Yolfin Group Logo"
          width={40}
          height={40}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
          priority
        />
      </div>

      {/* Typography Replacement: Text Logo PNG */}
      {variant !== "compact" && (
        <div className="relative h-8 sm:h-9 w-auto flex items-center shrink-0">
          <Image
            src={isLight ? "/yolfin text logo footer.png" : "/yolfin text logo.png"}
            alt="Yolfin Group Typography"
            width={160}
            height={36}
            className="h-full w-auto object-contain transition-all"
            priority
          />
        </div>
      )}
    </Link>
  );
}
