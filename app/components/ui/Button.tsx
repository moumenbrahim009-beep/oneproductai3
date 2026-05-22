import Link from "next/link";
import type { ReactNode } from "react";
import Magnetic from "./Magnetic";

const sizes = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  href = "/checkout",
  size = "md",
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  size?: keyof typeof sizes;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  if (variant === "ghost") {
    return (
      <Magnetic strength={0.3}>
        <Link
          href={href}
          className={`glass inline-flex items-center justify-center gap-2 rounded-full font-semibold text-ink transition-colors duration-300 hover:text-white ${sizes[size]} ${className}`}
        >
          {children}
        </Link>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={0.35}>
      <Link
        href={href}
        className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet via-indigo to-cyan font-semibold text-white shadow-[0_8px_40px_-8px_rgba(139,92,246,0.7)] transition-shadow duration-300 hover:shadow-[0_12px_50px_-6px_rgba(34,211,238,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-base ${sizes[size]} ${className}`}
      >
        {/* shimmer sweep */}
        <span className="pointer-events-none absolute inset-0 -skew-x-12">
          <span className="shimmer-sweep absolute inset-y-0 left-0 w-1/3 bg-white/25 blur-md" />
        </span>
        <span className="relative inline-flex items-center gap-2">
          {children}
        </span>
      </Link>
    </Magnetic>
  );
}
