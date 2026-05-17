const AGENT_FEATURES = [
  'Atiende consultas por WhatsApp las 24 horas',
  'Hace las preguntas correctas según el tipo de caso',
  'Te entrega un resumen estructurado por cada consulta',
  'Configurado a medida de tu estudio',
]

const ADS_FEATURES = [
  'Creamos y gestionamos tus anuncios en Google y Facebook/Instagram',
  'Atraemos personas que están buscando activamente un abogado',
  'Todos pasan por el agente antes de llegar a vos',
  'Más consultas, más ordenadas, sin más trabajo de tu parte',
]

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Offering() {
  return (
    <section style={{ padding: '112px 32px', background: '#FFFFFF' }}>
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
            Lo que ofrecemos
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-outfit-var)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: '#0F172A',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Dos herramientas,
            <br />
            un solo objetivo: tu agenda llena
          </h2>
        </div>

        <div className="offering-grid">
          {/* Card 1: Agent */}
          <div
            style={{
              background: '#0D1F42',
              borderRadius: '20px',
              padding: '44px 40px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,180,204,0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0,180,204,0.15)',
                border: '1px solid rgba(0,180,204,0.3)',
                borderRadius: '100px',
                padding: '6px 14px',
                marginBottom: '28px',
              }}
            >
              <span style={{ fontSize: '14px' }}>⚡</span>
              <span
                style={{
                  fontFamily: 'var(--font-outfit-var)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#00B4CC',
                }}
              >
                Agente conversacional
              </span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {AGENT_FEATURES.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#00B4CC', flexShrink: 0, marginTop: '2px' }}>
                    <CheckIcon />
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter-var)',
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.6,
                    }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Ads */}
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '20px',
              padding: '44px 40px',
              border: '1.5px solid rgba(0,0,0,0.07)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(26,58,122,0.07)',
                border: '1px solid rgba(26,58,122,0.14)',
                borderRadius: '100px',
                padding: '6px 14px',
                marginBottom: '28px',
              }}
            >
              <span style={{ fontSize: '14px' }}>📢</span>
              <span
                style={{
                  fontFamily: 'var(--font-outfit-var)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#1A3A7A',
                }}
              >
                Campaña publicitaria
              </span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ADS_FEATURES.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#1A3A7A', flexShrink: 0, marginTop: '2px' }}>
                    <CheckIcon />
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter-var)',
                      fontSize: '0.9rem',
                      color: '#475569',
                      lineHeight: 1.6,
                    }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
