import { redirect } from '@/navigation'

interface Props {
  params: { locale: string }
}

export default function ProjectsPage({ params: { locale } }: Props) {
  redirect({ href: '/#projets', locale })
}
