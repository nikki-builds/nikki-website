export const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
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
  href: string
  caption: string
  imageSrc?: string
  imageAlt?: string
}

export const PROJECTS: readonly Project[] = [
  {
    index: '01',
    title: 'RecipeLens',
    highlight: 'Lens',
    description:
      'Paste any recipe and get a full nutrition breakdown. AI pulls out the ingredients; the numbers come from a curated, USDA-based food database, not from the AI.',
    meta: 'Ingredient parsing with GPT-4o-mini · USDA-based food database · React + Node + MongoDB / Designed, built and shipped solo.',
    tags: ['Web App', 'Healthtech', 'OpenAI API', 'Solo build'],
    href: '/work/recipelens',
    caption: 'RecipeLens — app screenshot',
    imageSrc: '/assets/images/recipelens-screenshot.webp',
    imageAlt:
      'RecipeLens nutrition analysis of spaghetti carbonara for 4 servings, with total macros and ingredient breakdown',
  },
  {
    index: '02',
    title: 'NutriGPT',
    highlight: 'GPT',
    description:
      "A quick-answer nutrition assistant built to live on a nutrition business's website. Visitors get balance checks, protein estimates, and plain-language answers without leaving the page.",
    meta: 'Applied AI · prompt design & guardrails · React + Node / Solo build.',
    tags: ['Web App', 'Healthtech', 'Applied AI'],
    href: '/work/nutrigpt',
    caption: 'NutriGPT — app screenshot',
    imageSrc: '/assets/images/nutrigpt-screenshot.webp',
    imageAlt:
      'NutriGPT chat suggesting vegetables to balance a turkey sandwich lunch, then estimating about 27 g of protein for that lunch',
  },
  {
    index: '03',
    title: 'Macro Calculator',
    highlight: 'Calculator',
    description:
      'A macro and calorie calculator with a clean, mobile-first flow — set targets, adjust inputs, and see the numbers update in real time.',
    meta: 'Frontend-focused build · React · Vercel / Solo build.',
    tags: ['Web App', 'Healthtech', 'Frontend'],
    href: '/work/macro-calculator',
    caption: 'Macro Calculator — app screenshot',
    imageSrc: '/assets/images/macrocalc-screenshot.png',
    imageAlt: 'Macro Calculator app showing daily macro breakdown',
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
