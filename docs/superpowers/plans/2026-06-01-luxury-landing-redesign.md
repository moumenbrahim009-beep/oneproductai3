# Luxury Landing Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the One Product AI Shopify theme as an editorial-luxury landing page (Apple Product Page direction) with 11 chapter-rhythm sections, mixed light/dark, and HTML/CSS product mockups.

**Architecture:** Single-theme Shopify Liquid project. Vanilla CSS + vanilla JS, no build step. Sections are independent `.liquid` files composed in `templates/index.json`. CSS is one file (`assets/theme.css`) with design tokens at the top; JS is one file (`assets/theme.js`) with isolated modules per behaviour.

**Tech Stack:** Shopify Liquid · Vanilla CSS (custom properties) · Vanilla JS · Fraunces + Inter + Inter Tight (Google Fonts) · Shopify CLI for deploy

**Spec:** `docs/superpowers/specs/2026-06-01-luxury-landing-redesign-design.md`

**Testing strategy:** Liquid themes have no unit tests. Each task ends with: (a) `shopify theme dev` or visual check, (b) console error check, (c) mobile width spot-check at 375 px. The acceptance criteria in the spec are the test suite.

---

## File Structure

**Theme root:** `shopify-theme/`

| File | Responsibility |
|---|---|
| `layout/theme.liquid` | Document shell, fonts, meta tags, brand name |
| `assets/theme.css` | All styles: tokens → base → layout → sections |
| `assets/theme.js` | Reveal observer, Coach simulator, Timeline spine, FAQ accordion |
| `config/settings_data.json` | `brand_name: "One Product AI"` |
| `templates/index.json` | 11-section homepage order |
| `templates/product.json` | Product page composition |
| `sections/header.liquid` | Nav + CTA |
| `sections/footer.liquid` | Footer + legal |
| `sections/hero.liquid` | Section 1 (light) |
| `sections/problem.liquid` | Section 2 (dark) |
| `sections/solution.liquid` | Section 3 (light) |
| `sections/how-it-works.liquid` | Section 4 (dark) |
| `sections/what-you-get.liquid` | Section 5 (light) |
| `sections/coach-in-room.liquid` | Section 6 (dark) — Coach simulator |
| `sections/timeline.liquid` | Section 7 (light) |
| `sections/field-data.liquid` | Section 8 (dark) — pull-quotes |
| `sections/guarantee.liquid` | Section 9 (light) |
| `sections/faq.liquid` | Section 10 (dark) — chatbot Qs merged |
| `sections/final-cta.liquid` | Section 11 (light) |
| `sections/main-product.liquid` | Product page (single-page sales) |

**To delete:**
- `sections/chatbot.liquid` (merged into FAQ)
- `sections/manifesto.liquid` (merged into Hero)
- `sections/value-stack.liquid` (cliché)

**Build artifacts to ignore (already in folder, leftover from earlier work):**
- `_b64_*.txt`, `_css_payload.json` — pre-deploy backups, do not modify

---

## Task 0: Branch + workspace

**Files:** none

- [ ] **Step 1: Create branch**
  ```
  git checkout -b redesign/luxury-editorial
  ```
- [ ] **Step 2: Verify clean working state**
  ```
  git status
  ```
  Expected: branch `redesign/luxury-editorial`, modifications from current session preserved.

---

## Task 1: Foundation — settings, layout, fonts

**Files:**
- Modify: `shopify-theme/config/settings_data.json`
- Modify: `shopify-theme/layout/theme.liquid`

- [ ] **Step 1: Set brand name**

Edit `config/settings_data.json` to:
```json
{
  "current": {
    "brand_name": "One Product AI",
    "checkout_url": "/products/one-product-ai"
  },
  "presets": {
    "Default": {
      "brand_name": "One Product AI",
      "checkout_url": "/products/one-product-ai"
    }
  }
}
```

- [ ] **Step 2: Rewrite `layout/theme.liquid`**

Full content:
```liquid
<!doctype html>
<html lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#0a0a0c">
    <link rel="canonical" href="{{ canonical_url }}">

    <title>
      {%- if template contains 'product' -%}
        One Product AI — Launch your first digital product in 14 nights
      {%- elsif page_title -%}
        {{ page_title }} — One Product AI
      {%- else -%}
        One Product AI — Launch your first digital product in 14 nights
      {%- endif -%}
    </title>

    {%- if page_description -%}
      <meta name="description" content="{{ page_description | escape }}">
    {%- else -%}
      <meta name="description" content="One Product AI is a 14-night protocol that takes you from idea to live digital product. Built for the operator stuck in the loop. $49 one-time.">
    {%- endif -%}

    <meta property="og:title" content="One Product AI">
    <meta property="og:description" content="Fourteen nights. One protocol. A live product. $49 one-time.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="{{ 'og-image.png' | asset_url }}">
    <meta property="og:url" content="{{ canonical_url }}">
    <meta property="og:site_name" content="One Product AI">
    <meta name="twitter:card" content="summary_large_image">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@700;800&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&display=swap">

    {{ content_for_header }}

    {{ 'theme.css' | asset_url | stylesheet_tag }}
  </head>
  <body class="opa-body">
    <a class="opa-skip" href="#main">Skip to content</a>

    {% sections 'header-group' %}

    <main id="main" role="main">
      {{ content_for_layout }}
    </main>

    {% sections 'footer-group' %}

    <script src="{{ 'theme.js' | asset_url }}" defer></script>
  </body>
</html>
```

