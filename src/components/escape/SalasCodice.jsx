// Las seis salas de «El Códice Robado». Cada una recibe:
//   onResuelta(extra?)   la sala está resuelta (extra: lo que se enseña en la página)
//   onFallo(texto, seg?) comprobación mal: el padre resta tiempo y lo avisa
// La corrección nunca dice QUÉ está mal, solo cuánto (es un escape room).
import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import Retrato from '../quienEsQuien/Retrato'
import { PERGAMINO, BOTON } from './Comun'
import {
  ETAPAS_CRIPTA, OBJETOS_CRIPTA, CIUDADES, VIAJE, PALABRA_MAPA, PALABRAS, CARTA, REYES, SUCESOS,
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

const PIEDRA = '#8B7D6B', HUESO = '#E8DCC0', BRONCE = '#C9963A', HIERRO = '#6B7280', BARRO = '#B5652F', MADERA = '#7C4A23'
const DIBUJO = {
  bifaz: <g><path d="M50 10 C70 30 76 60 66 82 Q50 94 34 82 C24 60 30 30 50 10 Z" fill={PIEDRA} /><path d="M50 10 L44 40 L56 52 L46 70 L52 88 M36 45 L44 40 M64 50 L56 52 M38 70 L46 70" stroke="#5E5345" strokeWidth="2.5" fill="none" /></g>,
  arpon: <g><rect x="46" y="8" width="8" height="84" rx="4" fill={HUESO} /><path d="M54 18 L66 26 L54 28 Z M54 34 L66 42 L54 44 Z M54 50 L66 58 L54 60 Z M46 26 L34 34 L46 36 Z M46 42 L34 50 L46 52 Z" fill={HUESO} /><path d="M46 8 L50 0 L54 8 Z" fill={HUESO} /></g>,
  bisonte: <g><rect x="4" y="14" width="92" height="72" rx="16" fill="#C8A272" /><path d="M20 62 Q18 44 32 40 Q38 28 52 32 Q70 30 78 42 Q86 46 82 56 L78 70 L72 70 L72 60 Q60 64 48 62 L44 72 L38 72 L38 62 Q30 64 28 72 L22 72 Z" fill="#9B2C1C" /><path d="M24 44 Q20 36 26 34 M72 36 Q80 30 82 38" stroke="#2B1A12" strokeWidth="3" fill="none" /><circle cx="76" cy="46" r="1.8" fill="#2B1A12" /></g>,
  vasija: <g><path d="M30 18 L70 18 L66 28 Q84 44 76 70 Q68 90 50 90 Q32 90 24 70 Q16 44 34 28 Z" fill={BARRO} /><path d="M24 50 L32 42 L40 50 L48 42 L56 50 L64 42 L72 50 L78 44" stroke="#F3D9B1" strokeWidth="3" fill="none" /><rect x="28" y="14" width="44" height="6" rx="3" fill="#9A5226" /></g>,
  hacha: <g><rect x="44" y="20" width="10" height="76" rx="4" fill={MADERA} /><path d="M18 24 Q36 14 52 20 L52 40 Q36 46 18 38 Q12 31 18 24 Z" fill="#5F6B5C" /><path d="M22 28 Q34 24 46 26" stroke="#8A9A86" strokeWidth="3" fill="none" /><path d="M44 18 L56 22 M44 42 L56 38" stroke="#D6B98C" strokeWidth="3" /></g>,
  molino: <g><path d="M8 72 Q50 54 92 72 L88 84 Q50 74 12 84 Z" fill={PIEDRA} /><ellipse cx="50" cy="58" rx="20" ry="9" fill="#A3967F" /><g fill="#E8C76A">{[[20, 74], [28, 70], [76, 72], [70, 68], [82, 76], [36, 76]].map(([x, y]) => <ellipse key={x} cx={x} cy={y} rx="2.6" ry="1.6" />)}</g></g>,
  espada: <g><path d="M50 4 L58 18 L56 66 L44 66 L42 18 Z" fill={BRONCE} /><path d="M50 8 L50 64" stroke="#E7C27A" strokeWidth="2" /><rect x="34" y="64" width="32" height="7" rx="3" fill="#8A6424" /><rect x="46" y="70" width="8" height="20" rx="3" fill="#6B4A1C" /><circle cx="50" cy="92" r="5" fill="#8A6424" /></g>,
  molde: <g><rect x="12" y="22" width="76" height="62" rx="8" fill="#9C9384" /><path d="M30 36 Q50 30 70 36 L64 60 Q50 64 36 60 Z" fill="#4A443B" /><path d="M36 40 Q50 36 64 40 L60 56 Q50 59 40 56 Z" fill="#F59E0B" /><path d="M46 8 L54 8 L52 30 L48 30 Z" fill="#F97316" /></g>,
  lanza: <g><path d="M50 4 Q66 26 58 52 L54 60 L46 60 L42 52 Q34 26 50 4 Z" fill={HIERRO} /><path d="M50 8 L50 58" stroke="#9CA3AF" strokeWidth="2" /><rect x="45" y="58" width="10" height="16" rx="3" fill="#4B5563" /><rect x="46" y="72" width="8" height="24" rx="3" fill={MADERA} /></g>,
}
function Objeto({ o, sel, onClick, pequeno }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex flex-col items-center rounded-xl p-1.5 transition-all ${sel ? 'bg-amber-300/30 ring-4 ring-amber-400 scale-105' : 'bg-black/25 hover:bg-black/40'} ${pequeno ? 'w-[5.5rem] sm:w-28' : 'w-24 sm:w-32'}`}>
      <svg viewBox="0 0 100 100" className={pequeno ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-16 h-16 sm:w-20 sm:h-20'} aria-hidden="true">{DIBUJO[o.id]}</svg>
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
      <p className={enunciado}>Toca un objeto y después la etapa a la que pertenece.</p>
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
      <p className={enunciado}>Del más antiguo (izquierda) al más moderno (derecha). Toca dos cuadros para cambiarlos.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {orden.map((r, i) => (
          <button key={r.id} type="button" onClick={() => toca(i)}
            className={`flex flex-col justify-start rounded-xl p-2 border-[6px] border-[#8a6424] bg-[#2a1f16] text-left transition-all ${sel === i ? 'ring-4 ring-amber-300 scale-105' : 'hover:brightness-110'}`}>
            <div className="aspect-[66/86] rounded overflow-hidden bg-[#3d5266]"><Retrato p={{ id: r.id }} rasgos={r.rasgos} busto className="w-full h-full" /></div>
            <p className={`mt-1.5 text-center font-black text-sm ${resuelta ? 'text-amber-300' : 'text-white/30'}`}>{resuelta ? r.nombre : `Cuadro ${i + 1}`}</p>
            <p className="text-[#f6ecd2] text-xs sm:text-sm leading-snug mt-1">{r.hecho}</p>
          </button>
        ))}
      </div>
      <div className="mt-4 text-center"><button type="button" className={BOTON} disabled={resuelta} onClick={comprobar}>🖼️ Comprobar el orden</button></div>
    </div>
  )
}

