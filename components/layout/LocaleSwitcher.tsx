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
      className="inline-flex items-center rounded-md border border-surface-border bg-surface-elevated text-xs font-semibold overflow-hidden"
    >
      {locales.map((loc, index) => {
        const isActive = loc === locale
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-pressed={isActive}
            className={`px-2.5 py-1 transition-colors ${
              isActive
                ? 'bg-accent text-white'
                : 'text-slate-400 hover:text-slate-100'
            } ${index === 0 ? '' : 'border-l border-surface-border'}`}
          >
            {t(loc)}
          </button>
        )
      })}
    </div>
  )
}
