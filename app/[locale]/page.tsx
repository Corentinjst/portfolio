import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/home/Hero'
import ParcoursSection from '@/components/home/ParcoursSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import BlogSection from '@/components/home/BlogSection'
import { getAllProjects, getProjectBySlug, getAllBlogPosts, type ContentLocale } from '@/lib/mdx'

interface Props {
  params: { locale: string }
}

export default async function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const contentLocale = locale as ContentLocale

  const allProjects = await getAllProjects(contentLocale)
  const projectsWithContent = await Promise.all(
    allProjects.map(async (p) => {
      const { meta, mdxContent } = await getProjectBySlug(p.slug, contentLocale)
      return { meta, mdxContent }
    })
  )

  const allPosts = await getAllBlogPosts(contentLocale)

  return (
    <>
      <Hero />
      <ParcoursSection />
      <BlogSection posts={allPosts} />
      <ProjectsSection projects={projectsWithContent} />
    </>
  )
}
