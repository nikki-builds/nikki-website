import { PROJECTS } from '../content'

function StripeFrame({ caption }: { caption: string }) {
  return (
    <div className="relative aspect-[16/11] w-full border-[1.5px] border-ink bg-[#e4e2dc]">
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
    </div>
  )
}

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
      <span className="highlight">{title.slice(idx, idx + highlight.length)}</span>
      {title.slice(idx + highlight.length)}
    </>
  )
}

export function Work() {
  return (
    <section id="work" className="bg-cream text-ink" aria-labelledby="work-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex items-end justify-between gap-6 border-b border-ink pb-4">
          <h2
            id="work-heading"
            className="font-display text-[clamp(2.4rem,8vw,5.8rem)] uppercase"
          >
            Selected work
          </h2>
          <p className="mb-1 shrink-0 font-serif text-sm font-bold tracking-wide uppercase sm:text-base">
            03 / Projects
          </p>
        </div>

        <ul>
          {PROJECTS.map((project, i) => (
            <li
              key={project.index}
              className={`grid gap-8 py-12 lg:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:py-14 ${
                i < PROJECTS.length - 1 ? 'border-b border-black/15' : ''
              }`}
            >
              <p className="font-display text-2xl sm:text-3xl">{project.index}/</p>

              <div className="max-w-xl">
                <h3 className="font-display text-[clamp(2rem,5vw,3.6rem)] uppercase">
                  <HighlightTitle title={project.title} highlight={project.highlight} />
                </h3>
                <p className="mt-5 font-sans text-[0.98rem] leading-relaxed text-ink">
                  {project.description}
                </p>
                <p className="mt-4 whitespace-pre-line font-sans text-[0.8rem] leading-relaxed text-mute">
                  {project.meta}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm bg-forest px-3 py-1.5 font-sans text-[0.68rem] font-semibold tracking-[0.12em] text-white uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.href}
                  className="mt-8 inline-block font-serif text-sm font-bold tracking-wide uppercase underline decoration-accent decoration-[3px] underline-offset-[6px]"
                >
                  {project.cta} →
                </a>
              </div>

              <StripeFrame caption={project.caption} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
