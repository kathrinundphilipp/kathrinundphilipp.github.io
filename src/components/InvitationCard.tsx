import { motion, type Variants } from 'framer-motion'
import type { IntroPhase } from './EnvelopeIntro'

interface InvitationCardProps {
  phase: IntroPhase
  reduceMotion?: boolean
}

const EASE = [0.65, 0, 0.35, 1] as const

const cardVariants: Variants = {
  closed: {
    opacity: 0,
    y: '56%',
    scale: 0.82,
    transition: { duration: 0.01 },
  },
  opening: {
    opacity: 1,
    y: '-4%',
    scale: 1.02,
    transition: { duration: 1.5, ease: EASE, delay: 0.95 },
  },
  revealed: {
    opacity: 1,
    y: '-20%',
    scale: 1.08,
    transition: { duration: 1.2, ease: EASE, delay: 0.05 },
  },
}

const reducedVariants: Variants = {
  closed: { opacity: 0, scale: 0.95, transition: { duration: 0.01 } },
  opening: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
  revealed: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
}

export default function InvitationCard({ phase, reduceMotion }: InvitationCardProps) {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-[4%] left-1/2 z-15 flex w-[80vw] max-w-[380px] -translate-x-1/2 flex-col items-center rounded-[2px] bg-ivory px-7 py-11 text-center sm:w-[68vw] sm:max-w-[400px] sm:px-10 sm:py-14"
      style={{
        boxShadow:
          '0 40px 80px -20px rgba(50,43,32,0.45), 0 2px 0 rgba(255,255,255,0.6) inset',
      }}
      variants={reduceMotion ? reducedVariants : cardVariants}
      initial="closed"
      animate={phase}
    >
      <div className="mb-5 h-px w-10 bg-sage-light/70 sm:mb-6" />

      <p className="font-sans text-[10px] font-medium tracking-[0.35em] text-sage-soft uppercase sm:text-[11px]">
        Wir heiraten
      </p>

      <h1 className="mt-4 font-serif text-[clamp(30px,8vw,44px)] leading-[1.05] text-ink sm:mt-5">
        Kathrin
        <span className="mx-2 font-script text-[0.65em] italic text-sage sm:mx-3">&amp;</span>
        Philipp
      </h1>

      <div className="my-5 h-px w-10 bg-sage-light/70 sm:my-6" />

      <p className="font-serif text-[15px] tracking-[0.12em] text-sage-dark sm:text-[17px]">
        25. SEPTEMBER 2027
      </p>

      <p className="mt-5 max-w-[26ch] font-script text-[16px] italic leading-snug text-ink/70 sm:mt-6 sm:text-[18px]">
        Und wir können es kaum erwarten, diesen besonderen Tag mit euch zu feiern.
      </p>
    </motion.div>
  )
}