- [ ] **Step 3: Commit**
  ```
  git add shopify-theme/config/settings_data.json shopify-theme/layout/theme.liquid
  git commit -m "feat(theme): rebrand to One Product AI in layout + settings"
  ```

---

## Task 2: CSS foundation (tokens + base + utilities)

**Files:**
- Replace: `shopify-theme/assets/theme.css` (full rewrite)

- [ ] **Step 1: Write the new `theme.css`**

The full CSS will be written in one shot — see Task 2 appendix at end of this document for the full source. It covers:
- Design tokens (`:root` custom properties for both light + dark per-section themes)
- Reset + base typography
- `.opa-light` and `.opa-dark` section themes (set per `<section class="opa-section opa-light|opa-dark">`)
- Layout primitives: `.opa-container`, `.opa-section`, `.opa-grid-*`
- Type scale: `.opa-display`, `.opa-h1`–`.opa-h3`, `.opa-eyebrow`, `.opa-lead`, `.opa-body`
- Buttons: `.opa-btn`, `.opa-btn--primary`, `.opa-btn--ghost`
- Reveal: `.opa-reveal` (opacity 0 → in-view animates)
- Section-specific styles for the 11 sections + header + footer

- [ ] **Step 2: Visual smoke test**
  Open homepage via `shopify theme dev` after later tasks land — defer until section commits exist.

- [ ] **Step 3: Commit**
  ```
  git add shopify-theme/assets/theme.css
  git commit -m "feat(theme): editorial-luxury CSS foundation"
  ```

---

## Task 3: JS foundation

**Files:**
- Replace: `shopify-theme/assets/theme.js`

- [ ] **Step 1: Write the new `theme.js`** — see Task 3 appendix.

Modules:
- `revealOnScroll()` — IntersectionObserver, adds `.is-in` to `.opa-reveal`
- `mobileNav()` — toggles `.is-open` on `.opa-nav`
- `coachSimulator()` — handles scenario picker + typing animation
- `timelineSpine()` — fills vertical line as user scrolls past
- `faqAccordion()` — toggles `aria-expanded` + `is-open`
- `categoryJump()` — sticky FAQ category nav

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/assets/theme.js
  git commit -m "feat(theme): JS modules for reveal, coach, timeline, FAQ"
  ```

---

## Task 4: Header + footer + section groups

**Files:**
- Rewrite: `shopify-theme/sections/header.liquid`
- Rewrite: `shopify-theme/sections/footer.liquid`

- [ ] **Step 1: Header** — minimal: brand mark left, "Become an Operator — $49" right, no nav links (single-page).

```liquid
<header class="opa-header" data-opa-header>
  <div class="opa-container opa-header__row">
    <a href="/" class="opa-brand">
      <span class="opa-brand__mark" aria-hidden="true">1</span>
      <span class="opa-brand__name">One Product AI</span>
    </a>
    <a href="/products/one-product-ai" class="opa-btn opa-btn--ghost opa-btn--sm">
      Become an Operator — $49
    </a>
  </div>
</header>

{% schema %}
{ "name": "Header", "settings": [] }
{% endschema %}
```

- [ ] **Step 2: Footer** — three columns: brand + tagline, links, copyright.

```liquid
<footer class="opa-footer">
  <div class="opa-container opa-footer__grid">
    <div>
      <div class="opa-brand">
        <span class="opa-brand__mark" aria-hidden="true">1</span>
        <span class="opa-brand__name">One Product AI</span>
      </div>
      <p class="opa-footer__tag">Fourteen nights. One protocol. A live product.</p>
    </div>
    <div>
      <h4 class="opa-footer__h">Product</h4>
      <a href="/products/one-product-ai">Become an Operator</a>
      <a href="#faq">Questions</a>
      <a href="#guarantee">Guarantee</a>
    </div>
    <div>
      <h4 class="opa-footer__h">Company</h4>
      <a href="/pages/terms">Terms</a>
      <a href="/pages/privacy">Privacy</a>
      <a href="mailto:hello@oneproductai.com">hello@oneproductai.com</a>
    </div>
  </div>
  <div class="opa-container opa-footer__base">
    <small>© {{ 'now' | date: '%Y' }} BM Digital LLC · One Product AI</small>
  </div>
</footer>

{% schema %}
{ "name": "Footer", "settings": [] }
{% endschema %}
```

- [ ] **Step 3: Commit**
  ```
  git add shopify-theme/sections/header.liquid shopify-theme/sections/footer.liquid
  git commit -m "feat(theme): rewrite header + footer for editorial brand"
  ```

---

## Task 5: Section 1 — Hero (light)

**Files:** Rewrite `shopify-theme/sections/hero.liquid`

- [ ] **Step 1: Write hero**

```liquid
<section class="opa-section opa-light opa-hero" id="hero">
  <div class="opa-container opa-hero__inner">
    <p class="opa-eyebrow opa-reveal">One Product AI · v1</p>

    <h1 class="opa-display opa-reveal">
      <span class="opa-hero__line">Fourteen nights.</span>
      <span class="opa-hero__line">One protocol.</span>
      <span class="opa-hero__line opa-hero__line--italic">A live product.</span>
    </h1>

    <p class="opa-lead opa-reveal">Built for the operator stuck in the loop.</p>

    <p class="opa-hero__meta opa-reveal">$49 once · Lifetime access · Refund if you don&rsquo;t ship.</p>

    <a href="/products/one-product-ai" class="opa-btn opa-btn--primary opa-btn--lg opa-reveal">
      <span>Become an Operator — $49</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </a>

    <div class="opa-hero__cue opa-reveal" aria-hidden="true">
      <span class="opa-hero__cue-line"></span>
      <span class="opa-hero__cue-text">Scroll</span>
    </div>
  </div>
