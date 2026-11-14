import { motion, useReducedMotion } from 'framer-motion'
import { CONTACT_EMAIL } from '../content'
import { ContactSayHi } from './ContactSayHi'

// The card ends up straight, sitting flat.
const REST_ROTATE = 0

export function HeroIdeaCard() {
  const reduce = Boolean(useReducedMotion())

  return (
    <motion.section
      aria-labelledby="hero-idea-heading"
      // Comes down tilted and a little closer to the viewer, then pounds flat onto the page:
      // a firm landing with one small bounce, no wobble, and it stays perfectly straight.
      initial={reduce ? false : { y: -280, rotate: -9, scale: 1.06, opacity: 0 }}
      animate={{ y: 0, rotate: REST_ROTATE, scale: 1, opacity: 1 }}
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
      style={{ rotate: REST_ROTATE }}
      className="mx-auto w-full max-w-[520px] origin-bottom rounded-[6px] bg-accent p-7 text-ink sm:p-10 lg:mx-0 lg:ml-auto"
    >
      <h2
        id="hero-idea-heading"
        className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] !leading-[1.12] !tracking-[-0.02em]"
      >
        Got an idea that needs a home on the web?
      </h2>
      <p className="mt-4 font-sans text-[1rem] body-copy">
        Tell me what you&apos;re trying to build.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex min-h-11 items-center font-sans text-[0.95rem] font-semibold underline decoration-[1.5px] underline-offset-4 hover:decoration-[3px]"
        >
          {CONTACT_EMAIL}
        </a>
        <ContactSayHi
          label="Chat with me"
          triggerClassName="inline-flex min-h-11 items-center bg-ink px-5 font-sans text-[0.8rem] font-bold tracking-[0.08em] text-cream uppercase transition-colors hover:bg-cream hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        />
      </div>
    </motion.section>
  )
}
