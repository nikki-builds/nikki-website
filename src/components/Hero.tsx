import { HeroPortrait } from './HeroPortrait'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-x-clip bg-cream"
      aria-label="Introduction"
    >
      <div className="mx-auto grid min-h-[calc(100svh-var(--header-h,8rem))] max-w-[1400px] items-center gap-10 px-5 pb-16 pt-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-12 lg:pb-10 lg:pt-0">
        <div className="relative z-10 max-w-xl lg:max-w-none">
          <h1 className="font-display flex flex-col gap-2 text-[clamp(3rem,8vw,6rem)] !leading-[1.32] text-ink">
            <span>Hi,</span>
            <span>
              I&apos;m <span className="highlight uppercase">Nikki</span>
            </span>
            <span>
              I build{' '}
              <span className="whitespace-nowrap">
                on the <span className="highlight uppercase">web</span>
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-md border-l-[3px] border-accent pl-5 font-sans text-[0.98rem] leading-relaxed text-ink sm:text-[1.05rem]">
            Production web apps for founders and small teams — healthtech,
            applied AI, and the unglamorous systems in between. I own the data
            model, the interface, and the deploy.
          </p>

          <a
            href="#work"
            className="mt-10 inline-flex items-center bg-ink px-8 py-3.5 font-serif text-sm font-bold tracking-wide text-white uppercase transition-transform hover:-translate-y-0.5"
          >
            See the work
          </a>
        </div>

        <div className="relative mx-auto h-[min(72vh,640px)] w-full max-w-[420px] lg:mx-0 lg:h-[min(78vh,720px)] lg:max-w-none">
          <div
            className="absolute top-[6%] right-[8%] bottom-0 left-[22%] bg-accent"
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 -left-[8%] right-0 lg:-left-[14%]">
            <HeroPortrait />
          </div>
        </div>
      </div>
    </section>
  )
}
