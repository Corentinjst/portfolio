import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, type Locale } from './routing'

export { locales, defaultLocale }
export type { Locale }

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale: Locale =
    requested && (locales as readonly string[]).includes(requested)
      ? (requested as Locale)
      : defaultLocale

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
