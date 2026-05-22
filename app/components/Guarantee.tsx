"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";

export default function Guarantee() {
  return (
    <section className="relative px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="glass border-glow relative overflow-hidden rounded-[2rem] p-10 shadow-[0_30px_90px_-40px_rgba(139,92,246,0.7)] md:p-14">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-violet/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-cyan/20 blur-3xl" />
            <div className="relative grid items-center gap-12 md:grid-cols-2">
              <div>
                <SectionLabel>The Promise</SectionLabel>
                <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink">
                  14 days or your{" "}
                  <span className="text-gradient">money back.</span>
                </h2>
                <p className="mt-6 leading-relaxed text-ink-muted">
                  If you follow the protocol and don’t have a product live by
                  Day 14, request a full refund. No forms. No interrogation.
                  Just email us within 30 days of purchase and the $49 is
                  returned.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-violet via-indigo to-cyan shadow-[0_0_60px_-10px_rgba(139,92,246,0.9)]"
                >
                  <ShieldCheck
                    className="h-14 w-14 text-white"
                    strokeWidth={1.75}
                  />
                </motion.div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                  $49 · 14-day refund · Lifetime access
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
