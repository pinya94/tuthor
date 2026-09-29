import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS, ArteTema } from '../components/arte/temas'
import { ARTE_JUEGOS, slugDeRuta } from '../components/arte'

const TEMAS = [
  { id: 'acentuacion', titulo: { es: 'Acentuación', en: 'Accentuation', ca: 'Accentuació' }, emoji: '´', gradient: 'from-yellow-500 to-orange-500', gameId: 'espanol-ortografia-acentuacion-test' },
  { id: 'bv', titulo: { es: 'B y V', en: 'B and V', ca: 'B i V' }, emoji: '🔤', gradient: 'from-teal-500 to-cyan-600', gameId: 'espanol-ortografia-bv-test' },
  { id: 'gj', titulo: { es: 'G y J', en: 'G and J', ca: 'G i J' }, emoji: '🔡', gradient: 'from-violet-500 to-purple-700', gameId: 'espanol-ortografia-gj-test' },
  { id: 'puntuacion', titulo: { es: 'Puntuación', en: 'Punctuation', ca: 'Puntuació' }, emoji: '❓', gradient: 'from-rose-500 to-pink-700', gameId: 'espanol-ortografia-puntuacion-test' },
  { id: 'correccion', titulo: { es: 'Corregir un texto', en: 'Proofreading', ca: 'Corregir un text' }, emoji: '🔍', gradient: 'from-amber-500 to-orange-700', gameId: 'corrige-el-texto-test' },
]

// Los dos juegos de ortografía que hay. Estaban solo en /juegos y en el
// catálogo por tema, así que quien entraba a estudiar ortografía por aquí veía
// cuatro exámenes y ni rastro de ellos. Llevan `path` porque no van a
// /examen/<id> como los de arriba, y etiqueta propia para que se vea que son
// otra cosa: se juegan, no se aprueban.
const JUEGOS = [
  // Con tema: estando en Ortografía del español, el texto tiene que salir en
  // castellano aunque la interfaz esté en inglés o en catalán.
  { id: 'corregir', titulo: { es: 'Corrige el Texto', en: 'Spot the Mistakes', ca: 'Corregeix el Text' }, emoji: '🔍', gradient: 'from-amber-500 to-orange-700', path: '/juegos/corrige-el-texto', state: { tema: 'correccion' } },
  { id: 'tilde', titulo: { es: 'Pon la Tilde', en: 'Spanish Accents', ca: "Posa l'Accent" }, emoji: '✏️', gradient: 'from-rose-500 to-pink-700', path: '/juegos/pon-la-tilde' },
]

export default function EspanolOrtografiaIndex() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOEstatico path="/estudiar/idiomas/espanol/ortografia" />
      <div className="text-center mb-8">
        <ArteTema id="ortografia/acentuacion" className="w-full max-w-[200px] mx-auto aspect-video block mb-2" />
        <p className="text-white/40 text-sm mb-1">Estudiar · Español · {tr({ es: 'Ortografía', en: 'Spelling', ca: 'Ortografia' })}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{tr({ es: 'Ortografía', en: 'Spelling', ca: 'Ortografia' })}</h1>
        <p className="text-white/40 mt-1 text-sm">{tr({ es: 'Elige un tema', en: 'Choose a topic', ca: 'Tria un tema' })}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
        {TEMAS.map(tema => (
          <TarjetaArte key={tema.id} Arte={ARTE_TEMAS[`ortografia/${tema.id}`]} titulo={tema.titulo[lang] || tema.titulo.es}
            to={localPath(`/examen/${tema.gameId}`)} />
        ))}
      </div>

      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest text-center mt-8 mb-3">
        {tr({ es: 'O juega', en: 'Or play', ca: 'O juga' })}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto w-full">
        {JUEGOS.map(juego => (
          <TarjetaArte key={juego.id} Arte={ARTE_JUEGOS[slugDeRuta(juego.path)]} titulo={juego.titulo[lang] || juego.titulo.es}
            to={localPath(juego.path)} state={juego.state} />
        ))}
      </div>

      <button onClick={() => navigate(localPath('/estudiar/idiomas/espanol'))} className="mt-8 text-white/40 hover:text-white/70 text-sm text-center">
        ← Español
      </button>
    </div>
  )
}
