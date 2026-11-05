import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { CONTACT_EMAIL } from '../content'

type ContactSayHiProps = {
  className?: string
}

export function ContactSayHi({ className = '' }: ContactSayHiProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const titleId = useId()
  const messageId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

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
        className={`inline-flex items-center rounded-full border-[1.5px] border-ink bg-ink px-6 py-3 font-serif text-sm font-bold tracking-wide text-cream uppercase shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[colors,box-shadow] hover:bg-cream hover:text-ink hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Say hi
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-8">
          <button
            type="button"
            className="absolute inset-0 bg-ink/70"
            aria-label="Close contact popup"
            onClick={close}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-md border-[1.5px] border-ink bg-cream p-6 text-ink shadow-[0_24px_64px_-12px_rgba(0,0,0,0.55)] sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id={titleId}
                  className="font-display text-[1.65rem] !leading-[1.15] !tracking-[0.02em]"
                >
                  Say hi
                </p>
                <p className="mt-2 font-sans text-[0.9rem] body-copy text-mute">
                  Drop a note anytime — I read every email.
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="grid size-11 shrink-0 place-items-center border border-ink bg-ink font-sans text-lg leading-none text-cream transition-colors hover:bg-accent hover:text-ink"
                aria-label="Close"
                onClick={close}
              >
                ×
              </button>
            </div>

            <div className="mt-6">
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-mute uppercase">
                Email
              </p>
              <div className="mt-1.5 flex items-center gap-1">
                <p className="select-all font-sans text-[1.35rem] font-medium leading-none text-ink underline decoration-accent decoration-[2px] underline-offset-[5px]">
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
              className="mt-4 inline-flex border border-ink bg-ink px-4 py-2.5 font-serif text-sm font-bold tracking-wide text-cream uppercase transition-colors hover:bg-accent hover:text-ink"
            >
              Open in mail app
            </a>
          </div>
        </div>
      )}
    </>
  )
}
