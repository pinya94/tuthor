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
const BIOLOGIA = { label: T3('Biología', 'Biology', 'Biologia'), path: '/estudiar/biologia' }
const QUIMICA = { label: T3('Química', 'Chemistry', 'Química'), path: '/estudiar/quimica' }

const TEMAS = {
  'texto-argumentativo': {
    path: '/estudiar/idiomas/espanol/literatura/texto-argumentativo', miga: ESPANOL, emoji: '🗣️', nombre: T3('El texto argumentativo', 'The argumentative text', 'El text argumentatiu'),
    modos: [
      { to: '/juegos/detective-textos', juego: 'detective-textos', emoji: '🔎', gradient: 'from-amber-500 to-orange-700', titulo: T3('Detective de Textos (juego)', 'Text Detective (game)', 'Detectiu de Textos (joc)'), desc: T3('Descubre el tipo de cada texto, su intención y sus funciones del lenguaje.', 'Work out each text’s type, purpose and language functions.', 'Descobreix el tipus de cada text, la intenció i les funcions del llenguatge.') },
      { to: '/examen/espanol-textos-test', emoji: '📝', gradient: 'from-teal-500 to-cyan-700', titulo: T3('Examen de los textos', 'Types of text exam', 'Examen dels textos'), desc: T3('Tipos de texto, funciones del lenguaje y propiedades, con explicación.', 'Text types, language functions and text properties, with explanations.', 'Tipus de text, funcions del llenguatge i propietats, amb explicació.') },
      { to: '/estudiar/idiomas/espanol/literatura/tipos-de-texto', emoji: '📝', gradient: 'from-sky-500 to-indigo-700', titulo: T3('Los tipos de texto', 'Text types', 'Els tipus de text'), desc: T3('Narrativo, descriptivo, expositivo, argumentativo, dialogado e instructivo.', 'Narrative, descriptive, expository, argumentative, dialogue and instructional.', 'Narratiu, descriptiu, expositiu, argumentatiu, dialogat i instructiu.') },
    ],
  },
  'los-sentidos': {
    path: '/estudiar/biologia/los-sentidos', miga: BIOLOGIA, emoji: '👁️', nombre: T3('Los sentidos', 'The senses', 'Els sentits'),
    modos: [
      { to: '/juegos/ojo-y-oido', emoji: '👂', gradient: 'from-sky-600 to-violet-800', titulo: T3('Ojo y Oído (juego)', 'Eye and Ear (game)', 'Ull i Orella (joc)'), desc: T3('Toca las partes del ojo y del oído y sigue el camino de la luz y del sonido.', 'Tap the parts of the eye and ear and follow the path of light and sound.', 'Toca les parts de l’ull i de l’orella i segueix el camí de la llum i del so.') },
      { to: '/examen/ojo-y-oido-test', emoji: '📝', gradient: 'from-indigo-500 to-violet-700', titulo: T3('Examen del ojo y el oído', 'Eye and ear exam', 'Examen de l’ull i l’orella'), desc: T3('Diez preguntas con la mecánica del juego, sin reloj y con nota.', 'Ten questions using the game mechanic, no timer and a mark.', 'Deu preguntes amb la mecànica del joc, sense rellotge i amb nota.') },
      { to: '/estudiar/biologia/cuerpo-humano', emoji: '💪', gradient: 'from-rose-500 to-red-700', titulo: T3('El cuerpo humano', 'The human body', 'El cos humà'), desc: T3('Los aparatos y sistemas: nutrición, relación y reproducción.', 'The body systems: nutrition, interaction and reproduction.', 'Els aparells i sistemes: nutrició, relació i reproducció.') },
      { to: '/juegos/rayos-x', emoji: '🦴', gradient: 'from-sky-500 to-indigo-700', titulo: T3('Rayos X (juego)', 'X-Ray (game)', 'Raigs X (joc)'), desc: T3('Localiza órganos, huesos y músculos en el cuerpo, contra reloj.', 'Find organs, bones and muscles on the body, against the clock.', 'Localitza òrgans, ossos i músculs al cos, contra rellotge.') },
      { to: '/examen/cuerpo-humano', emoji: '📝', gradient: 'from-emerald-500 to-teal-700', titulo: T3('Examen del cuerpo humano', 'Human body exam', 'Examen del cos humà'), desc: T3('Tipo test con la explicación de cada respuesta.', 'Multiple choice with every answer explained.', 'Tipus test amb l’explicació de cada resposta.') },
    ],
  },
  'tipos-de-texto': {
    path: '/estudiar/idiomas/espanol/literatura/tipos-de-texto', miga: ESPANOL, emoji: '📝', nombre: T3('Los tipos de texto', 'Text types', 'Els tipus de text'),
    modos: [
      { to: '/juegos/detective-textos', juego: 'detective-textos', emoji: '🔎', gradient: 'from-amber-500 to-orange-700', titulo: T3('Detective de Textos (juego)', 'Text Detective (game)', 'Detectiu de Textos (joc)'), desc: T3('Descubre el tipo de cada texto, su intención y sus funciones del lenguaje.', 'Work out each text’s type, purpose and language functions.', 'Descobreix el tipus de cada text, la intenció i les funcions del llenguatge.') },
      { to: '/examen/espanol-textos-test', emoji: '📝', gradient: 'from-teal-500 to-cyan-700', titulo: T3('Examen de los textos', 'Types of text exam', 'Examen dels textos'), desc: T3('Tipos de texto, funciones del lenguaje y propiedades, con explicación.', 'Text types, language functions and text properties, with explanations.', 'Tipus de text, funcions del llenguatge i propietats, amb explicació.') },
      { to: '/estudiar/idiomas/espanol/literatura/la-descripcion', emoji: '🖼️', gradient: 'from-sky-500 to-indigo-700', titulo: T3('La descripción', 'Description', 'La descripció'), desc: T3('Prosopografía, etopeya, retrato, topografía… con ejemplos.', 'Prosopografía, etopeya, retrato, topografía… with examples.', 'Prosopografia, etopeia, retrat, topografia… amb exemples.') },
      { to: '/estudiar/idiomas/espanol/literatura/texto-argumentativo', emoji: '🗣️', gradient: 'from-rose-500 to-red-700', titulo: T3('El texto argumentativo', 'The argumentative text', 'El text argumentatiu'), desc: T3('Tesis, argumentos, estructuras y tipos de argumentos.', 'Thesis, arguments, structures and types of argument.', 'Tesi, arguments, estructures i tipus d’arguments.') },
    ],
  },
  'provincias-de-espana': {
    path: '/estudiar/geografia/provincias-de-espana', miga: GEOGRAFIA, emoji: '🗺️', nombre: T3('Las provincias de España', 'Spain’s provinces', 'Les províncies d’Espanya'),
    modos: [
      { to: '/examen/geomapa-espana', emoji: '🗺️', gradient: 'from-amber-500 to-red-700', titulo: T3('Mapa de las comunidades autónomas', 'Map of the autonomous communities', 'Mapa de les comunitats autònomes'), desc: T3('Toca cada comunidad en el mapa de España.', 'Tap each community on the map of Spain.', 'Toca cada comunitat al mapa d’Espanya.') },
      { to: '/estudiar/geografia/espana', emoji: '🇪🇸', gradient: 'from-red-500 to-amber-600', titulo: T3('España: comunidades y ríos', 'Spain: regions and rivers', 'Espanya: comunitats i rius'), desc: T3('Las 17 comunidades autónomas y las vertientes de los ríos.', 'The 17 autonomous communities and the river basins.', 'Les 17 comunitats autònomes i els vessants dels rius.') },
      { to: '/estudiar/geografia/relieve-de-espana', emoji: '⛰️', gradient: 'from-emerald-600 to-teal-800', titulo: T3('El relieve de España', 'The relief of Spain', 'El relleu d’Espanya'), desc: T3('La Meseta, los sistemas montañosos y los picos más altos.', 'The Meseta, the mountain ranges and the highest peaks.', 'La Meseta, els sistemes muntanyosos i els cims més alts.') },
    ],
  },
  'reacciones-quimicas': {
    path: '/estudiar/quimica/reacciones-quimicas', miga: QUIMICA, emoji: '⚗️', nombre: T3('Las reacciones químicas', 'Chemical reactions', 'Les reaccions químiques'),
    modos: [
      { to: '/juegos/balanza-ecuaciones', emoji: '⚖️', gradient: 'from-violet-500 to-purple-700', titulo: T3('Balanza de Ecuaciones (juego)', 'Equation Balance (game)', 'Balança d’Equacions (joc)'), desc: T3('Ajusta cada reacción poniendo los coeficientes hasta que la balanza se equilibre.', 'Balance each reaction by setting the coefficients until the scales level out.', 'Ajusta cada reacció posant els coeficients fins que la balança s’equilibri.') },
      { to: '/examen/balanza-ecuaciones-test', emoji: '📝', gradient: 'from-indigo-500 to-violet-700', titulo: T3('Examen de ajustar reacciones', 'Balancing equations exam', 'Examen d’ajustar reaccions'), desc: T3('Con la mecánica del juego, sin cronómetro.', 'Using the game mechanic, with no timer.', 'Amb la mecànica del joc, sense cronòmetre.') },
      { to: '/juegos/receta-quimica', emoji: '🧪', gradient: 'from-emerald-500 to-teal-700', titulo: T3('La Receta Química (juego)', 'The Chemical Recipe (game)', 'La Recepta Química (joc)'), desc: T3('Estequiometría: cuánto reactivo hace falta y cuánto producto sale.', 'Stoichiometry: how much reactant you need and how much product you get.', 'Estequiometria: quant reactiu cal i quant producte en surt.') },
    ],
  },
  'la-descripcion': {
    path: '/estudiar/idiomas/espanol/literatura/la-descripcion', miga: ESPANOL, emoji: '🖼️', nombre: T3('La descripción', 'Description', 'La descripció'),
    modos: [
      { to: '/juegos/detective-textos', juego: 'detective-textos', emoji: '🔎', gradient: 'from-amber-500 to-orange-700', titulo: T3('Detective de Textos (juego)', 'Text Detective (game)', 'Detectiu de Textos (joc)'), desc: T3('¿Narración, descripción, diálogo, exposición o argumentación? Descúbrelo en cada texto.', 'Narration, description, dialogue, exposition or argument? Find out in each text.', 'Narració, descripció, diàleg, exposició o argumentació? Descobreix-ho a cada text.') },
      { to: '/juegos/cazafiguras', juego: 'cazafiguras', emoji: '🎭', gradient: 'from-purple-500 to-indigo-700', titulo: T3('Cazafiguras (juego)', 'Figure Hunter (game)', 'Caçafigures (joc)'), desc: T3('Las comparaciones y metáforas de las descripciones subjetivas.', 'The similes and metaphors of subjective descriptions.', 'Les comparacions i metàfores de les descripcions subjectives.') },
      { to: '/examen/espanol-textos-test', emoji: '📝', gradient: 'from-teal-500 to-cyan-700', titulo: T3('Examen de los textos', 'Types of text exam', 'Examen dels textos'), desc: T3('Tipos de texto, funciones del lenguaje y propiedades, con explicación.', 'Text types, language functions and text properties, with explanations.', 'Tipus de text, funcions del llenguatge i propietats, amb explicació.') },
      { to: '/estudiar/idiomas/espanol/literatura/generos-literarios', emoji: '📖', gradient: 'from-rose-500 to-red-700', titulo: T3('Géneros literarios', 'Literary genres', 'Gèneres literaris'), desc: T3('Narrativa, lírica y teatro: dónde aparece la descripción.', 'Narrative, poetry and drama: where description appears.', 'Narrativa, lírica i teatre: on apareix la descripció.') },
    ],
  },
  'relieve-de-espana': {
    path: '/estudiar/geografia/relieve-de-espana', miga: GEOGRAFIA, emoji: '⛰️', nombre: T3('El relieve de España', 'The relief of Spain', 'El relleu d’Espanya'),
    modos: [
      { to: '/juegos/rios-montanas', emoji: '🏞️', gradient: 'from-emerald-600 to-teal-800', titulo: T3('Ríos y Montañas (juego)', 'Rivers and Mountains (game)', 'Rius i Muntanyes (joc)'), desc: T3('Señala en el mapa cada sistema montañoso y cada río.', 'Point to each mountain range and river on the map.', 'Assenyala al mapa cada sistema muntanyós i cada riu.') },
      { to: '/examen/rios-montanas-test', emoji: '📝', gradient: 'from-teal-600 to-cyan-800', titulo: T3('Examen de ríos y montañas de España', 'Rivers and mountains of Spain exam', 'Examen de rius i muntanyes d’Espanya'), desc: T3('Con la mecánica del juego, sin cronómetro.', 'Using the game mechanic, with no timer.', 'Amb la mecànica del joc, sense cronòmetre.') },
      { to: '/estudiar/geografia/espana', emoji: '🇪🇸', gradient: 'from-amber-500 to-red-700', titulo: T3('España: comunidades y ríos', 'Spain: regions and rivers', 'Espanya: comunitats i rius'), desc: T3('Las 17 comunidades autónomas y las vertientes de los ríos.', 'The 17 autonomous communities and the river basins.', 'Les 17 comunitats autònomes i els vessants dels rius.') },
    ],
  },
  'clima-de-espana': {
    path: '/estudiar/geografia/clima-de-espana', miga: GEOGRAFIA, emoji: '🌦️', nombre: T3('Los climas de España', 'The climates of Spain', 'Els climes d’Espanya'),
    modos: [
      { to: '/juegos/climograma', emoji: '🌧️', gradient: 'from-sky-500 to-blue-700', titulo: T3('Climograma (juego)', 'Climate Graph (game)', 'Climograma (joc)'), desc: T3('Lee cada climograma y di qué clima es.', 'Read each climate graph and say which climate it is.', 'Llegeix cada climograma i digues quin clima és.') },
      { to: '/examen/climograma-test', emoji: '📝', gradient: 'from-indigo-500 to-sky-700', titulo: T3('Examen de climogramas', 'Climate graphs exam', 'Examen de climogrames'), desc: T3('Con la mecánica del juego, sin cronómetro.', 'Using the game mechanic, with no timer.', 'Amb la mecànica del joc, sense cronòmetre.') },
      { to: '/juegos/el-tiempo', emoji: '⛅', gradient: 'from-cyan-500 to-teal-700', titulo: T3('El Tiempo (juego)', 'The Weather (game)', 'El Temps (joc)'), desc: T3('El tiempo no es el clima: lee la previsión de cada día.', 'Weather is not climate: read each day’s forecast.', 'El temps no és el clima: llegeix la previsió de cada dia.') },
    ],
  },
  fotosintesis: {
    path: '/estudiar/biologia/fotosintesis', miga: BIOLOGIA, emoji: '🌿', nombre: T3('La fotosíntesis', 'Photosynthesis', 'La fotosíntesi'),
    modos: [
      { to: '/juegos/cadena-alimentaria', emoji: '🦊', gradient: 'from-green-600 to-emerald-800', titulo: T3('Cadena Alimentaria (juego)', 'Food Chain (game)', 'Cadena Alimentària (joc)'), desc: T3('Las plantas son los productores: coloca a cada ser vivo en su papel en la cadena.', 'Plants are the producers: put each living thing in its role in the food chain.', 'Les plantes són els productors: col·loca cada ésser viu en el seu paper a la cadena.') },
      { to: '/examen/ciclo/ciclo-calvin', emoji: '🔁', gradient: 'from-lime-600 to-green-800', titulo: T3('Ordena el ciclo de Calvin', 'Order the Calvin cycle', 'Ordena el cicle de Calvin'), desc: T3('La fase oscura de la fotosíntesis, paso a paso (Bachillerato).', 'The light-independent stage of photosynthesis, step by step (upper secondary).', 'La fase fosca de la fotosíntesi, pas a pas (Batxillerat).') },
      { to: '/estudiar/biologia/celula', emoji: '🔬', gradient: 'from-teal-600 to-cyan-800', titulo: T3('La célula (cloroplastos y mitocondrias)', 'The cell (chloroplasts and mitochondria)', 'La cèl·lula (cloroplasts i mitocondris)'), desc: T3('Dónde se hacen la fotosíntesis y la respiración.', 'Where photosynthesis and respiration take place.', 'On es fan la fotosíntesi i la respiració.') },
    ],
  },
  'ciclo-del-agua': {
    path: '/estudiar/geografia/ciclo-del-agua', miga: GEOGRAFIA, emoji: '💧', nombre: T3('El ciclo del agua', 'The water cycle', 'El cicle de l’aigua'),
    modos: [
      { to: '/examen/ciclo/ciclo-agua', emoji: '🔁', gradient: 'from-sky-500 to-blue-700', titulo: T3('Ordena el ciclo del agua', 'Order the water cycle', 'Ordena el cicle de l’aigua'), desc: T3('Coloca cada fase antes o después de las demás.', 'Place each stage before or after the others.', 'Col·loca cada fase abans o després de les altres.') },
      { to: '/juegos/cambio-estado', emoji: '🌡️', gradient: 'from-cyan-500 to-teal-700', titulo: T3('Cambio de Estado (juego)', 'Change of State (game)', 'Canvi d’Estat (joc)'), desc: T3('Evaporación, condensación, fusión…: di en qué estado está cada sustancia.', 'Evaporation, condensation, melting…: say what state each substance is in.', 'Evaporació, condensació, fusió…: digues en quin estat és cada substància.') },
      { to: '/juegos/el-tiempo', emoji: '⛅', gradient: 'from-indigo-500 to-sky-700', titulo: T3('El Tiempo (juego)', 'The Weather (game)', 'El Temps (joc)'), desc: T3('Lee la previsión: nubes, lluvia y temperaturas.', 'Read the forecast: clouds, rain and temperatures.', 'Llegeix la previsió: núvols, pluja i temperatures.') },
    ],
  },
  'generos-literarios': {
    path: '/estudiar/idiomas/espanol/literatura/generos-literarios', miga: ESPANOL, emoji: '📖', nombre: T3('Géneros literarios', 'Literary genres', 'Gèneres literaris'),
    modos: [
      { to: '/examen/espanol-literatura-test', emoji: '📝', gradient: 'from-indigo-500 to-blue-700', titulo: T3('Examen de Literatura', 'Literature exam', 'Examen de Literatura'), desc: T3('Géneros, obras, autores y épocas de la literatura española, con explicación.', 'Genres, works, authors and periods of Spanish literature, with explanations.', 'Gèneres, obres, autors i èpoques de la literatura espanyola, amb explicació.') },
      { to: '/juegos/la-biblioteca', juego: 'la-biblioteca', emoji: '📚', gradient: 'from-amber-500 to-orange-700', titulo: T3('La Biblioteca (juego)', 'La Biblioteca (game)', 'La Biblioteca (joc)'), desc: T3('Literatura española: obras, autores y épocas.', 'Spanish literature: works, authors and periods.', 'Literatura espanyola: obres, autors i èpoques.') },
      { to: '/juegos/detective-textos', juego: 'detective-textos', emoji: '📑', gradient: 'from-teal-500 to-cyan-700', titulo: T3('Detective de Textos (juego)', 'Detective de Textos (game)', 'Detective de Textos (joc)'), desc: T3('Tipos de texto, la comunicación y las funciones del lenguaje.', 'Types of text, communication and the functions of language.', 'Tipus de text, la comunicació i les funcions del llenguatge.') },
      { to: '/estudiar/idiomas/espanol/literatura/la-descripcion', emoji: '🖼️', gradient: 'from-sky-500 to-indigo-700', titulo: T3('La descripción', 'Description', 'La descripció'), desc: T3('Tipos, rasgos y ejemplos: prosopografía, etopeya, retrato, topografía…', 'Types, features and examples: prosopografía, etopeya, retrato, topografía…', 'Tipus, trets i exemples: prosopografia, etopeia, retrat, topografia…') },
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
