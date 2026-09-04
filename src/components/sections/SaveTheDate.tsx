import SectionHeading from './SectionHeading'

const events = [
  { day: '24', month: 'Sep 27', label: 'Standesamtliche Trauung', weekday: 'Freitag', time: 'Uhrzeit folgt' },
  { day: '25', month: 'Sep 27', label: 'Freie Trauung & Feier', weekday: 'Samstag', time: 'Uhrzeit folgt' },
]

export default function SaveTheDate() {
  return (
    <section className="bg-sage-dark px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-[440px] flex-col items-center gap-14">
        <SectionHeading eyebrow="Merkt euch den Termin" title="Save the Date" dark />

        <div className="flex w-full flex-col">
          {events.map((e, i) => (
            <div
              key={e.label}
              className={`flex items-center gap-6 py-6 ${
                i === 0 ? 'border-y border-ivory/15' : 'border-b border-ivory/15'
              }`}
            >
              <div className="flex w-16 flex-col items-center border-r border-ivory/20 pr-5 text-center">
                <span className="font-serif text-[32px] leading-none font-semibold text-ivory">{e.day}</span>
                <span className="mt-1.5 font-script text-[12px] italic tracking-wide text-sage-light uppercase">
                  {e.month}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-sans text-[11px] tracking-[0.2em] text-sage-light uppercase">{e.label}</p>
                <p className="mt-1 font-serif text-[18px] text-ivory">{e.weekday}</p>
                <p className="font-script text-[14px] italic text-sage-light">{e.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
