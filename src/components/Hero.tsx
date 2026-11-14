import { motion, useReducedMotion } from 'framer-motion'
import { fadeEase, fadeUp, staggerContainer } from '../lib/motion'
import { HeroIdeaCard } from './HeroIdeaCard'

const heroText = staggerContainer(0.1, 0.06)

export function Hero() {
  const reduce = Boolean(useReducedMotion())

  return (
    <section id="hero" className="relative overflow-x-clip bg-cream" aria-label="Introduction">
      <div className="mx-auto grid min-h-[calc(100svh-var(--header-h,8rem))] max-w-[1400px] items-center gap-12 px-5 pt-6 pb-16 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-12 lg:pt-0 lg:pb-12">
        <motion.div
          className="flex max-w-2xl flex-col"
          variants={heroText}
          initial={reduce ? 'show' : 'hidden'}
          animate="show"
        >
          <motion.p variants={fadeUp} className="font-sans text-[1.2rem] font-semibold text-ink sm:text-[1.35rem]">
            Hi, I&apos;m Nikki.
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-[clamp(2.6rem,5.6vw,4.4rem)] !leading-[1.07] !tracking-[-0.03em] text-ink"
          >
            I turn ideas into websites and tools people come back to.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[34rem] font-sans text-[1.02rem] body-copy text-ink/80 sm:text-[1.1rem]"
          >
            From Webflow sites you can update yourself to custom web apps. My background in
            nutrition taught me to start with the person, not the tech.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="#work"
              className="mt-9 inline-flex min-h-11 items-center rounded-[4px] bg-accent px-7 py-3.5 font-sans text-sm font-bold tracking-[0.08em] text-ink uppercase transition-colors duration-200 hover:bg-ink hover:text-cream"
            >
              See the work
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: fadeEase, delay: 0.1 }}
        >
          <HeroIdeaCard />
        </motion.div>
      </div>
    </section>
  )
}
