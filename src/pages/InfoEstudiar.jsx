import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const DATA = {
  es: {
    h1: 'Estudiar con Juegos: Exámenes Gamificados por Temario',
    intro: 'Tuthor adapta cada juego al temario oficial de Primaria, Secundaria y Bachillerato. Exámenes de 10 preguntas sobre temas concretos. Aprueba con 5 o más aciertos.',
    cta: 'Ir a estudiar ahora →',
    categorias: [
      {
        titulo: 'Historia y Ciencias Sociales', emoji: '⏳',
        texto: 'Repasa los grandes temas de la historia con juegos adaptados al temario oficial. Cada tema combina línea temporal, personajes históricos, portadas de periódicos y fechas clave.',
        temas: [
          { nombre: 'Guerra Civil Española', desc: 'Del golpe del 36 al fin de la dictadura.', slug: 'historia-guerra-civil' },
          { nombre: 'Segunda Guerra Mundial', desc: 'De la invasión de Polonia a Hiroshima.', slug: 'historia-segunda-guerra-mundial' },
          { nombre: 'Independencia Americana', desc: 'Del motín del té a la Constitución.', slug: 'historia-independencia-americana' },
          { nombre: 'Antigua Roma', desc: 'De Rómulo al colapso del Imperio.', slug: 'historia-antigua-roma' },
          { nombre: 'Grandes Hitos de la Historia', desc: 'Los momentos que cambiaron el mundo.', slug: 'historia-hitos' },
        ],
      },
      {
        titulo: 'Matemáticas', emoji: '📐',
        texto: 'Domina el cálculo mental a través de puzzles progresivos. Cada modo de operación tiene su propio examen de 10 rondas adaptado al nivel educativo.',
        temas: [
          { nombre: 'Sumas y restas', desc: 'Operaciones básicas combinadas.', slug: 'matematicas-sumas-restas' },
          { nombre: 'Multiplicación', desc: 'Combina multiplicaciones con sumas y restas.', slug: 'matematicas-multiplicacion' },
          { nombre: 'División', desc: 'Descompón números usando divisiones exactas.', slug: 'matematicas-division' },
          { nombre: 'Geometría', desc: 'Ángulos, áreas, perímetros, Pitágoras y volúmenes.', slug: 'geometria' },
        ],
      },
      {
        titulo: 'Geografía', emoji: '🌍',
        texto: 'Aprende la geografía del mundo a través de pistas progresivas. Identifica países por su hemisferio, población, montañas, ríos e idiomas.',
        temas: [
          { nombre: 'Europa', desc: 'Identifica los países europeos.', slug: 'geografia-europa' },
          { nombre: 'América', desc: 'Aprende los países americanos.', slug: 'geografia-america' },
          { nombre: 'Asia', desc: 'El continente más grande y diverso.', slug: 'geografia-asia' },
          { nombre: 'África', desc: 'El continente más variado del planeta.', slug: 'geografia-africa' },
          { nombre: 'Oceanía', desc: 'Australia, Nueva Zelanda y las islas del Pacífico.', slug: 'geografia-oceania' },
          { nombre: 'España — Provincias', desc: 'Las 50 provincias.', slug: 'geografia-espana' },
          { nombre: 'Estados Unidos — Estados', desc: 'Los 50 estados.', slug: 'geografia-eeuu' },
        ],
      },
      {
        titulo: 'Ciencias', emoji: '🔬',
        texto: 'Exámenes de ciencias naturales y química adaptados al currículum oficial de Primaria, ESO y Bachillerato. Preguntas de opción múltiple con explicación tras cada respuesta.',
        temas: [
          { nombre: 'Tabla Periódica', desc: 'Símbolos, nombres, número atómico y grupos. 3 niveles.', slug: 'tabla-periodica' },
          { nombre: 'Estados de la Materia', desc: 'Sólido, líquido, gas y cambios de estado.', slug: 'estados-materia' },
          { nombre: 'Mezclas y Separación', desc: 'Tipos de mezcla y métodos: filtración, destilación, decantación...', slug: 'mezclas-separacion' },
          { nombre: 'Ácidos y Bases', desc: 'Escala de pH, indicadores y neutralización. ESO.', slug: 'acidos-bases' },
          { nombre: 'Átomos y Moléculas', desc: 'Estructura atómica, elementos y compuestos.', slug: 'atomos-moleculas' },
          { nombre: 'Sistema Solar', desc: 'Planetas, astros, movimientos y características. Primaria y ESO.', slug: 'sistema-solar' },
          { nombre: 'La Célula', desc: 'Tipos de célula, orgánulos y funciones. ESO.', slug: 'celula' },
          { nombre: 'Cuerpo Humano', desc: 'Sistemas digestivo, circulatorio, respiratorio y nervioso.', slug: 'cuerpo-humano' },
          { nombre: 'Seres Vivos', desc: 'Reinos, clasificación, vertebrados e invertebrados.', slug: 'seres-vivos' },
          { nombre: 'Ecosistemas', desc: 'Cadenas tróficas, biomas y adaptaciones.', slug: 'ecosistemas' },
          { nombre: 'Genética', desc: 'ADN, genes, herencia y mutaciones. ESO.', slug: 'genetica' },
          { nombre: 'Nutrición', desc: 'Macronutrientes, vitaminas y dieta saludable.', slug: 'nutricion' },
        ],
      },
    ],
  },
  en: {
    h1: 'Study with Games: Gamified Exams by Topic',
    intro: 'Tuthor adapts every game to the official syllabus for Primary, Secondary and Sixth Form. 10-question exams on specific topics. Pass with 5 or more correct answers.',
    cta: 'Start studying now →',
    categorias: [
      {
        titulo: 'History & Social Sciences', emoji: '⏳',
        texto: 'Revise the great themes of history with games aligned to the official curriculum. Each topic combines timelines, historical figures, newspaper headlines and key dates.',
        temas: [
          { nombre: 'Spanish Civil War', desc: 'From the 1936 coup to the end of the dictatorship.', slug: 'historia-guerra-civil' },
          { nombre: 'World War II', desc: 'From the invasion of Poland to Hiroshima.', slug: 'historia-segunda-guerra-mundial' },
          { nombre: 'American Independence', desc: 'From the Boston Tea Party to the Constitution.', slug: 'historia-independencia-americana' },
          { nombre: 'Ancient Rome', desc: 'From Romulus to the fall of the Empire.', slug: 'historia-antigua-roma' },
          { nombre: 'Great Milestones of History', desc: 'The moments that changed the world.', slug: 'historia-hitos' },
        ],
      },
      {
        titulo: 'Mathematics', emoji: '📐',
        texto: 'Master mental arithmetic through progressive puzzles. Each operation mode has its own 10-round exam adapted to the student\'s educational level.',
        temas: [
          { nombre: 'Addition & subtraction', desc: 'Combined basic operations.', slug: 'matematicas-sumas-restas' },
          { nombre: 'Multiplication', desc: 'Combine multiplication with addition and subtraction.', slug: 'matematicas-multiplicacion' },
          { nombre: 'Division', desc: 'Break down numbers using exact divisions.', slug: 'matematicas-division' },
          { nombre: 'Geometry', desc: 'Angles, areas, perimeters, Pythagoras and volumes.', slug: 'geometria' },
        ],
      },
      {
        titulo: 'Geography', emoji: '🌍',
        texto: 'Learn world geography through progressive clues. Identify countries by hemisphere, population, mountains, rivers and languages.',
        temas: [
          { nombre: 'Europe', desc: 'Identify European countries.', slug: 'geografia-europa' },
          { nombre: 'The Americas', desc: 'Learn the countries of the Americas.', slug: 'geografia-america' },
          { nombre: 'Asia', desc: 'The largest and most diverse continent.', slug: 'geografia-asia' },
          { nombre: 'Africa', desc: 'The most varied continent on the planet.', slug: 'geografia-africa' },
          { nombre: 'Oceania', desc: 'Australia, New Zealand and the Pacific islands.', slug: 'geografia-oceania' },
          { nombre: 'Spain — Provinces', desc: 'All 50 provinces.', slug: 'geografia-espana' },
          { nombre: 'United States — States', desc: 'All 50 states.', slug: 'geografia-eeuu' },
        ],
      },
      {
        titulo: 'Science', emoji: '🔬',
        texto: 'Natural science and chemistry exams aligned to the official Primary, Secondary and Sixth Form syllabus. Multiple choice questions with an explanation after each answer.',
        temas: [
          { nombre: 'Periodic Table', desc: 'Symbols, names, atomic number and groups. 3 levels.', slug: 'tabla-periodica' },
          { nombre: 'States of Matter', desc: 'Solid, liquid, gas and changes of state.', slug: 'estados-materia' },
          { nombre: 'Mixtures & Separation', desc: 'Types of mixture and methods: filtration, distillation, decantation...', slug: 'mezclas-separacion' },
          { nombre: 'Acids & Bases', desc: 'pH scale, indicators and neutralisation. Secondary.', slug: 'acidos-bases' },
          { nombre: 'Atoms & Molecules', desc: 'Atomic structure, elements and compounds.', slug: 'atomos-moleculas' },
          { nombre: 'Solar System', desc: 'Planets, celestial bodies, movements and features. Primary & Secondary.', slug: 'sistema-solar' },
          { nombre: 'The Cell', desc: 'Cell types, organelles and functions. Secondary.', slug: 'celula' },
          { nombre: 'Human Body', desc: 'Digestive, circulatory, respiratory and nervous systems.', slug: 'cuerpo-humano' },
          { nombre: 'Living Things', desc: 'Kingdoms, classification, vertebrates and invertebrates.', slug: 'seres-vivos' },
          { nombre: 'Ecosystems', desc: 'Food chains, biomes and adaptations.', slug: 'ecosistemas' },
          { nombre: 'Genetics', desc: 'DNA, genes, heredity and mutations. Secondary.', slug: 'genetica' },
          { nombre: 'Nutrition', desc: 'Macronutrients, vitamins and healthy diet.', slug: 'nutricion' },
        ],
      },
    ],
  },
  ca: {
    h1: 'Estudiar amb Jocs: Exàmens Gamificats per Temari',
    intro: 'Tuthor adapta cada joc al temari oficial de Primària, Secundària i Batxillerat. Exàmens de 10 preguntes sobre temes concrets. Aprova amb 5 o més encerts.',
    cta: 'Anar a estudiar ara →',
    categorias: [
      {
        titulo: 'Història i Ciències Socials', emoji: '⏳',
        texto: 'Repassa els grans temes de la història amb jocs adaptats al temari oficial. Cada tema combina línia temporal, personatges històrics, portades de diaris i dates clau.',
        temas: [
          { nombre: 'Guerra Civil Espanyola', desc: 'Del cop del 36 al final de la dictadura.', slug: 'historia-guerra-civil' },
          { nombre: 'Segona Guerra Mundial', desc: 'De la invasió de Polònia a Hiroshima.', slug: 'historia-segunda-guerra-mundial' },
          { nombre: 'Independència Americana', desc: 'Del motí del te a la Constitució.', slug: 'historia-independencia-americana' },
          { nombre: 'Antiga Roma', desc: 'De Ròmul al col·lapse de l\'Imperi.', slug: 'historia-antigua-roma' },
          { nombre: 'Grans Fites de la Història', desc: 'Els moments que van canviar el món.', slug: 'historia-hitos' },
        ],
      },
      {
        titulo: 'Matemàtiques', emoji: '📐',
        texto: 'Domina el càlcul mental a través de puzzles progressius. Cada mode d\'operació té el seu propi examen de 10 rondes adaptat al nivell educatiu.',
        temas: [
          { nombre: 'Sumes i restes', desc: 'Operacions bàsiques combinades.', slug: 'matematicas-sumas-restas' },
          { nombre: 'Multiplicació', desc: 'Combina multiplicacions amb sumes i restes.', slug: 'matematicas-multiplicacion' },
          { nombre: 'Divisió', desc: 'Descompon números fent servir divisions exactes.', slug: 'matematicas-division' },
          { nombre: 'Geometria', desc: 'Angles, àrees, perímetres, Pitàgores i volums.', slug: 'geometria' },
        ],
      },
      {
        titulo: 'Geografia', emoji: '🌍',
        texto: 'Aprèn la geografia del món a través de pistes progressives. Identifica països pel seu hemisferi, població, muntanyes, rius i idiomes.',
        temas: [
          { nombre: 'Europa', desc: 'Identifica els països europeus.', slug: 'geografia-europa' },
          { nombre: 'Amèrica', desc: 'Aprèn els països americans.', slug: 'geografia-america' },
          { nombre: 'Àsia', desc: 'El continent més gran i divers.', slug: 'geografia-asia' },
          { nombre: 'Àfrica', desc: 'El continent més variat del planeta.', slug: 'geografia-africa' },
          { nombre: 'Oceania', desc: 'Austràlia, Nova Zelanda i les illes del Pacífic.', slug: 'geografia-oceania' },
          { nombre: 'Espanya — Províncies', desc: 'Les 50 províncies.', slug: 'geografia-espana' },
          { nombre: 'Estats Units — Estats', desc: 'Els 50 estats.', slug: 'geografia-eeuu' },
        ],
      },
      {
        titulo: 'Ciències', emoji: '🔬',
        texto: 'Exàmens de ciències naturals i química adaptats al currículum oficial de Primària, ESO i Batxillerat. Preguntes d\'opció múltiple amb explicació després de cada resposta.',
        temas: [
          { nombre: 'Taula Periòdica', desc: 'Símbols, noms, nombre atòmic i grups. 3 nivells.', slug: 'tabla-periodica' },
          { nombre: 'Estats de la Matèria', desc: 'Sòlid, líquid, gas i canvis d\'estat.', slug: 'estados-materia' },
          { nombre: 'Mescles i Separació', desc: 'Tipus de mescla i mètodes: filtració, destil·lació, decantació...', slug: 'mezclas-separacion' },
          { nombre: 'Àcids i Bases', desc: 'Escala de pH, indicadors i neutralització. ESO.', slug: 'acidos-bases' },
          { nombre: 'Àtoms i Molècules', desc: 'Estructura atòmica, elements i compostos.', slug: 'atomos-moleculas' },
          { nombre: 'Sistema Solar', desc: 'Planetes, astres, moviments i característiques. Primària i ESO.', slug: 'sistema-solar' },
          { nombre: 'La Cèl·lula', desc: 'Tipus de cèl·lula, orgànuls i funcions. ESO.', slug: 'celula' },
          { nombre: 'Cos Humà', desc: 'Sistemes digestiu, circulatori, respiratori i nerviós.', slug: 'cuerpo-humano' },
          { nombre: 'Éssers Vius', desc: 'Regnes, classificació, vertebrats i invertebrats.', slug: 'seres-vivos' },
          { nombre: 'Ecosistemes', desc: 'Cadenes tròfiques, biomes i adaptacions.', slug: 'ecosistemas' },
          { nombre: 'Genètica', desc: 'ADN, gens, herència i mutacions. ESO.', slug: 'genetica' },
          { nombre: 'Nutrició', desc: 'Macronutrients, vitamines i dieta saludable.', slug: 'nutricion' },
        ],
      },
    ],
  },
}

