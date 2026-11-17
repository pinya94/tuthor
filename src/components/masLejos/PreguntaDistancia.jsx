// Una ronda de ¿Más Lejos? (ver lib/masLejos): el trayecto anterior, con sus
// kilómetros, y el nuevo, sin ellos. ¿Más lejos o más cerca? Al responder
// salen los kilómetros del nuevo. El mapa se encuadra solo en los dos
// trayectos: España entera si son cortos, medio mundo si son largos.
import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps'
import { geoInterpolate } from 'd3-geo'
import { useLang } from '../../context/LangContext'
import { POR_ID, NIVELES, esCorrecta, explicacion, etiqueta, nombre, fmtKm } from '../../lib/masLejos'

const GEO_110 = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const GEO_50 = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'
const W = 800, H = 460
const GRIS = '#94a3b8', AMBAR = '#fbbf24'

const coord = id => [POR_ID[id].lon, POR_ID[id].lat]

// Encuadre: longitud media (circular) y extensión de los dos arcos, con
// puntos intermedios para que quepa la curva de los trayectos largos.
function encuadre(rutas, verLon = 10) {
  const pts = rutas.flatMap(({ a, b }) => {
    const f = geoInterpolate(coord(a), coord(b))
    return Array.from({ length: 9 }, (_, i) => f(i / 8))
  })
  const rad = x => (x * Math.PI) / 180
  const lon0 = (Math.atan2(pts.reduce((s, p) => s + Math.sin(rad(p[0])), 0), pts.reduce((s, p) => s + Math.cos(rad(p[0])), 0)) * 180) / Math.PI
  const rel = pts.map(p => ((p[0] - lon0 + 540) % 360) - 180)
  const spanLon = Math.max(verLon, Math.max(...rel) - Math.min(...rel))
  const lats = pts.map(p => p[1])
  const spanLat = Math.max(7, Math.max(...lats) - Math.min(...lats))
  const midLat = (Math.max(...lats) + Math.min(...lats)) / 2
  const ajusteLon = Math.min(...rel) + (Math.max(...rel) - Math.min(...rel)) / 2
  const escala = Math.max(W / (2 * Math.PI), Math.min((W * 0.78) / rad(spanLon), (H * 0.62) / rad(spanLat)))
  return { rotate: [-(lon0 + ajusteLon), 0, 0], center: [0, escala <= W / (2 * Math.PI) + 1 ? 0 : midLat], scale: escala, detalle: spanLon < 45 }
}

function Extremo({ id, color, l, arriba, sinTexto }) {
  return (
    <Marker coordinates={coord(id)}>
      <circle r={8} fill={color} stroke="#0a1733" strokeWidth={2.5} style={{ pointerEvents: 'none' }} />
      {!sinTexto && <text y={arriba ? -14 : 30} textAnchor="middle" fontSize="23" fontWeight="900" fill="#fff" stroke="#0a1733" strokeWidth={5} paintOrder="stroke" style={{ pointerEvents: 'none' }}>{nombre(id, l)}</text>}
    </Marker>
  )
}

function Tarjeta({ t, color, km, l, titulo }) {
  return (
    <div className="flex-1 rounded-xl border px-2.5 py-2" style={{ borderColor: `${color}66`, background: `${color}14` }}>
      <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color }}>{titulo}</p>
      <p className="text-white font-black text-[15px] leading-tight">{etiqueta(t.a, l)}</p>
      <p className="text-white/40 text-xs leading-none my-0.5">↓</p>
      <p className="text-white font-black text-[15px] leading-tight">{etiqueta(t.b, l)}</p>
      <p className="mt-1 font-black tabular-nums text-lg" style={{ color }}>{km ?? '¿…?'}</p>
    </div>
  )
}

export default function PreguntaDistancia({ ronda: r, revelado, onResponder }) {
  const [elegida, setElegida] = useState(null)
  const responde = x => { setElegida(x); onResponder(x) }
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const { anterior: p, actual: t } = r
  const enc = encuadre([p, t], NIVELES[r.nivel]?.verLon)
  const acierto = revelado && esCorrecta(r, elegida)

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-2">
        <Tarjeta t={p} color={GRIS} km={fmtKm(p.km, l)} l={l} titulo={tr({ es: 'Este', en: 'This one', ca: 'Aquest' })} />
        <Tarjeta t={t} color={AMBAR} km={revelado ? fmtKm(t.km, l) : null} l={l} titulo={tr({ es: '¿Y este?', en: 'And this one?', ca: 'I aquest?' })} />
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a1733] mb-3">
        <ComposableMap key={r.id} projection="geoEquirectangular" projectionConfig={{ rotate: enc.rotate, center: enc.center, scale: enc.scale }} width={W} height={H} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <Geographies geography={enc.detalle ? GEO_50 : GEO_110}>
            {({ geographies }) => geographies.map(geo => (
              <Geography key={geo.rsmKey} geography={geo} fill="#2b3a6b" stroke="#ffffff30" strokeWidth={0.5}
                style={{ default: { outline: 'none', pointerEvents: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }} />
            ))}
          </Geographies>
          <Line from={coord(p.a)} to={coord(p.b)} stroke={GRIS} strokeWidth={3.5} strokeDasharray="7 5" strokeLinecap="round" />
          <Line from={coord(t.a)} to={coord(t.b)} stroke={AMBAR} strokeWidth={4} strokeLinecap="round" />
          <Extremo id={p.a} color={GRIS} l={l} arriba />
          <Extremo id={p.b} color={GRIS} l={l} />
          <Extremo id={t.a} color={AMBAR} l={l} arriba sinTexto={[p.a, p.b].includes(t.a)} />
          <Extremo id={t.b} color={AMBAR} l={l} sinTexto={[p.a, p.b].includes(t.b)} />
        </ComposableMap>
      </div>

      {!revelado && (
        <div className="flex gap-2">
          <button type="button" onClick={() => responde('cerca')}
            className="flex-1 rounded-xl bg-sky-500 hover:bg-sky-400 py-3 text-black font-black text-lg">⬇ {tr({ es: 'Más cerca', en: 'Closer', ca: 'Més a prop' })}</button>
          <button type="button" onClick={() => responde('lejos')}
            className="flex-1 rounded-xl bg-amber-400 hover:bg-amber-300 py-3 text-black font-black text-lg">⬆ {tr({ es: 'Más lejos', en: 'Further', ca: 'Més lluny' })}</button>
        </div>
      )}
      {revelado && (
        <div className={`rounded-xl px-3 py-2.5 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' }) : tr({ es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' })}
          </p>
          <p className="mt-1 text-white/75 text-sm">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
