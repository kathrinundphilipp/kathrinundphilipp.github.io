import SectionHeading from './SectionHeading'

const milestones = [
  {
    label: 'Der erste Blick',
    text: 'Irgendwo zwischen Zufall und Schicksal haben wir uns gefunden — und wussten beide ziemlich schnell, dass da etwas Besonderes beginnt.',
  },
  {
    label: 'Der Antrag',
    text: 'An einem Tag, den wir nie vergessen werden, wurde aus „wir zwei" ein „für immer". Die Frage war leise, das Ja unüberhörbar.',
  },
  {
    label: 'Der große Tag',
    text: 'Am 25. September 2027 feiern wir genau diese Geschichte — mit den Menschen, die uns auf dem Weg begleitet haben.',
  },
]

export default function OurStory() {
  return (
    <section className="bg-ivory px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-14">
        <SectionHeading eyebrow="Wie alles begann" title="Unsere Geschichte" />

        <div className="flex w-full flex-col gap-12">
          {milestones.map((m, i) => (
            <div key={m.label} className="flex flex-col items-center gap-3 text-center">
              <span className="font-sans text-[11px] font-medium tracking-[0.3em] text-sage-soft uppercase">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-[22px] text-ink">{m.label}</h3>
              <p className="max-w-[42ch] font-sans text-[15px] leading-relaxed text-ink/70">
                {m.text}
              </p>
              {i < milestones.length - 1 && (
                <div className="mt-6 h-10 w-px bg-sage-light/50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
