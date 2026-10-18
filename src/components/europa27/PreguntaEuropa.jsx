// Una ronda de Europa a 27 (ver lib/europa27). El mapa (mismo atlas que
// GeoMapa) se puede tocar:
//   busca      tocar el país; al corregir, el bueno en verde y el tocado en rojo
//   pinta      seis países con borde ámbar: tocarlos los pinta de azul
//   anyos      cada país (marcado) a su año
//   funciones  unir institución y función (sin mapa)
//   sedes      mapa ampliado del Benelux y el Rin: cada institución a su ciudad
import { memo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useLang } from '../../context/LangContext'
import { A3_TO_NUM } from '../../data/isoNumerico'
import {
  explicacion, enunciado, pais, tx, PAISES, INSTITUCIONES, CIUDADES, COORD_CIUDAD, tiene, nombrePais, textoAnyo,
} from '../../lib/europa27'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const NUM_A3 = Object.fromEntries(Object.entries(A3_TO_NUM).map(([a, n]) => [n, a]))
const UE = new Set(PAISES.filter(p => p.entrada).map(p => p.iso))
const AMBAR = '#F59E0B', VERDE = '#22C55E', AZUL = '#3B82F6', ROJO = '#EF4444', GRIS = '#334155'
const COLORES = ['bg-sky-500', 'bg-fuchsia-500', 'bg-amber-500', 'bg-emerald-500']
const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const EUROPA = { center: [8, 54], scale: 500 }

const Mapa = memo(function Mapa({ colores, bordes = {}, onPais, tocables, proyeccion = EUROPA, marcadores = null }) {
  return (
    <div className="w-full aspect-[10/9] rounded-xl overflow-hidden bg-[#0e2a47]">
      <ComposableMap projection="geoMercator" projectionConfig={proyeccion} width={800} height={720} style={{ width: '100%', height: '100%' }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map(geo => {
            const iso = NUM_A3[geo.id]
            const tocable = onPais && (!tocables || tocables.includes(iso))
            return (
              <Geography key={geo.rsmKey} geography={geo} fill={colores[iso] ?? GRIS} stroke={bordes[iso] ?? '#0F172A'} strokeWidth={bordes[iso] ? 3 : 0.8}
                onClick={tocable ? () => onPais(iso) : undefined}
                style={{ default: { outline: 'none', cursor: tocable ? 'pointer' : 'default' }, hover: { outline: 'none', fill: tocable ? '#64748B' : colores[iso] ?? GRIS }, pressed: { outline: 'none' } }} />
            )
          })}
        </Geographies>
        {marcadores}
      </ComposableMap>
    </div>
  )
})

function Busca({ r, revelado, elegida, onResponder, l }) {
  const colores = {}
  if (revelado) {
    colores[r.pais] = VERDE
    if (elegida && elegida !== r.pais) colores[elegida] = ROJO
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2">
        <Mapa colores={colores} onPais={revelado ? null : onResponder}
          marcadores={revelado ? <Marker coordinates={[pais(r.pais).lon, pais(r.pais).lat]}><circle r={9} fill={VERDE} stroke="#0F172A" strokeWidth={2.5} /></Marker> : null} />
        {revelado && elegida && elegida !== r.pais && pais(elegida) && <p className="text-xs text-red-300 text-center mt-1">{nombrePais(elegida, l)} ✗</p>}
      </div>
    </>
  )
}

