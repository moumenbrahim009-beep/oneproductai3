"use client";

import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import FadeIn from "./ui/FadeIn";
import SectionLabel from "./ui/SectionLabel";

const loop = [
  {
    num: "01",
    title: "IDEA",
    body: "“This time it’s different.”",
  },
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
    <section className="relative border-t-2 border-ink bg-bone px-6 py-24 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>The Pattern</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              You have ideas. You start. You stop.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Notebooks full of half-built projects. Domains you bought and
              forgot. Tools you signed up for and abandoned. The problem isn’t
              your ideas. The problem is the loop.
            </p>
          </FadeIn>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {loop.map((step) => (
            <motion.div
              key={step.num}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="rounded-xl border-2 border-ink bg-card p-8 shadow-brut"
            >
              <div className="font-display text-5xl font-black text-flare">
                {step.num}
              </div>
              <div className="mt-3 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-ink">
                {step.title}
              </div>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <FadeIn delay={0.1} className="mt-12 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-card px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink shadow-brut">
            <RotateCw className="h-4 w-4 text-flare" />
            Repeat forever
          </span>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mx-auto mt-12 max-w-3xl text-center font-display text-2xl font-bold leading-snug text-ink md:text-3xl">
            One Product AI breaks the loop by removing every decision that
            doesn’t matter.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
