// Una ronda de Europa a 27. Un mapa de Europa (mismo atlas que GeoMapa) con
// los países de la pregunta en ámbar y un punto en la capital (los países
// pequeños, como Malta o Luxemburgo, casi no se ven). Al corregir: la
// respuesta en verde y los miembros de la UE en azul.
import { memo } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useLang } from '../../context/LangContext'
import { A3_TO_NUM } from '../../data/isoNumerico'
import { enunciado, textoOpcion, explicacion, pais, tx, PAISES, INSTITUCIONES } from '../../lib/europa27'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const NUM_A3 = Object.fromEntries(Object.entries(A3_TO_NUM).map(([a, n]) => [n, a]))
const UE = new Set(PAISES.filter(p => p.entrada).map(p => p.iso))

const Mapa = memo(function Mapa({ colores, puntos }) {
  return (
    <div className="w-full aspect-[10/9] rounded-xl overflow-hidden bg-[#0e2a47]">
      <ComposableMap projection="geoMercator" projectionConfig={{ center: [8, 54], scale: 500 }} width={800} height={720} style={{ width: '100%', height: '100%' }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map(geo => (
            <Geography key={geo.rsmKey} geography={geo} fill={colores[NUM_A3[geo.id]] ?? '#334155'} stroke="#0F172A" strokeWidth={0.8}
              style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }} />
          ))}
        </Geographies>
        {puntos.map(([iso, c]) => {
          const p = pais(iso)
          return (
            <Marker key={iso} coordinates={[p.lon, p.lat]}>
              <circle r={9} fill={c} stroke="#0F172A" strokeWidth={2.5} />
            </Marker>
          )
        })}
      </ComposableMap>
    </div>
  )
})

const AMBAR = '#F59E0B', VERDE = '#22C55E', AZUL = '#3B82F6', ROJO = '#EF4444'

export default function PreguntaEuropa({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const conMapa = !r.inst
  const varios = ['miembro', 'euro', 'schengen'].includes(r.tipo)

  // Colores del mapa
  const colores = {}
  const puntos = []
  if (conMapa) {
    if (revelado) for (const iso of UE) colores[iso] = r.tipo === 'ampliacion' && pais(iso).entrada === r.bueno ? VERDE : AZUL
    const marcados = varios ? r.opciones : [r.pais]
    for (const iso of marcados) {
      const c = !revelado ? AMBAR : iso === r.bueno || iso === r.pais ? VERDE : iso === elegida ? ROJO : colores[iso] ?? '#64748B'
      colores[iso] = c
      puntos.push([iso, c])
    }
  }
  const inst = r.inst ? INSTITUCIONES[r.inst] : null

  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        {conMapa
          ? <Mapa colores={colores} puntos={puntos} />
          : (
            <div className="text-center px-2 py-4">
              <p className="text-4xl mb-2">{inst.emoji}</p>
              <p className="text-white font-bold text-lg leading-snug">{r.tipo === 'sede' ? tx(inst.nombre, l) : tx(inst.hace, l)}</p>
            </div>
          )}
        {conMapa && revelado && (
          <p className="text-[11px] text-white/60 text-center mt-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm align-middle mr-1" style={{ background: AZUL }} />
            {tr({ es: 'Miembros de la UE', en: 'EU members', ca: 'Membres de la UE' })}
          </p>
        )}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.tipo === 'institucion' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
