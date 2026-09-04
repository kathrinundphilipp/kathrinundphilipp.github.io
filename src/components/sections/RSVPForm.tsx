import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from './SectionHeading'

const EASE = [0.65, 0, 0.35, 1] as const

const inputClass =
  'w-full rounded-[2px] border border-ivory/25 bg-transparent px-4 py-3 font-sans text-[15px] text-ivory placeholder:text-ivory/40 outline-none transition-colors focus:border-sage-light'

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false)
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-sage-dark px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-[460px] flex-col items-center gap-12">
        <SectionHeading eyebrow="Wir freuen uns auf euch" title="RSVP" dark />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col items-center gap-3 py-6 text-center"
            >
              <p className="font-serif text-[22px] text-ivory">Danke euch!</p>
              <p className="max-w-[32ch] font-sans text-[14px] leading-relaxed text-ivory/70">
                Eure Rückmeldung ist bei uns angekommen. Wir freuen uns riesig!
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex w-full flex-col gap-5"
            >
              <input type="text" required placeholder="Euer Name" className={inputClass} />

              <div className="flex gap-3">
                {(['yes', 'no'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAttending(v)}
                    className={`flex-1 rounded-[2px] border px-4 py-3 font-sans text-[13px] tracking-[0.1em] uppercase transition-colors ${
                      attending === v
                        ? 'border-sage-light bg-sage-light/15 text-ivory'
                        : 'border-ivory/25 text-ivory/60 hover:border-ivory/50'
                    }`}
                  >
                    {v === 'yes' ? 'Ich komme gerne' : 'Ich kann leider nicht'}
                  </button>
                ))}
              </div>

              {attending === 'yes' && (
                <input
                  type="number"
                  min={1}
                  defaultValue={1}
                  placeholder="Anzahl Personen"
                  className={inputClass}
                />
              )}

              <textarea
                placeholder="Allergien, Wünsche oder liebe Worte an uns"
                rows={3}
                className={`${inputClass} resize-none`}
              />

              <button
                type="submit"
                disabled={!attending}
                className="mt-2 rounded-full bg-ivory px-8 py-3 font-script text-[16px] italic text-sage-dark shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                Rückmeldung senden
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
