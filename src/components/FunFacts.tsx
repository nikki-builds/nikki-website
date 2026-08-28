import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { useId, useState } from 'react'
import { FUN_FACTS } from '../content'

const fadeEase = [0.22, 1, 0.36, 1] as const

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: fadeEase },
  },
}

export function FunFacts() {
  const [open, setOpen] = useState(false)
  const reduce = Boolean(useReducedMotion())
  const panelId = useId()

  return (
    <div className="mt-12 max-w-xl">
      <button
        type="button"
        className="inline-flex items-center gap-2.5 text-left font-sans text-[0.82rem] tracking-[0.04em] text-accent transition-opacity hover:opacity-80"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="grid size-5 shrink-0 place-items-center border border-accent text-[0.85rem] leading-none"
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
            className="overflow-hidden"
          >
            <motion.ul
              className="mt-5 flex flex-col gap-2.5 font-sans text-[0.86rem] leading-relaxed tracking-[0.03em] text-cream/65"
              variants={listVariants}
              initial={reduce ? 'show' : 'hidden'}
              animate="show"
            >
              {FUN_FACTS.map((fact) => (
                <motion.li key={fact} className="flex gap-3" variants={itemVariants}>
                  <span className="mt-[0.7em] size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{fact}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
