import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import ScrollCue from './ScrollCue'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <section
      id="hero"
      className="relative max-w-container mx-auto w-full px-[clamp(20px,4vw,40px)] min-h-[calc(100vh-120px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-12 items-center py-12 lg:pt-16 lg:pb-24"
    >
      {/* Left — text content */}
      <div className="order-2 lg:order-1 flex flex-col gap-6">
        {/* Main heading */}
        <Reveal>
          <h1 className="m-0 font-medium text-[clamp(48px,7vw,96px)] leading-[1.02] tracking-display text-fg">
            {t('title')}
            <span className="text-accent">.</span>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={80}>
          <p className="m-0 font-mono text-[13px] font-medium leading-snug tracking-eyebrow uppercase text-accent">
            {t('subtitlePrefix')}
            {t('subtitleHighlight1')}
            {t('subtitleConnector')}
            {t('subtitleHighlight2')}
          </p>
        </Reveal>

        {/* Bio */}
        <Reveal delay={160} className="space-y-3 max-w-[600px] text-[17px] sm:text-lg leading-[1.6] text-fg-secondary [text-wrap:pretty]">
          <p>{t('bioParagraph1')}</p>
          <p>{t('bioParagraph2')}</p>
          <p>{t('bioParagraph3')}</p>
        </Reveal>

        {/* CTA & social links */}
        <Reveal delay={240} className="flex flex-wrap items-center gap-2.5 mt-2">
          <a href="/CV_CorentinJUSTE.pdf" download className="btn btn-lg btn-primary">
            <Icon name="file-text" size={18} />
            {t('ctaCv')}
          </a>
          <a href="mailto:corentinjuste92@gmail.com" className="btn btn-lg btn-glass">
            <Icon name="mail" size={18} />
            {t('ctaContact')}
          </a>
          {/* Icônes en enfants directs du Reveal : le fondu ne doit pas couper leur backdrop-filter */}
          <a
            href="https://www.linkedin.com/in/corentin-juste/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('ctaLinkedIn')}
            title={t('ctaLinkedIn')}
            className="icon-btn icon-btn-lg sm:ml-1.5"
          >
            <Icon name="linkedin" size={22} />
          </a>
          <a
            href="https://github.com/Corentinjst"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('ctaGithub')}
            title={t('ctaGithub')}
            className="icon-btn icon-btn-lg"
          >
            <Icon name="github" size={22} />
          </a>
        </Reveal>
      </div>

      {/* Right — photo */}
      <Reveal delay={200} className="order-1 lg:order-2 w-full max-w-[300px] sm:max-w-[360px] lg:max-w-none mx-auto">
        <div className="glass-strong rounded-ds-xl p-2.5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-xl)-10px)] bg-[var(--ink-800)]">
            {/* Fallback initials (visible when no photo) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-medium text-fg-muted select-none">CJ</span>
            </div>
            <Image
              src="/images/profile.jpeg"
              alt="Corentin Juste"
              fill
              className="object-cover saturate-[.9]"
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 460px"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(11,14,19,.55))' }}
            />
          </div>
        </div>
      </Reveal>

      <ScrollCue targetId="parcours" label={t('scrollCue')} />
    </section>
  )
}
