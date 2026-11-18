// Una ronda de El Gancho (ver lib/elGancho): la frase con su hueco y 3-4
// botones. Un toque responde; al corregir, el hueco se llena con la buena.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { esCorrecta, explicacion } from '../../lib/elGancho'

export default function PreguntaGancho({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [resp, setResp] = useState(null)
  const acierto = revelado && esCorrecta(r, resp)
  const [antes, despues] = r.frase.split('___')

  function elige(o) {
    if (revelado || resp) return
    setResp(o)
    onResponder(o)
  }

  const hueco = !revelado
    ? <span className="inline-block min-w-[4.5rem] border-b-2 border-dashed border-amber-300 mx-1">&nbsp;</span>
    : <span className="mx-1 px-1.5 rounded-md bg-green-500/25 text-green-300">{r.ok}</span>

  return (
    <div className="w-full">
      <p className="text-white/40 text-[11px] uppercase tracking-widest text-center mb-1.5">
        {r.tema === 'question-tags'
          ? tr({ es: '❓ Pon la coletilla', en: '❓ Add the question tag', ca: '❓ Posa la coletilla' })
          : tr({ es: '🔗 Elige el relativo', en: '🔗 Choose the relative pronoun', ca: '🔗 Tria el relatiu' })}
      </p>
      <div className="rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-6 mb-4 text-center">
        <p className="text-white font-bold text-xl sm:text-2xl leading-snug" lang="en">{antes}{hueco}{despues}</p>
      </div>

      <div className={`grid gap-2 ${r.opciones.length === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {r.opciones.map(o => {
          let estilo = 'bg-white/[0.06] border-white/15 text-white hover:bg-white/[0.12]'
          if (revelado && o === r.ok) estilo = 'bg-green-500/25 border-green-400 text-green-200'
          else if (revelado && o === resp) estilo = 'bg-red-500/25 border-red-400 text-red-200'
          else if (revelado) estilo = 'bg-white/[0.03] border-white/10 text-white/35'
          return (
            <button key={o} type="button" onClick={() => elige(o)} lang="en"
              className={`rounded-xl py-4 px-1 font-black text-base sm:text-lg border transition-colors ${estilo}`}>
              {o}
            </button>
          )
        })}
      </div>

      {revelado && !acierto && (
        <div className="mt-3 rounded-xl px-3 py-2 border bg-red-500/10 border-red-500/30">
          <p className="text-white/80 text-sm text-center">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
