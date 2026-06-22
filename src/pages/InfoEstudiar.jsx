import { Link } from 'react-router-dom'

const CATEGORIAS = [
  {
    titulo: 'Historia y Ciencias Sociales',
    emoji: '⏳',
    texto: 'Repasa los grandes temas de la historia con juegos adaptados al temario oficial. Cada tema combina línea temporal, personajes históricos, portadas de periódicos y fechas clave para que el conocimiento se fije desde múltiples ángulos. Exámenes de 10 preguntas con nota final.',
    temas: [
      { nombre: 'Guerra Civil Española', desc: 'Del golpe del 36 al fin de la dictadura. Personajes, batallas, contexto político y social.', enlace: '/estudiar/historia/gce' },
      { nombre: 'Segunda Guerra Mundial', desc: 'De la invasión de Polonia a Hiroshima. Cronología, líderes y eventos decisivos.', enlace: '/estudiar/historia/wwii' },
      { nombre: 'Independencia Americana', desc: 'Del motín del té a la Constitución. Los Padres Fundadores y la revolución.', enlace: '/estudiar/historia/usa' },
      { nombre: 'Antigua Roma', desc: 'De Rómulo al colapso del Imperio. República, emperadores y legado.', enlace: '/estudiar/historia/roma' },
      { nombre: 'Grandes Hitos de la Historia', desc: 'Los momentos que cambiaron el mundo: desde la imprenta hasta la llegada a la Luna.', enlace: '/estudiar/historia/primaria' },
    ],
  },
  {
    titulo: 'Matemáticas',
    emoji: '📐',
    texto: 'Domina el cálculo mental a través de puzzles progresivos. Cada modo de operación tiene su propio examen de 10 rondas adaptado al nivel educativo del alumno: Primaria, ESO o Bachillerato. Aprueba con 5 o más aciertos.',
    temas: [
      { nombre: 'Sumas y restas', desc: 'Operaciones básicas combinadas para alcanzar el número objetivo.', enlace: '/estudiar/matematicas/combinado' },
      { nombre: 'Multiplicación', desc: 'Combina multiplicaciones con sumas y restas para llegar al resultado.', enlace: '/estudiar/matematicas/multiplicacion' },
      { nombre: 'División', desc: 'Descompón números usando divisiones exactas y operaciones mixtas.', enlace: '/estudiar/matematicas/division' },
    ],
  },
  {
    titulo: 'Geografía',
    emoji: '🌍',
    texto: 'Aprende la geografía del mundo a través de pistas progresivas. Identifica países por su hemisferio, población, montañas, ríos e idiomas. Exámenes organizados por regiones del mundo.',
    temas: [
      { nombre: 'Europa', desc: 'Desde Islandia hasta Chipre. Identifica los países europeos por sus datos geográficos.', enlace: '/estudiar/geografia' },
      { nombre: 'América', desc: 'Del Canadá a la Patagonia. Aprende los países americanos y sus características.', enlace: '/estudiar/geografia' },
      { nombre: 'Asia', desc: 'El continente más grande y diverso. De Japón a Turquía, pasando por India y China.', enlace: '/estudiar/geografia' },
      { nombre: 'África', desc: 'De Marruecos a Sudáfrica. Descubre el continente más variado del planeta.', enlace: '/estudiar/geografia' },
      { nombre: 'Oceanía', desc: 'Australia, Nueva Zelanda y las islas del Pacífico.', enlace: '/estudiar/geografia' },
      { nombre: 'España — Provincias', desc: 'Las 50 provincias españolas. Próximamente.', enlace: '/estudiar/geografia' },
      { nombre: 'Estados Unidos — Estados', desc: 'Los 50 estados americanos. Próximamente.', enlace: '/estudiar/geografia' },
    ],
  },
]

export default function InfoEstudiar() {
  return (
    <div className="relative z-10">
      <div className="px-4 sm:px-8 py-10 max-w-4xl mx-auto">
        <Link to="/" className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          ← Inicio
        </Link>
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Estudiar con Juegos: Exámenes Gamificados por Temario
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
            Tuthor adapta cada juego al temario oficial de Primaria, Secundaria y Bachillerato.
            Exámenes de 10 preguntas sobre temas concretos. Aprueba con 5 o más aciertos.
          </p>
        </header>
      </div>

      <div className="bg-[#f5f5f0] text-gray-900 rounded-t-[2rem] sm:rounded-t-[3rem]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10">

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-estudiar-top" style={{ minHeight: '90px' }} />

          {CATEGORIAS.map((cat, catIdx) => (
            <section key={cat.titulo}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{cat.emoji}</span>
                <h2 className="text-2xl font-black text-gray-900">{cat.titulo}</h2>
              </div>
              <p className="text-gray-500 leading-relaxed mb-6 max-w-3xl">{cat.texto}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                {cat.temas.map(t => (
                  <Link key={t.nombre} to={t.enlace}
                    className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 p-5 transition-all hover:shadow-lg hover:shadow-gray-200/50 hover:scale-[1.01]">
                    <h3 className="font-black text-gray-900 group-hover:text-teal-600 transition-colors mb-1">{t.nombre}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                  </Link>
                ))}
              </div>

              {catIdx < CATEGORIAS.length - 1 && (
                <>
                  <aside className="ad-slot" aria-label="Publicidad" data-ad-slot={`info-estudiar-${catIdx}`} style={{ minHeight: '90px', marginTop: '2rem' }} />
                  <hr className="border-gray-200 mt-6" />
                </>
              )}
            </section>
          ))}

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-estudiar-bottom" style={{ minHeight: '90px' }} />

          <footer className="text-center pt-4">
            <Link to="/estudiar"
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              Ir a estudiar ahora →
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}
