'use client'

import Link from 'next/link'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
  onClick?: () => void
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogCard({ post, onClick }: BlogCardProps) {
  const cardContent = (
    <>
      {/* Meta: date + reading time */}
      <div className="flex items-center gap-3 mb-3">
        <time
          dateTime={post.date}
          className="text-xs text-slate-500"
        >
          {formatDate(post.date)}
        </time>
        <span className="text-slate-600 text-xs">·</span>
        <span className="text-xs text-slate-500">
          {post.readingTime} min de lecture
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-slate-100 text-lg leading-snug group-hover:text-accent transition-colors mb-2 line-clamp-2">
        {post.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1 mb-4">
        {post.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs rounded-full bg-surface border border-surface-border text-accent font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <span className="text-xs text-accent group-hover:text-accent-light transition-colors font-medium self-start">
        Lire l&apos;article →
      </span>
    </>
  )

  if (onClick) {
    return (
      <article
        onClick={onClick}
        className="group flex flex-col bg-surface-elevated border border-surface-border rounded-xl p-5 hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer"
      >
        {cardContent}
      </article>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="group flex flex-col bg-surface-elevated border border-surface-border rounded-xl p-5 hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer">
        {cardContent}
      </article>
    </Link>
  )
}
