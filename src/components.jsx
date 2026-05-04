/* global React */
const { useEffect, useRef, useState, useCallback } = React;

/* ------------------------------------------------------------------ */
/* useTweaks — subscribes to the vanilla tweaks host                  */
/* ------------------------------------------------------------------ */
function useTweaks() {
  const [t, setT] = useState(() => (window.CanaryTweaks ? window.CanaryTweaks.get() : {
    direction: "safe", headline: "Instruments for the modern desk.",
    dropDateISO: "", countdown: "off", palette: "canary",
    sectionOrder: ["hero", "manifesto", "system", "capture", "community"]
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
function Placeholder({ label = 'Image', ratio = '4 / 3', className = '', style = {} }) {
  return (
    <div
      className={`placeholder ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <span className="ph-label">{label}</span>
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
          playsInline
          controls
          onEnded={close}
          style={{
            width: '90vw', maxWidth: 1200, aspectRatio: '16/9', background: '#000'
          }}
        />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Signup form (non-functional — logs submission)                      */
/* ------------------------------------------------------------------ */
function SignupForm({ variant = 'light' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | ok | err
  const dark = variant === 'dark';

  const submit = (e) => {
    e.preventDefault();
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
    if (!ok) { setStatus('err'); return; }
    // simulate submission — wire up your endpoint here
    setStatus('ok');
  };

  if (status === 'ok') {
    return (
      <div style={{
        border: `1px solid ${dark ? 'var(--canary)' : 'var(--ink)'}`,
        padding: '18px 20px',
        display: 'flex', flexDirection: 'column', gap: 6
      }}>
        <MonoLabel style={{ opacity: 0.6 }}>Confirmed · 001/200</MonoLabel>
        <div className="font-display" style={{ fontSize: 36, lineHeight: 0.95 }}>
          YOU'RE ON THE LIST.
        </div>
        <div style={{ fontSize: 13, opacity: 0.75 }}>
          The Flock gets first access. Check {email} for a confirmation.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        border: `1px solid ${dark ? 'var(--canary)' : 'var(--ink)'}`,
        background: 'transparent'
      }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === 'err') setStatus('idle'); }}
          placeholder="you@domain.com"
          aria-label="Email address"
          style={{
            flex: 1,
            border: 0, outline: 'none', background: 'transparent',
            color: 'inherit',
            padding: '16px 18px',
            fontFamily: 'Space Mono, monospace',
            fontSize: 14
          }}
        />
        <button
          type="submit"
          className="font-mono uppercase"
          style={{
            border: 0,
            borderLeft: `1px solid ${dark ? 'var(--canary)' : 'var(--ink)'}`,
            background: dark ? 'var(--canary)' : 'var(--ink)',
            color: dark ? 'var(--ink)' : 'var(--canary)',
            padding: '0 22px',
            fontSize: 11,
            letterSpacing: '0.22em',
            cursor: 'pointer'
          }}
        >Notify me</button>
      </div>
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.7 }}>
        <span>The Flock gets first access.</span>
        <span style={{ color: status === 'err' ? 'inherit' : 'transparent' }}>
          {status === 'err' ? 'Check your email address.' : '—'}
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
