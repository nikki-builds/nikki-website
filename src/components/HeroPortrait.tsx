/** Editorial cutout of a photographer — sits over the yellow hero slab. */
export function HeroPortrait() {
  return (
    <svg
      viewBox="0 0 520 820"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <title>Photographer with camera</title>
      {/* Bag — overlaps cream */}
      <ellipse cx="92" cy="548" rx="58" ry="78" fill="#2a241c" />
      <path d="M70 490c18-28 48-32 70-18" stroke="#111" strokeWidth="8" strokeLinecap="round" />
      <rect x="58" y="530" width="68" height="18" rx="3" fill="#c9a227" />

      {/* Strap */}
      <path
        d="M210 250c-90 40-130 160-128 250"
        stroke="#1a1a1a"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* Torso / jacket */}
      <path
        d="M168 300c8 20 22 48 28 92 8 58 6 130-8 198h168c-4-72 10-150 22-210 8-40 28-78 18-108-38-8-92-12-228 28Z"
        fill="#2f3a28"
      />
      <path
        d="M196 390c20 8 48 10 74 4 18-4 40-16 52-10l8 90c-24 14-70 22-118 8l-16-92Z"
        fill="#3d4d33"
      />
      <path d="M188 318c40-6 110-18 150 6 6 28-8 54-22 64-40-16-92-12-128-4-4-22 0-48 0-66Z" fill="#454f3c" />

      {/* Left arm */}
      <path
        d="M160 330c-48 36-70 88-78 140-4 28 8 42 28 40 14-2 24-16 32-36 12-28 22-54 40-72 8-8 14-22 12-36-18-14-28-24-34-36Z"
        fill="#c4a07a"
      />
      <path d="M148 328c-10 8-18 22-16 36 12 8 28 14 40 8-4-16-8-32-24-44Z" fill="#2f3a28" />

      {/* Right arm */}
      <path
        d="M338 300c48 20 78 70 92 120 10 36 4 58-18 64-20 4-34-12-44-34-14-30-28-58-50-78-6-20 4-40 20-72Z"
        fill="#c4a07a"
      />
      <path d="M330 292c18 6 36 18 44 34-8 12-22 18-38 16-6-16-8-34-6-50Z" fill="#2f3a28" />

      {/* Hands on camera */}
      <ellipse cx="196" cy="248" rx="32" ry="24" fill="#c4a07a" />
      <ellipse cx="348" cy="252" rx="30" ry="22" fill="#c4a07a" />

      {/* Camera body */}
      <rect x="198" y="188" width="158" height="108" rx="14" fill="#121212" />
      <rect x="210" y="200" width="134" height="84" rx="8" fill="#1c1c1c" />
      {/* Lens */}
      <circle cx="278" cy="242" r="46" fill="#0a0a0a" />
      <circle cx="278" cy="242" r="34" fill="#2a2a2a" />
      <circle cx="278" cy="242" r="22" fill="#111" />
      <circle cx="278" cy="242" r="12" fill="#3a4a5a" />
      <circle cx="272" cy="234" r="5" fill="#8ab4c8" opacity="0.7" />
      {/* Viewfinder / flash */}
      <rect x="318" y="196" width="28" height="18" rx="3" fill="#2c2c2c" />
      <rect x="220" y="196" width="36" height="14" rx="2" fill="#ffcb41" />
      <circle cx="330" cy="268" r="8" fill="#444" />

      {/* Hair */}
      <path
        d="M214 86c-20 8-42 40-40 86 2 28 12 48 28 62 4-20 8-28 8-28s8 36 38 52c12 6 48 10 70-8 28-22 34-62 30-96-6-48-36-76-78-80-22-2-44 4-56 12Z"
        fill="#1a120c"
      />
      <path
        d="M248 78c32-8 70 4 84 36 10 24 8 52-6 74-4-30-18-48-40-58-20-8-40-6-52 4 2-22 6-44 14-56Z"
        fill="#2a1c14"
      />

      {/* Face peeking around camera */}
      <path
        d="M236 150c8-28 40-40 68-32 18 6 32 22 34 42 2 16-4 28-14 36-8-18-22-22-40-20-16 2-32 12-40 8-4-10-6-22-8-34Z"
        fill="#d2b08a"
      />
      <path d="M300 168c8 2 16 8 18 16-10 6-22 8-32 4 2-8 6-16 14-20Z" fill="#c4a07a" />

      {/* Neck */}
      <path d="M250 230c8 28 36 36 58 20 2 18-4 36-16 44-28 4-48-8-54-28 4-12 8-24 12-36Z" fill="#c4a07a" />
    </svg>
  )
}
