# ONE PRODUCT AI — LANDING PAGE BRIEF

**For:** Claude Code
**Project:** oneproductai3
**Stack:** Next.js 16 + TypeScript + Tailwind CSS + Framer Motion
**Date:** May 2026

---

## 1. PROJECT CONTEXT

### What is "One Product AI"?

One Product AI is a digital product (priced at $49 one-time) that helps aspiring creators launch their first digital product in 14 days. It is sold to a US-based audience.

**The promise:** "Launch your first digital product in 14 days — or your money back."

**What the customer receives:**
1. A Notion portal with 17 pages covering the complete 14-day protocol
2. A Master AI Coach prompt (works with free Claude/ChatGPT)
3. Templates for each phase (audience definition, validation, building, launch)
4. Daily completion criteria

**The methodology — "The One Product Launch Engine™":**
- **Phase 1 — Product Profile™** (Days 1-2): Define audience and problem
- **Phase 2 — Market Proof** (Days 3-4): Validate demand before building
- **Phase 3 — Build & Launch** (Days 5-14): Create and ship

### Who is the target customer?

US-based individuals (any age, any background) who:
- Have ideas for digital products but never ship
- Are overwhelmed by complexity and tool-fatigue
- Want clear, structured guidance — not theory
- Are willing to invest $49 to break their pattern of inaction

### Brand voice (CRITICAL)

- **Tone:** Calm, declarative, operating-system-like
- **NO hype:** No exclamation marks, no income claims, no "make $10K in 30 days"
- **Honest:** "Launch guaranteed. Income is not." This is repeated implicitly throughout.
- **Confident, not aggressive:** Like an older brother who has done it explaining the path
- **Anti-guru:** The opposite of typical infoproduct landing pages

---

## 2. DESIGN SYSTEM

### Aesthetic direction

**Reference brands:** Anthropic.com, Claude.ai, Linear.app (dark mode), Vercel

**Overall feeling:** Premium AI product, sophisticated, intelligent, calm.

### Color palette

```css
/* Backgrounds */
--bg-primary: #0A0A0F;          /* Almost-black, slight blue tint */
--bg-secondary: #12121A;        /* Slightly lighter for cards */
--bg-tertiary: #1A1A24;         /* For elevated elements */

/* Text */
--text-primary: #FAFAFA;        /* Main text, high contrast */
--text-secondary: #A1A1AA;      /* Muted text */
--text-tertiary: #71717A;       /* Very muted, captions */

/* Accent gradient (THE signature) */
--gradient-primary: linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%);
/* Purple → Indigo → Blue */

/* Solid accents */
--accent-purple: #8B5CF6;
--accent-indigo: #6366F1;
--accent-blue: #3B82F6;

/* Borders */
--border-subtle: rgba(255, 255, 255, 0.06);
--border-medium: rgba(255, 255, 255, 0.10);
--border-strong: rgba(255, 255, 255, 0.16);

/* States */
--success: #10B981;
--warning: #F59E0B;
```

### Typography

**Primary font:** Inter (from Google Fonts via `next/font`)

**Display font (for huge headlines):** Inter Tight (tighter letter-spacing version) OR keep Inter with manual letter-spacing.

**Font weights to use:**
- 400 (regular) — body text
- 500 (medium) — small accents
- 600 (semibold) — subheadings, important UI
- 700 (bold) — section headlines
- 800 (extrabold) — hero headlines only

**Type scale:**

```
Hero headline:        text-6xl md:text-7xl lg:text-8xl, font-extrabold, tracking-tight, leading-none
Section headlines:    text-4xl md:text-5xl, font-bold, tracking-tight
Subheadlines:         text-xl md:text-2xl, font-medium, text-secondary
Body large:           text-lg, leading-relaxed
Body:                 text-base, leading-relaxed
Small/caption:        text-sm, text-tertiary
```

**Letter spacing:**
- Large headlines: `tracking-tight` (-0.02em)
- Body: default
- Small caps/labels: `tracking-widest uppercase`

