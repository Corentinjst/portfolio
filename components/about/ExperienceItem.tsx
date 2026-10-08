'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'

export interface Experience {
  period: string
  title: string
  company: string
  /** Chemin du logo dans /public */
  logo?: string
  /** Type de contrat (stage, alternance...) */
  contract: string
  location?: string
  preview: string
  role: string
  responsibilities: string[]
  accomplishments: string[]
  skills: string[]
  isEducation?: boolean
}

interface ExperienceItemProps {
  experience: Experience
  /** Poste actuel : point et période mis en avant */
  current?: boolean
  /** Délai d'apparition au scroll (ms) */
  revealDelay?: number
}

function DetailHeading({ children }: { children: React.ReactNode }) {
  return <h4 className="eyebrow !text-[11px] mb-2.5">{children}</h4>
}

export default function ExperienceItem({ experience, current = false, revealDelay = 0 }: ExperienceItemProps) {
  const t = useTranslations('ExperienceItem')
  const [open, setOpen] = useState(false)
  const detailsId = useId()

  return (
    // Le Reveal porte la grille : la carte "glass" en est un enfant direct (voir Reveal)
    <Reveal
      delay={revealDelay}
      className="grid grid-cols-[24px_minmax(0,1fr)] md:grid-cols-[minmax(0,180px)_24px_minmax(0,1fr)] gap-x-3 md:gap-x-4"
    >
      {/* Period (desktop) */}
      <div className={`hidden md:block meta pt-6 ${current ? '!text-accent' : ''}`}>
        {experience.period}
      </div>

      {/* Timeline */}
      <div className="relative flex justify-center">
        <div
          className="absolute top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(var(--border-strong), transparent)' }}
        />
        <div
          className="relative mt-[27px] w-[11px] h-[11px] rounded-full border-2 border-[var(--bg-page)]"
          style={{
            background: current ? 'var(--accent)' : 'var(--ink-700)',
            boxShadow: current
              ? '0 0 0 4px rgba(255,255,255,.18), 0 0 16px var(--accent)'
              : '0 0 0 1px var(--border-strong)',
          }}
        />
      </div>

      {/* Card */}
      <div
        className={`glass glass-interactive mb-4 rounded-ds-lg ${
          open ? '!bg-[var(--glass-fill-hover)] !border-line-strong' : ''
        }`}
      >
        {/* Header — always visible, clickable */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full text-left px-5 py-5 sm:px-6"
          aria-expanded={open}
          aria-controls={detailsId}
        >
          <p className={`md:hidden meta mb-2 ${current ? '!text-accent' : ''}`}>{experience.period}</p>
          <div className="flex items-start gap-3 sm:gap-4">
            {experience.logo && (
              <Image
                src={experience.logo}
                alt=""
                width={48}
                height={48}
                className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-ds-md border border-line object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="m-0 text-xl sm:text-2xl font-medium leading-[1.2] tracking-heading text-fg">
                {experience.title}
                <span className="font-normal text-accent">
                  <span aria-hidden="true" className="text-fg-muted">
                    {' · '}
                  </span>
                  <span className="sr-only">, </span>
                  <span className="whitespace-nowrap">{experience.company}</span>
                </span>
              </h3>
              <p className="mt-1.5 text-sm text-fg-muted">
                {experience.contract}
                {experience.location && ` · ${experience.location}`}
              </p>
            </div>
            <span
              className={`mt-1 transition-transform duration-[240ms] ease-ds-out ${
                open ? 'rotate-45 text-accent' : 'text-fg-muted'
              }`}
            >
              <Icon name="plus" size={18} />
              <span className="sr-only">{open ? t('collapse') : t('expand')}</span>
            </span>
          </div>
          <p className="mt-3.5 text-[15px] leading-[1.6] text-fg-secondary [text-wrap:pretty]">
            {experience.preview}
          </p>
        </button>

        {/* Expandable detail */}
        {open && (
          <div id={detailsId} className="mx-5 sm:mx-6 mb-5 pt-4 border-t border-line space-y-5">
            {/* Aperçu du rôle */}
            <div>
              <DetailHeading>{t('roleOverview')}</DetailHeading>
              <p className="text-[15px] leading-[1.6] text-fg-secondary">{experience.role}</p>
            </div>

            {/* Responsabilités */}
            {experience.responsibilities.length > 0 && (
              <div>
                <DetailHeading>{t('responsibilities')}</DetailHeading>
                <ul className="flex flex-col gap-2">
                  {experience.responsibilities.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-[1.55] text-fg-secondary">
                      <span className="text-accent font-mono text-xs leading-[1.8] flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accomplissements */}
            {experience.accomplishments.length > 0 && (
              <div>
                <DetailHeading>{t('accomplishments')}</DetailHeading>
                <ul className="flex flex-col gap-2">
                  {experience.accomplishments.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-[1.55] text-fg-secondary">
                      <span className="text-accent font-mono text-xs leading-[1.8] flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {experience.skills.length > 0 && (
              <div>
                <DetailHeading>{t('skills')}</DetailHeading>
                <div className="flex flex-wrap gap-1.5">
                  {experience.skills.map((skill) => (
                    <span key={skill} className="tag tag-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Reveal>
  )
}
