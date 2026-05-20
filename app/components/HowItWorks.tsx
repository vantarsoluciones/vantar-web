const STEPS = [
  {
    n: '01',
    title: 'Configuramos tu agente',
    desc: 'Entendemos cómo trabaja tu estudio y armamos el agente con tus preguntas, tu proceso y tu estilo.',
  },
  {
    n: '02',
    title: 'Tu agente empieza a atender',
    desc: 'Cualquier persona que escriba al WhatsApp de tu estudio es atendida al instante, en cualquier momento.',
  },
  {
    n: '03',
    title: 'Vos recibís todo listo',
    desc: 'Cada consulta llega a vos como un resumen ordenado, sin que hayas tenido que intervenir.',
  },
]

export default function HowItWorks() {
  return (
    <section style={{ padding: '112px 32px', background: '#0D1930' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
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
            Implementación
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
            En tres pasos, listo
          </h2>
        </div>

        {/* Steps */}
        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              style={{
                padding: '48px 40px',
                borderRight: i < STEPS.length - 1 ? '1px solid rgba(0,180,204,0.18)' : 'none',
              }}
            >
              {/* Large faded number */}
              <div
                style={{
                  fontFamily: 'var(--font-outfit-var)',
                  fontWeight: 800,
                  fontSize: '5rem',
                  color: 'rgba(0, 180, 204, 0.14)',
                  lineHeight: 1,
                  marginBottom: '16px',
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                }}
              >
                {step.n}
              </div>

              {/* Dot */}
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#00B4CC',
                  marginBottom: '20px',
                }}
              />

              <h3
                style={{
                  fontFamily: 'var(--font-outfit-var)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: '#F0F6FF',
                  margin: '0 0 14px',
                  lineHeight: 1.3,
                }}
              >
                {step.title}
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
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
