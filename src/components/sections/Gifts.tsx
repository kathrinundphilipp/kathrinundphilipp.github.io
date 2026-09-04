import SectionHeading from './SectionHeading'

export default function Gifts() {
  return (
    <section className="bg-ivory px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-[460px] flex-col items-center gap-6">
        <SectionHeading eyebrow="Ein kleiner Hinweis" title="Geschenke" />

        <p className="max-w-[38ch] text-center font-sans text-[15px] leading-relaxed text-ink/70">
          Das größte Geschenk seid ihr selbst, wenn ihr diesen Tag mit uns feiert. Wer uns trotzdem
          eine Freude machen möchte: Wir sparen auf unsere Flitterwochen und freuen uns über einen
          Beitrag zu unserer Reisekasse.
        </p>

        <div className="mt-2 h-px w-10 bg-sage-light/70" />

        <p className="font-script text-[17px] italic text-sage-dark">Danke von Herzen.</p>
      </div>
    </section>
  )
}
