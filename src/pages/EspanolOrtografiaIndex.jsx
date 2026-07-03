import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEMAS = [
  { id: 'acentuacion', titulo: { es: 'Acentuación', en: 'Accentuation', ca: 'Accentuació' }, emoji: '´', gradient: 'from-yellow-500 to-orange-500', gameId: 'espanol-ortografia-acentuacion-test' },
  { id: 'bv', titulo: { es: 'B y V', en: 'B and V', ca: 'B i V' }, emoji: '🔤', gradient: 'from-teal-500 to-cyan-600', gameId: 'espanol-ortografia-bv-test' },
]

export default function EspanolOrtografiaIndex() {
  const navigate = useNavigate()
  const { lang } = useLang()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => navigate('/estudiar/idiomas/espanol')} className="mb-6 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          ← Español
        </button>

        <div className="mb-8">
          <div className="text-5xl mb-3">✍️</div>
          <h1 className="text-3xl font-bold text-gray-900">{{ es: 'Ortografía', en: 'Spelling', ca: 'Ortografia' }[lang]}</h1>
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
