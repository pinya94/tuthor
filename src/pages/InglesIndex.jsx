import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import { ArteMateria } from '../components/arte/materias'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS } from '../components/arte/temas'
import { ARTE_JUEGOS, slugDeRuta } from '../components/arte'

const CATEGORIAS = [
  { id: 'grammar', titulo: { es: 'Grammar', en: 'Grammar', ca: 'Grammar' }, emoji: '📝', gradient: 'from-blue-500 to-indigo-600', path: '/estudiar/idiomas/ingles/grammar' },
  { id: 'word-order', titulo: { es: 'Word order', en: 'Word order', ca: 'Word order' }, emoji: '🔤', gradient: 'from-cyan-500 to-blue-700', path: '/juegos/ordena-frase',
    sub: { es: 'Ordena la frase jugando', en: 'Order the sentence by playing', ca: 'Ordena la frase jugant' } },
  // Con tema: sin él, Corrige el Texto abre en el idioma de la interfaz, y
  // desde Inglés lo que toca es el texto en inglés.
  { id: 'spelling', titulo: { es: 'Spelling', en: 'Spelling', ca: 'Spelling' }, emoji: '🔍', gradient: 'from-amber-500 to-orange-700', path: '/juegos/corrige-el-texto', state: { tema: 'spelling' },
    sub: { es: 'Encuentra las faltas de un texto en inglés', en: 'Find the mistakes in an English text', ca: "Troba les faltes d'un text en anglès" } },
]

export default function InglesIndex() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOEstatico path="/estudiar/idiomas/ingles" />
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">Estudiar · English</p>
        <ArteMateria id="ingles" />
        <h1 className="text-2xl sm:text-3xl font-black text-white">English</h1>
        <p className="text-white/40 mt-1 text-sm">
          {{ es: 'Selecciona una categoría', en: 'Select a category', ca: 'Selecciona una categoria' }[lang]}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
        {CATEGORIAS.map(cat => (
          <TarjetaArte key={cat.id} titulo={cat.titulo[lang] || cat.titulo.es} sub={cat.sub && (cat.sub[lang] ?? cat.sub.es)}
            Arte={cat.id === 'grammar' ? ARTE_TEMAS['lengua/gramatica'] : ARTE_JUEGOS[slugDeRuta(cat.path)]}
            onClick={() => navigate(localPath(cat.path), { state: cat.state })} />
        ))}
      </div>
    </div>
  )
}
