import { SKILL_COLUMNS, SKILL_TAGS } from '../content'

export function Skills() {
  return (
    <section id="skills" className="bg-ink text-cream" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:pb-28 lg:pt-8">
        <div className="relative mb-14 lg:mb-20">
          <p className="font-serif text-sm font-bold tracking-wider text-accent uppercase lg:absolute lg:top-3 lg:left-0">
            02 / Skills
          </p>
          <h2
            id="skills-heading"
            className="font-display text-center text-[clamp(3rem,10vw,7.5rem)] uppercase"
          >
            What I do
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {SKILL_COLUMNS.map((col) => (
            <article
              key={col.title}
              className={`flex min-h-[280px] flex-col px-7 py-8 ${
                col.accent ? 'bg-accent text-ink' : 'bg-charcoal text-cream'
              }`}
            >
              <h3
                className={`font-serif text-xl font-black tracking-wide ${
                  col.accent ? 'text-ink' : 'text-white'
                }`}
              >
                {col.title}
              </h3>
              <ul className="mt-8 flex flex-col gap-3.5 font-sans text-[0.95rem] leading-snug">
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap gap-3">
          {SKILL_TAGS.map((tag) => (
            <li
              key={tag}
              className="border border-accent px-4 py-2 font-sans text-[0.72rem] font-semibold tracking-[0.12em] text-accent uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
