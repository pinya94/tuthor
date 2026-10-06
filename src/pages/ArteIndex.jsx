import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import { ArteMateria } from '../components/arte/materias'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS } from '../components/arte/temas'
import { ARTE_JUEGOS } from '../components/arte'

// Historia del Arte: dos temas, cada uno con su examen tipo test; la
// arquitectura además tiene el juego ¿Qué estilo es?, con edificios dibujados.
const TEMAS = [
  {
    id: 'arquitectura', path: '/examen/arte-arquitectura',
    titulo: { es: 'Arquitectura', en: 'Architecture', ca: 'Arquitectura' },
    subtitulo: { es: 'Del templo griego a Gaudí: estilos, arcos y columnas', en: 'From the Greek temple to Gaudí: styles, arches and columns', ca: 'Del temple grec a Gaudí: estils, arcs i columnes' },
  },
  {
    id: 'pintura', path: '/examen/arte-pintura',
    titulo: { es: 'Pintura', en: 'Painting', ca: 'Pintura' },
    subtitulo: { es: 'De Giotto a las vanguardias, con los cuadros del Prado', en: 'From Giotto to the avant-garde, with the Prado’s paintings', ca: 'De Giotto a les avantguardes, amb els quadres del Prado' },
  },
  {
    id: 'que-estilo', path: '/juegos/que-estilo', juego: true,
    titulo: { es: '¿Qué estilo es? (juego)', en: 'What Style Is It? (game)', ca: 'Quin estil és? (joc)' },
    subtitulo: { es: 'Reconoce el estilo de un edificio dibujado', en: 'Recognise the style of a drawn building', ca: 'Reconeix l’estil d’un edifici dibuixat' },
  },
]

export default function ArteIndex() {
  const { lang, localPath, tr } = useLang()
  const seo = {
    title: tr({ es: 'Historia del Arte — arquitectura y pintura', en: 'Art History — architecture and painting', ca: 'Història de l’Art — arquitectura i pintura' }),
    desc: tr({
      es: 'Historia del Arte para ESO y Bachillerato: los estilos de la arquitectura, de Grecia a Gaudí, y los grandes pintores, de Giotto a Picasso. Exámenes explicados y un juego con edificios dibujados.',
      en: 'Art history for secondary school: architectural styles from Greece to Gaudí and the great painters from Giotto to Picasso. Explained quizzes and a game with drawn buildings.',
      ca: 'Història de l’Art per a ESO i Batxillerat: els estils de l’arquitectura, de Grècia a Gaudí, i els grans pintors, de Giotto a Picasso. Exàmens explicats i un joc amb edificis dibuixats.',
    }),
  }
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOHead title={seo.title} description={seo.desc} path="/estudiar/arte" lang={lang} />
      <div className="text-center mb-6">
        <ArteMateria id="arte" />
        <p className="text-white/40 text-sm mb-1">{tr({ es: 'Estudiar · Historia del Arte', en: 'Study · Art History', ca: 'Estudiar · Història de l’Art' })}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{tr({ es: 'Elige un tema', en: 'Pick a topic', ca: 'Tria un tema' })}</h1>
        <p className="text-white/40 mt-1 text-sm">{tr({ es: 'Estilos, artistas y obras para ESO y Bachillerato', en: 'Styles, artists and works for secondary school', ca: 'Estils, artistes i obres per a ESO i Batxillerat' })}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
        {TEMAS.map(t => (
          <TarjetaArte key={t.id} Arte={t.juego ? ARTE_JUEGOS[t.id] : ARTE_TEMAS[`arte/${t.id}`]} titulo={tr(t.titulo)} sub={tr(t.subtitulo)}
            to={localPath(t.path)} />
        ))}
      </div>
    </div>
  )
}
