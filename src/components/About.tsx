import { motion, useReducedMotion } from 'framer-motion'
import { fadeEase, fadeUp, inViewOnce, staggerContainer } from '../lib/motion'
import { FunFacts } from './FunFacts'

const aboutReveal = staggerContainer(0.12, 0.04)

export function About() {
  const reduce = Boolean(useReducedMotion())

  return (
    <section id="about" className="bg-cream text-ink" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(7rem,0.22fr)_1fr] lg:gap-6">
          <p className="font-serif text-sm font-bold tracking-wider text-ink/70 uppercase">
            01 / About
          </p>

          <motion.div
            variants={aboutReveal}
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={inViewOnce}
          >
            <motion.h2
              id="about-heading"
              variants={fadeUp}
              className="font-display text-[clamp(2.6rem,7vw,5.6rem)] !leading-[1.18] !tracking-[0.02em]"
            >
              Web apps,
              <br />
              built with{' '}
              <span className="relative inline-block px-[0.12em] py-[0.12em] text-ink">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 bg-accent"
                  initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={inViewOnce}
                  transition={{ duration: 0.65, ease: fadeEase, delay: 0.45 }}
                  style={{ originX: 0, originY: 0.5 }}
                />
                <span className="relative">care.</span>
              </span>
            </motion.h2>

            <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
              <motion.div variants={fadeUp}>
                <p className="max-w-md font-sans text-[0.98rem] body-copy tracking-[0.04em] text-ink">
                  I studied nutrition and dietetics in college. During an internship
                  with a private practice dietitian who focused on PCOS, I found
                  myself thinking about how her clients could share what they ate or
                  how they were doing between appointments, something she could
                  actually see and factor into their plan, instead of it just living
                  in their own notes. That, plus a broken website I kept fighting with
                  as her intern, is what got me curious about building things myself.
                  I taught myself to code from there. Now I build production web apps
                  for founders and small teams, and Webflow sites for people who need
                  a marketing site they can run themselves. Still the same instinct:
                  build the thing that&apos;s actually missing, for the person who actually
                  needs it.
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <FunFacts />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
