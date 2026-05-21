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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border-subtle bg-bg-primary/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="#top"
          className="text-lg font-semibold tracking-tight text-text-primary"
        >
          One Product AI
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Button href="/checkout" size="md" className="text-sm">
          Get Started — $49
        </Button>
      </div>
    </nav>
  );
}
