// Una ronda de ¿Qué Letra Va?, sin opciones: cuatro palabras con su hueco;
// cada toque en el hueco cambia entre las dos letras posibles (la buena y la
// de su mala escrita a mano). Al corregir, cada hueco en verde o rojo y la
// regla de cada palabra. Las palabras van siempre en castellano; solo la
// interfaz y la regla se traducen. La usan el juego (contra reloj) y el
// examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, letrasDe, PALABRAS, GRUPOS } from '../../lib/queLetra'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'

export default function PreguntaLetra({ ronda, revelado, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const [puestas, setPuestas] = useState({}) // palabra → letra puesta
  const opciones = w => { const x = letrasDe(w); return r.orden[w] ? [x.mala, x.letra] : [x.letra, x.mala] }
  const toca = w => setPuestas(p => {
    const [a, b] = opciones(w)
    return { ...p, [w]: p[w] == null ? a : p[w] === a ? b : a }
  })
  const listo = r.items.every(w => puestas[w] != null)
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className="grid grid-cols-1 gap-2 mb-3">
        {r.items.map(w => {
          const x = letrasDe(w)
          const puesta = puestas[w]
          const bien = puesta === x.letra
          const color = revelado ? (bien ? 'border-green-400 text-green-300 bg-green-500/10' : 'border-red-400 text-red-300 bg-red-500/10') : puesta == null ? 'border-dashed border-amber-300 text-amber-300' : 'border-amber-300 text-white bg-amber-300/15'
          return (
            <div key={w} className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-3 flex items-center justify-between gap-2">
              <p lang="es" className="text-white font-black text-3xl tracking-wide leading-none">
                {x.antes}
                <button type="button" disabled={revelado} onClick={() => toca(w)}
                  className={`inline-flex items-center justify-center min-w-[1.3em] h-[1.25em] mx-0.5 px-1 align-baseline rounded-lg border-2 ${color}`}>
                  {puesta == null ? '?' : puesta || '–'}
                </button>
                {x.despues}
              </p>
              <span className="text-right shrink-0">
                <span className="block text-white/35 text-[10px] font-bold uppercase tracking-widest">{GRUPOS[PALABRAS.find(p => p.ok === w).g]}</span>
                {revelado && !bien && <span lang="es" className="block text-green-300 font-black">{w}</span>}
              </span>
            </div>
          )
        })}
      </div>
      {!revelado && (
        <>
          <p className="text-white/40 text-xs text-center mb-2">{tr({ es: 'Toca un hueco para cambiar la letra · «–» es sin letra', en: 'Tap a gap to change the letter · “–” means no letter', ca: 'Toca un buit per canviar la lletra · «–» és sense lletra' })}</p>
          <button className={boton} disabled={!listo} onClick={() => onResponder(`rellena:${r.items.filter(w => puestas[w] !== letrasDe(w).letra).length}`)}>
            {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
        </>
      )}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
