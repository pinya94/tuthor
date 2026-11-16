// Una ronda de El Mensajero (ver lib/elMensajero): la frase en estilo directo
// arriba y, debajo, la indirecta con huecos. Tocar una ficha la pone en el
// primer hueco libre; tocar un hueco lleno lo vacía.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { esCorrecta, explicacion, fraseCorrecta } from '../../lib/elMensajero'

export default function PreguntaMensajero({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const nHuecos = r.partes.filter(p => typeof p !== 'string').length
  const [puestas, setPuestas] = useState(() => Array(nHuecos).fill(null)) // id de ficha por hueco

  const usadas = new Set(puestas.filter(x => x !== null))
  const texto = id => r.fichas.find(f => f.id === id)?.texto
  const elegidas = puestas.map(texto)
  const completa = puestas.every(x => x !== null)
  const acierto = revelado && esCorrecta(r, elegidas)
  const siguiente = puestas.indexOf(null)

  function poner(id) {
    if (revelado || siguiente < 0) return
    setPuestas(p => p.map((x, i) => (i === siguiente ? id : x)))
  }
  function quitar(i) {
    if (revelado) return
    setPuestas(p => p.map((x, j) => (j === i ? null : x)))
  }

  let k = -1
  return (
    <div className="w-full">
      <div className="rounded-xl px-3 py-3 border border-white/15 bg-white/5 mb-3">
        <p className="text-[11px] uppercase tracking-widest text-white/40 font-bold mb-1">{tr({ es: 'Estilo directo', en: 'Direct speech', ca: 'Estil directe' })}</p>
        <p lang="en" className="text-lg sm:text-xl font-bold text-sky-200 leading-snug">{r.directa}</p>
      </div>

      <p className="text-[11px] uppercase tracking-widest text-white/40 font-bold mb-1 px-1">Reported speech</p>
      <div lang="en" className={`rounded-xl px-3 py-3 border mb-3 text-lg leading-[2.6rem] ${revelado ? (acierto ? 'border-green-500/60 bg-green-500/10' : 'border-red-500/60 bg-red-500/10') : 'border-white/15 bg-[#0d1117]'}`}>
        {r.partes.map((p, idx) => {
          if (typeof p === 'string') {
            // «(that)» es opcional: más tenue
            return p.split(/(\(that\))/).map((t, j) => (t === '(that)'
              ? <span key={`${idx}-${j}`} className="text-white/40">{t}</span>
              : <span key={`${idx}-${j}`} className="text-white">{t}</span>))
          }
          k++
          const i = k
          const lleno = puestas[i] !== null
          const bien = revelado && p.ok.includes(elegidas[i])
          const cls = revelado
            ? (bien ? 'bg-green-500/25 border-green-400 text-green-100' : 'bg-red-500/25 border-red-400 text-red-100 line-through')
            : lleno ? 'bg-[#EDAE49]/20 border-[#EDAE49]/70 text-white' : `border-dashed ${i === siguiente ? 'border-amber-300 bg-amber-300/10' : 'border-white/30'} text-transparent`
          return (
            <button key={idx} type="button" onClick={() => quitar(i)} disabled={revelado || !lleno}
              className={`inline-block align-middle mx-0.5 min-w-[3.2rem] px-2 py-0.5 rounded-lg border-2 font-bold leading-normal ${cls}`}>
              {lleno ? elegidas[i] : '___'}
            </button>
          )
        })}
      </div>

      {!revelado && (
        <>
          <p className="text-center text-white/40 text-xs mb-2">{tr({ es: 'Toca las fichas para llenar los huecos en orden (toca un hueco para vaciarlo)', en: 'Tap the tiles to fill the gaps in order (tap a gap to empty it)', ca: 'Toca les fitxes per omplir els buits en ordre (toca un buit per buidar-lo)' })}</p>
          <div lang="en" className="flex flex-wrap gap-2 justify-center mb-3">
            {r.fichas.map(f => (usadas.has(f.id)
              ? <span key={f.id} className="px-3 py-2 rounded-lg border border-dashed border-white/10 text-transparent select-none">{f.texto}</span>
              : <button key={f.id} type="button" onClick={() => poner(f.id)}
                  className="px-3 py-2 rounded-lg border bg-white/5 border-white/15 text-white/90 text-base font-semibold hover:bg-white/10 hover:border-white/30">{f.texto}</button>))}
          </div>
          <button type="button" disabled={!completa} onClick={() => onResponder(elegidas)}
            className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
        </>
      )}

      {revelado && (
        <div className={`rounded-xl px-3 py-2.5 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' }) : tr({ es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' })}
          </p>
          {!acierto && <p lang="en" className="mt-1 text-center text-green-300 font-bold">{fraseCorrecta(r)}</p>}
          <p className="mt-1 text-white/75 text-sm">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
