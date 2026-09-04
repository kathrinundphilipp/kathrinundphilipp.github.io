import { motion } from 'framer-motion'

interface EnvelopeFlapProps {
  open: boolean
  reduceMotion?: boolean
}

const EASE = [0.65, 0, 0.35, 1] as const

export default function EnvelopeFlap({ open, reduceMotion }: EnvelopeFlapProps) {
  return (
    <motion.div
      className="absolute left-0 top-0 h-[60%] w-full"
      style={{
        transformOrigin: 'top center',
        transformStyle: 'preserve-3d',
        clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
        zIndex: 25,
      }}
      initial={false}
      animate={{ rotateX: open ? -172 : 0, opacity: open ? 0 : 1 }}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : {
              rotateX: { duration: 1.15, ease: EASE, delay: open ? 0.45 : 0 },
              opacity: { duration: 0.4, ease: EASE, delay: open ? 1.3 : 0 },
            }
      }
    >
      {/* outer face — visible while closed */}
      <div
        className="absolute inset-0"
        style={{
          backfaceVisibility: 'hidden',
          background:
            'radial-gradient(140% 100% at 50% 0%, var(--color-cream) 0%, var(--color-cream) 65%, var(--color-cream-dark) 100%)',
        }}
      />
      {/* faint paper fibre texture */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backfaceVisibility: 'hidden',
          backgroundImage:
            'repeating-linear-gradient(118deg, rgba(70,60,40,0.5) 0px, rgba(70,60,40,0.5) 1px, transparent 1px, transparent 3px)',
        }}
      />
      {/* inner lining — visible once the flap folds past 90deg */}
      <div
        className="absolute inset-0"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateX(180deg)',
          background:
            'linear-gradient(160deg, var(--color-sage-soft) 0%, var(--color-sage-mid) 65%, var(--color-sage-dark) 100%)',
        }}
      />
    </motion.div>
  )
}
