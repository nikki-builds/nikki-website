import type { Variants } from 'framer-motion'

export const fadeEase = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: fadeEase },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.48, ease: fadeEase },
  },
}

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: fadeEase },
  },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: fadeEase },
  },
}

export function staggerContainer(
  stagger = 0.09,
  delay = 0.06,
): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
}

// Start an entrance only once the element has come up past the bottom fifth of the screen,
// so it plays where people are actually looking, not the moment its edge peeks in.
export const inViewOnce = { once: true, amount: 0.15, margin: '0px 0px -20% 0px' } as const
