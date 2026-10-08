import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import Icon from '@/components/ui/Icon'
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
    <Link
      href={`/blog/${post.slug}`}
      className="group glass glass-interactive grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-4 md:gap-8 items-start px-6 py-6 md:px-8 rounded-ds-lg text-left text-fg hover:text-fg"
    >
      <div className="flex flex-col gap-2.5 min-w-0">
        {/* Date */}
        <time dateTime={post.date} className="meta">
          {formattedDate}
        </time>

        {/* Title */}
        <h3 className="m-0 text-[22px] font-medium leading-[1.25] tracking-heading [text-wrap:balance]">
          {post.title}
        </h3>

        {/* Description */}
        <p className="m-0 text-[15px] leading-[1.55] text-fg-muted [text-wrap:pretty]">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {post.tags.map((tag) => (
            <span key={tag} className="tag tag-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA (mobile) */}
        <span className="md:hidden mt-1 text-[13px] font-medium text-fg-secondary">{t('readArticle')}</span>
      </div>

      {/* CTA (desktop) */}
      <span
        className="hidden md:grid w-[42px] h-[42px] place-items-center rounded-full border border-line text-fg transition-all duration-[240ms] ease-ds-out group-hover:-rotate-45 group-hover:bg-accent group-hover:border-accent group-hover:text-[var(--text-on-accent)]"
        title={t('readArticle')}
      >
        <Icon name="arrow-right" size={18} />
        <span className="sr-only">{t('readArticle')}</span>
      </span>
    </Link>
  )
}
