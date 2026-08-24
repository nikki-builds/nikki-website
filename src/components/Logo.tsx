type LogoProps = {
  inverted?: boolean
  size?: number
}

export function Logo({ inverted = false, size = 84 }: LogoProps) {
  const text = inverted ? '#f6f5f1' : '#000000'

  return (
    <a
      href="#hero"
      className="group relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
      aria-label="Nikki — home"
    >
      <svg
        viewBox="0 0 100 100"
        className="animate-logo col-start-1 row-start-1 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <path
            id="logo-ring"
            d="M 50,50 m -39.5,0 a 39.5,39.5 0 1,1 79,0 a 39.5,39.5 0 1,1 -79,0"
          />
        </defs>
        <text
          fill={text}
          fontSize="8.4"
          fontFamily="Syne, sans-serif"
          fontWeight="700"
          letterSpacing="2.4"
        >
          <textPath href="#logo-ring">NIKKI BUILDS • NIKKI CREATES •</textPath>
        </text>
      </svg>
      <span className="col-start-1 row-start-1 grid size-[58%] place-items-center rounded-full bg-accent transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-[1.65rem] leading-none text-ink">N</span>
      </span>
    </a>
  )
}
