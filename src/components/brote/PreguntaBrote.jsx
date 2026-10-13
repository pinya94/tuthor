// Una ronda de ¡Brote! (ver lib/brote):
//   cortafuegos  cuadrícula de personas: tocar para vacunar, «Simular» y el
//                contagio avanza generación a generación
//   umbral       deslizador del % vacunado: 100 personas y el R efectivo en vivo
//   ficha        elegir el microbio (dibujado) y la vía de contagio
//   clasifica    tarjetas a su caja (los microbios, dibujados)
// Cada una responde una sola vez (ver esCorrecta).
import { useState, useEffect, useRef } from 'react'
import { useLang } from '../../context/LangContext'
import { Microbio } from './Microbio'
import {
  enunciado, explicacion, enfermedad, tx, VIAS, MICROBIOS, LADO, VACUNAS, contagio, MARGEN_UMBRAL,
  cajaDe, textoCaja, textoItem,
} from '../../lib/brote'

const caja = 'rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3'
const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
// Un microbio que represente a cada tipo, para la ficha.
const TIPICO = { virus: 'virus', bacteria: 'bacilo', hongo: 'moho', protozoo: 'ameba' }

// ── Frena el brote ────────────────────────────────────────────────────────
function Cortafuegos({ r, tr, l, revelado, onResponder }) {
  const [vac, setVac] = useState([])
  const [gen, setGen] = useState(-1) // generación que se ve (−1: sin simular)
  const tRef = useRef(null)
  useEffect(() => () => clearTimeout(tRef.current), [])
  const simulando = gen >= 0
  // Se recalcula de las vacunas (es barato): no hace falta guardarlo.
  const gens = contagio(r.cero, [...r.inmunes, ...vac])
  const enfermos = new Set(simulando ? gens.slice(0, gen + 1).flat() : [r.cero])
  const toca = i => {
    if (simulando || revelado || i === r.cero || r.inmunes.includes(i)) return
    setVac(v => (v.includes(i) ? v.filter(x => x !== i) : v.length < VACUNAS ? [...v, i] : v))
  }
  const simula = () => {
    const total = gens.flat().length
    const paso = g => {
      setGen(g)
      if (g < gens.length - 1) tRef.current = setTimeout(() => paso(g + 1), 380)
      else tRef.current = setTimeout(() => onResponder(`cf:${total}`), 500)
    }
    paso(0)
  }
  const n = enfermos.size
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">{enunciado(r, l)}</p>
      <div className={caja}>
        <div className="grid gap-1 mx-auto max-w-[300px]" style={{ gridTemplateColumns: `repeat(${LADO}, minmax(0, 1fr))` }}>
          {Array.from({ length: LADO * LADO }, (_, i) => {
            const enf = enfermos.has(i), inm = r.inmunes.includes(i), va = vac.includes(i)
            const fondo = enf ? 'bg-red-500/40 border-red-400' : inm ? 'bg-emerald-600/40 border-emerald-500' : va ? 'bg-sky-500/40 border-sky-300' : 'bg-white/[0.06] border-white/10'
            return (
              <button key={i} onClick={() => toca(i)} className={`aspect-square rounded-lg border text-lg leading-none grid place-items-center transition-colors ${fondo}`}
                aria-label={enf ? 'enfermo' : inm ? 'inmune' : va ? 'vacunado' : 'sano'}>
                {enf ? '🤒' : inm ? '🛡️' : va ? '💉' : '🙂'}
              </button>
            )
          })}
        </div>
        <div className="flex justify-center gap-3 text-[11px] font-bold mt-2 flex-wrap">
          <span className="text-red-300">🤒 {n} / {r.meta}</span>
          <span className="text-sky-300">💉 {vac.length} / {VACUNAS}</span>
          <span className="text-emerald-300">🛡️ {tr({ es: 'ya inmunes', en: 'already immune', ca: 'ja immunes' })}</span>
          {simulando && <span className="text-white/60">{tr({ es: 'Generación', en: 'Generation', ca: 'Generació' })} {gen}</span>}
        </div>
      </div>
      {!revelado && !simulando && (
        <button className={boton} disabled={vac.length < VACUNAS} onClick={simula}>
          ▶ {tr({ es: 'Simular el contagio', en: 'Run the outbreak', ca: 'Simular el contagi' })}
        </button>
      )}
    </>
  )
}

// ── Inmunidad de grupo ────────────────────────────────────────────────────
function Umbral({ r, tr, l, revelado, onResponder }) {
  const [p, setP] = useState(30)
  const Re = r.R * (1 - p / 100)
  const ok = p >= r.umbral && p <= r.umbral + MARGEN_UMBRAL
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">{enunciado(r, l)}</p>
      <div className={caja}>
        <div className="grid grid-cols-10 gap-[3px] max-w-[250px] mx-auto">
          {Array.from({ length: 100 }, (_, i) => <span key={i} className={`aspect-square rounded-full ${i < p ? 'bg-sky-400' : 'bg-white/20'}`} />)}
        </div>
        <p className="text-center mt-2 text-white font-black text-2xl tabular-nums">{p} %</p>
        <p className={`text-center text-sm font-bold ${Re < 1 ? 'text-green-300' : 'text-red-300'}`}>
          {tr({ es: 'Cada enfermo contagia a', en: 'Each sick person infects', ca: 'Cada malalt n’encomana' })} {r.R} × {(1 - p / 100).toFixed(2).replace('.', l === 'en' ? '.' : ',')} = {Re.toFixed(2).replace('.', l === 'en' ? '.' : ',')}
          {' '}{Re < 1 ? tr({ es: '→ el brote se apaga', en: '→ the outbreak dies out', ca: '→ el brot s’apaga' }) : tr({ es: '→ el brote crece', en: '→ the outbreak grows', ca: '→ el brot creix' })}
        </p>
        {revelado && <p className={`text-center text-xs font-bold mt-1 ${ok ? 'text-green-300' : 'text-amber-300'}`}>{tr({ es: 'Umbral', en: 'Threshold', ca: 'Llindar' })}: {r.umbral} %</p>}
      </div>
      {!revelado && (
        <>
          <input type="range" min="0" max="100" step="1" value={p} onChange={e => setP(+e.target.value)} className="w-full accent-sky-400 mb-3" aria-label="%" />
          <button className={boton} onClick={() => onResponder(`p:${p}`)}>{tr({ es: 'Vacunar a este porcentaje', en: 'Vaccinate this share', ca: 'Vacunar aquest percentatge' })}</button>
        </>
      )}
    </>
  )
}

