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
    tags: ['Healthtech', 'Claude Vision', 'Solo build'],
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
    tags: ['Healthtech', 'Forms at scale'],
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
    tags: ['Applied AI', 'RAG'],
    cta: 'Case study',
    href: '#contact',
    caption: 'Ledger Notes — screenshot',
  },
]

export const SKILL_COLUMNS = [
  {
    title: 'Frontend',
    accent: false,
    items: [
      'React · Next.js · TypeScript',
      'Design systems & component APIs',
      'CSS architecture, motion, a11y',
      'Data-dense dashboards',
    ],
  },
  {
    title: 'Backend',
    accent: false,
    items: [
      'Node · Python · REST & tRPC',
      'Postgres, schema & migrations',
      'Auth, payments, webhooks',
      'Vercel · Fly.io · Supabase',
    ],
  },
  {
    title: 'Applied AI',
    accent: true,
    items: [
      'LLM features in production',
      'RAG over messy documents',
      'Evals, prompt regression tests',
      'Vision & structured extraction',
    ],
  },
] as const

export const SKILL_TAGS = [
  'HIPAA-aware builds',
  'Solo delivery',
  'Fixed-scope sprints',
  'Handoff docs',
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
