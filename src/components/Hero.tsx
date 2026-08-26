import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useState } from 'react'
import { HighlightMark } from './HighlightMark'
import { HeroPortrait } from './HeroPortrait'

const fadeEase = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: fadeEase },
  },
}

const headlineList: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
}

const restList: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
}

export function Hero() {
  const reduce = Boolean(useReducedMotion())
  const [marksPlay, setMarksPlay] = useState(false)
  const [restPlay, setRestPlay] = useState(false)

  return (
    <section
      id="hero"
      className="relative overflow-x-clip bg-cream"
      aria-label="Introduction"
    >
      <div className="mx-auto grid min-h-[calc(100svh-var(--header-h,8rem))] max-w-[1400px] items-center gap-10 px-5 pb-16 pt-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-12 lg:pb-10 lg:pt-0">
        <div className="relative z-10 max-w-xl lg:max-w-none">
          <motion.h1
            className="font-display flex flex-col gap-2 text-[clamp(3rem,8vw,6rem)] !leading-[1.32] text-ink"
            variants={headlineList}
            initial={reduce ? 'show' : 'hidden'}
            animate="show"
            onAnimationComplete={() => setMarksPlay(true)}
          >
            <motion.span variants={fadeUp}>Hi,</motion.span>
            <motion.span variants={fadeUp}>
              I&apos;m <HighlightMark play={marksPlay} delay={0}>Nikki</HighlightMark>
            </motion.span>
            <motion.span variants={fadeUp}>I build</motion.span>
            <motion.span variants={fadeUp} className="whitespace-nowrap">
              on the{' '}
              <HighlightMark play={marksPlay} delay={0.45} onComplete={() => setRestPlay(true)}>
                web
              </HighlightMark>
            </motion.span>
          </motion.h1>

          <motion.div
            variants={restList}
            initial={reduce ? 'show' : 'hidden'}
            animate={reduce || restPlay ? 'show' : 'hidden'}
          >
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-md border-l-[3px] border-accent pl-5 font-sans text-[0.98rem] leading-relaxed text-ink sm:text-[1.05rem]"
            >
              Production web apps for founders and small teams — healthtech,
              applied AI, and the unglamorous systems in between. I own the data
              model, the interface, and the deploy.
            </motion.p>

            <motion.a
              variants={fadeUp}
              href="#work"
              className="mt-10 inline-flex items-center bg-ink px-8 py-3.5 font-serif text-sm font-bold tracking-wide text-white uppercase transition-transform hover:-translate-y-0.5"
            >
              See the work
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto h-[min(72vh,640px)] w-full max-w-[420px] lg:mx-0 lg:h-[min(78vh,720px)] lg:max-w-none"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: fadeEase, delay: 0.08 }}
        >
          <div
            className="absolute top-[6%] right-[8%] bottom-0 left-[22%] bg-accent"
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 -left-[8%] right-0 lg:-left-[14%]">
            <HeroPortrait />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
