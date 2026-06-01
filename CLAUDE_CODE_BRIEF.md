# CLAUDE CODE BRIEF — ONE PRODUCT AI v2.1
## Mission: Audit the live Shopify theme + fix all issues + ship.

**Project:** One Product AI ($49 digital product)  
**Live URL:** https://oneproductai.com/  
**Local path:** `C:\Users\ADMIN\Documents\GitHub\oneproductai3\shopify-theme\`  
**Currency:** **MUST be USD** (currently MAD — owner is fixing in admin UI)  
**Owner runs:** Shopify CLI to push (`shopify theme push`)

---

## 🎯 CONTEXT YOU NEED

The site is **already live and working**. This is a polish pass. Do NOT rebuild — only fix the issues listed below.

The product itself (One Product AI) is a $49 digital protocol that helps people launch their first digital product in 14 days. Voice: calm, declarative, "operating system." No hype, no exclamation marks. "Older brother who's done it."

**Lock decisions (do NOT touch):**
- Price: $49 (in code, in copy)
- Brand: "One Product AI" / "BM Digital LLC"
- 11 sections, in this order: hero → problem → solution → how-it-works → coach → what-you-get → timeline → chatbot → guarantee → faq → final-cta
- Color system: violet (#8b5cf6), indigo (#6366f1), cyan (#22d3ee), pink (#e879f9), base (#07060f)
- Typography: Inter + Inter Tight
- All animations / interactions stay

---

## 📋 ISSUES FOUND IN AUDIT — FIX EACH ONE

### 🔴 P0 — CRITICAL (fix first)

#### 1. **Product page is broken / empty**
**File:** `sections/main-product.liquid`  
**Problem:** Product has no description, no image, no SEO. The current page just shows the Shopify default product data which is empty.  
**Fix:** Rewrite `main-product.liquid` to be a **standalone sales page** that doesn't depend on `product.description` being filled. Include:
- Hero block: product title, $49 price, "Buy now" button (keep the existing Shopify form)
- 4-block "what you get" mirror (Protocol / Coach Prompt / Templates / Done criteria)
- A condensed timeline (just the 3 phases as chips)
- Guarantee restated
- Below-fold FAQ (4 most important Qs)
- Final "Buy now — $49" button

Keep the `{%- form 'product', product, id: 'product-form' -%}` wrapper exactly as is. Use the same CSS classes already in `theme.css` — do NOT add new ones unless absolutely needed.

#### 2. **Layout `<title>` tag still says "ONE PRODUCT AI" in caps**
**File:** `layout/theme.liquid`  
**Problem:** When `page_title` is set by Shopify (e.g. on product page), it comes back as the literal product title. Currently the product title in Shopify admin is `"one product ai"` (lowercase, weak SEO).  
**Fix in code:** in `layout/theme.liquid`, change the title block to use the product's SEO title when on a product page, with a sensible fallback:
```liquid
<title>
  {%- if template contains 'product' -%}
    One Product AI — Launch Your First Digital Product in 14 Days
  {%- elsif page_title -%}
    {{ page_title }} — One Product AI
  {%- else -%}
    One Product AI — Launch Your First Digital Product in 14 Days
  {%- endif -%}
</title>
```

Also add OpenGraph image meta (placeholder URL, owner will replace):
```liquid
<meta property="og:image" content="{{ 'og-image.png' | asset_url }}">
<meta property="og:url" content="{{ canonical_url }}">
<meta property="og:site_name" content="One Product AI">
```

#### 3. **Chatbot data attribute escaping is fragile**
**File:** `sections/chatbot.liquid`  
**Problem:** The JSON in `data-cats` and `data-qa` uses `| strip | escape` which can break with curly quotes and apostrophes inside the JSON strings (currently uses `’` smart quotes which DO survive but `"` would not). It's working now but one wrong character will break the entire chatbot silently.  
**Fix:** Wrap each `data-` attribute in `{{ ... | escape }}` AFTER properly JSON-encoding. Replace:
```liquid
data-cats='{{ chatbot_cats | strip | escape }}'
data-qa='{{ chatbot_qa | strip | escape }}'
```
with:
```liquid
data-cats="{{ chatbot_cats | strip | escape }}"
data-qa="{{ chatbot_qa | strip | escape }}"
```
(double quotes outside, `escape` properly converts inner double quotes to `&quot;` which the browser then decodes back to `"` for JSON.parse).

