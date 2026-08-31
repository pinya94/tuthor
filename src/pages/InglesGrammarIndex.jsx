import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEMAS = [
  { id: 'present-simple', titulo: 'Present Simple', emoji: '✅', gradient: 'from-green-500 to-emerald-600', gameId: 'ingles-grammar-present-simple-test' },
  { id: 'past-simple', titulo: 'Past Simple', emoji: '⏪', gradient: 'from-orange-500 to-amber-600', gameId: 'ingles-grammar-past-simple-test' },
  { id: 'present-perfect', titulo: 'Present Perfect', emoji: '🔗', gradient: 'from-purple-500 to-violet-600', gameId: 'ingles-grammar-present-perfect-test' },
  { id: 'articles', titulo: 'Articles', emoji: '📖', gradient: 'from-blue-500 to-cyan-600', gameId: 'ingles-grammar-articles-test' },
  { id: 'passive', titulo: 'Passive Voice', emoji: '🔄', gradient: 'from-red-500 to-rose-600', gameId: 'ingles-grammar-passive-test' },
  // Parts of speech — mecánica "Analyse the Sentence" sobre frases en inglés.
  { id: 'nouns', titulo: 'Nouns', emoji: '📚', gradient: 'from-red-500 to-rose-600', gameId: 'ingles-pos-nouns-test' },
  { id: 'verbs', titulo: 'Verbs', emoji: '🏃', gradient: 'from-amber-500 to-orange-600', gameId: 'ingles-pos-verbs-test' },
  { id: 'adjectives', titulo: 'Adjectives', emoji: '🎨', gradient: 'from-pink-500 to-rose-600', gameId: 'ingles-pos-adjectives-test' },
  { id: 'adverbs', titulo: 'Adverbs', emoji: '⏱️', gradient: 'from-teal-500 to-cyan-600', gameId: 'ingles-pos-adverbs-test' },
  { id: 'pronouns', titulo: 'Pronouns', emoji: '🙋', gradient: 'from-lime-500 to-green-600', gameId: 'ingles-pos-pronouns-test' },
  { id: 'connectors', titulo: 'Prepositions & Conjunctions', emoji: '🔗', gradient: 'from-sky-500 to-blue-600', gameId: 'ingles-pos-connectors-test' },
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
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">Estudiar · English · Grammar</p>
        <div className="text-5xl mb-2">📝</div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Grammar</h1>
        <p className="text-white/40 mt-1 text-sm">{t('elige')}</p>
      </div>

      {/* El juego va aparte de los temas y no dentro de cada uno: practicar un
          tema suelto es lo que hace el examen de abajo, y ahí el propio título
          ya da media respuesta. El juego es lo contrario — todo mezclado y con
          el reloj corriendo. */}
      <button
        onClick={() => navigate(localPath('/juegos/pieza-que-falta'))}
        className="max-w-2xl mx-auto w-full mb-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition-colors hover:bg-white/10"
      >
        <div className="text-4xl">🧩</div>
        <div>
          <div className="text-white font-bold">La Pieza que Falta</div>
          <div className="text-white/40 text-sm">{t('mezcla')}</div>
        </div>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
        {TEMAS.map(tema => (
          <button
            key={tema.id}
            onClick={() => navigate(localPath(`/examen/${tema.gameId}`))}
            className={`bg-gradient-to-br ${tema.gradient} text-white rounded-2xl p-6 text-left hover:scale-105 transition-transform shadow-md`}
          >
            <div className="text-4xl mb-3">{tema.emoji}</div>
            <div className="text-xl font-bold">{tema.titulo}</div>
          </button>
        ))}
      </div>

      <button onClick={() => navigate(localPath('/estudiar/idiomas/ingles'))} className="mt-8 text-white/40 hover:text-white/70 text-sm text-center">
        ← English
      </button>
    </div>
  )
}
