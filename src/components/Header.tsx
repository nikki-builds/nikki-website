import { useEffect, useState } from 'react'
import { NAV_LINKS, type SectionId } from '../content'
import { Logo } from './Logo'

type HeaderProps = {
  active: SectionId
  inverted: boolean
}

export function Header({ active, inverted }: HeaderProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const ink = inverted ? 'text-cream' : 'text-ink'
  const bar = inverted ? 'bg-cream' : 'bg-ink'

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        inverted ? 'bg-ink' : active === 'contact' ? 'bg-accent' : 'bg-cream'
      }`}
    >
      <div className="relative z-50 mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
        <Logo inverted={inverted} size={76} />

        <nav className={`hidden items-center font-serif text-[0.95rem] font-bold tracking-wide uppercase sm:flex ${ink}`} aria-label="Primary">
          {NAV_LINKS.map((link, i) => {
            const isActive = active === link.id
            return (
              <span key={link.id} className="flex items-center">
                {i > 0 && (
                  <span className="px-2.5 font-sans font-semibold opacity-80" aria-hidden="true">
                    /
                  </span>
                )}
                <a
                  href={`#${link.id}`}
                  className={`relative py-1 ${isActive ? 'font-black' : 'font-bold'}`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-[3px] ${bar} transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </a>
              </span>
            )
          })}
        </nav>

        <button
          type="button"
          className={`relative z-50 grid size-11 place-items-center sm:hidden ${ink}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close' : 'Menu'}</span>
          <span className="flex w-6 flex-col gap-1.5" aria-hidden="true">
            <span className={`h-[2px] w-full ${bar} transition-transform ${open ? 'translate-y-[8px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-full ${bar} transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-full ${bar} transition-transform ${open ? '-translate-y-[8px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className={`fixed inset-0 z-40 flex flex-col justify-center px-8 sm:hidden ${
            inverted ? 'bg-ink text-cream' : 'bg-cream text-ink'
          }`}
        >
          <nav className="flex flex-col gap-6 font-serif text-4xl font-black uppercase" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={active === link.id ? 'underline decoration-[3px] underline-offset-8' : ''}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
