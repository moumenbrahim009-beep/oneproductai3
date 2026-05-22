"use client";

import { RotateCw } from "lucide-react";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import SectionLabel from "./ui/SectionLabel";

const loop = [
  { num: "01", title: "IDEA", body: "“This time it’s different.”" },
  {
    num: "02",
    title: "START",
    body: "Buying tools. Watching tutorials. Setting up.",
  },
  {
    num: "03",
    title: "STALL",
    body: "Something feels off. You research more. You move on.",
  },
];

export default function Problem() {
  return (
    <section className="relative px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>The Pattern</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              You have ideas. You start. You stop.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Notebooks full of half-built projects. Domains you bought and
              forgot. Tools you signed up for and abandoned. The problem isn’t
              your ideas. The problem is the loop.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {loop.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <TiltCard className="glass border-glow h-full rounded-3xl p-8">
                <div className="font-display text-5xl font-black text-gradient">
                  {step.num}
                </div>
                <div className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink-faint">
                  {step.title}
                </div>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12 flex justify-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            <RotateCw className="h-4 w-4 text-cyan" />
            Repeat forever
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-12 max-w-3xl text-center font-display text-2xl font-bold leading-snug text-ink md:text-3xl">
            One Product AI breaks the loop by removing every decision that
            doesn’t matter.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