### Spacing

- Use Tailwind's default scale
- Section vertical padding: `py-24 md:py-32 lg:py-40`
- Container max-width: `max-w-7xl mx-auto px-6 md:px-8`
- Content max-width for text: `max-w-3xl` or `max-w-4xl`

### Visual effects

**Gradients used as:**
1. Text gradient on key headlines (using `bg-clip-text text-transparent bg-gradient-to-r`)
2. Subtle background orbs/glows behind sections
3. Button backgrounds
4. Border gradients on featured cards

**Glow effect for buttons:**

```css
box-shadow: 0 0 40px rgba(139, 92, 246, 0.3);
```

**Subtle noise/grain texture:** Add a very subtle SVG noise overlay to the page background for that premium "filmic" feel (optional but nice).

**Grid background:** A subtle dot-grid background pattern for hero and certain sections (like Linear).

### Animation system

**Library:** Framer Motion

**Patterns:**

1. **Scroll-triggered fade-in-up** (every section's content):

```jsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.2 }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

2. **Staggered children** for lists/cards (each child delayed by 0.1s)

3. **Subtle parallax** on hero background orbs (move slightly opposite to scroll)

4. **Button hover:** scale up to 1.02 + brighter glow

5. **Card hover:** lift up by 4px + border becomes more visible

6. **Smooth scroll** between sections (use CSS `scroll-behavior: smooth`)

**Animation timing rule:** Nothing should take longer than 0.8s. Everything must feel snappy.

---

## 3. PAGE STRUCTURE — 11 SECTIONS

Build these in order. Each section is a separate React component in `/app/components/`.

### Section 1: Navigation (sticky)

**File:** `Nav.tsx`
**Position:** Fixed top, transparent background with backdrop-blur on scroll

**Content:**
- Left: Logo "One Product AI" (just text, font-semibold, tracking-tight)
- Right (desktop only): "How it works", "What you get", "FAQ" (smooth scroll to sections)
- Far right: CTA button "Get Started — $49"

**Behavior:**
- Transparent at top of page
- Add `backdrop-blur-xl` + subtle border-bottom when user scrolls > 20px
- On mobile: hide center links, show only logo + CTA

---

### Section 2: Hero

**File:** `Hero.tsx`
**Position:** Full viewport height (`min-h-screen`)

**Layout:** Centered vertically and horizontally. Single column.

**Background:**
- Dark `#0A0A0F`
- Two large gradient orbs (purple and blue) blurred heavily, positioned top-left and bottom-right, slowly drifting
- Subtle dot-grid overlay

**Content (top to bottom):**

1. **Small label** (tracking-widest uppercase, gradient text, opacity 0.8):
   `THE ONE PRODUCT LAUNCH ENGINE™`

2. **Hero headline** (massive, 2 lines):
   `Launch your first`
   `digital product in 14 days.`

   → The phrase "14 days" should be gradient text. Everything else is white.

3. **Subheadline** (text-xl, max-w-2xl, text-secondary):
   `A complete, AI-guided protocol that takes you from idea to live product. No fluff. No theory. Just the engine.`

4. **CTA button** (large, gradient background, glow):
   `Get Started — $49`
   → Smaller text below: `One-time payment · 14-day money-back guarantee`

5. **Trust microcopy** below CTA (text-sm, text-tertiary):
   `Used by creators who actually ship.`

**Animation:** All elements fade in with staggered timing (label first, then headline word-by-word, then sub, then button).

---

### Section 3: The Problem

**File:** `Problem.tsx`

**Background:** Same dark, but transition slightly darker `#08080D`.

**Content:**

**Pre-headline label:** `THE PATTERN` (tracking-widest uppercase, gradient)

**Headline:**
`You have ideas. You start. You stop.`

**Subheadline (max-w-3xl):**
`Notebooks full of half-built projects. Domains you bought and forgot. Tools you signed up for and abandoned. The problem isn't your ideas. The problem is the loop.`

**Below: 3 columns showing the loop**

Each column is a card with:
- A small number (1, 2, 3) in gradient
- A short title
- One sentence of body

```
01 — IDEA
"This time it's different."

02 — START
Buying tools. Watching tutorials. Setting up.

03 — STALL
Something feels off. You research more. You move on.
```

**Closing line below the cards (text-2xl, max-w-3xl, centered):**
`One Product AI breaks the loop by removing every decision that doesn't matter.`

**Animation:** Cards stagger in left-to-right when scrolled into view.

---

### Section 4: The Solution

**File:** `Solution.tsx`

**Pre-headline label:** `THE ENGINE` (tracking-widest uppercase, gradient)

**Headline:**
`A system, not a course.`

**Subheadline (max-w-3xl):**
`One Product AI is an operating system for your launch. You don't learn theory. You execute a sequence. Each day has one objective. Each objective has clear completion criteria.`

**Below: 2-column comparison table**

Two cards side by side:

**Left card — "What most courses give you"** (muted styling, gray border)
- Hours of video to watch
- Concepts to internalize
- Tools to compare
- Decisions to make alone
- Vague homework
- Hope you finish

**Right card — "What One Product AI gives you"** (gradient border, slight glow)
- One objective per day
- Pre-built templates
- An AI coach that knows the protocol
- Done/not-done criteria
- A 14-day timeline that ends
- Your product, live

**Animation:** Both cards slide in from opposite sides.

---

### Section 5: How It Works (The 3 Phases)

**File:** `HowItWorks.tsx`

**Pre-headline label:** `THE PROTOCOL`

**Headline:**
`Three phases. Fourteen days. One product live.`

**Below: 3 large phase cards stacked vertically (or in a row on desktop)**

Each card has:
- Phase number (huge gradient text, e.g., "01")
- Phase name
- Day range
- Description
- 2-3 bullet points of what happens in that phase

**Phase 1 — Product Profile™**
**Days 1-2**
Define exactly who you serve and what specific problem you solve. No more "I'll figure it out as I go." By Day 2, you have a one-page profile that drives every other decision.
- Day 1: Define the audience
- Day 2: Define the problem

**Phase 2 — Market Proof**
**Days 3-4**
Validate that your audience will actually buy before you build. Direct outreach, real conversations, decision criteria. By Day 4, you either commit or pivot — based on evidence, not feelings.
- Day 3: Direct validation
- Day 4: Decide (build / pivot / abandon)

**Phase 3 — Build & Launch**
**Days 5-14**
Build the smallest version that delivers your promise. Connect a payment system. Soft-launch to your validated audience. By Day 14, you have a buyable product and your first outreach.
- Days 5-8: Build the core
- Days 9-11: Make it buyable
- Days 12-14: Soft launch

**Animation:** Each phase card fades up sequentially as you scroll. Numbers animate in with a slight scale effect.

---

### Section 6: What You Get

**File:** `WhatYouGet.tsx`

**Pre-headline label:** `INCLUDED`

**Headline:**
`Everything you need. Nothing you don't.`

**Below: 4 feature cards in a 2x2 grid (or 4-column on large screens)**

Each card:
- Small icon (use Lucide React icons)
- Card title (text-xl, font-semibold)
- Body (text-secondary)

**Card 1 — Notion Portal**
*Icon: BookOpen*
Title: `The Complete Protocol`
Body: `17 pages covering every day of the 14-day launch. Each page tells you exactly what to do and what "done" looks like.`

**Card 2 — Master AI Coach**
*Icon: Bot*
Title: `Your AI Coach Prompt`
Body: `A pre-built prompt you load into free Claude or ChatGPT. It knows the protocol and guides you through each phase like a senior operator.`

**Card 3 — Templates**
*Icon: FileText*
Title: `Templates for Each Phase`
Body: `Audience profile, validation scripts, launch outreach, refund handling. No blank pages. Start from a structure that works.`

**Card 4 — Completion Criteria**
*Icon: CheckCircle*
Title: `Done/Not-Done Criteria`
Body: `Every day has a binary completion check. No "I think I'm done." Either you meet the criteria or you don't.`

**Below the grid, a single line (text-lg, text-secondary, centered):**
`Delivered as a Notion portal. Lifetime access. One-time payment.`

**Animation:** Cards fade up staggered.

---

### Section 7: The 14-Day Timeline (Visual)

**File:** `Timeline.tsx`

**Pre-headline label:** `THE PATH`

**Headline:**
`Day by day. No guesswork.`

**Below: A visual horizontal timeline (vertical on mobile)**

14 nodes connected by a thin gradient line. Each node is a small dot that, when hovered (or always visible on mobile), shows:
- Day number
- One-line objective

Days:

```
Day 1  — Define the audience
Day 2  — Define the problem
Day 3  — Direct validation
Day 4  — Decide
Day 5  — Build core, part 1
Day 6  — Build core, part 2
Day 7  — Complete the product, part 1
Day 8  — Complete the product, part 2
Day 9  — Make it buyable
Day 10 — Connect and test, part 1
Day 11 — Connect and test, part 2
Day 12 — Soft outreach, part 1
Day 13 — Soft outreach, part 2
Day 14 — Launch
```

**Implementation note:** Use a horizontal scroll on mobile if needed, or stack vertically. The line connecting the dots should have a subtle gradient animation (purple → blue) that flows from left to right slowly.

**Below the timeline (text-lg, max-w-2xl, centered):**
`The timeline ends. Your product begins.`

---

### Section 8: Chatbot Section (the fake chatbot)

**File:** `Chatbot.tsx`

**Pre-headline label:** `HAVE QUESTIONS?`

**Headline:**
`Ask the engine.`

**Subheadline:**
`A taste of what it feels like to work with the protocol.`

**Below: A chat interface mockup**

**Visual design:**
- Centered card, max-w-2xl
- Dark background, subtle border, slight gradient glow
- Header: gradient avatar circle + "One Product AI" + green dot ("online")
- Chat messages stacked

**Pre-filled chat (already showing when loaded):**

Bot message:
`Hey. I'm here to help you understand if One Product AI is right for you. Pick a question below — or ask anything.`

**Below the chat: 4 clickable "suggestion chips":**
1. `Is this for me?`
2. `How is this different from a course?`
3. `What if I don't have an idea yet?`
4. `What if it doesn't work?`

When the user clicks a chip:
1. The chip appears as the user's message
2. After 800ms of "typing" indicator (3 animated dots), the bot's pre-written answer appears

**Pre-written answers:**

**Q: "Is this for me?"**
A: `If you have ideas you don't ship, yes. The protocol is built specifically for people who get stuck in the loop. It removes the decisions that paralyze you and leaves only execution. You don't need experience. You need 14 days.`

**Q: "How is this different from a course?"**
A: `Courses teach. This executes. You won't watch hours of video. You'll do one task per day, check a completion box, and move forward. By Day 14, you have a product live. Most courses leave you with notes.`

**Q: "What if I don't have an idea yet?"**
A: `Phase 1 handles that. You start with a person, not an idea. You define who you want to serve, then you find what they actually struggle with. The "idea" emerges from real conversations in Phase 2 — not from your head.`

**Q: "What if it doesn't work?"**
A: `Two answers. Operationally: 14-day refund, no questions. Philosophically: the protocol guarantees a launch, not an income. If you follow the 14 days, your product will be live and buyable. What it earns depends on your market — and that's what Phase 2 helps you choose well.`

**Implementation note:** Keep all chat state in React (useState). No backend, no API. Just visual + timed typing animation.

---

### Section 9: Guarantee

**File:** `Guarantee.tsx`

**Background:** Slightly elevated card with gradient border on top of the dark background.

**Layout:** Two-column on desktop, stacked on mobile.

**Left column:**
- Small label: `THE PROMISE`
- Headline (text-4xl, font-bold): `14 days or your money back.`
- Body (text-secondary): `If you follow the protocol and don't have a product live by Day 14, request a full refund. No forms. No interrogation. Just email us within 30 days of purchase and the $49 is returned.`

**Right column:**
- A clean visual badge or icon (large Lucide ShieldCheck or similar, in gradient)
- Below: `$49 · 14-day refund · Lifetime access`

**Animation:** Subtle glow pulse on the guarantee badge.

---

### Section 10: FAQ

**File:** `FAQ.tsx`

**Pre-headline label:** `QUESTIONS`

**Headline:**
`Things people ask.`

**Below: An accordion of FAQs (click to expand)**

Implementation: Use a controlled state to expand one at a time, smooth height animation.

**FAQs:**

**Q: How much time does this take per day?**
A: 1 to 2 hours, depending on the day. Some days are intense (validation calls). Some are short (decision days). The total time investment over 14 days is roughly 20 hours.

**Q: Do I need a product idea before I start?**
A: No. Phase 1 helps you define the audience and problem first. The idea emerges from that work.

**Q: What if I miss a day?**
A: The protocol is flexible. You can take a 14-day calendar period or stretch it to 21. What matters is following the sequence, not the calendar.

**Q: Do I need a website or technical skills?**
A: No. The protocol uses simple no-code tools (Gumroad, Payhip, Notion). If you can type and click, you can ship.

**Q: What kind of product will I launch?**
A: One of three formats: a PDF guide, a template pack, or a prompt pack. The protocol helps you choose the right format for your audience in Phase 1.

**Q: Will this work outside the US?**
A: The protocol works anywhere. Most examples use US audiences because of market size, but the structure applies to any English-speaking market.

**Q: What if I already have a product I'm trying to launch?**
A: The protocol is designed for first products. If you already have one in progress, you can use Phases 2 and 3 to validate and launch it — but you'll get most value from running the full 14 days on a new product.

**Q: Is there a community?**
A: Not yet. This is a self-contained protocol. The AI Coach is your guide. We may add a community later, but the product is designed to work without one.

**Q: Can I share my access with someone else?**
A: The portal is for personal use. If a partner or co-founder wants to use it, please purchase a second copy.

**Q: How do I get the product after I pay?**
A: Immediately after payment, you receive an email with access to the Notion portal. You're in within 60 seconds.

---

### Section 11: Final CTA

**File:** `FinalCTA.tsx`

**Background:** Same dark, but with a stronger gradient orb behind everything for emphasis.

**Layout:** Centered, single column.

**Content:**

**Headline (huge, text-6xl, gradient on key phrase):**
`The next 14 days happen anyway.`
`Spend them shipping.`

(The phrase "shipping" is gradient text.)

**Subheadline (max-w-2xl, text-secondary):**
`In 14 days, your situation will either be the same — or you'll have a product live, validated, and earning its first dollars. The cost of finding out is $49.`

**CTA button (huge):**
`Get Started — $49`
→ Below: `One-time · 14-day guarantee · Instant access`

**Below the CTA, a final line (text-tertiary, text-sm):**
`Launch guaranteed. Income is not. We promise the system, not the outcome.`

---

### Section 12: Footer

**File:** `Footer.tsx`

**Minimal footer:**

Two columns on desktop, stacked on mobile.

**Left:**
- Logo "One Product AI"
- Below: `Built by BM Digital LLC. United States.`

**Right:**
- Email: `hello@oneproductai.com`
- Links: `Privacy · Terms · Refund Policy` (these can be `/privacy`, `/terms`, `/refund` — placeholder pages for now)

**Bottom row (text-tertiary, text-xs):**
`© 2026 BM Digital LLC. All rights reserved.`

---

## 4. TECHNICAL REQUIREMENTS

### File structure

```
app/
  layout.tsx           (root layout with font loading, metadata)
  page.tsx             (main landing page, imports all sections)
  globals.css          (Tailwind + custom CSS variables)
  components/
    Nav.tsx
    Hero.tsx
    Problem.tsx
    Solution.tsx
    HowItWorks.tsx
    WhatYouGet.tsx
    Timeline.tsx
    Chatbot.tsx
    Guarantee.tsx
    FAQ.tsx
    FinalCTA.tsx
    Footer.tsx
    ui/
      GradientText.tsx       (reusable gradient text component)
      Button.tsx             (reusable CTA button with glow)
      SectionLabel.tsx       (reusable "PRE-HEADLINE LABEL" component)
      FadeIn.tsx             (reusable scroll fade-in wrapper)
```

### Packages to install

```bash
npm install framer-motion lucide-react
```

That's it. Nothing else.

### Performance requirements

- Lighthouse score 95+ on all metrics
- All images optimized via `next/image`
- Fonts loaded via `next/font` (no FOUT)
- No external scripts
- Total page weight < 500 KB

### Accessibility

- Semantic HTML (`<section>`, `<nav>`, `<footer>`)
- All interactive elements keyboard-accessible
- Color contrast WCAG AA minimum
- Reduced-motion media query respected (animations disabled if user prefers)

### Responsive breakpoints

- Mobile: default (< 768px)
- Tablet: `md:` (≥ 768px)
- Desktop: `lg:` (≥ 1024px)
- Large desktop: `xl:` (≥ 1280px)

Build mobile-first. Test on a 375px-wide viewport before anything else.

### Metadata (in `layout.tsx`)

```tsx
export const metadata: Metadata = {
  title: "One Product AI — Launch your first digital product in 14 days",
  description: "A complete, AI-guided protocol that takes you from idea to live product in 14 days. $49. Money-back guarantee.",
  openGraph: {
    title: "One Product AI",
    description: "Launch your first digital product in 14 days.",
    url: "https://oneproductai.com",
    siteName: "One Product AI",
    type: "website",
  },
};
```

### CTA links

All "Get Started — $49" buttons point to `/checkout` (placeholder for now). This will be swapped for the real Shopify checkout URL later.

---

## 5. CONTENT RULES (DO NOT VIOLATE)

1. **Never** use exclamation marks in body copy.
2. **Never** claim specific income figures.
3. **Never** use fake testimonials. There are no testimonials on this page yet.
4. **Never** use stock photography of people. No team photos. No "smiling customers."
5. **Never** use AI-generated illustrations. Pure CSS, gradients, and Lucide icons only.
6. **Always** repeat: "Launch guaranteed. Income is not."
7. **Always** keep the brand voice calm, declarative, operating-system-like.

---

## 6. BUILD ORDER

Build in this exact order. Run `npm run dev` after each section is complete and verify it looks right before moving on.

1. Set up `globals.css` with color variables and base styles
2. Set up `layout.tsx` with Inter font and metadata
3. Build `ui/` reusable components (GradientText, Button, SectionLabel, FadeIn)
4. Build `Nav.tsx`
5. Build `Hero.tsx`
6. Build `Problem.tsx`
7. Build `Solution.tsx`
8. Build `HowItWorks.tsx`
9. Build `WhatYouGet.tsx`
10. Build `Timeline.tsx`
11. Build `Chatbot.tsx`
12. Build `Guarantee.tsx`
13. Build `FAQ.tsx`
14. Build `FinalCTA.tsx`
15. Build `Footer.tsx`
16. Assemble everything in `page.tsx`
17. Test on mobile (375px), tablet (768px), desktop (1280px)
18. Run `npm run build` and fix any TypeScript/lint errors
19. Report back with status

---

## 7. AT THE END, REPORT

When finished, give a short recap:
- Sections built
- Any decisions made that weren't specified in the brief
- Any TypeScript errors that needed fixing
- Total build size
- Instructions to preview (`npm run dev`)

Do not deploy. Do not push to GitHub. Stop after local build passes.

---

**END OF BRIEF**
