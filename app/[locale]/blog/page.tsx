import { redirect } from '@/navigation'

interface Props {
  params: { locale: string }
}

export default function BlogPage({ params: { locale } }: Props) {
  redirect({ href: '/#blog', locale })
}
