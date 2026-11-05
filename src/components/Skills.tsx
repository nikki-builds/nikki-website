import { motion, useReducedMotion } from 'framer-motion'
import { SKILL_COLUMNS } from '../content'
import { fadeIn, fadeUp, inViewOnce, slideFromLeft, slideFromRight, staggerContainer } from '../lib/motion'

const cardReveal = staggerContainer(0.065, 0)

const cardVariants = [slideFromLeft, fadeUp, slideFromRight] as const

const cardClassName =
  'group flex min-h-[320px] flex-col bg-accent px-7 py-8 text-ink transition-[transform,background-color,color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:bg-ink hover:text-cream hover:shadow-[0_10px_28px_-10px_rgba(0,0,0,0.55)]'

const subgroupLabelClassName =
  'mb-3 font-serif text-xs font-bold tracking-[0.14em] text-ink/70 uppercase transition-colors duration-300 ease-out group-hover:text-accent'

const listClassName =
  'flex flex-col divide-y divide-ink/15 font-sans text-[0.95rem] body-copy transition-[border-color] duration-300 ease-out group-hover:divide-white/10'

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
        <div className="relative mb-14 lg:mb-20">
          <p className="font-serif text-sm font-bold tracking-wider text-ink/70 uppercase lg:absolute lg:top-3 lg:left-0">
            02 / Skills
          </p>
          <motion.h2
            id="skills-heading"
            variants={fadeIn}
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={inViewOnce}
            className="font-display text-center text-[clamp(3rem,10vw,7.5rem)] !leading-[1.12] !tracking-[0.02em]"
          >
            What I do
          </motion.h2>
        </div>

        <motion.div
          className="grid gap-4 md:grid-cols-3 md:gap-5"
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
