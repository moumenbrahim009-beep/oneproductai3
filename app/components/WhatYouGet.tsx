"use client";

import { motion } from "framer-motion";
import { BookOpen, Bot, FileText, CheckCircle } from "lucide-react";
import FadeIn from "./ui/FadeIn";
import SectionLabel from "./ui/SectionLabel";

const cards = [
  {
    Icon: BookOpen,
    title: "The Complete Protocol",
    body: "17 pages covering every day of the 14-day launch. Each page tells you exactly what to do and what “done” looks like.",
  },
  {
    Icon: Bot,
    title: "Your AI Coach Prompt",
    body: "A pre-built prompt you load into free Claude or ChatGPT. It knows the protocol and guides you through each phase like a senior operator.",
  },
  {
    Icon: FileText,
    title: "Templates for Each Phase",
    body: "Audience profile, validation scripts, launch outreach, refund handling. No blank pages. Start from a structure that works.",
  },
  {
    Icon: CheckCircle,
    title: "Done/Not-Done Criteria",
    body: "Every day has a binary completion check. No “I think I’m done.” Either you meet the criteria or you don’t.",
  },
];

export default function WhatYouGet() {
  return (
    <section
      id="what-you-get"
      className="relative scroll-mt-24 border-t-2 border-ink bg-bone px-6 py-24 md:px-8 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>Included</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Everything you need. Nothing you don’t.
            </h2>
          </FadeIn>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="flex flex-col rounded-xl border-2 border-ink bg-card p-7 shadow-brut transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-md"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border-2 border-ink bg-flare">
                  <Icon className="h-5 w-5 text-paper" strokeWidth={2.25} />
                </div>
                <span className="font-mono text-xs font-bold text-ink-faint">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold text-ink">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
            </motion.div>
          ))}
        </motion.div>

        <FadeIn delay={0.1}>
          <p className="mt-12 text-center font-mono text-sm uppercase tracking-wide text-ink-faint">
            Delivered as a Notion portal. Lifetime access. One-time payment.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
