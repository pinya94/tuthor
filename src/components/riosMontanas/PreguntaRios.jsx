// Una ronda de Ríos y Montañas (ver lib/riosMontanas). El mapa de la península
// (atlas 50m, para que la costa se vea bien a esta escala) con los ríos en azul
// y las líneas de cumbres en marrón:
//   busca      tocar el río o el sistema; al corregir, el bueno en verde
//   etiqueta   tres números en el mapa: un nombre y luego su número
//   vertiente  cuatro ríos con su nombre: cada uno a su caja de vertiente
//   extremos   cuatro puntos numerados: tocar el nacimiento o la desembocadura
import { memo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, textoRespuesta, esCorrecta, delNivel, elemento, nombre, tx, medio, regionDe } from '../../lib/riosMontanas'

const AZUL = '#38BDF8', MARRON = '#B45309', VERDE = '#22C55E', ROJO = '#EF4444', AMBAR = '#F59E0B'
const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'

// La tierra de la región en gris claro y el resto más oscuro (en el mundo, toda igual)
const Base = memo(function Base({ atlas, tierras }) {
  return (
    <Geographies geography={atlas}>
      {({ geographies }) => geographies.map(geo => (
        <Geography key={geo.rsmKey} geography={geo} fill={tierras ? tierras[Number(geo.id)] ?? '#1F2937' : '#334155'} stroke="#0F172A" strokeWidth={0.8}
          style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }} />
      ))}
    </Geographies>
  )
})

// Un río o un sistema: la línea y, si se puede tocar, una franja ancha invisible para el dedo
function Trazo({ e, color, ancho, opacidad = 1, onToca }) {
  const monte = e.clase === 'monte'
  return (
    <g>
      <Line coordinates={e.puntos} stroke={color} strokeWidth={ancho ?? (monte ? 11 : 5)} strokeOpacity={opacidad} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {onToca && <Line coordinates={e.puntos} stroke="transparent" strokeWidth={46} strokeLinecap="round" fill="none" onClick={() => onToca(e.id)} style={{ cursor: 'pointer' }} />}
    </g>
  )
}

function Mapa({ r, children }) {
  const { center, scale, atlas, tierras } = regionDe(r).mapa
  return (
    <div className="w-full aspect-[5/4] rounded-xl overflow-hidden bg-[#0e2a47]">
      <ComposableMap projection="geoMercator" projectionConfig={{ center, scale }} width={800} height={640} style={{ width: '100%', height: '100%' }}>
        <Base atlas={atlas} tierras={tierras} />
        {children}
      </ComposableMap>
    </div>
  )
}

const color = e => (e.clase === 'monte' ? MARRON : AZUL)
const etiquetaMapa = (texto, c = '#FFFFFF') => <text textAnchor="middle" y={-16} fontSize={30} fontWeight={900} fill={c} stroke="#0B1226" strokeWidth={7} style={{ paintOrder: 'stroke', pointerEvents: 'none' }}>{texto}</text>

function Busca({ r, revelado, elegida, onResponder, l }) {
  const visibles = delNivel(r.nivel, r.region)
  const obj = elemento(r.objetivo)
  return (
    <Mapa r={r}>
      {visibles.map(e => {
        const c = revelado ? (e.id === r.objetivo ? VERDE : e.id === elegida ? ROJO : color(e)) : color(e)
        return <Trazo key={e.id} e={e} color={c} opacidad={revelado && e.id !== r.objetivo && e.id !== elegida ? 0.45 : 1} onToca={revelado ? null : onResponder} />
      })}
      {revelado && <Marker coordinates={medio(obj)}>{etiquetaMapa(tx(obj.nombre, l), VERDE)}</Marker>}
      {revelado && elegida && elegida !== r.objetivo && elemento(elegida) && <Marker coordinates={medio(elemento(elegida))}>{etiquetaMapa(nombre(elegida, l), ROJO)}</Marker>}
    </Mapa>
  )
}

