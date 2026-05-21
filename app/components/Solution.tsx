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
    transition: { duration: 0.6, ease: "easeOut" },
  },
});

export default function Solution() {
  return (
    <section className="relative px-6 py-24 md:px-8 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>The Engine</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              A system, not a course.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
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
          <motion.div
            variants={slide(-32)}
            className="rounded-2xl border border-border-medium bg-bg-secondary/50 p-8"
          >
            <h3 className="text-lg font-semibold text-text-secondary">
              What most courses give you
            </h3>
            <ul className="mt-6 space-y-4">
              {courses.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-text-tertiary" />
                  <span className="text-text-secondary">{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={slide(32)}
            className="relative rounded-2xl bg-bg-secondary p-8 shadow-[0_0_50px_rgba(139,92,246,0.18)]"
          >
            <div className="gradient-bg pointer-events-none absolute inset-0 rounded-2xl p-px [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]" />
            <h3 className="text-lg font-semibold text-text-primary">
              What One Product AI gives you
            </h3>
            <ul className="mt-6 space-y-4">
              {engine.map((e) => (
                <li key={e} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-text-primary">{e}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
