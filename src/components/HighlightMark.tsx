import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type HighlightMarkProps = {
  children: ReactNode
  delay?: number
  play?: boolean
  onComplete?: () => void
}

export function HighlightMark({
  children,
  delay = 0,
  play = true,
  onComplete,
}: HighlightMarkProps) {
  const reduce = useReducedMotion()
  const shown = Boolean(reduce || play)

  return (
    <span className="relative inline-block px-[0.12em] py-[0.08em] uppercase">
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-accent"
        initial={reduce ? { scaleX: 1, scaleY: 1 } : { scaleX: 0, scaleY: 0.35 }}
        animate={shown ? { scaleX: 1, scaleY: 1 } : { scaleX: 0, scaleY: 0.35 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: 'spring', stiffness: 70, damping: 13, mass: 0.7, delay }
        }
        style={{ originX: 0, originY: 0.5 }}
        onAnimationComplete={() => {
          if (shown) onComplete?.()
        }}
      />
      <span className="relative">{children}</span>
    </span>
  )
}
