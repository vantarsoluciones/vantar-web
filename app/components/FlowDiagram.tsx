'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import LogoSVG from './LogoSVG'

// ── Types ──────────────────────────────────────────────────────────────────────
type TextMsg  = { from: 'client' | 'agent'; type?: 'text'; text: string; time: string }
type AudioMsg = { from: 'client'; type: 'audio'; duration: string; transcript: string; time: string }
type ImageMsg = { from: 'client'; type: 'image'; caption: string; time: string }
type ChatMsg  = TextMsg | AudioMsg | ImageMsg

// ── Data ───────────────────────────────────────────────────────────────────────
const NODES = [
  { id: 1, emoji: '👤', title: 'Potencial cliente',        desc: 'Escribe al WhatsApp del estudio en cualquier momento. No importa si es domingo a la medianoche.', highlight: false },
  { id: 2, emoji: '',   title: 'Agente VantAr',            desc: 'Responde al instante. Hace las preguntas exactas según el tipo de caso y el estilo del estudio.', highlight: true  },
  { id: 3, emoji: '⚙️', title: 'Procesamiento automático', desc: 'Organiza y estructura toda la información. Clasifica el caso, evalúa la urgencia.',            highlight: false },
  { id: 4, emoji: '💼', title: 'El abogado',               desc: 'Recibe un resumen claro y completo. Llega a la reunión preparado, sin perder tiempo.',          highlight: false },
]

const CHAT: ChatMsg[] = [
  { from: 'client', text: 'Hola, sufrí un accidente laboral y necesito asesoramiento', time: '10:41' },
  { from: 'agent',  text: '¡Hola! Con gusto te ayudamos. ¿Cuándo ocurrió el accidente?', time: '10:41' },
  { from: 'client', text: 'Fue el lunes a la mañana', time: '10:42' },
  { from: 'agent',  text: '¿Podés contarnos brevemente cómo fue?', time: '10:42' },
  { from: 'client', type: 'audio', duration: '0:14',
    transcript: 'Estaba en el depósito moviendo cajas y resbalé porque el piso estaba mojado sin señalización. Me lastimé la muñeca derecha y tuve que ir a la guardia.',
    time: '10:43' },
  { from: 'agent',  text: 'Entendido. ¿Podés enviarnos el informe médico de la guardia?', time: '10:43' },
  { from: 'client', type: 'image', caption: 'Informe de la guardia', time: '10:44' },
  { from: 'agent',  text: 'Recibí el informe. Veo que el diagnóstico es esguince grado II de muñeca derecha, atendido el lunes a las 10:23 hs por el Dr. Ramírez. Anotado. ¿Tu empresa tiene ART?', time: '10:44' },
  { from: 'client', text: 'Sí, creo que es Galeno', time: '10:45' },
  { from: 'agent',  text: '¿Tu empleador estaba al tanto cuando ocurrió?', time: '10:45' },
  { from: 'client', text: 'Sí, le avisé a mi jefe ese mismo día', time: '10:46' },
  { from: 'agent',  text: 'Perfecto. ¿Tenés disponibilidad esta semana para una consulta?', time: '10:46' },
  { from: 'client', text: 'El jueves a la mañana me viene bien', time: '10:47' },
  { from: 'agent',  text: 'Te confirmo turno para el jueves a las 10:00 hs. Te va a atender la Dra. Peralta. ¡Hasta el jueves!', time: '10:47' },
]

// Fixed waveform heights (30 bars, 0–30 range)
const WAVEFORM = [4,8,12,18,24,26,20,30,26,20,16,24,28,22,18,14,26,22,18,12,20,16,12,8,6,10,14,8,5,3]

const KB_ROW1 = ['Q','W','E','R','T','Y','U','I','O','P']
const KB_ROW2 = ['A','S','D','F','G','H','J','K','L']
const KB_ROW3 = ['Z','X','C','V','B','N','M']

