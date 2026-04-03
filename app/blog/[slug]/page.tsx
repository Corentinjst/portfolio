import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const { meta } = await getBlogPostBySlug(slug)
    return {
      title: `${meta.title} — Corentin Juste`,
      description: meta.description,
    }
  } catch {
    return { title: 'Article introuvable' }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  let meta, mdxContent
  try {
    const result = await getBlogPostBySlug(slug)
    meta = result.meta
    mdxContent = result.mdxContent
  } catch {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Back link */}
      <Link
        href="/#blog"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-accent transition-colors mb-10"
      >
        ← Retour aux articles
      </Link>

      {/* Meta info */}
      <div className="flex items-center gap-3 mb-4">
        <time
          dateTime={meta.date}
          className="text-sm text-slate-500"
        >
          {new Date(meta.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span className="text-slate-600">·</span>
        <span className="text-sm text-slate-500">
          {meta.readingTime} min de lecture
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
