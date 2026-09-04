export default function Footer() {
  return (
    <footer className="bg-ivory px-6 pt-20 pb-16 text-center">
      <div className="mx-auto flex max-w-[440px] flex-col items-center gap-6">
        <div className="h-px w-10 bg-sage-light/70" />
        <p className="font-script text-[15px] italic text-ink/60">
          Wir können es kaum erwarten, mit euch zu feiern.
        </p>
        <p className="font-serif text-[clamp(24px,6vw,30px)] font-semibold text-ink">
          Kathrin <span className="text-sage">&amp;</span> Philipp
        </p>
        <p className="font-sans text-[11px] tracking-[0.2em] text-sage-soft uppercase">
          25. September 2027
        </p>
      </div>
    </footer>
  )
}
