import { motion, useReducedMotion } from 'framer-motion'
import { fadeEase, fadeUp, inViewOnce, staggerContainer } from '../lib/motion'
import { FunFacts } from './FunFacts'

const aboutReveal = staggerContainer(0.12, 0.04)

export function About() {
  const reduce = Boolean(useReducedMotion())

  return (
    <section id="about" className="bg-cream text-ink" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:px-20 lg:py-28">
        <div>
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
              I read the{' '}
              {/* keep "label first." together so the line never breaks before "first." */}
              <span className="whitespace-nowrap">
              <span className="relative inline-block px-[0.12em] py-[0.12em] text-ink">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 bg-accent"
                  initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={inViewOnce}
                  transition={{ duration: 0.75, ease: fadeEase, delay: 0.95 }}
                  style={{ originX: 0, originY: 0.5 }}
                />
                <span className="relative">label</span>
              </span>{' '}
              first.
              </span>
            </motion.h2>

            <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
              <motion.div variants={fadeUp}>
                <div className="max-w-[34rem] font-sans text-ink">
                  <p className="text-[1.3rem] font-semibold !leading-[1.45] sm:text-[1.45rem]">
                    I&apos;m a nutrition grad who taught herself to build for the web.
                  </p>
                  <p className="mt-6 text-[1rem] body-copy text-ink/85">
                    During my internship with a private practice dietitian who focused on
                    PCOS, I kept wondering how her clients could share what they ate between
                    appointments, in a way she could actually see and use in their plan.
                    That, plus a broken website I kept fighting with as her intern, got me
                    curious about building things myself.
                  </p>
                  <p className="mt-5 text-[1rem] body-copy text-ink/85">
                    Now I make custom web apps, and Webflow sites people can run themselves.
                    I design and build every project on my own, from first sketch to launch.
                    Still the same instinct: build the thing that&apos;s actually missing, for
                    the person who actually needs it.
                  </p>
                </div>
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
