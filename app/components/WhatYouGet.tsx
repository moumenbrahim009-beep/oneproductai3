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
      className="relative px-6 py-24 md:px-8 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>Included</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
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
          {cards.map(({ Icon, title, body }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border-subtle bg-bg-secondary p-7 transition-colors hover:border-border-medium"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-bg-tertiary">
                <Icon className="h-5 w-5 text-accent-purple" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-text-primary">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-text-secondary">{body}</p>
            </motion.div>
          ))}
        </motion.div>

        <FadeIn delay={0.1}>
          <p className="mt-12 text-center text-lg text-text-secondary">
            Delivered as a Notion portal. Lifetime access. One-time payment.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
