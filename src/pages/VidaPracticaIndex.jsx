// ── Estudiar > Vida Práctica ─────────────────────────────────────────────────
// Tres bloques: Primeros Auxilios, Seguridad Vial e Internet Seguro.
//
// Primeros Auxilios es el único con escenarios: cada tarjeta lleva a la
// práctica en profundidad de esa situación (ordenar pasos + decisiones
// críticas) en src/pages/PrimerosAuxiliosEscenario.jsx. Los otros dos son
// examen tipo test y punto, así que sus tarjetas van directas al examen en
// vez de a /estudiar/vida-practica/<tema>, que espera un escenario.
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import { SCENARIOS } from '../data/primerosAuxiliosEscenarios'

// Seguridad Vial e Internet Seguro no tienen escenarios: van directas a su
// examen. Primeros Auxilios sí los tiene, y su lista completa va más abajo.
const BLOQUES = [
  {
    id: 'seguridad-vial', emoji: '🚸', path: '/examen/seguridad-vial',
    titulo: { es: 'Seguridad Vial', en: 'Road Safety', ca: 'Seguretat Viària' },
    sub: { es: 'Peatón, bici y patinete', en: 'On foot, bike and scooter', ca: 'Vianant, bici i patinet' },
  },
  {
    id: 'internet-seguro', emoji: '🔐', path: '/examen/internet-seguro',
    titulo: { es: 'Internet Seguro', en: 'Online Safety', ca: 'Internet Segur' },
    sub: { es: 'Privacidad, estafas y convivencia', en: 'Privacy, scams and behaviour', ca: 'Privacitat, estafes i convivència' },
  },
]

export default function VidaPracticaIndex() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <SEOHead
        title={tr({ es: 'Vida Práctica', en: 'Life Skills', ca: 'Vida Pràctica' })}
        description={tr({
          es: 'Primeros auxilios, seguridad vial e internet seguro. Practica situaciones reales: ordena los pasos, toma las decisiones correctas y comprueba lo que sabes.',
          en: 'First aid, road safety and online safety. Practise real situations: order the steps, make the right calls and check what you know.',
          ca: 'Primers auxilis, seguretat viària i internet segur. Practica situacions reals: ordena els passos, pren les decisions correctes i comprova el que saps.',
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
            {tr({ es: 'Lo que hay que saber fuera de clase', en: 'What you need to know outside class', ca: 'El que cal saber fora de classe' })}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {BLOQUES.map(b => (
            <button key={b.id} onClick={() => navigate(localPath(b.path))}
              className="text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 p-4 transition-all">
              <span className="text-2xl block mb-1">{b.emoji}</span>
              <p className="text-white text-sm font-bold">{tr(b.titulo)}</p>
              <p className="text-white/40 text-xs mt-0.5">{tr(b.sub)}</p>
            </button>
          ))}
        </div>

        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">
          {tr({ es: 'Primeros auxilios · escenarios', en: 'First aid · scenarios', ca: 'Primers auxilis · escenaris' })}
        </p>
        <p className="text-white/25 text-[11.5px] mb-3">
          {tr({
            es: 'Ordena los pasos y decide sobre la marcha, como pasaría de verdad.',
            en: 'Order the steps and decide as you go, the way it would really happen.',
            ca: 'Ordena els passos i decideix sobre la marxa, com passaria de debò.',
          })}
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
