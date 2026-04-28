import { redirect } from '@/navigation'

interface Props {
  params: { locale: string }
}

export default function AboutPage({ params: { locale } }: Props) {
  redirect({ href: '/#parcours', locale })
}
