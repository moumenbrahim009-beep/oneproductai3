"use client";

import { ShieldCheck } from "lucide-react";
import FadeIn from "./ui/FadeIn";
import SectionLabel from "./ui/SectionLabel";

export default function Guarantee() {
  return (
    <section className="relative border-t-2 border-ink px-6 py-24 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="rounded-2xl border-2 border-ink bg-card p-10 shadow-brut-lg md:p-14">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <SectionLabel>The Promise</SectionLabel>
                <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink">
                  14 days or your money back.
                </h2>
                <p className="mt-6 leading-relaxed text-ink-soft">
                  If you follow the protocol and don’t have a product live by
                  Day 14, request a full refund. No forms. No interrogation.
                  Just email us within 30 days of purchase and the $49 is
                  returned.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-ink bg-flare shadow-brut">
                  <ShieldCheck
                    className="h-14 w-14 text-paper"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="mt-6 font-mono text-sm font-semibold uppercase tracking-wide text-ink">
                  $49 · 14-day refund · Lifetime access
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
