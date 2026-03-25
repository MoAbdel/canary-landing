# Canary Landing Page — Design Spec
**Date:** 2026-03-25
**Status:** Approved

---

## Overview

Single-page Next.js landing page for the Canary brand. Canary is a keyboard-first creative workspace accessories brand (keyboard as substrate, with keycaps, switches, mousepads, deskpads, crates, power peripherals as the ecosystem). Hosted on Vercel via GitHub.

---

## Visual Design

### Palette
- **Primary (background):** Canary Yellow `#FFEF00`
- **Secondary (structure/type):** Near-black `#111111`

### Aesthetic
"Framed / Industrial" — yellow field contained by a heavy black bottom bar. No grid, no noise, no texture. Pure yellow canvas with black as the only structural element.

### Typography
- **"CANARY" headline:** Massive, full-width, top-anchored. Bold condensed sans-serif. Target font: **Anton** (Google Fonts) or nearest available match. Color: `#111`. No letter-spacing reduction — tight and impactful.
- **"SYSTEMS + OBJECTS" tagline:** Small, wide-tracked monospace (`Courier New` or `Space Mono`). Centered vertically in the yellow field. Color: `#111`. Letter-spacing: `0.28em`.
- **"CLICK TO WATCH" hint:** `font-size: 9px`, `font-family: 'Courier New', monospace`, `letter-spacing: 0.2em`, `color: rgba(0,0,0,0.35)`, `text-transform: uppercase`. Positioned directly above the logo mark with `margin-bottom: 8px`.

### Layout (top → bottom, full viewport height)
1. **Yellow field** — flex column, full height minus bottom bar
   - `CANARY` headline — top-anchored, padding-top ~4% viewport
   - `SYSTEMS + OBJECTS` — vertically centered in remaining space (flex: 1, center)
   - `CLICK TO WATCH` hint — small label above logo
   - **Canary logo mark** — bottom of yellow field, padding-bottom ~6%
2. **Black bottom bar** — `height: clamp(6px, 1.2vw, 14px)`, full width, `background: #111`

No top bar. No inner border/frame. Clean yellow edge-to-edge.

### Logo Mark
- File: `canary logo.PNG` (provided by client — PNG with yellow background)
- Rendered using a plain `<img>` tag (NOT `next/image`) with explicit `width={160}` and `height` proportional — this avoids a known rendering issue where `next/image`'s wrapper `<span>` can break `mix-blend-mode` by creating an unexpected stacking context
- `mix-blend-mode: multiply` on the `<img>` so the yellow PNG background drops out on the yellow canvas
- `display: block` to eliminate inline baseline gap
- In production: replace PNG with transparent-bg SVG or PNG for crispness; at that point `next/image` can be used without the blend mode workaround
- No TM mark

---

## Interactions

### Logo Hover
- `transform: scale(0.93)` — physically "presses in" on hover (intentional scale-down, not lift)
- `filter: drop-shadow(0 6px 16px rgba(0,0,0,0.35))` — depth shadow on hover
- Transition: `0.18s cubic-bezier(0.34, 1.56, 0.64, 1)` (slight spring)
- On active/click: `scale(0.88)`

### Logo Click → Video Modal
- Logo is the sole click target
- Click opens the video modal (see below)

---

## Video Modal

### Facade Pattern (performance)
- The `VideoModal` component is **not imported at page load**
- On logo click: `const { VideoModal } = await import('./VideoModal')` — dynamic import
- This ensures zero video player weight on initial load

### Modal UI
- **Backdrop:** `background: rgba(0,0,0,0.75)`, `backdrop-filter: blur(8px)` (glassmorphism)
- **Close button:** `✕` top-right, `position: absolute`, white color, 24px+ tap target
- **Video container:** centered, `width: 90%`, `max-width: 900px`, `aspect-ratio: 16/9`, black bg
- **Video embed:** `<iframe>` inserted only after dynamic import resolves
- **Dismiss triggers:** `✕` button, Escape key, backdrop click

### Video URL
Placeholder: `[INSERT VIDEO URL]` — client to provide

---

## Accessibility (WCAG)

- Logo wrapper: `role="button"`, `aria-label="Watch the Canary film"`, `tabIndex={0}`, keyboard Enter/Space triggers click
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-label="Canary film"`, focus trap on open, focus returns to logo on close
- All tap targets: minimum 48×48px (logo padded to meet this on mobile)

---

## Responsive Behavior

- `CANARY` headline: `font-size: clamp(72px, 14vw, 160px)` — scales from mobile to 4K
- Bottom bar: `height: clamp(6px, 1.2vw, 14px)`
- Logo: `width: 160px` fixed (thumb-safe)
- Modal video: `width: 90vw` on mobile, `max-width: 900px` on desktop

---

## File Structure

```
app/
  page.tsx           — Server Component (no JS overhead, pure HTML shell)
  layout.tsx         — Font preload (Anton + Space Mono), metadata, viewport
  components/
    LogoTrigger.tsx  — 'use client' — hover animation + dynamic modal import
    VideoModal.tsx   — 'use client' — modal UI, iframe, focus trap
public/
  canary-logo.png    — Logo mark (replace with SVG when available)
```

---

## Performance Goals

- **LCP:** CANARY headline (text, instant)
- **No render-blocking resources** — fonts loaded via `next/font/google`
- **Video player weight:** 0kb on initial load (facade pattern)
- **Image:** Plain `<img>` tag for logo (see Logo Mark section — `next/image` deferred until transparent-bg asset is available)

---

## Out of Scope
- Navigation / multi-page routing
- E-commerce / product listings
- Any content beyond the single hero view
