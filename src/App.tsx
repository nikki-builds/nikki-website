import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Work } from './components/Work'
import type { SectionId } from './content'

const SECTION_IDS: SectionId[] = ['hero', 'about', 'skills', 'work', 'contact']

export default function App() {
  const [active, setActive] = useState<SectionId>('hero')

  useEffect(() => {
    const update = () => {
      const header = document.querySelector('header')
      const probe = (header?.getBoundingClientRect().height ?? 120) + 8
      let current: SectionId = 'hero'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= probe) current = id
      }
      setActive(current)
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
      <main>
        <div className="bg-cream">
          <Header active={active} tone="cream" />
          <Hero />
        </div>
        <div className="bg-ink">
          <Header active={active} tone="ink" />
          <About />
          <Skills />
        </div>
        <div className="bg-cream">
          <Header active={active} tone="cream" />
          <Work />
        </div>
        <div className="flex min-h-svh flex-col bg-accent">
          <Header active={active} tone="accent" />
          <Contact />
        </div>
      </main>
    </>
  )
}