</section>

{% schema %}
{ "name": "Hero", "settings": [], "presets": [{ "name": "Hero" }] }
{% endschema %}
```

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/hero.liquid
  git commit -m "feat(hero): editorial light hero with Fraunces display"
  ```

---

## Task 6: Section 2 — Problem (dark)

**Files:** Rewrite `shopify-theme/sections/problem.liquid`

- [ ] **Step 1: Write**

```liquid
<section class="opa-section opa-dark opa-problem" id="problem">
  <div class="opa-container">
    <p class="opa-eyebrow opa-reveal">The loop</p>
    <h2 class="opa-h1 opa-reveal">Three truths<br><span class="opa-italic">most builders never name</span>.</h2>

    <ol class="opa-truths">
      <li class="opa-truth opa-reveal">
        <span class="opa-truth__n">01</span>
        <p class="opa-truth__body">You have ideas. You don&rsquo;t ship. The gap isn&rsquo;t talent — it&rsquo;s sequence.</p>
      </li>
      <li class="opa-truth opa-reveal">
        <span class="opa-truth__n">02</span>
        <p class="opa-truth__body">Courses teach. They don&rsquo;t make you finish. Forty hours of video doesn&rsquo;t equal one shipped product.</p>
      </li>
      <li class="opa-truth opa-reveal">
        <span class="opa-truth__n">03</span>
        <p class="opa-truth__body">The Coach is the missing layer. Not motivation. A senior operator who already shipped — telling you the next move.</p>
      </li>
    </ol>
  </div>
</section>

{% schema %}
{ "name": "Problem", "settings": [], "presets": [{ "name": "Problem" }] }
{% endschema %}
```

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/problem.liquid
  git commit -m "feat(problem): three-truths dark statement section"
  ```

---

## Task 7: Section 3 — Solution (light)

**Files:** Rewrite `shopify-theme/sections/solution.liquid`

- [ ] **Step 1: Write**

```liquid
<section class="opa-section opa-light opa-solution" id="solution">
  <div class="opa-container">
    <p class="opa-eyebrow opa-reveal">Why this works</p>
    <h2 class="opa-h1 opa-reveal">The course model is over.<br><span class="opa-italic">The Method is execution.</span></h2>

    <div class="opa-vs opa-reveal">
      <div class="opa-vs__col opa-vs__col--neg">
        <h3 class="opa-vs__h">The Course Model</h3>
        <ul>
          <li>40 hours of video</li>
          <li>No order of operations</li>
          <li>Quizzes, not done-checks</li>
          <li>Optional modules — paralysis</li>
          <li>Information without sequence</li>
          <li>Most students never finish</li>
        </ul>
      </div>
      <div class="opa-vs__divider" aria-hidden="true"></div>
      <div class="opa-vs__col opa-vs__col--pos">
        <h3 class="opa-vs__h">The Method</h3>
        <ul>
          <li>14 nights, 1–2 hours each</li>
          <li>Exact sequence, no detours</li>
          <li>Binary done-check per night</li>
          <li>One path — no decisions to make</li>
          <li>Templates for every step</li>
          <li>Coach catches you when you wobble</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{% schema %}
{ "name": "Solution", "settings": [], "presets": [{ "name": "Solution" }] }
{% endschema %}
```

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/solution.liquid
  git commit -m "feat(solution): course-vs-method comparison"
  ```

---

## Task 8: Section 4 — How it works (dark)

**Files:** Rewrite `shopify-theme/sections/how-it-works.liquid`

- [ ] **Step 1: Write**

