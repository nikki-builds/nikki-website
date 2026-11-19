import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { CONTACT_EMAIL } from '../content'

type ContactSayHiProps = {
  className?: string
  /** What the trigger button says. */
  label?: ReactNode
  /** Replaces the default pill styling of the trigger. */
  triggerClassName?: string
}

export function ContactSayHi({ className = '', label = 'Say hi', triggerClassName }: ContactSayHiProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const titleId = useId()
  const messageId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const reduce = Boolean(useReducedMotion())

  const close = useCallback(() => {
    setOpen(false)
    setCopied(false)
  }, [])

  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus()
    wasOpen.current = open
  }, [open])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const mailHref = message.trim()
    ? `mailto:${CONTACT_EMAIL}?body=${encodeURIComponent(message.trim())}`
    : `mailto:${CONTACT_EMAIL}`

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClassName ?? `inline-flex items-center rounded-full border-[1.5px] border-ink bg-ink px-6 py-3 font-sans text-sm font-bold tracking-wide text-cream uppercase shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[colors,box-shadow] hover:bg-cream hover:text-ink hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>

      {/* Rendered into <body> so a moving or rotated parent (the hero card, the floating button)
          can't trap the popup inside itself. */}
      {open &&
        createPortal(
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-8">
          <motion.button
            type="button"
            className="absolute inset-0 bg-ink/70"
            aria-label="Close contact popup"
            onClick={close}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          />

          {/* Same landing as the hero card: drops in tilted, pounds flat, ends straight. */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduce ? false : { y: -280, rotate: -9, scale: 1.06, opacity: 0 }}
            animate={{ y: 0, rotate: 0, scale: 1, opacity: 1 }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    y: { type: 'spring', stiffness: 520, damping: 24, mass: 1.1 },
                    rotate: { type: 'spring', stiffness: 420, damping: 30 },
                    scale: { type: 'spring', stiffness: 520, damping: 28 },
                    opacity: { duration: 0.12 },
                  }
            }
            className="relative z-10 w-full max-w-md origin-bottom overflow-hidden rounded-[6px] bg-cream text-ink shadow-[0_24px_64px_-12px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-start justify-between gap-4 bg-accent p-6 sm:p-7">
              <div>
                <p
                  id={titleId}
                  className="font-display text-[1.65rem] !leading-[1.15] !tracking-[0.02em]"
                >
                  Got an idea?
                  <span className="block">Tell me more.</span>
                </p>
                <p className="mt-2 font-sans text-[0.9rem] body-copy text-ink/80">
                  Drop a note anytime — I read every email.
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="grid size-11 shrink-0 place-items-center border border-ink bg-ink font-sans text-lg leading-none text-cream transition-colors hover:bg-cream hover:text-ink"
                aria-label="Close"
                onClick={close}
              >
                ×
              </button>
            </div>

            <div className="p-6 sm:p-7">
            <div>
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-mute uppercase">
                Email
              </p>
              <div className="mt-1.5 flex items-center gap-1">
                <p className="select-all font-sans text-[1.35rem] font-medium leading-none text-ink underline decoration-ink/30 decoration-[2px] underline-offset-[5px]">
                  {CONTACT_EMAIL}
                </p>
                <button
                  type="button"
                  className="grid size-11 shrink-0 place-items-center text-ink transition-colors hover:text-ink/70"
                  aria-label="Copy email address"
                  onClick={() => void copyEmail()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <rect x="9" y="9" width="11" height="11" />
                    <path d="M5 15V5h10" />
                  </svg>
                </button>
                {copied && (
                  <span className="font-sans text-sm text-mute" role="status">
                    Copied
                  </span>
                )}
              </div>
            </div>

            <label htmlFor={messageId} className="mt-4 block">
              <span className="font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-mute uppercase">
                Message
              </span>
              <textarea
                id={messageId}
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="What are you building?"
                className="mt-1.5 w-full resize-y border border-ink/20 bg-cream px-3 py-2.5 font-sans text-[0.95rem] text-ink placeholder:text-mute/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              />
            </label>

            <a
              href={mailHref}
              className="mt-4 inline-flex border border-ink bg-ink px-4 py-2.5 font-sans text-sm font-bold tracking-wide text-cream uppercase transition-colors hover:bg-cream hover:text-ink"
            >
              Open in mail app
            </a>
            </div>
          </motion.div>
        </div>
        , document.body)}
    </>
  )
}