In `theme.js`, the `JSON.parse(chat.dataset.qa || "[]")` will then work reliably.

---

### 🟠 P1 — HIGH (fix in same pass)

#### 4. **Coach section: persona avatars in tabs should reflect active state better on mobile**
**File:** `sections/coach-in-room.liquid` + `assets/theme.css`  
**Problem:** On mobile (<1024px), the 3 persona tabs are in a horizontal row but their text is centered below the avatar, which makes the "Day 0 · Has idea, no confidence" line wrap awkwardly on Mike's tab.  
**Fix:** In `theme.css`, in the mobile rule `@media (max-width: 1023px)` for `.opa-coach-tab__status`, add `font-size: .55rem; line-height: 1.3;` and ensure the parent `<div>` containing name+status has `min-width: 0` and `text-align: center` already. Specifically add:
```css
@media (max-width: 1023px) {
  .opa-coach-tab__name { font-size: .8rem; }
  .opa-coach-tab__status { font-size: .55rem; line-height: 1.3; }
}
```

#### 5. **Hero CTA on mobile is too wide**
**File:** `assets/theme.css`  
**Problem:** `.opa-btn--lg` keeps `padding: 1.05rem 2rem` even on narrow screens. With the long "Get Started — $49" + arrow icon, this overflows on iPhone SE width (375px).  
**Fix:** Add:
```css
@media (max-width: 480px) {
  .opa-btn--lg { padding: .95rem 1.4rem; font-size: .92rem; }
  .opa-hero__headline { font-size: clamp(2.25rem, 9vw, 3.5rem); }
}
```

#### 6. **FAQ items don't have ARIA expanded state**
**File:** `sections/faq.liquid` + `assets/theme.js`  
**Problem:** Buttons are missing `aria-expanded` and `aria-controls`. Screen readers won't announce open/closed state.  
**Fix in liquid:** add `aria-expanded="false"` to each `.opa-faq__q` button, and `id="faq-a-N"` to each `.opa-faq__a` div with matching `aria-controls="faq-a-N"` on the button.  
**Fix in JS:** in the FAQ accordion handler, after `item.classList.toggle("is-open", !isOpen)`, add:
```js
btn.setAttribute("aria-expanded", String(!isOpen));
```

#### 7. **Timeline fill animation jumps on first scroll**
**File:** `assets/theme.js`  
**Problem:** `updateFill()` runs on init when timeline is below viewport, sets `progress` to 0, but on first scroll it jumps from 0 to whatever — no smooth start.  
**Fix:** Wrap `updateFill` in `requestAnimationFrame` for the scroll handler, and run an initial call only once `IntersectionObserver` sees the timeline:
```js
if ("IntersectionObserver" in window) {
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateFill(); ticking = false; });
      ticking = true;
    }
  };
  const io3 = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        updateFill();
      } else {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    });
  }, { threshold: 0 });
  io3.observe(timeline);
}
```
Replace the existing `window.addEventListener("scroll", updateFill, ...)` calls.

---

### 🟡 P2 — MEDIUM (nice to have, do if time)

#### 8. **Add a favicon**
**File:** `layout/theme.liquid`  
**Fix:** Right before `</head>`, add:
```liquid
<link rel="icon" type="image/svg+xml" href="{{ 'favicon.svg' | asset_url }}">
<link rel="apple-touch-icon" href="{{ 'apple-touch-icon.png' | asset_url }}">
```
Then create a simple SVG favicon as `assets/favicon.svg` — a gradient "1" on a dark square (matching the nav logo mark). Owner will add `apple-touch-icon.png` separately.

