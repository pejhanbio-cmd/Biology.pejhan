export default function LeafDecor({ style, size = 120, flip = false }) {
  return (
    <svg
      className="leaf-decor"
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...style,
        transform: `${style?.transform || ''} ${flip ? 'scaleX(-1)' : ''}`.trim()
      }}
      aria-hidden="true"
    >
      <path
        d="M50 5 L50 135"
        stroke="#2D5016"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M50 5 C20 40 15 90 50 135 C85 90 80 40 50 5 Z"
        fill="#7B9A5E"
        opacity="0.85"
      />
      <path
        d="M50 30 L32 45 M50 30 L68 45
           M50 55 L28 72 M50 55 L72 72
           M50 80 L32 95 M50 80 L68 95
           M50 105 L38 118 M50 105 L62 118"
        stroke="#2D5016"
        strokeWidth="1"
        fill="none"
        opacity="0.35"
        strokeLinecap="round"
      />
      <path
        d="M42 25 Q45 35 44 55"
        stroke="#FAF8F3"
        strokeWidth="1.2"
        fill="none"
        opacity="0.25"
        strokeLinecap="round"
      />
    </svg>
  )
}
