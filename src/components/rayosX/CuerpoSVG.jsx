/**
 * El cuerpo de Rayos X: cuatro láminas de ilustración médica real, sin rótulos
 * (public/rayos-x/*.webp — fuentes y licencias en public/rayos-x/CREDITOS.md):
 *   organos   composición de Servier Medical Art (CC BY 4.0) sobre silueta CC0
 *   huesos    esqueleto de LadyofHats / M. Häggström (dominio público)
 *   musculos  músculos de frente  ┐ OpenStax, T. Kebert, umimeto.org
 *   espalda   músculos de espalda ┘ (CC BY-SA 4.0)
 *
 * Encima va una capa INVISIBLE de zonas (src/data/rayosXZonas.js, generada por
 * scripts/rayos-x/construir.mjs): el contorno de cada zona es el de la propia
 * ilustración, un poco ensanchado sobre el fondo para el dedo, y ninguna pisa a
 * otra. El acierto lo decide la zona tocada — sin distancias ni radios.
 *
 * Vista FRONTAL como en un atlas: la derecha de la persona queda a la
 * IZQUIERDA del dibujo. Huesos y músculos de brazos y piernas valen a los dos lados.
 *
 * Lupa: con el dedo en pantallas estrechas, si el toque cae entre zonas
 * distintas (muñeca, rótula, ojos…), primero acerca la imagen ×2,5 y el
 * siguiente toque responde. Un toque claro responde a la primera.
 *
 * Props:
 *   capa      'organos' | 'huesos' | 'musculos' (de frente) | 'espalda'
 *   onPick    (id) => void — null para bloquear
 *   elegido   id tocado por el jugador
 *   correcto  id que había que tocar (solo al revelar)
 *   revelado  true tras responder: verde la correcta, rojo la elegida, el resto apagado
 */
import { useState, useRef, useMemo } from 'react'
import { useLang } from '../../context/LangContext'
import { LAMINAS } from '../../data/rayosXZonas'

// Ids que se pueden tocar en cada capa (el test comprueba que coinciden con
// data/organos.js y con las zonas generadas).
export const PIEZAS_ORGANOS = ['cerebro', 'ojos', 'boca', 'traquea', 'pulmones', 'corazon', 'diafragma', 'higado', 'estomago', 'rinones', 'intestinos', 'vejiga']
export const PIEZAS_HUESOS = ['craneo', 'columna', 'costillas', 'esternon', 'clavicula', 'pelvis', 'humero', 'codo', 'radio', 'cubito', 'muneca', 'femur', 'rotula', 'tibia', 'perone', 'tobillo']
export const PIEZAS_MUSCULOS = ['deltoides', 'pectoral', 'biceps', 'antebrazo', 'abdominales', 'oblicuos', 'esternocleidomastoideo', 'cuadriceps', 'aductores', 'tibial']
export const PIEZAS_ESPALDA = ['trapecio', 'dorsal', 'triceps', 'gluteos', 'isquiotibiales', 'gemelos']
export const PIEZAS = { organos: PIEZAS_ORGANOS, huesos: PIEZAS_HUESOS, musculos: PIEZAS_MUSCULOS, espalda: PIEZAS_ESPALDA }

// Alto de cada lámina si midiera 200 de ancho (las páginas calculan con esto
// cuánto ancho cabe en la pantalla sin tener que bajar).
export const ALTO = Object.fromEntries(Object.entries(LAMINAS).map(([c, l]) => [c, Math.round((200 * l.h) / l.w)]))

const VERDE = '#4ade80'
const ROJO = '#f87171'
const LUPA = 2.5
const DEDO = 11 // radio (px de pantalla) que se considera «el dedo»
const TACTIL = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches

