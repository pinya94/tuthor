import { Navigate, useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import ContenidoTema, { contenidoMeta } from '../components/ContenidoTema'

// Página de estudio de un tema de gramática inglesa
// (/estudiar/idiomas/ingles/grammar/<slug>): reglas, tablas y ejercicios
// resueltos (temaIngles.js) y, debajo, sus exámenes y su juego.
const TEST = { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }
const TEST_D = { es: '10 preguntas de opción múltiple con la explicación de cada respuesta.', en: '10 multiple-choice questions with an explanation for every answer.', ca: '10 preguntes d’opció múltiple amb l’explicació de cada resposta.' }
const PIEZA = { es: 'Completa la frase (con el juego)', en: 'Complete the sentence (with the game)', ca: 'Completa la frase (amb el joc)' }
const PIEZA_D = { es: 'Con la mecánica de La Pieza que Falta: coloca la forma correcta en el hueco.', en: 'Using the Missing Piece mechanic: put the right form in the gap.', ca: 'Amb la mecànica de La Peça que Falta: col·loca la forma correcta al buit.' }
const VERBOS = { es: 'Verbos Irregulares (juego)', en: 'Irregular Verbs (game)', ca: 'Verbs Irregulars (joc)' }
const VERBOS_D = { es: 'Rellena pasados y participios, clasifícalos por grupos y úsalos en frases.', en: 'Fill in pasts and participles, sort them into groups and use them in sentences.', ca: 'Omple passats i participis, classifica’ls per grups i fes-los servir en frases.' }

const examen = id => ({ key: id, to: `/examen/${id}`, emoji: '📝', titulo: TEST, desc: TEST_D })
const piezas = id => ({ key: id, to: `/examen/${id}`, emoji: '🧩', titulo: PIEZA, desc: PIEZA_D })
const juegoVerbos = { key: 'verbos', to: '/juegos/verbos-irregulares', emoji: '🔤', titulo: VERBOS, desc: VERBOS_D }

const TEMAS = {
  'present-simple': { titulo: 'Present Simple', emoji: '✅', gradient: 'from-green-500 to-emerald-600', modos: [examen('ingles-grammar-present-simple-test'), piezas('ingles-piezas-present-simple-test')] },
  'past-simple': { titulo: 'Past Simple', emoji: '⏪', gradient: 'from-orange-500 to-amber-600', modos: [examen('ingles-grammar-past-simple-test'), piezas('ingles-piezas-past-simple-test'), juegoVerbos] },
  'present-perfect': { titulo: 'Present Perfect', emoji: '🔗', gradient: 'from-purple-500 to-violet-600', modos: [examen('ingles-grammar-present-perfect-test'), piezas('ingles-piezas-present-perfect-test')] },
  modals: { titulo: 'Modal Verbs', emoji: '🔑', gradient: 'from-amber-500 to-yellow-600', modos: [examen('ingles-grammar-modals-test'), piezas('ingles-piezas-modals-test')] },
  conditionals: { titulo: 'Conditionals', emoji: '🔀', gradient: 'from-indigo-500 to-violet-600', modos: [examen('ingles-grammar-conditionals-test'), piezas('ingles-piezas-conditionals-test')] },
  passive: { titulo: 'Passive Voice', emoji: '🔄', gradient: 'from-red-500 to-rose-600', modos: [examen('ingles-grammar-passive-test'), piezas('ingles-piezas-passive-test')] },
  adjectives: { titulo: 'Comparatives & Superlatives', emoji: '🎨', gradient: 'from-pink-500 to-rose-600', modos: [examen('ingles-grammar-adjectives-test')] },
  'irregular-verbs': { titulo: 'Irregular Verbs', emoji: '🔤', gradient: 'from-orange-500 to-red-600', modos: [juegoVerbos, { ...examen('verbos-irregulares-test'), emoji: '📝', titulo: { es: 'Examen de verbos irregulares', en: 'Irregular verbs exam', ca: 'Examen de verbs irregulars' }, desc: { es: 'Con la mecánica del juego, sin cronómetro.', en: 'Using the game mechanic, with no timer.', ca: 'Amb la mecànica del joc, sense cronòmetre.' } }] },
}


export default function InglesGrammarTema() {
  const { lang, tr, localPath } = useLang()
  const { tema: slug } = useParams()
  const base = '/estudiar/idiomas/ingles/grammar'
  const tema = TEMAS[slug]
  if (!tema) return <Navigate to={localPath(base)} replace />
  const meta = contenidoMeta(slug, lang)

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <PageMeta title={meta?.title} description={meta?.desc} path={`${base}/${slug}`} lang={lang} />
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <Link to={localPath('/estudiar')} className="hover:text-white/60 transition-colors">{tr({ es: 'Estudiar', en: 'Study', ca: 'Estudiar' })}</Link>
          {' / '}
          <Link to={localPath(base)} className="hover:text-white/60 transition-colors">English Grammar</Link>
          {' / '}
          <span className="text-white/50">{tema.titulo}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{tema.emoji}</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{meta?.title ?? tema.titulo}</h1>
        </div>
      </div>

      <ContenidoTema tema={slug} lang={lang} />

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">{tr({ es: 'Practica', en: 'Practise', ca: 'Practica' })}</p>
        {tema.modos.map(m => (
          <Link key={m.key} to={localPath(m.to)} state={{ backPath: `${base}/${slug}` }}
            className="block w-full group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40">
            <div className={`bg-gradient-to-br ${tema.gradient} p-5 flex items-center gap-4`}>
              <span className="text-3xl">{m.emoji}</span>
              <div className="flex-1">
                <h2 className="font-black text-white text-lg">{tr(m.titulo)}</h2>
                <p className="text-white/75 text-sm leading-relaxed">{tr(m.desc)}</p>
              </div>
              <span className="w-10 h-10 shrink-0 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-white font-black text-lg">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
