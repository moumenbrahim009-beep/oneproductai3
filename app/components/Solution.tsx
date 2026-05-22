"use client";

import { motion, type Variants } from "framer-motion";
import { Check, X } from "lucide-react";
import FadeIn from "./ui/FadeIn";
import SectionLabel from "./ui/SectionLabel";

const courses = [
  "Hours of video to watch",
  "Concepts to internalize",
  "Tools to compare",
  "Decisions to make alone",
  "Vague homework",
  "Hope you finish",
];

const engine = [
  "One objective per day",
  "Pre-built templates",
  "An AI coach that knows the protocol",
  "Done/not-done criteria",
  "A 14-day timeline that ends",
  "Your product, live",
];

const slide = (from: number): Variants => ({
  hidden: { opacity: 0, x: from },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
});

export default function Solution() {
  return (
    <section className="relative border-t-2 border-ink px-6 py-24 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>The Engine</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              A system, not a course.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              One Product AI is an operating system for your launch. You don’t
              learn theory. You execute a sequence. Each day has one objective.
              Each objective has clear completion criteria.
            </p>
          </FadeIn>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          {/* Most courses */}
          <motion.div
            variants={slide(-28)}
            className="rounded-xl border-2 border-dashed border-ink/40 bg-bone p-8"
          >
            <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-ink-faint">
              What most courses give you
            </h3>
            <ul className="mt-6 space-y-4">
              {courses.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-ink/30">
                    <X className="h-3 w-3 text-ink-faint" strokeWidth={3} />
                  </span>
                  <span className="text-ink-soft line-through decoration-ink-faint/50">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* One Product AI */}
          <motion.div
            variants={slide(28)}
            className="rounded-xl border-2 border-ink bg-card p-8 shadow-brut-lg"
          >
            <h3 className="inline-flex items-center gap-2 rounded-md border-2 border-ink bg-flare px-3 py-1 font-mono text-sm font-bold uppercase tracking-[0.12em] text-paper">
              What One Product AI gives you
            </h3>
            <ul className="mt-6 space-y-4">
              {engine.map((e) => (
                <li key={e} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-ink bg-go">
                    <Check className="h-3 w-3 text-paper" strokeWidth={3.5} />
                  </span>
                  <span className="font-medium text-ink">{e}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