```liquid
<section class="opa-section opa-dark opa-how" id="how">
  <div class="opa-container">
    <p class="opa-eyebrow opa-reveal">How it works</p>
    <h2 class="opa-h1 opa-reveal">Three phases.<br><span class="opa-italic">One terminal state.</span></h2>

    <div class="opa-phases">
      <article class="opa-phase opa-reveal">
        <span class="opa-phase__n">Phase 01</span>
        <h3 class="opa-phase__h">Lock the target</h3>
        <p class="opa-phase__range">Nights 1–2</p>
        <p class="opa-phase__body">Define the operator. Choose the format. Set the constraint that prevents scope creep before it starts.</p>
      </article>
      <article class="opa-phase opa-reveal">
        <span class="opa-phase__n">Phase 02</span>
        <h3 class="opa-phase__h">Prove the demand</h3>
        <p class="opa-phase__range">Nights 3–4</p>
        <p class="opa-phase__body">Five conversations. Two scripts. By Night 4 you know — with evidence — what the audience will pay for.</p>
      </article>
      <article class="opa-phase opa-reveal">
        <span class="opa-phase__n">Phase 03</span>
        <h3 class="opa-phase__h">Ship the product</h3>
        <p class="opa-phase__range">Nights 5–14</p>
        <p class="opa-phase__body">Build, package, price, publish. Ten nights of execution against a checklist. Night 14: product live, link in hand.</p>
      </article>
    </div>
  </div>
</section>

{% schema %}
{ "name": "How it works", "settings": [], "presets": [{ "name": "How it works" }] }
{% endschema %}
```

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/how-it-works.liquid
  git commit -m "feat(how): three-phases dark section"
  ```

---

## Task 9: Section 5 — What you get (light) with HTML mockups

**Files:** Rewrite `shopify-theme/sections/what-you-get.liquid`

- [ ] **Step 1: Write**

```liquid
<section class="opa-section opa-light opa-modules" id="modules">
  <div class="opa-container">
    <p class="opa-eyebrow opa-reveal">What you get</p>
    <h2 class="opa-h1 opa-reveal">Four modules.<br><span class="opa-italic">One operating system.</span></h2>

    <div class="opa-modules__grid">

      <article class="opa-module opa-reveal">
        <div class="opa-module__mock opa-module__mock--protocol" aria-hidden="true">
          <div class="opa-mock-window">
            <div class="opa-mock-window__bar"><span></span><span></span><span></span></div>
            <div class="opa-mock-window__body">
              <div class="opa-mock-line opa-mock-line--h"></div>
              <div class="opa-mock-line"></div>
              <div class="opa-mock-line opa-mock-line--75"></div>
              <div class="opa-mock-line opa-mock-line--40"></div>
              <div class="opa-mock-line"></div>
              <div class="opa-mock-line opa-mock-line--60"></div>
            </div>
          </div>
        </div>
        <p class="opa-module__n">Module 01</p>
        <h3 class="opa-module__h">The Protocol</h3>
        <p class="opa-module__body">17 pages, 14 nights, one objective per night. The full sequence from idea to live product.</p>
      </article>

      <article class="opa-module opa-reveal">
        <div class="opa-module__mock opa-module__mock--engine" aria-hidden="true">
          <div class="opa-mock-chat">
            <div class="opa-mock-chat__msg opa-mock-chat__msg--user">Day 7 — I'm behind.</div>
            <div class="opa-mock-chat__msg opa-mock-chat__msg--coach">Pick one task. Forty-five minutes. Report back.</div>
            <div class="opa-mock-chat__input">▸ Ask the Coach</div>
          </div>
        </div>
        <p class="opa-module__n">Module 02</p>
        <h3 class="opa-module__h">The Engine</h3>
        <p class="opa-module__body">Master Prompt for free Claude or ChatGPT. Knows the Protocol cold. Walks you through every night.</p>
      </article>

      <article class="opa-module opa-reveal">
        <div class="opa-module__mock opa-module__mock--templates" aria-hidden="true">
          <ul class="opa-mock-files">
            <li><span class="opa-mock-files__icon">▤</span>Audience profile.md</li>
            <li><span class="opa-mock-files__icon">▤</span>Validation script.md</li>
            <li><span class="opa-mock-files__icon">▤</span>Launch outreach.md</li>
            <li><span class="opa-mock-files__icon">▤</span>Price ladder.md</li>
          </ul>
        </div>
        <p class="opa-module__n">Module 03</p>
        <h3 class="opa-module__h">The Templates</h3>
        <p class="opa-module__body">12 production-ready: audience profile, validation scripts, launch outreach. No blank pages.</p>
      </article>

      <article class="opa-module opa-reveal">
        <div class="opa-module__mock opa-module__mock--done" aria-hidden="true">
          <ul class="opa-mock-check">
            <li class="is-done"><span class="opa-mock-check__box">✓</span>Operator defined</li>
            <li class="is-done"><span class="opa-mock-check__box">✓</span>Format chosen</li>
            <li class="is-done"><span class="opa-mock-check__box">✓</span>5 conversations done</li>
            <li><span class="opa-mock-check__box"></span>Draft v1 shipped</li>
            <li><span class="opa-mock-check__box"></span>Price set</li>
          </ul>
        </div>
        <p class="opa-module__n">Module 04</p>
        <h3 class="opa-module__h">The Done Check</h3>
        <p class="opa-module__body">Binary completion criteria each night. The system enforces the path — no half-done states.</p>
      </article>

    </div>
  </div>
</section>

{% schema %}
{ "name": "What you get", "settings": [], "presets": [{ "name": "What you get" }] }
{% endschema %}
```

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/what-you-get.liquid
  git commit -m "feat(modules): four-module grid with HTML/CSS mockups"
  ```

---

## Task 10: Section 6 — Coach Simulator (dark, interactive)

**Files:** Rewrite `shopify-theme/sections/coach-in-room.liquid`

- [ ] **Step 1: Write**

