'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import Icon from '@/components/ui/Icon'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

const cardClassName =
  'group glass glass-interactive flex flex-col h-full p-2 rounded-ds-xl text-fg cursor-pointer glass-lift'

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const t = useTranslations('ProjectCard')

  const cardContent = (
    <>
      {/* Cover image */}
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-[calc(var(--radius-xl)-8px)] border border-line"
        style={{ background: 'linear-gradient(135deg, var(--ink-800), var(--ink-900))' }}
      >
        {project.cover_image && (
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[520ms] ease-ds-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-2 px-3.5 pt-[18px] pb-2.5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-1">
          {project.tags.map((tag) => (
            <span key={tag} className="tag tag-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="m-0 text-xl font-medium leading-[1.25] tracking-heading [text-wrap:balance]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="m-0 flex-1 text-sm leading-[1.55] text-fg-muted [text-wrap:pretty] line-clamp-3">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-4 mt-2.5">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-[13px] font-medium text-fg-secondary hover:text-fg transition-colors"
              aria-label={t('githubAriaLabel')}
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="github" size={15} />
              {t('viewGithub')}
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-[13px] font-medium text-fg-secondary hover:text-fg transition-colors"
              aria-label={t('demoAriaLabel')}
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="external-link" size={15} />
              {t('viewDemo')}
            </a>
          )}
          {onClick ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
              className="ml-auto text-[13px] font-medium text-fg group-hover:text-accent transition-colors"
            >
              {t('viewDetails')}
            </button>
          ) : (
            <span className="ml-auto text-[13px] font-medium text-fg group-hover:text-accent transition-colors">
              {t('viewDetails')}
            </span>
          )}
        </div>
      </div>
    </>
  )

  if (onClick) {
    return (
      <article onClick={onClick} className={cardClassName}>
        {cardContent}
      </article>
    )
  }

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full hover:text-fg">
      <article className={cardClassName}>{cardContent}</article>
    </Link>
  )
}
