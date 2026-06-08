// Canary — password gate verifier.
//
// Validates the password submitted by gate.html against SITE_PASSWORD. On
// success, sets a session cookie (canary_gate = GATE_TOKEN) that the Edge
// middleware checks on every subsequent request. Session cookie = no Max-Age,
// so it clears when the browser closes (visitor re-enters next session).
//
// Required env vars (set in Vercel project settings — never commit them):
//   SITE_PASSWORD  — the password visitors type
//   GATE_TOKEN     — random secret used as the cookie value (must match middleware.js)

const crypto = require('crypto');

// Length-independent constant-time string compare (avoids leaking length/timing).
function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  const len = Math.max(ab.length, bb.length, 1);
  const pa = Buffer.alloc(len);
  const pb = Buffer.alloc(len);
  ab.copy(pa); bb.copy(pb);
  const equal = crypto.timingSafeEqual(pa, pb);
  return equal && ab.length === bb.length;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const SITE_PASSWORD = process.env.SITE_PASSWORD;
  const GATE_TOKEN = process.env.GATE_TOKEN;
  if (!SITE_PASSWORD || !GATE_TOKEN) {
    console.error('gate: missing SITE_PASSWORD or GATE_TOKEN env var — failing closed');
    res.status(500).json({ ok: false, error: 'server_misconfigured' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const password = typeof body.password === 'string' ? body.password : '';

  if (!password || !safeEqual(password, SITE_PASSWORD)) {
    res.status(401).json({ ok: false, error: 'incorrect_password' });
    return;
  }

  // Session cookie (no Max-Age/Expires) — clears on browser close.
  res.setHeader(
    'Set-Cookie',
    `canary_gate=${GATE_TOKEN}; HttpOnly; Secure; SameSite=Lax; Path=/`
  );
  res.status(200).json({ ok: true });
};
