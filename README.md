# Canary — C01 Capsule landing

Static marketing page for the Canary C01 keyboard capsule.

## Stack

- Static HTML (`index.html`, `canary-print.html`)
- React 18 loaded from CDN (UMD) — see `<script>` tags at the bottom of `index.html`
- JSX in `src/*.jsx` is compiled in-browser by `@babel/standalone` (dev convenience — not ideal for production; see audit Phase 2)
- One Vercel serverless function: `api/subscribe.js` (Phase 1 stub, logs only)
- Deployed on Vercel as a static site (`vercel.json` sets `framework: null`)

## Local development

```bash
npm run dev
# Serves the current directory on http://localhost:3002 with caching disabled.
```

The form's POST to `/api/subscribe` will 404 on `npx http-server` — it only exists when deployed to Vercel or run with `vercel dev`.

## File map

```
index.html              # main page; <head> contains all meta + JSON-LD
canary-print.html       # printable variant (noindex)
robots.txt              # crawl + AI engine rules
sitemap.xml             # single-page sitemap with image entries
llms.txt                # AI-engine-readable brand + product summary
vercel.json             # Vercel config + security headers + cache rules
api/
  subscribe.js          # POST endpoint for the notify form (stub)
src/
  app.jsx               # React entry — composes sections in canonical order
  components.jsx        # Reveal, Placeholder, FilmGateway, SignupForm (email + colorway + use case + social)
  sections-shared.jsx   # Manifesto, Scarcity, Colorways, Setup, Build, Specs, System, FAQ, Capture, Community, Footer
  direction-safe.jsx    # Default conversion hero (eyebrow/H1/subhead/CTAs/scarcity) + film launcher
  direction-bold.jsx    # Drop-culture hero variant + ticker
  tweaks-host.js        # Tweaks panel state (localStorage) + window.canaryTrack analytics seam
learn/
  index.html            # /learn hub (CollectionPage + Breadcrumb schema)
  what-is-a-65-keyboard.html              # flagship article (Article + FAQ + Breadcrumb schema)
  aluminum-vs-plastic-mechanical-keyboards.html  # SCAFFOLD (noindex) — TODO: full article
  best-keyboard-for-desk-setup.html              # SCAFFOLD (noindex) — TODO: full article
assets/
  canary-bug.png        # bug logomark
  canary-wordmark.png   # full wordmark
  canary-logo.png       # legacy
  canary-video.mp4      # 34 MB hero film — re-encode planned
  keyboards/            # C01 product photography
```

## Direction toggle

Two hero variants ship in the same page. Toggle via the bottom-right Tweaks panel (opens via parent-window postMessage in the design host, or by setting `localStorage['canary.tweaks.v1']` manually).

```js
// in DevTools console:
localStorage.setItem('canary.tweaks.v1', JSON.stringify({ direction: 'bold' }));
location.reload();
```

## Deploy

`git push` → Vercel auto-deploys. `vercel.json` controls headers, caching, and clean URLs. The current CSP is **report-only**; promote to enforcing after a few days of clean reports.

## Canonical host

The site is canonicalised on **https://www.canary.store/** (canonical tag, OG, JSON-LD,
sitemap, robots, llms.txt all use www). **ACTION REQUIRED in hosting:** confirm Vercel +
DNS redirect the apex (`canary.store`) and `http://` variants → `https://www.canary.store/`
so the canonical never points at a redirecting URL.

## Analytics / tracking

- `window.canaryTrack(name, params)` (in `src/tweaks-host.js`) is the single event seam.
  It mirrors to `dataLayer` and calls `gtag('event', ...)`. Learn pages include a minimal inline copy.
- Events wired: `waitlist_view`, `waitlist_submit`, `colorway_select`, `use_case_select`,
  `hero_cta_click`, `secondary_cta_click`, `faq_expand`, `learn_page_click` (+ legacy `generate_lead`).
- TODO: `outbound_social_click` fires once social links exist (see Footer TODO).
- GA4 ships with **Consent Mode v2 default-denied**, so events buffer until a consent banner
  grants `analytics_storage`. The banner is still TODO — analytics will be sparse until then.
- TODO(pixels): Meta Pixel + TikTok Pixel destinations are stubbed inside `canaryTrack`.

## Known gaps / launch TODOs

- `SignupForm` posts `email`, `colorway`, `useCase`, `social` to `/api/subscribe`, which still only
  logs. Wire to a real ESP (Klaviyo / ConvertKit / Resend) in Phase 2 and map the qualifying fields
  to ESP custom properties / segments (see `api/subscribe.js`).
- JSX is still transpiled in-browser. Replace with a real build (esbuild / Vite / Astro) in Phase 2.
- Product schema ships **without an Offer** (price not final, range USD 175–225). Add an `Offer`
  with a real `price` + `availability` once pricing is locked.
- `/learn` has 1 flagship article + 2 noindex scaffolds. Finish the scaffolds (outlines + TODOs are
  in each file), remove `noindex`, and add them to `sitemap.xml`.
- No `/privacy` or `/terms` page yet.
- Cookie consent banner not yet built; GA4 ships with consent default-denied.
- Search Console + Bing Webmaster Tools verification not yet added (add verification meta/DNS).
