'use client'

import Icon from '@/components/ui/Icon'

interface ScrollCueProps {
  targetId: string
  label: string
}

/**
 * Flèche en bas du Hero invitant à faire défiler la page.
 * Défilement en JS (comme la Navbar) pour ne pas laisser d'ancre dans l'URL.
 */
export default function ScrollCue({ targetId, label }: ScrollCueProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="icon-btn absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:inline-grid text-fg-muted"
    >
      <span className="block animate-[cj-nudge_2.4s_ease-in-out_infinite]">
        <Icon name="arrow-down" size={18} />
      </span>
    </a>
  )
}
