'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export interface Experience {
  period: string
  title: string
  company: string
  preview: string
  role: string
  responsibilities: string[]
  accomplishments: string[]
  skills: string[]
  isEducation?: boolean
}

interface ExperienceItemProps {
  experience: Experience
  isLast?: boolean
}

export default function ExperienceItem({ experience, isLast = false }: ExperienceItemProps) {
  const t = useTranslations('ExperienceItem')
  const [open, setOpen] = useState(false)

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center flex-shrink-0">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`w-3 h-3 rounded-full mt-1.5 transition-colors flex-shrink-0 ${
            experience.isEducation
              ? 'bg-surface-border hover:bg-slate-400'
              : 'bg-accent hover:bg-accent-light'
          }`}
          aria-label={open ? t('collapse') : t('expand')}
        />
        {!isLast && <div className="w-px flex-1 bg-surface-border mt-2" />}
      </div>

      {/* Content */}
      <div className={`${isLast ? '' : 'pb-6'} flex-1 min-w-0`}>
        {/* Header — always visible, clickable */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full text-left group"
          aria-expanded={open}
        >
          <p className="text-xs text-slate-500 mb-1">{experience.period}</p>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-semibold text-slate-100 group-hover:text-accent transition-colors">
                {experience.title}
              </h3>
              <p className="text-base text-accent">{experience.company}</p>
            </div>
            {/* Chevron */}
            <svg
              className={`h-4 w-4 text-slate-500 group-hover:text-accent transition-all flex-shrink-0 mt-1 ${
                open ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className="text-base text-slate-400 mt-1.5 leading-relaxed">{experience.preview}</p>
        </button>

        {/* Expandable detail */}
        {open && (
          <div className="mt-5 bg-surface-elevated border border-surface-border rounded-xl p-5 space-y-5">

            {/* Aperçu du rôle */}
            <div>
              <h4 className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">
                {t('roleOverview')}
              </h4>
              <p className="text-base text-slate-300 leading-relaxed">{experience.role}</p>
            </div>

            {/* Responsabilités */}
            {experience.responsibilities.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">
                  {t('responsibilities')}
                </h4>
                <ul className="space-y-1.5">
                  {experience.responsibilities.map((item, i) => (
                    <li key={i} className="flex gap-2 text-base text-slate-300 leading-relaxed">
                      <span className="text-accent mt-1 flex-shrink-0">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accomplissements */}
            {experience.accomplishments.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">
                  {t('accomplishments')}
                </h4>
                <ul className="space-y-1.5">
                  {experience.accomplishments.map((item, i) => (
                    <li key={i} className="flex gap-2 text-base text-slate-300 leading-relaxed">
                      <span className="text-accent mt-1 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {experience.skills.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">
                  {t('skills')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-full bg-surface border border-surface-border text-accent font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
