const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

/** Fond ambiant fixe : dégradé cobalt → argent, orbes floutées et grain. */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ background: 'var(--aurora-base, var(--bg-page))' }}
    >
      <div
        className="aurora-orb"
        style={{
          width: '46vw',
          height: '46vw',
          left: '-12vw',
          top: '-18vw',
          background: 'var(--aurora-navy)',
          opacity: 'var(--aurora-o1)',
          animation: 'cj-drift-1 22s var(--ease-in-out) infinite alternate',
        }}
      />
      <div
        className="aurora-orb"
        style={{
          width: '38vw',
          height: '38vw',
          right: '-10vw',
          top: '18vh',
          background: 'var(--aurora-teal)',
          opacity: 'var(--aurora-o2)',
          animation: 'cj-drift-2 26s var(--ease-in-out) infinite alternate',
        }}
      />
      <div
        className="aurora-orb"
        style={{
          width: '32vw',
          height: '32vw',
          left: '30vw',
          bottom: '-16vw',
          background: 'var(--aurora-amber)',
          opacity: 'var(--aurora-o3)',
          animation: 'cj-drift-1 30s var(--ease-in-out) infinite alternate-reverse',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ opacity: 0.06, mixBlendMode: 'overlay', backgroundImage: GRAIN }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, transparent 40%, var(--aurora-vignette, var(--bg-page)) 100%)',
        }}
      />
    </div>
  )
}
