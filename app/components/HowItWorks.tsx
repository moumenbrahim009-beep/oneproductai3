"use client";

import { motion } from "framer-motion";
import FadeIn from "./ui/FadeIn";
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
      className="relative scroll-mt-24 border-t-2 border-ink bg-bone px-6 py-24 md:px-8 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>The Protocol</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Three phases. Fourteen days. One product live.
            </h2>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.12 }}
              className="flex flex-col rounded-xl border-2 border-ink bg-card p-8 shadow-brut transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-6xl font-black leading-none text-ink">
                  {phase.num}
                </span>
                <span className="rounded-md border-2 border-ink bg-flare px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-paper">
                  {phase.days}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">
                {phase.name}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {phase.description}
              </p>
              <ul className="mt-6 space-y-2 border-t-2 border-ink/15 pt-6">
                {phase.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 text-sm text-ink-soft"
                  >
                    <span className="h-2.5 w-2.5 shrink-0 bg-flare" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
