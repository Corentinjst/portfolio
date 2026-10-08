import { useTranslations } from 'next-intl'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'

export default function Footer() {
  const t = useTranslations('Footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="max-w-container mx-auto w-full px-[clamp(20px,4vw,40px)] pt-10 pb-12 mt-8">
      <Reveal>
        <div className="glass rounded-ds-xl px-6 py-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="font-mono text-xs text-fg-muted">
            {t('copyright', { year: currentYear })}
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Corentinjst"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label={t('githubAriaLabel')}
              title={t('githubAriaLabel')}
            >
              <Icon name="github" size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/corentin-juste/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label={t('linkedinAriaLabel')}
              title={t('linkedinAriaLabel')}
            >
              <Icon name="linkedin" size={18} />
            </a>

            <a
              href="mailto:corentinjuste92@gmail.com"
              className="icon-btn"
              aria-label={t('emailAriaLabel')}
              title={t('emailAriaLabel')}
            >
              <Icon name="mail" size={18} />
            </a>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
