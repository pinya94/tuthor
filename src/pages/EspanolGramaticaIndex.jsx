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
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">Estudiar · Español · {{ es: 'Gramática', en: 'Grammar', ca: 'Gramàtica' }[lang]}</p>
        <div className="text-5xl mb-2">📚</div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{{ es: 'Gramática', en: 'Grammar', ca: 'Gramàtica' }[lang]}</h1>
        <p className="text-white/40 mt-1 text-sm">{{ es: 'Elige un tema', en: 'Choose a topic', ca: 'Tria un tema' }[lang]}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
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

      <button onClick={() => navigate('/estudiar/idiomas/espanol')} className="mt-8 text-white/40 hover:text-white/70 text-sm text-center">
        ← Español
      </button>
    </div>
  )
}
