'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/navigation'
import LocaleSwitcher from './LocaleSwitcher'
import Icon from '@/components/ui/Icon'

type NavHref = '/' | '/#parcours' | '/#blog' | '/#projets'

const SECTION_IDS = ['hero', 'parcours', 'blog', 'projets'] as const

export default function Navbar() {
  const t = useTranslations('Navbar')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('hero')
  const pathname = usePathname()
  const isHome = pathname === '/'

  const navLinks: { href: NavHref; id: (typeof SECTION_IDS)[number]; label: string }[] = [
    { href: '/', id: 'hero', label: t('home') },
    { href: '/#parcours', id: 'parcours', label: t('parcours') },
    { href: '/#blog', id: 'blog', label: t('blog') },
    { href: '/#projets', id: 'projets', label: t('projects') },
  ]

  // Surligne la section actuellement visible (page d'accueil uniquement)
  useEffect(() => {
    if (!isHome) return
    function onScroll() {
      let current: string = 'hero'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id
      }
      setActiveId(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const currentId = isHome ? activeId : pathname.startsWith('/blog') ? 'blog' : null

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isHome) return // let normal navigation happen

    e.preventDefault()
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const id = href.replace('/#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-4 z-50 w-full max-w-container mx-auto px-[clamp(20px,4vw,40px)] pt-4">
      <nav
        className="flex items-center gap-6 h-[60px] pl-[22px] pr-2 rounded-full border border-line"
        style={{
          background: 'var(--nav-fill, rgba(10,13,18,.45))',
          boxShadow: 'var(--shadow-glass)',
          backdropFilter: 'var(--backdrop-glass-strong)',
          WebkitBackdropFilter: 'var(--backdrop-glass-strong)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleClick(e, '/')}
          className="text-lg font-semibold tracking-[-0.04em] text-fg hover:text-fg"
        >
          Corentin<span className="text-accent">.</span>
        </Link>

        <div className="flex-1" />

        {/* Desktop nav */}
        <ul className="hidden sm:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = currentId === link.id
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block px-3.5 py-[9px] rounded-full text-sm font-medium leading-none transition-all duration-150 ease-ds-out ${
                    isActive
                      ? 'text-fg bg-[var(--glass-fill-strong)] shadow-[inset_0_1px_0_var(--glass-highlight)]'
                      : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <LocaleSwitcher />

        {/* Mobile hamburger */}
        <button
          className="sm:hidden icon-btn icon-btn-sm"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={t('toggleMenu')}
          aria-expanded={menuOpen}
        >
          <Icon name={menuOpen ? 'x' : 'menu'} size={16} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="sm:hidden mt-2 rounded-ds-lg border border-line"
          style={{
            background: 'var(--dialog-fill, rgba(15,19,26,.62))',
            boxShadow: 'var(--shadow-glass-lg)',
            backdropFilter: 'var(--backdrop-glass-strong)',
            WebkitBackdropFilter: 'var(--backdrop-glass-strong)',
          }}
        >
          <ul className="flex flex-col p-2 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    setMenuOpen(false)
                    handleClick(e, link.href)
                  }}
                  className={`block px-4 py-3 rounded-ds-md text-sm font-medium transition-colors ${
                    currentId === link.id
                      ? 'text-fg bg-[var(--glass-fill-strong)]'
                      : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
