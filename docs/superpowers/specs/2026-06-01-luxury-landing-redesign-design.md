# One Product AI — Luxury Landing Redesign

**Date:** 2026-06-01
**Status:** Approved (verbal — user said *"sf kamal maz zdich tsawsalni hta tsali kolchi"* = stop asking, finish everything)
**Owner:** moumenbrahim009-beep
**Scope:** Full rewrite of Shopify theme (`shopify-theme/`) — landing page + product page.

---

## 1. Decisions (locked)

| Area | Decision |
|---|---|
| Brand | **One Product AI** (not "The Deep Method") |
| Aesthetic | **Editorial Luxury — Apple Product Page direction** |
| Imagery | **AI-generated premium visuals built as HTML/CSS mockups** (no .png required) |
| Sections | **11 sections** (chapter rhythm) |
| Color mode | **Mixed alternating** light/dark per section |
| Coach section | **Generic conversation simulator** (no personas) |
| Chatbot section | **Removed** — content merged into FAQ |
| Tech stack | Shopify Liquid theme, vanilla CSS, vanilla JS (no new libraries) |

## 2. Visual System

### Typography
- **Display** (headlines): **Fraunces Variable** (italic-capable serif). Sizes: `clamp(3rem, 8vw, 7rem)` at hero.
- **Body**: **Inter** (400/500/600/700).
- **Numbers / Accents**: **Inter Tight** (700/800).

### Colors
**Light sections:**
- Bg: `#faf9f6` (warm cream)
- Ink: `#0a0a0c`
- Accent: `#4a3aff` (deep electric violet)

**Dark sections:**
- Bg: `#0a0a0c`
- Ink: `#faf9f6`
- Accent: `#7d6dff`

**Removed:** cyan, pink, indigo, gradient soup. **Single accent only.**

### Motion
- Reveal: 8px fade-up, 600ms cubic-bezier(.2,.7,.2,1)
- Hero: line-by-line sequential fade-in
- Mockups: ±20px parallax max
- **No:** bounce, shimmer, marquee, glow
- CTAs: 1px ring on hover, no glow

### Spacing
- Section padding-y: `clamp(8rem, 12vw, 14rem)`
- Container max-width: 1200px
- Reading column: 640px

## 3. Section Map

| # | Section | Bg | Purpose | Key element |
|---|---|---|---|---|
| 1 | Hero | Light cream | Manifesto + price + CTA | Fraunces statement, scroll cue |
| 2 | Problem | Dark | "What's broken" — 3 truths | Large numbered statements, no cards |
| 3 | Solution | Light | "Why this works" | Course vs Method comparison |
| 4 | How it works | Dark | 3 phases | Horizontal phase strip |
| 5 | What you get | Light | 4 modules | Module cards with HTML mockups |
| 6 | Coach | Dark | AI simulator | Premium chat mockup, scripted scenarios |
| 7 | Timeline | Light | 14 nights | Vertical spine, scroll-fill |
| 8 | Field-data | Dark | Proof / pull-quotes | Editorial quotes, no cards |
| 9 | Guarantee | Light | Ship-or-refund covenant | Single statement, shield mark |
| 10 | FAQ | Dark | 20 Qs / 6 themes (chatbot merged) | Magazine spread, sticky category nav |
| 11 | Final-CTA | Light | Exit moment | "Stop planning. Start shipping." |

## 4. Section-by-section copy & layout

### 4.1 Hero
```
ONE PRODUCT AI

Fourteen nights.
One protocol.
A live product.   ← italic, last line

Built for the operator stuck in the loop.

$49 once. Lifetime. Refund if you don't ship.

[Become an Operator — $49 →]

(scroll cue line)
```
~95vh, light cream bg, no image.

### 4.2 Problem (Dark)
Three numbered truths:
1. You have ideas. You don't ship.
2. Courses teach. They don't make you finish.
3. The Coach is the missing layer.

Large display type, generous gaps between each.

### 4.3 Solution (Light)
Two-column comparison:
- Left: "The Course Model" — six pain bullets (40 hours, dropout, no order...)
- Right: "The Method" — six relief bullets (14 nights, binary done checks, AI Coach...)

