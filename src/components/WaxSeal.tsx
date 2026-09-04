import { motion, type Variants } from 'framer-motion'

interface WaxSealProps {
  initials: string
  broken: boolean
  reduceMotion?: boolean
}

const sealVariants: Variants = {
  resting: {
    scale: 1,
    rotate: 0,
    y: 0,
    opacity: 1,
  },
  pressed: {
    scale: [1, 1.06, 1],
    transition: { duration: 0.5, ease: [0.33, 0, 0.2, 1] },
  },
  broken: {
    scale: 0.35,
    rotate: -22,
    y: -46,
    opacity: 0,
    transition: { duration: 0.6, ease: [0.55, 0, 0.35, 1], delay: 0.15 },
  },
}

export default function WaxSeal({ initials, broken, reduceMotion }: WaxSealProps) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[38%] z-30 w-[19%] max-w-[92px] min-w-[52px] -translate-x-1/2 -translate-y-1/2 [filter:drop-shadow(0_8px_14px_rgba(50,30,10,0.38))]"
      variants={sealVariants}
      initial="resting"
      animate={broken ? 'broken' : 'resting'}
      transition={reduceMotion ? { duration: 0.01 } : undefined}
      style={{ transformStyle: 'flat' }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <radialGradient id="sealBody" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#6d8a6c" />
            <stop offset="55%" stopColor="var(--color-sage-dark)" />
            <stop offset="100%" stopColor="#33452f" />
          </radialGradient>
          <path id="sealTopCurve" fill="none" d="M30,112 A70,70 0 0 1 170,112" />
        </defs>

        <circle cx="100" cy="102" r="4" fill="rgba(0,0,0,0.18)" opacity="0" />

        {/* irregular wax blob edge for a hand-pressed look */}
        <path
          d="M100,14
             C128,14 150,24 162,46
             C176,62 186,82 184,106
             C182,130 168,150 146,162
             C126,176 100,186 76,180
             C52,176 30,160 20,138
             C10,116 12,90 26,68
             C40,46 62,26 86,18
             C90,16 96,14 100,14 Z"
          fill="url(#sealBody)"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
        />

        <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

        <text
          fontFamily="'Cormorant Garamond', serif"
          fontSize="11"
          letterSpacing="2.6"
          fill="rgba(255,255,255,0.85)"
        >
          <textPath href="#sealTopCurve" startOffset="50%" textAnchor="middle">
            VERMÄHLUNG
          </textPath>
        </text>

        <circle cx="42" cy="142" r="1.8" fill="rgba(255,255,255,0.6)" />
        <circle cx="100" cy="153" r="1.8" fill="rgba(255,255,255,0.6)" />
        <circle cx="158" cy="142" r="1.8" fill="rgba(255,255,255,0.6)" />

        <text
          x="100"
          y="115"
          textAnchor="middle"
          fontFamily="'Playfair Display', serif"
          fontStyle="italic"
          fontWeight="600"
          fontSize="34"
          fill="#fbfcfa"
        >
          {initials}
        </text>
      </svg>
    </motion.div>
  )
}
