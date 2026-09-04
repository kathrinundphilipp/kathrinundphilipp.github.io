import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EnvelopeFlap from './EnvelopeFlap'
import WaxSeal from './WaxSeal'
import InvitationCard from './InvitationCard'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useIsMobile } from '../hooks/useIsMobile'

export type IntroPhase = 'closed' | 'opening' | 'revealed'

const EASE = [0.65, 0, 0.35, 1] as const
const OPENING_DURATION_MS = 3400

export default function EnvelopeIntro() {
  const reduceMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const skip = reduceMotion

  const [phase, setPhase] = useState<IntroPhase>(skip ? 'revealed' : 'closed')
  const [settled, setSettled] = useState(skip)

  const handleOpen = useCallback(() => {
    setPhase((p) => (p === 'closed' ? 'opening' : p))
  }, [])

  useEffect(() => {
    if (phase !== 'opening') return
    const duration = reduceMotion ? 500 : OPENING_DURATION_MS
    const t = setTimeout(() => setPhase('revealed'), duration)
    return () => clearTimeout(t)
  }, [phase, reduceMotion])

  useEffect(() => {
    if (phase !== 'revealed') return
    const t = setTimeout(() => setSettled(true), reduceMotion ? 100 : 650)
    return () => clearTimeout(t)
  }, [phase, reduceMotion])

  useEffect(() => {
    const locked = !settled
    document.body.classList.toggle('intro-locked', locked)
    return () => document.body.classList.remove('intro-locked')
  }, [settled])

  const closedScale = isMobile ? 2.5 : 1.08

  return (
    <motion.section
      className={
        settled
          ? 'relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-paper px-4 pb-20 pt-16'
          : 'fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-paper px-4'
      }
    >
      {/* paper / linen background texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, rgba(70,60,40,0.035) 0px, rgba(70,60,40,0.035) 1px, transparent 1px, transparent 3px)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(255,255,255,0.5), transparent 55%), radial-gradient(circle at 50% 90%, rgba(70,60,40,0.08), transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-9">
        <motion.div
          className={`relative w-[min(84vw,400px)] ${phase === 'closed' ? 'cursor-pointer' : ''}`}
          style={{
            aspectRatio: '3 / 2',
            perspective: 1900,
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 42%',
          }}
          onClick={handleOpen}
          role={phase === 'closed' ? 'button' : undefined}
          tabIndex={phase === 'closed' ? 0 : undefined}
          aria-label={phase === 'closed' ? 'Brief öffnen' : undefined}
          onKeyDown={(e) => {
            if (phase === 'closed' && (e.key === 'Enter' || e.key === ' ')) handleOpen()
          }}
          initial={false}
          animate={{ scale: phase === 'closed' ? closedScale : 1 }}
          whileHover={phase === 'closed' ? { scale: closedScale * 1.01 } : undefined}
          whileTap={phase === 'closed' ? { scale: closedScale * 0.99 } : undefined}
          transition={{ duration: reduceMotion ? 0.01 : 1.4, ease: EASE }}
        >
          {/* fine paper grain, scales together with the envelope */}
          <div
            className="pointer-events-none absolute -inset-1 z-40 opacity-[0.5] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.28 0 0 0 0 0.24 0 0 0 0 0.16 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '140px 140px',
            }}
          />

          {/* subtle fold-crease lines from the corners to the flap point */}
          <svg
            className="pointer-events-none absolute inset-0 z-30 h-full w-full"
            viewBox="0 0 100 66.667"
            preserveAspectRatio="none"
          >
            <motion.g
              animate={{ opacity: phase === 'revealed' ? 0 : 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <line x1="0" y1="0" x2="50" y2="40" stroke="rgba(90,72,48,0.16)" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="0" x2="50" y2="40" stroke="rgba(90,72,48,0.16)" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="66.667" x2="50" y2="40" stroke="rgba(90,72,48,0.12)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
            </motion.g>
          </svg>

          {/* envelope back panel */}
          <motion.div
            className="absolute inset-0 rounded-[2px]"
            animate={{ scale: phase === 'closed' ? 1 : 0.97, opacity: phase === 'revealed' ? 0 : 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: phase === 'revealed' ? 0.1 : 0 }}
            style={{
              background:
                'linear-gradient(150deg, var(--color-cream) 0%, var(--color-cream-dark) 100%)',
              boxShadow: '0 25px 55px -20px rgba(50,43,32,0.5)',
              transition: 'transform 0.35s ease',
              zIndex: 0,
            }}
          />

          <InvitationCard phase={phase} reduceMotion={reduceMotion} />

          {/* envelope front pocket panel */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[64%] rounded-b-[2px]"
            animate={{ opacity: phase === 'revealed' ? 0 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              background:
                'linear-gradient(175deg, var(--color-cream) 0%, var(--color-cream-dark) 100%)',
              boxShadow:
                'inset 0 10px 16px -12px rgba(50,43,32,0.45), 0 18px 30px -18px rgba(50,43,32,0.4)',
              zIndex: 20,
            }}
          />

          <EnvelopeFlap open={phase !== 'closed'} reduceMotion={reduceMotion} />

          <WaxSeal initials="K & P" broken={phase !== 'closed'} reduceMotion={reduceMotion} />
        </motion.div>

        <AnimatePresence>
          {phase === 'revealed' && (
            <motion.div
              key="scroll-cue"
              className="mt-2 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
            >
              <p className="font-sans text-[10px] tracking-[0.3em] text-sage-soft uppercase">Scroll</p>
              <div className="h-7 w-px overflow-hidden bg-sage-light/40">
                <motion.div
                  className="h-full w-full bg-sage-dark"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase === 'closed' && (
          <motion.div
            key="prompt"
            className="pointer-events-none absolute inset-x-0 bottom-[6%] z-50 flex flex-col items-center gap-2 text-center sm:bottom-[8%]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.35 } }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          >
            <p className="font-script text-[19px] italic text-sage-dark drop-shadow-[0_1px_2px_rgba(255,253,248,0.8)]">
              Für Euch
            </p>
            <p className="font-sans text-[11px] tracking-[0.25em] text-sage-soft uppercase animate-pulse drop-shadow-[0_1px_2px_rgba(255,253,248,0.8)]">
              Tippe, um den Brief zu öffnen
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
