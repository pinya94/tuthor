// Ejercicio jugable DENTRO de la página de estudio de un tema de gramática:
// una frase nueva, tocas las palabras que pide («toca los pronombres»),
// compruebas y sale otra. Tras unas cuantas, invita al juego contrarreloj.
//
// Por qué (GA4, 22-oct → 18-nov 2026): las páginas de gramática traen casi
// todas las visitas de Google («pronombres», «adverbios»…) pero se leen 40 s
// y se cierran; quien llega a jugar se queda 5-10 min. Esto pone la práctica
// en la misma página, sin tener que ir a otra. Usa el mismo generador que
// Analiza la Frase (léxico con reglas, ver data/frasesLexico.js).
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { genRound, sameSet } from '../lib/analizaFrases'
import { trackEvent } from '../lib/analytics'

const INVITA_TRAS = 3

export default function PracticaFrase({ filter, label, idioma, tema }) {
  const { lang, tr, localPath } = useLang()
  const sLang = idioma || (lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es')
  const nueva = () => genRound({ lang: sLang, level: 'eso', filter })
  const [ronda, setRonda] = useState(nueva)
  const [sel, setSel] = useState([])
  const [hecho, setHecho] = useState(false)
  const [cuenta, setCuenta] = useState({ hechas: 0, bien: 0 })
  if (!ronda) return null

  const acierto = hecho && sameSet(sel, ronda.indices)
  const toca = i => {
    if (hecho) return
    setSel(s => (s.includes(i) ? s.filter(x => x !== i) : [...s, i]))
  }
  const comprobar = () => {
    const ok = sameSet(sel, ronda.indices)
    setHecho(true)
    const c = { hechas: cuenta.hechas + 1, bien: cuenta.bien + (ok ? 1 : 0) }
    setCuenta(c)
    trackEvent('practica_inline', { item_id: tema, acierto: ok ? 1 : 0, n: c.hechas })
  }
  const otra = () => { setRonda(nueva()); setSel([]); setHecho(false) }

  return (
    <section className="my-7 rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.07] p-4 sm:p-5" aria-label={tr({ es: 'Pruébalo ahora', en: 'Try it now', ca: 'Prova-ho ara' })}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <h2 className="text-white font-black text-lg">🎯 {tr({ es: 'Pruébalo ahora', en: 'Try it now', ca: 'Prova-ho ara' })}</h2>
        {cuenta.hechas > 0 && <span className="text-emerald-200 text-xs font-bold">{cuenta.bien}/{cuenta.hechas} ✓</span>}
      </div>
      <p className="text-white/70 text-sm mb-3">
        {tr({ es: 'Toca', en: 'Tap', ca: 'Toca' })} <strong className="text-emerald-200">{ronda.label[lang] ?? ronda.label.es}</strong> {tr({ es: 'de esta frase y comprueba.', en: 'in this sentence and check.', ca: 'd’aquesta frase i comprova.' })}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {ronda.tokens.map((t, i) => {
          const marcada = sel.includes(i), buena = ronda.indices.includes(i)
          const color = !hecho
            ? (marcada ? 'bg-emerald-400 text-black border-emerald-400' : 'bg-white/[0.06] text-white border-white/15 hover:bg-white/[0.12]')
            : buena ? (marcada ? 'bg-green-500/30 text-green-100 border-green-400' : 'bg-transparent text-green-200 border-dashed border-green-400')
            : marcada ? 'bg-red-500/30 text-red-100 border-red-400' : 'bg-white/[0.03] text-white/50 border-white/10'
          return (
            <button key={i} type="button" onClick={() => toca(i)}
              className={`px-2.5 py-1.5 rounded-lg border text-[15px] font-semibold transition-colors ${color}`}>{t}</button>
          )
        })}
      </div>
      {!hecho ? (
        <button type="button" onClick={comprobar} disabled={!sel.length}
          className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-500 text-black font-black disabled:opacity-40">
          {tr({ es: '✓ Comprobar', en: '✓ Check', ca: '✓ Comprova' })}
        </button>
      ) : (
        <div>
          <p className={`text-sm font-bold mb-1 ${acierto ? 'text-green-300' : 'text-red-300'}`}>
            {acierto ? tr({ es: '¡Bien!', en: 'Well done!', ca: 'Molt bé!' }) : tr({ es: 'Casi: las que faltaban van con borde verde.', en: 'Nearly: the ones you missed have a green border.', ca: 'Gairebé: les que faltaven tenen la vora verda.' })}
          </p>
          {!acierto && ronda.explica && <p className="text-white/60 text-xs mb-2">💡 {ronda.explica[lang] ?? ronda.explica.es}</p>}
          <div className="flex flex-wrap gap-2 mt-2">
            <button type="button" onClick={otra} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-bold">
              {tr({ es: 'Otra frase →', en: 'Another sentence →', ca: 'Una altra frase →' })}
            </button>
            {cuenta.hechas >= INVITA_TRAS && (
              <Link to={localPath('/juegos/analiza-frases')} state={{ filter, level: 'eso', label, idioma }}
                onClick={() => trackEvent('practica_inline_juego', { item_id: tema, n: cuenta.hechas })}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-black">
                {tr({ es: '🎮 Seguir contrarreloj', en: '🎮 Play against the clock', ca: '🎮 Seguir contrarellotge' })}
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
