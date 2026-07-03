import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const CATEGORIAS = [
  {
    id: 'grammar',
    titulo: { es: 'Grammar', en: 'Grammar', ca: 'Grammar' },
    emoji: '📝',
    gradient: 'from-blue-500 to-indigo-600',
    path: '/estudiar/idiomas/ingles/grammar',
  },
]

export default function InglesIndex() {
  const navigate = useNavigate()
  const { lang } = useLang()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => navigate('/estudiar/idiomas')} className="mb-6 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          ← {{ es: 'Idiomas', en: 'Languages', ca: 'Idiomes' }[lang]}
        </button>

        <div className="mb-8">
          <div className="text-5xl mb-3">🇬🇧</div>
          <h1 className="text-3xl font-bold text-gray-900">English</h1>
          <p className="text-gray-500 mt-1">{{ es: 'Selecciona una categoría', en: 'Select a category', ca: 'Selecciona una categoria' }[lang]}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(cat.path)}
              className={`bg-gradient-to-br ${cat.gradient} text-white rounded-2xl p-6 text-left hover:scale-105 transition-transform shadow-md`}
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <div className="text-xl font-bold">{cat.titulo[lang]}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
