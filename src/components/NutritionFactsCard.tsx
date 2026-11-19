import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

// A "Nutrition Facts" label about Nikki: a nod to the dietetics background.
// Every line is a real fact; the % column is played straight as a label joke, not a statistic.

type Row = {
  label: string
  value: string
  note: string
  sub?: string
  href?: string
}

const ROWS: readonly Row[] = [
  {
    label: 'Nutrition & dietetics',
    value: 'B.S.',
    sub: 'NYU, plus a private-practice internship',
    note: 'Trained as a dietitian first, so I start with the person using the thing.',
  },
  {
    label: 'Custom web apps',
    value: '3 shipped',
    sub: 'RecipeLens · NutriGPT · Macro Calculator',
    note: 'All three are live. Click to see them below.',
    href: '#work',
  },
  {
    label: 'Webflow websites',
    value: 'Design + build',
    note: 'Sites you can update yourself, no developer needed.',
  },
  {
    label: 'Self-taught building',
    value: '100%',
    note: 'Learned by shipping real projects, one bug at a time.',
  },
  {
    label: 'Plain-language explanations',
    value: '100%',
    note: 'No jargon in my emails. Promise.',
  },
]

const DEFAULT_NOTE = 'Hover a line to see what’s in it.'

const rowClass =
  'group/row flex w-full items-baseline justify-between gap-4 border-t border-ink py-2 text-left transition-colors duration-150 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none'

export function NutritionFactsCard() {
  const reduce = Boolean(useReducedMotion())
  const [note, setNote] = useState(DEFAULT_NOTE)

  return (
    <motion.section
      aria-labelledby="facts-heading"
      // Drops in tilted, pounds flat onto the page, ends straight.
      initial={reduce ? false : { y: -280, rotate: -9, scale: 1.06, opacity: 0 }}
      animate={{ y: 0, rotate: 0, scale: 1, opacity: 1 }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              y: { type: 'spring', stiffness: 520, damping: 24, mass: 1.1, delay: 0.45 },
              rotate: { type: 'spring', stiffness: 420, damping: 30, delay: 0.45 },
              scale: { type: 'spring', stiffness: 520, damping: 28, delay: 0.45 },
              opacity: { duration: 0.12, delay: 0.45 },
            }
      }
      className="mx-auto w-full max-w-[420px] origin-bottom border-[2px] border-ink bg-white px-4 pt-3 pb-4 font-sans text-ink lg:mx-0 lg:ml-auto"
      onMouseLeave={() => setNote(DEFAULT_NOTE)}
    >
      <h2 id="facts-heading" className="text-[2.35rem] font-bold leading-none tracking-[-0.02em] sm:text-[2.6rem]">
        Nutrition Facts
      </h2>
      <div className="mt-1.5 border-b-[10px] border-ink pb-1.5 text-[0.95rem]">
        <p className="flex justify-between">
          <span>Serving size</span>
          <span className="font-bold">1 Nikki</span>
        </p>
        <p className="flex justify-between text-ink/80">
          <span>Packed in</span>
          <span>New York City</span>
        </p>
      </div>

      <div className="border-b-[5px] border-ink py-1">
        <p className="text-[0.75rem] font-bold">Amount per serving</p>
        <p className="flex items-baseline justify-between">
          <span className="text-[1.9rem] font-bold leading-tight">Builder</span>
          <span className="text-[1.9rem] font-bold leading-tight">100%</span>
        </p>
      </div>

      <p className="py-1 text-right text-[0.75rem] font-bold">% Daily Value*</p>

      <ul>
        {ROWS.map((row) => {
          const content = (
            <>
              <span className="min-w-0">
                <span className="font-bold">{row.label}</span>
                {row.sub && (
                  <span className="block pl-4 text-[0.8rem] text-ink/75 group-hover/row:text-ink">
                    {row.sub}
                  </span>
                )}
              </span>
              <span className="shrink-0 font-bold">{row.value}</span>
            </>
          )
          const show = () => setNote(row.note)
          return (
            <li key={row.label} className="text-[0.92rem]">
              {row.href ? (
                <a href={row.href} className={rowClass} onMouseEnter={show} onFocus={show}>
                  {content}
                </a>
              ) : (
                <div className={rowClass} onMouseEnter={show}>
                  {content}
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <div className="border-t-[10px] border-ink pt-2 text-[0.78rem] leading-snug">
        <p aria-live="polite" className="min-h-[2.4em]">
          {note}
        </p>
        <p className="mt-1.5 text-ink/70">*Percent Daily Values are based on a people-first diet.</p>
      </div>
    </motion.section>
  )
}
