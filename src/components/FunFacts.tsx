import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useId, useState } from 'react'
import { FUN_FACTS } from '../content'

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
        Click here if you&apos;re curious about me
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-5 flex flex-col gap-2.5 font-sans text-[0.86rem] leading-relaxed tracking-[0.03em] text-cream/65">
              {FUN_FACTS.map((fact) => (
                <li key={fact} className="flex gap-3">
                  <span className="mt-[0.7em] size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
