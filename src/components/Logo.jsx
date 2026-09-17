export default function Logo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="acadmyBIOLOGY"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7B9A5E" />
          <stop offset="100%" stopColor="#2D5016" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#logoGrad)" />
      <path
        d="M14 42 Q32 36 50 42 L50 46 Q32 40 14 46 Z"
        fill="#FAF8F3"
        opacity="0.95"
      />
      <path
        d="M22 16 Q32 24 42 16 M22 24 Q32 32 42 24 M22 32 Q32 40 42 32"
        stroke="#FAF8F3"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path d="M42 14 Q52 14 50 24 Q44 26 42 20 Z" fill="#A8C69F" />
    </svg>
  )
}
