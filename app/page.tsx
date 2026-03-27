import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import ParcoursSection from '@/components/home/ParcoursSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import BlogSection from '@/components/home/BlogSection'
import { getAllProjects, getProjectBySlug, getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Corentin Juste - Data Scientist',
  description:
    'Portfolio de Corentin Juste',
}

export default async function HomePage() {
  const allProjects = await getAllProjects()
  const projectsWithContent = await Promise.all(
    allProjects.map(async (p) => {
      const { meta, mdxContent } = await getProjectBySlug(p.slug)
      return { meta, mdxContent }
    })
  )

  const allPosts = await getAllBlogPosts()
  const postsWithContent = await Promise.all(
    allPosts.map(async (p) => {
      const { meta, mdxContent } = await getBlogPostBySlug(p.slug)
      return { meta, mdxContent }
    })
  )

  return (
    <>
      <Hero />
      <ParcoursSection />
      <ProjectsSection projects={projectsWithContent} />
      <BlogSection posts={postsWithContent} />
    </>
  )
}
