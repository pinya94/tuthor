// Una ronda de Verbos Irregulares (ver lib/verbosIrregulares):
//   forja      tocar fichas para rellenar los huecos de pasado y participio
//              (tocar un hueco lleno lo vacía)
//   patrones   tocar un verbo y luego su caja de patrón
//   teclea     escribir la forma que falta
//   frase      tocar una forma y luego el hueco de su frase
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { verbo, patron, ejemploPatron, PATRONES, FORMA, significado, tresFormas, enunciado, explicacion, vale, tx } from '../../lib/verbosIrregulares'

const HUECO = 'min-w-[6.5rem] rounded-xl border-2 px-3 py-2 text-center font-black text-lg'
const FICHA = 'rounded-xl bg-sky-500 hover:bg-sky-400 px-3 py-2 text-white font-black text-base shadow-[0_3px_0_#0369a1] disabled:opacity-30 disabled:shadow-none'

function Cabeza({ v, l }) {
  const sig = significado(v, l)
  return (
    <div className="text-center mb-3">
      <p className="text-white/40 text-[11px] uppercase tracking-widest">{tx(FORMA.inf, l)}</p>
      <p className="text-white font-black text-3xl">{v.inf}</p>
      {sig && <p className="text-white/50 text-sm">{sig}</p>}
    </div>
  )
}

