import { useEffect, useState } from 'react'
import SectionHeading from './SectionHeading'

const WEDDING_DATE = new Date('2027-09-25T14:00:00')

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: time.days, label: 'Tage' },
    { value: time.hours, label: 'Stunden' },
    { value: time.minutes, label: 'Minuten' },
    { value: time.seconds, label: 'Sekunden' },
  ]

  return (
    <section className="bg-sage-dark px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-[560px] flex-col items-center gap-14">
        <SectionHeading eyebrow="Es ist nicht mehr lange hin" title="Countdown" dark />

        <div className="flex w-full items-start justify-center gap-4 sm:gap-8">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center gap-2">
              <span className="font-serif text-[clamp(32px,9vw,52px)] leading-none font-semibold tabular-nums text-ivory">
                {String(u.value).padStart(2, '0')}
              </span>
              <span className="font-sans text-[10px] tracking-[0.25em] text-sage-light uppercase">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        <p className="font-script text-[17px] italic text-sage-light">
          Wir zählen jeden einzelnen Tag.
        </p>
      </div>
    </section>
  )
}
