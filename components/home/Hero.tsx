import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Decorative grid dots */}
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, #334155 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Accent glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — text content */}
          <div className="flex-1 min-w-0">
            {/* Main heading */}
            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-slate-100 leading-tight mb-4">
              {t('title')}
            </h1>

            {/* Subtitle */}
            <p className="font-heading text-2xl sm:text-3xl text-slate-300 mb-6">
              {t('subtitlePrefix')}
              <span className="text-accent">{t('subtitleHighlight1')}</span>
              {t('subtitleConnector')}
              <span className="text-accent">{t('subtitleHighlight2')}</span>
            </p>

            {/* Bio */}
            <div className="space-y-3 text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
              <p>{t('bioParagraph1')}</p>
              <p>{t('bioParagraph2')}</p>
              <p>{t('bioParagraph3')}</p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/corentin-juste/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-sm"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                {t('ctaLinkedIn')}
              </a>
              <a
                href="https://github.com/Corentinjst"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-sm"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                {t('ctaGithub')}
              </a>
              <a
                href="mailto:corentinjuste92@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-sm"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {t('ctaContact')}
              </a>
              <a
                href="/CV_CorentinJUSTE.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-sm"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {t('ctaCv')}
              </a>
            </div>
          </div>

          {/* Right — photo */}
          <div className="flex-shrink-0 flex justify-center lg:justify-end">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-accent/30 scale-110" />
              <div className="absolute inset-0 rounded-full border border-accent/10 scale-125" />

              {/* Photo or placeholder */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-surface-border bg-surface-elevated">
                {/* Fallback initials (visible when no photo) */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <span className="font-heading font-bold text-5xl text-slate-500 select-none">
                    CJ
                  </span>
                </div>
                {/* Profile photo — add /public/images/profile.jpg to override */}
                <Image
                  src="/images/profile.jpeg"
                  alt="Corentin Juste"
                  fill
                  className="object-cover z-10"
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
