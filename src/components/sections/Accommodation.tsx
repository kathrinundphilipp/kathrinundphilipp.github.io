import SectionHeading from './SectionHeading'

const hotels = [
  { name: 'Hotel am Park', distance: '5 Gehminuten', note: 'Zimmerkontingent auf Anfrage' },
  { name: 'Landgasthof Sonne', distance: '10 Autominuten', note: 'Gemütlich & familiär' },
  { name: 'Ferienwohnungen im Ort', distance: 'Verschiedene Lagen', note: 'Ideal für längere Aufenthalte' },
]

export default function Accommodation() {
  return (
    <section className="bg-paper px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-[560px] flex-col items-center gap-14">
        <SectionHeading eyebrow="Wo ihr schlafen könnt" title="Übernachtung" />

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {hotels.map((h) => (
            <div
              key={h.name}
              className="flex flex-col items-center gap-2 rounded-[2px] bg-ivory px-5 py-8 text-center shadow-[0_20px_40px_-25px_rgba(50,43,32,0.5)]"
            >
              <h3 className="font-serif text-[18px] text-ink">{h.name}</h3>
              <p className="font-sans text-[11px] tracking-[0.2em] text-sage-soft uppercase">
                {h.distance}
              </p>
              <p className="mt-1 font-script text-[15px] italic text-ink/60">{h.note}</p>
            </div>
          ))}
        </div>

        <p className="max-w-[38ch] text-center font-sans text-[13px] leading-relaxed text-ink/50">
          Bucht am besten frühzeitig — genauere Empfehlungen und Kontingente reichen wir bald nach.
        </p>
      </div>
    </section>
  )
}
