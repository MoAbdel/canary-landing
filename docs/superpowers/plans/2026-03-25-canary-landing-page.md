# Canary Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page Next.js landing page for the Canary brand with a hero layout, animated logo trigger, and lazy-loaded video modal.

**Architecture:** Next.js 15 App Router with a Server Component page shell (zero client JS on load) and two isolated Client Components — `LogoTrigger` handles hover/click animation, `VideoModal` is dynamically imported only when the logo is clicked (facade pattern). The page is statically generated at build time.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Google Fonts (Anton + Space Mono), Vercel

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `app/layout.tsx` | Create | Root layout — font loading, metadata, viewport |
| `app/page.tsx` | Create | Server Component — static page shell, imports LogoTrigger |
| `app/globals.css` | Create | Tailwind base + CSS custom properties |
| `app/components/LogoTrigger.tsx` | Create | Client Component — hover animation + dynamic VideoModal import |
| `app/components/VideoModal.tsx` | Create | Client Component — modal UI, iframe, focus trap, close logic |
| `public/canary-logo.png` | Copy | Logo asset (yellow-bg PNG, mix-blend-mode: multiply) |
| `public/canary-video.mp4` | Copy | Video asset (watermarked draft — replace with final cut before launch) |
| `tailwind.config.ts` | Create | Canary color tokens |
| `next.config.ts` | Create | Minimal Next.js config |
| `package.json` | Create | Dependencies |

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `tsconfig.json`

- [ ] **Step 1: Initialise the project**

Run inside `C:\Users\OCPCz\Desktop\canary-landing`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```
Accept all defaults. This scaffolds `app/`, `tailwind.config.ts`, `next.config.ts`, `tsconfig.json`, `package.json`.

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```
Expected: server running at `http://localhost:3000` with the default Next.js page.

- [ ] **Step 3: Clear the default page content**

Delete `app/page.tsx` content (keep the file). Replace with:
```tsx
export default function Home() {
  return <main>Canary</main>
}
```

Delete `app/globals.css` content. Replace with:
```css
@import "tailwindcss";
```

- [ ] **Step 4: Verify blank page renders**

Visit `http://localhost:3000`. Expected: white page with "Canary" text.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project"
```

---

## Task 2: Configure fonts, metadata, and color tokens

**Files:**
- Modify: `app/layout.tsx`
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Install Anton and Space Mono via next/font**

Replace `app/layout.tsx` with:
```tsx
import type { Metadata } from 'next'
import { Anton, Space_Mono } from 'next/font/google'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Canary — Always First. Always Ready.',
  description: 'Systems + Objects for the modern creative workspace.',
  openGraph: {
    title: 'Canary — Always First. Always Ready.',
    description: 'Systems + Objects for the modern creative workspace.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${anton.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Add Canary color tokens to Tailwind config**

Replace `tailwind.config.ts` with:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canary: '#FFEF00',
        ink: '#111111',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'Courier New', 'monospace'],
      },
    },
  },
}

export default config
```

- [ ] **Step 3: Verify fonts load**

```bash
npm run dev
```
Visit `http://localhost:3000`. Open DevTools → Network → filter by "font". Expected: Anton and Space Mono loaded from Google Fonts CDN.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx tailwind.config.ts app/globals.css
git commit -m "feat: configure Anton/Space Mono fonts and Canary color tokens"
```

---

## Task 3: Build the static page shell

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Write the page shell**

Replace `app/page.tsx` with:
```tsx
import LogoTrigger from './components/LogoTrigger'

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-canary overflow-hidden">

      {/* Yellow field — flex column, fills all space above bottom bar */}
      <div className="flex flex-col flex-1 items-center overflow-hidden">

        {/* CANARY headline — top-anchored, full width */}
        <h1
          className="font-display text-ink text-center w-full leading-none select-none"
          style={{ fontSize: 'clamp(72px, 14vw, 160px)', paddingTop: '4%' }}
        >
          CANARY
        </h1>

        {/* SYSTEMS + OBJECTS — vertically centered in remaining space */}
        <div className="flex-1 flex items-center justify-center">
          <p
            className="font-mono font-bold text-ink uppercase tracking-[0.28em]"
            style={{ fontSize: 'clamp(10px, 1.4vw, 16px)' }}
          >
            SYSTEMS + OBJECTS
          </p>
        </div>

        {/* Logo trigger — bottom of yellow field */}
        <div className="flex flex-col items-center" style={{ paddingBottom: '6%' }}>
          <span
            className="font-mono text-ink/35 uppercase tracking-[0.2em] mb-2"
            style={{ fontSize: '9px' }}
            aria-hidden="true"
          >
            CLICK TO WATCH
          </span>
          <LogoTrigger />
        </div>

      </div>

      {/* Black bottom bar */}
      <div
        className="w-full bg-ink flex-shrink-0"
        style={{ height: 'clamp(6px, 1.2vw, 14px)' }}
        aria-hidden="true"
      />

    </main>
  )
}
```

- [ ] **Step 2: Create a placeholder LogoTrigger so the page compiles**

Create `app/components/LogoTrigger.tsx`:
```tsx
'use client'

