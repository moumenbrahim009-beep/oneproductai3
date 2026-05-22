"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import GradientText from "./ui/GradientText";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stats = [
  { value: "$49", label: "one-time" },
  { value: "14", label: "days" },
  { value: "1", label: "product live" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* Graph-paper canvas */}
      <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-md border-2 border-ink bg-card px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink shadow-brut">
            <span className="h-2 w-2 bg-flare" />
            The One Product Launch Engine™
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl lg:text-8xl"
        >
          Launch your first
          <br />
          digital product in <GradientText>14 days</GradientText>.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl"
        >
          A complete, AI-guided protocol that takes you from idea to live
          product. No fluff. No theory. Just the engine.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Button href="/checkout" size="lg">
            Get Started — $49
            <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">
            One-time payment · 14-day money-back guarantee
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 grid w-full max-w-md grid-cols-3 gap-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border-2 border-ink bg-card px-3 py-4 shadow-brut"
            >
              <div className="font-display text-3xl font-extrabold text-flare">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
