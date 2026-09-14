import { useMemo, useRef } from 'react'
import { geoOrthographic, geoPath, geoGraticule10, geoDistance } from 'd3-geo'
import { useLang } from '../context/LangContext'
import { PAISES_GLOBO, LINEAS, paisEn, puntoSubsolar, zonaNoche, capitalPais } from '../lib/globo'

// El globo en SVG con la proyección ortográfica de d3: la Tierra vista desde
// lejos, como una esfera. d3 recorta cada país en el borde visible, que es lo
// difícil de hacer a mano; aquí solo se dibuja y se gestiona el gesto.
//
// Arrastrar gira. Tocar sin arrastrar elige el país del punto y lee sus
// coordenadas. Mover el puntero sin pulsar también las lee, para que en un
// ordenador se pueda recorrer el globo leyendo latitudes.

const T = 600
const C = T / 2
const RADIO = 280
const GRATICULA = geoGraticule10()

// Durante el prerender (scripts/prerender.mjs inyecta esta bandera) no se
// dibujan los países. El HTML guardado llevaba los 177 polígonos y pesaba 183 KB
// comprimido, nueve veces el del sistema solar, por un dibujo que el navegador
// vuelve a hacer igualmente al cargar y que a un buscador no le dice nada: lo
// indexable es el texto de la página, que sí se guarda. La app monta con
// createRoot, no hidrata, así que pintar distinto no da ningún aviso.
const EN_PRERENDER = typeof window !== 'undefined' && window.__PRERENDER__ === true

export default function GloboTerraqueo({ rotacion, zoom, seleccionado, mostrarLineas, fechaSol, onRotar, onSeleccionar, onCursor }) {
  const { lang, tr } = useLang()
  const svgRef = useRef(null)
  const arrastre = useRef(null)

  const radio = RADIO * zoom
  const proyeccion = geoOrthographic().scale(radio).translate([C, C]).rotate(rotacion).clipAngle(90)
  const camino = geoPath(proyeccion)
  const centro = [-rotacion[0], -rotacion[1]]
  const visible = p => geoDistance(p, centro) < Math.PI / 2 - 0.12

  const noche = useMemo(() => (fechaSol ? zonaNoche(fechaSol) : null), [fechaSol])
  const sol = fechaSol ? puntoSubsolar(fechaSol) : null
  const elegido = PAISES_GLOBO.find(g => g.id === seleccionado)

  // Del puntero a [lon, lat], o null si cae fuera de la esfera.
  function lonLat(e) {
    const r = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) * T) / r.width
    const y = ((e.clientY - r.top) * T) / r.height
    if (Math.hypot(x - C, y - C) > radio) return null
    return proyeccion.invert([x, y])
  }

  function abajo(e) {
    arrastre.current = { x: e.clientX, y: e.clientY, rot: rotacion, movido: false }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  function mover(e) {
    const a = arrastre.current
    if (!a) { onCursor(lonLat(e)); return }
    const dx = e.clientX - a.x, dy = e.clientY - a.y
    if (Math.abs(dx) + Math.abs(dy) > 4) a.movido = true
    // Más zoom, giro más fino: si no, con el globo ampliado un arrastre corto
    // se lleva el país de la pantalla.
    const k = 0.35 / zoom
    onRotar([a.rot[0] + dx * k, Math.max(-90, Math.min(90, a.rot[1] - dy * k))])
  }
  function arriba(e) {
    const a = arrastre.current
    arrastre.current = null
    if (a && !a.movido) {
      const p = lonLat(e)
      onCursor(p)
      if (p) onSeleccionar(paisEn(p[0], p[1])?.id ?? null)
    }
  }

  const etiqueta = ln => (ln.lon === 0
    ? [0, Math.max(-55, Math.min(55, centro[1] + 12))]
    : [centro[0], ln.lat])

  return (
    <svg ref={svgRef} viewBox={`0 0 ${T} ${T}`} role="img"
      aria-label={tr({ es: 'Globo terráqueo en 3D', en: '3D globe', ca: 'Globus terraqüi en 3D' })}
      onPointerDown={abajo} onPointerMove={mover} onPointerUp={arriba}
      onPointerLeave={() => { if (!arrastre.current) onCursor(null) }}
      onPointerCancel={() => { arrastre.current = null }}
      className="block w-full max-w-[600px] mx-auto touch-none select-none cursor-grab active:cursor-grabbing">
      <defs>
        <radialGradient id="globo-oceano" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0b1b3f" />
        </radialGradient>
        <radialGradient id="globo-halo" cx="50%" cy="50%" r="50%">
          <stop offset="88%" stopColor="#60a5fa" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={C} cy={C} r={radio * 1.07} fill="url(#globo-halo)" />
      <path d={camino({ type: 'Sphere' })} fill="url(#globo-oceano)" />
      <path d={camino(GRATICULA)} fill="none" stroke="#ffffff" strokeOpacity={0.09} strokeWidth={0.6} />

      {!EN_PRERENDER && PAISES_GLOBO.map(g => {
        const d = camino(g.feature)
        if (!d) return null
        const sel = g.id === seleccionado
        return <path key={g.id} d={d} fill={sel ? '#EDAE49' : g.pais ? '#4d9a6a' : '#6b7d70'} stroke="#0b1b3f" strokeWidth={0.6} />
      })}

      {noche && !EN_PRERENDER && <path d={camino(noche)} fill="#020617" fillOpacity={0.55} pointerEvents="none" />}

      {mostrarLineas && LINEAS.map(ln => (
        <path key={ln.id} d={camino(ln.geo)} fill="none" stroke={ln.color} strokeWidth={1.5} strokeOpacity={0.9}
          strokeDasharray={ln.lon === 0 ? '6 4' : undefined} pointerEvents="none" />
      ))}
      {mostrarLineas && LINEAS.map(ln => {
        const p = etiqueta(ln)
        if (!visible(p)) return null
        const [x, y] = proyeccion(p)
        return (
          <text key={`t-${ln.id}`} x={x + 4} y={y - 5} fontSize="12" fontWeight="700" fill={ln.color}
            stroke="#0b1b3f" strokeWidth={3} paintOrder="stroke" pointerEvents="none">{tr(ln.nombre)}</text>
        )
      })}

      {elegido?.capital && visible([elegido.capital.lon, elegido.capital.lat]) && (() => {
        const [x, y] = proyeccion([elegido.capital.lon, elegido.capital.lat])
        return (
          <g pointerEvents="none">
            <circle cx={x} cy={y} r={5} fill="#fff" stroke="#b91c1c" strokeWidth={2.5} />
            <text x={x + 8} y={y + 4} fontSize="13" fontWeight="800" fill="#fff" stroke="#0b1b3f" strokeWidth={3} paintOrder="stroke">
              {capitalPais(elegido, lang)}
            </text>
          </g>
        )
      })()}

      {sol && visible([sol.lon, sol.lat]) && (() => {
        const [x, y] = proyeccion([sol.lon, sol.lat])
        return (
          <g pointerEvents="none">
            <circle cx={x} cy={y} r={14} fill="#fde047" opacity={0.3} />
            <circle cx={x} cy={y} r={7} fill="#fde047" stroke="#f59e0b" strokeWidth={2} />
          </g>
        )
      })()}

      <circle cx={C} cy={C} r={radio} fill="none" stroke="#93c5fd" strokeOpacity={0.25} pointerEvents="none" />
    </svg>
  )
}
