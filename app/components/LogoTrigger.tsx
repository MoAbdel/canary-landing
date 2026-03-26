'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

export default function LogoTrigger() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const handlePlay = useCallback(() => {
    setPlaying(true)
    setTimeout(() => {
      videoRef.current?.play().catch(() => {})
      closeRef.current?.focus()
    }, 350)
  }, [])

  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setPlaying(false)
    setTimeout(() => buttonRef.current?.focus(), 350)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && playing) handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [playing, handleClose])

  return (
    <>
      {/* Logo button — fades out when playing */}
      <button
        ref={buttonRef}
        onClick={handlePlay}
        aria-label="Watch the Canary film"
        className="border-0 bg-transparent p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 48,
          minHeight: 48,
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          opacity: playing ? 0 : 1,
          transform: playing ? 'scale(0.75)' : 'scale(1)',
          pointerEvents: playing ? 'none' : 'auto',
        }}
        onMouseEnter={e => {
          if (playing) return
          e.currentTarget.style.transform = 'scale(0.93)'
          e.currentTarget.style.filter = 'drop-shadow(0 6px 16px rgba(0,0,0,0.2))'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.filter = 'none'
        }}
        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.88)' }}
        onMouseUp={e => { e.currentTarget.style.transform = 'scale(0.93)' }}
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

      {/* Inline video — fades in over white background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.35s ease',
          opacity: playing ? 1 : 0,
          pointerEvents: playing ? 'auto' : 'none',
          zIndex: 50,
        }}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 20,
            right: 24,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 22,
            color: '#111',
            lineHeight: 1,
            padding: 8,
            opacity: 0.4,
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.4' }}
        >
          ✕
        </button>

        {/* Video */}
        <video
          ref={videoRef}
          src="/canary-video.mp4"
          playsInline
          controls
          onEnded={handleClose}
          style={{
            width: '90vw',
            maxWidth: 960,
            aspectRatio: '16/9',
            background: '#000',
            transition: 'transform 0.35s ease',
            transform: playing ? 'scale(1)' : 'scale(0.96)',
          }}
        />
      </div>
    </>
  )
}
