import { motion, useReducedMotion } from 'framer-motion'
import { SKILL_COLUMNS } from '../content'
import { fadeIn, fadeUp, inViewOnce, slideFromLeft, slideFromRight, staggerContainer } from '../lib/motion'

const cardReveal = staggerContainer(0.065, 0)

const cardVariants = [slideFromLeft, fadeUp, slideFromRight] as const

const cardClassName =
  'flex flex-col border-t-[1.5px] border-ink pt-6 text-ink'

const subgroupLabelClassName =
  'mb-3 font-serif text-xs font-bold tracking-[0.14em] text-ink/70 uppercase'

const listClassName =
  'flex flex-col divide-y divide-ink/15 font-sans text-[0.95rem] body-copy'

function SkillList({ items }: { items: readonly string[] }) {
  return (
    <ul className={listClassName}>
      {items.map((item) => (
        <li key={item} className="py-3.5 first:pt-0 last:pb-0">
          {item}
        </li>
      ))}
    </ul>
  )
}

export function Skills() {
  const reduce = Boolean(useReducedMotion())

  return (
    <section id="skills" className="bg-cream text-ink" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-[1400px] overflow-x-clip px-5 py-20 sm:px-8 lg:px-12 lg:pb-28 lg:pt-8">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-ink pb-4 lg:mb-14">
          <motion.h2
            id="skills-heading"
            variants={fadeIn}
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={inViewOnce}
            className="font-display text-[clamp(2.4rem,8vw,5.8rem)] !leading-[1.12] !tracking-[0.02em]"
          >
            What I do
          </motion.h2>
        </div>

        <motion.div
          className="grid gap-10 md:grid-cols-3 md:gap-8"
          variants={cardReveal}
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={inViewOnce}
        >
          {SKILL_COLUMNS.map((col, i) => (
            <motion.article key={col.title} variants={cardVariants[i]} className={cardClassName}>
              <h3 className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-display text-2xl sm:text-3xl">{col.index}/</span>
                <span className="font-serif text-xl font-bold leading-[1.55] tracking-wide">
                  {col.title}
                </span>
              </h3>

              {col.groups ? (
                <div className="mt-8 flex flex-col gap-7">
                  {col.groups.map((group) => (
                    <div key={group.label}>
                      <p className={subgroupLabelClassName}>{group.label}</p>
                      <SkillList items={group.items} />
                    </div>
                  ))}
                </div>
              ) : (
                col.items && (
                  <div className="mt-8">
                    <SkillList items={col.items} />
                  </div>
                )
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
