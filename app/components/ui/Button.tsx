"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const sizes = {
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  href = "/checkout",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`inline-block ${className}`}
    >
      <Link
        href={href}
        className={`gradient-bg group inline-flex items-center justify-center rounded-full font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(139,92,246,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${sizes[size]}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
