import type { ReactNode } from 'react'

const BENEFITS: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B4CC" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Respondés primero, siempre',
    desc: 'El agente está disponible las 24 horas, los 7 días. No importa si es domingo a la medianoche: el potencial cliente recibe atención inmediata y vos no perdés la consulta.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B4CC" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Llegás a la reunión preparado',
    desc: 'Antes de que te sientes con el cliente, ya tenés su nombre, el tipo de caso, los antecedentes relevantes y el nivel de urgencia. Sin vueltas, sin preguntas de más.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B4CC" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Más consultas sin más horas de trabajo',
    desc: 'El agente filtra, organiza y prioriza. Tu tiempo lo dedicás a resolver casos, no a recolectar datos básicos.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B4CC" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
      </svg>
    ),
    title: 'Configurado para tu estudio',
    desc: 'No es un bot genérico. Las preguntas, el tono y el proceso se adaptan exactamente a cómo trabaja tu estudio o tu práctica.',
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" style={{ padding: '112px 32px', background: '#030A15' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <span
            style={{
              fontFamily: 'var(--font-outfit-var)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#00B4CC',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            Beneficios
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-outfit-var)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: '#F0F6FF',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Lo que cambia desde el primer día
          </h2>
        </div>

        {/* Grid */}
        <div className="benefits-grid">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="card-hover"
              style={{
                background: '#071020',
                borderRadius: '16px',
                padding: '36px 32px',
                border: '1px solid rgba(0,180,204,0.1)',
                animation: `fade-up 0.55s ease ${0.1 + i * 0.1}s both`,
              }}
            >
              {/* Icon container */}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(0, 180, 204, 0.08)',
                  border: '1px solid rgba(0, 180, 204, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                }}
              >
                {b.icon}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-outfit-var)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#F0F6FF',
                  margin: '0 0 12px',
                  lineHeight: 1.3,
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-inter-var)',
                  fontSize: '0.9rem',
                  color: '#7A9BB5',
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
