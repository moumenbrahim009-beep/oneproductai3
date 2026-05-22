"use client";

import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import FadeIn from "./ui/FadeIn";

const ticker = [
  "SHIP IT",
  "DAY 14",
  "PRODUCT LIVE",
  "NO THEORY",
  "JUST THE ENGINE",
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t-2 border-ink bg-flare text-paper">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 px-6 py-24 md:px-8 md:py-28 lg:py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <FadeIn>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              The next 14 days happen anyway.
              <br />
              Spend them{" "}
              <span className="rounded-md border-2 border-ink bg-paper px-3 text-flare shadow-[5px_5px_0_0_var(--ink)]">
                shipping
              </span>
              .
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/90">
              In 14 days, your situation will either be the same — or you’ll
              have a product live, validated, and earning its first dollars. The
              cost of finding out is $49.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Button href="/checkout" size="lg" variant="paper">
                Get Started — $49
                <ArrowRight className="h-5 w-5" />
              </Button>
              <p className="font-mono text-xs uppercase tracking-wider text-paper/80">
                One-time · 14-day guarantee · Instant access
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-12 max-w-xl text-sm text-paper/80">
              Launch guaranteed. Income is not. We promise the system, not the
              outcome.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Brutalist ticker */}
      <div className="relative z-10 overflow-hidden border-t-2 border-ink bg-ink py-3">
        <div className="marquee flex w-max items-center gap-6 whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-paper"
            >
              {t}
              <span className="h-1.5 w-1.5 bg-flare" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
