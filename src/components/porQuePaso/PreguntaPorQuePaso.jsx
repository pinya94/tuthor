// Una ronda de ¿Por Qué Pasó? (ver lib/porQuePaso): el hecho y 1-3 piezas;
// cada una se responde con un toque (Causa / Consecuencia / No tiene que ver).
// Al responder la última, se corrige sola: nada de botón de comprobar.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { hecho, esCorrecta, explicacion } from '../../lib/porQuePaso'

const OPCIONES = [
  { k: 'c', color: '#fbbf24', emoji: '⬅', t: { es: 'Causa', en: 'Cause', ca: 'Causa' } },
  { k: 'q', color: '#38bdf8', emoji: '➡', t: { es: 'Consecuencia', en: 'Consequence', ca: 'Conseqüència' } },
  { k: 'x', color: '#94a3b8', emoji: '🚫', t: { es: 'No tiene que ver', en: 'Not related', ca: 'No hi té a veure' } },
]

export default function PreguntaPorQuePaso({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [resp, setResp] = useState({})
  const h = hecho(r.hecho)
  const acierto = revelado && esCorrecta(r, resp)

  function elige(p, k) {
    if (revelado) return
    const nueva = { ...resp, [p.id]: k }
    setResp(nueva)
    if (r.piezas.every(x => nueva[x.id])) onResponder(nueva)
  }

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-amber-300/40 bg-amber-300/10 px-4 py-4 mb-3 text-center">
        <p className="text-4xl mb-1">{h.emoji}</p>
        <p className="text-white font-black text-lg leading-snug">{h.titulo[l]}</p>
      </div>

      <div className="space-y-3">
        {r.piezas.map(p => {
          const elegida = resp[p.id]
          const bien = OPCIONES.find(o => o.k === p.tipo)
          return (
            <div key={p.id} className={`rounded-xl border px-3 py-3 ${revelado ? (elegida === p.tipo ? 'border-green-500/60 bg-green-500/10' : 'border-red-500/60 bg-red-500/10') : 'border-white/15 bg-white/[0.04]'}`}>
              <p className="text-white font-bold text-center leading-snug mb-2.5">{p.texto[l]}</p>
              {!revelado ? (
                <div className="grid grid-cols-3 gap-1.5">
                  {OPCIONES.map(o => (
                    <button key={o.k} type="button" onClick={() => elige(p, o.k)}
                      className="rounded-xl py-2.5 px-1 text-xs sm:text-sm font-black border leading-tight transition-colors"
                      style={elegida === o.k ? { background: o.color, borderColor: o.color, color: '#000' } : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}>
                      {o.emoji}<br />{tr(o.t)}
                    </button>
                  ))}
                </div>
              ) : (
                <p className={`text-sm font-black text-center ${elegida === p.tipo ? 'text-green-300' : 'text-red-300'}`}>
                  {elegida === p.tipo ? '✓ ' : `✗ ${tr({ es: 'Era', en: 'It was', ca: 'Era' })}: `}{bien.emoji} {tr(bien.t)}
                  {p.tipo === 'x' && <span className="font-semibold text-white/60"> · {tr({ es: 'es de', en: 'it belongs to', ca: 'és de' })}: {hecho(p.de).titulo[l]}</span>}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {revelado && (
        <div className={`mt-3 rounded-xl px-3 py-2 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ ¡Bien!', en: '✓ Well done!', ca: '✓ Molt bé!' }) : tr({ es: '✗ No era así', en: '✗ Not quite', ca: '✗ No era així' })}
          </p>
          {!acierto && <p className="mt-0.5 text-white/70 text-xs text-center">💡 {explicacion(r, l)}</p>}
        </div>
      )}
    </div>
  )
}
