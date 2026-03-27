export interface Project {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  github_url?: string
  demo_url?: string
  cover_image?: string
  featured?: boolean
  content: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: number
  content: string
}
