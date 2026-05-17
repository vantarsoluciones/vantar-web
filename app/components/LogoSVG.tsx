export default function LogoSVG({ className, light = false }: { className?: string; light?: boolean }) {
  const circuitColor = '#00B4CC'
  const bodyFill = light ? '#FFFFFF' : '#1A3A7A'
  const bodyFill2 = light ? 'rgba(255,255,255,0.75)' : '#2A5AB0'

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '36px', height: '36px', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="vGradLogo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bodyFill} />
          <stop offset="100%" stopColor={bodyFill2} />
        </linearGradient>
      </defs>

      {/* V shape */}
      <path
        d="M8 12 L40 68 L72 12 L60 12 L40 50 L20 12 Z"
        fill="url(#vGradLogo)"
      />

      {/* Circuit traces — left arm */}
      <line x1="14" y1="22" x2="22" y2="22" stroke={circuitColor} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22" cy="22" r="2" fill={circuitColor} />
      <line x1="22" y1="22" x2="22" y2="17" stroke={circuitColor} strokeWidth="1.5" strokeLinecap="round" />

      {/* Circuit traces — right arm */}
      <line x1="66" y1="22" x2="58" y2="22" stroke={circuitColor} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="58" cy="22" r="2" fill={circuitColor} />
      <line x1="58" y1="22" x2="58" y2="17" stroke={circuitColor} strokeWidth="1.5" strokeLinecap="round" />

      {/* Circuit traces — center bottom */}
      <line x1="40" y1="56" x2="40" y2="64" stroke={circuitColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="64" x2="44" y2="64" stroke={circuitColor} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="36" cy="64" r="2" fill={circuitColor} />
      <circle cx="44" cy="64" r="2" fill={circuitColor} />
    </svg>
  )
}
