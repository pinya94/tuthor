import { Link } from 'react-router-dom'

const CATEGORIAS = [
  {
    titulo: 'Matemáticas y Cálculo Mental',
    emoji: '📐',
    texto: 'El bloque de matemáticas está diseñado para desarrollar la agilidad numérica y romper la barrera ante el cálculo abstracto. A través de mecánicas de puzzle y roguelike, los estudiantes interiorizan operaciones aritméticas de forma natural, sin la presión de los ejercicios tradicionales.',
    juegos: [
      { slug: 'acercate', titulo: 'Acércate al Número', desc: 'Combina operaciones para llegar al número objetivo. Roguelike con mejoras entre niveles.', emoji: '🎯', gradient: 'from-pink-600 to-rose-800', tags: ['Mates','Roguelike'] },
    ],
  },
  {
    titulo: 'Historia y Ciencias Sociales',
    emoji: '⏳',
    texto: 'Aprender fechas, contextos y personajes históricos no tiene por qué ser memorización pasiva. Nuestros juegos convierten los temarios oficiales de la Guerra Civil, la Segunda Guerra Mundial o la Independencia Americana en experiencias interactivas que fijan los conceptos de forma duradera.',
    juegos: [
      { slug: 'tuthor-time', titulo: 'Tuthor Time', desc: 'Viaja en el tiempo y acierta el año de cada evento histórico. Cuida a tus agentes temporales.', emoji: '🕰️', gradient: 'from-amber-600 to-orange-800', tags: ['Historia','Fechas'] },
      { slug: 'linea-temporal', titulo: 'Línea Temporal', desc: 'Ordena eventos históricos cronológicamente sin ver fechas. Pura intuición histórica.', emoji: '📜', gradient: 'from-emerald-600 to-teal-800', tags: ['Historia','Orden'] },
      { slug: 'quien-es-quien', titulo: '¿Quién es Quién?', desc: 'Descubre el personaje histórico secreto usando pistas lógicas. Tacha y adivina.', emoji: '🕵️', gradient: 'from-violet-600 to-purple-900', tags: ['Historia','Deducción'] },
      { slug: 'portadas', titulo: 'Portadas', desc: 'Lee titulares de periódicos históricos y decide si son verdad o mentira.', emoji: '📰', gradient: 'from-stone-600 to-neutral-800', tags: ['Historia','Crítico'] },
    ],
  },
  {
    titulo: 'Geografía',
    emoji: '🌍',
    texto: 'La geografía cobra vida cuando tienes que pensar rápido. Aprende países, continentes, ríos y montañas a través de pistas progresivas que te obligan a conectar datos geográficos en tiempo real.',
    juegos: [
      { slug: 'georush', titulo: 'GeoRush', desc: 'Adivina el país misterioso a partir de pistas geográficas, demográficas e históricas.', emoji: '🌍', gradient: 'from-teal-500 to-cyan-700', tags: ['Geografía','Pistas'] },
    ],
  },
]

export default function InfoJuegosHub() {
  return (
    <div className="relative z-10">
      {/* Header oscuro con el estilo de la app */}
      <div className="px-4 sm:px-8 py-10 max-w-4xl mx-auto">
        <Link to="/" className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          ← Inicio
        </Link>

        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Juegos Educativos Online
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
            Herramientas interactivas diseñadas por docentes para facilitar el estudio de
            asignaturas clave en Primaria, Secundaria y Bachillerato.
          </p>
        </header>
      </div>

      {/* Contenido SEO sobre fondo claro */}
      <div className="bg-[#f5f5f0] text-gray-900 rounded-t-[2rem] sm:rounded-t-[3rem]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10">

          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto text-center text-lg">
            Nuestro método combina la ciencia pedagógica con la gamificación para mejorar
            el rendimiento escolar desde casa. Cada juego activa habilidades cognitivas reales
            mientras el alumno se divierte.
          </p>

          {CATEGORIAS.map((cat, catIdx) => (
            <section key={cat.titulo}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{cat.emoji}</span>
                <h2 className="text-2xl font-black text-gray-900">{cat.titulo}</h2>
              </div>
              <p className="text-gray-500 leading-relaxed mb-6 max-w-3xl">{cat.texto}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                {cat.juegos.map(j => (
                  <Link key={j.slug} to={`/info/juegos/${j.slug}`}
                    className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 overflow-hidden transition-all hover:shadow-lg hover:shadow-gray-200/50 hover:scale-[1.01]">
                    <div className={`bg-gradient-to-br ${j.gradient} h-28 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                      <span className="text-5xl relative drop-shadow-lg group-hover:scale-110 transition-transform">{j.emoji}</span>
                      <div className="absolute bottom-2 right-3 flex gap-1.5">
                        {j.tags.map(t => (
                          <span key={t} className="text-[10px] font-bold bg-black/30 text-white/80 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-gray-900 text-lg group-hover:text-teal-600 transition-colors mb-1">
                        {j.titulo}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3">{j.desc}</p>
                      <span className="text-sm font-semibold text-teal-600 group-hover:text-teal-500 transition-colors">
                        Ver beneficios y jugar →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {catIdx < CATEGORIAS.length - 1 && (
                <>
                  <aside className="ad-slot" aria-label="Publicidad" data-ad-slot={`info-juegos-${catIdx}`} style={{ minHeight: '90px', marginTop: '2rem' }} />
                  <hr className="border-gray-200 mt-6" />
                </>
              )}
            </section>
          ))}

          <section>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🔬</span>
              <h2 className="text-2xl font-black text-gray-900">Ciencias, Idiomas y más — Próximamente</h2>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-3xl">
              Estamos desarrollando juegos de ciencias naturales, vocabulario en inglés, química elemental
              y física aplicada. Todos seguirán el mismo enfoque: aprender jugando, con base científica y
              adaptados a los temarios oficiales.
            </p>
          </section>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-juegos-bottom" style={{ minHeight: '90px' }} />

          <footer className="text-center pt-4">
            <Link to="/juegos"
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              Ir a jugar ahora →
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}