// Un número redondo sobre el mapa que se puede tocar
function Numero({ coordenadas, n, activo, colorBorde = '#FFFFFF', onToca }) {
  return (
    <Marker coordinates={coordenadas} onClick={onToca} style={{ default: { cursor: onToca ? 'pointer' : 'default' }, hover: {}, pressed: {} }}>
      <circle r={27} fill={activo ? AMBAR : '#0F172A'} stroke={colorBorde} strokeWidth={5} />
      <text textAnchor="middle" y={11} fontSize={30} fontWeight={900} fill={activo ? '#000' : '#FFF'}>{n}</text>
    </Marker>
  )
}

function Etiqueta({ r, revelado, onResponder, tr, l }) {
  const [ficha, setFicha] = useState(null)
  const [puestos, setPuestos] = useState([null, null, null])
  const visibles = delNivel(r.nivel, r.region)
  const pon = i => {
    if (revelado || !ficha) return
    setPuestos(p => p.map((x, j) => (j === i ? ficha : x === ficha ? null : x)))
    setFicha(null)
  }
  return (
    <>
      <Mapa r={r}>
        {visibles.map(e => <Trazo key={e.id} e={e} color={color(e)} opacidad={r.marcados.includes(e.id) ? 1 : 0.25} />)}
        {r.marcados.map((id, i) => {
          const ok = revelado && puestos[i] === id
          return <g key={id}>
            <Numero coordenadas={medio(elemento(id))} n={i + 1} colorBorde={revelado ? (ok ? VERDE : ROJO) : '#FFFFFF'} onToca={revelado ? undefined : () => pon(i)} />
            {(puestos[i] || revelado) && <Marker coordinates={medio(elemento(id))}><text textAnchor="middle" y={58} fontSize={26} fontWeight={900} fill={revelado ? (ok ? VERDE : ROJO) : AMBAR} stroke="#0B1226" strokeWidth={4} style={{ paintOrder: 'stroke', pointerEvents: 'none' }}>{nombre(revelado ? id : puestos[i], l)}</text></Marker>}
          </g>
        })}
      </Mapa>
      {!revelado && (
        <>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {r.fichas.map(id => {
              const usada = puestos.includes(id)
              return (
                <button key={id} type="button" onClick={() => setFicha(f => (f === id ? null : id))}
                  className={`px-3 py-2 rounded-xl border text-sm font-bold transition-colors ${ficha === id ? 'bg-amber-400 text-black border-amber-300' : usada ? 'bg-white/[0.03] border-white/10 text-white/40' : 'bg-white/[0.06] border-white/15 text-white'}`}>
                  {nombre(id, l)}
                </button>
              )
            })}
          </div>
          <p className="text-white/45 text-xs text-center mt-2">{ficha ? tr({ es: 'Ahora toca su número en el mapa', en: 'Now tap its number on the map', ca: 'Ara toca el seu número al mapa' }) : ' '}</p>
          <button type="button" disabled={puestos.some(x => !x)} onClick={() => onResponder(puestos)} className={`${boton} mt-2`}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

// Un color por caja, en el orden en que salen (vale para vertientes y océanos)
const CAJAS = ['border-cyan-400/50 bg-cyan-500/10', 'border-blue-400/50 bg-blue-500/10', 'border-emerald-400/50 bg-emerald-500/10', 'border-violet-400/50 bg-violet-500/10']

function Vertiente({ r, revelado, elegida, onResponder, tr, l }) {
  const [rio, setRio] = useState(null)
  const [donde, setDonde] = useState({})
  const visibles = delNivel(r.nivel, r.region).filter(e => e.clase === 'rio')
  const valor = revelado ? (elegida ?? {}) : donde
  return (
    <>
      <Mapa r={r}>
        {visibles.map(e => <Trazo key={e.id} e={e} color={AZUL} opacidad={r.rios.includes(e.id) ? 1 : 0.2} />)}
        {r.rios.map(id => <Marker key={id} coordinates={medio(elemento(id))}>{etiquetaMapa(nombre(id, l), rio === id ? AMBAR : '#FFFFFF')}</Marker>)}
      </Mapa>
      {!revelado && (
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {r.rios.filter(id => !donde[id]).map(id => (
            <button key={id} type="button" onClick={() => setRio(x => (x === id ? null : id))}
              className={`px-3 py-2 rounded-xl border text-sm font-bold ${rio === id ? 'bg-amber-400 text-black border-amber-300' : 'bg-white/[0.06] border-white/15 text-white'}`}>
              {nombre(id, l)}
            </button>
          ))}
        </div>
      )}
      <div className={`grid gap-2 mt-3 ${r.vertientes.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.vertientes.map(v => (
          <button key={v} type="button" disabled={revelado} onClick={() => { if (rio) { setDonde(d => ({ ...d, [rio]: v })); setRio(null) } }}
            className={`min-h-[84px] rounded-xl border-2 border-dashed p-2 text-left ${CAJAS[Object.keys(regionDe(r).vertientes).indexOf(v) % CAJAS.length]}`}>
            <span className="block text-white/70 text-[11px] font-black uppercase tracking-wide mb-1">{tx(regionDe(r).vertientes[v], l)}</span>
            {r.rios.filter(id => valor[id] === v).map(id => {
              const ok = elemento(id).vertiente === v
              // Tocar un río ya puesto lo saca de la caja… salvo si hay otro
              // elegido: entonces el toque es para meter ese en esta caja.
              return <span key={id} onClick={e => { if (revelado || rio) return; e.stopPropagation(); setDonde(d => { const n = { ...d }; delete n[id]; return n }) }}
                className={`inline-block mr-1 mb-1 px-2 py-0.5 rounded-lg text-xs font-bold ${revelado ? (ok ? 'bg-green-500/30 text-green-200' : 'bg-red-500/30 text-red-200 line-through') : 'bg-white/15 text-white'}`}>{nombre(id, l)}</span>
            })}
          </button>
        ))}
      </div>
      {!revelado && (
        <button type="button" disabled={r.rios.some(id => !donde[id])} onClick={() => onResponder(donde)} className={`${boton} mt-3`}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
      )}
    </>
  )
}

function Extremos({ r, revelado, elegida, onResponder, l }) {
  const rios = delNivel(r.nivel, r.region).filter(e => e.clase === 'rio')
  const punto = id => { const e = elemento(id); return r.que === 'nace' ? e.puntos[0] : e.puntos[e.puntos.length - 1] }
  return (
    <Mapa r={r}>
      {rios.map(e => <Trazo key={e.id} e={e} color={revelado && e.id === r.objetivo ? VERDE : AZUL} opacidad={revelado && e.id === r.objetivo ? 1 : 0.35} />)}
      {r.puntos.map((id, i) => (
        <Numero key={id} coordenadas={punto(id)} n={i + 1}
          colorBorde={revelado ? (id === r.objetivo ? VERDE : id === elegida ? ROJO : '#64748B') : '#FFFFFF'}
          onToca={revelado ? undefined : () => onResponder(id)} />
      ))}
      {revelado && <Marker coordinates={medio(elemento(r.objetivo))}>{etiquetaMapa(nombre(r.objetivo, l), VERDE)}</Marker>}
    </Mapa>
  )
}

export default function PreguntaRios({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const props = { r, revelado, elegida, onResponder, tr, l }
  const acierto = revelado && esCorrecta(r, elegida)
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2">
        {r.tipo === 'busca' ? <Busca {...props} />
          : r.tipo === 'etiqueta' ? <Etiqueta key={r.id} {...props} />
          : r.tipo === 'vertiente' ? <Vertiente key={r.id} {...props} />
          : <Extremos {...props} />}
      </div>
      {revelado && (
        <>
          <p className={`text-center font-black mt-3 ${acierto ? 'text-green-400' : 'text-red-300'}`}>{acierto ? '✅' : '❌'} {textoRespuesta(r, l)}</p>
          <p className="mt-2 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>
        </>
      )}
    </div>
  )
}
