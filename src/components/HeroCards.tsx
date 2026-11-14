import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CONTACT_EMAIL, PROJECTS } from '../content'
import { ContactSayHi } from './ContactSayHi'

type Spot = { x: number; y: number; r: number }

// Positions are percentages of the stage (left/top), so the stack scales with the screen.
// The pile: all four cards loosely stacked, low in the middle.
const PILE: readonly Spot[] = [
  { x: 27.4, y: 54.6, r: -1.5 },
  { x: 26.8, y: 55.4, r: 1.5 },
  { x: 27.7, y: 56.3, r: -0.5 },
  { x: 27.1, y: 57.1, r: 1 },
]

// The finished zigzag tower, bottom to top: left→right, right→left, left→right, right→left.
const TOWER: readonly Spot[] = [
  { x: 40.3, y: 52.1, r: -3 },
  { x: 14.5, y: 35.8, r: 3 },
  { x: 40.3, y: 19.6, r: -2 },
  { x: 14.5, y: 3.3, r: 2 },
]

const STEP_MS = 560
const RISE = { duration: 0.9, ease: [0.22, 1, 0.36, 1] } as const
const GATHER = { duration: 0.55, ease: [0.65, 0, 0.35, 1] } as const

const cardBase =
  'absolute block aspect-[300/206] w-[48.4%] overflow-hidden border-[1.5px] border-ink bg-white'

export function HeroCards() {
  const reduce = Boolean(useReducedMotion())
  // How many cards have risen out of the pile (0–4).
  const [placed, setPlaced] = useState(reduce ? 4 : 0)
  const busy = useRef(false)
  const timers = useRef<number[]>([])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const build = useCallback(() => {
    busy.current = true
    for (let n = 1; n <= 4; n += 1) later(() => setPlaced(n), (n - 1) * STEP_MS)
    later(() => {
      busy.current = false
    }, 4 * STEP_MS + 600)
  }, [])

  useEffect(() => {
    if (reduce) {
      setPlaced(4)
      return
    }
    later(build, 500)
    const pending = timers.current
    return () => pending.forEach(window.clearTimeout)
  }, [reduce, build])

  const replay = () => {
    if (reduce || busy.current) return
    busy.current = true
    setPlaced(0)
    later(build, 650)
  }

  const spot = (i: number) => (i < placed ? TOWER[i] : PILE[i])
  const motionFor = (i: number) => {
    const up = i < placed
    const p = spot(i)
    return {
      initial: false as const,
      animate: { left: `${p.x}%`, top: `${p.y}%`, rotate: p.r },
      transition: reduce ? { duration: 0 } : up ? RISE : GATHER,
      style: {
        // In the pile the first project sits on top; once placed, later cards sit above earlier ones.
        zIndex: up ? 20 + i : 10 - i,
        boxShadow: up ? '6px 6px 0 #000' : '2px 2px 0 #000',
        left: `${PILE[i].x}%`,
        top: `${PILE[i].y}%`,
      },
    }
  }

  const projects = PROJECTS.slice(0, 3)

  return (
    <div
      className="relative mx-auto aspect-[620/480] w-full max-w-[620px]"
      onMouseEnter={replay}
    >
      {projects.map((project, i) => (
        <motion.a
          key={project.index}
          href="#work"
          aria-label={`${project.title}: see it in Selected work`}
          className={cardBase}
          {...motionFor(i)}
        >
          <img
            src={project.posterSrc ?? project.imageSrc}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
          <span className="absolute bottom-2.5 left-2.5 bg-ink px-2 py-1 font-sans text-[0.62rem] font-bold tracking-[0.1em] text-cream uppercase sm:text-[0.68rem]">
            {project.title}
          </span>
        </motion.a>
      ))}

      <motion.div
        className={`${cardBase} !bg-accent`}
        role="group"
        aria-labelledby="hero-idea-heading"
        {...motionFor(3)}
      >
        <div className="flex h-full flex-col justify-between p-4 sm:p-5">
          <p
            id="hero-idea-heading"
            className="font-display text-[clamp(1rem,2.6vw,1.4rem)] !leading-[1.2] text-ink"
          >
            Got an idea that needs a home on the web?
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="hidden font-sans text-[0.8rem] font-semibold text-ink sm:inline">
              {CONTACT_EMAIL}
            </span>
            <ContactSayHi
              label="Chat with me"
              triggerClassName="inline-flex min-h-11 items-center bg-ink px-4 font-sans text-[0.72rem] font-bold tracking-[0.08em] text-cream uppercase transition-colors hover:bg-cream hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
