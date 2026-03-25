'use client'

import { useState, useCallback, useRef } from 'react'

// VideoModal is dynamically imported on first click only (facade pattern)
let VideoModalModule: typeof import('./VideoModal') | null = null

export default function LogoTrigger() {
  const [modalOpen, setModalOpen] = useState(false)
  const [ModalComponent, setModalComponent] = useState<React.ComponentType<{ onClose: () => void }> | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback(async () => {
    // Load the modal component on first click only
    if (!VideoModalModule) {
      VideoModalModule = await import('./VideoModal')
    }
    setModalComponent(() => VideoModalModule!.default)
    setModalOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setModalOpen(false)
    // Return focus to the logo trigger
    buttonRef.current?.focus()
  }, [])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        aria-label="Watch the Canary film"
        className="border-0 bg-transparent p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canary"
        style={{
          transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.18s ease',
          minWidth: 48,
          minHeight: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.transform = 'scale(0.93)'
          el.style.filter = 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.transform = 'scale(1)'
          el.style.filter = 'none'
        }}
        onMouseDown={e => {
          e.currentTarget.style.transform = 'scale(0.88)'
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = 'scale(0.93)'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/canary-bug.png"
          alt=""
          width={200}
          height={82}
          style={{ display: 'block' }}
          draggable={false}
        />
      </button>

      {modalOpen && ModalComponent && (
        <ModalComponent onClose={handleClose} />
      )}
    </>
  )
}
