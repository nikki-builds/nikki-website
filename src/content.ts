export const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
] as const

export type SectionId = 'hero' | 'work' | 'about' | 'skills' | 'contact'

export const CONTACT_EMAIL = 'hello@nikkibuilds.dev'

export type Project = {
  index: string
  title: string
  highlight?: string
  description: string
  meta: string
  tags: readonly string[]
  /** Case study page. Linked only once caseStudyReady is true. */
  href: string
  /** The deployed app; the video and title open it in a new tab. */
  liveUrl: string
  /** Turn on when the case study page exists, to show the "How I built it" link. */
  caseStudyReady?: boolean
  caption: string
  imageSrc?: string
  imageAlt?: string
  /** Optional looping demo video. Shown instead of the still image unless the visitor prefers reduced motion. */
  videoSrc?: string
  /** Frame shown before the video loads, and in place of the video for reduced motion. */
  posterSrc?: string
}

export const PROJECTS: readonly Project[] = [
  {
    index: '01',
    title: 'RecipeLens',
    highlight: 'Lens',
    description:
      'Paste any recipe and get a full nutrition breakdown. AI pulls out the ingredients; the numbers come from a curated, USDA-based food database, not from the AI.',
    meta: 'Ingredient parsing with GPT-4o-mini · USDA-based food database · React + Node + MongoDB',
    tags: ['Web App', 'Healthtech', 'OpenAI API'],
    href: '/work/recipelens',
    liveUrl: 'https://recipe-lens-erhr.vercel.app/',
    caption: 'RecipeLens — app screenshot',
    imageSrc: '/assets/images/recipelens-screenshot.webp',
    videoSrc: '/assets/images/recipelens-demo.mp4',
    posterSrc: '/assets/images/recipelens-demo-poster.webp',
    imageAlt:
      'RecipeLens nutrition analysis of spaghetti carbonara for 4 servings, with total macros and ingredient breakdown',
  },
  {
    index: '02',
    title: 'NutriGPT',
    highlight: 'GPT',
    description:
      "A quick-answer nutrition assistant built to live on a nutrition business's website. Visitors get balance checks, protein estimates, and plain-language answers without leaving the page.",
    meta: 'Applied AI · prompt design & guardrails · React + Node',
    tags: ['Web App', 'Healthtech', 'Applied AI'],
    href: '/work/nutrigpt',
    liveUrl: 'https://nutri-gpt.vercel.app/',
    caption: 'NutriGPT — app screenshot',
    imageSrc: '/assets/images/nutrigpt-screenshot.webp',
    videoSrc: '/assets/images/nutrigpt-demo.mp4',
    posterSrc: '/assets/images/nutrigpt-demo-poster.webp',
    imageAlt:
      'NutriGPT chat suggesting vegetables to balance a turkey sandwich lunch, then estimating about 27 g of protein for that lunch',
  },
  {
    index: '03',
    title: 'Macro Calculator',
    highlight: 'Calculator',
    description:
      'A calorie and macro calculator in US or metric units. Protein is set by body weight, targets never drop below a safe 1,200 kcal minimum, and everything runs in the browser.',
    meta: 'Mifflin-St Jeor · g/kg protein logic · React · Vercel',
    tags: ['Web App', 'Healthtech', 'Frontend'],
    href: '/work/macro-calculator',
    liveUrl: 'https://macro-calculator-pi.vercel.app/',
    caption: 'Macro Calculator — app screenshot',
    imageSrc: '/assets/images/macrocalc-screenshot.webp',
    videoSrc: '/assets/images/macrocalc-demo.mp4',
    posterSrc: '/assets/images/macrocalc-demo-poster.webp',
    imageAlt:
      'Macro Calculator with inputs in US units on the left and results on the right: a 1,964 kcal daily target with 79 g protein, 266 g carbs, and 65 g fat',
  },
]

export type SkillSubgroup = {
  label: string
  items: readonly string[]
}

export type SkillColumn = {
  index: string
  title: string
  items?: readonly string[]
  groups?: readonly SkillSubgroup[]
}

export const SKILL_COLUMNS: readonly SkillColumn[] = [
  {
    index: '01',
    title: 'Web app development',
    groups: [
      {
        label: 'Frontend',
        items: ['React, Tailwind CSS', 'Vercel'],
      },
      {
        label: 'Backend',
        items: ['Node.js, Express', 'MongoDB, Mongoose', 'OpenAI API (GPT-4o)'],
      },
    ],
  },
  {
    index: '02',
    title: 'Website builds',
    items: [
      'Webflow design & build',
      'CMS the client can edit',
      'Marketing sites & landing pages',
      'Handoff without a codebase',
    ],
  },
  {
    index: '03',
    title: 'Current AI stack',
    items: [
      'Claude Code: code & technical architecture',
      'Cursor: code & debugging',
      'Claude Design, v0: UI prototyping',
    ],
  },
]

export type FunFact = {
  text: string
  emoji: string
  rotate: number
  nudgeX: number
  nudgeY: number
}

export const FUN_FACTS: readonly FunFact[] = [
  { text: 'I love cuddling with my dog, Namu', emoji: '🐕', rotate: -2.5, nudgeX: 0, nudgeY: 2 },
  {
    text: "You'd most likely find me at a movie theater on weekends",
    emoji: '🎬',
    rotate: 2.8,
    nudgeX: 6,
    nudgeY: -2,
  },
  { text: 'Baseball fan — the serious kind', emoji: '⚾', rotate: -1.8, nudgeX: -4, nudgeY: 1 },
  {
    text: 'Watermelon and peaches can genuinely turn my whole day around',
    emoji: '🍉',
    rotate: 3,
    nudgeX: 3,
    nudgeY: -3,
  },
  {
    text: 'Trypophobia is real, and it terrifies me more than any horror movie',
    emoji: '😨',
    rotate: -2.2,
    nudgeX: -2,
    nudgeY: 2,
  },
  { text: 'Fast walker, happy life', emoji: '🚶', rotate: 1.6, nudgeX: 5, nudgeY: -1 },
]

export const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Résumé (PDF)', href: '/resume.pdf' },
] as const
