import { useTranslations } from 'next-intl'
import BlogCard from '@/components/blog/BlogCard'
import type { BlogPost } from '@/types'

interface BlogSectionProps {
  posts: BlogPost[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const t = useTranslations('BlogSection')

  return (
    <section id="blog" className="scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-surface-border">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
          />
        ))}
      </div>
    </section>
  )
}
