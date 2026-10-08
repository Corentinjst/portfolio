import Reveal from './Reveal'

interface SectionHeaderProps {
  index: string
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeader({ index, eyebrow, title, description }: SectionHeaderProps) {
  return (
    <Reveal as="header" className="flex flex-col items-start gap-3.5">
      <span className="eyebrow">
        {index} / {eyebrow}
      </span>
      <h2 className="m-0 text-[40px] sm:text-[56px] leading-[1.05] font-medium tracking-display text-fg [text-wrap:balance]">
        {title}
      </h2>
      {description && (
        <p className="m-0 max-w-[560px] text-lg leading-[1.55] text-fg-muted [text-wrap:pretty]">
          {description}
        </p>
      )}
    </Reveal>
  )
}
