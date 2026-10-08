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
      <p className="meta mb-4">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {' · '}
        {post.readingTime} min de lecture
      </p>

      <h2 className="m-0 mb-4 text-[26px] sm:text-[32px] font-medium leading-[1.15] tracking-heading [text-wrap:balance]">
        {post.title}
      </h2>

      <p className="text-base sm:text-lg leading-[1.55] text-fg-secondary mb-6">{post.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
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
