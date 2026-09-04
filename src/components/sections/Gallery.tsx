import SectionHeading from './SectionHeading'

const tiles = [
  'linear-gradient(155deg,#7d9883,#465c47)',
  'linear-gradient(155deg,#e6d9bf,#c9b98f)',
  'linear-gradient(155deg,#576d53,#322b20)',
  'linear-gradient(155deg,#f1e8d7,#a9987a)',
  'linear-gradient(155deg,#74896f,#3a4a37)',
  'linear-gradient(155deg,#d8cba9,#8c7a56)',
]

export default function Gallery() {
  return (
    <section className="bg-ivory px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-14">
        <SectionHeading eyebrow="In Bildern" title="Bildergalerie" />

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
          {tiles.map((bg, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-[2px] shadow-[0_18px_35px_-20px_rgba(50,43,32,0.5)]"
              style={{ background: bg }}
            />
          ))}
        </div>

        <p className="max-w-[38ch] text-center font-sans text-[13px] leading-relaxed text-ink/50">
          Hier ziehen bald unsere schönsten gemeinsamen Momente ein.
        </p>
      </div>
    </section>
  )
}
