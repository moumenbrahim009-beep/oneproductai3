"use client";

import { motion, type Variants } from "framer-motion";
import Button from "./ui/Button";
import GradientText from "./ui/GradientText";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb-drift-a absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-accent-purple/25 blur-[120px]" />
        <div className="orb-drift-b absolute -bottom-40 -right-32 h-[34rem] w-[34rem] rounded-full bg-accent-blue/25 blur-[120px]" />
      </div>
      {/* Dot grid */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <span className="gradient-text text-sm font-semibold uppercase tracking-widest opacity-80">
            The One Product Launch Engine™
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 text-6xl font-extrabold leading-none tracking-tight text-text-primary md:text-7xl lg:text-8xl"
        >
          Launch your first
          <br />
          digital product in <GradientText>14 days</GradientText>.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-xl leading-relaxed text-text-secondary"
        >
          A complete, AI-guided protocol that takes you from idea to live
          product. No fluff. No theory. Just the engine.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center">
          <Button href="/checkout" size="lg">
            Get Started — $49
          </Button>
          <p className="mt-4 text-sm text-text-tertiary">
            One-time payment · 14-day money-back guarantee
          </p>
        </motion.div>

        <motion.p variants={item} className="mt-10 text-sm text-text-tertiary">
          Used by creators who actually ship.
        </motion.p>
      </motion.div>
    </section>
  );
}
