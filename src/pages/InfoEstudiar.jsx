import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const CIENCIAS_SLUGS_ES = {
  'Tabla Periódica': 'tabla-periodica',
  'Estados de la Materia': 'estados-materia',
  'Mezclas y Separación': 'mezclas-separacion',
  'Ácidos y Bases': 'acidos-bases',
  'Átomos y Moléculas': 'atomos-moleculas',
  'Sistema Solar': 'sistema-solar',
  'La Célula': 'celula',
  'Geometría': 'geometria',
}
const CIENCIAS_SLUGS_EN = {
  'Periodic Table': 'tabla-periodica',
  'States of Matter': 'estados-materia',
  'Mixtures & Separation': 'mezclas-separacion',
  'Acids & Bases': 'acidos-bases',
  'Atoms & Molecules': 'atomos-moleculas',
  'Solar System': 'sistema-solar',
  'The Cell': 'celula',
  'Geometry': 'geometria',
}
const CIENCIAS_SLUGS_CA = {
  'Taula Periòdica': 'tabla-periodica',
  'Estats de la Matèria': 'estados-materia',
  'Mescles i Separació': 'mezclas-separacion',
  'Àcids i Bases': 'acidos-bases',
  'Àtoms i Molècules': 'atomos-moleculas',
  'Sistema Solar': 'sistema-solar',
  'La Cèl·lula': 'celula',
  'Geometria': 'geometria',
}

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
          { nombre: 'Guerra Civil Española', desc: 'Del golpe del 36 al fin de la dictadura.' },
          { nombre: 'Segunda Guerra Mundial', desc: 'De la invasión de Polonia a Hiroshima.' },
          { nombre: 'Independencia Americana', desc: 'Del motín del té a la Constitución.' },
          { nombre: 'Antigua Roma', desc: 'De Rómulo al colapso del Imperio.' },
          { nombre: 'Grandes Hitos de la Historia', desc: 'Los momentos que cambiaron el mundo.' },
        ],
      },
      {
        titulo: 'Matemáticas', emoji: '📐',
        texto: 'Domina el cálculo mental a través de puzzles progresivos. Cada modo de operación tiene su propio examen de 10 rondas adaptado al nivel educativo.',
        temas: [
          { nombre: 'Sumas y restas', desc: 'Operaciones básicas combinadas.' },
          { nombre: 'Multiplicación', desc: 'Combina multiplicaciones con sumas y restas.' },
          { nombre: 'División', desc: 'Descompón números usando divisiones exactas.' },
        ],
      },
      {
        titulo: 'Geografía', emoji: '🌍',
        texto: 'Aprende la geografía del mundo a través de pistas progresivas. Identifica países por su hemisferio, población, montañas, ríos e idiomas.',
        temas: [
          { nombre: 'Europa', desc: 'Identifica los países europeos.' },
          { nombre: 'América', desc: 'Aprende los países americanos.' },
          { nombre: 'Asia', desc: 'El continente más grande y diverso.' },
          { nombre: 'África', desc: 'El continente más variado del planeta.' },
          { nombre: 'Oceanía', desc: 'Australia, Nueva Zelanda y las islas del Pacífico.' },
          { nombre: 'España — Provincias', desc: 'Las 50 provincias.' },
          { nombre: 'Estados Unidos — Estados', desc: 'Los 50 estados.' },
        ],
      },
      {
        titulo: 'Ciencias', emoji: '🔬',
        texto: 'Exámenes de ciencias naturales y química adaptados al currículum oficial de Primaria, ESO y Bachillerato. Preguntas de opción múltiple con explicación tras cada respuesta.',
        temas: [
          { nombre: 'Tabla Periódica', desc: 'Símbolos, nombres, número atómico y grupos. 3 niveles.' },
          { nombre: 'Estados de la Materia', desc: 'Sólido, líquido, gas y cambios de estado.' },
          { nombre: 'Mezclas y Separación', desc: 'Tipos de mezcla y métodos: filtración, destilación, decantación...' },
          { nombre: 'Ácidos y Bases', desc: 'Escala de pH, indicadores y neutralización. ESO.' },
          { nombre: 'Átomos y Moléculas', desc: 'Estructura atómica, elementos y compuestos.' },
          { nombre: 'Sistema Solar', desc: 'Planetas, astros, movimientos y características. Primaria y ESO.' },
          { nombre: 'La Célula', desc: 'Tipos de célula, orgánulos y funciones. ESO.' },
          { nombre: 'Geometría', desc: 'Ángulos, áreas, perímetros, Pitágoras y volúmenes.' },
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
          { nombre: 'Spanish Civil War', desc: 'From the 1936 coup to the end of the dictatorship.' },
          { nombre: 'World War II', desc: 'From the invasion of Poland to Hiroshima.' },
          { nombre: 'American Independence', desc: 'From the Boston Tea Party to the Constitution.' },
          { nombre: 'Ancient Rome', desc: 'From Romulus to the fall of the Empire.' },
          { nombre: 'Great Milestones of History', desc: 'The moments that changed the world.' },
        ],
      },
      {
        titulo: 'Mathematics', emoji: '📐',
        texto: 'Master mental arithmetic through progressive puzzles. Each operation mode has its own 10-round exam adapted to the student\'s educational level.',
        temas: [
          { nombre: 'Addition & subtraction', desc: 'Combined basic operations.' },
          { nombre: 'Multiplication', desc: 'Combine multiplication with addition and subtraction.' },
          { nombre: 'Division', desc: 'Break down numbers using exact divisions.' },
        ],
      },
      {
        titulo: 'Geography', emoji: '🌍',
        texto: 'Learn world geography through progressive clues. Identify countries by hemisphere, population, mountains, rivers and languages.',
        temas: [
          { nombre: 'Europe', desc: 'Identify European countries.' },
          { nombre: 'The Americas', desc: 'Learn the countries of the Americas.' },
          { nombre: 'Asia', desc: 'The largest and most diverse continent.' },
          { nombre: 'Africa', desc: 'The most varied continent on the planet.' },
          { nombre: 'Oceania', desc: 'Australia, New Zealand and the Pacific islands.' },
          { nombre: 'Spain — Provinces', desc: 'All 50 provinces.' },
          { nombre: 'United States — States', desc: 'All 50 states.' },
        ],
      },
      {
        titulo: 'Science', emoji: '🔬',
        texto: 'Natural science and chemistry exams aligned to the official Primary, Secondary and Sixth Form syllabus. Multiple choice questions with an explanation after each answer.',
        temas: [
          { nombre: 'Periodic Table', desc: 'Symbols, names, atomic number and groups. 3 levels.' },
          { nombre: 'States of Matter', desc: 'Solid, liquid, gas and changes of state.' },
          { nombre: 'Mixtures & Separation', desc: 'Types of mixture and methods: filtration, distillation, decantation...' },
          { nombre: 'Acids & Bases', desc: 'pH scale, indicators and neutralisation. Secondary.' },
          { nombre: 'Atoms & Molecules', desc: 'Atomic structure, elements and compounds.' },
          { nombre: 'Solar System', desc: 'Planets, celestial bodies, movements and features. Primary & Secondary.' },
          { nombre: 'The Cell', desc: 'Cell types, organelles and functions. Secondary.' },
          { nombre: 'Geometry', desc: 'Angles, areas, perimeters, Pythagoras and volumes.' },
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
          { nombre: 'Guerra Civil Espanyola', desc: 'Del cop del 36 al final de la dictadura.' },
          { nombre: 'Segona Guerra Mundial', desc: 'De la invasió de Polònia a Hiroshima.' },
          { nombre: 'Independència Americana', desc: 'Del motí del te a la Constitució.' },
          { nombre: 'Antiga Roma', desc: 'De Ròmul al col·lapse de l\'Imperi.' },
          { nombre: 'Grans Fites de la Història', desc: 'Els moments que van canviar el món.' },
        ],
      },
      {
        titulo: 'Matemàtiques', emoji: '📐',
        texto: 'Domina el càlcul mental a través de puzzles progressius. Cada mode d\'operació té el seu propi examen de 10 rondes adaptat al nivell educatiu.',
        temas: [
          { nombre: 'Sumes i restes', desc: 'Operacions bàsiques combinades.' },
          { nombre: 'Multiplicació', desc: 'Combina multiplicacions amb sumes i restes.' },
          { nombre: 'Divisió', desc: 'Descompon números fent servir divisions exactes.' },
        ],
      },
      {
        titulo: 'Geografia', emoji: '🌍',
        texto: 'Aprèn la geografia del món a través de pistes progressives. Identifica països pel seu hemisferi, població, muntanyes, rius i idiomes.',
        temas: [
          { nombre: 'Europa', desc: 'Identifica els països europeus.' },
          { nombre: 'Amèrica', desc: 'Aprèn els països americans.' },
          { nombre: 'Àsia', desc: 'El continent més gran i divers.' },
          { nombre: 'Àfrica', desc: 'El continent més variat del planeta.' },
          { nombre: 'Oceania', desc: 'Austràlia, Nova Zelanda i les illes del Pacífic.' },
          { nombre: 'Espanya — Províncies', desc: 'Les 50 províncies.' },
          { nombre: 'Estats Units — Estats', desc: 'Els 50 estats.' },
        ],
      },
      {
        titulo: 'Ciències', emoji: '🔬',
        texto: 'Exàmens de ciències naturals i química adaptats al currículum oficial de Primària, ESO i Batxillerat. Preguntes d\'opció múltiple amb explicació després de cada resposta.',
        temas: [
          { nombre: 'Taula Periòdica', desc: 'Símbols, noms, nombre atòmic i grups. 3 nivells.' },
          { nombre: 'Estats de la Matèria', desc: 'Sòlid, líquid, gas i canvis d\'estat.' },
          { nombre: 'Mescles i Separació', desc: 'Tipus de mescla i mètodes: filtració, destil·lació, decantació...' },
          { nombre: 'Àcids i Bases', desc: 'Escala de pH, indicadors i neutralització. ESO.' },
          { nombre: 'Àtoms i Molècules', desc: 'Estructura atòmica, elements i compostos.' },
          { nombre: 'Sistema Solar', desc: 'Planetes, astres, moviments i característiques. Primària i ESO.' },
          { nombre: 'La Cèl·lula', desc: 'Tipus de cèl·lula, orgànuls i funcions. ESO.' },
          { nombre: 'Geometria', desc: 'Angles, àrees, perímetres, Pitàgores i volums.' },
        ],
      },
    ],
  },
}

export default function InfoEstudiar() {
  const { lang, localPath } = useLang()
  const d = DATA[lang] || DATA.es
  const cienciasSlugs = lang === 'ca' ? CIENCIAS_SLUGS_CA : lang === 'en' ? CIENCIAS_SLUGS_EN : CIENCIAS_SLUGS_ES
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
                {cat.temas.map(t => {
                  const temaSlug = cienciasSlugs[t.nombre]
                  return (
                    <div key={t.nombre} className="bg-white rounded-2xl border border-gray-200 p-5">
                      <h3 className="font-black text-gray-900 mb-1">{t.nombre}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                      {temaSlug && (
                        <Link to={localPath(`/info/estudiar/${temaSlug}`)}
                          className="inline-block mt-3 text-teal-600 text-sm font-semibold hover:text-teal-500 transition-colors">
                          {verMas}
                        </Link>
                      )}
                    </div>
                  )
                })}
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
