import { useEffect, useState } from 'react'
import { ContactSayHi } from './ContactSayHi'

// A "Chat with me" button that follows the page once the hero is out of view,
// and steps aside again when the footer (which has its own contact line) is on screen.
export function FloatingChat() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    const footer = document.getElementById('contact')
    const observers: IntersectionObserver[] = []
    if (hero) {
      const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting))
      io.observe(hero)
      observers.push(io)
    }
    if (footer) {
      const io = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting))
      io.observe(footer)
      observers.push(io)
    }
    return () => observers.forEach((io) => io.disconnect())
  }, [])

  const show = !heroVisible && !footerVisible

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none sm:right-8 sm:bottom-8 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      inert={!show}
    >
      <ContactSayHi
        label={
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
            </svg>
            <span className="sm:hidden">Chat</span>
            <span className="max-sm:hidden">Chat with me</span>
          </>
        }
        triggerClassName="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 font-sans text-[0.75rem] font-bold tracking-[0.08em] text-ink uppercase shadow-[0_1px_2px_rgba(20,16,4,0.08),0_10px_28px_-8px_rgba(20,16,4,0.35)] transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(20,16,4,0.08),0_16px_36px_-8px_rgba(20,16,4,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-5 sm:text-[0.8rem]"
      />
    </div>
  )
}
