import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/navigation'
import Reveal from '@/components/ui/Reveal'
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
    <div className="max-w-[760px] mx-auto w-full px-[clamp(20px,4vw,40px)] py-16">
      {/* Back link */}
      <Reveal>
        <Link href="/#blog" className="btn btn-ghost -ml-3.5">
          {t('back')}
        </Link>
      </Reveal>

      <Reveal delay={80}>
        {/* Meta info */}
        <p className="meta mt-10 mb-[18px]">
          <time dateTime={meta.date}>
            {new Date(meta.date).toLocaleDateString(dateFormatLocale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </p>

        <h1 className="m-0 text-[36px] sm:text-[52px] font-medium leading-[1.06] tracking-display text-fg [text-wrap:balance]">
          {meta.title}
        </h1>

        <p className="text-lg sm:text-xl leading-[1.55] text-fg-secondary my-6">{meta.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pb-8 border-b border-line">
          {meta.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </Reveal>

      {/* MDX Content */}
      <Reveal delay={160}>
        <article className="prose prose-invert prose-lg max-w-none mt-10">
          {mdxContent}
        </article>
      </Reveal>
    </div>
  )
}
