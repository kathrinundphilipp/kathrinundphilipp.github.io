import SectionHeading from './SectionHeading'

export default function LocationSection() {
  return (
    <section className="bg-ivory px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-[560px] flex-col items-center gap-12">
        <SectionHeading eyebrow="Wo wir feiern" title="Location" />

        <div className="flex w-full flex-col items-center gap-8 sm:flex-row sm:items-stretch">
          <div className="aspect-[4/3] w-full flex-1 rounded-[2px] bg-[linear-gradient(155deg,var(--color-sage-soft),var(--color-sage-dark))] shadow-[0_25px_50px_-20px_rgba(50,43,32,0.4)]" />

          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center sm:items-start sm:text-left">
            <h3 className="font-serif text-[22px] text-ink">Der Ort wird bald gelüftet</h3>
            <p className="max-w-[34ch] font-sans text-[15px] leading-relaxed text-ink/70">
              Wir verraten die Location in Kürze — so viel steht schon fest: Es wird ein besonderer
              Ort für einen besonderen Tag.
            </p>
            <span className="mt-2 inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.25em] text-sage-soft uppercase">
              Details folgen
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
