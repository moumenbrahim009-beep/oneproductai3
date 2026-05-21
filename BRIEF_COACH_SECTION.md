# NEW SECTION BRIEF — "The Coach is in the Room"

**For:** Claude Code
**Project:** oneproductai3
**Task:** Add a new section to the existing landing page

---

## CONTEXT

The existing landing page has 12 sections. We are adding ONE new section between two existing sections.

**Position:** After `HowItWorks.tsx` (the 3 phases), before `WhatYouGet.tsx` (the 4 cards).

**File to create:** `app/components/CoachInRoom.tsx`

**File to update:** `app/page.tsx` (import + place the new section in the correct order)

---

## PURPOSE

The current landing page doesn't visually demonstrate **how the AI Coach actually works**. People buying $49 courses often feel abandoned after purchase. This section proves the Coach is alive, intelligent, and supportive — by showing 3 real conversations with 3 different types of users at 3 different stages.

This is the section that converts the skeptical visitor. It must feel **alive, intimate, and intelligent** — not like a screenshot, not like a marketing diagram.

---

## SECTION DESIGN — "The Coach is in the Room"

### Pre-headline label

`THE COACH` (tracking-widest uppercase, gradient text, same style as other section labels)

### Headline

```
You're not alone with the protocol.
The Coach is in the room.
```

The phrase **"in the room"** should be gradient text (purple → indigo → blue, same as other gradient phrases).
Everything else is white.
Same font and size as other section headlines (`text-4xl md:text-5xl, font-bold, tracking-tight`).

### Subheadline

```
Three real moments. Three real people. Watch what happens when the protocol meets the human.
```

Same style as other subheadlines (`text-xl md:text-2xl, font-medium, text-secondary, max-w-3xl mx-auto`).

---

## THE VISUAL — THIS IS THE CREATIVE CORE

A **horizontally scrolling container** holding 3 conversation cards.

### Container

- `max-w-5xl mx-auto`
- Overflow: horizontal scroll (`overflow-x-auto`)
- Snap behavior: `scroll-snap-type: x mandatory`
- Padding inside so cards have breathing room
- Hide scrollbar visually (but keep functional — `scrollbar-width: none`, `-webkit-scrollbar: { display: none }`)
- Subtle gradient fade on left and right edges (mask-image), so cards seem to "appear from the void"
- On mobile: 1 card per view. On tablet: 1.2 cards visible (peek of next). On desktop: 1.3 cards visible.

### Each conversation card

