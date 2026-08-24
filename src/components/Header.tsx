import { useEffect, useId, useState } from 'react'
import { NAV_LINKS, type SectionId } from '../content'
import { Logo } from './Logo'

export type HeaderTone = 'cream' | 'ink' | 'accent'

type HeaderProps = {
  active: SectionId
  tone: HeaderTone
}

const TONE: Record<
  HeaderTone,
  { bg: string; ink: string; bar: string; inverted: boolean; overlay: string }
> = {
  cream: {
    bg: 'bg-cream',
    ink: 'text-ink',
    bar: 'bg-ink',
    inverted: false,
    overlay: 'bg-cream text-ink',
  },
  ink: {
    bg: 'bg-ink',
    ink: 'text-cream',
    bar: 'bg-cream',
    inverted: true,
    overlay: 'bg-ink text-cream',
  },
  accent: {
    bg: 'bg-accent',
    ink: 'text-ink',
    bar: 'bg-ink',
    inverted: false,
    overlay: 'bg-accent text-ink',
  },
}

export function Header({ active, tone }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const navId = useId()
  const t = TONE[tone]

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`sticky top-0 z-50 ${t.bg}`}>
      <div className="relative z-50 mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
        <Logo inverted={t.inverted} size={76} />

        <nav
          className={`hidden items-center font-serif text-[0.95rem] font-bold tracking-wide uppercase sm:flex ${t.ink}`}
          aria-label="Primary"
        >
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
                    className={`absolute inset-x-0 -bottom-0.5 h-[3px] ${t.bar} transition-opacity ${
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
          className={`relative z-50 grid size-11 place-items-center sm:hidden ${t.ink}`}
          aria-expanded={open}
          aria-controls={navId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close' : 'Menu'}</span>
          <span className="flex w-6 flex-col gap-1.5" aria-hidden="true">
            <span className={`h-[2px] w-full ${t.bar} transition-transform ${open ? 'translate-y-[8px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-full ${t.bar} transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-full ${t.bar} transition-transform ${open ? '-translate-y-[8px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open && (
        <div
          id={navId}
          className={`fixed inset-0 z-40 flex flex-col justify-center px-8 sm:hidden ${t.overlay}`}
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
