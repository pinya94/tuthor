// Reloj analógico en SVG. Lo usan el juego (RelojHoras.jsx) y su examen.
//
// Dos formas de poner la hora, las dos siempre activas:
//   · Arrastrar la AGARRADERA (el círculo grande) de cada aguja alrededor del
//     reloj. Se agarra la aguja cuya agarradera esté más cerca del dedo.
//   · Los botones + / − de hora y de minutos (de 5 en 5) — infalibles.
//
// Las dos agujas son INDEPENDIENTES: mover los minutos no mueve la aguja de la
// hora (eso, aunque sea lo realista, despistaba al colocar). La aguja de la
// hora apunta al número de la hora.
import { useRef, useCallback } from 'react'

const CX = 100, CY = 100
const R = 92
const LEN_MIN = 74
const LEN_HORA = 52
const KNOB_MIN = 11
const KNOB_HORA = 11

function punta(len, grados) {
  const rad = (grados * Math.PI) / 180
  return [CX + len * Math.sin(rad), CY - len * Math.cos(rad)]
}
function anguloDesdeArriba(x, y) {
  const a = (Math.atan2(x - CX, -(y - CY)) * 180) / Math.PI
  return (a + 360) % 360
}

const COLORES = {
  idle:       { hora: '#e2e8f0', min: '#38bdf8' },
  correcto:   { hora: '#4ade80', min: '#4ade80' },
  incorrecto: { hora: '#f87171', min: '#f87171' },
}

export default function RelojAnalogico({ value, onChange, interactive = false, estado = 'idle', objetivo = null, lang = 'es' }) {
  const svgRef = useRef(null)
  const activaRef = useRef(null)
  const valueRef = useRef(value)
  valueRef.current = value

  const hourSlot = value.hora % 12
  const angMin = value.minuto * 6
  const angHora = hourSlot * 30
  const [mx, my] = punta(LEN_MIN, angMin)
  const [hx, hy] = punta(LEN_HORA, angHora)
  const col = COLORES[estado] ?? COLORES.idle

  const puntoSVG = useCallback(e => {
    const r = svgRef.current.getBoundingClientRect()
    return [((e.clientX - r.left) / r.width) * 200, ((e.clientY - r.top) / r.height) * 200]
  }, [])

  const rotar = useCallback((x, y) => {
    const ang = anguloDesdeArriba(x, y)
    const v = valueRef.current
    let next
    if (activaRef.current === 'min') {
      const m = (Math.round(Math.round(ang / 6) / 5) * 5) % 60
      next = { ...v, minuto: m }
    } else {
      const slot = Math.round(ang / 30) % 12
      next = { ...v, hora: slot === 0 ? 12 : slot }
    }
    valueRef.current = next
    onChange(next)
  }, [onChange])

  const onDown = useCallback(e => {
    if (!interactive) return
    const [x, y] = puntoSVG(e)
    // agarra la aguja cuya AGARRADERA esté más cerca del dedo
    const dMin = Math.hypot(x - mx, y - my)
    const dHora = Math.hypot(x - hx, y - hy)
    activaRef.current = dMin <= dHora ? 'min' : 'hora'
    e.currentTarget.setPointerCapture?.(e.pointerId)
    rotar(x, y)
  }, [interactive, puntoSVG, mx, my, hx, hy, rotar])

  const onMove = useCallback(e => {
    if (!interactive || !activaRef.current) return
    const [x, y] = puntoSVG(e)
    rotar(x, y)
  }, [interactive, puntoSVG, rotar])

  const onUp = useCallback(() => { activaRef.current = null }, [])

  // Botones + / −
  const setHora = h => onChange({ ...value, hora: ((h - 1 + 12) % 12) + 1 })
  const setMin = m => onChange({ ...value, minuto: (m + 60) % 60 })

  // Fantasma de la hora correcta al fallar
  let ghost = null
  if (objetivo && estado === 'incorrecto') {
    const [gmx, gmy] = punta(LEN_MIN, objetivo.minuto * 6)
    const [ghx, ghy] = punta(LEN_HORA, (objetivo.hora % 12) * 30)
    ghost = { gmx, gmy, ghx, ghy }
  }

  return (
    <div>
      <svg ref={svgRef} viewBox="0 0 200 200" width="100%" style={{ display: 'block', touchAction: interactive ? 'none' : 'auto', maxWidth: 300, margin: '0 auto', cursor: interactive ? 'pointer' : 'default' }}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <circle cx={CX} cy={CY} r={R} fill="#0d1117" stroke="#334155" strokeWidth="3" />
        {Array.from({ length: 60 }).map((_, i) => {
          const g = i % 5 === 0
          const [x1, y1] = punta(R - (g ? 10 : 5), i * 6)
          const [x2, y2] = punta(R - 2, i * 6)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={g ? '#94a3b8' : '#475569'} strokeWidth={g ? 2 : 1} />
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const n = i === 0 ? 12 : i
          const [x, y] = punta(R - 22, i * 30)
          return <text key={i} x={x} y={y + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill="#cbd5e1" style={{ userSelect: 'none' }}>{n}</text>
        })}

        {ghost && <>
          <line x1={CX} y1={CY} x2={ghost.ghx} y2={ghost.ghy} stroke="#4ade80" strokeOpacity="0.35" strokeWidth="7" strokeLinecap="round" />
          <line x1={CX} y1={CY} x2={ghost.gmx} y2={ghost.gmy} stroke="#4ade80" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
        </>}

        {/* Aguja de la hora + agarradera */}
        <line x1={CX} y1={CY} x2={hx} y2={hy} stroke={col.hora} strokeWidth="7" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
        {interactive && <circle cx={hx} cy={hy} r={KNOB_HORA} fill={col.hora} stroke="#0d1117" strokeWidth="2.5" style={{ pointerEvents: 'none' }} />}
        {/* Aguja de los minutos + agarradera */}
        <line x1={CX} y1={CY} x2={mx} y2={my} stroke={col.min} strokeWidth="5" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
        {interactive && <circle cx={mx} cy={my} r={KNOB_MIN} fill={col.min} stroke="#0d1117" strokeWidth="2.5" style={{ pointerEvents: 'none' }} />}
        <circle cx={CX} cy={CY} r="5" fill={col.min} style={{ pointerEvents: 'none' }} />
      </svg>

      {interactive && (
        <div className="flex justify-center gap-3 mt-3">
          <Stepper colorClass="text-sky-300"
            texto={lang === 'en' ? 'Hour' : 'Hora'}
            value={value.hora}
            onDec={() => setHora(value.hora - 1)} onInc={() => setHora(value.hora + 1)} />
          <Stepper colorClass="text-white"
            texto="Min"
            value={String(value.minuto).padStart(2, '0')}
            onDec={() => setMin(value.minuto - 5)} onInc={() => setMin(value.minuto + 5)} />
        </div>
      )}
    </div>
  )
}

function Stepper({ texto, value, onDec, onInc, colorClass }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-white/40 text-xs w-8 text-right">{texto}</span>
      <button type="button" onClick={onDec} aria-label="−"
        className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 text-white text-xl font-black active:bg-white/20 transition">−</button>
      <span className={`w-9 text-center text-xl font-black tabular-nums ${colorClass}`}>{value}</span>
      <button type="button" onClick={onInc} aria-label="+"
        className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 text-white text-xl font-black active:bg-white/20 transition">+</button>
    </div>
  )
}