### 4.4 How it works (Dark)
3 horizontal phase cards, full-bleed scroll:
- Phase 1 — Lock the target (Nights 1-2)
- Phase 2 — Prove the demand (Nights 3-4)
- Phase 3 — Ship the product (Nights 5-14)

### 4.5 What you get (Light)
4 modules with HTML/CSS mockups:
- **Module 01 — The Protocol** (Notion-style page mockup)
- **Module 02 — The Engine** (chat input mockup with Master Prompt visible)
- **Module 03 — The Templates** (file list mockup)
- **Module 04 — The Done Check** (checklist mockup)

### 4.6 Coach Simulator (Dark)
Full-bleed premium chat mockup. User picks one of 3 scenarios:
- "I have no idea what to build"
- "I'm scared to share my draft"
- "Day 7 and I'm behind"

Click → typing dots animate → Coach answer fades in line-by-line. Generic narrator voice. No personas.

### 4.7 Timeline (Light)
Vertical spine, fills as user scrolls past. Each night = one row:
```
Night 01  │  Define the operator
Night 02  │  Choose the format
...
Night 14  │  Ship
```
Click a night → expand inline showing objective + done check.

### 4.8 Field-data (Dark)
3-4 pull-quotes in editorial style. No avatars, no cards. Just type:
> "I had three abandoned drafts. By Night 14 one was selling."
> — Sarah, designer

### 4.9 Guarantee (Light)
Single restraint statement:
> If by Night 14 nothing is live, the $49 returns.

Below: 3 small terms. Above: shield outline mark.

### 4.10 FAQ (Dark)
Two-column editorial spread:
- Sticky left: 6 category labels (Is it for me · How the Coach works · Time · Money · What you get · After you buy)
- Right: Q&A flow, click Q to expand inline

20 questions (current chatbot content, slightly rewritten in declarative voice).

### 4.11 Final-CTA (Light)
```
Stop planning. Start shipping.

Fourteen nights from now you can either be in the same loop
or have a live product. The Method decides for you.

[Become an Operator — $49 →]
```

## 5. Voice & Tone

- Declarative. **No exclamation marks. Anywhere.**
- "You" not "we"
- "Ship" (not "launch"), "operator" (not "user/customer")
- No hype words: revolutionary, ultimate, game-changing, transform, unleash
- Confident silence > overselling

## 6. Technical Architecture

### Files to rewrite
- `layout/theme.liquid`
- `assets/theme.css` (full rewrite, ~60 KB target)
- `assets/theme.js` (Coach simulator + timeline spine + scroll reveals)
- All 11 `sections/*.liquid`
- `sections/main-product.liquid` (matches landing voice)
- `config/settings_data.json` (brand_name → "One Product AI")
- `templates/index.json` (new 11-section order)

### Files to delete
- `sections/chatbot.liquid` (merged → FAQ)
- `sections/manifesto.liquid` (merged → Hero)
- `sections/value-stack.liquid` (cliché, removed)
- `sections/field-data.liquid` ← keep, rewritten as pull-quotes

### Build approach
1. Branch: `redesign/luxury-editorial` (new)
2. Section-by-section rewrite, one commit per section
3. Test with `shopify theme dev` (local) or push as unpublished
4. Final: `shopify theme push --unpublished --store ugmfjg-8y.myshopify.com`
5. User reviews preview URL
6. Only publish when approved

## 7. Out of scope (explicit non-goals)

- New libraries / frameworks
- Analytics / tracking pixels (owner adds separately)
- Email capture / newsletter
- Changing $49 price anywhere
- Changing Shopify store URL
- Changing product variant ID / checkout flow
- Mobile app
- Multi-language (English only)

## 8. Acceptance Criteria

- All 11 sections rewritten in editorial luxury direction
- Brand name "One Product AI" everywhere (no leftover "Deep Method")
- Light/dark rhythm per section map
- Single accent color (violet) used sparingly
- Fraunces + Inter + Inter Tight only
- Coach simulator works: click scenario → answer animates in
- Timeline spine fills on scroll
- FAQ collapses/expands inline
- No console errors
- Mobile: no horizontal scroll at 375px, all CTAs reachable
- Theme pushes to `ugmfjg-8y.myshopify.com` as unpublished
- Preview URL returned to user

---

**End of spec.** Next: writing-plans → executing-plans → push.
