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
      className="relative bg-[#08080d] px-6 py-24 md:px-8 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>The Protocol</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
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
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
              className="flex flex-col rounded-2xl border border-border-subtle bg-bg-secondary p-8"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: i * 0.12 + 0.15,
                }}
                className="gradient-text text-6xl font-extrabold tracking-tight"
              >
                {phase.num}
              </motion.div>
              <h3 className="mt-4 text-2xl font-bold text-text-primary">
                {phase.name}
              </h3>
              <div className="mt-1 text-sm font-semibold uppercase tracking-widest text-text-tertiary">
                {phase.days}
              </div>
              <p className="mt-4 leading-relaxed text-text-secondary">
                {phase.description}
              </p>
              <ul className="mt-6 space-y-2 border-t border-border-subtle pt-6">
                {phase.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 text-sm text-text-secondary"
                  >
                    <span className="gradient-bg h-1.5 w-1.5 shrink-0 rounded-full" />
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