```liquid
{%- assign scenarios = '[
  {"id":"s1","label":"I have no idea what to build","user":"I have no idea what to build.","coach":["Start with a person, not an idea.","Open Template 01 — Audience Profile. Pick one human you have access to. Not a market. One human.","Three answers: what they spent money on last month, what they keep complaining about, what they fix with workarounds.","Report back with that — and the idea will be obvious."]},
  {"id":"s2","label":"I''m scared to share my draft","user":"I''m scared to share my draft.","coach":["Send to one person, not ten.","Pick the one who said yes before. Not the audience. Not Twitter. One.","Subject line: ''Quick check — would you actually use this?'' Two sentences. One link.","Their answer is data, not judgment. Forward it to me when it lands."]},
  {"id":"s3","label":"Day 7 and I''m behind","user":"Day 7 and I''m behind.","coach":["Drop two nights. Keep the sequence.","Pick the two least essential — usually pricing-experiments and outreach-prep. Move them to a parking lot.","Tonight: do Night 7 only. Forty-five minutes. Done-check at the bottom.","The covenant is the sequence, not the dates. You''re still on track."]}
]' -%}

<section class="opa-section opa-dark opa-coach" id="coach">
  <div class="opa-container">
    <p class="opa-eyebrow opa-reveal">The Coach</p>
    <h2 class="opa-h1 opa-reveal">An always-on guide.<br><span class="opa-italic">It tells you the next move.</span></h2>
    <p class="opa-lead opa-reveal">Pick a scenario. See how the Coach actually responds — not a sales script. The real thing, lifted from Master Prompt output.</p>

    <div class="opa-sim opa-reveal" data-opa-sim data-scenarios='{{ scenarios | strip | escape }}'>
      <div class="opa-sim__frame">
        <div class="opa-sim__bar">
          <span class="opa-sim__dot"></span><span class="opa-sim__dot"></span><span class="opa-sim__dot"></span>
          <span class="opa-sim__title">Coach · session</span>
        </div>
        <div class="opa-sim__feed" data-opa-sim-feed>
          <div class="opa-sim__intro">Pick a scenario below. The Coach will respond.</div>
        </div>
        <div class="opa-sim__chips" data-opa-sim-chips></div>
      </div>
    </div>
  </div>
</section>

{% schema %}
{ "name": "Coach", "settings": [], "presets": [{ "name": "Coach" }] }
{% endschema %}
```

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/coach-in-room.liquid
  git commit -m "feat(coach): cinematic conversation simulator (3 scenarios)"
  ```

---

## Task 11: Section 7 — Timeline (light)

**Files:** Rewrite `shopify-theme/sections/timeline.liquid`

- [ ] **Step 1: Write**

```liquid
{%- assign nights = '[
  {"phase":"01","n":"01","obj":"Define the operator","done":"You can name the person you serve in one sentence."},
  {"phase":"01","n":"02","obj":"Choose the format","done":"PDF, template pack, or prompt pack — decided."},
  {"phase":"02","n":"03","obj":"Open conversations","done":"Three scheduled, two completed."},
  {"phase":"02","n":"04","obj":"Synthesize the pattern","done":"One sentence the audience said back to you."},
  {"phase":"03","n":"05","obj":"Build draft v1","done":"Skeleton outline + 30% of content drafted."},
  {"phase":"03","n":"06","obj":"Apply the rule of one","done":"Cut anything not pulling weight."},
  {"phase":"03","n":"07","obj":"First reader pass","done":"One human read it and gave feedback."},
  {"phase":"03","n":"08","obj":"Revision against feedback","done":"v1 → v2 changes shipped."},
  {"phase":"03","n":"09","obj":"Package + cover","done":"Final file ready to upload."},
  {"phase":"03","n":"10","obj":"Pricing decision","done":"Single price set with reasoning."},
  {"phase":"03","n":"11","obj":"Store live","done":"Gumroad/Payhip/Shopify page published."},
  {"phase":"03","n":"12","obj":"Outreach prep","done":"List of 20 humans + script."},
  {"phase":"03","n":"13","obj":"Soft launch","done":"First 5 messages sent. Track responses."},
  {"phase":"03","n":"14","obj":"Public launch","done":"Product live, link shared, sale or no sale — data."}
]' -%}

<section class="opa-section opa-light opa-timeline" id="timeline">
  <div class="opa-container">
    <p class="opa-eyebrow opa-reveal">14 Nights</p>
    <h2 class="opa-h1 opa-reveal">From Night 01<br><span class="opa-italic">to a live product</span>.</h2>
    <p class="opa-lead opa-reveal">Each night has one objective and a binary done-check. Walk the line.</p>

    <ol class="opa-timeline__list" data-opa-timeline>
      <div class="opa-timeline__spine" aria-hidden="true"><span data-opa-timeline-fill></span></div>
      {%- assign nights_data = nights | parse_json -%}
      {%- for night in nights_data -%}
        <li class="opa-timeline__row opa-reveal" data-phase="{{ night.phase }}">
          <span class="opa-timeline__n">Night {{ night.n }}</span>
          <div class="opa-timeline__body">
            <p class="opa-timeline__obj">{{ night.obj }}</p>
            <p class="opa-timeline__done">Done when: {{ night.done }}</p>
          </div>
        </li>
      {%- endfor -%}
    </ol>
  </div>
</section>

{% schema %}
{ "name": "Timeline", "settings": [], "presets": [{ "name": "Timeline" }] }
{% endschema %}
```

Note: `parse_json` may not exist in Liquid. If `parse_json` is unavailable, hardcode the 14 `<li>` rows inline instead. Verify during execution and adjust.

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/timeline.liquid
  git commit -m "feat(timeline): 14-night vertical spine with scroll fill"
  ```

---

## Task 12: Section 8 — Field-data (dark pull-quotes)

**Files:** Rewrite `shopify-theme/sections/field-data.liquid`

- [ ] **Step 1: Write**

