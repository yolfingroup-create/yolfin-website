"use client";

import React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useBookingModal } from "@/context/booking-modal-context";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "navy" | "outline" | "white" | "subtle";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  openBookingModal?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  icon,
  fullWidth = false,
  openBookingModal = false,
  className,
  onClick,
  ...props
}: ButtonProps) {
  const { openModal } = useBookingModal();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (openBookingModal) {
      e.preventDefault();
      openModal();
    }
    if (onClick) {
      onClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 touch-target";

  const variants = {
    primary:
      "bg-brand-green hover:bg-brand-green-hover text-white shadow-sm hover:shadow-md active:scale-[0.98]",
    navy: "bg-navy hover:bg-navy-dark text-white shadow-sm hover:shadow-md active:scale-[0.98]",
    outline:
      "border-2 border-slate-200 hover:border-brand-green text-navy hover:text-brand-green bg-white hover:bg-light-green/30",
    white:
      "bg-white hover:bg-slate-50 text-navy font-bold shadow-md hover:shadow-lg active:scale-[0.98]",
    subtle:
      "bg-light-green hover:bg-emerald-100 text-brand-green font-bold",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-xs min-h-[40px] gap-1.5",
    md: "px-5 py-3 text-sm min-h-[44px] gap-2",
    lg: "px-6 py-3.5 text-base min-h-[48px] gap-2.5",
  };

  const combinedClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className
  );

  if (href && !openBookingModal) {
    return (
      <Link href={href} className={combinedClasses} onClick={handleClick}>
        <span>{children}</span>
        {icon && <span className="shrink-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} onClick={handleClick} {...props}>
      <span>{children}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
