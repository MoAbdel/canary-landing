# Site-Wide Password Gate — Design

**Date:** 2026-06-08
**Status:** Approved (pending spec review)

## Goal

Put the entire Canary site behind a password. A visitor to `canary.store` (or any
path, including `/learn/*`) must enter a password before any real content is sent
to their browser. This is the front door for a private/pre-launch site.

## Requirements (from brainstorming)

- **Scope:** Whole site — homepage and `/learn/` articles. Nothing visible without the password.
- **Strength:** Real protection. Content must NOT be retrievable via "View Source" or
  network inspection before authentication. This rules out a client-side gate.
- **Prompt:** Branded Canary-styled password screen (not the native browser dialog).
- **Persistence:** Session-scoped. The visitor enters the password once per browser
  session (session cookie, cleared on browser close); they are NOT re-prompted on every
  internal click. They re-enter it next session.

## Architecture

Vercel **Edge Middleware** intercepts every request before any static file is served.
This is a Vercel platform feature available to any project (no framework required) via a
root `middleware.js`.

```
Request → middleware.js
   ├─ path is /gate.html, /api/gate, or /assets/canary-bug.png → pass through
   ├─ cookie `canary_gate` === GATE_TOKEN → pass through (serve real site)
   └─ otherwise → rewrite to /gate.html (URL stays the same; gate content served)

gate.html (branded password screen)
   └─ POST password → /api/gate
        ├─ password === SITE_PASSWORD → Set-Cookie canary_gate=GATE_TOKEN (session), 200
        └─ wrong → 401
   └─ on 200 → location.reload() → cookie now present → middleware passes through
```

### Why this is secure

The real HTML/JS/assets are never served to an unauthenticated request — the middleware
rewrites to the gate before the origin file is read. The cookie value is a server-only
secret (`GATE_TOKEN`), so it cannot be forged by guessing. The password itself is only
ever compared server-side and is never present in any file shipped to the browser.

## Files

### 1. `middleware.js` (new, project root, Edge runtime)
- Default-exported function `(request) => Response | undefined`.
- Reads the `canary_gate` cookie; compares to `process.env.GATE_TOKEN`.
- Allowlist (passes through without auth): `/gate.html`, `/api/gate`, `/assets/canary-bug.png`.
- All other paths without a valid cookie: `rewrite` to `/gate.html`.
- `config.matcher` excludes nothing meaningful; allowlist handled in code for clarity.
- **Fails open when unconfigured:** if `GATE_TOKEN` is unset, the middleware passes
  every request through (site serves normally, ungated). This prevents deploying the
  gate code before the env vars are set from locking out the whole site — the gate
  activates only once `GATE_TOKEN` is present. (`api/gate.js` still fails closed: a
  submit with missing env returns 500, but that path is only reachable when the gate
  is already active.)

### 2. `gate.html` (new, project root)
- Fully self-contained: all CSS inline, Canary wordmark inline (SVG or text), no external
  asset dependencies, so the gate leaks nothing and needs no allowlisted assets beyond favicon.
- Dark background (`#0D0D0E`), yellow accent, mono/display fonts consistent with the site.
- A single password `<input type="password">` + submit button, an inline error state.
- On submit: `fetch('/api/gate', { method: 'POST', body: JSON.stringify({ password }) })`.
  - 200 → `location.reload()`.
  - 401 → show "Incorrect password" inline, no reload.
- `<meta name="robots" content="noindex">` on the gate page.

### 3. `api/gate.js` (new, Node serverless — same style as `api/subscribe.js`)
- POST only. Reads `{ password }` from the JSON body.
- Constant-time-ish compare against `process.env.SITE_PASSWORD`.
- Match → `Set-Cookie: canary_gate=<GATE_TOKEN>; HttpOnly; Secure; SameSite=Lax; Path=/`
  (session cookie — no `Max-Age`/`Expires`), respond `200 { ok: true }`.
- No match → `401 { ok: false }`. Generic error; no detail leaked.
- Missing env vars → `500` with a clear server-log message (fail closed).

## Environment variables (set in Vercel project settings — never committed)

| Var | Purpose | Example |
|-----|---------|---------|
| `SITE_PASSWORD` | The password visitors type | (chosen by user) |
| `GATE_TOKEN`    | Random secret used as the cookie value, so the cookie can't be forged | a long random string |

For local dev (`vercel dev`), these go in a local `.env` that is gitignored. The static
`http-server` dev script (`npm run dev`) does not run middleware/functions — local testing
of the gate requires `vercel dev`. Documented in README.

## Edge cases / decisions

- **SEO:** While gated, the whole site is unindexable. Acceptable for pre-launch. Lifting
  the gate later restores the existing `robots.txt`/`sitemap.xml` behavior unchanged.
- **`/api/subscribe`:** Also gated (it's only called from the gated homepage, so this is fine).
- **Asset for the gate favicon:** `/assets/canary-bug.png` is allowlisted so the gate tab
  shows the Canary icon; it is not sensitive.
- **Wrong password throttling:** Out of scope for a light pre-launch gate. Can add later.
- **Cookie security:** `HttpOnly` (not readable by JS), `Secure` (HTTPS only), `SameSite=Lax`.

## Out of scope (YAGNI)

- Per-user logins, accounts, or revocation (explicitly not wanted).
- "Remember me" / long-lived persistence (explicitly session-only).
- Rate limiting / lockout.

## Testing

- `vercel dev` locally with `.env` set: wrong password → 401 + inline error; correct →
  reload into site; cookie present → navigate `/learn/` without re-prompt; clear cookie →
  gated again.
- Verify an unauthenticated `curl` to `/` returns the gate HTML, not the real homepage.
