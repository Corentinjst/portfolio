import { redirect } from '@/navigation'

interface Props {
  params: { locale: string; slug: string }
}

export default function ProjectDetailPage({ params: { locale } }: Props) {
  redirect({ href: '/#projets', locale })
}
