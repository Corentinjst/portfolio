import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
})

export const locales = routing.locales
export const defaultLocale = routing.defaultLocale
export type Locale = (typeof routing.locales)[number]
