'use client'

import ContentModal from './ContentModal'
import type { BlogPost } from '@/types'

interface BlogModalProps {
  post: BlogPost
  mdxContent: React.ReactNode
  open: boolean
  onClose: () => void
}

export default function BlogModal({ post, mdxContent, open, onClose }: BlogModalProps) {
  return (
    <ContentModal open={open} onClose={onClose}>
      {/* Meta info */}
      <div className="flex items-center gap-3 mb-4">
        <time
          dateTime={post.date}
          className="text-sm text-slate-500"
        >
          {new Date(post.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span className="text-slate-600">·</span>
        <span className="text-sm text-slate-500">
          {post.readingTime} min de lecture
        </span>
      </div>

      <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-100 mb-4 leading-tight">
        {post.title}
      </h2>

      <p className="text-lg text-slate-400 mb-6">{post.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs rounded-full bg-surface border border-surface-border text-accent font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-surface-border mb-8" />

      {/* MDX Content */}
      <article className="prose prose-invert max-w-none">
        {mdxContent}
      </article>
    </ContentModal>
  )
}
