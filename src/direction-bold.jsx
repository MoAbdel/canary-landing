/* global React */
// BOLD direction — drop-culture rhythm. Harder typographic contrast,
// inverse strip, serial-number marquee, numbered edition everywhere.
// Teenage Engineering weird × Higround mechanics at premium volume.

function Ticker({ children }) {
  return (
    <div style={{
      borderTop: '1px solid var(--ink)',
      borderBottom: '1px solid var(--ink)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '10px 0',
      fontFamily: 'Space Mono, monospace',
      fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
      maskImage: 'linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%)'
    }}>
      <div style={{
        display: 'inline-flex', gap: 40,
        animation: 'canary-ticker 42s linear infinite',
        paddingLeft: '100%'
      }}>
        {Array.from({ length: 2 }).map((_, k) => (
          <span key={k} style={{ display: 'inline-flex', gap: 40 }}>
            {children}
          </span>
        ))}
      </div>
      <style>{`@keyframes canary-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function HeroBold({ tweaks }) {
  const items = [
    'C01 · CAPSULE 01',
    '600 UNITS',
    '001 / 200 · SIGNAL',
    '001 / 200 · RECON',
    '001 / 200 · STRIKE',
    'DROP · IMMINENT',
    'NOT GAMING. NOT GENERIC.',
    'THE FLOCK GETS FIRST ACCESS',
  ];

  return (
    <section style={{ background: 'var(--canary)', position: 'relative' }}>
      {/* Top strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto',
        padding: '14px clamp(20px, 4vw, 48px)',
        borderBottom: '1px solid var(--ink)',
        alignItems: 'center', gap: 24
      }}>
        <img src="assets/canary-bug.png" alt="Canary" style={{ height: 22, width: 'auto' }} />
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.24em', opacity: 0.65, textAlign: 'center' }}>
          Canary · Systems + Objects
        </div>
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.24em' }}>
          Drop · TBA
        </div>
      </div>

      {/* Inverse mini-strip */}
      <div className="inverse" style={{ background: 'var(--ink)', color: 'var(--canary)' }}>
        <Ticker>
          {items.map((t, i) => <span key={i}>▸ {t}</span>)}
        </Ticker>
      </div>

      {/* Main hero */}
      <div style={{
        padding: 'clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 'clamp(16px, 2.5vw, 32px)',
        alignItems: 'stretch',
        minHeight: 'calc(100vh - 180px)'
      }}>
        {/* Left: meta column */}
        <div style={{
          gridColumn: 'span 3',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          borderRight: '1px solid var(--ink)',
          paddingRight: 'clamp(16px, 2.5vw, 32px)'
        }}>
          <div>
            <Reveal>
              <MonoLabel style={{ opacity: 0.55 }}>Chapter 01 · File C01</MonoLabel>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ marginTop: 18, fontSize: 13, lineHeight: 1.7 }}>
                A 65% die-cast aluminum keyboard. Three colorways. Two switches.
                Numbered 001–200 per colorway. One window.
              </div>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div style={{ fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', opacity: 0.55, marginTop: 32 }}>
              ↓ Scroll · The System
            </div>
          </Reveal>
        </div>

        {/* Middle: headline */}
        <div style={{
          gridColumn: 'span 6',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28
        }}>
          <Reveal>
            <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.28em', opacity: 0.7 }}>
              C01 · Capsule 01 · 600 units
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display" style={{
              margin: 0,
              fontSize: 'clamp(64px, 11vw, 200px)',
              lineHeight: 0.86,
              letterSpacing: '-0.005em'
            }}>
              {(tweaks.headline && tweaks.headline.trim())
                ? tweaks.headline.toUpperCase()
                : 'NOT GAMING.\nNOT GENERIC.'
              }
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <FilmGateway />
              <a href="#capture" className="font-mono uppercase" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '14px 22px',
                border: '1px solid var(--ink)',
                background: 'var(--ink)', color: 'var(--canary)',
                fontSize: 11, letterSpacing: '0.22em', gap: 10
              }}>
                <span style={{ width: 8, height: 8, background: 'var(--canary)', borderRadius: '50%', display: 'inline-block', animation: 'canary-pulse 1.6s ease-in-out infinite' }} />
                Join The Flock
              </a>
              <style>{`@keyframes canary-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }`}</style>
            </div>
          </Reveal>
        </div>

        {/* Right: product plate */}
        <div style={{
          gridColumn: 'span 3',
          display: 'flex', flexDirection: 'column', gap: 12,
          borderLeft: '1px solid var(--ink)',
          paddingLeft: 'clamp(16px, 2.5vw, 32px)'
        }}>
          <Reveal>
            <MonoLabel style={{ opacity: 0.55 }}>Hero plate · C01</MonoLabel>
          </Reveal>
          <Reveal delay={80} style={{ flex: 1 }}>
            <Placeholder label="C01 · Hero shot" ratio="3 / 4" style={{ height: '100%' }} />
          </Reveal>
          <Reveal delay={140}>
            <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', opacity: 0.65 }}>
              <span>Serial</span>
              <span>001 / 200</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom inverse bar with mini-specs */}
      <div className="inverse" style={{ background: 'var(--ink)', color: 'var(--canary)' }}>
        <div style={{
          padding: '18px clamp(20px, 4vw, 48px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 24,
          fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase'
        }}>
          <span>◆ 65% · 68 keys</span>
          <span>◆ Die-cast aluminum</span>
          <span>◆ Tri-mode wireless</span>
          <span>◆ Wing · Canary switches</span>
          <span>◆ $175 → $225</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HeroBold });
