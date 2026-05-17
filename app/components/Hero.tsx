'use client'

import { motion, MotionConfig } from 'framer-motion'

const WA_LINK =
  'https://wa.me/NUMERO_PLACEHOLDER?text=Quiero%20que%20mi%20estudio%20responda%20primero'

const TRANSITION = { duration: 0.65, ease: 'easeOut' as const }

function anim(delay: number) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { ...TRANSITION, delay },
  }
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.463 3.488C18.217 1.24 15.231 0 12.05 0 5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.946L.057 24l6.304-1.654c1.737.947 3.693 1.446 5.683 1.447h.005c6.554 0 11.89-5.335 11.893-11.893.002-3.18-1.235-6.165-3.479-8.412zm-8.413 18.303h-.004c-1.774-.001-3.513-.477-5.031-1.378l-.36-.214-3.742.981.998-3.648-.235-.374a9.786 9.786 0 01-1.511-5.261c.003-5.45 4.437-9.884 9.889-9.884 2.64.001 5.122 1.03 6.988 2.898 1.866 1.869 2.893 4.352 2.892 6.993-.003 5.45-4.437 9.887-9.884 9.887zm5.42-7.403c-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.148-.67.15-.198.298-.767.967-.94 1.164-.173.199-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.199 2.095 3.2 5.076 4.488.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
    </svg>
  )
}

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="hero-bg"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '120px 32px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow blobs — more vivid on the very dark bg */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '-5%',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-8%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,100,200,0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        {/* Top center spotlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '300px',
            background: 'radial-gradient(ellipse at top, rgba(0,180,220,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative' }}>
          <div style={{ maxWidth: '760px' }}>

            {/* Eyebrow */}
            <motion.div {...anim(0.05)} style={{ marginBottom: '28px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-outfit-var)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#00B4CC',
                  background: 'rgba(0,180,204,0.1)',
                  border: '1px solid rgba(0,180,204,0.25)',
                  padding: '6px 14px',
                  borderRadius: '100px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#00B4CC',
                    boxShadow: '0 0 8px #00B4CC',
                  }}
                />
                Agente conversacional para estudios jurídicos
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...anim(0.17)}
              style={{
                fontFamily: 'var(--font-outfit-var)',
                fontWeight: 800,
                fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                color: '#FFFFFF',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                margin: '0 0 28px',
              }}
            >
              El cliente que no respondiste
              <br />
              <span style={{ color: '#00B4CC' }}>ya llamó al siguiente.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...anim(0.29)}
              style={{
                fontFamily: 'var(--font-inter-var)',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.75,
                margin: '0 0 48px',
                maxWidth: '600px',
                fontWeight: 300,
              }}
            >
              VantAr atiende a tus potenciales clientes al instante, los entrevista, y te entrega
              todo listo para que vos cierres el caso.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...anim(0.41)}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'var(--font-outfit-var)',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#0D1F42',
                  background: '#00B4CC',
                  padding: '16px 28px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0FCFE8'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#00B4CC'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <WhatsAppIcon />
                Quiero que mi estudio responda primero
              </a>

              <a
                href="#como-funciona"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-outfit-var)',
                  fontWeight: 500,
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '16px 28px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                  e.currentTarget.style.color = '#FFFFFF'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                }}
              >
                Ver cómo funciona
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              {...anim(0.53)}
              style={{
                display: 'flex',
                gap: '32px',
                marginTop: '56px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: '24/7', label: 'Disponible siempre' },
                { value: '< 1 min', label: 'Tiempo de respuesta' },
                { value: '+55', label: 'Consultas por mes' },
              ].map((stat) => (
                <div key={stat.value} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-outfit-var)',
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      color: '#FFFFFF',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter-var)',
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
