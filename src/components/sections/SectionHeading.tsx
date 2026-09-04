interface SectionHeadingProps {
  eyebrow: string
  title: string
  dark?: boolean
  align?: 'center' | 'left'
}

export default function SectionHeading({ eyebrow, title, dark, align = 'center' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col ${alignClass} gap-3`}>
      <p
        className={`font-script text-[16px] italic ${dark ? 'text-sage-light' : 'text-sage'}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-[clamp(24px,5vw,32px)] font-semibold ${dark ? 'text-ivory' : 'text-ink'}`}
      >
        {title}
      </h2>
      <div className={`h-px w-10 ${dark ? 'bg-sage-light/50' : 'bg-sage-light/70'}`} />
    </div>
  )
}
