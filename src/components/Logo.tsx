import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'

type LogoProps = {
  inverted?: boolean
  size?: number
}

const RING_LABELS = ['NIKKI BUILDS', 'NIKKI CREATES'] as const
const RING_PATH =
  'M 50,50 m -39.5,0 a 39.5,39.5 0 1,1 79,0 a 39.5,39.5 0 1,1 -79,0'
const FONT_SIZE = 8.4
const LETTER_SPACING = 2.4
const DOT_RADIUS = 1.15

type RingLayout = {
  texts: { content: string; offset: number }[]
  dots: { x: number; y: number }[]
}

const ringTextStyle = {
  fontSize: FONT_SIZE,
  fontFamily: 'General Sans, sans-serif',
  fontWeight: 700,
  letterSpacing: LETTER_SPACING,
} as const

function pointOnRing(path: SVGPathElement, offset: number) {
  const point = path.getPointAtLength(offset % path.getTotalLength())
  return { x: point.x, y: point.y }
}

function measureRingLayout(svg: SVGSVGElement): RingLayout | null {
  const path = svg.querySelector<SVGPathElement>('[data-measure-path]')
  if (!path) return null

  const circumference = path.getTotalLength()
  const textLengths = RING_LABELS.map((label) => {
    const node = svg.querySelector<SVGTextElement>(`[data-measure-text="${label}"]`)
    return node?.getComputedTextLength() ?? 0
  })

  if (textLengths.some((length) => length <= 0)) return null

  const dotArc = DOT_RADIUS * 2
  const gapCount = RING_LABELS.length * 2
  const gap =
    (circumference - textLengths.reduce((sum, length) => sum + length, 0) - RING_LABELS.length * dotArc) /
    gapCount

  if (gap <= 0) return null

  const texts: RingLayout['texts'] = []
  const dots: RingLayout['dots'] = []
  let cursor = gap

  for (let index = 0; index < RING_LABELS.length; index += 1) {
    texts.push({ content: RING_LABELS[index], offset: cursor })
    cursor += textLengths[index] + gap

    dots.push(pointOnRing(path, cursor + dotArc / 2))
    cursor += dotArc + gap
  }

  return { texts, dots }
}

/* ---------- Unspool animation ----------
   Think of the ring of letters as a ribbon on a reel. On hover the reel spins round until the two
   dots sit level, then keeps turning and feeds the ribbon out through the top of the ring, along a
   smooth curve, onto a straight line to the right. Every letter follows the same track, so the
   end of "NIKKI CREATES" leaves first (S, E, T, A, E, R, C … back to the first N) and the line
   reads normally once it is out. Reversing the reel winds it back in, first N first. */

type Glyph = {
  ch: string
  dot: boolean
  /** Position along the ring, in arc length from the ring path's start (its leftmost point, going clockwise). */
  arc: number
  /** The closing dot after NIKKI CREATES has no place on the line, so it fades as it leaves. */
  fades: boolean
}

const R = 39.5 // ring radius in viewBox units
const C = 2 * Math.PI * R // ring circumference
const EXIT_TRACK = 'M 50 10.5 C 70 10.5 86 53 112 53 L 900 53' // top of the ring → curve → line
const STRETCH = 1.45 // letters grow and spread by this much on the line (less if space is tight)
const LINE_LEAD = 6 // where the first N lands, past the end of the curve

const OUT_MS = 1700 // spin + feed out, as one continuous move
const HOLD_MS = 1200 // time the line stays readable
const BACK_MS = 1000 // wind back in
const SPIN_PERIOD_MS = 22000 // matches the logo-spin CSS animation

