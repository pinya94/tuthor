// Mapamundi con marcador(es) de latitud/longitud — usado por el juego
// Coordenadas (src/pages/Coordenadas.jsx) y su examen
// (src/pages/CoordenadasExamen.jsx). Durante el turno solo se ve la marca
// del jugador moviéndose; el país real y la línea de distancia se revelan
// solo cuando `revelado` es true.
//
// En móvil los dos sliders son incómodos, así que si el padre pasa `onPick`
// se puede tocar (o arrastrar el dedo por) el mapa para colocar la marca
// directamente. La conversión pixel → lat/lon usa la MISMA proyección que
// react-simple-maps (geoEqualEarth, escala 140, lienzo 800×400).
import { useRef, useMemo } from 'react'
import { geoEqualEarth } from 'd3-geo'
import { ComposableMap, Geographies, Geography, Graticule, Marker, Line } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const MAP_W = 800
const MAP_H = 400
const MAP_SCALE = 140

// Windows no pinta emojis de bandera (regional indicators): cae a las dos
// letras del código ("EG" en vez de 🇪🇬). Mismo arreglo que GeoMapa.jsx —
// bandera como imagen de flagcdn.com en vez del emoji.
function flagToCode(emoji) {
  return [...emoji].map(c => String.fromCharCode(c.codePointAt(0) - 0x1F1E6 + 65)).join('').toLowerCase()
}

export function FlagImg({ bandera, size = 28, className = '' }) {
  const code = flagToCode(bandera)
  return <img src={`https://flagcdn.com/w80/${code}.png`} alt={code} width={size} height={Math.round(size * 0.75)} className={`inline-block rounded shadow align-middle ${className}`} />
}

export function fmtCoord(v, pos, neg) {
  return `${Math.abs(Math.round(v))}° ${v >= 0 ? pos : neg}`
}

export default function MapaCoordenadas({ guessLat, guessLon, real, revelado, onPick }) {
  const wrapRef = useRef(null)
  const dragRef = useRef(false)
  // La proyección de react-simple-maps: geoEqualEarth centrada en el lienzo.
  const proj = useMemo(() => geoEqualEarth().scale(MAP_SCALE).translate([MAP_W / 2, MAP_H / 2]), [])

  const interactivo = typeof onPick === 'function' && !revelado

  function colocar(e) {
    if (!interactivo || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    const x = ((e.clientX - rect.left) / rect.width) * MAP_W
    const y = ((e.clientY - rect.top) / rect.height) * MAP_H
    const inv = proj.invert([x, y])
    if (!inv || Number.isNaN(inv[0]) || Number.isNaN(inv[1])) return // fuera de la Tierra
    const lon = Math.max(-180, Math.min(180, inv[0]))
    const lat = Math.max(-90, Math.min(90, inv[1]))
    onPick(lat, lon)
  }

  const color = !revelado ? '#EDAE49'
    : real.resultado === 'perfecto' ? '#4ade80'
    : real.resultado === 'cerca' ? '#facc15'
    : '#f87171'

  return (
    <div
      ref={wrapRef}
      className={`relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 bg-[#0b1030] ${interactivo ? 'cursor-crosshair' : ''}`}
      style={interactivo ? { touchAction: 'none' } : undefined}
      onPointerDown={interactivo ? e => { dragRef.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); colocar(e) } : undefined}
      onPointerMove={interactivo ? e => { if (dragRef.current) colocar(e) } : undefined}
      onPointerUp={interactivo ? () => { dragRef.current = false } : undefined}
      onPointerCancel={interactivo ? () => { dragRef.current = false } : undefined}
    >
      <ComposableMap projectionConfig={{ scale: MAP_SCALE }} width={MAP_W} height={MAP_H} style={{ width: '100%', height: '100%' }}>
        <Graticule stroke="#ffffff12" step={[30, 30]} />
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map(geo => (
            <Geography key={geo.rsmKey} geography={geo}
              fill="#1b2447" stroke="#ffffff1f" strokeWidth={0.5}
              style={{ default: { outline: 'none', pointerEvents: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }} />
          ))}
        </Geographies>

        {revelado && (
          <Line from={[guessLon, guessLat]} to={[real.lon, real.lat]} stroke={color} strokeWidth={1} strokeDasharray="3 3" />
        )}

        <Marker coordinates={[guessLon, guessLat]}>
          <circle r={6} fill={color} stroke="#000" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
          {interactivo && <circle r={12} fill="none" stroke={color} strokeWidth={1} opacity={0.4} style={{ pointerEvents: 'none' }} />}
        </Marker>

        {revelado && (
          <Marker coordinates={[real.lon, real.lat]}>
            <circle r={5} fill="#4ade80" stroke="#000" strokeWidth={1} />
            <circle r={9} fill="none" stroke="#4ade80" strokeWidth={1} opacity={0.5} />
          </Marker>
        )}
      </ComposableMap>
    </div>
  )
}
