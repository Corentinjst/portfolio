import { useTranslations } from 'next-intl'
import ExperienceItem from '@/components/about/ExperienceItem'
import type { Experience } from '@/components/about/ExperienceItem'
import SectionHeader from '@/components/ui/SectionHeader'

export default function ParcoursSection() {
  const t = useTranslations('Parcours')
  const experiences = t.raw('experiences') as Experience[]

  return (
    <section id="parcours" className="max-w-container mx-auto w-full px-[clamp(20px,4vw,40px)] py-20">
      <SectionHeader
        index="01"
        eyebrow={t('sectionLabel')}
        title={t('sectionTitle')}
        description={t('helperText')}
      />
      <div className="mt-12">
        {experiences.map((exp, i) => (
          <ExperienceItem
            key={`${exp.title}-${exp.period}`}
            experience={exp}
            current={i === 0 && !exp.isEducation}
            revealDelay={Math.min(i, 3) * 60}
          />
        ))}
      </div>
    </section>
  )
}
