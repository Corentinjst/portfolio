import { useTranslations } from 'next-intl'
import BlogCard from '@/components/blog/BlogCard'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import type { BlogPost } from '@/types'

interface BlogSectionProps {
  posts: BlogPost[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const t = useTranslations('BlogSection')

  return (
    <section id="blog" className="max-w-container mx-auto w-full px-[clamp(20px,4vw,40px)] py-20">
      <SectionHeader
        index="02"
        eyebrow={t('sectionLabel')}
        title={t('sectionTitle')}
        description={t('sectionDescription')}
      />

      {/* List */}
      <div className="mt-12 flex flex-col gap-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={Math.min(i, 3) * 70}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