function Forja({ r, revelado, onResponder, l, tr }) {
  const v = verbo(r.verbos[0])
  const [huecos, setHuecos] = useState({ past: null, pp: null }) // índice de ficha
  const pon = k => {
    if (revelado) return
    const libre = huecos.past === null ? 'past' : huecos.pp === null ? 'pp' : null
    if (!libre) return
    const n = { ...huecos, [libre]: k }
    setHuecos(n)
    if (n.past !== null && n.pp !== null) onResponder(`forja:${r.fichas[n.past]}|${r.fichas[n.pp]}`)
  }
  const quita = f => { if (!revelado) setHuecos(h => ({ ...h, [f]: null })) }
  const usadas = new Set([huecos.past, huecos.pp])
  return (
    <>
      <Cabeza v={v} l={l} />
      <div className="flex justify-center gap-3 mb-4">
        {['past', 'pp'].map(f => {
          const txt = huecos[f] === null ? null : r.fichas[huecos[f]]
          const ok = revelado && txt === v[f]
          return (
            <div key={f} className="text-center">
              <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">{tx(FORMA[f], l)}</p>
              <button type="button" onClick={() => quita(f)} className={`${HUECO} ${revelado ? (ok ? 'border-green-400 text-green-300' : 'border-red-400 text-red-300') : txt ? 'border-sky-400 text-white bg-sky-500/15' : 'border-dashed border-white/25 text-white/25'}`}>
                {txt ?? '…'}
              </button>
              {revelado && !ok && <p className="text-green-300 text-sm font-black mt-1">{v[f]}</p>}
            </div>
          )
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {r.fichas.map((f, k) => (
          <button key={k} type="button" disabled={revelado || usadas.has(k)} onClick={() => pon(k)} className={FICHA}>{f}</button>
        ))}
      </div>
      {!revelado && <p className="text-center text-xs text-white/40 mt-3">{tr({ es: 'Toca una ficha para rellenar el hueco; toca el hueco para vaciarlo', en: 'Tap a tile to fill the gap; tap the gap to empty it', ca: 'Toca una fitxa per omplir el buit; toca el buit per buidar-lo' })}</p>}
    </>
  )
}

function Patrones({ r, revelado, onResponder, l, tr }) {
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(r.verbos[0])
  const coloca = p => {
    if (revelado || !activo) return
    const n = { ...puestas, [activo]: p }
    setPuestas(n)
    const sig = r.verbos.find(i => !n[i])
    setActivo(sig ?? null)
    if (!sig) onResponder(`patrones:${r.verbos.filter(i => n[i] !== patron(verbo(i))).length}`)
  }
  const etiqueta = id => (r.formas ? tresFormas(verbo(id)) : verbo(id).inf)
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-3 min-h-[2.75rem]">
        {r.verbos.filter(i => !puestas[i]).map(i => (
          <button key={i} type="button" onClick={() => setActivo(i)} className={`rounded-xl px-3 py-2 font-black text-white ${activo === i ? 'bg-sky-500 ring-2 ring-amber-300' : 'bg-white/10'}`}>{etiqueta(i)}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(PATRONES).map(([p, d]) => (
          <button key={p} type="button" disabled={revelado || !activo} onClick={() => coloca(p)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[5rem] text-left">
            <span className="block text-amber-300 text-sm font-black tracking-wider">{d.letras}</span>
            <span className="block text-white text-[12px] font-bold leading-tight">{tx(d.nombre, l)}</span>
            <span className="block text-white/35 text-[11px]">{ejemploPatron(p, r.verbos)}</span>
            <span className="flex flex-wrap gap-1 mt-1">
              {r.verbos.filter(i => puestas[i] === p).map(i => (
                <span key={i} className={`rounded-md px-1.5 py-0.5 text-[12px] font-black text-white bg-white/10 ${revelado ? (patron(verbo(i)) === p ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>{revelado ? tresFormas(verbo(i)) : verbo(i).inf}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
      {!revelado && <p className="text-center text-xs text-white/40 mt-3">{tr({ es: 'Toca un verbo y luego la caja de su patrón', en: 'Tap a verb and then the box for its pattern', ca: 'Toca un verb i després la caixa del seu patró' })}</p>}
    </>
  )
}

function Teclea({ r, revelado, onResponder, l, tr }) {
  const v = verbo(r.verbos[0])
  const [escrito, setEscrito] = useState({ past: '', pp: '' })
  const listo = r.huecos.every(f => escrito[f].trim())
  const envia = e => {
    e.preventDefault()
    if (revelado || !listo) return
    onResponder(r.huecos.every(f => vale(v, f, escrito[f])) ? 'teclea:ok' : 'teclea:mal')
  }
  return (
    <form onSubmit={envia}>
      <Cabeza v={v} l={l} />
      <div className="flex justify-center gap-3 mb-4">
        {['past', 'pp'].map((f, k) => {
          const hueco = r.huecos.includes(f)
          const ok = revelado && hueco && vale(v, f, escrito[f])
          return (
            <div key={f} className="text-center">
              <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">{tx(FORMA[f], l)}</p>
              {hueco ? (
                <input value={escrito[f]} onChange={e => setEscrito(x => ({ ...x, [f]: e.target.value }))} disabled={revelado}
                  autoFocus={k === 0 || !r.huecos.includes('past')} autoCapitalize="none" autoCorrect="off" autoComplete="off" spellCheck={false}
                  className={`${HUECO} w-[8rem] bg-white/5 outline-none ${revelado ? (ok ? 'border-green-400 text-green-300' : 'border-red-400 text-red-300') : 'border-sky-400/60 text-white focus:border-amber-300'}`} />
              ) : (
                <p className={`${HUECO} border-transparent text-white/80`}>{v[f]}</p>
              )}
              {revelado && hueco && !ok && <p className="text-green-300 text-sm font-black mt-1">{v[f]}</p>}
            </div>
          )
        })}
      </div>
      {!revelado && (
        <button type="submit" disabled={!listo} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
          {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
        </button>
      )}
    </form>
  )
}

function Frase({ r, revelado, onResponder, tr }) {
  const v = verbo(r.verbos[0])
  const [activa, setActiva] = useState(null) // índice de ficha
  const [puestas, setPuestas] = useState({}) // hueco → índice de ficha
  const pon = h => {
    if (revelado) return
    if (activa === null) {
      if (puestas[h] !== undefined) setPuestas(p => Object.fromEntries(Object.entries(p).filter(([k]) => Number(k) !== h)))
      return
    }
    const n = { ...puestas, [h]: activa }
    setPuestas(n); setActiva(null)
    if (Object.keys(n).length === r.frases.length) {
      onResponder(`frase:${r.frases.filter((f, k) => r.fichas[n[k]] !== v[f.forma]).length}`)
    }
  }
  const usadas = new Set(Object.values(puestas))
  return (
    <>
      <div className="space-y-2 mb-4">
        {r.frases.map((f, k) => {
          const [antes, despues] = f.texto.split('___')
          const txt = puestas[k] === undefined ? null : r.fichas[puestas[k]]
          const ok = revelado && txt === v[f.forma]
          return (
            <p key={k} className="rounded-xl bg-white/[0.06] border border-white/10 px-3 py-3 text-white text-[17px] leading-relaxed text-center">
              {antes}
              <button type="button" onClick={() => pon(k)} className={`mx-1 inline-block min-w-[5.5rem] rounded-lg border-2 px-2 py-0.5 font-black align-middle ${revelado ? (ok ? 'border-green-400 text-green-300' : 'border-red-400 text-red-300') : txt ? 'border-sky-400 bg-sky-500/15' : activa !== null ? 'border-dashed border-amber-300 text-amber-300/60' : 'border-dashed border-white/25 text-white/25'}`}>
                {txt ?? '…'}
              </button>
              {despues}
              {revelado && !ok && <span className="block text-green-300 text-sm font-black">{v[f.forma]}</span>}
            </p>
          )
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {r.fichas.map((f, k) => (
          <button key={k} type="button" disabled={revelado || usadas.has(k)} onClick={() => setActiva(a => (a === k ? null : k))} className={`${FICHA} ${activa === k ? 'ring-2 ring-amber-300 bg-sky-400' : ''}`}>{f}</button>
        ))}
      </div>
      {!revelado && <p className="text-center text-xs text-white/40 mt-3">{tr({ es: 'Toca una forma y luego el hueco de su frase', en: 'Tap a form and then the gap in its sentence', ca: 'Toca una forma i després el buit de la seva frase' })}</p>}
    </>
  )
}

export default function PreguntaVerbos({ ronda, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, onResponder, tr, l }
  const Cuerpo = { forja: Forja, patrones: Patrones, teclea: Teclea, frase: Frase }[ronda.tipo]
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      <Cuerpo {...props} />
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
