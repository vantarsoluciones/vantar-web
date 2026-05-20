'use client'

import { useState, useEffect } from 'react'
import LogoSVG from './LogoSVG'

const WA_LINK =
  'https://wa.me/NUMERO_PLACEHOLDER?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20VantAr'

const NAV_LINKS = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0 32px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
        ...(scrolled
          ? {
              background: 'rgba(3, 10, 21, 0.92)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              boxShadow: '0 1px 0 rgba(0,180,204,0.1)',
            }
          : {
              background: 'transparent',
            }),
      }}
    >
      {/* Logo + brand */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <LogoSVG light />
        <span
          style={{
            fontFamily: 'var(--font-outfit-var)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
            transition: 'color 0.35s ease',
          }}
        >
          Vant<span style={{ color: '#00B4CC' }}>Ar</span>
        </span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {/* Nav links (hidden on mobile via CSS class) */}
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'var(--font-inter-var)',
                fontSize: '14px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.72)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.72)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-outfit-var)',
            fontWeight: 600,
            fontSize: '14px',
            color: '#FFFFFF',
            background: '#00B4CC',
            padding: '10px 22px',
            borderRadius: '8px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#0097AD')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#00B4CC')}
        >
          Hablar con VantAr
        </a>
      </div>
    </nav>
  )
}
