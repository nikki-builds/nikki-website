import { animate, motion, useInView, useMotionValue, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { CONTACT_EMAIL, SOCIAL } from '../content'

// "Got an idea?" waits tilted like a seesaw, pivoting near "Got", with the weight of the idea on
// the right. When the footer comes into view the idea end drops, overshoots, and bounces a few
// times before it settles level. "Tell me more." takes the hit: a small squash at the first impact.
const TILT = -25 // degrees; negative lifts the right end

export function Footer() {
  const reduce = Boolean(useReducedMotion())
  const headingRef = useRef<HTMLHeadingElement>(null)
  const inView = useInView(headingRef, { once: true, amount: 0.8, margin: '0px 0px -15% 0px' })
  const rotate = useMotionValue(reduce ? 0 : TILT)
  const squash = useMotionValue(1)

  useEffect(() => {
    if (!inView || reduce) return
    let landed = false
    const stopWatch = rotate.on('change', (v) => {
      if (!landed && v >= 0) {
        landed = true
        void animate(squash, [1, 0.86, 1.04, 1], { duration: 0.42, times: [0, 0.25, 0.65, 1], ease: 'easeOut' })
      }
    })
    const drop = animate(rotate, 0, {
      type: 'spring',
      stiffness: 230,
      damping: 7.5,
      mass: 1.3,
      restDelta: 0.02,
      delay: 0.15,
    })
    return () => {
      stopWatch()
      drop.stop()
    }
  }, [inView, reduce, rotate, squash])

  return (
    <footer id="contact" className="bg-accent text-ink" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-[1200px] px-5 pt-28 pb-10 sm:px-8 lg:px-20 lg:pt-32">
        <h2
          ref={headingRef}
          id="footer-heading"
          className="font-display text-[clamp(2.4rem,6vw,4.4rem)] !leading-[1.08] !tracking-[-0.02em]"
        >
          <motion.span className="inline-block origin-[0.7em_85%]" style={{ rotate }}>
            Got an idea?
          </motion.span>
          <motion.span className="block origin-bottom" style={{ scaleY: squash }}>
            Tell me more.
          </motion.span>
        </h2>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-6 inline-flex min-h-11 items-center font-sans text-[1.1rem] font-semibold underline decoration-[1.5px] underline-offset-4 hover:decoration-[3px]"
        >
          {CONTACT_EMAIL}
        </a>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 font-sans text-[0.75rem] font-semibold tracking-[0.14em] uppercase">
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center hover:underline hover:decoration-2 hover:underline-offset-4"
                  {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-sans text-[0.8rem] text-ink/80">© 2026 Nikki · New York</p>
        </div>
      </div>
    </footer>
  )
}
