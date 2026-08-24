import { SOCIAL } from '../content'

export function Contact() {
  return (
    <section
      id="contact"
      className="flex flex-1 flex-col bg-accent text-ink"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto flex w-full max-w-[1400px] min-h-[calc(100svh-6.5rem)] flex-1 flex-col px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-1 flex-col justify-center py-8 lg:py-12">
          <h2
            id="contact-heading"
            className="max-w-5xl font-display text-[clamp(2.6rem,9vw,6.4rem)] uppercase"
          >
            Got something
            <br />
            worth building?
          </h2>
          <p className="mt-8 max-w-xl font-sans text-[1.05rem] leading-relaxed">
            Taking on two freelance projects for the next quarter. Web apps, AI
            features, healthtech-adjacent products — tell me what&apos;s in the
            way.
          </p>
          <a
            href="mailto:hello@nikkibuilds.dev"
            aria-label="hello@nikkibuilds.dev"
            className="mt-12 inline-flex w-fit items-baseline font-display text-[clamp(1.35rem,4.5vw,3.15rem)] uppercase decoration-ink decoration-[3px] underline-offset-8 hover:underline"
          >
            hello
            <span className="font-sans font-extrabold">@</span>
            nikkibuilds.dev
          </a>
        </div>

        <footer className="mt-auto border-t border-ink pt-6 pb-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:underline hover:decoration-2 hover:underline-offset-4"
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-sans text-[0.72rem] font-semibold tracking-[0.12em] uppercase">
              © 2026 Nikki • Built from scratch
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
