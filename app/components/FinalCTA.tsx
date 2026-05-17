'use client'

const WA_LINK =
  'https://wa.me/NUMERO_PLACEHOLDER?text=Quiero%20saber%20c%C3%B3mo%20funciona%20VantAr'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M20.463 3.488C18.217 1.24 15.231 0 12.05 0 5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.946L.057 24l6.304-1.654c1.737.947 3.693 1.446 5.683 1.447h.005c6.554 0 11.89-5.335 11.893-11.893.002-3.18-1.235-6.165-3.479-8.412zm-8.413 18.303h-.004c-1.774-.001-3.513-.477-5.031-1.378l-.36-.214-3.742.981.998-3.648-.235-.374a9.786 9.786 0 01-1.511-5.261c.003-5.45 4.437-9.884 9.889-9.884 2.64.001 5.122 1.03 6.988 2.898 1.866 1.869 2.893 4.352 2.892 6.993-.003 5.45-4.437 9.887-9.884 9.887zm5.42-7.403c-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.148-.67.15-.198.298-.767.967-.94 1.164-.173.199-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.199 2.095 3.2 5.076 4.488.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
    </svg>
  )
}

export default function FinalCTA() {
  return (
    <section
      id="contacto"
      style={{
        padding: '120px 32px',
        background: '#030A18',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,204,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,58,122,0.5) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0,180,204,0.1)',
            border: '1px solid rgba(0,180,204,0.22)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#00B4CC',
              boxShadow: '0 0 8px #00B4CC',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-outfit-var)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#00B4CC',
            }}
          >
            Empezá hoy
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-outfit-var)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            color: '#FFFFFF',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            margin: '0 0 24px',
          }}
        >
          ¿Tu estudio está perdiendo
          <br />
          <span style={{ color: '#00B4CC' }}>consultas esta noche?</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7,
            margin: '0 0 48px',
            fontWeight: 300,
          }}
        >
          Hablemos y te mostramos cómo funciona en 15 minutos.
        </p>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-outfit-var)',
            fontWeight: 700,
            fontSize: '16px',
            color: '#0D1F42',
            background: '#00B4CC',
            padding: '20px 40px',
            borderRadius: '12px',
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
          Escribinos por WhatsApp
        </a>
      </div>
    </section>
  )
}
