/* global React */
// Sections that are *shared* (styled by both safe and bold directions,
// but each direction has its own Hero). These are used by both.

function SectionManifesto({ tweaks, direction }) {
  const bold = direction === 'bold';
  return (
    <section style={{
      background: 'var(--ink)',
      color:      'var(--canary)',
      borderTop: `1px solid var(--canary)`,
    }} className="inverse">
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(60px, 10vw, 140px) clamp(24px, 6vw, 80px)',
        display: 'grid',
        gridTemplateColumns: bold ? '1fr' : 'minmax(180px, 1fr) 3fr',
        gap: 'clamp(28px, 5vw, 72px)'
      }}>
        <Reveal>
          <MonoLabel style={{ opacity: 0.6 }}>01 · Manifesto</MonoLabel>
        </Reveal>

        <div>
          <Reveal>
            <div className="font-mono uppercase" style={{
              fontSize: 11, letterSpacing: '0.22em', opacity: 0.6, marginBottom: 20
            }}>
              Not gaming. Not generic.
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-display" style={{
              margin: 0,
              fontSize: bold ? 'clamp(48px, 8vw, 132px)' : 'clamp(40px, 6.4vw, 96px)',
              lineHeight: 0.92,
              textWrap: 'balance'
            }}>
              INSTRUMENTS
              <br />
              FOR THE MODERN
              <br />
              DESK.
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <div style={{
              marginTop: 'clamp(32px, 5vw, 56px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'clamp(24px, 4vw, 44px)',
              maxWidth: 880,
              fontSize: 15, lineHeight: 1.65
            }}>
              <p style={{ margin: 0 }}>
                Canary builds objects for people who take their desks seriously. Quiet materials.
                Deliberate weight. Hardware that earns its place and stays there.
              </p>
              <p style={{ margin: 0 }}>
                Every capsule is numbered, limited, and released when it is ready. No restocks.
                No seasons. One chapter at a time.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SectionSystem({ direction }) {
  const bold = direction === 'bold';
  return (
    <section style={{
      background: '#FFFFFF',
      color: 'var(--ink)',
      borderTop: `1px solid var(--ink)`,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(60px, 10vw, 140px) clamp(24px, 6vw, 80px)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, gap: 24, flexWrap: 'wrap' }}>
          <Reveal>
            <MonoLabel style={{ opacity: 0.6 }}>02 · The System</MonoLabel>
          </Reveal>
          <Reveal delay={80}>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6 }}>
              C01 Capsule · 600 units · 001–200 per colorway
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h2 className="font-display" style={{
            margin: 0,
            fontSize: 'clamp(44px, 7.5vw, 120px)',
            lineHeight: 0.92,
          }}>
            THE KEYBOARD
            <br />
            AS SUBSTRATE.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p style={{
            maxWidth: 640, marginTop: 'clamp(24px, 3vw, 40px)',
            fontSize: 15, lineHeight: 1.65
          }}>
            C01 is the first object. A 65% die-cast aluminum board with tri-mode wireless and
            PBT keycaps. The rest of the system — caps, switches, mats, crates — arrives
            in chapters.
          </p>
        </Reveal>

        {/* Hero shot + teases grid */}
        <div style={{
          marginTop: 'clamp(40px, 6vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(12px, 2vw, 24px)'
        }}>
          <Reveal delay={40} style={{ gridColumn: 'span 12' }}>
            <Placeholder label="C01 · Hero shot · 3/4 product render" ratio="16 / 9" />
          </Reveal>

          <Reveal delay={80} style={{ gridColumn: 'span 4' }}>
            <Placeholder label="C01 Signal · top-down" ratio="1 / 1" />
          </Reveal>
          <Reveal delay={140} style={{ gridColumn: 'span 4' }}>
            <Placeholder label="C01 Recon · macro" ratio="1 / 1" />
          </Reveal>
          <Reveal delay={200} style={{ gridColumn: 'span 4' }}>
            <Placeholder label="C01 Strike · detail" ratio="1 / 1" />
          </Reveal>
        </div>

        {/* Colorways strip */}
        <Reveal delay={80}>
          <div style={{
            marginTop: 'clamp(40px, 6vw, 72px)',
            borderTop: '1px solid var(--ink)',
            borderBottom: '1px solid var(--ink)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)'
          }}>
            {[
              { n: '001 / 200', name: 'Signal', desc: 'Neutral · cream', sw: '#D9CFB2' },
              { n: '001 / 200', name: 'Recon',  desc: 'Stealth · graphite', sw: '#2B2C2E' },
              { n: '001 / 200', name: 'Strike', desc: 'Accent · signal orange', sw: '#FF5B1F' },
            ].map((c, i) => (
              <div key={c.name} style={{
                padding: 'clamp(20px, 3vw, 36px)',
                borderLeft: i === 0 ? 'none' : '1px solid var(--ink)',
                display: 'flex', flexDirection: 'column', gap: 14
              }}>
                <MonoLabel style={{ opacity: 0.55 }}>{c.n}</MonoLabel>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span aria-hidden="true" style={{
                    width: 28, height: 28, background: c.sw,
                    border: '1px solid var(--ink)',
                    flex: 'none'
                  }} />
                  <span className="font-display" style={{ fontSize: 36, lineHeight: 0.9 }}>
                    C01 {c.name.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Specs row */}
        <div style={{
          marginTop: 'clamp(40px, 6vw, 64px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(20px, 3vw, 40px)',
          fontSize: 13, lineHeight: 1.55
        }}>
          {[
            ['Form factor', '65% layout · 68 keys'],
            ['Chassis', 'Die-cast aluminum'],
            ['Connectivity', 'USB-C · 2.4GHz · Bluetooth'],
            ['Keycaps', 'Three-color PBT'],
            ['Switches', 'Wing (45g tactile) · Canary (50g clicky)'],
            ['Edition', 'Numbered 001–200 per colorway'],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 40}>
              <div>
                <MonoLabel style={{ opacity: 0.55 }}>{k}</MonoLabel>
                <div style={{ marginTop: 6 }}>{v}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={60}>
          <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <FilmGateway compact />
            <a href="#capture" className="font-mono uppercase" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '14px 22px',
              border: '1px solid var(--ink)',
              background: 'var(--ink)', color: 'var(--canary)',
              fontSize: 11, letterSpacing: '0.22em'
            }}>Notify me at drop</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionCapture({ tweaks, direction }) {
  const bold = direction === 'bold';
  const cd = useCountdown(tweaks.countdown === 'on' ? tweaks.dropDateISO : '');

  return (
    <section id="capture" className="inverse" style={{
      background: 'var(--ink)',
      color: 'var(--canary)',
      borderTop: '1px solid var(--canary)'
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(60px, 10vw, 140px) clamp(24px, 6vw, 80px)',
      }}>
        <Reveal>
          <MonoLabel style={{ opacity: 0.55 }}>03 · Priority access</MonoLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="font-display" style={{
            margin: '16px 0 0',
            fontSize: 'clamp(44px, 8vw, 132px)',
            lineHeight: 0.92,
          }}>
            BE FIRST
            <br />
            IN LINE.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p style={{
            maxWidth: 560, marginTop: 'clamp(20px, 3vw, 32px)',
            fontSize: 15, lineHeight: 1.65, opacity: 0.85
          }}>
            C01 releases in a single window. When it's gone, it's gone. The list gets the time,
            the link, and the serial range before anyone else.
          </p>
        </Reveal>

        {cd && tweaks.dropDateISO ? (
          <Reveal delay={160}>
            <div style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
              border: `1px solid ${bold ? 'var(--ink)' : 'var(--canary)'}`,
              background: bold ? 'var(--ink)' : 'var(--canary)',
              maxWidth: 640
            }}>
              {[['Days', cd.d], ['Hours', cd.h], ['Minutes', cd.m], ['Seconds', cd.s]].map(([label, v]) => (
                <div key={label} style={{
                  background: bold ? 'var(--canary)' : 'var(--ink)',
                  color: bold ? 'var(--ink)' : 'var(--canary)',
                  padding: '24px 16px', textAlign: 'center'
                }}>
                  <div className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1 }}>
                    {String(v).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6, opacity: 0.7 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={200}>
          <div style={{ marginTop: 'clamp(32px, 5vw, 56px)', maxWidth: 640 }}>
            <SignupForm variant={bold ? 'light' : 'dark'} />
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div style={{
            marginTop: 'clamp(40px, 6vw, 72px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
            fontSize: 12,
            borderTop: `1px solid ${bold ? 'var(--ink)' : 'var(--canary)'}`,
            paddingTop: 24
          }}>
            {[
              ['600', 'Units in the capsule'],
              ['200', 'Per colorway · numbered'],
              ['1', 'Release window'],
              ['0', 'Restocks'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display" style={{ fontSize: 44, lineHeight: 1 }}>{n}</div>
                <div style={{ opacity: 0.65, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 10 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionCommunity({ direction }) {
  const bold = direction === 'bold';
  return (
    <section style={{ background: 'var(--canary)', borderTop: '1px solid var(--ink)' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 'clamp(24px, 4vw, 48px)'
      }}>
        <Reveal style={{ gridColumn: 'span 12' }}>
          <MonoLabel style={{ opacity: 0.55 }}>04 · The Nest</MonoLabel>
        </Reveal>

        <div style={{ gridColumn: 'span 12' }}>
          <Reveal>
            <h2 className="font-display" style={{
              margin: 0,
              fontSize: 'clamp(44px, 7vw, 112px)',
              lineHeight: 0.92
            }}>
              WHERE THE FLOCK
              <br />
              ROOSTS.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p style={{
              maxWidth: 560, marginTop: 24, fontSize: 15, lineHeight: 1.65
            }}>
              The Nest is the community around Canary. Builds in progress, early looks,
              and access to future chapters.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
              <a className="font-mono uppercase" href="#" style={{
                border: '1px solid var(--ink)', background: 'var(--ink)', color: 'var(--canary)',
                padding: '14px 22px', fontSize: 11, letterSpacing: '0.22em'
              }}>Join The Nest · Discord</a>
              <a className="font-mono uppercase" href="#" style={{
                border: '1px solid var(--ink)',
                padding: '14px 22px', fontSize: 11, letterSpacing: '0.22em'
              }}>@canary on Instagram</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--canary)' }} className="inverse">
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(36px, 5vw, 64px) clamp(24px, 6vw, 80px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 32,
        alignItems: 'end'
      }}>
        <div>
          <img src="assets/canary-bug.png" alt="Canary" style={{ height: 28, width: 'auto', filter: 'invert(1) brightness(2)' }} />
          <div style={{ marginTop: 18, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7, lineHeight: 1.7 }}>
            Systems + Objects
            <br />
            Est. 2026
          </div>
        </div>
        <div>
          <MonoLabel style={{ opacity: 0.55 }}>Contact</MonoLabel>
          <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.8 }}>
            <a href="mailto:hello@canary.desk">hello@canary.desk</a><br />
            <a href="mailto:press@canary.desk">press@canary.desk</a>
          </div>
        </div>
        <div>
          <MonoLabel style={{ opacity: 0.55 }}>Follow</MonoLabel>
          <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.8 }}>
            <a href="#">Instagram</a><br />
            <a href="#">The Nest · Discord</a><br />
            <a href="#">YouTube</a>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.55 }}>
          © 2026 Canary<br />
          All marks reserved
        </div>
      </div>
      <div className="hair" />
      <div style={{
        padding: '16px clamp(24px, 6vw, 80px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
        fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5
      }}>
        <span>C01 · Capsule 01</span>
        <span>600 units · 001 / 200 per colorway</span>
        <span>Status · Drop imminent</span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  SectionManifesto, SectionSystem, SectionCapture, SectionCommunity, Footer
});
