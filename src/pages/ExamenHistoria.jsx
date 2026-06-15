import { useNavigate } from 'react-router-dom'
import { EXAMENES_HISTORIA, EVENTOS_HISTORIA, calcularMargen, getEventosPorCategoria } from '../data/historiaEvents'

export default function ExamenHistoria({ nivel }) {
  const navigate = useNavigate()
  const examenes = EXAMENES_HISTORIA.filter(ex => ex.niveles.includes(nivel))

  function iniciarExamen(examen) {
    navigate('/examen/historia', { state: { examen, nivel, backPath: `/estudiar/${nivel}/historia/fechas` } })
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">
          Estudiar · {nivel === 'eso' ? 'ESO' : nivel === 'bachillerato' ? 'Bachillerato' : 'Primaria'} · Historia
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Elige tu examen</h1>
        <p className="text-white/40 mt-1 text-sm">Adivina el año de los eventos históricos — una vida, un margen</p>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-3">
        {examenes.map(examen => {
          const eventos = getEventosPorCategoria(examen.id, nivel)
          const margen = calcularMargen(examen.id)
          return (
            <button
              key={examen.id}
              onClick={() => iniciarExamen(examen)}
              className="w-full group flex items-center gap-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 rounded-2xl p-5 transition-all text-left"
            >
              <span className="text-4xl shrink-0">{examen.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-white text-lg leading-tight">{examen.nombre}</h3>
                <p className="text-white/40 text-sm mt-0.5 truncate">{examen.descripcion}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-white/30">{eventos.length} preguntas</span>
                  <span className="text-xs text-violet-400 font-bold">±{margen} {margen === 1 ? 'año' : 'años'} de margen</span>
                  <span className="text-xs text-white/30">❤️ una vida</span>
                </div>
              </div>
              <span className="text-white/20 group-hover:text-white/60 text-xl transition-colors shrink-0">→</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