export default function LogoTrigger() {
  return (
    <div style={{ width: 160, height: 64, background: '#111', borderRadius: 4 }} />
  )
}
```

- [ ] **Step 3: Verify layout renders correctly**

```bash
npm run dev
```
Visit `http://localhost:3000`. Expected:
- Yellow full-screen background
- "CANARY" large headline at top
- "SYSTEMS + OBJECTS" centered vertically
- Black placeholder rectangle near bottom
- Thin black bar at very bottom

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/components/LogoTrigger.tsx
git commit -m "feat: add static page shell with headline, tagline, and bottom bar"
```

---

## Task 4: Add the logo asset

**Files:**
- Copy: `public/canary-logo.png`

- [ ] **Step 1: Copy the logo PNG and video into public/**

```bash
cp "C:/Users/OCPCz/Downloads/canary logo.PNG" public/canary-logo.png
cp "C:/Users/OCPCz/Downloads/Canary 001 (Watermark).mp4" public/canary-video.mp4
```

⚠️ `canary-video.mp4` is the watermarked draft (26MB). Replace with the final cut before launch. For long-term production, consider hosting on Vimeo or YouTube for proper streaming CDN — but `public/` is fine while the final asset is pending.

- [ ] **Step 2: Verify assets are reachable**

Visit `http://localhost:3000/canary-logo.png` → logo renders.
Visit `http://localhost:3000/canary-video.mp4` → video plays in browser tab.

- [ ] **Step 3: Commit**

```bash
git add public/canary-logo.png public/canary-video.mp4
git commit -m "feat: add Canary logo and video assets (watermarked draft)"
```

---

## Task 5: Build LogoTrigger with hover animation

**Files:**
- Modify: `app/components/LogoTrigger.tsx`

- [ ] **Step 1: Replace placeholder with real LogoTrigger**

Replace `app/components/LogoTrigger.tsx` with:
```tsx
'use client'

import { useState, useCallback, useRef } from 'react'

// VideoModal is dynamically imported on first click only (facade pattern)
let VideoModalModule: typeof import('./VideoModal') | null = null

export default function LogoTrigger() {
  const [modalOpen, setModalOpen] = useState(false)
  const [ModalComponent, setModalComponent] = useState<React.ComponentType<{ onClose: () => void }> | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback(async () => {
    // Load the modal component on first click only
    if (!VideoModalModule) {
      VideoModalModule = await import('./VideoModal')
    }
    setModalComponent(() => VideoModalModule!.default)
    setModalOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setModalOpen(false)
    // Return focus to the logo trigger
    buttonRef.current?.focus()
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }, [handleClick])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label="Watch the Canary film"
        className="border-0 bg-transparent p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canary"
        style={{
          transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.18s ease',
          minWidth: 48,
          minHeight: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.transform = 'scale(0.93)'
          el.style.filter = 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.transform = 'scale(1)'
          el.style.filter = 'none'
        }}
        onMouseDown={e => {
          e.currentTarget.style.transform = 'scale(0.88)'
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = 'scale(0.93)'
        }}
      >
        {/* Plain <img> — NOT next/image. Required for mix-blend-mode to work
            reliably. next/image's wrapper span creates a stacking context that
            breaks mix-blend-mode across browsers. Replace when transparent-bg
            SVG asset is available. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/canary-logo.png"
          alt=""
          width={160}
          height={68}
          style={{ display: 'block', mixBlendMode: 'multiply' }}
          draggable={false}
        />
      </button>

      {modalOpen && ModalComponent && (
        <ModalComponent onClose={handleClose} />
      )}
    </>
  )
}
```

- [ ] **Step 2: Verify logo renders and hover animation works**

```bash
npm run dev
```
Visit `http://localhost:3000`. Expected:
- Canary logo mark visible (yellow bg drops out via multiply blend)
- Hover: logo presses in (scale 0.93) with shadow
- Click: nothing yet (VideoModal not built) — no crash

- [ ] **Step 3: Commit**

```bash
git add app/components/LogoTrigger.tsx
git commit -m "feat: LogoTrigger with press-in animation and dynamic import stub"
```

---

## Task 6: Build VideoModal

**Files:**
- Create: `app/components/VideoModal.tsx`

- [ ] **Step 1: Create the VideoModal component**

