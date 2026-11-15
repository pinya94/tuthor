import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import ContenidoTema, { contenidoMeta } from '../components/ContenidoTema'
import { disponibleEn } from '../lib/games'

// Páginas de estudio sueltas (temaEstudioExtra.js): literatura y geografía.
// Cada una: migas, contenido (resumen, tablas, ejercicios) y, debajo, sus
// exámenes y juegos. Los juegos que solo existen en castellano no salen en
// en/ca (disponibleEn).
const T3 = (es, en, ca) => ({ es, en, ca })
const ESPANOL = { label: T3('Español', 'Spanish', 'Castellà'), path: '/estudiar/idiomas/espanol' }
const GEOGRAFIA = { label: T3('Geografía', 'Geography', 'Geografia'), path: '/estudiar/geografia' }

const TEMAS = {
  'generos-literarios': {
    path: '/estudiar/idiomas/espanol/literatura/generos-literarios', miga: ESPANOL, emoji: '📖', nombre: T3('Géneros literarios', 'Literary genres', 'Gèneres literaris'),
    modos: [
      { to: '/examen/espanol-literatura-test', emoji: '📝', gradient: 'from-indigo-500 to-blue-700', titulo: T3('Examen de Literatura', 'Literature exam', 'Examen de Literatura'), desc: T3('Géneros, obras, autores y épocas de la literatura española, con explicación.', 'Genres, works, authors and periods of Spanish literature, with explanations.', 'Gèneres, obres, autors i èpoques de la literatura espanyola, amb explicació.') },
      { to: '/juegos/la-biblioteca', juego: 'la-biblioteca', emoji: '📚', gradient: 'from-amber-500 to-orange-700', titulo: T3('La Biblioteca (juego)', 'La Biblioteca (game)', 'La Biblioteca (joc)'), desc: T3('Literatura española: obras, autores y épocas.', 'Spanish literature: works, authors and periods.', 'Literatura espanyola: obres, autors i èpoques.') },
      { to: '/juegos/detective-textos', juego: 'detective-textos', emoji: '📑', gradient: 'from-teal-500 to-cyan-700', titulo: T3('Detective de Textos (juego)', 'Detective de Textos (game)', 'Detective de Textos (joc)'), desc: T3('Tipos de texto, la comunicación y las funciones del lenguaje.', 'Types of text, communication and the functions of language.', 'Tipus de text, la comunicació i les funcions del llenguatge.') },
    ],
  },
  'figuras-literarias': {
    path: '/estudiar/idiomas/espanol/literatura/figuras-literarias', miga: ESPANOL, emoji: '🎭', nombre: T3('Figuras literarias', 'Literary devices', 'Figures literàries'),
    modos: [
      { to: '/juegos/cazafiguras', juego: 'cazafiguras', emoji: '🎭', gradient: 'from-fuchsia-500 to-purple-700', titulo: T3('Cazafiguras (juego)', 'Cazafiguras (game)', 'Cazafiguras (joc)'), desc: T3('Caza la figura literaria escondida en cada verso o frase.', 'Catch the literary device hidden in each line or sentence.', 'Caça la figura literària amagada a cada vers o frase.') },
      { to: '/examen/espanol-figuras-test', emoji: '📝', gradient: 'from-purple-500 to-indigo-700', titulo: T3('Examen de figuras literarias', 'Literary devices exam', 'Examen de figures literàries'), desc: T3('Reconoce las figuras en versos y frases, con la explicación de cada una.', 'Recognise the devices in lines and sentences, with each one explained.', 'Reconeix les figures en versos i frases, amb l’explicació de cadascuna.') },
    ],
  },
  'continentes-y-oceanos': {
    path: '/estudiar/geografia/continentes-y-oceanos', miga: GEOGRAFIA, emoji: '🌍', nombre: T3('Continentes y océanos', 'Continents and oceans', 'Continents i oceans'),
    modos: [
      { to: '/juegos/continentes-oceanos', emoji: '🌍', gradient: 'from-emerald-600 to-sky-800', titulo: T3('Continentes y Océanos (juego)', 'Continents and Oceans (game)', 'Continents i Oceans (joc)'), desc: T3('Toca en el mapa cada continente, océano y mar, contra reloj.', 'Tap each continent, ocean and sea on the map, against the clock.', 'Toca al mapa cada continent, oceà i mar, contra rellotge.') },
      { to: '/examen/continentes-oceanos-test', emoji: '📝', gradient: 'from-sky-600 to-indigo-800', titulo: T3('Examen de continentes y océanos', 'Continents and oceans exam', 'Examen de continents i oceans'), desc: T3('Con la mecánica del juego, sin cronómetro y con tres niveles.', 'Using the game mechanic, with no timer and three levels.', 'Amb la mecànica del joc, sense cronòmetre i amb tres nivells.') },
      { to: '/juegos/geomapa', emoji: '🗺️', gradient: 'from-emerald-500 to-teal-700', titulo: T3('GeoMapa (juego)', 'GeoMap (game)', 'GeoMapa (joc)'), desc: T3('Encuentra cada país en el mapa del mundo.', 'Find each country on the world map.', 'Troba cada país al mapa del món.') },
      { to: '/examen/geografia-fisica-test', emoji: '📝', gradient: 'from-sky-500 to-blue-700', titulo: T3('Examen de Geografía Física', 'Physical Geography exam', 'Examen de Geografia Física'), desc: T3('Relieve, ríos, océanos y climas del mundo, con explicación.', 'Landforms, rivers, oceans and climates of the world, with explanations.', 'Relleu, rius, oceans i climes del món, amb explicació.') },
    ],
  },
}

export default function TemaEstudioExtra({ slug }) {
  const { lang, tr, localPath } = useLang()
  const tema = TEMAS[slug]
  const meta = contenidoMeta(slug, lang)
  const modos = tema.modos.filter(m => !m.juego || disponibleEn(m.juego, lang))
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <PageMeta title={meta?.title} description={meta?.desc} path={tema.path} lang={lang} />
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <Link to={localPath('/estudiar')} className="hover:text-white/60 transition-colors">{tr({ es: 'Estudiar', en: 'Study', ca: 'Estudiar' })}</Link>
          {' / '}
          <Link to={localPath(tema.miga.path)} className="hover:text-white/60 transition-colors">{tr(tema.miga.label)}</Link>
          {' / '}
          <span className="text-white/50">{tr(tema.nombre)}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{tema.emoji}</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{meta?.title}</h1>
        </div>
      </div>

      <ContenidoTema tema={slug} lang={lang} />

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">{tr({ es: 'Practica', en: 'Practise', ca: 'Practica' })}</p>
        {modos.map(m => (
          <Link key={m.to} to={localPath(m.to)} state={{ backPath: tema.path }}
            className="block w-full group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40">
            <div className={`bg-gradient-to-br ${m.gradient} p-5 flex items-center gap-4`}>
              <span className="text-3xl">{m.emoji}</span>
              <div className="flex-1">
                <h2 className="font-black text-white text-lg">{tr(m.titulo)}</h2>
                <p className="text-white/75 text-sm leading-relaxed">{tr(m.desc)}</p>
              </div>
              <span className="w-10 h-10 shrink-0 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-white font-black text-lg">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
