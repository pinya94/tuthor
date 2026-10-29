import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import { TEMAS_GRAMATICA as TEMAS } from '../data/temasEspanol'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS, ArteTema } from '../components/arte/temas'

export default function EspanolGramaticaIndex() {
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
            to={localPath(`/estudiar/idiomas/espanol/gramatica/${tema.id}`)} />
        ))}
      </div>

      <Link to={localPath('/examen/frases-clases-test')}
        className="max-w-3xl mx-auto w-full mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 text-left transition-colors">
        <span>
          <span className="block text-white font-bold">🏷️ {tr({ es: 'Todas las clases de palabras', en: 'All the word classes', ca: 'Totes les classes de paraules' })}</span>
          <span className="block text-white/40 text-sm">{tr({ es: 'Mezcladas en la misma frase: señala cada una con la mecánica del juego.', en: 'Mixed in the same sentence: point each one out using the game mechanic.', ca: 'Barrejades a la mateixa frase: assenyala cadascuna amb la mecànica del joc.' })}</span>
        </span>
        <span className="text-white/30">→</span>
      </Link>

      <Link to={localPath('/estudiar/idiomas/espanol')} className="inline-block mt-8 text-white/40 hover:text-white/70 text-sm text-center">
        ← Español
      </Link>
    </div>
  )
}
