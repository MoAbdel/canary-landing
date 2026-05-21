// Canary — notify-list subscribe endpoint.
//
// Phase 1: validates, logs to function output, returns 200.
// Phase 2 (TODO): forward to a real ESP — Klaviyo / ConvertKit / Resend+Loops.
//   At that point: read API key from process.env.ESP_API_KEY (set in Vercel
//   project settings, never commit it), and POST the email to the vendor.
//
// Until Phase 2, signups appear ONLY in Vercel function logs. Read them via
// `vercel logs` or the Vercel dashboard. Treat this as a stub.

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function corsHeaders(origin) {
  // Tight allowlist — only the production domain and Vercel preview pattern.
  const allowed = [
    'https://canary.store',
    'https://www.canary.store',
  ];
  const ok = allowed.includes(origin) || (origin && origin.endsWith('.vercel.app'));
  return {
    'Access-Control-Allow-Origin': ok ? origin : 'https://canary.store',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

module.exports = async (req, res) => {
  const origin = req.headers.origin || '';
  const headers = corsHeaders(origin);
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  let body = req.body;
  // Vercel parses JSON for us when content-type is application/json, but be defensive.
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const email = (body.email || '').trim().toLowerCase();
  const source = (body.source || 'unknown').slice(0, 64);
  const honeypot = body.company; // bot trap; real users won't fill this

  if (honeypot) {
    // pretend success so bots don't iterate
    res.status(200).json({ ok: true });
    return;
  }

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, error: 'invalid_email' });
    return;
  }

  // Log for Phase 1; replace with ESP call in Phase 2.
  console.log(JSON.stringify({
    event: 'canary.subscribe',
    ts: new Date().toISOString(),
    email,
    source,
    ua: req.headers['user-agent'] || '',
    ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '',
    referer: req.headers.referer || '',
  }));

  res.status(200).json({ ok: true });
};
