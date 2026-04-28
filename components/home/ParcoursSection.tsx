import { useTranslations } from 'next-intl'
import ExperienceItem from '@/components/about/ExperienceItem'
import type { Experience } from '@/components/about/ExperienceItem'

export default function ParcoursSection() {
  const t = useTranslations('Parcours')
  const experiences = t.raw('experiences') as Experience[]

  return (
    <section id="parcours" className="scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-surface-border">
      <div className="max-w-4xl mx-auto">
        <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
          {t('sectionLabel')}
        </p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-100 mb-2">
          {t('sectionTitle')}
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          {t('helperText')}
        </p>
        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <ExperienceItem
              key={`${exp.title}-${exp.period}`}
              experience={exp}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