// ── Shared atoms ───────────────────────────────────────────────────────────────
function FlowConnector({ delay }: { delay: number }) {
  return (
    <div style={{ position: 'relative', marginLeft: '25px', width: '6px', height: '52px', background: 'rgba(0,180,204,0.18)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '-2px', width: '6px', height: '18px', background: 'linear-gradient(to bottom, transparent, #00B4CC 50%, transparent)', borderRadius: '3px', animation: `flow-particle 1.8s ease-in-out ${delay}s infinite` }} />
      <div style={{ position: 'absolute', left: '-2px', width: '6px', height: '18px', background: 'linear-gradient(to bottom, transparent, #00B4CC 50%, transparent)', borderRadius: '3px', animation: `flow-particle 1.8s ease-in-out ${delay + 0.9}s infinite` }} />
    </div>
  )
}

function DoubleCheck() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M1 6L4 9L10 1" stroke="#53BDEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6L9 9L15 1" stroke="#53BDEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Keyboard ───────────────────────────────────────────────────────────────────
function KbKey({ label, active, flex = 1 }: { label: string; active: boolean; flex?: number }) {
  return (
    <div style={{ flex, background: active ? '#A8B2BB' : '#FFFFFF', borderRadius: '5px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: '#000', boxShadow: '0 1px 0 #8A9BAD', transition: 'background 0.08s ease' }}>
      {label}
    </div>
  )
}

function VirtualKeyboard({ activeKey }: { activeKey: string }) {
  const ak = activeKey.toUpperCase()
  const row = { display: 'flex', gap: '5px', marginBottom: '6px' }
  return (
    <div style={{ background: '#CDD2D9', padding: '8px 4px 0', flexShrink: 0 }}>
      <div style={row}>{KB_ROW1.map(k => <KbKey key={k} label={k} active={ak === k} />)}</div>
      <div style={{ ...row, paddingLeft: '3.5%', paddingRight: '3.5%' }}>{KB_ROW2.map(k => <KbKey key={k} label={k} active={ak === k} />)}</div>
      <div style={row}>
        <KbKey label="⇧" active={false} flex={1.5} />
        {KB_ROW3.map(k => <KbKey key={k} label={k} active={ak === k} />)}
        <KbKey label="⌫" active={false} flex={1.5} />
      </div>
      <div style={{ display: 'flex', gap: '5px' }}>
        <div style={{ flex: 1.5, background: '#ADB5BD', borderRadius: '5px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#000', boxShadow: '0 1px 0 #8A9BAD' }}>123</div>
        <div style={{ flex: 5, background: activeKey === ' ' ? '#A8B2BB' : '#FFFFFF', borderRadius: '5px', height: '38px', boxShadow: '0 1px 0 #8A9BAD', transition: 'background 0.08s ease' }} />
        <div style={{ flex: 1.5, background: '#ADB5BD', borderRadius: '5px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#007AFF', boxShadow: '0 1px 0 #8A9BAD' }}>↵</div>
      </div>
      {/* iOS home indicator */}
      <div style={{ height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '130px', height: '5px', background: 'rgba(0,0,0,0.25)', borderRadius: '3px' }} />
      </div>
    </div>
  )
}

// ── Audio bubble ───────────────────────────────────────────────────────────────
function AudioBubble({ msg }: { msg: AudioMsg }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ maxWidth: '84%', background: '#D9FDD3', borderRadius: '18px 18px 4px 18px', padding: '10px 10px 22px', position: 'relative', boxShadow: '0 1px 2px rgba(0,0,0,0.13)' }}>
        {/* Voice note row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="11" height="13" viewBox="0 0 11 13" fill="white"><path d="M1 1l9 5.5L1 12V1z"/></svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}>
            {WAVEFORM.map((h, i) => (
              <div key={i} style={{ width: '2px', height: `${h}px`, background: i < 10 ? '#128C7E' : '#A0A8A0', borderRadius: '2px', transformOrigin: 'bottom', animation: `bar-grow 0.38s ease ${i * 0.03}s both` }} />
            ))}
          </div>
          <span style={{ fontFamily: '-apple-system, sans-serif', fontSize: '11px', color: 'rgba(0,0,0,0.5)', flexShrink: 0 }}>{msg.duration}</span>
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#B8C8B0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>👤</div>
        </div>
        {/* Transcript */}
        <p style={{ fontFamily: '-apple-system, sans-serif', fontSize: '12px', color: 'rgba(0,0,0,0.52)', fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1.45 }}>
          &ldquo;{msg.transcript}&rdquo;
        </p>
        <div style={{ position: 'absolute', bottom: '5px', right: '8px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontFamily: '-apple-system, sans-serif', fontSize: '10px', color: 'rgba(0,0,0,0.42)' }}>{msg.time}</span>
          <DoubleCheck />
        </div>
      </div>
    </div>
  )
}

// ── Medical report image ───────────────────────────────────────────────────────
function MedicalReport() {
  const label: React.CSSProperties = { fontFamily: 'sans-serif', fontSize: '6px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: '1px' }
  const value: React.CSSProperties = { fontFamily: 'sans-serif', fontSize: '7.5px', color: '#1A1A1A', lineHeight: 1.25 }
  const valueBold: React.CSSProperties = { ...value, fontWeight: 700, color: '#0D0D0D' }
  const cell = (lbl: string, val: string, bold = false) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={label}>{lbl}</span>
      <span style={bold ? valueBold : value}>{val}</span>
    </div>
  )

  return (
    <div style={{
      width: '228px',
      height: '178px',
      background: 'linear-gradient(170deg, #FEFDFB 0%, #F8F6EE 100%)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 28px rgba(0,0,0,0.07)',
    }}>
      {/* Letterhead */}
      <div style={{ borderBottom: '1.5px solid #1A4A8F', padding: '5px 10px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(26,74,143,0.03)' }}>
        <div>
          <p style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '7.5px', color: '#1A4A8F', margin: 0, letterSpacing: '0.04em' }}>HOSPITAL GENERAL DE AGUDOS</p>
          <p style={{ fontFamily: 'sans-serif', fontSize: '6px', color: '#5A6A8A', margin: 0 }}>Guardia Médica · Urgencias y Emergencias</p>
        </div>
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
          <rect x="4.5" y="0" width="3" height="12" rx="1" fill="#CC1111"/>
          <rect x="0" y="4.5" width="12" height="3" rx="1" fill="#CC1111"/>
        </svg>
      </div>

      {/* Document title */}
      <div style={{ background: 'rgba(26,74,143,0.06)', padding: '3px 10px', borderBottom: '0.5px solid rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: '6.5px', fontWeight: 700, color: '#222', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Certificado de Atención Médica
        </span>
      </div>

      {/* Fields grid */}
      <div style={{ padding: '6px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>{cell('Apellido y nombre', 'García, Marcos A.')}</div>
          <div style={{ flex: 1 }}>{cell('DNI', '32.744.901')}</div>
        </div>
        <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.08)' }} />
        {cell('Diagnóstico', 'Esguince grado II — muñeca derecha', true)}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>{cell('Ingreso', 'Lun 10:23 hs')}</div>
          <div style={{ flex: 1 }}>{cell('Alta', '13:05 hs')}</div>
        </div>
        {cell('Tratamiento indicado', 'Inmovilización + antiinfl. · Control 7 días')}
      </div>

      {/* Signature + stamp row */}
      <div style={{ position: 'absolute', bottom: '6px', left: '10px', right: '10px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          {/* Handwritten-style signature squiggle */}
          <svg width="54" height="12" viewBox="0 0 54 12" fill="none" style={{ display: 'block', marginBottom: '1px' }}>
            <path d="M2 9 C6 3, 10 11, 14 7 C18 3, 20 10, 24 8 C28 6, 30 9, 34 7 C38 5, 40 8, 44 7 L50 6" stroke="#333" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
          </svg>
          <div style={{ width: '54px', borderTop: '0.7px solid #555', marginBottom: '2px' }} />
          <p style={{ fontFamily: 'sans-serif', fontSize: '5.5px', color: '#555', margin: 0 }}>Dr. A. Ramírez · M.N. 44823</p>
        </div>
        {/* Round stamp */}
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid rgba(20,50,160,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-10deg)', gap: '1px' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '5px', color: 'rgba(20,50,160,0.5)', margin: 0, letterSpacing: '0.05em', fontWeight: 700 }}>H.G.A.</p>
          <div style={{ width: '24px', height: '0.7px', background: 'rgba(20,50,160,0.35)' }} />
          <p style={{ fontFamily: 'sans-serif', fontSize: '4.5px', color: 'rgba(20,50,160,0.45)', margin: 0 }}>ORIGINAL</p>
        </div>
      </div>

      {/* Barcode bottom-left corner */}
      <div style={{ position: 'absolute', bottom: '7px', left: '76px', display: 'flex', gap: '1.5px', alignItems: 'flex-end' }}>
        {[8,14,8,18,10,16,8,12,18,8,14,10,18,8,12].map((h, i) => (
          <div key={i} style={{ width: i % 3 === 1 ? '3px' : '1.5px', height: `${h}px`, background: '#1A1A1A', borderRadius: '0.3px' }} />
        ))}
      </div>
    </div>
  )
}

function ImageBubble({ msg }: { msg: ImageMsg }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ maxWidth: '84%', background: '#D9FDD3', borderRadius: '18px 18px 4px 18px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.13)', position: 'relative' }}>
        <MedicalReport />
        <div style={{ padding: '5px 10px 22px' }}>
          <p style={{ fontFamily: '-apple-system, sans-serif', fontSize: '13px', fontWeight: 500, color: '#111', margin: 0 }}>{msg.caption}</p>
        </div>
        <div style={{ position: 'absolute', bottom: '5px', right: '8px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontFamily: '-apple-system, sans-serif', fontSize: '10px', color: 'rgba(0,0,0,0.42)' }}>{msg.time}</span>
          <DoubleCheck />
        </div>
      </div>
    </div>
  )
}

// ── ChatSimulator ──────────────────────────────────────────────────────────────
function ChatSimulator() {
  const [visibleCount, setVisibleCount]   = useState(0)
  const [isAgentTyping, setIsAgentTyping] = useState(false)
  const [isClientTyping, setIsClientTyping] = useState(false)
  const [inputText, setInputText]         = useState('')
  const [activeKey, setActiveKey]         = useState('')
  const messagesRef  = useRef<HTMLDivElement>(null)
  const clientTextRef = useRef('')

  // Orchestrator
  useEffect(() => {
    if (visibleCount >= CHAT.length) {
      const t = setTimeout(() => {
        setVisibleCount(0); setInputText(''); setIsAgentTyping(false); setIsClientTyping(false); setActiveKey('')
      }, 3500)
      return () => clearTimeout(t)
    }
    const next = CHAT[visibleCount]
    if (!next) return

    if (next.from === 'agent') {
      setIsAgentTyping(true)
      const delay = Math.min(next.text.length * 26 + 900, 3200)
      const t = setTimeout(() => { setIsAgentTyping(false); setVisibleCount(v => v + 1) }, delay)
      return () => clearTimeout(t)
    }
    if (next.type === 'audio') {
      // longer delay — simulates recording + uploading the voice note
      const t = setTimeout(() => setVisibleCount(v => v + 1), 3200)
      return () => clearTimeout(t)
    }
    if (next.type === 'image') {
      const t = setTimeout(() => setVisibleCount(v => v + 1), 2200)
      return () => clearTimeout(t)
    }
    // text client
    const t = setTimeout(() => { clientTextRef.current = next.text; setIsClientTyping(true) }, 1100)
    return () => clearTimeout(t)
  }, [visibleCount])

  // Client typing
  useEffect(() => {
    if (!isClientTyping) return
    const target = clientTextRef.current
    let i = 0
    let sendT: ReturnType<typeof setTimeout>
    const charDelay = Math.max(50, Math.min(95, 1600 / Math.max(target.length, 1)))
    const interval = setInterval(() => {
      i++
      const char = target[i - 1]
      setInputText(target.slice(0, i))
      if (char) { setActiveKey(char); setTimeout(() => setActiveKey(''), Math.round(charDelay * 0.7)) }
      if (i >= target.length) {
        clearInterval(interval)
        sendT = setTimeout(() => { setInputText(''); setActiveKey(''); setIsClientTyping(false); setVisibleCount(v => v + 1) }, 600)
      }
    }, charDelay)
    return () => { clearInterval(interval); clearTimeout(sendT) }
  }, [isClientTyping])

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [visibleCount, isAgentTyping])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* WA Header */}
      <div style={{ background: '#128C7E', padding: '11px 14px 11px 6px', display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
        <div style={{ padding: '4px 6px', color: 'rgba(255,255,255,0.85)', flexShrink: 0 }}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1.5L1.5 8.5L9 15.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#0D1F42', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, padding: '3px' }}>
          <LogoSVG light />
        </div>
        <div style={{ flex: 1, marginLeft: '8px' }}>
          <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 600, fontSize: '15px', color: '#FFF', margin: 0, lineHeight: 1.2 }}>VantAr — Agente</p>
          <p style={{ fontFamily: '-apple-system, sans-serif', fontSize: '11.5px', color: isAgentTyping ? '#A8E6D0' : 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.3, transition: 'color 0.25s' }}>
            {isAgentTyping ? 'escribiendo...' : 'en línea'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '18px', color: 'rgba(255,255,255,0.88)', flexShrink: 0 }}>
          <svg width="20" height="14" viewBox="0 0 22 15" fill="currentColor"><path d="M13 0H2C.9 0 0 .9 0 2v11c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM22 1.5l-5 3.5v5.5l5 3.5V1.5z"/></svg>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.26.2 2.47.57 3.6.11.34.03.74-.24 1.01L6.6 10.8z"/></svg>
          <svg width="4" height="17" viewBox="0 0 4 18" fill="currentColor"><circle cx="2" cy="2" r="1.8"/><circle cx="2" cy="9" r="1.8"/><circle cx="2" cy="16" r="1.8"/></svg>
        </div>
      </div>

      {/* Messages — flex:1 absorbs any height changes in siblings */}
      <div ref={messagesRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#ECE5DD', scrollbarWidth: 'none' }}>
        {CHAT.slice(0, visibleCount).map((msg, i) => {
          if (msg.type === 'audio') return <AudioBubble key={i} msg={msg} />
          if (msg.type === 'image') return <ImageBubble key={i} msg={msg} />
          const isClient = msg.from === 'client'
          return (
            <div key={i} style={{ display: 'flex', justifyContent: isClient ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '80%', padding: '8px 10px 22px', borderRadius: isClient ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: isClient ? '#D9FDD3' : '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.13)', position: 'relative' }}>
                <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', fontWeight: 500, color: '#111', margin: 0, lineHeight: 1.45, wordBreak: 'break-word' }}>
                  {msg.text}
                </p>
                <div style={{ position: 'absolute', bottom: '5px', right: '8px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span style={{ fontFamily: '-apple-system, sans-serif', fontSize: '10px', color: 'rgba(0,0,0,0.42)' }}>{msg.time}</span>
                  {isClient && <DoubleCheck />}
                </div>
              </div>
            </div>
          )
        })}
        {isAgentTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '10px 14px', borderRadius: '18px 18px 18px 4px', background: '#FFF', boxShadow: '0 1px 2px rgba(0,0,0,0.13)', display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[0,1,2].map(d => <div key={d} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#90949C', animation: `typing-dot 1.3s ease-in-out ${d * 0.2}s infinite` }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Input bar — flex-end aligns icons to bottom when input grows to 2 lines */}
      <div style={{ background: '#F0F0F0', padding: '7px 8px', display: 'flex', alignItems: 'flex-end', gap: '7px', flexShrink: 0 }}>
        <div style={{ color: '#8696A0', flexShrink: 0, paddingBottom: '6px' }}>
          <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5 14.67 11 15.5 11zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
        </div>
        {/* Input pill — grows to 2 lines when text wraps */}
        <div style={{ flex: 1, background: '#FFF', borderRadius: '19px', padding: '9px 14px', minHeight: '38px', maxHeight: '64px', overflowY: 'hidden', lineHeight: '20px' }}>
          <span style={{ fontFamily: '-apple-system, sans-serif', fontSize: '14px', color: inputText ? '#111' : '#9EA5AE', wordBreak: 'break-word' }}>
            {inputText || 'Mensaje'}
            {isClientTyping && (
              <span style={{ display: 'inline-block', width: '2px', height: '15px', background: '#00B4CC', marginLeft: '1px', verticalAlign: 'text-bottom', animation: 'cursor-blink 1s step-end infinite' }} />
            )}
          </span>
        </div>
        {inputText ? (
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </div>
        ) : (
          <div style={{ color: '#8696A0', flexShrink: 0, paddingBottom: '6px' }}>
            <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor"><path d="M20 5h-2.83L15 3H9L6.83 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14H4V7h3.05L9.17 5h5.66l2.12 2H20v12zM12 8c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
          </div>
        )}
      </div>

      <VirtualKeyboard activeKey={activeKey} />
    </div>
  )
}

// ── iPhone 17 Frame ────────────────────────────────────────────────────────────
function IPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'relative', width: '328px', margin: '0 auto' }}>
      {/* Action button — liquid glass */}
      <div style={{ position: 'absolute', width: '4px', height: '32px', top: '108px', left: '-4px', background: 'linear-gradient(180deg,rgba(130,130,130,0.85) 0%,rgba(70,70,70,0.75) 100%)', borderRadius: '3px 0 0 3px', border: '0.5px solid rgba(255,255,255,0.2)', borderRight: 'none', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.2), -2px 0 8px rgba(0,0,0,0.5)' }} />
      {/* Volume Up */}
      <div style={{ position: 'absolute', width: '4px', height: '62px', top: '158px', left: '-4px', background: 'linear-gradient(180deg,rgba(130,130,130,0.85) 0%,rgba(70,70,70,0.75) 100%)', borderRadius: '3px 0 0 3px', border: '0.5px solid rgba(255,255,255,0.2)', borderRight: 'none', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.2), -2px 0 8px rgba(0,0,0,0.5)' }} />
      {/* Volume Down */}
      <div style={{ position: 'absolute', width: '4px', height: '62px', top: '232px', left: '-4px', background: 'linear-gradient(180deg,rgba(130,130,130,0.85) 0%,rgba(70,70,70,0.75) 100%)', borderRadius: '3px 0 0 3px', border: '0.5px solid rgba(255,255,255,0.2)', borderRight: 'none', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.2), -2px 0 8px rgba(0,0,0,0.5)' }} />
      {/* Power */}
      <div style={{ position: 'absolute', width: '4px', height: '88px', top: '158px', right: '-4px', background: 'linear-gradient(180deg,rgba(130,130,130,0.85) 0%,rgba(70,70,70,0.75) 100%)', borderRadius: '0 3px 3px 0', border: '0.5px solid rgba(255,255,255,0.2)', borderLeft: 'none', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.2), 2px 0 8px rgba(0,0,0,0.5)' }} />

      {/* Body */}
      <div style={{
        background: 'linear-gradient(155deg,#3C3C3C 0%,#222 25%,#141414 55%,#1E1E1E 80%,#2A2A2A 100%)',
        borderRadius: '46px',
        padding: '14px 10px 15px',
        boxShadow: [
          'inset 0 1.5px 0 rgba(255,255,255,0.14)',
          'inset 1px 0 0 rgba(255,255,255,0.07)',
          'inset -1px 0 0 rgba(255,255,255,0.05)',
          '0 50px 120px rgba(0,0,0,0.7)',
          '0 18px 45px rgba(0,0,0,0.45)',
          '0 5px 14px rgba(0,0,0,0.35)',
        ].join(', '),
      }}>
        {/* Screen — fixed height prevents any resize during animation */}
        <div style={{ borderRadius: '36px', overflow: 'hidden', background: '#000', height: '630px', display: 'flex', flexDirection: 'column' }}>
          {/* iOS Status Bar with Dynamic Island */}
          <div style={{ height: '52px', background: '#111', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', position: 'relative' }}>
            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 600, fontSize: '15px', color: '#FFF', letterSpacing: '-0.3px' }}>10:41</span>
            {/* Dynamic Island pill */}
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '9px', width: '100px', height: '32px', background: '#000', borderRadius: '18px', boxShadow: '0 0 0 1px rgba(255,255,255,0.22), 0 3px 10px rgba(0,0,0,0.9)' }} />
            {/* Status icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="17" height="11" viewBox="0 0 17 11" fill="white">
                <rect x="0"  y="7"  width="3" height="4" rx="0.8"/>
                <rect x="4.5" y="4.5" width="3" height="6.5" rx="0.8"/>
                <rect x="9"  y="2"  width="3" height="9"   rx="0.8"/>
                <rect x="13.5" y="0" width="3" height="11" rx="0.8"/>
              </svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="white">
                <path d="M7.5 8.5a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6z"/>
                <path d="M3.2 5.8C4.6 4.4 6 3.8 7.5 3.8s2.9.6 4.3 2l1.2-1.2C11.3 3 9.5 2.2 7.5 2.2S3.7 3 2 4.6l1.2 1.2z" opacity=".5"/>
                <path d="M0.5 3C2.6 1 4.9 0 7.5 0s4.9 1 7 3l-1.2 1.2C11.3 2.3 9.5 1.6 7.5 1.6S3.7 2.3 1.7 4.2L.5 3z" opacity=".3"/>
              </svg>
              <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
                <rect x="0.5" y="0.5" width="19" height="10" rx="3" stroke="white" strokeOpacity=".35"/>
                <rect x="2"   y="2"   width="14" height="7"  rx="1.5" fill="white"/>
                <path d="M21 3.5v4a1.8 1.8 0 000-4z" fill="white" fillOpacity=".45"/>
              </svg>
            </div>
          </div>

          {children}
        </div>

        {/* USB-C */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
          <div style={{ width: '50px', height: '6px', background: '#0C0C0C', borderRadius: '3px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)' }} />
        </div>
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function FlowDiagram() {
  return (
    <section id="como-funciona" style={{ padding: '112px 32px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ fontFamily: 'var(--font-outfit-var)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00B4CC', display: 'block', marginBottom: '16px' }}>
            Cómo funciona
          </span>
          <h2 style={{ fontFamily: 'var(--font-outfit-var)', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#0F172A', margin: '0 0 20px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            De la consulta al turno,<br/>sin que intervengas
          </h2>
          <p style={{ fontFamily: 'var(--font-inter-var)', fontSize: '1.1rem', color: '#475569', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Todo ocurre automáticamente. Vos solo aparecés cuando el cliente ya está listo para cerrar el caso.
          </p>
        </div>

        <div className="flow-grid">
          <div>
            {NODES.map((node, i) => (
              <div key={node.id}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0, background: node.highlight ? '#0D1F42' : 'rgba(26,58,122,0.07)', border: node.highlight ? 'none' : '1.5px solid rgba(26,58,122,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: node.highlight ? '0 8px 24px rgba(13,31,66,0.4)' : 'none', overflow: 'hidden', padding: node.highlight ? '7px' : '0' }}>
                    {node.highlight ? <LogoSVG light /> : node.emoji}
                  </div>
                  <div style={{ paddingTop: '4px' }}>
                    <h3 style={{ fontFamily: 'var(--font-outfit-var)', fontWeight: 700, fontSize: '1.05rem', color: '#0F172A', margin: '0 0 6px' }}>{node.title}</h3>
                    <p style={{ fontFamily: 'var(--font-inter-var)', fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: 1.65 }}>{node.desc}</p>
                  </div>
                </div>
                {i < NODES.length - 1 && <FlowConnector delay={i * 0.4} />}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <IPhoneFrame>
              <ChatSimulator />
            </IPhoneFrame>
          </div>
        </div>
      </div>
    </section>
  )
}
