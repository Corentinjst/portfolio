'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectModal from '@/components/modals/ProjectModal'
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
    <section id="projets" className="scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-surface-border">
      {/* Header */}
      <div className="mb-10">
        <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
          {t('sectionLabel')}
        </p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-100 mb-4">
          {t('sectionTitle')}
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          {t('sectionDescription')}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(({ meta }) => (
          <ProjectCard
            key={meta.slug}
            project={meta}
            onClick={() => setSelectedSlug(meta.slug)}
          />
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
