import { FunFacts } from './FunFacts'

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
              className="font-display text-[clamp(2.6rem,7vw,5.6rem)] !leading-[1.18] !tracking-[0.02em]"
            >
              Web apps,
              <br />
              built with care.
            </h2>

            <div className="mt-10 grid gap-8 text-[0.98rem] leading-[1.85] tracking-[0.04em] text-cream/95 sm:grid-cols-2 sm:gap-12 lg:max-w-4xl">
              <p>
                I started in nutrition and dietetics, then taught myself to code
                — building small tools that people actually used until it turned
                into a full-time thing. Now I build production web apps for
                founders and small teams who need someone to own the whole
                thing: data model, interface, and deploy.
              </p>
              <p>
                I work in two lanes: custom web apps — AI features, databases,
                real backend logic — for products that need more than a website
                can do. And Webflow builds for founders who want a marketing
                site they can update themselves without touching code.
              </p>
            </div>

            <FunFacts />
          </div>
        </div>
      </div>
    </section>
  )
}
