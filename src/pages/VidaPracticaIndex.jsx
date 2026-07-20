// ── Estudiar > Vida Práctica ─────────────────────────────────────────────────
// Por ahora, un único bloque: Primeros Auxilios, con una tarjeta por tema.
// Cada tarjeta lleva a la práctica en profundidad de ese escenario (situación
// + ordenar pasos + decisiones críticas) en src/pages/PrimerosAuxiliosEscenario.jsx.
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import { SCENARIOS } from '../data/primerosAuxiliosEscenarios'

export default function VidaPracticaIndex() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <SEOHead
        title={tr({ es: 'Vida Práctica — Primeros Auxilios', en: 'Life Skills — First Aid', ca: 'Vida Pràctica — Primers Auxilis' })}
        description={tr({
          es: 'Practica primeros auxilios tema a tema: atragantamiento, quemaduras, desmayo, cortes y picaduras. Ordena los pasos y toma las decisiones correctas.',
          en: 'Practice first aid topic by topic: choking, burns, fainting, cuts and stings. Order the steps and make the right calls.',
          ca: 'Practica primers auxilis tema a tema: ennuegament, cremades, desmai, talls i picades. Ordena els passos i pren les decisions correctes.',
        })}
        path="/estudiar/vida-practica" lang={lang} />

      <div className="max-w-md w-full">
        <button onClick={() => navigate(localPath('/estudiar'))}
          className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
          {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
        </button>

        <div className="text-center mb-7">
          <span className="text-6xl block mb-4">🚑</span>
          <h1 className="text-3xl font-black text-white mb-2">
            {tr({ es: 'Vida Práctica', en: 'Life Skills', ca: 'Vida Pràctica' })}
          </h1>
          <p className="text-white/40">
            {tr({ es: 'Primeros auxilios, tema a tema', en: 'First aid, topic by topic', ca: 'Primers auxilis, tema a tema' })}
          </p>
        </div>

        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
          {tr({ es: 'Primeros auxilios', en: 'First aid', ca: 'Primers auxilis' })}
        </p>

        <div className="space-y-3 mb-6">
          {SCENARIOS.map(esc => (
            <button
              key={esc.id}
              onClick={() => navigate(localPath(`/estudiar/vida-practica/${esc.id}`))}
              className="w-full text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 p-4 transition-all flex items-center gap-4"
            >
              <span className="text-3xl shrink-0">{esc.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold">{tr(esc.titulo)}</p>
                <p className="text-white/40 text-xs mt-0.5">{tr(esc.situacionInicial.texto)}</p>
              </div>
              <svg className="w-5 h-5 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
          {tr({ es: '¿Prefieres algo más rápido?', en: 'Prefer something faster?', ca: 'Prefereixes alguna cosa més ràpida?' })}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate(localPath('/juegos/reaccion'))}
            className="text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 p-4 transition-all">
            <span className="text-2xl block mb-1">🚨</span>
            <p className="text-white text-sm font-bold">{tr({ es: 'Juego Reacción', en: 'Reacción game', ca: 'Joc Reacció' })}</p>
            <p className="text-white/40 text-xs mt-0.5">{tr({ es: 'Arcade con reloj', en: 'Clock-based arcade', ca: 'Arcade amb rellotge' })}</p>
          </button>
          <button onClick={() => navigate(localPath('/examen/primeros-auxilios'))}
            className="text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 p-4 transition-all">
            <span className="text-2xl block mb-1">📝</span>
            <p className="text-white text-sm font-bold">{tr({ es: 'Examen tipo test', en: 'Quiz exam', ca: 'Examen tipus test' })}</p>
            <p className="text-white/40 text-xs mt-0.5">{tr({ es: 'Preguntas rápidas', en: 'Quick questions', ca: 'Preguntes ràpides' })}</p>
          </button>
        </div>
      </div>
    </div>
  )
}
