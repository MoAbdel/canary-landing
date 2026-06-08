// Canary — site-wide password gate (Vercel Edge Middleware).
//
// Runs on every request before any static file is served. If the visitor does
// not present a valid `canary_gate` cookie, they are redirected to the branded
// gate page (gate.html). The real site is never served to an unauthenticated
// request, so content cannot be reached via "View Source" or the network tab.
//
// Required env vars (set in Vercel project settings — never commit them):
//   SITE_PASSWORD  — the password visitors type   (read by api/gate.js)
//   GATE_TOKEN     — random secret used as the cookie value, so it can't be forged
//
// No dependencies: returning undefined continues to the origin; returning a
// Response short-circuits.

export const config = {
  // Match everything; the allowlist below handles the few public paths.
  matcher: '/:path*',
};

// Paths reachable WITHOUT a password (the gate page + its assets + the verifier).
const PUBLIC_PATHS = new Set([
  '/gate.html',
  '/api/gate',
  '/assets/canary-wordmark.png',
  '/assets/canary-bug.png',
]);

export default function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (PUBLIC_PATHS.has(pathname)) return; // public — pass through

  const token = process.env.GATE_TOKEN;

  // Fail OPEN when the gate is not configured. If GATE_TOKEN is unset, the gate
  // is inactive and the site serves normally — so deploying this code before the
  // env vars are set can never lock the site out. The gate activates only once
  // GATE_TOKEN (and SITE_PASSWORD, used by api/gate.js) are set in the project.
  if (!token) return;

  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|;\s*)canary_gate=([^;]+)/);

  // Authenticated: cookie present and equal to the server secret.
  if (match && match[1] === token) return;

  // Not authenticated → send them to the gate.
  url.pathname = '/gate.html';
  url.search = '';
  return Response.redirect(url, 302);
}
