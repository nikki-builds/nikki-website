/** Cutout photographer over the yellow hero slab. */
export function HeroPortrait() {
  return (
    <svg
      viewBox="0 0 480 780"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <g fill="#111111">
        {/* camera bag */}
        <ellipse cx="78" cy="560" rx="62" ry="82" />
        <path d="M48 512c22-36 62-40 88-16" stroke="#111" strokeWidth="11" fill="none" strokeLinecap="round" />
        <rect x="46" y="546" width="64" height="14" rx="2" fill="#ffcb41" />

        {/* strap */}
        <path
          d="M198 268C96 318 62 430 70 548"
          stroke="#111"
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
        />

        {/* jacket / torso */}
        <path d="M156 292c12 18 32 58 36 108 6 72-4 168-18 236h176c2-78 18-168 28-228 8-46 26-86 12-118-44-4-108 2-234 2Z" />

        {/* left arm + hand */}
        <path d="M152 318c-58 42-86 108-90 168-2 28 16 44 36 38 18-6 28-28 36-52 14-40 28-70 52-92 6-22-2-42-34-62Z" />
        <ellipse cx="188" cy="250" rx="34" ry="26" />

        {/* right arm + hand */}
        <path d="M330 300c56 22 90 84 102 140 8 38-2 62-26 66-22 4-38-16-48-40-14-34-32-66-58-88 4-28 8-52 30-78Z" />
        <ellipse cx="342" cy="254" rx="32" ry="24" />

        {/* hair */}
        <path d="M198 78c-36 10-62 48-58 102 4 36 22 64 48 80 2-16 8-28 8-28s12 40 48 58c22 10 58 8 80-14 28-28 36-72 28-112-10-52-48-90-98-96-18-2-42 4-56 10Z" />

        {/* neck / lower face */}
        <path d="M236 214c6 28 40 46 70 28 4 20-2 44-18 56-32 8-56-6-64-28 4-18 8-38 12-56Z" />
        <path d="M228 148c10-32 48-46 78-34 22 8 36 28 36 50 0 18-10 32-22 40-8-16-22-22-40-20-16 2-34 14-42 8-4-12-8-28-10-44Z" />

        {/* camera */}
        <rect x="186" y="186" width="168" height="112" rx="16" />
      </g>
      <g>
        <rect x="200" y="200" width="140" height="84" rx="8" fill="#2a2a2a" />
        <circle cx="270" cy="242" r="44" fill="#0c0c0c" />
        <circle cx="270" cy="242" r="30" fill="#3a3a3a" />
        <circle cx="270" cy="242" r="16" fill="#0a0a0a" />
        <circle cx="264" cy="234" r="5" fill="#9ec4d4" opacity="0.85" />
        <rect x="214" y="208" width="32" height="12" rx="2" fill="#ffcb41" />
        <rect x="318" y="208" width="18" height="14" rx="2" fill="#444" />
      </g>
    </svg>
  )
}
