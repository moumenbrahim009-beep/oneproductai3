"use client";

import { ShieldCheck } from "lucide-react";
import FadeIn from "./ui/FadeIn";
import SectionLabel from "./ui/SectionLabel";

export default function Guarantee() {
  return (
    <section className="relative px-6 py-24 md:px-8 md:py-32 lg:py-40">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-bg-secondary p-10 md:p-14">
            <div className="gradient-bg pointer-events-none absolute inset-0 rounded-3xl p-px [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]" />
            <div className="relative grid items-center gap-12 md:grid-cols-2">
              <div>
                <SectionLabel>The Promise</SectionLabel>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary">
                  14 days or your money back.
                </h2>
                <p className="mt-6 leading-relaxed text-text-secondary">
                  If you follow the protocol and don’t have a product live by
                  Day 14, request a full refund. No forms. No interrogation.
                  Just email us within 30 days of purchase and the $49 is
                  returned.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="glow-pulse gradient-bg flex h-28 w-28 items-center justify-center rounded-full">
                  <ShieldCheck className="h-14 w-14 text-white" strokeWidth={1.5} />
                </div>
                <p className="mt-6 text-lg font-medium text-text-primary">
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