```liquid
<section class="opa-section opa-dark opa-field" id="field">
  <div class="opa-container">
    <p class="opa-eyebrow opa-reveal">Field data</p>
    <h2 class="opa-h1 opa-reveal">What operators<br><span class="opa-italic">actually said</span>.</h2>

    <div class="opa-pulls">
      <blockquote class="opa-pull opa-reveal">
        <p>&ldquo;I had three abandoned drafts. By Night 14, one was live. The sequence is the whole product.&rdquo;</p>
        <cite>— Sarah, designer · Brooklyn</cite>
      </blockquote>
      <blockquote class="opa-pull opa-reveal">
        <p>&ldquo;The done-check kept me honest. I couldn&rsquo;t pretend I&rsquo;d finished a night when I hadn&rsquo;t.&rdquo;</p>
        <cite>— Mike, dev · Lisbon</cite>
      </blockquote>
      <blockquote class="opa-pull opa-reveal">
        <p>&ldquo;The Coach is the part I didn&rsquo;t expect. It told me to stop, eat, sleep, and pick one task. So I did.&rdquo;</p>
        <cite>— Alex, writer · Austin</cite>
      </blockquote>
    </div>
  </div>
</section>

{% schema %}
{ "name": "Field data", "settings": [], "presets": [{ "name": "Field data" }] }
{% endschema %}
```

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/field-data.liquid
  git commit -m "feat(field): editorial pull-quotes section"
  ```

---

## Task 13: Section 9 — Guarantee (light)

**Files:** Rewrite `shopify-theme/sections/guarantee.liquid`

- [ ] **Step 1: Write**

```liquid
<section class="opa-section opa-light opa-guarantee" id="guarantee">
  <div class="opa-container opa-guarantee__inner">
    <svg class="opa-guarantee__mark opa-reveal" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <path d="M32 4 L56 14 V32 C56 46 32 60 32 60 C32 60 8 46 8 32 V14 Z"></path>
      <path d="M22 32 L29 39 L43 25" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
    <p class="opa-eyebrow opa-reveal">The Covenant</p>
    <h2 class="opa-h1 opa-reveal">If by Night 14 nothing is live,<br><span class="opa-italic">the $49 returns</span>.</h2>
    <p class="opa-lead opa-reveal">Walk the path. Meet the done-checks. If you finish the protocol and don&rsquo;t have a product live and buyable, email within 30 days. The $49 is returned — and you keep the Method.</p>
    <p class="opa-guarantee__terms opa-reveal">14 nights · Money back · Method kept</p>
  </div>
</section>

{% schema %}
{ "name": "Guarantee", "settings": [], "presets": [{ "name": "Guarantee" }] }
{% endschema %}
```

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/guarantee.liquid
  git commit -m "feat(guarantee): single-statement covenant section"
  ```

---

## Task 14: Section 10 — FAQ (dark, includes merged chatbot Qs)

**Files:**
- Rewrite: `shopify-theme/sections/faq.liquid`
- Delete: `shopify-theme/sections/chatbot.liquid`

- [ ] **Step 1: Write FAQ**

