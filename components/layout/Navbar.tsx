'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/navigation'
import LocaleSwitcher from './LocaleSwitcher'

export default function Navbar() {
  const t = useTranslations('Navbar')
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const navLinks: { href: '/' | '/#parcours' | '/#blog' | '/#projets'; label: string }[] = [
    { href: '/', label: t('home') },
    { href: '/#parcours', label: t('parcours') },
    { href: '/#blog', label: t('blog') },
    { href: '/#projets', label: t('projects') },
  ]

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
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-surface-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleClick(e, '/')}
          className="font-heading font-bold text-lg text-slate-100 hover:text-accent transition-colors"
        >
          Corentin<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-sm font-medium transition-colors hover:text-accent text-slate-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <LocaleSwitcher />
        </div>

        {/* Mobile hamburger */}
        <div className="sm:hidden flex items-center gap-2">
          <LocaleSwitcher />
          <button
            className="text-slate-400 hover:text-slate-100 transition-colors p-2"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={t('toggleMenu')}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-surface-border bg-surface">
          <ul className="flex flex-col px-4 py-3 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    setMenuOpen(false)
                    handleClick(e, link.href)
                  }}
                  className="block text-sm font-medium transition-colors hover:text-accent text-slate-300"
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
