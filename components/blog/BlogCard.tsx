import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import Icon from '@/components/ui/Icon'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
}

const MAX_TAGS = 3

export default function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations('BlogCard')
  const locale = useLocale()
  const dateFormatLocale = locale === 'en' ? 'en-US' : 'fr-FR'

  const formattedDate = new Date(post.date).toLocaleDateString(dateFormatLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const shownTags = post.tags.slice(0, MAX_TAGS)
  const extraTags = post.tags.length - shownTags.length

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group glass glass-interactive grid grid-cols-1 md:grid-cols-[minmax(0,170px)_minmax(0,1fr)_auto] gap-4 md:gap-8 items-start px-6 py-6 md:px-8 rounded-ds-lg text-fg hover:text-fg"
    >
      {/* Meta: date + reading time */}
      <div className="meta md:pt-1">
        <time dateTime={post.date}>{formattedDate}</time>
        <span className="md:hidden"> · </span>
        <br className="hidden md:block" />
        {t('readingTime', { minutes: post.readingTime })}
      </div>

      <div className="flex flex-col gap-2.5 min-w-0">
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
          {shownTags.map((tag) => (
            <span key={tag} className="tag tag-sm">
              {tag}
            </span>
          ))}
          {extraTags > 0 && <span className="tag tag-sm tag-solid">+{extraTags}</span>}
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
