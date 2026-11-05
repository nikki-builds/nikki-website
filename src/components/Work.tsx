import { motion, useReducedMotion } from 'framer-motion'
import { PROJECTS } from '../content'
import { fadeUp, inViewOnce } from '../lib/motion'

const titleClassName =
  'font-display text-[clamp(2rem,5vw,3.6rem)] uppercase !leading-[1.12] !tracking-[0.01em] text-cream transition-[letter-spacing] duration-300 ease-out group-hover:!tracking-[0.03em] group-focus-visible:!tracking-[0.03em]'

function HighlightTitle({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight) {
    return <>{title}</>
  }
  const idx = title.toLowerCase().indexOf(highlight.toLowerCase())
  if (idx === -1) {
    return <>{title}</>
  }
  return (
    <>
      {title.slice(0, idx)}
      <span className="highlight text-ink">{title.slice(idx, idx + highlight.length)}</span>
      {title.slice(idx + highlight.length)}
    </>
  )
}

function ProjectImagePlaceholder({
  caption,
  imageSrc,
  imageAlt,
}: {
  caption: string
  imageSrc?: string
  imageAlt?: string
}) {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden border-[1.5px] border-cream bg-[#e4e2dc] transition-[border-color,box-shadow] duration-300 group-hover:border-accent group-hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.55)] group-focus-visible:border-accent group-focus-visible:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.55)]">
      {imageSrc ? (
        <img src={imageSrc} alt={imageAlt ?? ''} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, #eceae4 0 10px, #f3f1eb 10px 20px)',
            }}
            aria-hidden="true"
          />
          <p className="absolute bottom-3 left-3 font-sans text-[0.65rem] tracking-wide text-[#9a9892] uppercase">
            {caption}
          </p>
        </>
      )}
    </div>
  )
}

export function Work() {
  const reduce = Boolean(useReducedMotion())

  return (
    <section id="work" className="bg-ink text-cream" aria-labelledby="work-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex items-end justify-between gap-6 border-b border-cream pb-4">
          <h2
            id="work-heading"
            className="font-display text-[clamp(2.4rem,8vw,5.8rem)] !leading-[1.12] !tracking-[0.02em]"
          >
            Selected work
          </h2>
          <p className="mb-1 shrink-0 font-serif text-sm font-bold tracking-wide text-accent uppercase sm:text-base">
            03 / Projects
          </p>
        </div>

        <ul>
          {PROJECTS.map((project, i) => (
            <motion.li
              key={project.index}
              variants={fadeUp}
              initial={reduce ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ ...inViewOnce, amount: 0.2 }}
              className={`grid gap-8 py-12 lg:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:py-14 ${
                i < PROJECTS.length - 1 ? 'border-b border-white/15' : ''
              }`}
            >
              <p className="font-display text-2xl sm:text-3xl">{project.index}/</p>

              <div className="max-w-xl">
                <a
                  href={project.href}
                  className="group block w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <h3 className={titleClassName}>
                    <HighlightTitle title={project.title} highlight={project.highlight} />
                  </h3>
                </a>
                <p className="mt-5 font-sans text-[0.98rem] body-copy text-cream">
                  {project.description}
                </p>
                <p className="mt-4 whitespace-pre-line font-sans text-[0.8rem] body-copy text-[#a8a8a8]">
                  {project.meta}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm bg-accent px-3 py-1.5 font-sans text-[0.68rem] font-semibold tracking-[0.12em] text-ink uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={project.href}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                aria-label={`View ${project.title} case study`}
              >
                <ProjectImagePlaceholder
                  caption={project.caption}
                  imageSrc={project.imageSrc}
                  imageAlt={project.imageAlt}
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
