import { CONTACT_EMAIL, SOCIAL } from '../content'

export function Footer() {
  return (
    <footer id="contact" className="border-t-[1.5px] border-ink bg-cream text-ink" aria-labelledby="footer-heading">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <h2 id="footer-heading" className="font-display text-[1.6rem] !leading-[1.2]">
            Have an idea? Let&apos;s talk.
          </h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex min-h-11 items-center font-sans text-[1.05rem] font-semibold underline decoration-[1.5px] underline-offset-4 hover:decoration-[3px]"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 font-sans text-[0.75rem] font-semibold tracking-[0.14em] uppercase">
          {SOCIAL.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="inline-flex min-h-11 items-center hover:underline hover:decoration-2 hover:underline-offset-4"
                {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-sans text-[0.8rem] text-mute">© 2026 Nikki · New York</p>
      </div>
    </footer>
  )
}
