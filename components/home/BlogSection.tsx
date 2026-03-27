'use client'

import { useState } from 'react'
import BlogCard from '@/components/blog/BlogCard'
import BlogModal from '@/components/modals/BlogModal'
import type { BlogPost } from '@/types'

interface BlogSectionProps {
  posts: Array<{
    meta: BlogPost
    mdxContent: React.ReactNode
  }>
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)

  const selected = posts.find((p) => p.meta.slug === selectedSlug)

  return (
    <section id="blog" className="scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-surface-border">
      {/* Header */}
      <div className="mb-10">
        <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
          Blog
        </p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-100 mb-4">
          Articles
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Retours d&apos;expérience, tutoriels et réflexions sur la Data Science en production.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map(({ meta }) => (
          <BlogCard
            key={meta.slug}
            post={meta}
            onClick={() => setSelectedSlug(meta.slug)}
          />
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <BlogModal
          post={selected.meta}
          mdxContent={selected.mdxContent}
          open={true}
          onClose={() => setSelectedSlug(null)}
        />
      )}
    </section>
  )
}
