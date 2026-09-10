import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEMAS = [
  { id: 'acentuacion', titulo: { es: 'Acentuación', en: 'Accentuation', ca: 'Accentuació' }, emoji: '´', gradient: 'from-yellow-500 to-orange-500', gameId: 'espanol-ortografia-acentuacion-test' },
  { id: 'bv', titulo: { es: 'B y V', en: 'B and V', ca: 'B i V' }, emoji: '🔤', gradient: 'from-teal-500 to-cyan-600', gameId: 'espanol-ortografia-bv-test' },
  { id: 'gj', titulo: { es: 'G y J', en: 'G and J', ca: 'G i J' }, emoji: '🔡', gradient: 'from-violet-500 to-purple-700', gameId: 'espanol-ortografia-gj-test' },
  { id: 'puntuacion', titulo: { es: 'Puntuación', en: 'Punctuation', ca: 'Puntuació' }, emoji: '❓', gradient: 'from-rose-500 to-pink-700', gameId: 'espanol-ortografia-puntuacion-test' },
]

// Los dos juegos de ortografía que hay. Estaban solo en /juegos y en el
// catálogo por tema, así que quien entraba a estudiar ortografía por aquí veía
// cuatro exámenes y ni rastro de ellos. Llevan `path` porque no van a
// /examen/<id> como los de arriba, y etiqueta propia para que se vea que son
// otra cosa: se juegan, no se aprueban.
const JUEGOS = [
  { id: 'corregir', titulo: { es: 'Corrige el Texto', en: 'Spot the Mistakes', ca: 'Corregeix el Text' }, emoji: '🔍', gradient: 'from-amber-500 to-orange-700', path: '/juegos/corrige-el-texto' },
  { id: 'tilde', titulo: { es: 'Pon la Tilde', en: 'Spanish Accents', ca: "Posa l'Accent" }, emoji: '✏️', gradient: 'from-rose-500 to-pink-700', path: '/juegos/pon-la-tilde' },
]

export default function EspanolOrtografiaIndex() {
  const navigate = useNavigate()
  const { lang } = useLang()

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">Estudiar · Español · {{ es: 'Ortografía', en: 'Spelling', ca: 'Ortografia' }[lang]}</p>
        <div className="text-5xl mb-2">✍️</div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{{ es: 'Ortografía', en: 'Spelling', ca: 'Ortografia' }[lang]}</h1>
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

      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest text-center mt-8 mb-3">
        {{ es: 'O juega', en: 'Or play', ca: 'O juga' }[lang]}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
        {JUEGOS.map(juego => (
          <button
            key={juego.id}
            onClick={() => navigate(juego.path)}
            className={`bg-gradient-to-br ${juego.gradient} text-white rounded-2xl p-6 text-left hover:scale-105 transition-transform shadow-md`}
          >
            <div className="text-4xl mb-3">{juego.emoji}</div>
            <div className="text-xl font-bold">{juego.titulo[lang]}</div>
          </button>
        ))}
      </div>

      <button onClick={() => navigate('/estudiar/idiomas/espanol')} className="mt-8 text-white/40 hover:text-white/70 text-sm text-center">
        ← Español
      </button>
    </div>
  )
}