export default function InfoEstudiar() {
  const { lang, localPath } = useLang()
  const d = DATA[lang] || DATA.es
  const verMas = lang === 'en' ? 'See more →' : lang === 'ca' ? 'Veure més →' : 'Ver más →'

  return (
    <div className="relative z-10">
      <div className="px-4 sm:px-8 py-10 max-w-4xl mx-auto">
        <Link to={localPath('/')} className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          ← {lang === 'en' ? 'Home' : lang === 'ca' ? 'Inici' : 'Inicio'}
        </Link>
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">{d.h1}</h1>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">{d.intro}</p>
        </header>
      </div>

      <div className="bg-[#f5f5f0] text-gray-900 rounded-t-[2rem] sm:rounded-t-[3rem]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10">

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-estudiar-top" style={{ minHeight: '90px' }} />

          {d.categorias.map((cat, catIdx) => (
            <section key={cat.titulo}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{cat.emoji}</span>
                <h2 className="text-2xl font-black text-gray-900">{cat.titulo}</h2>
              </div>
              <p className="text-gray-500 leading-relaxed mb-6 max-w-3xl">{cat.texto}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                {cat.temas.map(t => (
                    <div key={t.nombre} className="bg-white rounded-2xl border border-gray-200 p-5">
                      <h3 className="font-black text-gray-900 mb-1">{t.nombre}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                      {t.slug && (
                        <Link to={localPath(`/info/estudiar/${t.slug}`)}
                          className="inline-block mt-3 text-teal-600 text-sm font-semibold hover:text-teal-500 transition-colors">
                          {verMas}
                        </Link>
                      )}
                    </div>
                  ))}
              </div>

              {catIdx < d.categorias.length - 1 && (
                <>
                  <aside className="ad-slot" aria-label="Publicidad" data-ad-slot={`info-estudiar-${catIdx}`} style={{ minHeight: '90px', marginTop: '2rem' }} />
                  <hr className="border-gray-200 mt-6" />
                </>
              )}
            </section>
          ))}

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-estudiar-bottom" style={{ minHeight: '90px' }} />

          <footer className="text-center pt-4">
            <Link to={localPath('/estudiar')}
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              {d.cta}
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}
