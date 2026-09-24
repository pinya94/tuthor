// Reloj analógico en SVG. Lo usan el juego (RelojHoras.jsx) y su examen.
//
// El valor es { minuto, horaAng }: los minutos (aguja larga, de 5 en 5) y el
// ÁNGULO de la aguja de la hora (continuo, en grados desde las 12). Las dos
// agujas son INDEPENDIENTES: mover una no mueve la otra.
//
// La aguja de la hora se coloca donde el jugador quiere, de forma REALISTA:
// para las 11:20 no va clavada en el 11, sino un poco adelantada (la puntuación
// la acepta con un margen, ver esCorrecta en lib/reloj.js).
//
// Dos formas de ponerla, las dos activas:
//   · Arrastrar la AGARRADERA (el círculo grande) de cada aguja.
//   · Botones + / − : la hora salta de hora en hora; los minutos, de 5 en 5.
import { useRef, useCallback } from 'react'

const CX = 100, CY = 100
const R = 92
const LEN_MIN = 74
const LEN_HORA = 52
const KNOB = 11

function punta(len, grados) {
  const rad = (grados * Math.PI) / 180
  return [CX + len * Math.sin(rad), CY - len * Math.cos(rad)]
}
function anguloDesdeArriba(x, y) {
  const a = (Math.atan2(x - CX, -(y - CY)) * 180) / Math.PI
  return (a + 360) % 360
}
// Ángulo realista de la aguja de la hora para la hora correcta (para el fantasma).
function angHoraReal({ hora, minuto }) {
  return (((hora % 12) + minuto / 60) * 30 + 360) % 360
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

  const angMin = value.minuto * 6
  const angHora = value.horaAng
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
      next = { ...v, horaAng: (Math.round(ang / 2) * 2 + 360) % 360 } // continuo, paso fino de 2°
    }
    valueRef.current = next
    onChange(next)
  }, [onChange])

  const onDown = useCallback(e => {
    if (!interactive) return
    const [x, y] = puntoSVG(e)
    const dMin = Math.hypot(x - mx, y - my)
    const dHora = Math.hypot(x - hx, y - hy)
    // Si el dedo cae sobre una agarradera, esa; si no (toque suelto en el reloj,
    // p. ej. con las dos agujas juntas en las 12), decide el radio: fuera la
    // larga (minutos), dentro la corta (hora).
    if (Math.min(dMin, dHora) < 22) activaRef.current = dMin <= dHora ? 'min' : 'hora'
    else activaRef.current = Math.hypot(x - CX, y - CY) >= 60 ? 'min' : 'hora'
    e.currentTarget.setPointerCapture?.(e.pointerId)
    rotar(x, y)
  }, [interactive, puntoSVG, mx, my, hx, hy, rotar])

  const onMove = useCallback(e => {
    if (!interactive || !activaRef.current) return
    const [x, y] = puntoSVG(e)
    rotar(x, y)
  }, [interactive, puntoSVG, rotar])

  const onUp = useCallback(() => { activaRef.current = null }, [])

  // Hora entera que representa la aguja ahora mismo (quitando el avance por
  // los minutos), 0..11.
  const horaEntera = ((Math.round((value.horaAng - value.minuto * 0.5) / 30) % 12) + 12) % 12
  // El botón de la hora coloca la aguja en su sitio REALISTA para los minutos
  // actuales (así, con botones, sale bien): a las 3:50 apunta casi al 4.
  const btnHora = d => {
    const nh = horaEntera + d
    onChange({ ...value, horaAng: ((nh * 30 + value.minuto * 0.5) % 360 + 360) % 360 })
  }
  // Al cambiar los minutos con los botones, la aguja de la hora se mantiene en
  // su sitio realista (misma hora entera, nuevo avance) — así, con botones, sale
  // bien en cualquier orden. (Arrastrando, cada aguja va por su cuenta.)
  const btnMin = d => {
    const nm = (value.minuto + d + 60) % 60
    onChange({ minuto: nm, horaAng: ((horaEntera * 30 + nm * 0.5) % 360 + 360) % 360 })
  }
  const horaNum = horaEntera === 0 ? 12 : horaEntera

  let ghost = null
  if (objetivo && estado === 'incorrecto') {
    const [gmx, gmy] = punta(LEN_MIN, objetivo.minuto * 6)
    const [ghx, ghy] = punta(LEN_HORA, angHoraReal(objetivo))
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

        <line x1={CX} y1={CY} x2={hx} y2={hy} stroke={col.hora} strokeWidth="7" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
        {interactive && <circle cx={hx} cy={hy} r={KNOB} fill={col.hora} stroke="#0d1117" strokeWidth="2.5" style={{ pointerEvents: 'none' }} />}
        <line x1={CX} y1={CY} x2={mx} y2={my} stroke={col.min} strokeWidth="5" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
        {interactive && <circle cx={mx} cy={my} r={KNOB} fill={col.min} stroke="#0d1117" strokeWidth="2.5" style={{ pointerEvents: 'none' }} />}
        <circle cx={CX} cy={CY} r="5" fill={col.min} style={{ pointerEvents: 'none' }} />
      </svg>

      {interactive && (
        <div className="flex justify-center gap-3 mt-3">
          <Stepper colorClass="text-white" texto={lang === 'en' ? 'Hour' : 'Hora'}
            value={horaNum} onDec={() => btnHora(-30)} onInc={() => btnHora(30)} />
          <Stepper colorClass="text-sky-300" texto="Min"
            value={String(value.minuto).padStart(2, '0')} onDec={() => btnMin(-5)} onInc={() => btnMin(5)} />
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
