import { useMemo, useRef } from 'react'
import { useLang } from '../context/LangContext'
import { PLANETAS } from '../data/planetas'
import {
  IDS, FISICOS, posicion, puntosOrbita, proyectar, factorDistancia, radioPlaneta,
} from '../lib/orbitasPlanetas'

// Vista 3D del sistema solar en SVG, sin librería 3D: las posiciones salen de
// lib/orbitasPlanetas.js y aquí solo se proyectan y se dibujan en orden de
// profundidad (lo lejano primero), que en una escena de esferas sueltas es todo
// el 3D que hace falta.
//
// Se gira arrastrando y se elige un planeta tocándolo. Un arrastre que mueve
// más de unos píxeles no cuenta como toque: si no, girar la vista seleccionaría
// el planeta sobre el que empezó el gesto.

const W = 800, H = 560
const CX = W / 2, CY = H / 2
const ESCALA_BASE = 250

// Estrellas de fondo fijas: generadas con una semilla, no con Math.random, para
// que no cambien en cada render ni entre el HTML prerenderizado y el cliente.
const ESTRELLAS = (() => {
  let s = 20260914
  const azar = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)
  return Array.from({ length: 140 }, () => ({ x: azar() * W, y: azar() * H, r: 0.4 + azar() * 1.1, o: 0.25 + azar() * 0.6 }))
})()

const NOMBRE = Object.fromEntries(PLANETAS.map(p => [p.id, p.nombre]))

export default function SistemaSolar3D({ fecha, camara, zoom, modoDistancia, modoTamano, seleccionado, onSeleccionar, onCamara }) {
  const { tr } = useLang()
  const arrastre = useRef(null)
  const S = ESCALA_BASE * zoom

  // Las órbitas no dependen de la fecha: se recalculan solo al cambiar la escala.
  const orbitas = useMemo(() => Object.fromEntries(IDS.map(id => {
    const f = factorDistancia(id, modoDistancia)
    return [id, puntosOrbita(id).map(p => ({ x: p.x * f, y: p.y * f, z: p.z * f }))]
  })), [modoDistancia])

  const pantalla = p => {
    const q = proyectar(p, camara)
    return { x: CX + q.sx * S, y: CY + q.sy * S, escala: q.escala, profundidad: q.profundidad }
  }

  const cuerpos = [
    { id: 'sol', ...pantalla({ x: 0, y: 0, z: 0 }), r: 0.045 },
    ...IDS.map(id => {
      const f = factorDistancia(id, modoDistancia)
      const p = posicion(id, fecha)
      return { id, ...pantalla({ x: p.x * f, y: p.y * f, z: p.z * f }), r: radioPlaneta(id, modoTamano) }
    }),
  ].sort((a, b) => a.profundidad - b.profundidad)

  function empezarArrastre(e) {
    arrastre.current = { x: e.clientX, y: e.clientY, az: camara.az, el: camara.el, movido: false }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  function moverArrastre(e) {
    const a = arrastre.current
    if (!a) return
    const dx = e.clientX - a.x, dy = e.clientY - a.y
    if (Math.abs(dx) + Math.abs(dy) > 4) a.movido = true
    onCamara({ ...camara, az: (a.az - dx * 0.35 + 360) % 360, el: Math.max(3, Math.min(90, a.el + dy * 0.3)) })
  }
  function soltar(e) {
    const a = arrastre.current
    arrastre.current = null
    if (a && !a.movido) {
      const id = e.target?.closest?.('[data-planeta]')?.getAttribute('data-planeta')
      if (id) onSeleccionar(id)
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
      aria-label={tr({ es: 'Sistema solar en 3D', en: '3D solar system', ca: 'Sistema solar en 3D' })}
      onPointerDown={empezarArrastre} onPointerMove={moverArrastre} onPointerUp={soltar} onPointerCancel={() => { arrastre.current = null }}
      className="rounded-2xl border border-white/10 block select-none touch-none cursor-grab active:cursor-grabbing"
      style={{ background: 'radial-gradient(ellipse at center, #111827 0%, #05070d 75%)' }}>
      <defs>
        <radialGradient id="ss-sol" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7d6" />
          <stop offset="45%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <radialGradient id="ss-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        {IDS.map(id => (
          <radialGradient key={id} id={`ss-${id}`} cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="18%" stopColor={FISICOS[id].color} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
          </radialGradient>
        ))}
      </defs>

      {ESTRELLAS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} />)}

      {IDS.map(id => (
        <polyline key={id} fill="none"
          points={orbitas[id].map(p => { const q = pantalla(p); return `${q.x.toFixed(1)},${q.y.toFixed(1)}` }).join(' ')}
          stroke={id === seleccionado ? FISICOS[id].color : '#ffffff'} strokeOpacity={id === seleccionado ? 0.7 : 0.14}
          strokeWidth={id === seleccionado ? 1.6 : 1} />
      ))}

      {cuerpos.map(c => {
        const r = Math.max(c.id === 'sol' ? 6 : 2.2, c.r * S * c.escala)
        if (c.id === 'sol') {
          return (
            <g key="sol">
              <circle cx={c.x} cy={c.y} r={r * 2.6} fill="url(#ss-halo)" />
              <circle cx={c.x} cy={c.y} r={r} fill="url(#ss-sol)" />
            </g>
          )
        }
        const sel = c.id === seleccionado
        const anillo = c.id === 'saturno'
        const inclinacion = Math.max(0.18, Math.abs(Math.sin((camara.el * Math.PI) / 180)))
        return (
          <g key={c.id} data-planeta={c.id} className="cursor-pointer">
            {/* Zona de toque más grande que el planeta: los de dentro miden
                dos píxeles y serían imposibles de tocar en un móvil. */}
            <circle cx={c.x} cy={c.y} r={Math.max(14, r + 6)} fill="transparent" />
            {anillo && <ellipse cx={c.x} cy={c.y} rx={r * 2.3} ry={r * 2.3 * inclinacion} fill="none" stroke="#e3c98f" strokeOpacity={0.55} strokeWidth={Math.max(1, r * 0.35)} />}
            <circle cx={c.x} cy={c.y} r={r} fill={`url(#ss-${c.id})`} />
            {sel && <circle cx={c.x} cy={c.y} r={r + 6} fill="none" stroke="#EDAE49" strokeWidth={1.6} strokeDasharray="3 3" />}
            <text x={c.x} y={c.y + r + 14} fontSize="12" fontWeight={sel ? 800 : 600} textAnchor="middle"
              fill={sel ? '#EDAE49' : '#ffffffb3'} stroke="#05070d" strokeWidth={3} paintOrder="stroke">
              {tr(NOMBRE[c.id])}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
