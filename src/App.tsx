import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Work } from './components/Work'
import type { SectionId } from './content'

const SECTION_IDS: readonly SectionId[] = ['hero', 'about', 'skills', 'work', 'contact']

function isSectionId(id: string | undefined): id is SectionId {
  return id !== undefined && (SECTION_IDS as readonly string[]).includes(id)
}

export default function App() {
  const [active, setActive] = useState<SectionId>('hero')
  const headerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return
    const apply = () => {
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`)
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(header)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const update = () => {
      const header = headerRef.current
      const y = (header?.getBoundingClientRect().bottom ?? 120) + 2
      const hit = document.elementFromPoint(window.innerWidth / 2, y)
      const id = hit?.closest('section')?.id
      if (isSectionId(id)) setActive(id)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-accent focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Header ref={headerRef} active={active} />
      <main className="pt-[var(--header-h,8rem)]">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Contact />
      </main>
    </>
  )
}
