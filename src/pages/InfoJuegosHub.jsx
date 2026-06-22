import { Link } from 'react-router-dom'

const CATEGORIAS = [
  {
    titulo: 'Matemáticas y Cálculo Mental',
    emoji: '📐',
    texto: 'El bloque de matemáticas está diseñado para desarrollar la agilidad numérica y romper la barrera ante el cálculo abstracto. A través de mecánicas de puzzle y roguelike, los estudiantes interiorizan operaciones aritméticas de forma natural, sin la presión de los ejercicios tradicionales.',
    juegos: [
      { slug: 'acercate', titulo: 'Acércate al Número', desc: 'Combina operaciones para llegar al número objetivo. Roguelike con mejoras entre niveles.' },
    ],
  },
  {
    titulo: 'Historia y Ciencias Sociales',
    emoji: '⏳',
    texto: 'Aprender fechas, contextos y personajes históricos no tiene por qué ser memorización pasiva. Nuestros juegos convierten los temarios oficiales de la Guerra Civil, la Segunda Guerra Mundial o la Independencia Americana en experiencias interactivas que fijan los conceptos de forma duradera.',
    juegos: [
      { slug: 'tuthor-time', titulo: 'Tuthor Time', desc: 'Viaja en el tiempo y acierta el año de cada evento histórico. Cuida a tus agentes temporales.' },
      { slug: 'linea-temporal', titulo: 'Línea Temporal', desc: 'Ordena eventos históricos cronológicamente sin ver fechas. Pura intuición histórica.' },
      { slug: 'quien-es-quien', titulo: '¿Quién es Quién?', desc: 'Descubre el personaje histórico secreto usando pistas lógicas. Tacha y adivina.' },
      { slug: 'portadas', titulo: 'Portadas', desc: 'Lee titulares de periódicos históricos y decide si son verdad o mentira.' },
    ],
  },
  {
    titulo: 'Geografía',
    emoji: '🌍',
    texto: 'La geografía cobra vida cuando tienes que pensar rápido. Aprende países, continentes, ríos y montañas a través de pistas progresivas que te obligan a conectar datos geográficos en tiempo real.',
    juegos: [
      { slug: 'georush', titulo: 'GeoRush', desc: 'Adivina el país misterioso a partir de pistas geográficas, demográficas e históricas.' },
    ],
  },
]

export default function InfoJuegosHub() {
  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-10 max-w-4xl mx-auto">

      <Link to="/" className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
        ← Inicio
      </Link>

      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
          Juegos Educativos Online: Aprende y Repasa sin Aburrirte
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
          Bienvenido al catálogo de juegos didácticos de Tuthor. Aquí encontrarás herramientas interactivas
          diseñadas por docentes para facilitar el estudio de asignaturas clave en Primaria, Secundaria
          y Bachillerato. Nuestro método combina la ciencia pedagógica con la gamificación para mejorar
          el rendimiento escolar desde casa.
        </p>
      </header>

      <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-juegos" style={{ minHeight: '90px' }} />

      {CATEGORIAS.map((cat, catIdx) => (
        <section key={cat.titulo} className="mb-12">
          <h2 className="text-2xl font-black text-white mb-3 flex items-center gap-3">
            <span className="text-3xl">{cat.emoji}</span>
            {cat.titulo}
          </h2>
          <p className="text-white/50 leading-relaxed mb-6 max-w-3xl">
            {cat.texto}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {cat.juegos.map(j => (
              <Link
                key={j.slug}
                to={`/info/juegos/${j.slug}`}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-2xl p-6 transition-all hover:scale-[1.01]"
              >
                <h3 className="font-black text-white text-lg group-hover:text-[#EDAE49] transition-colors mb-2">
                  {j.titulo}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4">{j.desc}</p>
                <span className="text-sm font-semibold text-[#EDAE49]/70 group-hover:text-[#EDAE49] transition-colors">
                  Saber más y jugar →
                </span>
              </Link>
            ))}
          </div>

          {catIdx < CATEGORIAS.length - 1 && (
            <aside className="ad-slot" aria-label="Publicidad" data-ad-slot={`info-juegos-${catIdx}`} style={{ minHeight: '90px', marginTop: '2rem' }} />
          )}
        </section>
      ))}

      <section className="mb-12">
        <h2 className="text-2xl font-black text-white mb-3 flex items-center gap-3">
          <span className="text-3xl">🔬</span>
          Ciencias, Idiomas y más — Próximamente
        </h2>
        <p className="text-white/50 leading-relaxed max-w-3xl">
          Estamos desarrollando juegos de ciencias naturales, vocabulario en inglés, química elemental
          y física aplicada. Todos seguirán el mismo enfoque: aprender jugando, con base científica y
          adaptados a los temarios oficiales.
        </p>
      </section>

      <footer className="border-t border-white/10 pt-8 text-center">
        <Link to="/juegos"
          className="inline-block py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
          Ir a jugar ahora →
        </Link>
      </footer>
    </div>
  )
}
