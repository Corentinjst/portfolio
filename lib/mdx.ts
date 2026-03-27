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

// --- Projects ---

export async function getAllProjects(): Promise<Project[]> {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))

  const projects = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(projectsDir, filename), 'utf-8')
    const { data, content } = matter(raw)

    return {
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
    } satisfies Project
  })

  return projects.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getProjectBySlug(slug: string): Promise<{
  meta: Project
  mdxContent: ReactElement
}> {
  const raw = fs.readFileSync(path.join(projectsDir, `${slug}.mdx`), 'utf-8')
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

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(blogDir, filename), 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug,
      content,
      title: typeof data.title === 'string' ? data.title : '',
      date: typeof data.date === 'string' ? data.date : '',
      description: typeof data.description === 'string' ? data.description : '',
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      readingTime: calculateReadingTime(content),
    } satisfies BlogPost
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getBlogPostBySlug(slug: string): Promise<{
  meta: BlogPost
  mdxContent: ReactElement
}> {
  const raw = fs.readFileSync(path.join(blogDir, `${slug}.mdx`), 'utf-8')
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
