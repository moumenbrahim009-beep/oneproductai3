"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "./ui/Button";
import Counter from "./ui/Counter";
import GradientText from "./ui/GradientText";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(139,92,246,0.16), transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
    >
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan" />
              </span>
              The One Product Launch Engine™
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-8 font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl lg:text-8xl"
          >
            Launch your first
            <br />
            digital product in{" "}
            <GradientText className="inline-block">14 days</GradientText>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
          >
            A complete, AI-guided protocol that takes you from idea to live
            product. No fluff. No theory. Just the engine.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <Button size="lg">
              Get Started — $49
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <p className="text-sm text-ink-faint">
              One-time payment · 14-day money-back guarantee
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="mx-auto mt-16 grid w-full max-w-lg grid-cols-3 gap-4"
          >
            {[
              { node: <>$<Counter to={49} /></>, label: "one-time" },
              { node: <Counter to={14} />, label: "days to live" },
              { node: <>1</>, label: "product shipped" },
            ].map((s, i) => (
              <div
                key={i}
                className="glass border-glow rounded-2xl px-3 py-5"
              >
                <div className="font-display text-3xl font-extrabold text-gradient">
                  {s.node}
                </div>
                <div className="mt-1.5 text-[10px] uppercase tracking-widest text-ink-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="hint-bounce h-6 w-6 text-ink-faint" />
      </motion.div>
    </section>
  );
}
