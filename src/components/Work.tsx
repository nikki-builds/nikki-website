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
  videoSrc,
  posterSrc,
  reduce,
  label,
}: {
  caption: string
  imageSrc?: string
  imageAlt?: string
  videoSrc?: string
  posterSrc?: string
  reduce: boolean
  /** Small tag in the corner that says where a click goes. Always shown on touch screens, on hover on large ones. */
  label?: string
}) {
  const showVideo = Boolean(videoSrc) && !reduce
  const stillSrc = videoSrc ? (posterSrc ?? imageSrc) : imageSrc
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden border-[1.5px] border-cream bg-[#e4e2dc] transition-[border-color,box-shadow] duration-300 group-hover:border-accent group-hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.55)] group-focus-visible:border-accent group-focus-visible:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.55)]">
      {label && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-3 right-3 z-10 bg-ink px-3 py-2 font-sans text-[0.7rem] font-bold tracking-[0.1em] text-cream uppercase transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
        >
          {label}
        </span>
      )}
      {showVideo ? (
        <video
          src={videoSrc}
          poster={posterSrc ?? imageSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : stillSrc ? (
        <img src={stillSrc} alt={imageAlt ?? ''} className="absolute inset-0 h-full w-full object-cover" />
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
                  href={project.caseStudyReady ? project.href : project.liveUrl}
                  {...(project.caseStudyReady ? {} : { target: '_blank', rel: 'noreferrer' })}
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
                      className="border border-white/30 px-3 py-1.5 font-sans text-[0.68rem] font-semibold tracking-[0.12em] text-cream/85 uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                {project.caseStudyReady && (
                  <a
                    href={project.href}
                    className="mt-8 inline-flex min-h-11 items-center gap-2 font-sans text-[0.95rem] font-semibold text-cream underline decoration-white/40 decoration-[1.5px] underline-offset-[6px] transition-colors hover:decoration-cream"
                  >
                    How I built it <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                aria-label={`Try ${project.title} live (opens in a new tab)`}
              >
                <ProjectImagePlaceholder
                  caption={project.caption}
                  imageSrc={project.imageSrc}
                  imageAlt={project.imageAlt}
                  videoSrc={project.videoSrc}
                  posterSrc={project.posterSrc}
                  reduce={reduce}
                  label="Try it live ↗"
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