function Pinta({ r, revelado, onResponder, tr, l }) {
  const [pintados, setPintados] = useState([])
  const toca = iso => setPintados(p => (p.includes(iso) ? p.filter(x => x !== iso) : [...p, iso]))
  const colores = {}, bordes = {}
  for (const iso of r.grupo) {
    const si = tiene(r.variante, iso), p = pintados.includes(iso)
    colores[iso] = !revelado ? (p ? AZUL : '#475569') : si ? (p ? VERDE : '#15803D') : p ? ROJO : '#475569'
    bordes[iso] = !revelado ? AMBAR : si === p ? VERDE : ROJO
  }
  const fallos = r.grupo.filter(iso => tiene(r.variante, iso) !== pintados.includes(iso)).length
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <Mapa colores={colores} bordes={bordes} onPais={revelado ? null : toca} tocables={r.grupo} />
        <p className="text-[11px] text-white/60 text-center mt-1.5">
          {revelado
            ? tr({ es: 'Verde: sí · contorno rojo: fallo', en: 'Green: yes · red outline: mistake', ca: 'Verd: sí · contorn vermell: error' })
            : tr({ es: 'Toca los países con borde ámbar para pintarlos', en: 'Tap the amber-bordered countries to colour them', ca: 'Toca els països amb vora àmbar per pintar-los' })}
        </p>
      </div>
      {!revelado && <button className={boton} onClick={() => onResponder(`pinta:${fallos}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
    </>
  )
}

function Anyos({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(r.paises[0])
  const colocar = a => {
    if (revelado || !activo) return
    const n = { ...puestas, [activo]: a }
    setPuestas(n)
    const sig = r.paises.find(iso => !n[iso])
    setActivo(sig ?? null)
    if (!sig) onResponder(`clasifica:${r.paises.filter(iso => n[iso] !== pais(iso).entrada).length}`)
  }
  const colores = Object.fromEntries(r.paises.map(iso => [iso, iso === activo ? AMBAR : revelado ? (puestas[iso] === pais(iso).entrada ? VERDE : ROJO) : '#64748B']))
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-2"><Mapa colores={colores} /></div>
      <div className="flex flex-wrap justify-center gap-1.5 mb-2 min-h-[2.4rem]">
        {r.paises.filter(iso => !puestas[iso]).map(iso => (
          <button key={iso} onClick={() => setActivo(iso)} className={`rounded-xl px-3 py-1.5 text-sm font-bold text-white ${activo === iso ? 'bg-amber-500/30 ring-2 ring-amber-300' : 'bg-white/5'}`}>{nombrePais(iso, l)}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {r.cajas.map(a => (
          <button key={a} disabled={revelado || !activo} onClick={() => colocar(a)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[3.4rem] text-left">
            <span className="block text-white text-[13px] font-black">{textoAnyo(a, l)}</span>
            <span className="flex flex-wrap gap-1 mt-1">
              {r.paises.filter(iso => puestas[iso] === a).map(iso => (
                <span key={iso} className={`rounded-md px-1.5 py-0.5 text-[11px] font-bold text-white ${revelado ? (pais(iso).entrada === a ? 'bg-green-500/30 ring-1 ring-green-400' : 'bg-red-500/30 ring-1 ring-red-400') : 'bg-white/15'}`}>{nombrePais(iso, l)}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

function Funciones({ r, revelado, onResponder, l }) {
  const [union, setUnion] = useState({})
  const [activo, setActivo] = useState(r.insts[0])
  const une = id => {
    if (revelado || !activo) return
    const n = Object.fromEntries(Object.entries(union).filter(([, v]) => v !== id))
    n[activo] = id
    setUnion(n)
    const sig = r.insts.find(i => !n[i])
    setActivo(sig ?? null)
    if (!sig) onResponder(`empareja:${r.insts.filter(i => n[i] !== i).length}`)
  }
  const colorDe = id => { const k = r.insts.findIndex(i => union[i] === id); return k >= 0 ? COLORES[k] : 'bg-white/15' }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="space-y-1.5 mb-3">
        {r.insts.map((i, k) => (
          <button key={i} onClick={() => !revelado && setActivo(i)}
            className={`block w-full text-left rounded-xl px-3 py-2 transition-all ${activo === i && !revelado ? 'bg-white/15 ring-2 ring-amber-300' : 'bg-white/5'} ${revelado ? (union[i] === i ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>
            <span className="flex items-start gap-2">
              <span className={`mt-1 w-3 h-3 rounded-full shrink-0 ${union[i] ? COLORES[k] : 'bg-white/15'}`} />
              <span className="text-white text-[13.5px] leading-snug">{tx(INSTITUCIONES[i].hace, l)}</span>
            </span>
            {revelado && <span className={`block text-xs font-bold mt-1 ${union[i] === i ? 'text-green-300' : 'text-red-300'}`}>{tx(INSTITUCIONES[i].nombre, l)}</span>}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {r.nombres.map(id => (
          <button key={id} disabled={revelado} onClick={() => une(id)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] py-2 px-2 text-white text-[13px] font-bold flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full shrink-0 ${colorDe(id)}`} />{INSTITUCIONES[id].emoji} {tx(INSTITUCIONES[id].nombre, l)}
          </button>
        ))}
      </div>
    </>
  )
}

function Sedes({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(r.insts[0])
  const colocar = c => {
    if (revelado || !activo) return
    const n = { ...puestas, [activo]: c }
    setPuestas(n)
    const sig = r.insts.find(i => !n[i])
    setActivo(sig ?? null)
    if (!sig) onResponder(`sedes:${r.insts.filter(i => n[i] !== INSTITUCIONES[i].sede).length}`)
  }
  const colores = Object.fromEntries([...UE].map(iso => [iso, '#3B4A63']))
  const marcadores = Object.entries(COORD_CIUDAD).map(([c, coord]) => {
    const aqui = r.insts.filter(i => puestas[i] === c)
    return (
      <Marker key={c} coordinates={coord} onClick={() => colocar(c)} style={{ default: { cursor: revelado || !activo ? 'default' : 'pointer' } }}>
        <circle r={34} fill="transparent" />
        <circle r={12} fill={AMBAR} stroke="#0F172A" strokeWidth={3} />
        <text y={-20} textAnchor="middle" fontSize="26" fontWeight="900" fill="#F8FAFC" stroke="#0F172A" strokeWidth="5" paintOrder="stroke">{tx(CIUDADES[c], l)}</text>
        {aqui.map((i, k) => {
          const ok = INSTITUCIONES[i].sede === c
          return <text key={i} x={18 + k * 34} y={10} fontSize="28" stroke={revelado ? (ok ? VERDE : ROJO) : 'none'} strokeWidth={revelado ? 2 : 0}>{INSTITUCIONES[i].emoji}</text>
        })}
      </Marker>
    )
  })
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="flex flex-wrap justify-center gap-1.5 mb-2 min-h-[2.4rem]">
        {r.insts.filter(i => !puestas[i]).map(i => (
          <button key={i} onClick={() => setActivo(i)} className={`rounded-xl px-2.5 py-1.5 text-[12.5px] font-bold text-white ${activo === i ? 'bg-amber-500/30 ring-2 ring-amber-300' : 'bg-white/5'}`}>{INSTITUCIONES[i].emoji} {tx(INSTITUCIONES[i].nombre, l)}</button>
        ))}
      </div>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2">
        <Mapa colores={colores} proyeccion={{ center: [6.6, 49.7], scale: 3800 }} marcadores={marcadores} />
        {revelado && (
          <div className="mt-2 space-y-0.5">
            {r.insts.map(i => <p key={i} className={`text-xs ${puestas[i] === INSTITUCIONES[i].sede ? 'text-green-300' : 'text-red-300'}`}>{INSTITUCIONES[i].emoji} {tx(INSTITUCIONES[i].nombre, l)}: {tx(CIUDADES[INSTITUCIONES[i].sede], l)}</p>)}
          </div>
        )}
      </div>
    </>
  )
}

export default function PreguntaEuropa({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, tr, l }
  return (
    <div className="w-full">
      {ronda.tipo === 'busca' ? <Busca {...props} />
        : ronda.tipo === 'pinta' ? <Pinta {...props} />
        : ronda.tipo === 'anyos' ? <Anyos {...props} />
        : ronda.tipo === 'funciones' ? <Funciones {...props} />
        : <Sedes {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
