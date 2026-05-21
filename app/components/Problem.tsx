"use client";

import { motion } from "framer-motion";
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
    <section className="relative bg-[#08080d] px-6 py-24 md:px-8 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>The Pattern</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              You have ideas. You start. You stop.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
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
                hidden: { opacity: 0, x: -24 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="rounded-2xl border border-border-subtle bg-bg-secondary p-8"
            >
              <div className="gradient-text text-2xl font-bold">{step.num}</div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-widest text-text-tertiary">
                {step.title}
              </div>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-16 max-w-3xl text-center text-2xl leading-snug text-text-primary">
            One Product AI breaks the loop by removing every decision that
            doesn’t matter.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
