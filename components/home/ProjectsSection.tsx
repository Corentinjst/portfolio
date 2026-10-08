'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectModal from '@/components/modals/ProjectModal'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import type { Project } from '@/types'

interface ProjectsSectionProps {
  projects: Array<{
    meta: Project
    mdxContent: React.ReactNode
  }>
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations('ProjectsSection')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)

  const selected = projects.find((p) => p.meta.slug === selectedSlug)

  return (
    <section id="projets" className="max-w-container mx-auto w-full px-[clamp(20px,4vw,40px)] py-20">
      <SectionHeader
        index="03"
        eyebrow={t('sectionLabel')}
        title={t('sectionTitle')}
      />

      {/* Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(({ meta }, i) => (
          <Reveal key={meta.slug} delay={(i % 3) * 90} className="h-full">
            <ProjectCard project={meta} onClick={() => setSelectedSlug(meta.slug)} />
          </Reveal>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal
          project={selected.meta}
          mdxContent={selected.mdxContent}
          open={true}
          onClose={() => setSelectedSlug(null)}
        />
      )}
    </section>
  )
}
