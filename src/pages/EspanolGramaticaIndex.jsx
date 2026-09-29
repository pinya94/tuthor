import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS, ArteTema } from '../components/arte/temas'

// Cada tema abre su página de elección (examen tipo test + mecánica Analiza la Frase).
const TEMAS = [
  { id: 'sustantivos', titulo: { es: 'Sustantivos', en: 'Nouns', ca: 'Substantius' }, emoji: '📚', gradient: 'from-red-500 to-rose-600' },
  { id: 'adjetivos', titulo: { es: 'Adjetivos', en: 'Adjectives', ca: 'Adjectius' }, emoji: '🎨', gradient: 'from-pink-500 to-rose-600' },
  { id: 'determinantes', titulo: { es: 'Determinantes', en: 'Determiners', ca: 'Determinants' }, emoji: '🔖', gradient: 'from-amber-500 to-orange-600' },
  { id: 'pronombres', titulo: { es: 'Pronombres', en: 'Pronouns', ca: 'Pronoms' }, emoji: '🙋', gradient: 'from-lime-500 to-green-600' },
  { id: 'verbos', titulo: { es: 'Verbos', en: 'Verbs', ca: 'Verbs' }, emoji: '🏃', gradient: 'from-orange-500 to-amber-600' },
  { id: 'adverbios', titulo: { es: 'Adverbios', en: 'Adverbs', ca: 'Adverbis' }, emoji: '⏱️', gradient: 'from-teal-500 to-cyan-600' },
  { id: 'nexos', titulo: { es: 'Preposiciones y conjunciones', en: 'Prepositions & conjunctions', ca: 'Preposicions i conjuncions' }, emoji: '🔗', gradient: 'from-sky-500 to-blue-600' },
  { id: 'sintaxis', titulo: { es: 'Sintaxis', en: 'Syntax', ca: 'Sintaxi' }, emoji: '🔬', gradient: 'from-purple-500 to-violet-600' },
  { id: 'morfologia', titulo: { es: 'Género y número', en: 'Gender & number', ca: 'Gènere i nombre' }, emoji: '♀️', gradient: 'from-fuchsia-500 to-purple-600' },
]

export default function EspanolGramaticaIndex() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOEstatico path="/estudiar/idiomas/espanol/gramatica" />
      <div className="text-center mb-8">
        <ArteTema id="lengua/gramatica" className="w-full max-w-[200px] mx-auto aspect-video block mb-2" />
        <p className="text-white/40 text-sm mb-1">Estudiar · Español · {tr({ es: 'Gramática', en: 'Grammar', ca: 'Gramàtica' })}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{tr({ es: 'Gramática', en: 'Grammar', ca: 'Gramàtica' })}</h1>
        <p className="text-white/40 mt-1 text-sm">{tr({ es: 'Elige un tema', en: 'Choose a topic', ca: 'Tria un tema' })}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
        {TEMAS.map(tema => (
          <TarjetaArte key={tema.id} Arte={ARTE_TEMAS[`gramatica/${tema.id}`]} titulo={tema.titulo[lang] || tema.titulo.es}
            onClick={() => navigate(localPath(`/estudiar/idiomas/espanol/gramatica/${tema.id}`))} />
        ))}
      </div>

      <button onClick={() => navigate(localPath('/estudiar/idiomas/espanol'))} className="mt-8 text-white/40 hover:text-white/70 text-sm text-center">
        ← Español
      </button>
    </div>
  )
}
