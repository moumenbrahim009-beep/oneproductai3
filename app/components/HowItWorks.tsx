"use client";

import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import SectionLabel from "./ui/SectionLabel";

const phases = [
  {
    num: "01",
    name: "Product Profile™",
    days: "Days 1–2",
    description:
      "Define exactly who you serve and what specific problem you solve. No more “I’ll figure it out as I go.” By Day 2, you have a one-page profile that drives every other decision.",
    points: ["Day 1: Define the audience", "Day 2: Define the problem"],
  },
  {
    num: "02",
    name: "Market Proof",
    days: "Days 3–4",
    description:
      "Validate that your audience will actually buy before you build. Direct outreach, real conversations, decision criteria. By Day 4, you either commit or pivot — based on evidence, not feelings.",
    points: [
      "Day 3: Direct validation",
      "Day 4: Decide (build / pivot / abandon)",
    ],
  },
  {
    num: "03",
    name: "Build & Launch",
    days: "Days 5–14",
    description:
      "Build the smallest version that delivers your promise. Connect a payment system. Soft-launch to your validated audience. By Day 14, you have a buyable product and your first outreach.",
    points: [
      "Days 5–8: Build the core",
      "Days 9–11: Make it buyable",
      "Days 12–14: Soft launch",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 px-6 py-28 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>The Protocol</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Three phases. Fourteen days.{" "}
              <span className="text-gradient">One product live.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {phases.map((phase, i) => (
            <Reveal key={phase.num} delay={i * 0.12}>
              <TiltCard className="glass border-glow flex h-full flex-col rounded-3xl p-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-6xl font-black leading-none text-gradient">
                    {phase.num}
                  </span>
                  <span className="glass rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {phase.days}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold text-ink">
                  {phase.name}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  {phase.description}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                  {phase.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 text-sm text-ink-muted"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet to-cyan" />
                      {p}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
