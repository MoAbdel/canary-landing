/* global React */
// SAFE direction — quiet, typographic, restrained.
// Aesop / Studio Neat / Arc'teryx energy. Tight palette, lots of negative
// space, confident headline sits alone. Film gateway inherits the original
// centered-logo pattern.

function HeroSafe({ tweaks }) {
  return (
    <section style={{
      minHeight: '100vh',
      background: 'var(--canary)',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Top nav strip */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: 'clamp(18px, 2.5vw, 28px) clamp(20px, 4vw, 48px)',
        borderBottom: '1px solid var(--ink)'
      }}>
        <img src="assets/canary-bug.png" alt="Canary" style={{ height: 22, width: 'auto' }} />
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.24em', opacity: 0.65 }}>
          C01 · Capsule 01
        </div>
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.24em' }}>
          Drop · TBA
        </div>
      </div>

      {/* Wordmark — anton, giant, top-anchored */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(24px, 4vw, 48px)' }}>
        <Reveal>
          <h1 className="font-display" style={{
            margin: 0,
            fontSize: 'clamp(96px, 19vw, 340px)',
            lineHeight: 0.82,
            textAlign: 'center',
            letterSpacing: '-0.01em'
          }}>
            {/* headline is always "CANARY" in safe hero — the tweakable headline
                lives in the sub-tagline slot so it stays typographically honest */}
            CANARY
          </h1>
        </Reveal>

        {/* Tagline / tweakable headline */}
        <div style={{ textAlign: 'center' }}>
          <Reveal delay={120}>
            <div className="font-mono uppercase" style={{
              fontSize: 'clamp(11px, 1.3vw, 14px)',
              letterSpacing: '0.32em',
              marginBottom: 18,
              opacity: 0.9
            }}>
              {tweaks.headline || 'Instruments for the modern desk.'}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: '0.28em', opacity: 0.45 }}>
                Click to watch
              </div>
              <button
                onClick={() => {
                  const ev = new CustomEvent('canary:play-film');
                  window.dispatchEvent(ev);
                }}
                aria-label="Watch the Canary film"
                style={{
                  background: 'transparent', border: 0, cursor: 'pointer', padding: 8
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(0.93)'; e.currentTarget.style.filter = 'drop-shadow(0 6px 16px rgba(0,0,0,0.2))'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'none'; }}
              >
                <img src="assets/canary-bug.png" alt="" style={{ height: 64, width: 'auto', transition: 'transform 0.2s ease' }} />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Bottom utility strip */}
        <Reveal delay={260}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.55
          }}>
            <span>Est. 2026 · Brooklyn</span>
            <span>Scroll ↓</span>
            <span>600 units · numbered</span>
          </div>
        </Reveal>
      </div>

      <div style={{ height: 'clamp(6px, 1.2vw, 14px)', background: 'var(--ink)' }} />
    </section>
  );
}

// Hidden floating film player that opens when hero click dispatches event
function FloatingFilmLauncher() {
  const [open, setOpen] = React.useState(false);
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    const play = () => {
      setOpen(true);
      setTimeout(() => videoRef.current?.play().catch(() => {}), 280);
    };
    window.addEventListener('canary:play-film', play);
    return () => window.removeEventListener('canary:play-film', play);
  }, []);
  const close = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
    setOpen(false);
  };
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 0.35s ease', zIndex: 100
    }} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <button onClick={close} aria-label="Close film" style={{
        position: 'absolute', top: 16, right: 20,
        background: 'transparent', color: '#fff', border: '1px solid #fff4',
        padding: '8px 12px', fontFamily: 'Space Mono, monospace',
        fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer'
      }}>ESC · Close</button>
      <video
        ref={videoRef}
        src="assets/canary-video.mp4"
        playsInline
        controls
        onEnded={close}
        style={{ width: '90vw', maxWidth: 1200, aspectRatio: '16/9', background: '#000' }}
      />
    </div>
  );
}

Object.assign(window, { HeroSafe, FloatingFilmLauncher });
