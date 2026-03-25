'use client'

import { useEffect, useRef, useCallback } from 'react'

interface VideoModalProps {
  onClose: () => void
}

export default function VideoModal({ onClose }: VideoModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Focus the close button when modal opens
  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  // Autoplay video when modal opens
  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // Autoplay blocked by browser — user can press play manually
    })
  }, [])

  // Pause and reset video on close
  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    onClose()
  }, [onClose])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleClose])

  // Trap focus within modal
  useEffect(() => {
    const modal = backdropRef.current
    if (!modal) return

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    modal.addEventListener('keydown', trapFocus)
    return () => modal.removeEventListener('keydown', trapFocus)
  }, [])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) handleClose()
  }, [handleClose])

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label="Canary film"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Modal panel */}
      <div className="relative w-[90vw] max-w-4xl">

        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          aria-label="Close film"
          className="absolute -top-10 right-0 text-white text-2xl font-light leading-none cursor-pointer bg-transparent border-0 p-2 hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          ✕
        </button>

        {/*
          ⚠️ DEPLOYMENT GATE: Replace before sharing publicly.
          Current: 26MB MP4 served from /public — no streaming, poor mobile performance.
          Required: Host final cut on Vimeo or YouTube and replace <video> with <iframe>.
          See docs/superpowers/specs/2026-03-25-canary-landing-page-design.md for details.
        */}
        <div className="w-full bg-black" style={{ aspectRatio: '16 / 9' }}>
          <video
            ref={videoRef}
            src="/canary-video.mp4"
            className="w-full h-full"
            controls
            playsInline
            title="Canary film"
          />
        </div>

      </div>
    </div>
  )
}
