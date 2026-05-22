"use client";

import { motion, type Variants } from "framer-motion";
import { Check, X } from "lucide-react";
import Reveal from "./ui/Reveal";
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
  hidden: { opacity: 0, x: from, filter: "blur(8px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
});

export default function Solution() {
  return (
    <section className="relative px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>The Engine</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              A system, not a course.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              One Product AI is an operating system for your launch. You don’t
              learn theory. You execute a sequence. Each day has one objective.
              Each objective has clear completion criteria.
            </p>
          </Reveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          <motion.div
            variants={slide(-28)}
            className="rounded-3xl border border-white/5 bg-white/[0.02] p-8"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-faint">
              What most courses give you
            </h3>
            <ul className="mt-6 space-y-4">
              {courses.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10">
                    <X className="h-3 w-3 text-ink-faint" strokeWidth={3} />
                  </span>
                  <span className="text-ink-faint line-through decoration-white/15">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={slide(28)}
            className="glass border-glow relative overflow-hidden rounded-3xl p-8 shadow-[0_20px_70px_-30px_rgba(139,92,246,0.6)]"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/30 blur-3xl" />
            <h3 className="relative inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
              What One Product AI gives you
            </h3>
            <ul className="relative mt-6 space-y-4">
              {engine.map((e) => (
                <li key={e} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan">
                    <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
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
