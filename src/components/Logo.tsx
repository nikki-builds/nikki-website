import { useId, useLayoutEffect, useRef, useState } from 'react'

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

export function Logo({ inverted = false, size = 84 }: LogoProps) {
  const uid = useId().replace(/:/g, '')
  const ringId = `logo-ring-${uid}`
  const measureRef = useRef<SVGSVGElement>(null)
  const [layout, setLayout] = useState<RingLayout | null>(null)
  const text = inverted ? '#f6f5f1' : '#000000'

  useLayoutEffect(() => {
    let cancelled = false

    const updateLayout = () => {
      if (cancelled || !measureRef.current) return
      const nextLayout = measureRingLayout(measureRef.current)
      if (nextLayout) setLayout(nextLayout)
    }

    void document.fonts.ready.then(updateLayout)
    updateLayout()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <a
      href="#hero"
      className="group relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
      aria-label="Nikki — home"
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

      <div className="animate-logo col-start-1 row-start-1 h-full w-full">
        <div className="logo-ring-flick h-full w-full">
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
      </div>
      <span className="col-start-1 row-start-1 grid size-[58%] place-items-center rounded-full bg-accent transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-[1.65rem] leading-none text-ink">N</span>
      </span>
      <span
        className="pointer-events-none absolute top-1/2 left-[calc(100%+0.35rem)] -translate-y-1/2 font-sans text-[0.65rem] tracking-[0.08em] text-mute uppercase opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
        aria-hidden="true"
      >
        Home
      </span>
    </a>
  )
}
