'use client'

import ContentModal from './ContentModal'
import Icon from '@/components/ui/Icon'
import type { Project } from '@/types'

interface ProjectModalProps {
  project: Project
  mdxContent: React.ReactNode
  open: boolean
  onClose: () => void
}

export default function ProjectModal({ project, mdxContent, open, onClose }: ProjectModalProps) {
  return (
    <ContentModal open={open} onClose={onClose}>
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5 pr-12">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <h2 className="m-0 mb-4 text-[26px] sm:text-[32px] font-medium leading-[1.15] tracking-heading [text-wrap:balance]">
        {project.title}
      </h2>

      <p className="text-base sm:text-lg leading-[1.55] text-fg-secondary mb-4">{project.description}</p>

      {/* Date */}
      <p className="meta mb-6">
        <time dateTime={project.date}>
          {new Date(project.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </p>

      {/* Links */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass"
          >
            <Icon name="github" size={16} />
            Voir sur GitHub
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Icon name="external-link" size={16} />
            Voir la demo
          </a>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-line mb-8" />

      {/* MDX Content */}
      <article className="prose prose-invert max-w-none">
        {mdxContent}
      </article>
    </ContentModal>
  )
}
