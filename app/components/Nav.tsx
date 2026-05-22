"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b-2 border-ink bg-paper/90 backdrop-blur-md"
          : "border-b-2 border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 md:px-8">
        <Link
          href="#top"
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-ink"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-ink bg-flare text-sm font-black text-paper">
            1
          </span>
          One Product AI
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-flare"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Button href="/checkout" size="md" className="text-xs">
          Get Started — $49
        </Button>
      </div>
    </nav>
  );
}
