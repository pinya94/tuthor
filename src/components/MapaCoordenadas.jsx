// Mapamundi con marcador(es) de latitud/longitud — usado por el juego
// Coordenadas (src/pages/Coordenadas.jsx) y su examen
// (src/pages/CoordenadasExamen.jsx). Durante el turno solo se ve la marca
// del jugador moviéndose; el país real y la línea de distancia se revelan
// solo cuando `revelado` es true.
import { ComposableMap, Geographies, Geography, Graticule, Marker, Line } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

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

export default function MapaCoordenadas({ guessLat, guessLon, real, revelado }) {
  const color = !revelado ? '#EDAE49'
    : real.resultado === 'perfecto' ? '#4ade80'
    : real.resultado === 'cerca' ? '#facc15'
    : '#f87171'

  return (
    <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 bg-[#0b1030]">
      <ComposableMap projectionConfig={{ scale: 140 }} width={800} height={400} style={{ width: '100%', height: '100%' }}>
        <Graticule stroke="#ffffff12" step={[30, 30]} />
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map(geo => (
            <Geography key={geo.rsmKey} geography={geo}
              fill="#1b2447" stroke="#ffffff1f" strokeWidth={0.5}
              style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }} />
          ))}
        </Geographies>

        {revelado && (
          <Line from={[guessLon, guessLat]} to={[real.lon, real.lat]} stroke={color} strokeWidth={1} strokeDasharray="3 3" />
        )}

        <Marker coordinates={[guessLon, guessLat]}>
          <circle r={5} fill={color} stroke="#000" strokeWidth={1} />
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
