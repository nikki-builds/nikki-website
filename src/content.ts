export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = 'hero' | 'about' | 'skills' | 'work' | 'contact'

export type Project = {
  index: string
  title: string
  highlight?: string
  description: string
  meta: string
  tags: readonly string[]
  cta: string
  href: string
  caption: string
}

export const PROJECTS: readonly Project[] = [
  {
    index: '01',
    title: 'RecipeLens',
    highlight: 'Lens',
    description:
      'Photograph a plate — or a recipe card — and get a structured nutrient breakdown. Vision extraction, USDA matching, and a log you can actually keep.',
    meta: 'Vision extraction · nutrient matching · Next.js + Postgres / Designed, built and shipped solo.',
    tags: ['Web App', 'Healthtech', 'Claude Vision', 'Solo build'],
    cta: 'Visit site',
    href: '#contact',
    caption: 'RecipeLens — app screenshot',
  },
  {
    index: '02',
    title: 'Intake Flow',
    description:
      'Patient intake for a three-clinic physio practice. Consent, insurance, and history that used to live in a clipboard now land in the chart before the appointment starts.',
    meta: 'Consent, audit trail, clinic routing · React + Node / Freelance, eight weeks.',
    tags: ['Web App', 'Healthtech', 'Forms at scale'],
    cta: 'Case study',
    href: '#contact',
    caption: 'Intake Flow — screenshot',
  },
  {
    index: '03',
    title: 'Ledger Notes',
    description:
      "Retrieval over five years of a supplement brand's regulatory correspondence, so their team can answer compliance questions in seconds with citations.",
    meta: 'RAG · pgvector · eval suite in CI\nFreelance, six weeks.',
    tags: ['Web App', 'Applied AI', 'RAG'],
    cta: 'Case study',
    href: '#contact',
    caption: 'Ledger Notes — screenshot',
  },
]

export const SKILL_COLUMNS = [
  {
    title: 'Web app development',
    accent: false,
    items: [
      'React · Next.js · TypeScript',
      'Postgres, schema & migrations',
      'AI features, RAG, vision APIs',
      'Auth, payments, webhooks',
      'Design systems, motion, a11y',
      'Vercel · Fly.io · Supabase',
    ],
  },
  {
    title: 'Website builds',
    accent: true,
    items: [
      'Webflow design & build',
      'CMS the client can edit',
      'Marketing sites & landing pages',
      'Handoff without a codebase',
    ],
  },
] as const

export const SKILL_TAGS = [
  'HIPAA-aware builds',
  'Solo delivery',
  'Fixed-scope sprints',
  'Webflow handoff',
] as const

export const STATS = [
  { value: '6', suffix: '+', label: 'Years shipping' },
  { value: '30', suffix: '+', label: 'Client projects' },
  { value: '100', suffix: '%', label: 'Self-taught' },
] as const

export const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Read.cv', href: 'https://read.cv' },
  { label: 'Résumé (PDF)', href: '/resume.pdf' },
] as const
