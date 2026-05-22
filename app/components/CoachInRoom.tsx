"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import FadeIn from "./ui/FadeIn";
import GradientText from "./ui/GradientText";
import SectionLabel from "./ui/SectionLabel";

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

  // Keep the latest message in view as the thread fills in.
  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [revealed, typing, reduce]);

  const finished = revealed >= conv.messages.length;

  return (
    <section className="relative px-6 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40 lg:pb-40 lg:pt-48">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>The Coach</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              You&apos;re not alone with the protocol.
              <br />
              The Coach is <GradientText>in the room</GradientText>.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-xl font-medium text-text-secondary md:text-2xl">
              Three real moments. Three real people. Watch what happens when the
              protocol meets the human.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="mt-16">
          <div
            ref={sceneRef}
            className="grid gap-5 lg:grid-cols-[330px_1fr] lg:gap-8"
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
                    className={`group relative rounded-2xl p-[1px] text-left transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-purple-500/60 to-blue-500/60 shadow-[0_0_30px_rgba(139,92,246,0.18)]"
                        : "bg-border-subtle hover:bg-border-strong"
                    }`}
                  >
                    <div className="flex h-full flex-col items-center gap-3 rounded-2xl bg-bg-secondary p-4 text-center lg:flex-row lg:text-left">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold transition-all duration-300 ${
                          isActive
                            ? "gradient-bg text-white"
                            : "bg-bg-tertiary text-text-secondary group-hover:text-text-primary"
                        }`}
                      >
                        {c.initial}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-text-primary">
                          {c.name}
                        </div>
                        <div className="mt-0.5 truncate text-xs uppercase tracking-wide text-text-tertiary">
                          {c.status}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Conversation panel */}
            <div className="rounded-3xl bg-gradient-to-br from-purple-500/40 to-blue-500/40 p-[1px] shadow-[0_0_60px_rgba(99,102,241,0.15)]">
              <div className="flex h-full flex-col rounded-3xl bg-bg-secondary">
                {/* Panel header */}
                <div className="flex items-center gap-3 border-b border-border-subtle px-5 py-4 md:px-6">
                  <div className="gradient-bg flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    OPA
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-text-primary">
                      One Product AI · Coach
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
                      <span className="h-2 w-2 rounded-full bg-success" />
                      Coaching {conv.name.split(" · ")[0]}
                    </div>
                  </div>
                  <button
                    onClick={play}
                    aria-label="Replay this conversation"
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-border-medium px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-accent-purple hover:text-text-primary"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Replay
                  </button>
                </div>

                {/* Thread */}
                <div
                  ref={threadRef}
                  aria-label={`Conversation with ${conv.name}`}
                  className="flex h-[400px] flex-col gap-3 overflow-y-auto px-5 py-5 md:h-[440px] md:px-6 [scrollbar-width:thin]"
                >
                  <AnimatePresence initial={false}>
                    {conv.messages.slice(0, revealed).map((m, i) =>
                      m.role === "coach" ? (
                        <motion.div
                          key={`${active}-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="flex items-end gap-2"
                        >
                          <div className="gradient-bg mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white">
                            OPA
                          </div>
                          <div className="max-w-[82%] break-words rounded-2xl rounded-bl-md border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 px-4 py-3 text-sm leading-relaxed text-text-primary">
                            {m.text}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`${active}-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="flex justify-end"
                        >
                          <div className="max-w-[82%] break-words rounded-2xl rounded-br-md bg-bg-tertiary px-4 py-3 text-sm leading-relaxed text-text-secondary">
                            {m.text}
                          </div>
                        </motion.div>
                      ),
                    )}
                    {typing && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-end gap-2"
                      >
                        <div className="gradient-bg mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white">
                          OPA
                        </div>
                        <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 px-4 py-4">
                          {[0, 1, 2].map((d) => (
                            <span
                              key={d}
                              className="typing-dot h-2 w-2 rounded-full bg-accent-purple"
                              style={{ animationDelay: `${d * 0.15}s` }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Outcome footer */}
                <div className="border-t border-border-subtle px-5 py-4 md:px-6">
                  <div className="flex items-center justify-center gap-2 text-center transition-opacity duration-500">
                    <Check
                      className={`h-4 w-4 shrink-0 transition-colors duration-500 ${
                        finished ? "text-success" : "text-text-tertiary/40"
                      }`}
                    />
                    <span
                      className={`text-sm italic transition-colors duration-500 ${
                        finished ? "text-text-secondary" : "text-text-tertiary/40"
                      }`}
                    >
                      {conv.footer}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-20 max-w-3xl text-center text-2xl font-medium text-text-primary">
            This is what you get for $49. A protocol, plus a Coach who knows it.
          </p>
          <p className="mt-4 text-center text-base text-text-tertiary">
            Free Claude or ChatGPT. The Master Prompt. The 14 days. Done.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