// ── 6. La torre del reloj (siglos XIX y XX) ─────────────────────────────────

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
      <p className={enunciado}>Toca un acontecimiento y después su año. (Toca un año ocupado para vaciarlo.)</p>
      <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-[3.5rem]">
        {cartas.filter(c => !usadas.includes(c.t)).map(c => (
          <button key={c.t} type="button" onClick={() => setSel(s => (s === c.t ? null : c.t))}
            className={`${PERGAMINO} rounded-xl px-3 py-2 font-bold text-sm sm:text-lg max-w-xs text-left transition-all ${sel === c.t ? 'ring-4 ring-amber-400 scale-105' : 'hover:brightness-95'}`}>
            {c.t}
          </button>
        ))}
      </div>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-[3.25rem] sm:left-[4.5rem] top-2 bottom-2 w-1.5 bg-amber-700/60 rounded" aria-hidden="true" />
        <div className="space-y-2.5">
          {SUCESOS.map(s => (
            <button key={s.anio} type="button" onClick={() => pon(s.anio)} className="relative w-full flex items-center gap-3 sm:gap-5 text-left">
              <span className="relative z-10 w-24 sm:w-36 shrink-0 rounded-xl bg-amber-500 text-[#2a1d10] font-black text-xl sm:text-3xl text-center py-2">{s.anio}</span>
              <span className={`flex-1 rounded-xl border-2 border-dashed px-3 py-2.5 text-base sm:text-xl font-bold min-h-[3rem] ${huecos[s.anio] ? 'border-transparent bg-[#f1e2bd] text-[#3b2a1a]' : sel ? 'border-amber-400 text-amber-200/70 bg-amber-400/10' : 'border-white/20 text-white/30'}`}>
                {huecos[s.anio] ?? '…'}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center"><button type="button" className={BOTON} disabled={usadas.length < SUCESOS.length} onClick={comprobar}>🕰️ Poner el reloj en marcha</button></div>
    </div>
  )
}

export const SALA_COMPONENTE = { cripta: Cripta, mapas: Mapas, palabras: Palabras, scriptorium: Scriptorium, galeria: Galeria, torre: Torre }
