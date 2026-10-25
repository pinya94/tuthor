// Una ronda de Mide el verso, sin opciones: se teclean las sílabas, se toca
// la sílaba tónica de la última palabra, se llevan versos o parejas de rimas
// a su caja o se pone a cada verso su letra de rima (el esquema de la
// estrofa). Los versos son material en castellano y no se traducen.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, esCorrecta, respuestaBuena, cajaDe, textoItem, nombreCaja, normaliza } from '../../lib/mideVerso'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const comprobar = { es: 'Comprobar', en: 'Check', ca: 'Comprovar' }

// El fragmento del poema; `letra(i)` pinta junto a cada verso su hueco de rima.
function Poema({ r, letra }) {
  const f = r.fragmento
  return (
    <figure className="rounded-2xl bg-[#fdf6e3] text-stone-800 px-4 py-3 mb-3 shadow-inner" lang="es">
      {f.versos.map((v, i) => {
        const marcado = r.marcados.includes(i) && r.marcados.length < 4
        return (
          <div key={i} className="flex items-center gap-2">
            <p className={`flex-1 font-serif text-[15px] leading-relaxed rounded px-1 -mx-1 ${marcado ? 'bg-amber-300/60 font-semibold' : ''}`}>{v.replace(/\s*\|\s*/g, '  ')}</p>
            {letra && letra(i)}
          </div>
        )
      })}
      <figcaption className="text-right text-xs text-stone-500 mt-1.5 italic">{f.autor} · {f.obra}</figcaption>
    </figure>
  )
}

function Teclea({ r, revelado, elegida, onResponder, tr }) {
  const [v, setV] = useState('')
  const ok = revelado && esCorrecta(r, elegida)
  return (
    <>
      <Poema r={r} />
      <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
        <span className="text-amber-300 font-black text-2xl tabular-nums">{(revelado ? String(elegida ?? '') : v) || '?'} {tr({ es: 'sílabas', en: 'syllables', ca: 'síl·labes' })}</span>
        {revelado && <span className={`ml-2 font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${r.bueno}`}</span>}
      </div>
      {!revelado && (
        <>
          <div className="grid grid-cols-5 gap-1.5 mb-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(t => <button key={t} className={tecla} onClick={() => setV(x => (x.length < 2 ? x + t : x))}>{t}</button>)}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-3 rounded-2xl bg-white/10 text-white font-bold disabled:opacity-30" disabled={!v} onClick={() => setV('')}>⌫</button>
            <button className={boton} disabled={!v} onClick={() => onResponder(v)}>{tr(comprobar)}</button>
          </div>
        </>
      )}
    </>
  )
}

function Tonica({ r, revelado, elegida, onResponder }) {
  const elegidaN = elegida == null ? null : Number(elegida)
  return (
    <>
      <Poema r={r} />
      <div className="flex flex-wrap justify-center gap-1.5 mb-1" lang="es">
        {r.silabasUltima.map((s, k) => {
          const color = revelado ? (k === r.tonica ? 'border-green-400 bg-green-500/20 text-white' : k === elegidaN ? 'border-red-400 bg-red-500/20 text-white' : 'border-white/10 text-white/50') : 'border-white/20 bg-white/[0.06] text-white hover:bg-white/[0.12]'
          return <button key={k} disabled={revelado} onClick={() => onResponder(String(k))} className={`min-w-[3.2rem] rounded-xl border-2 px-3 py-3 text-2xl font-black ${color}`}>{s}</button>
        })}
      </div>
    </>
  )
}

function Clasifica({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.items.findIndex(it => puestas[it] == null)
  const pon = c => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [r.items[activa]]: c }
    setPuestas(n)
    if (r.items.every(it => n[it] != null)) onResponder(`clasifica:${r.items.filter(it => n[it] !== cajaDe(r, it)).length}`)
  }
  return (
    <>
      {activa >= 0 && !revelado && (
        <div className="rounded-2xl bg-[#fdf6e3] text-stone-800 px-4 py-3 mb-3 text-center shadow-inner" lang="es">
          <p className="text-stone-500 text-xs">{activa + 1} / {r.items.length}</p>
          <p className="font-serif text-lg font-semibold leading-snug">{textoItem(r, r.items[activa])}</p>
        </div>
      )}
      <div className={`grid gap-2 ${r.cajas.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || activa < 0} onClick={() => pon(c)} className="rounded-xl border-2 border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.08] p-2 min-h-[5rem] text-left">
            <span className="block text-white font-black text-[12px] leading-tight">{nombreCaja(r, c, l)}</span>
            {r.items.filter(it => puestas[it] === c).map(it => (
              <span key={it} lang="es" className={`block mt-1 rounded-md px-1.5 py-1 text-[11px] font-bold text-white leading-tight ${revelado ? (cajaDe(r, it) === c ? 'bg-green-500/25 ring-1 ring-green-400' : 'bg-red-500/25 ring-1 ring-red-400') : 'bg-white/10'}`}>
                {textoItem(r, it)}
              </span>
            ))}
          </button>
        ))}
      </div>
    </>
  )
}

// Esquema de rima: cada toque en el hueco de un verso pasa por a, b y –.
function Esquema({ r, revelado, elegida, onResponder, tr }) {
  const CICLO = ['a', 'b', '-']
  const [letras, setLetras] = useState([null, null, null, null])
  const toca = i => setLetras(ls => ls.map((x, k) => (k === i ? CICLO[(CICLO.indexOf(x) + 1) % 3] : x)))
  const mostradas = revelado ? String(elegida ?? '----').split('') : letras
  const bueno = respuestaBuena(r)
  const ok = revelado && esCorrecta(r, elegida)
  const normal = revelado ? normaliza(mostradas.join('')) : null
  const letra = i => (
    <button type="button" disabled={revelado} onClick={() => toca(i)}
      className={`shrink-0 w-9 h-8 rounded-lg border-2 font-black text-lg ${revelado ? (normal[i] === bueno[i] ? 'border-green-600 bg-green-100 text-green-800' : 'border-red-500 bg-red-100 text-red-700') : mostradas[i] == null ? 'border-dashed border-amber-600 text-amber-700' : 'border-stone-500 bg-white text-stone-800'}`}>
      {mostradas[i] == null ? '?' : mostradas[i] === '-' ? '–' : mostradas[i]}
    </button>
  )
  return (
    <>
      <Poema r={r} letra={letra} />
      {revelado
        ? !ok && <p className="text-center text-green-300 font-black">{bueno.replace(/-/g, '–')}</p>
        : <button className={boton} disabled={letras.some(x => x == null)} onClick={() => onResponder(letras.join(''))}>{tr(comprobar)}</button>}
    </>
  )
}

export default function PreguntaVerso({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, l, tr }
  const cuerpo = ronda.mecanica === 'tonica' ? <Tonica {...props} />
    : ronda.mecanica === 'clasifica' ? <Clasifica {...props} />
    : ronda.mecanica === 'esquema' ? <Esquema {...props} />
    : <Teclea {...props} />
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10 break-words">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
