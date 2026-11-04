// Una ronda de ¿Qué Hora Es Allí? (ver lib/queHoraEs):
//   hora / vuelo / meridiano  girar el reloj (±1 h; ±15 min en difícil) y comprobar
//   huso                      tocar una franja de 15° en el mapa y comprobar
// El mapa es equirectangular para que cada huso teórico sea una franja recta.
// En «hora» y «vuelo» NO se pintan franjas: ahí manda la hora oficial (UTC)
// y Madrid, por ejemplo, no va con la franja en la que cae.
import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps'
import { useLang } from '../../context/LangContext'
import { ciudad, tx, hhmm, diaDe, husoDe, relojInicial, respuesta, enunciado, explicacion } from '../../lib/queHoraEs'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const W = 800, H = 330
const X = lon => W / 2 + lon * (W / 360)
const HUSOS = Array.from({ length: 25 }, (_, i) => i - 12)
const conSigno = k => (k > 0 ? `+${k}` : k < 0 ? `−${-k}` : '0')

function Mapa({ r, revelado, elegido, onHuso, l }) {
  const conFranjas = r.tipo === 'huso' || r.tipo === 'meridiano'
  const buenoK = r.tipo === 'huso' ? r.k : r.tipo === 'meridiano' ? husoDe(r.lon) : null
  const tocable = r.tipo === 'huso' && !revelado
  const relleno = k => {
    if (revelado && k === buenoK) return 'rgba(34,197,94,0.45)'
    if (revelado && k === elegido && k !== buenoK) return 'rgba(239,68,68,0.45)'
    if (k === elegido) return 'rgba(56,189,248,0.45)'
    return k % 2 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0)'
  }
  const ciudades = r.a ? [ciudad(r.a), ciudad(r.b)] : []
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a1733]">
      <ComposableMap projection="geoEquirectangular" projectionConfig={{ scale: W / (2 * Math.PI), center: [0, 11] }} width={W} height={H} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map(geo => (
            <Geography key={geo.rsmKey} geography={geo} fill="#2b3a6b" stroke="#ffffff30" strokeWidth={0.5}
              style={{ default: { outline: 'none', pointerEvents: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }} />
          ))}
        </Geographies>
        {conFranjas && HUSOS.map(k => {
          const x0 = X(Math.max(-180, k * 15 - 7.5)), x1 = X(Math.min(180, k * 15 + 7.5))
          const borde = Math.abs(k) === 12
          return (
            <g key={k} onClick={tocable && !borde ? () => onHuso(k) : undefined} className={tocable && !borde ? 'cursor-pointer' : ''}>
              <rect x={x0} y={0} width={x1 - x0} height={H} fill={relleno(k)} stroke="#ffffff22" strokeWidth={0.6} />
              {revelado && !borde && <text x={(x0 + x1) / 2} y={18} textAnchor="middle" fontSize="13" fontWeight="800" fill="#e2e8f0" className="pointer-events-none">{conSigno(k)}</text>}
            </g>
          )
        })}
        {/* Greenwich: desde aquí se cuentan los husos */}
        <line x1={X(0)} x2={X(0)} y1={0} y2={H} stroke="#38bdf8" strokeWidth={1.6} strokeDasharray="5 4" className="pointer-events-none" />
        {conFranjas && [-120, -60, 60, 120].map(lon => (
          <text key={lon} x={X(lon)} y={H - 8} textAnchor="middle" fontSize="15" fontWeight="700" fill="#94a3b8" className="pointer-events-none">{Math.abs(lon)}° {lon > 0 ? 'E' : l === 'en' ? 'W' : 'O'}</text>
        ))}
        <text x={X(0) + 5} y={H - 8} fontSize="15" fontWeight="800" fill="#38bdf8" className="pointer-events-none">0°</text>
        {r.tipo === 'meridiano' && (
          <>
            <line x1={X(r.lon)} x2={X(r.lon)} y1={0} y2={H} stroke="#fbbf24" strokeWidth={2.4} className="pointer-events-none" />
            <circle cx={X(r.lon)} cy={H / 2 - 12} r={9} fill="#fbbf24" stroke="#0a1733" strokeWidth={2} className="pointer-events-none" />
          </>
        )}
        {r.tipo === 'vuelo' && (
          <Line from={[ciudades[0].lon, ciudades[0].lat]} to={[ciudades[1].lon, ciudades[1].lat]} stroke="#fbbf24" strokeWidth={2} strokeDasharray="6 4" />
        )}
        {ciudades.map((c, i) => (
          <Marker key={c.id} coordinates={[c.lon, c.lat]}>
            <circle r={7} fill={i === 0 ? '#fbbf24' : '#38bdf8'} stroke="#fff" strokeWidth={2} style={{ pointerEvents: 'none' }} />
            <text y={-12} textAnchor="middle" fontSize="17" fontWeight="900" fill="#fff" stroke="#0a1733" strokeWidth={4} paintOrder="stroke" style={{ pointerEvents: 'none' }}>{tx(c.nombre, l)}</text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}

function Boton({ onClick, disabled, children }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick}
      className="rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 disabled:opacity-40 px-3 py-2.5 text-white font-black text-sm min-w-[3.6rem]">{children}</button>
  )
}

