import { motion, useReducedMotion } from 'framer-motion'
import { SOCIAL } from '../content'
import { fadeUp, inViewOnce, staggerContainer } from '../lib/motion'
import { ContactSayHi } from './ContactSayHi'

export function Contact() {
  const reduce = Boolean(useReducedMotion())

  return (
    <section
      id="contact"
      className="flex min-h-[calc(100svh-var(--header-h,8rem))] flex-col bg-accent text-ink"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-1 flex-col justify-center py-8 lg:py-12">
          <motion.div
            variants={staggerContainer(0, 0)}
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={inViewOnce}
          >
            <motion.h2
              variants={fadeUp}
              id="contact-heading"
              className="max-w-5xl font-display text-[clamp(2.6rem,9vw,6.4rem)] !leading-[1.12] !tracking-[0.02em]"
            >
              Got something
              <br />
              worth building?
            </motion.h2>
            <p className="mt-8 max-w-xl font-sans text-[1.05rem] body-copy">
              Taking on two freelance projects for the next quarter. Web apps, AI
              features, healthtech-adjacent products — tell me what&apos;s in the
              way.
            </p>
            <motion.p
              variants={fadeUp}
              className="mt-12 inline-flex w-fit select-all items-baseline font-display text-[clamp(1.35rem,4.5vw,3.15rem)] lowercase !leading-[1.12]"
            >
              hello
              <span className="font-sans font-extrabold">@</span>
              nikkibuilds.dev
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <ContactSayHi />
            </motion.div>
          </motion.div>
        </div>

        <footer className="mt-auto border-t border-ink pt-6 pb-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="max-sm:inline-flex max-sm:min-h-11 max-sm:items-center hover:underline hover:decoration-2 hover:underline-offset-4"
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-sans text-[0.72rem] font-semibold tracking-[0.12em] uppercase">
              © 2026 Nikki • Built from scratch
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
