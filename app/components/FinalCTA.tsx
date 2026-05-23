"use client";

import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import GradientText from "./ui/GradientText";
import Reveal from "./ui/Reveal";

const ticker = [
  "SHIP IT",
  "DAY 14",
  "PRODUCT LIVE",
  "NO THEORY",
  "JUST THE ENGINE",
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative px-6 py-28 md:px-8 md:py-40">
        {/* Concentrated glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[140px]" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-6xl lg:text-7xl">
              The next 14 days happen anyway.
              <br />
              Spend them <GradientText>shipping</GradientText>.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
              In 14 days, your situation will either be the same — or you’ll
              have a product live, validated, and earning its first dollars. The
              cost of finding out is $49.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Button size="lg">
                Get Started — $49
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <p className="text-sm text-ink-faint">
                One-time · 14-day guarantee · Instant access
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-12 max-w-xl text-sm text-ink-faint">
              Launch guaranteed. Income is not. We promise the system, not the
              outcome.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-white/[0.02] py-4">
        <div className="marquee flex w-max items-center gap-6 whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-6 text-sm font-bold uppercase tracking-[0.25em] text-ink-muted"
            >
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
