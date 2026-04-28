import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import type { Project, BlogPost } from '@/types'
import type { ReactElement } from 'react'

const projectsDir = path.join(process.cwd(), 'content/projects')
const blogDir = path.join(process.cwd(), 'content/blog')

const FALLBACK_LOCALE = 'fr'

export type ContentLocale = 'fr' | 'en'

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
}

function resolveMdxPath(dir: string, slug: string, locale: string): string | null {
  const localized = path.join(dir, slug, `${locale}.mdx`)
  if (fs.existsSync(localized)) return localized
  const fallback = path.join(dir, slug, `${FALLBACK_LOCALE}.mdx`)
  if (fs.existsSync(fallback)) return fallback
  return null
}

function listSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

// --- Projects ---

export async function getAllProjects(locale: ContentLocale = FALLBACK_LOCALE): Promise<Project[]> {
  const slugs = listSlugs(projectsDir)

  const projects: Project[] = []
  for (const slug of slugs) {
    const filePath = resolveMdxPath(projectsDir, slug, locale)
    if (!filePath) continue
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    projects.push({
      slug,
      content,
      title: typeof data.title === 'string' ? data.title : '',
      date: typeof data.date === 'string' ? data.date : '',
      description: typeof data.description === 'string' ? data.description : '',
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      github_url: typeof data.github_url === 'string' ? data.github_url : undefined,
      demo_url: typeof data.demo_url === 'string' ? data.demo_url : undefined,
      cover_image: typeof data.cover_image === 'string' ? data.cover_image : undefined,
      featured: typeof data.featured === 'boolean' ? data.featured : undefined,
    })
  }

  return projects.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getProjectBySlug(
  slug: string,
  locale: ContentLocale = FALLBACK_LOCALE,
): Promise<{
  meta: Project
  mdxContent: ReactElement
}> {
  const filePath = resolveMdxPath(projectsDir, slug, locale)
  if (!filePath) {
    throw new Error(`Project not found: ${slug}`)
  }
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const { content: mdxContent } = await compileMDX({
    source: content,
    ...mdxOptions,
  })

  const meta: Project = {
    slug,
    content,
    title: typeof data.title === 'string' ? data.title : '',
    date: typeof data.date === 'string' ? data.date : '',
    description: typeof data.description === 'string' ? data.description : '',
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    github_url: typeof data.github_url === 'string' ? data.github_url : undefined,
    demo_url: typeof data.demo_url === 'string' ? data.demo_url : undefined,
    cover_image: typeof data.cover_image === 'string' ? data.cover_image : undefined,
    featured: typeof data.featured === 'boolean' ? data.featured : undefined,
  }

  return { meta, mdxContent }
}

// --- Blog Posts ---

export async function getAllBlogPosts(locale: ContentLocale = FALLBACK_LOCALE): Promise<BlogPost[]> {
  const slugs = listSlugs(blogDir)

  const posts: BlogPost[] = []
  for (const slug of slugs) {
    const filePath = resolveMdxPath(blogDir, slug, locale)
    if (!filePath) continue
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    posts.push({
      slug,
      content,
      title: typeof data.title === 'string' ? data.title : '',
      date: typeof data.date === 'string' ? data.date : '',
      description: typeof data.description === 'string' ? data.description : '',
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      readingTime: calculateReadingTime(content),
    })
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getBlogPostBySlug(
  slug: string,
  locale: ContentLocale = FALLBACK_LOCALE,
): Promise<{
  meta: BlogPost
  mdxContent: ReactElement
}> {
  const filePath = resolveMdxPath(blogDir, slug, locale)
  if (!filePath) {
    throw new Error(`Blog post not found: ${slug}`)
  }
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const { content: mdxContent } = await compileMDX({
    source: content,
    ...mdxOptions,
  })

  const meta: BlogPost = {
    slug,
    content,
    title: typeof data.title === 'string' ? data.title : '',
    date: typeof data.date === 'string' ? data.date : '',
    description: typeof data.description === 'string' ? data.description : '',
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    readingTime: calculateReadingTime(content),
  }

  return { meta, mdxContent }
}
