const CASES = [
  {
    quote:
      'Pasamos de atender 18 consultas por mes a más de 55, sin contratar a nadie nuevo. El agente se encarga de la primera conversación y nosotros llegamos a la reunión sabiendo exactamente qué necesita el cliente.',
    name: 'Estudio Gómez & Asociados',
    location: 'Rosario',
    specialty: 'Derecho de familia',
  },
  {
    quote:
      'Antes perdía clientes los fines de semana porque no podía responder. Ahora cada consulta que entra es atendida en menos de un minuto, a cualquier hora. En el primer mes cerré 12 casos nuevos.',
    name: 'Dr. Martín Ferreyra',
    location: 'CABA',
    specialty: 'Penalista independiente',
  },
  {
    quote:
      'La campaña de publicidad trajo muchas más consultas de las que esperábamos. El agente las filtra, y a nosotros solo nos llegan las que realmente son casos para nuestro estudio.',
    name: 'Estudio Peralta & Ríos',
    location: 'Córdoba',
    specialty: 'Accidentes de tránsito',
  },
]

export default function Results() {
  return (
    <section id="resultados" style={{ padding: '112px 32px', background: '#030A15' }}>
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
            Resultados
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
            Lo que dicen los estudios
            <br />
            que ya trabajan con nosotros
          </h2>
        </div>

        {/* Cases grid */}
        <div className="results-grid">
          {CASES.map((c) => (
            <div
              key={c.name}
              style={{
                background: '#071020',
                borderRadius: '16px',
                padding: '36px 32px',
                border: '1px solid rgba(0,180,204,0.1)',
                borderLeft: '4px solid #00B4CC',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontFamily: 'var(--font-outfit-var)',
                  fontSize: '3.5rem',
                  color: 'rgba(0, 180, 204, 0.2)',
                  lineHeight: 0.8,
                  userSelect: 'none',
                }}
              >
                &ldquo;
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-inter-var)',
                  fontSize: '0.9rem',
                  color: 'rgba(240,246,255,0.78)',
                  lineHeight: 1.75,
                  margin: 0,
                  flexGrow: 1,
                  fontStyle: 'italic',
                }}
              >
                {c.quote}
              </p>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-outfit-var)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: '#F0F6FF',
                    margin: '0 0 4px',
                  }}
                >
                  {c.name}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-inter-var)',
                    fontSize: '0.8rem',
                    color: '#7A9BB5',
                    margin: 0,
                  }}
                >
                  {c.specialty} · {c.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