function Reloj({ r, revelado, onResponder, l, tr }) {
  const [v, setV] = useState(relojInicial(r))
  const mueve = d => { if (!revelado) setV(x => x + d) }
  const bueno = Number(r.bueno.slice(2))
  const donde = r.tipo === 'meridiano'
    ? tr({ es: 'Hora del lugar', en: 'Time at the place', ca: 'Hora del lloc' })
    : tr({ es: `Hora en ${tx(ciudad(r.b).nombre, 'es')}`, en: `Time in ${tx(ciudad(r.b).nombre, 'en')}`, ca: `Hora ${tx(ciudad(r.b).nombre, 'ca').replace(/^El /, 'al ').replace(/^(?!al )/, 'a ')}` })
  const color = revelado ? (v === bueno ? 'text-green-400' : 'text-red-400') : 'text-white'
  return (
    <>
      <div className="rounded-2xl bg-white/[0.06] border border-white/10 px-3 py-3 mb-3">
        <p className="text-center text-[11px] uppercase tracking-widest text-white/45 font-bold mb-1">{donde}</p>
        <div className="flex items-center justify-center gap-2">
          <Boton disabled={revelado} onClick={() => mueve(-60)}>−1 h</Boton>
          <div className="text-center min-w-[7.5rem]">
            <p className={`text-3xl font-black tabular-nums leading-none ${color}`}>{hhmm(v)}</p>
            <p className="text-white/70 text-sm font-bold mt-1">{diaDe(v, r.dia, l)}</p>
          </div>
          <Boton disabled={revelado} onClick={() => mueve(60)}>+1 h</Boton>
        </div>
        {r.minutos && (
          <div className="flex justify-center gap-2 mt-2">
            <Boton disabled={revelado} onClick={() => mueve(-15)}>−15 min</Boton>
            <Boton disabled={revelado} onClick={() => mueve(15)}>+15 min</Boton>
          </div>
        )}
        {revelado && v !== bueno && (
          <p className="text-center text-green-400 text-sm font-black mt-2">✓ {hhmm(bueno)} · {diaDe(bueno, r.dia, l)}</p>
        )}
      </div>
      {!revelado && (
        <>
          <button type="button" onClick={() => onResponder(respuesta(v))} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black">
            {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
          <p className="text-center text-xs text-white/40 mt-2">{tr({ es: 'Gira el reloj hacia delante o hacia atrás; si pasas de medianoche, cambia el día', en: 'Turn the clock forwards or backwards; past midnight, the day changes', ca: 'Gira el rellotge endavant o enrere; si passes de mitjanit, canvia el dia' })}</p>
        </>
      )}
    </>
  )
}

export default function PreguntaHora({ ronda, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [huso, setHuso] = useState(null)
  const gl = k => `${String(Math.abs(k)).replace('.', l === 'en' ? '.' : ',')}° ${k > 0 ? 'E' : k < 0 ? (l === 'en' ? 'W' : 'O') : ''}`.trim()
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      <div className="mb-3">
        <Mapa r={ronda} revelado={revelado} elegido={huso} onHuso={setHuso} l={l} />
      </div>
      {ronda.tipo === 'huso'
        ? !revelado && (
          <>
            <p className="text-center text-sm text-white/70 font-bold mb-2 min-h-[1.25rem]">
              {huso === null
                ? tr({ es: 'Toca una franja del mapa', en: 'Tap a strip on the map', ca: 'Toca una franja del mapa' })
                : tr({ es: `Huso elegido: de ${gl(huso * 15 - 7.5)} a ${gl(huso * 15 + 7.5)}`, en: `Chosen zone: ${gl(huso * 15 - 7.5)} to ${gl(huso * 15 + 7.5)}`, ca: `Fus triat: de ${gl(huso * 15 - 7.5)} a ${gl(huso * 15 + 7.5)}` })}
            </p>
            <button type="button" disabled={huso === null} onClick={() => onResponder(`huso:${huso}`)} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
              {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
            </button>
          </>
        )
        : <Reloj r={ronda} revelado={revelado} onResponder={onResponder} l={l} tr={tr} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
