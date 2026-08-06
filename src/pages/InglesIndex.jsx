import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const CATEGORIAS = [
  { id: 'grammar', titulo: { es: 'Grammar', en: 'Grammar', ca: 'Grammar' }, emoji: '📝', gradient: 'from-blue-500 to-indigo-600', path: '/estudiar/idiomas/ingles/grammar' },
  { id: 'word-order', titulo: { es: 'Word order', en: 'Word order', ca: 'Word order' }, emoji: '🔤', gradient: 'from-cyan-500 to-blue-700', path: '/juegos/ordena-frase',
    sub: { es: 'Ordena la frase jugando', en: 'Order the sentence by playing', ca: 'Ordena la frase jugant' } },
]

export default function InglesIndex() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">Estudiar · English</p>
        <div className="text-5xl mb-2">💬</div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">English</h1>
        <p className="text-white/40 mt-1 text-sm">
          {{ es: 'Selecciona una categoría', en: 'Select a category', ca: 'Selecciona una categoria' }[lang]}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
        {CATEGORIAS.map(cat => (
          <button
            key={cat.id}
            onClick={() => navigate(localPath(cat.path))}
            className={`bg-gradient-to-br ${cat.gradient} text-white rounded-2xl p-6 text-left hover:scale-105 transition-transform shadow-md`}
          >
            <div className="text-4xl mb-3">{cat.emoji}</div>
            <div className="text-xl font-bold">{cat.titulo[lang]}</div>
            {cat.sub && <div className="text-white/70 text-sm mt-1">{cat.sub[lang] ?? cat.sub.es}</div>}
          </button>
        ))}
      </div>
    </div>
  )
}
