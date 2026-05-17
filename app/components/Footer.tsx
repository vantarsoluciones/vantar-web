'use client'

import LogoSVG from './LogoSVG'

const WA_LINK =
  'https://wa.me/NUMERO_PLACEHOLDER?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20VantAr'

const LINKS = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#020810', padding: '64px 32px 40px', borderTop: '1px solid rgba(0,212,255,0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: '280px' }}>
            <a
              href="#"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}
            >
              <LogoSVG light />
              <span
                style={{
                  fontFamily: 'var(--font-outfit-var)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: '#FFFFFF',
                }}
              >
                Vant<span style={{ color: '#00B4CC' }}>Ar</span>
              </span>
            </a>
            <p
              style={{
                fontFamily: 'var(--font-inter-var)',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Tecnología en CX y Marketing para estudios jurídicos y abogados.
            </p>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: 'var(--font-inter-var)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00B4CC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* WA CTA */}
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
              fontSize: '14px',
              color: '#0D1F42',
              background: '#00B4CC',
              padding: '14px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0FCFE8')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#00B4CC')}
          >
            Escribinos
          </a>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            © {new Date().getFullYear()} VantAr. Todos los derechos reservados.
          </span>
          <span
            style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            Tecnología en CX y Marketing
          </span>
        </div>
      </div>
    </footer>
  )
}
