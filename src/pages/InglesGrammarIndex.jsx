import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS, ArteTema } from '../components/arte/temas'
import { CONCEPTO_INGLES } from '../components/arte/temasLengua'
import { ArteJuego } from '../components/arte'

const TEMAS = [
  { id: 'present-simple', titulo: 'Present Simple', emoji: '✅', gradient: 'from-green-500 to-emerald-600', gameId: 'ingles-grammar-present-simple-test' },
  { id: 'past-simple', titulo: 'Past Simple', emoji: '⏪', gradient: 'from-orange-500 to-amber-600', gameId: 'ingles-grammar-past-simple-test' },
  { id: 'present-perfect', titulo: 'Present Perfect', emoji: '🔗', gradient: 'from-purple-500 to-violet-600', gameId: 'ingles-grammar-present-perfect-test' },
  { id: 'articles', titulo: 'Articles', emoji: '📖', gradient: 'from-blue-500 to-cyan-600', gameId: 'ingles-grammar-articles-test' },
  { id: 'passive', titulo: 'Passive Voice', emoji: '🔄', gradient: 'from-red-500 to-rose-600', gameId: 'ingles-grammar-passive-test' },
  // Parts of speech — examen tipo test; desde él se salta a la mecánica "Analyse
  // the Sentence" (otroExamen → ingles-pos-*-test).
  { id: 'nouns', titulo: 'Nouns', emoji: '📚', gradient: 'from-red-500 to-rose-600', gameId: 'ingles-grammar-nouns-test' },
  { id: 'verbs', titulo: 'Verbs', emoji: '🏃', gradient: 'from-amber-500 to-orange-600', gameId: 'ingles-grammar-verbs-test' },
  { id: 'adjectives', titulo: 'Adjectives', emoji: '🎨', gradient: 'from-pink-500 to-rose-600', gameId: 'ingles-grammar-adjectives-test' },
  { id: 'adverbs', titulo: 'Adverbs', emoji: '⏱️', gradient: 'from-teal-500 to-cyan-600', gameId: 'ingles-grammar-adverbs-test' },
  { id: 'pronouns', titulo: 'Pronouns', emoji: '🙋', gradient: 'from-lime-500 to-green-600', gameId: 'ingles-grammar-pronouns-test' },
  { id: 'connectors', titulo: 'Prepositions & Conjunctions', emoji: '🔗', gradient: 'from-sky-500 to-blue-600', gameId: 'ingles-grammar-connectors-test' },
]

const L = {
  elige:  { es: 'Elige un tema', en: 'Choose a topic', ca: 'Tria un tema' },
  mezcla: { es: 'Los cinco temas mezclados, a contrarreloj', en: 'All five topics mixed, against the clock', ca: 'Els cinc temes barrejats, a contrarellotge' },
}

export default function InglesGrammarIndex() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const t = k => L[k][lang] ?? L[k].es

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOEstatico path="/estudiar/idiomas/ingles/grammar" />
      <div className="text-center mb-8">
        <ArteTema id="lengua/gramatica" className="w-full max-w-[200px] mx-auto aspect-video block mb-2" />
        <p className="text-white/40 text-sm mb-1">Estudiar · English · Grammar</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Grammar</h1>
        <p className="text-white/40 mt-1 text-sm">{t('elige')}</p>
      </div>

      {/* El juego va aparte de los temas y no dentro de cada uno: practicar un
          tema suelto es lo que hace el examen de abajo, y ahí el propio título
          ya da media respuesta. El juego es lo contrario — todo mezclado y con
          el reloj corriendo. */}
      <button
        onClick={() => navigate(localPath('/juegos/pieza-que-falta'))}
        className="max-w-3xl mx-auto w-full mb-4 flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#141b2e] p-3 pr-5 text-left transition-colors hover:border-white/20"
      >
        <ArteJuego slug="pieza-que-falta" className="shrink-0 w-28 sm:w-36 aspect-video rounded-lg bg-white/[0.03]" />
        <div>
          <div className="text-white font-bold">La Pieza que Falta</div>
          <div className="text-white/40 text-sm">{t('mezcla')}</div>
        </div>
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
        {TEMAS.map(tema => (
          <TarjetaArte key={tema.id} titulo={tema.titulo}
            Arte={ARTE_TEMAS[CONCEPTO_INGLES[tema.id] ? `gramatica/${CONCEPTO_INGLES[tema.id]}` : `ingles/${tema.id}`]}
            onClick={() => navigate(localPath(`/examen/${tema.gameId}`))} />
        ))}
      </div>

      <button onClick={() => navigate(localPath('/estudiar/idiomas/ingles'))} className="mt-8 text-white/40 hover:text-white/70 text-sm text-center">
        ← English
      </button>
    </div>
  )
}
