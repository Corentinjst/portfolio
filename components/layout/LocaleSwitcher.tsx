'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { usePathname, useRouter, locales } from '@/navigation'

type AppLocale = (typeof locales)[number]

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchTo(nextLocale: AppLocale) {
    if (nextLocale === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="glass inline-flex items-center gap-0.5 p-[3px] rounded-full shadow-none"
    >
      {locales.map((loc) => {
        const isActive = loc === locale
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-pressed={isActive}
            className={`h-[22px] px-3 rounded-full font-mono text-xs font-medium leading-none tracking-[.06em] transition-all duration-200 ease-ds-out ${
              isActive
                ? 'bg-[var(--fog-50)] text-[var(--ink-950)]'
                : 'text-fg-muted hover:text-fg'
            }`}
          >
            {t(loc)}
          </button>
        )
      })}
    </div>
  )
}