// ── Ficha de la enfermedad ────────────────────────────────────────────────
function Ficha({ r, tr, l, revelado, onResponder }) {
  const e = enfermedad(r.enf)
  const [mic, setMic] = useState(null)
  const [via, setVia] = useState(e.via ? null : '-')
  const [bm, bv] = r.bueno.split('|')
  const marca = (sel, x, b) => {
    if (!revelado) return sel ? 'bg-amber-300/25 border-amber-300 ring-2 ring-amber-300' : 'bg-white/[0.06] border-white/15'
    if (x === b) return 'bg-green-500/25 border-green-400'
    return sel ? 'bg-red-500/25 border-red-400' : 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <>
      <div className={`${caja} text-center`}>
        <p className="text-white/50 text-xs">{enunciado(r, l)}</p>
        <p className="text-white font-black text-2xl">{tx(e.nombre, l)}</p>
      </div>
      <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">{tr({ es: 'Microbio', en: 'Microbe', ca: 'Microbi' })}</p>
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {Object.keys(MICROBIOS).map(m => (
          <button key={m} disabled={revelado} onClick={() => setMic(m)} className={`rounded-xl border p-1 transition-all ${marca(mic === m, m, bm)}`}>
            <Microbio forma={TIPICO[m]} className="w-full h-auto block" />
            <span className="block text-white text-[11px] font-bold">{tx(MICROBIOS[m], l)}</span>
          </button>
        ))}
      </div>
      {e.via && (
        <>
          <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">{tr({ es: 'Contagio', en: 'How it spreads', ca: 'Contagi' })}</p>
          <div className="grid grid-cols-1 gap-1.5 mb-3">
            {Object.keys(VIAS).map(v => (
              <button key={v} disabled={revelado} onClick={() => setVia(v)} className={`rounded-xl border px-2 py-1.5 text-left text-white text-[13px] font-bold transition-all ${marca(via === v, v, bv)}`}>
                {VIAS[v].emoji} {tx(VIAS[v].t, l)}
              </button>
            ))}
          </div>
        </>
      )}
      {!revelado && <button className={boton} disabled={!mic || !via} onClick={() => onResponder(`${mic}|${via}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
    </>
  )
}

// ── Clasificar ────────────────────────────────────────────────────────────
function Clasifica({ r, l, revelado, onResponder }) {
  const [puestas, setPuestas] = useState({})
  const [activa, setActiva] = useState(r.items[0])
  const dibujo = it => it.startsWith('f:')
  const colocar = c => {
    if (revelado || !activa) return
    const n = { ...puestas, [activa]: c }
    setPuestas(n)
    const sig = r.items.find(i => !n[i])
    setActiva(sig ?? null)
    if (!sig) onResponder(`clasifica:${r.items.filter(i => n[i] !== cajaDe(r, i)).length}`)
  }
  const conDibujo = r.items.every(dibujo)
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">{enunciado(r, l)}</p>
      <div className={conDibujo ? 'grid grid-cols-4 gap-1.5 mb-3 min-h-[4.5rem]' : 'space-y-1.5 mb-3'}>
        {r.items.filter(i => !puestas[i]).map(i => (
          <button key={i} onClick={() => setActiva(i)} className={`${conDibujo ? 'rounded-xl p-1' : 'block w-full text-left rounded-xl px-3 py-2 text-[13px] leading-snug text-white'} transition-all ${activa === i ? 'bg-white/20 ring-2 ring-amber-300' : 'bg-white/5'}`}>
            {conDibujo ? <Microbio forma={i.slice(2)} className="w-full h-auto block" /> : textoItem(i, l)}
          </button>
        ))}
      </div>
      <div className={`grid gap-2 ${r.cajas.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || !activa} onClick={() => colocar(c)}
            className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[4rem] text-left">
            <span className="block text-white text-[12.5px] font-black leading-tight">{textoCaja(r, c, l)}</span>
            <span className="flex flex-wrap gap-1 mt-1">
              {r.items.filter(i => puestas[i] === c).map(i => (
                <span key={i} className={`rounded-md px-1 py-0.5 text-[10.5px] leading-tight text-white ${cajaDe(r, i) === c ? 'bg-green-500/30 ring-1 ring-green-400' : 'bg-red-500/30 ring-1 ring-red-400'} ${dibujo(i) ? 'w-12' : 'block w-full'}`}>
                  {dibujo(i) ? <Microbio forma={i.slice(2)} className="w-full h-auto block" /> : `${textoItem(i, l).slice(0, 40)}${textoItem(i, l).length > 40 ? '…' : ''}`}
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

export default function PreguntaBrote({ ronda, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, tr, l, revelado, onResponder }
  return (
    <div className="w-full">
      {ronda.tipo === 'cortafuegos' ? <Cortafuegos {...props} />
        : ronda.tipo === 'umbral' ? <Umbral {...props} />
        : ronda.tipo === 'ficha' ? <Ficha {...props} />
        : <Clasifica {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
