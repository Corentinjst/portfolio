'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Icon from '@/components/ui/Icon'

interface ContentModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function ContentModal({ open, onClose, children }: ContentModalProps) {
  useEffect(() => {
    if (!open) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 animate-[cj-fade-in_240ms_var(--ease-out)]"
        style={{
          background: 'var(--glass-scrim)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-4xl max-h-[86vh] overflow-y-auto rounded-ds-xl border border-line-strong text-fg animate-[cj-pop-in_320ms_var(--ease-out)]"
        style={{
          background: 'var(--dialog-fill, rgba(15,19,26,.62))',
          backdropFilter: 'var(--backdrop-glass-strong)',
          WebkitBackdropFilter: 'var(--backdrop-glass-strong)',
          boxShadow: 'var(--shadow-glass-lg)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="icon-btn icon-btn-sm sticky top-5 float-right mr-5 mt-5 z-10"
          aria-label="Fermer"
        >
          <Icon name="x" size={15} />
        </button>

        <div className="px-6 py-7 sm:px-8 sm:py-8">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}
