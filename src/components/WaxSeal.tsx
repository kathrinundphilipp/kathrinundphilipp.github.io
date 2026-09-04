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

const monogramLayers = [
  { dx: 1.8, dy: 2.6, fill: '#0a1a0c', opacity: 0.55, blur: 0.4 },
  { dx: -1.3, dy: -1.8, fill: '#a8c6a3', opacity: 0.4, blur: 0 },
  { dx: 0, dy: 0, fill: '#3c5c3d', opacity: 1, blur: 0 },
]

export default function WaxSeal({ initials, broken, reduceMotion }: WaxSealProps) {
  const [left, right] = initials.split('&').map((s) => s.trim())

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[38%] z-30 w-[23%] max-w-[104px] min-w-[58px] -translate-x-1/2 -translate-y-1/2 [filter:drop-shadow(0_10px_16px_rgba(30,20,8,0.4))]"
      variants={sealVariants}
      initial="resting"
      animate={broken ? 'broken' : 'resting'}
      transition={reduceMotion ? { duration: 0.01 } : undefined}
      style={{ transformStyle: 'flat' }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <filter id="waxWobble" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="1" seed="6" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="15" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="waxWobbleSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="1" seed="11" result="n2" />
            <feDisplacementMap in="SourceGraphic" in2="n2" scale="9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <radialGradient id="sealBody" cx="38%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#547654" />
            <stop offset="45%" stopColor="#2f4d31" />
            <stop offset="100%" stopColor="#152616" />
          </radialGradient>
          <radialGradient id="sealHighlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* outer wax blob — irregular, hand-pressed edge */}
        <circle cx="100" cy="100" r="80" fill="url(#sealBody)" filter="url(#waxWobble)" />

        {/* pressed inner rim */}
        <circle
          cx="100"
          cy="100"
          r="63"
          fill="none"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="2.5"
          filter="url(#waxWobbleSoft)"
        />
        <circle
          cx="99"
          cy="99"
          r="63"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          filter="url(#waxWobbleSoft)"
        />

        {/* glossy highlight */}
        <ellipse cx="70" cy="60" rx="48" ry="36" fill="url(#sealHighlight)" style={{ mixBlendMode: 'screen' }} />

        {/* embossed monogram: shadow + highlight + base, for a pressed-in look */}
        {monogramLayers.map((l) => (
          <text
            key={`${l.dx}-${l.dy}`}
            x={100 + l.dx}
            y={122 + l.dy}
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontWeight="700"
            fill={l.fill}
            opacity={l.opacity}
          >
            <tspan fontSize="66">{left}</tspan>
            <tspan fontSize="36" dy="9" dx="1">
              &amp;
            </tspan>
            <tspan fontSize="66" dy="-9" dx="1">
              {right}
            </tspan>
          </text>
        ))}
      </svg>
    </motion.div>
  )
}
