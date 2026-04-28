'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const t = useTranslations('ProjectCard')
  const cardContent = (
    <>
      {/* Cover image */}
      {project.cover_image && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-surface border border-surface-border text-accent font-medium"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-surface border border-surface-border text-slate-400">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-slate-100 text-lg leading-snug group-hover:text-accent transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-surface-border">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors"
              aria-label={t('githubAriaLabel')}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              {t('viewGithub')}
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors"
              aria-label={t('demoAriaLabel')}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              {t('viewDemo')}
            </a>
          )}
          <span className="ml-auto text-xs text-accent group-hover:text-accent-light transition-colors font-medium">
            {t('viewDetails')}
          </span>
        </div>
      </div>
    </>
  )

  if (onClick) {
    return (
      <article
        onClick={onClick}
        className="group flex flex-col bg-surface-elevated border border-surface-border rounded-xl overflow-hidden hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer"
      >
        {cardContent}
      </article>
    )
  }

  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <article className="group flex flex-col bg-surface-elevated border border-surface-border rounded-xl overflow-hidden hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer">
        {cardContent}
      </article>
    </Link>
  )
}
