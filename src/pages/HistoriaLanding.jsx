import { useNavigate } from 'react-router-dom'

const ACTIVIDADES = [
  {
    id: 'fechas',
    titulo: 'Juego de Fechas',
    descripcion: 'Adivina el año de los eventos históricos. Una vida, un margen — llegar al final es aprobar.',
    emoji: '📅',
    gradient: 'from-amber-500 to-orange-600',
    ready: true,
  },
  {
    id: 'linea',
    titulo: 'Línea del Tiempo',
    descripcion: 'Ordena los eventos cronológicamente arrastrándolos al lugar correcto.',
    emoji: '📜',
    gradient: 'from-blue-500 to-indigo-600',
    ready: false,
  },
  {
    id: 'personajes',
    titulo: 'Personajes Históricos',
    descripcion: '¿Quién soy? Adivina el personaje histórico a partir de pistas.',
    emoji: '👤',
    gradient: 'from-violet-500 to-purple-700',
    ready: false,
  },
  {
    id: 'mapas',
    titulo: 'Mapas Históricos',
    descripcion: 'Identifica territorios, batallas y rutas en mapas de época.',
    emoji: '🗺️',
    gradient: 'from-teal-500 to-cyan-600',
    ready: false,
  },
]

export default function HistoriaLanding({ nivel, title }) {
  const navigate = useNavigate()
  const base = `/estudiar/${nivel}/historia`

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">Estudiar · {title} · Historia</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">¿Cómo quieres repasar?</h1>
        <p className="text-white/40 mt-1 text-sm">Elige una actividad para repasar Historia</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
        {ACTIVIDADES.map(act => (
          <button
            key={act.id}
            onClick={() => act.ready && navigate(`${base}/${act.id}`)}
            className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 ${
              act.ready
                ? 'hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40 cursor-pointer'
                : 'cursor-default opacity-60'
            }`}
          >
            <div className={`bg-gradient-to-br ${act.gradient} p-6 h-full`}>
              {!act.ready && (
                <span className="absolute top-3 right-3 bg-black/40 text-white text-xs font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                  🔒 Próximamente
                </span>
              )}
              <span className="text-4xl block mb-3">{act.emoji}</span>
              <h3 className="font-black text-white text-lg leading-tight mb-1">{act.titulo}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{act.descripcion}</p>
              {act.ready && (
                <div className={`mt-4 inline-flex items-center gap-1.5 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 transition-all duration-300 ${
                  'group-hover:bg-white/30'
                }`}>
                  Jugar →
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
