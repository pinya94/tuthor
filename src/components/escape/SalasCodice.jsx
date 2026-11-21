// Las seis salas de «El Códice Robado». Cada una recibe:
//   onResuelta(extra?)   la sala está resuelta (extra: lo que se enseña en la página)
//   onFallo(texto, seg?) comprobación mal: el padre resta tiempo y lo avisa
// La corrección nunca dice QUÉ está mal, solo cuánto (es un escape room).
import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { PERGAMINO, BOTON } from './Comun'
import {
  imgRey, ETAPAS_CRIPTA, OBJETOS_CRIPTA, CIUDADES, VIAJE, PALABRA_MAPA, PALABRAS, CARTA, REYES, SUCESOS,
} from '../../data/escape/codiceRobado'

const barajar = (arr, distinto = true) => {
  for (let k = 0; k < 20; k++) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
    if (!distinto || a.some((x, i) => x !== arr[i])) return a
  }
  return [...arr].reverse()
}
const enunciado = 'text-[#f6ecd2] text-lg sm:text-2xl font-semibold leading-snug mb-4'

// ── 1. La cripta (Prehistoria) ──────────────────────────────────────────────

function Objeto({ o, sel, onClick, pequeno }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex flex-col items-center rounded-xl p-1.5 transition-all ${sel ? 'bg-amber-300/30 ring-4 ring-amber-400 scale-105' : 'bg-black/25 hover:bg-black/40'} ${pequeno ? 'w-[5.5rem] sm:w-28' : 'w-24 sm:w-32'}`}>
      <img src={`/escape/cripta/${o.id}.webp`} alt="" draggable={false}
        className={`rounded-md object-cover ${pequeno ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-16 h-16 sm:w-20 sm:h-20'}`} />
      <span className="text-[#f6ecd2] text-xs sm:text-sm font-bold leading-tight text-center mt-1">{o.nombre}</span>
    </button>
  )
}
export function Cripta({ onResuelta, onFallo }) {
  const [orden] = useState(() => barajar(OBJETOS_CRIPTA))
  const [ubic, setUbic] = useState({})
  const [sel, setSel] = useState(null)
  const sueltos = orden.filter(o => !ubic[o.id])
  const toca = id => setSel(s => (s === id ? null : id))
  const coloca = etapa => { if (!sel) return; setUbic(u => ({ ...u, [sel]: etapa })); setSel(null) }
  const comprobar = () => {
    const mal = OBJETOS_CRIPTA.filter(o => ubic[o.id] !== o.etapa).length
    if (mal === 0) onResuelta()
    else onFallo(`${mal === 1 ? 'Un objeto no está' : `${mal} objetos no están`} en su etapa.`)
  }
  return (
    <div>
      <p className={enunciado}>Toca un objeto y después la etapa a la que pertenece. Las imágenes son reconstrucciones ilustradas.</p>
      <div className="min-h-[7rem] flex flex-wrap justify-center gap-2 rounded-2xl bg-[#2a1f16] border border-amber-900/50 p-3">
        {sueltos.length === 0 ? <p className="self-center text-white/40">Todos los objetos están colocados.</p>
          : sueltos.map(o => <Objeto key={o.id} o={o} sel={sel === o.id} onClick={() => toca(o.id)} />)}
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mt-3">
        {ETAPAS_CRIPTA.map(e => (
          <div key={e.id} onClick={() => coloca(e.id)} role="button" tabIndex={0} onKeyDown={ev => ev.key === 'Enter' && coloca(e.id)}
            className={`rounded-2xl border-2 border-dashed p-3 min-h-[9rem] transition-colors ${sel ? 'border-amber-400 bg-amber-400/10 cursor-pointer' : 'border-white/20 bg-black/20'}`}>
            <p className="text-amber-200 font-black text-lg sm:text-xl text-center mb-2">{e.nombre}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {orden.filter(o => ubic[o.id] === e.id).map(o => (
                <Objeto key={o.id} o={o} pequeno sel={sel === o.id} onClick={ev => { ev.stopPropagation(); toca(o.id) }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center"><button type="button" className={BOTON} disabled={sueltos.length > 0} onClick={comprobar}>🔦 Comprobar</button></div>
    </div>
  )
}

// ── 2. La sala de mapas (Hispania romana) ───────────────────────────────────

const ATLAS = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'
export function Mapas({ onResuelta, onFallo }) {
  const [hechas, setHechas] = useState([])
  const [mal, setMal] = useState(null)
  const toca = id => {
    if (hechas.includes(id)) return
    if (id === VIAJE[hechas.length]) {
      const n = [...hechas, id]
      setHechas(n); setMal(null)
      if (n.length === VIAJE.length) setTimeout(() => onResuelta(), 900)
    } else { setMal(id); onFallo('Esa ciudad no es la siguiente del viaje.', 15) }
  }
  const letras = hechas.map(id => CIUDADES.find(c => c.id === id).letra)
  return (
    <div>
      <div className={`${PERGAMINO} rounded-2xl p-4 sm:p-5 mb-4 font-serif text-lg sm:text-2xl leading-relaxed italic`}>
        «Partí de <b>Gades</b>, seguí a <b>Hispalis</b> y a <b>Corduba</b>, subí a <b>Toletum</b> y a <b>Caesaraugusta</b>, y terminé el viaje en <b>Tarraco</b> y <b>Barcino</b>.»
      </div>
      <div className="flex justify-center gap-1.5 sm:gap-2 mb-3">
        {PALABRA_MAPA.split('').map((_, i) => (
          <span key={i} className={`w-9 h-11 sm:w-12 sm:h-14 rounded-lg flex items-center justify-center font-black text-2xl sm:text-3xl ${letras[i] ? 'bg-amber-400 text-[#2a1d10]' : 'bg-white/10 text-white/20'}`}>{letras[i] ?? '?'}</span>
        ))}
      </div>
      <div className="w-full max-w-3xl mx-auto aspect-[5/4] rounded-2xl overflow-hidden bg-[#2c4a5e]">
        <ComposableMap projection="geoMercator" projectionConfig={{ center: [-3.6, 40.0], scale: 3100 }} width={800} height={640} style={{ width: '100%', height: '100%' }}>
          <Geographies geography={ATLAS}>
            {({ geographies }) => geographies.map(geo => (
              <Geography key={geo.rsmKey} geography={geo} fill={['724', '620'].includes(String(geo.id)) ? '#d8c08e' : '#a99a7a'} stroke="#7a6a4a" strokeWidth={0.8}
                style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }} />
            ))}
          </Geographies>
          {CIUDADES.map(c => {
            const hecha = hechas.includes(c.id)
            return (
              <Marker key={c.id} coordinates={c.c} onClick={() => toca(c.id)} style={{ default: { cursor: 'pointer' } }}>
                <circle r={34} fill="transparent" />
                <circle r={hecha ? 16 : 11} fill={hecha ? '#F59E0B' : mal === c.id ? '#DC2626' : '#7F1D1D'} stroke="#FFF7E6" strokeWidth={3} />
                {hecha && <text textAnchor="middle" y={7} fontSize={20} fontWeight={900} fill="#2a1d10" style={{ pointerEvents: 'none' }}>{c.letra}</text>}
                <text textAnchor="middle" y={c.bajo ? 40 : -20} fontSize={24} fontWeight={800} fill="#2a1d10" stroke="#f3e5c0" strokeWidth={6} style={{ paintOrder: 'stroke', pointerEvents: 'none' }}>{c.hoy}</text>
              </Marker>
            )
          })}
        </ComposableMap>
      </div>
    </div>
  )
}

// ── 3. El arcón de las palabras (al-Ándalus) ────────────────────────────────

export function Palabras({ onResuelta, onFallo }) {
  const [orden] = useState(() => barajar(PALABRAS))
  const [marcadas, setMarcadas] = useState([])
  const toca = p => setMarcadas(m => (m.includes(p) ? m.filter(x => x !== p) : [...m, p]))
  const comprobar = () => {
    const mal = PALABRAS.filter(w => w.arabe !== marcadas.includes(w.p)).length
    if (mal === 0) onResuelta()
    else onFallo(`${mal === 1 ? 'Hay una palabra mal' : `Hay ${mal} palabras mal`}: marcada sin ser árabe o árabe sin marcar.`)
  }
  return (
    <div>
      <p className={enunciado}>Toca las palabras que el castellano tomó del árabe.</p>
      <div className={`${PERGAMINO} rounded-2xl p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3`}>
        {orden.map(w => {
          const m = marcadas.includes(w.p)
          return (
            <button key={w.p} type="button" onClick={() => toca(w.p)}
              className={`rounded-xl border-2 py-3 sm:py-4 font-serif font-bold text-xl sm:text-3xl transition-all ${m ? 'bg-[#7F1D1D] text-[#f6ecd2] border-[#7F1D1D] scale-105' : 'border-[#3b2a1a]/30 hover:border-[#3b2a1a]'}`}>
              {w.p}
            </button>
          )
        })}
      </div>
      <div className="mt-4 text-center"><button type="button" className={BOTON} disabled={marcadas.length === 0} onClick={comprobar}>📦 Abrir el arcón</button></div>
    </div>
  )
}

// ── 4. El scriptorium (Reyes Católicos) ─────────────────────────────────────

export function Scriptorium({ onResuelta, onFallo }) {
  const [marcadas, setMarcadas] = useState([])
  const toca = i => setMarcadas(m => (m.includes(i) ? m.filter(x => x !== i) : [...m, i]))
  const comprobar = () => {
    const mal = CARTA.frases.filter((f, i) => f.mal !== marcadas.includes(i)).length
    if (mal === 0) onResuelta({ aprendido: CARTA.frases.filter(f => f.mal).map(f => f.por) })
    else onFallo(`${mal === 1 ? 'Hay una frase mal' : `Hay ${mal} frases mal`}: marcada siendo posible o imposible sin marcar.`)
  }
  return (
    <div>
      <p className={enunciado}>Toca las frases que en enero de 1492 eran imposibles.</p>
      <div className={`${PERGAMINO} rounded-2xl p-5 sm:p-8 font-serif max-w-3xl mx-auto shadow-xl`}>
        <p className="text-right italic text-base sm:text-xl mb-3">{CARTA.cabecera}</p>
        <div className="text-lg sm:text-2xl leading-relaxed">
          {CARTA.frases.map((f, i) => (
            <span key={i}>
              <button type="button" onClick={() => toca(i)}
                className={`inline text-left rounded px-0.5 transition-colors ${marcadas.includes(i) ? 'bg-red-700/80 text-[#fff4dc] line-through decoration-2' : 'hover:bg-amber-300/50'}`}>
                {f.t}
              </button>{' '}
            </span>
          ))}
        </div>
        <p className="text-right italic text-base sm:text-xl mt-4">{CARTA.firma}</p>
      </div>
      <div className="mt-4 text-center"><button type="button" className={BOTON} disabled={marcadas.length === 0} onClick={comprobar}>✒️ Comprobar</button></div>
    </div>
  )
}

// ── 5. La galería de retratos (Austrias y Borbones) ─────────────────────────

export function Galeria({ onResuelta, onFallo }) {
  const [orden, setOrden] = useState(() => barajar(REYES))
  const [sel, setSel] = useState(null)
  const [resuelta, setResuelta] = useState(false)
  const toca = i => {
    if (resuelta) return
    if (sel === null) { setSel(i); return }
    if (sel !== i) setOrden(o => { const n = [...o]; [n[sel], n[i]] = [n[i], n[sel]]; return n })
    setSel(null)
  }
  const comprobar = () => {
    const bien = orden.filter((r, i) => r.id === REYES[i].id).length
    if (bien === REYES.length) { setResuelta(true); setTimeout(() => onResuelta(), 1600) }
    else onFallo(`${bien === 1 ? 'Solo un cuadro está' : `${bien} de ${REYES.length} cuadros están`} en su sitio.`)
  }
  return (
    <div>
      <p className={enunciado}>Ordénalos por el inicio de su reinado, del primero al último. Toca dos cuadros para cambiarlos.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {orden.map((r, i) => (
          <button key={r.id} type="button" onClick={() => toca(i)}
            className={`flex flex-col justify-start rounded-xl p-2 border-[6px] border-[#8a6424] bg-[#2a1f16] text-left transition-all ${sel === i ? 'ring-4 ring-amber-300 scale-105' : 'hover:brightness-110'}`}>
            <div className="aspect-[4/5] rounded overflow-hidden bg-black"><img src={imgRey(r.id)} alt={resuelta ? `${r.nombre}, por ${r.autor}` : 'Retrato de un rey'} className="w-full h-full object-cover" draggable="false" /></div>
            <p className={`mt-1.5 text-center font-black text-sm ${resuelta ? 'text-amber-300' : 'text-white/30'}`}>{resuelta ? r.nombre : `Cuadro ${i + 1}`}</p>
            {resuelta && <p className="text-center text-white/50 text-[11px] leading-tight">{r.autor} · {r.museo}</p>}
            <p className="text-[#f6ecd2] text-xs sm:text-sm leading-snug mt-1">{r.hecho}</p>
          </button>
        ))}
      </div>
      <div className="mt-4 text-center"><button type="button" className={BOTON} disabled={resuelta} onClick={comprobar}>🖼️ Comprobar el orden</button></div>
      <p className="mt-2 text-center text-white/30 text-xs">Retratos de época, de dominio público (Wikimedia Commons).</p>
    </div>
  )
}

// ── 6. La torre del reloj (siglos XIX y XX) ─────────────────────────────────

function ImagenSuceso({ anio }) {
  return (
    <img src={`/escape/sucesos/${anio}.webp`} alt="" draggable={false}
      className="h-12 w-16 shrink-0 rounded object-cover sm:h-16 sm:w-24" />
  )
}

export function Torre({ onResuelta, onFallo }) {
  const [cartas] = useState(() => barajar(SUCESOS))
  const [huecos, setHuecos] = useState({}) // año → texto
  const [sel, setSel] = useState(null)
  const usadas = Object.values(huecos)
  const pon = anio => {
    if (!sel) { if (huecos[anio]) setHuecos(h => { const n = { ...h }; delete n[anio]; return n }); return }
    setHuecos(h => { const n = { ...h }; for (const k of Object.keys(n)) if (n[k] === sel) delete n[k]; n[anio] = sel; return n })
    setSel(null)
  }
  const comprobar = () => {
    const mal = SUCESOS.filter(s => huecos[s.anio] !== s.t).length
    if (mal === 0) onResuelta()
    else onFallo(`${mal === 1 ? 'Un acontecimiento no está' : `${mal} acontecimientos no están`} en su año.`)
  }
  return (
    <div>
      <p className={enunciado}>Toca un acontecimiento y después su año. Toca un año ocupado para vaciarlo. Las escenas son reconstrucciones ilustradas.</p>
      <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-[3.5rem]">
        {cartas.filter(c => !usadas.includes(c.t)).map(c => (
          <button key={c.t} type="button" onClick={() => setSel(s => (s === c.t ? null : c.t))}
            className={`${PERGAMINO} rounded-xl px-3 py-2 font-bold text-sm sm:text-lg max-w-xs text-left transition-all ${sel === c.t ? 'ring-4 ring-amber-400 scale-105' : 'hover:brightness-95'}`}>
            <span className="flex items-center gap-2"><ImagenSuceso anio={c.anio} /><span>{c.t}</span></span>
          </button>
        ))}
      </div>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-[3.25rem] sm:left-[4.5rem] top-2 bottom-2 w-1.5 bg-amber-700/60 rounded" aria-hidden="true" />
        <div className="space-y-2.5">
          {SUCESOS.map(s => {
            const colocado = SUCESOS.find(c => c.t === huecos[s.anio])
            return (
            <button key={s.anio} type="button" onClick={() => pon(s.anio)} className="relative w-full flex items-center gap-3 sm:gap-5 text-left">
              <span className="relative z-10 w-24 sm:w-36 shrink-0 rounded-xl bg-amber-500 text-[#2a1d10] font-black text-xl sm:text-3xl text-center py-2">{s.anio}</span>
              <span className={`flex-1 rounded-xl border-2 border-dashed px-3 py-2.5 text-base sm:text-xl font-bold min-h-[3rem] ${huecos[s.anio] ? 'border-transparent bg-[#f1e2bd] text-[#3b2a1a]' : sel ? 'border-amber-400 text-amber-200/70 bg-amber-400/10' : 'border-white/20 text-white/30'}`}>
                {colocado ? (
                  <span className="flex items-center gap-2"><ImagenSuceso anio={colocado.anio} /><span>{colocado.t}</span></span>
                ) : '…'}
              </span>
            </button>
            )
          })}
        </div>
      </div>
      <div className="mt-4 text-center"><button type="button" className={BOTON} disabled={usadas.length < SUCESOS.length} onClick={comprobar}>🕰️ Poner el reloj en marcha</button></div>
    </div>
  )
}

export const SALA_COMPONENTE = { cripta: Cripta, mapas: Mapas, palabras: Palabras, scriptorium: Scriptorium, galeria: Galeria, torre: Torre }
