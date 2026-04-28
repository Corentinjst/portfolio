import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations('BlogCard')
  const locale = useLocale()
  const dateFormatLocale = locale === 'en' ? 'en-US' : 'fr-FR'

  const formattedDate = new Date(post.date).toLocaleDateString(dateFormatLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <article className="group flex flex-col h-full bg-surface-elevated border border-surface-border rounded-xl p-5 hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer">
        {/* Meta: date + reading time */}
        <div className="flex items-center gap-3 mb-3">
          <time
            dateTime={post.date}
            className="text-xs text-slate-500"
          >
            {formattedDate}
          </time>
          <span className="text-slate-600 text-xs">·</span>
          <span className="text-xs text-slate-500">
            {t('readingTime', { minutes: post.readingTime })}
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
        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
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
          {t('readArticle')}
        </span>
      </article>
    </Link>
  )
}
