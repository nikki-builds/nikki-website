import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { useId, useState } from 'react'
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
      animate="show"
    >
      {FUN_FACTS.map((fact) => (
        <FunFactChip key={fact.text} fact={fact} reduce={reduce} />
      ))}
    </motion.ul>
  )
}

export function FunFacts() {
  const [open, setOpen] = useState(false)
  const reduce = Boolean(useReducedMotion())
  const panelId = useId()

  return (
    <div>
      <button
        type="button"
        className="group inline-flex items-center gap-2.5 text-left font-sans text-[0.95rem] tracking-[0.04em] text-ink/70 transition-opacity hover:opacity-80 max-sm:min-h-11"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="grid size-6 shrink-0 place-items-center border border-ink/70 text-[0.9rem] leading-none transition-colors group-hover:bg-ink group-hover:text-cream"
          aria-hidden="true"
        >
          {open ? '−' : '+'}
        </span>
        Extra credit
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: fadeEase }}
            className="overflow-hidden pb-2"
          >
            <FunFactsChipList reduce={reduce} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