#### 9. **404 page is generic**
**File:** `templates/404.liquid`  
**Fix:** Replace with a branded 404 that matches the site:
- Same dark background
- "404" big with gradient text
- "This page doesn't exist. The protocol does."
- Button: "Back home" → "/"

#### 10. **Cart template empty state**
**File:** `sections/main-cart.liquid` (might already be acceptable, just verify it uses the same dark style)  
**Fix:** If empty cart UI looks bare, add a "Your cart is empty" message styled with `opa-section__h2` and a CTA button back to `/products/one-product-ai`.

#### 11. **Add a sticky "Buy now" bar that appears after scrolling past hero on mobile**
**File:** New section `sections/sticky-buy.liquid` + theme.js + theme.css  
**Optional but high conversion impact.** On mobile only, when user scrolls past hero, fade in a fixed bar at the bottom:
- Left: "One Product AI · $49"
- Right: "Buy now →" button
Should hide when chatbot/FAQ section is in view (so it doesn't cover content).

Skip this one if it adds risk. Mark as TODO if not done.

---

## 🚫 DO NOT DO

- Do not rebuild any section from scratch.
- Do not change colors, fonts, or the visual design language.
- Do not add new third-party libraries.
- Do not touch the chatbot Q&A copy — it's locked.
- Do not touch the 3 Coach conversation scripts (Sarah/Mike/Alex) — locked.
- Do not change pricing copy ($49) anywhere.
- Do not add analytics, tracking pixels, or scripts — owner does that separately.
- Do not change the section order in `templates/index.json`.

---

## ✅ DEFINITION OF DONE

After your pass:
1. All P0 + P1 issues fixed in the local theme folder.
2. No console errors when loading the page locally.
3. `shopify theme dev` runs cleanly with no Liquid errors.
4. Mobile layout (375px width) has no horizontal scroll, no overflowing buttons.
5. Lighthouse score on mobile: Performance ≥ 85, Accessibility ≥ 95.
6. Owner runs `shopify theme push` and verifies on https://oneproductai.com.

---

## 📦 DELIVERABLES

When done, output:
1. A short list of files you changed.
2. Any P2 items you skipped (with one-line reason).
3. The exact `shopify theme push` command for the owner to run.
4. A 3-bullet "what to verify in browser" checklist.

---

## 🗂️ FILE INVENTORY (current live theme)

```
assets/
  theme.css       (43 KB — full design system, vanilla CSS)
  theme.js        (9 KB — nav, reveal, coach, chatbot, faq, timeline)
config/
  settings_data.json    (brand_name, checkout_url)
  settings_schema.json
layout/
  theme.liquid    (1.7 KB — Inter fonts, OG tags, body wrapper)
locales/
  en.default.json
sections/
  header.liquid           (logo + nav + Get Started button)
  hero.liquid             (Aurora blobs, headline, $49 CTA, 3 stats)
  problem.liquid          (3-card grid: Idea / Start / Stall)
  solution.liquid         (2-col comparison: Courses vs OPA)
  how-it-works.liquid     (3 phases: 01 / 02 / 03)
  coach-in-room.liquid    (3-step setup + tabs + Sarah/Mike/Alex panels)
  what-you-get.liquid     (4-feat grid)
  timeline.liquid         (3 phases with 14 day cards, scroll spine)
  chatbot.liquid          (interactive Q&A by category, 20 Qs total)
  guarantee.liquid        (shield badge + 14-day refund copy)
  faq.liquid              (10 expandable items)
  final-cta.liquid        (big CTA + marquee ticker)
  footer.liquid           (logo, email, policy links)
  main-product.liquid     (⚠️ THIN — needs P0 #1 fix)
  main-cart.liquid
  main-collection.liquid
  main-page.liquid
  header-group.json, footer-group.json
templates/
  index.json              (11 sections in correct order)
  product.json            (just main-product)
  cart.json, collection.json, page.json, search.json, etc.
  404.liquid, password.liquid, gift_card.liquid
```

---

## END OF BRIEF — START WITH P0 #1