- `min-w-[85%] md:min-w-[70%] lg:min-w-[65%]`
- `scroll-snap-align: center`
- Background: `bg-secondary` (#12121A) with subtle gradient border (use the existing pattern from the codebase — same as the "right card" in Solution.tsx)
- Border radius: `rounded-3xl`
- Padding: `p-8 md:p-10`
- Min height: `min-h-[480px]`

### Card structure (top to bottom)

**1. Persona header**

- Avatar circle (size 12, gradient background using the primary gradient)
- Inside the circle: initials in white (e.g., "S" for Sarah)
- Next to avatar (column):
  - Name + age + country, all on one line: `Sarah · 34 · USA` (text-base, font-medium, text-primary)
  - Status line below: small label with day/state (text-sm, text-tertiary, tracking-wide uppercase)
- A thin gradient divider line below the header

**2. The conversation (the heart of the card)**

A vertical stack of message bubbles. Each message has:

- **User messages:** Aligned left, max-width 75%, background `bg-tertiary` (#1A1A24), text-primary, rounded-2xl, padding `px-4 py-3`
- **Coach messages:** Aligned right, max-width 75%, background gradient (subtle — use `bg-gradient-to-br from-purple-500/15 to-blue-500/15` with a `border border-purple-500/20`), text-primary, rounded-2xl, padding `px-4 py-3`
- Small "OPA" label above each Coach message (text-xs, text-secondary, font-medium)
- Spacing between messages: `space-y-3`

**3. Footer line**

Below the conversation, a single italic line, centered, `text-sm text-tertiary`:
- Card 1: `"From idea-less to idea-locked in 4 minutes."`
- Card 2: `"From doubt to direction in one exchange."`
- Card 3: `"Unstuck without losing the day."`

---

## THE 3 CONVERSATIONS — EXACT COPY

These three conversations are the soul of the section. Use them **verbatim**.

---

### CONVERSATION 1: The Lost One

**Persona:**
- Name: `Sarah · 34 · USA`
- Status: `DAY 0 · NO IDEA`
- Avatar initial: `S`

**Messages:**

**User:**
> I want to launch something but I have no idea what. Every time I try to pick, I freeze.

**Coach (OPA):**
> Good. You're not stuck on the idea — you're stuck on the person. Forget the product for now. Tell me one type of human you understand better than most. A group you've been part of, or watched closely.

**User:**
> Working moms who feel guilty about screen time.

**Coach (OPA):**
> That's a person. Now we have something. The product will come from their actual problem, not your guesses. Open Day 1 in your portal. We're going to define this audience properly — in 45 minutes, you'll have a profile sharper than most founders have after a year.

---

### CONVERSATION 2: The Doubter

**Persona:**
- Name: `Mike · 28 · USA`
- Status: `DAY 0 · HAS IDEA, NO CONFIDENCE`
- Avatar initial: `M`

**Messages:**

**User:**
> I have an idea — a Notion template for freelance designers to track invoices. But what if no one wants it? I don't want to waste two weeks.

**Coach (OPA):**
> You won't waste two weeks. You'll waste four days — maximum. That's the whole point of Phase 2.

**User:**
> What do I do in Phase 2?

**Coach (OPA):**
> You don't build. You ask. Five real conversations with freelance designers. We have a script for it. If three out of five say "I'd pay for that today," you build. If they don't, you pivot — with their words guiding you. Either way, you're ahead. Open Day 3.

---

### CONVERSATION 3: The Stuck One

**Persona:**
- Name: `Alex · 31 · USA`
- Status: `DAY 3 · STUCK`
- Avatar initial: `A`

**Messages:**

**User:**
> I'm supposed to do five validation calls today and I can't find anyone. I've posted in two groups and gotten nothing. I'm losing the day.

**Coach (OPA):**
> Stop posting. Posting is passive. We need active outreach. Open the validation outreach template in your portal — the second one, "Direct message script v2."

**User:**
> Ok, I have it open.

**Coach (OPA):**
> Send it to ten people in the next thirty minutes. Pick from anyone who's posted in your target community in the last week — even a small comment counts. Don't aim for five "yes" calls. Aim for ten messages sent. The calls will come from the messages. Report back when ten are out.

---

## INTERACTION & ANIMATION

### On scroll into view
- The section fades in (use the existing `FadeIn` component from `ui/FadeIn.tsx`)
- The first card is visible, partially showing the edge of the second

### On horizontal scroll
- Cards snap to center
- A subtle dot indicator at the bottom of the container shows position (3 dots, current one is gradient-filled, others are border-only)

### Scroll affordance (CRITICAL — don't skip)
- Below the container, a small text in `text-sm text-tertiary` centered:
  - On mobile: `Swipe to read more conversations →`
  - On desktop: `Scroll horizontally to read more →`
- The arrow can be a small Lucide `ArrowRight` icon
- This text fades out once the user has scrolled past the first card

### Hover state on cards (desktop)
- Subtle lift (`hover:-translate-y-1`)
- Border becomes slightly brighter (`hover:border-purple-500/30`)
- Transition: 0.3s ease

---

## CLOSING LINE

Below the carousel, centered, a final statement (text-2xl, max-w-3xl mx-auto, font-medium):

```
This is what you get for $49. A protocol, plus a Coach who knows it.
```

Below that, smaller (text-base, text-tertiary):

```
Free Claude or ChatGPT. The Master Prompt. The 14 days. Done.
```

---

## ACCESSIBILITY

- Container must be keyboard-navigable (arrow keys scroll horizontally)
- Each card has appropriate ARIA labels (`role="article"`, `aria-label` describing the conversation)
- Respect `prefers-reduced-motion` — disable hover lift and scroll animations if reduced motion is set
- Color contrast WCAG AA minimum on all text

---

## STRUCTURE TO UPDATE

**1. Create new file:** `app/components/CoachInRoom.tsx`

**2. Update `app/page.tsx`:**

Find the line that imports and renders the sections. Add the import for `CoachInRoom` and place it between `HowItWorks` and `WhatYouGet`:

```tsx
// existing imports...
import HowItWorks from "./components/HowItWorks";
import CoachInRoom from "./components/CoachInRoom"; // NEW
import WhatYouGet from "./components/WhatYouGet";
// ...

// in the JSX:
<HowItWorks />
<CoachInRoom />
<WhatYouGet />
```

---

## BUILD INSTRUCTIONS

1. Read the existing codebase first:
   - `app/page.tsx` to see how sections are imported and ordered
   - `app/components/HowItWorks.tsx` for headline/label styling reference
   - `app/components/Solution.tsx` for gradient border card reference
   - `app/components/Chatbot.tsx` for chat-bubble styling reference (but DO NOT copy — this is a different visual)
   - `app/components/ui/FadeIn.tsx` for scroll fade behavior
   - `app/globals.css` for CSS variable names

2. Build `CoachInRoom.tsx` following the spec above exactly.

3. Update `app/page.tsx` to import and place the new section between `HowItWorks` and `WhatYouGet`.

4. Run `npm run build` to verify zero TypeScript errors and zero lint warnings.

5. Run `npm run dev` and verify the section renders correctly at `localhost:3000`.

6. Test the horizontal scroll on mobile viewport (375px wide) — the snap should feel natural.

7. Verify the section appears in the correct order in the page.

---

## WHAT NOT TO DO

- **Do not** add additional conversations or change the personas — use the 3 conversations verbatim.
- **Do not** use exclamation marks in any copy.
- **Do not** add fake testimonials or fake metrics ("Used by 10,000 founders").
- **Do not** change anything in the existing sections — only add the new one and update `page.tsx`.
- **Do not** install new packages — use what's already in the project (Tailwind, Framer Motion, Lucide).
- **Do not** deploy or push to GitHub. Stop after local build passes.

---

## AT THE END, REPORT

When done, give a short recap:
- Whether the build passes clean
- The size impact (how many KB added)
- Any decisions you made that weren't fully specified
- Confirmation that `page.tsx` was updated correctly

---

**END OF BRIEF**
