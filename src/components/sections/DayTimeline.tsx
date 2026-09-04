import SectionHeading from './SectionHeading'

const schedule = [
  { time: '14:00', label: 'Trauung', note: 'Wir sagen Ja' },
  { time: '15:00', label: 'Sektempfang', note: 'Anstoßen im Grünen' },
  { time: '17:00', label: 'Dinner', note: 'Gemeinsames Essen' },
  { time: '19:30', label: 'Reden & Spiele', note: 'Überraschungen inklusive' },
  { time: '21:00', label: 'Party', note: 'Tanzen bis in die Nacht' },
]

export default function DayTimeline() {
  return (
    <section className="bg-paper px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-[460px] flex-col items-center gap-14">
        <SectionHeading eyebrow="Der Tag im Überblick" title="Ablauf des Tages" />

        <div className="relative flex w-full flex-col gap-9 pl-8">
          <div className="absolute top-1 bottom-1 left-[7px] w-px bg-sage-light/50" />
          {schedule.map((s) => (
            <div key={s.time} className="relative flex items-baseline gap-5">
              <span className="absolute top-[5px] -left-8 h-[9px] w-[9px] rounded-full bg-sage" />
              <span className="w-[58px] shrink-0 font-serif text-[17px] text-sage-dark">{s.time}</span>
              <div>
                <p className="font-serif text-[19px] text-ink">{s.label}</p>
                <p className="font-script text-[14px] italic text-ink/60">{s.note}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="max-w-[38ch] text-center font-sans text-[13px] leading-relaxed text-ink/50">
          Der genaue Ablauf kann sich noch leicht verschieben — die Reihenfolge bleibt aber ein
          Versprechen.
        </p>
      </div>
    </section>
  )
}