Create `app/components/VideoModal.tsx`:
```tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'

interface VideoModalProps {
  onClose: () => void
}

export default function VideoModal({ onClose }: VideoModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Focus the close button when modal opens
  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  // Autoplay video when modal opens
  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // Autoplay blocked by browser — user can press play manually
    })
  }, [])

  // Pause and reset video on close
  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    onClose()
  }, [onClose])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleClose])

  // Trap focus within modal
  useEffect(() => {
    const modal = backdropRef.current
    if (!modal) return

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    modal.addEventListener('keydown', trapFocus)
    return () => modal.removeEventListener('keydown', trapFocus)
  }, [])

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) handleClose()
  }, [handleClose])

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label="Canary film"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Modal panel */}
      <div className="relative w-[90vw] max-w-4xl">

        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          aria-label="Close film"
          className="absolute -top-10 right-0 text-white text-2xl font-light leading-none cursor-pointer bg-transparent border-0 p-2 hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          ✕
        </button>

        {/* Video — HTML5 player, served from /public */}
        {/* TODO: replace src with Vimeo/YouTube embed URL when final cut is delivered */}
        <div className="w-full bg-black" style={{ aspectRatio: '16 / 9' }}>
          <video
            ref={videoRef}
            src="/canary-video.mp4"
            className="w-full h-full"
            controls
            playsInline
            title="Canary film"
          />
        </div>

      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify modal opens and closes**

```bash
npm run dev
```
Visit `http://localhost:3000`. Expected:
- Click logo → modal opens with dark blurred backdrop
- Canary video autoplays (or shows controls if browser blocks autoplay)
- ✕ button closes modal and resets video to start
- Escape key closes modal
- Clicking backdrop closes modal
- Focus returns to logo after close

- [ ] **Step 3: Verify dynamic import (facade pattern works)**

Open DevTools → Network → filter by JS. Hard refresh. Expected: no `VideoModal` chunk loaded. Click logo. Expected: `VideoModal` chunk loads on demand.

- [ ] **Step 4: Commit**

```bash
git add app/components/VideoModal.tsx
git commit -m "feat: VideoModal with glassmorphism backdrop, focus trap, and facade pattern"
```

---

## Task 7: Mobile polish and accessibility audit

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add viewport meta and body reset to globals**

Add to `app/globals.css`:
```css
@import "tailwindcss";

*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: Verify mobile layout at 390px viewport**

In DevTools, set viewport to iPhone 14 (390×844). Expected:
- CANARY headline fills width, doesn't overflow or wrap
- SYSTEMS + OBJECTS remains centered
- Logo tap target is at least 48×48px (confirm in DevTools → Accessibility)
- Black bottom bar visible at bottom

- [ ] **Step 3: Verify keyboard navigation**

Tab to logo button → Enter to open modal → Tab cycles within modal → Escape closes → focus returns to logo.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/page.tsx
git commit -m "fix: mobile layout polish and body reset"
```

---

## Task 8: GitHub repo and Vercel deployment

- [ ] **Step 1: Create GitHub repository**

Go to github.com → New repository → name it `canary-landing` → private → no README (project already has files).

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/<your-username>/canary-landing.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Deploy to Vercel**

Go to vercel.com → Add New Project → Import from GitHub → select `canary-landing` → Framework Preset: Next.js → Deploy.

Expected: Vercel builds and provides a live URL (e.g. `canary-landing.vercel.app`).

- [ ] **Step 4: Confirm video URL before going live**

Open `app/components/VideoModal.tsx`. If `VIDEO_URL` is still `'[INSERT VIDEO URL]'`, the modal will render a "Video URL pending" placeholder in production. This is acceptable for a soft launch but should be resolved before sharing the URL publicly. To set it: replace the placeholder string with the actual embed URL (e.g. a YouTube embed URL: `https://www.youtube.com/embed/<id>?autoplay=1`).

⚠️ **Deployment gate:** Do not consider the page "done" until this is set or the placeholder state is explicitly signed off by the client.

- [ ] **Step 5: Verify production build**

Visit the Vercel URL. Expected:
- Page loads with zero layout shift
- Logo renders correctly (mix-blend-mode works in production)
- Click logo → modal opens with video (or placeholder if URL not yet set)
- Vercel Dashboard → Deployments → check Build Logs for zero errors

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "chore: production deployment to Vercel"
git push
```

---

## Implementation Notes

- **`<button>` vs `role="button"`:** The spec lists `role="button"` and `tabIndex={0}` on the logo wrapper. The plan uses a native `<button>` element instead — this is intentional and better: native buttons handle Enter/Space natively, are keyboard-focusable by default, and work with assistive technology without explicit ARIA roles. Not a deviation from spec intent.
- **Logo `alt=""`:** The `<img>` inside `LogoTrigger` has `alt=""` (empty string). This is correct — the image is decorative; the enclosing `<button>` already carries `aria-label="Watch the Canary film"`. Do not "fix" this by adding alt text — it would create redundant announcements for screen reader users.

---

## Notes for Future Asset Swap

When the designer delivers the final font and logo SVG:

1. **Font:** Replace `Anton` with the new font in `app/layout.tsx` (update `next/font` import). Update `--font-display` variable name if needed in `tailwind.config.ts`.
2. **Logo:** Replace `public/canary-logo.png` with the SVG. In `LogoTrigger.tsx`, change the `<img>` to use the SVG path. Remove `mixBlendMode: 'multiply'` (no longer needed with transparent bg). Optionally migrate to `next/image` at this point.
