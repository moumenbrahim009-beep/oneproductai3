"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./ui/Button";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "What you get", href: "#what-you-get" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/10 py-3"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
        <Link
          href="#top"
          className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-ink"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet via-indigo to-cyan text-sm font-black text-white shadow-[0_4px_20px_-4px_rgba(139,92,246,0.8)] transition-transform duration-300 group-hover:scale-110">
            1
          </span>
          One Product AI
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-violet to-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <Button size="md" className="text-sm">
          Get Started
        </Button>
      </div>
    </motion.nav>
  );
}
