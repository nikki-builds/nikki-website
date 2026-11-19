import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { FUN_FACTS, type FunFact } from '../content'

const fadeEase = [0.22, 1, 0.36, 1] as const

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: fadeEase },
  },
}

function chipSize(text: string) {
  if (text.length > 58) return 'text-[0.8rem] px-3.5 py-2'
  if (text.length > 34) return 'text-[0.84rem] px-3.5 py-1.5'
  return 'text-[0.82rem] px-3 py-1.5'
}

function FunFactChip({ fact, reduce }: { fact: FunFact; reduce: boolean }) {
  return (
    <motion.li variants={itemVariants} className="inline-flex">
      <span
        className={`fun-fact-chip inline-flex max-w-full items-center gap-1.5 rounded-full border border-ink/15 bg-[rgba(255,203,65,0.12)] leading-snug text-ink/85 transition-[transform,background-color,border-color] duration-300 ease-out hover:scale-105 hover:rotate-0 hover:border-accent/55 hover:bg-[rgba(255,203,65,0.22)] ${chipSize(fact.text)}`}
        style={
          reduce
            ? undefined
            : {
                rotate: `${fact.rotate}deg`,
                translate: `${fact.nudgeX}px ${fact.nudgeY}px`,
              }
        }
      >
        <span className="shrink-0 text-[0.95em] leading-none" aria-hidden="true">
          {fact.emoji}
        </span>
        <span>{fact.text}</span>
      </span>
    </motion.li>
  )
}

function FunFactsChipList({ reduce }: { reduce: boolean }) {
  return (
    <motion.ul
      className="mt-5 flex flex-wrap gap-x-3 gap-y-3.5 pb-1 text-left font-sans tracking-[0.02em]"
      variants={listVariants}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.3, margin: '0px 0px -20% 0px' }}
    >
      {FUN_FACTS.map((fact) => (
        <FunFactChip key={fact.text} fact={fact} reduce={reduce} />
      ))}
    </motion.ul>
  )
}

// Fun facts, always visible (they used to hide behind an "Extra credit" toggle).
export function FunFacts() {
  const reduce = Boolean(useReducedMotion())

  return (
    <div>
      <h3 className="font-sans text-[0.75rem] font-semibold tracking-[0.14em] text-ink/70 uppercase">
        Off the clock
      </h3>
      <FunFactsChipList reduce={reduce} />
    </div>
  )
}
