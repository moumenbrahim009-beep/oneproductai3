"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Check, Clock, Download, MessageCircle, RotateCcw } from "lucide-react";
import Reveal from "./ui/Reveal";
import GradientText from "./ui/GradientText";
import SectionLabel from "./ui/SectionLabel";

const setupSteps = [
  {
    icon: Download,
    title: "Load the Master Prompt",
    body: "One prompt, one paste, into free Claude or ChatGPT. The Coach now knows the 14-day protocol cold.",
  },
  {
    icon: MessageCircle,
    title: "Open the day in your portal",
    body: "Every day in the Notion portal has the day's objective, the script, and the done check.",
  },
  {
    icon: Clock,
    title: "Talk it through",
    body: "Stuck, lost, or doubting? The Coach catches you. Operator tone. No hype. Just the next step.",
  },
];

const traits = [
  "Always available · 24/7",
  "Knows all 14 days",
  "Free Claude or ChatGPT — no subscription",
];

type Message = { role: "user" | "coach"; text: string };

type Conversation = {
  initial: string;
  name: string;
  status: string;
  messages: Message[];
  footer: string;
};

const conversations: Conversation[] = [
  {
    initial: "S",
    name: "Sarah · 34 · USA",
    status: "Day 0 · No idea",
    messages: [
      {
        role: "user",
        text: "I want to launch something but I have no idea what. Every time I try to pick, I freeze.",
      },
      {
        role: "coach",
        text: "Good. You're not stuck on the idea — you're stuck on the person. Forget the product for now. Tell me one type of human you understand better than most. A group you've been part of, or watched closely.",
      },
      {
        role: "user",
        text: "Working moms who feel guilty about screen time.",
      },
      {
        role: "coach",
        text: "That's a person. Now we have something. The product will come from their actual problem, not your guesses. Open Day 1 in your portal. We're going to define this audience properly — in 45 minutes, you'll have a profile sharper than most founders have after a year.",
      },
    ],
    footer: "From idea-less to idea-locked in 4 minutes.",
  },
  {
    initial: "M",
    name: "Mike · 28 · USA",
    status: "Day 0 · Has idea, no confidence",
    messages: [
      {
        role: "user",
        text: "I have an idea — a Notion template for freelance designers to track invoices. But what if no one wants it? I don't want to waste two weeks.",
      },
      {
        role: "coach",
        text: "You won't waste two weeks. You'll waste four days — maximum. That's the whole point of Phase 2.",
      },
      {
        role: "user",
        text: "What do I do in Phase 2?",
      },
      {
        role: "coach",
        text: 'You don\'t build. You ask. Five real conversations with freelance designers. We have a script for it. If three out of five say "I\'d pay for that today," you build. If they don\'t, you pivot — with their words guiding you. Either way, you\'re ahead. Open Day 3.',
      },
    ],
    footer: "From doubt to direction in one exchange.",
  },
  {
    initial: "A",
    name: "Alex · 31 · USA",
    status: "Day 3 · Stuck",
    messages: [
      {
        role: "user",
        text: "I'm supposed to do five validation calls today and I can't find anyone. I've posted in two groups and gotten nothing. I'm losing the day.",
      },
      {
        role: "coach",
        text: 'Stop posting. Posting is passive. We need active outreach. Open the validation outreach template in your portal — the second one, "Direct message script v2."',
      },
      {
        role: "user",
        text: "Ok, I have it open.",
      },
      {
        role: "coach",
        text: 'Send it to ten people in the next thirty minutes. Pick from anyone who\'s posted in your target community in the last week — even a small comment counts. Don\'t aim for five "yes" calls. Aim for ten messages sent. The calls will come from the messages. Report back when ten are out.',
      },
    ],
    footer: "Unstuck without losing the day.",
  },
];

