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
          { nombre: 'España — Provincias', desc: 'Las 50 provincias. Próximamente.' },
          { nombre: 'Estados Unidos — Estados', desc: 'Los 50 estados. Próximamente.' },
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
          { nombre: 'Spain — Provinces', desc: 'All 50 provinces. Coming soon.' },
          { nombre: 'United States — States', desc: 'All 50 states. Coming soon.' },
        ],
      },
    ],
  },
}

export default function InfoEstudiar() {
  const { lang, localPath } = useLang()
  const d = DATA[lang] || DATA.es

  return (
    <div className="relative z-10">
      <div className="px-4 sm:px-8 py-10 max-w-4xl mx-auto">
        <Link to={localPath('/')} className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          ← {lang === 'en' ? 'Home' : 'Inicio'}
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