function arcOfPoint(x: number, y: number) {
  // clockwise arc length from the leftmost point of the ring (SVG y points down, so clockwise = increasing angle)
  const ang = Math.atan2(y - 50, x - 50)
  return ((((ang - Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) * R
}

function measureGlyphs(svg: SVGSVGElement, layout: RingLayout): Glyph[] | null {
  const glyphs: Glyph[] = []
  for (let k = 0; k < RING_LABELS.length; k += 1) {
    const label = RING_LABELS[k]
    const node = svg.querySelector<SVGTSpanElement>(`[data-measure-text="${label}"]`)
    const offset = layout.texts[k]?.offset
    if (!node || offset === undefined) return null
    let before = 0
    for (let i = 0; i < label.length; i += 1) {
      const w = node.getSubStringLength(i, 1)
      glyphs.push({ ch: label[i], dot: false, arc: offset + before + w / 2, fades: false })
      before += w
    }
    const dot = layout.dots[k]
    glyphs.push({ ch: '', dot: true, arc: arcOfPoint(dot.x, dot.y), fades: k === RING_LABELS.length - 1 })
  }
  return glyphs
}

// Gentle start, confident middle, soft landing.
const easeInOutSoft = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))
const modC = (v: number) => ((v % C) + C) % C
const smooth = (t: number) => t * t * (3 - 2 * t)

/** The ring's CSS spin animation (so we can read and set exactly where it is). */
function spinAnimation(el: HTMLElement | null) {
  return el?.getAnimations().find((a) => (a as CSSAnimation).animationName === 'logo-spin') ?? null
}

function spinAngleNow(el: HTMLElement | null) {
  const t = spinAnimation(el)?.currentTime
  return typeof t === 'number' ? (t / SPIN_PERIOD_MS) * 360 : 0
}

export function Logo({ inverted = false, size = 84 }: LogoProps) {
  const uid = useId().replace(/:/g, '')
  const ringId = `logo-ring-${uid}`
  const measureRef = useRef<SVGSVGElement>(null)
  const spinRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<SVGSVGElement>(null)
  const trackRef = useRef<SVGPathElement>(null)
  const glyphRefs = useRef<(SVGGraphicsElement | null)[]>([])
  const [layout, setLayout] = useState<RingLayout | null>(null)
  const [glyphs, setGlyphs] = useState<Glyph[] | null>(null)
  const running = useRef(false)
  const reduce = Boolean(useReducedMotion())
  const text = inverted ? '#f6f5f1' : '#000000'

  useLayoutEffect(() => {
    let cancelled = false

    const updateLayout = () => {
      if (cancelled || !measureRef.current) return
      const nextLayout = measureRingLayout(measureRef.current)
      if (nextLayout) {
        setLayout(nextLayout)
        setGlyphs(measureGlyphs(measureRef.current, nextLayout))
      }
    }

    void document.fonts.ready.then(updateLayout)
    updateLayout()

    return () => {
      cancelled = true
    }
  }, [])

  const play = useCallback(() => {
    const ringEl = spinRef.current
    const overlay = overlayRef.current
    const track = trackRef.current
    if (running.current || reduce || !glyphs || !ringEl || !overlay || !track) return
    running.current = true

    const curveLen = (() => {
      // length of the curve part of the exit track, up to where the straight line begins
      const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      probe.setAttribute('d', 'M 50 10.5 C 70 10.5 86 53 112 53')
      return probe.getTotalLength()
    })()

    // Where everything sits on the track right now. Track position 0 = top of the ring, increasing clockwise.
    const theta0 = spinAngleNow(ringEl)
    const now0 = glyphs.map((g) => modC(g.arc - C / 4 + (theta0 / 360) * C))

    // Line the closing dot up just before the exit: the two dots then sit level, NIKKI BUILDS on top.
    const leadIndex = glyphs.findIndex((g) => g.fades)
    const lead = now0[leadIndex]
    let align = modC(C - 2 - lead)
    if (align < C * 0.35) align += C // always a proper, quick spin first
    // distance of each glyph behind the closing dot, along the ring
    const behind = now0.map((p) => modC(lead - p))
    const firstN = 0 // the first glyph is the N of NIKKI BUILDS: the last to leave

    // Fit the line to the room in the header: it must stop before the nav or the mobile menu button.
    // (measure the link box, not the spinning ring, whose box grows while it is rotated)
    const logoBox = (ringEl.parentElement ?? ringEl).getBoundingClientRect()
    const unit = logoBox.width / 100 // px per viewBox unit
    const header = ringEl.closest('header')
    const blockers = header
      ? Array.from(header.querySelectorAll<HTMLElement>('nav, button')).filter(
          (el) => el.offsetParent !== null && el.getBoundingClientRect().left > logoBox.right,
        )
      : []
    const rightEdge = blockers.length
      ? Math.min(...blockers.map((el) => el.getBoundingClientRect().left)) - 16
      : window.innerWidth - 16
    const roomUnits = (rightEdge - logoBox.left) / unit
    const lastLetter = glyphs.length - 2 // the S of NIKKI CREATES (the closing dot is after it)
    const spanUnits = behind[firstN] - behind[lastLetter] + 4 // first N to last S, at ring size
    const stretch = Math.max(1, Math.min(STRETCH, (roomUnits - 112 - LINE_LEAD) / spanUnits))

    // how far the reel must turn after aligning so that the first N lands at the start of the line
    const landAt = C + (curveLen + LINE_LEAD) / stretch
    const feed = landAt - (C - 2 - behind[firstN])
    const outDistance = align + feed

    const pointAt = (q: number) => {
      // q: distance along the track. Below C: on the ring. Beyond: the curve and line, stretched.
      if (q < C) {
        const ang = -Math.PI / 2 + modC(q) / R
        return { x: 50 + R * Math.cos(ang), y: 50 + R * Math.sin(ang), a: (ang * 180) / Math.PI + 90, beyond: 0 }
      }
      const len = (q - C) * stretch
      const p = track.getPointAtLength(len)
      const p1 = track.getPointAtLength(Math.max(0, len - 0.5))
      const p2 = track.getPointAtLength(len + 0.5)
      return { x: p.x, y: p.y, a: (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI, beyond: q - C }
    }

    const place = (travelled: number) => {
      glyphs.forEach((g, i) => {
        const el = glyphRefs.current[i]
        if (!el) return
        // before alignment the whole ring just turns; after it, each glyph runs on from its spot behind the lead dot
        const q = travelled < align ? now0[i] + travelled : C - 2 - behind[i] + (travelled - align)
        // while only turning, a glyph stays on the ring however far round it goes
        const pt = pointAt(travelled < align || q < C ? modC(q) : q)
        const grow = 1 + (stretch - 1) * smooth(clamp01(pt.beyond / 18))
        if (g.dot) {
          el.setAttribute('transform', `translate(${pt.x} ${pt.y}) scale(${grow})`)
          if (g.fades) el.setAttribute('opacity', String(1 - clamp01(pt.beyond / 14)))
        } else {
          el.setAttribute('transform', `translate(${pt.x} ${pt.y}) rotate(${pt.a}) scale(${grow})`)
        }
      })
    }

    place(0)
    overlay.style.visibility = 'visible'
    ringEl.style.opacity = '0'

    // Start at the speed the ring is already spinning, so there is no stop before it speeds up.
    // (A plain ease-in starts from zero speed, which reads as a little freeze.)
    const spinSpeed = C / SPIN_PERIOD_MS // track units per ms of the normal CSS spin
    const outAt = (t: number) => {
      const u = t / OUT_MS
      return outDistance * easeInOutSoft(u) + spinSpeed * OUT_MS * u * (1 - u) ** 2
    }

    const backStart = OUT_MS + HOLD_MS
    const end = backStart + BACK_MS
    const start = performance.now()
    const tick = (stamp: number) => {
      const t = stamp - start
      if (t >= end) {
        // hand back to the CSS spin at the angle the reel stopped at
        const anim = spinAnimation(ringEl)
        const stopped = theta0 + (align / C) * 360
        if (anim) anim.currentTime = ((((stopped % 360) + 360) % 360) / 360) * SPIN_PERIOD_MS
        ringEl.style.opacity = '1'
        overlay.style.visibility = 'hidden'
        running.current = false
        return
      }
      const travelled =
        t < OUT_MS
          ? outAt(t)
          : t < backStart
            ? outDistance
            : outDistance - feed * easeInOutSoft((t - backStart) / BACK_MS) // wind back in, first N first
      place(travelled)
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [reduce, glyphs])

  // Once on load, everywhere (phones included).
  useEffect(() => {
    if (!glyphs || reduce) return
    const id = window.setTimeout(play, 900)
    return () => window.clearTimeout(id)
  }, [glyphs, reduce, play])

  // Again on hover, only where hover exists.
  const onHover = () => {
    if (window.matchMedia('(hover: hover)').matches) play()
  }

  return (
    <a
      href="#hero"
      className="group relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
      aria-label="Nikki — home"
      onMouseEnter={onHover}
    >
      <svg
        ref={measureRef}
        viewBox="0 0 100 100"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <path data-measure-path d={RING_PATH} />
        {RING_LABELS.map((label) => (
          <text key={label} {...ringTextStyle}>
            <tspan data-measure-text={label}>{label}</tspan>
          </text>
        ))}
      </svg>

      <div ref={spinRef} className="animate-logo col-start-1 row-start-1 h-full w-full">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <defs>
            <path id={ringId} d={RING_PATH} />
          </defs>
          {layout?.texts.map(({ content, offset }) => (
            <text key={content} fill={text} {...ringTextStyle}>
              <textPath href={`#${ringId}`} startOffset={offset}>
                {content}
              </textPath>
            </text>
          ))}
          {layout?.dots.map(({ x, y }, index) => (
            <circle key={index} cx={x} cy={y} r={DOT_RADIUS} fill={text} />
          ))}
        </svg>
      </div>

      {/* The moving letters, placed frame by frame straight on the elements (no React re-render)
          so the motion stays smooth. Hidden except while the animation runs. */}
      <svg
        ref={overlayRef}
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        style={{ visibility: 'hidden' }}
        aria-hidden="true"
      >
        <path ref={trackRef} d={EXIT_TRACK} fill="none" stroke="none" />
        {glyphs?.map((g, i) =>
          g.dot ? (
            <circle
              key={i}
              ref={(el) => {
                glyphRefs.current[i] = el
              }}
              cx={0}
              cy={0}
              r={DOT_RADIUS}
              fill={text}
            />
          ) : (
            <text
              key={i}
              ref={(el) => {
                glyphRefs.current[i] = el
              }}
              fill={text}
              textAnchor="middle"
              style={{ ...ringTextStyle, letterSpacing: 0 }}
            >
              {g.ch}
            </text>
          ),
        )}
      </svg>

      <span className="col-start-1 row-start-1 grid size-[58%] place-items-center rounded-full bg-accent transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-[1.65rem] leading-none text-ink">N</span>
      </span>
    </a>
  )
}