export default function CoachInRoom() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();

  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [typing, setTyping] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const conv = conversations[active];

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    const msgs = conversations[active].messages;
    if (reduce) {
      setTyping(false);
      setRevealed(msgs.length);
      return;
    }
    setRevealed(0);
    setTyping(false);
    let t = 350;
    msgs.forEach((m, i) => {
      if (m.role === "coach") {
        timers.current.push(setTimeout(() => setTyping(true), t));
        t += 950;
        timers.current.push(
          setTimeout(() => {
            setTyping(false);
            setRevealed(i + 1);
          }, t),
        );
        t += 450;
      } else {
        timers.current.push(setTimeout(() => setRevealed(i + 1), t));
        t += 750;
      }
    });
  }, [active, reduce, clearTimers]);

  useEffect(() => {
    if (!inView) return;
    play();
    return clearTimers;
  }, [play, inView, clearTimers]);

  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [revealed, typing, reduce]);

  const finished = revealed >= conv.messages.length;

  return (
    <section className="relative px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>The Coach</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              You&apos;re not alone with the protocol.
              <br />
              The Coach is <GradientText>in the room</GradientText>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Three real moments. Three real people. Watch what happens when the
              protocol meets the human.
            </p>
          </Reveal>
        </div>

        {/* How the Coach works — setup explainer */}
        <Reveal delay={0.12} className="mt-14">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            {setupSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="glass relative overflow-hidden rounded-2xl border border-white/8 p-5 transition-colors duration-300 hover:border-violet/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet via-indigo to-cyan text-white shadow-[0_4px_14px_-4px_rgba(139,92,246,0.7)]">
                      <Icon className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {s.body}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
            {traits.map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-ink-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan" />
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-20 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">
            See it in action — three real coaching moments
          </span>
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <div
            ref={sceneRef}
            className="grid gap-5 lg:grid-cols-[320px_1fr] lg:gap-8"
          >
            {/* Persona selector */}
            <div
              role="tablist"
              aria-label="Choose a conversation to replay"
              className="grid grid-cols-3 gap-3 lg:grid-cols-1"
            >
              {conversations.map((c, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={c.initial}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`group flex flex-col items-center gap-3 rounded-2xl p-4 text-center transition-all duration-300 lg:flex-row lg:text-left ${
                      isActive
                        ? "glass border-glow shadow-[0_10px_40px_-20px_rgba(139,92,246,0.8)]"
                        : "border border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-black transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-violet via-indigo to-cyan text-white shadow-[0_4px_20px_-4px_rgba(139,92,246,0.9)]"
                          : "bg-white/5 text-ink-muted group-hover:text-ink"
                      }`}
                    >
                      {c.initial}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-display text-sm font-bold text-ink">
                        {c.name}
                      </div>
                      <div className="mt-0.5 truncate text-[10px] uppercase tracking-wide text-ink-faint">
                        {c.status}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Conversation panel */}
            <div className="glass border-glow overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(139,92,246,0.6)]">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4 md:px-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet via-indigo to-cyan text-xs font-black text-white">
                  OPA
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-sm font-bold text-ink">
                    One Product AI · Coach
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-ink-faint">
                    <span className="h-2 w-2 rounded-full bg-go shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    Coaching {conv.name.split(" · ")[0]}
                  </div>
                </div>
                <button
                  onClick={play}
                  aria-label="Replay this conversation"
                  className="glass flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-muted transition-colors hover:text-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Replay
                </button>
              </div>

              {/* Thread */}
              <div
                ref={threadRef}
                aria-label={`Conversation with ${conv.name}`}
                className="flex h-[400px] flex-col gap-3 overflow-y-auto px-5 py-5 md:h-[440px] md:px-6"
              >
                <AnimatePresence initial={false}>
                  {conv.messages.slice(0, revealed).map((m, i) =>
                    m.role === "coach" ? (
                      <motion.div
                        key={`${active}-${i}`}
                        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-end gap-2"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-cyan text-[9px] font-black text-white">
                          OPA
                        </div>
                        <div className="max-w-[82%] break-words rounded-2xl rounded-bl-md border border-violet/30 bg-violet/10 px-4 py-3 text-sm leading-relaxed text-ink">
                          {m.text}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`${active}-${i}`}
                        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex justify-end"
                      >
                        <div className="max-w-[82%] break-words rounded-2xl rounded-br-md border border-white/10 bg-white/[0.05] px-4 py-3 text-sm leading-relaxed text-ink-muted">
                          {m.text}
                        </div>
                      </motion.div>
                    ),
                  )}
                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-end gap-2"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-cyan text-[9px] font-black text-white">
                        OPA
                      </div>
                      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-violet/30 bg-violet/10 px-4 py-4">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="typing-dot h-2 w-2 rounded-full bg-gradient-to-r from-violet to-cyan"
                            style={{ animationDelay: `${d * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Outcome footer */}
              <div className="border-t border-white/10 bg-white/[0.03] px-5 py-4 md:px-6">
                <div className="flex items-center justify-center gap-2 text-center">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                      finished
                        ? "bg-gradient-to-br from-violet to-cyan"
                        : "border border-white/15 bg-transparent"
                    }`}
                  >
                    <Check
                      className={`h-3 w-3 transition-colors duration-500 ${
                        finished ? "text-white" : "text-ink-faint"
                      }`}
                      strokeWidth={3.5}
                    />
                  </span>
                  <span
                    className={`text-sm italic transition-colors duration-500 ${
                      finished ? "text-ink" : "text-ink-faint"
                    }`}
                  >
                    {conv.footer}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-20 max-w-3xl text-center font-display text-2xl font-bold text-ink md:text-3xl">
            This is what you get for $49. A protocol, plus a Coach who knows it.
          </p>
          <p className="mt-4 text-center text-sm uppercase tracking-wide text-ink-faint">
            Free Claude or ChatGPT. The Master Prompt. The 14 days. Done.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
