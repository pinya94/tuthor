// Una ronda de Continentes y Océanos (ver lib/continentesOceanos): se toca un
// país (cuenta su continente), un punto de océano o un punto de mar, y se
// comprueba. Mapa equirectangular: x/y lineales en lon/lat, así que al tocar
// un país a caballo entre dos continentes se sabe en qué lado se ha tocado.
import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useLang } from '../../context/LangContext'
import {
  CONTINENTES, OCEANOS, MARES, SIN_CONTINENTE, tx, lugar, continentesDe, tocaContinente,
  enContinente, enOceano, esCorrecta, enunciado, explicacion,
} from '../../lib/continentesOceanos'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const W = 800, H = 400
const K = W / 360 // px por grado
const aLonLat = (x, y) => [(x - W / 2) / K, (H / 2 - y) / K]

const VERDE = '#22c55e', ROJO = '#ef4444', AZUL = '#38bdf8'

function Punto({ coord, estado, etiqueta, onClick }) {
  const color = estado === 'bien' ? VERDE : estado === 'mal' ? ROJO : estado === 'elegido' ? AZUL : '#f8fafc'
  return (
    <Marker coordinates={coord}>
      {/* Zona de toque más grande que el punto: en el móvil el mapa mide ~350 px */}
      {onClick && <circle r={17} fill="transparent" onClick={onClick} className="cursor-pointer" />}
      <circle r={estado ? 10 : 8} fill={color} fillOpacity={estado ? 1 : 0.85} stroke="#0a1733" strokeWidth={2.5} style={{ pointerEvents: 'none' }} />
      {etiqueta && (
        <text y={-15} textAnchor="middle" fontSize="17" fontWeight="900" fill="#fff" stroke="#0a1733" strokeWidth={4} paintOrder="stroke" style={{ pointerEvents: 'none' }}>{etiqueta}</text>
      )}
    </Marker>
  )
}

export default function PreguntaContinentes({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [eleccion, setEleccion] = useState(null) // «c:europa+asia», «o:indico», «m:negro»
  const conPaises = enContinente(r) && !revelado
  const elegidos = eleccion?.startsWith('c:') ? eleccion.slice(2).split('+') : []
  const acierto = revelado && esCorrecta(r, eleccion)

  function tocaPais(geo, e) {
    const svg = e.currentTarget.ownerSVGElement
    const pt = svg.createSVGPoint()
    pt.x = e.clientX; pt.y = e.clientY
    const p = pt.matrixTransform(svg.getScreenCTM().inverse())
    const [lon, lat] = aLonLat(p.x, p.y)
    const cs = continentesDe(geo.properties.name, lon, lat)
    if (cs.length) setEleccion(`c:${cs.join('+')}`)
  }

  function relleno(nombre) {
    if (enContinente(r)) {
      if (revelado && tocaContinente(nombre, r.objetivo)) return 'rgba(34,197,94,0.75)'
      if (elegidos.some(c => tocaContinente(nombre, c))) return revelado ? 'rgba(239,68,68,0.7)' : 'rgba(56,189,248,0.75)'
    }
    return '#2b3a6b'
  }

  const puntosOceano = enOceano(r) ? Object.entries(OCEANOS).flatMap(([k, o]) => o.puntos.map((c, i) => ({ key: `${k}-${i}`, token: `o:${k}`, k, coord: c, nombre: o.nombre }))) : []
  const puntosMar = r.tipo === 'mar' ? Object.entries(MARES).map(([k, m]) => ({ key: k, token: `m:${k}`, k, coord: m.punto, nombre: m.nombre })) : []
  const puntos = [...puntosOceano, ...puntosMar]

  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a1733] mb-3">
        <ComposableMap projection="geoEquirectangular" projectionConfig={{ scale: W / (2 * Math.PI), center: [0, 0] }} width={W} height={H} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) => geographies.map(geo => {
              const nombre = geo.properties.name
              const tocable = conPaises && !SIN_CONTINENTE.includes(nombre)
              return (
                <Geography key={geo.rsmKey} geography={geo} fill={relleno(nombre)} stroke="#ffffff30" strokeWidth={0.5}
                  onClick={tocable ? e => tocaPais(geo, e) : undefined}
                  style={{
                    default: { outline: 'none', pointerEvents: tocable ? 'auto' : 'none', cursor: tocable ? 'pointer' : 'default' },
                    hover: { outline: 'none', fill: tocable ? '#3b4f8f' : undefined },
                    pressed: { outline: 'none' },
                  }} />
              )
            })}
          </Geographies>
          {r.tipo === 'ruta' && [lugar(r.a), lugar(r.b)].map((p, i) => (
            <Marker key={p.id} coordinates={p.coord}>
              <circle r={7} fill={i ? '#fbbf24' : '#f472b6'} stroke="#fff" strokeWidth={2} style={{ pointerEvents: 'none' }} />
              <text y={i ? 22 : -12} textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff" stroke="#0a1733" strokeWidth={4} paintOrder="stroke" style={{ pointerEvents: 'none' }}>{tx(p.nombre, l)}</text>
            </Marker>
          ))}
          {puntos.map((p, i) => {
            const bueno = p.k === r.objetivo
            const estado = revelado ? (bueno ? 'bien' : eleccion === p.token ? 'mal' : null) : eleccion === p.token ? 'elegido' : null
            // La etiqueta, en un solo punto aunque el océano tenga dos
            const conEtiqueta = revelado && (bueno || eleccion === p.token) && puntos.findIndex(q => q.token === p.token) === i
            return <Punto key={p.key} coord={p.coord} estado={estado} etiqueta={conEtiqueta ? tx(p.nombre, l) : null}
              onClick={revelado ? undefined : () => setEleccion(p.token)} />
          })}
          {revelado && enContinente(r) && (
            <Marker coordinates={CONTINENTES[r.objetivo].etiqueta}>
              <text textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff" stroke="#0a1733" strokeWidth={5} paintOrder="stroke" style={{ pointerEvents: 'none' }}>
                {tx(CONTINENTES[r.objetivo].nombre, l).replace(/^(la |the |l’)/, '').replace(/^./, c => c.toUpperCase())}
              </text>
            </Marker>
          )}
        </ComposableMap>
      </div>

      {!revelado && (
        <>
          <p className="text-center text-sm text-white/70 font-bold mb-2 min-h-[1.25rem]">
            {eleccion === null
              ? tr(enContinente(r)
                ? { es: 'Toca un país de ese continente', en: 'Tap any country in that continent', ca: 'Toca un país d’aquest continent' }
                : { es: 'Toca uno de los puntos del mapa', en: 'Tap one of the dots on the map', ca: 'Toca un dels punts del mapa' })
              : tr({ es: 'Elegido. ¿Lo compruebas?', en: 'Chosen. Ready to check?', ca: 'Triat. Ho comproves?' })}
          </p>
          <button type="button" disabled={eleccion === null} onClick={() => onResponder(eleccion)}
            className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
        </>
      )}
      {revelado && (
        <div className={`rounded-xl px-3 py-2.5 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' }) : tr({ es: '✗ No era ahí', en: '✗ Not there', ca: '✗ No era aquí' })}
          </p>
          <p className="mt-1 text-white/75 text-sm">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
