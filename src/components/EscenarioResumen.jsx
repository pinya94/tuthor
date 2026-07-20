import { useLang } from '../context/LangContext'

// Resumen de un escenario: separa fallos leves (pasos mal ordenados, u
// opciones incorrectas pero no peligrosas) de decisiones peligrosas
// (visualmente más graves, con la explicación siempre visible al lado).
export default function EscenarioResumen({ ordenErrores, decisionesLeves, decisionesPeligrosas, onRepetir, onVolver }) {
  const { tr } = useLang()
  const perfecto = ordenErrores.length === 0 && decisionesLeves.length === 0 && decisionesPeligrosas.length === 0

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <span className="text-6xl block mb-3">{perfecto ? '🏆' : decisionesPeligrosas.length > 0 ? '⚠️' : '📋'}</span>
        <h2 className="text-2xl font-black text-white">
          {perfecto
            ? tr({ es: '¡Reacción perfecta!', en: 'Perfect reaction!', ca: 'Reacció perfecta!' })
            : tr({ es: 'Revisa tu reacción', en: 'Review your reaction', ca: 'Revisa la teva reacció' })}
        </h2>
      </div>

      {decisionesPeligrosas.length > 0 && (
        <div className="bg-red-500/10 border-2 border-red-500/40 rounded-2xl p-5 mb-4">
          <p className="text-red-300 text-xs font-black uppercase tracking-widest mb-3">
            🔴 {tr({ es: 'Decisiones peligrosas', en: 'Dangerous decisions', ca: 'Decisions perilloses' })}
          </p>
          <div className="space-y-3">
            {decisionesPeligrosas.map((d, i) => (
              <div key={i} className="border-t border-red-500/20 pt-3 first:border-t-0 first:pt-0">
                <p className="text-white text-sm font-semibold mb-1">{tr(d.texto)}</p>
                <p className="text-red-300/90 text-xs leading-relaxed">{tr(d.explicacion)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(ordenErrores.length > 0 || decisionesLeves.length > 0) && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 mb-4">
          <p className="text-orange-300 text-xs font-black uppercase tracking-widest mb-3">
            🟠 {tr({ es: 'Fallos leves', en: 'Minor mistakes', ca: 'Errades lleus' })}
          </p>
          <div className="space-y-2">
            {ordenErrores.map((e, i) => (
              <p key={`o${i}`} className="text-white/70 text-sm">
                {tr(e.texto)} — {tr({ es: `iba en el paso ${e.posicionCorrecta}`, en: `belonged at step ${e.posicionCorrecta}`, ca: `anava al pas ${e.posicionCorrecta}` })}
              </p>
            ))}
            {decisionesLeves.map((d, i) => (
              <div key={`d${i}`}>
                <p className="text-white/70 text-sm">{tr(d.texto)}</p>
                <p className="text-white/40 text-xs mt-0.5">{tr(d.explicacion)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {perfecto && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4 text-center">
          <p className="text-white/60 text-sm">
            {tr({ es: 'Ordenaste todos los pasos y no elegiste ninguna opción peligrosa.', en: 'You ordered every step and never picked a dangerous option.', ca: 'Vas ordenar tots els passos i no vas triar cap opció perillosa.' })}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={onRepetir}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-xl transition-all"
        >
          {tr({ es: '↻ Repetir', en: '↻ Retry', ca: '↻ Repetir' })}
        </button>
        <button
          onClick={onVolver}
          className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition"
        >
          {tr({ es: '← Otros temas de Primeros Auxilios', en: '← Other First Aid topics', ca: '← Altres temes de Primers Auxilis' })}
        </button>
      </div>
    </div>
  )
}
