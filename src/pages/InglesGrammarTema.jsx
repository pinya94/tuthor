import { Navigate, useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import BotonPractica from '../components/BotonPractica'
import PageMeta from '../components/PageMeta'
import ContenidoTema, { contenidoMeta } from '../components/ContenidoTema'
import PracticaFrase from '../components/PracticaFrase'

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
  'present-continuous': { titulo: 'Present Continuous', emoji: '⏳', gradient: 'from-emerald-500 to-teal-600', modos: [{ key: 'que-ves', to: '/juegos/que-ves', state: { tema: 'present-continuous' }, emoji: '👀', titulo: { es: '¿Qué Ves? (juego con dibujo)', en: 'What Can You See? (picture game)', ca: 'Què Hi Veus? (joc amb dibuix)' }, desc: { es: 'Mira el dibujo y completa frases de este tema con fichas.', en: 'Look at the picture and complete sentences on this topic with tiles.', ca: 'Mira el dibuix i completa frases d’aquest tema amb fitxes.' } }, examen('ingles-grammar-present-continuous-test')] },
  'have-got': { titulo: 'Have got', emoji: '🎒', gradient: 'from-sky-500 to-blue-600', modos: [{ key: 'que-ves', to: '/juegos/que-ves', state: { tema: 'have-got' }, emoji: '👀', titulo: { es: '¿Qué Ves? (juego con dibujo)', en: 'What Can You See? (picture game)', ca: 'Què Hi Veus? (joc amb dibuix)' }, desc: { es: 'Mira el dibujo y completa frases de este tema con fichas.', en: 'Look at the picture and complete sentences on this topic with tiles.', ca: 'Mira el dibuix i completa frases d’aquest tema amb fitxes.' } }, examen('ingles-grammar-have-got-test')] },
  'there-is-there-are': { titulo: 'There is / There are', emoji: '📍', gradient: 'from-blue-500 to-cyan-600', modos: [{ key: 'que-ves', to: '/juegos/que-ves', state: { tema: 'there-is-there-are' }, emoji: '👀', titulo: { es: '¿Qué Ves? (juego con dibujo)', en: 'What Can You See? (picture game)', ca: 'Què Hi Veus? (joc amb dibuix)' }, desc: { es: 'Mira el dibujo y completa frases de este tema con fichas.', en: 'Look at the picture and complete sentences on this topic with tiles.', ca: 'Mira el dibuix i completa frases d’aquest tema amb fitxes.' } }, examen('ingles-grammar-there-is-there-are-test')] },
  possessives: { titulo: 'Possessives', emoji: '🙋', gradient: 'from-lime-500 to-green-600', modos: [{ key: 'que-ves', to: '/juegos/que-ves', state: { tema: 'possessives' }, emoji: '👀', titulo: { es: '¿Qué Ves? (juego con dibujo)', en: 'What Can You See? (picture game)', ca: 'Què Hi Veus? (joc amb dibuix)' }, desc: { es: 'Mira el dibujo y completa frases de este tema con fichas.', en: 'Look at the picture and complete sentences on this topic with tiles.', ca: 'Mira el dibuix i completa frases d’aquest tema amb fitxes.' } }, examen('ingles-grammar-possessives-test'), { ...examen('ingles-grammar-pronouns-test'), key: 'pronouns', titulo: { es: 'Examen de pronombres', en: 'Pronouns exam', ca: 'Examen de pronoms' }, desc: { es: 'Personales, objeto y posesivos mezclados.', en: 'Subject, object and possessive pronouns mixed.', ca: 'Personals, d’objecte i possessius barrejats.' } }] },
  can: { titulo: 'Can / Can’t', emoji: '💪', gradient: 'from-amber-500 to-yellow-600', modos: [{ key: 'que-ves', to: '/juegos/que-ves', state: { tema: 'can' }, emoji: '👀', titulo: { es: '¿Qué Ves? (juego con dibujo)', en: 'What Can You See? (picture game)', ca: 'Què Hi Veus? (joc amb dibuix)' }, desc: { es: 'Mira el dibujo y completa frases de este tema con fichas.', en: 'Look at the picture and complete sentences on this topic with tiles.', ca: 'Mira el dibuix i completa frases d’aquest tema amb fitxes.' } }, examen('ingles-grammar-can-test'), { ...piezas('ingles-piezas-modals-test'), titulo: { es: 'Modales: completa la frase (con el juego)', en: 'Modals: complete the sentence (with the game)', ca: 'Modals: completa la frase (amb el joc)' } }] },
  future: { titulo: 'Future: will, going to', emoji: '🔮', gradient: 'from-violet-500 to-indigo-700', modos: [{ ...examen('ingles-grammar-verbs-test'), titulo: { es: 'Examen de verbos en inglés', en: 'English verbs exam', ca: 'Examen de verbs en anglès' }, desc: { es: 'Tiempos y formas verbales, con la explicación de cada respuesta.', en: 'Tenses and verb forms, with every answer explained.', ca: 'Temps i formes verbals, amb l’explicació de cada resposta.' } }, piezas('ingles-piezas-present-simple-test')] },
  'past-continuous': { titulo: 'Past Continuous', emoji: '⏳', gradient: 'from-orange-500 to-rose-600', modos: [examen('ingles-grammar-past-simple-test'), piezas('ingles-piezas-past-simple-test')] },
  pronouns: { titulo: 'Pronouns', emoji: '🙋', gradient: 'from-lime-500 to-green-600', modos: [{ key: 'analiza-frases', to: '/juegos/analiza-frases', state: { filter: ['pronombre'], level: 'eso', idioma: 'en', label: { es: 'Pronombres en inglés', en: 'English pronouns', ca: 'Pronoms en anglès' } }, emoji: '🎮', titulo: { es: 'Analiza la Frase (juego)', en: 'Sentence Detective (game)', ca: 'Analitza la Frase (joc)' }, desc: { es: 'Contrarreloj con frases en inglés: toca los pronombres de cada una.', en: 'Against the clock with English sentences: tap the pronouns in each one.', ca: 'Contrarellotge amb frases en anglès: toca els pronoms de cadascuna.' } }, examen('ingles-grammar-pronouns-test'), { key: 'ingles-pos-pronouns-test', to: '/examen/ingles-pos-pronouns-test', emoji: '👆', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala’ls a la frase' }, desc: { es: 'Toca los pronombres de cada frase.', en: 'Tap the pronouns in each sentence.', ca: 'Toca els pronoms de cada frase.' } }] },
  'reported-speech': { titulo: 'Reported Speech', emoji: '💬', gradient: 'from-sky-500 to-indigo-700', modos: [{ key: 'el-mensajero', to: '/juegos/el-mensajero', emoji: '📨', titulo: { es: 'El Mensajero (juego)', en: 'The Messenger (game)', ca: 'El Missatger (joc)' }, desc: { es: 'Pasa frases al estilo indirecto llenando los huecos con fichas, con trampas incluidas.', en: 'Put sentences into reported speech by filling the gaps with tiles, traps included.', ca: 'Passa frases a l’estil indirecte omplint els buits amb fitxes, amb paranys inclosos.' } }, { key: 'el-mensajero-test', to: '/examen/el-mensajero-test', emoji: '📝', titulo: { es: 'Examen de reported speech', en: 'Reported speech exam', ca: 'Examen de reported speech' }, desc: { es: 'Diez frases con la mecánica del juego, sin reloj y con nota.', en: 'Ten sentences using the game mechanic, no timer and a mark.', ca: 'Deu frases amb la mecànica del joc, sense rellotge i amb nota.' } }, { ...examen('ingles-grammar-verbs-test'), titulo: { es: 'Examen de verbos en inglés', en: 'English verbs exam', ca: 'Examen de verbs en anglès' }, desc: { es: 'Tiempos y formas verbales, con la explicación de cada respuesta.', en: 'Tenses and verb forms, with every answer explained.', ca: 'Temps i formes verbals, amb l’explicació de cada resposta.' } }, piezas('ingles-piezas-past-simple-test')] },
  'question-tags': { titulo: 'Question Tags', emoji: '❓', gradient: 'from-fuchsia-500 to-purple-700', modos: [{ key: 'el-gancho-tags-test', to: '/examen/el-gancho-tags-test', emoji: '📝', titulo: { es: 'Examen de question tags', en: 'Question tags exam', ca: 'Examen de question tags' }, desc: { es: 'Diez frases con la mecánica del juego, sin reloj y con nota.', en: 'Ten sentences using the game mechanic, no timer and a mark.', ca: 'Deu frases amb la mecànica del joc, sense rellotge i amb nota.' } }, { ...examen('ingles-grammar-verbs-test'), titulo: { es: 'Examen de verbos en inglés', en: 'English verbs exam', ca: 'Examen de verbs en anglès' }, desc: { es: 'Tiempos y formas verbales, con la explicación de cada respuesta.', en: 'Tenses and verb forms, with every answer explained.', ca: 'Temps i formes verbals, amb l’explicació de cada resposta.' } }, examen('ingles-grammar-present-simple-test')] },
  'relative-pronouns': { titulo: 'Relative Pronouns', emoji: '🔗', gradient: 'from-teal-500 to-cyan-700', modos: [{ key: 'el-gancho-relativos-test', to: '/examen/el-gancho-relativos-test', emoji: '📝', titulo: { es: 'Examen de relative pronouns', en: 'Relative pronouns exam', ca: 'Examen de relative pronouns' }, desc: { es: 'Diez frases con la mecánica del juego, sin reloj y con nota.', en: 'Ten sentences using the game mechanic, no timer and a mark.', ca: 'Deu frases amb la mecànica del joc, sense rellotge i amb nota.' } }, examen('ingles-grammar-pronouns-test'), { key: 'ingles-grammar-connectors-test', to: '/examen/ingles-grammar-connectors-test', emoji: '📝', titulo: { es: 'Examen de conectores', en: 'Connectors exam', ca: 'Examen de connectors' }, desc: { es: 'Palabras que unen frases, con la explicación de cada respuesta.', en: 'Words that link sentences, with every answer explained.', ca: 'Paraules que uneixen frases, amb l’explicació de cada resposta.' } }] },
  'some-any-much-many': { titulo: 'Some, Any, Much, Many', emoji: '🧺', gradient: 'from-amber-500 to-orange-700', modos: [{ key: 'ingles-grammar-nouns-test', to: '/examen/ingles-grammar-nouns-test', emoji: '📝', titulo: { es: 'Examen de sustantivos (contables e incontables)', en: 'Nouns exam (countable and uncountable)', ca: 'Examen de substantius (comptables i incomptables)' }, desc: { es: 'Plurales, contables e incontables, con la explicación de cada respuesta.', en: 'Plurals, countable and uncountable nouns, with every answer explained.', ca: 'Plurals, comptables i incomptables, amb l’explicació de cada resposta.' } }, examen('ingles-grammar-there-is-there-are-test')] },
  'irregular-verbs': { titulo: 'Irregular Verbs', emoji: '🔤', gradient: 'from-orange-500 to-red-600', modos: [juegoVerbos, { ...examen('verbos-irregulares-test'), emoji: '📝', titulo: { es: 'Examen de verbos irregulares', en: 'Irregular verbs exam', ca: 'Examen de verbs irregulars' }, desc: { es: 'Con la mecánica del juego, sin cronómetro.', en: 'Using the game mechanic, with no timer.', ca: 'Amb la mecànica del joc, sense cronòmetre.' } }] },
}


export default function InglesGrammarTema() {
  const { lang, tr, localPath } = useLang()
  const { tema: slug } = useParams()
  const base = '/estudiar/idiomas/ingles/grammar'
  const tema = TEMAS[slug]
  if (!tema) return <Navigate to={localPath(base)} replace />
  const meta = contenidoMeta(slug, lang)
  const juego = tema.modos.find(m => m.to === '/juegos/analiza-frases')

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
        <BotonPractica ejercicio={!!juego} />
      </div>

      <ContenidoTema tema={slug} lang={lang} practica={juego && <PracticaFrase tema={slug} filter={juego.state.filter} label={juego.state.label} idioma={juego.state.idioma} />} />

      <div id="formas" className="max-w-2xl mx-auto w-full space-y-4 scroll-mt-20">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">{tr({ es: 'Practica', en: 'Practise', ca: 'Practica' })}</p>
        {tema.modos.map(m => (
          <Link key={m.key} to={localPath(m.to)} state={{ backPath: `${base}/${slug}`, ...m.state }}
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
      {/* Los demás temas de gramática inglesa: enlaces entre hermanas */}
      <nav className="max-w-2xl mx-auto w-full mt-8" aria-label={tr({ es: 'Otros temas de gramática inglesa', en: 'Other English grammar topics', ca: 'Altres temes de gramàtica anglesa' })}>
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">{tr({ es: 'Otros temas de gramática inglesa', en: 'Other English grammar topics', ca: 'Altres temes de gramàtica anglesa' })}</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(TEMAS).filter(([id]) => id !== slug).map(([id, t]) => (
            <Link key={id} to={localPath(`${base}/${id}`)}className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/80 text-sm hover:bg-white/[0.12]">
              {t.emoji} {t.titulo}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
