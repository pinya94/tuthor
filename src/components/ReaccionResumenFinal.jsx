import { useLang } from '../context/LangContext'

// Desglose de errores de la partida, pensado como `children` de
// <GameEndScreen>: separa fallos leves de decisiones peligrosas (rojo, con
// la explicación siempre visible al lado — más énfasis que un simple fallo).
export default function ReaccionResumenFinal({ leves, peligrosas }) {
  const { tr } = useLang()
  if (leves.length === 0 && peligrosas.length === 0) return null

  return (
    <div className="mt-5 text-left">
      {peligrosas.length > 0 && (
        <div className="bg-red-500/10 border-2 border-red-500/40 rounded-2xl p-5 mb-4">
          <p className="text-red-300 text-xs font-black uppercase tracking-widest mb-3">
            🔴 {tr({ es: 'Decisiones peligrosas', en: 'Dangerous decisions', ca: 'Decisions perilloses' })}
          </p>
          <div className="space-y-3">
            {peligrosas.map((d, i) => (
              <div key={i} className="border-t border-red-500/20 pt-3 first:border-t-0 first:pt-0">
                <p className="text-white text-sm font-semibold mb-1">{tr(d.situacion)}</p>
                <p className="text-white/70 text-sm mb-1">{tr(d.texto)}</p>
                <p className="text-red-300/90 text-xs leading-relaxed">{tr(d.explicacion)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {leves.length > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5">
          <p className="text-orange-300 text-xs font-black uppercase tracking-widest mb-3">
            🟠 {tr({ es: 'Fallos leves', en: 'Minor mistakes', ca: 'Errades lleus' })}
          </p>
          <div className="space-y-2">
            {leves.map((d, i) => (
              <div key={i}>
                <p className="text-white/70 text-sm">{tr(d.situacion)}</p>
                <p className="text-white/40 text-xs mt-0.5">{tr(d.explicacion)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
