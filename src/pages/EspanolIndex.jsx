import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const CATEGORIAS = [
  { id: 'gramatica', titulo: { es: 'Gramática', en: 'Grammar', ca: 'Gramàtica' }, emoji: '📚', gradient: 'from-red-500 to-orange-500', path: '/estudiar/idiomas/espanol/gramatica' },
  { id: 'ortografia', titulo: { es: 'Ortografía', en: 'Spelling', ca: 'Ortografia' }, emoji: '✍️', gradient: 'from-yellow-500 to-amber-600', path: '/estudiar/idiomas/espanol/ortografia' },
]

export default function EspanolIndex() {
  const navigate = useNavigate()
  const { lang } = useLang()

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">Estudiar · Español</p>
        <div className="text-5xl mb-2">✏️</div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Español</h1>
        <p className="text-white/40 mt-1 text-sm">
          {{ es: 'Selecciona una categoría', en: 'Select a category', ca: 'Selecciona una categoria' }[lang]}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
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
  )
}
