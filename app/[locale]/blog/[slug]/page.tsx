import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/navigation'
import { getAllBlogPosts, getBlogPostBySlug, type ContentLocale } from '@/lib/mdx'
import { locales } from '@/i18n'

interface Props {
  params: { locale: string; slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params
  try {
    const { meta } = await getBlogPostBySlug(slug, locale as ContentLocale)
    return {
      title: `${meta.title} — Corentin Juste`,
      description: meta.description,
    }
  } catch {
    const t = await getTranslations({ locale, namespace: 'BlogPost' })
    return { title: t('notFound') }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'BlogPost' })

  let meta, mdxContent
  try {
    const result = await getBlogPostBySlug(slug, locale as ContentLocale)
    meta = result.meta
    mdxContent = result.mdxContent
  } catch {
    notFound()
  }

  const dateFormatLocale = locale === 'en' ? 'en-US' : 'fr-FR'

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Back link */}
      <Link
        href="/#blog"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-accent transition-colors mb-10"
      >
        {t('back')}
      </Link>

      {/* Meta info */}
      <div className="flex items-center gap-3 mb-4">
        <time
          dateTime={meta.date}
          className="text-sm text-slate-500"
        >
          {new Date(meta.date).toLocaleDateString(dateFormatLocale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span className="text-slate-600">·</span>
        <span className="text-sm text-slate-500">
          {t('readingTime', { minutes: meta.readingTime })}
        </span>
      </div>

      <h1 className="font-heading font-bold text-3xl sm:text-4xl text-slate-100 mb-4 leading-tight">
        {meta.title}
      </h1>

      <p className="text-lg text-slate-400 mb-6">{meta.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {meta.tags.map((tag) => (
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
    </main>
  )
}
