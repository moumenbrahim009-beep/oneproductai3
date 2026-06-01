# One Product AI — Shopify Theme

Custom Shopify theme that mirrors the One Product AI landing page (Next.js version) — sections, copy, animations, glass styling.

## Sections (in order on homepage)

1. **Hero** — headline, gradient text, CTA, stats
2. **Problem** — 3 loop cards
3. **Solution** — comparison cards
4. **How it works** — 3 phase cards
5. **Coach in the Room** — 3 setup steps + 3 conversation tabs with replay
6. **What You Get** — 4 feature cards
7. **Timeline** — 14-day vertical spine with phase blocks
8. **Chatbot** — preview Q&A (6 categories, 20 questions)
9. **Guarantee** — 14-day refund card
10. **FAQ** — 10-item accordion
11. **Final CTA** — closing pitch + marquee ticker

## Folder layout

```
shopify-theme/
├── assets/         theme.css, theme.js
├── config/         settings_schema.json, settings_data.json
├── layout/         theme.liquid
├── locales/        en.default.json
├── sections/       header/footer/hero/problem/... (one Liquid file per section)
├── snippets/       (empty — reserved)
└── templates/      404.liquid, index.json, product.json, cart.json, page.json, ...
```

## Upload to your Shopify store

### Method 1 — Upload as ZIP (easiest)

1. **Zip the folder.**

   On Windows (PowerShell), from the project root:
   ```powershell
   Compress-Archive -Path shopify-theme\* -DestinationPath one-product-ai-theme.zip
   ```
   On macOS / Linux:
   ```bash
   cd shopify-theme && zip -r ../one-product-ai-theme.zip . && cd ..
   ```

2. **In Shopify admin** → **Online Store** → **Themes**.
3. Click **Add theme** → **Upload zip file** → pick `one-product-ai-theme.zip`.
4. Wait for the upload to finish (under 1 minute).
5. Click **Actions** → **Publish** on the new theme.

### Method 2 — Shopify CLI (for live previews while editing)

1. Install the CLI globally (one-time): `npm i -g @shopify/cli@latest`
2. From the `shopify-theme/` folder, authenticate and push:
   ```bash
   cd shopify-theme
   shopify theme dev --store ugmfjg-8y.myshopify.com
   ```
3. Browser opens a hot-reloading preview against your store. Edit any file and changes appear instantly.
4. When you're done previewing, push the final version:
   ```bash
   shopify theme push --store ugmfjg-8y.myshopify.com
   ```

## After uploading — checklist

- [ ] **Publish** the new theme (Themes → Actions → Publish).
- [ ] **Theme settings** → set the Checkout URL to your product page (default: `/products/one-product-ai`).
- [ ] **Online Store → Preferences** → remove the password if the store is in preview mode.
- [ ] Visit the storefront homepage and verify the hero, animations, and Chatbot all render.
- [ ] Click **Get Started — $49** on the homepage → confirms checkout flow.
- [ ] Open the Coach section, click each persona tab, click **Replay** — conversations should animate.
- [ ] Scroll the Timeline — the vertical spine fills as you scroll.

## What still needs work

This theme is a faithful port of the Next.js landing. A few things are intentionally simpler than the React version:

- **No mouse-spotlight on Hero** — the React version follows the cursor with a radial gradient; this is harder to keep snappy in vanilla JS and was skipped.
- **No Magnetic / Tilt effects** — buttons and cards don't tilt toward the cursor.
- **No Counter animation on the stat numbers** — they render as static `$49`, `14`, `1`.

These are all polish-level. The brand voice, layout, copy, animations (gradient text, aurora, scroll reveal, typing dots, Timeline progress, Chatbot, Coach replay) all carry over.

## Editing tip

All copy lives inside the section files in `sections/*.liquid`. The CSS lives in `assets/theme.css`. JS in `assets/theme.js`. There is **no build step** — edit files, save, refresh.
