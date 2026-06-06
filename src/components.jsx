/* global React */
const { useEffect, useRef, useState, useCallback } = React;

/* ------------------------------------------------------------------ */
/* useTweaks — subscribes to the vanilla tweaks host                  */
/* ------------------------------------------------------------------ */
function useTweaks() {
  const [t, setT] = useState(() => (window.CanaryTweaks ? window.CanaryTweaks.get() : {
    direction: "safe", headline: "Instruments for the modern desk.",
    dropDateISO: "", countdown: "off", palette: "canary",
    sectionOrder: ["hero", "manifesto", "scarcity", "colorways", "setup", "build", "specs", "faq", "capture"]
  }));
  useEffect(() => {
    const onChange = (e) => setT(e.detail);
    window.addEventListener('canary:tweaks', onChange);
    return () => window.removeEventListener('canary:tweaks', onChange);
  }, []);
  return t;
}

/* ------------------------------------------------------------------ */
/* Reveal — IntersectionObserver-driven fade-up                       */
/* ------------------------------------------------------------------ */
function Reveal({ as: Tag = 'div', delay = 0, children, className = '', style = {}, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >{children}</Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Placeholder — monospace striped image slot                          */
/* ------------------------------------------------------------------ */
function Placeholder({ label = 'Image', ratio = '4 / 3', src, alt, className = '', style = {} }) {
  return (
    <div
      className={`placeholder ${src ? 'has-img' : ''} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      role="img"
      aria-label={src ? (alt || label) : `Placeholder: ${label}`}
    >
      {src
        ? <img
            src={src}
            alt={alt || label}
            loading="lazy"
            decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        : <span className="ph-label">{label}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MonoLabel — consistent tiny caps label                              */
/* ------------------------------------------------------------------ */
function MonoLabel({ children, style = {}, className = '' }) {
  return (
    <span
      className={`font-mono uppercase ${className}`}
      style={{ fontSize: 11, letterSpacing: '0.22em', ...style }}
    >{children}</span>
  );
}

/* ------------------------------------------------------------------ */
/* Countdown — reads dropDateISO; returns {d,h,m,s} or null            */
/* ------------------------------------------------------------------ */
function useCountdown(iso) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!iso) return null;
  const target = new Date(iso).getTime();
  if (isNaN(target)) return null;
  const diff = Math.max(0, target - now);
  const s = Math.floor(diff / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: diff === 0
  };
}

/* ------------------------------------------------------------------ */
/* FilmGateway — the logo-triggered video teaser (existing pattern)   */
/* ------------------------------------------------------------------ */
function FilmGateway({ compact = false }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const buttonRef = useRef(null);

  const open = useCallback(() => {
    setPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 320);
  }, []);

  const close = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setPlaying(false);
    setTimeout(() => buttonRef.current?.focus(), 200);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && playing) close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [playing, close]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={open}
        aria-label="Watch the Canary film"
        className="font-mono uppercase"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          background: 'transparent',
          border: '1px solid var(--ink)',
          color: 'var(--ink)',
          padding: compact ? '10px 16px' : '14px 22px',
          fontSize: compact ? 10 : 11,
          letterSpacing: '0.22em',
          cursor: 'pointer',
          transition: 'background 0.18s ease, color 0.18s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--canary)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}
      >
        <span style={{
          width: 0, height: 0,
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: '7px solid currentColor',
          display: 'inline-block'
        }} aria-hidden="true" />
        Watch the film
      </button>

      {/* fullscreen player */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: '#000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'opacity 0.35s ease',
          opacity: playing ? 1 : 0,
          pointerEvents: playing ? 'auto' : 'none',
          zIndex: 100
        }}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <button
          onClick={close}
          aria-label="Close film"
          style={{
            position: 'absolute', top: 16, right: 20,
            background: 'transparent', border: '1px solid #fff4',
            color: '#fff', padding: '8px 12px', fontFamily: 'Space Mono, monospace',
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer'
          }}
        >ESC · Close</button>
        <video
          ref={videoRef}
          src="assets/canary-video.mp4"
          poster="assets/keyboards/c01-hero.jpg"
          preload="none"
          playsInline
          controls
          onEnded={close}
          aria-label="Canary C01 film"
          style={{
            width: '90vw', maxWidth: 1200, aspectRatio: '16/9', background: '#000'
          }}
        />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Signup form — POSTs to /api/subscribe                               */
/* Captures qualified launch intent: email + colorway + use case +     */
/* optional social handle. Colorway can be pre-filled by colorway cards */
/* via the `canary:select-colorway` event.                             */
/* ------------------------------------------------------------------ */
const COLORWAY_OPTIONS = ['Signal', 'Recon', 'Strike', 'Not sure yet'];
const USE_CASE_OPTIONS = ['Desk setup', 'Gaming', 'Work/productivity', 'Streaming/creator setup', 'Collecting'];

function SignupForm({ variant = 'light', source = 'capture', cta = 'Join The Flock' }) {
  const [email, setEmail] = useState('');
  const [colorway, setColorway] = useState('');
  const [useCase, setUseCase] = useState('');
  const [social, setSocial] = useState('');
  const [company, setCompany] = useState(''); // honeypot — keep empty
  const [status, setStatus] = useState('idle'); // idle | loading | ok | err
  const [errMsg, setErrMsg] = useState('');
  const dark = variant === 'dark';
  const wrapRef = useRef(null);
  const lineColor = dark ? 'var(--canary)' : 'var(--ink)';

  // Pre-fill colorway when a colorway card dispatches a selection.
  useEffect(() => {
    const onPick = (e) => {
      const c = e.detail && e.detail.colorway;
      if (!c) return;
      setColorway(COLORWAY_OPTIONS.includes(c) ? c : 'Not sure yet');
      if (status === 'err') { setStatus('idle'); setErrMsg(''); }
    };
    window.addEventListener('canary:select-colorway', onPick);
    return () => window.removeEventListener('canary:select-colorway', onPick);
  }, [status]);

  // Fire waitlist_view once when the form scrolls into view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          if (window.canaryTrack) window.canaryTrack('waitlist_view', { source });
          obs.disconnect();
        }
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [source]);

  const submit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setStatus('err'); setErrMsg('Check your email address.'); return;
    }
    setStatus('loading'); setErrMsg('');
    try {
      const resp = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, company, source, colorway, useCase, social: social.trim() })
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.ok) {
        setStatus('err'); setErrMsg('Something went wrong. Try again.'); return;
      }
      setStatus('ok');
      if (window.canaryTrack) {
        window.canaryTrack('waitlist_submit', { source, colorway: colorway || 'unspecified', use_case: useCase || 'unspecified' });
        window.canaryTrack('generate_lead', { method: 'the_flock', source, value: 1, currency: 'USD' });
      }
    } catch (err) {
      setStatus('err'); setErrMsg('Network error. Try again.');
    }
  };

  if (status === 'ok') {
    return (
      <div ref={wrapRef} style={{
        border: `1px solid ${lineColor}`,
        padding: '18px 20px',
        display: 'flex', flexDirection: 'column', gap: 6
      }}>
        <MonoLabel style={{ opacity: 0.6 }}>Confirmed · The Flock</MonoLabel>
        <div className="font-display" style={{ fontSize: 36, lineHeight: 0.95 }}>
          YOU'RE IN THE FLOCK.
        </div>
        <div style={{ fontSize: 13, opacity: 0.75 }}>
          Capsule 01 details will arrive before the public drop. Watch {email}.
        </div>
      </div>
    );
  }

  const busy = status === 'loading';
  const fieldStyle = {
    width: '100%',
    border: `1px solid ${lineColor}`,
    background: 'transparent',
    color: 'inherit',
    padding: '13px 14px',
    fontFamily: 'Space Mono, monospace',
    fontSize: 13,
    appearance: 'none',
    WebkitAppearance: 'none'
  };
  // Native option popups are OS-themed (usually white); force dark text so the
  // dropdown stays legible even when the form sits on a dark section.
  const optionStyle = { color: '#111111', background: '#ffffff' };

  return (
    <form ref={wrapRef} onSubmit={submit} noValidate style={{ width: '100%' }} aria-describedby="signup-msg">
      {/* Email + primary CTA */}
      <div style={{
        display: 'flex',
        border: `1px solid ${lineColor}`,
        background: 'transparent'
      }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === 'err') { setStatus('idle'); setErrMsg(''); } }}
          placeholder="you@domain.com"
          aria-label="Email address"
          autoComplete="email"
          inputMode="email"
          disabled={busy}
          style={{
            flex: 1,
            border: 0, outline: 'none', background: 'transparent',
            color: 'inherit',
            padding: '16px 18px',
            fontFamily: 'Space Mono, monospace',
            fontSize: 14
          }}
        />
        {/* Honeypot — visually hidden, real users won't fill it */}
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: 'absolute', left: '-10000px', top: 'auto',
            width: 1, height: 1, overflow: 'hidden', opacity: 0
          }}
        />
        <button
          type="submit"
          disabled={busy}
          className="font-mono uppercase"
          style={{
            border: 0,
            borderLeft: `1px solid ${lineColor}`,
            background: dark ? 'var(--canary)' : 'var(--ink)',
            color: dark ? 'var(--ink)' : 'var(--canary)',
            padding: '0 22px',
            fontSize: 11,
            letterSpacing: '0.22em',
            cursor: busy ? 'wait' : 'pointer',
            opacity: busy ? 0.7 : 1,
            whiteSpace: 'nowrap'
          }}
        >{busy ? 'Sending…' : cta}</button>
      </div>

      {/* Qualifying fields */}
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        <label style={{ display: 'block' }}>
          <span className="font-mono uppercase" style={{ display: 'block', fontSize: 9, letterSpacing: '0.2em', opacity: 0.6, marginBottom: 6 }}>Preferred colorway</span>
          <select
            value={colorway}
            disabled={busy}
            aria-label="Preferred colorway"
            onChange={(e) => { setColorway(e.target.value); if (window.canaryTrack && e.target.value) window.canaryTrack('colorway_select', { colorway: e.target.value, source }); }}
            style={fieldStyle}
          >
            <option value="" style={optionStyle}>Choose (optional)</option>
            {COLORWAY_OPTIONS.map((c) => <option key={c} value={c} style={optionStyle}>{c}</option>)}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          <span className="font-mono uppercase" style={{ display: 'block', fontSize: 9, letterSpacing: '0.2em', opacity: 0.6, marginBottom: 6 }}>Main use case</span>
          <select
            value={useCase}
            disabled={busy}
            aria-label="Main use case"
            onChange={(e) => { setUseCase(e.target.value); if (window.canaryTrack && e.target.value) window.canaryTrack('use_case_select', { use_case: e.target.value, source }); }}
            style={fieldStyle}
          >
            <option value="" style={optionStyle}>Choose (optional)</option>
            {USE_CASE_OPTIONS.map((u) => <option key={u} value={u} style={optionStyle}>{u}</option>)}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          <span className="font-mono uppercase" style={{ display: 'block', fontSize: 9, letterSpacing: '0.2em', opacity: 0.6, marginBottom: 6 }}>Instagram / TikTok</span>
          <input
            type="text"
            value={social}
            disabled={busy}
            onChange={(e) => setSocial(e.target.value)}
            placeholder="@handle (optional)"
            aria-label="Instagram or TikTok handle"
            autoComplete="off"
            style={fieldStyle}
          />
        </label>
      </div>

      <div id="signup-msg" style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 11, opacity: 0.7 }}>
        <span>The Flock gets the drop link, serial range, and previews first.</span>
        <span
          role={status === 'err' ? 'alert' : undefined}
          aria-live="polite"
          style={{ color: status === 'err' ? 'inherit' : 'transparent', whiteSpace: 'nowrap' }}
        >
          {status === 'err' ? (errMsg || 'Check your email address.') : '—'}
        </span>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Export to window                                                    */
/* ------------------------------------------------------------------ */
Object.assign(window, {
  useTweaks, useCountdown,
  Reveal, Placeholder, MonoLabel,
  FilmGateway, SignupForm
});
