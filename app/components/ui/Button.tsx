import Link from "next/link";
import type { ReactNode } from "react";

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  href = "/checkout",
  size = "md",
  variant = "flare",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  size?: keyof typeof sizes;
  variant?: "flare" | "paper";
  className?: string;
}) {
  const palette =
    variant === "paper"
      ? "bg-card text-ink hover:bg-paper"
      : "bg-flare text-paper hover:bg-flare-deep";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 border-ink font-display font-bold uppercase tracking-wide shadow-brut transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-md active:translate-x-0 active:translate-y-0 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-flare/40 ${palette} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
