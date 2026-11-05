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
  const closeRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setCopied(false)
  }, [])

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
                className="grid size-9 shrink-0 place-items-center border border-ink bg-ink font-sans text-lg leading-none text-cream transition-colors hover:bg-accent hover:text-ink"
                aria-label="Close"
                onClick={close}
              >
                ×
              </button>
            </div>

            <div className="mt-6 border border-ink/15 bg-cream px-4 py-3">
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-mute uppercase">
                Email
              </p>
              <a
                href={mailHref}
                className="mt-1.5 block font-sans text-[1.05rem] font-medium text-ink underline decoration-accent decoration-[2px] underline-offset-[5px] transition-colors hover:text-ink/80"
              >
                {CONTACT_EMAIL}
              </a>
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

            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                type="button"
                className="border border-ink bg-ink px-4 py-2.5 font-serif text-sm font-bold tracking-wide text-cream uppercase transition-colors hover:bg-accent hover:text-ink"
                onClick={() => void copyEmail()}
              >
                {copied ? 'Copied' : 'Copy email'}
              </button>
              <a
                href={mailHref}
                className="border border-ink bg-cream px-4 py-2.5 font-serif text-sm font-bold tracking-wide text-ink uppercase transition-colors hover:bg-accent"
              >
                Open mail
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
