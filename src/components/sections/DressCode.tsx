import SectionHeading from './SectionHeading'

const palette = ['#465c47', '#7d9883', '#e6d9bf', '#322b20', '#f6f0e3']

export default function DressCode() {
  return (
    <section className="bg-ivory px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-[460px] flex-col items-center gap-10">
        <SectionHeading eyebrow="Was ziehe ich an?" title="Dresscode" />

        <p className="max-w-[38ch] text-center font-sans text-[15px] leading-relaxed text-ink/70">
          Wir feiern festlich elegant — Cocktailkleidung ist genau richtig. Am Nachmittag darf es
          auf der Wiese auch gerne bequem zugehen, also denkt an flache Schuhe für draußen.
        </p>

        <div className="flex items-center gap-3">
          {palette.map((c) => (
            <span
              key={c}
              className="h-9 w-9 rounded-full shadow-[0_4px_10px_rgba(50,43,32,0.25)]"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <p className="font-script text-[17px] italic text-sage-dark">
          Nur eine Farbe bleibt an diesem Tag uns vorbehalten: Weiß.
        </p>
      </div>
    </section>
  )
}