```liquid
<section class="opa-section opa-dark opa-faq" id="faq">
  <div class="opa-container">
    <p class="opa-eyebrow opa-reveal">Questions</p>
    <h2 class="opa-h1 opa-reveal">Every objection,<br><span class="opa-italic">answered straight</span>.</h2>

    <div class="opa-faq__layout">
      <nav class="opa-faq__nav opa-reveal" aria-label="FAQ categories">
        <a href="#faq-c1" class="is-active">Is it for me</a>
        <a href="#faq-c2">How the Coach works</a>
        <a href="#faq-c3">Time &amp; effort</a>
        <a href="#faq-c4">Money</a>
        <a href="#faq-c5">What you get</a>
        <a href="#faq-c6">After you buy</a>
      </nav>

      <div class="opa-faq__col">
        {%- assign groups = '[
          {"id":"c1","title":"Is it for me","qs":[
            {"q":"Is this for me?","a":"If you have ideas you don''t ship, yes. The protocol is built for people who get stuck in the loop. It removes the decisions that paralyze you and leaves only execution. You don''t need experience. You need 14 nights."},
            {"q":"I''ve never sold anything online.","a":"Perfect — that''s exactly who this is for. You''re not starting with a product, you''re starting with a person and a problem. The protocol walks you through every step, and the Coach catches you when you wobble. First-timers finish this all the time."},
            {"q":"What if I don''t have an idea yet?","a":"Phase 1 handles that. You start with a person, not an idea. You define who you want to serve, then find what they actually struggle with. The idea emerges from real conversations in Phase 2 — not from your head."}
          ]},
          {"id":"c2","title":"How the Coach works","qs":[
            {"q":"What exactly is the Coach?","a":"A Master Prompt you load into free Claude or ChatGPT. Once loaded, the chat knows the full 14-night protocol — every phase, every night, every template. You use it like a senior operator who already shipped and remembers every step."},
            {"q":"How do I use it day to day?","a":"Three steps. Open the night in your Notion portal — it tells you the objective and the done-check. Paste the Master Prompt into Claude or ChatGPT. Tell the Coach what night you''re on and where you''re stuck. It gives you the next move, not a lecture."},
            {"q":"What does the Coach do when I''m stuck?","a":"It diagnoses, then prescribes. No motivational speech. It opens the right template, narrows the next step to something doable in under an hour, and asks you to report back when it''s done."}
          ]},
          {"id":"c3","title":"Time & effort","qs":[
            {"q":"How much time per night?","a":"1 to 2 hours. Some nights are intense (validation calls), some are short (decision nights). Total over 14 nights is roughly 20 hours. One focused evening at a time."},
            {"q":"I have a full-time job — can I still do it?","a":"Yes. The protocol is built around 1–2 hour blocks, so it fits an evening or an early morning. You can also stretch the 14 nights into a 21-night calendar. What matters is the sequence, not the speed."},
            {"q":"What if I miss a night?","a":"Nothing breaks. The protocol is a sequence, not a schedule. Pick up where you left off. The only rule is you don''t skip steps — each one feeds the next."}
          ]},
          {"id":"c4","title":"Money","qs":[
            {"q":"Why is it only $49?","a":"Because it''s a system, not a 40-hour course you''ll never finish. We''d rather it be an easy yes and have you actually ship. One-time payment, lifetime access, no upsells."},
            {"q":"Do I need to pay for Claude or ChatGPT?","a":"No. The Coach runs on the free tiers of Claude or ChatGPT. You load one Master Prompt and you''re set. No subscription required to complete the 14 nights."},
            {"q":"What if it doesn''t work — refund?","a":"Yes. 14-night money-back. If you follow the protocol and don''t have a product live by Night 14, email within 30 days. The $49 is returned. No forms, no interrogation."}
          ]},
          {"id":"c5","title":"What you get","qs":[
            {"q":"What''s included?","a":"Four modules: the complete 17-page protocol, the AI Coach Master Prompt, templates for every phase (audience profile, validation scripts, launch outreach), and binary done/not-done criteria for each night. Delivered as a Notion portal."},
            {"q":"How is this different from a course?","a":"Courses teach. This executes. You won''t watch hours of video. You''ll do one task per night, check a completion box, and move forward. By Night 14 you have a product live. Most courses leave you with notes."},
            {"q":"What kind of product will I launch?","a":"One of three formats: a PDF guide, a template pack, or a prompt pack. Phase 1 helps you pick the right format for your audience — buildable in days, not months."}
          ]},
          {"id":"c6","title":"After you buy","qs":[
            {"q":"How do I get access?","a":"Immediately. After payment you get an email with access to the Notion portal. You''re inside within 60 seconds and can start Night 1 right away."},
            {"q":"Is there support or community?","a":"The AI Coach is your primary guide — available 24/7 inside Claude or ChatGPT. For account-related matters, email hello@oneproductai.com."},
            {"q":"Will this work outside the US?","a":"Yes. The protocol works anywhere. Examples use US audiences for market size, but the structure applies to any English-speaking market and uses tools available worldwide."}
          ]}
        ]' -%}

        {%- assign groups_data = groups | parse_json -%}
        {%- for g in groups_data -%}
          <div class="opa-faq__group" id="faq-{{ g.id }}">
            <h3 class="opa-faq__h opa-reveal">{{ g.title }}</h3>
            {%- for item in g.qs -%}
              <details class="opa-faq__item opa-reveal">
                <summary class="opa-faq__q">
                  <span>{{ item.q }}</span>
                  <span class="opa-faq__icon" aria-hidden="true">+</span>
                </summary>
                <div class="opa-faq__a">{{ item.a }}</div>
              </details>
            {%- endfor -%}
          </div>
        {%- endfor -%}
      </div>
    </div>
  </div>
</section>

{% schema %}
{ "name": "FAQ", "settings": [], "presets": [{ "name": "FAQ" }] }
{% endschema %}
```

Same caveat as Task 11: if `parse_json` doesn't exist in this Liquid version, inline all 18 questions as static markup.

- [ ] **Step 2: Delete chatbot section**
  ```
  Remove file shopify-theme/sections/chatbot.liquid
  ```

- [ ] **Step 3: Commit**
  ```
  git add -A shopify-theme/sections/faq.liquid shopify-theme/sections/chatbot.liquid
  git commit -m "feat(faq): editorial FAQ with merged chatbot content; remove chatbot section"
  ```

---

## Task 15: Section 11 — Final-CTA (light)

**Files:** Rewrite `shopify-theme/sections/final-cta.liquid`

- [ ] **Step 1: Write**

