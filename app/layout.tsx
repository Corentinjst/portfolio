import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://corentin-juste.dev'),
  title: {
    default: 'Corentin Juste - Data Scientist',
    template: '%s | Corentin Juste',
  },
  description:
    'Portfolio de Corentin Juste',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Corentin Juste - Data Scientist',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${sora.variable} dark`}
    >
      <body className="bg-surface text-slate-100 font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
