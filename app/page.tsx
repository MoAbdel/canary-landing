import LogoTrigger from './components/LogoTrigger'

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-canary overflow-hidden">

      {/* Yellow field — flex column, fills all space above bottom bar */}
      <div className="flex flex-col flex-1 items-center overflow-hidden">

        {/* CANARY headline — top-anchored, full width */}
        <h1
          className="font-display text-ink text-center w-full leading-none select-none"
          style={{ fontSize: 'clamp(72px, 14vw, 160px)', paddingTop: '4%' }}
        >
          CANARY
        </h1>

        {/* SYSTEMS + OBJECTS — vertically centered in remaining space */}
        <div className="flex-1 flex items-center justify-center">
          <p
            className="font-mono font-bold text-ink uppercase tracking-[0.28em]"
            style={{ fontSize: 'clamp(10px, 1.4vw, 16px)' }}
          >
            SYSTEMS + OBJECTS
          </p>
        </div>

        {/* Logo trigger — bottom of yellow field */}
        <div className="flex flex-col items-center" style={{ paddingBottom: '6%' }}>
          <span
            className="font-mono text-ink/35 uppercase tracking-[0.2em] mb-2"
            style={{ fontSize: '9px' }}
            aria-hidden="true"
          >
            CLICK TO WATCH
          </span>
          <LogoTrigger />
        </div>

      </div>

      {/* Black bottom bar */}
      <div
        className="w-full bg-ink flex-shrink-0"
        style={{ height: 'clamp(6px, 1.2vw, 14px)' }}
        aria-hidden="true"
      />

    </main>
  )
}
