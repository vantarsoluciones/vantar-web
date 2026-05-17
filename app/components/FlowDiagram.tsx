'use client'

import { useState, useEffect, useRef } from 'react'

const NODES = [
  {
    id: 1,
    emoji: '👤',
    title: 'Potencial cliente',
    desc: 'Escribe al WhatsApp del estudio en cualquier momento. No importa si es domingo a la medianoche.',
    accentColor: '#1A3A7A',
  },
  {
    id: 2,
    emoji: '⚡',
    title: 'Agente VantAr',
    desc: 'Responde al instante. Hace las preguntas exactas según el tipo de caso y el estilo del estudio.',
    accentColor: '#00B4CC',
    highlight: true,
  },
  {
    id: 3,
    emoji: '⚙️',
    title: 'Procesamiento automático',
    desc: 'Organiza y estructura toda la información. Clasifica el caso, evalúa la urgencia.',
    accentColor: '#0D3A50',
  },
  {
    id: 4,
    emoji: '💼',
    title: 'El abogado',
    desc: 'Recibe un resumen claro y completo. Llega a la reunión preparado, sin perder tiempo.',
    accentColor: '#1A3A7A',
  },
]

const CHAT = [
  { from: 'client', text: 'Hola, necesito asesoramiento por un accidente de tránsito' },
  { from: 'agent', text: 'Hola, con gusto te ayudamos. ¿El accidente fue reciente o hace más de un año?' },
  { from: 'client', text: 'Fue hace dos semanas' },
  { from: 'agent', text: '¿Hubo lesiones físicas o fue solo daño en el vehículo?' },
  { from: 'client', text: 'Tuve lesiones, estuve en guardia' },
  { from: 'agent', text: 'Entendido. ¿Ya tenés el informe médico de la guardia?' },
  { from: 'client', text: 'Sí, lo tengo' },
  { from: 'agent', text: '¿El conductor del otro vehículo tenía seguro vigente?' },
  { from: 'client', text: 'Sí, es Mapfre' },
  {
    from: 'agent',
    text: 'Perfecto, ya tenemos todo lo necesario. En breve un profesional del estudio se va a comunicar con vos. ¡Gracias!',
  },
]

function FlowConnector({ delay }: { delay: number }) {
  return (
    <div
      style={{
        position: 'relative',
        marginLeft: '25px',
        width: '2px',
        height: '52px',
        background: 'rgba(0, 180, 204, 0.18)',
      }}
    >
      {/* Particle 1 */}
      <div
        style={{
          position: 'absolute',
          left: '-2px',
          width: '6px',
          height: '18px',
          background: 'linear-gradient(to bottom, transparent, #00B4CC 50%, transparent)',
          borderRadius: '3px',
          animation: `flow-particle 1.8s ease-in-out ${delay}s infinite`,
        }}
      />
      {/* Particle 2 (offset by half cycle) */}
      <div
        style={{
          position: 'absolute',
          left: '-2px',
          width: '6px',
          height: '18px',
          background: 'linear-gradient(to bottom, transparent, #00B4CC 50%, transparent)',
          borderRadius: '3px',
          animation: `flow-particle 1.8s ease-in-out ${delay + 0.9}s infinite`,
        }}
      />
    </div>
  )
}

function ChatSimulator() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visibleCount >= CHAT.length) {
      const timer = setTimeout(() => setVisibleCount(0), 3500)
      return () => clearTimeout(timer)
    }

    const next = CHAT[visibleCount]
    if (!next) return

    if (next.from === 'agent') {
      setIsTyping(true)
      const delay = Math.min(next.text.length * 18 + 400, 2400)
      const timer = setTimeout(() => {
        setIsTyping(false)
        setVisibleCount((v) => v + 1)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setVisibleCount((v) => v + 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [visibleCount])

  // Scroll only the chat container, NOT the page
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [visibleCount, isTyping])

  return (
    <div
      style={{
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
        width: '100%',
        maxWidth: '380px',
        margin: '0 auto',
      }}
    >
      {/* WA Header */}
      <div
        style={{
          background: '#075E54',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#00B4CC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0,
          }}
        >
          ⚡
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-outfit-var)',
              fontWeight: 600,
              fontSize: '15px',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            VantAr — Agente
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '12px',
              color: isTyping ? '#25D366' : 'rgba(255,255,255,0.65)',
              margin: 0,
              transition: 'color 0.3s ease',
            }}
          >
            {isTyping ? 'escribiendo...' : 'en línea'}
          </p>
        </div>
      </div>

      {/* Messages area — ref here so scrollTop only moves this div, not the page */}
      <div
        ref={messagesRef}
        style={{
          height: '370px',
          overflowY: 'auto',
          padding: '16px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          background: '#E5DDD5',
          scrollbarWidth: 'none',
        }}
      >
        {CHAT.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.from === 'client' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '8px 12px',
                borderRadius: msg.from === 'client' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                background: msg.from === 'client' ? '#DCF8C6' : '#FFFFFF',
                boxShadow: '0 1px 2px rgba(0,0,0,0.09)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-inter-var)',
                  fontSize: '13.5px',
                  color: '#303030',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '12px 12px 12px 0',
                background: '#FFFFFF',
                boxShadow: '0 1px 2px rgba(0,0,0,0.09)',
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#90949C',
                    animation: `typing-dot 1.3s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function FlowDiagram() {
  return (
    <section id="como-funciona" style={{ padding: '112px 32px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
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
            Cómo funciona
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-outfit-var)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: '#0F172A',
              margin: '0 0 20px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            De la consulta al turno,
            <br />
            sin que intervengas
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '1.1rem',
              color: '#475569',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Todo ocurre automáticamente. Vos solo aparecés cuando el cliente ya está listo para
            cerrar el caso.
          </p>
        </div>

        {/* Flow grid */}
        <div className="flow-grid">
          {/* Left: flow nodes */}
          <div>
            {NODES.map((node, i) => (
              <div key={node.id}>
                {/* Node */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  {/* Icon */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: node.highlight
                        ? '#00B4CC'
                        : 'rgba(26, 58, 122, 0.07)',
                      border: node.highlight
                        ? 'none'
                        : '1.5px solid rgba(26, 58, 122, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      flexShrink: 0,
                      boxShadow: node.highlight
                        ? '0 8px 24px rgba(0,180,204,0.35)'
                        : 'none',
                    }}
                  >
                    {node.emoji}
                  </div>
                  {/* Text */}
                  <div style={{ paddingTop: '4px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-outfit-var)',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: '#0F172A',
                        margin: '0 0 6px',
                      }}
                    >
                      {node.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter-var)',
                        fontSize: '0.875rem',
                        color: '#475569',
                        margin: 0,
                        lineHeight: 1.65,
                      }}
                    >
                      {node.desc}
                    </p>
                  </div>
                </div>

                {/* Connector (not after last node) */}
                {i < NODES.length - 1 && (
                  <FlowConnector delay={i * 0.4} />
                )}
              </div>
            ))}
          </div>

          {/* Right: chat simulator */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ChatSimulator />
          </div>
        </div>
      </div>
    </section>
  )
}