```liquid
<section class="opa-section opa-light opa-final" id="final">
  <div class="opa-container opa-final__inner">
    <p class="opa-eyebrow opa-reveal">The decision</p>
    <h2 class="opa-display opa-reveal">
      <span class="opa-final__line">Stop planning.</span>
      <span class="opa-final__line opa-italic">Start shipping.</span>
    </h2>

    <p class="opa-lead opa-reveal">Fourteen nights from now you can either be in the same loop or have a live product. The Method decides for you.</p>

    <a href="/products/one-product-ai" class="opa-btn opa-btn--primary opa-btn--lg opa-reveal">
      <span>Become an Operator — $49</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </a>

    <p class="opa-final__meta opa-reveal">$49 once · Lifetime · Refund if you don&rsquo;t ship</p>
  </div>
</section>

{% schema %}
{ "name": "Final CTA", "settings": [], "presets": [{ "name": "Final CTA" }] }
{% endschema %}
```

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/final-cta.liquid
  git commit -m "feat(final): closing CTA section"
  ```

---

## Task 16: Delete dropped sections + update index

**Files:**
- Delete: `shopify-theme/sections/manifesto.liquid`
- Delete: `shopify-theme/sections/value-stack.liquid`
- Modify: `shopify-theme/templates/index.json`

- [ ] **Step 1: Delete sections**
  ```
  Remove shopify-theme/sections/manifesto.liquid
  Remove shopify-theme/sections/value-stack.liquid
  ```

- [ ] **Step 2: Rewrite `templates/index.json`**

```json
{
  "sections": {
    "hero": { "type": "hero", "settings": {} },
    "problem": { "type": "problem", "settings": {} },
    "solution": { "type": "solution", "settings": {} },
    "how-it-works": { "type": "how-it-works", "settings": {} },
    "what-you-get": { "type": "what-you-get", "settings": {} },
    "coach": { "type": "coach-in-room", "settings": {} },
    "timeline": { "type": "timeline", "settings": {} },
    "field-data": { "type": "field-data", "settings": {} },
    "guarantee": { "type": "guarantee", "settings": {} },
    "faq": { "type": "faq", "settings": {} },
    "final-cta": { "type": "final-cta", "settings": {} }
  },
  "order": [
    "hero",
    "problem",
    "solution",
    "how-it-works",
    "what-you-get",
    "coach",
    "timeline",
    "field-data",
    "guarantee",
    "faq",
    "final-cta"
  ]
}
```

- [ ] **Step 3: Commit**
  ```
  git add -A shopify-theme/sections/manifesto.liquid shopify-theme/sections/value-stack.liquid shopify-theme/templates/index.json
  git commit -m "feat(theme): drop manifesto + value-stack; lock 11-section order"
  ```

---

## Task 17: Product page (`main-product.liquid`)

**Files:** Rewrite `shopify-theme/sections/main-product.liquid`

- [ ] **Step 1: Write a condensed single-page sales version mirroring the landing voice**

Use the same `opa-section opa-light` / `opa-dark` blocks. Sections inside the product page:
- Hero (light) — title, price, buy button (Shopify `{% form 'product' %}`)
- Four modules (light) — same as landing module 5
- Three phases chips (dark)
- Guarantee (light)
- 4 condensed FAQ (dark)
- Final CTA (light)

Must wrap entire content in `{%- form 'product', product, id: 'product-form' -%} ... {%- endform -%}` and include hidden `<input name="id" value="{{ product.selected_or_first_available_variant.id }}">`.

- [ ] **Step 2: Commit**
  ```
  git add shopify-theme/sections/main-product.liquid
  git commit -m "feat(product): rewrite product page to match landing voice"
  ```

---

## Task 18: Local verification

- [ ] **Step 1: Run local dev**
  ```
  cd shopify-theme; shopify theme dev --store ugmfjg-8y.myshopify.com
  ```
  Open the preview URL. Click through each section. Check console for errors.

- [ ] **Step 2: Mobile spot-check**
  In DevTools, set viewport to 375 × 812 (iPhone SE). Scroll the page top to bottom. No horizontal scroll. All CTAs reachable.

- [ ] **Step 3: Click-test interactive sections**
  - Coach simulator: click each of 3 scenarios. Typing dots animate. Coach answer fades in line-by-line.
  - Timeline: scroll past it. Vertical spine fills.
  - FAQ: click each `<details>`. Expand/collapse works.

- [ ] **Step 4: If any issues found, fix and commit per-fix.**

---

## Task 19: Push as unpublished theme

- [ ] **Step 1: Push**
  ```
  cd shopify-theme; shopify theme push --unpublished --store ugmfjg-8y.myshopify.com
  ```

- [ ] **Step 2: Capture preview URL**
  CLI prints a preview URL and an editor URL. Save both to plan notes.

- [ ] **Step 3: Report to user**
  Send preview URL and editor URL. User reviews and gives publish approval.

---

## Self-Review checklist (run after each task is complete)

For each completed task, verify:
- ✅ Brand "One Product AI" used everywhere (no leftover "Deep Method")
- ✅ Section uses correct `opa-light` or `opa-dark` class
- ✅ Single accent color (no cyan/pink/indigo gradient soup)
- ✅ Fraunces only for `.opa-display` and `.opa-italic` spans
- ✅ No exclamation marks anywhere in copy
- ✅ Mobile @375px: no horizontal scroll
- ✅ Commit message follows `feat(scope): description` format

---

## Appendix — Task 2: full CSS source

Will be authored during Task 2 execution (too long to include verbatim in the plan; CSS is ~60KB). It will be a single file with this structure:

```
/* ============================
   1. Reset & base
   2. Tokens (light + dark)
   3. Typography utilities
   4. Layout (container, section, grid)
   5. Buttons
   6. Reveal animation
   7. Header / footer
   8. Section: hero
   9. Section: problem
  10. Section: solution
  11. Section: how-it-works
  12. Section: what-you-get + module mockups
  13. Section: coach simulator
  14. Section: timeline
  15. Section: field-data
  16. Section: guarantee
  17. Section: faq
  18. Section: final-cta
  19. Mobile overrides
  ============================ */
```

---

## Appendix — Task 3: full JS source

Will be authored during Task 3 execution (~10 KB). Structure:

```js
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    coachSimulator();
    timelineSpine();
    faqAccordion();
    faqCategoryJump();
  });

  function revealOnScroll() { /* IntersectionObserver, .opa-reveal → .is-in */ }
  function coachSimulator() { /* scenario chips → typed lines */ }
  function timelineSpine()  { /* fill .opa-timeline__spine span on scroll */ }
  function faqAccordion()   { /* native <details>, no JS needed, but enhance aria */ }
  function faqCategoryJump(){ /* sticky nav, mark active section on scroll */ }
})();
```

---

**End of plan.**