export default function CuerpoSVG({ capa, onPick, elegido, correcto, revelado }) {
  const { tr } = useLang()
  const lam = LAMINAS[capa] ?? LAMINAS.organos
  const vista = useMemo(() => [0, 0, lam.w, lam.h], [lam])
  const [zoom, setZoom] = useState(null) // { capa, caja } mientras está ampliado
  const svgRef = useRef(null)
  const zonasRef = useRef({})
  const puntero = useRef(TACTIL ? 'touch' : 'mouse')

  const ids = PIEZAS[capa] ?? PIEZAS_ORGANOS
  // Orden del tabulador: de arriba abajo y de izquierda a derecha por dónde está la zona
  const orden = useMemo(() => [...ids].sort((a, b) => {
    const [ax, ay] = lam.zonas[a].centros[0], [bx, by] = lam.zonas[b].centros[0]
    return Math.abs(ay - by) > 30 ? ay - by : ax - bx
  }), [ids, lam])

  const caja = !revelado && onPick && zoom?.capa === capa ? zoom.caja : vista
  const ampliado = caja !== vista
  const k = caja[2] / vista[2] // los trazos encogen con la lupa

  // Punto de la pantalla → coordenadas de la lámina
  const aLamina = (cx, cy) => {
    const ctm = svgRef.current?.getScreenCTM?.()
    return ctm ? new DOMPoint(cx, cy).matrixTransform(ctm.inverse()) : null
  }
  // ¿Qué zonas hay bajo el dedo? (centro + un anillo de 8 puntos)
  const zonasBajoDedo = ev => {
    const svg = svgRef.current
    if (!svg) return []
    const escala = svg.getScreenCTM()?.a || 1
    const r = DEDO / escala
    const p = aLamina(ev.clientX, ev.clientY)
    if (!p) return []
    const puntos = [[0, 0], ...Array.from({ length: 8 }, (_, i) => [Math.cos(i * Math.PI / 4) * r, Math.sin(i * Math.PI / 4) * r])]
    const vistas = new Set()
    for (const [dx, dy] of puntos) {
      const q = new DOMPoint(p.x + dx, p.y + dy)
      for (const id of ids) if (zonasRef.current[id]?.isPointInFill?.(q)) vistas.add(id)
    }
    return [...vistas]
  }
  const usaLupa = () => !ampliado && puntero.current === 'touch' && (svgRef.current?.clientWidth ?? 999) < 560
  function amplia(ev) {
    const p = aLamina(ev.clientX, ev.clientY)
    if (!p) return
    const w = vista[2] / LUPA, h = vista[3] / LUPA
    const x = Math.min(Math.max(p.x - w / 2, 0), vista[2] - w), y = Math.min(Math.max(p.y - h / 2, 0), vista[3] - h)
    setZoom({ capa, caja: [x, y, w, h] })
  }
  function pulsa(id, ev) {
    if (!onPick || revelado) return
    if (usaLupa() && zonasBajoDedo(ev).length > 1) { amplia(ev); return }
    setZoom(null)
    onPick(id)
  }

  // Al revelar: todo apagado menos la zona correcta y la elegida (agujeros evenodd en un velo)
  const destacadas = revelado ? [correcto, elegido].filter((id, i, a) => id && lam.zonas[id] && a.indexOf(id) === i) : []
  const velo = `M0 0H${lam.w}V${lam.h}H0Z` + destacadas.map(id => lam.zonas[id].d).join('')

  return (
    <div className="relative">
      <svg ref={svgRef} viewBox={caja.join(' ')} className="w-full h-auto block select-none"
        role={onPick ? 'group' : 'img'} style={{ touchAction: 'manipulation' }}
        onPointerDown={ev => { puntero.current = ev.pointerType }}
        aria-label={tr({ es: 'Vista anatómica', en: 'Anatomical view', ca: 'Vista anatòmica' })}>
        <defs>
          <radialGradient id="rx-fondo" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#10244a" />
            <stop offset="100%" stopColor="#050b1a" />
          </radialGradient>
        </defs>
        <rect width={lam.w} height={lam.h} fill="url(#rx-fondo)" />
        <image href={lam.img} width={lam.w} height={lam.h} preserveAspectRatio="none" />

        {revelado && (
          <path d={velo} fill="#050b1a" fillOpacity="0.72" fillRule="evenodd" className="pointer-events-none" style={{ transition: 'opacity .2s' }} />
        )}
        {destacadas.map(id => {
          const c = id === correcto ? VERDE : ROJO
          return (
            <path key={`r-${id}`} d={lam.zonas[id].d} fill={c} fillOpacity="0.18" fillRule="evenodd"
              stroke={c} strokeWidth={4 * k} strokeLinejoin="round" className="pointer-events-none"
              style={{ filter: `drop-shadow(0 0 ${6 * k}px ${c})` }} data-revela={id === correcto ? 'correcto' : 'elegido'} />
          )
        })}

        {/* Zonas de toque: invisibles, sin nombre (solo «Zona n»), en orden de arriba abajo */}
        {onPick && !revelado && orden.map((id, n) => (
          <path key={id} ref={el => { zonasRef.current[id] = el }} d={lam.zonas[id].d} fillRule="evenodd"
            data-zona={id} fill="transparent" stroke="transparent" strokeWidth={3 * k}
            role="button" tabIndex={0}
            aria-label={tr({ es: `Zona ${n + 1} de ${orden.length}`, en: `Area ${n + 1} of ${orden.length}`, ca: `Zona ${n + 1} de ${orden.length}` })}
            className="cursor-pointer outline-none focus-visible:[fill:rgba(56,189,248,0.22)] focus-visible:[stroke:#fff]"
            style={{ pointerEvents: 'fill' }}
            onClick={ev => { ev.stopPropagation(); pulsa(id, ev) }}
            onKeyDown={ev => {
              if (ev.repeat || !['Enter', ' '].includes(ev.key)) return
              ev.preventDefault(); ev.stopPropagation()
              setZoom(null); onPick(id)
            }} />
        ))}
      </svg>
      {ampliado && (
        <button type="button" onClick={() => setZoom(null)}
          className="absolute top-2 right-2 rounded-lg bg-slate-900/85 text-white text-xs font-bold px-2.5 py-1.5 shadow border border-white/15">
          {tr({ es: '🔍 Ver entero', en: '🔍 Whole body', ca: '🔍 Veure-ho sencer' })}
        </button>
      )}
    </div>
  )
}
