/* global React */
// SAFE direction — quiet, typographic, restrained.
// Aesop / Studio Neat / Arc'teryx energy. Tight palette, lots of negative
// space, confident headline sits alone. Film gateway inherits the original
// centered-logo pattern.

function HeroSafe({ tweaks }) {
  const heroCta = (e) => { if (window.canaryTrack) window.canaryTrack('hero_cta_click', { label: 'join_the_flock', location: 'hero' }); };
  const secondaryCta = (e) => { if (window.canaryTrack) window.canaryTrack('secondary_cta_click', { label: 'explore_capsule_01', location: 'hero' }); };
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

      {/* Hero content — centered, cinematic */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'clamp(28px, 4vw, 56px)' }}>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', textAlign: 'center', gap: 'clamp(18px, 2.6vw, 30px)',
          maxWidth: 1040, margin: '0 auto'
        }}>
          <Reveal>
            <p className="font-mono uppercase" style={{
              margin: 0, fontSize: 'clamp(10px, 1.2vw, 12px)', letterSpacing: '0.3em', opacity: 0.7
            }}>
              Capsule 01 · 600 Numbered Units · No Restocks
            </p>
          </Reveal>

          {/* CANARY wordmark — brand mark + film trigger (not the H1) */}
          <Reveal delay={60}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('canary:play-film'))}
              aria-label="Watch the Canary film"
              className="font-display"
              style={{
                background: 'transparent', border: 0, cursor: 'pointer', padding: 0,
                color: 'var(--ink)',
                fontSize: 'clamp(52px, 12vw, 168px)', lineHeight: 0.82, letterSpacing: '-0.01em',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.62'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              CANARY
              <span className="font-mono uppercase" style={{ display: 'block', fontSize: 9, letterSpacing: '0.28em', opacity: 0.45, marginTop: 10 }}>
                ▸ Click to watch the film
              </span>
            </button>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="font-display" style={{
              margin: 0,
              fontSize: 'clamp(30px, 5vw, 68px)',
              lineHeight: 0.96,
              letterSpacing: '-0.005em',
              textWrap: 'balance',
              maxWidth: 18 + 'ch'
            }}>
              The Limited-Run Keyboard Built to Transform Your Desk
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p style={{
              margin: 0, maxWidth: 680, fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.6
            }}>
              Canary C01 is a 65% die-cast aluminum mechanical keyboard with premium sound,
              tri-mode wireless, PBT keycaps, and three collectible colorways: Signal, Recon, and Strike.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="#capture"
                onClick={heroCta}
                className="font-mono uppercase"
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '16px 26px',
                  border: '1px solid var(--ink)',
                  background: 'var(--ink)', color: 'var(--canary)',
                  fontSize: 11, letterSpacing: '0.22em'
                }}
              >Join the Early Birds</a>
              <a
                href="#specs"
                onClick={secondaryCta}
                className="font-mono uppercase"
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '16px 26px',
                  border: '1px solid var(--ink)',
                  background: 'transparent', color: 'var(--ink)',
                  fontSize: 11, letterSpacing: '0.22em'
                }}
              >Explore Capsule 01</a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="font-mono uppercase" style={{
              margin: 0, fontSize: 10, letterSpacing: '0.22em', opacity: 0.6
            }}>
              600 total units · 200 per colorway · numbered 001–200
            </p>
          </Reveal>
        </div>

        {/* Bottom utility strip */}
        <Reveal delay={340}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.55
          }}>
            <span>Est. 2026</span>
            <span>Scroll ↓</span>
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
        poster="assets/keyboards/c01-hero.jpg"
        preload="none"
        playsInline
        controls
        onEnded={close}
        aria-label="Canary C01 film"
        style={{ width: '90vw', maxWidth: 1200, aspectRatio: '16/9', background: '#000' }}
      />
    </div>
  );
}

Object.assign(window, { HeroSafe, FloatingFilmLauncher });
