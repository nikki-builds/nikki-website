import { STATS } from '../content'

export function About() {
  return (
    <section id="about" className="bg-ink text-cream" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(7rem,0.22fr)_1fr] lg:gap-6">
          <p className="font-serif text-sm font-bold tracking-wider text-accent uppercase">
            01 / About
          </p>

          <div>
            <h2
              id="about-heading"
              className="font-display text-[clamp(2.6rem,7vw,5.6rem)] uppercase"
            >
              No degree. Ten
              <br />
              thousand
              <br />
              commits.
            </h2>

            <div className="mt-10 grid gap-8 text-[0.98rem] leading-[1.7] text-cream/95 sm:grid-cols-2 sm:gap-12 lg:max-w-4xl">
              <p>
                I taught myself to code by shipping things people actually used —
                first a booking page for a friend&apos;s clinic, then a full
                patient intake flow. Six years later I build production web apps
                for founders and small teams who need someone who can own the
                whole thing: data model, interface, deploy, and the follow-up
                questions nobody planned for.
              </p>
              <p>
                Most of my work now sits near healthtech and applied AI —
                nutrition analysis, clinical intake, retrieval over messy
                documents. I like problems where the interface has to make
                something genuinely complicated feel obvious, and where being
                wrong has a cost.
              </p>
            </div>

            <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-white/15 pt-10 sm:max-w-3xl sm:gap-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none text-white">
                    {stat.value}
                    <span className="text-accent">{stat.suffix}</span>
                  </dd>
                  <p className="mt-3 font-sans text-[0.7rem] font-semibold tracking-[0.14em] text-cream uppercase sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
