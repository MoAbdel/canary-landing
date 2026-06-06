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
            <Placeholder
              ratio="16 / 9"
              src="assets/keyboards/c01-hero.jpg"
              alt="C01 Recon — top-down product shot"
            />
          </Reveal>

          <Reveal delay={80} style={{ gridColumn: 'span 4' }}>
            <Placeholder
              ratio="1 / 1"
              src="assets/keyboards/c01-angle.jpg"
              alt="C01 Recon — 3/4 angle"
            />
          </Reveal>
          <Reveal delay={140} style={{ gridColumn: 'span 4' }}>
            <Placeholder
              ratio="1 / 1"
              src="assets/keyboards/c01-macro.jpg"
              alt="C01 Recon — keycap and rotary macro"
            />
          </Reveal>
          <Reveal delay={200} style={{ gridColumn: 'span 4' }}>
            <Placeholder
              ratio="1 / 1"
              src="assets/keyboards/c01-side.jpg"
              alt="C01 Recon — side profile, USB-C and mode toggle"
            />
          </Reveal>
        </div>

        {/* Packaging strip */}
        <div style={{
          marginTop: 'clamp(40px, 6vw, 72px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 24, gap: 24, flexWrap: 'wrap'
        }}>
          <Reveal>
            <MonoLabel style={{ opacity: 0.6 }}>02·B · The Capsule</MonoLabel>
          </Reveal>
          <Reveal delay={80}>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6 }}>
              Numbered crate · Signal &amp; Recon shown
            </div>
          </Reveal>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(12px, 2vw, 24px)'
        }}>
          <Reveal delay={40} style={{ gridColumn: 'span 4' }}>
            <Placeholder
              ratio="3 / 4"
              src="assets/keyboards/box-signal.jpg"
              alt="C01 Signal — packaging"
            />
          </Reveal>
          <Reveal delay={100} style={{ gridColumn: 'span 4' }}>
            <Placeholder
              ratio="3 / 4"
              src="assets/keyboards/box-recon.jpg"
              alt="C01 Recon — packaging"
            />
          </Reveal>
          <Reveal delay={160} style={{ gridColumn: 'span 4' }}>
            <Placeholder
              ratio="3 / 4"
              src="assets/keyboards/box-open.jpg"
              alt="C01 — opened crate with numbered cloth"
            />
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <FilmGateway compact />
            <a href="#specs" className="font-mono uppercase" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '14px 22px',
              border: '1px solid var(--ink)',
              background: 'transparent', color: 'var(--ink)',
              fontSize: 11, letterSpacing: '0.22em'
            }}>See full specs</a>
            <a href="#capture" className="font-mono uppercase" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '14px 22px',
              border: '1px solid var(--ink)',
              background: 'var(--ink)', color: 'var(--canary)',
              fontSize: 11, letterSpacing: '0.22em'
            }}>Join The Flock</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionCapture({ tweaks }) {
  const cd = useCountdown(tweaks.countdown === 'on' ? tweaks.dropDateISO : '');

  return (
    <section id="capture" style={{
      background: 'var(--paper)',
      color: 'var(--ink)',
      borderTop: '1px solid var(--ink)',
      scrollMarginTop: 80
    }}>
      <span id="join" style={{ display: 'block', height: 0, scrollMarginTop: 80 }} aria-hidden="true" />
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(60px, 10vw, 140px) clamp(24px, 6vw, 80px)',
      }}>
        <Reveal>
          <MonoLabel style={{ opacity: 0.55 }}>Priority Access</MonoLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="font-display" style={{
            margin: '16px 0 0',
            fontSize: 'clamp(40px, 7vw, 116px)',
            lineHeight: 0.92,
          }}>
            JOIN THE FLOCK BEFORE
            <br />
            CAPSULE 01 OPENS.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p style={{
            maxWidth: 620, marginTop: 'clamp(20px, 3vw, 32px)',
            fontSize: 15, lineHeight: 1.65, opacity: 0.85
          }}>
            The Flock gets the drop time, early link, serial range, colorway previews, sound tests,
            and launch details before public release.
          </p>
        </Reveal>

        {cd && tweaks.dropDateISO ? (
          <Reveal delay={160}>
            <div style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
              border: '1px solid var(--ink)',
              background: 'var(--ink)',
              maxWidth: 640
            }}>
              {[['Days', cd.d], ['Hours', cd.h], ['Minutes', cd.m], ['Seconds', cd.s]].map(([label, v]) => (
                <div key={label} style={{
                  background: 'var(--ink)',
                  color: 'var(--canary)',
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
          <div style={{ marginTop: 'clamp(32px, 5vw, 56px)', maxWidth: 720 }}>
            <SignupForm variant="light" source="capture" cta="Get Drop Access" />
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div style={{
            marginTop: 'clamp(40px, 6vw, 72px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
            fontSize: 12,
            borderTop: '1px solid var(--ink)',
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

/* ------------------------------------------------------------------ */
/* Drop scarcity — "Capsule 01 Will Not Restock"                       */
/* ------------------------------------------------------------------ */
function SectionScarcity() {
  const facts = [
    'Capsule 01 is the first Canary drop.',
    '600 total units.',
    '200 units per colorway.',
    'Each colorway numbered 001–200.',
    'One release window.',
    'No restocks — when a serial range closes, it stays closed.',
    'The Flock gets first access.',
  ];
  return (
    <section id="capsule" style={{ background: '#FFFFFF', color: 'var(--ink)', borderTop: '1px solid var(--ink)' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(60px, 10vw, 140px) clamp(24px, 6vw, 80px)',
        display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 'clamp(28px, 4vw, 48px)'
      }}>
        <Reveal><MonoLabel style={{ opacity: 0.6 }}>The Drop</MonoLabel></Reveal>
        <Reveal delay={60}>
          <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(40px, 7vw, 112px)', lineHeight: 0.92 }}>
            CAPSULE 01 WILL
            <br />
            NOT RESTOCK.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ margin: 0, maxWidth: 640, fontSize: 15, lineHeight: 1.65 }}>
            C01 launches as Canary's first numbered capsule: 600 total boards across Signal, Recon,
            and Strike. Once a colorway is gone, that serial range is closed.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <ul style={{
            listStyle: 'none', margin: 0, padding: 0,
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px 32px',
            fontSize: 14, lineHeight: 1.5
          }}>
            {facts.map((f) => (
              <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span className="tick" aria-hidden="true" style={{ marginTop: 7 }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Colorways — Signal / Recon / Strike, each anchored + waitlist CTA   */
/* ------------------------------------------------------------------ */
const COLORWAYS = [
  {
    id: 'signal', name: 'Signal',
    img: 'assets/keyboards/box-signal.jpg',
    alt: 'Canary C01 Signal 65% aluminum mechanical keyboard',
    copy: 'Signal is the clean Canary colorway: high-contrast, collectible, and built for modern desk setups that need one object to pull the space together.',
  },
  {
    id: 'recon', name: 'Recon',
    img: 'assets/keyboards/box-recon.jpg',
    alt: 'Canary C01 Recon dark aluminum mechanical keyboard',
    copy: 'Recon is the darker side of Capsule 01: a stealth-inspired colorway built for black desks, dark academia setups, late-night work sessions, and muted premium spaces.',
  },
  {
    id: 'strike', name: 'Strike',
    img: 'assets/keyboards/c01-side.jpg',
    alt: 'Canary C01 Strike limited-run mechanical keyboard',
    copy: 'Strike is the loudest colorway in Capsule 01: built for gaming setups, stream desks, and creators who want the keyboard to be seen on camera.',
  },
];

function chooseColorway(name) {
  if (window.canaryTrack) window.canaryTrack('colorway_select', { colorway: name, source: 'colorway_card' });
  window.dispatchEvent(new CustomEvent('canary:select-colorway', { detail: { colorway: name } }));
}

function SectionColorways() {
  return (
    <section id="colorways" style={{ background: 'var(--paper)', color: 'var(--ink)', borderTop: '1px solid var(--ink)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(60px, 10vw, 140px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(28px, 4vw, 48px)' }}>
          <Reveal><MonoLabel style={{ opacity: 0.6 }}>Three Colorways</MonoLabel></Reveal>
          <Reveal delay={60}><div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.2em', opacity: 0.6 }}>200 each · numbered 001–200</div></Reveal>
        </div>
        <Reveal>
          <h2 className="font-display" style={{ margin: '0 0 clamp(32px,5vw,56px)', fontSize: 'clamp(40px, 7vw, 104px)', lineHeight: 0.92 }}>
            SIGNAL · RECON · STRIKE
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(16px, 2.5vw, 28px)' }}>
          {COLORWAYS.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}>
              <article id={c.id} style={{
                scrollMarginTop: 80,
                border: '1px solid var(--ink)', background: '#FFFFFF',
                display: 'flex', flexDirection: 'column', height: '100%'
              }}>
                <Placeholder ratio="4 / 3" src={c.img} alt={c.alt} />
                <div style={{ padding: 'clamp(18px, 2vw, 24px)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  <h3 className="font-display" style={{ margin: 0, fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1 }}>{c.name.toUpperCase()}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, flex: 1 }}>{c.copy}</p>
                  <a
                    href="#capture"
                    onClick={() => chooseColorway(c.name)}
                    className="font-mono uppercase"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      padding: '13px 18px', marginTop: 4,
                      border: '1px solid var(--ink)', background: 'var(--ink)', color: 'var(--canary)',
                      fontSize: 10, letterSpacing: '0.2em'
                    }}
                  >Join for {c.name} Access</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Built for the Setup — aesthetic-first buyer                         */
/* ------------------------------------------------------------------ */
function SectionSetup() {
  const bullets = [
    'Designed for desk resets, setup tours, and everyday rituals',
    'Three collectible colorways',
    'Compact 65% footprint',
    'Premium aluminum presence',
    'PBT keycaps',
    'Packaging designed for the unboxing moment',
  ];
  return (
    <section id="setup" style={{ background: '#FFFFFF', color: 'var(--ink)', borderTop: '1px solid var(--ink)' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: 'clamp(60px, 10vw, 140px) clamp(24px, 6vw, 80px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 2.5vw, 28px)' }}>
          <Reveal><MonoLabel style={{ opacity: 0.6 }}>For The Setup</MonoLabel></Reveal>
          <Reveal delay={60}>
            <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(40px, 6vw, 96px)', lineHeight: 0.92 }}>
              BUILT FOR
              <br />
              THE SETUP.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: 15, lineHeight: 1.65 }}>
              Your keyboard is the object your desk revolves around. C01 is built for creators,
              students, gamers, and modern workspaces where sound, color, and material matter as
              much as performance.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12, fontSize: 14, lineHeight: 1.5 }}>
              {bullets.map((b) => (
                <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span className="tick" aria-hidden="true" style={{ marginTop: 7 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <Placeholder ratio="4 / 5" src="assets/keyboards/c01-angle.jpg" alt="Canary C01 on a modern desk setup — 3/4 angle" />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Built for the Build — technical / craft buyer (inverse)            */
/* ------------------------------------------------------------------ */
function SectionBuild() {
  const bullets = [
    '65% / 68-key layout',
    'Die-cast aluminum chassis',
    'USB-C, 2.4 GHz, and Bluetooth',
    'Wing 45g tactile or Canary 50g clicky switches',
    'Three-color PBT keycaps',
    'Compact footprint for gaming, work, and creative desks',
  ];
  return (
    <section id="build" className="inverse" style={{ background: 'var(--ink)', color: 'var(--canary)', borderTop: '1px solid var(--canary)' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: 'clamp(60px, 10vw, 140px) clamp(24px, 6vw, 80px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center'
      }}>
        <Reveal delay={100} style={{ order: 0 }}>
          <Placeholder ratio="4 / 5" src="assets/keyboards/c01-macro.jpg" alt="Canary C01 keycap and switch macro — die-cast aluminum build" />
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 2.5vw, 28px)' }}>
          <Reveal><MonoLabel style={{ opacity: 0.6 }}>For The Build</MonoLabel></Reveal>
          <Reveal delay={60}>
            <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(40px, 6vw, 96px)', lineHeight: 0.92 }}>
              BUILT FOR
              <br />
              THE BUILD.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: 15, lineHeight: 1.65, opacity: 0.85 }}>
              Under the visual language is a serious board: die-cast aluminum, compact 65% layout,
              tri-mode wireless, PBT keycaps, and two launch switch profiles.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12, fontSize: 14, lineHeight: 1.5 }}>
              {bullets.map((b) => (
                <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span className="tick" aria-hidden="true" style={{ marginTop: 7 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Specs — structured, scannable, crawlable                            */
/* ------------------------------------------------------------------ */
function SectionSpecs() {
  const specs = [
    ['Product', 'Canary C01'],
    ['Layout', '65%'],
    ['Keys', '68'],
    ['Case', 'Die-cast aluminum'],
    ['Connectivity', 'USB-C, 2.4 GHz, Bluetooth'],
    ['Keycaps', 'Three-color PBT'],
    ['Switch options', 'Wing 45g tactile, Canary 50g clicky'],
    ['Colorways', 'Signal, Recon, Strike'],
    ['Drop', 'Capsule 01'],
    ['Quantity', '600 total, 200 per colorway'],
    ['Restock', 'No restocks'],
  ];
  return (
    <section id="specs" style={{ background: 'var(--paper)', color: 'var(--ink)', borderTop: '1px solid var(--ink)', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px, 10vw, 140px) clamp(24px, 6vw, 80px)' }}>
        <Reveal><MonoLabel style={{ opacity: 0.6 }}>Specifications</MonoLabel></Reveal>
        <Reveal delay={60}>
          <h2 className="font-display" style={{ margin: '12px 0 clamp(28px,4vw,44px)', fontSize: 'clamp(40px, 7vw, 104px)', lineHeight: 0.92 }}>
            CANARY C01 SPECS
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <dl style={{ margin: 0, borderTop: '1px solid var(--ink)' }}>
            {specs.map(([k, v]) => (
              <div key={k} style={{
                display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) 2fr', gap: 16,
                padding: '14px 0', borderBottom: '1px solid var(--ink-20)'
              }}>
                <dt className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.16em', opacity: 0.6, margin: 0 }}>{k}</dt>
                <dd style={{ margin: 0, fontSize: 14 }}>{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ marginTop: 24, fontSize: 13 }}>
            New to compact boards? Read{' '}
            <a
              href="/learn/what-is-a-65-keyboard"
              onClick={() => { if (window.canaryTrack) window.canaryTrack('learn_page_click', { to: '/learn/what-is-a-65-keyboard', from: 'specs' }); }}
              style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}
            >What Is a 65% Keyboard?</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ — native <details> for crawlability + accessibility            */
/* Mirrors the FAQPage JSON-LD in index.html exactly.                  */
/* ------------------------------------------------------------------ */
const FAQ_ITEMS = [
  ['What is the Canary C01?', 'Canary C01 is a limited-run 65% die-cast aluminum mechanical keyboard with 68 keys, tri-mode wireless, and three-color PBT keycaps. It is the hero product of Capsule 01.'],
  ['When does Canary C01 launch?', 'Canary C01 launches as Capsule 01 in a single release window. The exact drop date is announced to The Flock, the Canary waitlist, before the public release.'],
  ['How many Canary C01 units are being made?', '600 total units across three colorways: 200 each of Signal, Recon, and Strike, numbered 001 to 200 within each colorway.'],
  ['Will Capsule 01 restock?', 'No. Capsule 01 is a single numbered drop with no restocks. Once a colorway\'s serial range is gone, it is closed.'],
  ['What are Signal, Recon, and Strike?', 'They are the three Canary C01 colorways. Signal is clean and high-contrast, Recon is dark and stealth-inspired, and Strike is a bold statement colorway built for camera-facing setups.'],
  ['What layout is Canary C01?', 'Canary C01 uses a 65% layout with 68 keys: a compact footprint that keeps arrow keys and core modifiers while dropping the function row and number pad.'],
  ['Is Canary C01 wireless?', 'Yes. Canary C01 is tri-mode: USB-C wired, 2.4 GHz wireless via dongle, and Bluetooth.'],
  ['What switches are available?', 'Two launch switch profiles: Wing (45g tactile) and Canary (50g clicky).'],
  ['What are PBT keycaps?', 'PBT is a dense, durable keycap plastic that resists shine and wear and gives a deeper sound than common ABS caps. Canary C01 ships with three-color PBT keycaps.'],
  ['What does 65% keyboard mean?', 'A 65% keyboard keeps the main typing cluster, arrow keys, and a few navigation keys while removing the function row and number pad: compact without losing the essentials.'],
  ['Is Canary C01 good for gaming?', 'Yes. The compact 65% layout frees up desk and mouse space, and tri-mode connectivity with low-latency 2.4 GHz wireless suits gaming and stream desks.'],
  ['Is Canary C01 good for work and productivity?', 'Yes. The 65% layout, premium quiet build, and tri-mode wireless make Canary C01 well suited to work-from-home desks, writing, and focused work sessions.'],
  ['Is Canary C01 good for desk setups?', 'Yes. Canary C01 is built as the centerpiece of a setup: aluminum presence, three collectible colorways, and a compact footprint designed to photograph well.'],
  ['How do I join The Flock?', 'Add your email to the Canary waitlist on this page. The Flock gets the drop time, early link, serial range, and colorway previews before the public release.'],
  ['Will Canary release keycaps or creator capsules?', 'Future capsules and accessories are planned. Join The Flock to hear about new colorways, keycaps, and creator releases first.'],
];

function SectionFAQ() {
  const onToggle = (q) => (e) => {
    if (e.target.open && window.canaryTrack) window.canaryTrack('faq_expand', { question: q });
  };
  return (
    <section id="faq" style={{ background: '#FFFFFF', color: 'var(--ink)', borderTop: '1px solid var(--ink)', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(60px, 10vw, 140px) clamp(24px, 6vw, 80px)' }}>
        <Reveal><MonoLabel style={{ opacity: 0.6 }}>Questions</MonoLabel></Reveal>
        <Reveal delay={60}>
          <h2 className="font-display" style={{ margin: '12px 0 clamp(28px,4vw,44px)', fontSize: 'clamp(40px, 7vw, 104px)', lineHeight: 0.92 }}>
            FAQ
          </h2>
        </Reveal>
        <div style={{ borderTop: '1px solid var(--ink)' }}>
          {FAQ_ITEMS.map(([q, a]) => (
            <details key={q} onToggle={onToggle(q)} style={{ borderBottom: '1px solid var(--ink-20)' }}>
              <summary className="font-mono" style={{
                cursor: 'pointer', listStyle: 'none', padding: '18px 0',
                fontSize: 15, fontWeight: 700, display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center'
              }}>
                <span>{q}</span>
                <span aria-hidden="true" style={{ opacity: 0.5, flexShrink: 0 }}>+</span>
              </summary>
              <div style={{ padding: '0 0 18px', fontSize: 14, lineHeight: 1.65, maxWidth: 680 }}>{a}</div>
            </details>
          ))}
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
            <a href="mailto:hello@canary.store">hello@canary.store</a><br />
            <a href="mailto:press@canary.store">press@canary.store</a>
          </div>
        </div>
        <div>
          <MonoLabel style={{ opacity: 0.55 }}>Explore</MonoLabel>
          <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.8 }}>
            <a href="#colorways">Colorways</a><br />
            <a href="#specs">Specs</a><br />
            <a href="#faq">FAQ</a><br />
            <a
              href="/learn/what-is-a-65-keyboard"
              onClick={() => { if (window.canaryTrack) window.canaryTrack('learn_page_click', { to: '/learn/what-is-a-65-keyboard', from: 'footer' }); }}
            >Learn</a>
          </div>
        </div>
        <div>
          <MonoLabel style={{ opacity: 0.55 }}>Notify list</MonoLabel>
          <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.8 }}>
            <a href="#capture">Join The Flock</a><br />
            {/* TODO(social): when IG/TikTok/Discord launch, add links here and fire
                canaryTrack('outbound_social_click', { network }) on click. */}
            <span style={{ opacity: 0.55 }}>Social channels at drop</span>
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
  SectionManifesto, SectionSystem, SectionCapture, Footer,
  SectionScarcity, SectionColorways, SectionSetup, SectionBuild, SectionSpecs, SectionFAQ
});
