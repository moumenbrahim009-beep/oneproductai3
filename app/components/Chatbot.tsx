"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";

type Message = { role: "bot" | "user"; text: string };
type QA = { q: string; a: string; cat: string };

const categories = [
  "Is it for me",
  "How the Coach works",
  "Time & effort",
  "Money",
  "What you get",
  "After you buy",
] as const;

const intro =
  "Hey. This is a preview chat — the real Coach lives inside Claude or ChatGPT after you buy. I’m here to answer the questions people actually ask before they commit. Pick a topic, tap a question — or just read along. No pressure, no marketing.";

const qa: QA[] = [
  // How the Coach works
  {
    cat: "How the Coach works",
    q: "Wait — what exactly is the Coach?",
    a: "A Master Prompt you load into free Claude or ChatGPT. Once loaded, the chat you’re talking to knows the full 14-day protocol — every phase, every day, every template. You use it like a senior operator who already shipped a product and remembers every step.",
  },
  {
    cat: "How the Coach works",
    q: "How do I actually use it day to day?",
    a: "Three steps. (1) Open the day in your Notion portal — it tells you the objective and the done check. (2) Paste the Master Prompt into Claude or ChatGPT. (3) Tell the Coach what day you’re on and where you’re stuck. It gives you the next move, not a lecture.",
  },
  {
    cat: "How the Coach works",
    q: "Is this chat I’m using the actual Coach?",
    a: "No — this is a preview to give you a feel for the tone. The real Coach lives inside your own Claude or ChatGPT account after you load the Master Prompt. Yours, private, always-on, and free to run.",
  },
  {
    cat: "How the Coach works",
    q: "What does the Coach do when I’m stuck?",
    a: "It diagnoses, then prescribes — like the Alex example on this page. No motivational speech. It opens the right template, narrows the next step to something doable in under an hour, and asks you to report back when it’s done.",
  },
  // Is it for me
  {
    cat: "Is it for me",
    q: "Is this for me?",
    a: "If you have ideas you don’t ship, yes. The protocol is built for people who get stuck in the loop. It removes the decisions that paralyze you and leaves only execution. You don’t need experience. You need 14 days.",
  },
  {
    cat: "Is it for me",
    q: "I’ve never sold anything online.",
    a: "Perfect — that’s exactly who this is for. You’re not starting with a product, you’re starting with a person and a problem. The protocol walks you through every step, and the Coach catches you when you wobble. First-timers finish this all the time.",
  },
  {
    cat: "Is it for me",
    q: "What if I don’t have an idea yet?",
    a: "Phase 1 handles that. You start with a person, not an idea. You define who you want to serve, then find what they actually struggle with. The “idea” emerges from real conversations in Phase 2 — not from your head.",
  },
  // Time & effort
  {
    cat: "Time & effort",
    q: "How much time does it take per day?",
    a: "1 to 2 hours. Some days are intense (validation calls), some are short (decision days). Total over 14 days is roughly 20 hours. One focused evening at a time.",
  },
  {
    cat: "Time & effort",
    q: "I have a full-time job — can I still do it?",
    a: "Yes. The protocol is built around 1–2 hour blocks, so it fits an evening or an early morning. You can also stretch the 14 days into a 21-day calendar. What matters is the sequence, not the speed.",
  },
  {
    cat: "Time & effort",
    q: "What if I miss a day?",
    a: "Nothing breaks. The protocol is a sequence, not a schedule. Pick up where you left off. The only rule is you don’t skip steps — each one feeds the next.",
  },
  // Money
  {
    cat: "Money",
    q: "Why is it only $49?",
    a: "Because it’s a system, not a 40-hour course you’ll never finish. We’d rather it be an easy yes and have you actually ship. One-time payment, lifetime access, no upsells.",
  },
  {
    cat: "Money",
    q: "Do I need to pay for Claude or ChatGPT?",
    a: "No. The Coach runs on the free tiers of Claude or ChatGPT. You load one Master Prompt and you’re set. No subscription required to complete the 14 days.",
  },
  {
    cat: "Money",
    q: "What if it doesn’t work — can I get a refund?",
    a: "Yes. 14-day money-back guarantee. If you follow the protocol and don’t have a product live by Day 14, email us within 30 days and the $49 is returned. No forms, no interrogation.",
  },
  // What you get
  {
    cat: "What you get",
    q: "What exactly is included?",
    a: "Four things: the complete 17-page protocol, the AI Coach Master Prompt, templates for every phase (audience profile, validation scripts, launch outreach), and binary done/not-done criteria for each day. Delivered as a Notion portal.",
  },
  {
    cat: "What you get",
    q: "How is this different from a course?",
    a: "Courses teach. This executes. You won’t watch hours of video. You’ll do one task per day, check a completion box, and move forward. By Day 14 you have a product live. Most courses leave you with notes.",
  },
  {
    cat: "What you get",
    q: "How is this different from free YouTube videos?",
    a: "YouTube gives you scattered tactics and no order. This gives you the exact sequence, the templates, the decision rules, and a Coach that keeps you on the path. Free content informs you. This makes you ship.",
  },
  {
    cat: "What you get",
    q: "What kind of product will I launch?",
    a: "One of three formats: a PDF guide, a template pack, or a prompt pack. Phase 1 helps you pick the right format for your specific audience — so it’s buildable in days, not months.",
  },
  // After you buy
  {
    cat: "After you buy",
    q: "How do I get access after I pay?",
    a: "Immediately. After payment you get an email with access to the Notion portal. You’re inside within 60 seconds and can start Day 1 right away.",
  },
  {
    cat: "After you buy",
    q: "Is there support or a community?",
    a: "The AI Coach is your primary guide — available 24/7 inside Claude or ChatGPT. For anything account-related, email hello@oneproductai.com. The product is designed to work fully on its own.",
  },
  {
    cat: "After you buy",
    q: "Will this work outside the US?",
    a: "Yes. The protocol works anywhere. Most examples use US audiences for market size, but the structure applies to any English-speaking market and uses tools available worldwide.",
  },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: intro },
  ]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const [activeCat, setActiveCat] = useState<string>(categories[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const remaining = qa.filter((item) => !asked.includes(item.q));
  const remainingInCat = remaining.filter((item) => item.cat === activeCat);
  const countFor = (cat: string) =>
    remaining.filter((item) => item.cat === cat).length;

  const handleAsk = (item: QA) => {
    if (typing || asked.includes(item.q)) return;
    const nextAsked = [...asked, item.q];
    setAsked(nextAsked);
    setMessages((prev) => [...prev, { role: "user", text: item.q }]);
    setTyping(true);

    // If this empties the current category, jump to the next topic with questions.
    const stillInCat = qa.some(
      (x) => x.cat === activeCat && !nextAsked.includes(x.q),
    );
    if (!stillInCat) {
      const nextCat = categories.find((c) =>
        qa.some((x) => x.cat === c && !nextAsked.includes(x.q)),
      );
      if (nextCat) setActiveCat(nextCat);
    }

    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: item.a }]);
    }, 800);
  };

  const allDone = remaining.length === 0;

  return (
    <section className="relative px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>Have Questions?</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Ask the <span className="text-gradient">engine.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-ink-muted">
              Every question people ask before they commit — answered straight.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
          <div className="glass border-glow overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(34,211,238,0.5)]">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet via-indigo to-cyan text-sm font-black text-white">
                AI
              </div>
              <div>
                <div className="font-display text-sm font-bold text-ink">
                  One Product AI
                </div>
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-ink-faint">
                  <span className="h-2 w-2 rounded-full bg-go shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  online · usually instant
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex h-80 flex-col gap-3 overflow-y-auto px-5 py-5"
            >
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "rounded-br-md bg-gradient-to-br from-violet to-indigo text-white"
                          : "rounded-bl-md border border-white/10 bg-white/[0.05] text-ink-muted"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-4 py-4">
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

            {/* Composer */}
            <div className="border-t border-white/10 bg-white/[0.03] px-5 py-4">
              {allDone ? (
                <span className="text-sm uppercase tracking-wide text-ink-faint">
                  That’s every question. The protocol covers the rest — start
                  Day 1.
                </span>
              ) : (
                <>
                  {/* Category tabs */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const count = countFor(cat);
                      const isActive = cat === activeCat;
                      return (
                        <button
                          key={cat}
                          onClick={() => count > 0 && setActiveCat(cat)}
                          disabled={count === 0}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-violet to-cyan text-white"
                              : count === 0
                                ? "cursor-not-allowed text-ink-faint/40 line-through"
                                : "border border-white/15 text-ink-muted hover:text-ink"
                          }`}
                        >
                          {cat}
                          {count > 0 && (
                            <span className="ml-1.5 opacity-70">{count}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Question chips */}
                  <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto">
                    {remainingInCat.map((item) => (
                      <button
                        key={item.q}
                        onClick={() => handleAsk(item)}
                        disabled={typing}
                        className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-ink-muted transition-all duration-300 hover:border-violet/60 hover:bg-violet/10 hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {item.q}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
