"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";

type Phase = {
  num: string;
  name: string;
  tagline: string;
  range: string;
  color: "violet" | "indigo" | "cyan";
  days: { n: number; o: string }[];
};

const phases: Phase[] = [
  {
    num: "01",
    name: "Product Profile™",
    tagline: "Define who. Define what.",
    range: "Days 1–2",
    color: "violet",
    days: [
      { n: 1, o: "Define the audience" },
      { n: 2, o: "Define the problem" },
    ],
  },
  {
    num: "02",
    name: "Market Proof",
    tagline: "Validate before you build.",
    range: "Days 3–4",
    color: "indigo",
    days: [
      { n: 3, o: "Direct validation" },
      { n: 4, o: "Decide — build, pivot, abandon" },
    ],
  },
  {
    num: "03",
    name: "Build & Launch",
    tagline: "Build the smallest. Ship the soonest.",
    range: "Days 5–14",
    color: "cyan",
    days: [
      { n: 5, o: "Build core, part 1" },
      { n: 6, o: "Build core, part 2" },
      { n: 7, o: "Complete the product, part 1" },
      { n: 8, o: "Complete the product, part 2" },
      { n: 9, o: "Make it buyable" },
      { n: 10, o: "Connect and test, part 1" },
      { n: 11, o: "Connect and test, part 2" },
      { n: 12, o: "Soft outreach, part 1" },
      { n: 13, o: "Soft outreach, part 2" },
      { n: 14, o: "Launch" },
    ],
  },
];

const palette = {
  violet: {
    glow: "rgba(139,92,246,0.55)",
    ringGlow: "shadow-[0_6px_20px_-6px_rgba(139,92,246,0.7)]",
    border: "border-violet/30",
    dot: "from-violet to-indigo",
    text: "text-violet",
    chip: "bg-violet/15 text-violet border border-violet/30",
    halo: "bg-violet/20",
  },
  indigo: {
    glow: "rgba(99,102,241,0.55)",
    ringGlow: "shadow-[0_6px_20px_-6px_rgba(99,102,241,0.7)]",
    border: "border-indigo/30",
    dot: "from-indigo to-cyan",
    text: "text-indigo",
    chip: "bg-indigo/15 text-indigo border border-indigo/30",
    halo: "bg-indigo/20",
  },
  cyan: {
    glow: "rgba(34,211,238,0.55)",
    ringGlow: "shadow-[0_6px_20px_-6px_rgba(34,211,238,0.7)]",
    border: "border-cyan/30",
    dot: "from-cyan to-pink",
    text: "text-cyan",
    chip: "bg-cyan/15 text-cyan border border-cyan/30",
    halo: "bg-cyan/20",
  },
};

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="timeline"
      className="relative scroll-mt-24 px-6 py-28 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>The Path</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Day by day. <span className="text-gradient">No guesswork.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Three phases. Fourteen days. Every day has one objective and a
              binary done check — no maybes.
            </p>
          </Reveal>
        </div>

        {/* Phase summary chips */}
        <Reveal delay={0.15} className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
            {phases.map((p) => {
              const c = palette[p.color];
              return (
                <div
                  key={p.num}
                  className={`flex items-center gap-2 rounded-full ${c.chip} px-3.5 py-1.5`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${c.dot}`}
                    style={{ boxShadow: `0 0 8px ${c.glow}` }}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                    {p.range}
                  </span>
                  <span className="text-xs font-semibold text-ink">
                    {p.name}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Timeline */}
        <div ref={ref} className="relative mt-16">
          {/* Spine */}
          <div className="absolute bottom-4 left-[18px] top-4 w-px bg-white/10 md:left-6" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[18px] top-4 w-px origin-top bg-gradient-to-b from-violet via-indigo to-cyan md:left-6"
          />

          <div className="space-y-14">
            {phases.map((p, i) => {
              const c = palette[p.color];
              return (
                <Reveal key={p.num} delay={i * 0.05}>
                  <div className="relative pl-12 md:pl-20">
                    {/* Spine dot with halo */}
                    <div className="absolute left-[18px] top-4 -translate-x-1/2 md:left-6">
                      <div
                        className={`absolute -inset-2 rounded-full ${c.halo} blur-md`}
                      />
                      <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/15 bg-base">
                        <div
                          className={`h-2 w-2 rounded-full bg-gradient-to-br ${c.dot}`}
                          style={{ boxShadow: `0 0 12px ${c.glow}` }}
                        />
                      </div>
                    </div>

                    {/* Phase header */}
                    <div className="mb-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${c.chip}`}
                        >
                          Phase {p.num}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
                          {p.range}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-extrabold text-ink md:text-3xl">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 text-base text-ink-muted">
                        {p.tagline}
                      </p>
                    </div>

                    {/* Day cards */}
                    <div
                      className={`grid gap-2.5 ${
                        p.days.length > 4
                          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                          : "grid-cols-1 sm:grid-cols-2"
                      }`}
                    >
                      {p.days.map((d, di) => (
                        <motion.div
                          key={d.n}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.4,
                            delay: di * 0.04,
                            ease: "easeOut",
                          }}
                          className={`glass group relative flex items-center gap-3 overflow-hidden rounded-2xl border ${c.border} p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30`}
                        >
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.dot} font-display text-xs font-black text-white ${c.ringGlow}`}
                          >
                            {d.n.toString().padStart(2, "0")}
                          </span>
                          <div className="min-w-0">
                            <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
                              Day {d.n}
                            </div>
                            <div className="mt-0.5 truncate text-sm font-medium text-ink lg:text-[13px] xl:text-sm">
                              {d.o}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-20 max-w-2xl text-center font-display text-xl font-bold text-ink md:text-2xl">
            The timeline ends. Your product begins.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
