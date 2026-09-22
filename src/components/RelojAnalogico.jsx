// Reloj analógico en SVG, con manecillas ARRASTRABLES. Lo usan el juego
// (RelojHoras.jsx) y su examen. Se arrastra cada manecilla girándola alrededor
// del centro —un gesto rotatorio, natural con el dedo, no dos sliders lineales—
// y al soltar (o mientras) el valor se ajusta al minuto permitido.
//
// La manecilla de la hora se dibuja de forma realista: a y media, apunta a la
// mitad entre las dos horas (avanza medio grado por minuto). La comprobación,
// en cambio, mira la hora exacta a la que la acercas.
import { useRef, useCallback } from 'react'

const CX = 100, CY = 100
const R = 92
const LEN_MIN = 72   // manecilla de minutos (larga)
const LEN_HORA = 50  // manecilla de horas (corta)

// Punto en el borde de una manecilla, dado el ángulo DESDE ARRIBA (0 = las 12).
function punta(len, gradosDesdeArriba) {
  const rad = (gradosDesdeArriba * Math.PI) / 180
  return [CX + len * Math.sin(rad), CY - len * Math.cos(rad)]
}

// Ángulo (0..360, desde las 12, en sentido horario) de un punto respecto al centro.
function anguloDesdeArriba(x, y) {
  const a = (Math.atan2(x - CX, -(y - CY)) * 180) / Math.PI
  return (a + 360) % 360
}

const COLORES = {
  idle:        { hora: '#e2e8f0', min: '#38bdf8' },
  correcto:    { hora: '#4ade80', min: '#4ade80' },
  incorrecto:  { hora: '#f87171', min: '#f87171' },
}

export default function RelojAnalogico({ value, onChange, interactive = false, estado = 'idle', objetivo = null }) {
  const svgRef = useRef(null)
  const activaRef = useRef(null) // 'hora' | 'min'
  // Siempre el valor más reciente: así dos ajustes seguidos (minutos y luego
  // hora) no se pisan por leer un `value` viejo del closure.
  const valueRef = useRef(value)
  valueRef.current = value

  const hourSlot = value.hora % 12                       // 12 → 0
  const angMin = value.minuto * 6                         // 6° por minuto
  const angHora = hourSlot * 30 + value.minuto * 0.5      // 30° por hora + medio grado por minuto
  const [mx, my] = punta(LEN_MIN, angMin)
  const [hx, hy] = punta(LEN_HORA, angHora)
  const col = COLORES[estado] ?? COLORES.idle

  const puntoSVG = useCallback(e => {
    const svg = svgRef.current
    const r = svg.getBoundingClientRect()
    return [((e.clientX - r.left) / r.width) * 200, ((e.clientY - r.top) / r.height) * 200]
  }, [])

  const aplicar = useCallback((x, y) => {
    const ang = anguloDesdeArriba(x, y)
    const v = valueRef.current
    let next
    if (activaRef.current === 'min') {
      // ajustar al múltiplo de 5 más cercano
      let m = Math.round(ang / 6)
      m = (Math.round(m / 5) * 5) % 60
      next = { ...v, minuto: m }
    } else {
      const slot = Math.round(ang / 30) % 12
      next = { ...v, hora: slot === 0 ? 12 : slot }
    }
    valueRef.current = next // actualiza ya, sin esperar al render, para encadenar ajustes seguidos
    onChange(next)
  }, [onChange])

  const onDown = useCallback(e => {
    if (!interactive) return
    const [x, y] = puntoSVG(e)
    // La manecilla se agarra por el RADIO del toque: cerca del borde (banda
    // larga) mueves los minutos; hacia el centro, la hora. Es como un reloj de
    // verdad y no depende de dónde estén ahora las manecillas.
    const radio = Math.hypot(x - CX, y - CY)
    activaRef.current = radio >= 58 ? 'min' : 'hora'
    e.currentTarget.setPointerCapture?.(e.pointerId)
    aplicar(x, y)
  }, [interactive, puntoSVG, aplicar])

  const onMove = useCallback(e => {
    if (!interactive || !activaRef.current) return
    const [x, y] = puntoSVG(e)
    aplicar(x, y)
  }, [interactive, puntoSVG, aplicar])

  const onUp = useCallback(() => { activaRef.current = null }, [])

  // Manecillas fantasma de la hora correcta (al fallar)
  let ghost = null
  if (objetivo && estado === 'incorrecto') {
    const gAngMin = objetivo.minuto * 6
    const gAngHora = (objetivo.hora % 12) * 30 + objetivo.minuto * 0.5
    const [gmx, gmy] = punta(LEN_MIN, gAngMin)
    const [ghx, ghy] = punta(LEN_HORA, gAngHora)
    ghost = { gmx, gmy, ghx, ghy }
  }

  return (
    <svg ref={svgRef} viewBox="0 0 200 200" width="100%" style={{ display: 'block', touchAction: interactive ? 'none' : 'auto', maxWidth: 320, margin: '0 auto', cursor: interactive ? 'grab' : 'default' }}
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
      {/* Esfera */}
      <circle cx={CX} cy={CY} r={R} fill="#0d1117" stroke="#334155" strokeWidth="3" />
      {/* Marcas de minuto */}
      {Array.from({ length: 60 }).map((_, i) => {
        const grande = i % 5 === 0
        const [x1, y1] = punta(R - (grande ? 10 : 5), i * 6)
        const [x2, y2] = punta(R - 2, i * 6)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={grande ? '#94a3b8' : '#475569'} strokeWidth={grande ? 2 : 1} />
      })}
      {/* Números */}
      {Array.from({ length: 12 }).map((_, i) => {
        const n = i === 0 ? 12 : i
        const [x, y] = punta(R - 22, i * 30)
        return <text key={i} x={x} y={y + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill="#cbd5e1" style={{ userSelect: 'none' }}>{n}</text>
      })}

      {/* Fantasma de la hora correcta */}
      {ghost && <>
        <line x1={CX} y1={CY} x2={ghost.ghx} y2={ghost.ghy} stroke="#4ade80" strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round" />
        <line x1={CX} y1={CY} x2={ghost.gmx} y2={ghost.gmy} stroke="#4ade80" strokeOpacity="0.4" strokeWidth="4" strokeLinecap="round" />
      </>}

      {/* Manecilla de la hora */}
      <line x1={CX} y1={CY} x2={hx} y2={hy} stroke={col.hora} strokeWidth="7" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      {/* Manecilla de los minutos */}
      <line x1={CX} y1={CY} x2={mx} y2={my} stroke={col.min} strokeWidth="4" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      {/* Centro */}
      <circle cx={CX} cy={CY} r="5" fill={col.min} style={{ pointerEvents: 'none' }} />
    </svg>
  )
}
