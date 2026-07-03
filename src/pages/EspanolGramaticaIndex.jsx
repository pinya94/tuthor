import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEMAS = [
  { id: 'sustantivos', titulo: { es: 'Sustantivos', en: 'Nouns', ca: 'Substantius' }, emoji: '📚', gradient: 'from-red-500 to-rose-600', gameId: 'espanol-gramatica-sustantivos-test' },
  { id: 'verbos', titulo: { es: 'Verbos', en: 'Verbs', ca: 'Verbs' }, emoji: '🏃', gradient: 'from-orange-500 to-amber-600', gameId: 'espanol-gramatica-verbos-test' },
  { id: 'sintaxis', titulo: { es: 'Sintaxis', en: 'Syntax', ca: 'Sintaxi' }, emoji: '🔬', gradient: 'from-purple-500 to-violet-600', gameId: 'espanol-gramatica-sintaxis-test' },
]

export default function EspanolGramaticaIndex() {
  const navigate = useNavigate()
  const { lang } = useLang()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => navigate('/estudiar/idiomas/espanol')} className="mb-6 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          ← Español
        </button>

        <div className="mb-8">
          <div className="text-5xl mb-3">📚</div>
          <h1 className="text-3xl font-bold text-gray-900">{{ es: 'Gramática', en: 'Grammar', ca: 'Gramàtica' }[lang]}</h1>
          <p className="text-gray-500 mt-1">{{ es: 'Elige un tema', en: 'Choose a topic', ca: 'Tria un tema' }[lang]}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEMAS.map(tema => (
            <button
              key={tema.id}
              onClick={() => navigate(`/examen/${tema.gameId}`)}
              className={`bg-gradient-to-br ${tema.gradient} text-white rounded-2xl p-6 text-left hover:scale-105 transition-transform shadow-md`}
            >
              <div className="text-4xl mb-3">{tema.emoji}</div>
              <div className="text-xl font-bold">{tema.titulo[lang]}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
