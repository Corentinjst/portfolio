'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  /** Délai d'apparition en ms, pour échelonner des éléments voisins */
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'header'
}

/**
 * Fait apparaître son contenu (fondu + léger glissement vers le haut)
 * lorsqu'il entre dans le viewport. Désactivé si l'utilisateur préfère
 * réduire les animations (géré en CSS, voir `.reveal` dans globals.css).
 *
 * Le fondu s'applique aux enfants directs : une carte "glass" doit donc être
 * un enfant direct, jamais imbriquée plus profondément (ni le Reveal lui-même).
 */
export default function Reveal({ children, delay = 0, className, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Apparition : dès que l'élément dépasse le bas de l'écran de 10 %.
    // threshold 0 : un bloc plus haut que l'écran (ex. un article) doit aussi apparaître
    const showObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )
    // Réinitialisation : seulement une fois l'élément totalement sorti de l'écran,
    // pour rejouer l'animation au prochain passage sans le masquer sous les yeux.
    const hideObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setVisible(false)
    })
    showObserver.observe(el)
    hideObserver.observe(el)
    return () => {
      showObserver.disconnect()
      hideObserver.disconnect()
    }
  }, [])

  // Les balises acceptées partagent l'API de HTMLElement : on type le rendu comme un div.
  const Component = Tag as 'div'

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      data-visible={visible}
      className={`reveal ${className ?? ''}`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Component>
  )
}
