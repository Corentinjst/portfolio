import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import '../globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AuroraBackground from '@/components/ui/AuroraBackground'
import { locales, type Locale } from '@/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' })

  return {
    metadataBase: new URL('https://corentin-juste.dev'),
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    openGraph: {
      type: 'website',
      locale: t('ogLocale'),
      siteName: t('siteName'),
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as Locale)) notFound()
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      data-theme="clarity"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
    >
      <body className="relative isolate font-sans antialiased min-h-screen flex flex-col">
        <noscript>
          <style>{'.reveal,.reveal>*{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <AuroraBackground />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
